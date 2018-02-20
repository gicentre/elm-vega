port module GeoTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


{- Some relevant data sources:

   https://github.com/deldersveld/topojson
   https://github.com/topojson/world-atlas
-}


defaultSize1 : Spec
defaultSize1 =
    toVegaLite
        [ description "Default map size"
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/us-10m.json" [ TopojsonFeature "counties" ]
        , mark Geoshape []
        , encoding <| color [ MString "black" ] []
        ]


defaultSize2 : Spec
defaultSize2 =
    toVegaLite
        [ description "Default map size with view width and height specified in config."
        , configure <| configuration (View [ ViewWidth 500, ViewHeight 300 ]) <| []
        , projection [ PType AlbersUsa ]
        , dataFromUrl "data/us-10m.json" [ TopojsonFeature "counties" ]
        , mark Geoshape []
        , encoding <| color [ MString "black" ] []
        ]


choropleth1 : Spec
choropleth1 =
    toVegaLite
        [ width 900
        , height 500
        , configure <| configuration (View [ Stroke Nothing ]) []
        , dataFromUrl "data/londonBoroughs.json" [ TopojsonFeature "boroughs" ]
        , mark Geoshape [ MStrokeOpacity 0 ]
        , encoding <| color [ MName "id", MmType Nominal ] []
        ]


choropleth2 : Spec
choropleth2 =
    let
        trans =
            transform
                << calculateAs "indexof (datum.name,' ') > 0  ? substring(datum.name,0,indexof(datum.name, ' ')) : datum.name" "bLabel"

        polyEnc =
            encoding
                << color [ MName "id", MmType Nominal, MScale boroughColors, MLegend [] ]
                << opacity [ MNumber 1 ]

        polySpec =
            asSpec
                [ dataFromUrl "data/londonBoroughs.json" [ TopojsonFeature "boroughs" ]
                , mark Geoshape [ MStroke "rgb(251,247,238)", MStrokeWidth 2 ]
                , polyEnc []
                ]

        labelEnc =
            encoding
                << position Longitude [ PName "cx" ]
                << position Latitude [ PName "cy" ]
                << text [ TName "bLabel", TmType Nominal ]

        labelSpec =
            asSpec [ dataFromUrl "data/londonCentroids.json" [], trans [], mark Text [], labelEnc [] ]
    in
    toVegaLite
        [ width 1200
        , height 700
        , configure <| configuration (View [ Stroke Nothing ]) []
        , layer [ polySpec, labelSpec ]
        ]


tubeLines1 : Spec
tubeLines1 =
    toVegaLite
        [ width 700
        , height 500
        , dataFromUrl "data/londonTubeLines.json" [ TopojsonFeature "line" ]
        , mark Geoshape [ MFilled False ]
        , encoding <| color [ MName "id", MmType Nominal ] []
        ]


tubeLines2 : Spec
tubeLines2 =
    let
        enc =
            encoding
                << color
                    [ MName "id"
                    , MmType Nominal
                    , MLegend [ LTitle "", LOrient BottomRight ]
                    , MScale tubeLineColors
                    ]
    in
    toVegaLite
        [ width 700
        , height 500
        , configure <| configuration (View [ Stroke Nothing ]) []
        , dataFromUrl "data/londonTubeLines.json" [ TopojsonFeature "line" ]
        , mark Geoshape [ MFilled False, MStrokeWidth 2 ]
        , enc []
        ]


tubeLines3 : Spec
tubeLines3 =
    let
        polySpec =
            asSpec
                [ dataFromUrl "data/londonBoroughs.json" [ TopojsonFeature "boroughs" ]
                , mark Geoshape [ MStroke "rgb(251,247,238)", MStrokeWidth 2 ]
                , encoding <| color [ MString "#ddc" ] []
                ]

        labelEnc =
            encoding
                << position Longitude [ PName "cx" ]
                << position Latitude [ PName "cy" ]
                << text [ TName "bLabel", TmType Nominal ]
                << size [ MNumber 8 ]
                << opacity [ MNumber 0.6 ]

        trans =
            transform
                << calculateAs "indexof (datum.name,' ') > 0  ? substring(datum.name,0,indexof(datum.name, ' ')) : datum.name" "bLabel"

        labelSpec =
            asSpec [ dataFromUrl "data/londonCentroids.json" [], trans [], mark Text [], labelEnc [] ]

        tubeEnc =
            encoding
                << color
                    [ MName "id"
                    , MmType Nominal
                    , MLegend [ LTitle "", LOrient BottomRight, LOffset 0 ]
                    , MScale tubeLineColors
                    ]

        routeSpec =
            asSpec
                [ dataFromUrl "data/londonTubeLines.json" [ TopojsonFeature "line" ]
                , mark Geoshape [ MFilled False, MStrokeWidth 2 ]
                , tubeEnc []
                ]
    in
    toVegaLite
        [ width 700
        , height 500
        , configure <| configuration (View [ Stroke Nothing ]) []
        , layer [ polySpec, labelSpec, routeSpec ]
        ]


