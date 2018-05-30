port module GalleryScatter exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


scatterplot1 : Spec
scatterplot1 =
    let
        ds =
            dataSource
                [ data "cars" [ daUrl "https://vega.github.io/vega/data/cars.json" ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null && datum['Acceleration'] != null") ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Horsepower") ])
                    , scRange (raDefault RWidth)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Miles_per_Gallon") ])
                    , scRange (raDefault RHeight)
                    ]
                << scale "sizeScale"
                    [ scType ScLinear
                    , scRound (boo True)
                    , scNice niFalse
                    , scZero (boo True)
                    , scDomain (doData [ daDataset "cars", daField (str "Acceleration") ])
                    , scRange (raNums [ 4, 361 ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Horsepower") ]
                << axis "yScale" SLeft [ axGrid True, axDomain False, axTickCount 5, axTitle (str "Miles per gallon") ]

        shapeEncoding =
            [ maStrokeWidth [ vNum 2 ]
            , maOpacity [ vNum 0.5 ]
            , maStroke [ vStr "#4682b4" ]
            , maShape [ vStr (symbolLabel SymCircle) ]
            , maFill [ vStr "transparent" ]
            ]

        lg =
            legends
                << legend
                    [ leSize "sizeScale"
                    , leTitle "Acceleration"
                    , leFormat "s"
                    , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                    ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enUpdate <|
                            [ maX [ vScale (fName "xScale"), vField (fName "Horsepower") ]
                            , maY [ vScale (fName "yScale"), vField (fName "Miles_per_Gallon") ]
                            , maSize [ vScale (fName "sizeScale"), vField (fName "Acceleration") ]
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
                [ data "movies" [ daUrl "https://vega.github.io/vega/data/movies.json" ] |> transform [ trFormula "datum.Title + ' (' + (year(datum.Release_Date) || '?') + ')'" "tooltip" AlwaysUpdate ]
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
                    [ scType ScLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "nullGap", vSignal "width" ])
                    , scDomain (doData [ daDataset "valid", daField (strSignal "xField") ])
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scNice niTrue
                    , scRange (raValues [ vSignal "height - nullGap", vNum 0 ])
                    , scDomain (doData [ daDataset "valid", daField (strSignal "yField") ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axOffset (num 5), axFormat "s", axTitle (strSignal "xField") ]
                << axis "yScale" SLeft [ axOffset (num 5), axFormat "s", axTitle (strSignal "yField") ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "valid") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fSignal "xField") ]
                            , maY [ vScale (fName "yScale"), vField (fSignal "yField") ]
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
                << mark Symbol
                    [ mFrom [ srData (str "nullY") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fSignal "xField") ]
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
                << mark Symbol
                    [ mFrom [ srData (str "nullX") ]
                    , mEncode
                        [ enEnter
                            [ maSize [ vNum 50 ]
                            , maTooltip [ vField (fName "tooltip") ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "nullSize/2" ]
                            , maY [ vScale (fName "yScale"), vField (fSignal "yField") ]
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
                << mark Text
                    [ mInteractive (boo False)
                    , mFrom [ srData (str "nullXY") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vSignal "nullSize", vOffset (vNum -4) ]
                            , maY [ vSignal "height", vOffset (vNum 13) ]
                            , maText [ vSignal "datum.count + ' null'" ]
                            , maAlign [ vStr (hAlignLabel AlignRight) ]
                            , maBaseline [ vStr (vAlignLabel AlignTop) ]
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
            dataSource [ data "drive" [ daUrl "https://vega.github.io/vega/data/driving.json" ] ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "drive", daField (str "miles") ])
                    , scRange (raDefault RWidth)
                    , scNice niTrue
                    , scZero (boo False)
                    , scRound (boo True)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "drive", daField (str "gas") ])
                    , scRange (raDefault RHeight)
                    , scNice niTrue
                    , scZero (boo False)
                    , scRound (boo True)
                    ]
                << scale "alignScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "right", "left", "center", "center" ])
                    ]
                << scale "baseScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raStrs [ "middle", "middle", "bottom", "top" ])
                    ]
                << scale "dx"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ -7, 6, 0, 0 ])
                    ]
                << scale "dy"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "left", "right", "top", "bottom" ]))
                    , scRange (raNums [ 1, 1, -5, 6 ])
                    ]

        ax =
            axes
                << axis "xScale"
                    STop
                    [ axTickCount 5
                    , axTickSize 0
                    , axGrid True
                    , axDomain False
                    , axEncode
                        [ ( EDomain, [ enEnter [ maStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enEnter
                                [ maAlign [ vStr (hAlignLabel AlignLeft) ]
                                , maBaseline [ vStr (vAlignLabel AlignTop) ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "xScale"
                    SBottom
                    [ axTitle (str "Miles driven per capita each year")
                    , axDomain False
                    , axTicks False
                    , axLabels False
                    ]
                << axis "yScale"
                    SLeft
                    [ axTickCount 5
                    , axTickSize 0
                    , axGrid True
                    , axDomain False
                    , axFormat "$0.2f"
                    , axEncode
                        [ ( EDomain, [ enEnter [ maStroke [ vStr "transparent" ] ] ] )
                        , ( ELabels
                          , [ enEnter
                                [ maAlign [ vStr (hAlignLabel AlignLeft) ]
                                , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                                , maFontSize [ vNum 12 ]
                                , maFontWeight [ vStr "bold" ]
                                ]
                            ]
                          )
                        ]
                    ]
                << axis "yScale"
                    SRight
                    [ axTitle (str "Price of a gallon of gasoline (adjusted for inflation)")
                    , axDomain False
                    , axTicks False
                    , axLabels False
                    ]

        mk =
            marks
                << mark Line
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maInterpolate [ vStr (markInterpolationLabel Cardinal) ]
                            , maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 3 ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maFill [ vStr "#fff" ]
                            , maStroke [ vStr "#000" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maSize [ vNum 49 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "drive") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "miles") ]
                            , maY [ vScale (fName "yScale"), vField (fName "gas") ]
                            , maDx [ vScale (fName "dx"), vField (fName "side") ]
                            , maDy [ vScale (fName "dy"), vField (fName "side") ]
                            , maFill [ vStr "#000" ]
                            , maText [ vField (fName "year") ]
                            , maAlign [ vScale (fName "alignScale"), vField (fName "side") ]
                            , maBaseline [ vScale (fName "baseScale"), vField (fName "side") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 500, padding 5, ds, sc [], ax [], mk [] ]


scatterplot4 : Spec
scatterplot4 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "barley" [ daUrl "https://vega.github.io/vega/data/barley.json" ]
                , data "summary" [ daSource "barley" ]
                    |> transform
                        [ trAggregate
                            [ agGroupBy [ str "variety" ]
                            , agFields (List.repeat 7 (str "yield"))
                            , agOps [ Mean, Stdev, Stderr, CI0, CI1, Q1, Q3 ]
                            , agAs [ "mean", "stdev", "stderr", "ci0", "ci1", "iqr0", "iqr1" ]
                            ]
                        , trFormula "datum.mean - datum.stdev" "stdev0" AlwaysUpdate
                        , trFormula "datum.mean + datum.stdev" "stdev1" AlwaysUpdate
                        , trFormula "datum.mean - datum.stderr" "stderr0" AlwaysUpdate
                        , trFormula "datum.mean + datum.stderr" "stderr1" AlwaysUpdate
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
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "summary", daFields (strs [ "stdev0", "stdev1" ]) ])
                    , scRound (boo True)
                    , scNice niTrue
                    , scZero (boo False)
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "summary", daField (str "variety"), daSort [ soOp Max, soByField (str "mean"), Descending ] ])
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex 1, axTitle (str "Barley Yield") ]
                << axis "yScale" SLeft [ axTickCount 5, axZIndex 1 ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "black" ], maHeight [ vNum 1 ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vSignal "datum[measure+'0']" ]
                            , maY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
                            , maX2 [ vScale (fName "xScale"), vSignal "datum[measure+'1']" ]
                            ]
                        ]
                    ]
                << mark Symbol
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "back" ], maSize [ vNum 40 ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "mean") ]
                            , maY [ vScale (fName "yScale"), vField (fName "variety"), vBand 0.5 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 160, padding 5, ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    scatterplot1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "scatterplot1", scatterplot1 )
        , ( "scatterplot2", scatterplot2 )
        , ( "scatterplot3", scatterplot3 )
        , ( "scatterplot4", scatterplot4 )
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
