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
                << dataColumn "id" (Strings [ "A", "B", "C", "D", "E" ])
                << dataColumn "parent" (Strings [ "", "A", "A", "C", "C" ])
                << dataColumn "value" (Numbers [ 0, 1, 0, 1, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStratify (FieldName "id") (FieldName "parent")
                        , TPack
                            [ PaField (FieldName "value")
                            , PaPadding (SigNumRef (SName "padding between circles"))
                            , PaSize sigWidth sigHeight
                            ]
                        ]
                ]

        si =
            signals
                << signal "padding between circles"
                    [ SiValue (Number 0)
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
                            [ MFill [ VScale (FName "color"), VField (FName "id") ]
                            , MStroke [ VString "white" ]
                            ]
                        , Update
                            [ MX [ VField (FName "x") ]
                            , MY [ VField (FName "y") ]
                            , MSize [ VSignal (SExpr "4*datum.r*datum.r") ]
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
                << dataColumn "key" (Strings [ "a", "a", "a", "b", "b", "b", "c", "c", "c" ])
                << dataColumn "value" (Numbers [ 5, 8, 3, 2, 7, 4, 1, 4, 6 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ TStack
                            [ StField (FieldName "value")
                            , StGroupBy [ FieldName "key" ]
                            , StOffset (OffsetSignal "offset")
                            , StSort [ CoField [ FieldSignal "sortField" ], CoOrder [ OrderSignal "sortOrder" ] ]
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
                    [ SiValue (Str "zero")
                    , SiBind (ISelect [ InOptions (Strings [ "zero", "center", "normalize" ]) ])
                    ]
                << signal "sortField"
                    [ SiValue Null
                    , SiBind (IRadio [ InOptions (Strings [ "null", "value" ]) ])
                    ]
                << signal "sortOrder"
                    [ SiValue (Str "ascending")
                    , SiBind (IRadio [ InOptions (Strings [ "ascending", "descending" ]) ])
                    ]
                << signal "add"
                    [ SiValue Empty
                    , SiOn
                        [ [ EEvents "mousedown![!event.shiftKey]"
                          , EUpdate "{key: invert('xscale', x()), value: ~~(1 + 9 * random())}"
                          ]
                        ]
                    ]
                << signal "rem"
                    [ SiValue Empty
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
                    , SDomain (DData [ DDataset "table", DField (VString "y1") ])
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
                            [ MFill [ VScale (FName "color"), VField (FName "key") ]
                            , MStroke [ VString "white" ]
                            , MStrokeWidth [ VNumber 1 ]
                            , MX [ VScale (FName "xscale"), VField (FName "key"), VOffset (VNumber 0.5) ]
                            , MWidth [ VScale (FName "xscale"), VBand 1 ]
                            ]
                        , Update
                            [ MY [ VScale (FName "yscale"), VField (FName "y0"), VOffset (VNumber 0.5) ]
                            , MY2 [ VScale (FName "yscale"), VField (FName "y1"), VOffset (VNumber 0.5) ]
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