boroughColors : List ScaleProperty
boroughColors =
    categoricalDomainMap
        [ ( "Kingston upon Thames", "#9db7b1" )
        , ( "Croydon", "#d4b4e5" )
        , ( "Bromley", "#afb9cb" )
        , ( "Hounslow", "#b2add6" )
        , ( "Ealing", "#e2f8ca" )
        , ( "Havering", "#a1bde6" )
        , ( "Hillingdon", "#e8aa95" )
        , ( "Harrow", "#8bd0eb" )
        , ( "Brent", "#dfb89b" )
        , ( "Barnet", "#a2e7ed" )
        , ( "Lambeth", "#e3aba7" )
        , ( "Southwark", "#86cbd1" )
        , ( "Lewisham", "#ecb1c2" )
        , ( "Greenwich", "#acd8ba" )
        , ( "Bexley", "#e4bad9" )
        , ( "Enfield", "#9bd6ca" )
        , ( "Waltham Forest", "#cec9f3" )
        , ( "Redbridge", "#c9d2a8" )
        , ( "Sutton", "#d1c1d9" )
        , ( "Richmond upon Thames", "#ddcba2" )
        , ( "Merton", "#a2acbd" )
        , ( "Wandsworth", "#deefd6" )
        , ( "Hammersmith and Fulham", "#b5d7a7" )
        , ( "Kensington and Chelsea", "#f6d4c9" )
        , ( "Westminster", "#add4e0" )
        , ( "Camden", "#d9b9ad" )
        , ( "Tower Hamlets", "#c6e1db" )
        , ( "Islington", "#e0c7ce" )
        , ( "Hackney", "#a6b79f" )
        , ( "Haringey", "#cbd5e7" )
        , ( "Newham", "#c2d2ba" )
        , ( "Barking and Dagenham", "#ebe2cf" )
        , ( "City of London", "#c7bfad" )
        ]


tubeLineColors : List ScaleProperty
tubeLineColors =
    categoricalDomainMap
        [ ( "Bakerloo", "rgb(137,78,36)" )
        , ( "Central", "rgb(220,36,30)" )
        , ( "Circle", "rgb(255,206,0)" )
        , ( "District", "rgb(1,114,41)" )
        , ( "DLR", "rgb(0,175,173)" )
        , ( "Hammersmith & City", "rgb(215,153,175)" )
        , ( "Jubilee", "rgb(106,114,120)" )
        , ( "Metropolitan", "rgb(114,17,84)" )
        , ( "Northern", "rgb(0,0,0)" )
        , ( "Piccadilly", "rgb(0,24,168)" )
        , ( "Victoria", "rgb(0,160,226)" )
        , ( "Waterloo & City", "rgb(106,187,170)" )
        ]


mapComp1 : Spec
mapComp1 =
    let
        rotatedSpec rot =
            let
                graticuleSpec =
                    asSpec
                        [ width 300
                        , height 300
                        , projection [ PType Orthographic, PRotate rot 0 0 ]
                        , dataFromUrl "data/graticule.json" [ TopojsonFeature "graticule" ]
                        , mark Geoshape [ MFillOpacity 0.01, MStroke "#411", MStrokeWidth 0.1 ]
                        ]

                countrySpec =
                    asSpec
                        [ width 300
                        , height 300
                        , projection [ PType Orthographic, PRotate rot 0 0 ]
                        , dataFromUrl "data/world-110m.json" [ TopojsonFeature "countries1" ]
                        , mark Geoshape [ MStroke "white", MFill "black", MStrokeWidth 0.5 ]
                        ]
            in
            asSpec [ layer [ graticuleSpec, countrySpec ] ]
    in
    toVegaLite
        [ configure <| configuration (View [ Stroke Nothing ]) <| [], hConcat [ rotatedSpec -65, rotatedSpec 115, rotatedSpec -65 ] ]


mapComp2 : Spec
mapComp2 =
    let
        rotatedSpec rot =
            let
                seaSpec =
                    asSpec
                        [ width 300
                        , height 300
                        , projection [ PType Orthographic, PRotate 0 0 0 ]
                        , dataFromUrl "data/globe.json" [ TopojsonFeature "globe" ]
                        , mark Geoshape [ MFill "#c1e7f5", MStrokeOpacity 0 ]
                        ]

                graticuleSpec =
                    asSpec
                        [ width 300
                        , height 300
                        , projection [ PType Orthographic, PRotate rot 0 0 ]
                        , dataFromUrl "data/graticule.json" [ TopojsonFeature "graticule" ]
                        , mark Geoshape [ MFillOpacity 0.01, MStroke "#411", MStrokeWidth 0.1 ]
                        ]

                countrySpec =
                    asSpec
                        [ width 300
                        , height 300
                        , projection [ PType Orthographic, PRotate rot 0 0 ]
                        , dataFromUrl "data/world-110m.json" [ TopojsonFeature "countries1" ]
                        , mark Geoshape [ MStroke "white", MFill "#242", MStrokeWidth 0.1 ]
                        ]
            in
            asSpec [ layer [ seaSpec, graticuleSpec, countrySpec ] ]
    in
    toVegaLite
        [ configure <| configuration (View [ Stroke Nothing ]) <| [], hConcat [ rotatedSpec 0, rotatedSpec -40 ] ]


dotMap1 : Spec
dotMap1 =
    let
        enc =
            encoding
                << position Longitude [ PName "longitude" ]
                << position Latitude [ PName "latitude" ]
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
                << position Longitude [ PName "longitude" ]
                << position Latitude [ PName "latitude" ]
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
                << position Longitude [ PName "longitude", PSort [ ByField "zip_code" ] ]
                << position Latitude [ PName "latitude", PSort [ ByField "zip_code" ] ]
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
    mapComp1



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "defaultSize1", defaultSize1 )
        , ( "defaultSize2", defaultSize2 )
        , ( "choropleth1", choropleth1 )
        , ( "choropleth2", choropleth2 )
        , ( "linear1", tubeLines1 )
        , ( "linear2", tubeLines2 )
        , ( "linear3", tubeLines3 )
        , ( "mapComp1", mapComp1 )
        , ( "mapComp2", mapComp2 )
        , ( "dotMap1", dotMap1 )
        , ( "scribbleMap1", scribbleMap1 )
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
