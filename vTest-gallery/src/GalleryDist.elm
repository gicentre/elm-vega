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
                << axis "xScale" SBottom [ axZIndex 1 ]
                << axis "yScale" SLeft [ axTickCount 5, axZIndex 1 ]

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
                << axis "xScale" SBottom [ axTickCount 10 ]
                << axis "xScaleNull" SBottom []
                << axis "yScale" SLeft [ axTickCount 5, axOffset (num 5) ]

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
        [ width 400, height 200, padding 5, autosize [ AFit, AResize ], ds, si [], sc [], ax [], mk [] ]


sourceExample : Spec
sourceExample =
    histo2



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "histo1", histo1 )
        , ( "histo2", histo2 )
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
