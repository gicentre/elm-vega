port module GalleryLineArea exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


lineChart1 : Spec
lineChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (vNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (vNums [ 28, 20, 43, 35, 81, 10, 19, 15, 52, 48, 24, 28, 87, 66, 17, 27, 68, 16, 49, 25 ])
                << dataColumn "c" (vNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ siValue (markInterpolationValue Linear)
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScPoint
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "table", daField (field "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scNice NTrue
                    , scZero true
                    , scDomain (doData [ daDataset "table", daField (field "y") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange RaCategory
                    , scDomain (doData [ daDataset "table", daField (field "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet (str "table") "series" [ faGroupBy [ field "c" ] ] ]
                    , mGroup [ mkLine [] ]
                    ]

        mkLine =
            marks
                << mark Line
                    [ mFrom [ srData (str "series") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "x") ]
                            , maY [ vScale "yScale", vField (field "y") ]
                            , maStroke [ vScale "cScale", vField (field "c") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        , enUpdate [ maInterpolate [ vSignal "interpolate" ], maStrokeOpacity [ vNum 1 ] ]
                        , enHover [ maStrokeOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]


areaChart1 : Spec
areaChart1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "u" (List.map toFloat (List.range 1 20) |> vNums)
                << dataColumn "v" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        ds =
            dataSource [ table [] ]

        si =
            signals
                << signal "interpolate"
                    [ siValue (markInterpolationValue Linear)
                    , siBind (iSelect [ inOptions (vStrs [ "basis", "cardinal", "catmull-rom", "linear", "monotone", "natural", "step", "step-after", "step-before" ]) ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scZero false
                    , scDomain (doData [ daDataset "table", daField (field "u") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scNice NTrue
                    , scZero true
                    , scDomain (doData [ daDataset "table", daField (field "v") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTickCount (num 20) ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Area
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "u") ]
                            , maY [ vScale "yScale", vField (field "v") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate [ maInterpolate [ vSignal "interpolate" ], maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]


areaChart2 : Spec
areaChart2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (vNums [ 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 ])
                << dataColumn "y" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])
                << dataColumn "c" (vNums [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trStack
                            [ stGroupBy [ field "x" ]
                            , stSort [ ( field "c", Ascend ) ]
                            , stField (field "y")
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScPoint
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "table", daField (field "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scNice NTrue
                    , scZero true
                    , scDomain (doData [ daDataset "table", daField (field "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange RaCategory
                    , scDomain (doData [ daDataset "table", daField (field "c") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex (num 1) ]
                << axis "yScale" SLeft [ axZIndex (num 1) ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet (str "table") "series" [ faGroupBy [ field "c" ] ] ]
                    , mGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "series") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Monotone ]
                            , maX [ vScale "xScale", vField (field "x") ]
                            , maY [ vScale "yScale", vField (field "y0") ]
                            , maY2 [ vScale "yScale", vField (field "y1") ]
                            , maFill [ vScale "cScale", vField (field "c") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, sc [], ax [], mk [] ]


areaChart3 : Spec
areaChart3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "x" (List.map toFloat (List.range 1 20) |> vNums)
                << dataColumn "y" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15 ])

        layerData =
            data "layer_indices" [ daValue (vNums [ 0, 1, 2, 3 ]) ]
                |> transform
                    [ trFilter (expr "datum.data < layers")
                    , trFormula "datum.data * -height" "offset"
                    ]

        ds =
            dataSource [ table [], layerData ]

        si =
            signals
                << signal "layers"
                    [ siValue (vNum 2)
                    , siOn
                        [ evHandler [ esObject [ esType MouseDown, esConsume true ] ]
                            [ evUpdate "1 + (layers % 4)" ]
                        ]
                    , siBind (iSelect [ inOptions (vNums [ 1, 2, 3, 4 ]) ])
                    ]
                << signal "height" [ siUpdate "floor(200 / layers)" ]
                << signal "vheight" [ siUpdate "height * layers" ]
                << signal "opacity" [ siUpdate "pow(layers, -2/3)" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scZero false
                    , scRound true
                    , scDomain (doData [ daDataset "table", daField (field "x") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raValues [ vSignal "vheight", vNum 0 ])
                    , scNice NTrue
                    , scZero true
                    , scDomain (doData [ daDataset "table", daField (field "y") ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ axTickCount (num 20) ]

        mk =
            marks
                << mark Group
                    [ mEncode
                        [ enUpdate
                            [ maWidth [ vField (fGroup (field "width")) ]
                            , maHeight [ vField (fGroup (field "height")) ]
                            , maGroupClip [ vTrue ]
                            ]
                        ]
                    , mGroup [ mk1 [] ]
                    ]

        mk1 =
            marks
                << mark Group
                    [ mFrom [ srData (str "layer_indices") ]
                    , mEncode [ enUpdate [ maY [ vField (field "offset") ] ] ]
                    , mGroup [ mkArea [] ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Monotone ]
                            , maX [ vScale "xScale", vField (field "x") ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate
                            [ maY [ vScale "yScale", vField (field "y") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFillOpacity [ vSignal "opacity" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]


areaChart4 : Spec
areaChart4 =
    let
        table =
            data "jobs" [ daUrl (str "https://vega.github.io/vega/data/jobs.json") ]
                |> transform
                    [ trFilter (expr "(sex === 'all' || datum.sex === sex) && (!query || test(regexp(query,'i'), datum.job))")
                    , trStack
                        [ stGroupBy [ field "year" ]
                        , stSort [ ( field "job", Descend ), ( field "sex", Descend ) ]
                        , stField (field "perc")
                        ]
                    ]

        series =
            data "series" [ daSource "jobs" ]
                |> transform
                    [ trAggregate
                        [ agGroupBy [ field "job", field "sex" ]
                        , agFields [ field "perc", field "perc" ]
                        , agOps [ Sum, ArgMax ]
                        , agAs [ "sum", "argmax" ]
                        ]
                    ]

        ds =
            dataSource [ table, series ]

        si =
            signals
                << signal "sex"
                    [ siValue (vStr "all")
                    , siBind (iRadio [ inOptions (vStrs [ "men", "women", "all" ]) ])
                    ]
                << signal "query"
                    [ siValue (vStr "")
                    , siOn
                        [ evHandler [ esObject [ esMark Area, esType Click, esConsume true ] ] [ evUpdate "datum.job" ]
                        , evHandler [ esObject [ esType DblClick, esConsume true ] ] [ evUpdate "''" ]
                        ]
                    , siBind (iText [ inPlaceholder "search", inAutocomplete False ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scZero false
                    , scRound true
                    , scDomain (doData [ daDataset "jobs", daField (field "year") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scZero true
                    , scRound true
                    , scDomain (doData [ daDataset "jobs", daField (field "y1") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "men", "women" ]))
                    , scRange (raStrs [ "#33f", "#f33" ])
                    ]
                << scale "alphaScale"
                    [ scType ScLinear
                    , scZero true
                    , scDomain (doData [ daDataset "series", daField (field "sum") ])
                    , scRange (raNums [ 0.4, 0.8 ])
                    ]
                << scale "fontScale"
                    [ scType ScSqrt
                    , scRange (raNums [ 0, 20 ])
                    , scZero true
                    , scRound true
                    , scDomain (doData [ daDataset "series", daField (field "argmax.perc") ])
                    ]
                << scale "opacityScale"
                    [ scType ScQuantile
                    , scRange (raNums [ 0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0 ])
                    , scDomain (doData [ daDataset "series", daField (field "argmax.perc") ])
                    ]
                << scale "alignScale"
                    [ scType ScQuantize
                    , scRange (raStrs [ "left", "center", "right" ])
                    , scZero false
                    , scDomain (doNums (nums [ 1730, 2130 ]))
                    ]
                << scale "offsetScale"
                    [ scType ScQuantize
                    , scRange (raNums [ 6, 0, -6 ])
                    , scZero false
                    , scDomain (doNums (nums [ 1730, 2130 ]))
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axFormat (str "d"), axTickCount (num 15) ]
                << axis "yScale"
                    SRight
                    [ axFormat (str "%")
                    , axGrid true
                    , axDomain false
                    , axTickSize (num 12)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "#ccc" ] ] ] )
                        , ( ETicks, [ enEnter [ maStroke [ vStr "#ccc" ] ] ] )
                        ]
                    ]

        mkArea =
            marks
                << mark Area
                    [ mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "y0") ]
                            , maY2 [ vScale "yScale", vField (field "y1") ]
                            , maFill [ vScale "cScale", vField (field "sex") ]
                            , maFillOpacity [ vScale "alphaScale", vField (fParent (field "sum")) ]
                            ]
                        , enHover [ maFillOpacity [ vNum 0.2 ] ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom
                        [ srData (str "series")
                        , srFacet (str "jobs") "facet" [ faGroupBy [ field "job", field "sex" ] ]
                        ]
                    , mGroup [ mkArea [] ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "series") ]
                    , mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maX [ vField (field "argmax.year"), vScale "xScale" ]
                            , maDx [ vField (field "argmax.year"), vScale "offsetScale" ]
                            , maY [ vSignal "scale('yScale', 0.5 * (datum.argmax.y0 + datum.argmax.y1))" ]
                            , maFill [ vStr "#000" ]
                            , maFillOpacity [ vField (field "argmax.perc"), vScale "opacityScale" ]
                            , maFontSize [ vField (field "argmax.perc"), vScale "fontScale", vOffset (vNum 5) ]
                            , maText [ vField (field "job") ]
                            , maAlign [ vField (field "argmax.year"), vScale "alignScale" ]
                            , maBaseline [ vMiddle ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding 5, ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    areaChart4



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "lineChart1", lineChart1 )
        , ( "areaChart1", areaChart1 )
        , ( "areaChart2", areaChart2 )
        , ( "areaChart3", areaChart3 )
        , ( "areaChart4", areaChart4 )
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
