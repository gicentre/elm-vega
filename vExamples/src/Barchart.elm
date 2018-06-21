port module Barchart exposing (elmToJS)

import Platform
import Vega exposing (..)


barchart : Spec
barchart =
    let
        ds =
            let
                -- table =
                --     dataFromColumns "table" []
                --         << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                --         << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
                table =
                    dataFromRows "table" []
                        << dataRow [ ( "category", vStr "A" ), ( "amount", vNum 28 ) ]
                        << dataRow [ ( "category", vStr "B" ), ( "amount", vNum 55 ) ]
                        << dataRow [ ( "category", vStr "C" ), ( "amount", vNum 43 ) ]
                        << dataRow [ ( "category", vStr "D" ), ( "amount", vNum 91 ) ]
                        << dataRow [ ( "category", vStr "E" ), ( "amount", vNum 81 ) ]
                        << dataRow [ ( "category", vStr "F" ), ( "amount", vNum 53 ) ]
                        << dataRow [ ( "category", vStr "G" ), ( "amount", vNum 19 ) ]
                        << dataRow [ ( "category", vStr "H" ), ( "amount", vNum 87 ) ]
            in
            dataSource [ table [] ]

        si =
            signals

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange RaWidth
                    , scPadding (num 0.05)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scRange RaHeight
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        ]
                    ]
    in
    toVega [ width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]



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
