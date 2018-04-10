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
toValues : List ( Float, Float ) -> DataValues
toValues pairs =
    pairs |> List.map (\( a, b ) -> Numbers [ a, b ]) |> DataValues


arcTest : Spec
arcTest =
    let
        si =
            signals
                << signal "startAngle" [ SiValue (Number -0.73), SiBind (IRange [ InMin -6.28, InMax 6.28 ]) ]
                << signal "endAngle" [ SiValue (Number 0.73), SiBind (IRange [ InMin -6.28, InMax 6.28 ]) ]
                << signal "padAngle" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 1.57 ]) ]
                << signal "innerRadius" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "outerRadius" [ SiValue (Number 50), SiBind (IRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]
                << signal "x" [ SiValue (Number 100) ]
                << signal "y" [ SiValue (Number 100) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ Enter [ MFill [ VString "firebrick" ], MSize [ VNumber 25 ] ]
                        , Update [ MX [ VSignal (SName "x") ], MY [ VSignal (SName "y") ] ]
                        ]
                    ]
                << mark Arc
                    [ MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MStartAngle [ VSignal (SName "startAngle") ]
                            , MEndAngle [ VSignal (SName "endAngle") ]
                            , MInnerRadius [ VSignal (SName "innerRadius") ]
                            , MOuterRadius [ VSignal (SName "outerRadius") ]
                            , MCornerRadius [ VSignal (SName "cornerRadius") ]
                            , MPadAngle [ VSignal (SName "padAngle") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MOpacity [ VNumber 1 ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << dataColumn "u" (Numbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (Numbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "u" ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "v" ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice (IsNice True)
                    ]

        si =
            signals
                << signal "defined" [ SiValue (Boolean True), SiBind (ICheckbox []) ]
                << signal "interpolate"
                    [ SiValue (markInterpolationLabel Linear |> Str)
                    , SiBind (ISelect [ InOptions (Strings [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 1, InStep 0.05 ]) ]
                << signal "y2" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 20, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Area
                    [ MFrom (SData "table")
                    , MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VScale (FName "xscale"), VField (FName "u") ]
                            , MY [ VScale (FName "yscale"), VField (FName "v") ]
                            , MY2 [ VScale (FName "yscale"), VSignal (SName "y2") ]
                            , MDefined [ VSignal (SExpr "defined || datum.u !== 3") ]
                            , MInterpolate [ VSignal (SName "interpolate") ]
                            , MTension [ VSignal (SName "tension") ]
                            , MOpacity [ VNumber 1 ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << dataColumn "x" (Numbers [ 5, -5, 60 ])
                << dataColumn "y" (Numbers [ 5, 70, 120 ])
                << dataColumn "w" (Numbers [ 100, 40, 100 ])
                << dataColumn "h" (Numbers [ 30, 40, 20 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "groupClip" [ SiValue (Boolean False), SiBind (ICheckbox []) ]
                << signal "x" [ SiValue (Number 25), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 25), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "w" [ SiValue (Number 150), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "h" [ SiValue (Number 150), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Group
                    [ MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MWidth [ VSignal (SName "w") ]
                            , MHeight [ VSignal (SName "h") ]
                            , MGroupClip [ VSignal (SName "groupClip") ]
                            , MOpacity [ VNumber 1 ]
                            , MCornerRadius [ VSignal (SName "cornerRadius") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
                        ]
                    , MGroup [ ds, nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom (SData "table")
                    , MInteractive False
                    , MEncode
                        [ Enter
                            [ MX [ VField (FName "x") ]
                            , MY [ VField (FName "y") ]
                            , MWidth [ VField (FName "w") ]
                            , MHeight [ VField (FName "h") ]
                            , MFill [ VString "aliceblue" ]
                            , MStroke [ VString "firebrick" ]
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
                << signal "x" [ SiValue (Number 75), SiBind (IRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 75), SiBind (IRange [ InMin 0, InMax 100, InStep 1 ]) ]
                << signal "w" [ SiValue (Number 50), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "h" [ SiValue (Number 50), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "aspect" [ SiValue (Boolean True), SiBind (ICheckbox []) ]
                << signal "align" [ SiValue (Str "left"), SiBind (ISelect [ InOptions (Strings [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ SiValue (Str "top"), SiBind (ISelect [ InOptions (Strings [ "top", "middle", "bottom" ]) ]) ]

        mk =
            marks
                << mark Image
                    [ MEncode
                        [ Enter [ MUrl [ VString "https://vega.github.io/images/idl-logo.png" ] ]
                        , Update
                            [ MOpacity [ VNumber 1 ]
                            , MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MWidth [ VSignal (SName "w") ]
                            , MHeight [ VSignal (SName "h") ]
                            , MAspect [ VSignal (SName "aspect") ]
                            , MAlign [ VSignal (SName "align") ]
                            , MBaseline [ VSignal (SName "baseline") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << dataColumn "u" (Numbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (Numbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "u" ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "v" ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice (IsNice True)
                    ]

        si =
            signals
                << signal "defined" [ SiValue (Boolean True), SiBind (ICheckbox []) ]
                << signal "interpolate"
                    [ SiValue (markInterpolationLabel Linear |> Str)
                    , SiBind (ISelect [ InOptions (Strings [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]
                << signal "tension" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 1, InStep 0.05 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (strokeCapLabel CButt |> Str), SiBind (ISelect [ InOptions (Strings [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValues (Numbers [ 1, 0 ]), SiBind (ISelect [ InOptions (toValues [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Line
                    [ MFrom (SData "table")
                    , MEncode
                        [ Enter [ MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VScale (FName "xscale"), VField (FName "u") ]
                            , MY [ VScale (FName "yscale"), VField (FName "v") ]
                            , MDefined [ VSignal (SExpr "defined || datum.u !== 3") ]
                            , MInterpolate [ VSignal (SName "interpolate") ]
                            , MTension [ VSignal (SName "tension") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MStrokeDash [ VSignal (SName "strokeDash") ]
                            , MStrokeCap [ VSignal (SName "strokeCap") ]
                            , MOpacity [ VNumber 1 ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << signal "path" [ SiValue (Str "M-50,-50 L50,50 V-50 L-50,50 Z"), SiBind (IText [ InPlaceholder "SVG path string" ]) ]
                << signal "x" [ SiValue (Number 100), SiBind (IRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 100), SiBind (IRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Path
                    [ MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MPath [ VSignal (SName "path") ]
                            , MOpacity [ VNumber 1 ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << signal "x" [ SiValue (Number 50), SiBind (IRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 50), SiBind (IRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "w" [ SiValue (Number 100), SiBind (IRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "h" [ SiValue (Number 100), SiBind (IRange [ InMin 1, InMax 100, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 50, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Rect
                    [ MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MWidth [ VSignal (SName "w") ]
                            , MHeight [ VSignal (SName "h") ]
                            , MOpacity [ VNumber 1 ]
                            , MCornerRadius [ VSignal (SName "cornerRadius") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << signal "x" [ SiValue (Number 50), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 50), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "x2" [ SiValue (Number 150), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y2" [ SiValue (Number 150), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "strokeCap" [ SiValue (strokeCapLabel CButt |> Str), SiBind (ISelect [ InOptions (Strings [ "butt", "round", "square" ]) ]) ]
                << signal "strokeDash" [ SiValues (Numbers [ 1, 0 ]), SiBind (ISelect [ InOptions (toValues [ ( 1, 0 ), ( 8, 8 ), ( 8, 4 ), ( 4, 4 ), ( 4, 2 ), ( 2, 1 ), ( 1, 1 ) ]) ]) ]

        mk =
            marks
                << mark Rule
                    [ MEncode
                        [ Enter [ MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MX2 [ VSignal (SName "x2") ]
                            , MY2 [ VSignal (SName "y2") ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MStrokeDash [ VSignal (SName "strokeDash") ]
                            , MStrokeCap [ VSignal (SName "strokeCap") ]
                            , MOpacity [ VNumber 1 ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                    [ SiValue (Str "circle")
                    , SiBind
                        (ISelect
                            [ InOptions
                                (Strings
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
                << signal "size" [ SiValue (Number 2000), SiBind (IRange [ InMin 0, InMax 10000, InStep 100 ]) ]
                << signal "x" [ SiValue (Number 100), SiBind (IRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 100), SiBind (IRange [ InMin 10, InMax 190, InStep 1 ]) ]
                << signal "strokeWidth" [ SiValue (Number 4), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "color" [ SiValue (Str "both"), SiBind (IRadio [ InOptions (Strings [ "fill", "stroke", "both" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MEncode
                        [ Enter [ MFill [ VString "#939597" ], MStroke [ VString "#652c90" ] ]
                        , Update
                            [ MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MSize [ VSignal (SName "size") ]
                            , MShape [ VSignal (SName "shape") ]
                            , MOpacity [ VNumber 1 ]
                            , MStrokeWidth [ VSignal (SName "strokeWidth") ]
                            , MFillOpacity [ VSignal (SExpr "color === 'fill' || color === 'both' ? 1 : 0") ]
                            , MStrokeOpacity [ VSignal (SExpr "color === 'stroke' || color === 'both' ? 1 : 0") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << signal "x" [ SiValue (Number 100), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "y" [ SiValue (Number 100), SiBind (IRange [ InMin 0, InMax 200, InStep 1 ]) ]
                << signal "dx" [ SiValue (Number 0), SiBind (IRange [ InMin -20, InMax 20, InStep 1 ]) ]
                << signal "angle" [ SiValue (Number 0), SiBind (IRange [ InMin -180, InMax 180, InStep 1 ]) ]
                << signal "fontSize" [ SiValue (Number 10), SiBind (IRange [ InMin 1, InMax 36, InStep 1 ]) ]
                << signal "limit" [ SiValue (Number 0), SiBind (IRange [ InMin 0, InMax 150, InStep 1 ]) ]
                << signal "align" [ SiValue (hAlignLabel AlignLeft |> Str), SiBind (ISelect [ InOptions (Strings [ "left", "center", "right" ]) ]) ]
                << signal "baseline" [ SiValue (vAlignLabel Alphabetic |> Str), SiBind (ISelect [ InOptions (Strings [ "alphabetic", "top", "middle", "bottom" ]) ]) ]
                << signal "font" [ SiValue (Str "sans-serif"), SiBind (IRadio [ InOptions (Strings [ "sans-serif", "serif", "monospace" ]) ]) ]
                << signal "fontWeight" [ SiValue (Str "normal"), SiBind (IRadio [ InOptions (Strings [ "normal", "bold" ]) ]) ]
                << signal "fontStyle" [ SiValue (Str "normal"), SiBind (IRadio [ InOptions (Strings [ "normal", "italic" ]) ]) ]

        mk =
            marks
                << mark Symbol
                    [ MInteractive False
                    , MEncode
                        [ Enter [ MFill [ VString "#firebrick" ], MSize [ VNumber 25 ] ]
                        , Update [ MX [ VSignal (SName "x") ], MY [ VSignal (SName "y") ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ Enter [ MFill [ VString "#000" ], MText [ VString "Text Label" ] ]
                        , Update
                            [ MOpacity [ VNumber 1 ]
                            , MX [ VSignal (SName "x") ]
                            , MY [ VSignal (SName "y") ]
                            , MdX [ VSignal (SName "dx") ]
                            , MAngle [ VSignal (SName "angle") ]
                            , MAlign [ VSignal (SName "align") ]
                            , MBaseline [ VSignal (SName "baseline") ]
                            , MFont [ VSignal (SName "font") ]
                            , MFontSize [ VSignal (SName "fontSize") ]
                            , MFontStyle [ VSignal (SName "fontStyle") ]
                            , MFontWeight [ VSignal (SName "fontWeight") ]
                            , MLimit [ VSignal (SName "limit") ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
                << dataColumn "u" (Numbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "v" (Numbers [ 28, 55, 42, 34, 36, 48 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "u" ])
                    , SRange (RDefault RWidth)
                    , SZero False
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "v" ])
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SNice (IsNice True)
                    ]
                << scale "zscale"
                    [ SType ScLinear
                    , SRange (RNumbers [ 5, 1 ])
                    , SDomain (DData [ DDataset "table", DField "v" ])
                    ]

        si =
            signals
                << signal "defined" [ SiValue (Boolean True), SiBind (ICheckbox []) ]
                << signal "size" [ SiValue (Number 5), SiBind (IRange [ InMin 1, InMax 10 ]) ]

        mk =
            marks
                << mark Trail
                    [ MFrom (SData "table")
                    , MEncode
                        [ Enter [ MFill [ VString "#939597" ] ]
                        , Update
                            [ MX [ VScale (FName "xscale"), VField (FName "u") ]
                            , MY [ VScale (FName "yscale"), VField (FName "v") ]
                            , MSize [ VScale (FName "zscale"), VField (FName "v"), VMultiply (VSignal (SName "size")) ]
                            , MDefined [ VSignal (SExpr "defined || datum.u !== 3") ]
                            , MOpacity [ VNumber 1 ]
                            ]
                        , Hover [ MOpacity [ VNumber 0.5 ] ]
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
