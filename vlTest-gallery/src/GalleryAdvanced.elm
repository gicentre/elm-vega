port module GalleryAdvanced exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


advanced1 : Spec
advanced1 =
    let
        desc =
            description "Calculation of percentage of total"

        data =
            dataFromColumns []
                << dataColumn "Activity" (strs [ "Sleeping", "Eating", "TV", "Work", "Exercise" ])
                << dataColumn "Time" (nums [ 8, 2, 4, 8, 2 ])

        trans =
            transform
                << windowAs "TotalTime"
                    [ wiAggregateOp Sum, wiField "Time" ]
                    [ wiFrame Nothing Nothing ]
                << calculateAs "datum.Time/datum.TotalTime * 100" "PercentOfTotal"

        enc =
            encoding
                << position X [ pName "PercentOfTotal", pMType Quantitative, pAxis [ axTitle "% of total time" ] ]
                << position Y [ pName "Activity", pMType Nominal, pScale [ scRangeStep (Just 12) ] ]
    in
    toVegaLite
        [ desc, data [], trans [], bar [], enc [] ]


advanced2 : Spec
advanced2 =
    let
        desc =
            description "Calculation of difference from average"

        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << windowAs "AverageRating"
                    [ wiAggregateOp Mean, wiField "IMDB_Rating" ]
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
                << position X [ pName "AverageRating", pAggregate Average, pMType Quantitative ]

        ruleSpec =
            asSpec [ rule [ maColor "red" ], ruleEnc [] ]
    in
    toVegaLite
        [ desc, data, trans [], layer [ barSpec, ruleSpec ] ]


advanced3 : Spec
advanced3 =
    let
        desc =
            description "Calculation of difference from annual average"

        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json"
                [ parse [ ( "Release_Date", foDate "%d-%b-%y" ) ] ]

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << timeUnitAs Year "Release_Date" "year"
                << windowAs "AverageYearRating"
                    [ wiAggregateOp Mean, wiField "IMDB_Rating" ]
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
    toVegaLite [ desc, data, trans [], layer [ barSpec, tickSpec ] ]


advanced4 : Spec
advanced4 =
    let
        desc =
            description "A scatterplot showing each movie in the database and the difference from the average movie rating."

        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/movies.json"
                [ parse [ ( "Release_Date", foDate "%d-%b-%y" ) ] ]

        trans =
            transform
                << filter (fiExpr "datum.IMDB_Rating != null")
                << filter (fiRange "Release_Date" (dtRange [] [ dtYear 2019 ]))
                << windowAs "AverageRating"
                    [ wiAggregateOp Mean, wiField "IMDB_Rating" ]
                    [ wiFrame Nothing Nothing ]
                << calculateAs "datum.IMDB_Rating - datum.AverageRating" "RatingDelta"

        enc =
            encoding
                << position X [ pName "Release_Date", pMType Temporal ]
                << position Y [ pName "RatingDelta", pMType Quantitative, pAxis [ axTitle "Residual" ] ]
    in
    toVegaLite [ desc, data, trans [], enc [], point [ maStrokeWidth 0.3, maOpacity 0.3 ] ]


advanced5 : Spec
advanced5 =
    let
        des =
            description "Line chart showing ranks over time for thw World Cup 2018 Group F teams"

        data =
            dataFromColumns []
                << dataColumn "team" (strs [ "Germany", "Mexico", "South Korea", "Sweden", "Germany", "Mexico", "South Korea", "Sweden", "Germany", "Mexico", "South Korea", "Sweden" ])
                << dataColumn "matchday" (nums [ 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3 ])
                << dataColumn "point" (nums [ 0, 3, 0, 3, 3, 6, 0, 3, 3, 6, 3, 6 ])
                << dataColumn "diff" (nums [ -1, 1, -1, 1, 0, 2, -2, 0, -2, -1, 0, 3 ])

        trans =
            transform
                << windowAs "rank"
                    [ wiOp Rank ]
                    [ wiSort [ wiDescending "point", wiDescending "diff" ], wiGroupBy [ "matchday" ] ]

        enc =
            encoding
                << position X [ pName "matchday", pMType Ordinal ]
                << position Y [ pName "rank", pMType Ordinal ]
                << color [ mName "team", mMType Nominal, mScale teamColours ]

        teamColours =
            categoricalDomainMap
                [ ( "Germany", "black" )
                , ( "Mexico", "#127153" )
                , ( "South Korea", "#c91a3c" )
                , ( "Sweden", "#0c71ab" )
                ]
    in
    toVegaLite [ des, data [], trans [], enc [], line [ maOrient Vertical ] ]


