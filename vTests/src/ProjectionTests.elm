port module ProjectionTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import Platform
import Vega exposing (..)


{- This test is converted from 'Projections Example' on the offical Vega site:
   https://vega.github.io/vega/examples/projections/
-}


projTest : Spec
projTest =
    let
        ds =
            dataSource
                [ data "projections"
                    [ daValue
                        (vStrs
                            [ "azimuthalEquidistant"
                            , "conicConformal"
                            , "gnomonic"
                            , "mercator"
                            , "stereographic"
                            , "airy"
                            , "armadillo"
                            , "baker"
                            , "berghaus"
                            , "bottomley"
                            , "collignon"
                            , "eckert1"
                            , "guyou"
                            , "hammer"
                            , "littrow"
                            , "mollweide"
                            , "wagner6"
                            , "wiechel"
                            , "winkel3"
                            , "interruptedSinusoidal"
                            , "interruptedMollweide"
                            , "interruptedMollweideHemispheres"
                            , "polyhedralButterfly"
                            , "peirceQuincuncial"
                            ]
                        )
                    ]
                , data "world"
                    [ daUrl "https://vega.github.io/vega/data/world-110m.json"
                    , daFormat [ topojsonFeature "countries" ]
                    ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                , dataFromRows "sphere" [] (dataRow [ ( "type", vStr "Sphere" ) ] [])
                , dataFromColumns "labelOffsets"
                    []
                    (dataColumn "dx" (daNums [ -1, -1, 1, 1 ]) <|
                        dataColumn "dy" (daNums [ -1, 1, -1, 1 ]) []
                    )
                ]

        si =
            -- Note: For reference purposes this uses signals to set up proj parameters
            -- but it would normally be easier to use elm values to do this instead.
            signals
                << signal "mapWidth" [ siValue (vNum 300) ]
                << signal "mapHeight" [ siValue (vNum 200) ]
                << signal "projScale" [ siValue (vNum 45) ]
                << signal "projTranslate" [ siUpdate "[mapWidth / 2, mapHeight / 2]" ]

        nestedSi =
            signals
                << signal "width" [ siUpdate "mapWidth" ]
                << signal "height" [ siUpdate "mapHeight" ]

        lo =
            layout [ loColumns (num 3), loPadding (num 20) ]

        nestedPr =
            projections
                << projection "myProjection"
                    [ prType (prCustom (strSignal "parent.data"))
                    , prScale (numSignal "projScale")
                    , prTranslate (numSignal "projTranslate")
                    ]

        mk =
            marks
                << mark Group
                    [ mFrom [ srData (str "projections") ]
                    , mEncode
                        [ enEnter
                            [ maWidth [ vSignal "mapWidth" ]
                            , maHeight [ vSignal "mapHeight" ]
                            , maGroupClip [ vBoo True ]
                            ]
                        ]
                    , mGroup [ nestedSi [], nestedPr [], nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark Shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode [ enEnter [ maFill [ vStr "aliceblue" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "graticule") ]
                    , mClip (clSphere (str "myProjection"))
                    , mInteractive bFalse
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Shape
                    [ mFrom [ srData (str "world") ]
                    , mClip (clSphere (str "myProjection"))
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 0.25 ]
                            , maStroke [ vStr "#888" ]
                            , maFill [ vStr "black" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark Text
                    [ mFrom [ srData (str "labelOffsets") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ vStr "white" ]
                            , maDx [ vField (field "dx") ]
                            , maDy [ vField (field "dy") ]
                            , maX [ vNum 5 ]
                            , maY [ vSignal "mapHeight -5" ]
                            , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maFill [ vStr "black" ]
                            , maX [ vNum 5 ]
                            , maY [ vSignal "mapHeight -5" ]
                            , maBaseline [ vStr (vAlignLabel AlignBottom) ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ autosize [ APad ], ds, si [], lo, mk [] ]


sourceExample : Spec
sourceExample =
    projTest



{- This list comprises the specifications to be provided to the Vega runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "projTest", projTest )
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
