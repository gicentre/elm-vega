port module ConfigTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)


scatter : ( VProperty, Spec ) -> Spec
scatter cf =
    let
        ti =
            title (str "Engine Efficiency") []

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
                << scale "cScale"
                    [ scType scOrdinal
                    , scRange raCategory
                    , scDomain (doData [ daDataset "cars", daField (field "Origin") ])
                    ]

        ax =
            axes
                << axis "xScale"
                    siBottom
                    [ axGrid true
                    , axTickCount (num 6)
                    , axTitle (str "Horsepower")
                    ]
                << axis "yScale"
                    siLeft
                    [ axGrid true
                    , axTickCount (num 6)
                    , axTitle (str "Miles per gallon")
                    ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (str "Country of Manufacture")
                    , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ] ] ] ]
                    ]

        mk =
            marks
                << mark symbol
                    [ mFrom [ srData (str "cars") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "Horsepower") ]
                            , maY [ vScale "yScale", vField (field "Miles_per_Gallon") ]
                            , maFill [ vScale "cScale", vField (field "Origin") ]
                            , maShape [ symbolValue symCircle ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 300, cf, ti, ds, sc [], ax [], lg [], mk [] ]


configTest1 : Spec
configTest1 =
    scatter (config [])


configTest2 : Spec
configTest2 =
    let
        cf =
            config
                [ cfGroup
                    [ maFill [ vStr "#eee" ]
                    ]
                , cfTitle
                    [ tiFontWeight (vStr "normal")
                    , tiFontSize (num 16)
                    , tiDx (num -55)
                    ]
                , cfAxis axAll
                    [ axTitleFontWeight (vStr "normal")
                    , axTitleColor (str "#333")
                    , axLabelFont (str "monospace")
                    , axLabelColor (str "#333")
                    , axDomain false
                    , axGridColor (str "white")
                    , axGridWidth (num 1.5)
                    ]
                , cfLegend
                    [ leTitleColor (str "#333")
                    , leTitleFontSize (num 14)
                    , leTitleFontWeight (vStr "normal")
                    ]
                , cfScaleRange raCategory
                    (raStrs
                        [ "rgb(248,118,109)"
                        , "rgb(0,186,56)"
                        , "rgb(97,156,255)"
                        ]
                    )
                ]
    in
    scatter cf


configTest3 : Spec
configTest3 =
    let
        cf =
            config
                [ (cfSignals
                    << signal "baseFontSize" [ siValue (vNum 10) ]
                    << signal "textColor" [ siValue (vStr "#339") ]
                    << signal "font" [ siValue (vStr "monospace") ]
                  )
                    []
                , cfTitle
                    [ tiFontSize (numSignal "baseFontSize*1.6")
                    , tiColor (strSignal "textColor")
                    , tiFont (strSignal "font")
                    ]
                , cfAxis axAll
                    [ axTitleColor (strSignal "textColor")
                    , axTitleFontSize (numSignal "baseFontSize*1.1")
                    , axTitleFont (strSignal "font")
                    , axLabelColor (strSignal "textColor")
                    , axLabelFont (strSignal "font")
                    , axLabelFontSize (numSignal "baseFontSize")
                    ]
                , cfLegend
                    [ leTitleColor (strSignal "textColor")
                    , leTitleFont (strSignal "font")
                    , leTitleFontSize (numSignal "baseFontSize*1.1")
                    , leLabelColor (strSignal "textColor")
                    , leLabelFont (strSignal "font")
                    , leLabelFontSize (numSignal "baseFontSize*1.1")
                    ]
                ]
    in
    scatter cf


sourceExample : Spec
sourceExample =
    configTest3



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "configTest1", configTest1 )
        , ( "configTest2", configTest2 )
        , ( "configTest3", configTest3 )
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
