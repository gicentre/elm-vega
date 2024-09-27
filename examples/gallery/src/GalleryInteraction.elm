port module GalleryInteraction exposing (elmToJS)

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
                    [ scType scLinear
                    , scDomain (doData [ daDataset (core ++ "-bins"), daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        topScGenerator core =
            scale (core ++ "Scale")
                [ scType scLinear
                , scRound true
                , scDomain (doSignal (core ++ "Extent"))
                , scRange raWidth
                ]

        axGenerator core =
            axes << axis (core ++ "Scale") siBottom []

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
                << mark rect
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
                << mark rect
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
                << mark rect
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
                << mark rect
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
                << mark text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ titleText ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ black ]
                            ]
                        ]
                    ]

        groupGenerator core =
            mark group
                [ mName core
                , mEncode
                    [ enEnter
                        [ maY [ vScale "layout", vStr core, vOffset (vNum 20) ]
                        , maWidth [ vSignal "width" ]
                        , maHeight [ vSignal "chartHeight" ]
                        , maFill [ transparent ]
                        ]
                    ]
                , mGroup [ dsGenerator core, scGenerator core [], axGenerator core [], mkGenerator core [] ]
                ]

        ds =
            dataSource
                [ data "flights"
                    [ daUrl (str (dPath ++ "flights-200k.json")) ]
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
                    scale "layout" [ scType scBand, scDomain (doStrs (strs facetNames)), scRange raHeight ] []
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
                    [ daUrl (str (dPath ++ "sp500.csv"))
                    , daFormat [ csv, parse [ ( "price", foNum ), ( "date", foDate "" ) ] ]
                    ]
                ]

        si =
            signals << signal "detailDomain" []

        mk =
            marks
                << mark group
                    [ mName "detail"
                    , mEncode [ enEnter [ maHeight [ vNum 390 ], maWidth [ vNum 720 ] ] ]
                    , mGroup [ sc1 [], ax1 [], mk1 [] ]
                    ]
                << mark group
                    [ mName "overview"
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vNum 430 ]
                            , maHeight [ vNum 70 ]
                            , maWidth [ vNum 720 ]
                            , maFill [ transparent ]
                            ]
                        ]
                    , mGroup [ si1 [], sc2 [], ax2 [], mk3 [] ]
                    ]

        sc1 =
            scales
                << scale "xDetail"
                    [ scType scTime
                    , scRange raWidth
                    , scDomain (doData [ daDataset "sp500", daField (field "date") ])
                    , scDomainRaw (vSignal "detailDomain")
                    ]
                << scale "yDetail"
                    [ scType scLinear
                    , scRange (raNums [ 390, 0 ])
                    , scDomain (doData [ daDataset "sp500", daField (field "price") ])
                    , scNice niTrue
                    , scZero true
                    ]

        ax1 =
            axes
                << axis "xDetail" siBottom []
                << axis "yDetail" siLeft []

        mk1 =
            marks
                << mark group
                    [ mEncode
                        [ enEnter
                            [ maHeight [ vField (fGroup (field "height")) ]
                            , maWidth [ vField (fGroup (field "width")) ]
                            , maGroupClip [ vTrue ]
                            ]
                        ]
                    , mGroup [ mk2 [] ]
                    ]

        mk2 =
            marks
                << mark area
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
                    [ scType scTime
                    , scRange raWidth
                    , scDomain (doData [ daDataset "sp500", daField (field "date") ])
                    ]
                << scale "yOverview"
                    [ scType scLinear
                    , scRange (raNums [ 70, 0 ])
                    , scDomain (doData [ daDataset "sp500", daField (field "price") ])
                    , scNice niTrue
                    , scZero true
                    ]

        ax2 =
            axes
                << axis "xOverview" siBottom []

        mk3 =
            marks
                << mark area
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
                << mark rect
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
                << mark rect
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
                << mark rect
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
                , scNice niTrue
                , scRange ra
                , scDomain (doData [ daDataset "penguins", daField (field var) ])
                ]

        cf =
            config [ cfAxis axAll [ axTickColor (str "#ccc") ] ]

        ds =
            dataSource
                [ data "penguins" [ daUrl (str (dPath ++ "penguins.json")) ]
                    |> transform [ trFilter (expr "datum['Beak Length (mm)'] > 0 ") ]
                , data "fields" [ daValue (vStrs [ "Beak Length (mm)", "Beak Depth (mm)", "Flipper Length (mm)", "Body Mass (g)" ]) ]
                , data "cross" [ daSource "fields" ]
                    |> transform
                        [ trCross [ crAs "x" "y" ]
                        , trFormula "datum.x.data + 'X'" "xScale"
                        , trFormula "datum.y.data + 'Y'" "yScale"
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
                    [ scType scBand
                    , scRange raWidth
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    ]
                << scale "groupY"
                    [ scType scBand
                    , scRange (raValues [ vSignal "height", vNum 0 ])
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "penguins", daField (field "Species") ])
                    ]
                << scGenerator "Beak Length (mm)" "X"
                << scGenerator "Beak Depth (mm)" "X"
                << scGenerator "Flipper Length (mm)" "X"
                << scGenerator "Body Mass (g)" "X"
                << scGenerator "Beak Length (mm)" "Y"
                << scGenerator "Beak Depth (mm)" "Y"
                << scGenerator "Flipper Length (mm)" "Y"
                << scGenerator "Body Mass (g)" "Y"

        ax =
            axes
                << axis "Beak Length (mm)Y" siLeft [ axTitle (str "Beak Length (mm)"), axPosition (vSignal "3 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "Beak Depth (mm)Y" siLeft [ axTitle (str "Beak Depth (mm)"), axPosition (vSignal "2 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "Flipper Length (mm)Y" siLeft [ axTitle (str "Flipper Length (mm)"), axPosition (vSignal "1 * chartStep"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "Body Mass (g)Y" siLeft [ axTitle (str "Body Mass (g)"), axMinExtent (vNum 25), axTickCount (num 5), axDomain false ]
                << axis "Beak Length (mm)X" siBottom [ axTitle (str "Beak Length (mm)"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "Beak Depth (mm)X" siBottom [ axTitle (str "Beak Depth (mm)"), axPosition (vSignal "1 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "Flipper Length (mm)X" siBottom [ axTitle (str "Flipper Length (mm)"), axPosition (vSignal "2 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]
                << axis "Body Mass (g)X" siBottom [ axTitle (str "Body Mass (g)"), axPosition (vSignal "3 * chartStep"), axOffset (vSignal "-chartPad"), axTickCount (num 5), axDomain false ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Species")
                    , leOffset (num 0)
                    , leEncode
                        [ enSymbols
                            [ enUpdate
                                [ maFillOpacity [ vNum 0.5 ]
                                , maStroke [ transparent ]
                                ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark rect
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
                << mark group
                    [ mName "cell"
                    , mFrom [ srData (str "cross") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "groupX", vField (field "x.data") ]
                            , maY [ vScale "groupY", vField (field "y.data") ]
                            , maWidth [ vSignal "chartSize" ]
                            , maHeight [ vSignal "chartSize" ]
                            , maFill [ transparent ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mGroup [ mk1 [] ]
                    ]
                << mark rect
                    [ mName "brush"
                    , mEncode
                        [ enEnter
                            [ maFill [ transparent ] ]
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
                << mark symbol
                    [ mFrom [ srData (str "penguins") ]
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
                                    [ vScale "cScale", vField (field "Species") ]
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
                [ cfAxis axAll
                    [ axDomain false
                    , axTickSize (num 3)
                    , axTickColor (str "#888")
                    , axLabelFont (str "Monaco, Courier New")
                    ]
                ]

        ds =
            dataSource
                [ data "points" [ daUrl (str (dPath ++ "normal-2d.json")) ]
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
                                [ esSource esWindow
                                , esType etMouseMove
                                , esConsume true
                                , esBetween [ esType etMouseDown ] [ esSource esWindow, esType etMouseUp ]
                                ]
                            , esObject
                                [ esType etTouchMove
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
                        [ evHandler [ esObject [ esType etWheel ] ] [ evUpdate "[invert('xScale', x()), invert('yScale', y())]" ]
                        , evHandler [ esObject [ esType etTouchStart, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "[(xDom[0] + xDom[1]) / 2, (yDom[0] + yDom[1]) / 2]" ]
                        ]
                    ]
                << signal "zoom"
                    [ siValue (vNum 1)
                    , siOn
                        [ evHandler [ esObject [ esType etWheel, esConsume true ] ] [ evForce true, evUpdate "pow(1.001, event.deltaY * pow(16, event.deltaMode))" ]
                        , evHandler [ esSignal "dist2" ] [ evForce true, evUpdate "dist1 / dist2" ]
                        ]
                    ]
                << signal "dist1"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esObject [ esType etTouchStart, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "pinchDistance(event)" ]
                        , evHandler [ esSignal "dist2" ] [ evUpdate "dist2" ]
                        ]
                    ]
                << signal "dist2"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esObject [ esType etTouchMove, esConsume true, esFilter [ "event.touches.length===2" ] ] ] [ evUpdate "pinchDistance(event)" ]
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
                << axis "xScale" siTop [ axOffset (vSignal "xOffset") ]
                << axis "yScale" siRight [ axOffset (vSignal "yOffset") ]

        mk =
            marks
                << mark symbol
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
        [ cf, width 500, height 300, paddings 40 10 10 20, autosize [ asNone ], ds, si [], sc [], ax [], mk [] ]


interaction5 : Spec
interaction5 =
    let
        table =
            dataFromColumns "clusters" []
                << dataColumn "id" (vNums [ 0, 1, 2, 3, 4, 5 ])
                << dataColumn "name" (vStrs [ "South Asia", "Europe & Cental Asia", "Sub-Saharan Africa", "America", "East Asia & Pacific", "Middle East & North Africa" ])

        ds =
            dataSource
                [ data "gapminder" [ daUrl (str (dPath ++ "gapminder.json")) ]
                , table []
                , data "country_timeline" [ daSource "gapminder" ]
                    |> transform
                        [ trFilter (expr "timeline && datum.country == timeline.country")
                        , trCollect [ ( field "year", ascend ) ]
                        ]
                , data "thisYear" [ daSource "gapminder" ]
                    |> transform [ trFilter (expr "datum.year == currentYear") ]
                , data "prevYear" [ daSource "gapminder" ]
                    |> transform [ trFilter (expr "datum.year == currentYear - stepYear") ]
                , data "nextYear" [ daSource "gapminder" ]
                    |> transform [ trFilter (expr "datum.year == currentYear + stepYear") ]
                , data "countries" [ daSource "gapminder" ]
                    |> transform [ trAggregate [ agGroupBy [ field "country" ] ] ]
                , data "interpolate" [ daSource "countries" ]
                    |> transform
                        [ trLookup "thisYear" (field "country") [ field "country" ] [ luAs [ "this" ], luDefault (vObject []) ]
                        , trLookup "prevYear" (field "country") [ field "country" ] [ luAs [ "prev" ], luDefault (vObject []) ]
                        , trLookup "nextYear" (field "country") [ field "country" ] [ luAs [ "next" ], luDefault (vObject []) ]
                        , trFormula "interYear > currentYear ? datum.next.fertility : (datum.prev.fertility||datum.this.fertility)" "target_fertility"
                        , trFormula "interYear > currentYear ? datum.next.life_expect : (datum.prev.life_expect||datum.this.life_expect)" "target_life_expect"
                        , trFormula "interYear==2000 ? datum.this.fertility : datum.this.fertility + (datum.target_fertility-datum.this.fertility) * abs(interYear-datum.this.year)/5" "inter_fertility"
                        , trFormula "interYear==2000 ? datum.this.life_expect : datum.this.life_expect + (datum.target_life_expect-datum.this.life_expect) * abs(interYear-datum.this.year)/5" "inter_life_expect"
                        ]
                , data "trackCountries" [ daOn [ trigger "active" [ tgToggle "{country: active.country}" ] ] ]
                ]

        si =
            signals
                << signal "minYear" [ siValue (vNum 1955) ]
                << signal "maxYear" [ siValue (vNum 2005) ]
                << signal "stepYear" [ siValue (vNum 5) ]
                << signal "active"
                    [ siValue (vObject [])
                    , siOn
                        [ evHandler [ esSelector (str "@point:mousedown, @point:touchstart") ] [ evUpdate "datum" ]
                        , evHandler [ esSelector (str "window:mouseup, window:touchend") ] [ evUpdate "" ]
                        ]
                    ]
                << signal "isActive" [ siUpdate "active.country" ]
                << signal "timeline"
                    [ siValue (vObject [])
                    , siOn
                        [ evHandler [ esSelector (str "@point:mouseover") ] [ evUpdate "isActive ? active : datum" ]
                        , evHandler [ esSelector (str "@point:mouseout") ] [ evUpdate "active" ]
                        , evHandler [ esSignal "active" ] [ evUpdate "active" ]
                        ]
                    ]
                << signal "tX"
                    [ siOn [ evHandler [ esSelector (str "mousemove!, touchmove!") ] [ evUpdate "isActive ? scale('xScale', active.this.fertility) : tX" ] ] ]
                << signal "tY"
                    [ siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? scale('yScale', active.this.life_expect) : tY" ] ] ]
                << signal "pX"
                    [ siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? scale('xScale', active.prev.fertility) : pX" ] ] ]
                << signal "pY"
                    [ siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? scale('yScale', active.prev.life_expect) : pY" ] ] ]
                << signal "nX"
                    [ siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? scale('xScale', active.next.fertility) : nX" ] ] ]
                << signal "nY"
                    [ siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? scale('yScale', active.next.life_expect) : nY" ] ] ]
                << signal "thisDist"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? sqrt(pow(x()-tX, 2) + pow(y()-tY, 2)) : thisDist" ] ]
                    ]
                << signal "prevDist"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? sqrt(pow(x()-pX, 2) + pow(y()-pY, 2)): prevDist" ] ]
                    ]
                << signal "nextDist"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? sqrt(pow(x()-nX, 2) + pow(y()-nY, 2)) : nextDist" ] ]
                    ]
                << signal "prevScore"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? ((pX-tX) * (x()-tX) + (pY-tY) * (y()-tY))/prevDist || -999999 : prevScore" ] ]
                    ]
                << signal "nextScore"
                    [ siValue (vNum 0)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? ((nX-tX) * (x()-tX) + (nY-tY) * (y()-tY))/nextDist || -999999 : nextScore" ] ]
                    ]
                << signal "interYear"
                    [ siValue (vNum 1980)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? (min(maxYear, currentYear+5, max(minYear, currentYear-5, prevScore > nextScore ? (currentYear - 2.5*prevScore/sqrt(pow(pX-tX, 2) + pow(pY-tY, 2))) : (currentYear + 2.5*nextScore/sqrt(pow(nX-tX, 2) + pow(nY-tY, 2)))))) : interYear" ] ]
                    ]
                << signal "currentYear"
                    [ siValue (vNum 1980)
                    , siOn [ evHandler [ esSelector (str "mousemove, touchmove") ] [ evUpdate "isActive ? (min(maxYear, max(minYear, prevScore > nextScore ? (thisDist < prevDist ? currentYear : currentYear-5) : (thisDist < nextDist ? currentYear : currentYear+5)))) : currentYear" ] ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scNice niTrue
                    , scDomain (doData [ daDataset "gapminder", daField (field "fertility") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scZero false
                    , scNice niTrue
                    , scDomain (doData [ daDataset "gapminder", daField (field "life_expect") ])
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "gapminder", daField (field "cluster") ])
                    , scRange raCategory
                    ]
                << scale "lScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "clusters", daField (field "id") ])
                    , scRange (raData [ daDataset "clusters", daField (field "name") ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "Fertility"), axGrid true, axTickCount (num 5) ]
                << axis "yScale" siLeft [ axTitle (str "Life Expectancy"), axGrid true, axTickCount (num 5) ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Region")
                    , leOrient loRight
                    , leEncode
                        [ enSymbols [ enEnter [ maFillOpacity [ vNum 0.5 ] ] ]
                        , enLabels [ enUpdate [ maText [ vScale "lScale", vField (field "value") ] ] ]
                        ]
                    ]

        mk =
            marks
                << mark text
                    [ mEncode
                        [ enUpdate
                            [ maText [ vSignal "currentYear" ]
                            , maX [ vNum 300 ]
                            , maY [ vNum 300 ]
                            , maFill [ vStr "grey" ]
                            , maFillOpacity [ vNum 0.25 ]
                            , maFontSize [ vNum 100 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "country_timeline") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "fertility"), vOffset (vNum 5) ]
                            , maY [ vScale "yScale", vField (field "life_expect") ]
                            , maFill [ vStr "#555" ]
                            , maFillOpacity [ vNum 0.6 ]
                            , maText [ vField (field "year") ]
                            ]
                        ]
                    ]
                << mark line
                    [ mFrom [ srData (str "country_timeline") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "fertility") ]
                            , maY [ vScale "yScale", vField (field "life_expect") ]
                            , maStroke [ vStr "#bbb" ]
                            , maStrokeWidth [ vNum 5 ]
                            , maFillOpacity [ vNum 0.5 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mName "point"
                    , mFrom [ srData (str "interpolate") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "this.cluster") ]
                            , maSize [ vNum 150 ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "inter_fertility") ]
                            , maY [ vScale "yScale", vField (field "inter_life_expect") ]
                            , maFillOpacity
                                [ ifElse "datum.country==timeline.country || indata('trackCountries', 'country', datum.country)"
                                    [ vNum 1 ]
                                    [ vNum 0.5 ]
                                ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "interpolate") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "#333" ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vField (field "country") ]
                            , maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "inter_fertility") ]
                            , maY [ vScale "yScale", vField (field "inter_life_expect"), vOffset (vNum -7) ]
                            , maFillOpacity
                                [ ifElse "datum.country==timeline.country || indata('trackCountries', 'country', datum.country)"
                                    [ vNum 0.8 ]
                                    [ vNum 0 ]
                                ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 600, padding 5, ds, si [], sc [], ax [], le [], mk [] ]


interaction6 : Spec
interaction6 =
    let
        ds =
            dataSource
                [ data "source" [ daUrl (str (dPath ++ "cars.json")) ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Origin'] != null") ]
                , data "selected"
                    [ daOn
                        [ trigger "clear" [ tgRemoveAll ]
                        , trigger "!shift" [ tgRemoveAll ]
                        , trigger "!shift && clicked" [ tgInsert "clicked" ]
                        , trigger "shift && clicked" [ tgToggle "clicked" ]
                        ]
                    ]
                ]

        si =
            signals
                << signal "clear"
                    [ siValue vTrue
                    , siOn [ evHandler [ esSelector (str "mouseup[!event.item]") ] [ evUpdate "true", evForce true ] ]
                    ]
                << signal "shift"
                    [ siValue vFalse
                    , siOn [ evHandler [ esSelector (str "@legendSymbol:click, @legendLabel:click") ] [ evUpdate "event.shiftKey", evForce true ] ]
                    ]
                << signal "clicked"
                    [ siValue vNull
                    , siOn [ evHandler [ esSelector (str "@legendSymbol:click, @legendLabel:click") ] [ evUpdate "{value: datum.value}", evForce true ] ]
                    ]
                << signal "brush"
                    [ siValue (vNum 0)
                    , siOn
                        [ evHandler [ esSignal "clear" ] [ evUpdate "clear ? [0, 0] : brush" ]
                        , evHandler [ esSelector (str "@xAxis:mousedown") ] [ evUpdate "[x(), x()]" ]
                        , evHandler [ esSelector (str "[@xAxis:mousedown, window:mouseup] > window:mousemove!") ] [ evUpdate "[brush[0], clamp(x(), 0, width)]" ]
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
                << signal "domain"
                    [ siOn
                        [ evHandler [ esSignal "brush" ] [ evUpdate "span(brush) ? invert('xScale', brush) : null" ] ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scRound true
                    , scNice niTrue
                    , scZero true
                    , scDomain (doData [ daDataset "source", daField (field "Horsepower") ])
                    , scRange (raNums [ 0, 200 ])
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scRound true
                    , scNice niTrue
                    , scZero true
                    , scDomain (doData [ daDataset "source", daField (field "Miles_per_Gallon") ])
                    , scRange (raNums [ 200, 0 ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "source", daField (field "Origin") ])
                    , scRange (raScheme (str "category10") [])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "Horsepower"), axGrid true, axDomain false, axTickCount (num 5) ]
                << axis "yScale" siLeft [ axTitle (str "Miles per gallon"), axGrid true, axDomain false, axTitlePadding (vNum 5) ]

        le =
            legends
                << legend
                    [ leStroke "cScale"
                    , leTitle (str "Origin")
                    , leEncode
                        [ enSymbols
                            [ enName "legendSymbol"
                            , enInteractive true
                            , enUpdate
                                [ maFill [ transparent ]
                                , maStrokeWidth [ vNum 2 ]
                                , maOpacity
                                    [ ifElse "!length(data('selected')) || indata('selected', 'value', datum.value)"
                                        [ vNum 0.7 ]
                                        [ vNum 0.15 ]
                                    ]
                                , maSize [ vNum 64 ]
                                ]
                            ]
                        , enLabels
                            [ enName "legendLabel"
                            , enInteractive true
                            , enUpdate
                                [ maOpacity
                                    [ ifElse "!length(data('selected')) || indata('selected', 'value', datum.value)"
                                        [ vNum 1 ]
                                        [ vNum 0.25 ]
                                    ]
                                ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark rect
                    [ mName "xAxis"
                    , mInteractive true
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maHeight [ vNum 35 ]
                            , maFill [ transparent ]
                            , maCursor [ cursorValue cuEWResize ]
                            ]
                        , enUpdate
                            [ maY [ vSignal "height" ]
                            , maWidth [ vSignal "span(range('xScale'))" ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "height" ]
                            , maFill [ vStr "#ddd" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "brush[0]" ]
                            , maX2 [ vSignal "brush[1]" ]
                            , maFillOpacity [ vSignal "domain ? 0.2 : 0" ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mName "marks"
                    , mFrom [ srData (str "source") ]
                    , mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "Horsepower") ]
                            , maY [ vScale "yScale", vField (field "Miles_per_Gallon") ]
                            , maShape [ symbolValue symCircle ]
                            , maStrokeWidth [ vNum 2 ]
                            , maOpacity
                                [ ifElse "(!domain || inrange(datum.Horsepower, domain)) && (!length(data('selected')) || indata('selected', 'value', datum.Origin))"
                                    [ vNum 0.7 ]
                                    [ vNum 0.15 ]
                                ]
                            , maStroke
                                [ ifElse "(!domain || inrange(datum.Horsepower, domain)) && (!length(data('selected')) || indata('selected', 'value', datum.Origin))"
                                    [ vScale "cScale", vField (field "Origin") ]
                                    [ vStr "#ccc" ]
                                ]
                            , maFill [ transparent ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mName "brush"
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "height" ]
                            , maFill [ transparent ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "brush[0]" ]
                            , maX2 [ vSignal "brush[1]" ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "height" ]
                            , maWidth [ vNum 1 ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maFillOpacity [ vSignal "domain ? 1 : 0" ]
                            , maX [ vSignal "brush[0]" ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "height" ]
                            , maWidth [ vNum 1 ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        , enUpdate
                            [ maFillOpacity [ vSignal "domain ? 1 : 0" ]
                            , maX [ vSignal "brush[1]" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, autosize [ asPad ], ds, si [], sc [], ax [], le [], mk [] ]


interaction7 : Spec
interaction7 =
    let
        ds =
            dataSource
                [ data "stocks"
                    [ daUrl (str (dPath ++ "stocks.csv"))
                    , daFormat [ csv, parse [ ( "price", foNum ), ( "date", foDate "" ) ] ]
                    ]
                , data "index"
                    [ daSource "stocks" ]
                    |> transform [ trFilter (expr "month(datum.date) == month(indexDate) && year(datum.date) == year(indexDate)") ]
                , data "indexed_stocks"
                    [ daSource "stocks" ]
                    |> transform
                        [ trLookup "index"
                            (field "symbol")
                            [ field "symbol" ]
                            [ luAs [ "index" ]
                            , luDefault (vObject [ keyValue "price" (vNum 0) ])
                            ]
                        , trFormula
                            "datum.index.price > 0 ? (datum.price - datum.index.price)/datum.index.price : 0"
                            "indexed_price"
                        ]
                ]

        si =
            signals
                << signal "indexDate"
                    [ siUpdate "time('Jan 1 2005')"
                    , siOn [ evHandler [ esSelector (str "mousemove") ] [ evUpdate "invert('xScale', clamp(x(), 0, width))" ] ]
                    ]
                << signal "maxDate" [ siUpdate "time('Mar 1 2010')" ]

        sc =
            scales
                << scale "xScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "stocks", daField (field "date") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "indexed_stocks", daField (field "indexed_price") ])
                    , scNice niTrue
                    , scZero true
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "stocks", daField (field "symbol") ])
                    , scRange raCategory
                    ]

        ax =
            axes << axis "yScale" siLeft [ axGrid true, axFormat (str "%") ]

        mk =
            marks
                << mark group
                    [ mFrom [ srFacet (str "indexed_stocks") "series" [ faGroupBy [ field "symbol" ] ] ]
                    , mGroup [ ds1, mk1 [] ]
                    ]
                << mark rule
                    [ mEncode
                        [ enUpdate
                            [ maX [ vField (fGroup (field "xScale")) ]
                            , maX2 [ vField (fGroup (field "width")) ]
                            , maY [ vNum 0.5, vOffset (vObject [ vScale "yScale", vNum 0, vRound true ]) ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark rule
                    [ mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vSignal "indexDate", vOffset (vNum 0.5) ]
                            , maY [ vNum 0 ]
                            , maY2 [ vField (fGroup (field "height")) ]
                            , maStroke [ vStr "firebrick" ]
                            ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vSignal "indexDate" ]
                            , maY2 [ vField (fGroup (field "height")), vOffset (vNum 15) ]
                            , maAlign [ hCenter ]
                            , maText [ vSignal "timeFormat(indexDate, '%b %Y')" ]
                            , maFill [ vStr "firebrick" ]
                            ]
                        ]
                    ]

        ds1 =
            dataSource
                [ data "label" [ daSource "series" ]
                    |> transform [ trFilter (expr "datum.date == maxDate") ]
                ]

        mk1 =
            marks
                << mark line
                    [ mFrom [ srData (str "series") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "date") ]
                            , maY [ vScale "yScale", vField (field "indexed_price") ]
                            , maStroke [ vScale "cScale", vField (field "symbol") ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "label") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "date"), vOffset (vNum 2) ]
                            , maY [ vScale "yScale", vField (field "indexed_price") ]
                            , maFill [ vScale "cScale", vField (field "symbol") ]
                            , maText [ vField (field "symbol") ]
                            , maBaseline [ vMiddle ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 650, height 300, padding 5, autosize [ asFit, asPadding ], ds, si [], sc [], ax [], mk [] ]


interaction8 : Spec
interaction8 =
    let
        cf =
            config [ cfAxis axY [ axMinExtent (vNum 30) ] ]

        ds =
            dataSource
                [ data "random_data" []
                    |> transform
                        [ trSequence (num 1) (num 50001) (num 1)
                        , trFormula "random()" "x"
                        , trFormula "random()" "y"
                        , trFilter (expr "datum.data <= num_points")
                        ]
                , data "pi_estimates" [ daSource "random_data" ]
                    |> transform
                        [ trFormula "(datum.x * datum.x + datum.y * datum.y) < 1" "is_inside"
                        , trWindow [ wnAggOperation opSum (Just (field "is_inside")) "num_inside" ] []
                        , trFormula "4 * datum.num_inside / datum.data" "estimate"
                        ]
                , data "pi_estimate" [ daSource "pi_estimates" ]
                    |> transform
                        [ trFilter (expr "datum.data == num_points")
                        , trFormula "datum.estimate" "value"
                        ]
                , dataFromRows "pi" [] (dataRow [ ( "value", vNum 3.141592653589793 ) ] [])
                ]

        si =
            signals
                << signal "num_points"
                    [ siValue (vNum 1000)
                    , siBind (iRange [ inMin 10, inMax 5000, inStep 1, inDebounce 10 ])
                    ]

        lo =
            layout [ loPadding (num 10), loOffset (num 20), loBounds bcFull, loAlign grAlignAll ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scDomain (doNums (nums [ 0, 1 ]))
                    , scRange raHeight
                    , scReverse true
                    , scNice niTrue
                    , scZero true
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doNums (nums [ 0, 1 ]))
                    , scRange raHeight
                    , scNice niTrue
                    , scZero true
                    ]
                << scale "data_point_scale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "pi_estimates", daField (field "data") ])
                    , scRange raHeight
                    , scReverse true
                    , scNice niTrue
                    , scZero true
                    ]
                << scale "pi_scale"
                    [ scType scLinear
                    , scDomain
                        (doData
                            [ daReferences
                                [ [ daValues (vNums [ 2, 4 ]) ]
                                , [ daDataset "pi", daField (field "value") ]
                                , [ daDataset "pi_estimates", daField (field "estimate") ]
                                ]
                            ]
                        )
                    , scRange raHeight
                    , scNice niTrue
                    , scZero false
                    ]

        ax1 =
            axes
                << axis "xScale" siBottom [ axTitle (str "x"), axLabelFlush (num 1), axLabelOverlap osParity, axZIndex (num 1) ]
                << axis "xScale" siBottom [ axGrid true, axGridScale "yScale", axDomain false, axLabels false, axMaxExtent (vNum 0), axMinExtent (vNum 0), axTicks false, axZIndex (num 0) ]
                << axis "yScale" siLeft [ axTitle (str "y"), axLabelOverlap osParity, axZIndex (num 1) ]
                << axis "yScale" siLeft [ axGrid true, axGridScale "xScale", axDomain false, axLabels false, axMaxExtent (vNum 0), axMinExtent (vNum 0), axTicks false, axZIndex (num 0) ]

        ax2 =
            axes
                << axis "data_point_scale" siBottom [ axTitle (str "Number of points"), axLabelFlush (num 1), axLabelOverlap osParity, axZIndex (num 1) ]
                << axis "data_point_scale" siBottom [ axGrid true, axGridScale "pi_scale", axDomain false, axLabels false, axMaxExtent (vNum 0), axMinExtent (vNum 0), axTicks false, axZIndex (num 0) ]
                << axis "pi_scale" siLeft [ axTitle (str "Estimated pi value"), axLabelOverlap osParity, axZIndex (num 1) ]
                << axis "pi_scale" siLeft [ axGrid true, axGridScale "data_point_scale", axDomain false, axLabels false, axMaxExtent (vNum 0), axMinExtent (vNum 0), axTicks false, axZIndex (num 0) ]

        mk =
            marks
                << mark group
                    [ mStyle [ "cell" ]
                    , mEncode [ enUpdate [ maWidth [ vSignal "height" ], maHeight [ vSignal "height" ] ] ]
                    , mGroup [ ti1, mk1 [], ax1 [] ]
                    ]
                << mark group
                    [ mStyle [ "cell" ]
                    , mName "concat_1_group"
                    , mEncode [ enUpdate [ maWidth [ vSignal "height" ], maHeight [ vSignal "height" ] ] ]
                    , mGroup [ ti2, ax2 [], mk2 [] ]
                    ]

        ti1 =
            title (str "In Points and Out Points") [ tiFrame tfGroup ]

        ti2 =
            title (str "Pi Estimate") [ tiFrame tfGroup ]

        mk1 =
            marks
                << mark symbol
                    [ mStyle [ "circle" ]
                    , mFrom [ srData (str "random_data") ]
                    , mEncode
                        [ enUpdate
                            [ maOpacity [ vNum 0.6 ]
                            , maFill
                                [ ifElse "sqrt(datum.x * datum.x + datum.y * datum.y) <= 1"
                                    [ vStr "#003f5c" ]
                                    [ vStr "#ffa600" ]
                                ]
                            , maX [ vScale "xScale", vField (field "x") ]
                            , maY [ vScale "yScale", vField (field "y") ]
                            , maShape [ symbolValue symCircle ]
                            ]
                        ]
                    ]

        mk2 =
            marks
                << mark symbol
                    [ mStyle [ "circle" ]
                    , mFrom [ srData (str "pi_estimates") ]
                    , mEncode
                        [ enUpdate
                            [ maOpacity [ vNum 0.7 ]
                            , maFill [ vStr "#4c78a8" ]
                            , maX [ vScale "data_point_scale", vField (field "data") ]
                            , maY [ vScale "pi_scale", vField (field "estimate") ]
                            , maSize [ vNum 8 ]
                            , maShape [ symbolValue symCircle ]
                            ]
                        ]
                    ]
                << mark rule
                    [ mFrom [ srData (str "pi") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "darkgrey" ]
                            , maX [ vNum 0 ]
                            , maY [ vScale "pi_scale", vField (field "value") ]
                            , maX2 [ vField (fGroup (field "width")) ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "pi") ]
                    , mEncode
                        [ enUpdate
                            [ maAlign [ hLeft ]
                            , maX [ vNum 10 ]
                            , maFill [ black ]
                            , maY [ vScale "pi_scale", vField (field "value"), vOffset (vNum -5) ]
                            , maText [ vStr "Real Pi: 3.1415..." ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "pi_estimate") ]
                    , mEncode
                        [ enUpdate
                            [ maAlign [ hRight ]
                            , maX [ vSignal "height", vOffset (vNum -5) ]
                            , maDy [ vNum -5 ]
                            , maFill [ black ]
                            , maY [ vScale "pi_scale", vField (field "value") ]
                            , maText [ vSignal "'Estimate: ' + format(datum.estimate, ',.3f')" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, height 380, padding 5, autosize [ asPad ], ds, si [], sc [], lo, mk [] ]

interaction9 : Spec
interaction9 =
    let
        si =
            signals
                << signal "duration" [ siInit "750" , siOn [ evHandler [ esObject [ esType etClick ] ] [ evUpdate "(event.metaKey || event.ctrlKey ? 4 : 1) *750" ] ] ]
                << signal "k" [ siValue (vNum 1) , siOn [ evHandler [ esSignal "focus" ] [ evUpdate "focus ? width/(focus.r*2) : 1" ] ] ]
                << signal "root" [ siUpdate "{'id': data('tree')[0]['id'], 'x': data('tree')[0]['x'], 'y': data('tree')[0]['y'], 'r': data('tree')[0]['r'], 'k': 1, 'children': data('tree')[0]['children']}" ]
                << signal "focus"
                    [ siInit "root"
                    , siOn
                        [ 
                            evHandler [ esObject [ esType etClick ,esMarkName "background"] ] [ evUpdate "{id: root['id'], 'x': root['x'], 'y': root['y'], 'r': root['r'], 'k': 1,'children': root['children']}" ] 
                        ,   evHandler [ esObject [ esType etClick ,esMarkName "circles"] ] [ evUpdate "(focus['x'] === datum['x'] && focus['y'] === datum['y'] && focus['r'] === datum['r'] && focus['r'] !== root['r']) ? {'id': root['id'], 'x': root['x'], 'y': root['y'], 'r': root['r'], 'k': 1, 'children': root['children']} : {'id': datum['id'], 'x': datum['x'], 'y': datum['y'], 'r': datum['r'], 'k': k, 'children': datum['children']}" ] 
                        ]
                    ]
                << signal "focus0" [ siUpdate "data('focus0') && length(data('focus0'))>0 ? data('focus0')[0] : focus" ]
                << signal "timer" [ siValue (vNum 1), siOn [ evHandler [esObject [ esType etTimer ] ] [ evUpdate ("now()") ] ] ]
                << signal "interpolateTime" [ siOn [ evHandler [ esObject [ esType etClick ] ] [ evUpdate "{'start': timer, 'end': timer+duration}" ] ] ]
                << signal "t" [ siUpdate "interpolateTime ? clamp((timer-interpolateTime.start)/(interpolateTime.end-interpolateTime.start), 0, 1): null" ]
                << signal "tEase" [ siUpdate "t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1" ]
                << signal "interpolateTimeDelayed" [ siOn [ evHandler [ esSignal "interpolateTime" ] [ evUpdate "{'start': interpolateTime['end'], 'end': interpolateTime['end']+duration}" ] ] ]
                << signal "tDelayed" [ siUpdate "interpolateTimeDelayed ? clamp((timer-interpolateTimeDelayed.start)/(interpolateTimeDelayed.end-interpolateTimeDelayed.start), 0, 1) : null" ]
                << signal "tEaseDelayed" [ siUpdate "tDelayed < 0.5 ? 4 * tDelayed * tDelayed * tDelayed : (tDelayed - 1) * (2 * tDelayed - 2) * (2 * tDelayed - 2) + 1" ]
                << signal "showDetails"
                    [ siValue vFalse
                    , siOn
                        [ 
                            evHandler [ esObject [ esType etClick, esMarkName "circles", esFilter [ "!event.altKey && !event.shiftKey", "event.button === 0" ] ] ] [ evUpdate "!(focus['children'] > 0 || datum['id'] === root['id'] || (focus0['id'] !== root['id'] && focus['id'] === root['id']))" ] 
                        ,   evHandler [ esObject [ esType etClick, esFilter [ "event.altKey || event.shiftKey", "event.button === 0" ] ] ] [ evUpdate "focus0['id'] === focus['id'] ? !showDetails : true" ] 
                        ]
                    ]

        ds =
            dataSource
                [ data "source" [ daUrl (str (dPath ++ "flare.json")) ]
                    |> transform
                        [ trFormula "isValid(datum['parent']) ? datum['parent'] : null" "parent"
                        , trFormula "isValid(datum['size']) ? datum['size'] : null" "size"
                        ]
                , data "tree" [ daSource "source" ]
                    |> transform
                        [ trStratify (field "id") (field "parent")
                        , trPack
                            [ paField (field "size")
                            , paSort [ ( field "value", ascend ) ]
                            , paSize (numSignals [ "width", "height" ])
                            ]
                        ]
                , data "focus0" [daOn [ trigger "focus" [ tgInsert "focus" ] ] ]
                    |> transform
                        [ trFormula "now()" "now"
                        , trWindow [ wnOperation woRowNumber "row" ] [ wnSort [ ( field "now", descend ) ] ]
                        , trFilter (expr "datum['row'] ? datum['row'] == 2 : true")
                        , trProject ([ "id", "x", "y", "r", "children" ] |> List.map (\f -> (field f, f)))
                        , trFormula "width/(datum['r']*2)" "k"
                        ]
                , data "details_data" [ daSource "tree" ]
                    |> transform
                        [ trFilter (expr "datum['id'] === focus['id'] && showDetails")
                        , trFormula "['hierarchy depth: ' + datum['depth'], 'children count: ' + datum['children'],isValid( datum['size']) ? 'size: ' + datum['size'] + ' bytes' : '']" "details"
                        ]
                ]

        sc =
            scales << scale "cScale" [ scType scOrdinal, scRange (raScheme (str "magma") []), scDomain (doData [daDataset "tree", daField (field "depth") ]) ]

        mk =
            marks
                << mark rect
                    [ mName "background"
                    , mEncode
                        [
                            enEnter
                              [ maX [ vSignal "-padding['left']" ]
                              , maY [ vSignal "-padding['top']" ]
                              , maWidth[ vSignal "width+padding['left']+padding['right']" ]
                              , maHeight [ vSignal "height+padding['top']+padding['bottom']" ]
                              , maFillOpacity [ vNum 0 ]
                              ]
                        ]
                    ]
                << mark symbol
                    [ mName "circles"
                    , mFrom [ srData (str "tree") ]
                    , mEncode
                        [ enEnter
                            [ maShape [ vStr "circle" ]
                            , maFill [ vScale "cScale", vField (field "depth") ]
                            , maCursor [ cursorValue cuPointer ]
                            , maTooltip [ vField (field "name") ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "lerp([root['x']+ (datum['x'] - focus0['x']) * focus0['k'], root['x'] + (datum['x'] - focus['x']) * k], tEase)" ]
                            , maY [ vSignal "lerp([ root['y'] + (datum['y'] - focus0['y']) * focus0['k'],  root['y'] + (datum['y'] - focus['y']) * k], tEase)" ]
                            , maSize [ vSignal "pow(2*(datum['r'] * lerp([focus0['k'], k],tEase)),2)" ]
                            , maFill [ vSignal "showDetails && focus['id'] === datum['id'] ? '#fff' : scale('cScale',datum['depth'])" ]
                            , maZIndex [ vSignal "!showDetails ? 1 : (focus['id'] === root['id'] && isValid(datum['parent'])) ? -99 : indexof(pluck(treeAncestors('tree', datum['id']), 'id'), focus['id']) > 0 ? -99 : 1" ]
                            , maStroke [ vSignal "showDetails ? scale('cScale', datum['depth']) : luminance(scale('cScale', datum['depth'])) > 0.5 ?  'black' : 'white'" ]
                            , maStrokeWidth [ vSignal "focus['id'] === datum['id'] && showDetails ? 20 : 0.5" ]
                            , maStrokeOpacity [ vSignal "!showDetails ? 0.5 : focus['id'] === root['id'] ? min(tEase, 0.35) : min(tEaseDelayed, 0.35)" ]
                            ]
                        , enHover [ maStrokeWidth [ vNum 2 ] ]
                        ]
                    ]
                << mark text
                    [ mName "details_title"
                    , mFrom [ srData (str "details_data") ] 
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maText [ vSignal "datum['name']" ]
                            , maFill [ vScale "cScale", vField (field "depth") ]
                            , maFontSize [ vSignal "0.055*width" ]
                            , maAlign [ hCenter ]
                            , maX [ vSignal "width/2" ]
                            , maY [ vSignal "height/4" ]
                            , maOpacity [ vNum 0 ]
                            ]
                        , enUpdate [ maOpacity [ vSignal "!showDetails ? 0 : focus['id'] === root['id'] ? tEase : tEaseDelayed" ] ]
                        ]
                    ]
                << mark text
                    [ mName "details"
                    , mFrom [srData (str "details_data") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maText [ vSignal "datum['details']" ] 
                            , maFontSize [ vSignal "0.045*width" ]
                            , maAlign [ hCenter ]
                            , maX [ vSignal "width/2" ]
                            , maY [ vSignal "height/3" ]
                            , maFill [ vStr "gray" ]
                            , maOpacity [ vNum 0 ]
                            ]
                        , enUpdate [ maOpacity [ vSignal "!showDetails ? 0 : focus['id'] === root['id'] ? tEase : tEaseDelayed" ] ]
                        ]
                    ]
                 << mark text
                    [ mName "helper_text"
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maText [ vSignal "['interactivity instructions:', '• click on a node to zoom-in','• for nodes with children, shift + click to see details for that node', '• to slow down animations, ⌘ + click (Mac) / ⊞ + click (Windows)']" ] 
                            , maFontSize [ vNum 14 ]
                            , maY [ vSignal "height+5" ]
                            ]
                        , enUpdate [ maOpacity [ vSignal "ceil(k) === 1 ? isValid(t) ? tEaseDelayed : 1 : 0" ] ]
                        ]
                    ]
    in
    toVega
        [ width 600, height 600, padding 5, si[], ds, sc [], mk [] ]



sourceExample : Spec
sourceExample =
    interaction9



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "interaction1", interaction1 )
        , ( "interaction2", interaction2 )
        , ( "interaction3", interaction3 )
        , ( "interaction4", interaction4 )
        , ( "interaction5", interaction5 )
        , ( "interaction6", interaction6 )
        , ( "interaction7", interaction7 )
        , ( "interaction8", interaction8 )
        , ( "interaction9", interaction9 )
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
