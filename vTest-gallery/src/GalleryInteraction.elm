port module GalleryInteraction exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


interaction1 : Spec
interaction1 =
    let
        facetNames =
            [ "delay", "time", "distance" ]

        sigGenerator core =
            signal (core ++ "Range")
                [ siUpdate (core ++ "Extent")
                , siOn
                    [ evHandler (esSignal (core ++ "Zoom")) [ evUpdate ("[(" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 - " ++ core ++ "Zoom, (" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 + " ++ core ++ "Zoom]") ]
                    , evHandler (esSelector (str ("@" ++ core ++ ":dblclick!, @" ++ core ++ "Brush:dblclick!"))) [ evUpdate ("[" ++ core ++ "Extent[0], " ++ core ++ "Extent[1]]") ]
                    , evHandler (esSelector (str ("[@" ++ core ++ "Brush:mousedown, window:mouseup] > window:mousemove!"))) [ evUpdate ("[" ++ core ++ "Range[0] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove), " ++ core ++ "Range[1] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove)]") ]
                    , evHandler (esSelector (str ("[@" ++ core ++ ":mousedown, window:mouseup] > window:mousemove!"))) [ evUpdate ("[min(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x())), max(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x()))]") ]
                    ]
                ]
                << signal (core ++ "Zoom")
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str ("@" ++ core ++ ":wheel!, @" ++ core ++ "Brush:wheel!"))) [ evUpdate ("0.5 * abs(span(" ++ core ++ "Range)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))") ] ]
                    ]
                << signal (core ++ "Anchor")
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str ("@" ++ core ++ ":mousedown!"))) [ evUpdate ("invert('" ++ core ++ "Scale', x())") ] ]
                    ]

        dsGenerator core =
            let
                filterMask =
                    case core of
                        "delay" ->
                            num 1

                        "time" ->
                            num 2

                        _ ->
                            num 4
            in
            dataSource
                [ data (core ++ "-bins") [ daSource "flights" ]
                    |> transform
                        [ trResolveFilter "xFilter" filterMask
                        , trAggregate
                            [ agGroupBy [ field (core ++ "0"), field (core ++ "1") ]
                            , agKey (field (core ++ "0"))
                            , agDrop false
                            ]
                        ]
                ]

        scGenerator core =
            scales
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset (core ++ "-bins"), daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        topScGenerator core =
            scale (core ++ "Scale")
                [ scType ScLinear
                , scRound true
                , scDomain (doSignal (core ++ "Extent"))
                , scRange RaWidth
                ]

        axGenerator core =
            axes << axis (core ++ "Scale") SBottom []

        mkGenerator core =
            let
                titleText =
                    case core of
                        "delay" ->
                            vStr "Arrival Delay (min)"

                        "time" ->
                            vStr "Local Departure Time (hour)"

                        _ ->
                            vStr "Travel Distance (miles)"
            in
            marks
                << mark Rect
                    [ mName (core ++ "Brush")
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "#fcfcfc" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal ("scale('" ++ core ++ "Scale', " ++ core ++ "Range[0])") ]
                            , maX2 [ vSignal ("scale('" ++ core ++ "Scale', " ++ core ++ "Range[1])") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mFrom [ srData (str (core ++ "-bins")) ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "steelblue" ] ]
                        , enUpdate
                            [ maX [ vScale (core ++ "Scale"), vField (field (core ++ "0")) ]
                            , maX2 [ vScale (core ++ "Scale"), vField (field (core ++ "1")), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "count") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal ("scale('" ++ core ++ "Scale', " ++ core ++ "Range[0])") ]
                            , maWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal ("scale('" ++ core ++ "Scale', " ++ core ++ "Range[1])") ]
                            , maWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ titleText ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]

        groupGenerator core =
            mark Group
                [ mName core
                , mEncode
                    [ enEnter
                        [ maY [ vScale "layout", vStr core, vOffset (vNum 20) ]
                        , maWidth [ vSignal "width" ]
                        , maHeight [ vSignal "chartHeight" ]
                        , maFill [ vStr "transparent" ]
                        ]
                    ]
                , mGroup [ dsGenerator core, scGenerator core [], axGenerator core [], mkGenerator core [] ]
                ]

        ds =
            dataSource
                [ data "flights"
                    [ daUrl "https://vega.github.io/vega/data/flights-200k.json" ]
                    |> transform
                        [ trBin (field "delay") (numSignal "delayExtent") [ bnStep (numSignal "delayStep"), bnAs "delay0" "delay1" ]
                        , trBin (field "time") (numSignal "timeExtent") [ bnStep (numSignal "timeStep"), bnAs "time0" "time1" ]
                        , trBin (field "distance") (numSignal "distanceExtent") [ bnStep (numSignal "distanceStep"), bnAs "distance0" "distance1" ]
                        , trCrossFilterAsSignal [ ( field "delay", numSignal "delayRange" ), ( field "time", numSignal "timeRange" ), ( field "distance", numSignal "distanceRange" ) ] "xFilter"
                        ]
                ]

        si =
            let
                sigs =
                    signal "chartHeight" [ siValue (vNum 100) ]
                        << signal "chartPadding" [ siValue (vNum 50) ]
                        << signal "height" [ siUpdate "(chartHeight + chartPadding) * 3" ]
                        << signal "delayExtent" [ siValue (vNums [ -60, 180 ]) ]
                        << signal "timeExtent" [ siValue (vNums [ 0, 24 ]) ]
                        << signal "distanceExtent" [ siValue (vNums [ 0, 2400 ]) ]
                        << signal "delayStep" [ siValue (vNum 10), siBind (iRange [ inMin 2, inMax 20, inStep 1 ]) ]
                        << signal "timeStep" [ siValue (vNum 1), siBind (iRange [ inMin 0.25, inMax 2, inStep 0.25 ]) ]
                        << signal "distanceStep" [ siValue (vNum 100), siBind (iRange [ inMin 50, inMax 200, inStep 50 ]) ]
                        << signal "xMove" [ siValue (vNum 0), siOn [ evHandler (esSelector (str "window:mousemove")) [ evUpdate "x()" ] ] ]
            in
            List.foldl sigGenerator (sigs []) facetNames |> signals

        sc =
            let
                layoutSc =
                    scale "layout" [ scType ScBand, scDomain (doStrs (strs facetNames)), scRange RaHeight ] []
            in
            List.foldl topScGenerator layoutSc facetNames |> scales

        mk =
            List.foldl groupGenerator [] facetNames |> marks
    in
    toVega
        [ width 500, padding 5, ds, si, sc, mk ]


