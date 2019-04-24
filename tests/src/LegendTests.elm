port module LegendTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
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
                    [ scType scLinear
                    , scDomain (doData [ daDataset "cars", daField (field "Horsepower") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "cars", daField (field "Miles_per_Gallon") ])
                    , scRange raHeight
                    ]
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "cars", daField (field "Origin"), daSort [ soAscending ] ])
                    , scRange raCategory
                    ]
                << scale "oScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "cars", daField (field "Miles_per_Gallon") ])
                    , scRange (raNums [ 0.3, 0.8 ])
                    ]
                << scale "sScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "cars", daField (field "Horsepower") ])
                    , scRange (raNums [ 0, 361 ])
                    ]

        mk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "Horsepower") ]
                            , maY [ vScale "yScale", vField (field "Miles_per_Gallon") ]
                            , maOpacity [ vScale "oScale", vField (field "Miles_per_Gallon") ]
                            , maFill [ vScale "cScale", vField (field "Origin") ]
                            , maSize [ vScale "sScale", vField (field "Horsepower") ]
                            , maShape [ symbolValue symCircle ]
                            ]
                        ]
                    ]
    in
    toVega [ cf, width 300, height 300, padding 5, ds, sc [], le [], mk [] ]


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
            [ leTitle (str "Miles per gallon")
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
            , lePadding (vNum 20)
            , leTitleFontSize (num 28)
            , leTitleFontStyle (str "italic")
            , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ], maFill [ black ], maFillOpacity [ vNum 0.7 ], maOpacity [ vNum 0.7 ], maStroke [ transparent ] ] ] ]
            ]
        << legend
            [ leTitle (str "Miles per gallon")
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
                    , leLayout [ llDirection orHorizontal, llMargin (num 25) ]
                    ]
                ]
    in
    legends
        << legend [ leTitle (str "Origin"), leFill "cScale", leSymbolType symCircle ]
        << legend
            [ leTitle (str "Horsepower")
            , leSize "sScale"
            , leSymbolType symCircle
            ]
        << legend
            [ leTitle (str "Miles per gallon")
            , leOpacity "oScale"
            , leSymbolType symCircle
            ]
        |> chartCore cf


sourceExample : Spec
sourceExample =
    legendTest3



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "legendTest1", legendTest1 )
        , ( "legendTest2", legendTest2 )
        , ( "legendTest3", legendTest3 )
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
