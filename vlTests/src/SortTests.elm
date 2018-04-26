port module SortTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


sortQuant : String -> List SortProperty -> Spec
sortQuant yField sps =
    let
        data =
            -- dataFromUrl "https://vega.github.io/vega-lite/data/cars.json"
            dataFromColumns []
                << dataColumn "Horsepower" (Numbers [ 1, 5, 2, 3, 4 ])
                << dataColumn "Weight_in_lbs" (Numbers [ 19, 21, 58, 12, 13 ])

        enc =
            encoding
                << position X [ PName "Horsepower", PmType Quantitative, PSort sps ]
                << position Y [ PName yField, PmType Quantitative ]
                << order [ OName yField, OmType Ordinal ]
    in
    toVegaLite [ height 300, data [], enc [], mark Line [ MStrokeWidth 0.5 ] ]


sortAsc : Spec
sortAsc =
    sortQuant "Horsepower" [ Ascending ]


sortDesc : Spec
sortDesc =
    sortQuant "Horsepower" [ Descending ]


sortWeight : Spec
sortWeight =
    sortQuant "Weight_in_lbs" [ ByField "Weight_in_lbs", Op Mean ]


sortCustom : Spec
sortCustom =
    let
        data =
            dataFromColumns []
                << dataColumn "a" (Strings [ "A", "B", "C", "Z", "Y", "X" ])
                << dataColumn "b" (Numbers [ 28, 55, 43, 91, 81, 53 ])

        enc =
            encoding
                << position X
                    [ PName "a"
                    , PmType Ordinal
                    , PSort [ customSort (Strings [ "B", "A", "C" ]) ]
                    ]
                << position Y [ PName "b", PmType Quantitative ]
    in
    toVegaLite [ data [], enc [], mark Bar [] ]


sourceExample : Spec
sourceExample =
    sortCustom



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "sortAsc", sortAsc )
        , ( "sortDesc", sortDesc )
        , ( "sortWeight", sortWeight )
        , ( "sortCustom", sortCustom )
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
