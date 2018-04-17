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
                        [ eventHandler "rect:mouseover" [ eUpdate "datum" ]
                        , eventHandler "rect:mouseout" [ eUpdate "" ]
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
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "category") ]
                            , MWidth [ vScale (fName "xScale"), vBand 1 ]
                            , MY [ vScale (fName "yScale"), vField (fName "amount") ]
                            , MY2 [ vScale (fName "yScale"), vNumber 0 ]
                            ]
                        , update [ MFill [ vStr "steelblue" ] ]
                        , hover [ MFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ enter
                            [ MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , MFill [ vStr "#333" ]
                            ]
                        , update
                            [ MX [ vScale (fName "xScale"), vSignal "tooltip.category", vBand 0.5 ]
                            , MY [ vScale (fName "yScale"), vSignal "tooltip.amount", vOffset (vNumber -2) ]
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
                            , StSort [ coField [ "c" ] ]
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
                << axis "xScale" SBottom [ axZIndex 1 ]
                << axis "yScale" SLeft [ axZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "x") ]
                            , MWidth [ vScale (fName "xScale"), vBand 1, vOffset (vNumber -1) ]
                            , MY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , MY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , MFill [ vScale (fName "cScale"), vField (fName "c") ]
                            ]
                        , update [ MFillOpacity [ vNumber 1 ] ]
                        , hover [ MFillOpacity [ vNumber 0.5 ] ]
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
                << axis "yScale" SLeft [ axTickSize 0, axLabelPadding 4, axZIndex 1 ]
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
                    , MFrom [ sData (str "facet") ]
                    , MEncode
                        [ enter
                            [ MY [ vScale (fName "pos"), vField (fName "position") ]
                            , MHeight [ vScale (fName "pos"), vBand 1 ]
                            , MX [ vScale (fName "xScale"), vField (fName "value") ]
                            , MX2 [ vScale (fName "xScale"), vBand 0 ]
                            , MFill [ vScale (fName "cScale"), vField (fName "position") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ sData (str "bars") ]
                    , MEncode
                        [ enter
                            [ MX [ vField (fName "x2"), vOffset (vNumber -5) ]
                            , MY [ vField (fName "y"), vOffset (vObject [ vField (fName "height"), vMultiply (vNumber 0.5) ]) ]
                            , MFill [ vStr "white" ]
                            , MAlign [ vStr (hAlignLabel AlignRight) ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MText [ vField (fName "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ sFacet "table" "facet" [ faGroupBy [ "category" ] ] ]
                    , MEncode [ enter [ MY [ vScale (fName "yScale"), vField (fName "category") ] ] ]
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
                    [ TAggregate [ agGroupBy [ "a", "b" ], agFields [ "c" ], agOps [ average ], agAs [ "c" ] ] ]

        trTable =
            data "trellis" [ dSource "tuples" ]
                |> transform
                    [ TAggregate [ agGroupBy [ "a" ] ]
                    , TFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span" AlwaysUpdate
                    , TStack [ StField "span" ]
                    , TExtentAsSignal "y1" "trellisExtent"
                    ]

        ds =
            dataSource [ agTable, trTable ]

        si =
            signals
                << signal "rangeStep" [ SiValue (vNumber 20), SiBind (iRange [ inMin 5, inMax 50, inStep 1 ]) ]
                << signal "innerPadding" [ SiValue (vNumber 0.1), SiBind (iRange [ inMin 0, inMax 0.7, inStep 0.01 ]) ]
                << signal "outerPadding" [ SiValue (vNumber 0.2), SiBind (iRange [ inMin 0, inMax 0.4, inStep 0.01 ]) ]
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
            axes << axis "xScale" SBottom [ axDomain True ]

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
                << axis "yScale" SLeft [ axTicks False, axDomain False, axLabelPadding 4 ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom [ sData (str "faceted_tuples") ]
                    , MEncode
                        [ enter
                            [ MX [ vNumber 0 ]
                            , MX2 [ vScale (fName "xScale"), vField (fName "c") ]
                            , MFill [ vScale (fName "cScale"), vField (fName "a") ]
                            , MStrokeWidth [ vNumber 2 ]
                            ]
                        , update
                            [ MY [ vScale (fName "yScale"), vField (fName "b") ]
                            , MHeight [ vScale (fName "yScale"), vBand 1 ]
                            , MStroke [ vNull ]
                            , MZIndex [ vNumber 0 ]
                            ]
                        , hover
                            [ MStroke [ vStr "firebrick" ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ sData (str "trellis"), sFacet "tuples" "faceted_tuples" [ faGroupBy [ "a" ] ] ]
                    , MEncode
                        [ enter [ MX [ vNumber 0 ], MWidth [ vSignal "width" ] ]
                        , update [ MY [ vField (fName "y0") ], MY2 [ vField (fName "y1") ] ]
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
                , data "popYear" [ dSource "population" ] |> transform [ TFilter (expr "datum.year == year") ]
                , data "males" [ dSource "popYear" ] |> transform [ TFilter (expr "datum.sex == 1") ]
                , data "females" [ dSource "popYear" ] |> transform [ TFilter (expr "datum.sex == 2") ]
                , data "ageGroups" [ dSource "population" ] |> transform [ TAggregate [ agGroupBy [ "age" ] ] ]
                ]

        si =
            signals
                << signal "chartWidth" [ SiValue (vNumber 300) ]
                << signal "chartPad" [ SiValue (vNumber 20) ]
                << signal "width" [ SiUpdate "2 * chartWidth + chartPad" ]
                << signal "year" [ SiValue (vNumber 2000), SiBind (iRange [ inMin 1850, inMax 2000, inStep 10 ]) ]

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
                    , MFrom [ sData (str "ageGroups") ]
                    , MEncode
                        [ enter
                            [ MX [ vSignal "chartWidth + chartPad / 2" ]
                            , MY [ vScale (fName "yScale"), vField (fName "age"), vBand 0.5 ]
                            , MText [ vField (fName "age") ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MFill [ vStr "#000" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ MEncode [ update [ MX [ vNumber 0 ], MHeight [ vSignal "height" ] ] ]
                    , MGroup [ sc Female [], ax [], mk Female [] ]
                    ]
                << mark Group
                    [ MEncode [ update [ MX [ vSignal "chartWidth + chartPad" ], MHeight [ vSignal "height" ] ] ]
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
                    [ MFrom [ sData (str genderField) ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "people") ]
                            , MX2 [ vScale (fName "xScale"), vNumber 0 ]
                            , MY [ vScale (fName "yScale"), vField (fName "age") ]
                            , MHeight [ vScale (fName "yScale"), vBand 1, vOffset (vNumber -1) ]
                            , MFillOpacity [ vNumber 0.6 ]
                            , MFill [ vScale (fName "cScale"), vField (fName "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "xScale" SBottom [ axFormat "s" ]
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
                    , SiBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
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
                    [ MFrom [ sFacet "table" "series" [ faGroupBy [ "c" ] ] ]
                    , MGroup [ mkLine [] ]
                    ]

        mkLine =
            marks
                << mark Line
                    [ MFrom [ sData (str "series") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "x") ]
                            , MY [ vScale (fName "yScale"), vField (fName "y") ]
                            , MStroke [ vScale (fName "cScale"), vField (fName "c") ]
                            , MStrokeWidth [ vNumber 2 ]
                            ]
                        , update [ MInterpolate [ vSignal "interpolate" ], MStrokeOpacity [ vNumber 1 ] ]
                        , hover [ MStrokeOpacity [ vNumber 0.5 ] ]
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
                    , SiBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
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
                << axis "xScale" SBottom [ axTickCount 20 ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Area
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "u") ]
                            , MY [ vScale (fName "yScale"), vField (fName "v") ]
                            , MY2 [ vScale (fName "yScale"), vNumber 0 ]
                            , MFill [ vStr "steelblue" ]
                            ]
                        , update [ MInterpolate [ vSignal "interpolate" ], MFillOpacity [ vNumber 1 ] ]
                        , hover [ MFillOpacity [ vNumber 0.5 ] ]
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
                [ table [] |> transform [ TStack [ StGroupBy [ "x" ], StSort [ coField [ "c" ] ], StField "y" ] ] ]

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
                << axis "xScale" SBottom [ axZIndex 1 ]
                << axis "yScale" SLeft [ axZIndex 1 ]

        mk =
            marks
                << mark Group
                    [ MFrom [ sFacet "table" "series" [ faGroupBy [ "c" ] ] ]
                    , MGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ sData (str "series") ]
                    , MEncode
                        [ enter
                            [ MInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , MX [ vScale (fName "xScale"), vField (fName "x") ]
                            , MY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , MY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , MFill [ vScale (fName "cScale"), vField (fName "c") ]
                            ]
                        , update [ MFillOpacity [ vNumber 1 ] ]
                        , hover [ MFillOpacity [ vNumber 0.5 ] ]
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
                    [ TFilter (expr "datum.data < layers")
                    , TFormula "datum.data * -height" "offset" AlwaysUpdate
                    ]

        ds =
            dataSource [ table [], layerData ]

        si =
            signals
                << signal "layers"
                    [ SiValue (vNumber 2)
                    , SiOn [ eventHandler "mousedown!" [ eUpdate "1 + (layers % 4)" ] ]
                    , SiBind (iSelect [ inOptions (vNumbers [ 1, 2, 3, 4 ]) ])
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
            axes << axis "xScale" SBottom [ axTickCount 20 ]

        mk =
            marks
                << mark Group
                    [ MEncode
                        [ update
                            [ MWidth [ vField (fGroup (fName "width")) ]
                            , MHeight [ vField (fGroup (fName "height")) ]
                            , MGroupClip [ vBool True ]
                            ]
                        ]
                    , MGroup [ mk1 [] ]
                    ]

        mk1 =
            marks
                << mark Group
                    [ MFrom [ sData (str "layer_indices") ]
                    , MEncode [ update [ MY [ vField (fName "offset") ] ] ]
                    , MGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MInterpolate [ vStr (markInterpolationLabel Monotone) ]
                            , MX [ vScale (fName "xScale"), vField (fName "x") ]
                            , MFill [ vStr "steelblue" ]
                            ]
                        , update
                            [ MY [ vScale (fName "yScale"), vField (fName "y") ]
                            , MY2 [ vScale (fName "yScale"), vNumber 0 ]
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
                    [ TFilter (expr "(sex === 'all' || datum.sex === sex) && (!query || test(regexp(query,'i'), datum.job))")
                    , TStack
                        [ StGroupBy [ "year" ]
                        , StSort [ coField [ "job", "sex" ], coOrder [ Descend, Descend ] ]
                        , StField "perc"
                        ]
                    ]

        series =
            data "series" [ dSource "jobs" ]
                |> transform
                    [ TAggregate
                        [ agGroupBy [ "job", "sex" ]
                        , agFields [ "perc", "perc" ]
                        , agOps [ sum, argMax ]
                        , agAs [ "sum", "argmax" ]
                        ]
                    ]

        ds =
            dataSource [ table, series ]

        si =
            signals
                << signal "sex"
                    [ SiValue (vStr "all")
                    , SiBind (iRadio [ inOptions (vStrs [ "men", "women", "all" ]) ])
                    ]
                << signal "query"
                    [ SiValue (vStr "")
                    , SiOn
                        [ eventHandler "area:click!" [ eUpdate "datum.job" ]
                        , eventHandler "dblclick!" [ eUpdate "''" ]
                        ]
                    , SiBind (iText [ inPlaceholder "search", inAutocomplete False ])
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
                << axis "xScale" SBottom [ axFormat "d", axTickCount 15 ]
                << axis "yScale"
                    SRight
                    [ axFormat "%"
                    , axGrid True
                    , axDomain False
                    , axTickSize 12
                    , axEncode
                        [ ( EGrid, [ enter [ MStroke [ vStr "#ccc" ] ] ] )
                        , ( ETicks, [ enter [ MStroke [ vStr "#ccc" ] ] ] )
                        ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ MFrom [ sData (str "facet") ]
                    , MEncode
                        [ update
                            [ MX [ vScale (fName "xScale"), vField (fName "year") ]
                            , MY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , MY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            , MFill [ vScale (fName "cScale"), vField (fName "sex") ]
                            , MFillOpacity [ vScale (fName "alphaScale"), vField (fParent (fName "sum")) ]
                            ]
                        , hover [ MFillOpacity [ vNumber 0.2 ] ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom
                        [ sData (str "series")
                        , sFacet "jobs" "facet" [ faGroupBy [ "job", "sex" ] ]
                        ]
                    , MGroup [ mkArea [] ]
                    ]
                << mark Text
                    [ MFrom [ sData (str "series") ]
                    , MInteractive False
                    , MEncode
                        [ update
                            [ MX [ vField (fName "argmax.year"), vScale (fName "xScale") ]
                            , MdX [ vField (fName "argmax.year"), vScale (fName "offsetScale") ]
                            , MY [ vSignal "scale('yScale', 0.5 * (datum.argmax.y0 + datum.argmax.y1))" ]
                            , MFill [ vStr "#000" ]
                            , MFillOpacity [ vField (fName "argmax.perc"), vScale (fName "opacityScale") ]
                            , MFontSize [ vField (fName "argmax.perc"), vScale (fName "fontScale"), vOffset (vNumber 5) ]
                            , MText [ vField (fName "job") ]
                            , MAlign [ vField (fName "argmax.year"), vScale (fName "alignScale") ]
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
                << signal "startAngle" [ SiValue (vNumber 0), SiBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "endAngle" [ SiValue (vNumber 360), SiBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "padAngle" [ SiValue (vNumber 0), SiBind (iRange [ inMin 0, inMax 10, inStep 0.1 ]) ]
                << signal "innerRadius" [ SiValue (vNumber 0), SiBind (iRange [ inMin 0, inMax 90, inStep 1 ]) ]
                << signal "cornerRadius" [ SiValue (vNumber 0), SiBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "sort" [ SiValue (vBool False), SiBind (iCheckbox []) ]

        sc =
            scales << scale "cScale" [ SType ScOrdinal, SRange (RScheme "category20" []) ]

        mk =
            marks
                << mark Arc
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MFill [ vScale (fName "cScale"), vField (fName "id") ]
                            , MX [ vSignal "width / 2" ]
                            , MY [ vSignal "height / 2" ]
                            ]
                        , update
                            [ MStartAngle [ vField (fName "startAngle") ]
                            , MEndAngle [ vField (fName "endAngle") ]
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
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MX [ vField (fGroup (fName "width")), vMultiply (vNumber 0.5) ]
                            , MY [ vField (fGroup (fName "height")), vMultiply (vNumber 0.5) ]
                            , MStartAngle [ vField (fName "startAngle") ]
                            , MEndAngle [ vField (fName "endAngle") ]
                            , MInnerRadius [ vNumber 20 ]
                            , MOuterRadius [ vField (fName "data"), vScale (fName "rScale") ]
                            , MStroke [ vStr "#fff" ]
                            ]
                        , update [ MFill [ vStr "#ccc" ] ]
                        , hover [ MFill [ vStr "pink" ] ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ sData (str "table") ]
                    , MEncode
                        [ enter
                            [ MX [ vField (fGroup (fName "width")), vMultiply (vNumber 0.5) ]
                            , MY [ vField (fGroup (fName "height")), vMultiply (vNumber 0.5) ]
                            , MRadius [ vField (fName "data"), vScale (fName "rScale"), vOffset (vNumber 8) ]
                            , MTheta [ vSignal "(datum.startAngle + datum.endAngle)/2" ]
                            , MFill [ vStr "#000" ]
                            , MAlign [ vStr (hAlignLabel AlignCenter) ]
                            , MBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , MText [ vField (fName "data") ]
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
                    |> transform [ TFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null") ]
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
                << axis "xScale" SBottom [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Horsepower") ]
                << axis "yScale" SLeft [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Miles per gallon") ]

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
                    , LEncode [ EnSymbols [ update shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark Symbol
                    [ MFrom [ sData (str "cars") ]
                    , MEncode
                        [ update <|
                            [ MX [ vScale (fName "xScale"), vField (fName "Horsepower") ]
                            , MY [ vScale (fName "yScale"), vField (fName "Miles_per_Gallon") ]
                            , MSize [ vScale (fName "sizeScale"), vField (fName "Acceleration") ]
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
                , data "valid" [ dSource "movies" ] |> transform [ TFilter (expr "datum[xField] != null && datum[yField] != null") ]
                , data "nullXY" [ dSource "movies" ] |> transform [ TFilter (expr "datum[xField] == null && datum[yField] == null"), TAggregate [] ]
                , data "nullY" [ dSource "movies" ] |> transform [ TFilter (expr "datum[xField] != null && datum[yField] == null") ]
                , data "nullX" [ dSource "movies" ] |> transform [ TFilter (expr "datum[xField] == null && datum[yField] != null") ]
                ]

        si =
            signals
                << signal "yField" [ SiValue (vStr "IMDB_Rating"), SiBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "xField" [ SiValue (vStr "Rotten_Tomatoes_Rating"), SiBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
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
                << axis "xScale" SBottom [ axOffset (num 5), axFormat "s", axTitle (strSignal "xField") ]
                << axis "yScale" SLeft [ axOffset (num 5), axFormat "s", axTitle (strSignal "yField") ]

        mk =
            marks
                << mark Symbol
                    [ MFrom [ sData (str "valid") ]
                    , MEncode
                        [ enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (fName "tooltip") ]
                            ]
                        , update
                            [ MX [ vScale (fName "xScale"), vField (fSignal "xField") ]
                            , MY [ vScale (fName "yScale"), vField (fSignal "yField") ]
                            , MFill [ vStr "steelblue" ]
                            , MFillOpacity [ vNumber 0.5 ]
                            , MZIndex [ vNumber 0 ]
                            ]
                        , hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ sData (str "nullY") ]
                    , MEncode
                        [ enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (fName "tooltip") ]
                            ]
                        , update
                            [ MX [ vScale (fName "xScale"), vField (fSignal "xField") ]
                            , MY [ vSignal "height - nullSize/2" ]
                            , MFill [ vStr "#aaa" ]
                            , MFillOpacity [ vNumber 0.2 ]
                            ]
                        , hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ sData (str "nullX") ]
                    , MEncode
                        [ enter
                            [ MSize [ vNumber 50 ]
                            , MTooltip [ vField (fName "tooltip") ]
                            ]
                        , update
                            [ MX [ vSignal "nullSize/2" ]
                            , MY [ vScale (fName "yScale"), vField (fSignal "yField") ]
                            , MFill [ vStr "#aaa" ]
                            , MFillOpacity [ vNumber 0.2 ]
                            , MZIndex [ vNumber 1 ]
                            ]
                        , hover
                            [ MFill [ vStr "firebrick" ]
                            , MFillOpacity [ vNumber 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MInteractive False
                    , MFrom [ sData (str "nullXY") ]
                    , MEncode
                        [ update
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
                    [ axTickCount 5
                    , axTickSize 0
                    , axGrid True
                    , axDomain False
                    , axEncode
                        [ ( EDomain, [ enter [ MStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enter
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
                        [ ( EDomain, [ enter [ MStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enter
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
                    [ axTitle (str "Price of a gallon of gasoline (adjusted for inflation)")
                    , axDomain False
                    , axTicks False
                    , axLabels False
                    ]

        mk =
            marks
                << mark Line
                    [ MFrom [ sData (str "drive") ]
                    , MEncode
                        [ enter
                            [ MInterpolate [ markInterpolationLabel Cardinal |> vStr ]
                            , MX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , MY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , MStroke [ vStr "#000" ]
                            , MStrokeWidth [ vNumber 3 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ sData (str "drive") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , MY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , MFill [ vStr "#fff" ]
                            , MStroke [ vStr "#000" ]
                            , MStrokeWidth [ vNumber 1 ]
                            , MSize [ vNumber 49 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ sData (str "drive") ]
                    , MEncode
                        [ enter
                            [ MX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , MY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , MdX [ vScale (fName "dx"), vField (fName "side") ]
                            , MdY [ vScale (fName "dy"), vField (fName "side") ]
                            , MFill [ vStr "#000" ]
                            , MText [ vField (fName "year") ]
                            , MAlign [ vScale (fName "alignScale"), vField (fName "side") ]
                            , MBaseline [ vScale (fName "baseScale"), vField (fName "side") ]
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
                            [ agGroupBy [ "variety" ]
                            , agFields [ "yield", "yield", "yield", "yield", "yield", "yield", "yield" ]
                            , agOps [ mean, stdev, stderr, ci0, ci1, q1, q3 ]
                            , agAs [ "mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1" ]
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
                    , SiBind (iSelect [ inOptions (vStrs [ "95% Confidence Interval", "Standard Error", "Standard Deviation", "Interquartile Range" ]) ])
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
                    , SDomain (DoData [ dDataset "summary", dField (str "variety"), dSort [ op maximum, byField (str "mean"), Descending ] ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex 1, axTitle (str "Barley Yield") ]
                << axis "yScale" SLeft [ axTickCount 5, axZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ sData (str "summary") ]
                    , MEncode
                        [ enter [ MFill [ vStr "black" ], MHeight [ vNumber 1 ] ]
                        , update
                            [ MX [ vScale (fName "xScale"), vSignal "datum[measure+'0']" ]
                            , MY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
                            , MX2 [ vScale (fName "xScale"), vSignal "datum[measure+'1']" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ MFrom [ sData (str "summary") ]
                    , MEncode
                        [ enter [ MFill [ vStr "back" ], MSize [ vNumber 40 ] ]
                        , update
                            [ MX [ vScale (fName "xScale"), vField (fName "mean") ]
                            , MY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
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
