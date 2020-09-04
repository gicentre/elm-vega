# elm-vega

![elm-vega banner](https://raw.githubusercontent.com/gicentre/elm-vega/master/images/banner.jpg)

[![elm version](https://img.shields.io/badge/Elm-v0.19-blue.svg?style=flat-square)](https://elm-lang.org)
[![vega version](https://img.shields.io/badge/Vega-v5.15-purple.svg?style=flat-square)](https://vega.github.io/vega/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

_Declarative visualization for Elm._

This package allows you to create [Vega](https://vega.github.io/vega/) specifications in Elm providing a pure functional approach to declarative visualization.
It does not generate graphical output directly, but instead allows you to create JSON _specifications_ that can be sent to the Vega runtime to create the output.

_Note: If you wish to create Vega-Lite specifications, use the sister-package [elm-vegaLite](https://github.com/gicentre/elm-vegaLite)._

## Example

Visualizing a set of geospatial centroids as a Voronoi diagram:

```elm
let
    ds =
        dataSource
            [ data "centroids"
                [ daUrl (str "https://gicentre.github.io/data/uk/constituencySpacedCentroidsWithSpacers.csv")
                , daFormat [ csv, parseAuto ]
                ]
                |> transform
                    [ trGeoPoint "projection"
                        (field "longitude")
                        (field "latitude")
                    , trVoronoi (field "x")
                        (field "y")
                        [ voSize (numSignals [ "width", "height" ]) ]
                    ]
            ]

    pr =
        projections
            << projection "projection"
                [ prType transverseMercator
                , prScale (num 3700)
                , prTranslate (nums [ 320, 3855 ])
                ]

    sc =
        scales
            << scale "cScale" [ scType scOrdinal, scRange raCategory ]

    mk =
        marks
            << mark path
                [ mFrom [ srData (str "centroids") ]
                , mEncode
                    [ enEnter
                        [ maPath [ vField (field "path") ]
                        , maFill
                            [ ifElse "datum.region == 0"
                                [ transparent ]
                                [ vScale "cScale", vField (field "region") ]
                            ]
                        ]
                    ]
                ]
in
toVega
    [ width 420, height 670, ds, pr [], sc [], mk [] ]
```

This generates a JSON specification that when sent to the Vega runtime produces the following output:

![Voronoi-based map](https://raw.githubusercontent.com/gicentre/elm-vega/master/images/voronoi.png)

## Why elm-vega?

### A rationale for Elm programmers

There is a [demand for good visualization packages with Elm](https://package.elm-lang.org/packages/elm/svg/latest), especially ones that incorporate good practice in visualization design.
[Vega](https://vega.github.io/vega/) provides a theoretically robust and flexible grammar for specifying visualization design but is based on the JSON format.
elm-vega provides a typed functional mapping of Vega, so affording the advantages of the Elm language in building up higher level visualization functions.
Because Vega is widely used, you can take advantage of the many thousands of visualizations already shared in the Vega language.

**Characteristics of elm-vega.**

- Built upon the widely used [Vega](https://vega.github.io/vega/) specification that has an academic robustness and momentum behind its development.

- Full access to lower level expressive visualization design.

- Strict typing and friendly error messages means "the compiler is your friend" when building and debugging complex visualizations.

### A rationale for data visualizers

In using JSON to fully encode a visualization specification Vega is portable across a range of platforms and sits well in the JavaScript / Web ecosystem.
Yet JSON is really an interchange format rather than one suited directly for visualization design and construction.

By wrapping Vega within the Elm language, we can avoid working with JSON directly and instead take advantage of a typed functional programming environment for improved error support and customisation.
This greatly improves reusability of code and integration with larger programming projects.

Elm and elm-vega provide an ideal environment for educators wishing to teach more advanced Data Visualization combining the beginner-friendly design of Elm with the robust and theoretically underpinned design of Vega.

## Limitations

- elm-vega does not render graphics directly, but instead generates data visualization specifications that may be passed to JavaScript for rendering.

## Further Reading

- If you have not done so already, to get familiar with the approach of declarative visualization you may find it helpful to look first at the simpler [elm-vegaLite](https://github.com/gicentre/elm-vegaLite).
- Then try [creating your first Vega visualization with elm-vega](https://github.com/gicentre/elm-vega/tree/master/docs/helloWorld) and [specifying a Vega bar chart](https://github.com/gicentre/elm-vega/tree/master/docs/barChart).
- For a rich set of Vega examples see the [Vega example gallery](https://github.com/gicentre/elm-vega/tree/master/test-gallery).
- To get coding, see the [elm-vega API](https://package.elm-lang.org/packages/gicentre/elm-vega/latest) documentation.
- Further examples can be found in the [elm-vega examples](https://github.com/gicentre/elm-vega/tree/master/examples) and [elm-vega tests](https://github.com/gicentre/elm-vega/tree/master/tests) folders.
- You can also work with elm-vega in a [litvis](https://github.com/gicentre/litvis) – a _literate visualization_ environment for embedding visualization specifications in a formatted text environment.

## Looking for an older version?

If you are using Elm 0.18, you will need to use [elm-vega 3.0](https://github.com/gicentre/elm-vega/tree/v3.0) and its [API documentation](https://package.elm-lang.org/packages/gicentre/elm-vega/3.0.1).
This older version combines modules for working with both Vega and Vega-Lite.
