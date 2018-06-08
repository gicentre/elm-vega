port module GalleryOther exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


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
                [ tiAnchor Middle
                , tiFontSize (num 16)
                , tiFrame FrGroup
                , tiOffset (num 4)
                ]

        ds =
            dataSource
                [ data "temperature"
                    [ daUrl "https://vega.github.io/vega/data/seattle-temps.csv"
                    , daFormat [ CSV, parse [ ( "temp", FoNum ), ( "date", foDate "" ) ] ]
                    ]
                    |> transform
                        [ trFormula "hours(datum.date)" "hour" InitOnly
                        , trFormula "datetime(year(datum.date), month(datum.date), date(datum.date))" "day" InitOnly
                        , trFormula "(datum.temp - 32) / 1.8" "celsius" InitOnly
                        ]
                ]

        si =
            signals
                << signal "palette" [ siValue (vStr "Viridis"), siBind (iSelect [ inOptions (vStrs colors) ]) ]
                << signal "reverse" [ siValue (vBoo False), siBind (iCheckbox []) ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScTime
                    , scDomain (doData [ daDataset "temperature", daField (field "day") ])
                    , scRange (raDefault RWidth)
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scDomain (doNums (nums [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5 ]))
                    , scRange (raDefault RHeight)
                    ]
                << scale "cScale"
                    [ scType ScSequential
                    , scRange (raScheme (strSignal "palette") [])
                    , scDomain (doData [ daDataset "temperature", daField (field "celsius") ])
                    , scReverse (booSignal "reverse")
                    , scZero (boo False)
                    , scNice NTrue
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axDomain (boo False), axTitle (str "Month"), axFormat "%b" ]
                << axis "yScale"
                    SLeft
                    [ axDomain (boo False)
                    , axTitle (str "Hour")
                    , axEncode
                        [ ( ELabels
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
                    , leType LGradient
                    , leTitle (str "Avg. Temp (°C)")
                    , leTitleFontSize (num 12)
                    , leTitlePadding (vNum 4)
                    , leGradientLength (numSignal "height - 16")
                    ]

        mk =
            marks
                << mark Rect
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


parallel1 : Spec
parallel1 =
    let
        --  TODO: Add config
        ds =
            dataSource
                [ data "cars"
                    [ daUrl "https://vega.github.io/vega/data/cars.json"
                    , daFormat [ JSON, parse [ ( "Year", foDate "%Y-%m-%d" ) ] ]
                    ]
                    |> transform
                        [ trFilter (expr "datum.Horsepower && datum.Miles_per_Gallon")
                        , trFormula "isNumber(datum.year) ? datum.year : year(datum.Year)" "Year" InitOnly
                        ]
                , data "fields" [ daValue (vStrs [ "Cylinders", "Displacement", "Weight_in_lbs", "Horsepower", "Acceleration", "Miles_per_Gallon", "Year" ]) ]
                ]

        dimensionScale fName =
            scale fName
                [ scType ScLinear
                , scRange (raDefault RHeight)
                , scDomain (doData [ daDataset "cars", daField (field fName) ])
                , scZero (boo False)
                , scNice NTrue
                ]

        sc =
            scales
                << scale "ord"
                    [ scType ScPoint
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "fields", daField (field "data") ])
                    , scRound (boo True)
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
                SLeft
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
                << mark Group [ mFrom [ srData (str "cars") ], mGroup [ nestedMk [] ] ]

        nestedMk =
            marks
                << mark Line
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
        [ width 700, height 400, padding 5, ds, sc [], ax [], mk [] ]


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
                        [ trCountPattern (field "data") [ cpCase Uppercase, cpPattern (str "[\\w']{3,}"), cpStopwords (str stopwords) ]
                        , trFormula "[-45, 0, 45][~~(random() * 3)]" "angle" InitOnly
                        , trFormula "if(datum.text=='VEGA', 600, 300)" "weight" InitOnly
                        ]
                ]

        sc =
            scales << scale "cScale" [ scType ScOrdinal, scRange (raStrs [ "#d5a928", "#652c90", "#939597" ]) ]

        mk =
            marks
                << mark Text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maText [ vField (field "text") ]
                            , maAlign [ vStr (hAlignLabel AlignCenter) ]
                            , maBaseline [ vStr (vAlignLabel Alphabetic) ]
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


sourceExample : Spec
sourceExample =
    wordcloud1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "heatmap1", heatmap1 )
        , ( "parallel1", parallel1 )
        , ( "wordcloud1", wordcloud1 )
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
