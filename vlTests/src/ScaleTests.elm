port module ScaleTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


scale1 : Spec
scale1 =
    let
        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mStr "rgb(203,24,29)" ]
                << size [ mName "Acceleration", mMType Quantitative, mBin [] ]
                << opacity [ mName "Acceleration", mMType Quantitative, mBin [] ]
    in
    toVegaLite [ cars, enc [], point [ maFilled True, maStroke "white", maStrokeWidth 0.4 ] ]


scale2 : Spec
scale2 =
    let
        conf =
            configure
                << configuration (coRange [ racoRamp "reds" ])

        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Acceleration", mMType Quantitative, mBin [] ]
    in
    toVegaLite [ conf [], cars, enc [], point [] ]


scale3 : Spec
scale3 =
    let
        data =
            dataFromColumns []
                << dataColumn "b" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52 ])

        enc =
            encoding
                << position Y
                    [ pName "b"
                    , pMType Nominal
                    , pSort []
                    , pAxis [ axTicks False, axDomain False, axTitle "" ]
                    ]
                << size
                    [ mName "b"
                    , mMType Quantitative
                    , mScale [ scType ScQuantile ]
                    ]
                << color
                    [ mName "b"
                    , mMType Quantitative
                    , mScale [ scType ScQuantile ]
                    , mLegend [ leTitle "Quantile" ]
                    ]
    in
    toVegaLite [ data [], enc [], circle [] ]


scale4 : Spec
scale4 =
    let
        data =
            dataFromColumns []
                << dataColumn "b" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52 ])

        enc =
            encoding
                << position Y
                    [ pName "b"
                    , pMType Nominal
                    , pSort []
                    , pAxis [ axTicks False, axDomain False, axTitle "" ]
                    ]
                << size
                    [ mName "b"
                    , mMType Quantitative
                    , mScale [ scType ScQuantize ]
                    ]
                << color
                    [ mName "b"
                    , mMType Quantitative
                    , mScale [ scType ScQuantize, scZero True ]
                    , mLegend [ leTitle "Quantize" ]
                    ]
    in
    toVegaLite [ data [], enc [], circle [] ]


scale5 : Spec
scale5 =
    let
        data =
            dataFromColumns []
                << dataColumn "b" (nums [ 28, 55, 43, 91, 81, 53, 19, 87, 52 ])

        enc =
            encoding
                << position Y
                    [ pName "b"
                    , pMType Nominal
                    , pSort []
                    , pAxis [ axTicks False, axDomain False, axTitle "" ]
                    ]
                << size
                    [ mName "b"
                    , mMType Quantitative
                    , mScale
                        [ scType ScThreshold
                        , scDomain (doNums [ 30, 70 ])
                        , scRange (raNums [ 80, 200, 320 ])
                        ]
                    ]
                << color
                    [ mName "b"
                    , mMType Quantitative
                    , mScale
                        [ scType ScThreshold
                        , scDomain (doNums [ 30, 70 ])
                        , scScheme "viridis" []
                        ]
                    , mLegend [ leTitle "Threshold" ]
                    ]
    in
    toVegaLite [ data [], enc [], circle [] ]


sourceExample : Spec
sourceExample =
    scale5



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "scale1", scale1 )
        , ( "scale2", scale2 )
        , ( "scale3", scale3 )
        , ( "scale4", scale4 )
        , ( "scale5", scale5 )
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
