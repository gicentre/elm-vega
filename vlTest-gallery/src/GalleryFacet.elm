port module GalleryFacet exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


facet1 : Spec
facet1 =
    let
        des =
            description "A trellis bar chart showing the US population distribution of age groups and gender in 2000"

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
        , dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []
        , trans []
        , bar []
        , enc []
        ]


facet2 : Spec
facet2 =
    let
        des =
            description "Barley crop yields in 1931 and 1932 shown as stacked bar charts"

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Sum ]
                << position Y [ pName "variety", pMType Nominal ]
                << color [ mName "site", mMType Nominal ]
                << column [ fName "year", fMType Ordinal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/barley.json" []
        , bar []
        , enc []
        ]


facet3 : Spec
facet3 =
    let
        des =
            description "Scatterplots of movie takings vs profits for different MPAA ratings"

        enc =
            encoding
                << position X [ pName "Worldwide_Gross", pMType Quantitative ]
                << position Y [ pName "US_DVD_Sales", pMType Quantitative ]
                << column [ fName "MPAA_Rating", fMType Ordinal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , point []
        , enc []
        ]


facet4 : Spec
facet4 =
    let
        des =
            description "Disitributions of car engine power for different countries of origin"

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative, pBin [ biMaxBins 15 ] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << row [ fName "Origin", fMType Ordinal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , bar []
        , enc []
        ]


facet5 : Spec
facet5 =
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
    toVegaLite [ des, dataFromUrl "https://vega.github.io/vega-lite/data/anscombe.json" [], circle [], enc [] ]


facet6 : Spec
facet6 =
    let
        des =
            description "The Trellis display by Becker et al. helped establish small multiples as a 'powerful mechanism for understanding interactions in studies of how a response depends on explanatory variables'"

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pAggregate Median, pScale [ scZero False ] ]
                << position Y [ pName "variety", pMType Ordinal, pSort [ soByField "Horsepower" Mean, Descending ], pScale [ scRangeStep (Just 12) ] ]
                << color [ mName "year", mMType Nominal ]
                << row [ fName "site", fMType Ordinal ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/barley.json" []
        , point []
        , enc []
        ]


facet7 : Spec
facet7 =
    let
        des =
            description "Stock prices of four large companies as a small multiples of area charts"

        trans =
            transform << filter (fiExpr "datum.symbol !== 'GOOG'")

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y", axTitle "Time", axGrid False ] ]
                << position Y [ pName "price", pMType Quantitative, pAxis [ axTitle "Time", axGrid False ] ]
                << color [ mName "symbol", mMType Nominal, mLegend [] ]
                << row [ fName "symbol", fMType Nominal, fHeader [ hdTitle "Company" ] ]
    in
    toVegaLite
        [ des
        , width 300
        , height 40
        , dataFromUrl "https://vega.github.io/vega-lite/data/stocks.csv" []
        , trans []
        , area []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "facet1", facet1 )
        , ( "facet2", facet2 )
        , ( "facet3", facet3 )
        , ( "facet4", facet4 )
        , ( "facet5", facet5 )
        , ( "facet6", facet6 )
        , ( "facet7", facet7 )
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
