port module GalleryCustom exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


custom1 : Spec
custom1 =
    let
        cf =
            config [ cfAxis AxBand [ axBandPosition (num 0), axLabelPadding (num 5), axTickExtra false ] ]

        ds =
            dataSource
                [ data "budgets" [ daUrl (str "https://vega.github.io/vega/data/budgets.json") ]
                    |> transform
                        [ trFormula "abs(datum.value)" "abs"
                        , trFormula "datum.value < 0 ? 'deficit' : 'surplus'" "type"
                        ]
                , data "budgets-current" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear") ]
                , data "budgets-actual" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == datum.budgetYear - 1") ]
                , data "tooltip" [ daSource "budgets" ]
                    |> transform
                        [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == tipYear && abs(datum.value - tipValue) <= 0.1")
                        , trAggregate [ agFields [ field "value", field "value" ], agOps [ Min, ArgMin ], agAs [ "min", "argmin" ] ]
                        , trFormula "datum.argmin.budgetYear" "tooltipYear"
                        ]
                , data "tooltip-forecast" [ daSource "budgets" ]
                    |> transform
                        [ trLookup "tooltip" (field "tooltipYear") [ field "budgetYear" ] [ luAs [ "tooltip" ] ]
                        , trFilter (expr "datum.tooltip")
                        ]
                ]

        si =
            signals
                << signal "dragging"
                    [ siValue vFalse
                    , siOn
                        [ evHandler [ esObject [ esMarkName "handle", esType MouseDown ] ] [ evUpdate "true" ]
                        , evHandler [ esObject [ esSource ESWindow, esType MouseUp ] ] [ evUpdate "false" ]
                        ]
                    ]
                << signal "handleYear"
                    [ siValue (vNum 2010)
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esBetween [ esMarkName "handle", esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                , esConsume true
                                ]
                            ]
                            [ evUpdate "invert('xScale', clamp(x(), 0, width))" ]
                        ]
                    ]
                << signal "currentYear" [ siUpdate "clamp(handleYear, 1980, 2010)" ]
                << signal "tipYear"
                    [ siOn
                        [ evHandler [ esObject [ esType MouseMove ] ] [ evUpdate "dragging ? tipYear : invert('xScale', x())" ] ]
                    ]
                << signal "tipValue"
                    [ siOn
                        [ evHandler [ esObject [ esType MouseMove ] ] [ evUpdate "dragging ? tipValue : invert('yScale', y())" ] ]
                    ]
                << signal "cursor"
                    [ siValue (vStr "default")
                    , siOn
                        [ evHandler [ esSignal "dragging" ] [ evUpdate "dragging ? 'pointer' : 'default'" ] ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "budgets", daField (field "forecastYear") ])
                    , scRange RaWidth
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "budgets", daField (field "value") ])
                    , scZero true
                    , scRange RaHeight
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axGrid true
                    , axDomain false
                    , axValues (vNums [ 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018 ])
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ white ], maStrokeOpacity [ vNum 0.75 ] ] ] )
                        , ( ELabels, [ enUpdate [ maX [ vScale "xScale", vField (field "value") ] ] ] )
                        ]
                    ]
                << axis "yScale"
                    SRight
                    [ axGrid true
                    , axDomain false
                    , axValues (vNums [ 0, -0.5, -1, -1.5 ])
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ white ], maStrokeOpacity [ vNum 0.75 ] ] ] )
                        , ( ELabels, [ enEnter [ maText [ vSignal "format(datum.value, '$.1f') + ' trillion'" ] ] ] )
                        ]
                    ]

        nestedMk1 =
            marks
                << mark Line
                    [ mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maStrokeOpacity [ vNum 0.25 ]
                            ]
                        ]
                    ]

        nestedMk2 =
            marks
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maX [ vNum 6 ]
                            , maY [ vNum 14 ]
                            , maText [ vSignal "'Forecast from early ' + parent.argmin.budgetYear" ]
                            , maFill [ black ]
                            , maFontWeight [ vStr "bold" ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maX [ vNum 6 ]
                            , maY [ vNum 29 ]
                            , maText [ vSignal "parent.argmin.forecastYear + ': ' + format(parent.argmin.abs, '$.3f') + ' trillion ' + parent.argmin.type" ]
                            , maFill [ black ]
                            , maAlign [ hLeft ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet (str "budgets-current") "facet" [ faGroupBy [ field "budgetYear" ] ] ]
                    , mGroup [ nestedMk1 [] ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "budgets-actual") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "tooltip-forecast") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "forecastYear") ]
                            , maY [ vScale "yScale", vField (field "value") ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "tooltip") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "argmin.forecastYear") ]
                            , maY [ vScale "yScale", vField (field "argmin.value") ]
                            , maSize [ vNum 50 ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
                << mark Rule
                    [ mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vNum 0 ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        , enUpdate
                            [ maX [ vNum 0 ]
                            , maX2 [ vScale "xScale", vSignal "currentYear" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mName "handle"
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vNum 0, vOffset (vNum 1) ]
                            , maShape [ symbolValue SymTriangleDown ]
                            , maSize [ vNum 400 ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "currentYear" ]
                            , maFill [ vSignal "dragging ? 'lemonchiffon' : 'white'" ]
                            ]
                        , enHover
                            [ maFill [ vStr "lemonchiffon" ]
                            , maCursor [ cursorValue CPointer ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vNum 25 ]
                            , maFontSize [ vNum 32 ]
                            , maFontWeight [ vStr "bold" ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enUpdate [ maText [ vSignal "currentYear" ] ]
                        ]
                    ]
                << mark Group
                    [ mFrom [ srData (str "tooltip") ]
                    , mInteractive false
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "argmin.forecastYear"), vOffset (vNum -5) ]
                            , maY [ vScale "yScale", vField (field "argmin.value"), vOffset (vNum 20) ]
                            , maWidth [ vNum 150 ]
                            , maHeight [ vNum 35 ]
                            , maFill [ white ]
                            , maFillOpacity [ vNum 0.85 ]
                            , maStroke [ vStr "#aaa" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    , mGroup [ nestedMk2 [] ]
                    ]
    in
    toVega
        [ cf, width 700, height 400, padding 5, background (str "#edf1f7"), ds, si [], sc [], ax [], mk [] ]


custom2 : Spec
custom2 =
    let
        ds =
            dataSource
                [ data "wheat" [ daUrl (str "https://vega.github.io/vega/data/wheat.json") ]
                , data "wheat-filtered" [ daSource "wheat" ] |> transform [ trFilter (expr "!!datum.wages") ]
                , data "monarchs" [ daUrl (str "https://vega.github.io/vega/data/monarchs.json") ]
                    |> transform [ trFormula "((!datum.commonwealth && datum.index % 2) ? -1: 1) * 2 + 95" "offset" ]
                ]

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
                << axis "xScale" SBottom [ axTickCount (num 5), axFormat (str "04d") ]
                << axis "yScale"
                    SRight
                    [ axGrid true
                    , axDomain false
                    , axZIndex (num 1)
                    , axTickCount (num 5)
                    , axOffset (vNum 5)
                    , axTickSize (num 0)
                    , axEncode
                        [ ( EGrid, [ enEnter [ maStroke [ white ], maStrokeWidth [ vNum 1 ], maStrokeOpacity [ vNum 0.25 ] ] ] )
                        , ( ELabels, [ enEnter [ maFontStyle [ vStr "italic" ] ] ] )
                        ]
                    ]

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
                << mark Area
                    [ mFrom [ srData (str "wheat-filtered") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Linear ]
                            , maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "wages") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill [ vStr "#b3d9e6" ]
                            , maFillOpacity [ vNum 0.8 ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "wheat-filtered") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Linear ]
                            , maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "wages") ]
                            , maStroke [ vStr "#ff7e79" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "wheat-filtered") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Linear ]
                            , maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "wages") ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mName "monarch_rects"
                    , mFrom [ srData (str "monarchs") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "start") ]
                            , maX2 [ vScale "xScale", vField (field "end") ]
                            , maY [ vScale "yScale", vNum 95 ]
                            , maY2 [ vScale "yScale", vField (field "offset") ]
                            , maFill [ vScale "cScale", vField (field "commonwealth") ]
                            , maStroke [ black ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "monarch_rects") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (field "x") ]
                            , maDx [ vField (field "width"), vMultiply (vNum 0.5) ]
                            , maY [ vField (field "y2"), vOffset (vNum 14) ]
                            , maText [ vField (field "datum.name") ]
                            , maAlign [ hCenter ]
                            , maFill [ black ]
                            , maFont [ vStr "Helvetica Neue, Arial" ]
                            , maFontSize [ vNum 10 ]
                            , maFontStyle [ vStr "italic" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 900, height 465, padding 5, ds, sc [], ax [], mk [] ]


