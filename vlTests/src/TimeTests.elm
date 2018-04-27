port module TimeTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


timeByUnit : TimeUnit -> Spec
timeByUnit tu =
    let
        data =
            dataFromUrl "data/timeTest.tsv" []

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit tu ]
                << position Y [ pName "temperature", pMType Quantitative, pAggregate Mean, pScale [ SZero False ] ]
    in
    toVegaLite [ width 800, data, enc [], line [ MStrokeWidth 0.2 ] ]


timeYear : Spec
timeYear =
    timeByUnit Year


timeQuarter : Spec
timeQuarter =
    timeByUnit Quarter


timeQuarterMonth : Spec
timeQuarterMonth =
    timeByUnit QuarterMonth


timeMonth : Spec
timeMonth =
    timeByUnit Month


timeMonthDate : Spec
timeMonthDate =
    timeByUnit MonthDate


timeDate : Spec
timeDate =
    timeByUnit Date


timeYearMonthDateHours : Spec
timeYearMonthDateHours =
    timeByUnit YearMonthDateHours


timeYearMonthDateHoursMinutes : Spec
timeYearMonthDateHoursMinutes =
    timeByUnit YearMonthDateHoursMinutes


timeYearMonthDateHoursMinutesSeconds : Spec
timeYearMonthDateHoursMinutesSeconds =
    timeByUnit YearMonthDateHoursMinutesSeconds


timeDay : Spec
timeDay =
    timeByUnit Day


timeHours : Spec
timeHours =
    timeByUnit Hours


timeHoursMinutes : Spec
timeHoursMinutes =
    timeByUnit HoursMinutes


timeHoursMinutesSeconds : Spec
timeHoursMinutesSeconds =
    timeByUnit HoursMinutesSeconds


timeMinutes : Spec
timeMinutes =
    timeByUnit Minutes


timeMinutesSeconds : Spec
timeMinutesSeconds =
    timeByUnit MinutesSeconds



-- TODO: Add milliseconds example
-- | SecondsMilliseconds
-- | Milliseconds


type Date
    = Local
    | UTC


parseTime : Date -> Spec
parseTime dType =
    let
        format =
            case dType of
                Local ->
                    FoDate "%d %b %Y %H:%M"

                UTC ->
                    FoUtc "%d %b %Y %H:%M"

        tu =
            case dType of
                Local ->
                    pTimeUnit YearMonthDateHours

                UTC ->
                    pTimeUnit (utc YearMonthDateHours)

        timeScale =
            case dType of
                Local ->
                    pScale [ SType ScTime ]

                UTC ->
                    pScale [ SType ScUtc ]

        data =
            dataFromColumns [ Parse [ ( "date", format ) ] ]
                << dataColumn "date" (Strings [ "28 Oct 2017 22:00", "28 Oct 2017 23:00", "29 Oct 2017 00:00", "29 Oct 2017 01:00", "29 Oct 2017 02:00", "29 Oct 2017 03:00", "29 Oct 2017 04:00" ])
                << dataColumn "value" (Numbers [ 1, 2, 3, 4, 5, 6, 7 ])

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, tu, timeScale, pAxis [ AxFormat "%d %b %H:%M" ] ]
                << position Y [ pName "value", pMType Quantitative ]
                << size [ mNumber 500 ]
    in
    toVegaLite [ width 800, data [], enc [], circle [] ]


localTime : Spec
localTime =
    parseTime Local


utcTime : Spec
utcTime =
    parseTime UTC


sourceExample : Spec
sourceExample =
    timeByUnit Year



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "timeYear", timeYear )
        , ( "timeQuarter", timeQuarter )
        , ( "timeQuarterMonth", timeQuarterMonth )
        , ( "timeMonth", timeMonth )
        , ( "timeMonthDate", timeMonthDate )
        , ( "timeDate", timeDate )
        , ( "timeYearMonthDateHours", timeYearMonthDateHours )
        , ( "timeYearMonthDateHoursMinutes", timeYearMonthDateHoursMinutes )
        , ( "timeYearMonthDateHoursMinutesSeconds", timeYearMonthDateHoursMinutesSeconds )
        , ( "timeDay", timeDay )
        , ( "timeHours", timeHours )
        , ( "timeHoursMinutes", timeHoursMinutes )
        , ( "timeHoursMinutesSeconds", timeHoursMinutesSeconds )
        , ( "timeMinutes", timeMinutes )
        , ( "timeMinutesSeconds", timeMinutesSeconds )
        , ( "localTime", localTime )
        , ( "utcTime", utcTime )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program Never Spec msg
main =
    Html.program
        { init = ( mySpecs, elmToJS mySpecs )
        , view = view
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }



-- View


view : Spec -> Html msg
view spec =
    div []
        [ div [ id "specSource" ] []
        , pre []
            [ Html.text (Json.Encode.encode 2 sourceExample) ]
        ]


port elmToJS : Spec -> Cmd msg
