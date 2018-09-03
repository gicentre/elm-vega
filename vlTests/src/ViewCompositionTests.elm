port module ViewCompositionTests exposing (elmToJS)

import Platform
import VegaLite exposing (..)


genderChart : List HeaderProperty -> List HeaderProperty -> Spec
genderChart hdProps cProps =
    let
        conf =
            configure << configuration (coHeader cProps)

        pop =
            dataFromUrl "https://vega.github.io/vega-lite/data/population.json" []

        trans =
            transform
                << filter (fiExpr "datum.year == 2000")
                << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

        enc =
            encoding
                << column
                    [ fName "gender"
                    , fMType Nominal
                    , fHeader hdProps
                    ]
                << position X
                    [ pName "age"
                    , pMType Ordinal
                    , pScale [ scRangeStep (Just 17) ]
                    ]
                << position Y
                    [ pName "people"
                    , pMType Quantitative
                    , pAggregate opSum
                    , pAxis [ axTitle "Population" ]
                    ]
                << color
                    [ mName "gender"
                    , mMType Nominal
                    , mScale [ scRange (raStrs [ "#EA98D2", "#659CCA" ]) ]
                    ]
    in
    toVegaLite [ conf [], pop, trans [], enc [], bar [] ]


columns1 : Spec
columns1 =
    genderChart [] []


columns2 : Spec
columns2 =
    genderChart [ hdTitleFontSize 20, hdLabelFontSize 15 ] []


columns3 : Spec
columns3 =
    genderChart [] [ hdTitleFontSize 20, hdLabelFontSize 15 ]


columns4 : Spec
columns4 =
    genderChart
        [ hdTitleFontSize 20
        , hdLabelFontSize 15
        , hdTitlePadding -27
        , hdLabelPadding 40
        ]
        []



{- This list comprises the specifications to be provided to the Vega-Lite runtime. -}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "columns1", columns1 )
        , ( "columns2", columns2 )
        , ( "columns3", columns3 )
        , ( "columns4", columns4 )
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
