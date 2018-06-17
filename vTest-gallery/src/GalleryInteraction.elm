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
        ds =
            dataSource
                [ data "flights"
                    [ daUrl "https://vega.github.io/vega/data/flights-200k.json" ]
                    |> transform
                        [ trBin (field "delay") (numSignal "delayExtent") [ bnStep (numSignal "delayStep"), bnAs "delay0" "delay1" ]
                        , trBin (field "time") (numSignal "timeExtent") [ bnStep (numSignal "timeStep"), bnAs "time0" "time1" ]
                        , trBin (field "distance") (numSignal "distExtent") [ bnStep (numSignal "distStep"), bnAs "dist0" "dist1" ]
                        , trCrossFilterAsSignal
                            [ ( field "delay", numSignal "delayRange" )
                            , ( field "time", numSignal "timeRange" )
                            , ( field "distance", numSignal "distRange" )
                            ]
                            "xFilter"
                        ]
                ]

        si =
            signals
                << signal "chartHeight" [ siValue (vNum 100) ]
                << signal "chartPadding" [ siValue (vNum 50) ]
                << signal "height" [ siUpdate "(chartHeight + chartPadding) * 3" ]
                << signal "delayExtent" [ siValue (vNums [ -60, 180 ]) ]
                << signal "timeExtent" [ siValue (vNums [ 0, 24 ]) ]
                << signal "distExtent" [ siValue (vNums [ 0, 2400 ]) ]
                << signal "delayStep" [ siValue (vNum 10), siBind (iRange [ inMin 2, inMax 20, inStep 1 ]) ]
                << signal "timeStep" [ siValue (vNum 1), siBind (iRange [ inMin 0.25, inMax 2, inStep 0.25 ]) ]
                << signal "distStep" [ siValue (vNum 100), siBind (iRange [ inMin 50, inMax 200, inStep 50 ]) ]
                << signal "delayRange"
                    [ siUpdate "delayExtent"
                    , siOn
                        [ evHandler (esSignal "delayZoom") [ evUpdate "[(delayRange[0]+delayRange[1])/2 - delayZoom, (delayRange[0]+delayRange[1])/2 + delayZoom]" ]
                        , evHandler (esSelector (str "@delay:dblclick!, @delayBrush:dblclick!")) [ evUpdate "[delayExtent[0], delayExtent[1]]" ]
                        , evHandler (esSelector (str "[@delayBrush:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[delayRange[0] + invert('delayScale', x()) - invert('delayScale', xMove), delayRange[1] + invert('delayScale', x()) - invert('delayScale', xMove)]" ]
                        , evHandler (esSelector (str "[@delay:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[min(delayAnchor, invert('delayScale', x())), max(delayAnchor, invert('delayScale', x()))]" ]
                        ]
                    ]
                << signal "delayZoom"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@delay:wheel!, @delayBrush:wheel!")) [ evUpdate "0.5 * abs(span(delayRange)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))" ] ]
                    ]
                << signal "delayAnchor"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@delay:mousedown!")) [ evUpdate "invert('delayScale', x())" ] ]
                    ]
                << signal "timeRange"
                    [ siUpdate "timeExtent"
                    , siOn
                        [ evHandler (esSignal "timeZoom") [ evUpdate "[(timeRange[0]+timeRange[1])/2 - timeZoom, (timeRange[0]+timeRange[1])/2 + timeZoom]" ]
                        , evHandler (esSelector (str "@time:dblclick!, @timeBrush:dblclick!")) [ evUpdate "[timeExtent[0], timeExtent[1]]" ]
                        , evHandler (esSelector (str "[@timeBrush:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[timeRange[0] + invert('timeScale', x()) - invert('timeScale', xMove), timeRange[1] + invert('timeScale', x()) - invert('timeScale', xMove)]" ]
                        , evHandler (esSelector (str "[@time:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[min(timeAnchor, invert('timeScale', x())), max(timeAnchor, invert('timeScale', x()))]" ]
                        ]
                    ]
                << signal "timeZoom"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@time:wheel!, @timeBrush:wheel!")) [ evUpdate "0.5 * abs(span(timeRange)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))" ] ]
                    ]
                << signal "timeAnchor"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@time:mousedown!")) [ evUpdate "invert('timeScale', x())" ] ]
                    ]
                << signal "distRange"
                    [ siUpdate "distExtent"
                    , siOn
                        [ evHandler (esSignal "distZoom") [ evUpdate "[(distRange[0]+distRange[1])/2 - distZoom, (distRange[0]+distRange[1])/2 + distZoom]" ]
                        , evHandler (esSelector (str "@dist:dblclick!, @distBrush:dblclick!")) [ evUpdate "[distExtent[0], distExtent[1]]" ]
                        , evHandler (esSelector (str "[@distBrush:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[distRange[0] + invert('distScale', x()) - invert('distScale', xMove), distRange[1] + invert('distScale', x()) - invert('distScale', xMove)]" ]
                        , evHandler (esSelector (str "[@dist:mousedown, window:mouseup] > window:mousemove!")) [ evUpdate "[min(distAnchor, invert('distScale', x())), max(distAnchor, invert('distScale', x()))]" ]
                        ]
                    ]
                << signal "distZoom"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@dist:wheel!, @distBrush:wheel!")) [ evUpdate "0.5 * abs(span(distRange)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))" ] ]
                    ]
                << signal "distAnchor"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "@dist:mousedown!")) [ evUpdate "invert('distScale', x())" ] ]
                    ]
                << signal "xMove"
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str "window:mousemove")) [ evUpdate "x()" ] ]
                    ]

        sc =
            scales
                << scale "layout"
                    [ scType ScBand
                    , scDomain (doStrs (strs [ "delay", "time", "distance" ]))
                    , scRange RaHeight
                    ]
                << scale "delayScale"
                    [ scType ScLinear
                    , scRound true
                    , scDomain (doSignal "delayExtent")
                    , scRange RaWidth
                    ]
                << scale "timeScale"
                    [ scType ScLinear
                    , scRound true
                    , scDomain (doSignal "timeExtent")
                    , scRange RaWidth
                    ]
                << scale "distScale"
                    [ scType ScLinear
                    , scRound true
                    , scDomain (doSignal "distExtent")
                    , scRange RaWidth
                    ]

        mk =
            marks
                << mark Group
                    [ mDescription "Delay Histogram"
                    , mName "delay"
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "layout", vStr "delay", vOffset (vNum 20) ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "transparent" ]
                            ]
                        ]
                    , mGroup [ ds1, sc1 [], ax1 [], mk1 [] ]
                    ]
                << mark Group
                    [ mDescription "Time Histogram"
                    , mName "time"
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "layout", vStr "time", vOffset (vNum 20) ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "transparent" ]
                            ]
                        ]
                    , mGroup [ ds2, sc2 [], ax2 [], mk2 [] ]
                    ]
                << mark Group
                    [ mDescription "Distance Histogram"
                    , mName "dist"
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "layout", vStr "distance", vOffset (vNum 20) ]
                            , maWidth [ vSignal "width" ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "transparent" ]
                            ]
                        ]
                    , mGroup [ ds3, sc3 [], ax3 [], mk3 [] ]
                    ]

        ds1 =
            dataSource
                [ data "delay-bins" [ daSource "flights" ]
                    |> transform
                        [ trResolveFilter "xFilter" (num 1)
                        , trAggregate
                            [ agGroupBy [ field "delay0", field "delay1" ]
                            , agKey (field "delay0")
                            , agDrop false
                            ]
                        ]
                ]

        sc1 =
            scales
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "delay-bins", daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        ax1 =
            axes
                << axis "delayScale" SBottom []

        mk1 =
            marks
                << mark Rect
                    [ mName "delayBrush"
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "#fcfcfc" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "scale('delayScale', delayRange[0])" ]
                            , maX2 [ vSignal "scale('delayScale', delayRange[1])" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mFrom [ srData (str "delay-bins") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "steelblue" ] ]
                        , enUpdate
                            [ maX [ vScale "delayScale", vField (field "delay0") ]
                            , maX2 [ vScale "delayScale", vField (field "delay1"), vOffset (vNum -1) ]
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
                            [ maX [ vSignal "scale('delayScale', delayRange[0])" ]
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
                            [ maX [ vSignal "scale('delayScale', delayRange[1])" ]
                            , maWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ vStr "Arrival Delay (min)" ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]

        ds2 =
            dataSource
                [ data "time-bins" [ daSource "flights" ]
                    |> transform
                        [ trResolveFilter "xFilter" (num 2)
                        , trAggregate
                            [ agGroupBy [ field "time0", field "time1" ]
                            , agKey (field "time0")
                            , agDrop false
                            ]
                        ]
                ]

        sc2 =
            scales
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "time-bins", daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        ax2 =
            axes
                << axis "timeScale" SBottom []

        mk2 =
            marks
                << mark Rect
                    [ mName "timeBrush"
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "#fcfcfc" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "scale('timeScale', timeRange[0])" ]
                            , maX2 [ vSignal "scale('timeScale', timeRange[1])" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mFrom [ srData (str "time-bins") ]
                    , mInteractive false
                    , mEncode
                        [ enEnter [ maFill [ vStr "steelblue" ] ]
                        , enUpdate
                            [ maX [ vScale "timeScale", vField (field "time0") ]
                            , maX2 [ vScale "timeScale", vField (field "time1"), vOffset (vNum -1) ]
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
                            [ maX [ vSignal "scale('timeScale', timeRange[0])" ]
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
                            [ maX [ vSignal "scale('timeScale', timeRange[1])" ]
                            , maWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ vStr "Local Departure Time (hour)" ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]

        ds3 =
            dataSource
                [ data "dist-bins" [ daSource "flights" ]
                    |> transform
                        [ trResolveFilter "xFilter" (num 4)
                        , trAggregate
                            [ agGroupBy [ field "dist0", field "dist1" ]
                            , agKey (field "dist0")
                            , agDrop false
                            ]
                        ]
                ]

        sc3 =
            scales
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "dist-bins", daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        ax3 =
            axes
                << axis "distScale" SBottom []

        mk3 =
            marks
                << mark Rect
                    [ mName "distBrush"
                    , mEncode
                        [ enEnter
                            [ maY [ vNum 0 ]
                            , maHeight [ vSignal "chartHeight" ]
                            , maFill [ vStr "#fcfcfc" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "scale('distScale', distRange[0])" ]
                            , maX2 [ vSignal "scale('distScale', distRange[1])" ]
                            ]
                        ]
                    ]
                << mark Rect
                    [ mInteractive false
                    , mFrom [ srData (str "dist-bins") ]
                    , mEncode
                        [ enEnter [ maFill [ vStr "steelblue" ] ]
                        , enUpdate
                            [ maX [ vScale "distScale", vField (field "dist0") ]
                            , maX2 [ vScale "distScale", vField (field "dist1"), vOffset (vNum -1) ]
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
                            [ maX [ vSignal "scale('distScale', distRange[0])" ]
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
                            [ maX [ vSignal "scale('distScale', distRange[1])" ]
                            , maWidth [ vNum 1 ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ vStr "Travel Distance (miles)" ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, padding 5, ds, si [], sc [], mk [] ]


sourceExample : Spec
sourceExample =
    interaction1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "interaction1", interaction1 )
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
