port module ShapeTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


chart : String -> (List a -> List ( String, Spec )) -> Spec
chart des enc =
    toVegaLite
        [ description des
        , dataFromUrl "data/cars.json" []
        , (transform
            << calculateAs "year(datum.Year)" "YearOfManufacture"
            << filter (fiExpr "datum.YearOfManufacture == 1970")
          )
            []
        , point [ maFilled True ]
        , (encoding
            << position X [ pName "Horsepower", pMType Quantitative ]
            << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
            << opacity [ mNum 0.6 ]
            << enc
          )
            []
        ]


unitSquare : String
unitSquare =
    "M -0.5 -0.5 h 1 v 1 h -1z"


largeSquare : String
largeSquare =
    "M -5 -5 h 10 v 10 h -10z"


square : String
square =
    "M -1.5 -1.5 h 3 v 3 h -3z"


tri : String
tri =
    "M -1.5 -1.5 h 3 l -1.5 3z"


cross : String
cross =
    "M -1.5 -1.5 m1 0 h 1 v 1 h 1 v 1 h -1 v 1 h -1  v -1 h -1 v -1 h 1z"


scatter1 : Spec
scatter1 =
    chart "Default nominal shapes."
        (shape [ mName "Origin", mMType Nominal ])


scatter2 : Spec
scatter2 =
    chart "Default ordinal shapes."
        (shape [ mName "Cylinders", mMType Ordinal ])


scatter3 : Spec
scatter3 =
    chart "Enlarged shapes (but legend shapes should remain same size)"
        (shape [ mName "Origin", mMType Nominal ]
            << size [ mNum 200 ]
        )


scatter4 : Spec
scatter4 =
    chart "Reduced shapes (but legend shapes should remain same size)"
        (shape [ mName "Origin", mMType Nominal ]
            << size [ mNum 20 ]
        )


scatter5 : Spec
scatter5 =
    chart "Fixed shape, sized by number of cylinder category"
        (size [ mName "Cylinders", mMType Ordinal ])


scatter6 : Spec
scatter6 =
    chart "Sized by number of cylinders, shape by origin"
        (shape [ mName "Origin", mMType Nominal ]
            << size [ mName "Cylinders", mMType Ordinal ]
        )


scatter7 : Spec
scatter7 =
    chart "Sized and shaped by number of cylinders (should only have a single set of legend items)"
        (shape [ mName "Cylinders", mMType Ordinal ]
            << size [ mName "Cylinders", mMType Ordinal ]
        )


scatter8 : Spec
scatter8 =
    chart "Sized, shaped and coloured by number of cylinders (should only have a single set of legend items)"
        (shape [ mName "Cylinders", mMType Ordinal ]
            << size [ mName "Cylinders", mMType Ordinal ]
            << color [ mName "Cylinders", mMType Ordinal ]
        )


scatter9 : Spec
scatter9 =
    chart "Custom-shaped and coloured by origin (should only have a single set of legend items)"
        (shape [ mName "Origin", mMType Nominal ]
            << color [ mName "Origin", mMType Nominal ]
        )


scatter10 : Spec
scatter10 =
    chart "Custom-shaped and coloured by origin (should only have a single set of legend items)"
        (shape
            [ mName "Origin"
            , mMType Nominal
            , mScale <|
                categoricalDomainMap
                    [ ( "Europe", square )
                    , ( "Japan", cross )
                    , ( "USA", tri )
                    ]
            ]
            << color [ mName "Origin", mMType Nominal ]
        )


scatter11 : Spec
scatter11 =
    chart "Sized, shaped and coloured by number of cylinders (should have two sets of legend items)"
        (shape [ mName "Cylinders", mMType Ordinal ]
            << size [ mName "Cylinders", mMType Ordinal ]
            << color [ mName "Origin", mMType Nominal ]
        )


scatter12 : Spec
scatter12 =
    chart "Custom nominal shape with unit area."
        (shape [ mPath unitSquare ])


scatter13 : Spec
scatter13 =
    chart "Custom nominal shape with unit area sized by Cylinders."
        (shape [ mPath unitSquare ]
            << size [ mName "Cylinders", mMType Ordinal ]
        )


scatter14 : Spec
scatter14 =
    chart "Custom nominal shape with area of 10x10 pixel units."
        (shape [ mPath largeSquare ]
            << color [ mName "Origin", mMType Nominal ]
        )


scatter15 : Spec
scatter15 =
    chart "Custom shape sets encoding origin."
        (shape
            [ mName "Origin"
            , mMType Nominal
            , mScale <|
                categoricalDomainMap
                    [ ( "Europe", square )
                    , ( "Japan", cross )
                    , ( "USA", tri )
                    ]
            ]
        )



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "defNominal", scatter1 )
        , ( "defOrdinal", scatter2 )
        , ( "size1", scatter3 )
        , ( "size2", scatter4 )
        , ( "size3", scatter5 )
        , ( "multi1", scatter6 )
        , ( "multi2", scatter7 )
        , ( "multi3", scatter8 )
        , ( "multi4", scatter9 )
        , ( "multi5", scatter10 )
        , ( "multi6", scatter11 )
        , ( "custom1", scatter12 )
        , ( "custom2", scatter13 )
        , ( "custom3", scatter14 )
        , ( "custom4", scatter15 )
        ]



{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
