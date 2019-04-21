port module GalleryGeo exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Http
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


standardProjections : Value
standardProjections =
    List.map projectionValue
        [ albers
        , albersUsa
        , azimuthalEqualArea
        , azimuthalEquidistant
        , conicConformal
        , conicEqualArea
        , conicEquidistant
        , equirectangular
        , gnomonic
        , mercator
        , orthographic
        , stereographic
        , transverseMercator
        ]
        |> vValues


geo1 : Spec
geo1 =
    let
        ds =
            dataSource
                [ data "unemp"
                    [ daUrl (str "https://vega.github.io/vega/data/unemployment.tsv")
                    , daFormat [ tsv ]
                    ]
                , data "counties"
                    [ daUrl (str "https://vega.github.io/vega/data/us-10m.json")
                    , daFormat [ topojsonFeature (str "counties") ]
                    ]
                    |> transform
                        [ trLookup "unemp" (field "id") [ field "id" ] [ luValues [ field "rate" ] ]
                        , trFilter (expr "datum.rate != null")
                        ]
                ]

        pr =
            projections
                << projection "myProjection" [ prType albersUsa ]

        sc =
            scales
                << scale "cScale"
                    [ scType scQuantize
                    , scDomain (doNums (nums [ 0, 0.15 ]))
                    , scRange (raScheme (str "blues") [])
                    ]

        shapeEncoding =
            [ maShape [ symbolValue symSquare ]
            , maStroke [ vStr "#ccc" ]
            , maStrokeWidth [ vNum 0.2 ]
            ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leOrient loBottomRight
                    , leTitle (str "Unemployment")
                    , leFormat (str "0.1%")
                    , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "counties") ]
                    , mEncode
                        [ enEnter [ maTooltip [ vSignal "format(datum.rate, '0.1%')" ] ]
                        , enUpdate [ maFill [ vScale "cScale", vField (field "rate") ] ]
                        , enHover [ maFill [ vStr "red" ] ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 960, height 500, autosize [ asNone ], ds, pr [], sc [], lg [], mk [] ]


geo2 : Spec
geo2 =
    let
        cf =
            config [ cfLegend [ leGradientLength (num 120), leGradientThickness (num 10) ] ]

        ds =
            dataSource
                [ data "states"
                    [ daUrl (str "https://vega.github.io/vega/data/us-10m.json")
                    , daFormat [ topojsonFeature (str "states") ]
                    ]
                , data "obesity"
                    [ daUrl (str "https://vega.github.io/vega/data/obesity.json") ]
                    |> transform
                        [ trLookup "states" (field "id") [ field "id" ] [ luAs [ "geo" ] ]
                        , trFilter (expr "datum.geo")
                        , trFormula "geoCentroid('myProjection', datum.geo)" "myCentroid"
                        ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType albersUsa
                    , prScale (num 1100)
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]

        sc =
            scales
                << scale "sizeScale"
                    [ scDomain (doData [ daDataset "obesity", daField (field "rate") ])
                    , scZero false
                    , scRange (raNums [ 1000, 5000 ])
                    ]
                << scale "cScale"
                    [ scType scSequential
                    , scNice niTrue
                    , scDomain (doData [ daDataset "obesity", daField (field "rate") ])
                    , scRange raRamp
                    ]

        lg =
            legends
                << legend
                    [ leTitle (str "Percentage of Obese Adults")
                    , leOrient loBottomRight
                    , leType ltSymbol
                    , leSize "sizeScale"
                    , leFill "cScale"
                    , leFormat (str ".1%")
                    , leClipHeight (num 16)
                    ]

        mk =
            marks
                << mark symbol
                    [ mName "circles"
                    , mFrom [ srData (str "obesity") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vScale "sizeScale", vField (field "rate") ]
                            , maFill [ vScale "cScale", vField (field "rate") ]
                            , maStroke [ white ]
                            , maStrokeWidth [ vNum 1.5 ]
                            , maX [ vField (field "myCentroid[0]") ]
                            , maY [ vField (field "myCentroid[1]") ]
                            , maTooltip [ vSignal "'Obesity Rate: ' + format(datum.rate, '.1%')" ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsStatic true
                            , fsForces
                                [ foCollide (numExpr (expr "1 + sqrt(datum.size) / 2")) []
                                , foX (field "datum.myCentroid[0]") []
                                , foY (field "datum.myCentroid[1]") []
                                ]
                            ]
                        ]
                    ]
                << mark text
                    [ mInteractive false
                    , mFrom [ srData (str "circles") ]
                    , mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vMiddle ]
                            , maFontSize [ vNum 13 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vField (field "datum.state") ]
                            ]
                        , enUpdate
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 900, height 520, autosize [ asNone ], ds, pr [], sc [], lg [], mk [] ]


