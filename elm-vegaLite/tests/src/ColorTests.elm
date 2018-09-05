port module ColorTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


chart : String -> (List a -> List ( String, Spec )) -> Spec
chart des enc =
    toVegaLite
        [ description des
        , dataFromUrl "data/cars.json" []
        , circle []
        , (encoding
            << position X [ pName "Horsepower", pMType Quantitative ]
            << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
            << size [ mNum 60 ]
            << opacity [ mNum 1 ]
            << enc
          )
            []
        ]


defContinuous : Spec
defContinuous =
    chart "Default continuous colour scales."
        (color [ mName "Acceleration", mMType Quantitative ])


defOrdinal : Spec
defOrdinal =
    chart "Default ordinal colour scales."
        (color [ mName "Cylinders", mMType Ordinal ])


defNominal : Spec
defNominal =
    chart "Default nominal colour scales."
        (color [ mName "Origin", mMType Nominal ])


namedContinuous1 : Spec
namedContinuous1 =
    chart "Continuous colour scale based on named vega schame. Should use the entire plasma colour scheme."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scScheme "plasma" [] ] ])


namedContinuous2 : Spec
namedContinuous2 =
    chart "Continuous colour scale based on named vega schame. Should use the upper half of the plasma colour scheme."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scScheme "plasma" [ 0.5, 1 ] ] ])


namedContinuous3 : Spec
namedContinuous3 =
    chart "Continuous colour scale based on named vega schame. Should use the flipped plasma colour scheme (i.e. red to orange)."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scScheme "plasma" [], scReverse True ] ])


namedContinuous4 : Spec
namedContinuous4 =
    chart "Continuous colour scale based on named vega schame. Should use the first half of the flipped plasma colour scheme (i.e. red to orange)."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scScheme "plasma" [ 0, 0.5 ], scReverse True ] ])


customContinuous : Spec
customContinuous =
    chart "Custom continuous colour scheme (red to blue ramp)."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scRange (raStrs [ "#f33", "#33f" ]) ] ])


customDiscrete : Spec
customDiscrete =
    chart "Custom discrete colours (red, green, blue)."
        (color [ mName "Origin", mMType Nominal, mScale [ scRange (raStrs [ "#e33", "#3a3", "#33d" ]) ] ])


scale1 : Spec
scale1 =
    chart "Sequential (default) colour scale."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scType scSequential, scRange (raStrs [ "yellow", "red" ]) ] ])


scale2 : Spec
scale2 =
    chart "Linear colour scale."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


scale3 : Spec
scale3 =
    chart "Power colour scale."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scType scPow, scRange (raStrs [ "yellow", "red" ]) ] ])


scale4 : Spec
scale4 =
    chart "Square root colour scale."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scType scSqrt, scRange (raStrs [ "yellow", "red" ]) ] ])


scale5 : Spec
scale5 =
    chart "Log colour scale."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scType scLog, scRange (raStrs [ "yellow", "red" ]) ] ])


interp1 : Spec
interp1 =
    chart "HSL interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate hsl, scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp2 : Spec
interp2 =
    chart "HSL-long interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate hslLong, scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp3 : Spec
interp3 =
    chart "Lab interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate lab, scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp4 : Spec
interp4 =
    chart "HCL interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate hcl, scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp5 : Spec
interp5 =
    chart "HCL-long interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate hclLong, scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp6 : Spec
interp6 =
    chart "cube-helix interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelix 1), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


interp7 : Spec
interp7 =
    chart "cube-helix-long interpolation."
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong 1), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


gamma1 : Spec
gamma1 =
    chart "cube-helix-long interpolation, gamma of -0.1"
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong -0.1), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


gamma2 : Spec
gamma2 =
    chart "cube-helix-long interpolation, gamma of 0"
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong 0), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


gamma3 : Spec
gamma3 =
    chart "cube-helix-long interpolation with default gamma value of 1"
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong 1), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


gamma4 : Spec
gamma4 =
    chart "cube-helix-long interpolation, gamma of 2"
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong 2), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])


gamma5 : Spec
gamma5 =
    chart "cube-helix-long interpolation, gamma of 10"
        (color [ mName "Acceleration", mMType Quantitative, mScale [ scInterpolate (cubeHelixLong 10), scType scLinear, scRange (raStrs [ "yellow", "red" ]) ] ])



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "defContinuous", defContinuous )
        , ( "defOrdinal", defOrdinal )
        , ( "defNominal", defNominal )
        , ( "namedContinuous1", namedContinuous1 )
        , ( "namedContinuous2", namedContinuous2 )
        , ( "namedContinuous3", namedContinuous3 )
        , ( "namedContinuous4", namedContinuous4 )
        , ( "customContinuous", customContinuous )
        , ( "customDiscrete", customDiscrete )
        , ( "scale1", scale1 )
        , ( "scale2", scale2 )
        , ( "scale3", scale3 )
        , ( "scale4", scale4 )
        , ( "scale5", scale5 )
        , ( "interp1", interp1 )
        , ( "interp2", interp2 )
        , ( "interp3", interp3 )
        , ( "interp4", interp4 )
        , ( "interp5", interp5 )
        , ( "interp6", interp6 )
        , ( "interp7", interp7 )
        , ( "gamma1", gamma1 )
        , ( "gamma2", gamma2 )
        , ( "gamma3", gamma3 )
        , ( "gamma4", gamma4 )
        , ( "gamma5", gamma5 )
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
