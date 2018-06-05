port module GalleryDist exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://vega.github.io/vega-datasets/
-- The examples themselves reproduce those at https://vega.github.io/vega/examples/


histo1 : Spec
histo1 =
    let
        ds =
            dataSource
                [ data "points" [ daUrl "https://vega.github.io/vega/data/normal-2d.json" ]
                , data "binned" [ daSource "points" ]
                    |> transform
                        [ trBin (str "u")
                            (nums [ -1, 1 ])
                            [ bnAnchor (numSignal "binOffset")
                            , bnStep (numSignal "binStep")
                            , bnNice (boo False)
                            ]
                        , trAggregate
                            [ agKey (str "bin0")
                            , agGroupBy [ str "bin0", str "bin1" ]
                            , agOps [ Count ]
                            , agAs [ "count" ]
                            ]
                        ]
                ]

        si =
            signals
                << signal "binOffset"
                    [ siValue (vNum 0)
                    , siBind (iRange [ inMin -0.1, inMax 0.1 ])
                    ]
                << signal "binStep"
                    [ siValue (vNum 0.1)
                    , siBind (iRange [ inMin -0.001, inMax 0.4, inStep 0.001 ])
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doNums (nums [ -1, 1 ]))
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "binned", daField (str "count") ])
                    , scZero (boo True)
                    , scNice NTrue
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex (num 1) ]
                << axis "yScale" SLeft [ axTickCount (num 5), axZIndex (num 1) ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "binned") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "bin0") ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "bin1"), vOffset (vSignal "binStep > 0.02 ? -0.5 : 0") ]
                            , maY [ vScale (fName "yScale"), vField (fName "count") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enHover [ maFill [ vStr "firebrick" ] ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "points") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "u") ]
                            , maWidth [ vNum 1 ]
                            , maY [ vNum 25, vOffset (vSignal "height") ]
                            , maHeight [ vNum 5 ]
                            , maFill [ vStr "#steelblue" ]
                            , maFillOpacity [ vNum 0.4 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 100, padding 5, ds, si [], sc [], ax [], mk [] ]


