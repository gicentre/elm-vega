port module GeoTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


dPath : String
dPath =
    "https://gicentre.github.io/data/geoTutorials/"


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
                [ data "mapData" [ daUrl (str (dPath ++ "geoJson1.json")) ]
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
                    [ daUrl (str (dPath ++ "topoJson3.json"))
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
                    [ daUrl (str (dPath ++ "topoJson6.json"))
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
                    [ daUrl (str (dPath ++ "topoJson6.json"))
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
                    [ daUrl (str (dPath ++ "topoJson6.json"))
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
                    [ daUrl (str (dPath ++ "topoJson6.json"))
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
                    [ daUrl (str (dPath ++ "londonBoroughs.json"))
                    , daFormat [ topojsonFeature (str "boroughs") ]
                    ]
                , data "interiorData"
                    [ daUrl (str (dPath ++ "londonBoroughs.json"))
                    , daFormat [ topojsonMeshInterior (str "boroughs") ]
                    ]
                , data "exteriorData"
                    [ daUrl (str (dPath ++ "londonBoroughs.json"))
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



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
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
   BOILERPLATE: NO NEED TO EDIT

   The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
   It allows the source code of any of the generated specs to be selected from
   a drop-down list. Useful for viewin specs that might generate invalid Vega-Lite.
-}


type Msg
    = NewSource String
    | NoSource


main : Program () Spec Msg
main =
    Browser.element
        { init = always ( Json.Encode.null, specs |> combineSpecs |> elmToJS )
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


view : Spec -> Html Msg
view spec =
    Html.div []
        [ Html.select [ Html.Events.onInput NewSource ]
            (( "Select source", Json.Encode.null )
                :: specs
                |> List.map (\( s, _ ) -> Html.option [ Html.Attributes.value s ] [ Html.text s ])
            )
        , Html.div [ Html.Attributes.id "specSource" ] []
        , if spec == Json.Encode.null then
            Html.div [] []

          else
            Html.pre [] [ Html.text (Json.Encode.encode 2 spec) ]
        ]


update : Msg -> Spec -> ( Spec, Cmd Msg )
update msg model =
    case msg of
        NewSource srcName ->
            ( specs |> Dict.fromList |> Dict.get srcName |> Maybe.withDefault Json.Encode.null, Cmd.none )

        NoSource ->
            ( Json.Encode.null, Cmd.none )


port elmToJS : Spec -> Cmd msg
