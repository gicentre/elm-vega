# Multiple Elm-Vega Visualizations in a Single Document

## 1. Create HTML/JavaScript page to receive multiple specifications from Elm

In many cases you may wish to embed more than one visualization created by elm-vega inside a single page.
The template to do this can be very similar to the simple [HelloWorld](../helloWorld/README.md) example.
The  difference being that instead of a single `<div>` into which a visualization is inserted, you provide a sequence of `<div>`s each with a sequentially numbered id.
There is also a minor change to the `vegeEmbed` function call so it references this sequence of IDs rather than a single one.

You can copy this example to a file `helloWorlds.html` somewhere on your machine:

```html
<!DOCTYPE html>

<head>
  <title>Hello Worlds from Elm-Vega</title>
  <meta charset="utf-8">

  <!-- These scripts link to the Vega-Lite runtime -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.8/vega.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.3/vega-lite.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>

  <!-- This is the script generated from Elm -->
  <script src="js/helloWorlds.js"></script>
</head>

<body>
  <h1>Hello Worlds</h1>

  <!-- IDs should be numbered sequentially and correspond to the order of Vega-Lite specs generated in elm-vega. -->
  <h2>Here is the first visualization</h2>
  <div id="vis1"></div>

  <h2>Here are the second and third visualizations</h2>
  <div id="vis2"></div>
  <div id="vis3"></div>


  <script>
    Elm.HelloWorlds.worker().ports.fromElm.subscribe(function(elmObj) {
      let id = 1;
      for (let obj of elmObj) {
        vegaEmbed("#vis" + id++, obj, {
          actions: false, logLevel:vega.Warn
        }).catch(console.warn);
      }
    });
  </script>

</body>

</html>
```

## 2. Create an Elm-Vega Program

As previously, next create a file (here called `HelloWorlds.elm`) in the same location as `helloWorlds.html`, within which you should provide the elm-vega specifications and the boilerplate for passing the specs to JavaScript.

Here is an example containing three visualizations:

```elm
port module HelloWorlds exposing (fromElm)

import Json.Encode
import Platform
import VegaLite exposing (..)


myFirstVis : Spec
myFirstVis =
    toVegaLite
        [ title "Hello, World!"
        , dataFromColumns [] <| dataColumn "x" (Numbers [ 10, 20, 30 ]) []
        , mark Circle []
        , encoding <| position X [ PName "x", PmType Quantitative ] []
        ]


mySecondVis : Spec
mySecondVis =
    let
        enc =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Miles_per_Gallon", PmType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , mark Circle []
        , enc []
        ]


myOtherVis : Spec
myOtherVis =
    let
        enc =
            encoding
                << position X [ PName "Cylinders", PmType Ordinal ]
                << position Y [ PName "Miles_per_Gallon", PAggregate Average, PmType Quantitative ]
    in
    toVegaLite
        [ dataFromUrl "data/cars.json" []
        , mark Bar []
        , enc []
        ]



{- This list comprises the specifications to be provided to the Vega-Lite runtime.
   It assembles all the listed specs into a single Json spec.
-}


mySpecs : Spec
mySpecs =
    [ myFirstVis
    , mySecondVis
    , myOtherVis
    ]
        |> Json.Encode.list



{- The code below is boilerplate for creating a headerless Elm module that opens
   an outgoing port to Javascript and sends the specs to it.
-}


main : Program Never Spec Msg
main =
    Platform.program
        { init = init mySpecs
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = FromElm


init : Spec -> ( Spec, Cmd msg )
init spec =
    ( spec, fromElm spec )


port fromElm : Spec -> Cmd msg
```

The boilerplate code is the same as previously, using the name `mySpecs` to refer to the list of vega-lite specifications.
In this example, the main body of code comprises three functions (`myFirstVis`, `mySecondVis` and `myOtherVis`) each detailing a separate Vega-Lite specification.
These are then combined into a single specification in the function `mySpecs` by assembling them into a `List` and encoding that List as Json.
To ensure the json encoding works, you must also `import Json.Encode` at the top of the file.

## 4. Compile the Elm-Vega into JavaScript

The final task, as before, is to convert the Elm file into JavaScript:

    elm make helloWorlds.elm --output=js/helloWorlds.js

This should create the `helloWorlds.js` file required by the HTML.

Because some of the visualizations in this example load an external file containing the data ([cars.json](../../vlExamples/data/cars.json)), the file `helloWorlds.html` can only be viewed when served from a web server.
Running a local web server such as `elm-reactor` should allow easy testing and the result should look similar to this:

![Hello, Worlds! output](images/helloWorlds.png)

## 5. Next Steps

You should now have the ability to embed single or multiple visualizations in your web pages.
To understand more about how Elm-Vega itself works, and how to encode different visualization specifications, have a look at

-   the [Elm-Vega Walkthrough](../walkthrough/README.md)
-   the [simple examples](../../vlExamples) included in the `vlExamples` folder.
-   the [vlTest-gallery](../../vlTest-gallery) for a full range of examples.
