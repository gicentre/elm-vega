port module MarkTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


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
                << signal "startAngle" [ SiValue (vNum -0.73), SiBind (iRange [ inMin -6.28, inMax 6.28 ]) ]
                << signal "endAngle" [ SiValue (vNum 0.73), SiBind (iRange [ inMin -6.28, inMax 6.28 ]) ]
                << signal "padAngle" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 1.57 ]) ]
                << signal "innerRadius" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "outerRadius" [ SiValue (vNum 50), SiBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]
                << signal "x" [ SiValue (vNum 100) ]
                << signal "y" [ SiValue (vNum 100) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maSize [ vNum 25 ] ]
                        , enUpdate [ maX [ vSignal "x" ], maY [ vSignal "y" ] ]
                        ]
                    ]
                << mark Arc
                    [ MEncode
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
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


areaTest : Spec
areaTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (daNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (daNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "u") ])
                    , SRange (raDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "v") ])
                    , SRange (raDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "interpolate"
                    [ SiValue (vStr (markInterpolationLabel Linear))
                    , SiBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 1, inStep 0.05 ]) ]
                << signal "y2" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 20, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Area
                    [ MFrom [ srData (str "table") ]
                    , MEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xscale"), vField (fName "u") ]
                            , maY [ vScale (fName "yscale"), vField (fName "v") ]
                            , maY2 [ vScale (fName "yscale"), vSignal "y2" ]
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
        [ width 400, height 200, padding (PSize 5), ds, sc [], si [], mk [] ]


groupTest : Spec
groupTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (daNums [ 5, -5, 60 ])
                << dataColumn "y" (daNums [ 5, 70, 120 ])
                << dataColumn "w" (daNums [ 100, 40, 100 ])
                << dataColumn "h" (daNums [ 30, 40, 20 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "groupClip" [ SiValue (vBool False), SiBind (iCheckbox []) ]
                << signal "x" [ SiValue (vNum 25), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 25), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "w" [ SiValue (vNum 150), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "h" [ SiValue (vNum 150), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Group
                    [ MEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maGroupClip [ vSignal "groupClip" ]
                            , maOpacity [ vNum 1 ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    , MGroup [ ds, nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom [ srData (str "table") ]
                    , MInteractive False
                    , MEncode
                        [ enEnter
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maWidth [ vField (fName "w") ]
                            , maHeight [ vField (fName "h") ]
                            , maFill [ vStr "aliceblue" ]
                            , maStroke [ vStr "firebrick" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


imageTest : Spec
imageTest =
    let
        si =
            signals
                << signal "x" [ SiValue (vNum 75), SiBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 75), SiBind (iRange [ inMin 0, inMax 100, inStep 1 ]) ]
                << signal "w" [ SiValue (vNum 50), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "h" [ SiValue (vNum 50), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "aspect" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "align" [ SiValue (vStr "left"), SiBind (iSelect [ inOptions (vStrs [ "left", "cenEnter", "right" ]) ]) ]
                << signal "baseline" [ SiValue (vStr "top"), SiBind (iSelect [ inOptions (vStrs [ "top", "middle", "bottom" ]) ]) ]

        mk =
            marks
                << mark Image
                    [ MEncode
                        [ enEnter [ maUrl [ vStr "https://vega.github.io/images/idl-logo.png" ] ]
                        , enUpdate
                            [ maOpacity [ vNum 1 ]
                            , maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maAspect [ vSignal "aspect" ]
                            , maAlign [ vSignal "align" ]
                            , maBaseline [ vSignal "baseline" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


lineTest : Spec
lineTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (daNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (daNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "u") ])
                    , SRange (raDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "v") ])
                    , SRange (raDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "interpolate"
                    [ SiValue (vStr (markInterpolationLabel Linear))
                    , SiBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 1, inStep 0.05 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (vStr (strokeCapLabel CButt)), SiBind (iSelect [ inOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValue (vNums [ 1, 0 ]), SiBind (iSelect [ inOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Line
                    [ MFrom [ srData (str "table") ]
                    , MEncode
                        [ enEnter [ maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xscale"), vField (fName "u") ]
                            , maY [ vScale (fName "yscale"), vField (fName "v") ]
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
        [ width 400, height 200, padding (PSize 5), ds, sc [], si [], mk [] ]


pathTest : Spec
pathTest =
    let
        si =
            signals
                << signal "path" [ SiValue (vStr "M-50,-50 L50,50 V-50 L-50,50 Z"), SiBind (iText [ inPlaceholder "SVG path string" ]) ]
                << signal "x" [ SiValue (vNum 100), SiBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 100), SiBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Path
                    [ MEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maPath [ vSignal "path" ]
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
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


rectTest : Spec
rectTest =
    let
        si =
            signals
                << signal "x" [ SiValue (vNum 50), SiBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 50), SiBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "w" [ SiValue (vNum 100), SiBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "h" [ SiValue (vNum 100), SiBind (iRange [ inMin 1, inMax 100, inStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 50, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Rect
                    [ MEncode
                        [ enEnter [ maFill [ vStr "#939597" ], maStroke [ vStr "#652c90" ] ]
                        , enUpdate
                            [ maX [ vSignal "x" ]
                            , maY [ vSignal "y" ]
                            , maWidth [ vSignal "w" ]
                            , maHeight [ vSignal "h" ]
                            , maOpacity [ vNum 1 ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            , maStrokeWidth [ vSignal "strokeWidth" ]
                            , maFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , maStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


ruleTest : Spec
ruleTest =
    let
        si =
            signals
                << signal "x" [ SiValue (vNum 50), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 50), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "x2" [ SiValue (vNum 150), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y2" [ SiValue (vNum 150), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (vStr (strokeCapLabel CButt)), SiBind (iSelect [ inOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValue (vNums [ 1, 0 ]), SiBind (iSelect [ inOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Rule
                    [ MEncode
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
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


symbolTest : Spec
symbolTest =
    let
        si =
            signals
                << signal "shape"
                    [ SiValue (vStr "circle")
                    , SiBind
                        (iSelect
                            [ inOptions
                                (vStrs
                                    [ symbolLabel SymCircle
                                    , symbolLabel SymSquare
                                    , symbolLabel SymCross
                                    , symbolLabel SymDiamond
                                    , symbolLabel SymTriangleUp
                                    , symbolLabel SymTriangleDown
                                    , symbolLabel SymTriangleRight
                                    , symbolLabel SymTriangleLeft
                                    , "M-1,-1H1V1H-1Z"
                                    , "M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z"
                                    ]
                                )
                            ]
                        )
                    ]
                << signal "size" [ SiValue (vNum 2000), SiBind (iRange [ inMin 0, inMax 10000, inStep 100 ]) ]
                << signal "x" [ SiValue (vNum 100), SiBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 100), SiBind (iRange [ inMin 10, inMax 190, inStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNum 4), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ inOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MEncode
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
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


textTest : Spec
textTest =
    let
        si =
            signals
                << signal "x" [ SiValue (vNum 100), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "y" [ SiValue (vNum 100), SiBind (iRange [ inMin 0, inMax 200, inStep 1 ]) ]
                << signal "dx" [ SiValue (vNum 0), SiBind (iRange [ inMin -20, inMax 20, inStep 1 ]) ]
                << signal "angle" [ SiValue (vNum 0), SiBind (iRange [ inMin -180, inMax 180, inStep 1 ]) ]
                << signal "fontSize" [ SiValue (vNum 10), SiBind (iRange [ inMin 1, inMax 36, inStep 1 ]) ]
                << signal "limit" [ SiValue (vNum 0), SiBind (iRange [ inMin 0, inMax 150, inStep 1 ]) ]
                << signal "align" [ SiValue (vStr (hAlignLabel AlignLeft)), SiBind (iSelect [ inOptions (vStrs [ "left", "cenEnter", "right" ]) ]) ]
                << signal "baseline" [ SiValue (vStr (vAlignLabel Alphabetic)), SiBind (iSelect [ inOptions (vStrs [ "alphabetic", "top", "middle", "bottom" ]) ]) ]
                << signal "font" [ SiValue (vStr "sans-serif"), SiBind (iRadio [ inOptions (vStrs [ "sans-serif", "serif", "monospace" ]) ]) ]
                << signal "fontWeight" [ SiValue (vStr "normal"), SiBind (iRadio [ inOptions (vStrs [ "normal", "bold" ]) ]) ]
                << signal "fontStyle" [ SiValue (vStr "normal"), SiBind (iRadio [ inOptions (vStrs [ "normal", "italic" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maSize [ vNum 25 ] ]
                        , enUpdate [ maX [ vSignal "x" ], maY [ vSignal "y" ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ enEnter [ maFill [ vStr "#000" ], maText [ vStr "Text Label" ] ]
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
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (PSize 5), si [], mk [] ]


trailTest : Spec
trailTest =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (daNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (daNums [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "u") ])
                    , SRange (raDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (doData [ dDataset "table", dField (str "v") ])
                    , SRange (raDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]
                << scale "zscale"
                    [ SType ScLinear
                    , SRange (raNums [ 5, 1 ])
                    , SDomain (doData [ dDataset "table", dField (str "v") ])
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "size" [ SiValue (vNum 5), SiBind (iRange [ inMin 1, inMax 10 ]) ]

        mk =
            marks
                << mark Trail
                    [ MFrom [ srData (str "table") ]
                    , MEncode
                        [ enEnter [ maFill [ vStr "#939597" ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xscale"), vField (fName "u") ]
                            , maY [ vScale (fName "yscale"), vField (fName "v") ]
                            , maSize [ vScale (fName "zscale"), vField (fName "v"), vMultiply (vSignal "size") ]
                            , maDefined [ vSignal "defined || datum.u !== 3" ]
                            , maOpacity [ vNum 1 ]
                            ]
                        , enHover [ maOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (PSize 5), ds, sc [], si [], mk [] ]


sourceExample : Spec
sourceExample =
    groupTest



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "arcTest", arcTest )
        , ( "areaTest", areaTest )
        , ( "groupTest", groupTest )
        , ( "imageTest", imageTest )
        , ( "lineTest", lineTest )
        , ( "pathTest", pathTest )
        , ( "rectTest", rectTest )
        , ( "ruleTest", ruleTest )
        , ( "symbolTest", symbolTest )
        , ( "textTest", textTest )
        , ( "trailTest", trailTest )
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