histo2 : Spec
histo2 =
    let
        ds =
            dataSource
                [ data "table" [ daUrl "https://vega.github.io/vega/data/movies.json" ]
                    |> transform
                        [ trExtentAsSignal (str "IMDB_Rating") "extent"
                        , trBin (str "IMDB_Rating")
                            (numSignal "extent")
                            [ bnSignal "bins"
                            , bnMaxBins (numSignal "maxBins")
                            ]
                        ]
                , data "counts" [ daSource "table" ]
                    |> transform
                        [ trFilter (expr "datum['IMDB_Rating'] != null")
                        , trAggregate [ agGroupBy [ str "bin0", str "bin1" ] ]
                        ]
                , data "nulls" [ daSource "table" ]
                    |> transform
                        [ trFilter (expr "datum['IMDB_Rating'] == null")
                        , trAggregate []
                        ]
                ]

        si =
            signals
                << signal "maxBins" [ siValue (vNum 10), siBind (iSelect [ inOptions (vNums [ 5, 10, 20 ]) ]) ]
                << signal "binDomain" [ siUpdate "sequence(bins.start, bins.stop + bins.step, bins.step)" ]
                << signal "nullGap" [ siValue (vNum 10) ]
                << signal "barStep" [ siUpdate "(width - nullGap) / binDomain.length" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBinLinear
                    , scRange (raValues [ vSignal "barStep + nullGap", vSignal "width" ])
                    , scDomain (doNums (numSignal "binDomain"))
                    , scRound (boo True)
                    ]
                << scale "xScaleNull"
                    [ scType ScBand
                    , scRange (raValues [ vNum 0, vSignal "barStep" ])
                    , scRound (boo True)
                    , scDomain (doStrs (strs [ "null" ]))
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scRound (boo True)
                    , scNice NTrue
                    , scDomain
                        (doData
                            [ daReferences
                                [ [ daDataset "counts", daField (str "count") ]
                                , [ daDataset "nulls", daField (str "count") ]
                                ]
                            ]
                        )
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axTickCount (num 10) ]
                << axis "xScaleNull" SBottom []
                << axis "yScale" SLeft [ axTickCount (num 5), axOffset (num 5) ]

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "counts") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "bin0"), vOffset (vNum 1) ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "bin1") ]
                            , maY [ vScale (fName "yScale"), vField (fName "count") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        , enHover [ maFill [ vStr "firebrick" ] ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "nulls") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScaleNull"), vNull, vOffset (vNum 1) ]
                            , maX2 [ vScale (fName "xScaleNull"), vBand 1 ]
                            , maY [ vScale (fName "yScale"), vField (fName "count") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFill [ vStr "#aaa" ]
                            ]
                        , enHover [ maFill [ vStr "firebrick" ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, autosize [ AFit, AResize ], ds, si [], sc [], ax [], mk [] ]


density1 : Spec
density1 =
    let
        ds =
            dataSource
                [ data "points" [ daUrl "https://vega.github.io/vega/data/normal-2d.json" ]
                , data "summary" [ daSource "points" ]
                    |> transform
                        [ trAggregate
                            [ agFields [ str "u", str "u" ]
                            , agOps [ Mean, Stdev ]
                            , agAs [ "mean", "stdev" ]
                            ]
                        ]
                , data "density" [ daSource "points" ]
                    |> transform
                        [ trDensity (diKde "points" (str "u") (numSignal "bandWidth"))
                            [ dnExtent (numSignal "domain('xScale')")
                            , dnSteps (numSignal "steps")
                            , dnMethodAsSignal "method"
                            ]
                        ]
                , data "normal" []
                    |> transform
                        [ trDensity (diNormal (numSignal "data('summary')[0].mean") (numSignal "data('summary')[0].stdev"))
                            [ dnExtent (numSignal "domain('xScale')")
                            , dnSteps (numSignal "steps")
                            , dnMethodAsSignal "method"
                            ]
                        ]
                ]

        si =
            signals
                << signal "bandWidth" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 0.1, inStep 0.001 ]) ]
                << signal "steps" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 500, inStep 1 ]) ]
                << signal "method" [ siValue (vStr "pdf"), siBind (iRadio [ inOptions (vStrs [ "pdf", "cdf" ]) ]) ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "points", daField (str "u") ])
                    , scNice NTrue
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scRound (boo True)
                    , scDomain
                        (doData
                            [ daReferences
                                [ [ daDataset "density", daField (str "density") ]
                                , [ daDataset "normal", daField (str "density") ]
                                ]
                            ]
                        )
                    ]
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doStrs (strs [ "Normal Estimate", "Kernel Density Estimate" ]))
                    , scRange (raStrs [ "#444", "steelblue" ])
                    ]

        ax =
            axes << axis "xScale" SBottom [ axZIndex (num 1) ]

        le =
            legends << legend [ leOrient TopLeft, leOffset (vNum 0), leZIndex 1, leFill "cScale" ]

        mk =
            marks
                << mark Area
                    [ mFrom [ srData (str "density") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "value") ]
                            , maY [ vScale (fName "yScale"), vField (fName "density") ]
                            , maY2 [ vScale (fName "yScale"), vNum 0 ]
                            , maFill [ vSignal "scale('cScale', 'Kernel Density Estimate')" ]
                            ]
                        ]
                    ]
                << mark Line
                    [ mFrom [ srData (str "normal") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "value") ]
                            , maY [ vScale (fName "yScale"), vField (fName "density") ]
                            , maStroke [ vSignal "scale('cScale', 'Normal Estimate')" ]
                            , maStrokeWidth [ vNum 2 ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "points") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale (fName "xScale"), vField (fName "u") ]
                            , maWidth [ vNum 1 ]
                            , maY [ vNum 25, vOffset (vSignal "height") ]
                            , maHeight [ vNum 5 ]
                            , maFill [ vStr "steelblue" ]
                            , maOpacity [ vNum 0.4 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 100, padding 5, ds, si [], sc [], ax [], le [], mk [] ]


