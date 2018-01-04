port module HelloWorld exposing (fromElm)

import Platform
import VegaLite exposing (..)


myVis : Spec
myVis =
    toVegaLite
        [ title "Hello, World!"
        , dataFromColumns [] <| dataColumn "x" (Numbers [ 10, 20, 30 ]) []
        , mark Circle []
        , encoding <| position X [ PName "x", PmType Quantitative ] []
        ]



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec Msg
main =
    Platform.program
        { init = init myVis
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : Spec -> ( Spec, Cmd msg )
init spec =
    ( spec, fromElm spec )


port fromElm : Spec -> Cmd msg