custom3 : Spec
custom3 =
    let
        cf =
            config [ cfTitle [ tiFontSize (num 16) ] ]

        ti =
            title (strSignal "'Population of Falkensee from ' + years[0] + ' to ' + years[1]") []

        table =
            dataFromColumns "table" []
                << dataColumn "year" (vNums [ 1875, 1890, 1910, 1925, 1933, 1939, 1946, 1950, 1964, 1971, 1981, 1985, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014 ])
                << dataColumn "population" (vNums [ 1309, 1558, 4512, 8180, 15915, 24824, 28275, 29189, 29881, 26007, 24029, 23340, 22307, 22087, 22139, 22105, 22242, 22801, 24273, 25640, 27393, 29505, 32124, 33791, 35297, 36179, 36829, 37493, 38376, 39008, 39366, 39821, 40179, 40511, 40465, 40905, 41258, 41777 ])

        ds =
            let
                obj start end label =
                    [ ( "start", vNum start ), ( "end", vNum end ), ( "text", vStr label ) ]
                        |> List.map (\( k, v ) -> keyValue k v)
                        |> vObject
            in
            dataSource
                [ table [] |> transform [ trExtentAsSignal (field "year") "years" ]
                , data "annotation"
                    [ vValues [ obj 1933 1945 "Nazi Rule", obj 1948 1989 "GDR (East Germany)" ]
                        |> daValue
                    ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "table", daField (field "year") ])
                    , scZero false
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scZero true
                    , scNice NTrue
                    , scDomain (doData [ daDataset "table", daField (field "population") ])
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raStrs [ "black", "red" ])
                    , scDomain (doData [ daDataset "annotation", daField (field "text") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTitle (str "Year"), axTickCount (num 15), axFormat (str "d") ]
                << axis "yScale" SLeft [ axTitle (str "Population"), axTitlePadding (vNum 10), axGrid true ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Period")
                    , leOrient TopLeft
                    , leOffset (vNum 8)
                    , leEncode
                        [ enSymbols
                            [ enUpdate
                                [ maStrokeWidth [ vNum 0 ]
                                , maShape [ symbolValue SymSquare ]
                                , maOpacity [ vNum 0.3 ]
                                ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "annotation") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "start") ]
                            , maX2 [ vScale "xScale", vField (field "end") ]
                            , maY [ vNum 0 ]
                            , maY2 [ vSignal "height" ]
                            , maFill [ vScale "cScale", vField (field "text") ]
                            , maOpacity [ vNum 0.2 ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue Monotone ]
                            , maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "population") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "population") ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 1.5 ]
                            , maFill [ white ]
                            , maSize [ vNum 30 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 500, height 250, padding 5, ti, ds, sc [], ax [], le [], mk [] ]


