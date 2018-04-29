port module Gallery exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


basic1 : Spec
basic1 =
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


basic2 : Spec
basic2 =
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
    toVegaLite [ des, dataFromUrl "data/population.json" [], bar [], trans [], enc [] ]


basic3 : Spec
basic3 =
    let
        des =
            description "Simple histogram of IMDB ratings."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], bar [], enc [] ]


basic4 : Spec
basic4 =
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


basic5 : Spec
basic5 =
    let
        des =
            description "Grouped bar chart shoing population structure by age and gender."

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
                << configuration (Axis [ DomainWidth 1 ])
                << configuration (View [ Stroke Nothing ])
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], bar [], trans [], enc [], config [] ]


basic6 : Spec
basic6 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via point marks)."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], point [], enc [] ]


basic7 : Spec
basic7 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via circle marks)."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], circle [], enc [] ]


basic8 : Spec
basic8 =
    let
        des =
            description "A binned scatterplot comparing IMDB and Rotten Tomatoes rating with marks sized by number of reviews."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << size [ mAggregate Count, mMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], circle [], enc [] ]


basic9 : Spec
basic9 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallons with country of origin double encoded by colour and shape."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]
                << shape [ mName "Origin", mMType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], point [], enc [] ]


basic10 : Spec
basic10 =
    let
        des =
            description "Scatterplot with Null values in grey"

        data =
            dataFromUrl "data/movies.json" []

        config =
            configure
                << configuration (RemoveInvalid False)

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative ]
                << color
                    [ mDataCondition
                        (expr "datum.IMDB_Rating === null || datum.Rotten_Tomatoes_Rating === null")
                        [ mStr "#ddd" ]
                        [ mStr "rgb(76,120,168)" ]
                    ]
    in
    toVegaLite [ des, config [], data, point [], enc [] ]


basic11 : Spec
basic11 =
    let
        des =
            description "A bubbleplot showing horsepower on x, miles per gallons on y, and acceleration on size."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << size [ mName "Acceleration", mMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], point [], enc [] ]


basic12 : Spec
basic12 =
    let
        des =
            description "A bubble plot showing the correlation between health and income for 187 countries in the world (modified from an example in Lisa Charlotte Rost's blog post 'One Chart, Twelve Charting Libraries' --http://lisacharlotterost.github.io/2016/05/17/one-chart-code/)."

        enc =
            encoding
                << position X [ pName "income", pMType Quantitative, pScale [ scType ScLog ] ]
                << position Y [ pName "health", pMType Quantitative, pScale [ scZero False ] ]
                << size [ mName "population", mMType Quantitative ]
                << color [ mStr "#000" ]

        sel =
            selection << select "view" Interval [ BindScales ]
    in
    toVegaLite
        [ des
        , width 500
        , height 300
        , dataFromUrl "data/gapminder-health-income.csv" []
        , circle []
        , enc []
        , sel []
        ]


basic13 : Spec
basic13 =
    let
        des =
            description "Shows the relationship between horsepower and the number of cylinders using tick marks."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Cylinders", pMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], tick [], enc [] ]


basic14 : Spec
basic14 =
    let
        des =
            description "Google's stock price over time."

        trans =
            transform << filter (fiExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], trans [], line [], enc [] ]


basic15 : Spec
basic15 =
    let
        des =
            description "Stock prices of 5 tech companies over time."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
                << color [ mName "symbol", mMType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], line [], enc [] ]


basic16 : Spec
basic16 =
    let
        des =
            description "Slope graph showing the change in yield for different barley sites. It shows the error in the year labels for the Morris site."

        enc =
            encoding
                << position X [ pName "year", pMType Ordinal, pScale [ scRangeStep (Just 50), scPadding 0.5 ] ]
                << position Y [ pName "yield", pMType Quantitative, pAggregate Median ]
                << color [ mName "site", mMType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], line [], enc [] ]


basic17 : Spec
basic17 =
    let
        des =
            description "Google's stock price over time (quantized as a step-chart)."

        trans =
            transform << filter (fiExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], trans [], line [ MInterpolate StepAfter ], enc [] ]


basic18 : Spec
basic18 =
    let
        des =
            description "Unemployment over time (area chart)"

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "Count" ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


basic19 : Spec
basic19 =
    let
        des =
            description "'Table heatmap' showing engine size/power for three countries."

        enc =
            encoding
                << position X [ pName "Cylinders", pMType Ordinal ]
                << position Y [ pName "Origin", pMType Nominal ]
                << color [ mName "Horsepower", mMType Quantitative, mAggregate Mean ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], rect [], enc [] ]


basic20 : Spec
basic20 =
    let
        des =
            description "'Binned heatmap' comparing movie ratings."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 60 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 40 ] ]
                << color [ mMType Quantitative, mAggregate Count ]

        config =
            configure
                << configuration (Range [ RHeatmap "greenblue" ])
                << configuration (View [ Stroke Nothing ])
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/movies.json" []
        , rect []
        , enc []
        , config []
        ]


basic21 : Spec
basic21 =
    let
        des =
            description "Table bubble plot in the style of a Github punched card."

        enc =
            encoding
                << position X [ pName "time", pMType Ordinal, pTimeUnit Hours ]
                << position Y [ pName "time", pMType Ordinal, pTimeUnit Day ]
                << size [ mName "count", mMType Quantitative, mAggregate Sum ]
    in
    toVegaLite [ des, dataFromUrl "data/github.csv" [], circle [], enc [] ]


basic22 : Spec
basic22 =
    let
        des =
            description "Visualization of global deaths from natural disasters. Copy of chart from https://ourworldindata.org/natural-catastrophes"

        trans =
            transform
                << filter (fiExpr "datum.Entity !== 'All natural disasters'")

        enc =
            encoding
                << position X [ pName "Year", pMType Ordinal, pAxis [ axLabelAngle 0 ] ]
                << position Y [ pName "Entity", pMType Nominal, pAxis [ axTitle "" ] ]
                << size
                    [ mName "Deaths"
                    , mMType Quantitative
                    , mLegend [ leTitle "Annual Global Deaths" ]
                    , mScale [ scRange (raNums [ 0, 5000 ]) ]
                    ]
                << color [ mName "Entity", mMType Nominal, mLegend [] ]
    in
    toVegaLite
        [ des
        , width 600
        , height 400
        , dataFromUrl "https://vega.github.io/vega-lite/data/disasters.csv" []
        , trans []
        , circle [ MOpacity 0.8, MStroke "black", MStrokeWidth 1 ]
        , enc []
        ]


stack1 : Spec
stack1 =
    let
        des =
            description "Seattle weather stacked bar chart"

        enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month, pAxis [ axTitle "Month of the year" ] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << color
                    [ mName "weather"
                    , mMType Nominal
                    , mScale <|
                        categoricalDomainMap
                            [ ( "sun", "#e7ba52" )
                            , ( "fog", "#c7c7c7" )
                            , ( "drizzle", "#aec7ea" )
                            , ( "rain", "#1f77b4" )
                            , ( "snow", "#9467bd" )
                            ]
                    , mLegend [ leTitle "Weather type" ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], bar [], enc [] ]


