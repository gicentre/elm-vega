port module GalleryTree exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


tree1 : Spec
tree1 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl "https://vega.github.io/vega/data/flare.json" ]
                    |> transform
                        [ trStratify (str "id") (str "parent")
                        , trTree
                            [ teMethod (teMethodSignal "layout")
                            , teSize (numSignals [ "height", "width-100" ])
                            , teAs "y" "x" "depth" "children"
                            ]
                        ]
                , data "links" [ daSource "tree" ]
                    |> transform
                        [ trTreeLinks
                        , trLinkPath
                            [ lpOrient (markOrientationLabel Horizontal |> str)
                            , lpShape (strSignal "links")
                            ]
                        ]
                ]

        si =
            signals
                << signal "labels" [ siValue (vBoo True), siBind (iCheckbox []) ]
                << signal "layout"
                    [ siValue (vStr "tidy")
                    , siBind (iRadio [ inOptions (vStrs [ "tidy", "cluster" ]) ])
                    ]
                << signal "links"
                    [ siValue (vStr "diagonal")
                    , siBind (iSelect [ inOptions (vStrs [ "line", "curve", "diagonal", "orthogonal" ]) ])
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScSequential
                    , scDomain (doData [ daDataset "tree", daField (str "depth") ])
                    , scRange (raScheme "magma" [])
                    , scZero (boo True)
                    ]

        mk =
            marks
                << mark Path
                    [ mFrom [ srData (str "links") ]
                    , mEncode
                        [ enUpdate [ maPath [ vField (fName "path") ], maStroke [ vStr "#ccc" ] ] ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter [ maSize [ vNum 100 ], maStroke [ vStr "#fff" ] ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "depth") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (fName "name") ]
                            , maFontSize [ vNum 9 ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maDx [ vSignal "datum.children ? -7 : 7" ]
                            , maAlign [ vSignal "datum.children ? 'right' : 'left'" ]
                            , maOpacity [ vSignal "labels ? 1 : 0" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 600, height 1600, padding 5, ds, si [], sc [], mk [] ]


tree2 : Spec
tree2 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl "https://vega.github.io/vega/data/flare.json" ]
                    |> transform
                        [ trStratify (str "id") (str "parent")
                        , trTree
                            [ teMethod (teMethodSignal "layout")
                            , teSize (numList [ num 1, numSignal "radius" ])
                            , teAs "alpha" "radius" "depth" "children"
                            ]
                        , trFormula "(rotate + extent * datum.alpha + 270) % 360" "angle" AlwaysUpdate
                        , trFormula "PI * datum.angle / 180" "radians" AlwaysUpdate
                        , trFormula "inrange(datum.angle, [90, 270])" "leftside" AlwaysUpdate
                        , trFormula "originX + datum.radius * cos(datum.radians)" "x" AlwaysUpdate
                        , trFormula "originY + datum.radius * sin(datum.radians)" "y" AlwaysUpdate
                        ]
                , data "links" [ daSource "tree" ]
                    |> transform
                        [ trTreeLinks
                        , trLinkPath
                            [ lpShape (strSignal "links")
                            , lpOrient (markOrientationLabel Radial |> str)
                            , lpSourceX (str "source.radians")
                            , lpSourceY (str "source.radius")
                            , lpTargetX (str "target.radians")
                            , lpTargetY (str "target.radius")
                            ]
                        ]
                ]

        si =
            signals
                << signal "labels" [ siValue (vBoo True), siBind (iCheckbox []) ]
                << signal "radius" [ siValue (vNum 280), siBind (iRange [ inMin 20, inMax 600 ]) ]
                << signal "extent" [ siValue (vNum 360), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "rotate" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "layout" [ siValue (vStr "tidy"), siBind (iRadio [ inOptions (vStrs [ "tidy", "cluster" ]) ]) ]
                << signal "links" [ siValue (vStr "diagonal"), siBind (iSelect [ inOptions (vStrs [ "line", "curve", "diagonal", "orthogonal" ]) ]) ]
                << signal "originX" [ siUpdate "width / 2" ]
                << signal "originY" [ siUpdate "height / 2" ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScSequential
                    , scDomain (doData [ daDataset "tree", daField (str "depth") ])
                    , scRange (raScheme "magma" [])
                    , scZero (boo True)
                    ]

        mk =
            marks
                << mark Path
                    [ mFrom [ srData (str "links") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vSignal "originX" ]
                            , maY [ vSignal "originY" ]
                            , maPath [ vField (fName "path") ]
                            , maStroke [ vStr "#ccc" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter [ maSize [ vNum 100 ], maStroke [ vStr "#fff" ] ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maFill [ vScale (fName "cScale"), vField (fName "depth") ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (fName "name") ]
                            , maFontSize [ vNum 9 ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maDx [ vSignal "(datum.leftside ? -1 : 1) * 6" ]
                            , maAngle [ vSignal "datum.leftside ? datum.angle - 180 : datum.angle" ]
                            , maAlign [ vSignal "datum.children ? 'right' : 'left'" ]
                            , maOpacity [ vSignal "labels ? 1 : 0" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 720, height 720, padding 5, autosize [ ANone ], ds, si [], sc [], mk [] ]


tree3 : Spec
tree3 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl "https://vega.github.io/vega/data/flare.json" ]
                    |> transform
                        [ trStratify (str "id") (str "parent")
                        , trTreemap
                            [ tmField (str "size")
                            , tmSort [ ( str "value", Ascend ) ]
                            , tmRound (boo True)
                            , tmMethod (tmMethodSignal "layout")
                            , tmRatio (numSignal "aspectRatio")
                            , tmSize (numSignals [ "width", "height" ])
                            ]
                        ]
                , data "nodes" [ daSource "tree" ]
                    |> transform [ trFilter (expr "datum.children") ]
                , data "leaves" [ daSource "tree" ]
                    |> transform [ trFilter (expr "!datum.children") ]
                ]

        si =
            signals
                << signal "layout"
                    [ siValue (vStr "squarify")
                    , siBind (iSelect [ inOptions (vStrs [ "squarify", "resquarify", "binary", "slicedice" ]) ])
                    ]
                << signal "aspectRatio" [ siValue (vNum 1.6), siBind (iRange [ inMin 0.2, inMax 5, inStep 0.1 ]) ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raStrs [ "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9" ])
                    ]
                << scale "size"
                    [ scType ScOrdinal
                    , scDomain (doNums (nums [ 0, 1, 2, 3 ]))
                    , scRange (raNums [ 256, 28, 20, 14 ])
                    ]
                << scale "opacity"
                    [ scType ScOrdinal
                    , scDomain (doNums (nums [ 0, 1, 2, 3 ]))
                    , scRange (raNums [ 0.15, 0.5, 0.8, 1.0 ])
                    ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "nodes") ]
                    , mInteractive (boo False)
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale (fName "cScale"), vField (fName "name") ] ]
                        , enUpdate
                            [ maX [ vField (fName "x0") ]
                            , maY [ vField (fName "y0") ]
                            , maX2 [ vField (fName "x1") ]
                            , maY2 [ vField (fName "y1") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "leaves") ]
                    , mEncode
                        [ enEnter [ maStroke [ vStr "white" ] ]
                        , enUpdate
                            [ maX [ vField (fName "x0") ]
                            , maY [ vField (fName "y0") ]
                            , maX2 [ vField (fName "x1") ]
                            , maY2 [ vField (fName "y1") ]
                            , maFill [ vStr "transparent" ]
                            ]
                        , enHover [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "nodes") ]
                    , mInteractive (boo False)
                    , mEncode
                        [ enEnter
                            [ maFont [ vStr "Helvetica Neue, Arial" ]
                            , maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            , maFill [ vStr "black" ]
                            , maText [ vField (fName "name") ]
                            , maFontSize [ vScale (fName "size"), vField (fName "depth") ]
                            , maFillOpacity [ vScale (fName "opacity"), vField (fName "depth") ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "0.5 * (datum.x0 + datum.x1)" ]
                            , maY [ vSignal "0.5 * (datum.y0 + datum.y1)" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 960, height 500, padding 2.5, autosize [ ANone ], ds, si [], sc [], mk [] ]


tree4 : Spec
tree4 =
    let
        ds =
            dataSource
                [ data "tree" [ daUrl "https://vega.github.io/vega/data/flare.json" ]
                    |> transform
                        [ trStratify (str "id") (str "parent")
                        , trPack
                            [ paField (str "size")
                            , paSort [ ( str "value", Ascend ) ]
                            , paSize (numSignals [ "width", "height" ])
                            ]
                        ]
                ]

        sc =
            scales << scale "cScale" [ scType ScOrdinal, scRange (raScheme "category20" []) ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maShape [ vStr "circle" ]
                            , maFill [ vScale (fName "cScale"), vField (fName "depth") ]
                            , maTooltip [ vSignal "datum.name + (datum.size ? ', ' + datum.size + ' bytes' : '')" ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            , maSize [ vSignal "4 * datum.r * datum.r" ]
                            , maStroke [ vStr "white" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        , enHover [ maStroke [ vStr "red" ], maStrokeWidth [ vNum 2 ] ]
                        ]
                    ]
    in
    toVega
        [ width 600, height 600, padding 5, autosize [ ANone ], ds, sc [], mk [] ]


sourceExample : Spec
sourceExample =
    tree4



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "tree1", tree1 )
        , ( "tree2", tree2 )
        , ( "tree3", tree3 )
        , ( "tree4", tree4 )
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
