port module GalleryGeo exposing (elmToJS)

import Platform
import VegaLite exposing (..)


-- NOTE: All data sources in these examples originally provided at
-- https://github.com/vega/vega-datasets
-- The examples themselves reproduce those at https://vega.github.io/vega-lite/examples/


geo1 : Spec
geo1 =
    toVegaLite
        [ description "Choropleth of US unemployment rate by county"
        , width 500
        , height 300
        , projection [ prType AlbersUsa ]
        , dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "counties" ]
        , transform <| lookup "id" (dataFromUrl "https://vega.github.io/vega-lite/data/unemployment.tsv" []) "id" [ "rate" ] <| []
        , geoshape []
        , encoding <| color [ mName "rate", mMType Quantitative ] []
        ]


geo2 : Spec
geo2 =
    let
        enc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 1 ]
                << color [ mName "digit", mMType Nominal ]
    in
    toVegaLite
        [ description "US zip codes: One dot per zipcode colored by first digit"
        , width 500
        , height 300
        , projection [ prType AlbersUsa ]
        , dataFromUrl "https://vega.github.io/vega-lite/data/zipcodes.csv" []
        , transform <| calculateAs "substring(datum.zip_code, 0, 1)" "digit" <| []
        , circle []
        , enc []
        ]


geo3 : Spec
geo3 =
    let
        des =
            description "One dot per airport in the US overlayed on geoshape"

        backdropSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        overlayEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "steelblue" ]

        overlaySpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []
                , circle []
                , overlayEnc []
                ]
    in
    toVegaLite
        [ des
        , width 500
        , height 300
        , projection [ prType AlbersUsa ]
        , layer [ backdropSpec, overlaySpec ]
        ]


geo4 : Spec
geo4 =
    let
        backdropSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        airportsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "gray" ]

        airportsSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []
                , circle []
                , airportsEnc []
                ]

        trans =
            transform
                << filter (fiEqual "origin" (str "SEA"))
                << lookup "origin" (dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "origin_latitude"
                << calculateAs "datum.longitude" "origin_longitude"
                << lookup "destination" (dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []) "iata" [ "latitude", "longitude" ]
                << calculateAs "datum.latitude" "dest_latitude"
                << calculateAs "datum.longitude" "dest_longitude"

        flightsEnc =
            encoding
                << position Longitude [ pName "origin_longitude", pMType Quantitative ]
                << position Latitude [ pName "origin_latitude", pMType Quantitative ]
                << position Longitude2 [ pName "dest_longitude", pMType Quantitative ]
                << position Latitude2 [ pName "dest_latitude", pMType Quantitative ]

        flightsSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/flights-airport.csv" []
                , trans []
                , rule []
                , flightsEnc []
                ]
    in
    toVegaLite
        [ description "Rules (line segments) connecting SEA to every airport reachable via direct flight"
        , width 800
        , height 500
        , projection [ prType AlbersUsa ]
        , layer [ backdropSpec, airportsSpec, flightsSpec ]
        ]


geo5 : Spec
geo5 =
    let
        enc =
            encoding
                << shape [ mName "geo", mMType GeoFeature ]
                << color [ mRepeat Row, mMType Quantitative ]

        spec =
            asSpec
                [ width 500
                , height 300
                , dataFromUrl "https://vega.github.io/vega-lite/data/population_engineers_hurricanes.csv" []
                , transform <| lookupAs "id" (dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]) "id" "geo" []
                , projection [ prType AlbersUsa ]
                , geoshape []
                , enc []
                ]
    in
    toVegaLite
        [ description "Population per state, engineers per state, and hurricanes per state"
        , repeat [ rowFields [ "population", "engineers", "hurricanes" ] ]
        , resolve <| resolution (reScale [ ( ChColor, Independent ) ]) []
        , specification spec
        ]


geo6 : Spec
geo6 =
    let
        des =
            description "US state capitals overlayed on map of the US"

        backdropSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#ccc" ] []
                ]

        overlayEnc =
            encoding
                << position Longitude [ pName "lon", pMType Quantitative ]
                << position Latitude [ pName "lat", pMType Quantitative ]
                << text [ tName "city", tMType Nominal ]

        overlaySpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/us-state-capitals.json" []
                , textMark []
                , overlayEnc []
                ]
    in
    toVegaLite
        [ des
        , width 800
        , height 500
        , projection [ prType AlbersUsa ]
        , layer [ backdropSpec, overlaySpec ]
        ]


