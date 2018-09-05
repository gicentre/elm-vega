port module GalleryNetwork exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


bundle1 : Spec
bundle1 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl (str "https://vega.github.io/vega/data/flare.json") ]
                    |> transform
                        [ trStratify (field "id") (field "parent")
                        , trTree
                            [ teMethod (meSignal "layout")
                            , teSize (nums [ 1, 1 ])
                            , teAs "alpha" "beta" "depth" "children"
                            ]
                        , trFormula "(rotate + extent * datum.alpha + 270) % 360" "angle"
                        , trFormula "inrange(datum.angle, [90, 270])" "leftside"
                        , trFormula "originX + radius * datum.beta * cos(PI * datum.angle / 180)" "x"
                        , trFormula "originY + radius * datum.beta * sin(PI * datum.angle / 180)" "y"
                        ]
                , data "leaves" [ daSource "tree" ]
                    |> transform [ trFilter (expr "!datum.children") ]
                , data "dependencies" [ daUrl (str "https://vega.github.io/vega/data/flare-dependencies.json") ]
                    |> transform
                        [ trFormulaInitOnly "treePath('tree', datum.source, datum.target)" "treepath" ]
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
                        [ evHandler [ esObject [ esMark text, esType etMouseOver ] ] [ evUpdate "datum.id" ]
                        , evHandler [ esObject [ esType etMouseOver, esFilter [ "!event.item" ] ] ] [ evUpdate "null" ]
                        ]
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doStrs (strs [ "depends on", "imported by" ]))
                    , scRange (raValues [ vSignal "colorIn", vSignal "colorOut" ])
                    ]

        le =
            legends
                << legend
                    [ leStroke "cScale"
                    , leOrient loBottomRight
                    , leTitle (str "Dependencies")
                    , leEncode [ enSymbols [ enEnter [ maShape [ vStr "M-0.5,0H1" ] ] ] ]
                    ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "leaves") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (field "name") ]
                            , maBaseline [ vMiddle ]
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
                                    [ black ]
                                    [ ifElse "indata('selected', 'source', datum.id)"
                                        [ vSignal "colorIn" ]
                                        [ ifElse "indata('selected', 'target', datum.id)"
                                            [ vSignal "colorOut" ]
                                            [ black ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                << mark group
                    [ mFrom [ srFacet (str "dependencies") "path" [ faField (field "treepath") ] ]
                    , mGroup [ nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark line
                    [ mInteractive false
                    , mFrom [ srData (str "path") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue miBundle ]
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
        [ width 720, height 720, padding 5, autosize [ asNone ], ds, si [], sc [], le [], mk [] ]


force1 : Spec
force1 =
    let
        ds =
            dataSource
                [ data "node-data"
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "nodes") ]
                    ]
                , data "link-data"
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "links") ]
                    ]
                ]

        si =
            signals
                << signal "cx" [ siUpdate "width /2" ]
                << signal "cy" [ siUpdate "height /2" ]
                << signal "nodeRadius" [ siValue (vNum 8), siBind (iRange [ inMin 1, inMax 50, inStep 1 ]) ]
                << signal "nodeCharge" [ siValue (vNum -30), siBind (iRange [ inMin -100, inMax 10, inStep 1 ]) ]
                << signal "linkDistance" [ siValue (vNum 30), siBind (iRange [ inMin 5, inMax 100, inStep 1 ]) ]
                << signal "static" [ siValue vTrue, siBind (iCheckbox []) ]
                << signal "fix"
                    [ siDescription "State variable for active node fix status."
                    , siValue (vNum 0)
                    , siOn
                        [ evHandler
                            [ esMerge
                                [ esObject [ esMark symbol, esType etMouseOut, esFilter [ "!event.buttons" ] ]
                                , esObject [ esSource esWindow, esType etMouseUp ]
                                ]
                            ]
                            [ evUpdate "0" ]
                        , evHandler [ esObject [ esMark symbol, esType etMouseOver ] ] [ evUpdate "fix || 1" ]
                        , evHandler
                            [ esObject
                                [ esBetween [ esMark symbol, esType etMouseDown ] [ esSource esWindow, esType etMouseUp ]
                                , esSource esWindow
                                , esType etMouseMove
                                , esConsume true
                                ]
                            ]
                            [ evUpdate "2", evForce true ]
                        ]
                    ]
                << signal "node"
                    [ siDescription "Graph node most recently interacted with."
                    , siValue vNull
                    , siOn [ evHandler [ esObject [ esMark symbol, esType etMouseOver ] ] [ evUpdate "fix === 1 ? item() : node" ] ]
                    ]
                << signal "restart"
                    [ siDescription "Flag to restart Force simulation upon data changes."
                    , siValue vFalse
                    , siOn [ evHandler [ esSelector (strSignal "fix") ] [ evUpdate "fix > 1 " ] ]
                    ]

        sc =
            scales << scale "cScale" [ scType scOrdinal, scRange (raScheme (str "category20c") []) ]

        mk =
            marks
                << mark symbol
                    [ mName "nodes"
                    , mFrom [ srData (str "node-data") ]
                    , mZIndex (num 1)
                    , mOn
                        [ trigger "fix" [ tgModifyValues "node" "fix === 1 ? {fx:node.x, fy:node.y} : {fx:x(), fy:y()}" ]
                        , trigger "!fix" [ tgModifyValues "node" "{fx: null, fy: null}" ]
                        ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "group") ]
                            , maStroke [ white ]
                            ]
                        , enUpdate
                            [ maSize [ vSignal "2 * nodeRadius * nodeRadius" ]
                            , maCursor [ cursorValue cuPointer ]
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
                                , foLink (str "link-data") [ fpDistance (numSignal "linkDistance") ]
                                ]
                            ]
                        ]
                    ]
                << mark path
                    [ mFrom [ srData (str "link-data") ]
                    , mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#ccc" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mTransform
                        [ trLinkPath
                            [ lpShape lsLine
                            , lpSourceX (field "datum.source.x")
                            , lpSourceY (field "datum.source.y")
                            , lpTargetX (field "datum.target.x")
                            , lpTargetY (field "datum.target.y")
                            ]
                        ]
                    ]
    in
    toVega
        [ width 700, height 500, padding 0, autosize [ asNone ], ds, si [], sc [], mk [] ]


