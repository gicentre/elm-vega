port module SimpleScatterplot exposing (elmToJS)

import Json.Encode
import Platform
import VegaLite exposing (..)


scatter : Spec
scatter =
    let
        cars =
            dataFromUrl "data/cars.json" []

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
                << color [ MName "Origin", MmType Nominal ]
    in
    toVegaLite [ cars, mark Circle [], enc [] ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    Json.Encode.object [ ( "scatter", scatter ) ]



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
