port module AriaTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


scatter : List AxisProperty -> List LegendProperty -> Spec
scatter axps leps =
    let
        ti =
            title (strs [ "Engine Efficiency" ])
                [ tiSubtitle (strs [ "Size vs efficiency" ]) ]

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
                    (axps
                        ++ [ axGrid true
                           , axTickCount (num 6)
                           , axTitle (str "Horsepower")
                           ]
                    )
                << axis "yScale"
                    siLeft
                    (axps
                        ++ [ axGrid true
                           , axTickCount (num 6)
                           , axTitle (strs [ "Efficiency" ])
                           ]
                    )

        lg =
            legends
                << legend
                    (leps
                        ++ [ leFill "cScale"
                           , leTitle (strs [ "Country of Manufacture" ])
                           , leEncode [ enSymbols [ enUpdate [ maShape [ symbolValue symCircle ] ] ] ]
                           ]
                    )

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
        [ width 400, height 300, ti, ds, sc [], ax [], lg [], mk [] ]


ariaTest1 : Spec
ariaTest1 =
    scatter [] []


ariaTest2 : Spec
ariaTest2 =
    scatter [ axAria [] ] []


ariaTest3 : Spec
ariaTest3 =
    scatter [ axAria [ arDisable ] ] []


ariaTest4 : Spec
ariaTest4 =
    scatter [ axAria [ arDescription (str "my ARIA description") ] ] []


ariaTest5 : Spec
ariaTest5 =
    scatter [] [ leAria [] ]


ariaTest6 : Spec
ariaTest6 =
    scatter [] [ leAria [ arDisable ] ]


ariaTest7 : Spec
ariaTest7 =
    scatter [] [ leAria [ arDescription (str "my ARIA description") ] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "ariaTest1", ariaTest1 )
    , ( "ariaTest2", ariaTest2 )
    , ( "ariaTest3", ariaTest3 )
    , ( "ariaTest4", ariaTest4 )
    , ( "ariaTest5", ariaTest5 )
    , ( "ariaTest6", ariaTest6 )
    , ( "ariaTest7", ariaTest7 )
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
