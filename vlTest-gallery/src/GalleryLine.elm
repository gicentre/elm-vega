port module GalleryLine exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


line1 : Spec
line1 =
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
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trans []
        , line []
        , enc []
        ]


line2 : Spec
line2 =
    let
        des =
            description "Google's stock price over time with point markers."

        trans =
            transform << filter (fiExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trans []
        , line [ maColor "green", maPoint (pmMarker [ maColor "purple" ]) ]
        , enc []
        ]


line3 : Spec
line3 =
    let
        des =
            description "Stock prices of 5 tech companies over time."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
                << color [ mName "symbol", mMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , line []
        , enc []
        ]


line4 : Spec
line4 =
    let
        des =
            description "Slope graph showing the change in yield for different barley sites. It shows the error in the year labels for the Morris site."

        enc =
            encoding
                << position X [ pName "year", pMType Ordinal, pScale [ scRangeStep (Just 50), scPadding 0.5 ] ]
                << position Y [ pName "yield", pMType Quantitative, pAggregate Median ]
                << color [ mName "site", mMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/barley.json" []
        , line []
        , enc []
        ]


line5 : Spec
line5 =
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
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trans []
        , line [ maInterpolate StepAfter ]
        , enc []
        ]


line6 : Spec
line6 =
    let
        des =
            description "Google's stock price over time (smoothed with monotonic interpolation)."

        trans =
            transform << filter (fiExpr "datum.symbol === 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trans []
        , line [ maInterpolate Monotone ]
        , enc []
        ]


line7 : Spec
line7 =
    let
        des =
            description "A connected scatterplot can be created by customizing line order and adding point marker in the line mark definition."

        enc =
            encoding
                << position X [ pName "miles", pMType Quantitative, pScale [ scZero False ] ]
                << position Y [ pName "gas", pMType Quantitative, pScale [ scZero False ] ]
                << order [ oName "year", oMType Temporal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/driving.json" []
        , enc []
        , line [ maPoint (pmMarker []) ]
        ]


line8 : Spec
line8 =
    let
        des =
            description "Stock prices of five tech companies over time double encoding price with vertical position and line thickness."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "price", pMType Quantitative ]
                << size [ mName "price", mMType Quantitative ]
                << color [ mName "symbol", mMType Nominal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trail []
        , enc []
        ]


line9 : Spec
line9 =
    let
        des =
            description "Line chart with markers and invalid values."

        data =
            dataFromColumns []
                << dataColumn "x" (nums [ 1, 2, 3, 4, 5, 6, 7 ])
                << dataColumn "y" (nums [ 10, 30, 0 / 0, 15, 0 / 0, 40, 20 ])

        enc =
            encoding
                << position X [ pName "x", pMType Quantitative ]
                << position Y [ pName "y", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , data []
        , line [ maPoint (pmMarker []) ]
        , enc []
        ]


line10 : Spec
line10 =
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


line11 : Spec
line11 =
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
                << window [ ( [ wiOp Rank ], "rank" ) ]
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



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "line1", line1 )
        , ( "line2", line2 )
        , ( "line3", line3 )
        , ( "line4", line4 )
        , ( "line5", line5 )
        , ( "line6", line6 )
        , ( "line7", line7 )
        , ( "line8", line8 )
        , ( "line9", line9 )
        , ( "line10", line10 )
        , ( "line11", line11 )
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
