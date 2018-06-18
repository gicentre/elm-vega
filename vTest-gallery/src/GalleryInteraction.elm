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
                    [ evHandler [ esSignal (core ++ "Zoom") ] [ evUpdate ("[(" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 - " ++ core ++ "Zoom, (" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 + " ++ core ++ "Zoom]") ]
                    , evHandler [ esSelector (str ("@" ++ core ++ ":dblclick!, @" ++ core ++ "Brush:dblclick!")) ] [ evUpdate ("[" ++ core ++ "Extent[0], " ++ core ++ "Extent[1]]") ]
                    , evHandler [ esSelector (str ("[@" ++ core ++ "Brush:mousedown, window:mouseup] > window:mousemove!")) ] [ evUpdate ("[" ++ core ++ "Range[0] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove), " ++ core ++ "Range[1] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove)]") ]
                    , evHandler [ esSelector (str ("[@" ++ core ++ ":mousedown, window:mouseup] > window:mousemove!")) ] [ evUpdate ("[min(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x())), max(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x()))]") ]
                    ]
                ]
                << signal (core ++ "Zoom")
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str ("@" ++ core ++ ":wheel!, @" ++ core ++ "Brush:wheel!")) ] [ evUpdate ("0.5 * abs(span(" ++ core ++ "Range)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))") ] ]
                    ]
                << signal (core ++ "Anchor")
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str ("@" ++ core ++ ":mousedown!")) ] [ evUpdate ("invert('" ++ core ++ "Scale', x())") ] ]
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
                        << signal "xMove" [ siValue (vNum 0), siOn [ evHandler [ esSelector (str "window:mousemove") ] [ evUpdate "x()" ] ] ]
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
                        [ evHandler [ esSelector (str "@overview:mousedown") ] [ evUpdate "[x(), x()]" ]
                        , evHandler [ esSelector (str "[@overview:mousedown, window:mouseup] > window:mousemove!") ] [ evUpdate "[brush[0], clamp(x(), 0, width)]" ]
                        , evHandler [ esSignal "delta" ] [ evUpdate "clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)" ]
                        ]
                    ]
                << signal "anchor"
                    [ siValue vNull
                    , siOn [ evHandler [ esSelector (str "@brush:mousedown") ] [ evUpdate "slice(brush)" ] ]
                    ]
                << signal "xDown"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "@brush:mousedown") ] [ evUpdate "x()" ] ]
                    ]
                << signal "delta"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "[@brush:mousedown, window:mouseup] > window:mousemove!") ] [ evUpdate "x() - xDown" ] ]
                    ]
                << signal "detailDomain"
                    [ siPushOuter
                    , siOn [ evHandler [ esSignal "brush" ] [ evUpdate "span(brush) ? invert('xOverview', brush) : null" ] ]
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
                        [ evHandler [ esSelector (str "@cell:mousedown") ] [ evUpdate "group()" ]
                        , evHandler [ esSelector (str "@cell:mouseup") ] [ evUpdate "!span(brushX) && !span(brushY) ? null : cell" ]
                        ]
                    ]
                << signal "brushX"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esSelector (str "@cell:mousedown") ] [ evUpdate "[x(cell), x(cell)]" ]
                        , evHandler [ esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove") ] [ evUpdate "[brushX[0], clamp(x(cell), 0, chartSize)]" ]
                        , evHandler [ esSignal "delta" ] [ evUpdate "clampRange([anchorX[0] + delta[0], anchorX[1] + delta[0]], 0, chartSize)" ]
                        ]
                    ]
                << signal "brushY"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esSelector (str "@cell:mousedown") ] [ evUpdate "[y(cell), y(cell)]" ]
                        , evHandler [ esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove") ] [ evUpdate "[brushY[0], clamp(y(cell), 0, chartSize)]" ]
                        , evHandler [ esSignal "delta" ] [ evUpdate "clampRange([anchorY[0] + delta[1], anchorY[1] + delta[1]], 0, chartSize)" ]
                        ]
                    ]
                << signal "down"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler [ esSelector (str "@brush:mousedown") ] [ evUpdate "[x(cell), y(cell)]" ] ]
                    ]
                << signal "anchorX"
                    [ siValue vNull
                    , siOn [ evHandler [ esSelector (str "@brush:mousedown") ] [ evUpdate "slice(brushX)" ] ]
                    ]
                << signal "anchorY"
                    [ siValue vNull
                    , siOn [ evHandler [ esSelector (str "@brush:mousedown") ] [ evUpdate "slice(brushY)" ] ]
                    ]
                << signal "delta"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler [ esSelector (str "[@brush:mousedown, window:mouseup] > window:mousemove") ] [ evUpdate "[x(cell) - down[0], y(cell) - down[1]]" ] ]
                    ]
                << signal "rangeX"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler [ esSignal "brushX" ] [ evUpdate "invert(cell.datum.x.data + 'X', brushX)" ] ]
                    ]
                << signal "rangeY"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn [ evHandler [ esSignal "brushY" ] [ evUpdate "invert(cell.datum.y.data + 'Y', brushY)" ] ]
                    ]
                << signal "cursor"
                    [ siValue (vStr "'default'")
                    , siOn
                        [ evHandler [ esSelector (str "[@cell:mousedown, window:mouseup] > window:mousemove!") ] [ evUpdate "'nwse-resize'" ]
                        , evHandler [ esSelector (str "@brush:mousemove, [@brush:mousedown, window:mouseup] > window:mousemove!") ] [ evUpdate "'move'" ]
                        , evHandler [ esSelector (str "@brush:mouseout, window:mouseup") ] [ evUpdate "'default'" ]
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
            config
                [ cfAxis AxAll
                    [ axDomain false
                    , axTickSize (num 3)
                    , axTickColor "#888"
                    , axLabelFont "Monaco, Courier New"
                    ]
                ]

        ds =
            dataSource
                [ data "points" [ daUrl "https://vega.github.io/vega/data/normal-2d.json" ]
                    |> transform
                        [ trExtentAsSignal (field "u") "xExt"
                        , trExtentAsSignal (field "v") "yExt"
                        ]
                ]

        si =
            signals
                << signal "margin" [ siValue (vNum 20) ]
                << signal "hover"
                    [ siOn
                        [ evHandler [ esSelector (str "*:mouseover") ] [ evEncode "hover" ]
                        , evHandler [ esSelector (str "*:mouseout") ] [ evEncode "leave" ]
                        , evHandler [ esSelector (str "*:mousedown") ] [ evEncode "select" ]
                        , evHandler [ esSelector (str "*:mousup") ] [ evEncode "release" ]
                        ]
                    ]
                << signal "xOffset" [ siUpdate "-(height + padding.bottom)" ]
                << signal "yOffset" [ siUpdate "-(width + padding.left)" ]
                << signal "xRange" [ siUpdate "[0, width]" ]
                << signal "yRange" [ siUpdate "[height, 0]" ]
                << signal "down"
                    [ siValue vNull
                    , siOn
                        [ evHandler [ esSelector (str "touchend") ] [ evUpdate "null" ]
                        , evHandler [ esSelector (str "mousedown, touchstart") ] [ evUpdate "xy()" ]
                        ]
                    ]
                << signal "xCur"
                    [ siValue vNull
                    , siOn
                        [ evHandler [ esSelector (str "mousedown, touchstart, touchend") ] [ evUpdate "slice(xDom)" ]
                        ]
                    ]
                << signal "yCur"
                    [ siValue vNull
                    , siOn
                        [ evHandler [ esSelector (str "mousedown, touchstart, touchend") ] [ evUpdate "slice(yDom)" ]
                        ]
                    ]
                << signal "delta"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esSource ESWindow
                                , esType MouseMove
                                , esConsume true
                                , esBetween [ esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                ]
                            , esObject
                                [ esType TouchMove
                                , esConsume true
                                , esFilter [ "event.touches.length === 1" ]
                                ]
                            ]
                            [ evUpdate "down ? [down[0]-x(), y()-down[1]] : [0,0]" ]
                        ]
                    ]
                << signal "anchor"
                    [ siValue (vNums [ 0, 0 ])
                    , siOn
                        [ evHandler [ esObject [ esType Wheel ] ] [ evUpdate "[invert('xScale', x()), invert('yScale', y())]" ]
                        , evHandler [ esObject [ esType TouchStart, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "[(xDom[0] + xDom[1]) / 2, (yDom[0] + yDom[1]) / 2]" ]
                        ]
                    ]
                << signal "zoom"
                    [ siValue (vNum 1)
                    , siOn
                        [ evHandler [ esObject [ esType Wheel, esConsume true ] ] [ evForce true, evUpdate "pow(1.001, event.deltaY * pow(16, event.deltaMode))" ]
                        , evHandler [ esSignal "dist2" ] [ evForce true, evUpdate "dist1 / dist2" ]
                        ]
                    ]
                << signal "dist1"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esObject [ esType TouchStart, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "pinchDistance(event)" ]
                        , evHandler [ esSignal "dist2" ] [ evUpdate "dist2" ]
                        ]
                    ]
                << signal "dist2"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esObject [ esType TouchMove, esConsume true, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "pinchDistance(event)" ]
                        ]
                    ]
                << signal "xDom"
                    [ siUpdate "slice(xExt)"
                    , siReact false
                    , siOn
                        [ evHandler [ esSignal "delta" ] [ evUpdate "[xCur[0] + span(xCur) * delta[0] / width, xCur[1] + span(xCur) * delta[0] / width]" ]
                        , evHandler [ esSignal "zoom" ] [ evUpdate "[anchor[0] + (xDom[0] - anchor[0]) * zoom, anchor[0] + (xDom[1] - anchor[0]) * zoom]" ]
                        ]
                    ]
                << signal "yDom"
                    [ siUpdate "slice(yExt)"
                    , siReact false
                    , siOn
                        [ evHandler [ esSignal "delta" ] [ evUpdate "[yCur[0] + span(yCur) * delta[1] / height, yCur[1] + span(yCur) * delta[1] / height]" ]
                        , evHandler [ esSignal "zoom" ] [ evUpdate "[anchor[1] + (yDom[0] - anchor[1]) * zoom, anchor[1] + (yDom[1] - anchor[1]) * zoom]" ]
                        ]
                    ]
                << signal "size" [ siUpdate "clamp(20 / span(xDom), 1, 1000)" ]

        sc =
            scales
                << scale "xScale"
                    [ scZero false
                    , scDomain (doSignal "xDom")
                    , scRange (raSignal "xRange")
                    ]
                << scale "yScale"
                    [ scZero false
                    , scDomain (doSignal "yDom")
                    , scRange (raSignal "yRange")
                    ]

        ax =
            axes
                << axis "xScale" STop [ axOffset (vSignal "xOffset") ]
                << axis "yScale" SRight [ axOffset (vSignal "yOffset") ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "points") ]
                    , mClip (clEnabled true)
                    , mEncode
                        [ enEnter
                            [ maFillOpacity [ vNum 0.6 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "u") ]
                            , maY [ vScale "yScale", vField (field "v") ]
                            , maSize [ vSignal "size" ]
                            ]
                        , enHover [ maFill [ vStr "firebrick" ] ]
                        , enCustom "leave" [ maFill [ vStr "steelblue" ] ]
                        , enCustom "select" [ maSize [ vSignal "size", vMultiply (vNum 5) ] ]
                        , enCustom "release" [ maSize [ vSignal "size" ] ]
                        ]
                    ]
    in
    toVega
        [ cf, width 500, height 300, paddings 40 10 10 20, autosize [ ANone ], ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    interaction4



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "interaction1", interaction1 )
        , ( "interaction2", interaction2 )
        , ( "interaction3", interaction3 )
        , ( "interaction4", interaction4 )
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
