port module Gallery exposing (..)

import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


vl1 : Spec
vl1 =
    let
        des =
            description "A simple bar chart with embedded data."

        data =
            dataFromColumns []
                << dataColumn "a" (Strings [ "A", "B", "C", "D", "E", "F", "G", "H", "I" ])
                << dataColumn "b" (Numbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52 ])

        enc =
            encoding
                << position X [ PName "a", PmType Ordinal ]
                << position Y [ PName "b", PmType Quantitative ]
    in
    toVegaLite [ des, data [], mark Bar [], enc [] ]


vl2 : Spec
vl2 =
    let
        des =
            description "A bar chart showing the US population distribution of age groups in 2000."

        trans =
            transform << filter (FExpr "datum.year == 2000")

        enc =
            encoding
                << position X [ PName "people", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "population" ] ]
                << position Y [ PName "age", PmType Ordinal, PScale [ SRangeStep (Just 17) ] ]
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], mark Bar [], trans [], enc [] ]


vl3 : Spec
vl3 =
    let
        des =
            description "Simple histogram of IMDB ratings."

        enc =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [] ]
                << position Y [ PmType Quantitative, PAggregate Count ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], mark Bar [], enc [] ]


vl4 : Spec
vl4 =
    let
        des =
            description "A simple bar chart with ranged data (aka Gantt Chart)."

        data =
            dataFromColumns []
                << dataColumn "task" (Strings [ "A", "B", "C" ])
                << dataColumn "start" (Numbers [ 1, 3, 8 ])
                << dataColumn "end" (Numbers [ 3, 8, 10 ])

        enc =
            encoding
                << position Y [ PName "task", PmType Ordinal ]
                << position X [ PName "start", PmType Quantitative ]
                << position X2 [ PName "end", PmType Quantitative ]
    in
    toVegaLite [ des, data [], mark Bar [], enc [] ]


vl5 : Spec
vl5 =
    let
        des =
            description "Grouped bar chart shoing population structure by age and gender."

        trans =
            transform
                << filter (FExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ PName "gender", PmType Nominal, PScale [ SRangeStep (Just 12) ], PAxis [ AxTitle "" ] ]
                << position Y [ PName "people", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "population", Grid False ] ]
                << column [ FName "age", FmType Ordinal ]
                << color [ MName "gender", MmType Nominal, MScale [ SRange (RStrings [ "#EA98D2", "#659CCA" ]) ] ]

        config =
            configure
                << configuration (Axis [ DomainWidth 1 ])
                << configuration (View [ Stroke Nothing ])
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], mark Bar [], trans [], enc [], config [] ]


vl6 : Spec
vl6 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via point marks)."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Point [], enc [] ]


vl7 : Spec
vl7 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via circle marks)."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Circle [], enc [] ]


vl8 : Spec
vl8 =
    let
        des =
            description "A binned scatterplot comparing IMDB and Rotten Tomatoes rating with marks sized by number of reviews."

        enc =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << size [ MAggregate Count, MmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], mark Circle [], enc [] ]


vl9 : Spec
vl9 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallons with country of origin double encoded by colour and shape."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal ]
                << shape [ MName "Origin", MmType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Point [], enc [] ]


vl10 : Spec
vl10 =
    let
        des =
            description "A bubbleplot showing horsepower on x, miles per gallons on y, and acceleration on size."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << size [ MName "Acceleration", MmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Point [], enc [] ]


vl11 : Spec
vl11 =
    let
        des =
            description "A bubble plot showing the correlation between health and income for 187 countries in the world (modified from an example in Lisa Charlotte Rost's blog post 'One Chart, Twelve Charting Libraries' --http://lisacharlotterost.github.io/2016/05/17/one-chart-code/)."

        enc =
            encoding
                << position X [ PName "income", PmType Quantitative, PScale [ SType ScLog ] ]
                << position Y [ PName "health", PmType Quantitative, PScale [ SZero False ] ]
                << size [ MName "population", MmType Quantitative ]
                << color [ MString "#000" ]

        sel =
            selection << select "view" Interval [ BindScales ]
    in
    toVegaLite
        [ des
        , width 500
        , height 300
        , dataFromUrl "data/gapminder-health-income.csv" []
        , mark Circle []
        , enc []
        , sel []
        ]


vl12 : Spec
vl12 =
    let
        des =
            description "Shows the relationship between horsepower and the number of cylinders using tick marks."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Cylinders", PmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Tick [], enc [] ]


vl13 : Spec
vl13 =
    let
        des =
            description "Google's stock price over time."

        trans =
            transform << filter (FExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y" ] ]
                << position Y [ PName "price", PmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], trans [], mark Line [], enc [] ]


vl14 : Spec
vl14 =
    let
        des =
            description "Stock prices of 5 tech companies over time."

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y" ] ]
                << position Y [ PName "price", PmType Quantitative ]
                << color [ MName "symbol", MmType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], mark Line [], enc [] ]


vl15 : Spec
vl15 =
    let
        des =
            description "Slope graph showing the change in yield for different barley sites. It shows the error in the year labels for the Morris site."

        enc =
            encoding
                << position X [ PName "year", PmType Ordinal, PScale [ SRangeStep (Just 50), SPadding 0.5 ] ]
                << position Y [ PName "yield", PmType Quantitative, PAggregate Median ]
                << color [ MName "site", MmType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], mark Line [], enc [] ]


