port module SortTests exposing (elmToJS)

import Browser
import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


sortQuant : String -> List SortProperty -> Spec
sortQuant yField sps =
    let
        data =
            -- dataFromUrl "https://vega.github.io/vega-lite/data/cars.json"
            dataFromColumns []
                << dataColumn "Horsepower" (nums [ 1, 5, 2, 3, 4 ])
                << dataColumn "Weight_in_lbs" (nums [ 19, 21, 58, 12, 13 ])

        enc =
            encoding
                << position X [ pName "Horsepower", pMType Quantitative, pSort sps ]
                << position Y [ pName yField, pMType Quantitative ]
                << order [ oName yField, oMType Ordinal ]
    in
    toVegaLite [ height 300, data [], enc [], line [ maStrokeWidth 0.5 ] ]


sortAsc : Spec
sortAsc =
    sortQuant "Horsepower" [ soAscending ]


sortDesc : Spec
sortDesc =
    sortQuant "Horsepower" [ soDescending ]


sortWeight : Spec
sortWeight =
    sortQuant "Weight_in_lbs" [ soByField "Weight_in_lbs" opMean ]


sortCustom : Spec
sortCustom =
    let
        data =
            dataFromColumns []
                << dataColumn "a" (strs [ "A", "B", "C", "Z", "Y", "X" ])
                << dataColumn "b" (nums [ 28, 55, 43, 91, 81, 53 ])

        enc =
            encoding
                << position X
                    [ pName "a"
                    , pMType Ordinal
                    , pSort [ soCustom (strs [ "B", "A", "C" ]) ]
                    ]
                << position Y [ pName "b", pMType Quantitative ]
    in
    toVegaLite [ data [], enc [], bar [] ]


stack1 : Spec
stack1 =
    let
        cars =
            dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []

        trans =
            transform
                << aggregate [ opAs opCount "" "count_*" ] [ "Origin", "Cylinders" ]
                << stack "count_*"
                    []
                    "stack_count_Origin1"
                    "stack_count_Origin2"
                    [ stOffset stNormalize, stSort [ stAscending "Origin" ] ]
                << window
                    [ ( [ wiAggregateOp opMin, wiField "stack_count_Origin1" ], "x" )
                    , ( [ wiAggregateOp opMax, wiField "stack_count_Origin2" ], "x2" )
                    ]
                    [ wiFrame Nothing Nothing, wiGroupBy [ "Origin" ] ]
                << stack "count_*"
                    [ "Origin" ]
                    "y"
                    "y2"
                    [ stOffset stNormalize, stSort [ stAscending "Cylinders" ] ]

        enc =
            encoding
                << position X [ pName "x", pMType Quantitative, pAxis [] ]
                << position X2 [ pName "x2", pMType Quantitative ]
                << position Y [ pName "y", pMType Quantitative, pAxis [] ]
                << position Y2 [ pName "y2", pMType Quantitative ]
                << color [ mName "Origin", mMType Nominal ]
                << opacity [ mName "Cylinders", mMType Quantitative, mLegend [] ]
                << tooltips
                    [ [ tName "Origin", tMType Nominal ]
                    , [ tName "Cylinders", tMType Quantitative ]
                    ]
    in
    toVegaLite [ cars, trans [], enc [], rect [] ]


sourceExample : Spec
sourceExample =
    stack1



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "sortAsc", sortAsc )
        , ( "sortDesc", sortDesc )
        , ( "sortWeight", sortWeight )
        , ( "sortCustom", sortCustom )
        , ( "stack1", stack1 )
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
