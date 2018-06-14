port module GalleryCustom exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


custom1 : Spec
custom1 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "budgets" [ daUrl "https://vega.github.io/vega/data/budgets.json" ]
                    |> transform
                        [ trFormula "abs(datum.value)" "abs" AlwaysUpdate
                        , trFormula "datum.value < 0 ? 'deficit' : 'surplus'" "type" AlwaysUpdate
                        ]
                , data "budgets-current" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear") ]
                , data "budgets-actual" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == datum.budgetYear - 1") ]
                , data "tooltip" [ daSource "budgets" ]
                    |> transform
                        [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == tipYear && abs(datum.value - tipValue) <= 0.1")
                        , trAggregate [ agFields [ field "value", field "value" ], agOps [ Min, ArgMin ], agAs [ "min", "argmin" ] ]
                        , trFormula "datum.argmin.budgetYear" "tooltipYear" AlwaysUpdate
                        ]
                , data "tooltip-forecast" [ daSource "budgets" ]
                    |> transform
                        [ trLookup "tooltip" (field "tooltipYear") [ field "budgetYear" ] [ luAs [ "tooltip" ] ]
                        , trFilter (expr "datum.tooltip")
                        ]
                ]

        si =
            signals
                << signal "dragging"
                    [ siValue (vBoo False)
                    , siOn
                        [ evHandler (esObject [ esMarkName "handle", esType MouseDown ]) [ evUpdate "true" ]
                        , evHandler (esObject [ esSource ESWindow, esType MouseUp ]) [ evUpdate "false" ]
                        ]
                    ]
                << signal "handleYear"
                    [ siValue (vNum 2010)
                    , siOn
                        [ evHandler
                            (esObject
                                [ esBetween [ esMarkName "handle", esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                , esConsume True
                                ]
                            )
                            [ evUpdate "invert('xScale', clamp(x(), 0, width))" ]
                        ]
                    ]
                << signal "currentYear" [ siUpdate "clamp(handleYear, 1980, 2010)" ]
                << signal "tipYear"
                    [ siOn
                        [ evHandler (esObject [ esType MouseMove ]) [ evUpdate "dragging ? tipYear : invert('xScale', x())" ] ]
                    ]
                << signal "tipValue"
                    [ siOn
                        [ evHandler (esObject [ esType MouseMove ]) [ evUpdate "dragging ? tipValue : invert('yScale', y())" ] ]
                    ]
                << signal "cursor"
                    [ siValue (vStr "default")
                    , siOn
                        [ evHandler (esSignal "dragging") [ evUpdate "dragging ? 'pointer' : 'default'" ] ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "budgets", daField (field "forecastYear") ])
                    , scRange RaWidth
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "budgets", daField (field "value") ])
                    , scZero bTrue
                    , scRange RaHeight
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axGrid bTrue
                    , axDomain bFalse
                    , axValues (vNums [ 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018 ])
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "white" ], maStrokeOpacity [ vNum 0.75 ] ] ] )
                        , ( ELabels, [ enUpdate [ maX [ vScale "xScale", vField (field "value") ] ] ] )
                        ]
                    ]
                << axis "yScale"
                    SRight
                    [ axGrid bTrue
                    , axDomain bFalse
                    , axValues (vNums [ 0, -0.5, -1, -1.5 ])
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "white" ], maStrokeOpacity [ vNum 0.75 ] ] ] )
                        , ( ELabels, [ enEnter [ maText [ vSignal "format(datum.value, '$.1f') + ' trillion'" ] ] ] )
                        ]
                    ]

        nestedMk1 =
            marks
                << mark Line
                    [ mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maStrokeOpacity [ vNum 0.25 ]
                            ]
                        ]
                    ]

        nestedMk2 =
            marks
                << mark Text
                    [ mInteractive bFalse
                    , mEncode
                        [ enUpdate
                            [ maX [ vNum 6 ]
                            , maY [ vNum 14 ]
                            , maText [ vSignal "'Forecast from early ' + parent.argmin.budgetYear" ]
                            , maFill [ vStr "black" ]
                            , maFontWeight [ vStr "bold" ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive bFalse
                    , mEncode
                        [ enUpdate
                            [ maX [ vNum 6 ]
                            , maY [ vNum 29 ]
                            , maText [ vSignal "parent.argmin.forecastYear + ': ' + format(parent.argmin.abs, '$.3f') + ' trillion ' + parent.argmin.type" ]
                            , maFill [ vStr "black" ]
                            , maAlign [ hAlignLabel AlignLeft |> vStr ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "budgets-current" "facet" [ faGroupBy [ "budgetYear" ] ] ]
                    , mGroup [ nestedMk1 [] ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "budgets-actual") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "tooltip-forecast") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "tooltip") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "argmin.forecastYear") ]
                            , maY [ vScale "yScale", vField (field "argmin.value") ]
                            , maSize [ vNum 50 ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]
                << mark Rule
                    [ mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vNum 0 ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        , enUpdate
                            [ maX [ vNum 0 ]
                            , maX2 [ vScale "xScale", vSignal "currentYear" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mName "handle"
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vNum 0, vOffset (vNum 1) ]
                            , maShape [ symbolLabel SymTriangleDown |> vStr ]
                            , maSize [ vNum 400 ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "currentYear" ]
                            , maFill [ vSignal "dragging ? 'lemonchiffon' : 'white'" ]
                            ]
                        , enHover
                            [ maFill [ vStr "lemonchiffon" ]
                            , maCursor [ cursorLabel CPointer |> vStr ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vNum 25 ]
                            , maFontSize [ vNum 32 ]
                            , maFontWeight [ vStr "bold" ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate [ maText [ vSignal "currentYear" ] ]
                        ]
                    ]
                << mark Group
                    [ mFrom [ srData (str "tooltip") ]
                    , mInteractive bFalse
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "argmin.forecastYear"), vOffset (vNum -5) ]
                            , maY [ vScale "yScale", vField (field "argmin.value"), vOffset (vNum 20) ]
                            , maWidth [ vNum 150 ]
                            , maHeight [ vNum 35 ]
                            , maFill [ vStr "white" ]
                            , maFillOpacity [ vNum 0.85 ]
                            , maStroke [ vStr "#aaa" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mGroup [ nestedMk2 [] ]
                    ]
    in
    toVega
        [ width 700, height 400, padding 5, background (str "#edf1f7"), ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    custom1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "custom1", custom1 )
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
