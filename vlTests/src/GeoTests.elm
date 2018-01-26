port module GeoTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


choropleth1 : Spec
choropleth1 =
    let
        enc =
            encoding
                << color [ MName "rate", MmType Quantitative ]
    in
    toVegaLite
        [ width 500
        , height 300
        , dataFromUrl "data/us-10m.json" [ TopojsonFeature "counties" ]
        , mark Geoshape []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geo1", choropleth1 )
        ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
