port module TemporalTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)


temporalTest1 : Spec
temporalTest1 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str "https://gicentre.github.io/data/timeTest.tsv")
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                    |> transform
                        [ trFormula "datetime(year(datum.date),month(datum.date),0,0,0,0,0)" "year"
                        , trAggregate
                            [ agOps [ opMean ]
                            , agFields [ field "temperature" ]
                            , agGroupBy [ field "year" ]
                            , agAs [ "meanTemperature" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "timeData", daField (field "year") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "timeData", daField (field "meanTemperature") ])
                    , scRange raHeight
                    , scZero false
                    ]

        ax =
            axes
                << axis "xScale"
                    siBottom
                    [ axTemporalTickCount month (num 1)
                    , axLabelAngle (num 60)
                    , axLabelAlign haLeft
                    ]
                << axis "yScale" siLeft []

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 200, padding 5, ds, sc [], ax [], mk [] ]


temporalTest2 : Spec
temporalTest2 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str "https://gicentre.github.io/data/timeTest.tsv")
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                , data "binned" [ daSource "timeData" ]
                    |> transform
                        [ trBin (field "temperature") (nums [ 0, 30 ]) [ bnStep (num 1) ]
                        , trAggregate
                            [ agFields [ field "temperature", field "date" ]
                            , agGroupBy [ field "bin0", field "bin1" ]
                            , agOps [ opCount, opMean ]
                            , agAs [ "count", "meanDate" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scRange raWidth
                    , scDomain (doData [ daDataset "timeData", daField (field "temperature") ])
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scRange raHeight
                    , scRound true
                    , scDomain (doData [ daDataset "binned", daField (field "count") ])
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "cScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "binned", daField (field "meanDate") ])
                    , scRange raRamp
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "temperature (C)") ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leType ltGradient
                    , leFormat (str "%b %Y")
                    , leTemporalTickCount month (num 6)
                    ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "binned") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "bin0") ]
                            , maX2 [ vScale "xScale", vField (field "bin1"), vOffset (vNum -0.5) ]
                            , maY [ vScale "yScale", vField (field "count") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill [ vScale "cScale", vField (field "meanDate") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, sc [], ax [], lg [], mk [] ]


sourceExample : Spec
sourceExample =
    temporalTest2



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "temporalTest1", temporalTest1 )
        , ( "temporalTest2", temporalTest2 )
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