boxplot1 : Spec
boxplot1 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "iris" [ daUrl "https://vega.github.io/vega/data/iris.json" ]
                    |> transform [ trFoldAs (strSignal "fields") "organ" "value" ]
                ]

        si =
            signals
                << signal "fields" [ siValue (vStrs [ "petalWidth", "petalLength", "sepalWidth", "sepalLength" ]) ]
                << signal "plotWidth" [ siValue (vNum 60) ]
                << signal "height" [ siUpdate "(plotWidth + 10) * length(fields)" ]

        sc =
            scales
                << scale "layout"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "iris", daField (str "organ") ])
                    ]
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "iris", daField (str "value") ])
                    , scZero (boo True)
                    , scNice NTrue
                    ]
                << scale "cScale" [ scType ScOrdinal, scRange (raDefault RCategory) ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex (num 1) ]
                << axis "layout" SLeft [ axTickCount (num 5), axZIndex (num 1) ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "iris" "organs" [ faGroupBy [ "organ" ] ] ]
                    , mEncode
                        [ enEnter
                            [ maYC [ vScale (fName "layout"), vField (fName "organ"), vBand 0.5 ]
                            , maHeight [ vSignal "plotWidth" ]
                            , maWidth [ vSignal "width" ]
                            ]
                        ]
                    , mGroup [ nestedDs, nestedMk [] ]
                    ]

        nestedDs =
            dataSource
                [ data "summary" [ daSource "organs" ]
                    |> transform
                        [ trAggregate
                            [ agFields [ str "value", str "value", str "value", str "value", str "value" ]
                            , agOps [ Min, Q1, Median, Q3, Max ]
                            , agAs [ "min", "q1", "median", "q3", "max" ]
                            ]
                        ]
                ]

        nestedMk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "black" ]
                            , maHeight [ vNum 1 ]
                            ]
                        , enUpdate
                            [ maYC [ vSignal "plotWidth / 2", vOffset (vNum -0.5) ]
                            , maX [ vScale (fName "xScale"), vField (fName "min") ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "max") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "steelblue" ]
                            , maCornerRadius [ vNum 4 ]
                            ]
                        , enUpdate
                            [ maYC [ vSignal "plotWidth / 2" ]
                            , maHeight [ vSignal "plotWidth / 2" ]
                            , maX [ vScale (fName "xScale"), vField (fName "q1") ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "q3") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "aliceblue" ]
                            , maWidth [ vNum 2 ]
                            ]
                        , enUpdate
                            [ maYC [ vSignal "plotWidth / 2" ]
                            , maHeight [ vSignal "plotWidth / 2" ]
                            , maX [ vScale (fName "xScale"), vField (fName "median") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, padding 5, ds, si [], sc [], ax [], mk [] ]


violinplot1 : Spec
violinplot1 =
    -- TODO: Add config
    let
        ds =
            dataSource
                [ data "iris" [ daUrl "https://vega.github.io/vega/data/iris.json" ]
                    |> transform [ trFoldAs (strSignal "fields") "organ" "value" ]
                ]

        si =
            signals
                << signal "fields" [ siValue (vStrs [ "petalWidth", "petalLength", "sepalWidth", "sepalLength" ]) ]
                << signal "plotWidth" [ siValue (vNum 60) ]
                << signal "height" [ siUpdate "(plotWidth + 10) * length(fields)" ]
                << signal "bandWidth" [ siValue (vNum 0), siBind (iRange [ inMin 0, inMax 0.5, inStep 0.005 ]) ]
                << signal "steps" [ siValue (vNum 100), siBind (iRange [ inMin 10, inMax 500, inStep 1 ]) ]

        sc =
            scales
                << scale "layout"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "iris", daField (str "organ") ])
                    ]
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scRound (boo True)
                    , scDomain (doData [ daDataset "iris", daField (str "value") ])
                    , scZero (boo True)
                    , scNice NTrue
                    ]
                << scale "cScale" [ scType ScOrdinal, scRange (raDefault RCategory) ]

        ax =
            axes
                << axis "xScale" SBottom [ axZIndex (num 1) ]
                << axis "layout" SLeft [ axTickCount (num 5), axZIndex (num 1) ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srFacet "iris" "organs" [ faGroupBy [ "organ" ] ] ]
                    , mEncode
                        [ enEnter
                            [ maYC [ vScale (fName "layout"), vField (fName "organ"), vBand 0.5 ]
                            , maHeight [ vSignal "plotWidth" ]
                            , maWidth [ vSignal "width" ]
                            ]
                        ]
                    , mGroup [ nestedDs, nestedSc [], nestedMk [] ]
                    ]

        nestedDs =
            dataSource
                [ data "density" []
                    |> transform
                        [ trDensity (diKde "organs" (str "value") (numSignal "bandWidth"))
                            [ dnSteps (numSignal "steps") ]
                        , trStack
                            [ stGroupBy [ str "value" ]
                            , stField (str "density")
                            , stOffset OfCenter
                            , stAs "y0" "y1"
                            ]
                        ]
                , data "summary" [ daSource "organs" ]
                    |> transform
                        [ trAggregate
                            [ agFields [ str "value", str "value", str "value" ]
                            , agOps [ Q1, Median, Q3 ]
                            , agAs [ "q1", "median", "q3" ]
                            ]
                        ]
                ]

        nestedSc =
            scales
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raValues [ vNum 0, vSignal "plotWidth" ])
                    , scDomain (doData [ daDataset "density", daField (str "density") ])
                    ]

        nestedMk =
            marks
                << mark Area
                    [ mFrom [ srData (str "density") ]
                    , mEncode
                        [ enEnter [ maFill [ vScale (fName "cScale"), vField (fParent (fName "organ")) ] ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "value") ]
                            , maY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , maY2 [ vScale (fName "yScale"), vField (fName "y1") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "black" ]
                            , maHeight [ vNum 2 ]
                            ]
                        , enUpdate
                            [ maYC [ vSignal "plotWidth / 2" ]
                            , maX [ vScale (fName "xScale"), vField (fName "q1") ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "q3") ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "black" ]
                            , maWidth [ vNum 2 ]
                            , maHeight [ vNum 8 ]
                            ]
                        , enUpdate
                            [ maYC [ vSignal "plotWidth / 2" ]
                            , maX [ vScale (fName "xScale"), vField (fName "median") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, padding 5, ds, si [], sc [], ax [], mk [] ]


window1 : Spec
window1 =
    let
        ds =
            dataSource
                [ data "directors" [ daUrl "https://vega.github.io/vega/data/movies.json" ]
                    |> transform
                        [ trFilter (expr "datum.Director != null && datum.Worldwide_Gross != null")
                        , trAggregate
                            [ agGroupBy [ str "Director" ]
                            , agOps [ opSignal "op" ]
                            , agFields [ str "Worldwide_Gross" ]
                            , agAs [ "Gross" ]
                            ]
                        , trWindow [ wnOperation RowNumber "rank" ]
                            [ wnSort [ ( str "Gross", Descend ) ] ]
                        , trFilter (expr "datum.rank <= k")
                        ]
                ]

        si =
            signals
                << signal "k"
                    [ siValue (vNum 20)
                    , siBind (iRange [ inMin 10, inMax 30, inStep 1 ])
                    ]
                << signal "op"
                    [ siValue (vStr "average")
                    , siBind (iSelect [ inOptions (vStrs [ "average", "median", "sum" ]) ])
                    ]
                << signal "label"
                    [ siValue
                        (vObject
                            [ keyValue "average" (vStr "Average")
                            , keyValue "median" (vStr "Median")
                            , keyValue "sum" (vStr "Total")
                            ]
                        )
                    ]

        ti =
            title (strSignal "'Top Directors by ' + label[op] + ' Worldwide Gross'") [ tiAnchor Start ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "directors", daField (str "Gross") ])
                    , scNice NTrue
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain
                        (doData
                            [ daDataset "directors"
                            , daField (str "Director")
                            , daSort [ soOp Max, soByField (str "Gross"), Descending ]
                            ]
                        )
                    , scPadding (num 0.1)
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axFormat "$,d", axTickCount (num 5) ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "directors") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vNum 0 ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "Gross") ]
                            , maY [ vScale (fName "yScale"), vField (fName "Director") ]
                            , maHeight [ vScale (fName "yScale"), vBand 1 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 410, padding 5, autosize [ AFit ], ti, ds, si [], sc [], ax [], mk [] ]


