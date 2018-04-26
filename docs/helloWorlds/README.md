# Multiple Elm-Vega Visualizations in a Single Document

## 1. Create HTML/JavaScript page to receive multiple specifications from Elm

In many cases you may wish to embed more than one visualization created by elm-vega inside a single page.
The template to do this can be very similar to the simple [HelloWorld](../helloWorld/README.md) example.
The difference being that instead of a single `<div>` into which a visualization is inserted, you provide a sequence of `<div>` containers each with some unique id.

There is also a minor change to the `vegeEmbed` function call so it references a collection of named specifications corresponding to each of the unique IDs of the `<div>` containers.

You can copy this example to a file `helloWorlds.html` somewhere on your machine:

```html
<!DOCTYPE html>

<head>
  <title>Hello Worlds from Elm-Vega</title>
  <meta charset="utf-8">

  <!-- These scripts link to the Vega-Lite runtime -->
  <script src="https://cdn.jsdelivr.net/npm/vega@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@2"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@3"></script>

  <!-- This is the script generated from Elm -->
  <script src="js/helloWorlds.js"></script>
</head>

<body>
  <h1>Hello Worlds</h1>

  <!-- IDs should correspond to the names given to each visualization in Elm -->
  <h2>Here is the first visualization</h2>
  <div id="vis1"></div>

  <h2>Here are the second and third visualizations</h2>
  <div id="vis2"></div>
  <div id="vis3"></div>

  <script>
    Elm.HelloWorlds.worker().ports.elmToJS.subscribe(function(namedSpecs) {
      for (let name of Object.keys(namedSpecs)) {
        vegaEmbed(`#${name}`, namedSpecs[name], {
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
port module HelloWorlds exposing (elmToJS)

import Platform
import VegaLite exposing (..)


myFirstVis : Spec
myFirstVis =
    toVegaLite
        [ title "Hello, World!"
        , dataFromColumns [] <| dataColumn "x" (Numbers [ 10, 20, 30 ]) []
        , circle []
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
        [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , circle []
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
        [ dataFromUrl "https://vega.github.io/vega-lite/data/cars.json" []
        , bar []
        , enc []
        ]



{- This list comprises tuples of the label for each embedded visualization (here vis1, vis2 etc.)
   and corresponding Vega-Lite specification.
   It assembles all the listed specs into a single JSON object.
-}


mySpecs : Spec
mySpecs =
    combineSpecs
        [ ( "vis1", myFirstVis )
        , ( "vis2", mySecondVis )
        , ( "vis3", myOtherVis )
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
```

The boilerplate code is the same as previously but here using the name `mySpecs` to refer to the collection of named vega-lite specifications.

In this example, the main body of code comprises three functions (`myFirstVis`, `mySecondVis` and `myOtherVis`) each detailing a separate Vega-Lite specification.
These are then combined (with `combineSpecs`) into a single JSON object in the function `mySpecs` pairing each spec with an ID we can refer to in the HTML `<div>` containers.

## 3. Compile the Elm-Vega into JavaScript

The final task, as before, is to convert the Elm file into JavaScript:

    elm make helloWorlds.elm --output=js/helloWorlds.js

This should create the `helloWorlds.js` file required by the HTML.

Because some of the visualizations in this example load an external file containing the data ([cars.json](../../vlExamples/data/cars.json)), the file `helloWorlds.html` can only be viewed when served from a web server.
Running a local web server such as `elm-reactor` provides a convenient way to test the code.
The result should look similar to this:

![Hello, Worlds! output](images/helloWorlds.png)

## 4. Next Steps

You should now have the ability to embed single or multiple visualizations in your web pages.
To understand more about how Elm-Vega itself works, and how to encode different visualization specifications, have a look at

*   the [Elm-Vega Walkthrough](../walkthrough/README.md)
*   the [simple examples](../../vlExamples) included in the `vlExamples` folder.
*   the [vlTest-gallery](../../vlTest-gallery) for a full range of examples.
