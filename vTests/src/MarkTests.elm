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
    pairs |> List.map (\( a, b ) -> vNumbers [ a, b ]) |> vValues


arcTest : Spec
arcTest =
    let
        si =
            signals
                << signal "startAngle" [ SiValue (vNumber -0.73), SiBind (iRange [ InMin -6.28, InMax 6.28 ]) ]
                << signal "endAngle" [ SiValue (vNumber 0.73), SiBind (iRange [ InMin -6.28, InMax 6.28 ]) ]
                << signal "padAngle" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 1.57 ]) ]
                << signal "innerRadius" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "outerRadius" [ SiValue (vNumber 50), SiBind (iRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]
                << signal "x" [ SiValue (vNumber 100) ]
                << signal "y" [ SiValue (vNumber 100) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ enter [ MFill [ vStr "firebrick" ], MSize [ vNumber 25 ] ]
                        , update [ MX [ vSignal "x" ], MY [ vSignal "y" ] ]
                        ]
                    ]
                << mark Arc
                    [ MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MStartAngle [ vSignal "startAngle" ]
                            , MEndAngle [ vSignal "endAngle" ]
                            , MInnerRadius [ vSignal "innerRadius" ]
                            , MOuterRadius [ vSignal "outerRadius" ]
                            , MCornerRadius [ vSignal "cornerRadius" ]
                            , MPadAngle [ vSignal "padAngle" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MOpacity [ vNumber 1 ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << dataColumn "u" (dNumbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (dNumbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "u") ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "v") ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "interpolate"
                    [ SiValue (vStr (markInterpolationLabel Linear))
                    , SiBind (iSelect [ InOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 1, InStep 0.05 ]) ]
                << signal "y2" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 20, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Area
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vScale (FName "xscale"), vField (FName "u") ]
                            , MY [ vScale (FName "yscale"), vField (FName "v") ]
                            , MY2 [ vScale (FName "yscale"), vSignal "y2" ]
                            , MDefined [ vSignal "defined || datum.u !== 3" ]
                            , MInterpolate [ vSignal "interpolate" ]
                            , MTension [ vSignal "tension" ]
                            , MOpacity [ vNumber 1 ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << dataColumn "x" (dNumbers [ 5, -5, 60 ])
                << dataColumn "y" (dNumbers [ 5, 70, 120 ])
                << dataColumn "w" (dNumbers [ 100, 40, 100 ])
                << dataColumn "h" (dNumbers [ 30, 40, 20 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "groupClip" [ SiValue (vBool False), SiBind (iCheckbox []) ]
                << signal "x" [ SiValue (vNumber 25), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 25), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "w" [ SiValue (vNumber 150), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "h" [ SiValue (vNumber 150), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Group
                    [ MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MWidth [ vSignal "w" ]
                            , MHeight [ vSignal "h" ]
                            , MGroupClip [ vSignal "groupClip" ]
                            , MOpacity [ vNumber 1 ]
                            , MCornerRadius [ vSignal "cornerRadius" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
                        ]
                    , MGroup [ ds, nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom [ sData (str "table") ]
                    , MInteractive False
                    , MEncode
                        [ enter
                            [ MX [ vField (FName "x") ]
                            , MY [ vField (FName "y") ]
                            , MWidth [ vField (FName "w") ]
                            , MHeight [ vField (FName "h") ]
                            , MFill [ vStr "aliceblue" ]
                            , MStroke [ vStr "firebrick" ]
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
                << signal "x" [ SiValue (vNumber 75), SiBind (iRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 75), SiBind (iRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "w" [ SiValue (vNumber 50), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "h" [ SiValue (vNumber 50), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "aspect" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "align" [ SiValue (vStr "left"), SiBind (iSelect [ InOptions (vStrs [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ SiValue (vStr "top"), SiBind (iSelect [ InOptions (vStrs [ "top", "middle", "bottom" ]) ]) ]

        mk =
            marks
                << mark Image
                    [ MEncode
                        [ enter [ MUrl [ vStr "https://vega.github.io/images/idl-logo.png" ] ]
                        , update
                            [ MOpacity [ vNumber 1 ]
                            , MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MWidth [ vSignal "w" ]
                            , MHeight [ vSignal "h" ]
                            , MAspect [ vSignal "aspect" ]
                            , MAlign [ vSignal "align" ]
                            , MBaseline [ vSignal "baseline" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << dataColumn "u" (dNumbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (dNumbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "u") ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "v") ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "interpolate"
                    [ SiValue (vStr (markInterpolationLabel Linear))
                    , SiBind (iSelect [ InOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 1, InStep 0.05 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (vStr (strokeCapLabel CButt)), SiBind (iSelect [ InOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValue (vNumbers [ 1, 0 ]), SiBind (iSelect [ InOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Line
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter [ MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vScale (FName "xscale"), vField (FName "u") ]
                            , MY [ vScale (FName "yscale"), vField (FName "v") ]
                            , MDefined [ vSignal "defined || datum.u !== 3" ]
                            , MInterpolate [ vSignal "interpolate" ]
                            , MTension [ vSignal "tension" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MStrokeDash [ vSignal "strokeDash" ]
                            , MStrokeCap [ vSignal "strokeCap" ]
                            , MOpacity [ vNumber 1 ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << signal "path" [ SiValue (vStr "M-50,-50 L50,50 V-50 L-50,50 Z"), SiBind (iText [ InPlaceholder "SVG path string" ]) ]
                << signal "x" [ SiValue (vNumber 100), SiBind (iRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 100), SiBind (iRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Path
                    [ MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MPath [ vSignal "path" ]
                            , MOpacity [ vNumber 1 ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << signal "x" [ SiValue (vNumber 50), SiBind (iRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 50), SiBind (iRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "w" [ SiValue (vNumber 100), SiBind (iRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "h" [ SiValue (vNumber 100), SiBind (iRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Rect
                    [ MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MWidth [ vSignal "w" ]
                            , MHeight [ vSignal "h" ]
                            , MOpacity [ vNumber 1 ]
                            , MCornerRadius [ vSignal "cornerRadius" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << signal "x" [ SiValue (vNumber 50), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 50), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "x2" [ SiValue (vNumber 150), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y2" [ SiValue (vNumber 150), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (vStr (strokeCapLabel CButt)), SiBind (iSelect [ InOptions (vStrs [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValue (vNumbers [ 1, 0 ]), SiBind (iSelect [ InOptions (toValue [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Rule
                    [ MEncode
                        [ enter [ MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MX2 [ vSignal "x2" ]
                            , MY2 [ vSignal "y2" ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MStrokeDash [ vSignal "strokeDash" ]
                            , MStrokeCap [ vSignal "strokeCap" ]
                            , MOpacity [ vNumber 1 ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                            [ InOptions
                                (vStrs
                                    [ "circle"
                                    , "square"
                                    , "cross"
                                    , "diamond"
                                    , "triangle-up"
                                    , "triangle-down"
                                    , "triangle-right"
                                    , "triangle-left"
                                    , "M-1,-1H1V1H-1Z"
                                    , "M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z"
                                    ]
                                )
                            ]
                        )
                    ]
                << signal "size" [ SiValue (vNumber 2000), SiBind (iRange [ InMin 0, InMax 10000, InStep 100 ]) ]
                << signal "x" [ SiValue (vNumber 100), SiBind (iRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 100), SiBind (iRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (vNumber 4), SiBind (iRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (vStr "both"), SiBind (iRadio [ InOptions (vStrs [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MEncode
                        [ enter [ MFill [ vStr "#939597" ], MStroke [ vStr "#652c90" ] ]
                        , update
                            [ MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MSize [ vSignal "size" ]
                            , MShape [ vSignal "shape" ]
                            , MOpacity [ vNumber 1 ]
                            , MStrokeWidth [ vSignal "strokeWidth" ]
                            , MFillOpacity [ vSignal "color === 'fill' || color === 'both' ? 1 : 0" ]
                            , MStrokeOpacity [ vSignal "color === 'stroke' || color === 'both' ? 1 : 0" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << signal "x" [ SiValue (vNumber 100), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (vNumber 100), SiBind (iRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "dx" [ SiValue (vNumber 0), SiBind (iRange [ InMin -20, InMax 20, InStep 1 ]) ]
                << signal "angle" [ SiValue (vNumber 0), SiBind (iRange [ InMin -180, InMax 180, InStep 1 ]) ]
                << signal "fontSize" [ SiValue (vNumber 10), SiBind (iRange [ InMin 1, InMax 36, InStep 1 ]) ]
                << signal "limit" [ SiValue (vNumber 0), SiBind (iRange [ InMin 0, InMax 150, InStep 1 ]) ]
                << signal "align" [ SiValue (vStr (hAlignLabel AlignLeft)), SiBind (iSelect [ InOptions (vStrs [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ SiValue (vStr (vAlignLabel Alphabetic)), SiBind (iSelect [ InOptions (vStrs [ "alphabetic", "top", "middle", "bottom" ]) ]) ]
                << signal "font" [ SiValue (vStr "sans-serif"), SiBind (iRadio [ InOptions (vStrs [ "sans-serif", "serif", "monospace" ]) ]) ]
                << signal "fontWeight" [ SiValue (vStr "normal"), SiBind (iRadio [ InOptions (vStrs [ "normal", "bold" ]) ]) ]
                << signal "fontStyle" [ SiValue (vStr "normal"), SiBind (iRadio [ InOptions (vStrs [ "normal", "italic" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ enter [ MFill [ vStr "firebrick" ], MSize [ vNumber 25 ] ]
                        , update [ MX [ vSignal "x" ], MY [ vSignal "y" ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ enter [ MFill [ vStr "#000" ], MText [ vStr "Text Label" ] ]
                        , update
                            [ MOpacity [ vNumber 1 ]
                            , MX [ vSignal "x" ]
                            , MY [ vSignal "y" ]
                            , MdX [ vSignal "dx" ]
                            , MAngle [ vSignal "angle" ]
                            , MAlign [ vSignal "align" ]
                            , MBaseline [ vSignal "baseline" ]
                            , MFont [ vSignal "font" ]
                            , MFontSize [ vSignal "fontSize" ]
                            , MFontStyle [ vSignal "fontStyle" ]
                            , MFontWeight [ vSignal "fontWeight" ]
                            , MLimit [ vSignal "limit" ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
                << dataColumn "u" (dNumbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (dNumbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "u") ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "v") ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice NTrue
                    ]
                << scale "zscale"
                    [ SType ScLinear
                    , SRange (RNumbers [ 5, 1 ])
                    , SDomain (DoData [ dDataset "table", dField (str "v") ])
                    ]

        si =
            signals
                << signal "defined" [ SiValue (vBool True), SiBind (iCheckbox []) ]
                << signal "size" [ SiValue (vNumber 5), SiBind (iRange [ InMin 1, InMax 10 ]) ]

        mk =
            marks
                << mark Trail
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter [ MFill [ vStr "#939597" ] ]
                        , update
                            [ MX [ vScale (FName "xscale"), vField (FName "u") ]
                            , MY [ vScale (FName "yscale"), vField (FName "v") ]
                            , MSize [ vScale (FName "zscale"), vField (FName "v"), vMultiply (vSignal "size") ]
                            , MDefined [ vSignal "defined || datum.u !== 3" ]
                            , MOpacity [ vNumber 1 ]
                            ]
                        , hover [ MOpacity [ vNumber 0.5 ] ]
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
