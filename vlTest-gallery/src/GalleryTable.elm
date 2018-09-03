port module GalleryTable exposing (elmToJS)

import Platform
import VegaLite exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


table1 : Spec
table1 =
    let
        des =
            description "'Table heatmap' showing engine size/power for three countries."

        enc =
            encoding
                << position X [ pName "Cylinders", pMType Ordinal ]
                << position Y [ pName "Origin", pMType Nominal ]
                << color [ mName "Horsepower", mMType Quantitative, mAggregate opMean ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , rect []
        , enc []
        ]


table2 : Spec
table2 =
    let
        des =
            description "Annual weather 'heatmap'"

        conf =
            configure
                << configuration (coView [ vicoStrokeWidth 0 ])
                << configuration (coScale [ sacoRangeStep (Just 13) ])
                << configuration (coAxis [ axcoDomain False ])

        enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit date, pAxis [ axTitle "Day", axLabelAngle 0, axFormat "%e" ] ]
                << position Y [ pName "date", pMType Ordinal, pTimeUnit month, pAxis [ axTitle "Month" ] ]
                << color [ mName "temp", mMType Quantitative, mAggregate opMax, mLegend [ leTitle "" ] ]
    in
    toVegaLite
        [ des
        , conf []
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-temps.csv" []
        , rect []
        , enc []
        ]


table3 : Spec
table3 =
    let
        des =
            description "'Binned heatmap' comparing movie ratings."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 60 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 40 ] ]
                << color [ mMType Quantitative, mAggregate opCount ]

        config =
            configure
                << configuration (coRange [ racoHeatmap "greenblue" ])
                << configuration (coView [ vicoStroke Nothing ])
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , rect []
        , enc []
        , config []
        ]


table4 : Spec
table4 =
    let
        des =
            description "Table bubble plot in the style of a Github punched card."

        enc =
            encoding
                << position X [ pName "time", pMType Ordinal, pTimeUnit hours ]
                << position Y [ pName "time", pMType Ordinal, pTimeUnit day ]
                << size [ mName "count", mMType Quantitative, mAggregate opSum ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/github.csv" []
        , circle []
        , enc []
        ]


table5 : Spec
table5 =
    let
        des =
            description "Layering text over 'heatmap'."

        encPosition =
            encoding
                << position X [ pName "Cylinders", pMType Ordinal ]
                << position Y [ pName "Origin", pMType Ordinal ]

        encRect =
            encoding
                << color [ mName "*", mMType Quantitative, mAggregate opCount ]

        specRect =
            asSpec [ rect [], encRect [] ]

        encText =
            encoding
                << color [ mStr "white" ]
                << text [ tName "*", tMType Quantitative, tAggregate opCount ]

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



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "table1", table1 )
        , ( "table2", table2 )
        , ( "table3", table3 )
        , ( "table4", table4 )
        , ( "table5", table5 )
        ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