stack2 : Spec
stack2 =
    let
        des =
            description "Barley crop yields as a horizontal stacked bar chart"

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Sum ]
                << position Y [ pName "variety", pMType Nominal ]
                << color [ mName "site", mMType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], bar [], enc [] ]


stack3 : Spec
stack3 =
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
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], bar [], enc [] ]


stack4 : Spec
stack4 =
    let
        des =
            description "Unemployment across industries as a stacked area chart."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite [ des, dataFromUrl "data/unemployment-across-industries.json" [], area [], enc [] ]


stack5 : Spec
stack5 =
    let
        des =
            description "Unemployment across industries as a normalised area chart."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [], pStack StNormalize ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


stack6 : Spec
stack6 =
    let
        des =
            description "Unemployment across industries as a streamgraph (centred, stacked area chart)."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [], pStack StCenter ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


stack7 : Spec
stack7 =
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
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], bar [], enc [] ]


stack8 : Spec
stack8 =
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


trellis1 : Spec
trellis1 =
    let
        des =
            description "Anscombe's Quartet"

        enc =
            encoding
                << position X [ pName "X", pMType Quantitative, pScale [ scZero False ] ]
                << position Y [ pName "Y", pMType Quantitative, pScale [ scZero False ] ]
                << opacity [ mNum 1 ]
                << column [ fName "Series", fMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/anscombe.json" [], circle [], enc [] ]


trellis2 : Spec
trellis2 =
    let
        des =
            description "A trellis bar chart showing the US population distribution of age groups and gender in 2000."

        trans =
            transform
                << filter (fiExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ pName "age", pMType Ordinal, pScale [ scRangeStep (Just 17) ] ]
                << position Y [ pName "people", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "Population" ] ]
                << color [ mName "gender", mMType Nominal, mScale [ scRange (raStrs [ "#EA98D2", "#659CCA" ]) ] ]
                << row [ fName "gender", fMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/population.json" []
        , trans []
        , bar []
        , enc []
        ]


trellis3 : Spec
trellis3 =
    let
        des =
            description "Barley crop yields in 1931 and 1932 shown as stacked bar charts."

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Sum ]
                << position Y [ pName "variety", pMType Nominal ]
                << color [ mName "site", mMType Nominal ]
                << column [ fName "year", fMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], bar [], enc [] ]


trellis4 : Spec
trellis4 =
    let
        des =
            description "Scatterplots of movie takings vs profits for different MPAA ratings."

        enc =
            encoding
                << position X [ pName "Worldwide_Gross", pMType Quantitative ]
                << position Y [ pName "US_DVD_Sales", pMType Quantitative ]
                << column [ fName "MPAA_Rating", fMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], point [], enc [] ]


trellis5 : Spec
trellis5 =
    let
        des =
            description "Disitributions of car engine power for different countries of origin."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative, pBin [ biMaxBins 15 ] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << row [ fName "Origin", fMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], bar [], enc [] ]


trellis6 : Spec
trellis6 =
    let
        des =
            description "The Trellis display by Becker et al. helped establish small multiples as a “powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables”. Here we reproduce a trellis of Barley yields from the 1930s, complete with main-effects ordering to facilitate comparison."

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Median, pScale [ scZero False ] ]
                << position Y [ pName "variety", pMType Ordinal, pSort [ ByField "Horsepower", Op Mean, Descending ], pScale [ scRangeStep (Just 12) ] ]
                << color [ mName "year", mMType Nominal ]
                << row [ fName "site", fMType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], point [], enc [] ]


trellis7 : Spec
trellis7 =
    let
        des =
            description "Stock prices of four large companies as a small multiples of area charts."

        trans =
            transform << filter (fiExpr "datum.symbol !== 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y", axTitle "Time", axGrid False ] ]
                << position Y [ pName "price", pMType Quantitative, pAxis [ axTitle "Time", axGrid False ] ]
                << color [ mName "symbol", mMType Nominal, mLegend [] ]
                << row [ fName "symbol", fMType Nominal, fHeader [ hdTitle "Company" ] ]
    in
    toVegaLite [ des, width 300, height 40, dataFromUrl "data/stocks.csv" [], trans [], area [], enc [] ]


layer1 : Spec
layer1 =
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
            asSpec [ textMark [ MStyle [ "label" ] ], encoding (text [ tName "b", tMType Quantitative ] []) ]

        config =
            configure << configuration (NamedStyle "label" [ MAlign AlignLeft, MBaseline AlignMiddle, MdX 3 ])
    in
    toVegaLite [ des, data [], enc [], layer [ specBar, specText ], config [] ]


layer2 : Spec
layer2 =
    let
        des =
            description "Bar chart that highlights values beyond a threshold. The PM2.5 value of Beijing observed 15 days, highlighting the days when PM2.5 level is hazardous to human health. Data source https://chartaccent.github.io/chartaccent.html"

        data =
            dataFromColumns []
                << dataColumn "Day" (List.range 1 15 |> List.map toFloat |> nums)
                << dataColumn "Value" (nums [ 54.8, 112.1, 63.6, 37.6, 79.7, 137.9, 120.1, 103.3, 394.8, 199.5, 72.3, 51.1, 112.0, 174.5, 130.5 ])

        encBar =
            encoding
                << position X [ pName "Day", pMType Ordinal, pAxis [ axLabelAngle 0 ] ]
                << position Y [ pName "Value", pMType Quantitative ]

        specBar =
            asSpec [ bar [], encBar [] ]

        trans =
            transform
                << filter (fiExpr "datum.Value >= 300")
                << calculateAs "300" "baseline"

        encUpperBar =
            encoding
                << position X [ pName "Day", pMType Ordinal, pAxis [ axLabelAngle 0 ] ]
                << position Y [ pName "baseline", pMType Quantitative ]
                << position Y2 [ pName "Value", pMType Quantitative ]
                << color [ mStr "#e45755" ]

        specUpperBar =
            asSpec [ trans [], bar [], encUpperBar [] ]

        layer0 =
            asSpec [ data [], layer [ specBar, specUpperBar ] ]

        thresholdData =
            dataFromRows []
                << dataRow [ ( "ThresholdValue", num 300 ), ( "Threshold", str "hazardous" ) ]

        specRule =
            asSpec [ rule [], encRule [] ]

        encRule =
            encoding
                << position Y [ pName "ThresholdValue", pMType Quantitative ]

        specText =
            asSpec [ textMark [ MAlign AlignLeft, MdX 215, MdY -5 ], encText [] ]

        encText =
            encoding
                << position Y [ pName "ThresholdValue", pMType Quantitative, pAxis [ axTitle "PM2.5 Value" ] ]
                << text [ tName "Threshold", tMType Ordinal ]

        layer1 =
            asSpec [ thresholdData [], layer [ specRule, specText ] ]
    in
    toVegaLite [ des, layer [ layer0, layer1 ] ]


