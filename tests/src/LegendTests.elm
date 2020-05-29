port module LegendTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


chartCore : ( VProperty, Spec ) -> (List Spec -> ( VProperty, Spec )) -> Spec
chartCore cf le =
    let
        ds =
            dataSource
                [ data "cars"
                    [ daUrl (str "https://vega.github.io/vega-lite/data/cars.json")
                    , daFormat [ json ]
                    ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scDomain (doData [ daDataset "cars", daField (field "Horsepower") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scDomain (doData [ daDataset "cars", daField (field "Miles_per_Gallon") ])
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "cars", daField (field "Origin"), daSort [ soAscending ] ])
                    , scRange raCategory
                    ]
                << scale "oScale"
                    [ scDomain (doData [ daDataset "cars", daField (field "Weight_in_lbs") ])
                    , scRange (raNums [ 0.3, 0.8 ])
                    ]
                << scale "sScale"
                    [ scDomain (doData [ daDataset "cars", daField (field "Horsepower") ])
                    , scRange (raNums [ 0, 361 ])
                    ]

        ax =
            axes
                << axis "xScale" siBottom []
                << axis "yScale" siLeft []

        mk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "Horsepower") ]
                            , maY [ vScale "yScale", vField (field "Miles_per_Gallon") ]
                            , maOpacity [ vScale "oScale", vField (field "Weight_in_lbs") ]
                            , maFill [ vScale "cScale", vField (field "Origin") ]
                            , maSize [ vScale "sScale", vField (field "Horsepower") ]
                            , maShape [ symbolValue symCircle ]
                            ]
                        ]
                    ]
    in
    toVega [ cf, title (str "A mighty fine chart") [], width 400, height 400, padding 5, ds, sc [], ax [], le [], mk [] ]


legendTest1 : Spec
legendTest1 =
    legends
        << legend
            [ leTitle (str "Origin")
            , leFill "cScale"
            , leSymbolType symCircle
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maOpacity [ vNum 0.7 ] ] ] ]
            ]
        << legend
            [ leTitle (str "Horsepower")
            , leSize "sScale"
            , leSymbolType symCircle
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maFill [ black ], maFillOpacity [ vNum 0.7 ], maOpacity [ vNum 0.7 ], maStroke [ transparent ] ] ] ]
            ]
        << legend
            [ leTitle (str "Weight")
            , leOpacity "oScale"
            , leSymbolType symCircle
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maFill [ black ], maFillOpacity [ vNum 0.7 ], maStroke [ transparent ] ] ] ]
            ]
        |> chartCore (config [])


legendTest2 : Spec
legendTest2 =
    legends
        << legend
            [ leTitle (str "Origin")
            , leFill "cScale"
            , leSymbolType symCircle
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maOpacity [ vNum 0.7 ] ] ] ]
            ]
        << legend
            [ leTitle (str "Horsepower")
            , leSize "sScale"
            , leSymbolType symCircle
            , leStrokeColor (str "red")
            , lePadding (num 20)
            , leTitleFontSize (num 28)
            , leTitleFontStyle (str "italic")
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maFill [ black ], maFillOpacity [ vNum 0.7 ], maOpacity [ vNum 0.7 ], maStroke [ transparent ] ] ] ]
            ]
        << legend
            [ leTitle (str "Weight")
            , leOpacity "oScale"
            , leSymbolType symCircle
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maFill [ black ], maFillOpacity [ vNum 0.7 ], maStroke [ transparent ] ] ] ]
            ]
        |> chartCore (config [])


legendTest3 : Spec
legendTest3 =
    let
        cf =
            config
                [ cfLegend
                    [ leSymbolStrokeWidth (num 0)
                    , leSymbolOpacity (num 0.5)
                    , leSymbolFillColor (str "black")
                    , leRowPadding (num 5)
                    , leTitlePadding (num 10)
                    , leStrokeColor (str "lightgrey")
                    , lePadding (num 10)
                    , leBorderStrokeWidth (num 5)
                    , leBorderStrokeDash [ vNums [ 4, 8, 2 ] ]
                    , leLayout
                        [ llDirection orHorizontal
                        , llMargin (num 25)
                        , llOffset (num 50)
                        , llAnchor anMiddle
                        , llCenter true
                        ]
                    ]
                , cfTitle [ tiFontSize (num 24), tiDx (num -100), tiDy (num 80), tiFontStyle (str "italic") ]
                ]
    in
    legends
        << legend [ leTitle (str "Origin"), leFill "cScale", leSymbolType symCircle ]
        << legend [ leTitle (str "Horsepower"), leSize "sScale", leSymbolType symCircle ]
        << legend [ leTitle (str "Weight"), leOpacity "oScale", leSymbolType symCircle ]
        |> chartCore cf