vl16 : Spec
vl16 =
    let
        des =
            description "Google's stock price over time (quantized as a step-chart)."

        trans =
            transform << filter (FExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y" ] ]
                << position Y [ PName "price", PmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/stocks.csv" [], trans [], mark Line [ MInterpolate StepAfter ], enc [] ]


vl17 : Spec
vl17 =
    let
        des =
            description "Unemployment over time (area chart)"

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PTimeUnit YearMonth, PAxis [ Format "%Y" ] ]
                << position Y [ PName "count", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "Count" ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , mark Area []
        , enc []
        ]


vl18 : Spec
vl18 =
    let
        des =
            description "'Table heatmap' showing engine size/power for three countries."

        enc =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Origin", PmType Nominal ]
                << color [ MName "Horsepower", MmType Quantitative, MAggregate Mean ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Rect [], enc [] ]


vl19 : Spec
vl19 =
    let
        des =
            description "'Binned heatmap' comparing movie ratings."

        enc =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [ MaxBins 60 ] ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative, PBin [ MaxBins 40 ] ]
                << color [ MmType Quantitative, MAggregate Count ]

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
        , mark Rect []
        , enc []
        , config []
        ]


vl20 : Spec
vl20 =
    let
        des =
            description "Table bubble plot in the style of a Github punched card."

        enc =
            encoding
                << position X [ PName "time", PmType Ordinal, PTimeUnit Hours ]
                << position Y [ PName "time", PmType Ordinal, PTimeUnit Day ]
                << size [ MName "count", MmType Quantitative, MAggregate Sum ]
    in
    toVegaLite [ des, dataFromUrl "data/github.csv" [], mark Circle [], enc [] ]


vl21 : Spec
vl21 =
    let
        des =
            description "Seattle weather stacked bar chart"

        enc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month, PAxis [ AxTitle "Month of the year" ] ]
                << position Y [ PmType Quantitative, PAggregate Count ]
                << color
                    [ MName "weather"
                    , MmType Nominal
                    , MScale <|
                        categoricalDomainMap
                            [ ( "sun", "#e7ba52" )
                            , ( "fog", "#c7c7c7" )
                            , ( "drizzle", "#aec7ea" )
                            , ( "rain", "#1f77b4" )
                            , ( "snow", "#9467bd" )
                            ]
                    , MLegend [ LTitle "Weather type" ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], mark Bar [], enc [] ]


vl22 : Spec
vl22 =
    let
        des =
            description "Barley crop yields as a horizontal stacked bar chart"

        enc =
            encoding
                << position X [ PName "yield", PmType Quantitative, PAggregate Sum ]
                << position Y [ PName "variety", PmType Nominal ]
                << color [ MName "site", MmType Nominal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], mark Bar [], enc [] ]


vl23 : Spec
vl23 =
    let
        des =
            description "Population structure as a normalised stacked bar chart."

        trans =
            transform
                << filter (FExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ PName "age", PmType Ordinal, PScale [ SRangeStep (Just 17) ] ]
                << position Y [ PName "people", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "Population" ], PStack StNormalize ]
                << color [ MName "gender", MmType Nominal, MScale [ SRange (RStrings [ "#EA98D2", "#659CCA" ]) ] ]
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], mark Bar [], enc [] ]


vl24 : Spec
vl24 =
    let
        des =
            description "Unemployment across industries as a stacked area chart."

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PTimeUnit YearMonth, PAxis [ Format "%Y" ] ]
                << position Y [ PName "count", PmType Quantitative, PAggregate Sum ]
                << color [ MName "series", MmType Nominal, MScale [ SScheme "category20b" [] ] ]
    in
    toVegaLite [ des, dataFromUrl "data/unemployment-across-industries.json" [], mark Area [], enc [] ]


vl25 : Spec
vl25 =
    let
        des =
            description "Unemployment across industries as a normalised area chart."

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PTimeUnit YearMonth, PAxis [ Domain False, Format "%Y" ] ]
                << position Y [ PName "count", PmType Quantitative, PAggregate Sum, PAxis [], PStack StNormalize ]
                << color [ MName "series", MmType Nominal, MScale [ SScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , mark Area []
        , enc []
        ]


vl26 : Spec
vl26 =
    let
        des =
            description "Unemployment across industries as a streamgraph (centred, stacked area chart)."

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PTimeUnit YearMonth, PAxis [ Domain False, Format "%Y" ] ]
                << position Y [ PName "count", PmType Quantitative, PAggregate Sum, PAxis [], PStack StCenter ]
                << color [ MName "series", MmType Nominal, MScale [ SScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "data/unemployment-across-industries.json" []
        , mark Area []
        , enc []
        ]


vl27 : Spec
vl27 =
    let
        des =
            description "Layered bar chart showing the US population distribution of age groups and gender in 2000."

        trans =
            transform
                << filter (FExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ PName "age", PmType Ordinal, PScale [ SRangeStep (Just 17) ] ]
                << position Y [ PName "people", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "Population" ], PStack NoStack ]
                << color [ MName "gender", MmType Nominal, MScale [ SRange (RStrings [ "#e377c2", "#1f77b4" ]) ] ]
                << opacity [ MNumber 0.7 ]
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], mark Bar [], enc [] ]


