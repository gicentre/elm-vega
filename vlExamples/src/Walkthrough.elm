port module Walkthrough exposing (elmToJS)

import Platform
import VegaLite exposing (..)


stripPlot : Spec
stripPlot =
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , tick []
        , encoding (position X [ pName "temp_max", pMType Quantitative ] [])
        ]


histogram : Spec
histogram =
    let
        enc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


stackedHistogram : Spec
stackedHistogram =
    let
        enc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "weather", mMType Nominal ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


weatherColors : List ScaleProperty
weatherColors =
    categoricalDomainMap
        [ ( "sun", "#e7ba52" )
        , ( "fog", "#c7c7c7" )
        , ( "drizzle", "#aec7ea" )
        , ( "rain", "#1f77b4" )
        , ( "snow", "#9467bd" )
        ]


stackedHistogram2 : Spec
stackedHistogram2 =
    let
        enc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "weather", mMType Nominal, mScale weatherColors ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


lineChart : Spec
lineChart =
    let
        enc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "weather", mMType Nominal, mScale weatherColors ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , line []
        , enc []
        ]


multiBar : Spec
multiBar =
    let
        enc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "weather", mMType Nominal, mLegend [], mScale weatherColors ]
                << column [ fName "weather", fMType Nominal ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


barChart : Spec
barChart =
    let
        enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , bar []
        , enc []
        ]


barChartWithAverage : Spec
barChartWithAverage =
    let
        precipEnc =
            encoding << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        barEnc =
            encoding << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , precipEnc []
        , layer [ asSpec [ bar [], barEnc [] ], asSpec [ rule [] ] ]
        ]


barChartPair : Spec
barChartPair =
    let
        bar1Enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        bar2Enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pName "temp_max", pMType Quantitative, pAggregate Mean ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , vConcat [ asSpec [ bar [], bar1Enc [] ], asSpec [ bar [], bar2Enc [] ] ]
        ]


barChartTriplet : Spec
barChartTriplet =
    let
        enc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pRepeat Row, pMType Quantitative, pAggregate Mean ]

        spec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
                , bar []
                , enc []
                ]
    in
    toVegaLite
        [ repeat [ rowFields [ "precipitation", "temp_max", "wind" ] ]
        , specification spec
        ]


splom : Spec
splom =
    let
        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pRepeat Row, pMType Quantitative ]

        spec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
                , point []
                , enc []
                ]
    in
    toVegaLite
        [ repeat
            [ rowFields [ "temp_max", "precipitation", "wind" ]
            , columnFields [ "wind", "precipitation", "temp_max" ]
            ]
        , specification spec
        ]


dashboard1 : Spec
dashboard1 =
    let
        histoEnc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]

        histoSpec =
            asSpec [ title "Frequency histogram", bar [], histoEnc [] ]

        scatterEnc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative ]
                << position Y [ pName "precipitation", pMType Quantitative ]

        scatterSpec =
            asSpec [ title "Scatterplot", point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean ]

        barSpec =
            asSpec [ title "Bar chart", bar [], barEnc [] ]

        annotationEnc =
            encoding
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate Mean, pScale [ scDomain (doNums [ 0, 5.5 ]) ] ]

        annotationSpec =
            asSpec [ title "Annotation", width 200, rule [], annotationEnc [] ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , hConcat [ histoSpec, scatterSpec, barSpec, annotationSpec ]
        ]


