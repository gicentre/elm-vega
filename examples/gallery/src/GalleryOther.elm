port module GalleryOther exposing (elmToJS)

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
    "https://cdn.jsdelivr.net/npm/vega-datasets@2.1/data/"


heatmap1 : Spec
heatmap1 =
    let
        colors =
            [ "Viridis"
            , "Magma"
            , "Inferno"
            , "Plasma"
            , "Blues"
            , "Greens"
            , "Greys"
            , "Purples"
            , "Reds"
            , "Oranges"
            , "BlueOrange"
            , "BrownBlueGreen"
            , "PurpleGreen"
            , "PinkYellowGreen"
            , "PurpleOrange"
            , "RedBlue"
            , "RedGrey"
            , "RedYellowBlue"
            , "RedYellowGreen"
            , "BlueGreen"
            , "BluePurple"
            , "GreenBlue"
            , "OrangeRed"
            , "PurpleBlueGreen"
            , "PurpleBlue"
            , "PurpleRed"
            , "RedPurple"
            , "YellowGreenBlue"
            , "YellowGreen"
            , "YellowOrangeBrown"
            , "YellowOrangeRed"
            ]

        ti =
            title (str "Seattle Annual Temperatures")
                [ tiAnchor anMiddle
                , tiFontSize (num 16)
                , tiFrame tfGroup
                , tiOffset (num 4)
                ]

        ds =
            dataSource
                [ data "temperature"
                    [ daUrl (str (dPath ++ "seattle-weather-hourly-normals.csv"))
                    , daFormat [ csv, parse [ ( "temperature", foNum ), ( "date", foDate "" ) ] ]
                    ]
                    |> transform
                        [ trFormulaInitOnly "hours(datum.date)" "hour"
                        , trFormulaInitOnly "datetime(year(datum.date), month(datum.date), date(datum.date))" "day"
                        , trFormulaInitOnly "(datum.temperature - 32) / 1.8" "celsius"
                        ]
                ]

        si =
            signals
                << signal "palette" [ siValue (vStr "Viridis"), siBind (iSelect [ inOptions (vStrs colors) ]) ]
                << signal "reverse" [ siValue vFalse, siBind (iCheckbox []) ]

        sc =
            scales
                << scale "xScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "temperature", daField (field "day") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scBand
                    , scDomain (doNums (nums [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5 ]))
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scSequential
                    , scRange (raScheme (strSignal "palette") [])
                    , scDomain (doData [ daDataset "temperature", daField (field "celsius") ])
                    , scReverse (booSignal "reverse")
                    , scZero false
                    , scNice niTrue
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axDomain false, axTitle (str "Month"), axFormat (str "%b") ]
                << axis "yScale"
                    siLeft
                    [ axDomain false
                    , axTitle (str "Hour")
                    , axEncode
                        [ ( aeLabels
                          , [ enUpdate
                                [ maText [ vSignal "datum.value === 0 ? 'Midnight' : datum.value === 12 ? 'Noon' : datum.value < 12 ? datum.value + ':00 am' : (datum.value - 12) + ':00 pm'" ]
                                ]
                            ]
                          )
                        ]
                    ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leType ltGradient
                    , leTitle (str "Avg. Temp (°C)")
                    , leTitleFontSize (num 12)
                    , leTitlePadding (num 4)
                    , leGradientLength (numSignal "height - 16")
                    ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "temperature") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "day") ]
                            , maWidth [ vNum 5 ]
                            , maY [ vScale "yScale", vField (field "hour") ]
                            , maHeight [ vScale "yScale", vBand (num 1) ]
                            , maTooltip [ vSignal "timeFormat(datum.date, '%b %d %I:00 %p') + ': ' + datum.celsius + '°'" ]
                            ]
                        , enUpdate [ maFill [ vScale "cScale", vField (field "celsius") ] ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, ti, ds, si [], sc [], ax [], le [], mk [] ]


