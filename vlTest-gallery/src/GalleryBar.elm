port module GalleryBar exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


bar1 : Spec
bar1 =
    let
        des =
            description "A simple bar chart with embedded data."

        data =
            dataFromColumns []
                << dataColumn "a" (strs [ "A", "B", "C", "D", "E", "F", "G", "H", "I" ])
                << dataColumn "b" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52 ])

        enc =
            encoding
                << position X [ pName "a", pMType Ordinal ]
                << position Y [ pName "b", pMType Quantitative ]
    in
    toVegaLite [ des, data [], bar [], enc [] ]


bar2 : Spec
bar2 =
    let
        des =
            description "Simple histogram of IMDB ratings."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , bar [ maBinSpacing 0 ]
        , enc []
        ]


bar3 : Spec
bar3 =
    let
        des =
            description "A bar chart showing the US population distribution of age groups in 2000."

        trans =
            transform << filter (fiExpr "datum.year == 2000")

        enc =
            encoding
                << position X [ pName "people", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "population" ] ]
                << position Y [ pName "age", pMType Ordinal, pScale [ scRangeStep (Just 17) ] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , bar []
        , trans []
        , enc []
        ]


bar4 : Spec
bar4 =
    let
        des =
            description "Grouped bar chart showing population structure by age and gender."

        trans =
            transform
                << filter (fiExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ pName "gender", pMType Nominal, pScale [ scRangeStep (Just 12) ], pAxis [ axTitle "" ] ]
                << position Y [ pName "people", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "population", axGrid False ] ]
                << column [ fName "age", fMType Ordinal ]
                << color [ mName "gender", mMType Nominal, mScale [ scRange (raStrs [ "#EA98D2", "#659CCA" ]) ] ]

        config =
            configure
                << configuration (coAxis [ axcoDomainWidth 1 ])
                << configuration (coView [ vicoStroke Nothing ])
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , bar []
        , trans []
        , enc []
        , config []
        ]


bar5 : Spec
bar5 =
    let
        des =
            description "Seattle weather stacked bar chart"

        weatherColors =
            categoricalDomainMap
                [ ( "sun", "#e7ba52" )
                , ( "fog", "#c7c7c7" )
                , ( "drizzle", "#aec7ea" )
                , ( "rain", "#1f77b4" )
                , ( "snow", "#9467bd" )
                ]

        enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month, pAxis [ axTitle "Month of the year" ] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << color
                    [ mName "weather"
                    , mMType Nominal
                    , mScale weatherColors
                    , mLegend [ leTitle "Weather type" ]
                    ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


bar6 : Spec
bar6 =
    let
        des =
            description "Barley crop yields as a horizontal stacked bar chart"

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Sum ]
                << position Y [ pName "variety", pMType Nominal ]
                << color [ mName "site", mMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/barley.json" []
        , bar []
        , enc []
        ]


bar7 : Spec
bar7 =
    let
        des =
            description "Population structure as a normalised stacked bar chart."

        trans =
            transform
                << filter (fiExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ pName "age", pMType Ordinal, pScale [ scRangeStep (Just 17) ] ]
                << position Y [ pName "people", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "Population" ], pStack StNormalize ]
                << color [ mName "gender", mMType Nominal, mScale [ scRange (raStrs [ "#EA98D2", "#659CCA" ]) ] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , trans []
        , bar []
        , enc []
        ]


bar8 : Spec
bar8 =
    let
        des =
            description "A simple bar chart with ranged data (aka Gantt Chart)."

        data =
            dataFromColumns []
                << dataColumn "task" (strs [ "A", "B", "C" ])
                << dataColumn "start" (nums [ 1, 3, 8 ])
                << dataColumn "end" (nums [ 3, 8, 10 ])

        enc =
            encoding
                << position Y [ pName "task", pMType Ordinal ]
                << position X [ pName "start", pMType Quantitative ]
                << position X2 [ pName "end", pMType Quantitative ]
    in
    toVegaLite [ des, data [], bar [], enc [] ]


bar9 : Spec
bar9 =
    let
        des =
            description "A bar chart that directly encodes color names in the data."

        data =
            dataFromColumns []
                << dataColumn "color" (strs [ "red", "green", "blue" ])
                << dataColumn "b" (nums [ 28, 55, 43 ])

        enc =
            encoding
                << position X [ pName "color", pMType Nominal ]
                << position Y [ pName "b", pMType Quantitative ]
                << color [ mName "color", mMType Nominal, mScale [] ]
    in
    toVegaLite [ des, data [], bar [], enc [] ]


bar10 : Spec
bar10 =
    let
        des =
            description "Layered bar chart showing the US population distribution of age groups and gender in 2000."

        trans =
            transform
                << filter (fiExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ pName "age", pMType Ordinal, pScale [ scRangeStep (Just 17) ] ]
                << position Y [ pName "people", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "Population" ], pStack NoStack ]
                << color [ mName "gender", mMType Nominal, mScale [ scRange (raStrs [ "#e377c2", "#1f77b4" ]) ] ]
                << opacity [ mNum 0.7 ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , trans []
        , bar []
        , enc []
        ]


