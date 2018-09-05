port module WindowTransformTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


window1 : Spec
window1 =
    let
        data =
            dataFromColumns []
                << dataColumn "Activity" (strs [ "Sleeping", "Eating", "TV", "Work", "Exercise" ])
                << dataColumn "Time" (nums [ 8, 2, 4, 8, 2 ])

        trans =
            transform
                << window [ ( [ wiAggregateOp opSum, wiField "Time" ], "TotalTime" ) ]
                    [ wiFrame Nothing Nothing ]
                << calculateAs "datum.Time/datum.TotalTime * 100" "PercentOfTotal"

        enc =
            encoding
                << position X [ pName "PercentOfTotal", pMType Quantitative, pAxis [ axTitle "% of total time" ] ]
                << position Y [ pName "Activity", pMType Nominal, pScale [ scRangeStep (Just 12) ] ]
    in
    toVegaLite
        [ data []
        , trans []
        , bar []
        , enc []
        ]


window2 : Spec
window2 =
    let
        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << window [ ( [ wiAggregateOp opMean, wiField "IMDB_Rating" ], "AverageRating" ) ]
                    [ wiFrame Nothing Nothing ]
                << filter (fiExpr "(datum.IMDB_Rating - datum.AverageRating) > 2.5")

        barEnc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pAxis [ axTitle "IMDB Rating" ] ]
                << position Y [ pName "Title", pMType Ordinal ]

        barSpec =
            asSpec [ bar [], barEnc [] ]

        ruleEnc =
            encoding
                << position X [ pName "AverageRating", pAggregate opMean, pMType Quantitative ]

        ruleSpec =
            asSpec [ rule [ maColor "red" ], ruleEnc [] ]
    in
    toVegaLite
        [ data
        , trans []
        , layer [ barSpec, ruleSpec ]
        ]


window3 : Spec
window3 =
    let
        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json"
                [ parse [ ( "Release_Date", foDate "%d-%b-%y" ) ] ]

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << timeUnitAs year "Release_Date" "year"
                << window [ ( [ wiAggregateOp opMean, wiField "IMDB_Rating" ], "AverageYearRating" ) ]
                    [ wiGroupBy [ "year" ], wiFrame Nothing Nothing ]
                << filter (fiExpr "(datum.IMDB_Rating - datum.AverageYearRating) > 2.5")

        barEnc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pAxis [ axTitle "IMDB Rating" ] ]
                << position Y [ pName "Title", pMType Ordinal ]

        barSpec =
            asSpec [ bar [ maClip True ], barEnc [] ]

        tickEnc =
            encoding
                << position X [ pName "AverageYearRating", pMType Quantitative ]
                << position Y [ pName "Title", pMType Ordinal ]
                << color [ mStr "red" ]

        tickSpec =
            asSpec [ tick [], tickEnc [] ]
    in
    toVegaLite [ data, trans [], layer [ barSpec, tickSpec ] ]


window4 : Spec
window4 =
    let
        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json"
                [ parse [ ( "Release_Date", foDate "%d-%b-%y" ) ] ]

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << filter (fiRange "Release_Date" (dtRange [] [ dtYear 2019 ]))
                << window [ ( [ wiAggregateOp opMean, wiField "IMDB_Rating" ], "AverageRating" ) ]
                    [ wiFrame Nothing Nothing ]
                << calculateAs "datum.IMDB_Rating - datum.AverageRating" "RatingDelta"

        enc =
            encoding
                << position X [ pName "Release_Date", pMType Temporal ]
                << position Y [ pName "RatingDelta", pMType Quantitative, pAxis [ axTitle "Residual" ] ]
    in
    toVegaLite [ data, trans [], enc [], point [ maStrokeWidth 0.3, maOpacity 0.3 ] ]


window5 : Spec
window5 =
    let
        data =
            dataFromColumns []
                << dataColumn "team" (strs [ "Man Utd", "Chelsea", "Man City", "Spurs", "Man Utd", "Chelsea", "Man City", "Spurs", "Man Utd", "Chelsea", "Man City", "Spurs" ])
                << dataColumn "matchday" (nums [ 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3 ])
                << dataColumn "point" (nums [ 3, 1, 1, 0, 6, 1, 0, 3, 9, 1, 0, 6 ])

        trans =
            transform
                << window
                    [ ( [ wiOp woRank ], "rank" ) ]
                    [ wiSort [ wiDescending "point" ], wiGroupBy [ "matchday" ] ]

        enc =
            encoding
                << position X [ pName "matchday", pMType Ordinal ]
                << position Y [ pName "rank", pMType Ordinal ]
                << color [ mName "team", mMType Nominal, mScale teamColours ]

        teamColours =
            categoricalDomainMap
                [ ( "Man Utd", "#cc2613" )
                , ( "Chelsea", "#125dc7" )
                , ( "Man City", "#8bcdfc" )
                , ( "Spurs", "#d1d1d1" )
                ]
    in
    toVegaLite [ data [], trans [], enc [], line [ maOrient Vertical ] ]


window6 : Spec
window6 =
    let
        data =
            dataFromColumns []
                << dataColumn "student" (strs [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V" ])
                << dataColumn "score" (nums [ 100, 56, 88, 65, 45, 23, 66, 67, 13, 12, 50, 78, 66, 30, 97, 75, 24, 42, 76, 78, 21, 46 ])

        trans =
            transform
                << window [ ( [ wiOp woRank ], "rank" ) ] [ wiSort [ wiDescending "score" ] ]
                << filter (fiExpr "datum.rank <= 5")

        enc =
            encoding
                << position X [ pName "score", pMType Quantitative ]
                << position Y
                    [ pName "student"
                    , pMType Nominal
                    , pSort [ soByField "score" opMean, soDescending ]
                    ]
    in
    toVegaLite [ data [], trans [], enc [], bar [] ]


window7 : Spec
window7 =
    let
        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        trans =
            transform
                << filter (fiExpr "datum.Miles_per_Gallon !== null")
                << timeUnitAs year "Year" "year"
                << window [ ( [ wiAggregateOp opMean, wiField "Miles_per_Gallon" ], "Average_MPG" ) ]
                    [ wiSort [ wiAscending "year" ], wiIgnorePeers False, wiFrame Nothing (Just 0) ]

        circleEnc =
            encoding
                << position X [ pName "Year", pMType Temporal, pTimeUnit year ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]

        circleSpec =
            asSpec [ circle [], circleEnc [] ]

        lineEnc =
            encoding
                << position X [ pName "Year", pMType Temporal, pTimeUnit year ]
                << position Y [ pName "Average_MPG", pMType Quantitative, pAxis [ axTitle "Miles per gallon" ] ]

        lineSpec =
            asSpec [ line [ maColor "red" ], lineEnc [] ]
    in
    toVegaLite [ data, trans [], layer [ circleSpec, lineSpec ] ]


sourceExample : Spec
sourceExample =
    window7



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "window1", window1 )
        , ( "window2", window2 )
        , ( "window3", window3 )
        , ( "window4", window4 )
        , ( "window5", window5 )
        , ( "window6", window6 )
        , ( "window7", window7 )
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
