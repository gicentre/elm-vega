port module Spc exposing (elmToJS)

import Browser
import Html exposing (Html, button, div, h2, p, span)
import Html.Attributes exposing (id, style)
import Html.Events
import VegaLite exposing (..)


{-| Basic time series.
-}
spc1 : Spec
spc1 =
    let
        enc =
            encoding
                << position X [ pName "month", pMType Temporal ]
                << position Y [ pName "crimes", pMType Quantitative ]
    in
    toVegaLite
        [ width 500, height 200, spcData, line [], enc [] ]


spc2 : Spec
spc2 =
    toVegaLite
        [ config, spcData, line [], encLine ]


spc3 : Spec
spc3 =
    toVegaLite
        [ config
        , spcData
        , layer
            (List.map sdLine [ 0, 1.5, -1.5, 2, -2, 3, -3 ]
                ++ [ asSpec [ line [], encLine ] ]
            )
        ]


spc4 : Spec
spc4 =
    let
        specLine =
            asSpec [ line [], encLine ]

        encPoint =
            encoding
                << position X [ pName "month", pMType Temporal, pAxis [] ]
                << position Y [ pName "crimes", pMType Quantitative, pAxis [] ]
                << color [ mName "shiftDirection", mMType Nominal, mScale shiftColours, mLegend [] ]
                << shape [ mName "shifts", mMType Nominal, mScale shiftShapes, mLegend [] ]
                << size [ mNum 60 ]

        specPoint =
            asSpec [ point [ maFilled True ], encPoint [] ]
    in
    toVegaLite
        [ config
        , spcData
        , layer
            (List.map sdLine [ 0, 1.5, -1.5, 2, -2, 3, -3 ]
                ++ [ specLine, specPoint ]
            )
        ]


spc5 : Spec
spc5 =
    let
        trans =
            transform
                << filter (fiExpr "datum.shiftDirection != 'normal'")

        encShifts =
            encoding
                << position X [ pName "month", pMType Temporal, pAxis [] ]
                << position Y [ pName "crimes", pMType Quantitative, pAxis [] ]
                << color [ mName "shiftDirection", mMType Nominal, mScale shiftColours, mLegend [] ]
                << detail [ dName "groups", dMType Ordinal ]

        specLine =
            asSpec [ line [ maStrokeWidth 1.4 ], encLine ]

        specShifts =
            asSpec [ trans [], line [], encShifts [] ]
    in
    toVegaLite
        [ config
        , spcData
        , layer (List.map sdRegion [ 3.5, 3, 2, 1.5 ] ++ [ sdLine 0, specLine, specShifts ])
        ]


cusum1 : Spec
cusum1 =
    let
        specCusum =
            asSpec [ line [], encCusum ]

        encZeroLine =
            encoding
                << position Y [ pName "zeroLine", pMType Quantitative, pAxis [] ]
                << color [ mStr "rgb(62,156,167)" ]

        specZeroLine =
            asSpec [ rule [], encZeroLine [] ]
    in
    toVegaLite
        [ config, cusumData -1, layer [ specZeroLine, specCusum ] ]


cusum2 : Spec
cusum2 =
    let
        specCusum =
            asSpec [ line [], encCusum ]

        encZeroLine =
            encoding
                << position Y [ pName "zeroLine", pMType Quantitative, pAxis [] ]
                << color [ mStr "rgb(62,156,167)" ]

        specZeroLine =
            asSpec [ rule [], encZeroLine [] ]
    in
    toVegaLite
        [ config, cusumData 21, layer [ specZeroLine, specCusum ] ]


cusum3 : Spec
cusum3 =
    let
        specCusum =
            asSpec [ line [], encCusum ]

        encZeroLine =
            encoding
                << position Y [ pName "zeroLine", pMType Quantitative, pAxis [] ]
                << color [ mStr "rgb(62,156,167)" ]

        specZeroLine =
            asSpec [ rule [], encZeroLine [] ]
    in
    toVegaLite
        [ config, cusumData 24, layer [ specZeroLine, specCusum ] ]