bar11 : Spec
bar11 =
    let
        des =
            description "A diverging stacked bar chart for sentiments towards a set of eight questions, displayed as percentages with neutral responses straddling the 0% mark."

        data =
            dataFromColumns []
                << dataColumn "question" (strs [ "Q1", "Q1", "Q1", "Q1", "Q1", "Q2", "Q2", "Q2", "Q2", "Q2", "Q3", "Q3", "Q3", "Q3", "Q3", "Q4", "Q4", "Q4", "Q4", "Q4", "Q5", "Q5", "Q5", "Q5", "Q5", "Q6", "Q6", "Q6", "Q6", "Q6", "Q7", "Q7", "Q7", "Q7", "Q7", "Q8", "Q8", "Q8", "Q8", "Q8" ])
                << dataColumn "type" (strs [ "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree" ])
                << dataColumn "value" (nums [ 24, 294, 594, 1927, 376, 2, 2, 0, 7, 11, 2, 0, 2, 4, 2, 0, 2, 1, 7, 6, 0, 1, 3, 16, 4, 1, 1, 2, 9, 3, 0, 0, 1, 4, 0, 0, 0, 0, 0, 2 ])
                << dataColumn "percentage" (nums [ 0.7, 9.1, 18.5, 59.9, 11.7, 18.2, 18.2, 0, 63.6, 0, 20, 0, 20, 40, 20, 0, 12.5, 6.3, 43.8, 37.5, 0, 4.2, 12.5, 66.7, 16.7, 6.3, 6.3, 12.5, 56.3, 18.8, 0, 0, 20, 80, 0, 0, 0, 0, 0, 100 ])
                << dataColumn "percentage_start" (nums [ -19.1, -18.4, -9.2, 9.2, 69.2, -36.4, -18.2, 0, 0, 63.6, -30, -10, -10, 10, 50, -15.6, -15.6, -3.1, 3.1, 46.9, -10.4, -10.4, -6.3, 6.3, 72.9, -18.8, -12.5, -6.3, 6.3, 62.5, -10, -10, -10, 10, 90, 0, 0, 0, 0, 0 ])
                << dataColumn "percentage_end" (nums [ -18.4, -9.2, 9.2, 69.2, 80.9, -18.2, 0, 0, 63.6, 63.6, -10, -10, 10, 50, 70, -15.6, -3.1, 3.1, 46.9, 84.4, -10.4, -6.3, 6.3, 72.9, 89.6, -12.5, -6.3, 6.3, 62.5, 81.3, -10, -10, 10, 90, 90, 0, 0, 0, 0, 100 ])

        enc =
            encoding
                << position X [ pName "percentage_start", pMType Quantitative, pAxis [ axTitle "Percentage" ] ]
                << position X2 [ pName "percentage_end", pMType Quantitative ]
                << position Y [ pName "question", pMType Nominal, pAxis [ axTitle "Question", axOffset 5, axTicks False, axMinExtent 60, axDomain False ] ]
                << color
                    [ mName "type"
                    , mMType Nominal
                    , mLegend [ leTitle "Response" ]
                    , mScale <|
                        scType ScOrdinal
                            :: categoricalDomainMap
                                [ ( "Strongly disagree", "#c30d24" )
                                , ( "Disagree", "#f3a583" )
                                , ( "Neither agree nor disagree", "#cccccc" )
                                , ( "Agree", "#94c6da" )
                                , ( "Strongly agree", "#1770ab" )
                                ]
                    ]
    in
    toVegaLite [ des, data [], bar [], enc [] ]


bar12 : Spec
bar12 =
    let
        des =
            description "A simple bar chart with embedded data labels."

        data =
            dataFromColumns []
                << dataColumn "a" (strs [ "A", "B", "C" ])
                << dataColumn "b" (nums [ 28, 55, 43 ])

        enc =
            encoding
                << position X [ pName "b", pMType Quantitative ]
                << position Y [ pName "a", pMType Ordinal ]

        specBar =
            asSpec [ bar [] ]

        specText =
            asSpec [ textMark [ maStyle [ "label" ] ], encoding (text [ tName "b", tMType Quantitative ] []) ]

        config =
            configure << configuration (coNamedStyle "label" [ maAlign AlignLeft, maBaseline AlignMiddle, maDx 3 ])
    in
    toVegaLite [ des, data [], enc [], layer [ specBar, specText ], config [] ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "bar1", bar1 )
        , ( "bar2", bar2 )
        , ( "bar3", bar3 )
        , ( "bar4", bar4 )
        , ( "bar5", bar5 )
        , ( "bar6", bar6 )
        , ( "bar7", bar7 )
        , ( "bar8", bar8 )
        , ( "bar9", bar9 )
        , ( "bar10", bar10 )
        , ( "bar11", bar11 )
        , ( "bar12", bar12 )
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
