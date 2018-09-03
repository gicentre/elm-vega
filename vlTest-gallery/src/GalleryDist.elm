port module GalleryDist exposing (elmToJS)

import Platform
import VegaLite exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


dist1 : Spec
dist1 =
    let
        des =
            description "Simple histogram of IMDB ratings."

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [] ]
                << position Y [ pMType Quantitative, pAggregate opCount ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , bar [ maBinSpacing 0 ]
        , enc []
        ]


dist2 : Spec
dist2 =
    let
        des =
            description "Cumulative frequency distribution"

        trans =
            transform
                << window [ ( [ wiAggregateOp opCount, wiField "count" ], "cumulativeCount" ) ]
                    [ wiSort [ wiAscending "IMDB_Rating" ], wiFrame Nothing (Just 0) ]

        enc =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative ]
                << position Y [ pName "cumulativeCount", pMType Quantitative ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , trans []
        , area []
        , enc []
        ]


dist3 : Spec
dist3 =
    let
        des =
            description "A layered histogram and cumulative histogram."

        trans =
            transform
                << binAs [] "IMDB_Rating" "bin_IMDB_Rating"
                << aggregate
                    [ opAs opCount "" "count" ]
                    [ "bin_IMDB_Rating", "bin_IMDB_Rating_end" ]
                << filter (fiExpr "datum.bin_IMDB_Rating !== null")
                << window [ ( [ wiAggregateOp opSum, wiField "count" ], "cumulativeCount" ) ]
                    [ wiSort [ wiAscending "bin_IMDB_Rating" ], wiFrame Nothing (Just 0) ]

        enc =
            encoding
                << position X
                    [ pName "bin_IMDB_Rating"
                    , pMType Quantitative
                    , pScale [ scZero False ]
                    , pAxis [ axTitle "IMDB rating" ]
                    ]
                << position X2 [ pName "bin_IMDB_Rating_end", pMType Quantitative ]

        cdEnc =
            encoding
                << position Y [ pName "cumulativeCount", pMType Quantitative ]

        specCumulative =
            asSpec [ cdEnc [], bar [] ]

        dEnc =
            encoding
                << position Y [ pName "count", pMType Quantitative ]

        specDist =
            asSpec [ dEnc [], bar [ maColor "yellow", maOpacity 0.5 ] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , trans []
        , layer [ specCumulative, specDist ]
        , enc []
        ]


dist4 : Spec
dist4 =
    let
        des =
            description "A vertical 2D box plot showing median, min, and max in the US population distribution of age groups in 2000."

        trans =
            transform
                << aggregate
                    [ opAs opMin "people" "lowerWhisker"
                    , opAs opQ1 "people" "lowerBox"
                    , opAs opMedian "people" "midBox"
                    , opAs opQ3 "people" "upperBox"
                    , opAs opMax "people" "upperWhisker"
                    ]
                    [ "age" ]

        encAge =
            encoding << position X [ pName "age", pMType Ordinal ]

        encLWhisker =
            encoding
                << position Y [ pName "lowerWhisker", pMType Quantitative, pAxis [ axTitle "Population" ] ]
                << position Y2 [ pName "lowerBox", pMType Quantitative ]

        specLWhisker =
            asSpec [ rule [ maStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position Y [ pName "upperBox", pMType Quantitative ]
                << position Y2 [ pName "upperWhisker", pMType Quantitative ]

        specUWhisker =
            asSpec [ rule [ maStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position Y [ pName "lowerBox", pMType Quantitative ]
                << position Y2 [ pName "upperBox", pMType Quantitative ]
                << size [ mNum 5 ]

        specBox =
            asSpec [ bar [ maStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position Y [ pName "midBox", pMType Quantitative ]
                << color [ mStr "white" ]
                << size [ mNum 5 ]

        specBoxMid =
            asSpec [ tick [ maStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , trans []
        , encAge []
        , layer [ specLWhisker, specUWhisker, specBox, specBoxMid ]
        ]


dist5 : Spec
dist5 =
    let
        des =
            description "A Tukey box plot showing median and interquartile range in the US population distribution of age groups in 2000. This isn't strictly a Tukey box plot as the IQR extends beyond the min/max values for some age cohorts."

        trans =
            transform
                << aggregate
                    [ opAs opQ1 "people" "lowerBox"
                    , opAs opQ3 "people" "upperBox"
                    , opAs opMedian "people" "midBox"
                    ]
                    [ "age" ]
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
            asSpec [ rule [ maStyle [ "boxWhisker" ] ], encLWhisker [] ]

        encUWhisker =
            encoding
                << position Y [ pName "upperBox", pMType Quantitative ]
                << position Y2 [ pName "upperWhisker", pMType Quantitative ]

        specUWhisker =
            asSpec
                [ rule [ maStyle [ "boxWhisker" ] ], encUWhisker [] ]

        encBox =
            encoding
                << position Y [ pName "lowerBox", pMType Quantitative ]
                << position Y2 [ pName "upperBox", pMType Quantitative ]
                << size [ mNum 5 ]

        specBox =
            asSpec [ bar [ maStyle [ "box" ] ], encBox [] ]

        encBoxMid =
            encoding
                << position Y [ pName "midBox", pMType Quantitative ]
                << color [ mStr "white" ]
                << size [ mNum 5 ]

        specBoxMid =
            asSpec
                [ tick [ maStyle [ "boxMid" ] ], encBoxMid [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , trans []
        , encAge []
        , layer [ specLWhisker, specUWhisker, specBox, specBoxMid ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "dist1", dist1 )
        , ( "dist2", dist2 )
        , ( "dist3", dist3 )
        , ( "dist4", dist4 )
        , ( "dist5", dist5 )
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
