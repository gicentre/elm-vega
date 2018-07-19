port module TemporalTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


temporalTest1 : Spec
temporalTest1 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str "https://gicentre.github.io/data/timeTest.tsv")
                    , daFormat [ TSV, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                    |> transform
                        [ trFormula "datetime(year(datum.date),month(datum.date),0,0,0,0,0)" "year"
                        , trAggregate
                            [ agOps [ Mean ]
                            , agFields [ field "temperature" ]
                            , agGroupBy [ field "year" ]
                            , agAs [ "meanTemperature" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScTime
                    , scDomain (doData [ daDataset "timeData", daField (field "year") ])
                    , scRange RaWidth
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "timeData", daField (field "meanTemperature") ])
                    , scRange RaHeight
                    , scZero false
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axTemporalTickCount Month (num 1)
                    , axLabelAngle (num 60)
                    , axLabelAlign AlignLeft
                    ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Line
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    ]
                << mark Symbol
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
                    , daFormat [ TSV, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                , data "binned" [ daSource "timeData" ]
                    |> transform
                        [ trBin (field "temperature") (nums [ 0, 30 ]) [ bnStep (num 1) ]
                        , trAggregate
                            [ agFields [ field "temperature", field "date" ]
                            , agGroupBy [ field "bin0", field "bin1" ]
                            , agOps [ Count, Mean ]
                            , agAs [ "count", "meanDate" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "timeData", daField (field "temperature") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scRound true
                    , scDomain (doData [ daDataset "binned", daField (field "count") ])
                    , scZero true
                    , scNice NTrue
                    ]
                << scale "cScale"
                    [ scType ScTime
                    , scDomain (doData [ daDataset "binned", daField (field "meanDate") ])
                    , scRange RaRamp
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTitle (str "temperature (C)") ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leType LGradient
                    , leFormat (str "%b %Y")
                    , leTemporalTickCount Month (num 6)
                    ]

        mk =
            marks
                << mark Rect
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
