port module NullTests exposing (elmToJS)

import Html exposing (Html, div, pre)
import Html.Attributes exposing (id)
import Json.Encode
import VegaLite exposing (..)


axis1 : Spec
axis1 =
    let
        data =
            dataFromColumns []
                << dataColumn "x" (nums [ 0, 1000, 1000, 0, 0, 1000 ])
                << dataColumn "y" (nums [ 1000, 1000, 0, 0, 1000, 0 ])
                << dataColumn "order" (List.range 1 6 |> List.map toFloat |> nums)

        enc =
            encoding
                << position X [ pName "x", pMType Quantitative, pAxis [] ]
                << position Y [ pName "y", pMType Quantitative, pAxis [] ]
                << order [ oName "order", oMType Ordinal ]
    in
    toVegaLite [ data [], enc [], line [] ]


scaleEncode : ( VLProperty, Spec ) -> Spec
scaleEncode enc =
    let
        data =
            dataFromColumns []
                << dataColumn "x" (nums [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ])
                << dataColumn "y" (nums [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
                << dataColumn "val" (nums [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
                << dataColumn "cat" (strs [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j" ])
    in
    toVegaLite [ width 400, height 400, data [], enc, point [] ]


scale0 : Spec
scale0 =
    (encoding
        << position X [ pName "x", pMType Quantitative ]
        << position Y [ pName "y", pMType Quantitative ]
        << color [ mName "val", mMType Ordinal ]
        << size [ mName "val", mMType Quantitative ]
        << shape [ mName "cat", mMType Nominal ]
    )
        []
        |> scaleEncode


scale1 : Spec
scale1 =
    (encoding
        << position X [ pName "x", pMType Quantitative, pScale [] ]
        << position Y [ pName "y", pMType Quantitative ]
        << color [ mName "val", mMType Ordinal ]
        << size [ mName "val", mMType Quantitative ]
        << shape [ mName "cat", mMType Nominal ]
    )
        []
        |> scaleEncode


scale2 : Spec
scale2 =
    (encoding
        << position X [ pName "x", pMType Quantitative ]
        << position Y [ pName "y", pMType Quantitative, pScale [] ]
        << color [ mName "val", mMType Ordinal ]
        << size [ mName "val", mMType Quantitative ]
        << shape [ mName "cat", mMType Nominal ]
    )
        []
        |> scaleEncode


scale3 : Spec
scale3 =
    (encoding
        << position X [ pName "x", pMType Quantitative ]
        << position Y [ pName "y", pMType Quantitative ]
        << color [ mName "val", mMType Ordinal, mScale [] ]
        << size [ mName "val", mMType Quantitative ]
        << shape [ mName "cat", mMType Nominal ]
    )
        []
        |> scaleEncode


scale4 : Spec
scale4 =
    (encoding
        << position X [ pName "x", pMType Quantitative ]
        << position Y [ pName "y", pMType Quantitative ]
        << color [ mName "val", mMType Ordinal ]
        << size [ mName "val", mMType Quantitative, mScale [] ]
        << shape [ mName "cat", mMType Nominal ]
    )
        []
        |> scaleEncode


scale5 : Spec
scale5 =
    (encoding
        << position X [ pName "x", pMType Quantitative ]
        << position Y [ pName "y", pMType Quantitative ]
        << color [ mName "val", mMType Ordinal ]
        << size [ mName "val", mMType Quantitative ]
        << shape [ mName "cat", mMType Nominal, mScale [] ]
    )
        []
        |> scaleEncode


sourceExample : Spec
sourceExample =
    axis1



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "axis1", axis1 )
        , ( "scale0", scale0 )
        , ( "scale1", scale1 )
        , ( "scale2", scale2 )
        , ( "scale3", scale3 )
        , ( "scale4", scale4 )
        , ( "scale5", scale5 )
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