vl28 : Spec
vl28 =
    let
        des =
            description "A diverging stacked bar chart for sentiments towards a set of eight questions, displayed as percentages with neutral responses straddling the 0% mark."

        data =
            dataFromColumns []
                << dataColumn "question" (Strings [ "Q1", "Q1", "Q1", "Q1", "Q1", "Q2", "Q2", "Q2", "Q2", "Q2", "Q3", "Q3", "Q3", "Q3", "Q3", "Q4", "Q4", "Q4", "Q4", "Q4", "Q5", "Q5", "Q5", "Q5", "Q5", "Q6", "Q6", "Q6", "Q6", "Q6", "Q7", "Q7", "Q7", "Q7", "Q7", "Q8", "Q8", "Q8", "Q8", "Q8" ])
                << dataColumn "type" (Strings [ "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree", "Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree" ])
                << dataColumn "value" (Numbers [ 24, 294, 594, 1927, 376, 2, 2, 0, 7, 11, 2, 0, 2, 4, 2, 0, 2, 1, 7, 6, 0, 1, 3, 16, 4, 1, 1, 2, 9, 3, 0, 0, 1, 4, 0, 0, 0, 0, 0, 2 ])
                << dataColumn "percentage" (Numbers [ 0.7, 9.1, 18.5, 59.9, 11.7, 18.2, 18.2, 0, 63.6, 0, 20, 0, 20, 40, 20, 0, 12.5, 6.3, 43.8, 37.5, 0, 4.2, 12.5, 66.7, 16.7, 6.3, 6.3, 12.5, 56.3, 18.8, 0, 0, 20, 80, 0, 0, 0, 0, 0, 100 ])
                << dataColumn "percentage_start" (Numbers [ -19.1, -18.4, -9.2, 9.2, 69.2, -36.4, -18.2, 0, 0, 63.6, -30, -10, -10, 10, 50, -15.6, -15.6, -3.1, 3.1, 46.9, -10.4, -10.4, -6.3, 6.3, 72.9, -18.8, -12.5, -6.3, 6.3, 62.5, -10, -10, -10, 10, 90, 0, 0, 0, 0, 0 ])
                << dataColumn "percentage_end" (Numbers [ -18.4, -9.2, 9.2, 69.2, 80.9, -18.2, 0, 0, 63.6, 63.6, -10, -10, 10, 50, 70, -15.6, -3.1, 3.1, 46.9, 84.4, -10.4, -6.3, 6.3, 72.9, 89.6, -12.5, -6.3, 6.3, 62.5, 81.3, -10, -10, 10, 90, 90, 0, 0, 0, 0, 100 ])

        enc =
            encoding
                << position X [ PName "percentage_start", PmType Quantitative, PAxis [ AxTitle "Percentage" ] ]
                << position X2 [ PName "percentage_end", PmType Quantitative ]
                << position Y [ PName "question", PmType Nominal, PAxis [ AxTitle "Question", Offset 5, Ticks False, MinExtent 60, Domain False ] ]
                << color
                    [ MName "type"
                    , MmType Nominal
                    , MLegend [ LTitle "Response" ]
                    , MScale <|
                        SType ScOrdinal
                            :: categoricalDomainMap
                                [ ( "Strongly disagree", "#c30d24" )
                                , ( "Disagree", "#f3a583" )
                                , ( "Neither agree nor disagree", "#cccccc" )
                                , ( "Agree", "#94c6da" )
                                , ( "Strongly agree", "#1770ab" )
                                ]
                    ]
    in
    toVegaLite [ des, data [], mark Bar [], enc [] ]


vl29 : Spec
vl29 =
    let
        des =
            description "Anscombe's Quartet"

        enc =
            encoding
                << position X [ PName "X", PmType Quantitative, PScale [ SZero False ] ]
                << position Y [ PName "Y", PmType Quantitative, PScale [ SZero False ] ]
                << opacity [ MNumber 1 ]
                << column [ FName "Series", FmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/anscombe.json" [], mark Circle [], enc [] ]


vl30 : Spec
vl30 =
    let
        des =
            description "A trellis bar chart showing the US population distribution of age groups and gender in 2000."

        trans =
            transform
                << filter (FExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << position X [ PName "age", PmType Ordinal, PScale [ SRangeStep (Just 17) ] ]
                << position Y [ PName "people", PmType Quantitative, PAggregate Sum, PAxis [ AxTitle "Population" ] ]
                << color [ MName "gender", MmType Nominal, MScale [ SRange (RStrings [ "#EA98D2", "#659CCA" ]) ] ]
                << row [ FName "gender", FmType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "data/population.json" []
        , trans []
        , mark Bar []
        , enc []
        ]


vl31 : Spec
vl31 =
    let
        des =
            description "Barley crop yields in 1931 and 1932 shown as stacked bar charts."

        enc =
            encoding
                << position X [ PName "yield", PmType Quantitative, PAggregate Sum ]
                << position Y [ PName "variety", PmType Nominal ]
                << color [ MName "site", MmType Nominal ]
                << column [ FName "year", FmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], mark Bar [], enc [] ]


vl32 : Spec
vl32 =
    let
        des =
            description "Scatterplots of movie takings vs profits for different MPAA ratings."

        enc =
            encoding
                << position X [ PName "Worldwide_Gross", PmType Quantitative ]
                << position Y [ PName "US_DVD_Sales", PmType Quantitative ]
                << column [ FName "MPAA_Rating", FmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], mark Point [], enc [] ]


vl33 : Spec
vl33 =
    let
        des =
            description "Disitributions of car engine power for different countries of origin."

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative, PBin [ MaxBins 15 ] ]
                << position Y [ PmType Quantitative, PAggregate Count ]
                << row [ FName "Origin", FmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Bar [], enc [] ]


vl34 : Spec
vl34 =
    let
        des =
            description "The Trellis display by Becker et al. helped establish small multiples as a “powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables”. Here we reproduce a trellis of Barley yields from the 1930s, complete with main-effects ordering to facilitate comparison."

        enc =
            encoding
                << position X [ PName "yield", PmType Quantitative, PAggregate Median, PScale [ SZero False ] ]
                << position Y [ PName "variety", PmType Ordinal, PSort [ ByField "Horsepower", Op Mean, Descending ], PScale [ SRangeStep (Just 12) ] ]
                << color [ MName "year", MmType Nominal ]
                << row [ FName "site", FmType Ordinal ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], mark Point [], enc [] ]


vl35 : Spec
vl35 =
    let
        des =
            description "Stock prices of four large companies as a small multiples of area charts."

        trans =
            transform << filter (FExpr "datum.symbol !== 'GOOG'")

        enc =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y", AxTitle "Time", Grid False ] ]
                << position Y [ PName "price", PmType Quantitative, PAxis [ AxTitle "Time", Grid False ] ]
                << color [ MName "symbol", MmType Nominal, MLegend [] ]
                << row [ FName "symbol", FmType Nominal, FHeader [ HTitle "Company" ] ]
    in
    toVegaLite [ des, width 300, height 40, dataFromUrl "data/stocks.csv" [], trans [], mark Area [], enc [] ]


