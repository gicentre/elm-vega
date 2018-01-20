port module ColorTests exposing (elmToJS)

import Json.Encode
import Platform
import VegaLite exposing (..)


chart : String -> (List a -> List ( String, Spec )) -> Spec
chart des enc =
    toVegaLite
        [ description des
        , dataFromUrl "data/cars.json" []
        , mark Circle []
        , (encoding
            << position X [ PName "Horsepower", PmType Quantitative ]
            << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
            << size [ MNumber 60 ]
            << opacity [ MNumber 1 ]
            << enc
          )
            []
        ]


defContinuous : Spec
defContinuous =
    chart "Default continuous colour scales."
        (color [ MName "Acceleration", MmType Quantitative ])


defOrdinal : Spec
defOrdinal =
    chart "Default ordinal colour scales."
        (color [ MName "Cylinders", MmType Ordinal ])


defNominal : Spec
defNominal =
    chart "Default nominal colour scales."
        (color [ MName "Origin", MmType Nominal ])


namedContinuous1 : Spec
namedContinuous1 =
    chart "Continuous colour scale based on named vega schame. Should use the entire plasma colour scheme."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SScheme "plasma" [] ] ])


namedContinuous2 : Spec
namedContinuous2 =
    chart "Continuous colour scale based on named vega schame. Should use the upper half of the plasma colour scheme."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SScheme "plasma" [ 0.5, 1 ] ] ])


namedContinuous3 : Spec
namedContinuous3 =
    chart "Continuous colour scale based on named vega schame. Should use the flipped plasma colour scheme (i.e. red to orange)."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SScheme "plasma" [], SReverse True ] ])


namedContinuous4 : Spec
namedContinuous4 =
    chart "Continuous colour scale based on named vega schame. Should use the first half of the flipped plasma colour scheme (i.e. red to orange)."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SScheme "plasma" [ 0, 0.5 ], SReverse True ] ])


customContinuous : Spec
customContinuous =
    chart "Custom continuous colour scheme (red to blue ramp)."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SRange (RStrings [ "#f33", "#33f" ]) ] ])


customDiscrete : Spec
customDiscrete =
    chart "Custom discrete colours (red, green, blue)."
        (color [ MName "Origin", MmType Nominal, MScale [ SRange (RStrings [ "#e33", "#3a3", "#33d" ]) ] ])


scale1 : Spec
scale1 =
    chart "Sequential (default) colour scale."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SType ScSequential, SRange (RStrings [ "yellow", "red" ]) ] ])


scale2 : Spec
scale2 =
    chart "Linear colour scale."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


scale3 : Spec
scale3 =
    chart "Power colour scale."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SType ScPow, SRange (RStrings [ "yellow", "red" ]) ] ])


scale4 : Spec
scale4 =
    chart "Square root colour scale."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SType ScSqrt, SRange (RStrings [ "yellow", "red" ]) ] ])


scale5 : Spec
scale5 =
    chart "Log colour scale."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SType ScLog, SRange (RStrings [ "yellow", "red" ]) ] ])


interp1 : Spec
interp1 =
    chart "HSL interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate Hsl, SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp2 : Spec
interp2 =
    chart "HSL-long interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate HslLong, SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp3 : Spec
interp3 =
    chart "Lab interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate Lab, SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp4 : Spec
interp4 =
    chart "HCL interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate Hcl, SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp5 : Spec
interp5 =
    chart "HCL-long interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate HclLong, SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp6 : Spec
interp6 =
    chart "Cube-helix interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelix 1), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


interp7 : Spec
interp7 =
    chart "Cube-helix-long interpolation."
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong 1), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


gamma1 : Spec
gamma1 =
    chart "Cube-helix-long interpolation, gamma of -0.1"
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong -0.1), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


gamma2 : Spec
gamma2 =
    chart "Cube-helix-long interpolation, gamma of 0"
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong 0), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


gamma3 : Spec
gamma3 =
    chart "Cube-helix-long interpolation with default gamma value of 1"
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong 1), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


gamma4 : Spec
gamma4 =
    chart "Cube-helix-long interpolation, gamma of 2"
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong 2), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])


gamma5 : Spec
gamma5 =
    chart "Cube-helix-long interpolation, gamma of 10"
        (color [ MName "Acceleration", MmType Quantitative, MScale [ SInterpolate (CubeHelixLong 10), SType ScLinear, SRange (RStrings [ "yellow", "red" ]) ] ])



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    Json.Encode.object
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
        , ( "scale1", scale2 )
        , ( "scale1", scale3 )
        , ( "scale1", scale4 )
        , ( "scale1", scale5 )
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


main : Program Never Spec msg
main =
    Platform.program
        { init = ( mySpecs, elmToJS mySpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
