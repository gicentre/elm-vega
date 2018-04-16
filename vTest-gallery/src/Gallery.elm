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
    ( label, vNumber num )


barChart1 : Spec
barChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (dStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (dNumbers [ 28, 55, 43, 91, 81, 53, 19, 87 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "tooltip"
                    [ SiValue (vObject [])
                    , SiOn
                        [ [ EEvents "rect:mouseover", EUpdate "datum" ]
                        , [ EEvents "rect:mouseout", EUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScBand
                    , SDomain (DoData [ dDataset "table", dField (str "category") ])
                    , SRange (RDefault RWidth)
                    , SPadding 0.05
                    , SRound True
                    ]
                << scale "yScale"
                    [ SDomain (DoData [ dDataset "table", dField (str "amount") ])
                    , SNice NTrue
                    , SRange (RDefault RHeight)
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "category") ]
                            , MWidth [ vScale (FName "xScale"), vBand 1 ]
                            , MY [ vScale (FName "yScale"), vField (FName "amount") ]
                            , MY2 [ vScale (FName "yScale"), vNumber 0 ]
                            ]
                        , Update [ MFill [ vStr "steelblue" ] ]
                        , Hover [ MFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ Enter
                            [ MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , MFill [ vStr "#333" ]
                            ]
                        , Update
                            [ MX [ vScale (FName "xScale"), vSignal "tooltip.category", vBand 0.5 ]
                            , MY [ vScale (FName "yScale"), vSignal "tooltip.amount", vOffset (vNumber -2) ]
                            , MText [ vSignal "tooltip.amount" ]
                            , MFillOpacity [ ifElse "datum === tooltip" [ vNumber 0 ] [ vNumber 1 ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


barChart2 : Spec
barChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (dNumbers [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (dNumbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (dNumbers [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStack
                            [ StGroupBy [ "x" ]
                            , StSort [ CoField [ "c" ] ]
                            , StField "y"
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScBand
                    , SRange (RDefault RWidth)
                    , SDomain (DoData [ dDataset "table", dField (str "x") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "table", dField (str "y1") ])
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DoData [ dDataset "table", dField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxZIndex 1 ]
                << axis "yScale" SLeft [ AxZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "x") ]
                            , MWidth [ vScale (FName "xScale"), vBand 1, vOffset (vNumber -1) ]
                            , MY [ vScale (FName "yScale"), vField (FName "y0") ]
                            , MY2 [ vScale (FName "yScale"), vField (FName "y1") ]
                            , MFill [ vScale (FName "cScale"), vField (FName "c") ]
                            ]
                        , Update [ MFillOpacity [ vNumber 1 ] ]
                        , Hover [ MFillOpacity [ vNumber 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (PSize 5), ds, sc [], ax [], mk [] ]


barChart3 : Spec
barChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (dStrs [ "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C" ])
                << dataColumn "position" (dNumbers [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ])
                << dataColumn "value" (dNumbers [ 0.1, 0.6, 0.9, 0.4, 0.7, 0.2, 1.1, 0.8, 0.6, 0.1, 0.2, 0.7 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yScale"
                    [ SType ScBand
                    , SDomain (DoData [ dDataset "table", dField (str "category") ])
                    , SRange (RDefault RHeight)
                    , SPadding 0.2
                    ]
                << scale "xScale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "table", dField (str "value") ])
                    , SRange (RDefault RWidth)
                    , SRound True
                    , SZero True
                    , SNice NTrue
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SDomain (DoData [ dDataset "table", dField (str "position") ])
                    , SRange (RScheme "category20" [])
                    ]

        ax =
            axes
                << axis "yScale" SLeft [ AxTickSize 0, AxLabelPadding 4, AxZIndex 1 ]
                << axis "xScale" SBottom []

        nestedSi =
            signals
                << signal "height" [ SiUpdate "bandwidth('yScale')" ]

        nestedSc =
            scales
                << scale "pos"
                    [ SType ScBand
                    , SRange (RDefault RHeight)
                    , SDomain (DoData [ dDataset "facet", dField (str "position") ])
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ MName "bars"
                    , MFrom [ SData "facet" ]
                    , MEncode
                        [ Enter
                            [ MY [ vScale (FName "pos"), vField (FName "position") ]
                            , MHeight [ vScale (FName "pos"), vBand 1 ]
                            , MX [ vScale (FName "xScale"), vField (FName "value") ]
                            , MX2 [ vScale (FName "xScale"), vBand 0 ]
                            , MFill [ vScale (FName "cScale"), vField (FName "position") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ SData "bars" ]
                    , MEncode
                        [ Enter
                            [ MX [ vField (FName "x2"), vOffset (vNumber -5) ]
                            , MY [ vField (FName "y"), vOffset (vObject [ vField (FName "height"), vMultiply (vNumber 0.5) ]) ]
                            , MFill [ vStr "white" ]
                            , MAlign [ vStr (hAlignLabel AlignRight) ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MText [ vField (FName "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ SFacet [ FaData "table", FaName "facet", FaGroupBy [ "category" ] ] ]
                    , MEncode [ Enter [ MY [ vScale (FName "yScale"), vField (FName "category") ] ] ]
                    , MGroup [ nestedSi [], nestedSc [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, height 240, padding (PSize 5), ds, sc [], ax [], mk [] ]


barChart4 : Spec
barChart4 =
    let
        table =
            dataFromColumns "tuples" []
                << dataColumn "a" (dNumbers [ 0, 0, 0, 0, 1, 2, 2 ])
                << dataColumn "b" (dStrs [ "a", "a", "b", "c", "b", "b", "c" ])
                << dataColumn "c" (dNumbers [ 6.3, 4.2, 6.8, 5.1, 4.4, 3.5, 6.2 ])

        agTable =
            table []
                |> transform
                    [ TAggregate [ AgGroupBy [ "a", "b" ], AgFields [ "c" ], AgOps [ Average ], AgAs [ "c" ] ] ]

        trTable =
            data "trellis" [ dSource "tuples" ]
                |> transform
                    [ TAggregate [ AgGroupBy [ "a" ] ]
                    , TFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span" AlwaysUpdate
                    , TStack [ StField "span" ]
                    , TExtentAsSignal "y1" "trellisExtent"
                    ]

        ds =
            dataSource [ agTable, trTable ]

        si =
            signals
                << signal "rangeStep" [ SiValue (vNumber 20), SiBind (IRange [ InMin 5, InMax 50, InStep 1 ]) ]
                << signal "innerPadding" [ SiValue (vNumber 0.1), SiBind (IRange [ InMin 0, InMax 0.7, InStep 0.01 ]) ]
                << signal "outerPadding" [ SiValue (vNumber 0.2), SiBind (IRange [ InMin 0, InMax 0.4, InStep 0.01 ]) ]
                << signal "height" [ SiUpdate "trellisExtent[1]" ]

        sc =
            scales
                << scale "xScale"
                    [ SDomain (DoData [ dDataset "tuples", dField (str "c") ])
                    , SNice NTrue
                    , SZero True
                    , SRound True
                    , SRange (RDefault RWidth)
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DoData [ dDataset "trellis", dField (str "a") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ AxDomain True ]

        nestedSc =
            scales
                << scale "yScale"
                    [ SType ScBand
                    , SPaddingInner (vSignal "innerPadding")
                    , SPaddingOuter (vSignal "outerPadding")
                    , SRound True
                    , SDomain (DoData [ dDataset "faceted_tuples", dField (str "b") ])
                    , SRange (RStep (vSignal "rangeStep"))
                    ]

        nestedAx =
            axes
                << axis "yScale" SLeft [ AxTicks False, AxDomain False, AxLabelPadding 4 ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom [ SData "faceted_tuples" ]
                    , MEncode
                        [ Enter
                            [ MX [ vNumber 0 ]
                            , MX2 [ vScale (FName "xScale"), vField (FName "c") ]
                            , MFill [ vScale (FName "cScale"), vField (FName "a") ]
                            , MStrokeWidth [ vNumber 2 ]
                            ]
                        , Update
                            [ MY [ vScale (FName "yScale"), vField (FName "b") ]
                            , MHeight [ vScale (FName "yScale"), vBand 1 ]
                            , MStroke [ vNull ]
                            , MZIndex [ vNumber 0 ]
                            ]
                        , Hover
                            [ MStroke [ vStr "firebrick" ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ SData "trellis", SFacet [ FaName "faceted_tuples", FaData "tuples", FaGroupBy [ "a" ] ] ]
                    , MEncode
                        [ Enter [ MX [ vNumber 0 ], MWidth [ vSignal "width" ] ]
                        , Update [ MY [ vField (FName "y0") ], MY2 [ vField (FName "y1") ] ]
                        ]
                    , MGroup [ nestedSc [], nestedAx [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, padding (PSize 5), autosize [ APad ], ds, si [], sc [], ax [], mk [] ]


type Gender
    = Male
    | Female


barChart5 : Spec
barChart5 =
    let
        ds =
            dataSource
                [ data "population" [ dUrl "https://vega.github.io/vega/data/population.json" ]
                , data "popYear" [ dSource "population" ] |> transform [ TFilter (Expr "datum.year == year") ]
                , data "males" [ dSource "popYear" ] |> transform [ TFilter (Expr "datum.sex == 1") ]
                , data "females" [ dSource "popYear" ] |> transform [ TFilter (Expr "datum.sex == 2") ]
                , data "ageGroups" [ dSource "population" ] |> transform [ TAggregate [ AgGroupBy [ "age" ] ] ]
                ]

        si =
            signals
                << signal "chartWidth" [ SiValue (vNumber 300) ]
                << signal "chartPad" [ SiValue (vNumber 20) ]
                << signal "width" [ SiUpdate "2 * chartWidth + chartPad" ]
                << signal "year" [ SiValue (vNumber 2000), SiBind (IRange [ InMin 1850, InMax 2000, InStep 10 ]) ]

        topSc =
            scales
                << scale "yScale"
                    [ SType ScBand
                    , SRange (RValues [ vSignal "height", vNumber 0 ])
                    , SRound True
                    , SDomain (DoData [ dDataset "ageGroups", dField (str "age") ])
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SDomain (DoNumbers [ 1, 2 ])
                    , SRange (RStrs [ "#1f77b4", "#e377c2" ])
                    ]

        topMk =
            marks
                << mark Text
                    [ MInteractive False
                    , MFrom [ SData "ageGroups" ]
                    , MEncode
                        [ Enter
                            [ MX [ vSignal "chartWidth + chartPad / 2" ]
                            , MY [ vScale (FName "yScale"), vField (FName "age"), vBand 0.5 ]
                            , MText [ vField (FName "age") ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MFill [ vStr "#000" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ MEncode [ Update [ MX [ vNumber 0 ], MHeight [ vSignal "height" ] ] ]
                    , MGroup [ sc Female [], ax [], mk Female [] ]
                    ]
                << mark Group
                    [ MEncode [ Update [ MX [ vSignal "chartWidth + chartPad" ], MHeight [ vSignal "height" ] ] ]
                    , MGroup [ sc Male [], ax [], mk Male [] ]
                    ]

        sc gender =
            let
                range =
                    case gender of
                        Female ->
                            SRange (RValues [ vSignal "chartWidth", vNumber 0 ])

                        Male ->
                            SRange (RValues [ vNumber 0, vSignal "chartWidth" ])
            in
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , range
                    , SNice NTrue
                    , SDomain (DoData [ dDataset "population", dField (str "people") ])
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
                    [ MFrom [ SData genderField ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "people") ]
                            , MX2 [ vScale (FName "xScale"), vNumber 0 ]
                            , MY [ vScale (FName "yScale"), vField (FName "age") ]
                            , MHeight [ vScale (FName "yScale"), vBand 1, vOffset (vNumber -1) ]
                            , MFillOpacity [ vNumber 0.6 ]
                            , MFill [ vScale (FName "cScale"), vField (FName "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "xScale" SBottom [ AxFormat "s" ]
    in
    toVega
        [ height 400, padding (PSize 5), ds, si [], topSc [], topMk [] ]


lineChart1 : Spec
lineChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (dNumbers [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (dNumbers [ 28, 20, 43, 35, 81, 10, 19, 15, 52, 48, 24, 28, 87, 66, 17, 27, 68, 16, 49, 25 ])
                << dataColumn "c" (dNumbers [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ SiValue (markInterpolationLabel Linear |> vStr)
                    , SiBind (ISelect [ InOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScPoint
                    , SRange (RDefault RWidth)
                    , SDomain (DoData [ dDataset "table", dField (str "x") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "table", dField (str "y") ])
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DoData [ dDataset "table", dField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Group
                    [ MFrom [ SFacet [ FaData "table", FaName "series", FaGroupBy [ "c" ] ] ]
                    , MGroup [ mkLine [] ]
                    ]

        mkLine =
            marks
                << mark Line
                    [ MFrom [ SData "series" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "x") ]
                            , MY [ vScale (FName "yScale"), vField (FName "y") ]
                            , MStroke [ vScale (FName "cScale"), vField (FName "c") ]
                            , MStrokeWidth [ vNumber 2 ]
                            ]
                        , Update [ MInterpolate [ vSignal "interpolate" ], MStrokeOpacity [ vNumber 1 ] ]
                        , Hover [ MStrokeOpacity [ vNumber 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart1 : Spec
areaChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (List.map toFloat (List.range 1 20) |> dNumbers)
                << dataColumn "v" (dNumbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ SiValue (markInterpolationLabel Linear |> vStr)
                    , SiBind (ISelect [ InOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SRange (RDefault RWidth)
                    , SZero False
                    , SDomain (DoData [ dDataset "table", dField (str "u") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "table", dField (str "v") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxTickCount 20 ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Area
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "u") ]
                            , MY [ vScale (FName "yScale"), vField (FName "v") ]
                            , MY2 [ vScale (FName "yScale"), vNumber 0 ]
                            , MFill [ vStr "steelblue" ]
                            ]
                        , Update [ MInterpolate [ vSignal "interpolate" ], MFillOpacity [ vNumber 1 ] ]
                        , Hover [ MFillOpacity [ vNumber 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart2 : Spec
areaChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (dNumbers [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (dNumbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (dNumbers [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table [] |> transform [ TStack [ StGroupBy [ "x" ], StSort [ CoField [ "c" ] ], StField "y" ] ] ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScPoint
                    , SRange (RDefault RWidth)
                    , SDomain (DoData [ dDataset "table", dField (str "x") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "table", dField (str "y1") ])
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DoData [ dDataset "table", dField (str "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxZIndex 1 ]
                << axis "yScale" SLeft [ AxZIndex 1 ]

        mk =
            marks
                << mark Group
                    [ MFrom [ SFacet [ FaData "table", FaName "series", FaGroupBy [ "c" ] ] ]
                    , MGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ SData "series" ]
                    , MEncode
                        [ Enter
                            [ MInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , MX [ vScale (FName "xScale"), vField (FName "x") ]
                            , MY [ vScale (FName "yScale"), vField (FName "y0") ]
                            , MY2 [ vScale (FName "yScale"), vField (FName "y1") ]
                            , MFill [ vScale (FName "cScale"), vField (FName "c") ]
                            ]
                        , Update [ MFillOpacity [ vNumber 1 ] ]
                        , Hover [ MFillOpacity [ vNumber 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (PSize 5), ds, sc [], ax [], mk [] ]


areaChart3 : Spec
areaChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (List.map toFloat (List.range 1 20) |> dNumbers)
                << dataColumn "y" (dNumbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        layerData =
            data "layer_indices" [ dValue (vNumbers [ 0, 1, 2, 3 ]) ]
                |> transform
                    [ TFilter (Expr "datum.data < layers")
                    , TFormula "datum.data * -height" "offset" AlwaysUpdate
                    ]

        ds =
            dataSource [ table [], layerData ]

        si =
            signals
                << signal "layers"
                    [ SiValue (vNumber 2)
                    , SiOn [ [ EEvents "mousedown!", EUpdate "1 + (layers % 4)" ] ]
                    , SiBind (ISelect [ InOptions (vNumbers [ 1, 2, 3, 4 ]) ])
                    ]
                << signal "height" [ SiUpdate "floor(200 / layers)" ]
                << signal "vheight" [ SiUpdate "height * layers" ]
                << signal "opacity" [ SiUpdate "pow(layers, -2/3)" ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SRange (RDefault RWidth)
                    , SZero False
                    , SRound True
                    , SDomain (DoData [ dDataset "table", dField (str "x") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RValues [ vSignal "vheight", vNumber 0 ])
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "table", dField (str "y") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ AxTickCount 20 ]

        mk =
            marks
                << mark Group
                    [ MEncode
                        [ Update
                            [ MWidth [ vField (FGroup (FName "width")) ]
                            , MHeight [ vField (FGroup (FName "height")) ]
                            , MGroupClip [ vBool True ]
                            ]
                        ]
                    , MGroup [ mk1 [] ]
                    ]

        mk1 =
            marks
                << mark Group
                    [ MFrom [ SData "layer_indices" ]
                    , MEncode [ Update [ MY [ vField (FName "offset") ] ] ]
                    , MGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , MX [ vScale (FName "xScale"), vField (FName "x") ]
                            , MFill [ vStr "steelblue" ]
                            ]
                        , Update
                            [ MY [ vScale (FName "yScale"), vField (FName "y") ]
                            , MY2 [ vScale (FName "yScale"), vNumber 0 ]
                            , MFillOpacity [ vSignal "opacity" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


areaChart4 : Spec
areaChart4 =
    let
        table =
            data "jobs" [ dUrl "https://vega.github.io/vega/data/jobs.json" ]
                |> transform
                    [ TFilter (Expr "(sex === 'all' || datum.sex === sex) && (!query || test(regexp(query,'i'), datum.job))")
                    , TStack
                        [ StGroupBy [ "year" ]
                        , StSort [ CoField [ "job", "sex" ], CoOrder [ Descend, Descend ] ]
                        , StField "perc"
                        ]
                    ]

        series =
            data "series" [ dSource "jobs" ]
                |> transform
                    [ TAggregate
                        [ AgGroupBy [ "job", "sex" ]
                        , AgFields [ "perc", "perc" ]
                        , AgOps [ Sum, ArgMax ]
                        , AgAs [ "sum", "argmax" ]
                        ]
                    ]

        ds =
            dataSource [ table, series ]

        si =
            signals
                << signal "sex"
                    [ SiValue (vStr "all")
                    , SiBind (IRadio [ InOptions (vStrs [ "men", "women", "all" ]) ])
                    ]
                << signal "query"
                    [ SiValue (vStr "")
                    , SiOn
                        [ [ EEvents "area:click!", EUpdate "datum.job" ]
                        , [ EEvents "dblclick!", EUpdate "''" ]
                        ]
                    , SiBind (IText [ InPlaceholder "search", InAutocomplete False ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SRange (RDefault RWidth)
                    , SZero False
                    , SRound True
                    , SDomain (DoData [ dDataset "jobs", dField (str "year") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SZero True
                    , SRound True
                    , SDomain (DoData [ dDataset "jobs", dField (str "y1") ])
                    ]
                << scale "cScale"
                    [ SType ScOrdinal
                    , SDomain (DoStrs [ "men", "women" ])
                    , SRange (RStrs [ "#33f", "#f33" ])
                    ]
                << scale "alphaScale"
                    [ SType ScLinear
                    , SZero True
                    , SDomain (DoData [ dDataset "series", dField (str "sum") ])
                    , SRange (RNumbers [ 0.4, 0.8 ])
                    ]
                << scale "fontScale"
                    [ SType ScSqrt
                    , SRange (RNumbers [ 0, 20 ])
                    , SZero True
                    , SRound True
                    , SDomain (DoData [ dDataset "series", dField (str "argmax.perc") ])
                    ]
                << scale "opacityScale"
                    [ SType ScQuantile
                    , SRange (RNumbers [ 0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0 ])
                    , SDomain (DoData [ dDataset "series", dField (str "argmax.perc") ])
                    ]
                << scale "alignScale"
                    [ SType ScQuantize
                    , SRange (RStrs [ "left", "center", "right" ])
                    , SZero False
                    , SDomain (DoNumbers [ 1730, 2130 ])
                    ]
                << scale "offsetScale"
                    [ SType ScQuantize
                    , SRange (RNumbers [ 6, 0, -6 ])
                    , SZero False
                    , SDomain (DoNumbers [ 1730, 2130 ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxFormat "d", AxTickCount 15 ]
                << axis "yScale"
                    SRight
                    [ AxFormat "%"
                    , AxGrid True
                    , AxDomain False
                    , AxTickSize 12
                    , AxEncode
                        [ ( EGrid, [ Enter [ MStroke [ vStr "#ccc" ] ] ] )
                        , ( ETicks, [ Enter [ MStroke [ vStr "#ccc" ] ] ] )
                        ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ SData "facet" ]
                    , MEncode
                        [ Update
                            [ MX [ vScale (FName "xScale"), vField (FName "year") ]
                            , MY [ vScale (FName "yScale"), vField (FName "y0") ]
                            , MY2 [ vScale (FName "yScale"), vField (FName "y1") ]
                            , MFill [ vScale (FName "cScale"), vField (FName "sex") ]
                            , MFillOpacity [ vScale (FName "alphaScale"), vField (FParent (FName "sum")) ]
                            ]
                        , Hover [ MFillOpacity [ vNumber 0.2 ] ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom
                        [ SData "series"
                        , SFacet [ FaData "jobs", FaName "facet", FaGroupBy [ "job", "sex" ] ]
                        ]
                    , MGroup [ mkArea [] ]
                    ]
                << mark Text
                    [ MFrom [ SData "series" ]
                    , MInteractive False
                    , MEncode
                        [ Update
                            [ MX [ vField (FName "argmax.year"), vScale (FName "xScale") ]
                            , MdX [ vField (FName "argmax.year"), vScale (FName "offsetScale") ]
                            , MY [ vSignal "scale('yScale', 0.5 * (datum.argmax.y0 + datum.argmax.y1))" ]
                            , MFill [ vStr "#000" ]
                            , MFillOpacity [ vField (FName "argmax.perc"), vScale (FName "opacityScale") ]
                            , MFontSize [ vField (FName "argmax.perc"), vScale (FName "fontScale"), vOffset (vNumber 5) ]
                            , MText [ vField (FName "job") ]
                            , MAlign [ vField (FName "argmax.year"), vScale (FName "alignScale") ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


circularChart1 : Spec
circularChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "id" (dNumbers [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "field" (dNumbers [ 4, 6, 10, 3, 7, 8 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TPie
                            [ PiField "field"
                            , PiStartAngle (SigNumRef "PI * startAngle / 180")
                            , PiEndAngle (SigNumRef "PI * endAngle / 180")
                            , PiSort (SigBoolRef "sort")
                            ]
                        ]
                ]

        si =
            signals
                << signal "startAngle" [ SiValue (vNumber 0), SiBind (IRange [ InMin 0, InMax 360, InStep 1 ]) ]
                << signal "endAngle" [ SiValue (vNumber 360), SiBind (IRange [ InMin 0, InMax 360, InStep 1 ]) ]
                << signal "padAngle" [ SiValue (vNumber 0), SiBind (IRange [ InMin 0, InMax 10, InStep 0.1 ]) ]
                << signal "innerRadius" [ SiValue (vNumber 0), SiBind (IRange [ InMin 0, InMax 90, InStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNumber 0), SiBind (IRange [ InMin 0, InMax 10, InStep 0.5 ]) ]
                << signal "sort" [ SiValue (vBool False), SiBind (ICheckbox []) ]

        sc =
            scales << scale "cScale" [ SType ScOrdinal, SRange (RScheme "category20" []) ]

        mk =
            marks
                << mark Arc
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MFill [ vScale (FName "cScale"), vField (FName "id") ]
                            , MX [ vSignal "width / 2" ]
                            , MY [ vSignal "height / 2" ]
                            ]
                        , Update
                            [ MStartAngle [ vField (FName "startAngle") ]
                            , MEndAngle [ vField (FName "endAngle") ]
                            , MPadAngle [ vSignal "PI * padAngle / 180" ]
                            , MInnerRadius [ vSignal "innerRadius" ]
                            , MOuterRadius [ vSignal "width / 2" ]
                            , MCornerRadius [ vSignal "cornerRadius" ]
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
                [ data "table" [ dValue (vNumbers [ 12, 23, 47, 6, 52, 19 ]) ]
                    |> transform [ TPie [ PiField "data" ] ]
                ]

        sc =
            scales
                << scale "rScale"
                    [ SType ScSqrt
                    , SDomain (DoData [ dDataset "table", dField (str "data") ])
                    , SRange (RNumbers [ 20, 100 ])
                    ]

        mk =
            marks
                << mark Arc
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ vField (FGroup (FName "width")), vMultiply (vNumber 0.5) ]
                            , MY [ vField (FGroup (FName "height")), vMultiply (vNumber 0.5) ]
                            , MStartAngle [ vField (FName "startAngle") ]
                            , MEndAngle [ vField (FName "endAngle") ]
                            , MInnerRadius [ vNumber 20 ]
                            , MOuterRadius [ vField (FName "data"), vScale (FName "rScale") ]
                            , MStroke [ vStr "#fff" ]
                            ]
                        , Update [ MFill [ vStr "#ccc" ] ]
                        , Hover [ MFill [ vStr "pink" ] ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ vField (FGroup (FName "width")), vMultiply (vNumber 0.5) ]
                            , MY [ vField (FGroup (FName "height")), vMultiply (vNumber 0.5) ]
                            , MRadius [ vField (FName "data"), vScale (FName "rScale"), vOffset (vNumber 8) ]
                            , MTheta [ vSignal "(datum.startAngle + datum.endAngle)/2" ]
                            , MFill [ vStr "#000" ]
                            , MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MText [ vField (FName "data") ]
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
                [ data "cars" [ dUrl "https://vega.github.io/vega/data/cars.json" ]
                    |> transform [ TFilter (Expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null") ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SRound True
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "cars", dField (str "Horsepower") ])
                    , SRange (RDefault RWidth)
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SRound True
                    , SNice NTrue
                    , SZero True
                    , SDomain (DoData [ dDataset "cars", dField (str "Miles_per_Gallon") ])
                    , SRange (RDefault RHeight)
                    ]
                << scale "sizeScale"
                    [ SType ScLinear
                    , SRound True
                    , SNice NFalse
                    , SZero True
                    , SDomain (DoData [ dDataset "cars", dField (str "Acceleration") ])
                    , SRange (RNumbers [ 4, 361 ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxGrid True, AxDomain False, AxTickCount 5, AxTitle (str "Horsepower") ]
                << axis "yScale" SLeft [ AxGrid True, AxDomain False, AxTickCount 5, AxTitle (str "Miles per gallon") ]

        shapeEncoding =
            [ MStrokeWidth [ vNumber 2 ]
            , MOpacity [ vNumber 0.5 ]
            , MStroke [ vStr "#4682b4" ]
            , MShape [ symbolLabel SymCircle |> vStr ]
            , MFill [ vStr "transparent" ]
            ]

        lg =
            legends
                << legend
                    [ LSize "sizeScale"
                    , LTitle "Acceleration"
                    , LFormat "s"
                    , LEncode [ EnSymbols [ Update shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark Symbol
                    [ MFrom [ SData "cars" ]
                    , MEncode
                        [ Update <|
                            [ MX [ vScale (FName "xScale"), vField (FName "Horsepower") ]
                            , MY [ vScale (FName "yScale"), vField (FName "Miles_per_Gallon") ]
                            , MSize [ vScale (FName "sizeScale"), vField (FName "Acceleration") ]
                            ]
                                ++ shapeEncoding
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding (PSize 5), ds, sc [], ax [], lg [], mk [] ]


scatterplot2 : Spec
scatterplot2 =
    let
        ds =
            dataSource
                [ data "movies" [ dUrl "https://vega.github.io/vega/data/movies.json" ] |> transform [ TFormula "datum.Title + ' (' + (year(datum.Release_Date) || '?') + ')'" "tooltip" AlwaysUpdate ]
                , data "valid" [ dSource "movies" ] |> transform [ TFilter (Expr "datum[xField] != null && datum[yField] != null") ]
                , data "nullXY" [ dSource "movies" ] |> transform [ TFilter (Expr "datum[xField] == null && datum[yField] == null"), TAggregate [] ]
                , data "nullY" [ dSource "movies" ] |> transform [ TFilter (Expr "datum[xField] != null && datum[yField] == null") ]
                , data "nullX" [ dSource "movies" ] |> transform [ TFilter (Expr "datum[xField] == null && datum[yField] != null") ]
                ]

        si =
            signals
                << signal "yField" [ SiValue (vStr "IMDB_Rating"), SiBind (ISelect [ InOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "xField" [ SiValue (vStr "Rotten_Tomatoes_Rating"), SiBind (ISelect [ InOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "nullSize" [ SiValue (vNumber 8) ]
                << signal "nullGap" [ SiUpdate "nullSize + 10" ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SNice NTrue
                    , SRange (RValues [ vSignal "nullGap", vSignal "width" ])
                    , SDomain (DoData [ dDataset "valid", dField (strSignal "xField") ])
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SNice NTrue
                    , SRange (RValues [ vSignal "height - nullGap", vNumber 0 ])
                    , SDomain (DoData [ dDataset "valid", dField (strSignal "yField") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxOffset (num 5), AxFormat "s", AxTitle (strSignal "xField") ]
                << axis "yScale" SLeft [ AxOffset (num 5), AxFormat "s", AxTitle (strSignal "yField") ]

        mk =
            marks
                << mark Symbol
                    [ MFrom [ SData "valid" ]
                    , MEncode
                        [ Enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (FName "tooltip") ]
                            ]
                        , Update
                            [ MX [ vScale (FName "xScale"), vField (FSignal "xField") ]
                            , MY [ vScale (FName "yScale"), vField (FSignal "yField") ]
                            , MFill [ vStr "steelblue" ]
                            , MFillOpacity [ vNumber 0.5 ]
                            , MZIndex [ vNumber 0 ]
                            ]
                        , Hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ SData "nullY" ]
                    , MEncode
                        [ Enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (FName "tooltip") ]
                            ]
                        , Update
                            [ MX [ vScale (FName "xScale"), vField (FSignal "xField") ]
                            , MY [ vSignal "height - nullSize/2" ]
                            , MFill [ vStr "#aaa" ]
                            , MFillOpacity [ vNumber 0.2 ]
                            ]
                        , Hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ SData "nullX" ]
                    , MEncode
                        [ Enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (FName "tooltip") ]
                            ]
                        , Update
                            [ MX [ vSignal "nullSize/2" ]
                            , MY [ vScale (FName "yScale"), vField (FSignal "yField") ]
                            , MFill [ vStr "#aaa" ]
                            , MFillOpacity [ vNumber 0.2 ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        , Hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MInteractive False
                    , MFrom [ SData "nullXY" ]
                    , MEncode
                        [ Update
                            [ MX [ vSignal "nullSize", vOffset (vNumber -4) ]
                            , MY [ vSignal "height", vOffset (vNumber 13) ]
                            , MText [ vSignal "datum.count + ' null'" ]
                            , MAlign [ hAlignLabel AlignRight |> vStr ]
                            , MBaseline [ vAlignLabel AlignTop |> vStr ]
                            , MFill [ vStr "#999" ]
                            , MFontSize [ vNumber 9 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 450, height 450, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


scatterplot3 : Spec
scatterplot3 =
    let
        ds =
            dataSource [ data "drive" [ dUrl "https://vega.github.io/vega/data/driving.json" ] ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "drive", dField (str "miles") ])
                    , SRange (RDefault RWidth)
                    , SNice NTrue
                    , SZero False
                    , SRound True
                    ]
                << scale "yScale"
                    [ SType ScLinear
                    , SDomain (DoData [ dDataset "drive", dField (str "gas") ])
                    , SRange (RDefault RHeight)
                    , SNice NTrue
                    , SZero False
                    , SRound True
                    ]
                << scale "alignScale"
                    [ SType ScOrdinal
                    , SDomain (DoStrs [ "left", "right", "top", "bottom" ])
                    , SRange (RStrs [ "right", "left", "center", "center" ])
                    ]
                << scale "baseScale"
                    [ SType ScOrdinal
                    , SDomain (DoStrs [ "left", "right", "top", "bottom" ])
                    , SRange (RStrs [ "middle", "middle", "bottom", "top" ])
                    ]
                << scale "dx"
                    [ SType ScOrdinal
                    , SDomain (DoStrs [ "left", "right", "top", "bottom" ])
                    , SRange (RNumbers [ -7, 6, 0, 0 ])
                    ]
                << scale "dy"
                    [ SType ScOrdinal
                    , SDomain (DoStrs [ "left", "right", "top", "bottom" ])
                    , SRange (RNumbers [ 1, 1, -5, 6 ])
                    ]

        ax =
            axes
                << axis "xScale"
                    STop
                    [ AxTickCount 5
                    , AxTickSize 0
                    , AxGrid True
                    , AxDomain False
                    , AxEncode
                        [ ( EDomain, [ Enter [ MStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ Enter
                                [ MAlign [ hAlignLabel AlignLeft |> vStr ]
                                , MBaseline [ vAlignLabel AlignTop |> vStr ]
                                , MFontSize [ vNumber 12 ]
                                , MFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "xScale"
                    SBottom
                    [ AxTitle (str "Miles driven per capita each year")
                    , AxDomain False
                    , AxTicks False
                    , AxLabels False
                    ]
                << axis "yScale"
                    SLeft
                    [ AxTickCount 5
                    , AxTickSize 0
                    , AxGrid True
                    , AxDomain False
                    , AxFormat "$0.2f"
                    , AxEncode
                        [ ( EDomain, [ Enter [ MStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ Enter
                                [ MAlign [ hAlignLabel AlignLeft |> vStr ]
                                , MBaseline [ vAlignLabel AlignBottom |> vStr ]
                                , MFontSize [ vNumber 12 ]
                                , MFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "yScale"
                    SRight
                    [ AxTitle (str "Price of a gallon of gasoline (adjusted for inflation)")
                    , AxDomain False
                    , AxTicks False
                    , AxLabels False
                    ]

        mk =
            marks
                << mark Line
                    [ MFrom [ SData "drive" ]
                    , MEncode
                        [ Enter
                            [ MInterpolate [ markInterpolationLabel Cardinal |> vStr ]
                            , MX [ vScale (FName "xScale"), vField (FName "miles") ]
                            , MY [ vScale (FName "yScale"), vField (FName "gas") ]
                            , MStroke [ vStr "#000" ]
                            , MStrokeWidth [ vNumber 3 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ SData "drive" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "miles") ]
                            , MY [ vScale (FName "yScale"), vField (FName "gas") ]
                            , MFill [ vStr "#fff" ]
                            , MStroke [ vStr "#000" ]
                            , MStrokeWidth [ vNumber 1 ]
                            , MSize [ vNumber 49 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ SData "drive" ]
                    , MEncode
                        [ Enter
                            [ MX [ vScale (FName "xScale"), vField (FName "miles") ]
                            , MY [ vScale (FName "yScale"), vField (FName "gas") ]
                            , MdX [ vScale (FName "dx"), vField (FName "side") ]
                            , MdY [ vScale (FName "dy"), vField (FName "side") ]
                            , MFill [ vStr "#000" ]
                            , MText [ vField (FName "year") ]
                            , MAlign [ vScale (FName "alignScale"), vField (FName "side") ]
                            , MBaseline [ vScale (FName "baseScale"), vField (FName "side") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding (PSize 5), ds, sc [], ax [], mk [] ]


scatterplot4 : Spec
scatterplot4 =
    let
        ds =
            dataSource
                [ data "barley" [ dUrl "https://vega.github.io/vega/data/barley.json" ]
                , data "summary" [ dSource "barley" ]
                    |> transform
                        [ TAggregate
                            [ AgGroupBy [ "variety" ]
                            , AgFields [ "yield", "yield", "yield", "yield", "yield", "yield", "yield" ]
                            , AgOps [ Mean, Stdev, Stderr, CI0, CI1, Q1, Q3 ]
                            , AgAs [ "mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1" ]
                            ]
                        , TFormula "datum.mean - datum.stdev" "stdev0" AlwaysUpdate
                        , TFormula "datum.mean + datum.stdev" "stdev1" AlwaysUpdate
                        , TFormula "datum.mean - datum.stderr" "stderr0" AlwaysUpdate
                        , TFormula "datum.mean + datum.stderr" "stderr1" AlwaysUpdate
                        ]
                ]

        si =
            signals
                << signal "errorMeasure"
                    [ SiValue (vStr "95% Confidence Interval")
                    , SiBind (ISelect [ InOptions (vStrs [ "95% Confidence Interval", "Standard Error", "Standard Deviation", "Interquartile Range" ]) ])
                    ]
                << signal "lookup"
                    [ SiValue
                        (vObject
                            [ keyValue "95% Confidence Interval" (vStr "ci")
                            , keyValue "Standard Deviation" (vStr "stdev")
                            , keyValue "Standard Error" (vStr "stderr")
                            , keyValue "Interquartile Range" (vStr "iqr")
                            ]
                        )
                    ]
                << signal "measure" [ SiUpdate "lookup[errorMeasure]" ]

        sc =
            scales
                << scale "xScale"
                    [ SType ScLinear
                    , SRange (RDefault RWidth)
                    , SDomain (DoData [ dDataset "summary", dFields (strs [ "stdev0", "stdev1" ]) ])
                    , SRound True
                    , SNice NTrue
                    , SZero False
                    ]
                << scale "yScale"
                    [ SType ScBand
                    , SRange (RDefault RHeight)
                    , SDomain (DoData [ dDataset "summary", dField (str "variety"), dSort [ Op Max, ByField "mean", Descending ] ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ AxZIndex 1, AxTitle (str "Barley Yield") ]
                << axis "yScale" SLeft [ AxTickCount 5, AxZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "summary" ]
                    , MEncode
                        [ Enter [ MFill [ vStr "black" ], MHeight [ vNumber 1 ] ]
                        , Update
                            [ MX [ vScale (FName "xScale"), vSignal "datum[measure+'0']" ]
                            , MY [ vScale (FName "yScale"), vField (FName "variety"), vBand 0.5 ]
                            , MX2 [ vScale (FName "xScale"), vSignal "datum[measure+'1']" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ SData "summary" ]
                    , MEncode
                        [ Enter [ MFill [ vStr "back" ], MSize [ vNumber 40 ] ]
                        , Update
                            [ MX [ vScale (FName "xScale"), vField (FName "mean") ]
                            , MY [ vScale (FName "yScale"), vField (FName "variety"), vBand 0.5 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 160, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    scatterplot3



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