heatmap2 : Spec
heatmap2 =
    let
        ds =
            dataSource
                [ data "source" [ daUrl (str (dPath ++ "cars.json")) ]
                    |> transform
                        [ trFilter (expr "datum[fieldX] != null && datum.Miles_per_Gallon != null") ]
                , data "density" [ daSource "source" ]
                    |> transform
                        [ trKde2d
                            (numSignal "width")
                            (numSignal "height")
                            (fExpr "scale('xScale', datum[fieldX])")
                            (fExpr "scale('yScale', datum.Miles_per_Gallon)")
                            [ kd2Bandwidth (numSignal "bandWidthX") (numSignal "bandWidthY")
                            , kd2CellSize (numSignal "cellSize")
                            , kd2Counts (booSignal "counts")
                            , kd2GroupBy [ field "Origin" ]
                            ]
                        , trHeatmap
                            [ hmField (field "grid")
                            , hmResolve (resolveSignal "resolve")
                            , hmColor (strExpr (expr "scale('density', datum.$value / datum.$max)"))
                            , hmOpacity (num 1)
                            ]
                        ]
                ]

        si =
            signals
                << signal "fieldX"
                    [ siValue (vStr "Acceleration")
                    , siBind (iSelect [ inOptions (vStrs [ "Acceleration", "Displacement", "Horsepower" ]) ])
                    ]
                << signal "bandWidthX"
                    [ siValue (vNum -1)
                    , siBind (iRange [ inMin -1, inMax 100, inStep 1 ])
                    ]
                << signal "bandWidthY"
                    [ siValue (vNum -1)
                    , siBind (iRange [ inMin -1, inMax 100, inStep 1 ])
                    ]
                << signal "resolve"
                    [ siValue (vStr "independent")
                    , siBind (iSelect [ inOptions (vStrs [ "independent", "shared" ]) ])
                    ]
                << signal "counts"
                    [ siValue vFalse
                    , siBind (iCheckbox [])
                    ]
                << signal "smooth"
                    [ siValue vTrue
                    , siBind (iCheckbox [])
                    ]
                << signal "cellSize"
                    [ siValue (vNum 4)
                    , siBind (iSelect [ inOptions (vNums [ 1, 2, 4, 8, 16 ]) ])
                    ]
                << signal "title"
                    [ siValue (vStr "Density")
                    , siUpdate "[if(resolve == 'shared', 'Global' + if(counts, ' Count', ' Prob.'), 'Local Density'), '(Normalized)']"
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "source", daField (fSignal "fieldX") ])
                    , scRange raWidth
                    , scRound true
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "source", daField (field "Miles_per_Gallon") ])
                    , scRange raHeight
                    , scRound true
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "density"
                    [ scType scLinear
                    , scDomain (doNums (nums [ 0, 1 ]))
                    , scRange (raScheme (str "viridis") [])
                    , scZero true
                    ]

        ax =
            axes
                << axis "yScale"
                    siLeft
                    [ axDomain false
                    , axTitlePadding (vNum 5)
                    , axOffset (vNum 2)
                    , axTitle (str "Miles per Gallon")
                    ]

        le =
            legends
                << legend
                    [ leFill "density"
                    , leTitle (strSignal "title")
                    , leGradientLength (numSignal "height - 28")
                    ]

        lo =
            layout [ loBounds bcFlush, loColumns (num 3), loPadding (num 10) ]

        nestedAx =
            axes
                << axis "xScale"
                    siBottom
                    [ axDomain false
                    , axTickCount (num 5)
                    , axLabelFlush (num 1)
                    , axTitle (strSignal "fieldX")
                    ]

        nestedMk =
            marks
                << mark image
                    [ mFrom [ srData (str "facet") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vNum 0 ]
                            , maY [ vNum 0 ]
                            , maImage [ vField (field "image") ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vSignal "height" ]
                            , maAspect [ vFalse ]
                            , maSmooth [ vSignal "smooth" ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark group
                    [ mFrom [ srFacet (str "density") "facet" [ faGroupBy [ field "Origin" ] ] ]
                    , mSort [ ( field "datum.Origin", ascend ) ]
                    , mGroup
                        [ title (strSignal "parent.Origin") [ tiFrame tfGroup ]
                        , nestedAx []
                        , nestedMk []
                        ]
                    , mEncode [ enUpdate [ maWidth [ vSignal "width" ], maHeight [ vSignal "height" ] ] ]
                    ]
    in
    toVega
        [ width 250, height 250, padding 5, autosize [ asPad ], ds, si [], sc [], ax [], le [], lo, mk [] ]


parallel1 : Spec
parallel1 =
    let
        cf =
            config
                [ cfAxis axY
                    [ axTitleX (num -2)
                    , axTitleY (num 410)
                    , axTitleAngle (num 0)
                    , axTitleAlign haRight
                    , axTitleBaseline vaTop
                    ]
                ]

        ds =
            dataSource
                [ data "cars"
                    [ daUrl (str (dPath ++ "cars.json"))
                    , daFormat [ json, parse [ ( "Year", foDate "%Y-%m-%d" ) ] ]
                    ]
                    |> transform
                        [ trFilter (expr "datum.Horsepower && datum.Miles_per_Gallon")
                        , trFormulaInitOnly "isNumber(datum.year) ? datum.year : year(datum.Year)" "Year"
                        ]
                , data "fields" [ daValue (vStrs [ "Cylinders", "Displacement", "Weight_in_lbs", "Horsepower", "Acceleration", "Miles_per_Gallon", "Year" ]) ]
                ]

        dimensionScale fName =
            scale fName
                [ scType scLinear
                , scRange raHeight
                , scDomain (doData [ daDataset "cars", daField (field fName) ])
                , scZero false
                , scNice niTrue
                ]

        sc =
            scales
                << scale "ord"
                    [ scType scPoint
                    , scRange raWidth
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    , scRound true
                    ]
                << dimensionScale "Cylinders"
                << dimensionScale "Displacement"
                << dimensionScale "Weight_in_lbs"
                << dimensionScale "Horsepower"
                << dimensionScale "Acceleration"
                << dimensionScale "Miles_per_Gallon"
                << dimensionScale "Year"

        dimensionAxis sName =
            axis sName
                siLeft
                [ axTitle (str sName)
                , axOffset (vObject [ vStr sName, vScale "ord", vMultiply (vNum -1) ])
                , axZIndex (num 1)
                ]

        ax =
            axes
                << dimensionAxis "Cylinders"
                << dimensionAxis "Displacement"
                << dimensionAxis "Weight_in_lbs"
                << dimensionAxis "Horsepower"
                << dimensionAxis "Acceleration"
                << dimensionAxis "Miles_per_Gallon"
                << dimensionAxis "Year"

        mk =
            marks
                << mark group [ mFrom [ srData (str "cars") ], mGroup [ nestedMk [] ] ]

        nestedMk =
            marks
                << mark line
                    [ mFrom [ srData (str "fields") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "ord", vField (field "data") ]
                            , maY [ vScaleField (fDatum (field "data")), vField (fParent (fDatum (field "data"))) ]
                            , maStroke [ vStr "steelblue" ]
                            , maStrokeWidth [ vNum 1.01 ]
                            , maStrokeOpacity [ vNum 0.3 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 700, height 400, padding 5, ds, sc [], ax [], mk [] ]


wordcloud1 : Spec
wordcloud1 =
    let
        inText =
            [ "Declarative visualization grammars can accelerate development, facilitate retargeting across platforms, and allow language-level optimizations. However, existing declarative visualization languages are primarily concerned with visual encoding, and rely on imperative event handlers for interactive behaviors. In response, we introduce a model of declarative interaction design for data visualizations. Adopting methods from reactive programming, we model low-level events as composable data streams from which we form higher-level semantic signals. Signals feed predicates and scale inversions, which allow us to generalize interactive selections at the level of item geometry (pixels) into interactive queries over the data domain. Production rules then use these queries to manipulate the visualization’s appearance. To facilitate reuse and sharing, these constructs can be encapsulated as named interactors: standalone, purely declarative specifications of interaction techniques. We assess our model’s feasibility and expressivity by instantiating it with extensions to the Vega visualization grammar. Through a diverse range of examples, we demonstrate coverage over an established taxonomy of visualization interaction techniques."
            , "We present Reactive Vega, a system architecture that provides the first robust and comprehensive treatment of declarative visual and interaction design for data visualization. Starting from a single declarative specification, Reactive Vega constructs a dataflow graph in which input data, scene graph elements, and interaction events are all treated as first-class streaming data sources. To support expressive interactive visualizations that may involve time-varying scalar, relational, or hierarchical data, Reactive Vega’s dataflow graph can dynamically re-write itself at runtime by extending or pruning branches in a data-driven fashion. We discuss both compile- and run-time optimizations applied within Reactive Vega, and share the results of benchmark studies that indicate superior interactive performance to both D3 and the original, non-reactive Vega system."
            , "We present Vega-Lite, a high-level grammar that enables rapid specification of interactive data visualizations. Vega-Lite combines a traditional grammar of graphics, providing visual encoding rules and a composition algebra for layered and multi-view displays, with a novel grammar of interaction. Users specify interactive semantics by composing selections. In Vega-Lite, a selection is an abstraction that defines input event processing, points of interest, and a predicate function for inclusion testing. Selections parameterize visual encodings by serving as input data, defining scale extents, or by driving conditional logic. The Vega-Lite compiler automatically synthesizes requisite data flow and event handling logic, which users can override for further customization. In contrast to existing reactive specifications, Vega-Lite selections decompose an interaction design into concise, enumerable semantic units. We evaluate Vega-Lite through a range of examples, demonstrating succinct specification of both customized interaction methods and common techniques such as panning, zooming, and linked selection."
            ]

        stopwords =
            "(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)"

        ds =
            dataSource
                [ data "table" [ daValue (vStrs inText) ]
                    |> transform
                        [ trCountPattern (field "data")
                            [ cpCase uppercase
                            , cpPattern (str "[\\w']{3,}")
                            , cpStopwords (str stopwords)
                            ]
                        , trFormulaInitOnly "[-45, 0, 45][~~(random() * 3)]" "angle"
                        , trFormulaInitOnly "if(datum.text=='VEGA', 600, 300)" "weight"
                        ]
                ]

        sc =
            scales << scale "cScale" [ scType scOrdinal, scRange (raStrs [ "#d5a928", "#652c90", "#939597" ]) ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (field "text") ]
                            , maAlign [ hCenter ]
                            , maDir [ textDirectionValue tdLeftToRight ]
                            , maBaseline [ vAlphabetic ]
                            , maFill [ vScale "cScale", vField (field "text") ]
                            ]
                        , enUpdate [ maFillOpacity [ vNum 1 ] ]
                        , enHover [ maFillOpacity [ vNum 0.5 ] ]
                        ]
                    , mTransform
                        [ trWordcloud
                            [ wcSize (nums [ 800, 400 ])
                            , wcText (field "text")
                            , wcRotate (numExpr (exField "datum.angle"))
                            , wcFont (str "Helvetica Neue, Arial")
                            , wcFontSize (numExpr (exField "datum.count"))
                            , wcFontWeight (strExpr (exField "datum.weight"))
                            , wcFontSizeRange (nums [ 12, 56 ])
                            , wcPadding (num 2)
                            ]
                        ]
                    ]
    in
    toVega
        [ width 700, height 400, padding 5, ds, sc [], mk [] ]