interaction2 : Spec
interaction2 =
    let
        ds =
            dataSource
                [ data "sp500"
                    [ daUrl "https://vega.github.io/vega/data/sp500.csv"
                    , daFormat [ CSV, parse [ ( "price", FoNum ), ( "date", foDate "" ) ] ]
                    ]
                ]

        si =
            signals << signal "detailDomain" []

        mk =
            marks
                << mark Group
                    [ mName "detail"
                    , mEncode [ enEnter [ maHeight [ vNum 390 ], maWidth [ vNum 720 ] ] ]
                    , mGroup [ sc1 [], ax1 [], mk1 [] ]
                    ]
                << mark Group
                    [ mName "overview"
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vNum 430 ]
                            , maHeight [ vNum 70 ]
                            , maWidth [ vNum 720 ]
                            , maFill [ vStr "transparent" ]
                            ]
                        ]
                    , mGroup [ si1 [], sc2 [], ax2 [], mk3 [] ]
                    ]

        sc1 =
            scales
                << scale "xDetail"
                    [ scType ScTime
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "sp500", daField (field "date") ])
                    , scDomainRaw (vSignal "detailDomain")
                    ]
                << scale "yDetail"
                    [ scType ScLinear
                    , scRange (raNums [ 390, 0 ])
                    , scDomain (doData [ daDataset "sp500", daField (field "price") ])
                    , scNice NTrue
                    , scZero true
                    ]

        ax1 =
            axes
                << axis "xDetail" SBottom []
                << axis "yDetail" SLeft []

        mk1 =
            marks
                << mark Group
                    [ mEncode
                        [ enEnter
                            [ maHeight [ vField (fGroup (field "height")) ]
                            , maWidth [ vField (fGroup (field "width")) ]
                            , maGroupClip [ vBoo True ]
                            ]
                        ]
                    , mGroup [ mk2 [] ]
                    ]

        mk2 =
            marks
                << mark Area
                    [ mFrom [ srData (str "sp500") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xDetail", vField (field "date") ]
                            , maY [ vScale "yDetail", vField (field "price") ]
                            , maY2 [ vScale "yDetail", vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        ]
                    ]

        si1 =
            signals
                << signal "brush"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler (esSelector (str "@overview:mousedown")) [ evUpdate "[x(), x()]" ]
                        , evHandler (esSelector (str "[@overview:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[brush[0], clamp(x(), 0, width)]" ]
                        , evHandler (esSignal "delta") [ evUpdate "clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)" ]
                        ]
                    ]
                << signal "anchor"
                    [ siValue vNull
                    , siOn [ evHandler (esSelector (str "@brush:mousedown")) [ evUpdate "slice(brush)" ] ]
                    ]
                << signal "xDown"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@brush:mousedown")) [ evUpdate "x()" ] ]
                    ]
                << signal "delta"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "[@brush:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "x() - xDown" ] ]
                    ]
                << signal "detailDomain"
                    [ siPushOuter
                    , siOn [ evHandler (esSignal "brush") [ evUpdate "span(brush) ? invert('xOverview', brush) : null" ] ]
                    ]

        sc2 =
            scales
                << scale "xOverview"
                    [ scType ScTime
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "sp500", daField (field "date") ])
                    ]
                << scale "yOverview"
                    [ scType ScLinear
                    , scRange (raNums [ 70, 0 ])
                    , scDomain (doData [ daDataset "sp500", daField (field "price") ])
                    , scNice NTrue
                    , scZero true
                    ]

        ax2 =
            axes
                << axis "xOverview" SBottom []

        mk3 =
            marks
                << mark Area
                    [ mInteractive false
                    , mFrom [ srData (str "sp500") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xOverview", vField (field "date") ]
                            , maY [ vScale "yOverview", vField (field "price") ]
                            , maY2 [ vScale "yOverview", vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mName "brush"
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vNum 70 ]
                            , maFill [ vStr "#333" ]
                            , maFillOpacity [ vNum 0.2 ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "brush[0]" ]
                            , maX2 [ vSignal "brush[1]" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vNum 70 ]
                            , maWidth [ vNum 1 ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "brush[0]" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vNum 70 ]
                            , maWidth [ vNum 1 ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "brush[1]" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 720, height 480, padding 5, ds, si [], mk [] ]


interaction3 : Spec
interaction3 =
    let
        scGenerator var dir =
            let
                ra =
                    if dir == "X" then
                        raValues [ vNum 0, vSignal "chartSize" ]
                    else
                        raValues [ vSignal "chartSize", vNum 0 ]
            in
            scale (var ++ dir)
                [ scZero false
                , scNice NTrue
                , scRange ra
                , scDomain (doData [ daDataset "iris", daField (field var) ])
                ]

        cf =
            config [ cfAxis AxAll [ axTickColor "#ccc" ] ]

        ds =
            dataSource
                [ data "iris" [ daUrl "https://vega.github.io/vega/data/iris.json" ]
                , data "fields" [ daValue (vStrs [ "petalWidth", "petalLength", "sepalWidth", "sepalLength" ]) ]
                , data "cross" [ daSource "fields" ]
                    |> transform
                        [ trCross [ crAs "x" "y" ]
                        , trFormula "datum.x.data + 'X'" "xScale" AlwaysUpdate
                        , trFormula "datum.y.data + 'Y'" "yScale" AlwaysUpdate
                        ]
                ]

        si =
            signals
                << signal "chartSize" [ siValue (vNum 120) ]
                << signal "chartPad" [ siValue (vNum 15) ]
                << signal "chartStep" [ siUpdate "chartSize + chartPad" ]
                << signal "width" [ siUpdate "chartStep * 4" ]
                << signal "height" [ siUpdate "chartStep * 4" ]
                << signal "cell"
                    [ siValue vNull
                    , siOn
                        [ evHandler (esSelector (str "@cell:mousedown")) [ evUpdate "group()" ]
                        , evHandler (esSelector (str "@cell:mouseup")) [ evUpdate "!span(brushX) && !span(brushY) ? null : cell" ]
                        ]
                    ]
                << signal "brushX"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler (esSelector (str "@cell:mousedown")) [ evUpdate "[x(cell), x(cell)]" ]
                        , evHandler (esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove")) [ evUpdate "[brushX[0], clamp(x(cell), 0, chartSize)]" ]
                        , evHandler (esSignal "delta") [ evUpdate "clampRange([anchorX[0] + delta[0], anchorX[1] + delta[0]], 0, chartSize)" ]
                        ]
                    ]
                << signal "brushY"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler (esSelector (str "@cell:mousedown")) [ evUpdate "[y(cell), y(cell)]" ]
                        , evHandler (esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove")) [ evUpdate "[brushY[0], clamp(y(cell), 0, chartSize)]" ]
                        , evHandler (esSignal "delta") [ evUpdate "clampRange([anchorY[0] + delta[1], anchorY[1] + delta[1]], 0, chartSize)" ]
                        ]
                    ]
                << signal "down"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler (esSelector (str "@brush:mousedown")) [ evUpdate "[x(cell), y(cell)]" ] ]
                    ]
                << signal "anchorX"
                    [ siValue vNull
                    , siOn [ evHandler (esSelector (str "@brush:mousedown")) [ evUpdate "slice(brushX)" ] ]
                    ]
                << signal "anchorY"
                    [ siValue vNull
                    , siOn [ evHandler (esSelector (str "@brush:mousedown")) [ evUpdate "slice(brushY)" ] ]
                    ]
                << signal "delta"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler (esSelector (str "[@brush:mousedown, window:mouseup] > window:mousemove")) [ evUpdate "[x(cell) - down[0], y(cell) - down[1]]" ] ]
                    ]
                << signal "rangeX"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler (esSignal "brushX") [ evUpdate "invert(cell.datum.x.data + 'X', brushX)" ] ]
                    ]
                << signal "rangeY"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler (esSignal "brushY") [ evUpdate "invert(cell.datum.y.data + 'Y', brushY)" ] ]
                    ]
                << signal "cursor"
                    [ siValue (vStr "'default'")
                    , siOn
                        [ evHandler (esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "'nwse-resize'" ]
                        , evHandler (esSelector (str "@brush:mousemove, [@brush:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "'move'" ]
                        , evHandler (esSelector (str "@brush:mouseout, window:mouseup")) [ evUpdate "'default'" ]
                        ]
                    ]

        sc =
            scales
                << scale "groupX"
                    [ scType ScBand
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    ]
                << scale "groupY"
                    [ scType ScBand
                    , scRange (raValues [ vSignal "height", vNum 0 ])
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange RaCategory
                    , scDomain (doData [ daDataset "iris", daField (field "species") ])
                    ]
                << scGenerator "petalWidth" "X"
                << scGenerator "petalLength" "X"
                << scGenerator "sepalWidth" "X"
                << scGenerator "sepalLength" "X"
                << scGenerator "petalWidth" "Y"
                << scGenerator "petalLength" "Y"
                << scGenerator "sepalWidth" "Y"
                << scGenerator "sepalLength" "Y"

        ax =
            axes
                << axis "petalWidthY" SLeft [ axTitle (str "Petal Width"), axPosition (vSignal "3 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "petalLengthY" SLeft [ axTitle (str "Petal Length"), axPosition (vSignal "2 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "sepalWidthY" SLeft [ axTitle (str "Sepal Width"), axPosition (vSignal "1 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "sepalLengthY" SLeft [ axTitle (str "Sepal Length"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "petalWidthX" SBottom [ axTitle (str "Petal Width"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "petalLengthX" SBottom [ axTitle (str "Petal Length"), axPosition (vSignal "1 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "sepalWidthX" SBottom [ axTitle (str "Sepal Width"), axPosition (vSignal "2 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "sepalLengthX" SBottom [ axTitle (str "Sepal Length"), axPosition (vSignal "3 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Species")
                    , leOffset (vNum 0)
                    , leEncode
                        [ enSymbols
                            [ enUpdate
                                [ maFillOpacity [ vNum 0.5 ]
                                , maStroke [ vStr "transparent" ]
                                ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Rect
                    [ mEncode
                        [ enEnter
                            [ maFill [ vStr "#eee" ]
                            ]
                        , enUpdate
                            [ maOpacity [ vSignal "cell ? 1 : 0" ]
                            , maX [ vSignal "cell ? cell.x + brushX[0] : 0" ]
                            , maX2 [ vSignal "cell ? cell.x + brushX[1] : 0" ]
                            , maY [ vSignal "cell ? cell.y + brushY[0] : 0" ]
                            , maY2 [ vSignal "cell ? cell.y + brushY[1] : 0" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ mName "cell"
                    , mFrom [ srData (str "cross") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "groupX", vField (field "x.data") ]
                            , maY [ vScale "groupY", vField (field "y.data") ]
                            , maWidth [ vSignal "chartSize" ]
                            , maHeight [ vSignal "chartSize" ]
                            , maFill [ vStr "transparent" ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mGroup [ mk1 [] ]
                    ]
                << mark Rect
                    [ mName "brush"
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "transparent" ] ]
                        , enUpdate
                            [ maX [ vSignal "cell ? cell.x + brushX[0] : 0" ]
                            , maX2 [ vSignal "cell ? cell.x + brushX[1] : 0" ]
                            , maY [ vSignal "cell ? cell.y + brushY[0] : 0" ]
                            , maY2 [ vSignal "cell ? cell.y + brushY[1] : 0" ]
                            ]
                        ]
                    ]

        mk1 =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "iris") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maX [ vScaleField (fParent (field "xScale")), vField (fDatum (fParent (field "x.data"))) ]
                            , maY [ vScaleField (fParent (field "yScale")), vField (fDatum (fParent (field "y.data"))) ]
                            , maFillOpacity [ vNum 0.5 ]
                            , maSize [ vNum 36 ]
                            ]
                        , enUpdate
                            [ maFill
                                [ ifElse "!cell || inrange(datum[cell.datum.x.data], rangeX) && inrange(datum[cell.datum.y.data], rangeY)"
                                    [ vScale "cScale", vField (field "species") ]
                                    [ vStr "#ddd" ]
                                ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, padding 10, ds, si [], sc [], ax [], le [], mk [] ]


interaction4 : Spec
interaction4 =
    let
        cf =
            config []

        ds =
            dataSource
                [ data "wheat" [ daUrl "https://vega.github.io/vega/data/wheat.json" ]
                , data "wheat-filtered" [ daSource "wheat" ] |> transform [ trFilter (expr "!!datum.wages") ]
                , data "monarchs" [ daUrl "https://vega.github.io/vega/data/monarchs.json" ]
                    |> transform [ trFormula "((!datum.commonwealth && datum.index % 2) ? -1: 1) * 2 + 95" "offset" AlwaysUpdate ]
                ]

        si =
            signals

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scDomain (doNums (nums [ 1565, 1825 ]))
                    , scZero false
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scZero true
                    , scDomain (doData [ daDataset "wheat", daField (field "wheat") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raStrs [ "black", "white" ])
                    , scDomain (doData [ daDataset "monarchs", daField (field "commonwealth") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTickCount (num 5), axFormat "04d" ]
                << axis "yScale"
                    SRight
                    [ axGrid true
                    , axDomain false
                    , axZIndex (num 1)
                    , axTickCount (num 5)
                    , axOffset (vNum 5)
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "white" ], maStrokeWidth [ vNum 1 ], maStrokeOpacity [ vNum 0.25 ] ] ] )
                        , ( ELabels, [ enEnter [ maFontStyle [ vStr "italic" ] ] ] )
                        ]
                    ]

        le =
            legends

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "wheat") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maWidth [ vNum 17 ]
                            , maY [ vScale "yScale", vField (field "wheat") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill [ vStr "#aaa" ]
                            , maStroke [ vStr "#5d5d5d" ]
                            , maStrokeWidth [ vNum 0.25 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, padding 10, ds, si [], sc [], ax [], le [], mk [] ]


sourceExample : Spec
sourceExample =
    interaction3



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "interaction1", interaction1 )
        , ( "interaction2", interaction2 )
        , ( "interaction3", interaction3 )

        -- , ( "interaction4", interaction4 )
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
