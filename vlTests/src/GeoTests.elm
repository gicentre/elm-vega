port module GeoTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


{- Some relevant data sources:

   https://github.com/deldersveld/topojson
   https://github.com/topojson/world-atlas
-}


choropleth1 : Spec
choropleth1 =
    toVegaLite
        [ description "US unemployment rate by County"
        , width 500
        , height 300
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/us-10m.json" [ TopojsonFeature "counties" ]
        , transform <| lookup "id" (dataFromUrl "data/unemployment.tsv" []) "id" [ "rate" ] <| []
        , mark Geoshape []
        , encoding <| color [ MName "rate", MmType Quantitative ] []
        ]


choropleth2 : Spec
choropleth2 =
    let
        enc =
            encoding
                << shape [ MName "geo", MmType GeoJson ]
                << color [ MRepeat Row, MmType Quantitative ]

        spec =
            asSpec
                [ width 500
                , height 300
                , dataFromUrl "data/population_engineers_hurricanes.csv" []
                , transform <| lookupAs "id" (dataFromUrl "data/us-10m.json" [ TopojsonFeature "states" ]) "id" "geo" []
                , projection [ PType AlbersUsa ]
                , mark Geoshape []
                , enc []
                ]
    in
    toVegaLite
        [ description "Population per state, engineers per state, and hurricanes per state"
        , repeat [ RowFields [ "population", "engineers", "hurricanes" ] ]
        , resolve <| resolution (RScale [ ( ChColor, Independent ) ]) []
        , specification spec
        ]


dotMap1 : Spec
dotMap1 =
    let
        enc =
            encoding
                << position X [ PName "longitude", PmType Longitude ]
                << position Y [ PName "latitude", PmType Latitude ]
                << size [ MNumber 1 ]
                << color [ MName "digit", MmType Nominal ]
    in
    toVegaLite
        [ description "US zip codes: One dot per zipcode colored by first digit"
        , width 500
        , height 300
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/zipcodes.csv" []
        , transform <| calculateAs "substring(datum.zip_code, 0, 1)" "digit" <| []
        , mark Circle []
        , enc []
        ]


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


dotMap2 : Spec
dotMap2 =
    let
        des =
            description "One dot per airport in the US overlayed on geoshape"

        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ TopojsonFeature "states" ]
                , projection [ PType AlbersUsa ]
                , mark Geoshape []
                , encoding <| color [ MString "#eee" ] []
                ]

        overlayEnc =
            encoding
                << position X [ PName "longitude", PmType Longitude ]
                << position Y [ PName "latitude", PmType Latitude ]
                << size [ MNumber 5 ]
                << color [ MString "steelblue" ]

        overlaySpec =
            asSpec
                [ dataFromUrl "data/airports.csv" []
                , projection [ PType AlbersUsa ]
                , mark Circle []
                , overlayEnc []
                ]
    in
    toVegaLite
        [ des, width 500, height 300, layer [ backdropSpec, overlaySpec ] ]


flights1 : Spec
flights1 =
    let
        backdropSpec =
            asSpec
                [ dataFromUrl "data/us-10m.json" [ TopojsonFeature "states" ]
                , projection [ PType AlbersUsa ]
                , mark Geoshape []
                , encoding <| color [ MString "#eee" ] []
                ]

        airportsEnc =
            encoding
                << position X [ PName "longitude", PmType Longitude ]
                << position Y [ PName "latitude", PmType Latitude ]
                << size [ MNumber 5 ]
                << color [ MString "gray" ]

        airportsSpec =
            asSpec
                [ dataFromUrl "data/airports.csv" []
                , projection [ PType AlbersUsa ]
                , mark Circle []
                , airportsEnc []
                ]

        trans =
            transform
                << filter (FEqual "origin" (Str "SEA"))
                << lookup "origin" (dataFromUrl "data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "origin_latitude"
                << calculateAs "datum.longitude" "origin_longitude"
                << lookup "destination" (dataFromUrl "data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "dest_latitude"
                << calculateAs "datum.longitude" "dest_longitude"

        flightsEnc =
            encoding
                << position X [ PName "origin_longitude", PmType Longitude ]
                << position Y [ PName "origin_latitude", PmType Latitude ]
                << position X2 [ PName "dest_longitude", PmType Longitude ]
                << position Y2 [ PName "dest_latitude", PmType Latitude ]

        flightsSpec =
            asSpec
                [ dataFromUrl "data/flights-airport.csv" []
                , trans []
                , projection [ PType AlbersUsa ]
                , mark Rule []
                , flightsEnc []
                ]
    in
    toVegaLite
        [ description "Rules (line segments) connecting SEA to every airport reachable via direct flight"
        , width 800
        , height 500
        , layer [ backdropSpec, airportsSpec, flightsSpec ]
        ]


sourceExample : Spec
sourceExample =
    choropleth2



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "choropleth1", choropleth1 )
        , ( "choropleth2", choropleth2 )
        , ( "dotmap1", dotMap1 )
        , ( "dotmap2", dotMap2 )
        , ( "linemap1", scribbleMap1 )
        , ( "linemap2", scribbleMap2 )
        , ( "linemap3", flights1 )
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
