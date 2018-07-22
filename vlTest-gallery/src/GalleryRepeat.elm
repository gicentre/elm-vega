port module GalleryRepeat exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


repeat1 : Spec
repeat1 =
    let
        des =
            description "Monthly weather information for individual years and overall average for Seatle and New York"

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
        , dataFromUrl "https://vega.github.io/vega-lite/data/weather.csv" []
        , repeat [ columnFields [ "temp_max", "precipitation", "wind" ] ]
        , specification spec
        ]


repeat2 : Spec
repeat2 =
    let
        desc =
            description "Two vertically concatenated charts that show a histogram of precipitation in Seattle and the relationship between min and max temperature"

        trans =
            transform
                << filter (fiExpr "datum.location === 'Seattle'")

        enc1 =
            encoding
                << position X [ pName "date", pTimeUnit Month, pMType Ordinal ]
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        spec1 =
            asSpec [ bar [], enc1 [] ]

        enc2 =
            encoding
                << position X [ pName "temp_min", pMType Quantitative, pBin [] ]
                << position Y [ pName "temp_max", pMType Quantitative, pBin [] ]
                << size [ mAggregate Count, mMType Quantitative ]

        spec2 =
            asSpec [ point [], enc2 [] ]
    in
    toVegaLite
        [ desc
        , trans []
        , dataFromUrl "https://vega.github.io/vega-lite/data/weather.csv" []
        , vConcat [ spec1, spec2 ]
        ]


repeat3 : Spec
repeat3 =
    let
        des =
            description "Horizontally repeated charts that show the histograms of different parameters of cars in different countries"

        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative, pBin [] ]
                << position Y [ pMType Quantitative, pAggregate Count ]
                << color [ mName "Origin", mMType Nominal ]

        spec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
                , bar []
                , enc []
                ]
    in
    toVegaLite
        [ des
        , repeat [ columnFields [ "Horsepower", "Miles_per_Gallon", "Acceleration" ] ]
        , specification spec
        ]


repeat4 : Spec
repeat4 =
    let
        des =
            description "Scatterplot matrix"

        sel =
            selection
                << select "myBrush"
                    Interval
                    [ seOn "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!"
                    , seTranslate "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!"
                    , seZoom "wheel![event.shiftKey]"
                    , seResolve Union
                    ]
                << select ""
                    Interval
                    [ BindScales
                    , seTranslate "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!"
                    , seZoom "wheel![event.shiftKey]"
                    , seResolve Global
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
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
                , point []
                , sel []
                , enc []
                ]
    in
    toVegaLite
        [ des
        , repeat
            [ rowFields [ "Horsepower", "Acceleration", "Miles_per_Gallon" ]
            , columnFields [ "Miles_per_Gallon", "Acceleration", "Horsepower" ]
            ]
        , specification spec
        ]


repeat5 : Spec
repeat5 =
    let
        des =
            description "Marginal histograms show the counts along the x and y dimension"

        encPosition =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]

        config =
            configure
                << configuration (coRange [ racoHeatmap "greenblue" ])
                << configuration (coView [ vicoStroke Nothing ])

        enc1 =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pAxis [], pBin [] ]
                << position Y
                    [ pAggregate Count
                    , pMType Quantitative
                    , pScale [ scDomain (doNums [ 0, 1000 ]) ]
                    , pAxis [ axTitle "" ]
                    ]

        spec1 =
            asSpec [ height 60, bar [], enc1 [] ]

        spec2 =
            asSpec [ spacing 15, bounds Flush, hConcat [ spec2_1, spec2_2 ] ]

        enc2_1 =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [] ]
                << color [ mAggregate Count, mMType Quantitative ]

        spec2_1 =
            asSpec [ rect [], enc2_1 [] ]

        enc2_2 =
            encoding
                << position Y
                    [ pName "Rotten_Tomatoes_Rating"
                    , pMType Quantitative
                    , pBin []
                    , pAxis []
                    ]
                << position X
                    [ pAggregate Count
                    , pMType Quantitative
                    , pScale [ scDomain (doNums [ 0, 1000 ]) ]
                    , pAxis [ axTitle "" ]
                    ]

        spec2_2 =
            asSpec [ width 60, bar [], enc2_2 [] ]
    in
    toVegaLite
        [ des
        , spacing 15
        , bounds Flush
        , config []
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , vConcat [ spec1, spec2 ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "repeat1", repeat1 )
        , ( "repeat2", repeat2 )
        , ( "repeat3", repeat3 )
        , ( "repeat4", repeat4 )
        , ( "repeat5", repeat5 )
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
