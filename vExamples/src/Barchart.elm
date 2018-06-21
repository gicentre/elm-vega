port module Barchart exposing (elmToJS)

import Platform
import Vega exposing (..)


barchart : Spec
barchart =
    let
        ds =
            dataSource []

        si =
            signals

        sc =
            scales

        ax =
            axes

        mk =
            marks
    in
    toVega [ width 400, height 200, background (str "linen"), padding 5, ds, si [], sc [], ax [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime.
   In this example, only a single spec 'helloWord' is provided.
-}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "barchart", barchart ) ]



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