geo7 : Spec
geo7 =
    let
        backdropSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]
                , geoshape []
                , encoding <| color [ mStr "#eee" ] []
                ]

        airportsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << size [ mNum 5 ]
                << color [ mStr "gray" ]

        airportsSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []
                , circle []
                , airportsEnc []
                ]

        itinerary =
            dataFromColumns []
                << dataColumn "airport" (strs [ "SEA", "SFO", "LAX", "LAS", "DFW", "DEN", "ORD", "JFK", "ATL" ])
                << dataColumn "order" (nums [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])

        trans =
            transform
                << lookup "airport" (dataFromUrl "https://vega.github.io/vega-lite/data/airports.csv" []) "iata" [ "latitude", "longitude" ]

        flightsEnc =
            encoding
                << position Longitude [ pName "longitude", pMType Quantitative ]
                << position Latitude [ pName "latitude", pMType Quantitative ]
                << order [ oName "order", oMType Ordinal ]

        flightsSpec =
            asSpec
                [ itinerary []
                , trans []
                , line []
                , flightsEnc []
                ]
    in
    toVegaLite
        [ description "Line drawn between airports in the U.S. simulating a flight itinerary"
        , width 800
        , height 500
        , projection [ prType AlbersUsa ]
        , layer [ backdropSpec, airportsSpec, flightsSpec ]
        ]


geo8 : Spec
geo8 =
    let
        enc =
            encoding
                << shape [ mName "geo", mMType GeoFeature ]
                << color [ mName "pct", mMType Quantitative ]
                << row [ fName "group", fMType Nominal ]
    in
    toVegaLite
        [ description "Income in the U.S. by state, faceted over income brackets"
        , width 500
        , height 300
        , dataFromUrl "https://vega.github.io/vega-lite/data/income.json" []
        , transform <| lookupAs "id" (dataFromUrl "https://vega.github.io/vega-lite/data/us-10m.json" [ topojsonFeature "states" ]) "id" "geo" []
        , projection [ prType AlbersUsa ]
        , geoshape []
        , enc []
        ]


geo9 : Spec
geo9 =
    let
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

        polySpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/londonBoroughs.json" [ topojsonFeature "boroughs" ]
                , geoshape [ maStroke "rgb(251,247,238)", maStrokeWidth 2 ]
                , encoding <| color [ mStr "#ddc" ] []
                ]

        labelEnc =
            encoding
                << position Longitude [ pName "cx", pMType Quantitative ]
                << position Latitude [ pName "cy", pMType Quantitative ]
                << text [ tName "bLabel", tMType Nominal ]
                << size [ mNum 8 ]
                << opacity [ mNum 0.6 ]

        trans =
            transform
                << calculateAs "indexof (datum.name,' ') > 0  ? substring(datum.name,0,indexof(datum.name, ' ')) : datum.name" "bLabel"

        labelSpec =
            asSpec [ dataFromUrl "https://vega.github.io/vega-lite/data/londonCentroids.json" [], trans [], textMark [], labelEnc [] ]

        tubeEnc =
            encoding
                << color
                    [ mName "id"
                    , mMType Nominal
                    , mLegend [ leTitle "", leOrient BottomRight, leOffset 0 ]
                    , mScale tubeLineColors
                    ]

        routeSpec =
            asSpec
                [ dataFromUrl "https://vega.github.io/vega-lite/data/londonTubeLines.json" [ topojsonFeature "line" ]
                , geoshape [ maFilled False, maStrokeWidth 2 ]
                , tubeEnc []
                ]
    in
    toVegaLite
        [ description "Geographic position of London underground lines"
        , width 700
        , height 500
        , configure <| configuration (coView [ vicoStroke Nothing ]) []
        , layer [ polySpec, labelSpec, routeSpec ]
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geo1", geo1 )
        , ( "geo2", geo2 )
        , ( "geo3", geo3 )
        , ( "geo4", geo4 )
        , ( "geo5", geo5 )
        , ( "geo6", geo6 )
        , ( "geo7", geo7 )
        , ( "geo8", geo8 )
        , ( "geo9", geo9 )
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
