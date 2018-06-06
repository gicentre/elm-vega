port module GalleryNetwork exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


bundle1 : Spec
bundle1 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl "https://vega.github.io/vega/data/flare.json" ]
                    |> transform
                        [ trStratify (field "id") (field "parent")
                        , trTree
                            [ teMethod (teMethodSignal "layout")
                            , teSize (nums [ 1, 1 ])
                            , teAs "alpha" "beta" "depth" "children"
                            ]
                        , trFormula "(rotate + extent * datum.alpha + 270) % 360" "angle" AlwaysUpdate
                        , trFormula "inrange(datum.angle, [90, 270])" "leftside" AlwaysUpdate
                        , trFormula "originX + radius * datum.beta * cos(PI * datum.angle / 180)" "x" AlwaysUpdate
                        , trFormula "originY + radius * datum.beta * sin(PI * datum.angle / 180)" "y" AlwaysUpdate
                        ]
                , data "leaves" [ daSource "tree" ]
                    |> transform [ trFilter (expr "!datum.children") ]
                , data "dependencies" [ daUrl "https://vega.github.io/vega/data/flare-dependencies.json" ]
                    |> transform
                        [ trFormula "treePath('tree', datum.source, datum.target)" "treepath" InitOnly ]
                , data "selected" [ daSource "dependencies" ]
                    |> transform [ trFilter (expr "datum.source === active || datum.target === active") ]
                ]

        si =
            signals
                << signal "tension" [ siValue (vNum 0.85), siBind (iRange [ inMin 0, inMax 1, inStep 0.01 ]) ]
                << signal "radius" [ siValue (vNum 280), siBind (iRange [ inMin 20, inMax 400 ]) ]
                << signal "extent" [ siValue (vNum 360), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "rotate" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "textSize" [ siValue (vNum 8), siBind (iRange [ inMin 2, inMax 20, inStep 1 ]) ]
                << signal "textOffset" [ siValue (vNum 2), siBind (iRange [ inMin 0, inMax 10, inStep 1 ]) ]
                << signal "layout" [ siValue (vStr "cluster"), siBind (iRadio [ inOptions (vStrs [ "tidy", "cluster" ]) ]) ]
                << signal "colorIn" [ siValue (vStr "firebrick") ]
                << signal "colorOut" [ siValue (vStr "forestgreen") ]
                << signal "originX" [ siUpdate "width / 2" ]
                << signal "originY" [ siUpdate "height / 2" ]
                << signal "active"
                    [ siValue vNull
                    , siOn
                        [ evHandler (esObject [ esMark Text, esType MouseOver ]) [ evUpdate "datum.id" ]
                        , evHandler (esObject [ esType MouseOver, esFilter [ "!event.item" ] ]) [ evUpdate "null" ]
                        ]
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "depends on", "imported by" ]))
                    , scRange (raValues [ vSignal "colorIn", vSignal "colorOut" ])
                    ]

        le =
            legends
                << legend
                    [ leStroke "cScale"
                    , leOrient BottomRight
                    , leTitle "Dependencies"
                    , leEncode [ enSymbols [ enEnter [ maShape [ vStr "M-0.5,0H1" ] ] ] ]
                    ]

        mk =
            marks
                << mark Text
                    [ mFrom [ srData (str "leaves") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (field "name") ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        , enUpdate
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            , maDx [ vSignal "textOffset * (datum.leftside ? -1 : 1)" ]
                            , maAngle [ vSignal "datum.leftside ? datum.angle - 180 : datum.angle" ]
                            , maAlign [ vSignal "datum.leftside ? 'right' : 'left'" ]
                            , maFontSize [ vSignal "textSize" ]
                            , maFontWeight
                                [ ifElse "indata('selected', 'source', datum.id)"
                                    [ vStr "bold" ]
                                    [ ifElse "indata('selected', 'target', datum.id)"
                                        [ vStr "bold" ]
                                        [ vNull ]
                                    ]
                                ]
                            , maFill
                                [ ifElse "datum.id === active"
                                    [ vStr "black" ]
                                    [ ifElse "indata('selected', 'source', datum.id)"
                                        [ vSignal "colorIn" ]
                                        [ ifElse "indata('selected', 'target', datum.id)"
                                            [ vSignal "colorOut" ]
                                            [ vStr "black" ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                << mark Group
                    [ mFrom [ srFacet "dependencies" "path" [ faField "treepath" ] ]
                    , mGroup [ nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Line
                    [ mInteractive (boo False)
                    , mFrom [ srData (str "path") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationLabel Bundle |> vStr ]
                            , maStrokeWidth [ vNum 1.5 ]
                            ]
                        , enUpdate
                            [ maStroke
                                [ ifElse "parent.source === active"
                                    [ vSignal "colorOut" ]
                                    [ ifElse "parent.target === active"
                                        [ vSignal "colorIn" ]
                                        [ vStr "steelblue" ]
                                    ]
                                ]
                            , maStrokeOpacity
                                [ ifElse "parent.source === active || parent.target === active"
                                    [ vNum 1 ]
                                    [ vNum 0.2 ]
                                ]
                            , maTension [ vSignal "tension" ]
                            , maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 720, height 720, padding 5, autosize [ ANone ], ds, si [], sc [], le [], mk [] ]


force1 : Spec
force1 =
    let
        ds =
            dataSource
                [ data "node-data"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "nodes")
                    ]
                , data "link-data"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "links")
                    ]
                ]

        si =
            signals
                << signal "cx" [ siUpdate "width /2" ]
                << signal "cy" [ siUpdate "height /2" ]
                << signal "nodeRadius" [ siValue (vNum 8), siBind (iRange [ inMin 1, inMax 50, inStep 1 ]) ]
                << signal "nodeCharge" [ siValue (vNum -30), siBind (iRange [ inMin -100, inMax 10, inStep 1 ]) ]
                << signal "linkDistance" [ siValue (vNum 30), siBind (iRange [ inMin 5, inMax 100, inStep 1 ]) ]
                << signal "static" [ siValue (vBoo True), siBind (iCheckbox []) ]
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
            scales << scale "cScale" [ scType ScOrdinal, scRange (raScheme "category20c" []) ]

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
                            [ maFill [ vScale (field "cScale"), vField (field "group") ]
                            , maStroke [ vStr "white" ]
                            ]
                        , enUpdate
                            [ maSize [ vSignal "2 * nodeRadius * nodeRadius" ]
                            , maCursor [ vStr (cursorLabel CPointer) ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsIterations (num 300)
                            , fsRestart (booSignal "restart")
                            , fsStatic (booSignal "static")
                            , fsForces
                                [ foCenter (numSignal "cx") (numSignal "cy")
                                , foCollide (numSignal "nodeRadius") []
                                , foNBody [ fpStrength (numSignal "nodeCharge") ]
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
                            [ lpShape (str (linkShapeLabel LinkLine))
                            , lpSourceX (field "datum.source.x")
                            , lpSourceY (field "datum.source.y")
                            , lpTargetX (field "datum.target.x")
                            , lpTargetY (field "datum.target.y")
                            ]
                        ]
                    ]
    in
    toVega
        [ width 700, height 500, padding 0, autosize [ ANone ], ds, si [], sc [], mk [] ]


matrix1 : Spec
matrix1 =
    let
        ds =
            dataSource
                [ data "nodes"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "nodes")
                    ]
                    |> transform
                        [ trFormula "datum.group" "order" AlwaysUpdate
                        , trFormula "dest >= 0 && datum === src ? dest : datum.order" "score" AlwaysUpdate
                        , trWindow [ wnOperation RowNumber "order" ] [ wnSort [ ( field "score", Ascend ) ] ]
                        ]
                , data "edges"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "links")
                    ]
                    |> transform
                        [ trLookup "nodes" (field "index") [ field "source", field "target" ] [ luAs [ "sourceNode", "targetNode" ] ]
                        , trFormula "datum.sourceNode.group === datum.targetNode.group ? datum.sourceNode.group : count" "group" AlwaysUpdate
                        ]
                , data "cross" [ daSource "nodes" ] |> transform [ trCross [] ]
                ]

        si =
            signals
                << signal "cellSize" [ siValue (vNum 10) ]
                << signal "count" [ siUpdate "length(data('nodes'))" ]
                << signal "width" [ siUpdate "span(range('position'))" ]
                << signal "height" [ siUpdate "width" ]
                << signal "src"
                    [ siValue (vObject [])
                    , siOn
                        [ evHandler (esObject [ esMark Text, esType MouseDown ]) [ evUpdate "datum" ]
                        , evHandler (esObject [ esType MouseUp ]) [ evUpdate "{}" ]
                        ]
                    ]
                << signal "dest"
                    [ siValue (vNum -1)
                    , siOn
                        [ evHandler
                            (esObject
                                [ esBetween [ esMarkName "columns", esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                ]
                            )
                            [ evUpdate "src.name && datum !== src ? (0.5 + count * clamp(x(), 0, width) / width) : dest" ]
                        , evHandler
                            (esObject
                                [ esBetween [ esMarkName "rows", esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                ]
                            )
                            [ evUpdate "src.name && datum !== src ? (0.5 + count * clamp(y(), 0, height) / height) : dest" ]
                        ]
                    ]

        sc =
            scales
                << scale "position"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "nodes", daField (field "order"), daSort [] ])
                    , scRange (raStep (vSignal "cellSize"))
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain
                        (doData
                            [ daReferences [ [ daDataset "nodes", daField (field "group") ], [ daSignal "count" ] ]
                            , daSort []
                            ]
                        )
                    ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "cross") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (field "position"), vField (field "a.order") ]
                            , maY [ vScale (field "position"), vField (field "b.order") ]
                            , maWidth [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ ifElse "datum.a === src || datum.b === src" [ vStr "#ddd" ] [ vStr "#f5f5f5" ] ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (field "position"), vField (field "sourceNode.order") ]
                            , maY [ vScale (field "position"), vField (field "targetNode.order") ]
                            , maWidth [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ vScale (field "cScale"), vField (field "group") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maY [ vScale (field "position"), vField (field "sourceNode.order") ]
                            , maX [ vScale (field "position"), vField (field "targetNode.order") ]
                            , maWidth [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale (field "position"), vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ vScale (field "cScale"), vField (field "group") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mName "columns"
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (field "position"), vField (field "order"), vBand (num 1) ]
                            , maY [ vOffset (vNum -2) ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 10 ]
                            , maAngle [ vNum -90 ]
                            , maAlign [ vStr (hAlignLabel AlignLeft) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maFill [ ifElse "datum === src" [ vStr "steelblue" ] [ vStr "black" ] ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mName "rows"
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maY [ vScale (field "position"), vField (field "order"), vBand (num 0.5) ]
                            , maX [ vOffset (vNum -2) ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 10 ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maFill [ ifElse "datum === src" [ vStr "steelblue" ] [ vStr "black" ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 720, height 720, padding 5, ds, si [], sc [], mk [] ]


arc1 : Spec
arc1 =
    let
        ds =
            dataSource
                [ data "edges"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "links")
                    ]
                , data "sourceDegree" [ daSource "edges" ]
                    |> transform [ trAggregate [ agGroupBy [ field "source" ] ] ]
                , data "targetDegree" [ daSource "edges" ]
                    |> transform [ trAggregate [ agGroupBy [ field "target" ] ] ]
                , data "nodes"
                    [ daUrl "https://vega.github.io/vega/data/miserables.json"
                    , daFormat (jsonProperty "nodes")
                    ]
                    |> transform
                        [ trWindow [ wnOperation Rank "order" ] []
                        , trLookup "sourceDegree"
                            (field "source")
                            [ field "index" ]
                            [ luAs [ "sourceDegree" ], luDefault (vObject [ keyValue "count" (vNum 0) ]) ]
                        , trLookup "targetDegree"
                            (field "target")
                            [ field "index" ]
                            [ luAs [ "targetDegree" ], luDefault (vObject [ keyValue "count" (vNum 0) ]) ]
                        , trFormula "datum.sourceDegree.count + datum.targetDegree.count" "degree" AlwaysUpdate
                        ]
                ]

        sc =
            scales
                << scale "position"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "nodes", daField (field "order"), daSort [] ])
                    , scRange (raDefault RWidth)
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raDefault RCategory)
                    , scDomain (doData [ daDataset "nodes", daField (field "group") ])
                    ]

        mk =
            marks
                << mark Symbol
                    [ mName "layout"
                    , mInteractive (boo False)
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enEnter [ maOpacity [ vNum 0 ] ]
                        , enUpdate
                            [ maX [ vScale (field "position"), vField (field "order") ]
                            , maY [ vNum 0 ]
                            , maSize [ vField (field "degree"), vMultiply (vNum 5), vOffset (vNum 10) ]
                            , maFill [ vScale (field "cScale"), vField (field "group") ]
                            ]
                        ]
                    ]
                << mark Path
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "black" ]
                            , maStrokeOpacity [ vNum 0.2 ]
                            , maStrokeWidth [ vField (field "value") ]
                            ]
                        ]
                    , mTransform
                        [ trLookup "layout"
                            (field "datum.index")
                            [ field "datum.source", field "datum.target" ]
                            [ luAs [ "sourceNode", "targetNode" ] ]
                        , trLinkPath
                            [ lpSourceX (fExpr "min(datum.sourceNode.x, datum.targetNode.x)")
                            , lpTargetX (fExpr "max(datum.sourceNode.x, datum.targetNode.x)")
                            , lpSourceY (fExpr "0")
                            , lpTargetY (fExpr "0")
                            , lpShape (linkShapeLabel LinkArc |> str)
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "layout") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            , maFill [ vField (field "fill") ]
                            , maSize [ vField (field "size") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (field "position"), vField (field "order") ]
                            , maY [ vNum 7 ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 9 ]
                            , maAngle [ vNum -90 ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 770, padding 5, ds, sc [], mk [] ]


sourceExample : Spec
sourceExample =
    arc1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "bundle1", bundle1 )
        , ( "force1", force1 )
        , ( "matrix1", matrix1 )
        , ( "arc1", arc1 )
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
