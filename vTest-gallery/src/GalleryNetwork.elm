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
                        [ trStratify (str "id") (str "parent")
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
                            [ maText [ vField (fName "name") ]
                            , maBaseline [ vStr (vAlignLabel AlignMiddle) ]
                            ]
                        , enUpdate
                            [ maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
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
                            , maX [ vField (fName "x") ]
                            , maY [ vField (fName "y") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 720, height 720, padding 5, autosize [ ANone ], ds, si [], sc [], le [], mk [] ]


sourceExample : Spec
sourceExample =
    bundle1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "bundle1", bundle1 )
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
