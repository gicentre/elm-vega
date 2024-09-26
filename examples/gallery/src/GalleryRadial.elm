port module GalleryRadial exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


dPath : String
dPath =
    "https://cdn.jsdelivr.net/npm/vega-datasets@2.9/data/"


pieDonut : Maybe Float -> Spec
pieDonut maybeR =
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

        commonSigs =
            signals
                << signal "startAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "endAngle" [ siValue (vNum 360), siBind (iRange [ inMin 0, inMax 360, inStep 1 ]) ]
                << signal "padAngle" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.1 ]) ]
                << signal "cornerRadius" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 10, inStep 0.5 ]) ]
                << signal "sort" [ siValue vFalse, siBind (iCheckbox []) ]

        si =
            case maybeR of
                Just innerR ->
                    commonSigs
                        << signal "innerRadius"
                            [ siValue (vNum innerR)
                            , siBind (iRange [ inMin 0, inMax 90, inStep 1 ])
                            ]

                Nothing ->
                    commonSigs

        sc =
            scales
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange (raScheme (str "category20") [])
                    ]

        commonUpdate =
            [ maStartAngle [ vField (field "startAngle") ]
            , maEndAngle [ vField (field "endAngle") ]
            , maPadAngle [ vSignal "PI * padAngle / 180" ]
            , maOuterRadius [ vSignal "width / 2" ]
            , maCornerRadius [ vSignal "cornerRadius" ]
            ]

        updates =
            case maybeR of
                Just float ->
                    maInnerRadius [ vSignal "innerRadius" ] :: commonUpdate

                Nothing ->
                    commonUpdate

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
                        , enUpdate updates
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, autosize [ asNone ], ds, si [], sc [], mk [] ]


circularChart1 : Spec
circularChart1 =
    pieDonut Nothing


circularChart2 : Spec
circularChart2 =
    pieDonut (Just 60)


circularChart3 : Spec
circularChart3 =
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


radarChart1 : Spec
radarChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "key"
                    (List.range 0 6
                        |> List.map (\n -> "key-" ++ String.fromInt n)
                        |> List.repeat 2
                        |> List.concat
                        |> vStrs
                    )
                << dataColumn "value" (vNums [ 19, 22, 14, 38, 23, 5, 27, 13, 12, 42, 13, 6, 15, 8 ])
                << dataColumn "category" (vNums (List.repeat 7 0 ++ List.repeat 7 1))

        ds =
            dataSource
                [ table []
                , data "keys" [ daSource "table" ]
                    |> transform [ trAggregate [ agGroupBy [ field "key" ] ] ]
                ]

        si =
            signals
                << signal "radius" [ siUpdate "width / 2" ]

        sc =
            scales
                << scale "angular"
                    [ scType scPoint
                    , scDomain (doData [ daDataset "table", daField (field "key") ])
                    , scRange (raNums [ -pi, pi ])
                    , scPadding (num 0.5)
                    ]
                << scale "radial"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "value") ])
                    , scDomainMin (num 0)
                    , scRange (raSignal "[0, radius]")
                    , scZero true
                    , scNice niFalse
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange (raScheme (str "category10") [])
                    ]

        en =
            encode [ enEnter [ maX [ vSignal "radius" ], maY [ vSignal "radius" ] ] ]

        nestedMk =
            marks
                << mark line
                    [ mName "category-line"
                    , mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr "linear-closed" ]
                            , maX [ vSignal "scale('radial', datum.value) * cos(scale('angular', datum.key))" ]
                            , maY [ vSignal "scale('radial', datum.value) * sin(scale('angular', datum.key))" ]
                            , maStroke [ vScale "cScale", vField (field "category") ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFill [ vScale "cScale", vField (field "category") ]
                            , maFillOpacity [ vNum 0.1 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mName "value-text"
                    , mFrom [ srData (str "category-line") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vSignal "datum.x" ]
                            , maY [ vSignal "datum.y" ]
                            , maText [ vSignal "datum.datum.value" ]
                            , maAlign [ hCenter ]
                            , maBaseline [ vMiddle ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark group
                    [ mName "categories"
                    , mZIndex (num 1)
                    , mFrom [ srFacet (str "table") "facet" [ faGroupBy [ field "category" ] ] ]
                    , mGroup [ nestedMk [] ]
                    ]
                << mark rule
                    [ mName "radial-grid"
                    , mFrom [ srData (str "keys") ]
                    , mZIndex (num 0)
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vNum 0 ]
                            , maX2 [ vSignal "radius * cos(scale('angular', datum.key))" ]
                            , maY2 [ vSignal "radius * sin(scale('angular', datum.key))" ]
                            , maStroke [ vStr "lightGrey" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mName "key-label"
                    , mFrom [ srData (str "keys") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vSignal "(radius + 5) * cos(scale('angular', datum.key))" ]
                            , maY [ vSignal "(radius + 5) * sin(scale('angular', datum.key))" ]
                            , maText [ vField (field "key") ]
                            , maAlign
                                [ ifElse "abs(scale('angular', datum.key)) > PI / 2"
                                    [ vStr "right" ]
                                    [ vStr "left" ]
                                ]
                            , maBaseline
                                [ ifElse "scale('angular', datum.key) > 0"
                                    [ vStr "top" ]
                                    [ ifElse "scale('angular', datum.key) == 0"
                                        [ vStr "middle" ]
                                        [ vStr "bottom" ]
                                    ]
                                ]
                            , maFill [ black ]
                            , maFontWeight [ vStr "bold" ]
                            ]
                        ]
                    ]
                << mark line
                    [ mName "outer-line"
                    , mFrom [ srData (str "radial-grid") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr "linear-closed" ]
                            , maX [ vField (field "x2") ]
                            , maY [ vField (field "y2") ]
                            , maStroke [ vStr "lightGrey" ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 400, padding 40, autosize [ asNone, asPadding ], ds, si [], sc [], en, mk [] ]


sourceExample : Spec
sourceExample =
    radarChart1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "circularChart1", circularChart1 )
        , ( "circularChart2", circularChart2 )
        , ( "circularChart3", circularChart3 )
        , ( "radarChart1", radarChart1 )
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
