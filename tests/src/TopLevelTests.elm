port module TopLevelTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


dPath : String
dPath =
    "https://cdn.jsdelivr.net/npm/vega-datasets@2.1/data/"


topLevelTest1 : Spec
topLevelTest1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "label" (vStrs [ "Hello", "from", "elm-vega" ])
                << dataColumn "x" (vNums [ 1, 2, 3 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scDomain (doData [ daDataset "table", daField (field "x") ])
                    , scRange raWidth
                    ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xscale", vField (field "x") ]
                            , maText [ vField (field "label") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ description "Hello from Elm-Vega", width 100, ds, sc [], mk [] ]


topLevelTest2 : Spec
topLevelTest2 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "label" (vStrs [ "Hello", "from", "elm-vega" ])
                << dataColumn "x" (vNums [ 1, 2, 3 ])

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "xscale"
                    [ scDomain (doData [ daDataset "table", daField (field "x") ])
                    , scRange raWidth
                    ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xscale", vField (field "x") ]
                            , maText [ vField (field "label") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ userMeta
            [ ( "Org", vStr "giCentre" )
            , ( "Date", vStr "2019-10-29" )
            , ( "Version", vNum 3.2 )
            ]
        , width 100
        , ds
        , sc []
        , mk []
        ]


topLevelTest3 : Spec
topLevelTest3 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "label" (vStrs [ "Pink background", "300px wide", "60px tall", "L-T-R-B padding 20,30,40 & 50px" ])
                << dataColumn "y" (vNums [ 1, 2, 3, 4 ])

        si =
            signals
                << signal "myBgColor" [ siInit "rgb(255,200,200)" ]
                << signal "myHeight" [ siInit "60" ]
                << signal "myPadding"
                    [ siValue
                        (vObject
                            [ keyValue "left" (vNum 20)
                            , keyValue "top" (vNum 30)
                            , keyValue "right" (vNum 40)
                            , keyValue "bottom" (vNum 50)
                            ]
                        )
                    ]
                << signal "myAutosize" [ siValue (vObject [ keyValue "type" (vStr "fit") ]) ]

        ds =
            dataSource [ table [] ]

        sc =
            scales
                << scale "yScale"
                    [ scDomain (doData [ daDataset "table", daField (field "y") ])
                    , scRange raHeight
                    ]

        mk =
            marks
                << mark text
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maY [ vScale "yScale", vField (field "y") ]
                            , maText [ vField (field "label") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ description "Hello from Elm-Vega"
        , background (strSignal "myBgColor")
        , widthSignal "600/2"
        , heightSignal "myHeight"
        , paddingSignal "myPadding"
        , autosize [ asSignal "myAutosize" ]
        , si []
        , ds
        , sc []
        , mk []
        ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "topLevelTest1", topLevelTest1 )
    , ( "topLevelTest2", topLevelTest2 )
    , ( "topLevelTest3", topLevelTest3 )
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
