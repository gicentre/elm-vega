port module ProjectionTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


{- Some relevant data sources:

   https://github.com/deldersveld/topojson
   https://github.com/topojson/world-atlas

   graticule.json produced with mapshaper.org:
     open console and type -graticule then export as topojson.
-}


worldMapTemplate : String -> List ProjectionProperty -> ( String, Spec )
worldMapTemplate tText projProps =
    let
        enc =
            encoding
                << color [ mString "#010" ]
                << opacity [ mNumber 0.7 ]
    in
    ( tText
    , toVegaLite
        [ width 500
        , height 300
        , title tText
        , background "#c1e7f5"
        , projection projProps

        --, dataFromUrl "data/world-110m.json" [ TopojsonFeature "countries1" ]
        , dataFromUrl "data/graticule.json" [ TopojsonFeature "graticule" ]
        , geoshape [ MFillOpacity 0.01, MStroke "#411", MStrokeWidth 0.5 ]
        , enc []
        ]
    )


standardProjs : List ( String, Spec )
standardProjs =
    [ worldMapTemplate "Albers" [ PType Albers ]
    , worldMapTemplate "AzimuthalEqualArea" [ PType AzimuthalEqualArea ]
    , worldMapTemplate "AzimuthalEquidistant" [ PType AzimuthalEquidistant ]
    , worldMapTemplate "ConicConformal" [ PType ConicConformal, PClipAngle (Just 65) ]
    , worldMapTemplate "ConicEqualArea" [ PType ConicEqualArea ]
    , worldMapTemplate "ConicEquidistant" [ PType ConicEquidistant ]
    , worldMapTemplate "Equirectangular" [ PType Equirectangular ]
    , worldMapTemplate "Gnomonic" [ PType Gnomonic ]
    , worldMapTemplate "Mercator" [ PType Mercator ]
    , worldMapTemplate "Orthographic" [ PType Orthographic ]
    , worldMapTemplate "Stereographic" [ PType Stereographic ]
    , worldMapTemplate "TransverseMercator" [ PType TransverseMercator ]
    ]


d3Projections : List ( String, Spec )
d3Projections =
    -- Note these require registering via JavaScript in the hosting page.
    let
        customSpec pText =
            worldMapTemplate pText [ PType (Custom pText), PClipAngle (Just 179.999), PRotate 20 -90 0, PPrecision 0.1 ]
    in
    List.map customSpec [ "airy", "aitoff", "armadillo", "august", "baker", "berghaus", "bertin1953", "boggs", "bonne", "bottomley", "collignon", "craig", "craster", "cylindricalequalarea", "cylindricalstereographic", "eckert1", "eckert2", "eckert3", "eckert4", "eckert5", "eckert6", "eisenlohr", "fahey", "foucaut", "gingery", "winkel3" ]


configExample : ( String, Spec )
configExample =
    let
        config =
            configure
                << configuration (Background "rgb(251,247,238)")
                << configuration (TitleStyle [ TFont "Roboto", TFontWeight W600, TFontSize 18 ])
                << configuration (View [ ViewWidth 500, ViewHeight 300, Stroke Nothing ])
                << configuration (Autosize [ AFit ])
                << configuration (Projection [ PType Orthographic, PRotate 0 0 0 ])

        globeSpec =
            asSpec
                [ dataFromUrl "data/globe.json" [ TopojsonFeature "globe" ]
                , geoshape []
                , encoding <| color [ mString "#c1e7f5" ] <| []

                --, projection [ PType Orthographic, PRotate 0 0 0 ]
                ]

        graticuleSpec =
            asSpec
                [ dataFromUrl "data/graticule.json" [ TopojsonFeature "graticule" ]
                , geoshape [ MFillOpacity 0.01, MStroke "#411", MStrokeWidth 0.1 ]
                , encoding <| color [ mString "#black" ] <| []

                --, projection [ PType Orthographic, PRotate 0 0 0 ]
                ]

        countrySpec =
            asSpec
                [ dataFromUrl "data/world-110m.json" [ TopojsonFeature "countries1" ]
                , geoshape []
                , encoding <| color [ mString "#708E71" ] <| []

                --, projection [ PType Orthographic, PRotate 0 0 0 ]
                ]
    in
    ( "configExample"
    , toVegaLite
        [ title "Hello, World!"
        , config []

        -- NOTE: Currently config view width / height does not respond to geoshapes
        , width 400
        , height 400
        , layer [ globeSpec, graticuleSpec, countrySpec ]
        ]
    )


sourceExample : Spec
sourceExample =
    Tuple.second configExample



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs (standardProjs ++ [ configExample ] ++ d3Projections)



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
