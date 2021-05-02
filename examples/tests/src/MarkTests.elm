port module MarkTests exposing (elmToJS)

import Browser
import Dict
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


dPath : String
dPath =
    "https://cdn.jsdelivr.net/npm/vega-datasets@2.1/data/"



{- These tests converted from the examples under 'Marks' on the offical Vega site:
   https://vega.github.io/vega/docs/marks/
-}


{-| Convenience function for generating a list of 2-element DataValues lists used
when generating dashed line arrays.
-}
toValue : List ( Float, Float ) -> Value
toValue pairs =
    pairs |> List.map (\( a, b ) -> vNums [ a, b ]) |> vValues


arcTest : Spec
arcTest =
    let
        si =
            signals
                << signal "startAngle" [ siValue (vNum -0.73), siBind (iRange [ inMin -6.28, inMax 6.28 ]) ]
                << signal "endAngle" [ siValue (vNum 0.73), siBind (iRange [ inMin -6.28, inMax 6.28 ]) ]
                << signal "padAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 1.57 ]) ]
                << signal "innerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "outerRadius" [ siValue (vNum 50), siBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]
                << signal "x" [ siValue (vNum 100) ]
                << signal "y" [ siValue (vNum 100) ]

        mk =
            marks
                << mark symbol
                    [ mInteractive false
                    , mEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maSize [ vNum 25 ] ]
                        , enUpdate [ maX [ vSignal "x" ], maY [ vSignal "y" ] ]
                        ]
                    ]
                << mark arc
                    [ mEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maStartAngle [ vSignal "startAngle" ]
                            , maEndAngle [ vSignal "endAngle" ]
                            , maInnerRadius [ vSignal "innerRadius" ]
                            , maOuterRadius [ vSignal "outerRadius" ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            , maPadAngle [ vSignal "padAngle" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maOpacity [ vNum 1 ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


areaTest : Spec
areaTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (vNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (vNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "u") ])
                    , scRange raWidth
                    , scZero false
                    ]
                << scale "yscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "v") ])
                    , scRange raHeight
                    , scZero true
                    , scNice niTrue
                    ]

        si =
            signals
                << signal "defined" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "interpolate"
                    [ siValue (markInterpolationValue miLinear)
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 1, inStep 0.05 ]) ]
                << signal "y2" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 20, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark area
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vScale "xscale", vField (field "u") ]
                            , maY [ vScale "yscale", vField (field "v") ]
                            , maY2 [ vScale "yscale", vSignal "y2" ]
                            , maDefined [ vSignal "defined || datum.u !== 3" ]
                            , maInterpolate [ vSignal "interpolate" ]
                            , maTension [ vSignal "tension" ]
                            , maOpacity [ vNum 1 ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, sc [], si [], mk [] ]


