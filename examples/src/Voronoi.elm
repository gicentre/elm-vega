port module Voronoi exposing (elmToJS)

import Platform
import Vega exposing (..)


dPath : String
dPath =
    "https://gicentre.github.io/data/uk/"


voronoi : Spec
voronoi =
    let
        ds =
            dataSource
                [ data "centroids"
                    [ daUrl (str (dPath ++ "constituencySpacedCentroidsWithSpacers.csv"))
                    , daFormat [ csv, parseAuto ]
                    ]
                    |> transform
                        [ trGeoPoint "projection" (field "longitude") (field "latitude")
                        , trVoronoi (field "x") (field "y") [ voSize (numSignals [ "width", "height" ]) ]
                        ]
                ]

        pr =
            projections
                << projection "projection"
                    [ prType transverseMercator
                    , prScale (num 3700)
                    , prTranslate (nums [ 320, 3855 ])
                    ]

        sc =
            scales << scale "cScale" [ scType scOrdinal, scRange raCategory ]

        mk =
            marks
                << mark path
                    [ mFrom [ srData (str "centroids") ]
                    , mEncode
                        [ enEnter
                            [ maPath [ vField (field "path") ]
                            , maFill
                                [ ifElse "datum.region == 0"
                                    [ transparent ]
                                    [ vScale "cScale", vField (field "region") ]
                                ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 420, height 670, ds, pr [], sc [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime.
   In this example, only a single spec 'helloWord' is provided.
-}


mySpecs : Spec
mySpecs =
    combineSpecs [ ( "voronoi", voronoi ) ]



{- ---------------------------------------------------------------------------
   The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega specs (mySpecs) to it.
   There should be no need to change this.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
