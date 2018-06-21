# Specifying a Bar Chart

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

This specifcation can be embedded in a web page with a simple elm template, just as with [helloWorld](../helloWorld/README.md).
If you were to view this in a web browser you should just see a blank page but with enough space to accommodate a 400x200 pixel visualization.
You can confirm things are working by temporarily inserting a background color specification to replace the last line above:

```elm
    toVega [  background (str "linen"), width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]
```

## Step 2: Specifing the data

The start of the visualization pipeline will be the data we wish to show.
All data are gathered together in a `dataSource`, comprising named collections of data that we can reference in our specification.
Commonly these will come from separate files and be specified with a URL, but in this example we will generate the data inline:

```elm
ds =
    let
        table =
            dataFromColumns "table" []
                << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
    in
    dataSource [ table [] ]
```

The function `ds` (for 'data source') is doing two things here.
Firstly a data table (here called `table`) is assembled by providing data in two columns (known as 'fields') named `category` and `amount`.
Secondly that table is stored as a `dataSource` for use elsewhere in the specification.

Because data values can be of various types (commonly, number, string or boolean true/false types), we specify which type are particular data are with the value functions `vStrs` (indicating a list of strings) and `vNums` (indicating a list of numeric values).

The example above assembles the `dataColumn` specifications into a single table using _functional composition_, hence the elm `<<` operator to combine the two `dataColumn` functions and the need to append the columns to an empty column with `table []`.

Specifying data tables by column provides a compact way of providing all the necessary data values (`A`, `B`, `28`, `55` etc.) and field names (`category` and `amount`).
Alternatively the table could be expressed by row.
The following generates exactly the same data source, but uses a row-wise specification, more commonly associated with [tidy data](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html):

```elm
ds =
    let
        table =
            dataFromRows "table" []
                << dataRow [ ( "category", vStr "A" ), ( "amount", vNum 28 ) ]
                << dataRow [ ( "category", vStr "B" ), ( "amount", vNum 55 ) ]
                << dataRow [ ( "category", vStr "C" ), ( "amount", vNum 43 ) ]
                << dataRow [ ( "category", vStr "D" ), ( "amount", vNum 91 ) ]
                << dataRow [ ( "category", vStr "E" ), ( "amount", vNum 81 ) ]
                << dataRow [ ( "category", vStr "F" ), ( "amount", vNum 53 ) ]
                << dataRow [ ( "category", vStr "G" ), ( "amount", vNum 19 ) ]
                << dataRow [ ( "category", vStr "H" ), ( "amount", vNum 87 ) ]
    in
    dataSource [ table [] ]
```

## Step 3: Specifying scales

Before we can visualize the the data we need to specify the relationship between data values and their position or appearance.
We do this by defining _scales_ to represent the transformation.
In the case of a simple bar chart there are only two scales necessary – one the map the category to the horizontal position of the bar used to represent it; and one to map the height of each bar to the magnitude of the data value(s) representing it.
Here is how those two scales are specified:

```elm
sc =
    scales
        << scale "xScale"
            [ scType ScBand
            , scDomain (doData [ daDataset "table", daField (field "category") ])
            , scRange RaWidth
            , scPadding (num 0.05)
            ]
        << scale "yScale"
            [ scType ScLinear
            , scDomain (doData [ daDataset "table", daField (field "amount") ])
            , scRange RaHeight
            ]
```

Each scale is specified with the `scale` function that takes as its first parameter the name we wish to give it so we can refer to it elsewhere in the specification.
The second parameter is a list of scale properties that define the mapping between data and channel.
Usually, a scale will have at least these three properties defined: (a) the type of scale; (b) the _domain_ or source of values used to determine the extent of data that inform the scaling; (c) the _range_ that determines the extent of the scaled values after transformation.

In this example, `xScale` will generate the discrete bar positions corresponding to the `category` field values and so is given the type `ScBand` and a domain based on the categorical data field.
We wish the bands (bars) to extend across the full width of the visualization 'data rectangle' so we set the scale range to be `RaWidth`.

