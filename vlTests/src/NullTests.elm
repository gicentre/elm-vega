port module NullTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


axis1 : Spec
axis1 =
    let
        data =
            dataFromColumns []
                << dataColumn "x" (Numbers [ 0, 1000, 1000, 0, 0, 1000 ])
                << dataColumn "y" (Numbers [ 1000, 1000, 0, 0, 1000, 0 ])
                << dataColumn "order" (Numbers <| List.map toFloat <| List.range 1 6)

        enc =
            encoding
                << position X [ PName "x", PmType Quantitative, PAxis [] ]
                << position Y [ PName "y", PmType Quantitative, PAxis [] ]
                << order [ OName "orger", OmType Ordinal ]
    in
    toVegaLite [ data [], enc [], mark Line [] ]


sourceExample : Spec
sourceExample =
    axis1



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "axis1", axis1 ) ]



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
