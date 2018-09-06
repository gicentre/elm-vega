port module ConfigTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


singleVis : (List a -> ( VLProperty, Spec )) -> Spec
singleVis config =
    let
        cars =
            dataFromUrl "data/cars.json" []

        scatterEnc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Cylinders", mMType Ordinal ]
                << shape [ mName "Origin", mMType Nominal ]
                << size [ mNum 100 ]
    in
    toVegaLite [ title "Car Scatter", config [], cars, width 200, height 200, point [], scatterEnc [] ]


compositeVis : (List a -> ( VLProperty, Spec )) -> Spec
compositeVis config =
    let
        cars =
            dataFromUrl "data/cars.json" []

        scatterEnc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Cylinders", mMType Ordinal ]
                << shape [ mName "Origin", mMType Nominal ]
                << size [ mNum 100 ]

        scatterSpec =
            asSpec [ title "Car Scatter", width 200, height 200, padding (paSize 20), point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pAggregate opCount, pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]

        streamEnc =
            encoding
                << position X [ pName "Year", pMType Temporal, pTimeUnit year ]
                << position Y [ pAggregate opCount, pMType Quantitative, pStack StCenter, pAxis [] ]
                << color [ mName "Origin", mMType Nominal ]

        barSpec =
            asSpec [ title "Car Histogram", width 200, height 200, padding (paSize 20), bar [], barEnc [] ]

        streamSpec =
            asSpec [ title "Car Streamgraph", width 200, height 200, padding (paSize 20), area [], streamEnc [] ]

        res =
            resolve
                << resolution (reScale [ ( chColor, Independent ), ( chShape, Independent ) ])
    in
    toVegaLite [ config [], cars, hConcat [ scatterSpec, barSpec, streamSpec ], res [] ]


defaultCfg : Spec
defaultCfg =
    configure
        |> compositeVis


darkCfg : Spec
darkCfg =
    configure
        << configuration (coBackground "black")
        << configuration (coTitle [ ticoFont "Roboto", ticoColor "#fff" ])
        << configuration (coAxis [ axcoDomainColor "yellow", axcoGridColor "rgb(255,255,200)", axcoGridOpacity 0.2, axcoLabelColor "#fcf", axcoTickColor "white", axcoTitleColor "rgb(200,255,200)", axcoLabelFont "Roboto", axcoTitleFont "Roboto" ])
        << configuration (coLegend [ lecoFillColor "#333", lecoStrokeColor "#444", lecoTitleColor "rgb(200,200,200)", lecoLabelColor "white", lecoSymbolFillColor "red", lecoGradientStrokeColor "yellow", lecoLabelFont "Roboto", lecoTitleFont "Roboto" ])
        |> compositeVis


markCfg1 : Spec
markCfg1 =
    configure
        << configuration (coMark [ maFilled False ])
        |> compositeVis


markCfg2 : Spec
markCfg2 =
    configure
        << configuration (coMark [ maFilled True, maFill "black", maOpacity 1 ])
        << configuration (coBar [ maFilled True ])
        << configuration (coArea [ maFilled False ])
        << configuration (coPoint [ maFilled True, maStroke "white", maStrokeOpacity 0.2 ])
        |> compositeVis


paddingCfg : Spec
paddingCfg =
    configure
        << configuration (coAutosize [ asFit ])
        << configuration (coPadding (paEdges 90 60 30 0))
        |> singleVis



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "default", defaultCfg )
        , ( "dark", darkCfg )
        , ( "mark1", markCfg1 )
        , ( "mark2", markCfg2 )
        , ( "padding", paddingCfg )
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
