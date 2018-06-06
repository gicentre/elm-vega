port module HelloWorld exposing (elmToJS)

import Platform
import Vega exposing (..)


helloWorld : Spec
helloWorld =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "label" (daStrs [ "Hello", "from", "elm-vega" ])
                << dataColumn "x" (daNums [ 1, 2, 3 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scDomain (doData [ daDataset "table", daField (field "x") ])
                    , scRange (raDefault RWidth)
                    ]

        mk =
            marks
                << mark Text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (field "xscale"), vField (field "x") ]
                            , maText [ vField (field "label") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 100, ds, sc [], mk [] ]



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


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
