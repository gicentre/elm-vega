port module Walkthrough exposing (..)

import Eve exposing (..)
import Json.Encode
import Platform


stripPlot : Spec
stripPlot =
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Tick []
        , encoding (position X [ PName "temp_max", PmType Quantitative ] [])
        ]


histogram : Spec
histogram =
    let
        enc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
        , enc []
        ]


stackedHistogram : Spec
stackedHistogram =
    let
        enc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "weather", MmType Nominal ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
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
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "weather", MmType Nominal, MScale weatherColors ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
        , enc []
        ]


lineChart : Spec
lineChart =
    let
        enc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "weather", MmType Nominal, MScale weatherColors ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Line []
        , enc []
        ]


multiBar : Spec
multiBar =
    let
        enc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << column [ FName "weather", FmType Nominal ]
                << color [ MName "weather", MmType Nominal, MLegend [], MScale weatherColors ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
        , enc []
        ]


barChart : Spec
barChart =
    let
        enc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
        , enc []
        ]


barChartWithAverage : Spec
barChartWithAverage =
    let
        barEnc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]

        barSpec =
            asSpec [ mark Bar [], barEnc [] ]

        avLineEnc =
            encoding
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]

        avLineSpec =
            asSpec [ mark Rule [], avLineEnc [] ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , layer [ barSpec, avLineSpec ]
        ]


barChartPair : Spec
barChartPair =
    let
        bar1Enc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]

        bar1Spec =
            asSpec [ mark Bar [], bar1Enc [] ]

        bar2Enc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "temp_max", PmType Quantitative, PAggregate Mean ]

        bar2Spec =
            asSpec [ mark Bar [], bar2Enc [] ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , vConcat [ bar1Spec, bar2Spec ]
        ]


barChartTriplet : Spec
barChartTriplet =
    let
        enc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PRepeat Row, PmType Quantitative, PAggregate Mean ]

        spec =
            asSpec [ dataFromUrl "data/seattle-weather.csv" [], mark Bar [], enc [] ]
    in
    toVegaLite
        [ repeat [ RowFields [ "precipitation", "temp_max", "wind" ] ]
        , specification spec
        ]


splom : Spec
splom =
    let
        enc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PRepeat Row, PmType Quantitative ]

        spec =
            asSpec [ dataFromUrl "data/seattle-weather.csv" [], mark Point [], enc [] ]
    in
    toVegaLite
        [ repeat
            [ RowFields [ "temp_max", "precipitation", "wind" ]
            , ColumnFields [ "wind", "precipitation", "temp_max" ]
            ]
        , specification spec
        ]


dashboard1 : Spec
dashboard1 =
    let
        histoEnc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]

        histoSpec =
            asSpec [ title "Frequency histogram", mark Bar [], histoEnc [] ]

        scatterEnc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative ]
                << position Y [ PName "precipitation", PmType Quantitative ]

        scatterSpec =
            asSpec [ title "Scatterplot", mark Point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean ]

        barSpec =
            asSpec [ title "Bar chart", mark Bar [], barEnc [] ]

        annotationEnc =
            encoding
                << position Y [ PName "precipitation", PmType Quantitative, PAggregate Mean, PScale [ SDomain (DNumbers [ 0, 5.5 ]) ] ]

        annotationSpec =
            asSpec [ title "Annotation", width 200, mark Rule [], annotationEnc [] ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , hConcat [ histoSpec, scatterSpec, barSpec, annotationSpec ]
        ]


