port module HelloWorld exposing (elmToJS)

import Platform
import Vega exposing (..)


helloWorld : Spec
helloWorld =
    let
        ds =
            dataSource
                [ dataFromRows "myData"
                    []
                    (dataRow [ ( "label", vStr "Hello from Vega" ) ] [])
                ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "myData") ]
                    , mEncode [ enEnter [ maText [ vField (field "label") ] ] ]
                    ]
    in
    toVega [ ds, mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime.
   In this example, only a single spec 'helloWord' is provided.
-}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "helloWorld", helloWorld ) ]



{- ---------------------------------------------------------------------------
   The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega specs (mySpecs) to it.
   There should be no need to change this.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
