port module TemporalTests exposing (elmToJS)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode
import Vega exposing (..)


dPath : String
dPath =
    "https://gicentre.github.io/data/"


temporalTest1 : Spec
temporalTest1 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str (dPath ++ "timeTest.tsv"))
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                    |> transform
                        [ trFormula "datetime(year(datum.date),month(datum.date),0,0,0,0,0)" "year"
                        , trAggregate
                            [ agOps [ opMean ]
                            , agFields [ field "temperature" ]
                            , agGroupBy [ field "year" ]
                            , agAs [ "meanTemperature" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "timeData", daField (field "year") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "timeData", daField (field "meanTemperature") ])
                    , scRange raHeight
                    , scZero false
                    ]

        ax =
            axes
                << axis "xScale"
                    siBottom
                    [ axTemporalTickCount month (num 1)
                    , axLabelAngle (num 60)
                    , axLabelAlign haLeft
                    ]
                << axis "yScale" siLeft []

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "year") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 200, padding 5, ds, sc [], ax [], mk [] ]


temporalTest2 : Spec
temporalTest2 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str (dPath ++ "timeTest.tsv"))
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                    |> transform
                        [ trTimeUnit (field "date") [ tbUnits [ month ] ]
                        , trFormula "datetime(2012,month(datum.unit0),0,0,0,0,0)" "month"
                        , trAggregate
                            [ agOps [ opMean ]
                            , agFields [ field "temperature" ]
                            , agGroupBy [ field "month" ]
                            , agAs [ "meanTemperature" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "timeData", daField (field "month") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "timeData", daField (field "meanTemperature") ])
                    , scRange raHeight
                    , scZero false
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axFormat (str "%B") ]
                << axis "yScale" siLeft []

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "month") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    ]
                << mark symbol
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "month") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 200, padding 5, ds, sc [], ax [], mk [] ]


temporalTest3 : Spec
temporalTest3 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str (dPath ++ "timeTest.tsv"))
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                    |> transform
                        [ trTimeUnit (field "date") [ tbUnits [ dayOfYear ] ]
                        , trFormula "dayofyear(datum.unit0)" "doy"
                        , trAggregate
                            [ agOps [ opMean ]
                            , agFields [ field "temperature" ]
                            , agGroupBy [ field "doy" ]
                            , agAs [ "meanTemperature" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scSequential
                    , scDomain (doData [ daDataset "timeData", daField (field "doy") ])
                    , scRange raWidth
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scDomain (doData [ daDataset "timeData", daField (field "meanTemperature") ])
                    , scRange raHeight
                    , scZero false
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "Day of year") ]
                << axis "yScale" siLeft []

        mk =
            marks
                << mark line
                    [ mFrom [ srData (str "timeData") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "doy") ]
                            , maY [ vScale "yScale", vField (field "meanTemperature") ]
                            , maStrokeWidth [ vNum 0.5 ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 800, height 200, padding 5, ds, sc [], ax [], mk [] ]


temporalTest4 : Spec
temporalTest4 =
    let
        ds =
            dataSource
                [ data "timeData"
                    [ daUrl (str (dPath ++ "timeTest.tsv"))
                    , daFormat [ tsv, parse [ ( "date", foDate "%d/%m/%y %H:%M" ) ] ]
                    ]
                , data "binned" [ daSource "timeData" ]
                    |> transform
                        [ trBin (field "temperature") (nums [ 0, 30 ]) [ bnStep (num 1) ]
                        , trAggregate
                            [ agFields [ field "temperature", field "date" ]
                            , agGroupBy [ field "bin0", field "bin1" ]
                            , agOps [ opCount, opMean ]
                            , agAs [ "count", "meanDate" ]
                            ]
                        ]
                ]

        sc =
            scales
                << scale "xScale"
                    [ scType scLinear
                    , scRange raWidth
                    , scDomain (doData [ daDataset "timeData", daField (field "temperature") ])
                    ]
                << scale "yScale"
                    [ scType scLinear
                    , scRange raHeight
                    , scRound true
                    , scDomain (doData [ daDataset "binned", daField (field "count") ])
                    , scZero true
                    , scNice niTrue
                    ]
                << scale "cScale"
                    [ scType scTime
                    , scDomain (doData [ daDataset "binned", daField (field "meanDate") ])
                    , scRange raRamp
                    ]

        ax =
            axes
                << axis "xScale" siBottom [ axTitle (str "temperature (C)") ]

        lg =
            legends
                << legend
                    [ leFill "cScale"
                    , leType ltGradient
                    , leFormat (str "%b %Y")
                    , leTemporalTickCount month (num 6)
                    ]

        mk =
            marks
                << mark rect
                    [ mFrom [ srData (str "binned") ]
                    , mEncode
                        [ enUpdate
                            [ maX [ vScale "xScale", vField (field "bin0") ]
                            , maX2 [ vScale "xScale", vField (field "bin1"), vOffset (vNum -0.5) ]
                            , maY [ vScale "yScale", vField (field "count") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            , maFill [ vScale "cScale", vField (field "meanDate") ]
                            ]
                        ]
                    ]
    in
    toVega
        [ width 500, height 200, padding 5, ds, sc [], ax [], lg [], mk [] ]



{- This list comprises the specifications to be provided to the Vega runtime. -}


specs : List ( String, Spec )
specs =
    [ ( "temporalTest1", temporalTest1 )
    , ( "temporalTest2", temporalTest2 )
    , ( "temporalTest3", temporalTest3 )
    , ( "temporalTest4", temporalTest4 )
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