matrix1 : Spec
matrix1 =
    let
        ds =
            dataSource
                [ data "nodes"
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "nodes") ]
                    ]
                    |> transform
                        [ trFormula "datum.group" "order"
                        , trFormula "dest >= 0 && datum === src ? dest : datum.order" "score"
                        , trWindow [ wnOperation woRowNumber "order" ] [ wnSort [ ( field "score", ascend ) ] ]
                        ]
                , data "edges"
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "links") ]
                    ]
                    |> transform
                        [ trLookup "nodes" (field "index") [ field "source", field "target" ] [ luAs [ "sourceNode", "targetNode" ] ]
                        , trFormula "datum.sourceNode.group === datum.targetNode.group ? datum.sourceNode.group : count" "group"
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
                        [ evHandler [ esObject [ esMark text, esType etMouseDown ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esType etMouseUp ] ] [ evUpdate "{}" ]
                        ]
                    ]
                << signal "dest"
                    [ siValue (vNum -1)
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esBetween [ esMarkName "columns", esType etMouseDown ] [ esSource esWindow, esType etMouseUp ]
                                , esSource esWindow
                                , esType etMouseMove
                                ]
                            ]
                            [ evUpdate "src.name && datum !== src ? (0.5 + count * clamp(x(), 0, width) / width) : dest" ]
                        , evHandler
                            [ esObject
                                [ esBetween [ esMarkName "rows", esType etMouseDown ] [ esSource esWindow, esType etMouseUp ]
                                , esSource esWindow
                                , esType etMouseMove
                                ]
                            ]
                            [ evUpdate "src.name && datum !== src ? (0.5 + count * clamp(y(), 0, height) / height) : dest" ]
                        ]
                    ]

        sc =
            scales
                << scale "position"
                    [ scType scBand
                    , scDomain (doData [ daDataset "nodes", daField (field "order"), daSort [] ])
                    , scRange (raStep (vSignal "cellSize"))
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain
                        (doData
                            [ daReferences [ [ daDataset "nodes", daField (field "group") ], [ daSignal "count" ] ]
                            , daSort []
                            ]
                        )
                    ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "cross") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "position", vField (field "a.order") ]
                            , maY [ vScale "position", vField (field "b.order") ]
                            , maWidth [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ ifElse "datum.a === src || datum.b === src" [ vStr "#ddd" ] [ vStr "#f5f5f5" ] ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "position", vField (field "sourceNode.order") ]
                            , maY [ vScale "position", vField (field "targetNode.order") ]
                            , maWidth [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ vScale "cScale", vField (field "group") ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maY [ vScale "position", vField (field "sourceNode.order") ]
                            , maX [ vScale "position", vField (field "targetNode.order") ]
                            , maWidth [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maHeight [ vScale "position", vBand (num 1), vOffset (vNum -1) ]
                            , maFill [ vScale "cScale", vField (field "group") ]
                            ]
                        ]
                    ]
                << mark text
                    [ mName "columns"
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "position", vField (field "order"), vBand (num 1) ]
                            , maY [ vOffset (vNum -2) ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 10 ]
                            , maAngle [ vNum -90 ]
                            , maAlign [ hLeft ]
                            , maBaseline [ vMiddle ]
                            , maFill [ ifElse "datum === src" [ vStr "steelblue" ] [ black ] ]
                            ]
                        ]
                    ]
                << mark text
                    [ mName "rows"
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maY [ vScale "position", vField (field "order"), vBand (num 0.5) ]
                            , maX [ vOffset (vNum -2) ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 10 ]
                            , maAlign [ hRight ]
                            , maBaseline [ vMiddle ]
                            , maFill [ ifElse "datum === src" [ vStr "steelblue" ] [ black ] ]
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
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "links") ]
                    ]
                , data "sourceDegree" [ daSource "edges" ]
                    |> transform [ trAggregate [ agGroupBy [ field "source" ] ] ]
                , data "targetDegree" [ daSource "edges" ]
                    |> transform [ trAggregate [ agGroupBy [ field "target" ] ] ]
                , data "nodes"
                    [ daUrl (str "https://vega.github.io/vega/data/miserables.json")
                    , daFormat [ jsonProperty (str "nodes") ]
                    ]
                    |> transform
                        [ trWindow [ wnOperation woRank "order" ] []
                        , trLookup "sourceDegree"
                            (field "source")
                            [ field "index" ]
                            [ luAs [ "sourceDegree" ], luDefault (vObject [ keyValue "count" (vNum 0) ]) ]
                        , trLookup "targetDegree"
                            (field "target")
                            [ field "index" ]
                            [ luAs [ "targetDegree" ], luDefault (vObject [ keyValue "count" (vNum 0) ]) ]
                        , trFormula "datum.sourceDegree.count + datum.targetDegree.count" "degree"
                        ]
                ]

        sc =
            scales
                << scale "position"
                    [ scType scBand
                    , scDomain (doData [ daDataset "nodes", daField (field "order"), daSort [] ])
                    , scRange raWidth
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "nodes", daField (field "group") ])
                    ]

        mk =
            marks
                << mark symbol
                    [ mName "layout"
                    , mInteractive false
                    , mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enEnter [ maOpacity [ vNum 0 ] ]
                        , enUpdate
                            [ maX [ vScale "position", vField (field "order") ]
                            , maY [ vNum 0 ]
                            , maSize [ vField (field "degree"), vMultiply (vNum 5), vOffset (vNum 10) ]
                            , maFill [ vScale "cScale", vField (field "group") ]
                            ]
                        ]
                    ]
                << mark path
                    [ mFrom [ srData (str "edges") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ black ]
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
                            , lpShape lsArc
                            ]
                        ]
                    ]
                << mark symbol
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
                << mark text
                    [ mFrom [ srData (str "nodes") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "position", vField (field "order") ]
                            , maY [ vNum 7 ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 9 ]
                            , maAngle [ vNum -90 ]
                            , maAlign [ hRight ]
                            , maBaseline [ vMiddle ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 770, padding 5, ds, sc [], mk [] ]


map1 : Spec
map1 =
    let
        ds =
            dataSource
                [ data "states"
                    [ daUrl (str "https://vega.github.io/vega/data/us-10m.json")
                    , daFormat [ topojsonFeature (str "states") ]
                    ]
                    |> transform [ trGeoPath "myProjection" [] ]
                , data "traffic"
                    [ daUrl (str "https://vega.github.io/vega/data/flights-airport.csv")
                    , daFormat [ csv, parseAuto ]
                    ]
                    |> transform
                        [ trAggregate
                            [ agGroupBy [ field "origin" ]
                            , agOps [ opSum ]
                            , agFields [ field "count" ]
                            , agAs [ "flights" ]
                            ]
                        ]
                , data "airports"
                    [ daUrl (str "https://vega.github.io/vega/data/airports.csv")
                    , daFormat [ csv, parseAuto ]
                    ]
                    |> transform
                        [ trLookup "traffic" (field "origin") [ field "iata" ] [ luAs [ "traffic" ] ]
                        , trFilter (expr "datum.traffic != null")
                        , trGeoPoint "myProjection" (field "longitude") (field "latitude")
                        , trFilter (expr "datum.x != null && datum.y != null")
                        , trVoronoi (field "x") (field "y") []
                        , trCollect [ ( field "traffic.flights", descend ) ]
                        ]
                , data "routes"
                    [ daUrl (str "https://vega.github.io/vega/data/flights-airport.csv")
                    , daFormat [ csv, parseAuto ]
                    ]
                    |> transform
                        [ trFilter (expr "hover && hover.iata == datum.origin")
                        , trLookup "airports" (field "iata") [ field "origin", field "destination" ] [ luAs [ "source", "target" ] ]
                        , trFilter (expr "datum.source && datum.target")
                        , trLinkPath [ lpShape (lsSignal "shape") ]
                        ]
                ]

        si =
            signals
                << signal "pScale" [ siValue (vNum 1200), siBind (iRange [ inMin 500, inMax 3000 ]) ]
                << signal "pTranslateX" [ siValue (vNum 450), siBind (iRange [ inMin -500, inMax 1200 ]) ]
                << signal "pTranslateY" [ siValue (vNum 260), siBind (iRange [ inMin -300, inMax 700 ]) ]
                << signal "shape" [ siValue (vStr "line"), siBind (iRadio [ inOptions (vStrs [ "line", "curve" ]) ]) ]
                << signal "hover"
                    [ siValue vNull
                    , siOn
                        [ evHandler [ esObject [ esMarkName "cell", esType etMouseOver ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esMarkName "cell", esType etMouseOut ] ] [ evUpdate "{}" ]
                        ]
                    ]
                << signal "title"
                    [ siValue (vStr "U.S. Airports, 2008")
                    , siUpdate "hover ? hover.name + ' (' + hover.iata + ')' : 'U.S. Airports, 2008'"
                    ]
                << signal "cell_stroke"
                    [ siValue vNull
                    , siOn
                        [ evHandler [ esObject [ esType etDblClick ] ] [ evUpdate "cell_stroke ? null : 'brown'" ]
                        , evHandler [ esObject [ esType etMouseDown, esConsume true ] ] [ evUpdate "cell_stroke" ]
                        ]
                    ]

        pr =
            projections
                << projection "myProjection"
                    [ prType albersUsa
                    , prScale (numSignal "pScale")
                    , prTranslate (numSignals [ "pTranslateX", "pTranslateY" ])
                    ]

        sc =
            scales
                << scale "size"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "traffic", daField (field "flights") ])
                    , scRange (raNums [ 16, 1000 ])
                    ]

        mk =
            marks
                << mark path
                    [ mFrom [ srData (str "states") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "#dedede" ], maStroke [ white ] ]
                        , enUpdate [ maPath [ vField (field "path") ] ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "airports") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vScale "size", vField (field "traffic.flights") ]
                            , maFill [ vStr "steelblue" ]
                            , maFillOpacity [ vNum 0.8 ]
                            , maStroke [ white ]
                            , maStrokeWidth [ vNum 1.5 ]
                            ]
                        , enUpdate [ maX [ vField (field "x") ], maY [ vField (field "y") ] ]
                        ]
                    ]
                << mark path
                    [ mName "cell"
                    , mFrom [ srData (str "airports") ]
                    , mEncode
                        [ enEnter [ maFill [ transparent ], maStrokeWidth [ vNum 0.35 ] ]
                        , enUpdate [ maPath [ vField (field "path") ], maStroke [ vSignal "cell_stroke" ] ]
                        ]
                    ]
                << mark path
                    [ mInteractive false
                    , mFrom [ srData (str "routes") ]
                    , mEncode [ enEnter [ maPath [ vField (field "path") ], maStroke [ black ], maStrokeOpacity [ vNum 0.35 ] ] ]
                    ]
                << mark text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 895 ]
                            , maY [ vNum 0 ]
                            , maFill [ black ]
                            , maFontSize [ vNum 20 ]
                            , maAlign [ hRight ]
                            ]
                        , enUpdate [ maText [ vSignal "title" ] ]
                        ]
                    ]
    in
    toVega
        [ width 900, height 560, paddings 0 25 0 0, autosize [ asNone ], ds, si [], pr [], sc [], mk [] ]


sourceExample : Spec
sourceExample =
    map1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "bundle1", bundle1 )
        , ( "force1", force1 )
        , ( "matrix1", matrix1 )
        , ( "arc1", arc1 )
        , ( "map1", map1 )
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