window2 : Spec
window2 =
    let
        ds =
            dataSource
                [ data "source" [ daUrl "https://vega.github.io/vega/data/movies.json" ]
                    |> transform [ trFilter (expr "datum.Director != null && datum.Worldwide_Gross != null") ]
                , data "ranks" [ daSource "source" ]
                    |> transform
                        [ trAggregate
                            [ agGroupBy [ str "Director" ]
                            , agOps [ opSignal "op" ]
                            , agFields [ str "Worldwide_Gross" ]
                            , agAs [ "Gross" ]
                            ]
                        , trWindow [ wnOperation RowNumber "rank" ]
                            [ wnSort [ ( str "Gross", Descend ) ] ]
                        ]
                , data "directors" [ daSource "source" ]
                    |> transform
                        [ trLookup "ranks" (str "Director") [ str "Director" ] [ luValues [ str "rank" ] ]
                        , trFormula "datum.rank < k ? datum.Director : 'All Others'" "Category" AlwaysUpdate
                        , trAggregate
                            [ agGroupBy [ str "Category" ]
                            , agOps [ opSignal "op" ]
                            , agFields [ str "Worldwide_Gross" ]
                            , agAs [ "Gross" ]
                            ]
                        ]
                ]

        si =
            signals
                << signal "k"
                    [ siValue (vNum 20)
                    , siBind (iRange [ inMin 10, inMax 30, inStep 1 ])
                    ]
                << signal "op"
                    [ siValue (vStr "average")
                    , siBind (iSelect [ inOptions (vStrs [ "average", "median", "sum" ]) ])
                    ]
                << signal "label"
                    [ siValue
                        (vObject
                            [ keyValue "average" (vStr "Average")
                            , keyValue "median" (vStr "Median")
                            , keyValue "sum" (vStr "Total")
                            ]
                        )
                    ]

        ti =
            title (strSignal "'Top Directors by ' + label[op] + ' Worldwide Gross'") [ tiAnchor Start ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "directors", daField (str "Gross") ])
                    , scNice NTrue
                    ]
                << scale "yScale"
                    [ scType ScBand
                    , scRange (raDefault RHeight)
                    , scDomain
                        (doData
                            [ daDataset "directors"
                            , daField (str "Category")
                            , daSort [ soOp Max, soByField (str "Gross"), Descending ]
                            ]
                        )
                    , scPadding (num 0.1)
                    ]

        ax =
            axes
                << axis "xScale" SBottom [ axFormat "$,d", axTickCount (num 5) ]
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "directors") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vNum 0 ]
                            , maX2 [ vScale (fName "xScale"), vField (fName "Gross") ]
                            , maY [ vScale (fName "yScale"), vField (fName "Category") ]
                            , maHeight [ vScale (fName "yScale"), vBand 1 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 410, padding 5, autosize [ AFit ], ti, ds, si [], sc [], ax [], mk [] ]