cusumInteractive : Float -> Spec
cusumInteractive baseline =
    let
        specCusum =
            asSpec [ line [], encCusum ]

        encZeroLine =
            encoding
                << position Y [ pName "zeroLine", pMType Quantitative, pAxis [] ]
                << color [ mStr "rgb(62,156,167)" ]

        specZeroLine =
            asSpec [ rule [], encZeroLine [] ]
    in
    toVegaLite
        [ config, width 550, autosize [ asFit, asContent ], cusumData baseline, layer [ specZeroLine, specCusum ] ]


specs : Spec
specs =
    combineSpecs
        [ ( "lineChart", spc1 )
        , ( "lineChartFormatted", spc2 )
        , ( "spcWithRules", spc3 )
        , ( "spcWithRulesAndPoints", spc4 )
        , ( "spcWithRegions", spc5 )
        , ( "cusumMean", cusum1 )
        , ( "cusumStrict", cusum2 )
        , ( "cusumInteractive", cusumInteractive meanCrimes )
        ]


dynamicSpecs : Float -> Spec
dynamicSpecs x =
    combineSpecs [ ( "cusumInteractive", cusumInteractive x ) ]


meanCrimes : Float
meanCrimes =
    List.map Tuple.second rawData |> mean



{- ----------------------------------------------------------------------------
   elm-vega spec helper functions
-}


spcData : ( VLProperty, Spec )
spcData =
    let
        month =
            List.map Tuple.first rawData

        numCrimes =
            List.map Tuple.second rawData

        shift =
            shifts numCrimes

        shiftDir =
            shiftDirection shift
    in
    (dataFromColumns []
        << dataColumn "month" (strs month)
        << dataColumn "crimes" (nums numCrimes)
        << dataColumn "shifts" (strs shift)
        << dataColumn "shiftDirection" (strs shiftDir)
        << dataColumn "groups" (nums (runGroups shiftDir))
    )
        []


cusumData : Float -> ( VLProperty, Spec )
cusumData x =
    let
        baseline =
            if x < 0 then
                mean numCrimes

            else
                x

        month =
            List.map Tuple.first rawData

        numCrimes =
            List.map Tuple.second rawData
    in
    (dataFromColumns []
        << dataColumn "month" (strs month)
        << dataColumn "crimes" (nums numCrimes)
        << dataColumn "cusum" (nums (cusum baseline numCrimes))
        << dataColumn "zeroLine" (nums [ 0 ])
    )
        []


config : ( VLProperty, Spec )
config =
    (configure
        << configuration (coView [ vicoStroke Nothing, vicoWidth 500, vicoHeight 220 ])
        << configuration (coBackground "#fffff8")
        << configuration (coAxis [ axcoLabelFont "ETBembo", axcoTitleFont "ETBembo" ])
    )
        []


encLine : ( VLProperty, Spec )
encLine =
    (encoding
        << position X [ pName "month", pMType Temporal, pAxis [ axTitle "", axDomain False, axGrid False, axFormat "%Y" ], pScale [ scNice niYear ] ]
        << position Y [ pName "crimes", pMType Quantitative, pAxis [ axGrid False ] ]
        << color [ mStr "#777" ]
    )
        []


encCusum : ( VLProperty, Spec )
encCusum =
    (encoding
        << position X [ pName "month", pMType Temporal, pAxis [ axTitle "", axDomain False, axGrid False, axFormat "%Y" ], pScale [ scNice niYear ] ]
        << position Y [ pName "cusum", pMType Quantitative, pAxis [ axTitle "Crimes above/below target (thousands)" ] ]
        << color [ mStr "#777" ]
    )
        []


sdLine : Float -> Spec
sdLine n =
    let
        trans =
            transform
                << aggregate [ opAs opMean "crimes" "mean", opAs opStdev "crimes" "stdev" ] []
                << calculateAs ("datum.mean + " ++ String.fromFloat n ++ "*datum.stdev") "sd"

        enc =
            encoding
                << position Y
                    [ pName "sd"
                    , pMType Quantitative
                    , pScale [ scDomain (doNums [ 12, 32 ]) ]
                    , pAxis [ axGrid False, axTitle "Crimes (thousands)" ]
                    ]
                << color [ mStr "rgb(62,156,167)" ]

        dash =
            if abs n == 1.5 then
                [ maStrokeDash [ 12, 12 ] ]

            else if abs n == 2 then
                [ maStrokeDash [ 6, 6 ] ]

            else if abs n == 3 then
                [ maStrokeDash [ 3, 4 ] ]

            else
                []
    in
    asSpec [ trans [], rule dash, enc [] ]


