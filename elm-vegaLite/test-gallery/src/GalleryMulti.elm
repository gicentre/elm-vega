port module GalleryMulti exposing (elmToJS)

import Platform
import VegaLite exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


multi1 : Spec
multi1 =
    let
        des =
            description "Overview and detail."

        sel =
            selection << select "myBrush" Interval [ seEncodings [ chX ] ]

        enc1 =
            encoding
                << position X
                    [ pName "date"
                    , pMType Temporal
                    , pScale [ scDomain (doSelection "myBrush") ]
                    , pAxis [ axTitle "" ]
                    ]
                << position Y [ pName "price", pMType Quantitative ]

        spec1 =
            asSpec [ width 500, area [], enc1 [] ]

        enc2 =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y
                    [ pName "price"
                    , pMType Quantitative
                    , pAxis [ axTickCount 3, axGrid False ]
                    ]

        spec2 =
            asSpec [ width 480, height 60, sel [], area [], enc2 [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/sp500.csv" []
        , vConcat [ spec1, spec2 ]
        ]


multi2 : Spec
multi2 =
    let
        des =
            description "Cross-filter."

        trans =
            transform
                << calculateAs "hours(datum.date)" "time"

        sel =
            selection << select "myBrush" Interval [ seEncodings [ chX ] ]

        selTrans =
            transform
                << filter (fiSelection "myBrush")

        encPosition =
            encoding
                << position X
                    [ pRepeat Column
                    , pMType Quantitative
                    , pBin [ biMaxBins 20 ]
                    ]
                << position Y [ pAggregate opCount, pMType Quantitative ]

        spec1 =
            asSpec [ sel [], bar [] ]

        spec2 =
            asSpec [ selTrans [], bar [], encoding (color [ mStr "goldenrod" ] []) ]

        spec =
            asSpec
                [ des
                , dataFromUrl "https://vega.github.io/vega-lite/data/flights-2k.json" [ parse [ ( "date", foDate "" ) ] ]
                , trans []
                , encPosition []
                , layer [ spec1, spec2 ]
                ]
    in
    toVegaLite
        [ repeat [ columnFields [ "distance", "delay", "time" ] ]
        , specification spec
        ]


multi3 : Spec
multi3 =
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
                    [ seBindScales
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


multi4 : Spec
multi4 =
    let
        des =
            description "A dashboard with cross-highlighting"

        selTrans =
            transform
                << filter (fiSelection "myPts")

        encPosition =
            encoding
                << position X [ pName "IMDB_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]
                << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative, pBin [ biMaxBins 10 ] ]

        enc1 =
            encoding
                << color [ mAggregate opCount, mMType Quantitative, mLegend [ leTitle "" ] ]

        spec1 =
            asSpec [ width 300, rect [], enc1 [] ]

        enc2 =
            encoding
                << size [ mAggregate opCount, mMType Quantitative, mLegend [ leTitle "In Selected Category" ] ]
                << color [ mStr "#666" ]

        spec2 =
            asSpec [ selTrans [], point [], enc2 [] ]

        heatSpec =
            asSpec [ encPosition [], layer [ spec1, spec2 ] ]

        sel =
            selection << select "myPts" Single [ seEncodings [ chX ] ]

        barSpec =
            asSpec [ width 420, height 120, bar [], sel [], encBar [] ]

        encBar =
            encoding
                << position X [ pName "Major_Genre", pMType Nominal, pAxis [ axLabelAngle -40 ] ]
                << position Y [ pAggregate opCount, pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "myPts")
                        [ mStr "steelblue" ]
                        [ mStr "grey" ]
                    ]

        config =
            configure << configuration (coRange [ racoHeatmap "greenblue" ])

        res =
            resolve
                << resolution (reLegend [ ( chColor, Independent ), ( chSize, Independent ) ])
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/movies.json" []
        , vConcat [ heatSpec, barSpec ]
        , res []
        , config []
        ]


multi5 : Spec
multi5 =
    let
        des =
            description "A dashboard with cross-highlighting"

        spec1 =
            asSpec
                [ width 600, height 300, point [], sel1 [], trans1 [], enc1 [] ]

        sel1 =
            selection << select "myBrush" Interval [ seEncodings [ chX ] ]

        trans1 =
            transform << filter (fiSelection "myClick")

        weatherColors =
            categoricalDomainMap
                [ ( "sun", "#e7ba52" )
                , ( "fog", "#c7c7c7" )
                , ( "drizzle", "#aec7ea" )
                , ( "rain", "#1f77b4" )
                , ( "snow", "#9467bd" )
                ]

        enc1 =
            encoding
                << position X
                    [ pName "date"
                    , pMType Temporal
                    , pTimeUnit monthDate
                    , pAxis [ axTitle "Date", axFormat "%b" ]
                    ]
                << position Y
                    [ pName "temp_max"
                    , pMType Quantitative
                    , pScale [ scDomain (doNums [ -5, 40 ]) ]
                    , pAxis [ axTitle "Maximum Daily Temperature (C)" ]
                    ]
                << color
                    [ mSelectionCondition (selectionName "myBrush")
                        [ mName "weather"
                        , mTitle "Weather"
                        , mMType Nominal
                        , mScale weatherColors
                        ]
                        [ mStr "#cfdebe" ]
                    ]
                << size
                    [ mName "precipitation"
                    , mMType Quantitative
                    , mScale [ scDomain (doNums [ -1, 50 ]) ]
                    ]

        spec2 =
            asSpec [ width 600, bar [], sel2 [], trans2 [], enc2 [] ]

        sel2 =
            selection << select "myClick" Multi [ seEncodings [ chColor ] ]

        trans2 =
            transform << filter (fiSelection "myBrush")

        enc2 =
            encoding
                << position X [ pAggregate opCount, pMType Quantitative ]
                << position Y [ pName "weather", pMType Nominal ]
                << color
                    [ mSelectionCondition (selectionName "myClick")
                        [ mName "weather"
                        , mMType Nominal
                        , mScale weatherColors
                        ]
                        [ mStr "#acbf98" ]
                    ]
    in
    toVegaLite
        [ title "Seattle Weather, 2012-2015"
        , des
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , vConcat [ spec1, spec2 ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "multi1", multi1 )
        , ( "multi2", multi2 )
        , ( "multi3", multi3 )
        , ( "multi4", multi4 )
        , ( "multi5", multi5 )
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
