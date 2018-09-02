port module HelloWorld exposing (elmToJS)

import Platform
import VegaLite exposing (..)


myVis : Spec
myVis =
    toVegaLite
        [ title "Hello, World!"
        , dataFromColumns [] <| dataColumn "x" (nums [ 10, 20, 30 ]) []
        , circle []
        , encoding <| position X [ pName "x", pMType Quantitative ] []
        ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega-Lite spec (myVis) to it.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( myVis, elmToJS myVis )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
