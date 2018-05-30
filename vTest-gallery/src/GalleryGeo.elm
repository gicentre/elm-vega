port module GalleryGeo exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


geo1 : Spec
geo1 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "unemp" [ daUrl "https://vega.github.io/vega/data/unemployment.tsv", daFormat TSV ]
                , data "counties"
                    [ daUrl "https://vega.github.io/vega/data/us-10m.json"
                    , daFormat (topojsonFeature "counties")
                    ]
                    |> transform
                        [ trLookup "unemp" (str "id") [ str "id" ] [ luValues [ str "rate" ] ]
                        , trFilter (expr "datum.rate != null")
                        ]
                ]

        pr =
            projections
                << projection "myProjection" [ prType AlbersUsa ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScQuantize
                    , scDomain (doNums (nums [ 0, 0.15 ]))
                    , scRange (raScheme "blues-9" [])
                    ]

        shapeEncoding =
            [ maShape [ vStr (symbolLabel SymSquare) ]
            , maStroke [ vStr "#ccc" ]
            , maStrokeWidth [ vNum 0.2 ]
            ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leOrient BottomRight
                    , leTitle "Unemployment"
                    , leFormat "0.1%"
                    , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "counties") ]
                    , mEncode
                        [ enEnter [ maTooltip [ vSignal "format(datum.rate, '0.1%')" ] ]
                        , enUpdate [ maFill [ vScale (fName "cScale"), vField (fName "rate") ] ]
                        , enHover [ maFill [ vStr "red" ] ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 960, height 500, autosize [ ANone ], ds, pr [], sc [], lg [], mk [] ]


geo2 : Spec
geo2 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "states"
                    [ daUrl "https://vega.github.io/vega/data/us-10m.json"
                    , daFormat (topojsonFeature "states")
                    ]
                , data "obesity"
                    [ daUrl "https://vega.github.io/vega/data/obesity.json" ]
                    |> transform
                        [ trLookup "states" (str "id") [ str "id" ] [ luAs [ "geo" ] ]
                        , trFilter (expr "datum.geo")
                        , trFormula "geoCentroid('myProjection', datum.geo)" "centroid" AlwaysUpdate
                        ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType AlbersUsa
                    , prScale (num 1100)
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]

        sc =
            scales
                << scale "sizeScale"
                    [ scDomain (doData [ daDataset "obesity", daField (str "rate") ])
                    , scZero (boo False)
                    , scRange (raNums [ 1000, 5000 ])
                    ]
                << scale "cScale"
                    [ scType ScSequential
                    , scNice NTrue
                    , scDomain (doData [ daDataset "obesity", daField (str "rate") ])
                    , scRange (raDefault RRamp)
                    ]

        lg =
            legends
                << legend
                    [ leTitle "Percentage of Obese Adults"
                    , leOrient BottomRight
                    , leType LSymbol
                    , leSize "sizeScale"
                    , leFill "cScale"
                    , leFormat ".1%"
                    , leClipHeight (num 16)
                    ]

        mk =
            marks
                << mark Symbol
                    [ mName "circles"
                    , mFrom [ srData (str "obesity") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vScale (fName "sizeScale"), vField (fName "rate") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "rate") ]
                            , maStroke [ vStr "white" ]
                            , maStrokeWidth [ vNum 1.5 ]
                            , maX [ vField (fName "centroid[0]") ]
                            , maY [ vField (fName "centroid[1]") ]
                            , maTooltip [ vSignal "'Obesity Rate: ' + format(datum.rate, '.1%')" ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsStatic (boo True)
                            , fsForces
                                [ foCollide (numExpr (expr "1 + sqrt(datum.size) / 2")) []
                                , foX (str "datum.centroid[0]") []
                                , foY (str "datum.centroid[1]") []
                                ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive (boo False)
                    , mFrom [ srData (str "circles") ]
                    , mEncode
                        [ enEnter
                            [ maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maFontSize [ vNum 13 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vField (fName "datum.state") ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 900, height 520, autosize [ ANone ], ds, pr [], sc [], lg [], mk [] ]


geo3 : Spec
geo3 =
    let
        ds =
            dataSource
                [ data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
                    ]
                , data "graticule" []
                    |> transform [ trGraticule [] ]
                ]

        si =
            signals
                << signal "pType"
                    [ siValue (vStr "mercator")
                    , siBind
                        (iSelect
                            [ inOptions
                                (vStrs
                                    [ "albers"
                                    , "albersUsa"
                                    , "azimuthalEqualArea"
                                    , "azimuthalEquidistant"
                                    , "conicConformal"
                                    , "conicEqualArea"
                                    , "conicEquidistant"
                                    , "equirectangular"
                                    , "gnomonic"
                                    , "mercator"
                                    , "orthographic"
                                    , "stereographic"
                                    , "transverseMercator"
                                    ]
                                )
                            ]
                        )
                    ]
                << signal "pScale" [ siValue (vNum 150), siBind (iRange [ inMin 50, inMax 2000, inStep 1 ]) ]
                << signal "pRotate0" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "pRotate1" [ siValue (vNum 0), siBind (iRange [ inMin -90, inMax 90, inStep 1 ]) ]
                << signal "pRotate2" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "pCentre0" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "pCentre1" [ siValue (vNum 0), siBind (iRange [ inMin -90, inMax 90, inStep 1 ]) ]
                << signal "pTranslate0" [ siUpdate "width /2" ]
                << signal "pTranslate1" [ siUpdate "height /2" ]
                << signal "graticuleDash" [ siValue (vNum 0), siBind (iRadio [ inOptions (vNums [ 0, 3, 5, 10 ]) ]) ]
                << signal "borderWidth" [ siValue (vNum 1), siBind (iText []) ]
                << signal "background" [ siValue (vStr "#ffffff"), siBind (iColor []) ]
                << signal "invert" [ siValue (vBoo False), siBind (iCheckbox []) ]

        pr =
            projections
                << projection "myProjection"
                    [ prType (prCustom (strSignal "pType"))
                    , prScale (numSignal "pScale")
                    , prRotate (numSignals [ "pRotate0", "pRotate1", "pRotate2" ])
                    , prCenter (numSignals [ "pCentre0", "pCentre1" ])
                    , prTranslate (numSignals [ "pTranslate0", "pTranslate1" ])
                    ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "graticule") ]
                    , mEncode
                        [ enUpdate
                            [ maStrokeWidth [ vNum 1 ]
                            , maStrokeDash [ vSignal "[+graticuleDash, +graticuleDash]" ]
                            , maStroke [ vSignal "invert ? '#444' : '#ddd'" ]
                            , maFill []
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maStrokeWidth [ vSignal "+borderWidth" ]
                            , maStroke [ vSignal "invert ? '#777' : '#bbb'" ]
                            , maFill [ vSignal "invert ? '#fff' : '#000'" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        , enHover
                            [ maStrokeWidth [ vSignal "+borderWidth + 1" ]
                            , maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]

        enc =
            encode [ enUpdate [ maFill [ vSignal "background" ] ] ]
    in
    toVega
        [ width 900, height 500, autosize [ ANone ], enc, ds, si [], pr [], mk [] ]


geo4 : Spec
geo4 =
    let
        ds =
            dataSource
                [ data "sphere" [ daSphere ]
                , data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
                    ]
                , data "earthquakes"
                    [ daUrl "https://vega.github.io/vega/data/earthquakes.json"
                    , daFormat (jsonProperty "features")
                    ]
                ]

        si =
            signals
                << signal "quakeSize" [ siValue (vNum 6), siBind (iRange [ inMin 0, inMax 12 ]) ]
                << signal "pRotate0" [ siValue (vNum 90), siBind (iRange [ inMin -180, inMax 180 ]) ]
                << signal "pRotate1" [ siValue (vNum -5), siBind (iRange [ inMin -180, inMax 180 ]) ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Orthographic
                    , prScale (num 225)
                    , prRotate (numSignals [ "pRotate0", "pRotate1", "0" ])
                    , prTranslate (numSignals [ "width/2", "height/2" ])
                    ]

        sc =
            scales
                << scale "scSize"
                    [ scType ScSqrt
                    , scRange (raValues [ vNum 0, vSignal "quakeSize" ])
                    , scDomain (doNums (nums [ 0, 100 ]))
                    ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "aliceblue" ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 1.5 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "mintcream" ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 0.35 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "earthquakes") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "red" ]
                            , maOpacity [ vNum 0.25 ]
                            ]
                        ]
                    , mTransform
                        [ trGeoShape "myProjection" [ gpPointRadius (numExpr (expr "scale('scSize', exp(datum.properties.mag))")) ]
                        ]
                    ]
    in
    toVega
        [ width 450, height 450, padding 10, autosize [ ANone ], ds, si [], pr [], sc [], mk [] ]


geo5 : Spec
geo5 =
    let
        mapWidth =
            200

        mapHeight =
            133

        projScale =
            25

        ds =
            dataSource
                [ data "projections"
                    [ daValue
                        (vStrs
                            [ "azimuthalEquidistant"
                            , "conicConformal"
                            , "gnomonic"
                            , "mercator"
                            , "stereographic"
                            , "airy"
                            , "armadillo"
                            , "baker"
                            , "berghaus"
                            , "bottomley"
                            , "collignon"
                            , "eckert1"
                            , "guyou"
                            , "hammer"
                            , "littrow"
                            , "mollweide"
                            , "wagner6"
                            , "wiechel"
                            , "winkel3"
                            , "interruptedSinusoidal"
                            , "interruptedMollweide"
                            , "interruptedMollweideHemispheres"
                            , "polyhedralButterfly"
                            , "peirceQuincuncial"
                            ]
                        )
                    ]
                , data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
                    ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                , dataFromRows "sphere" [] (dataRow [ ( "type", vStr "Sphere" ) ] [])
                , dataFromColumns "labelOffsets"
                    []
                    (dataColumn "dx" (daNums [ -1, -1, 1, 1 ]) <|
                        dataColumn "dy" (daNums [ -1, 1, -1, 1 ]) []
                    )
                ]

        lo =
            layout [ loColumns (num 3), loPadding (num 20) ]

        nestedPr =
            projections
                << projection "myProjection"
                    [ prType (prCustom (strSignal "parent.data"))
                    , prScale (num projScale)
                    , prTranslate (nums [ mapWidth / 2, mapHeight / 2 ])
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srData (str "projections") ]
                    , mEncode
                        [ enEnter
                            [ maWidth [ vNum mapWidth ]
                            , maHeight [ vNum mapHeight ]
                            , maGroupClip [ vBoo True ]
                            ]
                        ]
                    , mGroup [ nestedPr [], nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode [ enEnter [ maFill [ vStr "aliceblue" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "graticule") ]
                    , mClip (clSphere (str "myProjection"))
                    , mInteractive (boo False)
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "world") ]
                    , mClip (clSphere (str "myProjection"))
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 0.25 ]
                            , maStroke [ vStr "#888" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "labelOffsets") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "white" ]
                            , maDx [ vField (fName "dx") ]
                            , maDy [ vField (fName "dy") ]
                            , maX [ vNum 5 ]
                            , maY [ vNum (mapHeight - 5) ]
                            , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maFill [ vStr "black" ]
                            , maX [ vNum 5 ]
                            , maY [ vNum (mapHeight - 5) ]
                            , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ autosize [ APad ], ds, lo, mk [] ]