layer3 : Spec
layer3 =
    let
        des =
            description "Monthly precipitation with mean value overlay."

        encBar =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        specBar =
            asSpec [ bar [], encBar [] ]

        encLine =
            encoding
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]
                << color [ mStr "red" ]
                << size [ mNum 3 ]

        specLine =
            asSpec [ rule [], encLine [] ]
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], layer [ specBar, specLine ] ]


layer4 : Spec
layer4 =
    let
        des =
            description "Layering text over 'heatmap'."

        encPosition =
            encoding
                << position X [ pName "Cylinders", pMType Ordinal ]
                << position Y [ pName "Origin", pMType Ordinal ]

        encRect =
            encoding
                << color [ mName "*", mMType Quantitative, mAggregate Count ]

        specRect =
            asSpec [ rect [], encRect [] ]

        encText =
            encoding
                << color [ mStr "white" ]
                << text [ tName "*", tMType Quantitative, tAggregate Count ]

        specText =
            asSpec [ textMark [], encText [] ]

        config =
            configure
                << configuration (Scale [ SCBandPaddingInner 0, SCBandPaddingOuter 0 ])
                << configuration (TextStyle [ MBaseline AlignMiddle ])
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], encPosition [], layer [ specRect, specText ], config [] ]


layer5 : Spec
layer5 =
    let
        des =
            description "A vertical 2D box plot showing median, min, and max in the US population distribution of age groups in 2000."

        trans =
            transform
                << aggregate
                    [ opAs Min "people" "lowerWhisker"
                    , opAs Q1 "people" "lowerBox"
                    , opAs Median "people" "midBox"
                    , opAs Q3 "people" "upperBox"
                    , opAs Max "people" "upperWhisker"
                    ]
                    [ "age" ]

        encAge =
            encoding << position X [ pName "age", pMType Ordinal ]

        encLWhisker =
            encoding
                << position Y [ pName "lowerWhisker", pMType Quantitative, pAxis [ axTitle "Population" ] ]
                << position Y2 [ pName "lowerBox", pMType Quantitative ]

        specLWhisker =
            asSpec [ rule [ MStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position Y [ pName "upperBox", pMType Quantitative ]
                << position Y2 [ pName "upperWhisker", pMType Quantitative ]

        specUWhisker =
            asSpec [ rule [ MStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position Y [ pName "lowerBox", pMType Quantitative ]
                << position Y2 [ pName "upperBox", pMType Quantitative ]
                << size [ mNum 5 ]

        specBox =
            asSpec [ bar [ MStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position Y [ pName "midBox", pMType Quantitative ]
                << color [ mStr "white" ]
                << size [ mNum 5 ]

        specBoxMid =
            asSpec [ tick [ MStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/population.json" []
        , trans []
        , encAge []
        , layer [ specLWhisker, specUWhisker, specBox, specBoxMid ]
        ]


layer6 : Spec
layer6 =
    let
        des =
            description "A Tukey box plot showing median and interquartile range in the US population distribution of age groups in 2000. This isn't strictly a Tukey box plot as the IQR extends beyond the min/max values for some age cohorts."

        trans =
            transform
                << aggregate [ opAs Q1 "people" "lowerBox", opAs Median "people" "midBox", opAs Q3 "people" "upperBox" ] [ "age" ]
                << calculateAs "datum.upperBox - datum.lowerBox" "IQR"
                << calculateAs "datum.upperBox + datum.IQR * 1.5" "upperWhisker"
                << calculateAs "max(0,datum.lowerBox - datum.IQR *1.5)" "lowerWhisker"

        encAge =
            encoding << position X [ pName "age", pMType Ordinal ]

        encLWhisker =
            encoding
                << position Y [ pName "lowerWhisker", pMType Quantitative, pAxis [ axTitle "Population" ] ]
                << position Y2 [ pName "lowerBox", pMType Quantitative ]

        specLWhisker =
            asSpec [ rule [ MStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position Y [ pName "upperBox", pMType Quantitative ]
                << position Y2 [ pName "upperWhisker", pMType Quantitative ]

        specUWhisker =
            asSpec
                [ rule [ MStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position Y [ pName "lowerBox", pMType Quantitative ]
                << position Y2 [ pName "upperBox", pMType Quantitative ]
                << size [ mNum 5 ]

        specBox =
            asSpec [ bar [ MStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position Y [ pName "midBox", pMType Quantitative ]
                << color [ mStr "white" ]
                << size [ mNum 5 ]

        specBoxMid =
            asSpec
                [ tick [ MStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/population.json" []
        , trans []
        , encAge []
        , layer [ specLWhisker, specUWhisker, specBox, specBoxMid ]
        ]


layer7 : Spec
layer7 =
    let
        des =
            description "A candlestick chart inspired by Protovis (http://mbostock.github.io/protovis/ex/candlestick.html)"

        data =
            dataFromColumns []
                << dataColumn "date" (strs [ "01-Jun-2009", "02-Jun-2009", "03-Jun-2009", "04-Jun-2009", "05-Jun-2009", "08-Jun-2009", "09-Jun-2009", "10-Jun-2009", "11-Jun-2009", "12-Jun-2009", "15-Jun-2009", "16-Jun-2009", "17-Jun-2009", "18-Jun-2009", "19-Jun-2009", "22-Jun-2009", "23-Jun-2009", "24-Jun-2009", "25-Jun-2009", "26-Jun-2009", "29-Jun-2009", "30-Jun-2009" ])
                << dataColumn "open" (nums [ 28.7, 30.04, 29.62, 31.02, 29.39, 30.84, 29.77, 26.9, 27.36, 28.08, 29.7, 30.81, 31.19, 31.54, 29.16, 30.4, 31.3, 30.58, 29.45, 27.09, 25.93, 25.36 ])
                << dataColumn "high" (nums [ 30.05, 30.13, 31.79, 31.02, 30.81, 31.82, 29.77, 29.74, 28.11, 28.5, 31.09, 32.75, 32.77, 31.54, 29.32, 32.05, 31.54, 30.58, 29.56, 27.22, 27.18, 27.38 ])
                << dataColumn "low" (nums [ 28.45, 28.3, 29.62, 29.92, 28.85, 26.41, 27.79, 26.9, 26.81, 27.73, 29.64, 30.07, 30.64, 29.6, 27.56, 30.3, 27.83, 28.79, 26.3, 25.76, 25.29, 25.02 ])
                << dataColumn "close" (nums [ 30.04, 29.63, 31.02, 30.18, 29.62, 29.77, 28.27, 28.46, 28.11, 28.15, 30.81, 32.68, 31.54, 30.03, 27.99, 31.17, 30.58, 29.05, 26.36, 25.93, 25.35, 26.35 ])
                << dataColumn "signal" (strs [ "short", "short", "short", "short", "short", "short", "short", "short", "short", "short", "long", "short", "short", "short", "short", "short", "short", "long", "long", "long", "long", "long" ])
                << dataColumn "ret" (nums [ -4.89396411092985, -0.322580645161295, 3.68663594470045, 4.51010886469673, 6.08424336973478, 1.2539184952978, -5.02431118314424, -5.46623794212217, -8.3743842364532, -5.52763819095477, 3.4920634920635, 0.155038759689914, 5.82822085889571, 8.17610062893082, 8.59872611464968, 15.4907975460123, 11.7370892018779, -10.4234527687296, 0, 0, 5.26315789473684, 6.73758865248228 ])

        trans =
            transform << calculateAs "datum.open > datum.close" "isIncrease"

        encLine =
            encoding
                << position X
                    [ pName "date"
                    , pMType Temporal
                    , pTimeUnit YearMonthDate
                    , pScale [ scDomain (doDts [ [ dtMonth May, dtDate 31, dtYear 2009 ], [ dtMonth Jul, dtDate 1, dtYear 2009 ] ]) ]
                    , pAxis [ axTitle "Date in 2009", axFormat "%m/%d" ]
                    ]
                << position Y [ pName "low", pMType Quantitative, pScale [ scZero False ] ]
                << position Y2 [ pName "high", pMType Quantitative ]
                << color [ mName "isIncrease", mMType Nominal, mLegend [], mScale [ scRange (raStrs [ "#ae1325", "#06982d" ]) ] ]

        specLine =
            asSpec [ rule [], encLine [] ]

        encBar =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonthDate ]
                << position Y [ pName "open", pMType Quantitative ]
                << position Y2 [ pName "close", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mName "isIncrease", mMType Nominal, mLegend [] ]

        specBar =
            asSpec [ bar [], encBar [] ]
    in
    toVegaLite [ des, width 320, data [], trans [], layer [ specLine, specBar ] ]


layer8 : Spec
layer8 =
    let
        des =
            description "Error bars showing confidence intervals"

        encVariety =
            encoding << position Y [ pName "variety", pMType Ordinal ]

        encPoints =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Mean, pScale [ scZero False ], pAxis [ axTitle "Barley Yield" ] ]
                << color [ mStr "black" ]

        specPoints =
            asSpec [ point [ MFilled True ], encPoints [] ]

        encCIs =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate CI0 ]
                << position X2 [ pName "yield", pMType Quantitative, pAggregate CI1 ]

        specCIs =
            asSpec [ rule [], encCIs [] ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], encVariety [], layer [ specPoints, specCIs ] ]


layer9 : Spec
layer9 =
    let
        des =
            description "Error bars showing standard deviation."

        trans =
            transform
                << aggregate [ opAs Mean "yield" "mean", opAs Stdev "yield" "stdev" ] [ "variety" ]
                << calculateAs "datum.mean-datum.stdev" "lower"
                << calculateAs "datum.mean+datum.stdev" "upper"

        encVariety =
            encoding << position Y [ pName "variety", pMType Ordinal ]

        encMeans =
            encoding
                << position X [ pName "mean", pMType Quantitative, pScale [ scZero False ], pAxis [ axTitle "Barley Yield" ] ]
                << color [ mStr "black" ]

        specMeans =
            asSpec [ point [ MFilled True ], encMeans [] ]

        encStdevs =
            encoding
                << position X [ pName "upper", pMType Quantitative ]
                << position X2 [ pName "lower", pMType Quantitative ]

        specStdevs =
            asSpec [ rule [], encStdevs [] ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], trans [], encVariety [], layer [ specMeans, specStdevs ] ]


layer10 : Spec
layer10 =
    let
        des =
            description "Histogram with global mean overlay."

        encBars =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [], pAxis [] ]
                << position Y [ pMType Quantitative, pAggregate Count ]

        specBars =
            asSpec [ bar [], encBars [] ]

        encMean =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pAggregate Mean ]
                << color [ mStr "red" ]
                << size [ mNum 5 ]

        specMean =
            asSpec [ rule [], encMean [] ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], layer [ specBars, specMean ] ]


layer11 : Spec
layer11 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars with a global mean and standard deviation overlay."

        encPoints =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]

        specPoints =
            asSpec [ point [], encPoints [] ]

        trans =
            transform
                << aggregate [ opAs Mean "Miles_per_Gallon" "mean_MPG", opAs Stdev "Miles_per_Gallon" "dev_MPG" ] []
                << calculateAs "datum.mean_MPG+datum.dev_MPG" "upper"
                << calculateAs "datum.mean_MPG-datum.dev_MPG" "lower"

        encMean =
            encoding << position Y [ pName "mean_MPG", pMType Quantitative ]

        specMean =
            asSpec [ rule [], encMean [] ]

        encRect =
            encoding
                << position Y [ pName "lower", pMType Quantitative ]
                << position Y2 [ pName "upper", pMType Quantitative ]
                << opacity [ mNum 0.2 ]

        specRect =
            asSpec [ rect [], encRect [] ]

        specSpread =
            asSpec [ trans [], layer [ specMean, specRect ] ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], layer [ specPoints, specSpread ] ]


layer12 : Spec
layer12 =
    let
        des =
            description "Line chart with confidence interval band."

        encTime =
            encoding << position X [ pName "Year", pMType Temporal, pTimeUnit Year ]

        encBand =
            encoding
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative, pAggregate CI0, pAxis [ axTitle "Miles/Gallon" ] ]
                << position Y2 [ pName "Miles_per_Gallon", pMType Quantitative, pAggregate CI1 ]
                << opacity [ mNum 0.3 ]

        specBand =
            asSpec [ area [], encBand [] ]

        encLine =
            encoding
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative, pAggregate Mean ]

        specLine =
            asSpec [ line [], encLine [] ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], encTime [], layer [ specBand, specLine ] ]


layer13 : Spec
layer13 =
    let
        des =
            description "The population of the German city of Falkensee over time with annotated time periods highlighted."

        data =
            dataFromColumns [ parse [ ( "year", foDate "%Y" ) ] ]
                << dataColumn "year" (strs [ "1875", "1890", "1910", "1925", "1933", "1939", "1946", "1950", "1964", "1971", "1981", "1985", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014" ])
                << dataColumn "population" (nums [ 1309, 1558, 4512, 8180, 15915, 24824, 28275, 29189, 29881, 26007, 24029, 23340, 22307, 22087, 22139, 22105, 22242, 22801, 24273, 25640, 27393, 29505, 32124, 33791, 35297, 36179, 36829, 37493, 38376, 39008, 39366, 39821, 40179, 40511, 40465, 40905, 41258, 41777 ])

        highlights =
            dataFromColumns [ parse [ ( "start", foDate "%Y" ), ( "end", foDate "%Y" ) ] ]
                << dataColumn "start" (strs [ "1933", "1948" ])
                << dataColumn "end" (strs [ "1945", "1989" ])
                << dataColumn "event" (strs [ "Nazi Rule", "GDR (East Germany)" ])

        encRects =
            encoding
                << position X [ pName "start", pMType Temporal, pTimeUnit Year, pAxis [] ]
                << position X2 [ pName "end", pMType Temporal, pTimeUnit Year ]
                << color [ mName "event", mMType Nominal ]

        specRects =
            asSpec [ highlights [], rect [], encRects [] ]

        encPopulation =
            encoding
                << position X [ pName "year", pMType Temporal, pTimeUnit Year, pAxis [ axTitle "" ] ]
                << position Y [ pName "population", pMType Quantitative ]
                << color [ mStr "#333" ]

        specLine =
            asSpec [ line [], encPopulation [] ]

        specPoints =
            asSpec [ point [], encPopulation [] ]
    in
    toVegaLite [ des, width 500, data [], layer [ specRects, specLine, specPoints ] ]


layer14 : Spec
layer14 =
    let
        des =
            description "A ranged dot plot that uses 'layer' to convey changing life expectancy for the five most populous countries (between 1955 and 2000)."

        trans =
            transform
                << filter (fiOneOf "country" (strs [ "China", "India", "United States", "Indonesia", "Brazil" ]))
                << filter (fiOneOf "year" (nums [ 1955, 2000 ]))

        encCountry =
            encoding << position Y [ pName "country", pMType Nominal, pAxis [ axTitle "Country", axOffset 5, axTicks False, axMinExtent 70, axDomain False ] ]

        encLine =
            encoding
                << position X [ pName "life_expect", pMType Quantitative ]
                << detail [ dName "country", dMType Nominal ]
                << color [ mStr "#db646f" ]

        specLine =
            asSpec [ line [], encLine [] ]

        encPoints =
            encoding
                << position X [ pName "life_expect", pMType Quantitative, pAxis [ axTitle "Life Expectanct (years)" ] ]
                << color [ mName "year", mMType Ordinal, mScale (domainRangeMap ( 1955, "#e6959c" ) ( 2000, "#911a24" )), mLegend [ leTitle "Year" ] ]
                << size [ mNum 100 ]
                << opacity [ mNum 1 ]

        specPoints =
            asSpec [ point [ MFilled True ], encPoints [] ]
    in
    toVegaLite [ des, dataFromUrl "data/countries.json" [], trans [], encCountry [], layer [ specLine, specPoints ] ]


layer15 : Spec
layer15 =
    let
        des =
            description "Layered bar/line chart with dual axes."

        encTime =
            encoding << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]

        encBar =
            encoding
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean, pAxis [ axGrid False ] ]

        specBar =
            asSpec [ bar [], encBar [] ]

        encLine =
            encoding
                << position Y [ pName "temp_max", pMType Quantitative, pAggregate Mean, pAxis [ axGrid False ], pScale [ scZero False ] ]
                << color [ mStr "firebrick" ]

        specLine =
            asSpec [ line [], encLine [] ]

        res =
            resolve
                << resolution (RScale [ ( ChY, Independent ) ])
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], encTime [], layer [ specBar, specLine ], res [] ]


