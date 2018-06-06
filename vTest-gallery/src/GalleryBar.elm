port module GalleryBar exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


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
                        [ evHandler (esObject [ esMark Rect, esType MouseOver ]) [ evUpdate "datum" ]
                        , evHandler (esObject [ esMark Rect, esType MouseOut ]) [ evUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange (raDefault RWidth)
                    , scPadding (num 0.05)
                    , scRound (boo True)
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scNice NTrue
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
                            [ maX [ vScale (field "xScale"), vField (field "category") ]
                            , maWidth [ vScale (field "xScale"), vBand 1 ]
                            , maY [ vScale (field "yScale"), vField (field "amount") ]
                            , maY2 [ vScale (field "yScale"), vNum 0 ]
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
                            [ maX [ vScale (field "xScale"), vSignal "tooltip.category", vBand 0.5 ]
                            , maY [ vScale (field "yScale"), vSignal "tooltip.amount", vOffset (vNum -2) ]
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
                << dataColumn "x" (daNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (daNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (daNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trStack
                            [ stGroupBy [ field "x" ]
                            , stSort [ ( field "c", Ascend ) ]
                            , stField (field "y")
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "table", daField (field "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scNice NTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "table", daField (field "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "table", daField (field "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex (num 1) ]
                << axis "yScale" SLeft [ axZIndex (num 1) ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (field "xScale"), vField (field "x") ]
                            , maWidth [ vScale (field "xScale"), vBand 1, vOffset (vNum -1) ]
                            , maY [ vScale (field "yScale"), vField (field "y0") ]
                            , maY2 [ vScale (field "yScale"), vField (field "y1") ]
                            , maFill [ vScale (field "cScale"), vField (field "c") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
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
                << dataColumn "category" (daStrs [ "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C" ])
                << dataColumn "position" (daNums [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ])
                << dataColumn "value" (daNums [ 0.1, 0.6, 0.9, 0.4, 0.7, 0.2, 1.1, 0.8, 0.6, 0.1, 0.2, 0.7 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange (raDefault RHeight)
                    , scPadding (num 0.2)
                    ]
                << scale "xScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (field "value") ])
                    , scRange (raDefault RWidth)
                    , scRound (boo True)
                    , scZero (boo True)
                    , scNice NTrue
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doData [ daDataset "table", daField (field "position") ])
                    , scRange (raScheme "category20" [])
                    ]

        ax =
            axes
                << axis "yScale" SLeft [ axTickSize (num 0), axLabelPadding (num 4), axZIndex (num 1) ]
                << axis "xScale" SBottom []

        nestedSi =
            signals
                << signal "height" [ siUpdate "bandwidth('yScale')" ]

        nestedSc =
            scales
                << scale "pos"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "facet", daField (field "position") ])
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ mName "bars"
                    , mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enEnter
                            [ maY [ vScale (field "pos"), vField (field "position") ]
                            , maHeight [ vScale (field "pos"), vBand 1 ]
                            , maX [ vScale (field "xScale"), vField (field "value") ]
                            , maX2 [ vScale (field "xScale"), vBand 0 ]
                            , maFill [ vScale (field "cScale"), vField (field "position") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "bars") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (field "x2"), vOffset (vNum -5) ]
                            , maY [ vField (field "y"), vOffset (vObject [ vField (field "height"), vMultiply (vNum 0.5) ]) ]
                            , maFill [ vStr "white" ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maText [ vField (field "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "table" "facet" [ faGroupBy [ "category" ] ] ]
                    , mEncode [ enEnter [ maY [ vScale (field "yScale"), vField (field "category") ] ] ]
                    , mGroup [ nestedSi [], nestedSc [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, height 240, padding 5, ds, sc [], ax [], mk [] ]


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
                    [ trAggregate
                        [ agGroupBy [ field "a", field "b" ]
                        , agFields [ field "c" ]
                        , agOps [ Average ]
                        , agAs [ "c" ]
                        ]
                    ]

        trTable =
            data "trellis" [ daSource "tuples" ]
                |> transform
                    [ trAggregate [ agGroupBy [ field "a" ] ]
                    , trFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span" AlwaysUpdate
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
                    , scNice NTrue
                    , scZero (boo True)
                    , scRound (boo True)
                    , scRange (raDefault RWidth)
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "trellis", daField (field "a") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ axDomain (boo True) ]

        nestedSc =
            scales
                << scale "yScale"
                    [ scType ScBand
                    , scPaddingInner (numSignal "innerPadding")
                    , scPaddingOuter (numSignal "outerPadding")
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "faceted_tuples", daField (field "b") ])
                    , scRange (raStep (vSignal "rangeStep"))
                    ]

        nestedAx =
            axes
                << axis "yScale" SLeft [ axTicks (boo False), axDomain (boo False), axLabelPadding (num 4) ]

        nestedMk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "faceted_tuples") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maX2 [ vScale (field "xScale"), vField (field "c") ]
                            , maFill [ vScale (field "cScale"), vField (field "a") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        , enUpdate
                            [ maY [ vScale (field "yScale"), vField (field "b") ]
                            , maHeight [ vScale (field "yScale"), vBand 1 ]
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
                        , enUpdate [ maY [ vField (field "y0") ], maY2 [ vField (field "y1") ] ]
                        ]
                    , mGroup [ nestedSc [], nestedAx [], nestedMk [] ]
                    ]
    in
    toVega
        [ width 300, padding 5, autosize [ APad ], ds, si [], sc [], ax [], mk [] ]


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
                    [ scType ScBand
                    , scRange (raValues [ vSignal "height", vNum 0 ])
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "ageGroups", daField (field "age") ])
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
                            , maY [ vScale (field "yScale"), vField (field "age"), vBand 0.5 ]
                            , maText [ vField (field "age") ]
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
                    , scNice NTrue
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
                << mark Rect
                    [ mFrom [ srData (str genderField) ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (field "xScale"), vField (field "people") ]
                            , maX2 [ vScale (field "xScale"), vNum 0 ]
                            , maY [ vScale (field "yScale"), vField (field "age") ]
                            , maHeight [ vScale (field "yScale"), vBand 1, vOffset (vNum -1) ]
                            , maFillOpacity [ vNum 0.6 ]
                            , maFill [ vScale (field "cScale"), vField (field "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "xScale" SBottom [ axFormat "s" ]
    in
    toVega
        [ height 400, padding 5, ds, si [], topSc [], topMk [] ]


sourceExample : Spec
sourceExample =
    barChart1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "barChart1", barChart1 )
        , ( "barChart2", barChart2 )
        , ( "barChart3", barChart3 )
        , ( "barChart4", barChart4 )
        , ( "barChart5", barChart5 )
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
