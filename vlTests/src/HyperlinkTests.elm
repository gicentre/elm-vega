port module HyperlinkTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import VegaLite exposing (..)


hyperlink1 : Spec
hyperlink1 =
    let
        data =
            dataFromColumns []
                << dataColumn "label" (Strings [ "Vega", "Vega-Lite" ])
                << dataColumn "url" (Strings [ "https://vega.github.io/vega", "https://vega.github.io/vega-lite" ])

        encCircle =
            encoding
                << position X [ PName "label", PmType Nominal, PAxis [] ]
                << size [ MNumber 8000 ]
                << color [ MName "label", MmType Nominal, MLegend [] ]
                << hyperlink [ HName "url", HmType Nominal ]

        encLabel =
            encoding
                << position X [ PName "label", PmType Nominal, PAxis [] ]
                << text [ TName "label", TmType Nominal ]
                << color [ MString "white" ]
                << size [ MNumber 16 ]

        --<< hyperlink [ HName "url", HmType Nominal ]
        symbolSpec =
            asSpec [ mark Circle [ MCursor CPointer ], encCircle [] ]

        labelSpec =
            --  asSpec [ mark Text [ MCursor CPointer ], encLabel [] ]
            asSpec [ mark Text [], encLabel [] ]
    in
    toVegaLite
        [ data [], layer [ symbolSpec, labelSpec ] ]


hyperlink2 : Spec
hyperlink2 =
    let
        data =
            dataFromUrl "data/movies.json" []

        enc =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative ]
                << hyperlink [ HString "http://www.imdb.com" ]
    in
    toVegaLite
        [ data
        , mark Point [ MCursor CPointer ]
        , enc []
        ]


hyperlink3 : Spec
hyperlink3 =
    let
        data =
            dataFromUrl "data/movies.json" []

        enc =
            encoding
                << position X [ PName "IMDB_Rating", PmType Quantitative ]
                << position Y [ PName "Rotten_Tomatoes_Rating", PmType Quantitative ]
                << color
                    [ MDataCondition (Expr "datum.IMDB_Rating*10 > datum.Rotten_Tomatoes_Rating")
                        [ MString "steelblue" ]
                        [ MString "red" ]
                    ]
                << hyperlink
                    [ HDataCondition (Expr "datum.IMDB_Rating*10 > datum.Rotten_Tomatoes_Rating")
                        [ HString "http://www.imdb.com" ]
                        [ HString "https://www.rottentomatoes.com" ]
                    ]
    in
    toVegaLite
        [ data
        , mark Point [ MCursor CPointer ]
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "hyperlink1", hyperlink1 )
        , ( "hyperlink2", hyperlink2 )
        , ( "hyperlink3", hyperlink3 )
        ]


sourceExample : Spec
sourceExample =
    hyperlink3



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
