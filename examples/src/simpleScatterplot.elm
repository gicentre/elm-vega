port module SimpleScatterplot exposing (fromElm)

import Platform
import Vega exposing (..)


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



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec Msg
main =
    Platform.program
        { init = init scatter
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : Spec -> ( Spec, Cmd msg )
init spec =
    ( spec, fromElm spec )


port fromElm : Spec -> Cmd msg