layer16 : Spec
layer16 =
    let
        des =
            description "Horizon chart with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on horizon charts.)"

        data =
            dataFromColumns []
                << dataColumn "x" (nums (List.map toFloat <| List.range 1 20))
                << dataColumn "y" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        trans =
            transform << calculateAs "datum.y - 50" "ny"

        encX =
            encoding << position X [ pName "x", pMType Quantitative, pScale [ scZero False, scNice (scIsNice False) ] ]

        encLower =
            encoding
                << position Y [ pName "y", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ] ]
                << opacity [ mNum 0.6 ]

        specLower =
            asSpec [ area [ MClip True ], encLower [] ]

        encUpper =
            encoding
                << position Y [ pName "ny", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ], pAxis [ axTitle "y" ] ]
                << opacity [ mNum 0.3 ]

        specUpper =
            asSpec [ trans [], area [ MClip True ], encUpper [] ]

        config =
            configure
                << configuration (AreaStyle [ MInterpolate Monotone, MOrient Vertical ])
    in
    toVegaLite [ des, width 300, height 50, data [], encX [], layer [ specLower, specUpper ], config [] ]


layer17 : Spec
layer17 =
    let
        des =
            description "Connected scatterplot showing change over time."

        enc =
            encoding
                << position X [ pName "miles", pMType Quantitative, pScale [ scZero False ] ]
                << position Y [ pName "gas", pMType Quantitative, pScale [ scZero False ] ]
                << order [ oName "year", oMType Temporal ]

        specLine =
            asSpec [ line [] ]

        specPoint =
            asSpec [ point [ MFilled True ] ]
    in
    toVegaLite [ des, dataFromUrl "data/driving.json" [], enc [], layer [ specLine, specPoint ] ]


