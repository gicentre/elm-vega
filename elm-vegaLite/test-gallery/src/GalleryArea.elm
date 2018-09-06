port module GalleryArea exposing (elmToJS)

import Platform
import VegaLite exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


area1 : Spec
area1 =
    let
        des =
            description "Unemployment over time (area chart)"

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit yearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate opSum, pAxis [ axTitle "Count" ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "https://vega.github.io/vega-lite/data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


area2 : Spec
area2 =
    let
        des =
            description "Area chart with overlaid lines and point markers"

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
        , area [ maPoint (pmMarker []), maLine (lmMarker []) ]
        , enc []
        ]


area3 : Spec
area3 =
    let
        des =
            description "Unemployment across industries as a stacked area chart."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit yearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate opSum ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


area4 : Spec
area4 =
    let
        des =
            description "Unemployment across industries as a normalised area chart."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit yearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate opSum, pAxis [], pStack StNormalize ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "https://vega.github.io/vega-lite/data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


area5 : Spec
area5 =
    let
        des =
            description "Unemployment across industries as a streamgraph (centred, stacked area chart)."

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit yearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate opSum, pAxis [], pStack StCenter ]
                << color [ mName "series", mMType Nominal, mScale [ scScheme "category20b" [] ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 200
        , dataFromUrl "https://vega.github.io/vega-lite/data/unemployment-across-industries.json" []
        , area []
        , enc []
        ]


area6 : Spec
area6 =
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
            encoding << position X [ pName "x", pMType Quantitative, pScale [ scZero False, scNice niFalse ] ]

        encLower =
            encoding
                << position Y [ pName "y", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ] ]
                << opacity [ mNum 0.6 ]

        specLower =
            asSpec [ area [ maClip True ], encLower [] ]

        encUpper =
            encoding
                << position Y [ pName "ny", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ], pAxis [ axTitle "y" ] ]
                << opacity [ mNum 0.3 ]

        specUpper =
            asSpec [ trans [], area [ maClip True ], encUpper [] ]

        config =
            configure
                << configuration (coArea [ maInterpolate Monotone, maOrient Vertical ])
    in
    toVegaLite [ des, width 300, height 50, data [], encX [], layer [ specLower, specUpper ], config [] ]


area7 : Spec
area7 =
    let
        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        trans =
            transform
                << aggregate [ opAs opCount "" "count_*" ] [ "Origin", "Cylinders" ]
                << stack "count_*"
                    []
                    "stack_count_Origin1"
                    "stack_count_Origin2"
                    [ stOffset StNormalize, stSort [ stAscending "Origin" ] ]
                << window
                    [ ( [ wiAggregateOp opMin, wiField "stack_count_Origin1" ], "x" )
                    , ( [ wiAggregateOp opMax, wiField "stack_count_Origin2" ], "x2" )
                    , ( [ wiOp woDenseRank ], "rank_Cylinders" )
                    , ( [ wiAggregateOp opDistinct, wiField "Cylinders" ], "distinct_Cylinders" )
                    ]
                    [ wiFrame Nothing Nothing, wiGroupBy [ "Origin" ], wiSort [ wiAscending "Cylinders" ] ]
                << window
                    [ ( [ wiOp woDenseRank ], "rank_Origin" ) ]
                    [ wiFrame Nothing Nothing, wiSort [ wiAscending "Origin" ] ]
                << stack "count_*"
                    [ "Origin" ]
                    "y"
                    "y2"
                    [ stOffset StNormalize, stSort [ stAscending "Cylinders" ] ]
                << calculateAs "datum.y + (datum.rank_Cylinders - 1) * datum.distinct_Cylinders * 0.01 / 3" "ny"
                << calculateAs "datum.y2 + (datum.rank_Cylinders - 1) * datum.distinct_Cylinders * 0.01 / 3" "ny2"
                << calculateAs "datum.x + (datum.rank_Origin - 1) * 0.01" "nx"
                << calculateAs "datum.x2 + (datum.rank_Origin - 1) * 0.01" "nx2"
                << calculateAs "(datum.nx+datum.nx2)/2" "xc"
                << calculateAs "(datum.ny+datum.ny2)/2" "yc"

        enc1 =
            encoding
                << position X
                    [ pName "xc"
                    , pMType Quantitative
                    , pAggregate opMin
                    , pTitle "Origin"
                    , pAxis [ axOrient STop ]
                    ]
                << color [ mName "Origin", mMType Nominal, mLegend [] ]
                << text [ tName "Origin", tMType Nominal ]

        spec1 =
            asSpec [ textMark [ maBaseline vaMiddle, maAlign haCenter ], enc1 [] ]

        enc2 =
            encoding
                << position X [ pName "nx", pMType Quantitative, pAxis [] ]
                << position X2 [ pName "nx2", pMType Quantitative ]
                << position Y [ pName "ny", pMType Quantitative, pAxis [] ]
                << position Y2 [ pName "ny2", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal, mLegend [] ]
                << opacity [ mName "Cylinders", mMType Quantitative, mLegend [] ]
                << tooltips
                    [ [ tName "Origin", tMType Nominal ]
                    , [ tName "Cylinders", tMType Quantitative ]
                    ]

        spec2 =
            asSpec [ rect [], enc2 [] ]

        enc3 =
            encoding
                << position X [ pName "xc", pMType Quantitative, pAxis [] ]
                << position Y [ pName "yc", pMType Quantitative, pAxis [ axTitle "Cylinders" ] ]
                << text [ tName "Cylinders", tMType Nominal ]

        spec3 =
            asSpec [ textMark [ maBaseline AlignMiddle ], enc3 [] ]

        config =
            configure
                << configuration (coView [ vicoStroke Nothing ])
                << configuration (coAxis [ axcoDomain False, axcoTicks False, axcoLabels False, axcoGrid False ])

        res =
            resolve
                << resolution (reScale [ ( chX, Shared ) ])
    in
    toVegaLite
        [ config []
        , res []
        , cars
        , trans []
        , vConcat [ spec1, asSpec [ layer [ spec2, spec3 ] ] ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "area1", area1 )
        , ( "area2", area2 )
        , ( "area3", area3 )
        , ( "area4", area4 )
        , ( "area5", area5 )
        , ( "area6", area6 )
        , ( "area7", area7 )
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
