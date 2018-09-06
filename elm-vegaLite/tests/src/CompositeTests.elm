port module CompositeTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


bPlot : SummaryExtent -> Spec
bPlot ext =
    let
        pop =
            dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []

        enc =
            encoding
                << position X [ pName "age", pMType Ordinal ]
                << position Y
                    [ pName "people", pMType Quantitative, pAxis [ axTitle "Population" ] ]
    in
    toVegaLite [ pop, boxplot [ maExtent ext ], enc [] ]


boxplot1 : Spec
boxplot1 =
    bPlot exRange


boxplot2 : Spec
boxplot2 =
    bPlot (exIqrScale 2)


eBand : String -> Spec
eBand ext =
    let
        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        label =
            case ext of
                "ci" ->
                    "(95% CI)"

                "stdev" ->
                    "(1 stdev)"

                "stderr" ->
                    "(1 std Error)"

                "range" ->
                    "(min to max)"

                _ ->
                    "(IQR)"

        summary =
            case ext of
                "ci" ->
                    exCi

                "stdev" ->
                    exStdev

                "stderr" ->
                    exStderr

                "range" ->
                    exRange

                _ ->
                    exIqr

        enc =
            encoding
                << position X [ pName "Year", pMType Temporal, pTimeUnit year ]
                << position Y
                    [ pName "Miles_per_Gallon"
                    , pMType Quantitative
                    , pScale [ scZero False ]
                    , pTitle ("Miles per Gallon " ++ label)
                    ]
    in
    toVegaLite [ cars, errorband [ maExtent summary, maInterpolate miMonotone, maBorders [] ], enc [] ]


errorband1 : Spec
errorband1 =
    eBand "ci"


errorband2 : Spec
errorband2 =
    eBand "stdev"


eBar : SummaryExtent -> Spec
eBar ext =
    let
        barley =
            dataFromUrl "https://vega.github.io/vega-lite/data/barley.json" []

        enc =
            encoding
                << position X [ pName "yield", pMType Quantitative, pScale [ scZero False ] ]
                << position Y
                    [ pName "variety"
                    , pMType Ordinal
                    ]
    in
    toVegaLite [ barley, errorbar [ maExtent ext, maTicks [ maStroke "blue" ] ], enc [] ]


errorbar1 : Spec
errorbar1 =
    eBar exCi


errorbar2 : Spec
errorbar2 =
    eBar exStdev



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "boxplot1", boxplot1 )
        , ( "boxplot2", boxplot2 )
        , ( "errorband1", errorband1 )
        , ( "errorband2", errorband2 )
        , ( "errorbar1", errorbar1 )
        , ( "errorbar2", errorbar2 )
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