layer18 : Spec
layer18 =
    let
        des =
            description "Carbon dioxide in the atmosphere."

        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/co2-concentration.csv" [ parse [ ( "Date", foUtc "%Y-%m-%d" ) ] ]

        trans =
            transform
                << calculateAs "year(datum.Date)" "year"
                << calculateAs "month(datum.Date)" "month"
                << calculateAs "floor(datum.year / 10)" "decade"
                << calculateAs "(datum.year % 10) + (datum.month / 12)" "scaled_date"

        encPosition =
            encoding
                << position X
                    [ pName "scaled_date"
                    , pMType Quantitative
                    , pAxis [ axTitle "Year into decade", axTickCount 10, axValues [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ]
                    ]
                << position Y
                    [ pName "CO2"
                    , pMType Quantitative
                    , pScale [ scZero False ]
                    , pAxis [ axTitle "CO2 concentration in ppm" ]
                    ]

        encLine =
            encoding
                << color [ mName "decade", mMType Nominal, mLegend [] ]

        specLine =
            asSpec [ line [ MOrient Vertical ], encLine [] ]

        transTextMin =
            transform
                << aggregate [ opAs ArgMin "scaled_date" "aggregated" ] [ "decade" ]
                << calculateAs "datum.aggregated.scaled_date" "scaled_date"
                << calculateAs "datum.aggregated.CO2" "CO2"

        encTextMin =
            encoding
                << text [ tName "aggregated.year", tMType Nominal ]

        specTextMin =
            asSpec [ transTextMin [], textMark [ MAlign AlignLeft, MBaseline AlignTop, MdX 3, MdY 1 ], encTextMin [] ]

        transTextMax =
            transform
                << aggregate [ opAs ArgMax "scaled_date" "aggregated" ] [ "decade" ]
                << calculateAs "datum.aggregated.scaled_date" "scaled_date"
                << calculateAs "datum.aggregated.CO2" "CO2"

        encTextMax =
            encoding
                << text [ tName "aggregated.year", tMType Nominal ]

        specTextMax =
            asSpec [ transTextMax [], textMark [ MAlign AlignLeft, MBaseline AlignBottom, MdX 3, MdY 1 ], encTextMax [] ]

        config =
            configure << configuration (View [ Stroke Nothing ])
    in
    toVegaLite
        [ des
        , config []
        , width 800
        , height 500
        , data
        , trans []
        , encPosition []
        , layer [ specLine, specTextMin, specTextMax ]
        ]


comp1 : Spec
comp1 =
    let
        des =
            description "Monthly weather information for individual years and overall average for Seatle and New York."

        enc1 =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pRepeat Column, pMType Quantitative, pAggregate Mean ]
                << detail [ dName "date", dMType Temporal, dTimeUnit Year ]
                << color [ mName "location", mMType Nominal ]
                << opacity [ mNum 0.2 ]

        spec1 =
            asSpec [ line [], enc1 [] ]

        enc2 =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pRepeat Column, pMType Quantitative, pAggregate Mean ]
                << color [ mName "location", mMType Nominal ]

        spec2 =
            asSpec [ line [], enc2 [] ]

        spec =
            asSpec [ layer [ spec1, spec2 ] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/weather.csv" [ parse [ ( "date", foDate "%Y-%m-%d %H:%M" ) ] ]
        , repeat [ ColumnFields [ "temp_max", "precipitation", "wind" ] ]
        , specification spec
        ]