geo3 : Spec
geo3 =
    let
        ds =
            dataSource
                [ data "world"
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                , data "graticule" []
                    |> transform [ trGraticule [] ]
                ]

        si =
            signals
                << signal "pType"
                    [ siValue (projectionValue mercator)
                    , siBind (iSelect [ inOptions standardProjections ])
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
                << signal "invert" [ siValue vFalse, siBind (iCheckbox []) ]

        pr =
            projections
                << projection "myProjection"
                    [ prType (prSignal "pType")
                    , prScale (numSignal "pScale")
                    , prRotate (numSignals [ "pRotate0", "pRotate1", "pRotate2" ])
                    , prCenter (numSignals [ "pCentre0", "pCentre1" ])
                    , prTranslate (numSignals [ "pTranslate0", "pTranslate1" ])
                    ]

        mk =
            marks
                << mark shape
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
                << mark shape
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
        [ width 900, height 500, autosize [ asNone ], enc, ds, si [], pr [], mk [] ]


geo4 : Spec
geo4 =
    let
        ds =
            dataSource
                [ data "sphere" [ daSphere ]
                , data "world"
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                , data "earthquakes"
                    [ daUrl (str "https://vega.github.io/vega/data/earthquakes.json")
                    , daFormat [ jsonProperty (str "features") ]
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
                    [ prType orthographic
                    , prScale (num 225)
                    , prRotate (numList [ numSignal "pRotate0", numSignal "pRotate1", num 0 ])
                    , prTranslate (numSignals [ "width/2", "height/2" ])
                    ]

        sc =
            scales
                << scale "scSize"
                    [ scType scSqrt
                    , scRange (raValues [ vNum 0, vSignal "quakeSize" ])
                    , scDomain (doNums (nums [ 0, 100 ]))
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "aliceblue" ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 1.5 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vStr "mintcream" ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 0.35 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
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
        [ width 450, height 450, padding 10, autosize [ asNone ], ds, si [], pr [], sc [], mk [] ]


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
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                , dataFromRows "sphere" [] (dataRow [ ( "type", vStr "Sphere" ) ] [])
                , (dataFromColumns "labelOffsets" []
                    << dataColumn "dx" (vNums [ -1, -1, 1, 1 ])
                    << dataColumn "dy" (vNums [ -1, 1, -1, 1 ])
                  )
                    []
                ]

        lo =
            layout [ loColumns (num 3), loPadding (num 20) ]

        nestedPr =
            projections
                << projection "myProjection"
                    [ prType (customProjection (strSignal "parent.data"))
                    , prScale (num projScale)
                    , prTranslate (nums [ mapWidth / 2, mapHeight / 2 ])
                    ]

        mk =
            marks
                << mark group
                    [ mFrom [ srData (str "projections") ]
                    , mEncode
                        [ enEnter
                            [ maWidth [ vNum mapWidth ]
                            , maHeight [ vNum mapHeight ]
                            , maGroupClip [ vTrue ]
                            ]
                        ]
                    , mGroup [ nestedPr [], nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode [ enEnter [ maFill [ vStr "aliceblue" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "graticule") ]
                    , mClip (clSphere (str "myProjection"))
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "world") ]
                    , mClip (clSphere (str "myProjection"))
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 0.25 ]
                            , maStroke [ vStr "#888" ]
                            , maFill [ black ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark text
                    [ mFrom [ srData (str "labelOffsets") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ white ]
                            , maDx [ vField (field "dx") ]
                            , maDy [ vField (field "dy") ]
                            , maX [ vNum 5 ]
                            , maY [ vNum (mapHeight - 5) ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maFill [ black ]
                            , maX [ vNum 5 ]
                            , maY [ vNum (mapHeight - 5) ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ autosize [ asPad ], ds, lo, mk [] ]


geo6 : Spec
geo6 =
    let
        ds =
            dataSource
                [ data "world"
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                , data "graticule" []
                    |> transform [ trGraticule [ grStep (nums [ 15, 15 ]) ] ]
                ]

        si =
            signals
                << signal "tx" [ siUpdate "width / 2" ]
                << signal "ty" [ siUpdate "height / 2" ]
                << signal "myScale"
                    [ siValue (vNum 150)
                    , siOn
                        [ evHandler [ esObject [ esType etWheel, esConsume true ] ]
                            [ evUpdate "clamp(myScale * pow(1.0005, -event.deltaY * pow(16, event.deltaMode)), 150, 3000)" ]
                        ]
                    ]
                << signal "angles"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler [ esObject [ esType etMouseDown ] ] [ evUpdate "[rotateX,centerY]" ] ]
                    ]
                << signal "cloned"
                    [ siValue vNull
                    , siOn [ evHandler [ esObject [ esType etMouseDown ] ] [ evUpdate "copy('myProjection')" ] ]
                    ]
                << signal "start"
                    [ siValue vNull
                    , siOn [ evHandler [ esObject [ esType etMouseDown ] ] [ evUpdate "invert(cloned, xy())" ] ]
                    ]
                << signal "drag"
                    [ siValue vNull
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esBetween [ esType etMouseDown ] [ esSource esWindow, esType etMouseUp ]
                                , esSource esWindow
                                , esType etMouseMove
                                ]
                            ]
                            [ evUpdate "invert(cloned, xy())" ]
                        ]
                    ]
                << signal "delta"
                    [ siValue vNull
                    , siOn [ evHandler [ esSelector (strSignal "drag") ] [ evUpdate "[drag[0] - start[0], start[1] - drag[1]]" ] ]
                    ]
                << signal "rotateX"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (strSignal "drag") ] [ evUpdate "angles[0] + delta[0]" ] ]
                    ]
                << signal "centerY"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (strSignal "drag") ] [ evUpdate "clamp(angles[1] + delta[1], -60, 60)" ] ]
                    ]

        pr =
            projections
                << projection "myProjection"
                    [ prType mercator
                    , prScale (numSignal "myScale")
                    , prRotate (numList [ numSignal "rotateX", num 0, num 0 ])
                    , prCenter (numList [ num 0, numSignal "centerY" ])
                    , prTranslate (numSignals [ "tx", "ty" ])
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "graticule") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vNull ]
                            , maStroke [ vStr "#ddd" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "#e5e8d3" ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 900, height 500, autosize [ asNone ], ds, si [], pr [], mk [] ]


