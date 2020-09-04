port module ColorTests exposing (elmToJS)

import Browser
import Dict
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


colorTest1 : Spec
colorTest1 =
    let
        ellipse =
            let
                rminor =
                    -- Minor axis as a proportion of major axis
                    0.3

                pair t =
                    let
                        x =
                            cos t

                        y =
                            rminor * sin t
                    in
                    "L " ++ String.fromFloat x ++ " " ++ String.fromFloat y

                thetas =
                    List.range 0 40 |> List.map (\n -> (2 * pi / 40) * toFloat n)
            in
            List.intersperse " " (List.map pair thetas) |> String.concat

        ellipseEncoding c a =
            let
                ( x1, x2 ) =
                    if a < 0 then
                        ( 1, 0 )

                    else if a > 0 then
                        ( 0.7, 0.3 )

                    else
                        ( 0.5, 0.5 )

                ( y1, y2 ) =
                    if a < 0 then
                        ( 1, 0 )

                    else if a > 0 then
                        ( 0.1, 1 )

                    else
                        ( 1, 0 )
            in
            [ mEncode
                [ enEnter
                    [ maStroke [ vStr c ]
                    , maFill
                        [ vGradient grLinear
                            [ grStops [ ( num 0, "white" ), ( num 1, c ) ]
                            , grX1 (num x1)
                            , grX2 (num x2)
                            , grY1 (num y1)
                            , grY2 (num y2)
                            ]
                        ]
                    , maX [ vNum 100 ]
                    , maY [ vNum 100 ]
                    , maScaleX [ vNum 100 ]
                    , maScaleY [ vNum 100 ]
                    , maPath [ vStr ellipse ]
                    , maAngle [ vNum a ]
                    , maStrokeWidth [ vNum 2 ]
                    ]
                , enUpdate
                    [ maOpacity [ vNum 1 ]
                    , maBlend [ vSignal "blend" ]
                    ]
                , enHover [ maOpacity [ vNum 0.5 ] ]
                ]
            ]

        si =
            signals
                << signal "blend"
                    [ siValue (vStr "normal")
                    , siBind
                        (iSelect
                            [ inOptions
                                (vStrs
                                    [ "normal"
                                    , "multiply"
                                    , "screen"
                                    , "overlay"
                                    , "darken"
                                    , "lighten"
                                    , "color-dodge"
                                    , "color-burn"
                                    , "hard-light"
                                    , "soft-light"
                                    , "difference"
                                    , "exclusion"
                                    , "hue"
                                    , "saturation"
                                    , "color"
                                    , "luminosity"
                                    ]
                                )
                            ]
                        )
                    ]

        sc =
            scales
                << scale "scale"
                    [ scType scLinear, scRange raWidth ]

        ax =
            axes
                << axis "scale"
                    siBottom
                    [ axGrid true
                    , axTickCount (num 10)
                    , axDomain false
                    , axTicks false
                    , axLabels false
                    ]
                << axis "scale"
                    siLeft
                    [ axGrid true
                    , axTickCount (num 10)
                    , axDomain false
                    , axTicks false
                    , axLabels false
                    ]

        mk =
            marks
                << mark path (ellipseEncoding "#f00" 45)
                << mark path (ellipseEncoding "#0f0" 0)
                << mark path (ellipseEncoding "#00f" -45)
    in
    toVega
        [ width 200, height 200, si [], sc [], ax [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "colorTest1", colorTest1 )
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
update msg _ =
    case msg of
        NewSource srcName ->
            ( specs |> Dict.fromList |> Dict.get srcName |> Maybe.withDefault Json.Encode.null, Cmd.none )


port elmToJS : Spec -> Cmd msg
