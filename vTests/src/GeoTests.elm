port module GeoTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
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
                    [ prType Orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (featureSignal "feature")
                    ]

        mk =
            marks
                << mark Line
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
        [ width 250, height 250, autosize [ APad ], ds, pr [], mk [] ]


geoTest2 : Spec
geoTest2 =
    let
        ds =
            dataSource
                [ data "mapData" [ daUrl "https://gicentre.github.io/data/geoTutorials/geoJson1.json" ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        mk =
            marks
                << mark Shape
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
        [ width 250, height 250, autosize [ APad ], ds, pr [], mk [] ]


geoTest3 : Spec
geoTest3 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl "https://gicentre.github.io/data/geoTutorials/topoJson3.json"
                    , daFormat [ topojsonFeature "myRegions" ]
                    ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doData [ daDataset "mapData", daField (field "id") ])
                    , scRange RaCategory
                    ]

        le =
            legends << legend [ leFill "cScale" ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "mapData") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#4c78a8" ]
                            , maFill [ vScale "cScale", vField (field "id") ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ APad ], ds, pr [], sc [], le [], mk [] ]


geoTest4 : Spec
geoTest4 =
    let
        ds =
            dataSource
                [ data "mapData"
                    [ daUrl "https://gicentre.github.io/data/geoTutorials/topoJson6.json"
                    , daFormat [ topojsonFeature "myRegions" ]
                    ]
                ]

        pr =
            projections
                << projection "myProjection"
                    [ prType Orthographic
                    , prSize (numSignal "[width,height]")
                    , prFit (feName "mapData")
                    ]

        sc =
            scales
                << scale "cScale"
                    [ scType ScOrdinal
                    , scDomain (doData [ daDataset "mapData", daField (field "properties.myRegionName") ])
                    , scRange RaCategory
                    ]

        le =
            legends << legend [ leFill "cScale" ]

        mk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "mapData") ]
                    , mEncode
                        [ enUpdate
                            [ maStroke [ vStr "#4c78a8" ]
                            , maFill [ vScale "cScale", vField (field "properties.myRegionName") ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
    in
    toVega
        [ width 250, height 250, autosize [ APad ], ds, pr [], sc [], le [], mk [] ]


sourceExample : Spec
sourceExample =
    geoTest4



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "geoTest1", geoTest1 )
        , ( "geoTest2", geoTest2 )
        , ( "geoTest3", geoTest3 )
        , ( "geoTest4", geoTest4 )
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