vl36 : Spec
vl36 =
    let
        des =
            description "A simple bar chart with embedded data labels."

        data =
            dataFromColumns []
                << dataColumn "a" (Strings [ "A", "B", "C" ])
                << dataColumn "b" (Numbers [ 28, 55, 43 ])

        encBar =
            encoding
                << position X [ PName "b", PmType Quantitative ]
                << position Y [ PName "a", PmType Ordinal ]

        specBar =
            asSpec [ mark Bar [], encBar [] ]

        encText =
            encoding
                << position X [ PName "b", PmType Quantitative ]
                << position Y [ PName "a", PmType Ordinal ]
                << text [ TName "b", TmType Quantitative ]

        specText =
            asSpec [ mark Text [ MStyle [ "label" ] ], encText [] ]

        config =
            configure << configuration (NamedStyle "label" [ MAlign AlignLeft, MBaseline AlignMiddle, MdX 3 ])
    in
    toVegaLite [ des, data [], layer [ specBar, specText ], config [] ]


vl37 : Spec
vl37 =
    let
        des =
            description "Monthly precipitation with mean value overlay."

        encBar =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]

        specBar =
            asSpec [ mark Bar [], encBar [] ]

        encLine =
            encoding
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]
                << color [ MString "red" ]
                << size [ MNumber 3 ]

        specLine =
            asSpec [ mark Rule [], encLine [] ]
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], layer [ specBar, specLine ] ]


vl38 : Spec
vl38 =
    let
        des =
            description "Layering text over 'heatmap'."

        encRect =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Origin", PmType Ordinal ]
                << color [ MName "*", MmType Quantitative, MAggregate Count ]

        specRect =
            asSpec [ mark Rect [], encRect [] ]

        encText =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Origin", PmType Ordinal ]
                << color [ MString "white" ]
                << text [ TName "*", TmType Quantitative, TAggregate Count ]

        specText =
            asSpec [ mark Text [], encText [] ]

        config =
            configure
                << configuration (Scale [ SCBandPaddingInner 0, SCBandPaddingOuter 0 ])
                << configuration (TextStyle [ MBaseline AlignMiddle ])
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], layer [ specRect, specText ], config [] ]


