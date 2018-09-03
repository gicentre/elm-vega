port module TimeTests exposing (elmToJS)

import Browser
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
                << position Y [ pName "temperature", pMType Quantitative, pAggregate opMean, pScale [ scZero False ] ]
    in
    toVegaLite [ width 800, data, enc [], line [ maStrokeWidth 0.2 ] ]


timeYear : Spec
timeYear =
    timeByUnit year


timeQuarter : Spec
timeQuarter =
    timeByUnit quarter


timeQuarterMonth : Spec
timeQuarterMonth =
    timeByUnit quarterMonth


timeMonth : Spec
timeMonth =
    timeByUnit month


timeMonthDate : Spec
timeMonthDate =
    timeByUnit monthDate


timeDate : Spec
timeDate =
    timeByUnit date


timeYearMonthDateHours : Spec
timeYearMonthDateHours =
    timeByUnit yearMonthDateHours


timeYearMonthDateHoursMinutes : Spec
timeYearMonthDateHoursMinutes =
    timeByUnit yearMonthDateHoursMinutes


timeYearMonthDateHoursMinutesSeconds : Spec
timeYearMonthDateHoursMinutesSeconds =
    timeByUnit yearMonthDateHoursMinutesSeconds


timeDay : Spec
timeDay =
    timeByUnit day


timeHours : Spec
timeHours =
    timeByUnit hours


timeHoursMinutes : Spec
timeHoursMinutes =
    timeByUnit hoursMinutes


timeHoursMinutesSeconds : Spec
timeHoursMinutesSeconds =
    timeByUnit hoursMinutesSeconds


timeMinutes : Spec
timeMinutes =
    timeByUnit minutes


timeMinutesSeconds : Spec
timeMinutesSeconds =
    timeByUnit minutesSeconds



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
                    foDate "%d %b %Y %H:%M"

                UTC ->
                    foUtc "%d %b %Y %H:%M"

        tu =
            case dType of
                Local ->
                    pTimeUnit yearMonthDateHours

                UTC ->
                    pTimeUnit (utc yearMonthDateHours)

        timeScale =
            case dType of
                Local ->
                    pScale [ scType scTime ]

                UTC ->
                    pScale [ scType scUtc ]

        data =
            dataFromColumns [ parse [ ( "date", format ) ] ]
                << dataColumn "date" (strs [ "28 Oct 2017 22:00", "28 Oct 2017 23:00", "29 Oct 2017 00:00", "29 Oct 2017 01:00", "29 Oct 2017 02:00", "29 Oct 2017 03:00", "29 Oct 2017 04:00" ])
                << dataColumn "value" (nums [ 1, 2, 3, 4, 5, 6, 7 ])

        enc =
            encoding
                << position X [ pName "date", pMType Temporal, tu, timeScale, pAxis [ axFormat "%d %b %H:%M" ] ]
                << position Y [ pName "value", pMType Quantitative ]
                << size [ mNum 500 ]
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
    timeByUnit year



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


main : Program () Spec msg
main =
    Browser.element
        { init = always ( mySpecs, elmToJS mySpecs )
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
