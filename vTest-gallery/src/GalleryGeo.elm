port module GalleryGeo exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Http
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


standardProjections : Value
standardProjections =
    List.map projectionLabel
        [ Albers
        , AlbersUsa
        , AzimuthalEqualArea
        , AzimuthalEquidistant
        , ConicConformal
        , ConicEqualArea
        , ConicEquidistant
        , Equirectangular
        , Gnomonic
        , Mercator
        , Orthographic
        , Stereographic
        , TransverseMercator
        ]
        |> vStrs


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
                        , trFormula "geoCentroid('myProjection', datum.geo)" "myCentroid" AlwaysUpdate
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
                            , maX [ vField (fName "myCentroid[0]") ]
                            , maY [ vField (fName "myCentroid[1]") ]
                            , maTooltip [ vSignal "'Obesity Rate: ' + format(datum.rate, '.1%')" ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsStatic (boo True)
                            , fsForces
                                [ foCollide (numExpr (expr "1 + sqrt(datum.size) / 2")) []
                                , foX (str "datum.myCentroid[0]") []
                                , foY (str "datum.myCentroid[1]") []
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
                    [ siValue (projectionLabel Mercator |> vStr)
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
                [ data "sphere" [ DaSphere ]
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
                    , prRotate (numList [ numSignal "pRotate0", numSignal "pRotate1", num 0 ])
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
                            [ projectionLabel AzimuthalEquidistant
                            , projectionLabel ConicConformal
                            , projectionLabel Gnomonic
                            , projectionLabel Mercator
                            , projectionLabel Stereographic
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
                [ data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
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
                        [ evHandler (esObject [ esType Wheel, esConsume True ])
                            [ evUpdate "clamp(myScale * pow(1.0005, -event.deltaY * pow(16, event.deltaMode)), 150, 3000)" ]
                        ]
                    ]
                << signal "angles"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler (esObject [ esType MouseDown ]) [ evUpdate "[rotateX,centerY]" ] ]
                    ]
                << signal "cloned"
                    [ siValue vNull
                    , siOn [ evHandler (esObject [ esType MouseDown ]) [ evUpdate "copy('myProjection')" ] ]
                    ]
                << signal "start"
                    [ siValue vNull
                    , siOn [ evHandler (esObject [ esType MouseDown ]) [ evUpdate "invert(cloned, xy())" ] ]
                    ]
                << signal "drag"
                    [ siValue vNull
                    , siOn
                        [ evHandler
                            (esObject
                                [ esBetween [ esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                ]
                            )
                            [ evUpdate "invert(cloned, xy())" ]
                        ]
                    ]
                << signal "delta"
                    [ siValue vNull
                    , siOn [ evHandler (esSelector (strSignal "drag")) [ evUpdate "[drag[0] - start[0], start[1] - drag[1]]" ] ]
                    ]
                << signal "rotateX"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (strSignal "drag")) [ evUpdate "angles[0] + delta[0]" ] ]
                    ]
                << signal "centerY"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (strSignal "drag")) [ evUpdate "clamp(angles[1] + delta[1], -60, 60)" ] ]
                    ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Mercator
                    , prScale (numSignal "myScale")
                    , prRotate (numList [ numSignal "rotateX", num 0, num 0 ])
                    , prCenter (numList [ num 0, numSignal "centerY" ])
                    , prTranslate (numSignals [ "tx", "ty" ])
                    ]

        mk =
            marks
                << mark Shape
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
                << mark Shape
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
        [ width 900, height 500, autosize [ ANone ], ds, si [], pr [], mk [] ]


geo7 : Spec
geo7 =
    let
        ds =
            dataSource
                [ data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat (topojsonFeature "countries")
                    ]
                    |> transform
                        [ trFormula "geoCentroid('projection1', datum)" "myCentroid" AlwaysUpdate
                        , trFormula "geoArea('projection1', datum)" "area1" AlwaysUpdate
                        , trFormula "geoArea('projection2', datum)" "area2" AlwaysUpdate
                        ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                ]

        si =
            signals
                << signal "baseProjection"
                    [ siValue (projectionLabel AzimuthalEqualArea |> vStr)
                    , siBind (iSelect [ inOptions standardProjections ])
                    ]
                << signal "altProjection"
                    [ siValue (projectionLabel Mercator |> vStr)
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
                    [ prType (prCustom (strSignal "baseProjection"))
                    , prScale (num 150)
                    , prRotate (nums [ 0, 0, 0 ])
                    , prCenter (nums [ 0, 0 ])
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]
                << projection "projection2"
                    [ prType (prCustom (strSignal "altProjection"))
                    , prScale (num 150)
                    , prRotate (nums [ 0, 0, 0 ])
                    , prCenter (nums [ 0, 0 ])
                    , prTranslate (numSignals [ "width / 2", "height / 2" ])
                    ]

        mk =
            marks
                << mark Shape
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
                << mark Symbol
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vSignal "altColor" ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFillOpacity [ vSignal "myOpacity" ]
                            , maZIndex [ vNum 0 ]
                            , maX [ vField (fName "myCentroid[0]") ]
                            , maY [ vField (fName "myCentroid[1]") ]
                            , maSize [ vField (fName "area2"), vMultiply (vSignal "scaleFactor") ]
                            ]
                        , enHover
                            [ maStrokeWidth [ vNum 2 ]
                            , maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maFill [ vSignal "baseColor" ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFillOpacity [ vSignal "myOpacity" ]
                            , maZIndex [ vNum 0 ]
                            , maX [ vField (fName "myCentroid[0]") ]
                            , maY [ vField (fName "myCentroid[1]") ]
                            , maSize [ vField (fName "area1"), vMultiply (vSignal "scaleFactor") ]
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
        [ width 900, height 500, autosize [ ANone ], ds, si [], pr [], mk [] ]


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
                    [ siValue (vBoo True)
                    , siBind (iRadio [ inOptions (vBoos [ True, False ]) ])
                    ]

        pr =
            projections
                << projection "myProjection"
                    [ prType (prCustom (str "identity"))
                    , prScale (numSignal "width / volcano.width")
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScSequential
                    , scDomain (doNums (nums [ 90, 190 ]))
                    , scRange (raDefault RHeatmap)
                    ]

        mk =
            marks
                << mark Path
                    [ mFrom [ srData (str "contours") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale (fName "cScale"), vField (fName "value") ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mTransform [ trGeoPath "myProjection" [ gpField (str "datum") ] ]
                    ]
    in
    toVega
        [ width 960, height 673, autosize [ ANone ], ds, si [], pr [], sc [], mk [] ]


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


main : Program Never Model Msg
main =
    Html.program
        { init = init "data/volcanoData.txt"
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
                        |> List.map (\s -> String.toFloat s |> Result.withDefault 0)
            in
            ( { model
                | input = dataVals
              }
            , elmToJS (mySpecs dataVals)
            )

        FileRead (Err err) ->
            ( { model | input = [] }, Cmd.none ) |> Debug.log (toString err)


port elmToJS : Spec -> Cmd msg
