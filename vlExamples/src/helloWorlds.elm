port module HelloWorlds exposing (fromElm)

import Json.Encode
import Platform
import VegaLite exposing (..)


myFirstVis : Spec
myFirstVis =
    toVegaLite
        [ title "Hello, World!"
        , dataFromColumns [] <| dataColumn "x" (Numbers [ 10, 20, 30 ]) []
        , mark Circle []
        , encoding <| position X [ PName "x", PmType Quantitative ] []
        ]


mySecondVis : Spec
mySecondVis =
    let
        enc =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , mark Circle []
        , enc []
        ]


myOtherVis : Spec
myOtherVis =
    let
        enc =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Miles_per_Gallon", PAggregate Average, PmType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , mark Bar []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime.
   It assembles all the listed specs into a single Json spec.
-}


mySpecs : Spec
mySpecs =
    [ myFirstVis
    , mySecondVis
    , myOtherVis
    ]
        |> Json.Encode.list



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec Msg
main =
    Platform.program
        { init = init mySpecs
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : Spec -> ( Spec, Cmd msg )
init spec =
    ( spec, fromElm spec )


port fromElm : Spec -> Cmd msg
