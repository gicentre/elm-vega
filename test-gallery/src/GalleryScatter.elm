port module GalleryScatter exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)



-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


scatterplot1 : Spec
scatterplot1 =
    let
        ds =
            dataSource
                [ data "cars" [ daUrl (str "https://vega.github.io/vega/data/cars.json") ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null") ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scRound true
                    , scNice niTrue
                    , scZero true
                    , scDomain (doData [ daDataset "cars", daField (field "Horsepower") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scRound true
                    , scNice niTrue
                    , scZero true
                    , scDomain (doData [ daDataset "cars", daField (field "Miles_per_Gallon") ])
                    , scRange raHeight
                    ]
                << scale "sizeScale"
                    [ scType scLinear
                    , scRound true
                    , scNice niFalse
                    , scZero true
                    , scDomain (doData [ daDataset "cars", daField (field "Acceleration") ])
                    , scRange (raNums [ 4, 361 ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axGrid true, axDomain false, axTickCount (num 5), axTitle (str "Horsepower") ]
                << axis "yScale" siLeft [ axGrid true, axDomain false, axTickCount (num 5), axTitle (str "Miles per gallon") ]

        shapeEncoding =
            [ maStrokeWidth [ vNum 2 ]
            , maOpacity [ vNum 0.5 ]
            , maStroke [ vStr "#4682b4" ]
            , maShape [ symbolValue symCircle ]
            , maFill [ transparent ]
            ]

        lg =
            legends
                << legend
                    [ leSize "sizeScale"
                    , leTitle (str "Acceleration")
                    , leFormat (str "s")
                    , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enUpdate <|
                            [ maX [ vScale "xScale", vField (field "Horsepower") ]
                            , maY [ vScale "yScale", vField (field "Miles_per_Gallon") ]
                            , maSize [ vScale "sizeScale", vField (field "Acceleration") ]
                            ]
                                ++ shapeEncoding
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, ds, sc [], ax [], lg [], mk [] ]


scatterplot2 : Spec
scatterplot2 =
    let
        ds =
            dataSource
                [ data "movies" [ daUrl (str "https://vega.github.io/vega/data/movies.json") ] |> transform [ trFormula "datum.Title + ' (' + (year(datum.Release_Date) || '?') + ')'" "tooltip" ]
                , data "valid" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] != null && datum[yField] != null") ]
                , data "nullXY" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] == null && datum[yField] == null"), trAggregate [] ]
                , data "nullY" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] != null && datum[yField] == null") ]
                , data "nullX" [ daSource "movies" ] |> transform [ trFilter (expr "datum[xField] == null && datum[yField] != null") ]
                ]

        si =
            signals
                << signal "yField" [ siValue (vStr "IMDB_Rating"), siBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "xField" [ siValue (vStr "Rotten_Tomatoes_Rating"), siBind (iSelect [ inOptions (vStrs [ "IMDB_Rating", "Rotten_Tomatoes_Rating", "US_Gross", "Worldwide_Gross" ]) ]) ]
                << signal "nullSize" [ siValue (vNum 8) ]
                << signal "nullGap" [ siUpdate "nullSize + 10" ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "nullGap", vSignal "width" ])
                    , scDomain (doData [ daDataset "valid", daField (fSignal "xField") ])
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "height - nullGap", vNum 0 ])
                    , scDomain (doData [ daDataset "valid", daField (fSignal "yField") ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axOffset (vNum 5), axFormat (str "s"), axTitle (strSignal "xField") ]
                << axis "yScale" siLeft [ axOffset (vNum 5), axFormat (str "s"), axTitle (strSignal "yField") ]

        mk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "valid") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (field "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (fSignal "xField") ]
                            , maY [ vScale "yScale", vField (fSignal "yField") ]
                            , maFill [ vStr "steelblue" ]
                            , maFillOpacity [ vNum 0.5 ]
                            , maZIndex [ vNum 0 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            , maZIndex [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "nullY") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (field "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (fSignal "xField") ]
                            , maY [ vSignal "height - nullSize/2" ]
                            , maFill [ vStr "#aaa" ]
                            , maFillOpacity [ vNum 0.2 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "nullX") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (field "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "nullSize/2" ]
                            , maY [ vScale "yScale", vField (fSignal "yField") ]
                            , maFill [ vStr "#aaa" ]
                            , maFillOpacity [ vNum 0.2 ]
                            , maZIndex [ vNum 1 ]
                            ]
                        , enHover
                            [ maFill [ vStr "firebrick" ]
                            , maFillOpacity [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mInteractive false
                    , mFrom [ srData (str "nullXY") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vSignal "nullSize", vOffset (vNum -4) ]
                            , maY [ vSignal "height", vOffset (vNum 13) ]
                            , maText [ vSignal "datum.count + ' null'" ]
                            , maAlign [ hRight ]
                            , maBaseline [ vTop ]
                            , maFill [ vStr "#999" ]
                            , maFontSize [ vNum 9 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 450, height 450, padding 5, ds, si [], sc [], ax [], mk [] ]


scatterplot3 : Spec
scatterplot3 =
    let
        ds =
            dataSource [ data "drive" [ daUrl (str "https://vega.github.io/vega/data/driving.json") ] ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "drive", daField (field "miles") ])
                    , scRange raWidth
                    , scNice niTrue
                    , scZero false
                    , scRound true
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "drive", daField (field "gas") ])
                    , scRange raHeight
                    , scNice niTrue
                    , scZero false
                    , scRound true
                    ]
                << scale "alignScale"
                    [ scType scOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "right", "left", "center", "center" ])
                    ]
                << scale "baseScale"
                    [ scType scOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "middle", "middle", "bottom", "top" ])
                    ]
                << scale "dx"
                    [ scType scOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ -7, 6, 0, 0 ])
                    ]
                << scale "dy"
                    [ scType scOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ 1, 1, -5, 6 ])
                    ]

        ax =
            axes
                << axis "xScale"
                    siTop
                    [ axTickCount (num 5)
                    , axTickSize (num 0)
                    , axGrid true
                    , axDomain false
                    , axEncode
                        [ ( aeDomain, [ enEnter [ maStroke [ transparent ] ] ] )
                        , ( aeLabels
                          , [ enEnter
                                [ maAlign [ hLeft ]
                                , maBaseline [ vTop ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "xScale"
                    siBottom
                    [ axTitle (str "Miles driven per capita each year")
                    , axDomain false
                    , axTicks false
                    , axLabels false
                    ]
                << axis "yScale"
                    siLeft
                    [ axTickCount (num 5)
                    , axTickSize (num 0)
                    , axGrid true
                    , axDomain false
                    , axFormat (str "$0.2f")
                    , axEncode
                        [ ( aeDomain, [ enEnter [ maStroke [ transparent ] ] ] )
                        , ( aeLabels
                          , [ enEnter
                                [ maAlign [ hLeft ]
                                , maBaseline [ vBottom ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "yScale"
                    siRight
                    [ axTitle (str "Price of a gallon of gasoline (adjusted for inflation)")
                    , axDomain false
                    , axTicks false
                    , axLabels false
                    ]

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ markInterpolationValue miCardinal ]
                            , maX [ vScale "xScale", vField (field "miles") ]
                            , maY [ vScale "yScale", vField (field "gas") ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "miles") ]
                            , maY [ vScale "yScale", vField (field "gas") ]
                            , maFill [ vStr "#fff" ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maSize [ vNum 49 ]
                            ]
                        ]
                    ]
                << mark text
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "miles") ]
                            , maY [ vScale "yScale", vField (field "gas") ]
                            , maDx [ vScale "dx", vField (field "side") ]
                            , maDy [ vScale "dy", vField (field "side") ]
                            , maFill [ vStr "#000" ]
                            , maText [ vField (field "year") ]
                            , maAlign [ vScale "alignScale", vField (field "side") ]
                            , maBaseline [ vScale "baseScale", vField (field "side") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding 5, ds, sc [], ax [], mk [] ]


scatterplot4 : Spec
scatterplot4 =
    let
        cf =
            config [ cfAxis axBand [ axBandPosition (num 1), axTickExtra true, axTickOffset (num 0) ] ]

        ds =
            dataSource
                [ data "barley" [ daUrl (str "https://vega.github.io/vega/data/barley.json") ]
                , data "summary" [ daSource "barley" ]
                    |> transform
                        [ trAggregate
                            [ agGroupBy [ field "variety" ]
                            , agFields (List.repeat 7 (field "yield"))
                            , agOps [ opMean, opStdev, opStderr, opCI0, opCI1, opQ1, opQ3 ]
                            , agAs [ "mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1" ]
                            ]
                        , trFormula "datum.mean - datum.stdev" "stdev0"
                        , trFormula "datum.mean + datum.stdev" "stdev1"
                        , trFormula "datum.mean - datum.stderr" "stderr0"
                        , trFormula "datum.mean + datum.stderr" "stderr1"
                        ]
                ]

        si =
            signals
                << signal "errorMeasure"
                    [ siValue (vStr "95% Confidence Interval")
                    , siBind (iSelect [ inOptions (vStrs [ "95% Confidence Interval", "Standard Error", "Standard Deviation", "Interquartile Range" ]) ])
                    ]
                << signal "lookup"
                    [ siValue
                        (vObject
                            [ keyValue "95% Confidence Interval" (vStr "ci")
                            , keyValue "Standard Deviation" (vStr "stdev")
                            , keyValue "Standard Error" (vStr "stderr")
                            , keyValue "Interquartile Range" (vStr "iqr")
                            ]
                        )
                    ]
                << signal "measure" [ siUpdate "lookup[errorMeasure]" ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scRange raWidth
                    , scDomain (doData [ daDataset "summary", daFields [ field "stdev0", field "stdev1" ] ])
                    , scRound true
                    , scNice niTrue
                    , scZero false
                    ]
                << scale "yScale"
                    [ scType scBand
                    , scRange raHeight
                    , scDomain
                        (doData
                            [ daDataset "summary"
                            , daField (field "variety")
                            , daSort [ soOp opMax, soByField (str "mean"), soDescending ]
                            ]
                        )
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axZIndex (num 1), axTitle (str "Barley Yield") ]
                << axis "yScale" siLeft [ axTickCount (num 5), axZIndex (num 1) ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ black ], maHeight [ vNum 1 ] ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "datum[measure+'0']" ]
                            , maY [ vScale "yScale", vField (field "variety"), vBand (num 0.5) ]
                            , maX2 [ vScale "xScale", vSignal "datum[measure+'1']" ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "back" ], maSize [ vNum 40 ] ]
                        , enUpdate
                            [ maX [ vScale "xScale", vField (field "mean") ]
                            , maY [ vScale "yScale", vField (field "variety"), vBand (num 0.5) ]
                            ]
                        ]
                    ]
    in
    toVega
        [ cf, width 500, height 160, padding 5, ds, si [], sc [], ax [], mk [] ]


scatterplot5 : Spec
scatterplot5 =
    let
        ds =
            dataSource [ data "barley" [ daUrl (str "https://vega.github.io/vega/data/barley.json") ] ]

        si =
            signals
                << signal "offset" [ siValue (vNum 15) ]
                << signal "cellHeight" [ siValue (vNum 100) ]
                << signal "height" [ siUpdate "6 * (offset + cellHeight)" ]

        sc =
            scales
                << scale "gScale"
                    [ scType scBand
                    , scRange (raValues [ vNum 0, vSignal "height" ])
                    , scRound true
                    , scDomain
                        (doData
                            [ daDataset "barley"
                            , daField (field "site")
                            , daSort [ soByField (str "yield"), soOp opMedian, soDescending ]
                            ]
                        )
                    , scNice niTrue
                    , scZero false
                    ]
                << scale "xScale"
                    [ scType scLinear
                    , scNice niTrue
                    , scRange raWidth
                    , scRound true
                    , scDomain (doData [ daDataset "barley", daField (field "yield") ])
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "barley", daField (field "year") ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axZIndex (num 1) ]

        nestedAx =
            axes
                << axis "yScale"
                    siLeft
                    [ axTickSize (num 0)
                    , axDomain false
                    , axGrid true
                    , axEncode [ ( aeGrid, [ enEnter [ maStrokeDash [ vNums [ 3, 3 ] ] ] ] ) ]
                    ]
                << axis "yScale" siRight [ axTickSize (num 0), axDomain false ]

        nestedMk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "sites") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "yield") ]
                            , maY [ vScale "yScale", vField (field "variety") ]
                            , maStroke [ vScale "cScale", vField (field "year") ]
                            , maStrokeWidth [ vNum 2 ]
                            , maSize [ vNum 50 ]
                            ]
                        ]
                    ]

        nestedSc =
            scales
                << scale "yScale"
                    [ scType scPoint
                    , scRange (raValues [ vNum 0, vSignal "cellHeight" ])
                    , scPadding (num 1)
                    , scRound true
                    , scDomain
                        (doData
                            [ daDataset "barley"
                            , daField (field "variety")
                            , daSort [ soByField (str "yield"), soOp opMedian, soDescending ]
                            ]
                        )
                    ]

        le =
            legends
                << legend
                    [ leStroke "cScale"
                    , leTitle (str "Year")
                    , lePadding (num 4)
                    , leEncode [ enSymbols [ enEnter [ maStrokeWidth [ vNum 2 ], maSize [ vNum 50 ] ] ] ]
                    ]

        mk =
            marks
                << mark group
                    [ mName "site"
                    , mFrom [ srFacet (str "barley") "sites" [ faGroupBy [ field "site" ] ] ]
                    , mEncode
                        [ enEnter
                            [ maY
                                [ vScale "gScale"
                                , vField (field "site")
                                , vOffset (vSignal "offset")
                                ]
                            , maHeight [ vSignal "cellHeight" ]
                            , maWidth [ vSignal "width" ]
                            , maStroke [ vStr "#ccc" ]
                            ]
                        ]
                    , mGroup [ nestedSc [], nestedAx [], nestedMk [] ]
                    ]
                << mark text
                    [ mFrom [ srData (str "site") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vField (field "width"), vMultiply (vNum 0.5) ]
                            , maY [ vField (field "y") ]
                            , maFontSize [ vNum 11 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vField (field "datum.site") ]
                            , maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            , maFill [ black ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, padding 5, ds, si [], sc [], ax [], le [], mk [] ]


sourceExample : Spec
sourceExample =
    scatterplot5



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "scatterplot1", scatterplot1 )
        , ( "scatterplot2", scatterplot2 )
        , ( "scatterplot3", scatterplot3 )
        , ( "scatterplot4", scatterplot4 )
        , ( "scatterplot5", scatterplot5 )
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
