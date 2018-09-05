port module EventTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



{- These tests converted from the examples under 'Marks' on the offical Vega site:
   https://vega.github.io/vega/docs/marks/
-}


uiEvents : Spec
uiEvents =
    let
        si =
            signals
                << signal "rSize" [ siValue (vNum 100), siBind (iRange [ inMin 1, inMax 400 ]) ]
                << signal "rColor" [ siValue (vStr "red"), siBind (iRadio [ inOptions (vStrs [ "red", "blue", "black" ]) ]) ]
                << signal "borderColor" [ siValue black, siBind (iColor []) ]
                << signal "rFill" [ siValue vFalse, siBind (iCheckbox []) ]
                << signal "rLabel" [ siValue (vStr ""), siBind (iText [ inPlaceholder "Type label here" ]) ]
                << signal "labelSize" [ siValue (vNum 10), siBind (iNumber []) ]
                << signal "borderWidth" [ siValue (vStr "medium"), siBind (iSelect [ inOptions (vStrs [ "thin", "medium", "thick" ]) ]) ]
                << signal "timestamp" [ siValue (vStr "12:00"), siBind (iTime []) ]

        mk =
            marks
                << mark rect
                    [ mEncode
                        [ enUpdate
                            [ maFillOpacity [ vSignal "rFill ? 1 : 0" ]
                            , maFill [ vSignal "rColor" ]
                            , maStroke [ vSignal "borderColor" ]
                            , maStrokeWidth [ vSignal "borderWidth == 'thin' ? 1 : borderWidth == 'medium' ? 4 : 10" ]
                            , maWidth [ vSignal "rSize" ]
                            , maHeight [ vSignal "rSize" ]
                            ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter [ maAlign [ hCenter ] ]
                        , enUpdate
                            [ maX [ vSignal "rSize / 2" ]
                            , maY [ vSignal "rSize / 2" ]
                            , maText [ vSignal "rLabel +' '+ timestamp" ]
                            , maFill [ vSignal "rColor == 'black' && rFill ? 'white' : 'black'" ]
                            , maFontSize [ vSignal "labelSize" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 400, padding 5, si [], mk [] ]


eventStream1 : Spec
eventStream1 =
    let
        si =
            signals
                << signal "myDrag"
                    [ siValue (vNums [ 200, 200 ])
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esBetween [ esMark rect, esType etMouseDown ] [ esSource esView, esType etMouseUp ]
                                , esSource esView
                                , esType etMouseMove
                                ]
                            ]
                            [ evUpdate "xy()" ]
                        ]
                    ]

        mk =
            marks
                << mark rect
                    [ mEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maWidth [ vNum 80 ], maHeight [ vNum 50 ] ]
                        , enUpdate [ maX [ vSignal "myDrag[0]" ], maY [ vSignal "myDrag[1]" ] ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vMiddle ]
                            , maFill [ white ]
                            , maText [ vStr "Drag me" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "myDrag[0]+40" ]
                            , maY [ vSignal "myDrag[1]+25" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 400, background (str "rgb(252,247,236)"), padding 5, si [], mk [] ]


sourceExample : Spec
sourceExample =
    eventStream1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "uiEvents", uiEvents )
        , ( "eventStream1", eventStream1 )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program () Spec msg
main =
    Browser.element
        { init = always ( mySpecs, elmToJS mySpecs )
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