timeline1 : Spec
timeline1 =
    let
        people =
            dataFromColumns "people" []
                << dataColumn "label" (vStrs [ "Washington", "Adams", "Jefferson", "Madison", "Monroe" ])
                << dataColumn "born" (vNums [ -7506057600000, -7389766800000, -7154586000000, -6904544400000, -6679904400000 ])
                << dataColumn "died" (vNums [ -5366196000000, -4528285200000, -4528285200000, -4213184400000, -4370518800000 ])
                << dataColumn "enter" (vNums [ -5701424400000, -5453884800000, -5327740800000, -5075280000000, -4822819200000 ])
                << dataColumn "leave" (vNums [ -5453884800000, -5327740800000, -5075280000000, -4822819200000, -4570358400000 ])

        events =
            dataFromColumns "events" [ json, parse [ ( "when", foDate "" ) ] ]
                << dataColumn "name" (vStrs [ "Decl. of Independence", "U.S. Constitution", "Louisiana Purchase", "Monroe Doctrine" ])
                << dataColumn "when" (vStrs [ "July 4, 1776", "3/4/1789", "April 30, 1803", "Dec 2, 1823" ])

        ds =
            dataSource [ people [], events [] ]

        sc =
            scales
                << scale "yScale"
                    [ scType scBand
                    , scRange (raValues [ vNum 0, vSignal "height" ])
                    , scDomain (doData [ daDataset "people", daField (field "label") ])
                    ]
                << scale "xScale"
                    [ scType scTime
                    , scRange raWidth
                    , scDomain (doData [ daDataset "people", daFields [ field "born", field "died" ] ])
                    , scRound true
                    ]

        ax =
            axes << axis "xScale" siBottom [ axFormat (str "%Y") ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "events") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "when") ]
                            , maY [ vNum -10 ]
                            , maAngle [ vNum -25 ]
                            , maFill [ black ]
                            , maText [ vField (field "name") ]
                            , maFontSize [ vNum 10 ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mFrom [ srData (str "events") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "when") ]
                            , maY [ vNum -8 ]
                            , maWidth [ vNum 1 ]
                            , maHeight [ vField (fGroup (field "height")), vOffset (vNum 8) ]
                            , maFill [ vStr "#888" ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "people") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "born") ]
                            , maY [ vScale "yScale", vField (field "label"), vOffset (vNum -3) ]
                            , maFill [ black ]
                            , maText [ vField (field "label") ]
                            , maFontSize [ vNum 10 ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mFrom [ srData (str "people") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "born") ]
                            , maX2 [ vScale "xScale", vField (field "died") ]
                            , maY [ vScale "yScale", vField (field "label") ]
                            , maHeight [ vNum 2 ]
                            , maFill [ vStr "#557" ]
                            ]
                        ]
                    ]
                << mark rect
                    [ mFrom [ srData (str "people") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "enter") ]
                            , maX2 [ vScale "xScale", vField (field "leave") ]
                            , maY [ vScale "yScale", vField (field "label"), vOffset (vNum -1) ]
                            , maHeight [ vNum 4 ]
                            , maFill [ vStr "#e44" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 80, padding 5, ds, sc [], ax [], mk [] ]


