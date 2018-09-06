port module GalleryLayer exposing (elmToJS)

import Json.Encode as JE
import Platform
import VegaLite exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


layer1 : Spec
layer1 =
    let
        des =
            description "A candlestick chart inspired by Protovis (http://mbostock.github.io/protovis/ex/candlestick.html)"

        data =
            dataFromColumns []
                << dataColumn "date" (strs [ "01-Jun-2009", "02-Jun-2009", "03-Jun-2009", "04-Jun-2009", "05-Jun-2009", "08-Jun-2009", "09-Jun-2009", "10-Jun-2009", "11-Jun-2009", "12-Jun-2009", "15-Jun-2009", "16-Jun-2009", "17-Jun-2009", "18-Jun-2009", "19-Jun-2009", "22-Jun-2009", "23-Jun-2009", "24-Jun-2009", "25-Jun-2009", "26-Jun-2009", "29-Jun-2009", "30-Jun-2009" ])
                << dataColumn "open" (nums [ 28.7, 30.04, 29.62, 31.02, 29.39, 30.84, 29.77, 26.9, 27.36, 28.08, 29.7, 30.81, 31.19, 31.54, 29.16, 30.4, 31.3, 30.58, 29.45, 27.09, 25.93, 25.36 ])
                << dataColumn "high" (nums [ 30.05, 30.13, 31.79, 31.02, 30.81, 31.82, 29.77, 29.74, 28.11, 28.5, 31.09, 32.75, 32.77, 31.54, 29.32, 32.05, 31.54, 30.58, 29.56, 27.22, 27.18, 27.38 ])
                << dataColumn "low" (nums [ 28.45, 28.3, 29.62, 29.92, 28.85, 26.41, 27.79, 26.9, 26.81, 27.73, 29.64, 30.07, 30.64, 29.6, 27.56, 30.3, 27.83, 28.79, 26.3, 25.76, 25.29, 25.02 ])
                << dataColumn "close" (nums [ 30.04, 29.63, 31.02, 30.18, 29.62, 29.77, 28.27, 28.46, 28.11, 28.15, 30.81, 32.68, 31.54, 30.03, 27.99, 31.17, 30.58, 29.05, 26.36, 25.93, 25.35, 26.35 ])
                << dataColumn "signal" (strs [ "short", "short", "short", "short", "short", "short", "short", "short", "short", "short", "long", "short", "short", "short", "short", "short", "short", "long", "long", "long", "long", "long" ])
                << dataColumn "ret" (nums [ -4.89396411092985, -0.322580645161295, 3.68663594470045, 4.51010886469673, 6.08424336973478, 1.2539184952978, -5.02431118314424, -5.46623794212217, -8.3743842364532, -5.52763819095477, 3.4920634920635, 0.155038759689914, 5.82822085889571, 8.17610062893082, 8.59872611464968, 15.4907975460123, 11.7370892018779, -10.4234527687296, 0, 0, 5.26315789473684, 6.73758865248228 ])

        trans =
            transform << calculateAs "datum.open > datum.close" "isIncrease"

        encLine =
            encoding
                << position X
                    [ pName "date"
                    , pMType Temporal
                    , pTimeUnit yearMonthDate
                    , pScale [ scDomain (doDts [ [ dtMonth May, dtDate 31, dtYear 2009 ], [ dtMonth Jul, dtDate 1, dtYear 2009 ] ]) ]
                    , pAxis [ axTitle "Date in 2009", axFormat "%m/%d" ]
                    ]
                << position Y [ pName "low", pMType Quantitative, pScale [ scZero False ] ]
                << position Y2 [ pName "high", pMType Quantitative ]
                << color [ mName "isIncrease", mMType Nominal, mLegend [], mScale [ scRange (raStrs [ "#ae1325", "#06982d" ]) ] ]

        specLine =
            asSpec [ rule [], encLine [] ]

        encBar =
            encoding
                << position X [ pName "date", pMType Temporal, pTimeUnit yearMonthDate ]
                << position Y [ pName "open", pMType Quantitative ]
                << position Y2 [ pName "close", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mName "isIncrease", mMType Nominal, mLegend [] ]

        specBar =
            asSpec [ bar [], encBar [] ]
    in
    toVegaLite [ des, width 320, data [], trans [], layer [ specLine, specBar ] ]


