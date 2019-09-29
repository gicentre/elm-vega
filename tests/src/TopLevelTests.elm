port module TopLevelTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)


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


sourceExample : Spec
sourceExample =
    topLevelTest1



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "topLevelTest1", topLevelTest1 )
        , ( "topLevelTest2", topLevelTest2 )
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
