port module ApacheArrow exposing (elmToJS)

import Platform
import Vega exposing (..)


dPath : String
dPath =
    "https://cdn.jsdelivr.net/npm/vega-datasets@2.1/data/"


arrow1 : Spec
arrow1 =
    let
        ds =
            dataSource
                [ data "flights"
                    [ daUrl (str (dPath ++ "flights-200k.arrow")), daFormat [ arrow ] ]
                    |> transform
                        [ trExtentAsSignal (fSignal "field") "extent"
                        , trBin (fSignal "field") (numSignal "extent") [ bnMaxBins (numSignal "maxbins") ]
                        , trAggregate
                            [ agFields [ field "bin0" ]
                            , agOps [ opCount ]
                            , agAs [ "count" ]
                            , agKey (field "bin0")
                            , agGroupBy [ field "bin0", field "bin1" ]
                            ]
                        ]
                ]

        si =
            signals
                << signal "field" [ siValue (vStr "delay"), siBind (iSelect [ inOptions (vStrs [ "delay", "distance", "time" ]) ]) ]
                << signal "maxbins" [ siValue (vNum 50), siBind (iSelect [ inOptions (vNums [ 10, 20, 50, 200 ]) ]) ]

        sc =
            scales
                << scale "xScale"
                    [ scDomain (doData [ daDataset "flights", daFields [ field "bin0", field "bin1" ] ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "flights", daField (field "count") ])
                    , scRange raHeight
                    , scNice niTrue
                    ]

        ax =
            axes
                << axis "xScale" siBottom []
                << axis "yScale" siLeft [ axTitle (str "Number of Records"), axTitlePadding (vNum 8) ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "flights") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "bin0") ]
                            , maX2 [ vScale "xScale", vField (field "bin1"), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "count") ]
                            , maY2 [ vScale "yScale", vNum 1 ]
                            , maFill [ vStr "steelblue" ]
                            , maTooltip [ vSignal "field + ' [' + format(datum.bin0, '.1f') + ', ' + format(datum.bin1, '.1f') + '): ' + format(datum.count, ',')" ]
                            ]
                        ]
                    ]
    in
    toVega [ width 600, height 200, padding 5, autosize [ asFit, asPadding ], ds, si [], sc [], ax [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "arrow1", arrow1 ) ]



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