In a similar way `yScale` is based on the `amount` data field and we wish bars to range across the full height of the data rectangle, but this time we give it the type `ScLinear` to indicate a continuous linear mapping from 0 to the maximum value of `amount`.
And we refine things a little by introducing a small horizontal gap between bars with `scPadding` setting it to the numeric literal 0.05 band units (i.e. 5% of a bar's width).

## Step 4: Specifying Axes

Axes are generated whith calls to the `axis` function that takes as its first two parameters the scaling to map data to position and the placement of the axis relative to the main data rectangle.
The third parameter is a list of customising properties such as placement of tick marks and labels, but for now we will just leave it empty to go with the default settings:

```elm
ax =
    axes
        << axis "xScale" SBottom []
        << axis "yScale" SLeft []
```

Note how we reference the scales specified in the previous step.

## Step 5: Adding the bars

The final step to produce a usable bar chart is to specify the _marks_ that will represent the data values.

Vega has plenty of different mark types, but for a simple bar chart we can use the `Rect` mark:

```elm
mk =
    marks
        << mark Rect
            [ mFrom [ srData (str "table") ]
            , mEncode
                [ enEnter
                    [ maX [ vScale "xScale", vField (field "category") ]
                    , maWidth [ vScale "xScale", vBand (num 1) ]
                    , maY [ vScale "yScale", vField (field "amount") ]
                    , maY2 [ vScale "yScale", vNum 0 ]
                    ]
                ]
            ]
```

Specifying the mark involves:

-   identifying the source of the data to visualize (`mFrom [srData (str "table")]`)
-   Providing the encoding rules that say how properties of the mark relate to the data (`mEncode`)

The encoding process allows us to initialise the appearance of the mark with `enEnter`.
Here that encoding specifies four properties of the mark, namely its x and y position (`maX` and `maY2`) and its width and height (`maWidth` and `maY`).

Mark properties provided to `maX`, `maY` etc. should all be _Values_.
While these can be literals (such as `vNum 0`), they can also be generated via functions such as `vScale` (to refernece a scale), `vField` (to reference the values in a data field) and `vBand` (to reference a proprotion of space devoted to a discrete band).

To create a rectangle we position it with the data in the `category` field subjecting it to the horiztonal scaling defined by `xScale` in step 3.
In a similar way we position the top of the rectangle based on the data in the `amount` field subject to vertical scaling with `yScale` and the bottom with the fixed value of 0 again subject to vertical scaling.

## Putting it all together

The complete specification now looks like this, which gives us enough to generate a bar chart.

```elm
barchart : Spec
barchart =
    let
        ds =
            let
                table =
                    dataFromColumns "table" []
                        << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                        << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
            in
            dataSource [ table [] ]

        si =
            signals

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange RaWidth
                    , scPadding (num 0.05)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scRange RaHeight
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        ]
                    ]
    in
    toVega [ width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]
```

![First bar chart in Vega](images/barchart1.png)

## Step 6: Adding some dynamism

To enliven the bar chart we can make the visualization change in response to interaction events.
Firstly we can change the mark properties of the rectangles whenever the mouse pointer hovers over a mark.
We can achieve this by adding `enHover` and `enUpdate` functions to the list of encodings:

```elm
mk =
    marks
        << mark Rect
            [ mFrom [ srData (str "table") ]
            , mEncode
                [ enEnter
                    [ maX [ vScale "xScale", vField (field "category") ]
                    , maWidth [ vScale "xScale", vBand (num 1) ]
                    , maY [ vScale "yScale", vField (field "amount") ]
                    , maY2 [ vScale "yScale", vNum 0 ]
                    ]
                , enUpdate
                    [ maFill [ vStr "steelblue" ] ]
                , enHover
                    [ maFill [ vStr "red" ] ]
                ]
            ]
```

When designing a visualization you can divide the encodings of a mark between those that happen only once when the mark is created and never change (placed in `enEnter`); those that may change after the mark has been initially displayed (placed in `enUpdate`) and those specific to hovering interaction (placed in `enHover`).
In some circumstances the data backing a mark may be removed during the lifetime of a visualization, in which case mark properties may be placed inside `enExit` (for example by making a mark a light grey colour).

## Step 7: Adding signals and a tooltip

Finally we can add a tooltip that displays the data value represented by each bar by creating a new `Text` mark.
To do this we need to create a _signal_.
Signals act like variables but which update themselves whenever in incomeing signal or event changes.
Here is one way of creating a tooltip signal that responds to mouse movement in and out of a `Rect` mark:

```elm
si =
    signals
        << signal "myTooltip"
            [ siValue (vStr "")
            , siOn
                [ evHandler [ esObject [ esMark Rect, esType MouseOver ] ] [ evUpdate "datum" ]
                , evHandler [ esObject [ esMark Rect, esType MouseOut ] ] [ evUpdate "" ]
                ]
            ]
```

This signal, here called `myTooltip`, is initialised with an empty string.
We allow it to respond to ineraction events with `siOn` and provide two event handlers, one to respond to the mouse pointer moving into a `Rect` mark by setting the signal's value to whatever data value (`datum`) the mark represents, and the other to reset the signal to an empty string when the ppinter moves off the mark.

We can use this dynamic signal, which will contain the data item under the mouse pointer (if there is one) to change a new `Text` mark that displays the data value above the bar representing it:

```elm
<< mark Text
    [ mEncode
        [ enEnter
            [ maAlign [ hCenter ]
            , maBaseline [ vBottom ]
            , maFill [ vStr "grey" ]
            ]
        , enUpdate
            [ maX [ vScale "xScale", vSignal "myTooltip.category", vBand (num 0.5) ]
            , maY [ vScale "yScale", vSignal "myTooltip.amount", vOffset (vNum -2) ]
            , maText [ vSignal "myTooltip.amount" ]
            ]
        ]
    ]
```

## The final specification

Here is the final full specification that integrates the event handling code, signals and text marks:

```elm
barchart : Spec
barchart =
    let
        ds =
            let
                table =
                    dataFromColumns "table" []
                        << dataColumn "category" (vStrs [ "A", "B", "C", "D", "E", "F", "G", "H" ])
                        << dataColumn "amount" (vNums [ 28, 55, 43, 91, 81, 53, 19, 87 ])
            in
            dataSource [ table [] ]

        si =
            signals
                << signal "myTooltip"
                    [ siValue (vStr "")
                    , siOn
                        [ evHandler [ esObject [ esMark Rect, esType MouseOver ] ] [ evUpdate "datum" ]
                        , evHandler [ esObject [ esMark Rect, esType MouseOut ] ] [ evUpdate "" ]
                        ]
                    ]

        sc =
            scales
                << scale "xScale"
                    [ scType ScBand
                    , scDomain (doData [ daDataset "table", daField (field "category") ])
                    , scRange RaWidth
                    , scPadding (num 0.05)
                    ]
                << scale "yScale"
                    [ scType ScLinear
                    , scDomain (doData [ daDataset "table", daField (field "amount") ])
                    , scRange RaHeight
                    ]

        ax =
            axes
                << axis "xScale" SBottom []
                << axis "yScale" SLeft []

        mk =
            marks
                << mark Rect
                    [ mFrom [ srData (str "table") ]
                    , mEncode
                        [ enEnter
                            [ maX [ vScale "xScale", vField (field "category") ]
                            , maWidth [ vScale "xScale", vBand (num 1) ]
                            , maY [ vScale "yScale", vField (field "amount") ]
                            , maY2 [ vScale "yScale", vNum 0 ]
                            ]
                        , enUpdate
                            [ maFill [ vStr "steelblue" ] ]
                        , enHover
                            [ maFill [ vStr "red" ] ]
                        ]
                    ]
                << mark Text
                    [ mEncode
                        [ enEnter
                            [ maAlign [ hCenter ]
                            , maBaseline [ vBottom ]
                            , maFill [ vStr "grey" ]
                            ]
                        , enUpdate
                            [ maX [ vScale "xScale", vSignal "myTooltip.category", vBand (num 0.5) ]
                            , maY [ vScale "yScale", vSignal "myTooltip.amount", vOffset (vNum -2) ]
                            , maText [ vSignal "myTooltip.amount" ]
                            ]
                        ]
                    ]
    in
    toVega [ width 400, height 200, padding 5, ds, si [], sc [], ax [], mk [] ]
```

![Interactive bar chart in Vega](images/barchart2.png)
