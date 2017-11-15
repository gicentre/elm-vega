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


weatherColors : List ( String, String )
weatherColors =
    [ ( "sun", "#e7ba52" ), ( "fog", "#c7c7c7" ), ( "drizzle", "#aec7ea" ), ( "rain", "#1f77b4" ), ( "snow", "#9467bd" ) ]


stackedHistogram2 : Spec
stackedHistogram2 =
    let
        enc =
            encoding
                << position X [ PName "temp_max", PmType Quantitative, PBin [] ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "weather", MmType Nominal, MScale (scaleDomainToRange weatherColors) ]
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
                << color [ MName "weather", MmType Nominal, MScale (scaleDomainToRange weatherColors) ]
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
                << color [ MName "weather", MmType Nominal, MLegend [], MScale (scaleDomainToRange weatherColors) ]
    in
    toVegaLite
        [ dataFromUrl "data/seattle-weather.csv" []
        , mark Bar []
        , enc []
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
            ]
    )


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
