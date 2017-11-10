port module SimpleScatterplot exposing (fromElm)

import Eve exposing (..)
import Platform


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



{- The parameter of 'fromElm' should match the specification name above
   (scatter in this example).
-}


init : ( Model, Cmd msg )
init =
    ( 0, fromElm scatter )



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and should not need to be changed.
-}


main : Program Never Model Msg
main =
    Platform.program { init = init, update = update, subscriptions = subscriptions }


type alias Model =
    Int


type Msg
    = FromElm


port fromElm : Spec -> Cmd msg


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