sdRegion : Float -> Spec
sdRegion n =
    let
        trans =
            transform
                << aggregate [ opAs opMean "crimes" "mean", opAs opStdev "crimes" "stdev" ] []
                << calculateAs ("datum.mean + " ++ String.fromFloat n ++ "*datum.stdev") "upper"
                << calculateAs ("datum.mean - " ++ String.fromFloat n ++ "*datum.stdev") "lower"

        fillCol =
            if abs n == 1.5 then
                [ maFill "#fffff8" ]

            else if abs n == 2 then
                [ maFill "rgb(247,251,244)" ]

            else if abs n == 3 then
                [ maFill "rgb(240,247,241)" ]

            else
                [ maFill "rgb(234,244,238)" ]

        enc =
            encoding
                << position Y [ pName "upper", pMType Quantitative, pScale [ scDomain (doNums [ 12, 32 ]) ], pAxis [] ]
                << position Y2 [ pName "lower", pMType Quantitative ]
    in
    asSpec [ trans [], rect fillCol, enc [] ]



{- ----------------------------------------------------------------------------
   data helper functions
-}


shifts : List Float -> List String
shifts xs =
    let
        average =
            mean xs

        sd =
            stdevp xs

        runAboveMean =
            runs 7 (\x -> x > average) xs

        runBelowMean =
            runs 7 (\x -> x < average) xs

        aboveSd2 =
            List.map (\x -> x > average + sd * 2) xs

        belowSd2 =
            List.map (\x -> x < average - sd * 2) xs

        upperOutlier =
            List.map (\x -> x > average + sd * 3) xs

        lowerOutlier =
            List.map (\x -> x < average - sd * 3) xs

        toShift xss =
            case xss of
                [ uOutlier, lOutlier, abM, beM, abSd2, beSd2 ] ->
                    if uOutlier then
                        "upperOutlier"

                    else if abSd2 then
                        "above2SD"

                    else if abM then
                        "aboveMean"

                    else if lOutlier then
                        "lowerOutlier"

                    else if beSd2 then
                        "below2SD"

                    else if beM then
                        "belowMean"

                    else
                        "normal"

                _ ->
                    "normal"
    in
    transpose [ upperOutlier, lowerOutlier, runAboveMean, runBelowMean, aboveSd2, belowSd2 ]
        |> List.map toShift


shiftDirection : List String -> List String
shiftDirection =
    let
        toDirection shift =
            case shift of
                "upperOutlier" ->
                    "above"

                "above2SD" ->
                    "above"

                "aboveMean" ->
                    "above"

                "lowerOutlier" ->
                    "below"

                "below2SD" ->
                    "below"

                "belowMean" ->
                    "below"

                _ ->
                    "normal"
    in
    List.map toDirection


shiftColours : List ScaleProperty
shiftColours =
    categoricalDomainMap
        [ ( "above", "rgb(202,0,32)" )
        , ( "normal", "rgb(119,119,119)" )
        , ( "below", "rgb(5,113,176)" )
        ]


shiftShapes : List ScaleProperty
shiftShapes =
    categoricalDomainMap
        [ ( "upperOutlier", "triangle-up" )
        , ( "above2SD", "diamond" )
        , ( "aboveMean", "circle" )
        , ( "normal", " " )
        , ( "belowMean", "circle" )
        , ( "below2SD", "diamond" )
        , ( "lowerOutlier", "triangle-down" )
        ]



{- The code below creates an Elm module that opens an outgoing port to Javascript
   and sends both the specs and DOM node to it.
-}


main : Program () Model Msg
main =
    Browser.element
        { init = always ( Model meanCrimes specs, elmToJS specs )
        , view = view
        , update = update
        , subscriptions = always Sub.none -- No need to use subscriptions as we are not repsonding to any JavaScript.
        }



-- Model


type alias Model =
    { num : Float
    , spec : Spec
    }


port elmToJS : Spec -> Cmd msg



-- View