geo7 : Spec
geo7 =
    let
        ds =
            dataSource
                [ data "world"
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                    |> transform
                        [ trFormula "geoCentroid('projection1', datum)" "myCentroid"
                        , trFormula "geoArea('projection1', datum)" "area1"
                        , trFormula "geoArea('projection2', datum)" "area2"
                        ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                ]

        si =
            signals
                << signal "baseProjection"
                    [ siValue (projectionValue azimuthalEqualArea)
                    , siBind (iSelect [ inOptions standardProjections ])
                    ]
                << signal "altProjection"
                    [ siValue (projectionValue mercator)
                    , siBind (iSelect [ inOptions standardProjections ])
                    ]
                << signal "baseColor"
                    [ siValue (vStr "#bb8800")
                    , siBind (iColor [])
                    ]
                << signal "altColor"
                    [ siValue (vStr "#0088bb")
                    , siBind (iColor [])
                    ]
                << signal "myOpacity"
                    [ siValue (vNum 0.15)
                    , siBind (iRange [ inMin 0, inMax 1, inStep 0.05 ])
                    ]
                << signal "scaleFactor"
                    [ siValue (vNum 1)
                    , siBind (iRange [ inMin 0.05, inMax 2, inStep 0.05 ])
                    ]

        pr =
            projections
                << projection "projection1"
                    [ prType (customProjection (strSignal "baseProjection"))
                    , prScale (num 150)
                    , prRotate (nums [ 0, 0, 0 ])
                    , prCenter (nums [ 0, 0 ])
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]
                << projection "projection2"
                    [ prType (customProjection (strSignal "altProjection"))
                    , prScale (num 150)
                    , prRotate (nums [ 0, 0, 0 ])
                    , prCenter (nums [ 0, 0 ])
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "graticule") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vNull ]
                            , maStroke [ vStr "#ddd" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "projection1" [] ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vSignal "altColor" ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFillOpacity [ vSignal "myOpacity" ]
                            , maZIndex [ vNum 0 ]
                            , maX [ vField (field "myCentroid[0]") ]
                            , maY [ vField (field "myCentroid[1]") ]
                            , maSize [ vField (field "area2"), vMultiply (vSignal "scaleFactor") ]
                            ]
                        , enHover
                            [ maStrokeWidth [ vNum 2 ]
                            , maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vSignal "baseColor" ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFillOpacity [ vSignal "myOpacity" ]
                            , maZIndex [ vNum 0 ]
                            , maX [ vField (field "myCentroid[0]") ]
                            , maY [ vField (field "myCentroid[1]") ]
                            , maSize [ vField (field "area1"), vMultiply (vSignal "scaleFactor") ]
                            ]
                        , enHover
                            [ maStrokeWidth [ vNum 2 ]
                            , maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 900, height 500, autosize [ asNone ], ds, si [], pr [], mk [] ]


