port module Gallery exposing (elmToJS)

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
                << dataColumn "category" (Strings [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (Numbers [ 28, 55, 43, 91, 81, 53, 19, 87 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "tooltip"
                    [ SiValue Empty
                    , SiOn
                        [ [ EEvents "rect:mouseover", EUpdate "datum" ]
                        , [ EEvents "rect:mouseout", EUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScBand
                    , SDomain (DData [ DDataset "table", DField "category" ])
                    , SRange (RDefault RWidth)
                    , SPadding 0.05
                    , SRound True
                    ]
                << scale "yscale"
                    [ SDomain (DData [ DDataset "table", DField "amount" ])
                    , SNice (IsNice True)
                    , SRange (RDefault RHeight)
                    ]

        ax =
            axes
                << axis "xscale" Bottom []
                << axis "yscale" Left []

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ VScale (FName "xscale"), VField (FName "category") ]
                            , MWidth [ VScale (FName "xscale"), VBand 1 ]
                            , MY [ VScale (FName "yscale"), VField (FName "amount") ]
                            , MY2 [ VScale (FName "yscale"), VNumber 0 ]
                            ]
                        , Update [ MFill [ VString "steelblue" ] ]
                        , Hover [ MFill [ VString "red" ] ]
                        ]
                    ]
                << mark Text
                    [ MEncode
                        [ Enter
                            [ MAlign [ hAlignLabel AlignCenter |> VString ]
                            , MBaseline [ vAlignLabel AlignBottom |> VString ]
                            , MFill [ VString "#333" ]
                            ]
                        , Update
                            [ MX [ VScale (FName "xscale"), VSignal (SName "tooltip.category"), VBand 0.5 ]
                            , MY [ VScale (FName "yscale"), VSignal (SName "tooltip.amount"), VOffset (VNumber -2) ]
                            , MText [ VSignal (SName "tooltip.amount") ]
                            , MFillOpacity [ VIfElse "datum === tooltip" [ VNumber 0 ] [ VNumber 1 ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 200, padding (PSize 5), ds, si [], sc [], ax [], mk [] ]


barChart2 : Spec
barChart2 =
    let
        dv label num =
            ( label, Number num )

        table =
            dataFromRows "table" []
                << dataRow [ dv "x" 0, dv "y" 28, dv "c" 0 ]
                << dataRow [ dv "x" 0, dv "y" 55, dv "c" 1 ]
                << dataRow [ dv "x" 1, dv "y" 43, dv "c" 0 ]
                << dataRow [ dv "x" 1, dv "y" 91, dv "c" 1 ]
                << dataRow [ dv "x" 2, dv "y" 81, dv "c" 0 ]
                << dataRow [ dv "x" 2, dv "y" 53, dv "c" 1 ]
                << dataRow [ dv "x" 3, dv "y" 19, dv "c" 0 ]
                << dataRow [ dv "x" 3, dv "y" 87, dv "c" 1 ]
                << dataRow [ dv "x" 4, dv "y" 52, dv "c" 0 ]
                << dataRow [ dv "x" 4, dv "y" 48, dv "c" 1 ]
                << dataRow [ dv "x" 5, dv "y" 24, dv "c" 0 ]
                << dataRow [ dv "x" 5, dv "y" 49, dv "c" 1 ]
                << dataRow [ dv "x" 6, dv "y" 87, dv "c" 0 ]
                << dataRow [ dv "x" 6, dv "y" 66, dv "c" 1 ]
                << dataRow [ dv "x" 7, dv "y" 17, dv "c" 0 ]
                << dataRow [ dv "x" 7, dv "y" 27, dv "c" 1 ]
                << dataRow [ dv "x" 8, dv "y" 68, dv "c" 0 ]
                << dataRow [ dv "x" 8, dv "y" 16, dv "c" 1 ]
                << dataRow [ dv "x" 9, dv "y" 49, dv "c" 0 ]
                << dataRow [ dv "x" 9, dv "y" 15, dv "c" 1 ]

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStack
                            [ StGroupBy [ FieldName "x" ]
                            , StSort [ CoField [ FieldName "c" ] ]
                            , StField (FieldName "y")
                            ]
                        ]
                ]

        sc =
            scales
                << scale "x"
                    [ SType ScBand
                    , SRange (RDefault RWidth)
                    , SDomain (DData [ DDataset "table", DField "x" ])
                    ]
                << scale "y"
                    [ SType ScLinear
                    , SRange (RDefault RHeight)
                    , SNice (IsNice True)
                    , SZero True
                    , SDomain (DData [ DDataset "table", DField "y1" ])
                    ]
                << scale "color"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DData [ DDataset "table", DField "c" ])
                    ]

        ax =
            axes
                << axis "x" Bottom [ AxScale "x", AxZIndex 1 ]
                << axis "yscale" Left [ AxScale "y", AxZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MX [ VScale (FName "x"), VField (FName "x") ]
                            , MWidth [ VScale (FName "x"), VBand 1, VOffset (VNumber -1) ]
                            , MY [ VScale (FName "y"), VField (FName "y0") ]
                            , MY2 [ VScale (FName "y"), VField (FName "y1") ]
                            , MFill [ VScale (FName "color"), VField (FName "c") ]
                            ]
                        , Update [ MFillOpacity [ VNumber 1 ] ]
                        , Hover [ MFillOpacity [ VNumber 0.5 ] ]
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
                << dataColumn "category" (Strings [ "A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C" ])
                << dataColumn "position" (Numbers [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ])
                << dataColumn "value" (Numbers [ 0.1, 0.6, 0.9, 0.4, 0.7, 0.2, 1.1, 0.8, 0.6, 0.1, 0.2, 0.7 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yscale"
                    [ SType ScBand
                    , SDomain (DData [ DDataset "table", DField "category" ])
                    , SRange (RDefault RHeight)
                    , SPadding 0.2
                    ]
                << scale "xscale"
                    [ SType ScLinear
                    , SDomain (DData [ DDataset "table", DField "value" ])
                    , SRange (RDefault RWidth)
                    , SRound True
                    , SZero True
                    , SNice (IsNice True)
                    ]
                << scale "color"
                    [ SType ScOrdinal
                    , SDomain (DData [ DDataset "table", DField "position" ])
                    , SRange (RScheme "category20" [])
                    ]

        ax =
            axes
                << axis "yscale" Left [ AxTickSize 0, AxLabelPadding 4, AxZIndex 1 ]
                << axis "xscale" Bottom []

        nestedSi =
            signals
                << signal "height" [ SiUpdate "bandwidth('yscale')" ]

        nestedSc =
            scales
                << scale "pos"
                    [ SType ScBand
                    , SRange (RDefault RHeight)
                    , SDomain (DData [ DDataset "facet", DField "position" ])
                    ]

        nestedMk =
            marks
                << mark Rect
                    [ MName "bars"
                    , MFrom [ SData "facet" ]
                    , MEncode
                        [ Enter
                            [ MY [ VScale (FName "pos"), VField (FName "position") ]
                            , MHeight [ VScale (FName "pos"), VBand 1 ]
                            , MX [ VScale (FName "xscale"), VField (FName "value") ]
                            , MX2 [ VScale (FName "xscale"), VBand 0 ]
                            , MFill [ VScale (FName "color"), VField (FName "position") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ MFrom [ SData "bars" ]
                    , MEncode
                        [ Enter
                            [ MX [ VField (FName "x2"), VOffset (VNumber -5) ]
                            , MY [ VField (FName "y"), VOffset (VObject [ VField (FName "height"), VMultiply (VNumber 0.5) ]) ]
                            , MFill [ VString "white" ]
                            , MAlign [ VString (hAlignLabel AlignRight) ]
                            , MBaseline [ VString (vAlignLabel AlignMiddle) ]
                            , MText [ VField (FName "datum.value") ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ SFacet [ FaData "table", FaName "facet", FaGroupBy [ "category" ] ] ]
                    , MEncode [ Enter [ MY [ VScale (FName "yscale"), VField (FName "category") ] ] ]
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
                << dataColumn "a" (Numbers [ 0, 0, 0, 0, 1, 2, 2 ])
                << dataColumn "b" (Strings [ "a", "a", "b", "c", "b", "b", "c" ])
                << dataColumn "c" (Numbers [ 6.3, 4.2, 6.8, 5.1, 4.4, 3.5, 6.2 ])

        agTable =
            table []
                |> transform
                    [ TAggregate
                        [ AgGroupBy [ FieldName "a", FieldName "b" ]
                        , AgFields [ FieldName "c" ]
                        , AgOps [ Average ]
                        , AgAs [ "c" ]
                        ]
                    ]

        trTable =
            data "trellis" [ DSource "tuples" ]
                |> transform
                    [ TAggregate [ AgGroupBy [ FieldName "a" ] ]
                    , TFormula "rangeStep * bandspace(datum.count, innerPadding, outerPadding)" "span" AlwaysUpdate
                    , TStack [ StField (FieldName "span") ]
                    , TExtentAsSignal (FieldName "y1") "trellisExtent"
                    ]

        ds =
            dataSource [ agTable, trTable ]

        si =
            signals
                << signal "rangeStep" [ SiValue (Number 20), SiBind (IRange [ InMin 5, InMax 50, InStep 1 ]) ]
                << signal "innerPadding" [ SiValue (Number 0.1), SiBind (IRange [ InMin 0, InMax 0.7, InStep 0.01 ]) ]
                << signal "outerPadding" [ SiValue (Number 0.2), SiBind (IRange [ InMin 0, InMax 0.4, InStep 0.01 ]) ]
                << signal "height" [ SiUpdate "trellisExtent[1]" ]

        sc =
            scales
                << scale "xscale"
                    [ SDomain (DData [ DDataset "tuples", DField "c" ])
                    , SNice (IsNice True)
                    , SZero True
                    , SRound True
                    , SRange (RDefault RWidth)
                    ]
                << scale "color"
                    [ SType ScOrdinal
                    , SRange (RDefault RCategory)
                    , SDomain (DData [ DDataset "trellis", DField "a" ])
                    ]

        ax =
            axes << axis "xscale" Bottom [ AxDomain True ]

        nestedSc =
            scales
                << scale "yscale"
                    [ SType ScBand
                    , SPaddingInner (VSignal (SName "innerPadding"))
                    , SPaddingOuter (VSignal (SName "outerPadding"))
                    , SRound True
                    , SDomain (DData [ DDataset "faceted_tuples", DField "b" ])
                    , SRange (RStep (VSignal (SName "rangeStep")))
                    ]

        nestedAx =
            axes
                << axis "yscale" Left [ AxTicks False, AxDomain False, AxLabelPadding 4 ]

        nestedMk =
            marks
                << mark Rect
                    [ MFrom [ SData "faceted_tuples" ]
                    , MEncode
                        [ Enter
                            [ MX [ VNumber 0 ]
                            , MX2 [ VScale (FName "xscale"), VField (FName "c") ]
                            , MFill [ VScale (FName "color"), VField (FName "a") ]
                            , MStrokeWidth [ VNumber 2 ]
                            ]
                        , Update
                            [ MY [ VScale (FName "yscale"), VField (FName "b") ]
                            , MHeight [ VScale (FName "yscale"), VBand 1 ]
                            , MStroke [ VNull ]
                            , MZIndex [ VNumber 0 ]
                            ]
                        , Hover
                            [ MStroke [ VString "firebrick" ]
                            , MZIndex [ VNumber 1 ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ MFrom [ SData "trellis", SFacet [ FaName "faceted_tuples", FaData "tuples", FaGroupBy [ "a" ] ] ]
                    , MEncode
                        [ Enter [ MX [ VNumber 0 ], MWidth [ VSignal (SName "width") ] ]
                        , Update [ MY [ VField (FName "y0") ], MY2 [ VField (FName "y1") ] ]
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
                [ data "population" [ DUrl "https://vega.github.io/vega/data/population.json" ]
                , data "popYear" [ DSource "population" ] |> transform [ TFilter (Expr "datum.year == year") ]
                , data "males" [ DSource "popYear" ] |> transform [ TFilter (Expr "datum.sex == 1") ]
                , data "females" [ DSource "popYear" ] |> transform [ TFilter (Expr "datum.sex == 2") ]
                , data "ageGroups" [ DSource "population" ] |> transform [ TAggregate [ AgGroupBy [ FieldName "age" ] ] ]
                ]

        si =
            signals
                << signal "chartWidth" [ SiValue (Number 300) ]
                << signal "chartPad" [ SiValue (Number 20) ]
                << signal "width" [ SiUpdate "2 * chartWidth + chartPad" ]
                << signal "year" [ SiValue (Number 2000), SiBind (IRange [ InMin 1850, InMax 2000, InStep 10 ]) ]

        topSc =
            scales
                << scale "y"
                    [ SType ScBand
                    , SRange (RValues [ VSignal (SName "height"), VNumber 0 ])
                    , SRound True
                    , SDomain (DData [ DDataset "ageGroups", DField "age" ])
                    ]
                << scale "c"
                    [ SType ScOrdinal
                    , SDomain (DNumbers [ 1, 2 ])
                    , SRange (RStrings [ "#1f77b4", "#e377c2" ])
                    ]

        topMk =
            marks
                << mark Text
                    [ MInteractive False
                    , MFrom [ SData "ageGroups" ]
                    , MEncode
                        [ Enter
                            [ MX [ VSignal (SExpr "chartWidth + chartPad / 2") ]
                            , MY [ VScale (FName "y"), VField (FName "age"), VBand 0.5 ]
                            , MText [ VField (FName "age") ]
                            , MBaseline [ vAlignLabel AlignMiddle |> VString ]
                            , MAlign [ hAlignLabel AlignCenter |> VString ]
                            , MFill [ VString "#000" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ MEncode [ Update [ MX [ VNumber 0 ], MHeight [ VSignal (SName "height") ] ] ]
                    , MGroup [ sc Female [], ax [], mk Female [] ]
                    ]
                << mark Group
                    [ MEncode [ Update [ MX [ VSignal (SExpr "chartWidth + chartPad") ], MHeight [ VSignal (SName "height") ] ] ]
                    , MGroup [ sc Male [], ax [], mk Male [] ]
                    ]

        sc gender =
            let
                range =
                    case gender of
                        Female ->
                            SRange (RValues [ VSignal (SName "chartWidth"), VNumber 0 ])

                        Male ->
                            SRange (RValues [ VNumber 0, VSignal (SName "chartWidth") ])
            in
            scales
                << scale "x"
                    [ SType ScLinear
                    , range
                    , SNice (IsNice True)
                    , SDomain (DData [ DDataset "population", DField "people" ])
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
                            [ MX [ VScale (FName "x"), VField (FName "people") ]
                            , MX2 [ VScale (FName "x"), VNumber 0 ]
                            , MY [ VScale (FName "y"), VField (FName "age") ]
                            , MHeight [ VScale (FName "y"), VBand 1, VOffset (VNumber -1) ]
                            , MFillOpacity [ VNumber 0.6 ]
                            , MFill [ VScale (FName "c"), VField (FName "sex") ]
                            ]
                        ]
                    ]

        ax =
            axes << axis "x" Bottom [ AxFormat "s" ]
    in
    toVega
        [ height 400, padding (PSize 5), ds, si [], topSc [], topMk [] ]


sourceExample : Spec
sourceExample =
    barChart5



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
