port module ProjectionTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
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
                            , "mercator"
                            , "orthographic"
                            , "equalEarth"
                            , "naturalEarth1"
                            , "mollweide"
                            , "stereographic"
                            , "gnomonic"
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
                    [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
                    , daFormat [ topojsonFeature (str "countries") ]
                    ]
                , data "graticule" [] |> transform [ trGraticule [] ]
                , dataFromRows "sphere" [] (dataRow [ ( "type", vStr "Sphere" ) ] [])
                , (dataFromColumns "labelOffsets" []
                    << dataColumn "dx" (vNums [ -1, -1, 1, 1 ])
                    << dataColumn "dy" (vNums [ -1, 1, -1, 1 ])
                  )
                    []
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
                    [ prType (customProjection (strSignal "parent.data"))
                    , prScale (numSignal "parent.data === 'orthographic' ? projScale * 2 : projScale")
                    , prTranslate (numSignal "projTranslate")
                    ]

        mk =
            marks
                << mark group
                    [ mFrom [ srData (str "projections") ]
                    , mEncode
                        [ enEnter
                            [ maWidth [ vSignal "mapWidth" ]
                            , maHeight [ vSignal "mapHeight" ]
                            , maGroupClip [ vTrue ]
                            ]
                        ]
                    , mGroup [ nestedSi [], nestedPr [], nestedMk [] ]
                    ]

        nestedMk =
            marks
                << mark shape
                    [ mFrom [ srData (str "sphere") ]
                    , mEncode [ enEnter [ maFill [ vStr "aliceblue" ] ] ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "graticule") ]
                    , mClip (clSphere (str "myProjection"))
                    , mInteractive false
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 1 ]
                            , maStroke [ vStr "#ddd" ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark shape
                    [ mFrom [ srData (str "world") ]
                    , mClip (clSphere (str "myProjection"))
                    , mEncode
                        [ enEnter
                            [ maStrokeWidth [ vNum 0.25 ]
                            , maStroke [ vStr "#888" ]
                            , maFill [ black ]
                            ]
                        ]
                    , mTransform [ trGeoShape "myProjection" [] ]
                    ]
                << mark text
                    [ mFrom [ srData (str "labelOffsets") ]
                    , mEncode
                        [ enEnter
                            [ maFill [ white ]
                            , maDx [ vField (field "dx") ]
                            , maDy [ vField (field "dy") ]
                            , maX [ vNum 5 ]
                            , maY [ vSignal "mapHeight -5" ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
                << mark text
                    [ mEncode
                        [ enEnter
                            [ maFill [ black ]
                            , maX [ vNum 5 ]
                            , maY [ vSignal "mapHeight -5" ]
                            , maBaseline [ vBottom ]
                            , maFontSize [ vNum 14 ]
                            , maFontWeight [ vStr "bold" ]
                            , maText [ vSignal "parent.data" ]
                            ]
                        ]
                    ]
    in
    toVega
        [ autosize [ asPad ], ds, si [], lo, mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "projTest", projTest )
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
