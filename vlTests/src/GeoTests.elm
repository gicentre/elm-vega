port module GeoTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


{- Some relevant data sources:

   https://github.com/deldersveld/topojson
   https://github.com/topojson/world-atlas.
-}


choropleth1 : Spec
choropleth1 =
    let
        enc =
            encoding
                << color [ MName "rate", MmType Quantitative ]

        trans =
            transform
                << lookupAs "id" (dataFromUrl "data/unemployment.tsv" []) "id" [ "rate" ]

        proj =
            projection [ PType AlbersUsa ]
    in
    toVegaLite
        [ width 500
        , height 300
        , proj
        , dataFromUrl "data/us-10m.json" [ TopojsonFeature "counties" ]
        , trans []
        , mark Geoshape []
        , enc []
        ]


world1 : Spec
world1 =
    let
        enc =
            encoding
                << color [ MString "#000" ]
                << opacity [ MNumber 0.5 ]

        -- proj =
        --     projection [ PType AlbersUsa ]
    in
    toVegaLite
        [ width 500
        , height 300

        --, proj
        , dataFromUrl "data/worldCountries.json" [ TopojsonFeature "countries1" ]
        , mark Geoshape []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geo1", choropleth1 )
        , ( "world1", world1 )
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
            [ Html.text (Json.Encode.encode 2 choropleth1) ]
        ]


port elmToJS : Spec -> Cmd msg