vl39 : Spec
vl39 =
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

        encLWhisker =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "lowerWhisker", PmType Quantitative, PAxis [ AxTitle "Population" ] ]
                << position Y2 [ PName "lowerBox", PmType Quantitative ]

        specLWhisker =
            asSpec [ mark Rule [ MStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "upperBox", PmType Quantitative ]
                << position Y2 [ PName "upperWhisker", PmType Quantitative ]

        specUWhisker =
            asSpec [ mark Rule [ MStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "lowerBox", PmType Quantitative ]
                << position Y2 [ PName "upperBox", PmType Quantitative ]
                << size [ MNumber 5 ]

        specBox =
            asSpec [ mark Bar [ MStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "midBox", PmType Quantitative ]
                << color [ MString "white" ]
                << size [ MNumber 5 ]

        specBoxMid =
            asSpec [ mark Tick [ MStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], layer [ specLWhisker, specUWhisker, specBox, specBoxMid ] ]


vl40 : Spec
vl40 =
    let
        des =
            description "A Tukey box plot showing median and interquartile range in the US population distribution of age groups in 2000. This isn't strictly a Tukey box plot as the IQR extends beyond the min/max values for some age cohorts."

        trans =
            transform
                << aggregate [ opAs Q1 "people" "lowerBox", opAs Median "people" "midBox", opAs Q3 "people" "upperBox" ] [ "age" ]
                << calculateAs "datum.upperBox - datum.lowerBox" "IQR"
                << calculateAs "datum.upperBox + datum.IQR * 1.5" "upperWhisker"
                << calculateAs "max(0,datum.lowerBox - datum.IQR *1.5)" "lowerWhisker"

        encLWhisker =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "lowerWhisker", PmType Quantitative, PAxis [ AxTitle "Population" ] ]
                << position Y2 [ PName "lowerBox", PmType Quantitative ]

        specLWhisker =
            asSpec [ mark Rule [ MStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "upperBox", PmType Quantitative ]
                << position Y2 [ PName "upperWhisker", PmType Quantitative ]

        specUWhisker =
            asSpec
                [ mark Rule [ MStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "lowerBox", PmType Quantitative ]
                << position Y2 [ PName "upperBox", PmType Quantitative ]
                << size [ MNumber 5 ]

        specBox =
            asSpec [ mark Bar [ MStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position X [ PName "age", PmType Ordinal ]
                << position Y [ PName "midBox", PmType Quantitative ]
                << color [ MString "white" ]
                << size [ MNumber 5 ]

        specBoxMid =
            asSpec
                [ mark Tick [ MStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite [ des, dataFromUrl "data/population.json" [], trans [], layer [ specLWhisker, specUWhisker, specBox, specBoxMid ] ]


vl41 : Spec
vl41 =
    let
        des =
            description "A candlestick chart inspired by Protovis (http://mbostock.github.io/protovis/ex/candlestick.html)"

        data =
            dataFromColumns []
                << dataColumn "date" (Strings [ "01-Jun-2009", "02-Jun-2009", "03-Jun-2009", "04-Jun-2009", "05-Jun-2009", "08-Jun-2009", "09-Jun-2009", "10-Jun-2009", "11-Jun-2009", "12-Jun-2009", "15-Jun-2009", "16-Jun-2009", "17-Jun-2009", "18-Jun-2009", "19-Jun-2009", "22-Jun-2009", "23-Jun-2009", "24-Jun-2009", "25-Jun-2009", "26-Jun-2009", "29-Jun-2009", "30-Jun-2009" ])
                << dataColumn "open" (Numbers [ 28.7, 30.04, 29.62, 31.02, 29.39, 30.84, 29.77, 26.9, 27.36, 28.08, 29.7, 30.81, 31.19, 31.54, 29.16, 30.4, 31.3, 30.58, 29.45, 27.09, 25.93, 25.36 ])
                << dataColumn "high" (Numbers [ 30.05, 30.13, 31.79, 31.02, 30.81, 31.82, 29.77, 29.74, 28.11, 28.5, 31.09, 32.75, 32.77, 31.54, 29.32, 32.05, 31.54, 30.58, 29.56, 27.22, 27.18, 27.38 ])
                << dataColumn "low" (Numbers [ 28.45, 28.3, 29.62, 29.92, 28.85, 26.41, 27.79, 26.9, 26.81, 27.73, 29.64, 30.07, 30.64, 29.6, 27.56, 30.3, 27.83, 28.79, 26.3, 25.76, 25.29, 25.02 ])
                << dataColumn "close" (Numbers [ 30.04, 29.63, 31.02, 30.18, 29.62, 29.77, 28.27, 28.46, 28.11, 28.15, 30.81, 32.68, 31.54, 30.03, 27.99, 31.17, 30.58, 29.05, 26.36, 25.93, 25.35, 26.35 ])
                << dataColumn "signal" (Strings [ "short", "short", "short", "short", "short", "short", "short", "short", "short", "short", "long", "short", "short", "short", "short", "short", "short", "long", "long", "long", "long", "long" ])
                << dataColumn "ret" (Numbers [ -4.89396411092985, -0.322580645161295, 3.68663594470045, 4.51010886469673, 6.08424336973478, 1.2539184952978, -5.02431118314424, -5.46623794212217, -8.3743842364532, -5.52763819095477, 3.4920634920635, 0.155038759689914, 5.82822085889571, 8.17610062893082, 8.59872611464968, 15.4907975460123, 11.7370892018779, -10.4234527687296, 0, 0, 5.26315789473684, 6.73758865248228 ])

        trans =
            transform << calculateAs "datum.open > datum.close" "isIncrease"

        encLine =
            encoding
                << position X
                    [ PName "date"
                    , PmType Temporal
                    , PTimeUnit YearMonthDate
                    , PScale [ SDomain (DDateTimes [ [ DTMonth May, DTDate 31, DTYear 2009 ], [ DTMonth Jul, DTDate 1, DTYear 2009 ] ]) ]
                    , PAxis [ AxTitle "Date in 2009", Format "%m/%d" ]
                    ]
                << position Y [ PName "low", PmType Quantitative, PScale [ SZero False ] ]
                << position Y2 [ PName "high", PmType Quantitative ]
                << color [ MName "isIncrease", MmType Nominal, MLegend [], MScale [ SRange (RStrings [ "#ae1325", "#06982d" ]) ] ]

        specLine =
            asSpec [ mark Rule [], encLine [] ]

        encBar =
            encoding
                << position X [ PName "date", PmType Temporal, PTimeUnit YearMonthDate ]
                << position Y [ PName "open", PmType Quantitative ]
                << position Y2 [ PName "close", PmType Quantitative ]
                << size [ MNumber 5 ]
                << color [ MName "isIncrease", MmType Nominal, MLegend [] ]

        specBar =
            asSpec [ mark Bar [], encBar [] ]
    in
    toVegaLite [ des, width 320, data [], trans [], layer [ specLine, specBar ] ]


vl42 : Spec
vl42 =
    let
        des =
            description "Error bars showing confidence intervals"

        encPoints =
            encoding
                << position X [ PName "yield", PmType Quantitative, PAggregate Mean, PScale [ SZero False ], PAxis [ AxTitle "Barley Yield" ] ]
                << position Y [ PName "variety", PmType Ordinal ]
                << color [ MString "black" ]

        specPoints =
            asSpec [ mark Point [ MFilled True ], encPoints [] ]

        encCIs =
            encoding
                << position X [ PName "yield", PmType Quantitative, PAggregate CI0 ]
                << position X2 [ PName "yield", PmType Quantitative, PAggregate CI1 ]
                << position Y [ PName "variety", PmType Ordinal ]

        specCIs =
            asSpec [ mark Rule [], encCIs [] ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], layer [ specPoints, specCIs ] ]


vl43 : Spec
vl43 =
    let
        des =
            description "Error bars showing standard deviation."

        trans =
            transform
                << aggregate [ opAs Mean "yield" "mean", opAs Stdev "yield" "stdev" ] [ "variety" ]
                << calculateAs "datum.mean-datum.stdev" "lower"
                << calculateAs "datum.mean+datum.stdev" "upper"

        encMeans =
            encoding
                << position X [ PName "mean", PmType Quantitative, PScale [ SZero False ], PAxis [ AxTitle "Barley Yield" ] ]
                << position Y [ PName "variety", PmType Ordinal ]
                << color [ MString "black" ]

        specMeans =
            asSpec [ mark Point [ MFilled True ], encMeans [] ]

        encStdevs =
            encoding
                << position X [ PName "upper", PmType Quantitative ]
                << position X2 [ PName "lower", PmType Quantitative ]
                << position Y [ PName "variety", PmType Ordinal ]

        specStdevs =
            asSpec [ mark Rule [], encStdevs [] ]
    in
    toVegaLite [ des, dataFromUrl "data/barley.json" [], trans [], layer [ specMeans, specStdevs ] ]


vl44 : Spec
vl44 =
    let
        des =
            description "Histogram with global mean overlay."

        encBars =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [], PAxis [] ]
                << position Y [ PmType Quantitative, PAggregate Count ]

        specBars =
            asSpec [ mark Bar [], encBars [] ]

        encMean =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PAggregate Mean ]
                << color [ MString "red" ]
                << size [ MNumber 5 ]

        specMean =
            asSpec [ mark Rule [], encMean [] ]
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], layer [ specBars, specMean ] ]


vl45 : Spec
vl45 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars with a global mean and standard deviation overlay."

        encPoints =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]

        specPoints =
            asSpec [ mark Point [], encPoints [] ]

        trans =
            transform
                << aggregate [ opAs Mean "Miles_per_Gallon" "mean_MPG", opAs Stdev "Miles_per_Gallon" "dev_MPG" ] []
                << calculateAs "datum.mean_MPG+datum.dev_MPG" "upper"
                << calculateAs "datum.mean_MPG-datum.dev_MPG" "lower"

        encMean =
            encoding << position Y [ PName "mean_MPG", PmType Quantitative ]

        specMean =
            asSpec [ mark Rule [], encMean [] ]

        encRect =
            encoding
                << position Y [ PName "lower", PmType Quantitative ]
                << position Y2 [ PName "upper", PmType Quantitative ]
                << opacity [ MNumber 0.2 ]

        specRect =
            asSpec [ mark Rect [], encRect [] ]

        specSpread =
            asSpec [ trans [], layer [ specMean, specRect ] ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], layer [ specPoints, specSpread ] ]


vl46 : Spec
vl46 =
    let
        des =
            description "Line chart with confidence interval band."

        encBand =
            encoding
                << position X [ PName "Year", PmType Temporal, PTimeUnit Year ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative, PAggregate CI0, PAxis [ AxTitle "Miles/Gallon" ] ]
                << position Y2 [ PName "Miles_per_Gallon", PmType Quantitative, PAggregate CI1 ]
                << opacity [ MNumber 0.3 ]

        specBand =
            asSpec [ mark Area [], encBand [] ]

        encLine =
            encoding
                << position X [ PName "Year", PmType Temporal, PTimeUnit Year ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative, PAggregate Mean ]

        specLine =
            asSpec [ mark Line [], encLine [] ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], layer [ specBand, specLine ] ]


