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
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [ axTitle "Count" ] ]
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
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum ]
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
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [], pStack StNormalize ]
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
                << position X [ pName "date", pMType Temporal, pTimeUnit YearMonth, pAxis [ axDomain False, axFormat "%Y" ] ]
                << position Y [ pName "count", pMType Quantitative, pAggregate Sum, pAxis [], pStack StCenter ]
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
            encoding << position X [ pName "x", pMType Quantitative, pScale [ scZero False, scNice NFalse ] ]

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