beeswarm1 : Spec
beeswarm1 =
    let
        ds =
            dataSource
                [ data "people"
                    [ daUrl (str (dPath ++ "miserables.json")), daFormat [ jsonProperty (str "nodes") ] ]
                ]

        si =
            signals
                << signal "cx" [ siUpdate "width / 2" ]
                << signal "cy" [ siUpdate "height / 2" ]
                << signal "radius" [ siValue (vNum 8), siBind (iRange [ inMin 2, inMax 15, inStep 1 ]) ]
                << signal "collide" [ siValue (vNum 1), siBind (iRange [ inMin 1, inMax 10, inStep 1 ]) ]
                << signal "gravityX" [ siValue (vNum 0.2), siBind (iRange [ inMin 0, inMax 1 ]) ]
                << signal "gravityY" [ siValue (vNum 0.1), siBind (iRange [ inMin 0, inMax 1 ]) ]
                << signal "static" [ siValue vTrue, siBind (iCheckbox []) ]

        sc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scRange raWidth
                    , scDomain (doData [ daDataset "people", daField (field "group"), daSort [] ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange (raScheme (str "category20c") [])
                    ]

        ax =
            axes
                << axis "xScale" siBottom []

        mk =
            marks
                << mark symbol
                    [ mName "nodes"
                    , mFrom [ srData (str "people") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vScale "cScale", vField (field "group") ]
                            , maCustom "xFocus" [ vScale "xScale", vField (field "group"), vBand (num 0.5) ]
                            , maCustom "yFocus" [ vSignal "cy" ]
                            ]
                        , enUpdate
                            [ maSize [ vSignal "pow(2 * radius, 2)" ]
                            , maStroke [ white ]
                            , maStrokeWidth [ vNum 1 ]
                            , maZIndex [ vNum 0 ]
                            ]
                        , enHover
                            [ maStroke [ vStr "purple" ]
                            , maStrokeWidth [ vNum 3 ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    , mTransform
                        [ trForce
                            [ fsIterations (num 300)
                            , fsStatic (booSignal "static")
                            , fsForces
                                [ foCollide (numSignal "radius") [ fpIterations (numSignal "collide") ]
                                , foX (field "xFocus") [ fpStrength (numSignal "gravityX") ]
                                , foY (field "yFocus") [ fpStrength (numSignal "gravityY") ]
                                ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 100, paddings 5 0 5 20, autosize [ asNone ], ds, si [], sc [], ax [], mk [] ]


calendar1 : Spec
calendar1 =
    let
        ds =
            dataSource
                [ data "sp500"
                    [ -- daUrl (str (dPath ++ "sp500-2000.csv"))
                      -- TODO: Replace with standard path once data are released to data repo
                      daUrl (str "https://raw.githubusercontent.com/vega/vega/master/docs/data/sp500-2000.csv")
                    , daFormat [ csv, parse [ ( "close", foNum ), ( "date", foDate "" ) ] ]
                    ]
                    |> transform
                        [ trWindow
                            [ wnOperationOn woLag Nothing (Just (field "close")) "prev" ]
                            [ wnSort [ ( field "date", ascend ) ] ]
                        , trFormula "datum.prev ? (datum.close - datum.prev) / datum.prev : 0" "value"
                        , trFormula "year(datum.date)" "year"
                        , trTimeUnit (field "date") [ tbUnits [ year, week ], tbAs "w0" "w1" ]
                        , trFormula "timeOffset('day', datum.w0)" "w0"
                        , trTimeUnit (field "date") [ tbUnits [ day ], tbAs "d0" "d1" ]
                        ]
                ]

        si =
            signals
                << signal "step" [ siValue (vNum 16) ]
                << signal "offset" [ siValue (vNum 10) ]
                << signal "width" [ siUpdate "step*52 + offset*11" ]
                << signal "height" [ siUpdate "step*5" ]
                << signal "scheme"
                    [ siValue (vStr "pinkyellowgreen")
                    , siBind
                        (iSelect
                            [ inOptions
                                (vStrs
                                    [ "pinkyellowgreen"
                                    , "blueorange"
                                    , "brownbluegreen"
                                    , "purplegreen"
                                    , "purpleorange"
                                    , "redblue"
                                    , "redgrey"
                                    , "redyellowblue"
                                    , "redyellowgreen"
                                    , "spectral"
                                    ]
                                )
                            ]
                        )
                    ]

        lo =
            layout [ loColumns (num 1), loPadding (num 15) ]

        sc =
            scales
                << scale "yScale"
                    [ scType scBand
                    , scRange (raStep (vSignal "step"))
                    , scDomain (doData [ daDataset "sp500", daField (field "d0"), daSort [] ])
                    ]
                << scale "cScale"
                    [ scType scLinear
                    , scClamp true
                    , scRange (raScheme (strSignal "scheme") [])
                    , scDomain (doNums (nums [ -0.06, 0, 0.06 ]))
                    ]

        le =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Daily Change, S&P 500")
                    , leTitleFontSize (num 12)
                    , leTitlePadding (num 20)
                    , leOffset (num 15)
                    , leOrient loTop
                    , leType ltGradient
                    , leDirection orHorizontal
                    , leGradientLength (num 250)
                    , leGradientThickness (num 10)
                    , leFormat (str "%")
                    ]

        mk =
            marks
                << mark group
                    [ mFrom [ srFacet (str "sp500") "values" [ faGroupBy [ field "year" ] ] ]
                    , mSort [ ( field "datum.year", descend ) ]
                    , mGroup [ nestedDs, nestedSc [], nestedAx [], nestedMk [] ]
                    ]

        nestedDs =
            dataSource
                [ data "max" [ daSource "values" ]
                    |> transform [ trAggregate [ agOps [ opMax ], agFields [ field "date" ] ] ]
                , data "weeks" []
                    |> transform
                        [ trSequenceAs (num 0) (num 53) (num 1) "weeknum"
                        , trFormula "datetime(parent.year, 0, 1 + datum.weeknum * 7)" "date"
                        , trTimeUnit (field "date") [ tbUnits [ year, week ], tbAs "w0" "w1" ]
                        , trFormula "timeOffset('day', datum.w0)" "w0"
                        , trFilter (expr "datum.date < data('max')[0].max_date")
                        ]
                ]

        nestedSc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scRange (raStep (vSignal "step"))
                    , scDomain (doData [ daDataset "weeks", daField (field "w0"), daSort [] ])
                    ]

        nestedAx =
            axes
                << axis "yScale"
                    siLeft
                    [ axTicks false
                    , axDomain false
                    , axLabelPadding (num 8)
                    , axFormatAsTemporal
                    , axFormat (str "%a")
                    , axTitle (strSignal "parent.year")
                    , axTitleAngle (num 0)
                    , axTitleAlign haRight
                    , axTitleX (num -8)
                    , axTitleY (num -2)
                    , axTitleFontSize (num 10)
                    ]
                << axis "xScale"
                    siTop
                    [ axTicks false
                    , axDomain false
                    , axFormatAsTemporal
                    , axFormat (str "%b")
                    , axLabelAlign haLeft
                    , axEncode
                        [ ( aeLabels
                          , [ enUpdate
                                [ maX
                                    [ vField (field "value")
                                    , vBand (num 0)
                                    , vOffset (vSignal "month(datum.value) * offset")
                                    ]
                                , maOpacity [ vSignal "date(datum.value) < 8 ? 1 : 0" ]
                                ]
                            ]
                          )
                        ]
                    ]

        nestedMk =
            marks
                << mark rect
                    [ mFrom [ srData (str "values") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "w0"), vOffset (vSignal "month(datum.date) * offset") ]
                            , maWidth [ vScale "xScale", vBand (num 1), vOffset (vNum -1) ]
                            , maY [ vScale "yScale", vField (field "d0") ]
                            , maHeight [ vScale "yScale", vBand (num 1), vOffset (vNum -1) ]
                            , maCornerRadius [ vNum 2 ]
                            , maTooltip [ vSignal "timeFormat(datum.date, '%a %b %d, %Y') + '\\n' + format(datum.value, '+.2%')" ]
                            ]
                        , enUpdate [ maFill [ vScale "cScale", vField (field "value") ] ]
                        ]
                    ]
    in
    toVega
        [ lo, padding 5, ds, si [], sc [], le [], mk [] ]


sourceExample : Spec
sourceExample =
    calendar1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "heatmap1", heatmap1 )
        , ( "heatmap2", heatmap2 )
        , ( "parallel1", parallel1 )
        , ( "wordcloud1", wordcloud1 )
        , ( "timeline1", timeline1 )
        , ( "beeswarm1", beeswarm1 )
        , ( "calendar1", calendar1 )
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