scatter1 : Spec
scatter1 =
    let
        ds =
            dataSource
                [ data "source" [ daUrl "https://vega.github.io/vega/data/cars.json" ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null") ]
                , data "summary" [ daSource "source" ]
                    |> transform
                        [ trExtentAsSignal (str "Horsepower") "hp_extent"
                        , trBin (str "Horsepower") (numSignal "hp_extent") [ bnMaxBins (num 10), bnAs "hp0" "hp1" ]
                        , trExtentAsSignal (str "Miles_per_Gallon") "mpg_extent"
                        , trBin (str "Miles_per_Gallon") (numSignal "mpg_extent") [ bnMaxBins (num 10), bnAs "mpg0" "mpg1" ]
                        , trAggregate [ agGroupBy [ str "hp0", str "hp1", str "mpg0", str "mpg1" ] ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "source", daField (str "Horsepower") ])
                    , scRound (boo True)
                    , scNice NTrue
                    , scZero (boo True)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "source", daField (str "Miles_per_Gallon") ])
                    , scRound (boo True)
                    , scNice NTrue
                    , scZero (boo True)
                    ]
                << scale "sizeScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "summary", daField (str "count") ])
                    , scRange (raNums [ 0, 360 ])
                    , scZero (boo True)
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axGrid (boo True)
                    , axDomain (boo False)
                    , axTickCount (num 5)
                    , axTitle (str "Horsepower")
                    ]
                << axis "yScale"
                    SLeft
                    [ axGrid (boo True)
                    , axDomain (boo False)
                    , axTitlePadding (num 5)
                    , axTitle (str "Miles per gallon")
                    ]

        le =
            legends
                << legend
                    [ leSize "sizeScale"
                    , leTitle "Count"
                    , leEncode
                        [ enSymbols
                            [ enUpdate
                                [ maStrokeWidth [ vNum 2 ]
                                , maStroke [ vStr "#4682b4" ]
                                , maShape [ vStr "circle" ]
                                ]
                            ]
                        ]
                    ]

        mk =
            marks
                << mark Symbol
                    [ mName "marks"
                    , mFrom [ srData (str "summary") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vSignal "(datum.hp0 + datum.hp1) / 2" ]
                            , maY [ vScale (fName "yScale"), vSignal "(datum.mpg0 + datum.mpg1) / 2" ]
                            , maSize [ vScale (fName "sizeScale"), vField (fName "count") ]
                            , maShape [ vStr "circle" ]
                            , maStrokeWidth [ vNum 2 ]
                            , maStroke [ vStr "#4682b4" ]
                            , maFill [ vStr "transparent" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 200, height 200, padding 5, autosize [ APad ], ds, sc [], ax [], le [], mk [] ]


contour1 : Spec
contour1 =
    -- TODO: Add config.
    let
        ds =
            dataSource
                [ data "source" [ daUrl "https://vega.github.io/vega/data/cars.json" ]
                    |> transform [ trFilter (expr "datum['Horsepower'] != null && datum['Miles_per_Gallon'] != null") ]
                , data "contours" [ daSource "source" ]
                    |> transform
                        [ trContour (numSignal "width")
                            (numSignal "height")
                            [ cnX (strExpr (expr "scale('xScale', datum.Horsepower)"))
                            , cnY (strExpr (expr "scale('yScale', datum.Miles_per_Gallon)"))
                            , cnCount (numSignal "count")
                            ]
                        ]
                ]

        si =
            signals
                << signal "count" [ siValue (vNum 10), siBind (iSelect [ inOptions (vNums [ 1, 5, 10, 20 ]) ]) ]
                << signal "points" [ siValue (vBoo True), siBind (iCheckbox []) ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doData [ daDataset "source", daField (str "Horsepower") ])
                    , scRound (boo True)
                    , scNice NTrue
                    , scZero (boo False)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scDomain (doData [ daDataset "source", daField (str "Miles_per_Gallon") ])
                    , scRound (boo True)
                    , scNice NTrue
                    , scZero (boo False)
                    ]
                << scale "cScale"
                    [ scType ScSequential
                    , scDomain (doData [ daDataset "contours", daField (str "value") ])
                    , scRange (raDefault RHeatmap)
                    , scZero (boo True)
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axGrid (boo True)
                    , axDomain (boo False)
                    , axTitle (str "Horsepower")
                    ]
                << axis "yScale"
                    SLeft
                    [ axGrid (boo True)
                    , axDomain (boo False)
                    , axTitle (str "Miles per gallon")
                    ]

        le =
            legends << legend [ leFill "cScale", leType LGradient ]

        mk =
            marks
                << mark Path
                    [ mFrom [ srData (str "contours") ]
                    , mEncode
                        [ enEnter
                            [ maStroke [ vStr "#888" ]
                            , maStrokeWidth [ vNum 1 ]
                            , maFill [ vScale (fName "cScale"), vField (fName "value") ]
                            , maFillOpacity [ vNum 0.35 ]
                            ]
                        ]
                    , mTransform [ trGeoPath "" [ gpField (str "datum") ] ]
                    ]
                << mark Symbol
                    [ mName "marks"
                    , mFrom [ srData (str "source") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "Horsepower") ]
                            , maY [ vScale (fName "yScale"), vField (fName "Miles_per_Gallon") ]
                            , maSize [ vNum 4 ]
                            , maFill [ ifElse "points" [ vStr "black" ] [ vStr "transparent" ] ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 400, padding 5, autosize [ APad ], ds, si [], sc [], ax [], le [], mk [] ]