advanced6 : Spec
advanced6 =
    let
        des =
            description "Waterfall chart of monthly profit and loss"

        data =
            dataFromColumns []
                << dataColumn "label" (strs [ "Begin", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "End" ])
                << dataColumn "amount" (nums [ 4000, 1707, -1425, -1030, 1812, -1067, -1481, 1228, 1176, 1146, 1205, -1388, 1492, 0 ])

        trans =
            transform
                << windowAs "sum" [ wiAggregateOp Sum, wiField "amount" ] []
                << windowAs "lead" [ wiOp Lead, wiField "label" ] []
                << calculateAs "datum.lead === null ? datum.label : datum.lead" "lead"
                << calculateAs "datum.label === 'End' ? 0 : datum.sum - datum.amount" "previous_sum"
                << calculateAs "datum.label === 'End' ? datum.sum : datum.amount" "amount"
                << calculateAs "(datum.label !== 'Begin' && datum.label !== 'End' && datum.amount > 0 ? '+' : '') + datum.amount" "text_amount"
                << calculateAs "(datum.sum + datum.previous_sum) / 2" "center"
                << calculateAs "datum.sum < datum.previous_sum ? datum.sum : ''" "sum_dec"
                << calculateAs "datum.sum > datum.previous_sum ? datum.sum : ''" "sum_inc"

        enc =
            encoding
                << position X [ pName "label", pMType Ordinal, pSort [], pAxis [ axTitle "Months" ] ]

        enc1 =
            encoding
                << position Y [ pName "previous_sum", pMType Quantitative, pAxis [ axTitle "Amount" ] ]
                << position Y2 [ pName "sum", pMType Quantitative ]
                << color
                    [ mDataCondition
                        [ ( expr "datum.label === 'Begin' || datum.label === 'End'", [ mStr "#f7e0b6" ] )
                        , ( expr "datum.sum < datum.previous_sum", [ mStr "#f78a64" ] )
                        ]
                        [ mStr "#93c4aa" ]
                    ]

        spec1 =
            asSpec [ enc1 [], bar [ maSize 45 ] ]

        enc2 =
            encoding
                << position X2 [ pName "lead", pMType Ordinal ]
                << position Y [ pName "sum", pMType Quantitative ]

        spec2 =
            asSpec
                [ enc2 []
                , rule
                    [ maColor "#404040"
                    , maOpacity 1
                    , maStrokeWidth 2
                    , maXOffset -22.5
                    , maX2Offset 22.5
                    ]
                ]

        enc3 =
            encoding
                << position Y [ pName "sum_inc", pMType Quantitative ]
                << text [ tName "sum_inc", tMType Nominal ]

        spec3 =
            asSpec
                [ enc3 []
                , textMark
                    [ maDy -8
                    , maFontWeight Bold
                    , maColor "#404040"
                    ]
                ]

        enc4 =
            encoding
                << position Y [ pName "sum_dec", pMType Quantitative ]
                << text [ tName "sum_dec", tMType Nominal ]

        spec4 =
            asSpec
                [ enc4 []
                , textMark
                    [ maDy 8
                    , maBaseline AlignTop
                    , maFontWeight Bold
                    , maColor "#404040"
                    ]
                ]

        enc5 =
            encoding
                << position Y [ pName "center", pMType Quantitative ]
                << text [ tName "text_amount", tMType Nominal ]
                << color
                    [ mDataCondition
                        [ ( expr "datum.label === 'Begin' || datum.label === 'End'"
                          , [ mStr "#725a30" ]
                          )
                        ]
                        [ mStr "white" ]
                    ]

        spec5 =
            asSpec [ enc5 [], textMark [ maBaseline AlignMiddle, maFontWeight Bold ] ]
    in
    toVegaLite
        [ des
        , width 800
        , height 450
        , data []
        , trans []
        , enc []
        , layer [ spec1, spec2, spec3, spec4, spec5 ]
        ]


advanced7 : Spec
advanced7 =
    let
        des =
            description "Using the lookup transform to combine data"

        trans =
            transform
                << lookup "person"
                    (dataFromUrl "https://vega.github.io/vega-lite/data/lookup_people.csv" [])
                    "name"
                    [ "age", "height" ]

        enc =
            encoding
                << position X [ pName "group", pMType Ordinal ]
                << position Y [ pName "age", pMType Quantitative, pAggregate Mean ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/lookup_groups.csv" []
        , trans []
        , enc []
        , bar []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "advanced1", advanced1 )
        , ( "advanced2", advanced2 )
        , ( "advanced3", advanced3 )
        , ( "advanced4", advanced4 )
        , ( "advanced5", advanced5 )
        , ( "advanced6", advanced6 )
        , ( "advanced7", advanced7 )
        ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
