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
        facetNames =
            [ "delay", "time", "distance" ]

        sigGenerator core =
            signal (core ++ "Range")
                [ siUpdate (core ++ "Extent")
                , siOn
                    [ evHandler (esSignal (core ++ "Zoom")) [ evUpdate ("[(" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 - " ++ core ++ "Zoom, (" ++ core ++ "Range[0]+" ++ core ++ "Range[1])/2 + " ++ core ++ "Zoom]") ]
                    , evHandler (esSelector (str ("@" ++ core ++ ":dblclick!, @" ++ core ++ "Brush:dblclick!"))) [ evUpdate ("[" ++ core ++ "Extent[0], " ++ core ++ "Extent[1]]") ]
                    , evHandler (esSelector (str ("[@" ++ core ++ "Brush:mousedown, window:mouseup] > window:mousemove!"))) [ evUpdate ("[" ++ core ++ "Range[0] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove), " ++ core ++ "Range[1] + invert('" ++ core ++ "Scale', x()) - invert('" ++ core ++ "Scale', xMove)]") ]
                    , evHandler (esSelector (str ("[@" ++ core ++ ":mousedown, window:mouseup] > window:mousemove!"))) [ evUpdate ("[min(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x())), max(" ++ core ++ "Anchor, invert('" ++ core ++ "Scale', x()))]") ]
                    ]
                ]
                << signal (core ++ "Zoom")
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str ("@" ++ core ++ ":wheel!, @" ++ core ++ "Brush:wheel!"))) [ evUpdate ("0.5 * abs(span(" ++ core ++ "Range)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))") ] ]
                    ]
                << signal (core ++ "Anchor")
                    [ siValue (vNum 0)
                    , siOn [ evHandler (esSelector (str ("@" ++ core ++ ":mousedown!"))) [ evUpdate ("invert('" ++ core ++ "Scale', x())") ] ]
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
                    [ scType ScLinear
                    , scDomain (doData [ daDataset (core ++ "-bins"), daField (field "count") ])
                    , scRange (raValues [ vSignal "chartHeight", vNum 0 ])
                    ]

        topScGenerator core =
            scale (core ++ "Scale")
                [ scType ScLinear
                , scRound true
                , scDomain (doSignal (core ++ "Extent"))
                , scRange RaWidth
                ]

        axGenerator core =
            axes << axis (core ++ "Scale") SBottom []

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
                << mark Rect
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
                << mark Rect
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
                << mark Rect
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
                << mark Rect
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
                << mark Text
                    [ mInteractive false
                    , mEncode
                        [ enEnter
                            [ maY [ vNum -5 ]
                            , maText [ titleText ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "500" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    ]

        groupGenerator core =
            mark Group
                [ mName core
                , mEncode
                    [ enEnter
                        [ maY [ vScale "layout", vStr core, vOffset (vNum 20) ]
                        , maWidth [ vSignal "width" ]
                        , maHeight [ vSignal "chartHeight" ]
                        , maFill [ vStr "transparent" ]
                        ]
                    ]
                , mGroup [ dsGenerator core, scGenerator core [], axGenerator core [], mkGenerator core [] ]
                ]

        ds =
            dataSource
                [ data "flights"
                    [ daUrl "https://vega.github.io/vega/data/flights-200k.json" ]
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
                        << signal "xMove" [ siValue (vNum 0), siOn [ evHandler (esSelector (str "window:mousemove")) [ evUpdate "x()" ] ] ]
            in
            List.foldl sigGenerator (sigs []) facetNames |> signals

        sc =
            let
                layoutSc =
                    scale "layout" [ scType ScBand, scDomain (doStrs (strs facetNames)), scRange RaHeight ] []
            in
            List.foldl topScGenerator layoutSc facetNames |> scales

        mk =
            List.foldl groupGenerator [] facetNames |> marks
    in
    toVega
        [ width 500, padding 5, ds, si, sc, mk ]


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