dashboard2 : Spec
dashboard2 =
    let
        histoEnc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << column [ FName "weather", FmType Nominal ]
                << color [ MName "weather", MmType Nominal, MLegend [], MScale weatherColors ]

        histoSpec =
            asSpec [ mark Bar [], histoEnc [] ]

        scatterEnc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PRepeat Row, PmType Quantitative ]

        scatterSpec =
            asSpec [ mark Point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ PName "date", PmType Ordinal, PTimeUnit Month ]
                << position Y [ PRepeat Row, PmType Quantitative, PAggregate Mean ]

        annotationEnc =
            encoding
                << position Y [ PRepeat Row, PmType Quantitative, PAggregate Mean ]

        layerSpec =
            asSpec
                [ layer
                    [ asSpec [ mark Bar [], barEnc [] ]
                    , asSpec [ mark Rule [], annotationEnc [] ]
                    ]
                ]

        barsSpec =
            asSpec
                [ repeat [ RowFields [ "precipitation", "temp_max", "wind" ] ]
                , specification layerSpec
                ]

        splomSpec =
            asSpec
                [ repeat
                    [ RowFields [ "temp_max", "precipitation", "wind" ]
                    , ColumnFields [ "wind", "precipitation", "temp_max" ]
                    ]
                , specification scatterSpec
                ]
    in
    toVegaLite
        [ --  dataFromUrl "data/newYork-weather.csv" []
          dataFromUrl "data/seattle-weather.csv" []
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
                << calculate "year(datum.Year)" "Year"

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color
                    [ MCondition "picked"
                        [ MName "Origin", MmType Nominal ]
                        [ MString "grey" ]
                    ]
    in
    [ dataFromUrl "data/cars.json" [], trans [], mark Circle [], enc [] ]


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
                << select "picked" Multi [ On "mouseover" ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter4 : Spec
interactiveScatter4 =
    let
        sel =
            selection
                << select "picked" Single [ Empty, Fields [ "Cylinders" ] ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter5 : Spec
interactiveScatter5 =
    let
        sel =
            selection
                << select "picked"
                    Single
                    [ Fields [ "Cylinders" ]
                    , Bind [ IRange "Cylinders" [ InMin 3, InMax 8, InStep 1 ] ]
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
                    [ Fields [ "Cylinders", "Year" ]
                    , Bind
                        [ IRange "Cylinders" [ InMin 3, InMax 8, InStep 1 ]
                        , IRange "Year" [ InMin 1969, InMax 1981, InStep 1 ]
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
                << select "picked" Interval [ Encodings [ ChX ] ]
    in
    toVegaLite <| sel [] :: scatterProps


interactiveScatter9 : Spec
interactiveScatter9 =
    let
        sel =
            selection
                << select "picked" Interval [ Encodings [ ChX ], BindScales ]
    in
    toVegaLite <| sel [] :: scatterProps


coordinatedScatter1 : Spec
coordinatedScatter1 =
    let
        enc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PRepeat Row, PmType Quantitative ]
                << color
                    [ MCondition "picked"
                        [ MName "Origin", MmType Nominal ]
                        [ MString "grey" ]
                    ]

        sel =
            selection
                << select "picked" Interval [ Encodings [ ChX ] ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], mark Circle [], enc [], sel [] ]
    in
    toVegaLite
        [ repeat
            [ RowFields [ "Displacement", "Miles_per_Gallon" ]
            , ColumnFields [ "Horsepower", "Miles_per_Gallon" ]
            ]
        , specification spec
        ]


coordinatedScatter2 : Spec
coordinatedScatter2 =
    let
        enc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PRepeat Row, PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal ]

        sel =
            selection
                << select "picked" Interval [ BindScales ]

        spec =
            asSpec [ dataFromUrl "data/cars.json" [], mark Circle [], enc [], sel [] ]
    in
    toVegaLite
        [ repeat
            [ RowFields [ "Displacement", "Miles_per_Gallon" ]
            , ColumnFields [ "Horsepower", "Miles_per_Gallon" ]
            ]
        , specification spec
        ]


contextAndFocus : Spec
contextAndFocus =
    let
        sel =
            selection << select "brush" Interval [ Encodings [ ChX ] ]

        encContext =
            encoding
                << position X [ PName "date", PmType Temporal, PAxis [ Format "%Y" ] ]
                << position Y
                    [ PName "price"
                    , PmType Quantitative
                    , PAxis [ TickCount 3, Grid False ]
                    ]

        specContext =
            asSpec [ width 400, height 80, sel [], mark Area [], encContext [] ]

        encDetail =
            encoding
                << position X
                    [ PName "date"
                    , PmType Temporal
                    , PScale [ SDomain (DSelection "brush") ]
                    , PAxis [ AxTitle "" ]
                    ]
                << position Y [ PName "price", PmType Quantitative ]

        specDetail =
            asSpec [ width 400, mark Area [], encDetail [] ]
    in
    toVegaLite
        [ dataFromUrl "data/sp500.csv" []
        , vConcat [ specContext, specDetail ]
        ]


crossFilter : Spec
crossFilter =
    let
        hourTrans =
            -- This generates a new field based on the hour of day extracted from the date field.
            transform
                << calculate "hours(datum.date)" "hour"

        sel =
            selection << select "brush" Interval [ Encodings [ ChX ] ]

        filterTrans =
            transform
                << filter (FSelection "brush")

        totalEnc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PAggregate Count, PmType Quantitative ]

        selectedEnc =
            encoding
                << position X [ PRepeat Column, PmType Quantitative ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MString "goldenrod" ]
    in
    toVegaLite
        [ repeat [ ColumnFields [ "hour", "delay", "distance" ] ]
        , specification <|
            asSpec
                [ dataFromUrl "data/flights-2k.json" [ Parse [ ( "date", FDate "%Y/%m/%d %H:%M" ) ] ]
                , hourTrans []
                , layer
                    [ asSpec [ mark Bar [], totalEnc [] ]
                    , asSpec [ sel [], filterTrans [], mark Bar [], selectedEnc [] ]
                    ]
                ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


specs : List Spec
specs =
    [ stripPlot
    , histogram
    , stackedHistogram
    , stackedHistogram2
    , lineChart
    , multiBar
    , barChart
    , barChartWithAverage
    , barChartPair
    , barChartTriplet
    , splom
    , dashboard1
    , dashboard2
    , interactiveScatter1
    , interactiveScatter2
    , interactiveScatter3
    , interactiveScatter4
    , interactiveScatter5
    , interactiveScatter6
    , interactiveScatter7
    , interactiveScatter8
    , interactiveScatter9
    , coordinatedScatter1
    , coordinatedScatter2
    , contextAndFocus
    , crossFilter
    ]



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never (List Spec) Msg
main =
    Platform.program
        { init = init specs
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : List Spec -> ( List Spec, Cmd msg )
init specs =
    ( specs, fromElm <| Json.Encode.list specs )


port fromElm : Spec -> Cmd msg