geo8 : List Float -> Spec
geo8 inData =
    let
        ds =
            dataSource
                [ data "contours" []
                    |> transform
                        [ trContour (numSignal "volcano.width")
                            (numSignal "volcano.height")
                            [ cnValues (numSignal "volcano.values")
                            , cnSmooth (booSignal "smooth")
                            , cnThresholds (numSignal "sequence(90,195,5)")
                            ]
                        ]
                ]

        si =
            signals
                << signal "volcano"
                    [ siValue
                        (vObject
                            [ keyValue "width" (vNum 87)
                            , keyValue "height" (vNum 61)
                            , keyValue "values" (vNums inData)
                            ]
                        )
                    ]
                << signal "smooth"
                    [ siValue vTrue
                    , siBind (iRadio [ inOptions (vBoos [ True, False ]) ])
                    ]

        pr =
            projections
                << projection "myProjection"
                    [ prType (customProjection (str "identity"))
                    , prScale (numSignal "width / volcano.width")
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType scSequential
                    , scDomain (doNums (nums [ 90, 190 ]))
                    , scRange raHeatmap
                    ]

        mk =
            marks
                << mark path
                    [ mFrom [ srData (str "contours") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "value") ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mTransform [ trGeoPath "myProjection" [ gpField (field "datum") ] ]
                    ]
    in
    toVega
        [ width 960, height 673, autosize [ asNone ], ds, si [], pr [], sc [], mk [] ]


sourceExample : List Float -> Spec
sourceExample =
    geo8



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : List Float -> Spec
mySpecs inData =
    combineSpecs
        [ ( "geo1", geo1 )
        , ( "geo2", geo2 )
        , ( "geo3", geo3 )
        , ( "geo4", geo4 )
        , ( "geo5", geo5 )
        , ( "geo6", geo6 )
        , ( "geo7", geo7 )
        , ( "geo8", geo8 inData )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program () Model Msg
main =
    Browser.element
        { init = always (init "data/volcanoData.txt")
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }



-- View


view : Model -> Html Msg
view model =
    div []
        [ div [ id "specSource" ] []
        , pre []
            [ Html.text (Json.Encode.encode 2 (sourceExample model.input)) ]
        ]



-- Model (specs and input file)


type alias Model =
    { input : List Float
    , spec : Spec
    }


init : String -> ( Model, Cmd Msg )
init filename =
    ( Model [] (mySpecs []), filename |> Http.send FileRead << Http.getString )



-- Update (used for asynchronous file reading for Volcano dataset)


type Msg
    = FileRead (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FileRead (Ok input) ->
            let
                dataVals =
                    input
                        |> String.split ","
                        |> List.map (\s -> String.toFloat s |> Maybe.withDefault 0)
            in
            ( { model
                | input = dataVals
              }
            , elmToJS (mySpecs dataVals)
            )

        FileRead (Err err) ->
            ( { model | input = [] }, Cmd.none )


port elmToJS : Spec -> Cmd msg
