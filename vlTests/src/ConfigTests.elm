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
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color [ MName "Cylinders", MmType Ordinal ]
                << shape [ MName "Origin", MmType Nominal ]
                << size [ MNumber 100 ]
    in
    toVegaLite [ title "Car Scatter", config [], cars, width 200, height 200, point [], scatterEnc [] ]


compositeVis : (List a -> ( VLProperty, Spec )) -> Spec
compositeVis config =
    let
        cars =
            dataFromUrl "data/cars.json" []

        scatterEnc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color [ MName "Cylinders", MmType Ordinal ]
                << shape [ MName "Origin", MmType Nominal ]
                << size [ MNumber 100 ]

        scatterSpec =
            asSpec [ title "Car Scatter", width 200, height 200, padding (PSize 20), point [], scatterEnc [] ]

        barEnc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PAggregate Count, PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal ]

        streamEnc =
            encoding
                << position X [ PName "Year", PmType Temporal, PTimeUnit Year ]
                << position Y [ PAggregate Count, PmType Quantitative, PStack StCenter, PAxis [] ]
                << color [ MName "Origin", MmType Nominal ]

        barSpec =
            asSpec [ title "Car Histogram", width 200, height 200, padding (PSize 20), bar [], barEnc [] ]

        streamSpec =
            asSpec [ title "Car Streamgraph", width 200, height 200, padding (PSize 20), area [], streamEnc [] ]

        res =
            resolve
                << resolution (RScale [ ( ChColor, Independent ), ( ChShape, Independent ) ])
    in
    toVegaLite [ config [], cars, hConcat [ scatterSpec, barSpec, streamSpec ], res [] ]


defaultCfg : Spec
defaultCfg =
    configure
        |> compositeVis


darkCfg : Spec
darkCfg =
    configure
        << configuration (Background "black")
        << configuration (TitleStyle [ TFont "Roboto", TColor "#fff" ])
        << configuration (Axis [ DomainColor "yellow", GridColor "rgb(255,255,200)", GridOpacity 0.2, LabelColor "#fcf", TickColor "white", TitleColor "rgb(200,255,200)", LabelFont "Roboto", TitleFont "Roboto" ])
        << configuration (Legend [ FillColor "#333", StrokeColor "#444", LeTitleColor "rgb(200,200,200)", LeLabelColor "white", SymbolColor "red", GradientStrokeColor "yellow", LeLabelFont "Roboto", LeTitleFont "Roboto" ])
        |> compositeVis


markCfg1 : Spec
markCfg1 =
    configure
        << configuration (MarkStyle [ MFilled False ])
        |> compositeVis


markCfg2 : Spec
markCfg2 =
    configure
        << configuration (MarkStyle [ MFilled True, MFill "black", MOpacity 1 ])
        << configuration (BarStyle [ MFilled True ])
        << configuration (AreaStyle [ MFilled False ])
        << configuration (PointStyle [ MFilled True, MStroke "white", MStrokeOpacity 0.2 ])
        |> compositeVis


paddingCfg : Spec
paddingCfg =
    configure
        << configuration (Autosize [ AFit ])
        << configuration (Padding (PEdges 90 60 30 0))
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


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
