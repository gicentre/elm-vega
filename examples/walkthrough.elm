port module Walkthrough exposing (..)

import Eve exposing (..)
import Json.Encode
import Platform


main : Program Never Model Msg
main =
    Platform.program { init = init, update = update, subscriptions = subscriptions }


type alias Model =
    Int


type Msg
    = FromElm


port fromElm : Spec -> Cmd msg


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


init : ( Model, Cmd msg )
init =
    ( 0
    , fromElm <|
        Json.Encode.list
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
            ]
    )


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
