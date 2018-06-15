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
                [ data "budgets" [ daUrl "https://vega.github.io/vega/data/budgets.json" ]
                    |> transform
                        [ trFormula "abs(datum.value)" "abs" AlwaysUpdate
                        , trFormula "datum.value < 0 ? 'deficit' : 'surplus'" "type" AlwaysUpdate
                        ]
                , data "budgets-current" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear") ]
                , data "budgets-actual" [ daSource "budgets" ]
                    |> transform [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == datum.budgetYear - 1") ]
                , data "tooltip" [ daSource "budgets" ]
                    |> transform
                        [ trFilter (expr "datum.budgetYear <= currentYear && datum.forecastYear == tipYear && abs(datum.value - tipValue) <= 0.1")
                        , trAggregate [ agFields [ field "value", field "value" ], agOps [ Min, ArgMin ], agAs [ "min", "argmin" ] ]
                        , trFormula "datum.argmin.budgetYear" "tooltipYear" AlwaysUpdate
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
                    [ siValue (vBoo False)
                    , siOn
                        [ evHandler (esObject [ esMarkName "handle", esType MouseDown ]) [ evUpdate "true" ]
                        , evHandler (esObject [ esSource ESWindow, esType MouseUp ]) [ evUpdate "false" ]
                        ]
                    ]
                << signal "handleYear"
                    [ siValue (vNum 2010)
                    , siOn
                        [ evHandler
                            (esObject
                                [ esBetween [ esMarkName "handle", esType MouseDown ] [ esSource ESWindow, esType MouseUp ]
                                , esSource ESWindow
                                , esType MouseMove
                                , esConsume True
                                ]
                            )
                            [ evUpdate "invert('xScale', clamp(x(), 0, width))" ]
                        ]
                    ]
                << signal "currentYear" [ siUpdate "clamp(handleYear, 1980, 2010)" ]
                << signal "tipYear"
                    [ siOn
                        [ evHandler (esObject [ esType MouseMove ]) [ evUpdate "dragging ? tipYear : invert('xScale', x())" ] ]
                    ]
                << signal "tipValue"
                    [ siOn
                        [ evHandler (esObject [ esType MouseMove ]) [ evUpdate "dragging ? tipValue : invert('yScale', y())" ] ]
                    ]
                << signal "cursor"
                    [ siValue (vStr "default")
                    , siOn
                        [ evHandler (esSignal "dragging") [ evUpdate "dragging ? 'pointer' : 'default'" ] ]
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
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "white" ], maStrokeOpacity [ vNum 0.75 ] ] ] )
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
                        [ ( EGrid, [ enEnter [ maStroke [ vStr "white" ], maStrokeOpacity [ vNum 0.75 ] ] ] )
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
                            , maFill [ vStr "black" ]
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
                            , maFill [ vStr "black" ]
                            , maAlign [ hAlignLabel AlignLeft |> vStr ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "budgets-current" "facet" [ faGroupBy [ "budgetYear" ] ] ]
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
                            , maStroke [ vStr "black" ]
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
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]
                << mark Rule
                    [ mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vNum 0 ]
                            , maStroke [ vStr "black" ]
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
                            , maShape [ symbolLabel SymTriangleDown |> vStr ]
                            , maSize [ vNum 400 ]
                            , maStroke [ vStr "black" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "currentYear" ]
                            , maFill [ vSignal "dragging ? 'lemonchiffon' : 'white'" ]
                            ]
                        , enHover
                            [ maFill [ vStr "lemonchiffon" ]
                            , maCursor [ cursorLabel CPointer |> vStr ]
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
                            , maFill [ vStr "white" ]
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
                [ data "wheat" [ daUrl "https://vega.github.io/vega/data/wheat.json" ]
                , data "wheat-filtered" [ daSource "wheat" ] |> transform [ trFilter (expr "!!datum.wages") ]
                , data "monarchs" [ daUrl "https://vega.github.io/vega/data/monarchs.json" ]
                    |> transform [ trFormula "((!datum.commonwealth && datum.index % 2) ? -1: 1) * 2 + 95" "offset" AlwaysUpdate ]
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
                            [ maInterpolate [ markInterpolationLabel Linear |> vStr ]
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
                            [ maInterpolate [ markInterpolationLabel Linear |> vStr ]
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
                            [ maInterpolate [ markInterpolationLabel Linear |> vStr ]
                            , maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "wages") ]
                            , maStroke [ vStr "black" ]
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
                            , maStroke [ vStr "black" ]
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
                            , maAlign [ hAlignLabel AlignCenter |> vStr ]
                            , maFill [ vStr "black" ]
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
                << dataColumn "year" (daNums [ 1875, 1890, 1910, 1925, 1933, 1939, 1946, 1950, 1964, 1971, 1981, 1985, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014 ])
                << dataColumn "population" (daNums [ 1309, 1558, 4512, 8180, 15915, 24824, 28275, 29189, 29881, 26007, 24029, 23340, 22307, 22087, 22139, 22105, 22242, 22801, 24273, 25640, 27393, 29505, 32124, 33791, 35297, 36179, 36829, 37493, 38376, 39008, 39366, 39821, 40179, 40511, 40465, 40905, 41258, 41777 ])

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
                << axis "xScale" SBottom [ axTitle (str "Year"), axTickCount (num 15), axFormat "d" ]
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
                                , maShape [ symbolLabel SymSquare |> vStr ]
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
                            [ maInterpolate [ markInterpolationLabel Monotone |> vStr ]
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
                            , maFill [ vStr "white" ]
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
                    [ daUrl "https://vega.github.io/vega/data/seattle-temps.csv"
                    , daFormat [ CSV, parse [ ( "temp", FoNum ), ( "date", foDate "" ) ] ]
                    ]
                    |> transform
                        [ trFormula "hours(datum.date)" "hour" InitOnly
                        , trFormula "datetime(year(datum.date), month(datum.date), date(datum.date))" "date" InitOnly
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
                << axis "xScale" SBottom [ axTitle (str "Month"), axDomain false, axFormat "%b" ]
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
                    [ mFrom [ srFacet "temperature" "hour" [ faGroupBy [ "hour" ] ] ]
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


sourceExample : Spec
sourceExample =
    custom4



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "custom1", custom1 )
        , ( "custom2", custom2 )
        , ( "custom3", custom3 )
        , ( "custom4", custom4 )
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
