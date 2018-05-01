port module SimpleScatterplot exposing (elmToJS)

import Platform
import VegaLite exposing (..)


scatter : Spec
scatter =
    let
        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative ]
                << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]
    in
    toVegaLite [ cars, circle [], enc [] ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "scatter", scatter ) ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the specs to it.
-}


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
