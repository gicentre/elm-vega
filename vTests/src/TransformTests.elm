port module TransformTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


packTest1 : Spec
packTest1 =
    let
        table =
            dataFromColumns "tree" []
                << dataColumn "id" (daStrs [ "A", "B", "C", "D", "E" ])
                << dataColumn "parent" (daStrs [ "", "A", "A", "C", "C" ])
                << dataColumn "value" (daNums [ 0, 1, 0, 1, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStratify "id" "parent"
                        , TPack
                            [ paField "value"
                            , paPadding (numSignal "padding between circles")
                            , paSize sigWidth sigHeight
                            ]
                        ]
                ]

        si =
            signals
                << signal "padding between circles"
                    [ siValue (vNum 0)
                    , siBind (iRange [ inMin 0, inMax 10, inStep 0.1 ])
                    ]

        sc =
            scales
                << scale "color"
                    [ scType ScOrdinal
                    , scRange (raScheme "category20" [])
                    ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale (fName "color"), vField (fName "id") ]
                            , maStroke [ vStr "white" ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maSize [ vSignal "4*datum.r*datum.r" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 300, height 200, padding (PSize 5), ds, si [], sc [], mk [] ]


stackTest1 : Spec
stackTest1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "key" (daStrs [ "a", "a", "a", "b", "b", "b", "c", "c", "c" ])
                << dataColumn "value" (daNums [ 5, 8, 3, 2, 7, 4, 1, 4, 6 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStack
                            [ stField "value"
                            , stGroupBy [ "key" ]
                            , stOffset (ofSignal "offset")
                            , stSort [ coField [ "sortField" ], coOrder [ orSignal "sortOrder" ] ]
                            ]
                        ]
                    |> on
                        [ trigger "add" [ trInsert "add" ]
                        , trigger "rem" [ trRemove "rem" ]
                        ]
                ]

        si =
            signals
                << signal "offset"
                    [ siValue (vStr "zero")
                    , siBind (iSelect [ inOptions (vStrs [ "zero", "center", "normalize" ]) ])
                    ]
                << signal "sortField"
                    [ siValue vNull
                    , siBind (iRadio [ inOptions (vStrs [ "null", "value" ]) ])
                    ]
                << signal "sortOrder"
                    [ siValue (vStr "ascending")
                    , siBind (iRadio [ inOptions (vStrs [ "ascending", "descending" ]) ])
                    ]
                << signal "add"
                    [ siValue (vObject [])
                    , siOn [ eventHandler "mousedown![!event.shiftKey]" [ eUpdate "{key: invert('xscale', x()), value: ~~(1 + 9 * random())}" ] ]
                    ]
                << signal "rem"
                    [ siValue (vObject [])
                    , siOn [ eventHandler "rect:mousedown![event.shiftKey]" [ eUpdate "datum" ] ]
                    ]

        sc =
            scales
                << scale "xscale"
                    [ scType ScBand
                    , scDomain (doStrs (strs [ "a", "b", "c" ]))
                    , scRange (raDefault RWidth)
                    ]
                << scale "yscale"
                    [ scType ScLinear
                    , scDomain (doData [ dDataset "table", dField (str "y1") ])
                    , scRange (raDefault RHeight)
                    , scRound (boolean True)
                    ]
                << scale "color"
                    [ scType ScOrdinal
                    , scRange (raScheme "category10" [])
                    ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale (fName "color"), vField (fName "key") ]
                            , maStroke [ vStr "white" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maX [ vScale (fName "xscale"), vField (fName "key"), vOffset (vNum 0.5) ]
                            , maWidth [ vScale (fName "xscale"), vBand 1 ]
                            ]
                        , enUpdate
                            [ maY [ vScale (fName "yscale"), vField (fName "y0"), vOffset (vNum 0.5) ]
                            , maY2 [ vScale (fName "yscale"), vField (fName "y1"), vOffset (vNum 0.5) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 300, height 200, autosize [ ANone ], ds, si [], sc [], mk [] ]


sourceExample : Spec
sourceExample =
    packTest1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "packTest1", packTest1 )
        , ( "stackTest1", stackTest1 )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program Never Spec msg
main =
    Html.program
        { init = ( mySpecs, elmToJS mySpecs )
        , view = view
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }



-- View


view : Spec -> Html msg
view spec =
    div []
        [ div [ id "specSource" ] []
        , pre []
            [ Html.text (Json.Encode.encode 2 sourceExample) ]
        ]


port elmToJS : Spec -> Cmd msg