vl47 : Spec
vl47 =
    let
        des =
            description "The population of the German city of Falkensee over time with annotated time periods highlighted."

        data =
            dataFromColumns [ Parse [ ( "year", FoDate "%Y" ) ] ]
                << dataColumn "year" (Strings [ "1875", "1890", "1910", "1925", "1933", "1939", "1946", "1950", "1964", "1971", "1981", "1985", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014" ])
                << dataColumn "population" (Numbers [ 1309, 1558, 4512, 8180, 15915, 24824, 28275, 29189, 29881, 26007, 24029, 23340, 22307, 22087, 22139, 22105, 22242, 22801, 24273, 25640, 27393, 29505, 32124, 33791, 35297, 36179, 36829, 37493, 38376, 39008, 39366, 39821, 40179, 40511, 40465, 40905, 41258, 41777 ])

        highlights =
            dataFromColumns [ Parse [ ( "start", FoDate "%Y" ), ( "end", FoDate "%Y" ) ] ]
                << dataColumn "start" (Strings [ "1933", "1948" ])
                << dataColumn "end" (Strings [ "1945", "1989" ])
                << dataColumn "event" (Strings [ "Nazi Rule", "GDR (East Germany)" ])

        encRects =
            encoding
                << position X [ PName "start", PmType Temporal, PTimeUnit Year, PAxis [] ]
                << position X2 [ PName "end", PmType Temporal, PTimeUnit Year ]
                << color [ MName "event", MmType Nominal ]

        specRects =
            asSpec [ highlights [], mark Rect [], encRects [] ]

        encPopulation =
            encoding
                << position X [ PName "year", PmType Temporal, PTimeUnit Year, PAxis [ AxTitle "" ] ]
                << position Y [ PName "population", PmType Quantitative ]
                << color [ MString "#333" ]

        specLine =
            asSpec [ mark Line [], encPopulation [] ]

        specPoints =
            asSpec [ mark Point [], encPopulation [] ]
    in
    toVegaLite [ des, width 500, data [], layer [ specRects, specLine, specPoints ] ]


vl48 : Spec
vl48 =
    let
        des =
            description "A ranged dot plot that uses 'layer' to convey changing life expectancy for the five most populous countries (between 1955 and 2000)."

        trans =
            transform
                << filter (FOneOf "country" (Strings [ "China", "India", "United States", "Indonesia", "Brazil" ]))
                << filter (FOneOf "year" (Numbers [ 1955, 2000 ]))

        encLine =
            encoding
                << position X [ PName "life_expect", PmType Quantitative ]
                << position Y [ PName "country", PmType Nominal ]
                << detail [ DName "country", DmType Nominal ]
                << color [ MString "#db646f" ]

        specLine =
            asSpec [ mark Line [], encLine [] ]

        encPoints =
            encoding
                << position X [ PName "life_expect", PmType Quantitative, PAxis [ AxTitle "Life Expectanct (years)" ] ]
                << position Y [ PName "country", PmType Nominal, PAxis [ AxTitle "Country", Offset 5, Ticks False, MinExtent 70, Domain False ] ]
                << color [ MName "year", MmType Ordinal, MScale (domainRangeMap ( 1955, "#e6959c" ) ( 2000, "#911a24" )), MLegend [ LTitle "Year" ] ]
                << size [ MNumber 100 ]
                << opacity [ MNumber 1 ]

        specPoints =
            asSpec [ mark Point [ MFilled True ], encPoints [] ]
    in
    toVegaLite [ des, dataFromUrl "data/countries.json" [], trans [], layer [ specLine, specPoints ] ]


vl49 : Spec
vl49 =
    let
        des =
            description "Layered bar/line chart with dual axes."

        encBar =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean, PAxis [ Grid False ] ]

        specBar =
            asSpec [ mark Bar [], encBar [] ]

        encLine =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "temp_max", PmType Quantitative, PAggregate Mean, PAxis [ Grid False ], PScale [ SZero False ] ]
                << color [ MString "firebrick" ]

        specLine =
            asSpec [ mark Line [], encLine [] ]

        res =
            resolve
                << resolution (RScale [ ( ChY, Independent ) ])
    in
    toVegaLite [ des, dataFromUrl "data/seattle-weather.csv" [], layer [ specBar, specLine ], res [] ]


