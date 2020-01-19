port module GalleryBar exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


barChart1 : Spec
barChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "tooltip"
                    [ siValue (vObject [])
                    , siOn
                        [ evHandler [ esObject [ esMark rect, esType etMouseOver ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esMark rect, esType etMouseOut ] ] [ evUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange raWidth
                    , scPadding (num 0.05)
                    , scRound true
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scNice niTrue
                    , scRange raHeight
                    ]

        ax =
            axes
                << axis "xScale" siBottom []
                << axis "yScale" siLeft []

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        , enUpdate [ maFill [ vStr "steelblue" ] ]
                        , enHover [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            , maFill [ vStr "#333" ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "tooltip.category", vBand (num 0.5) ]
                            , maY [ vScale "yScale", vSignal "tooltip.amount", vOffset (vNum -2) ]
                            , maText [ vSignal "tooltip.amount" ]
                            , maFillOpacity [ ifElse "datum === tooltip" [ vNum 0 ] [ vNum 1 ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]


barChart2 : Spec
barChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange raWidth
                    , scPadding (num 0.05)
                    , scRound true
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scNice niTrue
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scRange (raScheme (str "browns") [])
                    ]

        ax =
            axes
                << axis "xScale" siBottom []
                << axis "yScale" siLeft []

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill
                                [ vGradientScale (vScale "cScale")
                                    [ grStart (nums [ 1, 0 ]), grStop (nums [ 1, 3 ]) ]
                                ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, sc [], ax [], mk [] ]


barChart3 : Spec
barChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (vNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (vNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trStack
                            [ stGroupBy [ field "x" ]
                            , stSort [ ( field "c", ascend ) ]
                            , stField (field "y")
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scRange raWidth
                    , scDomain (doData [ daDataset "table", daField (field "x") ])
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scRange raHeight
                    , scNice niTrue
                    , scZero true
                    , scDomain (doData [ daDataset "table", daField (field "y1") ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "table", daField (field "c") ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axZIndex (num 1) ]
                << axis "yScale" siLeft [ axZIndex (num 1) ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "x") ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "y0") ]
                            , maY2 [ vScale "yScale", vField (field "y1") ]
                            , maFill [ vScale "cScale", vField (field "c") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding 5, ds, sc [], ax [], mk [] ]


barChart4 : Spec
barChart4 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (vStrs [ "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C" ])
                << dataColumn "position" (vNums [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ])
                << dataColumn "value" (vNums [ 0.1, 0.6, 0.9, 0.4, 0.7, 0.2, 1.1, 0.8, 0.6, 0.1, 0.2, 0.7 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yScale"
                    [ scType scBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange raHeight
                    , scPadding (num 0.2)
                    ]
                << scale "xScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "value") ])
                    , scRange raWidth
                    , scRound true
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "table", daField (field "position") ])
                    , scRange (raScheme (str "category20") [])
                    ]

        ax =
            axes
                << axis "yScale" siLeft [ axTickSize (num 0), axLabelPadding (num 4), axZIndex (num 1) ]
                << axis "xScale" siBottom []

        nestedSi =
            signals
                << signal "height" [ siUpdate "bandwidth('yScale')" ]

        nestedSc =
            scales
                << scale "pos"
                    [ scType scBand
                    , scRange raHeight
                    , scDomain (doData [ daDataset "facet", daField (field "position") ])
                    ]

        nestedMk =
            marks
                << mark rect
                    [ mName "bars"
                    , mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "pos", vField (field "position") ]
                            , maHeight [ vScale "pos", vBand (num 1) ]
                            , maX [ vScale "xScale", vField (field "value") ]
                            , maX2 [ vScale "xScale", vBand (num 0) ]
                            , maFill [ vScale "cScale", vField (field "position") ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "bars") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (field "x2"), vOffset (vNum -5) ]
                            , maY [ vField (field "y"), vOffset (vObject [ vField (field "height"), vMultiply (vNum 0.5) ]) ]
                            , maFill [ white ]
                            , maAlign [ hRight ]
                            , maBaseline [ vMiddle ]
                            , maText [ vField (field "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark group
                    [ mFrom [ srFacet (str "table") "facet" [ faGroupBy [ field "category" ] ] ]
                    , mEncode [ enEnter [ maY [ vScale "yScale", vField (field "category") ] ] ]
                    , mGroup [ nestedSi [], nestedSc [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, height 240, padding 5, ds, sc [], ax [], mk [] ]


barChart5 : Spec
barChart5 =
    let
        table =
            dataFromColumns "tuples" []
                << dataColumn "a" (vNums [ 0, 0, 0, 0, 1, 2, 2 ])
                << dataColumn "b" (vStrs [ "a", "a", "b", "c", "b", "b", "c" ])
                << dataColumn "c" (vNums [ 6.3, 4.2, 6.8, 5.1, 4.4, 3.5, 6.2 ])

        agTable =
            table []
                |> transform
                    [ trAggregate
                        [ agGroupBy [ field "a", field "b" ]
                        , agFields [ field "c" ]
                        , agOps [ opMean ]
                        , agAs [ "c" ]
                        ]
                    ]

        trTable =
            data "trellis" [ daSource "tuples" ]
                |> transform
                    [ trAggregate [ agGroupBy [ field "a" ] ]
                    , trFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span"
                    , trStack [ stField (field "span") ]
                    , trExtentAsSignal (field "y1") "trellisExtent"
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
                    [ scDomain (doData [ daDataset "tuples", daField (field "c") ])
                    , scNice niTrue
                    , scZero true
                    , scRound true
                    , scRange raWidth
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "trellis", daField (field "a") ])
                    ]

        ax =
            axes << axis "xScale" siBottom [ axDomain true ]

        nestedSc =
            scales
                << scale "yScale"
                    [ scType scBand
                    , scPaddingInner (numSignal "innerPadding")
                    , scPaddingOuter (numSignal "outerPadding")
                    , scRound true
                    , scDomain (doData [ daDataset "faceted_tuples", daField (field "b") ])
                    , scRange (raStep (vSignal "rangeStep"))
                    ]

        nestedAx =
            axes
                << axis "yScale" siLeft [ axTicks false, axDomain false, axLabelPadding (num 4) ]

        nestedMk =
            marks
                << mark rect
                    [ mFrom [ srData (str "faceted_tuples") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maX2 [ vScale "xScale", vField (field "c") ]
                            , maFill [ vScale "cScale", vField (field "a") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        , enUpdate
                            [ maY [ vScale "yScale", vField (field "b") ]
                            , maHeight [ vScale "yScale", vBand (num 1) ]
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
                << mark group
                    [ mFrom [ srData (str "trellis"), srFacet (str "tuples") "faceted_tuples" [ faGroupBy [ field "a" ] ] ]
                    , mEncode
                        [ enEnter [ maX [ vNum 0 ], maWidth [ vSignal "width" ] ]
                        , enUpdate [ maY [ vField (field "y0") ], maY2 [ vField (field "y1") ] ]
                        ]
                    , mGroup [ nestedSc [], nestedAx [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, padding 5, autosize [ asPad ], ds, si [], sc [], ax [], mk [] ]


type Gender
    = Male
    | Female


barChart6 : Spec
barChart6 =
    let
        ds =
            dataSource
                [ data "population" [ daUrl (str "https://vega.github.io/vega/data/population.json") ]
                , data "popYear" [ daSource "population" ] |> transform [ trFilter (expr "datum.year == year") ]
                , data "males" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 1") ]
                , data "females" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 2") ]
                , data "ageGroups" [ daSource "population" ] |> transform [ trAggregate [ agGroupBy [ field "age" ] ] ]
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
                    [ scType scBand
                    , scRange (raValues [ vSignal "height", vNum 0 ])
                    , scRound true
                    , scDomain (doData [ daDataset "ageGroups", daField (field "age") ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doNums (nums [ 1, 2 ]))
                    , scRange (raStrs [ "#d5855a", "#6c4e97" ])
                    ]

        topMk =
            marks
                << mark text
                    [ mInteractive false
                    , mFrom [ srData (str "ageGroups") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vSignal "chartWidth + chartPad / 2" ]
                            , maY [ vScale "yScale", vField (field "age"), vBand (num 0.5) ]
                            , maText [ vField (field "age") ]
                            , maBaseline [ vMiddle ]
                            , maAlign [ hCenter ]
                            , maFill [ vStr "#000" ]
                            ]
                        ]
                    ]
                << mark group
                    [ mEncode [ enUpdate [ maX [ vNum 0 ], maHeight [ vSignal "height" ] ] ]
                    , mGroup [ sc Female [], ax [], mk Female [] ]
                    ]
                << mark group
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
                    [ scType scLinear
                    , range
                    , scNice niTrue
                    , scDomain (doData [ daDataset "population", daField (field "people") ])
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
                << mark rect
                    [ mFrom [ srData (str genderField) ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "people") ]
                            , maX2 [ vScale "xScale", vNum 0 ]
                            , maY [ vScale "yScale", vField (field "age") ]
                            , maHeight [ vScale "yScale", vBand (num 1), vOffset (vNum -1) ]
                            , maFillOpacity [ vNum 0.6 ]
                            , maFill [ vScale "cScale", vField (field "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "xScale" siBottom [ axFormat (str "s") ]
    in
    toVega
        [ height 400, padding 5, ds, si [], topSc [], topMk [] ]


sourceExample : Spec
sourceExample =
    barChart2



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "barChart1", barChart1 )
        , ( "barChart2", barChart2 )
        , ( "barChart3", barChart3 )
        , ( "barChart4", barChart4 )
        , ( "barChart5", barChart5 )
        , ( "barChart6", barChart6 )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program () Spec msg
main =
    Browser.element
        { init = always ( mySpecs, elmToJS mySpecs )
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