legendTest4 : Spec
legendTest4 =
    let
        cf =
            config
                [ cfLegend
                    [ leSymbolStrokeWidth (num 0)
                    , leSymbolOpacity (num 0.5)
                    , leSymbolFillColor (str "black")
                    , leRowPadding (num 5)
                    , leTitlePadding (num 10)
                    , leStrokeColor (str "lightgrey")
                    , lePadding (num 10)
                    , leOrient loBottom
                    , leBorderStrokeWidth (num 0)
                    , leOrientLayout
                        [ ( loBottom
                          , [ llDirection orHorizontal
                            , llOffset (num 10)
                            , llAnchor anEnd
                            ]
                          )

                        -- Large margin should have no effect as no top legends.
                        , ( loTop, [ llMargin (num 200) ] )
                        ]
                    ]
                ]
    in
    legends
        << legend [ leTitle (str "Origin"), leFill "cScale", leSymbolType symCircle ]
        << legend [ leTitle (str "Horsepower"), leSize "sScale", leSymbolType symCircle ]
        << legend [ leTitle (str "Weight"), leOpacity "oScale", leSymbolType symCircle ]
        |> chartCore cf


legendTest5 : Spec
legendTest5 =
    let
        cf =
            config
                [ cfLegend
                    [ leSymbolStrokeWidth (num 0)
                    , leSymbolOpacity (num 0.5)
                    , leSymbolFillColor (str "black")
                    , leRowPadding (num 5)
                    , leTitlePadding (num 10)
                    , leStrokeColor (str "lightgrey")
                    , lePadding (num 10)
                    , leOrient loNone
                    , leBorderStrokeWidth (num 0)
                    ]
                ]
    in
    legends
        << legend
            [ leTitle (str "Weight")
            , leOpacity "oScale"
            , leSymbolType symCircle
            , leEncode [ enLegend [ enEnter [ maX [ vNum 320 ], maY [ vNum 30 ] ] ] ]
            ]
        |> chartCore cf


legendTest6 : Spec
legendTest6 =
    let
        cf =
            config
                [ cfLegend
                    [ leSymbolStrokeWidth (num 0)
                    , leSymbolOpacity (num 0.5)
                    , leSymbolFillColor (str "black")
                    , leRowPadding (num 5)
                    , leTitlePadding (num 10)
                    , leStrokeColor (str "lightgrey")
                    , lePadding (num 10)
                    , leOrient loNone
                    , leBorderStrokeWidth (num 0)
                    ]
                ]
    in
    legends
        << legend
            [ leTitle (str "Weight")
            , leOpacity "oScale"
            , leSymbolType symCircle
            , leX (num 320)
            , leY (num 30)
            ]
        |> chartCore cf



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "legendTest1", legendTest1 )
    , ( "legendTest2", legendTest2 )
    , ( "legendTest3", legendTest3 )
    , ( "legendTest4", legendTest4 )
    , ( "legendTest5", legendTest5 )
    , ( "legendTest6", legendTest6 )
    ]



{- ---------------------------------------------------------------------------
   BOILERPLATE: NO NEED TO EDIT

   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   It allows the source code of any of the generated specs to be selected from
   a drop-down list. Useful for viewin specs that might generate invalid Vega-Lite.
-}


type Msg
    = NewSource String
    | NoSource


main : Program () Spec Msg
main =
    Browser.element
        { init = always ( Json.Encode.null, specs |> combineSpecs |> elmToJS )
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


view : Spec -> Html Msg
view spec =
    Html.div []
        [ Html.select [ Html.Events.onInput NewSource ]
            (( "Select source", Json.Encode.null )
                :: specs
                |> List.map (\( s, _ ) -> Html.option [ Html.Attributes.value s ] [ Html.text s ])
            )
        , Html.div [ Html.Attributes.id "specSource" ] []
        , if spec == Json.Encode.null then
            Html.div [] []

          else
            Html.pre [] [ Html.text (Json.Encode.encode 2 spec) ]
        ]


update : Msg -> Spec -> ( Spec, Cmd Msg )
update msg model =
    case msg of
        NewSource srcName ->
            ( specs |> Dict.fromList |> Dict.get srcName |> Maybe.withDefault Json.Encode.null, Cmd.none )

        NoSource ->
            ( Json.Encode.null, Cmd.none )


port elmToJS : Spec -> Cmd msg