vl50 : Spec
vl50 =
    let
        des =
            description "Horizon chart with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on horizon charts.)"

        data =
            dataFromColumns []
                << dataColumn "x" (Numbers (List.map toFloat <| List.range 1 20))
                << dataColumn "y" (Numbers [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        trans =
            transform << calculateAs "datum.y - 50" "ny"

        encLower =
            encoding
                << position X [ PName "x", PmType Quantitative, PScale [ SZero False, SNice (IsNice False) ] ]
                << position Y [ PName "y", PmType Quantitative, PScale [ SDomain (DNumbers [ 0, 50 ]) ] ]
                << opacity [ MNumber 0.6 ]

        specLower =
            asSpec [ mark Area [ MClip True ], encLower [] ]

        encUpper =
            encoding
                << position X [ PName "x", PmType Quantitative ]
                << position Y [ PName "ny", PmType Quantitative, PScale [ SDomain (DNumbers [ 0, 50 ]) ], PAxis [ AxTitle "y" ] ]
                << opacity [ MNumber 0.3 ]

        specUpper =
            asSpec [ trans [], mark Area [ MClip True ], encUpper [] ]

        config =
            configure
                << configuration (AreaStyle [ MInterpolate Monotone, MOrient Vertical ])
    in
    toVegaLite [ des, width 300, height 50, data [], layer [ specLower, specUpper ], config [] ]


vl51 : Spec
vl51 =
    let
        des =
            description "Connected scatterplot showing change over time."

        enc =
            encoding
                << position X [ PName "miles", PmType Quantitative, PScale [ SZero False ] ]
                << position Y [ PName "gas", PmType Quantitative, PScale [ SZero False ] ]
                << order [ OName "year", OmType Temporal ]

        specLine =
            asSpec [ enc [], mark Line [] ]

        specPoint =
            asSpec [ enc [], mark Point [ MFilled True ] ]
    in
    toVegaLite [ des, dataFromUrl "data/driving.json" [], layer [ specLine, specPoint ] ]


vl52 : Spec
vl52 =
    let
        des =
            description "Monthly weather information for individual years and overall average for Seatle and New York."

        enc1 =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PRepeat Column, PmType Quantitative, PAggregate Mean ]
                << detail [ DName "date", DmType Temporal, DTimeUnit Year ]
                << color [ MName "location", MmType Nominal ]
                << opacity [ MNumber 0.2 ]

        spec1 =
            asSpec [ mark Line [], enc1 [] ]

        enc2 =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PRepeat Column, PmType Quantitative, PAggregate Mean ]
                << color [ MName "location", MmType Nominal ]

        spec2 =
            asSpec [ mark Line [], enc2 [] ]

        spec =
            asSpec [ des, layer [ spec1, spec2 ] ]
    in
    toVegaLite
        [ dataFromUrl "data/weather.csv" [ Parse [ ( "date", FoDate "%Y-%m-%d %H:%M" ) ] ]
        , repeat [ ColumnFields [ "temp_max", "precipitation", "wind" ] ]
        , specification spec
        ]


vl53 : Spec
vl53 =
    let
        des =
            description "Drag out a rectangular brush to highlight points."

        sel =
            selection << select "myBrush" Interval []

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color
                    [ MCondition "myBrush"
                        [ MName "Cylinders", MmType Ordinal ]
                        [ MString "grey" ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Point [], sel [], enc [] ]


vl54 : Spec
vl54 =
    let
        des =
            description "Mouse over individual points or select multiple points with the shift key."

        sel =
            selection << select "myPaintbrush" Multi [ On "mouseover", Nearest True ]

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << size
                    [ MCondition "myPaintbrush"
                        [ MNumber 300 ]
                        [ MNumber 50 ]
                    ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Point [], sel [], enc [] ]


vl55 : Spec
vl55 =
    let
        des =
            description "Drag to pan. Zoom in or out with mousewheel/zoom gesture."

        sel =
            selection << select "myGrid" Interval [ BindScales ]

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative, PScale [ SDomain (DNumbers [ 75, 150 ]) ] ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative, PScale [ SDomain (DNumbers [ 20, 40 ]) ] ]
                << size [ MName "Cylinders", MmType Quantitative ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], mark Circle [], sel [], enc [] ]


vl56 : Spec
vl56 =
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
                        [ IRange "Cylinders" [ InMin 3, InMax 8, InStep 1 ]
                        , IRange "Year" [ InMin 1969, InMax 1981, InStep 1 ]
                        ]
                    ]

        enc1 =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color
                    [ MCondition "CylYr"
                        [ MName "Origin", MmType Nominal ]
                        [ MString "grey" ]
                    ]

        spec1 =
            asSpec [ sel1 [], mark Circle [], enc1 [] ]

        trans2 =
            transform
                << filter (FSelection "CylYr")

        enc2 =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal ]
                << size [ MNumber 100 ]

        spec2 =
            asSpec [ trans2 [], mark Circle [], enc2 [] ]
    in
    toVegaLite [ des, dataFromUrl "data/cars.json" [], trans [], layer [ spec1, spec2 ] ]


vl57 : Spec
vl57 =
    let
        des =
            description "Drag over bars to update selection average."

        sel =
            selection << select "myBrush" Interval [ Encodings [ ChX ] ]

        enc1 =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]
                << opacity
                    [ MCondition "myBrush"
                        [ MNumber 1 ]
                        [ MNumber 0.7 ]
                    ]

        spec1 =
            asSpec [ sel [], mark Bar [], enc1 [] ]

        trans =
            transform
                << filter (FSelection "myBrush")

        enc2 =
            encoding
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]
                << color [ MString "firebrick" ]
                << size [ MNumber 3 ]

        spec2 =
            asSpec [ des, trans [], mark Rule [], enc2 [] ]
    in
    toVegaLite [ dataFromUrl "data/seattle-weather.csv" [], layer [ spec1, spec2 ] ]