layer2 : Spec
layer2 =
    let
        des =
            description "A ranged dot plot that uses 'layer' to convey changing life expectancy for the five most populous countries (between 1955 and 2000)."

        trans =
            transform
                << filter (fiOneOf "country" (strs [ "China", "India", "United States", "Indonesia", "Brazil" ]))
                << filter (fiOneOf "year" (nums [ 1955, 2000 ]))

        encCountry =
            encoding
                << position Y
                    [ pName "country"
                    , pMType Nominal
                    , pAxis [ axTitle "Country", axOffset 5, axTicks False, axMinExtent 70, axDomain False ]
                    ]

        encLine =
            encoding
                << position X [ pName "life_expect", pMType Quantitative ]
                << detail [ dName "country", dMType Nominal ]
                << color [ mStr "#db646f" ]

        specLine =
            asSpec [ line [], encLine [] ]

        encPoints =
            encoding
                << position X [ pName "life_expect", pMType Quantitative, pAxis [ axTitle "Life Expectanct (years)" ] ]
                << color [ mName "year", mMType Ordinal, mScale (domainRangeMap ( 1955, "#e6959c" ) ( 2000, "#911a24" )), mLegend [ leTitle "Year" ] ]
                << size [ mNum 100 ]
                << opacity [ mNum 1 ]

        specPoints =
            asSpec [ point [ maFilled True ], encPoints [] ]
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/countries.json" []
        , trans []
        , encCountry []
        , layer [ specLine, specPoints ]
        ]


layer3 : Spec
layer3 =
    let
        des =
            description "Bullet chart"

        conf =
            configure << configuration (coTick [ maThickness 2 ])

        row title ranges measures marker =
            JE.object
                [ ( "title", JE.string title )
                , ( "ranges", JE.list JE.float ranges )
                , ( "measures", JE.list JE.float measures )
                , ( "markers", JE.list JE.float [ marker ] )
                ]

        data =
            dataFromJson
                (JE.list identity
                    [ row "Revenue" [ 150, 225, 300 ] [ 220, 270 ] 250
                    , row "Profit" [ 20, 25, 30 ] [ 21, 23 ] 26
                    , row "Order size" [ 350, 500, 600 ] [ 100, 320 ] 550
                    , row "New customers" [ 1400, 2000, 2500 ] [ 1000, 1650 ] 2100
                    , row "Satisfaction" [ 3.5, 4.25, 5 ] [ 3.2, 4.7 ] 4.4
                    ]
                )

        fac =
            facet [ rowBy [ fName "title", fMType Ordinal, fHeader [ hdLabelAngle 30, hdTitle "" ] ] ]

        res =
            resolve << resolution (reScale [ ( chX, reIndependent ) ])

        encLine =
            encoding
                << position X [ pName "life_expect", pMType Quantitative ]
                << detail [ dName "country", dMType Nominal ]
                << color [ mStr "#db646f" ]

        enc1 =
            encoding
                << position X
                    [ pName "ranges[2]"
                    , pMType Quantitative
                    , pScale [ scNice niFalse ]
                    , pAxis [ axTitle "" ]
                    ]

        spec1 =
            asSpec [ bar [ maColor "#eee" ], enc1 [] ]

        enc2 =
            encoding << position X [ pName "ranges[1]", pMType Quantitative ]

        spec2 =
            asSpec [ bar [ maColor "#ddd" ], enc2 [] ]

        enc3 =
            encoding << position X [ pName "ranges[0]", pMType Quantitative ]

        spec3 =
            asSpec [ bar [ maColor "#ccc" ], enc3 [] ]

        enc4 =
            encoding << position X [ pName "measures[1]", pMType Quantitative ]

        spec4 =
            asSpec [ bar [ maColor "lightsteelblue", maSize 10 ], enc4 [] ]

        enc5 =
            encoding << position X [ pName "measures[0]", pMType Quantitative ]

        spec5 =
            asSpec [ bar [ maColor "steelblue", maSize 10 ], enc5 [] ]

        enc6 =
            encoding << position X [ pName "markers[0]", pMType Quantitative ]

        spec6 =
            asSpec [ tick [ maColor "black" ], enc6 [] ]
    in
    toVegaLite
        [ des
        , conf []
        , data []
        , fac
        , res []
        , specification (asSpec [ layer [ spec1, spec2, spec3, spec4, spec5, spec6 ] ])
        ]


layer4 : Spec
layer4 =
    let
        des =
            description "Layered bar/line chart with dual axes"

        encTime =
            encoding << position X [ pName "date", pMType Ordinal, pTimeUnit month ]

        encBar =
            encoding
                << position Y [ pName "precipitation", pMType Quantitative, pAggregate opMean, pAxis [ axGrid False ] ]

        specBar =
            asSpec [ bar [], encBar [] ]

        encLine =
            encoding
                << position Y [ pName "temp_max", pMType Quantitative, pAggregate opMean, pAxis [ axGrid False ], pScale [ scZero False ] ]
                << color [ mStr "firebrick" ]

        specLine =
            asSpec [ line [], encLine [] ]

        res =
            resolve
                << resolution (reScale [ ( chY, reIndependent ) ])
    in
    toVegaLite
        [ des
        , dataFromUrl "https://vega.github.io/vega-lite/data/seattle-weather.csv" []
        , encTime []
        , layer [ specBar, specLine ]
        , res []
        ]