dashboard2 : Spec
dashboard2 =
    let
        histoEnc =
            encoding
                << position X [ pName "temp_max", pMType Quantitative, pBin [] ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mName "weather", mMType Nominal, mLegend [], mScale weatherColors ]
                << column [ fName "weather", fMType Nominal ]

        histoSpec =
            asSpec [ bar [], histoEnc [] ]

        scatterEnc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pRepeat Row, pMType Quantitative ]

        scatterSpec =
            asSpec [ point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ pName "date", pMType Ordinal, pTimeUnit Month ]
                << position Y [ pRepeat Row, pMType Quantitative, pAggregate Mean ]

        annotationEnc =
            encoding
                << position Y [ pRepeat Row, pMType Quantitative, pAggregate Mean ]

        layerSpec =
            asSpec
                [ layer
                    [ asSpec [ bar [], barEnc [] ]
                    , asSpec [ rule [], annotationEnc [] ]
                    ]
                ]

        barsSpec =
            asSpec
                [ repeat [ rowFields [ "precipitation", "temp_max", "wind" ] ]
                , specification layerSpec
                ]

        splomSpec =
            asSpec
                [ repeat
                    [ rowFields [ "temp_max", "precipitation", "wind" ]
                    , columnFields [ "wind", "precipitation", "temp_max" ]
                    ]
                , specification scatterSpec
                ]
    in
    toVegaLite
        [ --  dataFromUrl "https://vega.github.io/vega-lite/data/newYork-weather.csv" []
          dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , vConcat
            [ asSpec [ hConcat [ splomSpec, barsSpec ] ]
            , histoSpec
            ]
        ]


scatterProps : List ( VLProperty, Spec )
scatterProps =
    let
        trans =
            -- This rounds the year-month-day format to just year for later selection.
            transform
                << calculateAs "year(datum.Year)" "Year"

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "picked")
                        [ mName "Origin", mMType Nominal ]
                        [ mStr "grey" ]
                    ]
    in
    [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
    , trans []
    , circle []
    , enc []
    ]