view : Model -> Html Msg
view model =
    div []
        [ div [ id "cusumInteractive" ] []
        , div []
            [ Html.input
                [ Html.Attributes.type_ "range"
                , Html.Attributes.min "15"
                , Html.Attributes.max "25"
                , Html.Attributes.step "0.01"
                , Html.Attributes.value (String.fromFloat model.num)
                , Html.Events.onInput Update
                ]
                []
            , " Baseline: " ++ (model.num + 0.0001 |> String.fromFloat |> String.left 5) |> Html.text
            ]
        , button [ Html.Events.onClick Reset ] [ Html.text "Reset to average" ]
        ]



-- Update


type Msg
    = Update String
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Update sliderVal ->
            let
                baseline =
                    String.toFloat sliderVal |> Maybe.withDefault 0

                newModel =
                    { model
                        | num = baseline
                        , spec = dynamicSpecs baseline
                    }
            in
            ( newModel, elmToJS newModel.spec )

        Reset ->
            let
                baseline =
                    meanCrimes

                newModel =
                    { model
                        | num = baseline
                        , spec = dynamicSpecs baseline
                    }
            in
            ( newModel, elmToJS newModel.spec )



{- ---------------------------------------------------------------------------
   General Functions
-}


mean : List Float -> Float
mean xs =
    if xs == [] then
        0

    else
        List.sum xs / toFloat (List.length xs)


stdevp : List Float -> Float
stdevp xs =
    let
        av =
            mean xs
    in
    xs |> List.map (\x -> (x - av) * (x - av)) |> mean |> sqrt


cusum : Float -> List Float -> List Float
cusum baseline =
    scanl (\x acc -> acc + (x - baseline)) 0
        >> List.drop 1



--List.map (\( bl, x ) -> bl) baseLine


{-| Create a list of adjacent pairs from a list.

    pairs [ 1, 2, 3, 4, 5 ] == [ ( 1, 2 ), ( 2, 3 ), ( 3, 4 ), ( 4, 5 ) ]

-}
pairs : List a -> List ( a, a )
pairs xs =
    let
        n =
            List.length xs
    in
    if n < 2 then
        []

    else
        List.map2 (\a b -> ( a, b )) (List.take (n - 1) xs) (List.drop 1 xs)


{-| A list of whether each item in a list is part of a run of n or more that
satisfy a predicate.

    runs 3 isEven [ 2, 2, 3, 4, 6, 8 ] == [ False, False, False, True, True, True ]

-}
runs : Int -> (a -> Bool) -> List a -> List Bool
runs n predicate =
    let
        run bs =
            if (bs |> List.filter identity |> List.length) >= n then
                List.map (always True) bs

            else
                List.map (always False) bs
    in
    List.map predicate
        >> pack
        >> List.concatMap run


{-| A list of consecutive group indices of a given list where 0 is the first run
of consecutive items, 1 is the second etc..

    runGroups [ 8, 2, 2, 2, 0, 0, 5 ] == [ 0, 1, 1, 1, 2, 2, 3 ]

-}
runGroups : List a -> List Float
runGroups =
    pack
        >> List.indexedMap (\i ys -> List.map (always i) ys)
        >> List.concat
        >> List.map toFloat


{-| A list of lists of sequentially identical items occuring in a given list.

    pack [ 8, 2, 2, 2, 0, 0, 5 ] == [ [ 8 ], [ 2, 2, 2 ], [ 0, 0 ], [ 5 ] ]

-}
pack : List a -> List (List a)
pack list =
    case list of
        [] ->
            []

        hd :: tl ->
            let
                restOfList =
                    dropWhile (\a -> hd == a) list
            in
            takeWhile (\a -> hd == a) list :: pack restOfList


{-| Drop items from the start of a list until an item does not satisfy the given
predicate.

    dropWhile (\a -> a < 5) <| List.range 1 10 == [ 5, 6, 7, 8, 9, 10 ]

-}
dropWhile : (a -> Bool) -> List a -> List a
dropWhile predicate list =
    case list of
        [] ->
            []

        hd :: tl ->
            if predicate hd then
                dropWhile predicate tl

            else
                list


