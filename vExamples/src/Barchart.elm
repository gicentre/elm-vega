port module Barchart exposing (elmToJS)

import Platform
import Vega exposing (..)


barchart : Spec
barchart =
    let
        ds =
            let
                table =
                    dataFromColumns "table" []
                        << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                        << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
            in
            dataSource [ table [] ]

        si =
            signals
                << signal "myTooltip"
                    [ siValue (vStr "")
                    , siOn
                        [ evHandler [ esObject [ esMark Rect, esType MouseOver ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esMark Rect, esType MouseOut ] ] [ evUpdate "" ]
                        ]
                    ]

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
                        , enUpdate
                            [ maFill [ vStr "steelblue" ] ]
                        , enHover
                            [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            , maFill [ vStr "grey" ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "myTooltip.category", vBand (num 0.5) ]
                            , maY [ vScale "yScale", vSignal "myTooltip.amount", vOffset (vNum -2) ]
                            , maText [ vSignal "myTooltip.amount" ]
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
