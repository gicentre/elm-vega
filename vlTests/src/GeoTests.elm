port module GeoTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


{- Some relevant data sources:

   https://github.com/deldersveld/topojson
   https://github.com/topojson/world-atlas
-}


scribbleMap1 : Spec
scribbleMap1 =
    let
        stateCondition =
            List.map (\s -> "&& datum.state !='" ++ s ++ "'") [ "AS", "FM", "PW", "MH", "GU", "MP", "VI", "PR" ]
                |> String.concat

        config =
            configure
                << configuration (TitleStyle [ TFont "Roboto", TFontWeight W300, TFontSize 28 ])
                << configuration (View [ Stroke Nothing ])

        trans =
            transform
                << filter ("datum.latitude != '' && datum.county != 'Honolulu' " ++ stateCondition |> FExpr)
                << calculateAs "datum.state == 'HI' ? 'hi' : (datum.state == 'AK' ? 'ak' : 'continent')" "conterminous"

        enc =
            encoding
                << position X [ PName "longitude", PmType Longitude ]
                << position Y [ PName "latitude", PmType Latitude ]
                << order [ OName "zip_code", OmType Quantitative ]
                << color [ MString "#666" ]
                << detail [ DName "conterminous", DmType Nominal ]
    in
    toVegaLite
        [ title "US connected zip codes"
        , config []
        , width 1000
        , height 600
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/zipcodes.csv" []
        , trans []
        , mark Line [ MStrokeWidth 0.2, MInterpolate Monotone ]
        , enc []
        ]


scribbleMap2 : Spec
scribbleMap2 =
    let
        stateCondition =
            List.map (\s -> "&& datum.state !='" ++ s ++ "'") [ "AS", "FM", "PW", "MH", "GU", "MP", "VI", "PR" ]
                |> String.concat

        config =
            configure
                << configuration (TitleStyle [ TFont "Roboto", TFontWeight W300, TFontSize 28 ])
                << configuration (View [ Stroke Nothing ])

        trans =
            transform
                << filter ("datum.latitude != '' && datum.county != 'Honolulu' " ++ stateCondition |> FExpr)
                << calculateAs "substring(datum.zip_code, 0, 3)" "digit3"
                << calculateAs "length(datum.zip_code+' ')" "ziplen"

        enc =
            encoding
                << position X [ PName "longitude", PmType Longitude, PSort [ ByField "zip_code" ] ]
                << position Y [ PName "latitude", PmType Latitude, PSort [ ByField "zip_code" ] ]
                << order [ OName "zip_code", OmType Quantitative ]
                << color [ MName "digit3", MmType Nominal, MLegend [] ]
                << detail [ DName "ziplen", DmType Nominal ]
    in
    toVegaLite
        [ title "US connected zip codes, coloured by first three digits"
        , config []
        , width 1000
        , height 600
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/zipcodes.csv" []
        , trans []
        , mark Line [ MStrokeWidth 0.2, MInterpolate Monotone ]
        , enc []
        ]


sourceExample : Spec
sourceExample =
    scribbleMap1



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "scribbleMap1", scribbleMap1 )
        , ( "scribbleMap2", scribbleMap2 )
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
