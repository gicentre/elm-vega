# Specifying a Simple Bar Chart

The purpose of this tutorial is to demonstrate how to build up Vega specifications with elm-vega.
The result will be a simple bar chart, that while it could have been specifed more compactly with Vega-Lite, demonstrates some of the key principles for creating Vega specifications.

The tutorial is based on this Vega [Let's make bar chart tutorial](https://vega.github.io/vega/tutorials/bar-chart/).

## Step 1: Creating a skeleton Vega specification

Our first step is to create a function in elm-vega that can create (an empty) Vega specification to be sent to the Vega runtime.
This is usually the first step to take when building a new Vega visualization with elm-vega:

```elm
barchart : Spec
barchart =
    let
        ds =
            dataSource []

        si =
            signals

        sc =
            scales

        ax =
            axes

        mk =
            marks
    in
    toVega [ width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]
```

This sets up the specification with the key components of most common visualizations:

-   The **data source** will indicate the data which we will visualize.
-   **signals** are the means by which dynamic data values may be passed around the visualization specification.
-   **scales** specify the mapping between data values and their visual expression (channels), such as colour or position.
-   **axes** (along with **legends**, not included in this first example) provide visual guidance on interpreting the visualization.
-   **marks** are the visual components that make up the visualization (e.g. rectangles, circles, lines and text).

The specification above just sets up the space to define each of these components.
Additionally the line that starts with `toVega` also specifies the width and height of the visualization and the padding around its edge, all measured in pixel units.

This specifcation can be embedded in a web page with some a simple elm template, just as with [helloWorld](../helloWorld/README.md).
If you were to view this in a web browser you should just see a blank page but with enough space to accommodate a 400x200 pixel visualization.
You can confirm things are working by temporarily inserting a background color specification to replace the last line above:

```elm
    toVega [ width 400, height 200, background black, padding 5, ds, si [], sc [], ax [], mk [] ]
```