interactiveScatter1 : Spec
interactiveScatter1 =
    let
        sel =
            selection
                << select "picked" Single []
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter2 : Spec
interactiveScatter2 =
    let
        sel =
            selection
                << select "picked" Multi []
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter3 : Spec
interactiveScatter3 =
    let
        sel =
            selection
                << select "picked" Multi [ seOn "mouseover" ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter4 : Spec
interactiveScatter4 =
    let
        sel =
            selection
                << select "picked" Single [ Empty, seFields [ "Cylinders" ] ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter5 : Spec
interactiveScatter5 =
    let
        sel =
            selection
                << select "picked"
                    Single
                    [ seFields [ "Cylinders" ]
                    , seBind [ iRange "Cylinders" [ inMin 3, inMax 8, inStep 1 ] ]
                    ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter6 : Spec
interactiveScatter6 =
    let
        sel =
            selection
                << select "picked"
                    Single
                    [ seFields [ "Cylinders", "Year" ]
                    , seBind
                        [ iRange "Cylinders" [ inMin 3, inMax 8, inStep 1 ]
                        , iRange "Year" [ inMin 1969, inMax 1981, inStep 1 ]
                        ]
                    ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter7 : Spec
interactiveScatter7 =
    let
        sel =
            selection
                << select "picked" Interval []
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter8 : Spec
interactiveScatter8 =
    let
        sel =
            selection
                << select "picked" Interval [ seEncodings [ ChX ] ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter9 : Spec
interactiveScatter9 =
    let
        sel =
            selection
                << select "picked" Interval [ seEncodings [ ChX ], BindScales ]
    in
    toVegaLite <| sel [] :: scatterProps


coordinatedScatter1 : Spec
coordinatedScatter1 =
    let
        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pRepeat Row, pMType Quantitative ]
                << color
                    [ mSelectionCondition (selectionName "picked")
                        [ mName "Origin", mMType Nominal ]
                        [ mStr "grey" ]
                    ]

        sel =
            selection
                << select "picked" Interval [ seEncodings [ ChX ] ]

        spec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
                , circle []
                , enc []
                , sel []
                ]
    in
    toVegaLite
        [ repeat
            [ rowFields [ "Displacement", "Miles_per_Gallon" ]
            , columnFields [ "Horsepower", "Miles_per_Gallon" ]
            ]
        , specification spec
        ]


coordinatedScatter2 : Spec
coordinatedScatter2 =
    let
        enc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pRepeat Row, pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]

        sel =
            selection
                << select "picked" Interval [ BindScales ]

        spec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
                , circle []
                , enc []
                , sel []
                ]
    in
    toVegaLite
        [ repeat
            [ rowFields [ "Displacement", "Miles_per_Gallon" ]
            , columnFields [ "Horsepower", "Miles_per_Gallon" ]
            ]
        , specification spec
        ]


contextAndFocus : Spec
contextAndFocus =
    let
        sel =
            selection << select "brush" Interval [ seEncodings [ ChX ] ]

        encContext =
            encoding
                << position X [ pName "date", pMType Temporal, pAxis [ axFormat "%Y" ] ]
                << position Y
                    [ pName "price"
                    , pMType Quantitative
                    , pAxis [ axTickCount 3, axGrid False ]
                    ]

        specContext =
            asSpec [ width 400, height 80, sel [], area [], encContext [] ]

        encDetail =
            encoding
                << position X
                    [ pName "date"
                    , pMType Temporal
                    , pScale [ scDomain (doSelection "brush") ]
                    , pAxis [ axTitle "" ]
                    ]
                << position Y [ pName "price", pMType Quantitative ]

        specDetail =
            asSpec [ width 400, area [], encDetail [] ]
    in
    toVegaLite
        [ dataFromUrl "https://vega.github.io/vega-lite/data/sp500.csv" []
        , vConcat [ specContext, specDetail ]
        ]


crossFilter : Spec
crossFilter =
    let
        hourTrans =
            -- This generates a new field based on the hour of day extracted from the date field.
            transform
                << calculateAs "hours(datum.date)" "hour"

        sel =
            selection << select "brush" Interval [ seEncodings [ ChX ] ]

        filterTrans =
            transform
                << filter (fiSelection "brush")

        totalEnc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pAggregate Count, pMType Quantitative ]

        selectedEnc =
            encoding
                << position X [ pRepeat Column, pMType Quantitative ]
                << position Y [ pAggregate Count, pMType Quantitative ]
                << color [ mStr "goldenrod" ]
    in
    toVegaLite
        [ repeat [ columnFields [ "hour", "delay", "distance" ] ]
        , specification <|
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/flights-2k.json"
                    [ parse [ ( "date", foDate "%Y/%m/%d %H:%M" ) ] ]
                , hourTrans []
                , layer
                    [ asSpec [ bar [], totalEnc [] ]
                    , asSpec [ sel [], filterTrans [], bar [], selectedEnc [] ]
                    ]
                ]
        ]



{- This list comprises tuples of the label for each embedded visualization and
   corresponding Vega-Lite specification.
-}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "singleView1", stripPlot )
        , ( "singleView2", histogram )
        , ( "singleView3", stackedHistogram )
        , ( "singleView4", stackedHistogram2 )
        , ( "singleView5", lineChart )
        , ( "multiView1", multiBar )
        , ( "multiView2", barChart )
        , ( "multiView3", barChartWithAverage )
        , ( "multiView4", barChartPair )
        , ( "multiView5", barChartTriplet )
        , ( "multiView6", splom )
        , ( "dashboard1", dashboard1 )
        , ( "dashboard2", dashboard2 )
        , ( "interactive1", interactiveScatter1 )
        , ( "interactive2", interactiveScatter2 )
        , ( "interactive3", interactiveScatter3 )
        , ( "interactive4", interactiveScatter4 )
        , ( "interactive5", interactiveScatter5 )
        , ( "interactive6", interactiveScatter6 )
        , ( "interactive7", interactiveScatter7 )
        , ( "interactive8", interactiveScatter8 )
        , ( "interactive9", interactiveScatter9 )
        , ( "coordinated1", coordinatedScatter1 )
        , ( "coordinated2", coordinatedScatter2 )
        , ( "coordinated3", contextAndFocus )
        , ( "crossFilter1", crossFilter )
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