geo6 : Spec
geo6 =
    let
        ds =
            dataSource
                [ data "sphere" [ daSphere ]
                , data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
                    ]
                , data "graticule" []
                    |> transform [ trGraticule [] ]
                ]

        si =
            signals
                << signal "tx" [ siUpdate "width / 2" ]
                << signal "ty" [ siUpdate "height / 2" ]
                << signal "scale"
                    [ siValue (vNum 150)
                    , siOn
                        [ evHandler (esObject [ esType Wheel ])
                            [ evUpdate "clamp(scale * pow(1.0005, -event.deltaY * pow(16, event.deltaMode)), 150, 3000)" ]
                        ]
                    ]
                << signal "quakeSize" [ siValue (vNum 6), siBind (iRange [ inMin 0, inMax 12 ]) ]
                << signal "pRotate0" [ siValue (vNum 90), siBind (iRange [ inMin -180, inMax 180 ]) ]
                << signal "pRotate1" [ siValue (vNum -5), siBind (iRange [ inMin -180, inMax 180 ]) ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Orthographic
                    , prScale (num 225)
                    , prRotate (numSignals [ "pRotate0", "pRotate1", "0" ])
                    , prTranslate (numSignals [ "width/2", "height/2" ])
                    ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "aliceblue" ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 1.5 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "mintcream" ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 0.35 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "earthquakes") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "red" ]
                            , maOpacity [ vNum 0.25 ]
                            ]
                        ]
                    , mTransform
                        [ trGeoShape "myProjection" [ gpPointRadius (numExpr (expr "scale('scSize', exp(datum.properties.mag))")) ]
                        ]
                    ]
    in
    toVega
        [ width 900, height 500, autosize [ ANone ], ds, si [], pr [], mk [] ]


sourceExample : Spec
sourceExample =
    geo6



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geo1", geo1 )
        , ( "geo2", geo2 )
        , ( "geo3", geo3 )
        , ( "geo4", geo4 )
        , ( "geo5", geo5 )
        , ( "geo6", geo6 )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program Never Spec msg
main =
    Html.program
        { init = ( mySpecs, elmToJS mySpecs )
        , view = view
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }



-- View


view : Spec -> Html msg
view spec =
    div []
        [ div [ id "specSource" ] []
        , pre []
            [ Html.text (Json.Encode.encode 2 sourceExample) ]
        ]


port elmToJS : Spec -> Cmd msg
