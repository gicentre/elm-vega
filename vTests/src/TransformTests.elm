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
                << dataColumn "id" (vStrs [ "A", "B", "C", "D", "E" ])
                << dataColumn "parent" (vStrs [ "", "A", "A", "C", "C" ])
                << dataColumn "value" (vNumbers [ 0, 1, 0, 1, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStratify "id" "parent"
                        , TPack
                            [ PaField "value"
                            , PaPadding (SigNumRef "padding between circles")
                            , PaSize sigWidth sigHeight
                            ]
                        ]
                ]

        si =
            signals
                << signal "padding between circles"
                    [ SiValue (vNumber 0)
                    , SiBind (IRange [ InMin 0, InMax 10, InStep 0.1 ])
                    ]

        sc =
            scales
                << scale "color"
                    [ SType ScOrdinal
                    , SRange (RScheme "category20" [])
                    ]

        mk =
            marks
                << mark Symbol
                    [ MFrom [ SData "tree" ]
                    , MEncode
                        [ Enter
                            [ MFill [ vScale (FName "color"), vField (FName "id") ]
                            , MStroke [ vStr "white" ]
                            ]
                        , Update
                            [ MX [ vField (FName "x") ]
                            , MY [ vField (FName "y") ]
                            , MSize [ vSignal "4*datum.r*datum.r" ]
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
                << dataColumn "key" (vStrs [ "a", "a", "a", "b", "b", "b", "c", "c", "c" ])
                << dataColumn "value" (vNumbers [ 5, 8, 3, 2, 7, 4, 1, 4, 6 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStack
                            [ StField "value"
                            , StGroupBy [ "key" ]
                            , StOffset (OffsetSignal "offset")
                            , StSort [ CoField [ "sortField" ], CoOrder [ OrderSignal "sortOrder" ] ]
                            ]
                        ]
                    |> on
                        [ trigger "add" [ TrInsert "add" ]
                        , trigger "rem" [ TrRemove "rem" ]
                        ]
                ]

        si =
            signals
                << signal "offset"
                    [ SiValue (vStr "zero")
                    , SiBind (ISelect [ InOptions (vStrs [ "zero", "center", "normalize" ]) ])
                    ]
                << signal "sortField"
                    [ SiValue vNull
                    , SiBind (IRadio [ InOptions (vStrs [ "null", "value" ]) ])
                    ]
                << signal "sortOrder"
                    [ SiValue (vStr "ascending")
                    , SiBind (IRadio [ InOptions (vStrs [ "ascending", "descending" ]) ])
                    ]
                << signal "add"
                    [ SiValue (vObject [])
                    , SiOn
                        [ [ EEvents "mousedown![!event.shiftKey]"
                          , EUpdate "{key: invert('xscale', x()), value: ~~(1 + 9 * random())}"
                          ]
                        ]
                    ]
                << signal "rem"
                    [ SiValue (vObject [])
                    , SiOn
                        [ [ EEvents "rect:mousedown![event.shiftKey]"
                          , EUpdate "datum"
                          ]
                        ]
                    ]

        sc =
            scales
                << scale "xscale"
                    [ SType ScBand
                    , SDomain (DStrings [ "a", "b", "c" ])
                    , SRange (RDefault RWidth)
                    ]
                << scale "yscale"
                    [ SType ScLinear
                    , SDomain (DData [ dDataset "table", dField (vStr "y1") ])
                    , SRange (RDefault RHeight)
                    , SRound True
                    ]
                << scale "color"
                    [ SType ScOrdinal
                    , SRange (RScheme "category10" [])
                    ]

        mk =
            marks
                << mark Rect
                    [ MFrom [ SData "table" ]
                    , MEncode
                        [ Enter
                            [ MFill [ vScale (FName "color"), vField (FName "key") ]
                            , MStroke [ vStr "white" ]
                            , MStrokeWidth [ vNumber 1 ]
                            , MX [ vScale (FName "xscale"), vField (FName "key"), vOffset (vNumber 0.5) ]
                            , MWidth [ vScale (FName "xscale"), vBand 1 ]
                            ]
                        , Update
                            [ MY [ vScale (FName "yscale"), vField (FName "y0"), vOffset (vNumber 0.5) ]
                            , MY2 [ vScale (FName "yscale"), vField (FName "y1"), vOffset (vNumber 0.5) ]
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
