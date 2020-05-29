port module ConfigTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


scatter : List TitleProperty -> ( VProperty, Spec ) -> Spec
scatter tps cf =
    let
        ti =
            title (strs [ "Engine size", "vs", "Engine Efficiency" ])
                (tps ++ [ tiSubtitle (strs [ "Being a graphical comparison", "of two quantitative variables" ]) ])

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
                    , axTitle (strs [ "Efficiency", "(miles per gallon)" ])
                    ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leTitle (strs [ "Origin", "(country of Manufacture)" ])
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
    scatter [] (config [])


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
    scatter [] cf


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
                    , tiLineHeight (numSignal "baseFontSize*2.5")
                    , tiOffset (numSignal "baseFontSize*3")
                    ]
                , cfAxis axAll
                    [ axTitleColor (strSignal "textColor")
                    , axTitleFontSize (numSignal "baseFontSize*1.1")
                    , axTitleFont (strSignal "font")
                    , axLabelColor (strSignal "textColor")
                    , axLabelFont (strSignal "font")
                    , axLabelFontSize (numSignal "baseFontSize")
                    , axTitleLineHeight (numSignal "baseFontSize * 1.5")
                    ]
                , cfLegend
                    [ leTitleColor (strSignal "textColor")
                    , leTitleFont (strSignal "font")
                    , leTitleFontSize (numSignal "baseFontSize*1.1")
                    , leLabelColor (strSignal "textColor")
                    , leLabelFont (strSignal "font")
                    , leLabelFontSize (numSignal "baseFontSize*1.1")
                    , leSymbolLimit (num 2)
                    , leTitleLineHeight (numSignal "baseFontSize*1.5")
                    ]
                ]
    in
    scatter [] cf


configTest4 : Spec
configTest4 =
    let
        titleEnc =
            [ enEnter [ maFill [ vStr "steelBlue" ] ] ]

        subtitleEnc =
            [ enEnter [ maFill [ vStr "firebrick" ] ]
            , enUpdate [ maFontStyle [ vStr "normal" ] ]
            , enHover [ maFontStyle [ vStr "italic" ] ]
            , enInteractive true
            ]

        groupEnc =
            [ enEnter [ maFill [ vStr "#eee" ], maWidth [ vSignal "width" ], maHeight [ vNum 75 ] ] ]

        tes =
            [ tiEncodeElements [ ( teTitle, titleEnc ), ( teSubtitle, subtitleEnc ), ( teGroup, groupEnc ) ] ]
    in
    scatter tes (config [])


configTest5 : Spec
configTest5 =
    let
        tiEnc =
            [ enEnter [ maFill [ vStr "steelBlue" ] ] ]

        tes =
            [ tiEncode tiEnc ]
    in
    scatter tes (config [])


configTest6 : Spec
configTest6 =
    let
        cf =
            config
                [ (cfSignals
                    << signal "baseFontSize" [ siValue (vNum 10) ]
                    << signal "textColor" [ siValue (vStr "#339") ]
                    << signal "font" [ siValue (vStr "serif") ]
                  )
                    []
                , cfTitle
                    [ tiSubtitleFontSize (numSignal "baseFontSize*0.9")
                    , tiSubtitleColor (strSignal "textColor")
                    , tiSubtitleLineHeight (numSignal "baseFontSize*1.2")
                    , tiSubtitleFont (strSignal "font")
                    , tiSubtitleFontStyle (str "italic")
                    , tiSubtitleFontWeight (vStr "bold")
                    , tiSubtitlePadding (numSignal "baseFontSize*2")
                    ]
                ]
    in
    scatter [] cf


dragSpec : ( VProperty, Spec ) -> Spec
dragSpec cf =
    let
        si =
            signals
                << signal "myDrag"
                    [ siValue (vNums [ 200, 200 ])
                    , siOn
                        [ evHandler
                            [ esObject
                                [ esBetween [ esMark rect, esType etMouseDown ] [ esSource esView, esType etMouseUp ]
                                , esSource esView
                                , esType etMouseMove
                                ]
                            ]
                            [ evUpdate "xy()" ]
                        ]
                    ]

        mk =
            marks
                << mark rect
                    [ mEncode
                        [ enEnter [ maFill [ vStr "firebrick" ], maWidth [ vNum 80 ], maHeight [ vNum 50 ] ]
                        , enUpdate [ maX [ vSignal "myDrag[0]" ], maY [ vSignal "myDrag[1]" ] ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vMiddle ]
                            , maFill [ white ]
                            , maText [ vStr "Drag me" ]
                            ]
                        , enUpdate
                            [ maX [ vSignal "myDrag[0]+40" ]
                            , maY [ vSignal "myDrag[1]+25" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 400, height 300, cf, background (str "rgb(252,247,236)"), si [], mk [] ]


configTest7 : Spec
configTest7 =
    dragSpec (config [])


configTest8 : Spec
configTest8 =
    dragSpec (config [ cfEventHandling [ cfeView [] ] ])


configTest9 : Spec
configTest9 =
    let
        ds =
            let
                table =
                    dataFromColumns "table" []
                        << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                        << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
            in
            dataSource [ table [] ]

        si =
            signals
                << signal "myTooltip"
                    [ siValue (vStr "")
                    , siOn
                        [ evHandler [ esObject [ esMark rect, esType etMouseOver ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esMark rect, esType etMouseOut ] ] [ evUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType scBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange raWidth
                    , scPadding (num 0.05)
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scRange raHeight
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "Category") ]
                << axis "yScale" siLeft []

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        , enUpdate
                            [ maFill [ vStr "steelblue" ] ]
                        , enHover
                            [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            , maFill [ vStr "grey" ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "myTooltip.category", vBand (num 0.5) ]
                            , maY [ vScale "yScale", vSignal "myTooltip.amount", vOffset (vNum -2) ]
                            , maText [ vSignal "myTooltip.amount" ]
                            ]
                        ]
                    ]

        cf =
            config
                [ cfAxis axBottom
                    [ axTitleFontWeight (vStr "normal")
                    , axTitleColor (str "red")
                    , axLabelFont (str "monospace")
                    , axLabelColor (str "red")
                    , axLabelFontSize (num 18)
                    , axTickBand abExtent
                    , axTranslate (num 4)
                    ]
                ]
    in
    toVega [ width 400, height 200, cf, padding 5, ds, si [], sc [], ax [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "configTest1", configTest1 )
    , ( "configTest2", configTest2 )
    , ( "configTest3", configTest3 )
    , ( "configTest4", configTest4 )
    , ( "configTest5", configTest5 )
    , ( "configTest6", configTest6 )
    , ( "configTest7", configTest7 )
    , ( "configTest8", configTest8 )
    , ( "configTest9", configTest9 )
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