layer5 : Spec
layer5 =
    let
        des =
            description "Horizon chart with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on horizon charts.)"

        data =
            dataFromColumns []
                << dataColumn "x" (nums (List.map toFloat <| List.range 1 20))
                << dataColumn "y" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        trans =
            transform << calculateAs "datum.y - 50" "ny"

        encX =
            encoding << position X [ pName "x", pMType Quantitative, pScale [ scZero False, scNice niFalse ] ]

        encLower =
            encoding
                << position Y [ pName "y", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ] ]
                << opacity [ mNum 0.6 ]

        specLower =
            asSpec [ area [ maClip True ], encLower [] ]

        encUpper =
            encoding
                << position Y [ pName "ny", pMType Quantitative, pScale [ scDomain (doNums [ 0, 50 ]) ], pAxis [ axTitle "y" ] ]
                << opacity [ mNum 0.3 ]

        specUpper =
            asSpec [ trans [], area [ maClip True ], encUpper [] ]

        config =
            configure
                << configuration (coArea [ maInterpolate miMonotone, maOrient moVertical ])
    in
    toVegaLite
        [ des
        , width 300
        , height 50
        , data []
        , encX []
        , layer [ specLower, specUpper ]
        , config []
        ]


layer6 : Spec
layer6 =
    let
        enc1 =
            encoding
                << position Y [ pName "record.low", pMType Quantitative, pScale [ scDomain (doNums [ 10, 70 ]) ], pAxis [ axTitle "Temperature (F)" ] ]
                << position Y2 [ pName "record.high", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal, pAxis [ axTitle "Day" ] ]
                << size [ mNum 20 ]
                << color [ mStr "#ccc" ]

        spec1 =
            asSpec [ bar [], enc1 [] ]

        enc2 =
            encoding
                << position Y [ pName "normal.low", pMType Quantitative ]
                << position Y2 [ pName "normal.high", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal ]
                << size [ mNum 20 ]
                << color [ mStr "#999" ]

        spec2 =
            asSpec [ bar [], enc2 [] ]

        enc3 =
            encoding
                << position Y [ pName "actual.low", pMType Quantitative ]
                << position Y2 [ pName "actual.high", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal ]
                << size [ mNum 12 ]
                << color [ mStr "#000" ]

        spec3 =
            asSpec [ bar [], enc3 [] ]

        enc4 =
            encoding
                << position Y [ pName "forecast.low.low", pMType Quantitative ]
                << position Y2 [ pName "forecast.low.high", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal ]
                << size [ mNum 12 ]
                << color [ mStr "#000" ]

        spec4 =
            asSpec [ bar [], enc4 [] ]

        enc5 =
            encoding
                << position Y [ pName "forecast.low.high", pMType Quantitative ]
                << position Y2 [ pName "forecast.high.low", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal ]
                << size [ mNum 3 ]
                << color [ mStr "#000" ]

        spec5 =
            asSpec [ bar [], enc5 [] ]

        enc6 =
            encoding
                << position Y [ pName "forecast.high.low", pMType Quantitative ]
                << position Y2 [ pName "forecast.high.high", pMType Quantitative ]
                << position X [ pName "id", pMType Ordinal ]
                << size [ mNum 12 ]
                << color [ mStr "#000" ]

        spec6 =
            asSpec [ bar [], enc6 [] ]

        enc7 =
            encoding
                << position X
                    [ pName "id"
                    , pMType Ordinal
                    , pAxis
                        [ axDomain False
                        , axTicks False
                        , axLabels False
                        , axTitle "Day"
                        , axTitlePadding 25
                        , axOrient siTop
                        ]
                    ]
                << text [ tName "day", tMType Nominal ]

        spec7 =
            asSpec [ textMark [ maAlign haCenter, maDy -105 ], enc7 [] ]
    in
    toVegaLite
        [ description "A layered bar chart with floating bars representing weekly weather data"
        , title "Weekly Weather Observations and Predictions"
        , width 250
        , height 200
        , dataFromUrl "https://vega.github.io/vega-lite/data/weather.json" []
        , layer [ spec1, spec2, spec3, spec4, spec5, spec6, spec7 ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "layer1", layer1 )
        , ( "layer2", layer2 )
        , ( "layer3", layer3 )
        , ( "layer4", layer4 )
        , ( "layer5", layer5 )
        , ( "layer6", layer6 )
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