comp2 : Spec
comp2 =
    let
        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative, pBin [] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << color [ mName "Origin", mMType Nominal ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], bar [], enc [] ]
    in
    toVegaLite
        [ repeat [ ColumnFields [ "Horsepower", "Miles_per_Gallon", "Acceleration" ] ]
        , specification spec
        ]


comp3 : Spec
comp3 =
    let
        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative, pBin [ biMaxBins 15 ] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal, mLegend [] ]

        spec =
            asSpec [ bar [], enc [] ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , facet [ rowBy [ fName "Origin", fMType Nominal ] ]
        , specification spec
        ]


geo1 : Spec
geo1 =
    toVegaLite
        [ description "Choropleth of US unemployment rate by county"
        , width 500
        , height 300
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/us-10m.json" [ topojsonFeature "counties" ]
        , transform <| lookup "id" (dataFromUrl "data/unemployment.tsv" []) "id" [ "rate" ] <| []
        , geoshape []
        , encoding <| color [ mName "rate", mMType Quantitative ] []
        ]


geo2 : Spec
geo2 =
    let
        enc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 1 ]
                << color [ mName "digit", mMType Nominal ]
    in
    toVegaLite
        [ description "US zip codes: One dot per zipcode colored by first digit"
        , width 500
        , height 300
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/zipcodes.csv" []
        , transform <| calculateAs "substring(datum.zip_code, 0, 1)" "digit" <| []
        , circle []
        , enc []
        ]


geo3 : Spec
geo3 =
    let
        des =
            description "One dot per airport in the US overlayed on geoshape"

        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        overlayEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "steelblue" ]

        overlaySpec =
            asSpec
                [ dataFromUrl "data/airports.csv" []
                , circle []
                , overlayEnc []
                ]
    in
    toVegaLite
        [ des
        , width 500
        , height 300
        , projection [ PType AlbersUsa ]
        , layer [ backdropSpec, overlaySpec ]
        ]


geo4 : Spec
geo4 =
    let
        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        airportsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "gray" ]

        airportsSpec =
            asSpec
                [ dataFromUrl "data/airports.csv" []
                , circle []
                , airportsEnc []
                ]

        trans =
            transform
                << filter (fiEqual "origin" (str "SEA"))
                << lookup "origin" (dataFromUrl "data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "origin_latitude"
                << calculateAs "datum.longitude" "origin_longitude"
                << lookup "destination" (dataFromUrl "data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "dest_latitude"
                << calculateAs "datum.longitude" "dest_longitude"

        flightsEnc =
            encoding
                << position Longitude [ pName "origin_longitude", pMType Quantitative ]
                << position Latitude [ pName "origin_latitude", pMType Quantitative ]
                << position Longitude2 [ pName "dest_longitude", pMType Quantitative ]
                << position Latitude2 [ pName "dest_latitude", pMType Quantitative ]

        flightsSpec =
            asSpec
                [ dataFromUrl "data/flights-airport.csv" []
                , trans []
                , rule []
                , flightsEnc []
                ]
    in
    toVegaLite
        [ description "Rules (line segments) connecting SEA to every airport reachable via direct flight"
        , width 800
        , height 500
        , projection [ PType AlbersUsa ]
        , layer [ backdropSpec, airportsSpec, flightsSpec ]
        ]


geo5 : Spec
geo5 =
    let
        enc =
            encoding
                << shape [ mName "geo", mMType GeoFeature ]
                << color [ mRepeat Row, mMType Quantitative ]

        spec =
            asSpec
                [ width 500
                , height 300
                , dataFromUrl "data/population_engineers_hurricanes.csv" []
                , transform <| lookupAs "id" (dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]) "id" "geo" []
                , projection [ PType AlbersUsa ]
                , geoshape []
                , enc []
                ]
    in
    toVegaLite
        [ description "Population per state, engineers per state, and hurricanes per state"
        , repeat [ RowFields [ "population", "engineers", "hurricanes" ] ]
        , resolve <| resolution (RScale [ ( ChColor, Independent ) ]) []
        , specification spec
        ]


geo6 : Spec
geo6 =
    let
        des =
            description "US state campitals overlayed on map of the US"

        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#ccc" ] []
                ]

        overlayEnc =
            encoding
                << position Longitude [ pName "lon", pMType Quantitative ]
                << position Latitude [ pName "lat", pMType Quantitative ]
                << text [ tName "city", tMType Nominal ]

        overlaySpec =
            asSpec
                [ dataFromUrl "data/us-state-capitals.json" []
                , textMark []
                , overlayEnc []
                ]
    in
    toVegaLite
        [ des
        , width 800
        , height 500
        , projection [ PType AlbersUsa ]
        , layer [ backdropSpec, overlaySpec ]
        ]


geo7 : Spec
geo7 =
    let
        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        airportsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "gray" ]

        airportsSpec =
            asSpec
                [ dataFromUrl "data/airports.csv" []
                , circle []
                , airportsEnc []
                ]

        itinerary =
            dataFromColumns []
                << dataColumn "airport" (strs [ "SEA", "SFO", "LAX", "LAS", "DFW", "DEN", "ORD", "JFK", "ATL" ])
                << dataColumn "order" (nums [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])

        trans =
            transform
                << lookup "airport" (dataFromUrl "data/airports.csv" []) "iata" [ "latitude", "longitude" ]

        flightsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << order [ oName "order", oMType Ordinal ]

        flightsSpec =
            asSpec
                [ itinerary []
                , trans []
                , line []
                , flightsEnc []
                ]
    in
    toVegaLite
        [ description "Line drawn between airports in the U.S. simulating a flight itinerary"
        , width 800
        , height 500
        , projection [ PType AlbersUsa ]
        , layer [ backdropSpec, airportsSpec, flightsSpec ]
        ]


geo8 : Spec
geo8 =
    let
        enc =
            encoding
                << shape [ mName "geo", mMType GeoFeature ]
                << color [ mName "pct", mMType Quantitative ]
                << row [ fName "group", fMType Nominal ]
    in
    toVegaLite
        [ description "Income in the U.S. by state, faceted over income brackets"
        , width 500
        , height 300
        , dataFromUrl "data/income.json" []
        , transform <| lookupAs "id" (dataFromUrl "data/us-10m.json" [ topojsonFeature "states" ]) "id" "geo" []
        , projection [ PType AlbersUsa ]
        , geoshape []
        , enc []
        ]