{-| Take items from the start of a list until an item does not satisfy the given
predicate.

    takeWhile (\a -> a < 5) <| List.range 1 10 == [ 1, 2, 3, 4 ]

-}
takeWhile : (a -> Bool) -> List a -> List a
takeWhile predicate list =
    case list of
        [] ->
            []

        hd :: tl ->
            if predicate hd then
                hd :: takeWhile predicate tl

            else
                []


{-| Transposes a list of lists, swappings rows for columns.
-}
transpose : List (List a) -> List (List a)
transpose ll =
    let
        heads =
            List.filterMap List.head ll

        tails =
            List.filterMap List.tail ll
    in
    if List.length heads == List.length ll then
        heads :: transpose tails

    else
        []


{-| Functional scanning (replaces built-in scanl available in elm 0.18)
-}
scanl : (a -> b -> b) -> b -> List a -> List b
scanl fn b =
    let
        scan a bs =
            case bs of
                hd :: tl ->
                    fn a hd :: bs

                _ ->
                    []
    in
    List.foldl scan [ b ] >> List.reverse



{- ---------------------------------------------------------------------------
   Data
-}


rawData : List ( String, Float )
rawData =
    [ ( "2011-01", 25.5 )
    , ( "2011-02", 25.7 )
    , ( "2011-03", 28.8 )
    , ( "2011-04", 31.3 )
    , ( "2011-05", 30.0 )
    , ( "2011-06", 29.0 )
    , ( "2011-07", 30.2 )
    , ( "2011-08", 28.7 )
    , ( "2011-09", 24.1 )
    , ( "2011-10", 24.2 )
    , ( "2011-11", 22.7 )
    , ( "2011-12", 20.8 )
    , ( "2012-01", 20.9 )
    , ( "2012-02", 20.9 )
    , ( "2012-03", 22.9 )
    , ( "2012-04", 20.6 )
    , ( "2012-05", 22.1 )
    , ( "2012-06", 20.4 )
    , ( "2012-07", 22.1 )
    , ( "2012-08", 20.3 )
    , ( "2012-09", 22.7 )
    , ( "2012-10", 22.9 )
    , ( "2012-11", 20.9 )
    , ( "2012-12", 21.4 )
    , ( "2013-01", 20.4 )
    , ( "2013-02", 19.1 )
    , ( "2013-03", 20.6 )
    , ( "2013-04", 18.5 )
    , ( "2013-05", 19.8 )
    , ( "2013-06", 20.6 )
    , ( "2013-07", 21.3 )
    , ( "2013-08", 21.4 )
    , ( "2013-09", 24.1 )
    , ( "2013-10", 22.9 )
    , ( "2013-11", 20.3 )
    , ( "2013-12", 20.8 )
    , ( "2014-01", 19.8 )
    , ( "2014-02", 19.0 )
    , ( "2014-03", 18.6 )
    , ( "2014-04", 17.6 )
    , ( "2014-05", 20.6 )
    , ( "2014-06", 20.1 )
    , ( "2014-07", 20.8 )
    , ( "2014-08", 21.9 )
    , ( "2014-09", 22.9 )
    , ( "2014-10", 21.3 )
    , ( "2014-11", 21.4 )
    , ( "2014-12", 21.1 )
    , ( "2015-01", 20.3 )
    , ( "2015-02", 18.5 )
    , ( "2015-03", 19.1 )
    , ( "2015-04", 17.8 )
    , ( "2015-05", 19.8 )
    , ( "2015-06", 19.9 )
    , ( "2015-07", 20.6 )
    , ( "2015-08", 21.4 )
    , ( "2015-09", 21.8 )
    , ( "2015-10", 20.6 )
    , ( "2015-11", 20.3 )
    , ( "2015-12", 21.4 )
    , ( "2016-01", 20.4 )
    , ( "2016-02", 19.8 )
    , ( "2016-03", 19.9 )
    , ( "2016-04", 19.5 )
    , ( "2016-05", 20.9 )
    , ( "2016-06", 20.3 )
    , ( "2016-07", 22.3 )
    , ( "2016-08", 21.8 )
    , ( "2016-09", 23.2 )
    , ( "2016-10", 22.7 )
    , ( "2016-11", 22.4 )
    , ( "2016-12", 23.9 )
    , ( "2017-01", 21.9 )
    , ( "2017-02", 21.3 )
    ]
