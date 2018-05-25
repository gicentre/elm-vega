port module Gallery exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


dv : String -> Float -> ( String, Value )
dv label num =
    ( label, vNum num )


barChart1 : Spec
barChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (daStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "tooltip"
                    [ siValue (vObject [])
                    , siOn
                        [ eventHandler (str "rect:mouseover") [ evUpdate "datum" ]
                        , eventHandler (str "rect:mouseout") [ evUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (str "category") ])
                    , scRange (raDefault RWidth)
                    , scPadding (num 0.05)
                    , scRound (boo True)
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "table", daField (str "amount") ])
                    , scNice niTrue
                    , scRange (raDefault RHeight)
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "category") ]
                            , maWidth [ vScale (fName "xScale"), vBand 1 ]
                            , maY [ vScale (fName "yScale"), vField (fName "amount") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            ]
                        , enUpdate [ maFill [ vStr "steelblue" ] ]
                        , enHover [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , maFill [ vStr "#333" ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vSignal "tooltip.category", vBand 0.5 ]
                            , maY [ vScale (fName "yScale"), vSignal "tooltip.amount", vOffset (vNum -2) ]
                            , maText [ vSignal "tooltip.amount" ]
                            , maFillOpacity [ ifElse "datum === tooltip" [ vNum 0 ] [ vNum 1 ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


barChart2 : Spec
barChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (daNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (daNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trStack
                            [ stGroupBy [ str "x" ]
                            , stSort [ coField [ str "c" ] ]
                            , stField (str "y")
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "table", daField (str "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "table", daField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex 1 ]
                << axis "yScale" SLeft [ axZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "x") ]
                            , maWidth [ vScale (fName "xScale"), vBand 1, vOffset (vNum -1) ]
                            , maY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , maY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "c") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (pdSize 5), ds, sc [], ax [], mk [] ]


barChart3 : Spec
barChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (daStrs [ "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C" ])
                << dataColumn "position" (daNums [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ])
                << dataColumn "value" (daNums [ 0.1, 0.6, 0.9, 0.4, 0.7, 0.2, 1.1, 0.8, 0.6, 0.1, 0.2, 0.7 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (str "category") ])
                    , scRange (raDefault RHeight)
                    , scPadding (num 0.2)
                    ]
                << scale "xScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (str "value") ])
                    , scRange (raDefault RWidth)
                    , scRound (boo True)
                    , scZero (boo True)
                    , scNice niTrue
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doData [ daDataset "table", daField (str "position") ])
                    , scRange (raScheme "category20" [])
                    ]

        ax =
            axes
                << axis "yScale" SLeft [ axTickSize 0, axLabelPadding 4, axZIndex 1 ]
                << axis "xScale" SBottom []

        nestedSi =
            signals
                << signal "height" [ siUpdate "bandwidth('yScale')" ]

        nestedSc =
            scales
                << scale "pos"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "facet", daField (str "position") ])
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ mName "bars"
                    , mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enEnter
                            [ maY [ vScale (fName "pos"), vField (fName "position") ]
                            , maHeight [ vScale (fName "pos"), vBand 1 ]
                            , maX [ vScale (fName "xScale"), vField (fName "value") ]
                            , maX2 [ vScale (fName "xScale"), vBand 0 ]
                            , maFill [ vScale (fName "cScale"), vField (fName "position") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "bars") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (fName "x2"), vOffset (vNum -5) ]
                            , maY [ vField (fName "y"), vOffset (vObject [ vField (fName "height"), vMultiply (vNum 0.5) ]) ]
                            , maFill [ vStr "white" ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maText [ vField (fName "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "table" "facet" [ faGroupBy [ "category" ] ] ]
                    , mEncode [ enEnter [ maY [ vScale (fName "yScale"), vField (fName "category") ] ] ]
                    , mGroup [ nestedSi [], nestedSc [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, height 240, padding (pdSize 5), ds, sc [], ax [], mk [] ]


barChart4 : Spec
barChart4 =
    let
        table =
            dataFromColumns "tuples" []
                << dataColumn "a" (daNums [ 0, 0, 0, 0, 1, 2, 2 ])
                << dataColumn "b" (daStrs [ "a", "a", "b", "c", "b", "b", "c" ])
                << dataColumn "c" (daNums [ 6.3, 4.2, 6.8, 5.1, 4.4, 3.5, 6.2 ])

        agTable =
            table []
                |> transform
                    [ trAggregate [ agGroupBy [ str "a", str "b" ], agFields [ str "c" ], agOps [ average ], agAs [ "c" ] ] ]

        trTable =
            data "trellis" [ daSource "tuples" ]
                |> transform
                    [ trAggregate [ agGroupBy [ str "a" ] ]
                    , trFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span" AlwaysUpdate
                    , trStack [ stField (str "span") ]
                    , trExtentAsSignal (str "y1") "trellisExtent"
                    ]

        ds =
            dataSource [ agTable, trTable ]

        si =
            signals
                << signal "rangeStep" [ siValue (vNum 20), siBind (iRange [ inMin 5, inMax 50, inStep 1 ]) ]
                << signal "innerPadding" [ siValue (vNum 0.1), siBind (iRange [ inMin 0, inMax 0.7, inStep 0.01 ]) ]
                << signal "outerPadding" [ siValue (vNum 0.2), siBind (iRange [ inMin 0, inMax 0.4, inStep 0.01 ]) ]
                << signal "height" [ siUpdate "trellisExtent[1]" ]

        sc =
            scales
                << scale "xScale"
                    [ scDomain (doData [ daDataset "tuples", daField (str "c") ])
                    , scNice niTrue
                    , scZero (boo True)
                    , scRound (boo True)
                    , scRange (raDefault RWidth)
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "trellis", daField (str "a") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ axDomain True ]

        nestedSc =
            scales
                << scale "yScale"
                    [ scType ScBand
                    , scPaddingInner (numSignal "innerPadding")
                    , scPaddingOuter (numSignal "outerPadding")
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "faceted_tuples", daField (str "b") ])
                    , scRange (raStep (vSignal "rangeStep"))
                    ]

        nestedAx =
            axes
                << axis "yScale" SLeft [ axTicks False, axDomain False, axLabelPadding 4 ]

        nestedMk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "faceted_tuples") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "c") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "a") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        , enUpdate
                            [ maY [ vScale (fName "yScale"), vField (fName "b") ]
                            , maHeight [ vScale (fName "yScale"), vBand 1 ]
                            , maStroke [ vNull ]
                            , maZIndex [ vNum 0 ]
                            ]
                        , enHover
                            [ maStroke [ vStr "firebrick" ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srData (str "trellis"), srFacet "tuples" "faceted_tuples" [ faGroupBy [ "a" ] ] ]
                    , mEncode
                        [ enEnter [ maX [ vNum 0 ], maWidth [ vSignal "width" ] ]
                        , enUpdate [ maY [ vField (fName "y0") ], maY2 [ vField (fName "y1") ] ]
                        ]
                    , mGroup [ nestedSc [], nestedAx [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, padding (pdSize 5), autosize [ APad ], ds, si [], sc [], ax [], mk [] ]


type Gender
    = Male
    | Female


barChart5 : Spec
barChart5 =
    let
        ds =
            dataSource
                [ data "population" [ daUrl "https://vega.github.io/vega/data/population.json" ]
                , data "popYear" [ daSource "population" ] |> transform [ trFilter (expr "datum.year == year") ]
                , data "males" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 1") ]
                , data "females" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 2") ]
                , data "ageGroups" [ daSource "population" ] |> transform [ trAggregate [ agGroupBy [ str "age" ] ] ]
                ]

        si =
            signals
                << signal "chartWidth" [ siValue (vNum 300) ]
                << signal "chartPad" [ siValue (vNum 20) ]
                << signal "width" [ siUpdate "2 * chartWidth + chartPad" ]
                << signal "year" [ siValue (vNum 2000), siBind (iRange [ inMin 1850, inMax 2000, inStep 10 ]) ]

        topSc =
            scales
                << scale "yScale"
                    [ scType ScBand
                    , scRange (raValues [ vSignal "height", vNum 0 ])
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "ageGroups", daField (str "age") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doNums (nums [ 1, 2 ]))
                    , scRange (raStrs [ "#1f77b4", "#e377c2" ])
                    ]

        topMk =
            marks
                << mark Text
                    [ mInteractive (boo False)
                    , mFrom [ srData (str "ageGroups") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vSignal "chartWidth + chartPad / 2" ]
                            , maY [ vScale (fName "yScale"), vField (fName "age"), vBand 0.5 ]
                            , maText [ vField (fName "age") ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maFill [ vStr "#000" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ mEncode [ enUpdate [ maX [ vNum 0 ], maHeight [ vSignal "height" ] ] ]
                    , mGroup [ sc Female [], ax [], mk Female [] ]
                    ]
                << mark Group
                    [ mEncode [ enUpdate [ maX [ vSignal "chartWidth + chartPad" ], maHeight [ vSignal "height" ] ] ]
                    , mGroup [ sc Male [], ax [], mk Male [] ]
                    ]

        sc gender =
            let
                range =
                    case gender of
                        Female ->
                            scRange (raValues [ vSignal "chartWidth", vNum 0 ])

                        Male ->
                            scRange (raValues [ vNum 0, vSignal "chartWidth" ])
            in
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , range
                    , scNice niTrue
                    , scDomain (doData [ daDataset "population", daField (str "people") ])
                    ]

        mk gender =
            let
                genderField =
                    case gender of
                        Female ->
                            "females"

                        Male ->
                            "males"
            in
            marks
                << mark Rect
                    [ mFrom [ srData (str genderField) ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "people") ]
                            , maX2 [ vScale (fName "xScale"), vNum 0 ]
                            , maY [ vScale (fName "yScale"), vField (fName "age") ]
                            , maHeight [ vScale (fName "yScale"), vBand 1, vOffset (vNum -1) ]
                            , maFillOpacity [ vNum 0.6 ]
                            , maFill [ vScale (fName "cScale"), vField (fName "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "xScale" SBottom [ axFormat "s" ]
    in
    toVega
        [ height 400, padding (pdSize 5), ds, si [], topSc [], topMk [] ]


lineChart1 : Spec
lineChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (daNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (daNums [ 28, 20, 43, 35, 81, 10, 19, 15, 52, 48, 24, 28, 87, 66, 17, 27, 68, 16, 49, 25 ])
                << dataColumn "c" (daNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ siValue (vStr (markInterpolationLabel Linear))
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScPoint
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "table", daField (str "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "y") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "table", daField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "table" "series" [ faGroupBy [ "c" ] ] ]
                    , mGroup [ mkLine [] ]
                    ]

        mkLine =
            marks
                << mark Line
                    [ mFrom [ srData (str "series") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "x") ]
                            , maY [ vScale (fName "yScale"), vField (fName "y") ]
                            , maStroke [ vScale (fName "cScale"), vField (fName "c") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        , enUpdate [ maInterpolate [ vSignal "interpolate" ], maStrokeOpacity [ vNum 1 ] ]
                        , enHover [ maStrokeOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart1 : Spec
areaChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (List.map toFloat (List.range 1 20) |> daNums)
                << dataColumn "v" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ siValue (vStr (markInterpolationLabel Linear))
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scZero (boo False)
                    , scDomain (doData [ daDataset "table", daField (str "u") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "v") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTickCount 20 ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Area
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "u") ]
                            , maY [ vScale (fName "yScale"), vField (fName "v") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate [ maInterpolate [ vSignal "interpolate" ], maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart2 : Spec
areaChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (daNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (daNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table [] |> transform [ trStack [ stGroupBy [ str "x" ], stSort [ coField [ str "c" ] ], stField (str "y") ] ] ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScPoint
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "table", daField (str "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "table", daField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex 1 ]
                << axis "yScale" SLeft [ axZIndex 1 ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "table" "series" [ faGroupBy [ "c" ] ] ]
                    , mGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "series") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , maX [ vScale (fName "xScale"), vField (fName "x") ]
                            , maY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , maY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "c") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (pdSize 5), ds, sc [], ax [], mk [] ]


areaChart3 : Spec
areaChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (List.map toFloat (List.range 1 20) |> daNums)
                << dataColumn "y" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        layerData =
            data "layer_indices" [ daValue (vNums [ 0, 1, 2, 3 ]) ]
                |> transform
                    [ trFilter (expr "datum.data < layers")
                    , trFormula "datum.data * -height" "offset" AlwaysUpdate
                    ]

        ds =
            dataSource [ table [], layerData ]

        si =
            signals
                << signal "layers"
                    [ siValue (vNum 2)
                    , siOn [ eventHandler (str "mousedown!") [ evUpdate "1 + (layers % 4)" ] ]
                    , siBind (iSelect [ inOptions (vNums [ 1, 2, 3, 4 ]) ])
                    ]
                << signal "height" [ siUpdate "floor(200 / layers)" ]
                << signal "vheight" [ siUpdate "height * layers" ]
                << signal "opacity" [ siUpdate "pow(layers, -2/3)" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scZero (boo False)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raValues [ vSignal "vheight", vNum 0 ])
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (str "y") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ axTickCount 20 ]

        mk =
            marks
                << mark Group
                    [ mEncode
                        [ enUpdate
                            [ maWidth [ vField (fGroup (fName "width")) ]
                            , maHeight [ vField (fGroup (fName "height")) ]
                            , maGroupClip [ vBoo True ]
                            ]
                        ]
                    , mGroup [ mk1 [] ]
                    ]

        mk1 =
            marks
                << mark Group
                    [ mFrom [ srData (str "layer_indices") ]
                    , mEncode [ enUpdate [ maY [ vField (fName "offset") ] ] ]
                    , mGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , maX [ vScale (fName "xScale"), vField (fName "x") ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate
                            [ maY [ vScale (fName "yScale"), vField (fName "y") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFillOpacity [ vSignal "opacity" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart4 : Spec
areaChart4 =
    let
        table =
            data "jobs" [ daUrl "https://vega.github.io/vega/data/jobs.json" ]
                |> transform
                    [ trFilter (expr "(sex === 'all' || datum.sex === sex) && (!query || test(regexp(query,'i'), datum.job))")
                    , trStack
                        [ stGroupBy [ str "year" ]
                        , stSort [ coField [ str "job", str "sex" ], coOrder [ orDescending, orDescending ] ]
                        , stField (str "perc")
                        ]
                    ]

        series =
            data "series" [ daSource "jobs" ]
                |> transform
                    [ trAggregate
                        [ agGroupBy [ str "job", str "sex" ]
                        , agFields [ str "perc", str "perc" ]
                        , agOps [ sum, argMax ]
                        , agAs [ "sum", "argmax" ]
                        ]
                    ]

        ds =
            dataSource [ table, series ]

        si =
            signals
                << signal "sex"
                    [ siValue (vStr "all")
                    , siBind (iRadio [ inOptions (vStrs [ "men", "women", "all" ]) ])
                    ]
                << signal "query"
                    [ siValue (vStr "")
                    , siOn
                        [ eventHandler (str "area:click!") [ evUpdate "datum.job" ]
                        , eventHandler (str "dblclick!") [ evUpdate "''" ]
                        ]
                    , siBind (iText [ inPlaceholder "search", inAutocomplete False ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scZero (boo False)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "jobs", daField (str "year") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scZero (boo True)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "jobs", daField (str "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "men", "women" ]))
                    , scRange (raStrs [ "#33f", "#f33" ])
                    ]
                << scale "alphaScale"
                    [ scType ScLinear
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "series", daField (str "sum") ])
                    , scRange (raNums [ 0.4, 0.8 ])
                    ]
                << scale "fontScale"
                    [ scType ScSqrt
                    , scRange (raNums [ 0, 20 ])
                    , scZero (boo True)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "series", daField (str "argmax.perc") ])
                    ]
                << scale "opacityScale"
                    [ scType ScQuantile
                    , scRange (raNums [ 0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0 ])
                    , scDomain (doData [ daDataset "series", daField (str "argmax.perc") ])
                    ]
                << scale "alignScale"
                    [ scType ScQuantize
                    , scRange (raStrs [ "left", "center", "right" ])
                    , scZero (boo False)
                    , scDomain (doNums (nums [ 1730, 2130 ]))
                    ]
                << scale "offsetScale"
                    [ scType ScQuantize
                    , scRange (raNums [ 6, 0, -6 ])
                    , scZero (boo False)
                    , scDomain (doNums (nums [ 1730, 2130 ]))
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axFormat "d", axTickCount 15 ]
                << axis "yScale"
                    SRight
                    [ axFormat "%"
                    , axGrid True
                    , axDomain False
                    , axTickSize 12
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "#ccc" ] ] ] )
                        , ( ETicks, [ enEnter [ maStroke [ vStr "#ccc" ] ] ] )
                        ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "year") ]
                            , maY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , maY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "sex") ]
                            , maFillOpacity [ vScale (fName "alphaScale"), vField (fParent (fName "sum")) ]
                            ]
                        , enHover [ maFillOpacity [ vNum 0.2 ] ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom
                        [ srData (str "series")
                        , srFacet "jobs" "facet" [ faGroupBy [ "job", "sex" ] ]
                        ]
                    , mGroup [ mkArea [] ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "series") ]
                    , mInteractive (boo False)
                    , mEncode
                        [ enUpdate
                            [ maX [ vField (fName "argmax.year"), vScale (fName "xScale") ]
                            , maDx [ vField (fName "argmax.year"), vScale (fName "offsetScale") ]
                            , maY [ vSignal "scale('yScale', 0.5 * (datum.argmax.y0 + datum.argmax.y1))" ]
                            , maFill [ vStr "#000" ]
                            , maFillOpacity [ vField (fName "argmax.perc"), vScale (fName "opacityScale") ]
                            , maFontSize [ vField (fName "argmax.perc"), vScale (fName "fontScale"), vOffset (vNum 5) ]
                            , maText [ vField (fName "job") ]
                            , maAlign [ vField (fName "argmax.year"), vScale (fName "alignScale") ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


circularChart1 : Spec
circularChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "id" (daNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "field" (daNums [ 4, 6, 10, 3, 7, 8 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trPie
                            [ piField (str "field")
                            , piStartAngle (numSignal "PI * startAngle / 180")
                            , piEndAngle (numSignal "PI * endAngle / 180")
                            , piSort (booSignal "sort")
                            ]
                        ]
                ]

        si =
            signals
                << signal "startAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "endAngle" [ siValue (vNum 360), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "padAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.1 ]) ]
                << signal "innerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 90, inStep 1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "sort" [ siValue (vBoo False), siBind (iCheckbox []) ]

        sc =
            scales << scale "cScale" [ scType ScOrdinal, scRange (raScheme "category20" []) ]

        mk =
            marks
                << mark Arc
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale (fName "cScale"), vField (fName "id") ]
                            , maX [ vSignal "width / 2" ]
                            , maY [ vSignal "height / 2" ]
                            ]
                        , enUpdate
                            [ maStartAngle [ vField (fName "startAngle") ]
                            , maEndAngle [ vField (fName "endAngle") ]
                            , maPadAngle [ vSignal "PI * padAngle / 180" ]
                            , maInnerRadius [ vSignal "innerRadius" ]
                            , maOuterRadius [ vSignal "width / 2" ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, autosize [ ANone ], ds, si [], sc [], mk [] ]


circularChart2 : Spec
circularChart2 =
    let
        ds =
            dataSource
                [ data "table" [ daValue (vNums [ 12, 23, 47, 6, 52, 19 ]) ]
                    |> transform [ trPie [ piField (str "data") ] ]
                ]

        sc =
            scales
                << scale "rScale"
                    [ scType ScSqrt
                    , scDomain (doData [ daDataset "table", daField (str "data") ])
                    , scRange (raNums [ 20, 100 ])
                    ]

        mk =
            marks
                << mark Arc
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (fGroup (fName "width")), vMultiply (vNum 0.5) ]
                            , maY [ vField (fGroup (fName "height")), vMultiply (vNum 0.5) ]
                            , maStartAngle [ vField (fName "startAngle") ]
                            , maEndAngle [ vField (fName "endAngle") ]
                            , maInnerRadius [ vNum 20 ]
                            , maOuterRadius [ vField (fName "data"), vScale (fName "rScale") ]
                            , maStroke [ vStr "#fff" ]
                            ]
                        , enUpdate [ maFill [ vStr "#ccc" ] ]
                        , enHover [ maFill [ vStr "pink" ] ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (fGroup (fName "width")), vMultiply (vNum 0.5) ]
                            , maY [ vField (fGroup (fName "height")), vMultiply (vNum 0.5) ]
                            , maRadius [ vField (fName "data"), vScale (fName "rScale"), vOffset (vNum 8) ]
                            , maTheta [ vSignal "(datum.startAngle + datum.endAngle)/2" ]
                            , maFill [ vStr "#000" ]
                            , maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maText [ vField (fName "data") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, ds, sc [], mk [] ]


scatterplot1 : Spec
scatterplot1 =
    let
        ds =
            dataSource
                [ data "cars" [ daUrl "https://vega.github.io/vega/data/cars.json" ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null") ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Horsepower") ])
                    , scRange (raDefault RWidth)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Miles_per_Gallon") ])
                    , scRange (raDefault RHeight)
                    ]
                << scale "sizeScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niFalse
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Acceleration") ])
                    , scRange (raNums [ 4, 361 ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Horsepower") ]
                << axis "yScale" SLeft [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Miles per gallon") ]

        shapeEncoding =
            [ maStrokeWidth [ vNum 2 ]
            , maOpacity [ vNum 0.5 ]
            , maStroke [ vStr "#4682b4" ]
            , maShape [ vStr (symbolLabel SymCircle) ]
            , maFill [ vStr "transparent" ]
            ]

        lg =
            legends
                << legend
                    [ leSize "sizeScale"
                    , leTitle "Acceleration"
                    , leFormat "s"
                    , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enUpdate <|
                            [ maX [ vScale (fName "xScale"), vField (fName "Horsepower") ]
                            , maY [ vScale (fName "yScale"), vField (fName "Miles_per_Gallon") ]
                            , maSize [ vScale (fName "sizeScale"), vField (fName "Acceleration") ]
                            ]
                                ++ shapeEncoding
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (pdSize 5), ds, sc [], ax [], lg [], mk [] ]


scatterplot2 : Spec
scatterplot2 =
    let
        ds =
            dataSource
                [ data "movies" [ daUrl "https://vega.github.io/vega/data/movies.json" ] |> transform [ trFormula "datum.Title + ' (' + (year(datum.Release_Date) || '?') + ')'" "tooltip" AlwaysUpdate ]
                , data "valid" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] != null && datum[yField] != null") ]
                , data "nullXY" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] == null && datum[yField] == null"), trAggregate [] ]
                , data "nullY" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] != null && datum[yField] == null") ]
                , data "nullX" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] == null && datum[yField] != null") ]
                ]

        si =
            signals
                << signal "yField" [ siValue (vStr "IMDB_Rating"), siBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "xField" [ siValue (vStr "Rotten_Tomatoes_Rating"), siBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "nullSize" [ siValue (vNum 8) ]
                << signal "nullGap" [ siUpdate "nullSize + 10" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "nullGap", vSignal "width" ])
                    , scDomain (doData [ daDataset "valid", daField (strSignal "xField") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "height - nullGap", vNum 0 ])
                    , scDomain (doData [ daDataset "valid", daField (strSignal "yField") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axOffset (num 5), axFormat "s", axTitle (strSignal "xField") ]
                << axis "yScale" SLeft [ axOffset (num 5), axFormat "s", axTitle (strSignal "yField") ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "valid") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fSignal "xField") ]
                            , maY [ vScale (fName "yScale"), vField (fSignal "yField") ]
                            , maFill [ vStr "steelblue" ]
                            , maFillOpacity [ vNum 0.5 ]
                            , maZIndex [ vNum 0 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "nullY") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fSignal "xField") ]
                            , maY [ vSignal "height - nullSize/2" ]
                            , maFill [ vStr "#aaa" ]
                            , maFillOpacity [ vNum 0.2 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "nullX") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "nullSize/2" ]
                            , maY [ vScale (fName "yScale"), vField (fSignal "yField") ]
                            , maFill [ vStr "#aaa" ]
                            , maFillOpacity [ vNum 0.2 ]
                            , maZIndex [ vNum 1 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive (boo False)
                    , mFrom [ srData (str "nullXY") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vSignal "nullSize", vOffset (vNum -4) ]
                            , maY [ vSignal "height", vOffset (vNum 13) ]
                            , maText [ vSignal "datum.count + ' null'" ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignTop) ]
                            , maFill [ vStr "#999" ]
                            , maFontSize [ vNum 9 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 450, height 450, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


scatterplot3 : Spec
scatterplot3 =
    let
        ds =
            dataSource [ data "drive" [ daUrl "https://vega.github.io/vega/data/driving.json" ] ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "drive", daField (str "miles") ])
                    , scRange (raDefault RWidth)
                    , scNice niTrue
                    , scZero (boo False)
                    , scRound (boo True)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "drive", daField (str "gas") ])
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo False)
                    , scRound (boo True)
                    ]
                << scale "alignScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "right", "left", "center", "center" ])
                    ]
                << scale "baseScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "middle", "middle", "bottom", "top" ])
                    ]
                << scale "dx"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ -7, 6, 0, 0 ])
                    ]
                << scale "dy"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ 1, 1, -5, 6 ])
                    ]

        ax =
            axes
                << axis "xScale"
                    STop
                    [ axTickCount 5
                    , axTickSize 0
                    , axGrid True
                    , axDomain False
                    , axEncode
                        [ ( EDomain, [ enEnter [ maStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enEnter
                                [ maAlign [ vStr (hAlignLabel AlignLeft) ]
                                , maBaseline [ vStr (vAlignLabel AlignTop) ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "xScale"
                    SBottom
                    [ axTitle (str "Miles driven per capita each year")
                    , axDomain False
                    , axTicks False
                    , axLabels False
                    ]
                << axis "yScale"
                    SLeft
                    [ axTickCount 5
                    , axTickSize 0
                    , axGrid True
                    , axDomain False
                    , axFormat "$0.2f"
                    , axEncode
                        [ ( EDomain, [ enEnter [ maStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enEnter
                                [ maAlign [ vStr (hAlignLabel AlignLeft) ]
                                , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "yScale"
                    SRight
                    [ axTitle (str "Price of a gallon of gasoline (adjusted for inflation)")
                    , axDomain False
                    , axTicks False
                    , axLabels False
                    ]

        mk =
            marks
                << mark Line
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr (markInterpolationLabel Cardinal) ]
                            , maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maFill [ vStr "#fff" ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maSize [ vNum 49 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maDx [ vScale (fName "dx"), vField (fName "side") ]
                            , maDy [ vScale (fName "dy"), vField (fName "side") ]
                            , maFill [ vStr "#000" ]
                            , maText [ vField (fName "year") ]
                            , maAlign [ vScale (fName "alignScale"), vField (fName "side") ]
                            , maBaseline [ vScale (fName "baseScale"), vField (fName "side") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding (pdSize 5), ds, sc [], ax [], mk [] ]


scatterplot4 : Spec
scatterplot4 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "barley" [ daUrl "https://vega.github.io/vega/data/barley.json" ]
                , data "summary" [ daSource "barley" ]
                    |> transform
                        [ trAggregate
                            [ agGroupBy [ str "variety" ]
                            , agFields (List.repeat 7 (str "yield"))
                            , agOps [ mean, stdev, stderr, ci0, ci1, q1, q3 ]
                            , agAs [ "mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1" ]
                            ]
                        , trFormula "datum.mean - datum.stdev" "stdev0" AlwaysUpdate
                        , trFormula "datum.mean + datum.stdev" "stdev1" AlwaysUpdate
                        , trFormula "datum.mean - datum.stderr" "stderr0" AlwaysUpdate
                        , trFormula "datum.mean + datum.stderr" "stderr1" AlwaysUpdate
                        ]
                ]

        si =
            signals
                << signal "errorMeasure"
                    [ siValue (vStr "95% Confidence Interval")
                    , siBind (iSelect [ inOptions (vStrs [ "95% Confidence Interval", "Standard Error", "Standard Deviation", "Interquartile Range" ]) ])
                    ]
                << signal "lookup"
                    [ siValue
                        (vObject
                            [ keyValue "95% Confidence Interval" (vStr "ci")
                            , keyValue "Standard Deviation" (vStr "stdev")
                            , keyValue "Standard Error" (vStr "stderr")
                            , keyValue "Interquartile Range" (vStr "iqr")
                            ]
                        )
                    ]
                << signal "measure" [ siUpdate "lookup[errorMeasure]" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "summary", daFields (strs [ "stdev0", "stdev1" ]) ])
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo False)
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "summary", daField (str "variety"), daSort [ soOp maximum, soByField (str "mean"), Descending ] ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex 1, axTitle (str "Barley Yield") ]
                << axis "yScale" SLeft [ axTickCount 5, axZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "black" ], maHeight [ vNum 1 ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vSignal "datum[measure+'0']" ]
                            , maY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
                            , maX2 [ vScale (fName "xScale"), vSignal "datum[measure+'1']" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "back" ], maSize [ vNum 40 ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "mean") ]
                            , maY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 160, padding (pdSize 5), ds, si [], sc [], ax [], mk [] ]


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
                    , scNice niTrue
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

        -- TODO: Add top-level encoding for background
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


sourceExample : Spec
sourceExample =
    geo2



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "barChart1", barChart1 )
        , ( "barChart2", barChart2 )
        , ( "barChart3", barChart3 )
        , ( "barChart4", barChart4 )
        , ( "barChart5", barChart5 )
        , ( "lineChart1", lineChart1 )
        , ( "areaChart1", areaChart1 )
        , ( "areaChart2", areaChart2 )
        , ( "areaChart3", areaChart3 )
        , ( "areaChart4", areaChart4 )
        , ( "circularChart1", circularChart1 )
        , ( "circularChart2", circularChart2 )
        , ( "scatterplot1", scatterplot1 )
        , ( "scatterplot2", scatterplot2 )
        , ( "scatterplot3", scatterplot3 )
        , ( "scatterplot4", scatterplot4 )
        , ( "geo1", geo1 )
        , ( "geo2", geo2 )
        , ( "geo3", geo3 )
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