geo9 : Spec
geo9 =
    let
        tubeLineColors =
            categoricalDomainMap
                [ ( "Bakerloo", "rgb(137,78,36)" )
                , ( "Central", "rgb(220,36,30)" )
                , ( "Circle", "rgb(255,206,0)" )
                , ( "District", "rgb(1,114,41)" )
                , ( "DLR", "rgb(0,175,173)" )
                , ( "Hammersmith & City", "rgb(215,153,175)" )
                , ( "Jubilee", "rgb(106,114,120)" )
                , ( "Metropolitan", "rgb(114,17,84)" )
                , ( "Northern", "rgb(0,0,0)" )
                , ( "Piccadilly", "rgb(0,24,168)" )
                , ( "Victoria", "rgb(0,160,226)" )
                , ( "Waterloo & City", "rgb(106,187,170)" )
                ]

        polySpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/londonBoroughs.json" [ topojsonFeature "boroughs" ]
                , geoshape [ MStroke "rgb(251,247,238)", MStrokeWidth 2 ]
                , encoding <| color [ mStr "#ddc" ] []
                ]

        labelEnc =
            encoding
                << position Longitude [ pName "cx", pMType Quantitative ]
                << position Latitude [ pName "cy", pMType Quantitative ]
                << text [ tName "bLabel", tMType Nominal ]
                << size [ mNum 8 ]
                << opacity [ mNum 0.6 ]

        trans =
            transform
                << calculateAs "indexof (datum.name,' ') > 0  ? substring(datum.name,0,indexof(datum.name, ' ')) : datum.name" "bLabel"

        labelSpec =
            asSpec [ dataFromUrl "https://vega.github.io/vega-lite/data/londonCentroids.json" [], trans [], textMark [], labelEnc [] ]

        tubeEnc =
            encoding
                << color
                    [ mName "id"
                    , mMType Nominal
                    , mLegend [ leTitle "", leOrient BottomRight, leOffset 0 ]
                    , mScale tubeLineColors
                    ]

        routeSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/londonTubeLines.json" [ topojsonFeature "line" ]
                , geoshape [ MFilled False, MStrokeWidth 2 ]
                , tubeEnc []
                ]
    in
    toVegaLite
        [ width 700
        , height 500
        , configure <| configuration (View [ Stroke Nothing ]) []
        , layer [ polySpec, labelSpec, routeSpec ]
        ]


interactive1 : Spec
interactive1 =
    let
        des =
            description "Drag out a rectangular brush to highlight points."

        sel =
            selection << select "myBrush" Interval []

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "myBrush")
                        [ mName "Cylinders", mMType Ordinal ]
                        [ mStr "grey" ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], point [], sel [], enc [] ]


interactive2 : Spec
interactive2 =
    let
        des =
            description "Mouse over individual points or select multiple points with the shift key."

        sel =
            selection << select "myPaintbrush" Multi [ On "mouseover", Nearest True ]

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << size
                    [ mSelectionCondition (selectionName "myPaintbrush")
                        [ mNum 300 ]
                        [ mNum 50 ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], point [], sel [], enc [] ]


interactive3 : Spec
interactive3 =
    let
        des =
            description "Drag to pan. Zoom in or out with mousewheel/zoom gesture."

        sel =
            selection << select "myGrid" Interval [ BindScales ]

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative, pScale [ scDomain (doNums [ 75, 150 ]) ] ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative, pScale [ scDomain (doNums [ 20, 40 ]) ] ]
                << size [ mName "Cylinders", mMType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], circle [], sel [], enc [] ]


interactive4 : Spec
interactive4 =
    let
        des =
            description "Drag the sliders to highlight points."

        trans =
            transform
                << calculateAs "year(datum.Year)" "Year"

        sel1 =
            selection
                << select "CylYr"
                    Single
                    [ Fields [ "Cylinders", "Year" ]
                    , Bind
                        [ iRange "Cylinders" [ inName "Cylinders ", inMin 3, inMax 8, inStep 1 ]
                        , iRange "Year" [ inName "Year ", inMin 1969, inMax 1981, inStep 1 ]
                        ]
                    ]

        encPosition =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]

        enc1 =
            encoding
                << color
                    [ mSelectionCondition (selectionName "CylYr")
                        [ mName "Origin", mMType Nominal ]
                        [ mStr "grey" ]
                    ]

        spec1 =
            asSpec [ sel1 [], circle [], enc1 [] ]

        trans2 =
            transform
                << filter (fiSelection "CylYr")

        enc2 =
            encoding
                << color [ mName "Origin", mMType Nominal ]
                << size [ mNum 100 ]

        spec2 =
            asSpec [ trans2 [], circle [], enc2 [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/cars.json" []
        , trans []
        , encPosition []
        , layer [ spec1, spec2 ]
        ]


interactive5 : Spec
interactive5 =
    let
        des =
            description "Drag over bars to update selection average."

        sel =
            selection << select "myBrush" Interval [ Encodings [ ChX ] ]

        encPosition =
            encoding << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        enc1 =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << opacity
                    [ mSelectionCondition (selectionName "myBrush")
                        [ mNum 1 ]
                        [ mNum 0.7 ]
                    ]

        spec1 =
            asSpec [ sel [], bar [], enc1 [] ]

        trans =
            transform
                << filter (fiSelection "myBrush")

        enc2 =
            encoding
                << color [ mStr "firebrick" ]
                << size [ mNum 3 ]

        spec2 =
            asSpec [ des, trans [], rule [], enc2 [] ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , encPosition []
        , layer [ spec1, spec2 ]
        ]


interactive6 : Spec
interactive6 =
    let
        des =
            description "Drag over lower chart to update detailed view in upper chart."

        sel =
            selection << select "myBrush" Interval [ Encodings [ ChX ] ]

        enc1 =
            encoding
                << position X [ pName "date", pMType Temporal, pScale [ scDomain (doSelection "myBrush") ], pAxis [ axTitle "" ] ]
                << position Y [ pName "price", pMType Quantitative ]

        spec1 =
            asSpec [ width 500, area [], enc1 [] ]

        enc2 =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative, pAxis [ axTickCount 3, axGrid False ] ]

        spec2 =
            asSpec [ width 480, height 60, sel [], area [], enc2 [] ]
    in
    toVegaLite [ des, dataFromUrl "data/sp500.csv" [], vConcat [ spec1, spec2 ] ]


interactive7 : Spec
interactive7 =
    let
        des =
            description "Drag over any chart to cross-filter highlights in all charts."

        trans =
            transform
                << calculateAs "hours(datum.date)" "time"

        sel =
            selection << select "myBrush" Interval [ Encodings [ ChX ] ]

        selTrans =
            transform
                << filter (fiSelection "myBrush")

        encPosition =
            encoding
                << position X [ pRepeat Column, pMType Quantitative, pBin [ biMaxBins 20 ] ]
                << position Y [ pAggregate Count, pMType Quantitative ]

        spec1 =
            asSpec [ sel [], bar [] ]

        spec2 =
            asSpec [ selTrans [], bar [], encoding (color [ mStr "goldenrod" ] []) ]

        spec =
            asSpec
                [ des
                , dataFromUrl "data/flights-2k.json" [ parse [ ( "date", foDate "" ) ] ]
                , trans []
                , encPosition []
                , layer [ spec1, spec2 ]
                ]
    in
    toVegaLite
        [ repeat [ ColumnFields [ "distance", "delay", "time" ] ]
        , specification spec
        ]