vl58 : Spec
vl58 =
    let
        des =
            description "Drag over lower chart to update detailed view in upper chart."

        sel =
            selection << select "myBrush" Interval [ Encodings [ ChX ] ]

        enc1 =
            encoding
                << position X [ PName "date", PmType Temporal, PScale [ SDomain (DSelection "myBrush") ], PAxis [ AxTitle "" ] ]
                << position Y [ PName "price", PmType Quantitative ]

        spec1 =
            asSpec [ width 500, mark Area [], enc1 [] ]

        enc2 =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y" ] ]
                << position Y [ PName "price", PmType Quantitative, PAxis [ TickCount 3, Grid False ] ]

        spec2 =
            asSpec [ width 480, height 60, sel [], mark Area [], enc2 [] ]
    in
    toVegaLite [ des, dataFromUrl "data/sp500.csv" [], vConcat [ spec1, spec2 ] ]


vl59 : Spec
vl59 =
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
                << filter (FSelection "myBrush")

        enc1 =
            encoding
                << position X [ PRepeat Column, PmType Quantitative, PBin [ MaxBins 20 ] ]
                << position Y [ PAggregate Count, PmType Quantitative ]

        spec1 =
            asSpec [ sel [], mark Bar [], enc1 [] ]

        enc2 =
            encoding
                << position X [ PRepeat Column, PmType Quantitative, PBin [ MaxBins 20 ] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MString "goldenrod" ]

        spec2 =
            asSpec [ selTrans [], mark Bar [], enc2 [] ]

        spec =
            asSpec
                [ des
                , dataFromUrl "data/flights-2k.json" [ Parse [ ( "date", FoDate "" ) ] ]
                , trans []
                , layer [ spec1, spec2 ]
                ]
    in
    toVegaLite
        [ repeat [ ColumnFields [ "distance", "delay", "time" ] ]
        , specification spec
        ]


vl60 : Spec
vl60 =
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
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PRepeat Row, PmType Quantitative ]
                << color
                    [ MCondition "myBrush"
                        [ MName "Origin", MmType Nominal ]
                        [ MString "grey" ]
                    ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], mark Point [], sel [], enc [] ]
    in
    toVegaLite
        [ des
        , repeat [ RowFields [ "Horsepower", "Acceleration", "Miles_per_Gallon" ], ColumnFields [ "Miles_per_Gallon", "Acceleration", "Horsepower" ] ]
        , specification spec
        ]


vl61 : Spec
vl61 =
    let
        des =
            description "A dashboard with cross-highlighting. Select bars in lower chart to update view in upper chart."

        selTrans =
            transform
                << filter (FSelection "myPts")

        enc1 =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << color [ MAggregate Count, MmType Quantitative, MLegend [ LTitle "" ] ]

        spec1 =
            asSpec [ width 300, mark Rect [], enc1 [] ]

        enc2 =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative, PBin [ MaxBins 10 ] ]
                << size [ MAggregate Count, MmType Quantitative, MLegend [ LTitle "In Selected Category" ] ]
                << color [ MString "#666" ]

        spec2 =
            asSpec [ selTrans [], mark Point [], enc2 [] ]

        heatSpec =
            asSpec [ layer [ spec1, spec2 ] ]

        sel =
            selection << select "myPts" Single [ Encodings [ ChX ] ]

        barSpec =
            asSpec [ width 420, height 120, mark Bar [], sel [], encBar [] ]

        encBar =
            encoding
                << position X [ PName "Major_Genre", PmType Nominal, PAxis [ LabelAngle -40 ] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color
                    [ MCondition "myPts"
                        [ MString "steelblue" ]
                        [ MString "grey" ]
                    ]

        config =
            configure
                << configuration (Range [ RHeatmap "greenblue" ])

        res =
            resolve
                << resolution (RLegend [ ( ChColor, Independent ), ( ChSize, Independent ) ])
    in
    toVegaLite [ des, dataFromUrl "data/movies.json" [], vConcat [ heatSpec, barSpec ], res [], config [] ]


vlRepeatExample : Spec
vlRepeatExample =
    let
        enc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative, PBin [] ]
                << position Y [ PmType Quantitative, PAggregate Count ]
                << color [ MName "Origin", MmType Nominal ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], mark Bar [], enc [] ]
    in
    toVegaLite
        [ repeat [ ColumnFields [ "Horsepower", "Miles_per_Gallon", "Acceleration" ] ]
        , specification spec
        ]


vlFacetExample : Spec
vlFacetExample =
    let
        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative, PBin [ MaxBins 15 ] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal, MLegend [] ]

        spec =
            asSpec [ mark Bar [], enc [] ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , facet [ RowBy [ FName "Origin", FmType Nominal ] ]
        , specification spec
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


specs : List Spec
specs =
    [ vl1, vl2, vl3, vl4, vl5, vl6, vl7, vl8, vl9, vl10, vl11, vl12, vl13, vl14, vl15, vl16, vl17, vl18, vl19, vl20, vl21, vl22, vl23, vl24, vl25, vl26, vl27, vl28, vl29, vl30, vl31, vl32, vl33, vl34, vl35, vl36, vl37, vl38, vl39, vl40, vl41, vl42, vl43, vl44, vl45, vl46, vl47, vl48, vl49, vl50, vl51, vl52, vl53, vl54, vl55, vl56, vl57, vl58, vl59, vl60, vl61, vlFacetExample, vlRepeatExample ]



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never (List Spec) Msg
main =
    Platform.program
        { init = init specs
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : List Spec -> ( List Spec, Cmd msg )
init specs =
    ( specs, fromElm <| Json.Encode.list specs )


port fromElm : Spec -> Cmd msg
