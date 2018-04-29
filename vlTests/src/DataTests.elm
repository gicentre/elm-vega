port module DataTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode as JE
import VegaLite exposing (..)


showData : Data -> Spec
showData data =
    let
        enc =
            encoding
                << position X [ pName "cat", pMType Nominal ]
                << position Y [ pName "val", pMType Quantitative ]
    in
    toVegaLite [ data, enc [], bar [] ]


data1 : Spec
data1 =
    let
        data =
            dataFromColumns []
                << dataColumn "cat" (strs [ "a", "b", "c" ])
                << dataColumn "val" (nums [ 10, 18, 12 ])
    in
    showData (data [])


data2 : Spec
data2 =
    let
        data =
            dataFromRows []
                << dataRow [ ( "cat", str "a" ), ( "val", num 10 ) ]
                << dataRow [ ( "cat", str "b" ), ( "val", num 18 ) ]
                << dataRow [ ( "cat", str "c" ), ( "val", num 12 ) ]
    in
    showData (data [])


data3 : Spec
data3 =
    let
        json =
            JE.list
                [ JE.object [ ( "cat", JE.string "a" ), ( "val", JE.float 10 ) ]
                , JE.object [ ( "cat", JE.string "b" ), ( "val", JE.float 18 ) ]
                , JE.object [ ( "cat", JE.string "c" ), ( "val", JE.float 12 ) ]
                ]
    in
    showData (dataFromJson json [])


data4 : Spec
data4 =
    showData (dataFromUrl "data/dataTest.csv" [])


data5 : Spec
data5 =
    showData (dataFromUrl "data/dataTest.tsv" [])


data6 : Spec
data6 =
    showData (dataFromUrl "data/dataTest.json" [])


dataSource : String -> Spec
dataSource name =
    let
        dataColumns =
            dataFromColumns []
                << dataColumn "cat" (strs [ "a", "b", "c" ])
                << dataColumn "val" (nums [ 10, 18, 12 ])

        dataRows =
            dataFromRows []
                << dataRow [ ( "cat", str "a" ), ( "val", num 10 ) ]
                << dataRow [ ( "cat", str "b" ), ( "val", num 18 ) ]
                << dataRow [ ( "cat", str "c" ), ( "val", num 12 ) ]

        json =
            JE.list
                [ JE.object [ ( "cat", JE.string "a" ), ( "val", JE.float 10 ) ]
                , JE.object [ ( "cat", JE.string "b" ), ( "val", JE.float 18 ) ]
                , JE.object [ ( "cat", JE.string "c" ), ( "val", JE.float 12 ) ]
                ]

        enc =
            encoding
                << position X [ pName "cat", pMType Nominal ]
                << position Y [ pName "val", pMType Quantitative ]
    in
    toVegaLite
        [ datasets
            [ ( "myData1", dataRows [] )
            , ( "myData2", dataColumns [] )
            , ( "myData3", dataFromJson json [] )
            ]
        , dataFromSource name []
        , enc []
        , bar []
        ]


data7 : Spec
data7 =
    dataSource "myData1"


data8 : Spec
data8 =
    dataSource "myData2"


data9 : Spec
data9 =
    dataSource "myData3"


geodata1 : Spec
geodata1 =
    toVegaLite
        [ width 700
        , height 500
        , configure <| configuration (View [ Stroke Nothing ]) []
        , dataFromUrl "https://vega.github.io/vega-lite/data/londonBoroughs.json" [ topojsonFeature "boroughs" ]
        , geoshape []
        , encoding <| color [ mName "id", mMType Nominal ] []
        ]


geodata2 : Spec
geodata2 =
    let
        geojson =
            geoFeatureCollection
                [ geometry (geoPolygon [ [ ( -3, 52 ), ( 4, 52 ), ( 4, 45 ), ( -3, 45 ), ( -3, 52 ) ] ]) [ ( "Region", str "Southsville" ) ]
                , geometry (geoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 52 ), ( -3, 59 ) ] ]) [ ( "Region", str "Northerton" ) ]
                ]
    in
    toVegaLite
        [ width 300
        , height 400
        , configure <| configuration (View [ Stroke Nothing ]) []
        , dataFromJson geojson [ jsonProperty "features" ]
        , projection [ prType Orthographic ]
        , encoding (color [ mName "properties.Region", mMType Nominal, mLegend [ leTitle "" ] ] [])
        , geoshape []
        ]


sourceExample : Spec
sourceExample =
    data7



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "data1", data1 )
        , ( "data2", data2 )
        , ( "data3", data3 )
        , ( "data4", data4 )
        , ( "data5", data5 )
        , ( "data6", data6 )
        , ( "data7", data7 )
        , ( "data8", data8 )
        , ( "data9", data9 )
        , ( "geodata1", geodata1 )
        , ( "geodata2", geodata2 )
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
            [ Html.text (JE.encode 2 sourceExample) ]
        ]


port elmToJS : Spec -> Cmd msg