interactive8 : Spec
interactive8 =
    let
        des =
            description "Scatterplot matrix. Drag/zoom in any scatterplot to update view of all scatterplots containing selected variables. Shift-select to highlight selected points."

        sel =
            selection
                << select "myBrush"
                    Interval
                    [ On "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!"
                    , Translate "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!"
                    , Zoom "wheel![event.shiftKey]"
                    , ResolveSelections Union
                    ]
                << select ""
                    Interval
                    [ BindScales
                    , Translate "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!"
                    , Zoom "wheel![event.shiftKey]"
                    , ResolveSelections Global
                    ]

        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pRepeat Row, pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "myBrush")
                        [ mName "Origin", mMType Nominal ]
                        [ mStr "grey" ]
                    ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], point [], sel [], enc [] ]
    in
    toVegaLite
        [ des
        , repeat [ RowFields [ "Horsepower", "Acceleration", "Miles_per_Gallon" ], ColumnFields [ "Miles_per_Gallon", "Acceleration", "Horsepower" ] ]
        , specification spec
        ]


interactive9 : Spec
interactive9 =
    let
        des =
            description "A dashboard with cross-highlighting. Select bars in lower chart to update view in upper chart."

        selTrans =
            transform
                << filter (fiSelection "myPts")

        encPosition =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]

        enc1 =
            encoding
                << color [ mAggregate Count, mMType Quantitative, mLegend [ leTitle "" ] ]

        spec1 =
            asSpec [ width 300, rect [], enc1 [] ]

        enc2 =
            encoding
                << size [ mAggregate Count, mMType Quantitative, mLegend [ leTitle "In Selected Category" ] ]
                << color [ mStr "#666" ]

        spec2 =
            asSpec [ selTrans [], point [], enc2 [] ]

        heatSpec =
            asSpec [ encPosition [], layer [ spec1, spec2 ] ]

        sel =
            selection << select "myPts" Single [ Encodings [ ChX ] ]

        barSpec =
            asSpec [ width 420, height 120, bar [], sel [], encBar [] ]

        encBar =
            encoding
                << position X [ pName "Major_Genre", pMType Nominal, pAxis [ axLabelAngle -40 ] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "myPts")
                        [ mStr "steelblue" ]
                        [ mStr "grey" ]
                    ]

        config =
            configure
                << configuration (Range [ RHeatmap "greenblue" ])

        res =
            resolve
                << resolution (RLegend [ ( ChColor, Independent ), ( ChSize, Independent ) ])
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], vConcat [ heatSpec, barSpec ], res [], config [] ]


interactive10 : Spec
interactive10 =
    let
        data =
            dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []

        sel =
            selection << select "myTooltip" Single [ Nearest True, On "mouseover", Encodings [ ChX ], Empty ]

        enc =
            encoding
                << position X [ pName "date", pMType Temporal ]
                << position Y [ pName "price", pMType Quantitative ]
                << color [ mName "symbol", mMType Nominal ]

        pointEnc =
            encoding
                << color [ mName "symbol", mMType Nominal ]
                << opacity [ mSelectionCondition (expr "myTooltip") [ mNum 1 ] [ mNum 0 ] ]

        textEnc =
            encoding << text [ tName "price", tMType Quantitative ]
    in
    toVegaLite
        [ width 600
        , height 300
        , data
        , enc []
        , layer
            [ asSpec [ line [] ]
            , asSpec [ point [], pointEnc [], sel [] ]
            , asSpec [ transform (filter (fiSelection "myTooltip") []), rule [ MColor "gray" ] ]
            , asSpec [ transform (filter (fiSelection "myTooltip") []), textMark [ MAlign AlignLeft, MdX 5, MdY -5 ], textEnc [] ]
            ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "basic1", basic1 )
        , ( "basic2", basic2 )
        , ( "basic3", basic3 )
        , ( "basic4", basic4 )
        , ( "basic5", basic5 )
        , ( "basic6", basic6 )
        , ( "basic7", basic7 )
        , ( "basic8", basic8 )
        , ( "basic9", basic9 )
        , ( "basic10", basic10 )
        , ( "basic11", basic11 )
        , ( "basic12", basic12 )
        , ( "basic13", basic13 )
        , ( "basic14", basic14 )
        , ( "basic15", basic15 )
        , ( "basic16", basic16 )
        , ( "basic17", basic17 )
        , ( "basic18", basic18 )
        , ( "basic19", basic19 )
        , ( "basic20", basic20 )
        , ( "basic21", basic21 )
        , ( "basic22", basic22 )
        , ( "stack1", stack1 )
        , ( "stack2", stack2 )
        , ( "stack3", stack3 )
        , ( "stack4", stack4 )
        , ( "stack5", stack5 )
        , ( "stack6", stack6 )
        , ( "stack7", stack7 )
        , ( "stack8", stack8 )
        , ( "trellis1", trellis1 )
        , ( "trellis2", trellis2 )
        , ( "trellis3", trellis3 )
        , ( "trellis4", trellis4 )
        , ( "trellis5", trellis5 )
        , ( "trellis6", trellis6 )
        , ( "trellis7", trellis7 )
        , ( "layer1", layer1 )
        , ( "layer2", layer2 )
        , ( "layer3", layer3 )
        , ( "layer4", layer4 )
        , ( "layer5", layer5 )
        , ( "layer6", layer6 )
        , ( "layer7", layer7 )
        , ( "layer8", layer8 )
        , ( "layer9", layer9 )
        , ( "layer10", layer10 )
        , ( "layer11", layer11 )
        , ( "layer12", layer12 )
        , ( "layer13", layer13 )
        , ( "layer14", layer14 )
        , ( "layer15", layer15 )
        , ( "layer16", layer16 )
        , ( "layer17", layer17 )
        , ( "layer18", layer18 )
        , ( "comp1", comp1 )
        , ( "comp2", comp2 )
        , ( "comp3", comp3 )
        , ( "geo1", geo1 )
        , ( "geo2", geo2 )
        , ( "geo3", geo3 )
        , ( "geo4", geo4 )
        , ( "geo5", geo5 )
        , ( "geo6", geo6 )
        , ( "geo7", geo7 )
        , ( "geo8", geo8 )
        , ( "geo9", geo9 )
        , ( "interactive1", interactive1 )
        , ( "interactive2", interactive2 )
        , ( "interactive3", interactive3 )
        , ( "interactive4", interactive4 )
        , ( "interactive5", interactive5 )
        , ( "interactive6", interactive6 )
        , ( "interactive7", interactive7 )
        , ( "interactive8", interactive8 )
        , ( "interactive9", interactive9 )
        , ( "interactive10", interactive10 )
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