groupTest : Spec
groupTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (vNums [ 5, -5, 60 ])
                << dataColumn "y" (vNums [ 5, 70, 120 ])
                << dataColumn "w" (vNums [ 100, 40, 100 ])
                << dataColumn "h" (vNums [ 30, 40, 20 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "groupClip" [ siValue vFalse, siBind (iCheckbox []) ]
                << signal "x" [ siValue (vNum 25), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 25), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "w" [ siValue (vNum 150), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "h" [ siValue (vNum 150), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "topLeft" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusTopLeft" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "topRight" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusTopRight" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "bottomLeft" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusBottomLeft" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "bottomRight" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusBottomRight" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10 ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark group
                    [ mEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maGroupClip [ vSignal "groupClip" ]
                            , maOpacity [ vNum 1 ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            , maCornerRadiusTopLeft [ vSignal "topLeft? cornerRadiusTopLeft : null" ]
                            , maCornerRadiusTopRight [ vSignal "topRight? cornerRadiusTopRight : null" ]
                            , maCornerRadiusBottomLeft [ vSignal "bottomLeft? cornerRadiusBottomLeft: null" ]
                            , maCornerRadiusBottomRight [ vSignal "bottomRight? cornerRadiusBottomRight: null" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    , mGroup [ ds, nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark rect
                    [ mFrom [ srData (str "table") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            , maWidth [ vField (field "w") ]
                            , maHeight [ vField (field "h") ]
                            , maFill [ vStr "aliceblue" ]
                            , maStroke [ vStr "firebrick" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


imageTest : Spec
imageTest =
    let
        si =
            signals
                << signal "x" [ siValue (vNum 75), siBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 75), siBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "w" [ siValue (vNum 50), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "h" [ siValue (vNum 50), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "aspect" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "smooth" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "align" [ siValue (vStr "left"), siBind (iSelect [ inOptions (vStrs [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ siValue (vStr "top"), siBind (iSelect [ inOptions (vStrs [ "top", "middle", "bottom" ]) ]) ]

        mk =
            marks
                << mark image
                    [ mEncode
                        [ enEnter [ maUrl [ vStr "https://vega.github.io/images/idl-logo.png" ] ]
                        , enUpdate
                            [ maOpacity [ vNum 1 ]
                            , maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maAspect [ vSignal "aspect" ]
                            , maSmooth [ vSignal "smooth" ]
                            , maAlign [ vSignal "align" ]
                            , maBaseline [ vSignal "baseline" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


lineTest : Spec
lineTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (vNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (vNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "u") ])
                    , scRange raWidth
                    , scZero false
                    ]
                << scale "yscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "v") ])
                    , scRange raHeight
                    , scZero true
                    , scNice niTrue
                    ]

        si =
            signals
                << signal "defined" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "interpolate"
                    [ siValue (markInterpolationValue miLinear)
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 1, inStep 0.05 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "strokeCap" [ siValue (strokeCapValue caButt), siBind (iSelect [ inOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ siValue (vNums [ 1, 0 ]), siBind (iSelect [ inOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter [ maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vScale "xscale", vField (field "u") ]
                            , maY [ vScale "yscale", vField (field "v") ]
                            , maDefined [ vSignal "defined || datum.u !== 3" ]
                            , maInterpolate [ vSignal "interpolate" ]
                            , maTension [ vSignal "tension" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maStrokeDash [ vSignal "strokeDash" ]
                            , maStrokeCap [ vSignal "strokeCap" ]
                            , maOpacity [ vNum 1 ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, sc [], si [], mk [] ]


pathTest : Spec
pathTest =
    let
        si =
            signals
                << signal "path" [ siValue (vStr "M-50,-50 L50,50 V-50 L-50,50 Z"), siBind (iText [ inPlaceholder "SVG path string" ]) ]
                << signal "x" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "scaleX" [ siValue (vNum 1), siBind (iRange [ inMin 0.1, inMax 2, inStep 0.01 ]) ]
                << signal "scaleY" [ siValue (vNum 1), siBind (iRange [ inMin 0.1, inMax 2, inStep 0.01 ]) ]
                << signal "angle" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "strokeCap" [ siValue (vStr "butt"), siBind (iRadio [ inOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeJoin" [ siValue (vStr "miter"), siBind (iRadio [ inOptions (vStrs [ "bevel", "miter", "round" ]) ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark path
                    [ mEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maScaleX [ vSignal "scaleX" ]
                            , maScaleY [ vSignal "scaleY" ]
                            , maPath [ vSignal "path" ]
                            , maOpacity [ vNum 1 ]
                            , maAngle [ vSignal "angle" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maStrokeCap [ vSignal "strokeCap" ]
                            , maStrokeJoin [ vSignal "strokeJoin" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


shapeTest : Spec
shapeTest =
    let
        projs =
            inOptions <|
                vStrs
                    [ "albers"
                    , "albersUsa"
                    , "azimuthalEqualArea"
                    , "azimuthalEquidistant"
                    , "conicConformal"
                    , "conicEqualArea"
                    , "conicEquidistant"
                    , "equalEarth"
                    , "equirectangular"
                    , "gnomonic"
                    , "mercator"
                    , "orthographic"
                    , "stereographic"
                    , "transverseMercator"
                    ]

        ds =
            dataSource
                [ data "world"
                    [ daUrl (str (dPath ++ "world-110m.json")), daFormat [ topojsonFeature (str "countries") ] ]
                    |> transform [ trFilter (expr "pType !== 'albersUsa' || datum.id === 840") ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType (customProjection (strSignal "pType"))
                    , prClipAngle (numSignal "pClipAngle")
                    , prScale (numSignal "pScale")
                    , prRotate (numSignals [ "rotate0", "rotate1", "rotate2" ])
                    , prCenter (numSignals [ "center0", "center1" ])
                    , prTranslate (numSignals [ "translate0", "translate1" ])
                    ]

        si =
            signals
                << signal "pType" [ siValue (vStr "mercator"), siBind (iSelect [ projs ]) ]
                << signal "pScale" [ siValue (vNum 72), siBind (iRange [ inMin 50, inMax 1000, inStep 1 ]) ]
                << signal "pClipAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 90, inStep 1 ]) ]
                << signal "rotate0" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "rotate1" [ siValue (vNum 0), siBind (iRange [ inMin -90, inMax 90, inStep 1 ]) ]
                << signal "rotate2" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "center0" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "center1" [ siValue (vNum 0), siBind (iRange [ inMin -90, inMax 90, inStep 1 ]) ]
                << signal "translate0" [ siUpdate "width /2" ]
                << signal "translate1" [ siUpdate "height /2" ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "graticule") ]
                    , mEncode
                        [ enUpdate
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "#ddd" ]
                            , maFill [ vNull ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "world") ]
                    , mEncode
                        [ enUpdate
                            [ maStrokeWidth [ vNum 0.5 ]
                            , maStroke [ vStr "#bbb" ]
                            , maFill [ vStr "#000" ]
                            , maZIndex [ vNum 0 ]
                            ]
                        , enHover
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 432, height 240, autosize [ asNone ], ds, pr [], si [], mk [] ]


rectTest : Spec
rectTest =
    let
        si =
            signals
                << signal "x" [ siValue (vNum 50), siBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 50), siBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "w" [ siValue (vNum 100), siBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "h" [ siValue (vNum 100), siBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "topLeft" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusTopLeft" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "topRight" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusTopRight" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "bottomLeft" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusBottomLeft" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "bottomRight" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "cornerRadiusBottomRight" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10 ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark rect
                    [ mEncode
                        [ enEnter
                            [ maStroke [ vStr "#652c90" ]
                            , maFill
                                [ vGradient grRadial
                                    [ grStops [ ( num 0.1, "#652c90" ), ( num 1, "#939597" ) ]
                                    , grX1 (num 0.2)
                                    , grX2 (num 0.3)
                                    , grY1 (num 0.8)
                                    , grY2 (num 0.7)
                                    , grR1 (num 0.3)
                                    , grR2 (num 0.8)
                                    ]
                                ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maOpacity [ vNum 1 ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            , maCornerRadiusTopLeft [ vSignal "topLeft? cornerRadiusTopLeft : null" ]
                            , maCornerRadiusTopRight [ vSignal "topRight? cornerRadiusTopRight : null" ]
                            , maCornerRadiusBottomLeft [ vSignal "bottomLeft? cornerRadiusBottomLeft: null" ]
                            , maCornerRadiusBottomRight [ vSignal "bottomRight? cornerRadiusBottomRight: null" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


ruleTest : Spec
ruleTest =
    let
        si =
            signals
                << signal "x" [ siValue (vNum 50), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 50), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "x2" [ siValue (vNum 150), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y2" [ siValue (vNum 150), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "strokeCap" [ siValue (strokeCapValue caButt), siBind (iSelect [ inOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ siValue (vNums [ 1, 0 ]), siBind (iSelect [ inOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark rule
                    [ mEncode
                        [ enEnter [ maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maX2 [ vSignal "x2" ]
                            , maY2 [ vSignal "y2" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maStrokeDash [ vSignal "strokeDash" ]
                            , maStrokeCap [ vSignal "strokeCap" ]
                            , maOpacity [ vNum 1 ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


symbolTest : Spec
symbolTest =
    let
        si =
            signals
                << signal "shape"
                    [ siValue (vStr "circle")
                    , siBind
                        (iSelect
                            [ inOptions
                                (vValues
                                    [ symbolValue symCircle
                                    , symbolValue symSquare
                                    , symbolValue symCross
                                    , symbolValue symDiamond
                                    , symbolValue symTriangleUp
                                    , symbolValue symTriangleDown
                                    , symbolValue symTriangleRight
                                    , symbolValue symTriangleLeft
                                    , symbolValue (symPath "M-1,-1H1V1H-1Z")
                                    , symbolValue (symPath "M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z")
                                    ]
                                )
                            ]
                        )
                    ]
                << signal "size" [ siValue (vNum 2000), siBind (iRange [ inMin 0, inMax 10000, inStep 100 ]) ]
                << signal "x" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "strokeWidth" [ siValue (vNum 4), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ siValue (vStr "both"), siBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark symbol
                    [ mEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maSize [ vSignal "size" ]
                            , maShape [ vSignal "shape" ]
                            , maOpacity [ vNum 1 ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


textTest : Spec
textTest =
    let
        si =
            signals
                << signal "x" [ siValue (vNum 100), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ siValue (vNum 100), siBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "dx" [ siValue (vNum 0), siBind (iRange [ inMin -20, inMax 20, inStep 1 ]) ]
                << signal "angle" [ siValue (vNum 0), siBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "fontSize" [ siValue (vNum 10), siBind (iRange [ inMin 1, inMax 36, inStep 1 ]) ]
                << signal "limit" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 150, inStep 1 ]) ]
                << signal "align" [ siValue hLeft, siBind (iSelect [ inOptions (vStrs [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ siValue vAlphabetic, siBind (iSelect [ inOptions (vStrs [ "alphabetic", "top", "middle", "bottom" ]) ]) ]
                << signal "font" [ siValue (vStr "sans-serif"), siBind (iRadio [ inOptions (vStrs [ "sans-serif", "serif", "monospace" ]) ]) ]
                << signal "fontWeight" [ siValue (vStr "normal"), siBind (iRadio [ inOptions (vStrs [ "normal", "bold" ]) ]) ]
                << signal "fontStyle" [ siValue (vStr "normal"), siBind (iRadio [ inOptions (vStrs [ "normal", "italic" ]) ]) ]

        mk =
            marks
                << mark symbol
                    [ mInteractive false
                    , mEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maSize [ vNum 25 ] ]
                        , enUpdate [ maX [ vSignal "x" ], maY [ vSignal "y" ] ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maFill [ vStr "#000" ]
                            , maText [ vStr "Text Label\nsplit over\nthree lines" ]
                            , maLineBreak [ vStr "\n" ]
                            ]
                        , enUpdate
                            [ maOpacity [ vNum 1 ]
                            , maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maDx [ vSignal "dx" ]
                            , maAngle [ vSignal "angle" ]
                            , maAlign [ vSignal "align" ]
                            , maBaseline [ vSignal "baseline" ]
                            , maFont [ vSignal "font" ]
                            , maFontSize [ vSignal "fontSize" ]
                            , maFontStyle [ vSignal "fontStyle" ]
                            , maFontWeight [ vSignal "fontWeight" ]
                            , maLimit [ vSignal "limit" ]
                            , maLineHeight [ vSignal "fontSize*1.2" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, si [], mk [] ]


trailTest : Spec
trailTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (vNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (vNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "u") ])
                    , scRange raWidth
                    , scZero false
                    ]
                << scale "yscale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "v") ])
                    , scRange raHeight
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "zscale"
                    [ scType scLinear
                    , scRange (raNums [ 5, 1 ])
                    , scDomain (doData [ daDataset "table", daField (field "v") ])
                    ]

        si =
            signals
                << signal "defined" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "size" [ siValue (vNum 5), siBind (iRange [ inMin 1, inMax 10 ]) ]

        mk =
            marks
                << mark trail
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "#939597" ] ]
                        , enUpdate
                            [ maX [ vScale "xscale", vField (field "u") ]
                            , maY [ vScale "yscale", vField (field "v") ]
                            , maSize [ vScale "zscale", vField (field "v"), vMultiply (vSignal "size") ]
                            , maDefined [ vSignal "defined || datum.u !== 3" ]
                            , maOpacity [ vNum 1 ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, sc [], si [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "arcTest", arcTest )
    , ( "areaTest", areaTest )
    , ( "groupTest", groupTest )
    , ( "imageTest", imageTest )
    , ( "lineTest", lineTest )
    , ( "pathTest", pathTest )
    , ( "shapeTest", shapeTest )
    , ( "rectTest", rectTest )
    , ( "ruleTest", ruleTest )
    , ( "symbolTest", symbolTest )
    , ( "textTest", textTest )
    , ( "trailTest", trailTest )
    ]



{- ---------------------------------------------------------------------------
   BOILERPLATE: NO NEED TO EDIT

   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   It allows the source code of any of the generated specs to be selected from
   a drop-down list. Useful for viewin specs that might generate invalid Vega-Lite.
-}


type Msg
    = NewSource String


main : Program () Spec Msg
main =
    Browser.element
        { init = always ( Json.Encode.null, specs |> combineSpecs |> elmToJS )
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


view : Spec -> Html Msg
view spec =
    Html.div []
        [ Html.select [ Html.Events.onInput NewSource ]
            (( "Select source", Json.Encode.null )
                :: specs
                |> List.map (\( s, _ ) -> Html.option [ Html.Attributes.value s ] [ Html.text s ])
            )
        , Html.div [ Html.Attributes.id "specSource" ] []
        , if spec == Json.Encode.null then
            Html.div [] []

          else
            Html.pre [] [ Html.text (Json.Encode.encode 2 spec) ]
        ]


update : Msg -> Spec -> ( Spec, Cmd Msg )
update msg _ =
    case msg of
        NewSource srcName ->
            ( specs |> Dict.fromList |> Dict.get srcName |> Maybe.withDefault Json.Encode.null, Cmd.none )


port elmToJS : Spec -> Cmd msg
