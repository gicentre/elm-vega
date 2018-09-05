port module GalleryRadial exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


circularChart1 : Spec
circularChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "id" (vNums [ 1, 2, 3, 4, 5, 6 ])
                << dataColumn "field" (vNums [ 4, 6, 10, 3, 7, 8 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trPie
                            [ piField (field "field")
                            , piStartAngle (numSignal "PI * startAngle / 180")
                            , piEndAngle (numSignal "PI * endAngle / 180")
                            , piSort (booSignal "sort")
                            ]
                        ]
                ]

        si =
            signals
                << signal "startAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "endAngle" [ siValue (vNum 360), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "padAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.1 ]) ]
                << signal "innerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 90, inStep 1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "sort" [ siValue vFalse, siBind (iCheckbox []) ]

        sc =
            scales << scale "cScale" [ scType scOrdinal, scRange (raScheme (str "category20") []) ]

        mk =
            marks
                << mark arc
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "id") ]
                            , maX [ vSignal "width / 2" ]
                            , maY [ vSignal "height / 2" ]
                            ]
                        , enUpdate
                            [ maStartAngle [ vField (field "startAngle") ]
                            , maEndAngle [ vField (field "endAngle") ]
                            , maPadAngle [ vSignal "PI * padAngle / 180" ]
                            , maInnerRadius [ vSignal "innerRadius" ]
                            , maOuterRadius [ vSignal "width / 2" ]
                            , maCornerRadius [ vSignal "cornerRadius" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, autosize [ asNone ], ds, si [], sc [], mk [] ]


circularChart2 : Spec
circularChart2 =
    let
        ds =
            dataSource
                [ data "table" [ daValue (vNums [ 12, 23, 47, 6, 52, 19 ]) ]
                    |> transform [ trPie [ piField (field "data") ] ]
                ]

        sc =
            scales
                << scale "rScale"
                    [ scType scSqrt
                    , scDomain (doData [ daDataset "table", daField (field "data") ])
                    , scRange (raNums [ 20, 100 ])
                    ]

        mk =
            marks
                << mark arc
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (fGroup (field "width")), vMultiply (vNum 0.5) ]
                            , maY [ vField (fGroup (field "height")), vMultiply (vNum 0.5) ]
                            , maStartAngle [ vField (field "startAngle") ]
                            , maEndAngle [ vField (field "endAngle") ]
                            , maInnerRadius [ vNum 20 ]
                            , maOuterRadius [ vField (field "data"), vScale "rScale" ]
                            , maStroke [ vStr "#fff" ]
                            ]
                        , enUpdate [ maFill [ vStr "#ccc" ] ]
                        , enHover [ maFill [ vStr "pink" ] ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (fGroup (field "width")), vMultiply (vNum 0.5) ]
                            , maY [ vField (fGroup (field "height")), vMultiply (vNum 0.5) ]
                            , maRadius [ vField (field "data"), vScale "rScale", vOffset (vNum 8) ]
                            , maTheta [ vSignal "(datum.startAngle + datum.endAngle)/2" ]
                            , maFill [ vStr "#000" ]
                            , maAlign [ hCenter ]
                            , maBaseline [ vMiddle ]
                            , maText [ vField (field "data") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, ds, sc [], mk [] ]


sourceExample : Spec
sourceExample =
    circularChart1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "circularChart1", circularChart1 )
        , ( "circularChart2", circularChart2 )
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
