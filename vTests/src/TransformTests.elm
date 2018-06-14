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
                        [ trStratify (field "id") (field "parent")
                        , trPack
                            [ paField (field "value")
                            , paPadding (numSignal "padding between circles")
                            , paSize (numSignals [ "width", "height" ])
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
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raScheme (str "category20") [])
                    ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "id") ]
                            , maStroke [ vStr "white" ]
                            ]
                        , enUpdate
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            , maSize [ vSignal "4*datum.r*datum.r" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 300, height 200, padding 5, ds, si [], sc [], mk [] ]


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
                        [ trStack
                            [ stField (field "value")
                            , stGroupBy [ field "key" ]
                            , stOffset (ofSignal "offset")
                            , stSort [ ( fSignal "sortField", orSignal "sortOrder" ) ]
                            ]
                        ]
                    |> on
                        [ trigger "add" [ tgInsert "add" ]
                        , trigger "rem" [ tgRemove "rem" ]
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
                    , siOn
                        [ evHandler
                            (esObject
                                [ esType MouseDown
                                , esConsume True
                                , esFilter [ "!event.shiftKey" ]
                                ]
                            )
                            [ evUpdate "{key: invert('xScale', x()), value: ~~(1 + 9 * random())}" ]
                        ]
                    ]
                << signal "rem"
                    [ siValue (vObject [])
                    , siOn
                        [ evHandler
                            (esObject
                                [ esMark Rect
                                , esType MouseDown
                                , esConsume True
                                , esFilter [ "event.shiftKey" ]
                                ]
                            )
                            [ evUpdate "datum" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doStrs (strs [ "a", "b", "c" ]))
                    , scRange RaWidth
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (field "y1") ])
                    , scRange RaHeight
                    , scRound (boo True)
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raScheme (str "category10") [])
                    ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "key") ]
                            , maStroke [ vStr "white" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maX [ vScale "xScale", vField (field "key"), vOffset (vNum 0.5) ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            ]
                        , enUpdate
                            [ maY [ vScale "yScale", vField (field "y0"), vOffset (vNum 0.5) ]
                            , maY2 [ vScale "yScale", vField (field "y1"), vOffset (vNum 0.5) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 300, height 200, autosize [ ANone ], ds, si [], sc [], mk [] ]


forceTest1 : Spec
forceTest1 =
    let
        ds =
            dataSource
                [ data "node-data"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat [ jsonProperty "nodes" ]
                    ]
                , data "link-data"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat [ jsonProperty "links" ]
                    ]
                ]

        si =
            signals
                << signal "cx" [ siUpdate "width /2" ]
                << signal "cy" [ siUpdate "height /2" ]
                << signal "collideRadius"
                    [ siValue (vNum 5)
                    , siBind (iRange [ inMin 3, inMax 20, inStep 1 ])
                    ]
                << signal "nbodyStrength"
                    [ siValue (vNum -10)
                    , siBind (iRange [ inMin -50, inMax 10, inStep 1 ])
                    ]
                << signal "linkDistance"
                    [ siValue (vNum 15)
                    , siBind (iRange [ inMin 5, inMax 100, inStep 1 ])
                    ]
                << signal "velocityDecay"
                    [ siValue (vNum 0.4)
                    , siBind (iRange [ inMin 0, inMax 1, inStep 0.01 ])
                    ]
                << signal "static"
                    [ siValue (vBoo True)
                    , siBind (iCheckbox [])
                    ]
                << signal "fix"
                    [ siDescription "State variable for active node fix status."
                    , siValue (vNum 0)
                    , siOn
                        [ evHandler
                            (esMerge
                                [ esObject [ esMark Symbol, esType MouseOut, esFilter [ "!event.buttons" ] ]
                                , esObject [ esSource ESWindow, esType MouseUp ]
                                ]
                            )
                            [ evUpdate "0" ]
                        , evHandler (esObject [ esMark Symbol, esType MouseOver ]) [ evUpdate "fix || 1" ]
                        , evHandler
                            (esObject
                                [ esBetween [ esMark Symbol, esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                , esConsume True
                                ]
                            )
                            [ evUpdate "2", evForce True ]
                        ]
                    ]
                << signal "node"
                    [ siDescription "Graph node most recently interacted with."
                    , siValue vNull
                    , siOn [ evHandler (esObject [ esMark Symbol, esType MouseOver ]) [ evUpdate "fix === 1 ? item() : node" ] ]
                    ]
                << signal "restart"
                    [ siDescription "Flag to restart Force simulation upon data changes."
                    , siValue (vBoo False)
                    , siOn [ evHandler (esSelector (strSignal "fix")) [ evUpdate "fix > 1 " ] ]
                    ]

        sc =
            scales << scale "cScale" [ scType ScOrdinal, scRange (raScheme (str "category20c") []) ]

        mk =
            marks
                << mark Symbol
                    [ mName "nodes"
                    , mFrom [ srData (str "node-data") ]
                    , mOn
                        [ trigger "fix" [ tgModifyValues "node" "fix === 1 ? {fx:node.x, fy:node.y} : {fx:x(), fy:y()}" ]
                        , trigger "!fix" [ tgModifyValues "node" "{fx: null, fy: null}" ]
                        ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "group") ]
                            , maStroke [ vStr "white" ]
                            ]
                        , enUpdate
                            [ maSize [ vSignal "2 * collideRadius * collideRadius" ]
                            , maCursor [ vStr (cursorLabel CPointer) ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsIterations (num 300)
                            , fsVelocityDecay (numSignal "velocityDecay")
                            , fsRestart (booSignal "restart")
                            , fsStatic (booSignal "static")
                            , fsForces
                                [ foCenter (numSignal "cx") (numSignal "cy")
                                , foCollide (numSignal "collideRadius") []
                                , foNBody [ fpStrength (numSignal "nbodyStrength") ]
                                , foLink "link-data" [ fpDistance (numSignal "linkDistance") ]
                                ]
                            ]
                        ]
                    ]
                << mark Path
                    [ mFrom [ srData (str "link-data") ]
                    , mInteractive (boo False)
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#ccc" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mTransform
                        [ trLinkPath
                            [ lpShape (str (linkShapeLabel LinkDiagonal))
                            , lpSourceX (field "datum.source.x")
                            , lpSourceY (field "datum.source.y")
                            , lpTargetX (field "datum.target.x")
                            , lpTargetY (field "datum.target.y")
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 275, autosize [ ANone ], ds, si [], sc [], mk [] ]


sourceExample : Spec
sourceExample =
    forceTest1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "packTest1", packTest1 )
        , ( "stackTest1", stackTest1 )
        , ( "forceTest1", forceTest1 )
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