wheat1 : Spec
wheat1 =
    let
        ds =
            dataSource
                [ data "points" [ daUrl "https://vega.github.io/vega/data/normal-2d.json" ]
                    |> transform
                        [ trBin (str "u")
                            (nums [ -1, 1 ])
                            [ bnAnchor (numSignal "binOffset")
                            , bnStep (numSignal "binStep")
                            , bnNice (boo False)
                            , bnSignal "bins"
                            ]
                        , trStack [ stGroupBy [ str "bin0" ], stSort [ ( str "u", Ascend ) ] ]
                        , trExtentAsSignal (str "y1") "extent"
                        ]
                ]

        si =
            signals
                << signal "symbolDiameter"
                    [ siValue (vNum 4)
                    , siBind (iRange [ inMin 1, inMax 8, inStep 0.25 ])
                    ]
                << signal "binOffset"
                    [ siValue (vNum 0)
                    , siBind (iRange [ inMin -0.1, inMax 0.1 ])
                    ]
                << signal "binStep"
                    [ siValue (vNum 0.075)
                    , siBind (iRange [ inMin -0.001, inMax 0.2, inStep 0.001 ])
                    ]
                << signal "height" [ siUpdate "extent[1] * (1 + symbolDiameter)" ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScLinear
                    , scRange (raDefault RWidth)
                    , scDomain (doNums (nums [ -1, 1 ]))
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scRange (raDefault RHeight)
                    , scDomain (doNums (numList [ num 0, numSignal "extent[1]" ]))
                    ]

        ax =
            axes
                << axis "xScale"
                    SBottom
                    [ axValues (vSignal "sequence(bins.start, bins.stop + bins.step, bins.step)")
                    , axDomain (boo False)
                    , axTicks (boo False)
                    , axLabels (boo False)
                    , axGrid (boo True)
                    , axZIndex (num 0)
                    ]
                << axis "xScale" SBottom [ axZIndex (num 1) ]

        mk =
            marks
                << mark Symbol
                    [ mFrom [ srData (str "points") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "transparent" ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        , enUpdate
                            [ maX [ vScale (fName "xScale"), vField (fName "u") ]
                            , maY [ vScale (fName "yScale"), vField (fName "y0") ]
                            , maSize [ vSignal "symbolDiameter * symbolDiameter" ]
                            , maStroke [ vStr "steelblue" ]
                            ]
                        , enHover [ maStroke [ vStr "firebrick" ] ]
                        ]
                    ]
    in
    toVega
        [ width 500, padding 5, ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    wheat1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "histo1", histo1 )
        , ( "histo2", histo2 )
        , ( "density1", density1 )
        , ( "boxplot1", boxplot1 )
        , ( "violinplot1", violinplot1 )
        , ( "window1", window1 )
        , ( "window2", window2 )
        , ( "scatter1", scatter1 )
        , ( "contour1", contour1 )
        , ( "wheat1", wheat1 )
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