custom4 : Spec
custom4 =
    let
        cf =
            config [ cfTitle [ tiFontSize (num 14) ] ]

        ti =
            title (str "Seattle Annual Temperatures") [ tiAnchor Start, tiOffset (num 4) ]

        ds =
            dataSource
                [ data "temperature"
                    [ daUrl (str "https://vega.github.io/vega/data/seattle-temps.csv")
                    , daFormat [ CSV, parse [ ( "temp", FoNum ), ( "date", foDate "" ) ] ]
                    ]
                    |> transform
                        [ trFormulaInitOnly "hours(datum.date)" "hour"
                        , trFormulaInitOnly "datetime(year(datum.date), month(datum.date), date(datum.date))" "date"
                        ]
                ]

        si =
            signals
                << signal "rangeStep" [ siValue (vNum 25) ]
                << signal "height" [ siUpdate "rangeStep * 24" ]

        sc =
            scales
                << scale "row"
                    [ scType ScBand
                    , scDomain (doNums (nums [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5 ]))
                    , scRange (raStep (vSignal "rangeStep"))
                    ]
                << scale "xScale"
                    [ scType ScTime
                    , scRange RaWidth
                    , scDomain (doData [ daDataset "temperature", daField (field "date") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raValues [ vSignal "rangeStep", vNum 1 ])
                    , scZero false
                    , scDomain (doData [ daDataset "temperature", daField (field "temp") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTitle (str "Month"), axDomain false, axFormat (str "%b") ]
                << axis "row"
                    SLeft
                    [ axTitle (str "Hour")
                    , axDomain false
                    , axTickSize (num 0)
                    , axEncode [ ( ELabels, [ enUpdate [ maText [ vSignal "datum.value === 0 ? 'Midnight' : datum.value === 12 ? 'Noon' : datum.value < 12 ? datum.value + ':00 am' : (datum.value - 12) + ':00 pm'" ] ] ] ) ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet (str "temperature") "hour" [ faGroupBy [ field "hour" ] ] ]
                    , mEncode
                        [ enEnter
                            [ maX [ vNum 0 ]
                            , maY [ vScale "row", vField (field "hour") ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vSignal "rangeStep" ]
                            ]
                        ]
                    , mGroup [ nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Area
                    [ mFrom [ srData (str "hour") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "date") ]
                            , maY [ vScale "yScale", vField (field "temp") ]
                            , maY2 [ vSignal "rangeStep" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 800, padding 5, ti, ds, si [], sc [], ax [], mk [] ]


custom5 : Spec
custom5 =
    let
        ds =
            dataSource
                [ data "weather"
                    [ daUrl (str "https://vega.github.io/vega/data/weather.json") ]
                , data "actual"
                    [ daSource "weather" ]
                    |> transform [ trFilter (expr "datum.actual") ]
                , data "forecast"
                    [ daSource "weather" ]
                    |> transform [ trFilter (expr "datum.forecast") ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scRange RaWidth
                    , scPadding (num 0.1)
                    , scRound true
                    , scDomain (doData [ daDataset "weather", daField (field "id") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange RaHeight
                    , scNice NTrue
                    , scZero false
                    , scRound true
                    , scDomain (doData [ daDataset "weather", daFields [ field "record.low", field "record.high" ] ])
                    ]

        ax =
            axes
                << axis "yScale"
                    SRight
                    [ axTickCount (num 3)
                    , axTickSize (num 0)
                    , axLabelPadding (num 0)
                    , axGrid true
                    , axDomain false
                    , axZIndex (num 1)
                    , axEncode [ ( EGrid, [ enEnter [ maStroke [ white ] ] ] ) ]
                    ]

        mk =
            marks
                << mark Text
                    [ mFrom [ srData (str "weather") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id") ]
                            , maDx [ vScale "xScale", vBand (num 0.5) ]
                            , maY [ vNum 0 ]
                            , maFill [ black ]
                            , maText [ vField (field "day") ]
                            , maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "weather") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id") ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "record.low") ]
                            , maY2 [ vScale "yScale", vField (field "record.high") ]
                            , maFill [ vStr "#ccc" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "weather") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id") ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "normal.low") ]
                            , maY2 [ vScale "yScale", vField (field "normal.high") ]
                            , maFill [ vStr "#999" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "actual") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id"), vOffset (vNum 4) ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -8) ]
                            , maY [ vScale "yScale", vField (field "actual.low") ]
                            , maY2 [ vScale "yScale", vField (field "actual.high") ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "forecast") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id"), vOffset (vNum 9) ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -18) ]
                            , maY [ vScale "yScale", vField (field "forecast.low.low") ]
                            , maY2 [ vScale "yScale", vField (field "forecast.high.high") ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "forecast") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id"), vOffset (vNum 4) ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -8) ]
                            , maY [ vScale "yScale", vField (field "forecast.low.low") ]
                            , maY2 [ vScale "yScale", vField (field "forecast.low.high") ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "forecast") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "id"), vOffset (vNum 4) ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -8) ]
                            , maY [ vScale "yScale", vField (field "forecast.high.low") ]
                            , maY2 [ vScale "yScale", vField (field "forecast.high.high") ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 250, height 200, ds, sc [], ax [], mk [] ]


custom6 : Spec
custom6 =
    let
        obj tuples =
            vObject (List.map (\( k, v ) -> keyValue k (vNum v)) tuples)

        cf =
            config
                [ cfMark Text [ maFont [ vStr "Ideal Sans, Avenir Next, Helvetica" ] ]
                , cfTitle
                    [ tiFont (str "Ideal Sans, Avenir Next, Helvetica")
                    , tiFontWeight (vNum 500)
                    , tiFontSize (num 17)
                    , tiLimit (num -1)
                    ]
                , cfAxis AxAll
                    [ axLabelFont (str "Ideal Sans, Avenir Next, Helvetica")
                    , axLabelFontSize (num 12)
                    ]
                ]

        ti =
            title (str "A Mile-Long Global Food Market: Mapping Cuisine from “The Ave”")
                [ tiOrient STop
                , tiAnchor Start
                , tiOffset (num 48)
                , tiEncode [ enUpdate [ maDx [ vNum -1 ] ] ]
                ]

        ds =
            dataSource
                [ data "source"
                    [ daUrl (str "https://vega.github.io/vega/data/udistrict.json") ]
                , (dataFromColumns "annotation" []
                    << dataColumn "name" (vStrs [ "Boat St", "40th St.", "42nd St.", "45th St.", "50th St.", "55th St." ])
                    << dataColumn "align" (vStrs [ "left", "center", "center", "center", "center", "center" ])
                    << dataColumn "lat" (vNums [ 47.6516, 47.655363, 47.6584, 47.6614, 47.664924, 47.668519 ])
                  )
                    []
                ]

        si =
            signals
                << signal "size" [ siValue (vNum 2.3) ]
                << signal "domainMax" [ siValue (vNum 5000) ]
                << signal "bandwidth" [ siValue (vNum 0.0005) ]
                << signal "offsets" [ siValue (obj [ ( "bubbletea", -1 ), ( "chinese", -1.5 ), ( "japanese", -2 ), ( "korean", -3 ), ( "mideastern", -2 ), ( "indian", -1 ), ( "breakfast", -3.5 ), ( "latin", 31 ) ]) ]
                << signal "categories" [ siValue (vStrs [ "coffee", "drinks", "bubbletea", "vietnamese", "thai", "chinese", "japanese", "korean", "mideastern", "indian", "burgers", "pizza", "american", "breakfast", "bakeries", "seafood", "hawaiian", "veg", "latin" ]) ]
                << signal "names" [ siValue (vStrs [ "Coffee", "Pubs, Lounges", "Bubble Tea, Juice", "Vietnamese", "Thai", "Chinese", "Japanese", "Korean", "Middle Eastern", "Indian, Pakistani", "Pizza", "Burgers", "American", "Breakfast, Brunch", "Bakeries", "Seafood", "Hawaiian", "Vegetarian, Vegan", "Mexican, Latin American" ]) ]
                << signal "colors" [ siValue (vStrs [ "#7f7f7f", "#7f7f7f", "#7f7f7f", "#1f77b4", "#1f77b4", "#1f77b4", "#1f77b4", "#1f77b4", "#2ca02c", "#2ca02c", "#ff7f0e", "#ff7f0e", "#ff7f0e", "#8c564b", "#8c564b", "#e377c2", "#e377c2", "#bcbd22", "#17becf" ]) ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange RaWidth
                    , scZero false
                    , scDomain (doData [ daDataset "source", daField (field "lat") ])
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scRange RaHeight
                    , scRound true
                    , scPadding (num 0)
                    , scDomain (doStrs (strSignal "categories"))
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scRange (raSignal "colors")
                    , scDomain (doSignal "categories")
                    ]
                << scale "names"
                    [ scType ScOrdinal
                    , scRange (raSignal "names")
                    , scDomain (doSignal "categories")
                    ]

        ax =
            axes
                << axis "yScale"
                    SRight
                    [ axDomain false
                    , axTicks false
                    , axEncode
                        [ ( ELabels
                          , [ enUpdate
                                [ maDx [ vNum 2 ]
                                , maDy [ vNum 2 ]
                                , maY [ vScale "yScale", vField (field "value"), vBand (num 1) ]
                                , maText [ vScale "names", vField (field "value") ]
                                , maBaseline [ vBottom ]
                                ]
                            ]
                          )
                        ]
                    ]

        mk =
            marks
                << mark Rule
                    [ mFrom [ srData (str "annotation") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vSignal "round(scale('xScale', datum.lat)) + 0.5" ]
                            , maY [ vNum 20 ]
                            , maX2 [ vSignal "round(scale('xScale', datum.lat)) + 0.5" ]
                            , maY2 [ vSignal "height", vOffset (vNum 6) ]
                            , maStroke [ vStr "#ddd" ]
                            , maStrokeDash [ vNums [ 3, 2 ] ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "annotation") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "lat"), vOffset (vNum 0) ]
                            , maDx [ vSignal "datum.align === 'left' ? -1 : 0" ]
                            , maY [ vSignal "height", vOffset (vNum 6) ]
                            , maAlign [ vField (field "align") ]
                            , maBaseline [ vTop ]
                            , maText [ vField (field "name") ]
                            , maFontStyle [ vStr "italic" ]
                            ]
                        ]
                    ]
                << mark Group
                    [ mFrom
                        [ srFacet (str "source")
                            "category"
                            [ faGroupBy [ field "key" ]
                            , faAggregate
                                [ agOps [ Min, Max, Count ]
                                , agFields (List.repeat 3 (field "lat"))
                                , agAs [ "min_lat", "max_lat", "count" ]
                                ]
                            ]
                        ]
                    , mEncode
                        [ enUpdate
                            [ maY [ vScale "yScale", vField (field "key") ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vScale "yScale", vBand (num 1) ]
                            ]
                        ]
                    , mSort [ ( field "y", Ascend ) ]
                    , mGroup [ nestedDs, nestedSi [], nestedSc [], nestedMk [] ]
                    ]

        nestedDs =
            dataSource
                [ data "density" [ daSource "category" ]
                    |> transform
                        [ trDensity (diKde "" (field "lat") (numSignal "bandwidth"))
                            [ dnSteps (num 200), dnExtent (numSignal "domain('xScale')") ]
                        ]
                ]

        nestedSi =
            signals << signal "height" [ siUpdate "bandwidth('yScale')" ]

        nestedSc =
            scales
                << scale "yInner"
                    [ scType ScLinear
                    , scRange (raValues [ vSignal "height", vSignal "0 - size * height" ])
                    , scDomain (doNums (numList [ num 0, numSignal "domainMax" ]))
                    ]

        nestedMk =
            marks
                << mark Area
                    [ mFrom [ srData (str "density") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (fParent (field "key")) ]
                            , maFillOpacity [ vNum 0.7 ]
                            , maStroke [ white ]
                            , maStrokeWidth [ vNum 1 ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "value") ]
                            , maY [ vScale "yInner", vSignal "parent.count * datum.density" ]
                            , maY2 [ vScale "yInner", vNum 0 ]
                            ]
                        ]
                    ]
                << mark Rule
                    [ mClip (clEnabled true)
                    , mEncode
                        [ enUpdate
                            [ maY [ vSignal "height", vOffset (vNum -0.5) ]
                            , maX [ vScale "xScale", vField (fParent (field "min_lat")), vOffset (vSignal "scale('xScale', 0) - scale('xScale', 2*bandwidth) + (offsets[parent.key] || 1) - 3") ]
                            , maX2 [ vSignal "width" ]
                            , maStroke [ vStr "#aaa" ]
                            , maStrokeWidth [ vNum 0.25 ]
                            , maStrokeOpacity [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "category") ]
                    , mEncode
                        [ enEnter
                            [ maFillOpacity [ vNum 0 ]
                            , maSize [ vNum 50 ]
                            , maTooltip [ vField (field "name") ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "lat") ]
                            , maY [ vScale "yScale", vBand (num 0.5) ]
                            , maFill [ vScale "cScale", vField (field "key") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 500, height 380, padding 5, autosize [ APad ], ti, ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    custom6



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "custom1", custom1 )
        , ( "custom2", custom2 )
        , ( "custom3", custom3 )
        , ( "custom4", custom4 )
        , ( "custom5", custom5 )
        , ( "custom6", custom6 )
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
