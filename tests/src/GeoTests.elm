port module GeoTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Vega exposing (..)


geoTest1 : Spec
geoTest1 =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "longitude" (vNums [ -3, 4, 4, -3, -3 ])
                << dataColumn "latitude" (vNums [ 52, 52, 45, 45, 52 ])

        ds =
            dataSource
                [ table []
                    |> transform
                        [ trGeoJson
                            [ gjFields (field "longitude") (field "latitude")
                            , gjSignal "feature"
                            ]
                        , trGeoPoint "myProjection" (field "longitude") (field "latitude")
                        ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (featureSignal "feature")
                    ]

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vField (field "x") ]
                            , maY [ vField (field "y") ]
                            , maStroke [ vStr "#4c78a8" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ asPad ], ds, pr [], mk [] ]


geoTest2 : Spec
geoTest2 =
    let
        ds =
            dataSource
                [ data "mapData" [ daUrl (str "https://gicentre.github.io/data/geoTutorials/geoJson1.json") ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "mapData") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#4c78a8" ]
                            , maFill [ vStr "#006633" ]
                            , maFillOpacity [ vNum 0.3 ]
                            , maStrokeWidth [ vNum 4 ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ asPad ], ds, pr [], mk [] ]


featureSpec : Data -> String -> Spec
featureSpec ds fld =
    let
        pr =
            projections
                << projection "myProjection"
                    [ prType orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType scOrdinal
                    , scDomain (doData [ daDataset "mapData", daField (field fld) ])
                    , scRange raCategory
                    ]

        le =
            legends << legend [ leFill "cScale" ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "mapData") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#4c78a8" ]
                            , maFill [ vScale "cScale", vField (field fld) ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ asPad ], ds, pr [], sc [], le [], mk [] ]


meshSpec : Data -> Spec
meshSpec ds =
    let
        pr =
            projections
                << projection "myProjection"
                    [ prType orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "mapData") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "black" ]
                            , maFill [ vStr "steelblue" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ asPad ], ds, pr [], mk [] ]


geoTest3 : Spec
geoTest3 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/topoJson3.json")
                    , daFormat [ topojsonFeature (str "myRegions") ]
                    ]
                ]
    in
    featureSpec ds "id"


geoTest4 : Spec
geoTest4 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/topoJson6.json")
                    , daFormat [ topojsonFeature (str "myRegions") ]
                    ]
                ]
    in
    featureSpec ds "properties.myRegionName"


geoTest5 : Spec
geoTest5 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/topoJson6.json")
                    , daFormat [ topojsonMesh (str "myRegions") ]
                    ]
                ]
    in
    meshSpec ds


geoTest6 : Spec
geoTest6 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/topoJson6.json")
                    , daFormat [ topojsonMeshInterior (str "myRegions") ]
                    ]
                ]
    in
    meshSpec ds


geoTest7 : Spec
geoTest7 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/topoJson6.json")
                    , daFormat [ topojsonMeshExterior (str "myRegions") ]
                    ]
                ]
    in
    meshSpec ds


geoTest8 : Spec
geoTest8 =
    let
        ds =
            dataSource
                [ data "featureData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/londonBoroughs.json")
                    , daFormat [ topojsonFeature (str "boroughs") ]
                    ]
                , data "interiorData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/londonBoroughs.json")
                    , daFormat [ topojsonMeshInterior (str "boroughs") ]
                    ]
                , data "exteriorData"
                    [ daUrl (str "https://gicentre.github.io/data/geoTutorials/londonBoroughs.json")
                    , daFormat [ topojsonMeshExterior (str "boroughs") ]
                    ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType naturalEarth1
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "featureData")
                    ]

        mk =
            marks
                << mark shape
                    [ mFrom [ srData (str "featureData") ]
                    , mEncode [ enUpdate [ maFill [ vStr "#eee" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "interiorData") ]
                    , mEncode [ enUpdate [ maStroke [ vStr "red" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "exteriorData") ]
                    , mEncode [ enUpdate [ maStroke [ vStr "black" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 600, height 450, autosize [ asPad ], ds, pr [], mk [] ]


sourceExample : Spec
sourceExample =
    geoTest8



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geoTest1", geoTest1 )
        , ( "geoTest2", geoTest2 )
        , ( "geoTest3", geoTest3 )
        , ( "geoTest4", geoTest4 )
        , ( "geoTest5", geoTest5 )
        , ( "geoTest6", geoTest6 )
        , ( "geoTest7", geoTest7 )
        , ( "geoTest8", geoTest8 )
        ]



{- ---------------------------------------------------------------------------
   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   This is used to display the generated Vega specs for testing purposes.
-}


main : Program () Spec msg
main =
    Browser.element
        { init = always ( mySpecs, elmToJS mySpecs )
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
