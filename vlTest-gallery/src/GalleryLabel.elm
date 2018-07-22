port module GalleryLabel exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


label1 : Spec
label1 =
    let
        des =
            description "A simple bar chart with embedded data labels"

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


label2 : Spec
label2 =
    let
        des =
            description "Layering text over 'heatmap'"

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
                << configuration (coScale [ sacoBandPaddingInner 0, sacoBandPaddingOuter 0 ])
                << configuration (coText [ maBaseline AlignMiddle ])
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , encPosition []
        , layer [ specRect, specText ]
        , config []
        ]


label3 : Spec
label3 =
    let
        des =
            description "Carbon dioxide in the atmosphere."

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
            asSpec [ line [ maOrient Vertical ], encLine [] ]

        transTextMin =
            transform
                << aggregate [ opAs ArgMin "scaled_date" "aggregated" ] [ "decade" ]
                << calculateAs "datum.aggregated.scaled_date" "scaled_date"
                << calculateAs "datum.aggregated.CO2" "CO2"

        encTextMin =
            encoding
                << text [ tName "aggregated.year", tMType Nominal ]

        specTextMin =
            asSpec [ transTextMin [], textMark [ maAlign AlignLeft, maBaseline AlignTop, maDx 3, maDy 1 ], encTextMin [] ]

        transTextMax =
            transform
                << aggregate [ opAs ArgMax "scaled_date" "aggregated" ] [ "decade" ]
                << calculateAs "datum.aggregated.scaled_date" "scaled_date"
                << calculateAs "datum.aggregated.CO2" "CO2"

        encTextMax =
            encoding
                << text [ tName "aggregated.year", tMType Nominal ]

        specTextMax =
            asSpec [ transTextMax [], textMark [ maAlign AlignLeft, maBaseline AlignBottom, maDx 3, maDy 1 ], encTextMax [] ]

        config =
            configure << configuration (coView [ vicoStroke Nothing ])
    in
    toVegaLite
        [ des
        , config []
        , width 800
        , height 500
        , dataFromUrl "https://vega.github.io/vega-lite/data/co2-concentration.csv" [ parse [ ( "Date", foUtc "%Y-%m-%d" ) ] ]
        , trans []
        , encPosition []
        , layer [ specLine, specTextMin, specTextMax ]
        ]


label4 : Spec
label4 =
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
            asSpec [ textMark [ maAlign AlignRight, maDx -2, maDy -4 ], encText [] ]

        encText =
            encoding
                << position X [ pWidth ]
                << position Y [ pName "ThresholdValue", pMType Quantitative, pAxis [ axTitle "PM2.5 Value" ] ]
                << text [ tName "Threshold", tMType Ordinal ]

        layer1 =
            asSpec [ thresholdData [], layer [ specRule, specText ] ]
    in
    toVegaLite [ des, layer [ layer0, layer1 ] ]


label5 : Spec
label5 =
    let
        des =
            description "Monthly precipitation with mean value overlay"

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
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , layer [ specBar, specLine ]
        ]


label6 : Spec
label6 =
    let
        des =
            description "Histogram with global mean overlay"

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
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , layer [ specBars, specMean ]
        ]


label7 : Spec
label7 =
    let
        des =
            description "The population of the German city of Falkensee over time with annotated time periods highlighted"

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



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "label1", label1 )
        , ( "label2", label2 )
        , ( "label3", label3 )
        , ( "label4", label4 )
        , ( "label5", label5 )
        , ( "label6", label6 )
        , ( "label7", label7 )
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
