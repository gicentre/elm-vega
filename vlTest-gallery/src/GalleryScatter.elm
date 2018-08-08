port module GalleryScatter exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


scatter1 : Spec
scatter1 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via point marks)."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , point [ maTooltip TTData ]
        , enc []
        ]


scatter2 : Spec
scatter2 =
    let
        des =
            description "Shows the distribution of a single variable (precipitation) using tick marks."

        enc =
            encoding
                << position X [ pName "precipitation", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , tick []
        , enc []
        ]


scatter3 : Spec
scatter3 =
    let
        des =
            description "Shows the relationship between horsepower and the number of cylinders using tick marks."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Cylinders", pMType Ordinal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , tick []
        , enc []
        ]


scatter4 : Spec
scatter4 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon with country of origin double encoded by colour and shape."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]
                << shape [ mName "Origin", mMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , point []
        , enc []
        ]


scatter5 : Spec
scatter5 =
    let
        des =
            description "A binned scatterplot comparing IMDB and Rotten Tomatoes rating with marks sized by number of reviews."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << size [ mAggregate Count, mMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , circle []
        , enc []
        ]


scatter6 : Spec
scatter6 =
    let
        des =
            description "A bubbleplot showing horsepower on x, miles per gallons on y, and acceleration on size."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << size [ mName "Acceleration", mMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , point []
        , enc []
        ]


scatter7 : Spec
scatter7 =
    let
        des =
            description "Scatterplot with Null values in grey"

        config =
            configure
                << configuration (coRemoveInvalid False)

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative ]
                << color
                    [ mDataCondition
                        [ ( expr "datum.IMDB_Rating === null || datum.Rotten_Tomatoes_Rating === null"
                          , [ mStr "#ddd" ]
                          )
                        ]
                        [ mStr "rgb(76,120,168)" ]
                    ]
    in
    toVegaLite
        [ des
        , config []
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , point []
        , enc []
        ]


scatter8 : Spec
scatter8 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon for various cars (via circle marks)."

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , circle []
        , enc []
        ]


scatter9 : Spec
scatter9 =
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
        , dataFromUrl "https://vega.github.io/vega-lite/data/gapminder-health-income.csv" []
        , circle []
        , enc []
        , sel []
        ]


scatter10 : Spec
scatter10 =
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
        , circle [ maOpacity 0.8, maStroke "black", maStrokeWidth 1 ]
        , enc []
        ]


scatter11 : Spec
scatter11 =
    let
        des =
            description "A scatterplot showing horsepower and miles per gallon with country of origin double encoded by colour and text symbol."

        trans =
            transform
                << calculateAs "datum.Origin[0]" "OriginInitial"

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]
                << text [ tName "OriginInitial", tMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , trans []
        , textMark []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "scatter1", scatter1 )
        , ( "scatter2", scatter2 )
        , ( "scatter3", scatter3 )
        , ( "scatter4", scatter4 )
        , ( "scatter5", scatter5 )
        , ( "scatter6", scatter6 )
        , ( "scatter7", scatter7 )
        , ( "scatter8", scatter8 )
        , ( "scatter9", scatter9 )
        , ( "scatter10", scatter10 )
        , ( "scatter11", scatter11 )
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
