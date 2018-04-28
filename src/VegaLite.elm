module VegaLite
    exposing
        ( APosition(AEnd, AMiddle, AStart)
        , Arrangement(Column, Row)
        , Autosize(AContent, AFit, ANone, APad, APadding, AResize)
        , AxisConfig(..)
        , AxisProperty(AxDates, AxDomain, AxFormat, AxGrid, AxLabelAngle, AxLabelOverlap, AxLabelPadding, AxLabels, AxMaxExtent, AxMinExtent, AxOffset, AxOrient, AxPosition, AxTickCount, AxTickSize, AxTicks, AxTitle, AxTitleAlign, AxTitleAngle, AxTitleMaxLength, AxTitlePadding, AxValues, AxZIndex)
          --, AxisProperty
        , BinProperty(Base, Divide, Extent, MaxBins, MinStep, Nice, Step, Steps)
          --, BinProperty
        , Binding(ICheckbox, IColor, IDate, IDateTimeLocal, IMonth, INumber, IRadio, IRange, ISelect, ITel, IText, ITime, IWeek)
          --, Binding
        , BooleanOp(And, Expr, Not, Or, Selection, SelectionName)
        , CInterpolate(CubeHelix, CubeHelixLong, Hcl, HclLong, Hsl, HslLong, Lab, Rgb)
          --, CInterpolate(Hcl,HclLong,Hsl,HslLong,Lab)
        , Channel(ChColor, ChOpacity, ChShape, ChSize, ChX, ChX2, ChY, ChY2)
        , ClipRect(LTRB, NoClip)
          --,ClipRect(NoClip)
        , ConfigurationProperty(AreaStyle, Autosize, Axis, AxisBand, AxisBottom, AxisLeft, AxisRight, AxisTop, AxisX, AxisY, Background, BarStyle, CircleStyle, CountTitle, FieldTitle, Legend, LineStyle, MarkStyle, NamedStyle, NumberFormat, Padding, PointStyle, Projection, Range, RectStyle, RemoveInvalid, RuleStyle, Scale, SelectionStyle, SquareStyle, Stack, TextStyle, TickStyle, TimeFormat, TitleStyle, View)
        , Cursor(CAlias, CAllScroll, CAuto, CCell, CColResize, CContextMenu, CCopy, CCrosshair, CDefault, CEResize, CEWResize, CGrab, CGrabbing, CHelp, CMove, CNEResize, CNESWResize, CNResize, CNSResize, CNWResize, CNWSEResize, CNoDrop, CNone, CNotAllowed, CPointer, CProgress, CRowResize, CSEResize, CSResize, CSWResize, CText, CVerticalText, CWResize, CWait, CZoomIn, CZoomOut)
        , Data
        , DataColumn
        , DataRow
        , DataType(..)
        , DataValue(..)
        , DataValues(..)
        , DateTime(..)
        , DayName(Fri, Mon, Sat, Sun, Thu, Tue, Wed)
        , DetailChannel(DAggregate, DBin, DName, DTimeUnit, DmType)
          --TODO: Replace with the following in next major release: , DetailChannel
        , FacetChannel(FAggregate, FBin, FHeader, FName, FTimeUnit, FmType)
          --TODO: Replace with the following in next major release: , FacetChannel
        , FacetMapping(..)
        , FieldTitleProperty(Function, Plain, Verbal)
        , Filter(..)
        , FilterRange(..)
        , FontWeight(Bold, Bolder, Lighter, Normal, W100, W200, W300, W400, W500, W600, W700, W800, W900)
        , Format(..)
        , Geometry(..)
        , HAlign(AlignCenter, AlignLeft, AlignRight)
        , HeaderProperty(..)
        , HyperlinkChannel(HAggregate, HBin, HDataCondition, HName, HRepeat, HSelectionCondition, HString, HTimeUnit, HmType)
          --TODO: Replace with the following in next major release: , HyperlinkChannel
        , InputProperty(..)
        , LabelledSpec
        , Legend(Gradient, Symbol)
        , LegendConfig(..)
        , LegendOrientation(BottomLeft, BottomRight, Left, None, Right, TopLeft, TopRight)
        , LegendProperty(..)
        , LegendValues(..)
        , Mark(Area, Bar, Circle, Geoshape, Line, Point, Rect, Rule, Square, Text, Tick)
          --TODO: Replace with the following in next major release:, Mark
        , MarkChannel(MAggregate, MBin, MBoolean, MDataCondition, MLegend, MName, MNumber, MPath, MRepeat, MScale, MSelectionCondition, MString, MTimeUnit, MmType)
          --TODO: Replace with the following in next major release: , MarkChannel
        , MarkInterpolation(Basis, BasisClosed, BasisOpen, Bundle, Cardinal, CardinalClosed, CardinalOpen, Linear, LinearClosed, Monotone, StepAfter, StepBefore, Stepwise)
        , MarkOrientation(Horizontal, Vertical)
        , MarkProperty(..)
        , Measurement(GeoFeature, Nominal, Ordinal, Quantitative, Temporal)
        , MonthName(Apr, Aug, Dec, Feb, Jan, Jul, Jun, Mar, May, Nov, Oct, Sep)
        , Operation(ArgMax, ArgMin, Average, CI0, CI1, Count, Distinct, Max, Mean, Median, Min, Missing, Q1, Q3, Stderr, Stdev, StdevP, Sum, Valid, Variance, VarianceP)
        , OrderChannel(OAggregate, OBin, OName, ORepeat, OSort, OTimeUnit, OmType)
          --TODO: Replace with the following in next major release: , OrderChannel
        , OverlapStrategy(OGreedy, ONone, OParity)
        , Padding(..)
        , Position(Latitude, Latitude2, Longitude, Longitude2, X, X2, Y, Y2)
        , PositionChannel(PAggregate, PAxis, PBin, PName, PRepeat, PScale, PSort, PStack, PTimeUnit, PmType)
          --TODO: Replace with the following in next major release: , PositionChannel
        , Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Custom, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
          --TODO: Replace with the following in next major release: , Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
        , ProjectionProperty(..)
        , RangeConfig(..)
        , RepeatFields(..)
        , Resolution(Independent, Shared)
        , Resolve(..)
        , Scale(ScBand, ScBinLinear, ScBinOrdinal, ScLinear, ScLog, ScOrdinal, ScPoint, ScPow, ScSequential, ScSqrt, ScTime, ScUtc)
        , ScaleConfig(..)
        , ScaleDomain(..)
        , ScaleNice(..)
        , ScaleProperty(..)
        , ScaleRange(..)
        , Selection(Interval, Multi, Single)
        , SelectionMarkProperty(..)
        , SelectionProperty(..)
        , SelectionResolution(Global, Intersection, Union)
        , Side(SBottom, SLeft, SRight, STop)
        , SortProperty(Ascending, ByField, ByRepeat, Descending, Op)
        , Spec
        , StackProperty(NoStack, StCenter, StNormalize, StZero)
        , Symbol(Cross, Diamond, Path, SymCircle, SymSquare, TriangleDown, TriangleUp)
          --TODO: Replace with the following in next major release: , Symbol(SymCircle, SymSquare, Cross, Diamond, TriangleUp, TriangleDown)
        , TextChannel(TAggregate, TBin, TDataCondition, TFormat, TName, TRepeat, TSelectionCondition, TTimeUnit, TmType)
          --TODO: Replace with the following in next major release: , TextChannel
        , TimeUnit(Date, Day, Hours, HoursMinutes, HoursMinutesSeconds, Milliseconds, Minutes, MinutesSeconds, Month, MonthDate, Quarter, QuarterMonth, Seconds, SecondsMilliseconds, Year, YearMonth, YearMonthDate, YearMonthDateHours, YearMonthDateHoursMinutes, YearMonthDateHoursMinutesSeconds, YearQuarter, YearQuarterMonth)
        , TitleConfig(..)
        , VAlign(AlignBottom, AlignMiddle, AlignTop)
        , VLProperty
        , ViewConfig(..)
        , aggregate
        , and
        , area
        , asSpec
        , autosize
        , axDates
        , axDomain
        , axFormat
        , axGrid
        , axLabelAngle
        , axLabelOverlap
        , axLabelPadding
        , axLabels
        , axMaxExtent
        , axMinExtent
        , axOffset
        , axOrient
        , axPosition
        , axTickCount
        , axTickSize
        , axTicks
        , axTitle
        , axTitleAlign
        , axTitleAngle
        , axTitleMaxLength
        , axTitlePadding
        , axValues
        , axZIndex
        , background
        , bar
          -- TODO: Make bin private in next major version.
        , biBase
        , biDivide
        , biExtent
        , biMaxBins
        , biMinStep
        , biNice
        , biStep
        , biSteps
          --, BinProperty
        , bin
        , binAs
        , calculateAs
        , categoricalDomainMap
        , circle
        , clipRect
          -- TODO: create functions for access to ConfigurationProperty type constructors
        , color
        , column
        , combineSpecs
        , configuration
        , configure
        , cubeHelix
        , cubeHelixLong
        , customProjection
        , customSort
        , dAggregate
        , dBin
        , dMType
        , dName
        , dTimeUnit
        , dataColumn
        , dataFromColumns
        , dataFromJson
        , dataFromRows
        , dataFromSource
        , dataFromUrl
        , dataRow
        , datasets
        , description
        , detail
        , domainRangeMap
        , encoding
        , expr
        , fAggregate
        , fBin
        , fHeader
        , fMType
        , fName
        , fTimeUnit
        , facet
        , fill
        , filter
        , geoFeatureCollection
        , geometry
        , geometryCollection
        , geoshape
        , hAggregate
        , hBin
        , hConcat
        , hDataCondition
        , hMType
        , hName
        , hRepeat
        , hSelectionCondition
        , hString
        , hTimeUnit
        , height
        , hyperlink
        , iCheckbox
        , iColor
        , iDate
        , iDateTimeLocal
        , iMonth
        , iNumber
        , iRadio
        , iRange
        , iSelect
        , iTel
        , iText
        , iTime
        , iWeek
        , layer
        , line
        , lookup
        , lookupAs
        , mAggregate
        , mBin
        , mBoolean
        , mDataCondition
        , mLegend
        , mMType
        , mName
        , mNumber
        , mPath
        , mRepeat
        , mScale
        , mSelectionCondition
        , mString
        , mTimeUnit
        , mark
        , name
        , not
        , oAggregate
        , oBin
        , oMType
        , oName
        , oRepeat
        , oSort
        , oTimeUnit
        , opAs
        , opacity
        , or
        , order
        , pAggregate
        , pAxis
        , pBin
        , pMType
        , pName
        , pRepeat
        , pScale
        , pSort
        , pStack
        , pTimeUnit
        , padding
        , point
        , position
        , projection
        , rect
        , repeat
        , resolution
        , resolve
        , rgb
          --TODO: Replace with the following in next major release: , BooleanOp
        , row
        , rule
        , select
        , selected
        , selection
        , selectionName
        , shape
        , size
        , specification
        , square
        , stroke
        , symbolPath
        , tAggregate
        , tBin
        , tDataCondition
        , tFormat
        , tMType
        , tName
        , tRepeat
        , tSelectionCondition
        , tTimeUnit
        , text
        , textMark
        , tick
        , timeUnitAs
        , title
        , toVegaLite
        , tooltip
        , trail
        , trailConfig
        , transform
        , utc
        , vConcat
        , width
        )

{-| This module allows you to create Vega-Lite specifications in Elm. A specification
is stored as a JSON object which can be sent to a Vega-Lite compiler to generate
the graphics. While this a 'pure' Elm library, to create the graphical output you
probably want to send a Vega-Lite specification generated by `toVegaLite` via a
port to some JavaScript that invokes the Vega-Lite runtime.


# Creating A Vega-Lite Specification

@docs toVegaLite
@docs VLProperty
@docs Spec
@docs LabelledSpec
@docs combineSpecs


# Creating the Data Specification

Functions and types for declaring the input data to the visualization.

@docs dataFromUrl
@docs dataFromColumns
@docs dataFromRows
@docs dataFromJson
@docs dataFromSource
@docs datasets
@docs dataColumn
@docs dataRow
@docs geometry
@docs geoFeatureCollection
@docs geometryCollection
@docs Data
@docs DataColumn
@docs DataRow
@docs Format
@docs Geometry
@docs DataType


# Creating the Transform Specification

Functions and types for declaring the transformation rules that are applied to
data fields or geospatial coordinates before they are encoded visually.

@docs transform
@docs projection
@docs ProjectionProperty
@docs Projection
@docs customProjection
@docs ClipRect
@docs clipRect


## Aggregation

@docs aggregate
@docs Operation
@docs opAs
@docs timeUnitAs


## Binning

@docs binAs
@docs biBase
@docs biDivide
@docs biExtent
@docs biMaxBins
@docs biMinStep
@docs biNice
@docs biStep
@docs biSteps


## Data Calculation

@docs calculateAs


## Filtering

@docs filter
@docs Filter
@docs FilterRange


## Relational Joining (lookup)

@docs lookup
@docs lookupAs


# Creating the Mark Specification

Functions and types for declaring the type of visual marks used in the visualization.
The preferred method of specifying mark types is to call the relevant mark function
(e.g. `bar`, `line` etc.) rather than `mark Bar`, `mark Line` etc.

@docs area
@docs bar
@docs circle
@docs geoshape
@docs line
@docs point
@docs rect
@docs rule
@docs square
@docs textMark
@docs tick
@docs trail

@docs MarkProperty
@docs MarkOrientation
@docs MarkInterpolation
@docs Symbol
@docs symbolPath
@docs Cursor


# Creating the Encoding Specification

Types and functions for declaring which data fields are mapped to which channels.
Channels can include position on screen (e.g. `X`,`Y`), visual mark properties
(e.g. color, size, stroke, shape), text, hyperlinks, ordering, level of detail and facets
(for composed visualizations). All can be further customised via a series of properties
for determining how that encoding is implemented (e.g. scaling, sorting, spacing).

@docs encoding
@docs Measurement


## Position channel

Relates to where something appears in the visualization.

@docs position
@docs Position


### Position Channel Properties

@docs pName
@docs pRepeat
@docs pMType
@docs pBin
@docs pTimeUnit
@docs pAggregate
@docs pScale
@docs pAxis
@docs pSort
@docs pStack


## Properties Used by Position Channels


## Sorting Properties

@docs SortProperty
@docs customSort


## Stacking Properties

@docs StackProperty


## Axis Properties

@docs axDomain
@docs axFormat
@docs axGrid
@docs axLabelAngle
@docs axLabelOverlap
@docs axLabelPadding
@docs axLabels
@docs axMaxExtent
@docs axMinExtent
@docs axOffset
@docs axOrient
@docs axPosition
@docs axTicks
@docs axTickCount
@docs axTickSize
@docs axTitle
@docs axTitleAlign
@docs axTitleAngle
@docs axTitleMaxLength
@docs axTitlePadding
@docs axValues
@docs axDates
@docs axZIndex


## Positioning Constants

@docs OverlapStrategy
@docs Side
@docs HAlign
@docs VAlign
@docs FontWeight
@docs TimeUnit
@docs utc


## Mark channels

Relate to the appearance of the visual marks in the visualization such as their
color or size.

@docs size
@docs color
@docs fill
@docs stroke
@docs opacity
@docs shape


### Mark Channel Properties

@docs mName
@docs mRepeat
@docs mMType
@docs mScale
@docs mBin
@docs mTimeUnit
@docs mAggregate
@docs mLegend
@docs mSelectionCondition
@docs mDataCondition
@docs mPath
@docs mNumber
@docs mString
@docs mBoolean


### Properties Used By Mark Channels

@docs LegendProperty
@docs Legend
@docs LegendOrientation
@docs LegendValues


## Text Channels

Relate to the appearance of the text and tooltip elements of the visualization.

@docs text
@docs tooltip
@docs tName
@docs tRepeat
@docs tMType
@docs tBin
@docs tAggregate
@docs tTimeUnit
@docs tSelectionCondition
@docs tDataCondition
@docs tFormat


## Hyperlink Channel

Relates to a clickable URL destination of a mark. Note that unlike most other
channels, the hyperlink channel has no direct visual expression other than the
option of changing the cursor style when hovering, so an encoding will usually
pair hyperlinks with other visual channels such as marks or texts.

@docs hyperlink
@docs hName
@docs hRepeat
@docs hMType
@docs hBin
@docs hAggregate
@docs hTimeUnit
@docs hDataCondition
@docs hSelectionCondition
@docs hString


## Order channels

Channels that relate to the order of data fields such as for sorting stacking order
or order of data points in a connected scatterplot. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#order)
for further details.

@docs order
@docs oName
@docs oRepeat
@docs oMType
@docs oBin
@docs oAggregate
@docs oSort
@docs oTimeUnit


## Facet channels

Channels for faceting single plots into small multiples. Can be used to create
trellis plots or other arrangements in rows and columns. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#facet)
for further details. See also, 'faceted view composition' for a more flexible (but
more verbose) way of defining faceted views.

@docs row
@docs column


## Level of detail Channel

Used for grouping data but without changing the visual appearance of a mark. When,
for example, a field is encoded by color, all data items with the same value for
that field are given the same color. When a detail channel encodes a field, all
data items with the same value are placed in the same group. This allows, for example
a line chart with multiple lines to be created – one for each group. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#detail)
for more information.

@docs detail
@docs dName
@docs dMType
@docs dAggregate
@docs dBin
@docs dTimeUnit


## Scaling

Used to specify how the encoding of a data field should be applied.

@docs ScaleProperty
@docs Scale
@docs categoricalDomainMap
@docs domainRangeMap
@docs ScaleDomain
@docs ScaleRange
@docs ScaleNice


### Color Scaling

@docs CInterpolate
@docs cubeHelix
@docs cubeHelixLong
@docs rgb


# Creating view compositions

Views can be combined to create more complex multiview displays. This may involve
layering views on top of each other (superposition) or laying them out in adjacent
spaces (juxtaposition using `repeat`, `facet`, `hConcat` or `vConcat`). Where different
views have potentially conflicting channels (for example, two position scales in
a layered visualization) the rules for resolving them can be defined with `resolve`.
For details of creating composite views see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/composition.html)

@docs layer
@docs hConcat
@docs vConcat
@docs resolve
@docs resolution
@docs Resolve
@docs Channel
@docs Resolution


## Faceted views

These are small multiples each of which show subsets of the same dataset. The specification
determines which field should be used to determine subsets along with their spatial
arrangement (in rows or columns). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html)

@docs repeat
@docs RepeatFields
@docs facet
@docs FacetMapping

@docs fName
@docs fMType
@docs fAggregate
@docs fBin
@docs fHeader
@docs fTimeUnit

@docs asSpec
@docs specification
@docs Arrangement
@docs HeaderProperty


# Creating Selections for Interaction

Selections are the way in which interactions (such as clicking or dragging) can be
responded to in a visualization. They transform interactions into data queries.
For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html).

@docs selection
@docs select
@docs Selection
@docs SelectionProperty

@docs iRange
@docs iCheckbox
@docs iRadio
@docs iSelect
@docs iText
@docs iNumber
@docs iDate
@docs iTime
@docs iMonth
@docs iWeek
@docs iDateTimeLocal
@docs iTel
@docs iColor

@docs InputProperty
@docs SelectionResolution
@docs SelectionMarkProperty


## Making conditional channel encodings

Sometimes it is useful to make channel encoding conditional on something. For example,
on the result of some interaction such as clicking or dragging or some data property
such whether null or an outlier. `MSelectionCondition` (and `TSelectionCondition`) will
encode a mark (or text) dependent on an interactive selection. `MDataCondition`
(and `TDataCondition`) will encode it dependening on some data property.

For interaction, once a selection has been defined and named, supplying a set of
`MSelectionCondition` encodings allow mark encodings to become dependent on that selection.
`MSelectionCondition` is followed firstly by a Boolean expression relating to the
selection upon which it is dependent, then an 'if' and an 'else' clause. Each clause
is a list of mark field encodings that should be applied when the selection is true
(the 'if clause') and when it is false (the 'else clause'). The color encoding below
is saying "whenever data marks are selected with an interval mouse drag, encode
the cylinder field with an ordinal color scheme, else make them grey".

      sel =
          selection << select "myBrush" Interval []

      enc =
          encoding
              << position X [ pName "Horsepower", pMType Quantitative ]
              << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
              << color
                  [ mSelectionCondition (selectionName "myBrush")
                      [ mName "Cylinders", mMType Ordinal ]
                      [ mString "grey" ]
                  ]

In a similar way, `MDataCondition` will encocode a mark in one of two ways depending
on whether a predicate test is satisfied.

      enc =
          encoding
              << position X [ pName "IMDB_Rating", pMType Quantitative ]
              << position Y [ pName "Rotten_Tomatoes_Rating", pMType Quantitative ]
                << color
                    [ mDataCondition
                        (or (expr "datum.IMDB_Rating === null")
                            (expr "datum.Rotten_Tomatoes_Rating === null")
                        )
                        [ mString "#ddd" ]
                        [ mString "#0099ee" ]
                    ]

For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/condition.html).

@docs and
@docs or
@docs not
@docs expr
@docs selected
@docs selectionName


# Global Configuration

Configuration options that affect the entire visualization. These are in addition
to the data and transform options described above.

@docs name
@docs title
@docs description
@docs height
@docs width
@docs padding
@docs autosize
@docs background
@docs configure
@docs configuration
@docs ConfigurationProperty
@docs trailConfig
@docs Autosize
@docs Padding
@docs AxisConfig
@docs LegendConfig
@docs ScaleConfig
@docs TitleConfig
@docs APosition
@docs ViewConfig
@docs RangeConfig
@docs FieldTitleProperty


# General Data Types

In addition to more general data types like integers and string, the following types
can carry data used in specifications.

@docs DataValue
@docs DataValues
@docs DateTime
@docs MonthName
@docs DayName

---


# Deprecated Types and functions

The following are deprecated and will be removed in a future major version release.
Generally, the constructors of each type should be replaced with a function of
the same name. For example, instead of the `Rule` type use the `rule` function;
instead of `PAggregate` use `pAggregate` etc.

@docs PositionChannel
@docs MarkChannel
@docs DetailChannel
@docs FacetChannel
@docs HyperlinkChannel
@docs OrderChannel
@docs TextChannel

@docs Mark
@docs mark

@docs BooleanOp
@docs bin
@docs Binding

@docs AxisProperty
@docs BinProperty

-}

import Json.Decode as JD
import Json.Encode as JE


{-| Indicates the anchor position for some text.
-}
type APosition
    = AStart
    | AMiddle
    | AEnd


{-| Identifies whether a repeated/faceted view is arranged in rows or columns.
-}
type Arrangement
    = Column
    | Row


{-| Indicates the auto-sizing characteristics of the visualization such as amount
of padding, whether it should fill the parent container etc. For more details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/size.html#autosize)
-}
type Autosize
    = AContent
    | AFit
    | ANone
    | APad
    | APadding
    | AResize


{-| Axis configuration options for customising all axes. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config)
for more details.
-}
type AxisConfig
    = BandPosition Float
    | Domain Bool
    | DomainColor String
    | DomainWidth Float
    | MaxExtent Float
    | MinExtent Float
    | Grid Bool
    | GridColor String
    | GridDash (List Float)
    | GridOpacity Float
    | GridWidth Float
    | Labels Bool
    | LabelAngle Float
    | LabelColor String
    | LabelFont String
    | LabelFontSize Float
    | LabelLimit Float
    | LabelOverlap OverlapStrategy
    | LabelPadding Float
    | ShortTimeLabels Bool
    | Ticks Bool
    | TickColor String
    | TickRound Bool
    | TickSize Float
    | TickWidth Float
    | TitleAlign HAlign
    | TitleAngle Float
    | TitleBaseline VAlign
    | TitleColor String
    | TitleFont String
    | TitleFontWeight FontWeight
    | TitleFontSize Float
    | TitleLimit Float
    | TitleMaxLength Float
    | TitlePadding Float
    | TitleX Float
    | TitleY Float


{-| _Note: specifying axis properties with type constructors (`AxDomain`,
`AxFormat` etc.) is deprecated in favour of calling their equivalent property
specifying functions (`axDomain`, `axFormat` etc.)_

Axis customisation properties. These are used for customising individual axes.
To configure all axes, use `AxisConfig` with a `configuration` instead. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
for more details.

-}
type AxisProperty
    = AxDomain Bool
    | AxFormat String
    | AxGrid Bool
    | AxLabelAngle Float
    | AxLabelOverlap OverlapStrategy
    | AxLabelPadding Float
    | AxLabels Bool
    | AxMaxExtent Float
    | AxMinExtent Float
    | AxOffset Float
    | AxOrient Side
    | AxPosition Float
    | AxTicks Bool
    | AxTickCount Int
    | AxTickSize Float
    | AxTitle String
    | AxTitleAlign HAlign
    | AxTitleAngle Float
    | AxTitleMaxLength Float
    | AxTitlePadding Float
    | AxValues (List Float)
    | AxDates (List (List DateTime))
    | AxZIndex Int


{-| _Note: specifying binding elements with type constructors (`IRange`,
`ICheckbox` etc.) is deprecated in favour of calling their equivalent input binding
functions (`iRange`, `iCheckbox` etc.)_

Describes the binding property of a selection based on some HTML input element
such as a checkbox or radio button. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/bind.html#scale-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)

-}
type Binding
    = IRange String (List InputProperty)
    | ICheckbox String (List InputProperty)
    | IRadio String (List InputProperty)
    | ISelect String (List InputProperty)
      -- TODO: Check validity: The following input types can generate a warning if options are included even if options appear to have an effect (e.g. placeholder)
    | IText String (List InputProperty)
    | INumber String (List InputProperty)
    | IDate String (List InputProperty)
    | ITime String (List InputProperty)
    | IMonth String (List InputProperty)
    | IWeek String (List InputProperty)
    | IDateTimeLocal String (List InputProperty)
    | ITel String (List InputProperty)
    | IColor String (List InputProperty)


{-| _Note: specifying binning properties with type constructors (`Base`,
`Extent` etc.) is deprecated in favour of calling their equivalent property
specifying functions (`biBase`, `biExtent` etc.)_

Type of binning property to customise. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/bin.html) for
more details.

-}
type BinProperty
    = Base Float
    | Divide Float Float -- Note when made private in next major release, this option will disappear in favour of more general list of possible divisors
    | Divides (List Float)
    | Extent Float Float
    | MaxBins Int
    | MinStep Float
    | Nice Bool
    | Step Float
    | Steps (List Float)


{-| Specify the number base to use for automatic bin determination (default is
base 10). For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biBase : Float -> BinProperty
biBase =
    Base


{-| Specify the scale factors indicating allowable subdivisions for binning.
The default value is [5, 2], which indicates that for base 10 numbers (the
default base), binning will consider dividing bin sizes by 5 and/or 2.
For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biDivide : List Float -> BinProperty
biDivide =
    Divides


{-| Specify the desired range of bin values when binning a collection of values.
The first and second parameters indicate the minumum and maximum range values
respectively. For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biExtent : Float -> Float -> BinProperty
biExtent =
    Extent


{-| Specify the maximum number of bins when binning a collection of values.
For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biMaxBins : Int -> BinProperty
biMaxBins =
    MaxBins


{-| Specify the step size between bins when binning a collection of values.
For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biMinStep : Float -> BinProperty
biMinStep =
    MinStep


{-| Specify whether or not binning boundaries use human-friendly values such as
multiples of ten. For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biNice : Bool -> BinProperty
biNice =
    Nice


{-| Specify an exact step size between bins when binning a collection of values.
For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biStep : Float -> BinProperty
biStep =
    Step


{-| Specify the allowable step sizes between bins when binning a collection of
values. For more details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
biSteps : List Float -> BinProperty
biSteps =
    Steps


{-| Used for creating logical compositions. _Note referencing BooleanOp type
constructors (`And`, `Not`, `Expr` etc.) is deprecated in favour of calling their
equivalent Boolean operation functions (`and`, `not`, `expr` etc.)_
-}
type BooleanOp
    = Expr String
    | Selection String
    | SelectionName String
    | And BooleanOp BooleanOp
    | Or BooleanOp BooleanOp
    | Not BooleanOp


{-| Indicates a channel type to be used in a resolution specification.
-}
type Channel
    = ChX
    | ChY
    | ChX2
    | ChY2
    | ChColor
    | ChOpacity
    | ChShape
    | ChSize


{-| Indicates the type of color interpolation to apply, when mapping a data field
onto a color scale. Note that color interpolation cannot be applied with the default
`sequential` color scale, so additionally, you should set the `sType` to another
continuous scale such as `linear`, `pow` etc.

Several of the interpolation options also require a `gamma` value (with 1 being
a recommended default to provide). These should be generated with the named functions
`cubeHelix`, `cubeHelixLong` and `rgb` rather than with a (deprecated) type constructor.

For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).

-}
type CInterpolate
    = CubeHelix Float
    | CubeHelixLong Float
    | Hcl
    | HclLong
    | Hsl
    | HslLong
    | Lab
    | Rgb Float


{-| Specifies whether or not a clipping rectangle is to be applied. If it is, the
function `clipRect` should be called rather than the (deprecated) type constructor
`LTRB`.
-}
type ClipRect
    = NoClip
    | LTRB Float Float Float Float


{-| Type of configuration property to customise. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/config.html)
for details.
-}
type ConfigurationProperty
    = AreaStyle (List MarkProperty)
    | Autosize (List Autosize)
    | Axis (List AxisConfig)
    | AxisX (List AxisConfig)
    | AxisY (List AxisConfig)
    | AxisLeft (List AxisConfig)
    | AxisRight (List AxisConfig)
    | AxisTop (List AxisConfig)
    | AxisBottom (List AxisConfig)
    | AxisBand (List AxisConfig)
    | Background String
    | BarStyle (List MarkProperty)
    | CircleStyle (List MarkProperty)
    | CountTitle String
    | FieldTitle FieldTitleProperty
    | Legend (List LegendConfig)
    | LineStyle (List MarkProperty)
    | MarkStyle (List MarkProperty)
    | NamedStyle String (List MarkProperty)
    | NumberFormat String
    | Padding Padding
    | PointStyle (List MarkProperty)
    | Projection (List ProjectionProperty)
    | Range (List RangeConfig)
    | RectStyle (List MarkProperty)
    | RemoveInvalid Bool
    | RuleStyle (List MarkProperty)
    | Scale (List ScaleConfig)
    | SelectionStyle (List ( Selection, List SelectionProperty ))
    | SquareStyle (List MarkProperty)
    | Stack StackProperty
    | TextStyle (List MarkProperty)
    | TickStyle (List MarkProperty)
    | TitleStyle (List TitleConfig)
    | TimeFormat String
    | View (List ViewConfig)
      -- Note: Trails appear unusual in having their own top-level config
      -- (see https://vega.github.io/vega-lite/docs/trail.html#config)
    | TrailStyle (List MarkProperty)


{-| Represents the type of cursor to display. For an explanation of each type,
see the [CSS documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Keyword%20values)
-}
type Cursor
    = CAuto
    | CDefault
    | CNone
    | CContextMenu
    | CHelp
    | CPointer
    | CProgress
    | CWait
    | CCell
    | CCrosshair
    | CText
    | CVerticalText
    | CAlias
    | CCopy
    | CMove
    | CNoDrop
    | CNotAllowed
    | CAllScroll
    | CColResize
    | CRowResize
    | CNResize
    | CEResize
    | CSResize
    | CWResize
    | CNEResize
    | CNWResize
    | CSEResize
    | CSWResize
    | CEWResize
    | CNSResize
    | CNESWResize
    | CNWSEResize
    | CZoomIn
    | CZoomOut
    | CGrab
    | CGrabbing


{-| Convenience type annotation label for use with data generation functions.

    myRegion : List DataColumn -> Data
    myRegion =
        dataFromColumns []
            << dataColumn "easting" (Numbers [ -3, 4, 4, -3, -3 ])
            << dataColumn "northing" (Numbers [ 52, 52, 45, 45, 52 ])

-}
type alias Data =
    ( VLProperty, Spec )


{-| Represents a single column of data. Used when generating inline data with
`dataColumn`.
-}
type alias DataColumn =
    List LabelledSpec


{-| Represents a single row of data. Used when generating inline data with
`dataRow`.
-}
type alias DataRow =
    Spec


{-| Indicates the type of data to be parsed when reading input data. For `FoDate`
and `FoUtc`, the formatting specification can be specified using
[D3's formatting specifiers](https://vega.github.io/vega-lite/docs/data.html#format)
or left as an empty string if default date formatting is to be applied. Care should
be taken when assuming default parsing of dates because different browsers can
parse dates differently. Being explicit about the date format is usually safer.
-}
type DataType
    = FoNumber
    | FoBoolean
    | FoDate String
    | FoUtc String


{-| A single data value. This is used when a function can accept values of different
types (e.g. either a number or a string).
-}
type DataValue
    = Boolean Bool
    | DateTime (List DateTime)
    | Number Float
    | Str String


{-| A list of data values. This is used when a function can accept lists of
different types (e.g. either a list of numbers or a list of strings).
-}
type DataValues
    = Booleans (List Bool)
    | DateTimes (List (List DateTime))
    | Numbers (List Float)
    | Strings (List String)


{-| Allows a date or time to be represented. This is typically part of a list of
`DateTime` items to provide a specific point in time. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/types.html#datetime).
-}
type DateTime
    = DTYear Int
    | DTQuarter Int
    | DTMonth MonthName
    | DTDate Int
    | DTDay DayName
    | DTHours Int
    | DTMinutes Int
    | DTSeconds Int
    | DTMilliseconds Int


{-| Identifies the day of the week.
-}
type DayName
    = Mon
    | Tue
    | Wed
    | Thu
    | Fri
    | Sat
    | Sun


{-| _Note: referencing detail channel type constructors (`DName`, `DBin` etc.)
is deprecated in favour of calling their equivalent detail channel functions
(`dName`, `dBin` etc.)_

Level of detail channel properties used for creating a grouped channel encoding.
For details see the
[Vega-Lite level of detail channel documentation](https://vega.github.io/vega-lite/docs/encoding.html#detail)

-}
type DetailChannel
    = DName String
    | DmType Measurement
    | DBin (List BinProperty)
    | DTimeUnit TimeUnit
    | DAggregate Operation



-- {-| Interaction events to support selection. For further details, see the
-- [Vega documentation](https://vega.github.io/vega/docs/event-streams).
-- -}
-- type Event
--     = Click
--     | DblClick
--     | DragEnter
--     | DragLeave
--     | DragOver
--     | KeyDown
--     | KeyPress
--     | KeyUp
--     | MouseDown
--     | MouseMove
--     | MouseOut
--     | MouseOver
--     | MouseUp
--     | MouseWheel
--     | TouchEnd
--     | TouchMove
--     | TouchStart
--     | Wheel


{-| _Note: referencing facet channel type constructors (`FName`, `FBin` etc.) is
deprecated in favour of calling their equivalent facet channel functions
(`fName`, `fBin` etc.)_

Types of facet channel property used for creating a composed facet view of small
multiples.

-}
type FacetChannel
    = FName String
    | FmType Measurement
    | FBin (List BinProperty)
    | FAggregate Operation
    | FTimeUnit TimeUnit
    | FHeader (List HeaderProperty)


{-| Provides details of the mapping between a row or column and its field
definitions in a set of faceted small multiples. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#mapping)
-}
type FacetMapping
    = ColumnBy (List FacetChannel)
    | RowBy (List FacetChannel)


{-| Indicates the style in which field names are displayed. The `Verbal` style is
'Sum of field', 'Year of date', 'field (binned)' etc. The `Function` style is
'SUM(field)', 'YEAR(date)', 'BIN(field)' etc. The `Plain` style is just the field
name without any additional text.
-}
type FieldTitleProperty
    = Verbal
    | Function
    | Plain


{-| Type of filtering operation. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html)
for details.
-}
type Filter
    = FEqual String DataValue
    | FExpr String
    | FCompose BooleanOp
    | FSelection String
    | FOneOf String DataValues
    | FRange String FilterRange


{-| A pair of filter range data values. The first argument is the inclusive minimum
vale to accept and the second the inclusive maximum.
-}
type FilterRange
    = NumberRange Float Float
    | DateRange (List DateTime) (List DateTime)


{-| Indicates the weight options for a font.
-}
type FontWeight
    = Bold
    | Bolder
    | Lighter
    | Normal
    | W100
    | W200
    | W300
    | W400
    | W500
    | W600
    | W700
    | W800
    | W900


{-| Specifies the type of format a data source uses. If the format is indicated by
the file name extension (`.tsv`, `.csv`, `.json`) there is no need to indicate the
format explicitly. However this can be useful if (a) the filename extension does not
indicate type (e.g. `.txt`) or you wish to customise the parsing of a file. For
example, when specifying the `JSON` format, its parameter indicates the name of
property field containing the attribute data to extract. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format).
-}
type Format
    = JSON String
    | CSV
    | TSV
    | TopojsonFeature String
    | TopojsonMesh String
    | Parse (List ( String, DataType ))


{-| Specifies the type and content of geometry specifications for programatically
creating GeoShapes. These can be mapped to the
[GeoJson geometry object types](https://tools.ietf.org/html/rfc7946#section-3.1)
where the pluralised type names refer to their `Multi` prefixed equivalent in the
GeoJSON specification.
-}
type Geometry
    = GeoPoint Float Float
    | GeoPoints (List ( Float, Float ))
    | GeoLine (List ( Float, Float ))
    | GeoLines (List (List ( Float, Float )))
    | GeoPolygon (List (List ( Float, Float )))
    | GeoPolygons (List (List (List ( Float, Float ))))


{-| Indicates the horizontal alignment of some text such as on an axis or legend.
-}
type HAlign
    = AlignCenter
    | AlignLeft
    | AlignRight


{-| Represents a facet header property. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#header)
-}
type HeaderProperty
    = HFormat String
    | HTitle String


{-| _Note: referencing hyperlink channel type constructors (`HName`, `HBin` etc.)
is deprecated in favour of calling their equivalent hyperlink channel functions
(`hName`, `hBin` etc.)_

Types of hyperlink channel property used for linking marks or text to URLs.

-}
type HyperlinkChannel
    = HName String
    | HRepeat Arrangement
    | HmType Measurement
    | HBin (List BinProperty)
    | HAggregate Operation
    | HTimeUnit TimeUnit
    | HSelectionCondition BooleanOp (List HyperlinkChannel) (List HyperlinkChannel)
    | HDataCondition BooleanOp (List HyperlinkChannel) (List HyperlinkChannel)
    | HString String


{-| GUI Input properties. The type of relevant property will depend on the type of
input element selected. For example an `InRange` (slider) can have numeric min,
max and step values; InSelect (selector) has a list of selection label options.
For details see the
[Vega input element binding documentation](https://vega.github.io/vega/docs/signals/#bind).
The `debounce` property, available for all input types allows a delay in input event
handling to be added in order to avoid unnecessary event broadcasting. The `Element`
property is an optional CSS selector indicating the parent element to which the
input element should be added. This allows the option of the input element to be
outside the visualization container.
-}
type InputProperty
    = Debounce Float
    | Element String
    | InOptions (List String)
    | InMin Float
    | InMax Float
    | InName String
    | InStep Float
    | InPlaceholder String


{-| Represents a named Vega-Lite specification, usually generated by an elm-vega
function. You shouldn't need to create `LabelledSpec` tuples directly, but they
can be useful for type annotations.
-}
type alias LabelledSpec =
    ( String, Spec )


{-| Indicates the type of legend to create. Gradient legends are usually used for
continuous quantitative data while symbol legends used for categorical data.
-}
type Legend
    = Gradient
    | Symbol


{-| Legend configuration options. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
type LegendConfig
    = CornerRadius Float
    | FillColor String
    | Orient LegendOrientation
    | Offset Float
    | StrokeColor String
    | LeStrokeDash (List Float)
    | LeStrokeWidth Float
    | LePadding Float
    | GradientLabelBaseline VAlign
    | GradientLabelLimit Float
    | GradientLabelOffset Float
    | GradientStrokeColor String
    | GradientStrokeWidth Float
    | GradientHeight Float
    | GradientWidth Float
    | LeLabelAlign HAlign
    | LeLabelBaseline VAlign
    | LeLabelColor String
    | LeLabelFont String
    | LeLabelFontSize Float
    | LeLabelLimit Float
    | LeLabelOffset Float
    | LeShortTimeLabels Bool
    | EntryPadding Float
    | SymbolColor String
    | SymbolType Symbol
    | SymbolSize Float
    | SymbolStrokeWidth Float
    | LeTitleAlign HAlign
    | LeTitleBaseline VAlign
    | LeTitleColor String
    | LeTitleFont String
    | LeTitleFontSize Float
    | LeTitleFontWeight FontWeight
    | LeTitleLimit Float
    | LeTitlePadding Float


{-| Indicates the legend orientation. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config)
for more details.
-}
type LegendOrientation
    = BottomLeft
    | BottomRight
    | Left
    | None
    | Right
    | TopLeft
    | TopRight


{-| Legend properties. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
type LegendProperty
    = LEntryPadding Float
    | LFormat String
    | LOffset Float
    | LOrient LegendOrientation
    | LPadding Float
    | LTickCount Float
    | LTitle String
    | LType Legend
    | LValues LegendValues
    | LZIndex Int


{-| A list of data values suitable for setting legend values.
-}
type LegendValues
    = LDateTimes (List (List DateTime))
    | LNumbers (List Float)
    | LStrings (List String)


{-| _Note: referencing mark type constructors (`mark Area`, `mark Bar` etc.) is
deprecated in favour of calling their equivalent mark functions (`area`, `bar` etc.)_

Type of visual mark used to represent data in the visualization.

-}
type Mark
    = Area
    | Bar
    | Circle
    | Geoshape
    | Line
    | Point
    | Rect
    | Rule
    | Square
    | Text
    | Tick
    | Trail


{-| _Note: referencing mark channel type constructors (`MName`, `MBin` etc.) is
deprecated in favour of calling their equivalent mark channel functions
(`mName`, `mBin` etc.)_

Mark channel properties used for creating a mark channel encoding.

-}
type MarkChannel
    = MName String
    | MRepeat Arrangement
    | MmType Measurement
    | MScale (List ScaleProperty)
    | MBin (List BinProperty)
    | MTimeUnit TimeUnit
    | MAggregate Operation
    | MLegend (List LegendProperty)
    | MSelectionCondition BooleanOp (List MarkChannel) (List MarkChannel)
    | MDataCondition BooleanOp (List MarkChannel) (List MarkChannel)
    | MPath String
    | MNumber Float
    | MString String
    | MBoolean Bool


{-| Indicates mark interpolation style. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/mark.html#mark-def)
for details.
-}
type MarkInterpolation
    = Basis
    | BasisClosed
    | BasisOpen
    | Bundle
    | Cardinal
    | CardinalClosed
    | CardinalOpen
    | Linear
    | LinearClosed
    | Monotone
    | StepAfter
    | StepBefore
    | Stepwise


{-| Indicates desired orientation of a mark (e.g. horizontally or vertically
oriented bars.)
-}
type MarkOrientation
    = Horizontal
    | Vertical


{-| Properties for customising the appearance of a mark. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/mark.html#config).
-}
type
    MarkProperty
    -- Note some of the following properties are specific options for particular
    -- types of mark (e.g. `bar`, `textMark` and `tick`) but for simplicity of the API,
    --  carry over for the general case: MBandSize, MBinSpacing, MClip, MContinuousBandSize,
    -- MDiscreteBandSize, MShortTimeLabels and  MThickness.
    = MAlign HAlign
    | MAngle Float
    | MBandSize Float
    | MBaseline VAlign
    | MBinSpacing Float
    | MClip Bool
    | MColor String
    | MCursor Cursor
    | MContinuousBandSize Float
    | MDiscreteBandSize Float
    | MdX Float
    | MdY Float
    | MFill String
    | MFilled Bool
    | MFillOpacity Float
    | MFont String
    | MFontSize Float
    | MFontStyle String
    | MFontWeight FontWeight
    | MInterpolate MarkInterpolation
    | MOpacity Float
    | MOrient MarkOrientation
    | MRadius Float
    | MShape Symbol
    | MShortTimeLabels Bool
    | MSize Float
    | MStroke String
    | MStrokeDash (List Float)
    | MStrokeDashOffset Float
    | MStrokeOpacity Float
    | MStrokeWidth Float
    | MStyle (List String)
    | MTension Float
    | MText String
    | MTheta Float
    | MThickness Float


{-| Type of measurement to be associated with some channel. `Nominal` data are
categories identified by name alone and which have no intrinsic order. `Ordinal`
data are also categories, but ones which have some natural order. `Quantitative`
data are numeric measurements typically on a continuous scale. `Temporal` data
describe time.

Geospatial position encoding (`Longitude` and `Latitude`) should specify the `pMType`
as `Quantitative`. Geographically referenced features encoded as `shape` marks
should specify `mMType` as `GeoFeature` (Vega-Lite currently refers to this type
as [geojson](https://vega.github.io/vega-lite/docs/encoding.html)).

-}
type Measurement
    = Nominal
    | Ordinal
    | Quantitative
    | Temporal
    | GeoFeature


{-| Idntifies a month of the year.
-}
type MonthName
    = Jan
    | Feb
    | Mar
    | Apr
    | May
    | Jun
    | Jul
    | Aug
    | Sep
    | Oct
    | Nov
    | Dec


{-| Type of aggregation operation. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/aggregate.html#ops)
for more details.
-}
type Operation
    = ArgMax
    | ArgMin
    | Average
    | CI0
    | CI1
    | Count
    | Distinct
    | Max
    | Mean
    | Median
    | Min
    | Missing
    | Q1
    | Q3
    | Stderr
    | Stdev
    | StdevP
    | Sum
    | Valid
    | Variance
    | VarianceP


{-| _Note: referencing order channel type constructors (`OName`, `OBin` etc.) is
deprecated in favour of calling their equivalent order channel functions
(`oName`, `oBin` etc.)_

Properties of an ordering channel used for sorting data fields.

-}
type OrderChannel
    = OName String
    | ORepeat Arrangement
    | OmType Measurement
    | OBin (List BinProperty)
    | OAggregate Operation
    | OTimeUnit TimeUnit
    | OSort (List SortProperty)


{-| Type of overlap strategy to be applied when there is not space to show all items
on an axis. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/axis.html#labels)
for more details.
-}
type OverlapStrategy
    = ONone
    | OParity
    | OGreedy


{-| Represents padding dimensions in pixel units. `PSize` will set the same value
on all four edges of a rectangular container while `PEdges` can be used to specify
different sizes on each edge in order _left_, _top_, _right_, _bottom_.
-}
type Padding
    = PSize Float
    | PEdges Float Float Float Float


{-| Type of position channel, `X` and `Y` represent horizontal and vertical axis
dimensions on a plane and `X2` and `Y2` represent secondary axis dimensions where
two scales are overlaid in the same space. Geographic positions represented by
longitude and latiutude values are identified with `Longitude`, `Latitude` and
their respective secondary equivalents. Such geographic position channels are
subject to a map projection before being placed graphically.
-}
type Position
    = X
    | Y
    | X2
    | Y2
    | Longitude
    | Latitude
    | Longitude2
    | Latitude2


{-| _Note: referencing position channel type constructors (`PName`, `PBin` etc.) is
deprecated in favour of calling their equivalent position channel functions
(`pName`, `pBin` etc.)_

Position channel properties used for creating a position channel encoding.

-}
type PositionChannel
    = PName String
    | PRepeat Arrangement
    | PmType Measurement
    | PBin (List BinProperty)
    | PTimeUnit TimeUnit
    | PAggregate Operation
    | PScale (List ScaleProperty)
    | PAxis (List AxisProperty)
    | PSort (List SortProperty)
    | PStack StackProperty


{-| Types of geographic map projection. These are based on a subset of those provided
by the [d3-geo library](https://github.com/d3/d3-geo). For details of available
projections see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/projection.html#projection-types).

_Note: The use of the `Custom` type constructor is deprecated in favour of the
`customProjection` function._

-}
type Projection
    = Albers
    | AlbersUsa
    | AzimuthalEqualArea
    | AzimuthalEquidistant
    | ConicConformal
    | ConicEqualArea
    | ConicEquidistant
    | Custom String
    | Equirectangular
    | Gnomonic
    | Mercator
    | Orthographic
    | Stereographic
    | TransverseMercator


{-| Properties for customising a geospatial projection that converts longitude/latitude
pairs into planar (x,y) coordinate pairs for rendering and query. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/projection.html).
-}
type ProjectionProperty
    = PType Projection
    | PClipAngle (Maybe Float)
    | PClipExtent ClipRect
    | PCenter Float Float
    | PRotate Float Float Float
    | PPrecision Float
    | PCoefficient Float
    | PDistance Float
    | PFraction Float
    | PLobes Int
    | PParallel Float
    | PRadius Float
    | PRatio Float
    | PSpacing Float
    | PTilt Float


{-| Properties for customising the colors of a range. The parameter should be a
named color scheme such as `accent` or `purpleorange-11`. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
type RangeConfig
    = RCategory String
    | RDiverging String
    | RHeatmap String
    | ROrdinal String
    | RRamp String
    | RSymbol String


{-| Create a list of fields to use in set of repeated small multiples. The list of
fields named here can be referenced in an encoding with `PRepeat Column`, `PRepeat Row`
etc.
-}
type RepeatFields
    = RowFields (List String)
    | ColumnFields (List String)


{-| Indicated whether or not a scale domain should be independent of others in a
composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.
-}
type Resolution
    = Shared
    | Independent


{-| Used to determine how a channel's axis, scale or legend domains should be resolved
if defined in more than one view in a composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.
-}
type Resolve
    = RAxis (List ( Channel, Resolution ))
    | RLegend (List ( Channel, Resolution ))
    | RScale (List ( Channel, Resolution ))


{-| Used to indicate the type of scale transformation to apply.
-}
type Scale
    = ScLinear
    | ScPow
    | ScSqrt
    | ScLog
    | ScTime
    | ScUtc
    | ScSequential
    | ScOrdinal
    | ScBand
    | ScPoint
    | ScBinLinear
    | ScBinOrdinal


{-| Scale configuration property. These are used to configure all scales.
For more details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
type ScaleConfig
    = SCBandPaddingInner Float
    | SCBandPaddingOuter Float
    | SCClamp Bool
    | SCMaxBandSize Float
    | SCMinBandSize Float
    | SCMaxFontSize Float
    | SCMinFontSize Float
    | SCMaxOpacity Float
    | SCMinOpacity Float
    | SCMaxSize Float
    | SCMinSize Float
    | SCMaxStrokeWidth Float
    | SCMinStrokeWidth Float
    | SCPointPadding Float
    | SCRangeStep (Maybe Float)
    | SCRound Bool
    | SCTextXRangeStep Float
    | SCUseUnaggregatedDomain Bool


{-| Describes the scale domain (type of data in scale). For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).
-}
type ScaleDomain
    = DNumbers (List Float)
    | DStrings (List String)
    | DDateTimes (List (List DateTime))
    | DSelection String
    | Unaggregated


{-| Describes the way a scale can be rounded to 'nice' numbers. For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).
-}
type ScaleNice
    = NMillisecond
    | NSecond
    | NMinute
    | NHour
    | NDay
    | NWeek
    | NMonth
    | NYear
    | NInterval TimeUnit Int
    | IsNice Bool
    | NTickCount Int


{-| Individual scale property. These are used to customise an individual scale
transformation. To customise all scales use `config` and supply relevant
`ScaleConfig` values. For more details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html)
-}
type ScaleProperty
    = SType Scale
    | SDomain ScaleDomain
    | SRange ScaleRange
    | SScheme String (List Float)
    | SPadding Float
    | SPaddingInner Float
    | SPaddingOuter Float
    | SRangeStep (Maybe Float)
    | SRound Bool
    | SClamp Bool
      -- TODO:  Need to restrict set of valid scale types that work with color interpolation.
    | SInterpolate CInterpolate
    | SNice ScaleNice
    | SZero Bool
      -- TODO: Check: This is a Vega, not Vega-Lite property so can generate a warning if validated against the Vega-Lite spec.
    | SReverse Bool


{-| Describes a scale range of scale output values. For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#range).
-}
type ScaleRange
    = RNumbers (List Float)
    | RStrings (List String)
    | RName String


{-| Indicates the type of selection to be generated by the user. `Single` allows
one mark at a time to be selected. 'Multi' allows multiple items to be selected
(e.g. with shift-click). 'Interval' allows a bounding rectangle to be dragged by
user to select all items intersecting with it.
-}
type Selection
    = Single
    | Multi
    | Interval


{-| Properties for customising the appearance of an interval selection mark (dragged
rectangle). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
type SelectionMarkProperty
    = SMFill String
    | SMFillOpacity Float
    | SMStroke String
    | SMStrokeOpacity Float
    | SMStrokeWidth Float
    | SMStrokeDash (List Float)
    | SMStrokeDashOffset Float


{-| Properties for customising the nature of the selection. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#selection-properties)
for details. When linking a selection property to an event stream with `On`, `Translate`
or `Zoom`, a String should be provided describing the event stream as detailed in the
[Vega event stream documentation](https://vega.github.io/vega/docs/event-streams).
If an empty string is provided, the property is set to `false`. The `Toggle` option
expects a [Vega expression](https://vega.github.io/vega/docs/expressions) that evaluates
to either true or false.
-}
type SelectionProperty
    = On String
    | Translate String
    | Zoom String
    | Fields (List String)
    | Encodings (List Channel)
    | Empty
    | ResolveSelections SelectionResolution
    | SelectionMark (List SelectionMarkProperty)
    | BindScales
    | Bind (List Binding)
    | Nearest Bool
    | Toggle String


{-| Determines how selections in faceted or repeated views are resolved. See the
[Vege-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#resolve)
for details
-}
type SelectionResolution
    = Global
    | Union
    | Intersection


{-| Represents one side of a rectangular space.
-}
type Side
    = STop
    | SBottom
    | SLeft
    | SRight


{-| Allow type of sorting to be customised. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/sort.html).
-}
type SortProperty
    = Ascending
    | Descending
      -- TODO: If ByField or ByRepeat is used, Op must also be specified. Therefore
      -- in future versions, make Op a second tag for these and remove it as a separate option.
      -- Should not do this yet until major version upgrate as it will break previous versions.
    | ByField String
    | ByRepeat Arrangement
    | Op Operation
    | CustomSort DataValues


{-| Represents part or all of Vega-Lite specification. Specs can be (and usually
are) nested. They can range from a single Boolean value up to the entire Vega-Lite
specification.
-}
type alias Spec =
    JE.Value


{-| Describes the type of stacking to apply to a bar chart.
-}
type StackProperty
    = StZero
    | StNormalize
    | StCenter
    | NoStack


{-| Identifies the type of symbol.

_Note: The use of the `Path` type constructor is deprecated in favour of the
`symbolPath` function._

-}
type Symbol
    = SymCircle
    | SymSquare
    | Cross
    | Diamond
    | TriangleUp
    | TriangleDown
    | Path String


{-| _Note: referencing text channel type constructors (`TName`, `TBin` etc.) is
deprecated in favour of calling their equivalent text channel functions
(`tName`, `tBin` etc.)_

Types of text channel property used for displaying text as part of the visualization.

-}
type TextChannel
    = TName String
    | TRepeat Arrangement
    | TmType Measurement
    | TBin (List BinProperty)
    | TAggregate Operation
    | TTimeUnit TimeUnit
    | TSelectionCondition BooleanOp (List TextChannel) (List TextChannel)
    | TDataCondition BooleanOp (List TextChannel) (List TextChannel)
    | TFormat String


{-| Describes a unit of time. Useful for encoding and transformations. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
for further details.

To encode a time as UTC (coordinated universal time, independent of local time
zones or daylight saving), provide a time unit to the `utc` function.
For example,

    encoding
        << position X [ pName "date", pMType Temporal, pTimeUnit (utc YearMonthDateHours) ]

-}
type TimeUnit
    = Year
    | YearQuarter
    | YearQuarterMonth
    | YearMonth
    | YearMonthDate
    | YearMonthDateHours
    | YearMonthDateHoursMinutes
    | YearMonthDateHoursMinutesSeconds
    | Quarter
    | QuarterMonth
    | Month
    | MonthDate
    | Date
    | Day
    | Hours
    | HoursMinutes
    | HoursMinutesSeconds
    | Minutes
    | MinutesSeconds
    | Seconds
    | SecondsMilliseconds
    | Milliseconds
    | Utc TimeUnit


{-| Title configuration properties. These are used to configure the default style
of all titles within a visualization.
For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/title.html#config)
-}
type TitleConfig
    = TAnchor APosition
    | TAngle Float
    | TBaseline VAlign
    | TColor String
    | TFont String
    | TFontSize Float
    | TFontWeight FontWeight
    | TLimit Float
    | TOffset Float
    | TOrient Side


{-| Indicates the vertical alignment of some text that may be attached to a mark.
-}
type VAlign
    = AlignTop
    | AlignMiddle
    | AlignBottom


{-| View configuration property. These are used to configure the style of a single
view within a visualization such as its size and default fill and stroke colors.
For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/spec.html#config)
-}
type ViewConfig
    = ViewWidth Float
    | ViewHeight Float
    | Clip Bool
    | Fill (Maybe String)
    | FillOpacity Float
    | Stroke (Maybe String)
    | StrokeOpacity Float
    | StrokeWidth Float
    | StrokeDash (List Float)
    | StrokeDashOffset Float


{-| Top-level Vega-Lite properties. These are the ones that define the core of the
visualization grammar. All `VLProperties` are created by functions which can be
arranged into seven broad groups.

**Data Properties** relate to the input data to be visualized. Generated by
[`dataFromColumns`](#dataFromColumns), [`dataFromRows`](#dataFromRows),
[`dataFromUrl`](#dataFromUrl), [`dataFromSource`](#dataFromSource) and
[`dataFromJson`](#dataFromJson).

**Transform Properties** indicate that some transformation of input data should
be applied before encoding them visually. Generated by [`transform`](#transform)
and [`projection`](#projection) they can include data transformations such as `filter`,
`binAs` and `calculateAs` and geo transformations of longitude, latitude coordinates
used by marks such as those generated by `geoshape`, `point` and `line`.

**Mark Functions** relate to the symbols used to visualize data items. Generated
by functions such as [`circle`](#circle), [`bar`](#bar) and [`line`](#line).

**Encoding Properties** specify which data elements are mapped to which mark characteristics
(known as _channels_). Generated by [`encoding`](#encoding) they include encodings
such as `position`, `color`, `size`, `shape` `text` and `hyperlink`.

**Composition Properties** allow visualization views to be combined to form more
complex visualizations. Generated by [`layer`](#layer), [`repeat`](#repeat),
[`facet`](#facet), [`hConcat`](#hConcat), [`vConcat`](#vConcat), [`spec`](#spec)
and [`resolve`](#resolve).

**Interaction Properties** allow interactions such as clicking, dragging and others
generated via a GUI or data stream to influence the visualization. Generated by
[`selection`](#selection).

**Supplementary and Configuration Properties** provide a means to add metadata and
styling to one or more visualizations. Generated by [`name`](#name), [`title`](#title),
[`description`](#description), [`background`](#background), [`width`](#width),
[`height`](#height), [`padding`](#padding), [`autosize`](#autosize) and
[`configure`](#configure).

-}
type VLProperty
    = VLName
    | VLDescription
    | VLTitle
    | VLWidth
    | VLHeight
    | VLAutosize
    | VLPadding
    | VLBackground
    | VLData
    | VLDatasets
    | VLMark
    | VLTransform
    | VLProjection
    | VLEncoding
    | VLLayer
    | VLHConcat
    | VLVConcat
    | VLRepeat
    | VLFacet
    | VLSpec
    | VLResolve
    | VLConfig
    | VLSelection


{-| Defines a set of named aggregation transformations to be used when encoding
channels. This is useful when, for example, you wish to apply the same transformation
to a number of channels but do not want to define it each time. The first parameter is
a list of the named aggregation operations to apply. The second parameter is a list
of 'group by' fields. The third parameter is the list of transformations to which
this is to be added. For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/aggregate.html#aggregate-op-def).

    trans =
        transform
            << aggregate
                [ opAs Min "people" "lowerBound", opAs Max "people" "upperBound" ]
                [ "age" ]

-}
aggregate : List Spec -> List String -> List LabelledSpec -> List LabelledSpec
aggregate ops groups =
    (::) ( "aggregate", JE.list [ JE.list ops, JE.list (List.map JE.string groups) ] )


{-| Apply an 'and' Boolean operation as part of a logical composition.

    and (expr "datum.IMDB_Rating === null") (expr "datum.Rotten_Tomatoes_Rating === null")

-}
and : BooleanOp -> BooleanOp -> BooleanOp
and op1 op2 =
    And op1 op2


{-| Specify an area mark. An area mark is used for representing a series of data
elements, such as in a stacked area chart or streamgraph. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/area.html).

    area [ MStroke "white" ]

To keep the default style for the mark, just provide an empty list as the parameter.

    area []

-}
area : List MarkProperty -> ( VLProperty, Spec )
area =
    mark Area


{-| Create a specification sufficient to define an element in a composed visualization
such as a superposed layer or juxtaposed facet. Typically a layer will contain a
full set of specifications that define a visualization with
the exception of the data specification which is usually defined outside of any one
layer. Whereas for repeated and faceted specs, the entire specification is provided.

    enc1 = ...
    spec1 =
        asSpec [ enc1, line [] ]

-}
asSpec : List ( VLProperty, Spec ) -> Spec
asSpec specs =
    List.map (\( s, v ) -> ( vlPropertyLabel s, v )) specs
        |> JE.object


{-| Declare the way the view is sized. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/size.html#autosize)
for details.

    enc = ...
    toVegaLite
        [ width 250
        , height 300
        , autosize [ AFit, APadding, AResize ]
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
autosize : List Autosize -> ( VLProperty, Spec )
autosize aus =
    ( VLAutosize, JE.object (List.map autosizeProperty aus) )


{-| Specify the date/times to appear along an axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axDates : List (List DateTime) -> AxisProperty
axDates =
    AxDates


{-| Specify whether or not the axis baseline (domain) should be included as part
of an axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axDomain : Bool -> AxisProperty
axDomain =
    AxDomain


{-| Specify the [format](https://vega.github.io/vega-lite/docs/format.html)
to apply to labels on an axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axFormat : String -> AxisProperty
axFormat =
    AxFormat


{-| Specify whether or not grid lones should be included as part of an axis.
For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axGrid : Bool -> AxisProperty
axGrid =
    AxGrid


{-| Specify the rotation angle in degrees of axis lables. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axLabelAngle : Float -> AxisProperty
axLabelAngle =
    AxLabelAngle


{-| Specify the overlap strategy for labels when they are too large to fit within
the space devoted to an axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axLabelOverlap : OverlapStrategy -> AxisProperty
axLabelOverlap =
    AxLabelOverlap


{-| Specify the padding in pixels between an axis and its text labels. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axLabelPadding : Float -> AxisProperty
axLabelPadding =
    AxLabelPadding


{-| Specify whether or not axis labels should be displayed. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axLabels : Bool -> AxisProperty
axLabels =
    AxLabels


{-| Specify the maximum extent in pixels that axis ticks and labels should use.
This determines a maximum offset value for axis titles. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axMaxExtent : Float -> AxisProperty
axMaxExtent =
    AxMaxExtent


{-| Specify the minimum extent in pixels that axis ticks and labels should use.
This determines a minimum offset value for axis titles. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axMinExtent : Float -> AxisProperty
axMinExtent =
    AxMinExtent


{-| Specify the offset, in pixels, by which to displace the axis from the edge
of the enclosing group or data rectangle. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axOffset : Float -> AxisProperty
axOffset =
    AxOffset


{-| Specify the orientation of an axis relative to the plot it is describing. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axOrient : Side -> AxisProperty
axOrient =
    AxOrient


{-| Specify the anchor position of the axis in pixels. For x-axis with top or
bottom orientation, this sets the axis group x coordinate. For y-axis with left
or right orientation, this sets the axis group y coordinate. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axPosition : Float -> AxisProperty
axPosition =
    AxPosition


{-| Specify whether or not an axis should include tick marks. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTicks : Bool -> AxisProperty
axTicks =
    AxTicks


{-| Specify the desired number of ticks, for axes visualizing quantitative scales.
The resulting number may be different so that values are “nice” (multiples of 2, 5, 10)
and lie within the underlying scale’s range. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTickCount : Int -> AxisProperty
axTickCount =
    AxTickCount


{-| Specify the tick mark size in pixels. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTickSize : Float -> AxisProperty
axTickSize =
    AxTickSize


{-| Specify the title to display as part of an axis. An empty string can be used
to prevent a title being displayed. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTitle : String -> AxisProperty
axTitle =
    AxTitle


{-| Specify the horizontal alignment of an axis title. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTitleAlign : HAlign -> AxisProperty
axTitleAlign =
    AxTitleAlign


{-| Specify the angle in degrees of an axis title. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTitleAngle : Float -> AxisProperty
axTitleAngle =
    AxTitleAngle


{-| Specify the maximum length for an axis title for cases where the title is
automatically generated from a field’s description. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTitleMaxLength : Float -> AxisProperty
axTitleMaxLength =
    AxTitleMaxLength


{-| Specify the padding in pixels between a title and axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axTitlePadding : Float -> AxisProperty
axTitlePadding =
    AxTitlePadding


{-| Specify the numeric values to appear along an axis. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axValues : List Float -> AxisProperty
axValues =
    AxValues


{-| Specify the drawing order of the axis relative to the other chart elements.
A value of 1 indicates axis is drawn in front of chart marks, 0 indicates it is
drawn behind them. For details see the
[Vega axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)
-}
axZIndex : Int -> AxisProperty
axZIndex =
    AxZIndex


{-| Set the background color of the visualization. Should be specified with a CSS
string such as `#ffe` or `rgb(200,20,150)`. If not specified the background will
be transparent.

    enc = ...
    toVegaLite
        [ background "rgb(251,247,238)"
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
background : String -> ( VLProperty, Spec )
background colour =
    ( VLBackground, JE.string colour )


{-| Specify an bar mark. Bars are used for histograms, bar charts etc. for showing
the magnitude of values in categories. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/bar.html).

    bar [ MFill "black", MStroke "white", MStrokeWeight 2 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    bar []

-}
bar : List MarkProperty -> ( VLProperty, Spec )
bar =
    mark Bar


{-| _Deprecated in favour of channel-specific binning (e.g. `pBin`, `oBin` etc.)_
-}
bin : List BinProperty -> LabelledSpec
bin bProps =
    -- TODO: This should not need to be exposed - only maintained for backward
    -- compatiblity after its previous function was renamed to binAs. In next
    -- major version, make private.
    if bProps == [] then
        ( "bin", JE.bool True )
    else
        ( "bin", bProps |> List.map binProperty |> JE.object )


{-| Create a named binning transformation that may be referenced in other Transformations
or encodings. The type of binning can be customised with a list of `BinProperty`
generating functions (`biBase`, `biDivide` etc.) or an empty list to use the default
binning. For more details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/bin.html).

    trans =
        transform
            << binAs [ MaxBins 3 ] "IMDB_Rating" "ratingGroup"

Note that usually, direct binning within an encoding is preferred over this form
of bin transformation.

-}
binAs : List BinProperty -> String -> String -> List LabelledSpec -> List LabelledSpec
binAs bProps field label =
    if bProps == [] then
        (::) ( "bin", JE.list [ JE.bool True, JE.string field, JE.string label ] )
    else
        (::) ( "bin", JE.list [ bProps |> List.map binProperty |> JE.object, JE.string field, JE.string label ] )


{-| Creates a new data field based on calculations from existing fields.
The first parameter is an expression representing the calculation and the second
is the name to give the newly calculated field. This third parameter is a list of
any previous calculations to which this is to be added. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/calculate.html)
for further details.

    trans =
        transform << calculateAs "datum.sex == 2 ? 'F' : 'M'" "gender"

-}
calculateAs : String -> String -> List LabelledSpec -> List LabelledSpec
calculateAs expr label =
    (::) ( "calculate", JE.list [ JE.string expr, JE.string label ] )


{-| Create a set of discrete domain to color mappings suitable for customising categorical
scales. The first item in each tuple should be a domain value and the second the
color value with which it should be associated. It is a convenience function equivalent
to specifying separate `SDomain` and `SRange` lists and is safer as it guarantees
a one-to-one correspondence between domain and range values.

    color
        [ mName "weather"
        , mMType Nominal
        , mScale <|
            categoricalDomainMap
                [ ( "sun", "yellow" )
                , ( "rain", "blue" )
                , ( "fog", "grey" )
                ]
        ]

-}
categoricalDomainMap : List ( String, String ) -> List ScaleProperty
categoricalDomainMap scaleDomainPairs =
    let
        ( domain, range ) =
            List.unzip scaleDomainPairs
    in
    [ SDomain (DStrings domain), SRange (RStrings range) ]


{-| Specify a circle mark for symbolising points. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/circle.html).

    circle [ MStroke "red", MStrokeWeight 2 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    circle []

-}
circle : List MarkProperty -> ( VLProperty, Spec )
circle =
    mark Circle


{-| Specify a clipping rectangle in pixel units. The four parameters are respectively
'left', 'top', 'right' and 'bottom' of the rectangular clipping bounds.
-}
clipRect : Float -> Float -> Float -> Float -> ClipRect
clipRect l t r b =
    LTRB l t r b


{-| Encode a color channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by color. The second parameter
is a list of any previous channels to which this color channel should be added.

    color [ mName "Species", mMType Nominal ] []

Encoding a color channel will generate a legend by default. To stop the legend
appearing, just supply an empty list of legend properties to `MLegend` :

    color [ mName "Species", mMType Nominal, mLegend [] ] []

-}
color : List MarkChannel -> List LabelledSpec -> List LabelledSpec
color markProps =
    (::) ( "color", List.concatMap markChannelProperty markProps |> JE.object )


{-| Encodes a new facet to be arranged in columns. The first parameter is a list
of properties that define the faceting channel. This should include at least the
name of the data field and its measurement type. The final parameter is a list of
any previous channels to which this is to be added. This is usually implicit when
chaining encodings using functional composition

    enc =
        encoding
            << position X [ pName "people", pMType Quantitative ]
            << position Y [ pName "gender", pMType Nominal ]
            << column [ fName "age", fMType Ordinal ]

-}
column : List FacetChannel -> List LabelledSpec -> List LabelledSpec
column fFields =
    (::) ( "column", JE.object (List.map facetChannelProperty fFields) )


{-| Combines a list of labelled specifications into a single specification that
may be passed to JavaScript for rendering. This is useful when you wish to create
a single page with multiple visulizualizations.

    combineSpecs
        [ ( "vis1", myFirstVis )
        , ( "vis2", mySecondVis )
        , ( "vis3", myOtherVis )
        ]

-}
combineSpecs : List LabelledSpec -> Spec
combineSpecs specs =
    JE.object specs


{-| Defines a single configuration option to be applied globally across the visualization.
The first parameter identifies the type of configuration, the second a list of previous
configurations to which this one may be added.

    configuration (Axis [ DomainWidth 4 ]) []

-}
configuration : ConfigurationProperty -> List LabelledSpec -> List LabelledSpec
configuration cfg =
    (::) (configProperty cfg)


{-| Create a single global configuration from a list of configuration specifications.
Configurations are applied to all relevant items in the specification. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/config.html) for
more details.

    config =
        configure
            << configuration (Axis [ DomainWidth 1 ])
            << configuration (View [ Stroke (Just "transparent") ])
            << configuration (SelectionStyle [ ( Single, [ On "dblclick" ] ) ])

-}
configure : List LabelledSpec -> ( VLProperty, Spec )
configure configs =
    ( VLConfig, JE.object configs )


{-| Specify a cube helix color interpolation for continuous color scales. The
parameter is the gamma value to use in interpolation (anchored at 1).
-}
cubeHelix : Float -> CInterpolate
cubeHelix =
    CubeHelix


{-| Specify a long-path cube helix color interpolation for continuous color scales.
The parameter is the gamma value to use in interpolation (anchored at 1).
-}
cubeHelixLong : Float -> CInterpolate
cubeHelixLong =
    CubeHelixLong


{-| Specify a custom projection type. Additional custom projections from d3 can
be defined via the [Vega API](https://vega.github.io/vega/docs/projections/#register)
and called from with this function where the parameter is the name of the D3
projection to use (e.g. `customProjection winkel3`).
-}
customProjection : String -> Projection
customProjection =
    Custom


{-| Provide a custom sort order by listing data values explicitly. This can be
used in place of lists of [SortProperty](#SortProperty). For example,

    let
        data =
            dataFromColumns []
                << dataColumn "a" (Strings [ "A", "B", "C" ])
                << dataColumn "b" (Numbers [ 28, 55, 43 ])

        enc =
            encoding
                << position X
                    [ pName "a"
                    , pMType Ordinal
                    , pSort [ customSort (Strings [ "B", "A", "C" ]) ]
                    ]
                << position Y [ pName "b", pMType Quantitative ]
    in
    toVegaLite [ data [], enc [], bar [] ]

-}
customSort : DataValues -> SortProperty
customSort =
    CustomSort


{-| Compute some aggregate summaray statistics for a field to be encoded with a
level of detail (grouping) channel. The type of aggregation is determined by the
given operation parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
dAggregate : Operation -> DetailChannel
dAggregate =
    DAggregate


{-| Create a column of data. A column has a name and a list of values. The final
parameter is the list of any other columns to which this is added.

    dataColumn "Animal" (Strings [ "Cat", "Dog", "Mouse"]) []

-}
dataColumn : String -> DataValues -> List DataColumn -> List DataColumn
dataColumn colName data =
    case data of
        Numbers col ->
            (::) (List.map (\x -> ( colName, JE.float x )) col)

        Strings col ->
            (::) (List.map (\s -> ( colName, JE.string s )) col)

        DateTimes col ->
            (::) (List.map (\dts -> ( colName, JE.object (List.map dateTimeProperty dts) )) col)

        Booleans col ->
            (::) (List.map (\b -> ( colName, JE.bool b )) col)


{-| Declare a data source from a provided list of column values. Each column contains
values of the same type, but columns each with a different type are permitted.
Columns should all contain the same number of items; if not the dataset will be
truncated to the length of the shortest column. An optional list of field formatting
instructions can be provided as the first parameter or an empty list to use the
default formatting. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format)
for details.
The columns themselves are most easily generated with `dataColumn`

    data =
        dataFromColumns [ Parse [ ( "Year", FoDate "%Y" ) ] ]
            << dataColumn "Animal" (Strings [ "Fish", "Dog", "Cat" ])
            << dataColumn "Age" (Numbers [ 28, 12, 6 ])
            << dataColumn "Year" (Strings [ "2010", "2014", "2015" ])

-}
dataFromColumns : List Format -> List DataColumn -> Data
dataFromColumns fmts cols =
    let
        dataArray =
            cols
                |> transpose
                |> List.map JE.object
                |> JE.list
    in
    if fmts == [] then
        ( VLData, JE.object [ ( "values", dataArray ) ] )
    else
        ( VLData
        , JE.object
            [ ( "values", dataArray )
            , ( "format", JE.object (List.concatMap formatProperty fmts) )
            ]
        )


{-| Declare a data source from a provided json specification. The most likely use-case
for specifying json inline is when creating [geojson](http://geojson.org) objects,
when [`geometry`](#geometry), [`geometryCollection`](#geometryCollection) and
[`geoFeatureCollection`](#geoFeatureCollection) functions may be used. For more
general cases of json creation, consider
[`Json.Encode`](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Json-Encode).

    let
        geojson =
            geometry (GeoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []
    in
    toVegaLite
        [ width 200
        , height 200
        , dataFromJson geojson []
        , projection [ PType Orthographic ]
        , geoshape []
        ]

-}
dataFromJson : Spec -> List Format -> Data
dataFromJson json fmts =
    if fmts == [] then
        ( VLData, JE.object [ ( "values", json ) ] )
    else
        ( VLData
        , JE.object
            [ ( "values", json )
            , ( "format", JE.object (List.concatMap formatProperty fmts) )
            ]
        )


{-| Declare a data source from a provided list of row values. Each row contains
a list of tuples where the first value is a string representing the column name, and the
second the column value for that row. Each column can have a value of a different type
but you must ensure that when subsequent rows are added, they match the types of previous
values with shared column names. An optional list of field formatting instructions can
be provided as the first parameter or an empty list to use the default formatting. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format)
for details.
The rows themselves are most easily generated with `dataRow`. Note though that generally
if you are creating data inline (as opposed to reading from a file), adding data by column
is more efficient and less error-prone.

    data =
        dataFromRows [ Parse [ ( "Year", FoDate "%Y" ) ] ]
            << dataRow [ ( "Animal", Str "Fish" ), ( "Age", Number 28 ), ( "Year", Str "2010" ) ]
            << dataRow [ ( "Animal", Str "Dog" ), ( "Age", Number 12 ), ( "Year", Str "2014" ) ]
            << dataRow [ ( "Animal", Str "Cat" ), ( "Age", Number 6 ), ( "Year", Str "2015" ) ]

-}
dataFromRows : List Format -> List DataRow -> Data
dataFromRows fmts rows =
    if fmts == [] then
        ( VLData, JE.object [ ( "values", JE.list rows ) ] )
    else
        ( VLData
        , JE.object
            [ ( "values", JE.list rows )
            , ( "format", JE.object (List.concatMap formatProperty fmts) )
            ]
        )


{-| Declare data from a named source. The source may be from named `datasets` within
a specification or a named data source created via the
[Vega View API](https://vega.github.io/vega/docs/api/view/#data).
An optional list of field formatting instructions can be provided as the second
parameter or an empty list to use the default formatting. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#named)
for details.

    data = ...
    json = ...
    enc = ...
    toVegaLite
        [ datasets [ ( "myData", data [] ),  ( "myJson", dataFromJson json [] ) ]
        , dataFromSource "myData" []
        , bar []
        , enc []
        ]

-}
dataFromSource : String -> List Format -> Data
dataFromSource sourceName fmts =
    if fmts == [] then
        ( VLData, JE.object [ ( "name", JE.string sourceName ) ] )
    else
        ( VLData
        , JE.object
            [ ( "name", JE.string sourceName )
            , ( "format", JE.object (List.concatMap formatProperty fmts) )
            ]
        )


{-| Declare data source from a url. The url can be a local path on a web server
or an external http(s) url. Used to create a data ( property, specification ) pair.
An optional list of field formatting instructions can be provided as the second
parameter or an empty list to use the default formatting. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format)
for details.

    enc = ...
    toVegaLite
        [ dataFromUrl "data/weather.csv" [ Parse [ ( "date", FoDate "%Y-%m-%d %H:%M" ) ] ]
        , line []
        , enc []
        ]

-}
dataFromUrl : String -> List Format -> Data
dataFromUrl url fmts =
    if fmts == [] then
        ( VLData, JE.object [ ( "url", JE.string url ) ] )
    else
        ( VLData
        , JE.object
            [ ( "url", JE.string url )
            , ( "format", JE.object (List.concatMap formatProperty fmts) )
            ]
        )


{-| Create a row of data. A row comprises a list of (columnName,value) pairs.
The final parameter is the list of any other rows to which this is added.

    dataRow [("Animal", Str "Fish"),("Age",Number 28),("Year", Str "2010")] []

-}
dataRow : List ( String, DataValue ) -> List DataRow -> List DataRow
dataRow row =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, dataValueSpec val )) row))


{-| Create a dataset comprising a collection of named `Data` items. Each data item
can be created with normal data generating functions such as `dataFromRows` or
`dataFromJson`. These can be later referred to using `dataFromSource`.

    let
        data =
            dataFromRows []
                << dataRow [ ( "cat", Str "a" ), ( "val", Number 10 ) ]
                << dataRow [ ( "cat", Str "b" ), ( "val", Number 18 ) ]
        json =
            JE.list
                [ JE.object [ ( "cat", JE.string "a" ), ( "val", JE.float 120 ) ]
                , JE.object [ ( "cat", JE.string "b" ), ( "val", JE.float 180 ) ]
                ]

        enc = ...

    in
    toVegaLite
        [ datasets [ ( "myData", data [] ),  ( "myJson", dataFromJson json [] ) ]
        , dataFromSource "myData" []
        , bar []
        , enc []
        ]

-}
datasets : List ( String, Data ) -> Data
datasets namedData =
    let
        extract data =
            case JD.decodeString (JD.keyValuePairs JD.value) (JE.encode 0 data) of
                Ok [ ( _, value ) ] ->
                    value

                _ ->
                    data

        specs =
            List.map (\( name, data ) -> ( name, (\( _, spec ) -> extract spec) data )) namedData
    in
    ( VLDatasets, JE.object specs )


{-| Discretizes a series of numeric values into bins when encoding with a level
of detail (grouping) channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
dBin : List BinProperty -> DetailChannel
dBin =
    DBin


{-| Provides an optional description to be associated with the visualization.

    enc = ...
    toVegaLite
        [ description "Population change of key regions since 1900"
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
description : String -> ( VLProperty, Spec )
description s =
    ( VLDescription, JE.string s )


{-| Encode a 'level of detail' channel. This provides a way of grouping by a field
but unlike, say `color`, all groups have the same visual properties. The first
parameter is a list of the field characteristics to be grouped. The second parameter
is a list of any previous channels to which this detail channel should be added. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#detail)
for details.

    detail [ dName "Species", dMType Nominal ] []

-}
detail : List DetailChannel -> List LabelledSpec -> List LabelledSpec
detail detailProps =
    (::) ( "detail", List.map detailChannelProperty detailProps |> JE.object )


{-| Provide the name of the field used for encoding with a level of detail
(grouping) channel. For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
dName : String -> DetailChannel
dName =
    DName


{-| Specify the field type (level of measurement) when encoding with a level of
detail (grouping) channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
dMType : Measurement -> DetailChannel
dMType =
    DmType


{-| Create a pair of continuous domain to color mappings suitable for customising
ordered scales. The first parameter is a tuple representing the mapping of the lowest
numeric value in the domain to its equivalent color; the second tuple the mapping
of the highest numeric value to color. If the domain contains any values between
these lower and upper bounds they are interpolated according to the scale's interpolation
function. This is a convenience function equivalent to specifying separate `SDomain`
and `SRange` lists and is safer as it guarantees a one-to-one correspondence between
domain and range values.

    color
        [ mName "year"
        , mMType Ordinal
        , mScale (domainRangeMap ( 1955, "#e6959c" ) ( 2000, "#911a24" ))
        ]

-}
domainRangeMap : ( Float, String ) -> ( Float, String ) -> List ScaleProperty
domainRangeMap lowerMap upperMap =
    let
        ( domain, range ) =
            List.unzip [ lowerMap, upperMap ]
    in
    [ SDomain (DNumbers domain), SRange (RStrings range) ]


{-| Specify the form of time unit aggregation of field values when encoding
with a level of detail (grouping) channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
dTimeUnit : TimeUnit -> DetailChannel
dTimeUnit =
    DTimeUnit


{-| Create an encoding specification from a list of channel encodings.

    enc =
        encoding
            << position X [ pName "Animal", pMType Ordinal ]
            << position Y [ pName "Age", pMType Quantitative ]
            << shape [ mName "Species", mMType Nominal ]
            << size [ mName "Population", mMType Quantitative ]

-}
encoding : List LabelledSpec -> ( VLProperty, Spec )
encoding channels =
    ( VLEncoding, JE.object channels )


{-| Specify an expression that should evaluate to either true or false. Can use
any valid [Vega expression](https://vega.github.io/vega/docs/expressions/).
-}
expr : String -> BooleanOp
expr =
    Expr


{-| Defines the fields that will be used to facet a view in rows or columns to create
a set of small multiples. This is used where the encoding of the visualization in small
multiples is identical, but data for each is grouped by the given fields. When
creating a faceted view in this way you also need to define a full specification
to apply to each of those facets using `asSpec`.

    spec = ...
    toVegaLite
        [ facet [ RowBy [ fName "Origin", fMType Nominal ] ]
        , specifcation spec
        ]

See the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html)
for further details.

-}
facet : List FacetMapping -> ( VLProperty, Spec )
facet fMaps =
    ( VLFacet, JE.object (List.map facetMappingProperty fMaps) )


{-| Compute some aggregate summaray statistics for a field to be encoded with a
facet channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
fAggregate : Operation -> FacetChannel
fAggregate =
    FAggregate


{-| Discretizes a series of numeric values into bins when encoding with a
facet channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
fBin : List BinProperty -> FacetChannel
fBin =
    FBin


{-| Specify the 'axis' for a series of faceted plots. This is the guide that spans
the collection of faceted plots, each of which may have their own axes. For details,
see the
[Vega-Lite facet header documentation](https://vega.github.io/vega-lite/docs/facet.html#header)
-}
fHeader : List HeaderProperty -> FacetChannel
fHeader =
    FHeader


{-| Encode a fill channel. This acts in a similar way to encoding by `color` but
only affects the interior of closed shapes. The first parameter is a list of mark
channel properties that characterise the way a data field is encoded by fill.
The second parameter is a list of any previous channels to which this fill channel
should be added.

    fill [ mName "Species", mMType Nominal ] []

Note that if both `fill` and `color` encodings are specified, `fill` takes precedence.

-}
fill : List MarkChannel -> List LabelledSpec -> List LabelledSpec
fill markProps =
    (::) ( "fill", List.concatMap markChannelProperty markProps |> JE.object )


{-| Adds the given filter operation a list of transformations that may be applied
to a channel or field. The first parameter is the filter operation and the second,
often implicit, parameter is the list of other filter operations to which this
should be added in sequence.

    trans =
        transform
            << filter (FEqual "Animal" (Str "Cat"))

Filter operations can combine selections and data predicates with `BooleanOp` expressions:

    trans =
        transform
            << filter (FCompose (And (expr "datum.Weight_in_lbs > 3000") (Selection "brush")))

-}
filter : Filter -> List LabelledSpec -> List LabelledSpec
filter f =
    case f of
        FExpr expr ->
            (::) ( "filter", JE.string expr )

        FCompose boolExpr ->
            (::) ( "filter", booleanOpSpec boolExpr )

        FEqual field val ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "equal", dataValueSpec val ) ] )

        FSelection selName ->
            (::) ( "filter", JE.object [ ( "selection", JE.string selName ) ] )

        FRange field vals ->
            let
                values =
                    case vals of
                        NumberRange mn mx ->
                            JE.list [ JE.float mn, JE.float mx ]

                        DateRange dMin dMax ->
                            JE.list
                                [ JE.object (List.map dateTimeProperty dMin)
                                , JE.object (List.map dateTimeProperty dMax)
                                ]
            in
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "range", values ) ] )

        FOneOf field vals ->
            let
                values =
                    case vals of
                        Numbers xs ->
                            List.map JE.float xs |> JE.list

                        DateTimes dts ->
                            List.map (\dt -> JE.object (List.map dateTimeProperty dt)) dts |> JE.list

                        Strings ss ->
                            List.map JE.string ss |> JE.list

                        Booleans bs ->
                            List.map JE.bool bs |> JE.list
            in
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "oneOf", values ) ] )


{-| Provide the name of the field used for encoding with a facet channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
fName : String -> FacetChannel
fName =
    FName


{-| Specify the field type (level of measurement) when encoding with a facet
channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
fMType : Measurement -> FacetChannel
fMType =
    FmType


{-| Specify the form of time unit aggregation of field values when encoding
with a facet channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
fTimeUnit : TimeUnit -> FacetChannel
fTimeUnit =
    FTimeUnit


{-| Specifies a list of geo features to be used in a `geoshape` specification.
Each feature object in this collection can be created with the `geometry` function.

    geojson =
        geoFeatureCollection
            [ geometry (GeoPolygon [ [ ( -3, 59 ), ( -3, 52 ), ( 4, 52 ), ( -3, 59 ) ] ])
                [ ( "myRegionName", Str "Northern region" ) ]
            , geometry (GeoPolygon [ [ ( -3, 52 ), ( 4, 52 ), ( 4, 45 ), ( -3, 52 ) ] ])
                [ ( "myRegionName", Str "Southern region" ) ]
            ]

-}
geoFeatureCollection : List Spec -> Spec
geoFeatureCollection geoms =
    JE.object
        [ ( "type", JE.string "FeatureCollection" )
        , ( "features", JE.list geoms )
        ]


{-| Specifies a list of geometry objects to be used in a `geoshape` specification.
Each geometry object in this collection can be created with the `geometry` function.

    geojson =
        geometryCollection
            [ geometry (GeoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []
            , geometry (GeoPoint -3.5 55.5) []
            ]

-}
geometryCollection : List Spec -> Spec
geometryCollection geoms =
    JE.object
        [ ( "type", JE.string "GeometryCollection" )
        , ( "geometries", JE.list geoms )
        ]


{-| Specifies a geometric object to be used in a `geoshape` specification. The
first parameter is the geometric type, the second an optional list of properties
to be associated with the object.

      geojson =
          geometry (GeoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []

-}
geometry : Geometry -> List ( String, DataValue ) -> Spec
geometry gType properties =
    if properties == [] then
        JE.object
            [ ( "type", JE.string "Feature" )
            , ( "geometry", geometryTypeSpec gType )
            ]
    else
        JE.object
            [ ( "type", JE.string "Feature" )
            , ( "geometry", geometryTypeSpec gType )
            , ( "properties", JE.object (List.map (\( key, val ) -> ( key, dataValueSpec val )) properties) )
            ]


{-| Specify a an arbitrary shape determined by georaphically referenced
coordinates. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/geoshape.html).

    geoshape [ MFill "blue", MStroke "white" ]

-}
geoshape : List MarkProperty -> ( VLProperty, Spec )
geoshape =
    mark Geoshape


{-| Compute some aggregate summaray statistics for a field to be encoded with a
hyperlink channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
hAggregate : Operation -> HyperlinkChannel
hAggregate =
    HAggregate


{-| Discretizes a series of numeric values into bins when encoding with a
hyperlink channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
hBin : List BinProperty -> HyperlinkChannel
hBin =
    HBin


{-| Assigns a list of specifications to be juxtaposed horizontally in a visualization.

    let
        spec1 = ...
        spec2 = ...
    in
    toVegaLite
        [ dataFromUrl "data/driving.json" []
        , hConcat [ spec1, spec2 ]
        ]

-}
hConcat : List Spec -> ( VLProperty, Spec )
hConcat specs =
    ( VLHConcat, JE.list specs )


{-| Specify the properties of a hyperlink channel conditional on some predicate
expression. The first parameter provides the expression to evaluate, the second the encoding
to apply if the expression is true, the third the encoding if the expression is
false. For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)
-}
hDataCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hDataCondition op tCh fCh =
    HDataCondition op tCh fCh


{-| Overrides the default height of the visualization. If not specified the height
will be calculated based on the content of the visualization.

    enc = ...
    toVegaLite
        [ height 300
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
height : Float -> ( VLProperty, Spec )
height h =
    ( VLHeight, JE.float h )


{-| Specify the field type (level of measurement) when encoding with a hyperlink
channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
hMType : Measurement -> HyperlinkChannel
hMType =
    HmType


{-| Provide the name of the field used for encoding with a hyperlink channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
hName : String -> HyperlinkChannel
hName =
    HName


{-| Reference in a hyperlink channel to a field name generated by `repeat`. The
parameter identifies whether reference is being made to fields being laid out
in columns or in rows.
-}
hRepeat : Arrangement -> HyperlinkChannel
hRepeat =
    HRepeat


{-| Specify the properties of a hyperlink channel conditional on interactive selection.
The first parameter provides the selection to evaluate, the second the encoding
to apply if the hyperlink has been selected, the third the encoding if it is not selected.
For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)
-}
hSelectionCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hSelectionCondition op tCh fCh =
    HSelectionCondition op tCh fCh


{-| Provide a literal string value when encoding with a hyperlink channel.
-}
hString : String -> HyperlinkChannel
hString =
    HString


{-| Specify the form of time unit aggregation of field values when encoding
with a hyperlink channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
hTimeUnit : TimeUnit -> HyperlinkChannel
hTimeUnit =
    HTimeUnit


{-| Encode a hyperlink channel. The first parameter is a list of hyperlink channel
properties that characterise the hyperlinking such as the destination url and cursor
type. The second parameter is a list of any previous encoding channels to which
this hyperlink channel should be added.

    hyperlink [ hName "Species", hMType Nominal ] []

For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#href)

-}
hyperlink : List HyperlinkChannel -> List LabelledSpec -> List LabelledSpec
hyperlink hyperProps =
    (::) ( "href", List.concatMap hyperlinkChannelProperty hyperProps |> JE.object )


{-| Specify a checkbox input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iCheckbox : String -> List InputProperty -> Binding
iCheckbox f =
    ICheckbox f


{-| Specify a color input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iColor : String -> List InputProperty -> Binding
iColor f =
    IColor f


{-| Specify a date input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iDate : String -> List InputProperty -> Binding
iDate f =
    IDate f


{-| Specify a local time input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iDateTimeLocal : String -> List InputProperty -> Binding
iDateTimeLocal f =
    IDateTimeLocal f


{-| Specify a month input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iMonth : String -> List InputProperty -> Binding
iMonth f =
    IMonth f


{-| Specify a number input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iNumber : String -> List InputProperty -> Binding
iNumber f =
    INumber f


{-| Specify a radio box input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iRadio : String -> List InputProperty -> Binding
iRadio f =
    IRadio f


{-| Specify a range slider input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iRange : String -> List InputProperty -> Binding
iRange f =
    IRange f


{-| Specify a select input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iSelect : String -> List InputProperty -> Binding
iSelect f =
    ISelect f


{-| Specify a telephone number input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iTel : String -> List InputProperty -> Binding
iTel f =
    ITel f


{-| Specify a text input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iText : String -> List InputProperty -> Binding
iText f =
    IText f


{-| Specify a time input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iTime : String -> List InputProperty -> Binding
iTime f =
    ITime f


{-| Specify a week input element that can bound to a named field value (first
parameter. For details see the
[Vega-Lite input element binding documentation](https://vega.github.io/vega-lite/docs/bind.html#input-element-binding)
and the [Vega input binding documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
iWeek : String -> List InputProperty -> Binding
iWeek f =
    IWeek f


{-| Assigns a list of specifications to superposed layers in a visualization.

    let
        spec1 = ...
        spec2 = ...
    in
    toVegaLite
        [ dataFromUrl "data/driving.json" []
        , layer [ spec1, spec2 ]
        ]

-}
layer : List Spec -> ( VLProperty, Spec )
layer specs =
    ( VLLayer, JE.list specs )


{-| Specify a line mark for symbolising a sequence of values. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/line.html).

    line [MStroke "red", MStrokeDash [1, 2] ]

To keep the default style for the mark, just provide an empty list as the parameter.

    line []

-}
line : List MarkProperty -> ( VLProperty, Spec )
line =
    mark Line


{-| Perform a lookup of named fields between two data sources. This allows you to
find values in one data source based on the values in another (like a relational
join). The first parameter is the field in the primary data source to act as key,
the second is the secondary data source which can be specified with a call to `dataFromUrl`
or other data generating function. The third is the name of the field in the secondary
data source to match values with the primary key. The fourth parameter is the list
of fields to be stored when the keys match. As with other transformation functions,
the final implicit parameter is a list of any other transformations to which this
is to be added.

Unlike `lookupAs`, this function will only return the specific fields named in the
fourth parameter. If you wish to return the entire set of fields in the secondary
data source as a single object, use `lookupAs`.

See the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/lookup.html)
for further details.

The following would return the values in the `age` and `height` fields from
`lookup_people.csv` for all rows where the value in the `name` column in that
file matches the value of `person` in the primary data source.

    data =
        dataFromUrl "data/lookup_groups.csv" []

    trans =
        transform
            << lookup "person" (dataFromUrl "data/lookup_people.csv" []) "name" [ "age", "height" ]

-}
lookup : String -> ( VLProperty, Spec ) -> String -> List String -> List LabelledSpec -> List LabelledSpec
lookup key1 ( vlProp, spec ) key2 fields =
    (::)
        ( "lookup"
        , JE.list
            [ JE.string key1
            , spec
            , JE.string key2
            , JE.list (List.map JE.string fields)
            ]
        )


{-| Perform an object lookup between two data sources. This allows you to find
values in one data source based on the values in another (like a relational
join). The first parameter is the field in the primary data source to act as key,
the second is the secondary data source which can be specified with a call to
`dataFromUrl` or other data generating function. The third is the name of the field
in the secondary data source to match values with the primary key. The fourth
parameter is the name to be given to the object storing matched values. As with
other transformation functions, the final implicit parameter is a list of any other
transformations to which this is to be added.

Unlike `lookup`, this function returns the entire set of field values from the
secondary data source when keys match. Those fields are stored as an object with
the name provided in the fourth parameter.

See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/lookup.html)
for further details.

In the following example, `personDetails` would reference all the field values in
`lookup_people.csv` for each row where the value in the `name` column in that
file matches the value of `person` in the primary data source.

    data =
        dataFromUrl "data/lookup_groups.csv" []

    trans =
        transform
            << lookupAs "person" (dataFromUrl "data/lookup_people.csv" []) "name" "personDetails"

-}
lookupAs : String -> ( VLProperty, Spec ) -> String -> String -> List LabelledSpec -> List LabelledSpec
lookupAs key1 ( vlProp, spec ) key2 asName =
    -- TODO: Change sig to use Data rather than (VLProperty, Spec) for next major releaase.
    -- Not sure why substituting with an alias bumps up by a major release.
    (::)
        ( "lookupAs"
        , JE.list
            [ JE.string key1
            , spec
            , JE.string key2
            , JE.string asName
            ]
        )


{-| Compute some aggregate summaray statistics for a field to be encoded with a
mark property channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
mAggregate : Operation -> MarkChannel
mAggregate =
    MAggregate


{-| _Deprecated: Use mark functions (e.g. `circle`, `line`) instead._

Create a mark specification. All marks must have a type (first parameter) and
can optionally be customised with a list of mark properties such as interpolation
style for lines.

-}
mark : Mark -> List MarkProperty -> ( VLProperty, Spec )
mark mark mProps =
    case mProps of
        [] ->
            ( VLMark, JE.string (markLabel mark) )

        _ ->
            ( VLMark
            , ( "type", JE.string (markLabel mark) )
                :: List.map markProperty mProps
                |> JE.object
            )


{-| Discretizes a series of numeric values into bins when encoding with a
mark property channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
mBin : List BinProperty -> MarkChannel
mBin =
    MBin


{-| Provide a literal Boolean value when encoding with a mark property channel.
-}
mBoolean : Bool -> MarkChannel
mBoolean =
    MBoolean


{-| Specify the properties of a mark channel conditional on some predicate
expression. The first parameter provides the expression to evaluate, the second
the encoding to apply if the expression is true, the third the encoding if the
expression is false.

    color
        [ mDataCondition
            (expr "datum.IMDB_Rating === null")
            [ mString "#ddd" ]
            [ mString "rgb(76,120,168)" ]
        ]

For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)

-}
mDataCondition : BooleanOp -> List MarkChannel -> List MarkChannel -> MarkChannel
mDataCondition op tMks fMks =
    MDataCondition op tMks fMks


{-| Specify the properties of a legend that describes a mark's encoding. To stop
a legend from appearing provide an empty list as a parameter.

    color [ mName "Animal", mMType Nominal, mLegend [] ]

For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/encoding.html#mark-prop-field-def)

-}
mLegend : List LegendProperty -> MarkChannel
mLegend =
    MLegend


{-| Specify the field type (level of measurement) when encoding with a mark
property channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
mMType : Measurement -> MarkChannel
mMType =
    MmType


{-| Provide the name of the field used for encoding with a mark property channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
mName : String -> MarkChannel
mName =
    MName


{-| Provide a literal numeric value when encoding with a mark property channel.
-}
mNumber : Float -> MarkChannel
mNumber =
    MNumber


{-| Provide an SVG path string when encoding with a mark property channel. Useful
when providing custom shapes.
-}
mPath : String -> MarkChannel
mPath =
    MPath


{-| Reference in a mark channel to a field name generated by `repeat`. The
parameter identifies whether reference is being made to fields that are to be
laid out in columns or in rows.
-}
mRepeat : Arrangement -> MarkChannel
mRepeat =
    MRepeat


{-| Specify the scaling applied to a field when encoding with a mark property channel.
The scale will transform a field's value into a color, shape, size etc. For details, see the
[Vega-Lite position field documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)
-}
mScale : List ScaleProperty -> MarkChannel
mScale =
    MScale


{-| Specify the properties of a mark channel conditional on interactive selection.
The first parameter provides the selection to evaluate, the second the encoding
to apply if the mark has been selected, the third the encoding if it is not selected.

    color
        [ mSelectionCondition (selectionName "myBrush")
            [ mName "Cylinders", mMType Ordinal ]
            [ mString "grey" ]
        ]

For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)

-}
mSelectionCondition : BooleanOp -> List MarkChannel -> List MarkChannel -> MarkChannel
mSelectionCondition op tMks fMks =
    MSelectionCondition op tMks fMks


{-| Provide a literal string value when encoding with a mark property channel.
-}
mString : String -> MarkChannel
mString =
    MString


{-| Specify the form of time unit aggregation of field values when encoding
with a mark property channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
mTimeUnit : TimeUnit -> MarkChannel
mTimeUnit =
    MTimeUnit


{-| Provides an optional name to be associated with the visualization.

    enc = ...
    toVegaLite
        [ name "PopGrowth"
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
name : String -> ( VLProperty, Spec )
name s =
    ( VLName, JE.string s )


{-| Apply a negation Boolean operation as part of a logical composition. Boolean
operations can be nested to any level, for example:

    not (and (expr "datum.IMDB_Rating === null") (expr "datum.Rotten_Tomatoes_Rating === null") )

-}
not : BooleanOp -> BooleanOp
not =
    Not


{-| Compute some aggregate summaray statistics for a field to be encoded with an
order channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
oAggregate : Operation -> OrderChannel
oAggregate =
    OAggregate


{-| Discretizes a series of numeric values into bins when encoding with an order
channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
oBin : List BinProperty -> OrderChannel
oBin =
    OBin


{-| Specify the field type (level of measurement) when encoding with an order
channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
oMType : Measurement -> OrderChannel
oMType =
    OmType


{-| Provide the name of the field used for encoding with an order channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
oName : String -> OrderChannel
oName =
    OName


{-| Encode an opacity channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by opacity. The second parameter
is a list of any previous channels to which this opacity channel should be added.

    opacity [ mName "Age", mMType Quantitative ] []

-}
opacity : List MarkChannel -> List LabelledSpec -> List LabelledSpec
opacity markProps =
    (::) ( "opacity", List.concatMap markChannelProperty markProps |> JE.object )


{-| Create a named aggregation operation on a field that can be added to a transformation.
The first parameter is the aggregation operation to use; the second the name of
the field in which to apply it and the third the name to be given to this transformation.
For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/aggregate.html#aggregate-op-def).

    trans =
        transform
            << aggregate
                [ opAs Min "people" "lowerBound"
                , opAs Max "people" "upperBound"
                ]
                [ "age" ]

-}
opAs : Operation -> String -> String -> Spec
opAs op field label =
    JE.object
        [ ( "op", JE.string (operationLabel op) )
        , ( "field", JE.string field )
        , ( "as", JE.string label )
        ]


{-| Apply an 'or' Boolean operation as part of a logical composition.

    color
        [ mSelectionCondition (or (selectionName "alex") (selectionName "morgan"))
            [ mAggregate Count, mName "*", mMType Quantitative ]
            [ mString "gray" ]
        ]

-}
or : BooleanOp -> BooleanOp -> BooleanOp
or op1 op2 =
    Or op1 op2


{-| Encode an order channel. The first parameter is a list of order field definitions
to define the channel. The second parameter is a list of any previous channels to
which this order channel is to be added.

    enc =
        encoding
            << position X [ pName "miles", pMType Quantitative ]
            << position Y [ pName "gas", pMType Quantitative ]
            << order [ oName "year", oMType Temporal ]

-}
order : List OrderChannel -> List LabelledSpec -> List LabelledSpec
order oDefs =
    (::) ( "order", List.map orderChannelProperty oDefs |> JE.object )


{-| Reference in a order channel to a field name generated by `repeat`. The
parameter identifies whether reference is being made to fields that are to be
laid out in columns or in rows.
-}
oRepeat : Arrangement -> OrderChannel
oRepeat =
    ORepeat


{-| Specify the sort order to be used by an order channel.
[Vega-Lite order field documentation](https://vega.github.io/vega-lite/docs/encoding.html#order-field-definition)
-}
oSort : List SortProperty -> OrderChannel
oSort =
    OSort


{-| Specify the form of time unit aggregation of field values when encoding
with an order channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
oTimeUnit : TimeUnit -> OrderChannel
oTimeUnit =
    OTimeUnit


{-| Set the padding around the visualization in pixel units. The way padding is
interpreted will depend on the `autosize` properties. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/spec.html#top-level-specifications)
for details.

    enc = ...
    toVegaLite
        [ width 500
        , padding (PEdges 20 10 5 15)
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
padding : Padding -> ( VLProperty, Spec )
padding pad =
    ( VLPadding, paddingSpec pad )


{-| Compute some aggregate summaray statistics for a field to be encoded with a
postion channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
pAggregate : Operation -> PositionChannel
pAggregate =
    PAggregate


{-| Specify the axis properties used when encoding with a position channel.
For details, see the
[Vega-Lite position field documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)
-}
pAxis : List AxisProperty -> PositionChannel
pAxis =
    PAxis


{-| Discretizes a series of numeric values into bins when encoding with a
position channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
pBin : List BinProperty -> PositionChannel
pBin =
    PBin


{-| Specify the field type (level of measurement) when encoding with a position
channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
pMType : Measurement -> PositionChannel
pMType =
    PmType


{-| Specify a point mark for symbolising a data point with a symbol. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/point.html).

    point [ MFill "black", MStroke "red" ]

To keep the default style for the mark, just provide an empty list as the parameter.

    point []

-}
point : List MarkProperty -> ( VLProperty, Spec )
point =
    mark Point


{-| Encode a position channel. The first parameter identifies the channel,
the second a list of qualifying options. Usually these will include at least the
name of the data field associated with it and its measurement type (either the field
name directly, or a reference to a row / column repeat field). The final parameter
is a list of any previous channels to which this position channel should be added.
This is often implicit when chaining a series of encodings using functional composition.

      enc =
          encoding
            << position X [ pName "Animal", pmType Ordinal ]

Encoding by position will generate an axis by default. To prevent the axis from
appearing, simply provide an empty list of axis properties to `pAxis` :

     enc =
         encoding
           << position X [ pName "Animal", pMType Ordinal, pAxis [] ]

-}
position : Position -> List PositionChannel -> List LabelledSpec -> List LabelledSpec
position pos pDefs =
    let
        isNotPmType pp =
            case pp of
                PmType t ->
                    False

                _ ->
                    True
    in
    case pos of
        X ->
            (::) ( positionLabel X, List.map positionChannelProperty pDefs |> JE.object )

        Y ->
            (::) ( positionLabel Y, List.map positionChannelProperty pDefs |> JE.object )

        X2 ->
            (::) ( positionLabel X2, List.map positionChannelProperty pDefs |> JE.object )

        Y2 ->
            (::) ( positionLabel Y2, List.map positionChannelProperty pDefs |> JE.object )

        Longitude ->
            (::) ( positionLabel Longitude, List.map positionChannelProperty pDefs |> JE.object )

        Latitude ->
            (::) ( positionLabel Latitude, List.map positionChannelProperty pDefs |> JE.object )

        Longitude2 ->
            (::) ( positionLabel Longitude2, List.map positionChannelProperty pDefs |> JE.object )

        Latitude2 ->
            (::) ( positionLabel Latitude2, List.map positionChannelProperty pDefs |> JE.object )


{-| Provide the name of the field used for encoding with a position channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
pName : String -> PositionChannel
pName =
    PName


{-| Provide the name of the fields from a repeat operator used for encoding
with a position channel. For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
pRepeat : Arrangement -> PositionChannel
pRepeat =
    PRepeat


{-| Sets the cartographic projection used for geospatial coordinates. A projection
defines the mapping from _(longitude,latitude)_ to an _(x,y)_ plane used for rendering.
This is useful when using the `Geoshape` mark. For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/projection.html).

    proj =
        projection [ PType Orthographic, PRotate -40 0 0 ]

-}
projection : List ProjectionProperty -> ( VLProperty, Spec )
projection pProps =
    ( VLProjection, JE.object (List.map projectionProperty pProps) )


{-| Specify the scaling applied to a field when encoding with a position channel.
The scale will transform a field's value into a position along one axis. For details, see the
[Vega-Lite position field documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)
-}
pScale : List ScaleProperty -> PositionChannel
pScale =
    PScale


{-| Specify the sort order for field when encoding with a position channel.
For details, see the
[Vega-Lite position field documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)
-}
pSort : List SortProperty -> PositionChannel
pSort =
    PSort


{-| Specify the type of stacking offset for field when encoding with a position
channel. For details, see the
[Vega-Lite position field documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)
-}
pStack : StackProperty -> PositionChannel
pStack =
    PStack


{-| Specify the form of time unit aggregation of field values when encoding
with a position channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
pTimeUnit : TimeUnit -> PositionChannel
pTimeUnit =
    PTimeUnit


{-| Specify an arbitrary rectangle. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/rect.html).

    rect [ MFill "black", MStroke "red" ]

To keep the default style for the mark, just provide an empty list as the parameter.

    rect []

-}
rect : List MarkProperty -> ( VLProperty, Spec )
rect =
    mark Rect


{-| Define the fields that will be used to compose rows and columns of a set of
small multiples. This is used where the encoding of the visualization in small
multiples is largely identical, but the data field used in each might vary. When
a list of fields is identified with `repeat` you also need to define a full specification
to apply to each of those fields using `asSpec`.

    spec = ...
    toVegaLite
        [ repeat [ ColumnFields [ "Cat", "Dog", "Fish" ] ]
        , specification (asSpec spec)
        ]

See the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/repeat.html)
for further details.

-}
repeat : List RepeatFields -> ( VLProperty, Spec )
repeat fields =
    ( VLRepeat, JE.object (List.map repeatFieldsProperty fields) )


{-| Define a single resolution option to be applied when scales, axes or legends
in composite views share channel encodings. This allows, for example, two different
color encodings to be created in a layered view, which otherwise by default would
share color channels between layers. Each resolution rule should be in a tuple
pairing the channel to which it applies and the rule type.
The first parameter identifies the type of resolution, the second a list of previous
resolutions to which this one may be added.

    resolve
        << resolution (RScale [ ( ChY, Independent ) ])

-}
resolution : Resolve -> List LabelledSpec -> List LabelledSpec
resolution res =
    (::) (resolveProperty res)


{-| Determine whether scales, axes or legends in composite views should share channel
encodings. This allows, for example, two different color encodings to be created
in a layered view, which otherwise by default would share color channels between
layers. Each resolution rule should be in a tuple pairing the channel to which it
applies and the rule type.

    let
        res =
            resolve
                << resolution (RLegend [ ( ChColor, Independent ) ])
    in
    toVegaLite
        [ dataFromUrl "data/movies.json" []
        , vConcat [ heatSpec, barSpec ]
        , res []
        ]

For more information see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html).

-}
resolve : List LabelledSpec -> ( VLProperty, Spec )
resolve res =
    ( VLResolve, JE.object res )


{-| Specify an RGB color interpolation for continuous color scales. The parameter
is the gamma value to use in interpolation (anchored at 1).
-}
rgb : Float -> CInterpolate
rgb =
    Rgb


{-| Encode a new facet to be arranged in rows. The first parameter is a list of
facet properties that define the faceting channel. This should include at least
the name of data the field and its measurement type. The final parameter is a list
of any previous channels to which this is to be added. This is usually implicit
when chaining encodings using functional composition

    enc =
        encoding
            << position X [ pName "people", pMType Quantitative ]
            << position Y [ pName "gender", pMType Nominal ]
            << row [ fName "age", fMType Ordinal ]

-}
row : List FacetChannel -> List LabelledSpec -> List LabelledSpec
row fFields =
    (::) ( "row", JE.object (List.map facetChannelProperty fFields) )


{-| Specify a line seqment connecting two vertices. Can either be used to span the
entire width or height of a view, or to connect two arbitrary positions. For details
see the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/rule.html).

    rule [ MStroke "red" ]

To keep the default style for the mark, just provide an empty list as the parameter.

    rule []

-}
rule : List MarkProperty -> ( VLProperty, Spec )
rule =
    mark Rule


{-| Create a single named selection that may be applied to a data query or transformation.
The first two parameters specify the name to be given to the selection for later reference
and the type of selection made. The third allows additional selection options to
be specified. The fourth is a list of selections to which this is added, which is
commonly implicit when chaining a series of selections together with functional
composition.

    sel =
        selection
            << select "view" Interval [ BindScales ] []
            << select "myBrush" Interval []
            << select "myPaintbrush" Multi [ On "mouseover", Nearest True ]

-}
select : String -> Selection -> List SelectionProperty -> List LabelledSpec -> List LabelledSpec
select name sType options =
    let
        selProps =
            ( "type", JE.string (selectionLabel sType) )
                :: List.map selectionProperty options
    in
    (::) ( name, JE.object selProps )


{-| Provide an interactive selection that will be true or false as part of a
logical composition. For example, to filter a dataset so that only items selected
interactively and that have a weight of more than 30:

    transform
        << filter (fCompose (and (selected "brush") (expr "datum.weight > 30")))

-}
selected : String -> BooleanOp
selected =
    Selection


{-| Create a full selection specification from a list of selections. For details
see the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html).

    selection =
        selection << select "view" Interval [ BindScales ]

-}
selection : List LabelledSpec -> ( VLProperty, Spec )
selection sels =
    ( VLSelection, JE.object sels )


{-| Provide the name of a selection that is used as part of a conditional encoding.

    color
        [ mSelectionCondition (selectionName "myBrush")
            [ mName "Origin", mMType Nominal ]
            [ mString "grey" ]
        ]

-}
selectionName : String -> BooleanOp
selectionName =
    SelectionName


{-| Encode a shape channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by shape. The second parameter
is a list of any previous channels to which this shape channel should be added.

    shape [ mName "Species", mMType Nominal ] []

-}
shape : List MarkChannel -> List LabelledSpec -> List LabelledSpec
shape markProps =
    (::) ( "shape", List.concatMap markChannelProperty markProps |> JE.object )


{-| Encode a size channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by size. The second parameter
is a list of any previous channels to which this size channel should be added.

    size [ mName "Age", mMType Quantitative ] []

-}
size : List MarkChannel -> List LabelledSpec -> List LabelledSpec
size markProps =
    (::) ( "size", List.concatMap markChannelProperty markProps |> JE.object )


{-| Defines a specification object for use with faceted and repeated small multiples.

    spec = ...
    toVegaLite
        [ facet [ RowBy [ fName "Origin", fMType Nominal ] ]
        , specifcation spec
        ]

-}
specification : Spec -> ( VLProperty, Spec )
specification spec =
    ( VLSpec, spec )


{-| Specify a square mark for symbolising points. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/square.html).

    square [ MStroke "red", MStrokeWeight 2 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    square []

-}
square : List MarkProperty -> ( VLProperty, Spec )
square =
    mark Square


{-| Encode a stroke channel. This acts in a similar way to encoding by `color` but
only affects the exterior boundary of marks. The first parameter is a list of mark
channel properties that characterise the way a data field is encoded by stroke.
The second parameter is a list of any previous channels to which this stroke channel
should be added.

    stroke [ mName "Species", mMType Nominal ] []

Note that if both `stroke` and `color` encodings are specified, `stroke` takes
precedence.

-}
stroke : List MarkChannel -> List LabelledSpec -> List LabelledSpec
stroke markProps =
    (::) ( "stroke", List.concatMap markChannelProperty markProps |> JE.object )


{-| Specify a custom symbol shape with an
[SVG path description](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
-}
symbolPath : String -> Symbol
symbolPath =
    Path


{-| Compute some aggregate summaray statistics for a field to be encoded with a
text channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
tAggregate : Operation -> TextChannel
tAggregate =
    TAggregate


{-| Discretizes a series of numeric values into bins when encoding with a text
channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
tBin : List BinProperty -> TextChannel
tBin =
    TBin


{-| Specify the properties of a text channel conditional on some predicate
expression. The first parameter provides the expression to evaluate, the second
the encoding to apply if the expression is true, the third the encoding if the
expression is false. For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)
-}
tDataCondition : BooleanOp -> List TextChannel -> List TextChannel -> TextChannel
tDataCondition op tCh fCh =
    TDataCondition op tCh fCh


{-| Encode a text channel. The first parameter is a list of text channel properties
that define the channel. The second parameter is a list of any previous channels to
which this channel is to be added. This is usually implicit when chaining a set
of encodings together with functional composition. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#text)
for further details on the text and tooltip channels and
[Vega-Lite formatting documentation](https://vega.github.io/vega-lite/docs/format.html)
for formatting the appearance of the text.

    enc =
        encoding
            << position X [ pName "miles", pMType Quantitative ]
            << position Y [ pName "gas", pMType Quantitative ]
            << text [ tName "miles", tMType Quantitative ]

-}
text : List TextChannel -> List LabelledSpec -> List LabelledSpec
text tDefs =
    (::) ( "text", List.concatMap textChannelProperty tDefs |> JE.object )


{-| Specify a text mark to be displayed at some point location. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/text.html).

    textMark [ MFontSize 18 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    textMark []

-}
textMark : List MarkProperty -> ( VLProperty, Spec )
textMark =
    mark Text


{-| Provide a [formatting pattern](https://vega.github.io/vega-lite/docs/format.html)
for a field when encoding with a text channel.
-}
tFormat : String -> TextChannel
tFormat =
    TFormat


{-| Specify a short line mark for symbolising point locations. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/tick.html).

    tick [ MStroke "blue", MStrokeWeight 0.5 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    tick []

-}
tick : List MarkProperty -> ( VLProperty, Spec )
tick =
    mark Tick


{-| Creates a new data field based on the given temporal binning. Unlike the
direct encoding binning, this transformation is named and so can be referred
to in multiple encodings. The first parameter is the 'width' of each temporal bin,
the second is the field to bin and the third is name to give the newly binned
field. The final often implicit parameter is a list of previous transformations
to which this is added. Note though that usually it is easer to apply the temporal
binning directly as part of the encoding as this will automatically format the
temporal axis. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/timeunit.html#transform)
for further details.

The following example takes a temporal dataset and encodes daily totals from it
grouping by month.

    trans =
        transform << timeUnitAs Month "date" "monthly"

    enc =
        encoding
            << position X [ pName "date", pMType Temporal, pTimeUnit Day ]
            << position Y [ pAggregate Sum, pMType Quantitative ]
            << detail [ dName "monthly", dMType Temporal ]

-}
timeUnitAs : TimeUnit -> String -> String -> List LabelledSpec -> List LabelledSpec
timeUnitAs tu field label =
    (::) ( "timeUnit", JE.list [ JE.string (timeUnitLabel tu), JE.string field, JE.string label ] )


{-| Provide an optional title to be displayed in the visualization.

    enc = ...
    toVegaLite
        [ title "Population Growth"
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
title : String -> ( VLProperty, Spec )
title s =
    ( VLTitle, JE.string s )


{-| Specify the field type (level of measurement) when encoding with a text
channel. For details, see the
[Vega-Lite type documentation](https://vega.github.io/vega-lite/docs/type.html)
-}
tMType : Measurement -> TextChannel
tMType =
    TmType


{-| Provide the name of the field used for encoding with a text channel.
For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
tName : String -> TextChannel
tName =
    TName


{-| Reference in a text channel to a field name generated by `repeat`. The
parameter identifies whether reference is being made to fields that are to be
laid out in columns or in rows.
-}
tRepeat : Arrangement -> TextChannel
tRepeat =
    TRepeat


{-| Encode a tooltip channel. The first parameter is a list of text channel properties
that define the channel. The second parameter is a list of any previous channels to
which this channel is to be added. This is usually implicit when chaining a
set of encodings together with functional composition. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#text)
for further details on the text and tooltip channels and
[Vega-Lite formatting documentation](https://vega.github.io/vega-lite/docs/format.html)
for formatting the appearance of the text.

      enc =
          encoding
              << position X [ pName "Horsepower", pMType Quantitative ]
              << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
              << tooltip [ tName "Year", tMType Temporal, tFormat "%Y" ]

-}
tooltip : List TextChannel -> List LabelledSpec -> List LabelledSpec
tooltip tDefs =
    (::) ( "tooltip", List.concatMap textChannelProperty tDefs |> JE.object )


{-| Convert a list of Vega-Lite specifications into a single JSON object that may be
passed to Vega-Lite for graphics generation. Commonly these will include at least
a data, mark and encoding specification.

While simple functions like `bar` may be provided directly, it is usually clearer
to label more complex ones such as encodings as separate expressions. This becomes
increasingly helpful for visualizations that involve composition of layers, repeats
and facets.

Specifications can be built up by chaining a series of functions (such as `dataColumn`
or `position` in the example below). Functional composition using the `<<` operator
allows this to be done compactly.

    let
        data =
            dataFromColumns []
                << dataColumn "a" (Strings [ "C", "C", "D", "D", "E", "E" ])
                << dataColumn "b" (Numbers [ 2, 7, 1, 2, 6, 8 ])

        enc =
            encoding
                << position X [ pName "a", pMType Nominal ]
                << position Y [ pName "b", pMType Quantitative, pAggregate Mean ]
    in
    toVegaLite [ data [], bar [], enc [] ]

-}
toVegaLite : List ( VLProperty, Spec ) -> Spec
toVegaLite spec =
    ( "$schema", JE.string "https://vega.github.io/schema/vega-lite/v2.json" )
        :: List.map (\( s, v ) -> ( vlPropertyLabel s, v )) spec
        |> JE.object


{-| Specify a trail mark. A trail is a line that can vary in thickness along its
length. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/trail.html).

    trail [ MInterpolate StepAfter ]

-}
trail : List MarkProperty -> ( VLProperty, Spec )
trail =
    mark Trail


{-| Specify the style for all trail marks.

    config =
        configure << trailConfig [ MOpacity 0.5, MStrokeDash [ 1, 2 ] ]

-}
trailConfig : List MarkProperty -> List LabelledSpec -> List LabelledSpec
trailConfig mps =
    -- NOTE: This is the first config option to have an opaque type and public function.
    -- In preparation for next major version where we will replace many types with functions.
    (::) (configProperty (TrailStyle mps))


{-| Create a single transform from a list of transformation specifications. Note
that the order of transformations can be important, especially if labels created
with `calculateAs`, `timeUnitAs` and `binAs` are used in other transformations.
Using the functional composition pipeline idiom (as example below) allows you to
provide the transformations in the order intended in a clear manner.

    trans =
        transform
            << filter (FExpr "datum.year == 2010")
            << calculateAs "datum.sex == 2 ? 'Female' : 'Male'" "gender"

-}
transform : List LabelledSpec -> ( VLProperty, Spec )
transform transforms =
    let
        assemble : LabelledSpec -> Spec
        assemble ( str, val ) =
            -- These special cases (aggregate, bin etc.) use decodeString because
            -- they generate more than one labelled specification from a single function.
            case str of
                "aggregate" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ ops, groups ] ->
                            JE.object [ ( "aggregate", ops ), ( "groupby", groups ) ]

                        _ ->
                            JE.null

                "bin" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ binParams, field, label ] ->
                            JE.object [ ( "bin", binParams ), ( "field", field ), ( "as", label ) ]

                        _ ->
                            JE.null

                "calculate" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ expr, label ] ->
                            JE.object [ ( "calculate", expr ), ( "as", label ) ]

                        _ ->
                            JE.null

                "lookup" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ key1, dataSpec, key2, fields ] ->
                            JE.object
                                [ ( "lookup", key1 )
                                , ( "from", JE.object [ ( "data", dataSpec ), ( "key", key2 ), ( "fields", fields ) ] )
                                ]

                        _ ->
                            JE.null

                "lookupAs" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ key1, dataSpec, key2, asName ] ->
                            JE.object
                                [ ( "lookup", key1 )
                                , ( "from", JE.object [ ( "data", dataSpec ), ( "key", key2 ) ] )
                                , ( "as", asName )
                                ]

                        _ ->
                            JE.null

                "timeUnit" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ tu, field, label ] ->
                            JE.object [ ( "timeUnit", tu ), ( "field", field ), ( "as", label ) ]

                        _ ->
                            JE.null

                _ ->
                    JE.object [ ( str, val ) ]
    in
    if List.isEmpty transforms then
        ( VLTransform, JE.null )
    else
        ( VLTransform, JE.list (List.map assemble transforms) )


{-| Specify the properties of a text channel conditional on interactive selection.
The first parameter provides the selection to evaluate, the second the encoding
to apply if the text has been selected, the third the encoding if it is not selected.
For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)
-}
tSelectionCondition : BooleanOp -> List TextChannel -> List TextChannel -> TextChannel
tSelectionCondition op tCh fCh =
    TSelectionCondition op tCh fCh


{-| Specify the form of time unit aggregation of field values when encoding with
a text channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
-}
tTimeUnit : TimeUnit -> TextChannel
tTimeUnit =
    TTimeUnit


{-| Provides a UTC version of a given a time (coordinated universal time, independent
of local time zones or daylight saving).
For example,

    encoding
        << position X [ pName "date", pMType Temporal, pTimeUnit (utc YearMonthDateHours) ]

-}
utc : TimeUnit -> TimeUnit
utc tu =
    Utc tu


{-| Assigns a list of specifications to be juxtaposed vertically in a visualization.

    let
        spec1 = ...
        spec2 = ...
    in
    toVegaLite
        [ dataFromUrl "data/driving.json" []
        , vConcat [ spec1, spec2 ]
        ]

-}
vConcat : List Spec -> ( VLProperty, Spec )
vConcat specs =
    ( VLVConcat, JE.list specs )


{-| Override the default width of the visualization. If not specified the width
will be calculated based on the content of the visualization.

    enc = ...
    toVegaLite
        [ width 500
        , dataFromUrl "data/population.json" []
        , bar []
        , enc []
        ]

-}
width : Float -> ( VLProperty, Spec )
width w =
    ( VLWidth, JE.float w )



-- ################################################# Private types and functions


transpose : List (List a) -> List (List a)
transpose ll =
    case ll of
        [] ->
            []

        [] :: xss ->
            transpose xss

        (x :: xs) :: xss ->
            let
                heads =
                    List.filterMap List.head xss

                tails =
                    List.filterMap List.tail xss
            in
            (x :: heads) :: transpose (xs :: tails)



-- Functions to convert types into their string label, labelled spec or spec


anchorLabel : APosition -> String
anchorLabel an =
    case an of
        AStart ->
            "start"

        AMiddle ->
            "middle"

        AEnd ->
            "end"


arrangementLabel : Arrangement -> String
arrangementLabel arrng =
    case arrng of
        Row ->
            "row"

        Column ->
            "column"


autosizeProperty : Autosize -> LabelledSpec
autosizeProperty asCfg =
    case asCfg of
        APad ->
            ( "type", JE.string "pad" )

        AFit ->
            ( "type", JE.string "fit" )

        ANone ->
            ( "type", JE.string "none" )

        AResize ->
            ( "resize", JE.bool True )

        AContent ->
            ( "contains", JE.string "content" )

        APadding ->
            ( "contains", JE.string "padding" )


axisConfigProperty : AxisConfig -> LabelledSpec
axisConfigProperty axisCfg =
    case axisCfg of
        BandPosition x ->
            ( "bandPosition", JE.float x )

        Domain b ->
            ( "domain", JE.bool b )

        DomainColor c ->
            ( "domainColor", JE.string c )

        DomainWidth w ->
            ( "domainWidth", JE.float w )

        MaxExtent n ->
            ( "maxExtent", JE.float n )

        MinExtent n ->
            ( "minExtent", JE.float n )

        Grid b ->
            ( "grid", JE.bool b )

        GridColor c ->
            ( "gridColor", JE.string c )

        GridDash ds ->
            ( "gridDash", JE.list (List.map JE.float ds) )

        GridOpacity o ->
            ( "gridOpacity", JE.float o )

        GridWidth x ->
            ( "gridWidth", JE.float x )

        Labels b ->
            ( "labels", JE.bool b )

        LabelAngle angle ->
            ( "labelAngle", JE.float angle )

        LabelColor c ->
            ( "labelColor", JE.string c )

        LabelFont f ->
            ( "labelFont", JE.string f )

        LabelFontSize x ->
            ( "labelFontSize", JE.float x )

        LabelLimit x ->
            ( "labelLimit", JE.float x )

        LabelOverlap strat ->
            ( "labelOverlap", JE.string (overlapStrategyLabel strat) )

        LabelPadding pad ->
            ( "labelPadding", JE.float pad )

        ShortTimeLabels b ->
            ( "shortTimeLabels", JE.bool b )

        Ticks b ->
            ( "ticks", JE.bool b )

        TickColor c ->
            ( "tickColor", JE.string c )

        TickRound b ->
            ( "tickRound", JE.bool b )

        TickSize x ->
            ( "tickSize", JE.float x )

        TickWidth x ->
            ( "tickWidth", JE.float x )

        TitleAlign align ->
            ( "titleAlign", JE.string (hAlignLabel align) )

        TitleAngle angle ->
            ( "titleAngle", JE.float angle )

        TitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        TitleColor c ->
            ( "titleColor", JE.string c )

        TitleFont f ->
            ( "titleFont", JE.string f )

        TitleFontWeight w ->
            ( "titleFontWeight", fontWeightSpec w )

        TitleFontSize x ->
            ( "titleFontSize", JE.float x )

        TitleLimit x ->
            ( "titleLimit", JE.float x )

        TitleMaxLength x ->
            ( "titleMaxLength", JE.float x )

        TitlePadding x ->
            ( "titlePadding", JE.float x )

        TitleX x ->
            ( "titleX", JE.float x )

        TitleY y ->
            ( "titleY", JE.float y )


axisProperty : AxisProperty -> LabelledSpec
axisProperty axisProp =
    case axisProp of
        AxFormat fmt ->
            ( "format", JE.string fmt )

        AxLabels b ->
            ( "labels", JE.bool b )

        AxLabelAngle angle ->
            ( "labelAngle", JE.float angle )

        AxLabelOverlap strat ->
            ( "labelOverlap", JE.string (overlapStrategyLabel strat) )

        AxLabelPadding pad ->
            ( "labelPadding", JE.float pad )

        AxDomain b ->
            ( "domain", JE.bool b )

        AxGrid b ->
            ( "grid", JE.bool b )

        AxMaxExtent n ->
            ( "maxExtent", JE.float n )

        AxMinExtent n ->
            ( "minExtent", JE.float n )

        AxOrient side ->
            ( "orient", JE.string (sideLabel side) )

        AxOffset n ->
            ( "offset", JE.float n )

        AxPosition n ->
            ( "position", JE.float n )

        AxZIndex n ->
            ( "zindex", JE.int n )

        AxTicks b ->
            ( "ticks", JE.bool b )

        AxTickCount n ->
            ( "tickCount", JE.int n )

        AxTickSize sz ->
            ( "tickSize", JE.float sz )

        AxValues vals ->
            ( "values", JE.list (List.map JE.float vals) )

        AxDates dtss ->
            ( "values", JE.list (List.map (\dts -> JE.object (List.map dateTimeProperty dts)) dtss) )

        AxTitle title ->
            ( "title", JE.string title )

        AxTitleAlign align ->
            ( "titleAlign", JE.string (hAlignLabel align) )

        AxTitleAngle angle ->
            ( "titleAngle", JE.float angle )

        AxTitleMaxLength len ->
            ( "titleMaxLength", JE.float len )

        AxTitlePadding pad ->
            ( "titlePadding", JE.float pad )


bindingSpec : Binding -> LabelledSpec
bindingSpec bnd =
    case bnd of
        IRange label props ->
            ( label, JE.object (( "input", JE.string "range" ) :: List.map inputProperty props) )

        ICheckbox label props ->
            ( label, JE.object (( "input", JE.string "checkbox" ) :: List.map inputProperty props) )

        IRadio label props ->
            ( label, JE.object (( "input", JE.string "radio" ) :: List.map inputProperty props) )

        ISelect label props ->
            ( label, JE.object (( "input", JE.string "select" ) :: List.map inputProperty props) )

        IText label props ->
            ( label, JE.object (( "input", JE.string "text" ) :: List.map inputProperty props) )

        INumber label props ->
            ( label, JE.object (( "input", JE.string "number" ) :: List.map inputProperty props) )

        IDate label props ->
            ( label, JE.object (( "input", JE.string "date" ) :: List.map inputProperty props) )

        ITime label props ->
            ( label, JE.object (( "input", JE.string "time" ) :: List.map inputProperty props) )

        IMonth label props ->
            ( label, JE.object (( "input", JE.string "month" ) :: List.map inputProperty props) )

        IWeek label props ->
            ( label, JE.object (( "input", JE.string "week" ) :: List.map inputProperty props) )

        IDateTimeLocal label props ->
            ( label, JE.object (( "input", JE.string "datetimelocal" ) :: List.map inputProperty props) )

        ITel label props ->
            ( label, JE.object (( "input", JE.string "tel" ) :: List.map inputProperty props) )

        IColor label props ->
            ( label, JE.object (( "input", JE.string "color" ) :: List.map inputProperty props) )


binProperty : BinProperty -> LabelledSpec
binProperty binProp =
    case binProp of
        MaxBins n ->
            ( "maxbins", JE.int n )

        Base x ->
            ( "base", JE.float x )

        Step x ->
            ( "step", JE.float x )

        Steps xs ->
            ( "steps", JE.list (List.map JE.float xs) )

        MinStep x ->
            ( "minstep", JE.float x )

        Divide x y ->
            ( "divide", JE.list [ JE.float x, JE.float y ] )

        Divides xs ->
            ( "divide", JE.list (List.map JE.float xs) )

        Extent mn mx ->
            ( "extent", JE.list [ JE.float mn, JE.float mx ] )

        Nice b ->
            ( "nice", JE.bool b )


booleanOpSpec : BooleanOp -> Spec
booleanOpSpec bo =
    case bo of
        Expr expr ->
            JE.string expr

        SelectionName selName ->
            JE.string selName

        Selection sel ->
            JE.object [ ( "selection", JE.string sel ) ]

        And operand1 operand2 ->
            JE.object [ ( "and", JE.list [ booleanOpSpec operand1, booleanOpSpec operand2 ] ) ]

        Or operand1 operand2 ->
            JE.object [ ( "or", JE.list [ booleanOpSpec operand1, booleanOpSpec operand2 ] ) ]

        Not operand ->
            JE.object [ ( "not", booleanOpSpec operand ) ]


channelLabel : Channel -> String
channelLabel ch =
    case ch of
        ChX ->
            "x"

        ChY ->
            "y"

        ChX2 ->
            "x2"

        ChY2 ->
            "y2"

        ChColor ->
            "color"

        ChOpacity ->
            "opacity"

        ChShape ->
            "shape"

        ChSize ->
            "size"


cInterpolateSpec : CInterpolate -> Spec
cInterpolateSpec iType =
    case iType of
        Rgb gamma ->
            JE.object [ ( "type", JE.string "rgb" ), ( "gamma", JE.float gamma ) ]

        Hsl ->
            JE.object [ ( "type", JE.string "hsl" ) ]

        HslLong ->
            JE.object [ ( "type", JE.string "hsl-long" ) ]

        Lab ->
            JE.object [ ( "type", JE.string "lab" ) ]

        Hcl ->
            JE.object [ ( "type", JE.string "hcl" ) ]

        HclLong ->
            JE.object [ ( "type", JE.string "hcl-long" ) ]

        CubeHelix gamma ->
            JE.object [ ( "type", JE.string "cubehelix" ), ( "gamma", JE.float gamma ) ]

        CubeHelixLong gamma ->
            JE.object [ ( "type", JE.string "cubehelix-long" ), ( "gamma", JE.float gamma ) ]


configProperty : ConfigurationProperty -> LabelledSpec
configProperty configProp =
    case configProp of
        Autosize aus ->
            ( "autosize", JE.object (List.map autosizeProperty aus) )

        Background bg ->
            ( "background", JE.string bg )

        CountTitle title ->
            ( "countTitle", JE.string title )

        FieldTitle ftp ->
            ( "fieldTitle", JE.string (fieldTitleLabel ftp) )

        RemoveInvalid b ->
            if b then
                ( "invalidValues", JE.string "filter" )
            else
                ( "invalidValues", JE.null )

        NumberFormat fmt ->
            ( "numberFormat", JE.string fmt )

        Padding pad ->
            ( "padding", paddingSpec pad )

        TimeFormat fmt ->
            ( "timeFormat", JE.string fmt )

        Axis acs ->
            ( "axis", JE.object (List.map axisConfigProperty acs) )

        AxisX acs ->
            ( "axisX", JE.object (List.map axisConfigProperty acs) )

        AxisY acs ->
            ( "axisY", JE.object (List.map axisConfigProperty acs) )

        AxisLeft acs ->
            ( "axisLeft", JE.object (List.map axisConfigProperty acs) )

        AxisRight acs ->
            ( "axisRight", JE.object (List.map axisConfigProperty acs) )

        AxisTop acs ->
            ( "axisTop", JE.object (List.map axisConfigProperty acs) )

        AxisBottom acs ->
            ( "axisBottom", JE.object (List.map axisConfigProperty acs) )

        AxisBand acs ->
            ( "axisBand", JE.object (List.map axisConfigProperty acs) )

        Legend lcs ->
            ( "legend", JE.object (List.map legendConfigProperty lcs) )

        MarkStyle mps ->
            ( "mark", JE.object (List.map markProperty mps) )

        Projection pps ->
            ( "projection", JE.object (List.map projectionProperty pps) )

        AreaStyle mps ->
            ( "area", JE.object (List.map markProperty mps) )

        BarStyle mps ->
            ( "bar", JE.object (List.map markProperty mps) )

        CircleStyle mps ->
            ( "circle", JE.object (List.map markProperty mps) )

        LineStyle mps ->
            ( "line", JE.object (List.map markProperty mps) )

        PointStyle mps ->
            ( "point", JE.object (List.map markProperty mps) )

        RectStyle mps ->
            ( "rect", JE.object (List.map markProperty mps) )

        RuleStyle mps ->
            ( "rule", JE.object (List.map markProperty mps) )

        SquareStyle mps ->
            ( "square", JE.object (List.map markProperty mps) )

        TextStyle mps ->
            ( "text", JE.object (List.map markProperty mps) )

        TickStyle mps ->
            ( "tick", JE.object (List.map markProperty mps) )

        TitleStyle tcs ->
            ( "title", JE.object (List.map titleConfigSpec tcs) )

        NamedStyle name mps ->
            ( "style", JE.object [ ( name, JE.object (List.map markProperty mps) ) ] )

        Scale scs ->
            ( "scale", JE.object (List.map scaleConfigProperty scs) )

        Stack sp ->
            stackProperty sp

        Range rcs ->
            ( "range", JE.object (List.map rangeConfigProperty rcs) )

        SelectionStyle selConfig ->
            let
                selProp ( sel, sps ) =
                    ( selectionLabel sel, JE.object (List.map selectionProperty sps) )
            in
            ( "selection", JE.object (List.map selProp selConfig) )

        View vcs ->
            ( "view", JE.object (List.map viewConfigProperty vcs) )

        TrailStyle mps ->
            ( "trail", JE.object (List.map markProperty mps) )


cursorLabel : Cursor -> String
cursorLabel cur =
    case cur of
        CAuto ->
            "auto"

        CDefault ->
            "default"

        CNone ->
            "none"

        CContextMenu ->
            "context-menu"

        CHelp ->
            "help"

        CPointer ->
            "pointer"

        CProgress ->
            "progress"

        CWait ->
            "wait"

        CCell ->
            "cell"

        CCrosshair ->
            "crosshair"

        CText ->
            "text"

        CVerticalText ->
            "vertical-text"

        CAlias ->
            "alias"

        CCopy ->
            "copy"

        CMove ->
            "move"

        CNoDrop ->
            "no-drop"

        CNotAllowed ->
            "not-allowed"

        CAllScroll ->
            "all-scroll"

        CColResize ->
            "col-resize"

        CRowResize ->
            "row-resize"

        CNResize ->
            "n-resize"

        CEResize ->
            "e-resize"

        CSResize ->
            "s-resize"

        CWResize ->
            "w-resize"

        CNEResize ->
            "ne-resize"

        CNWResize ->
            "nw-resize"

        CSEResize ->
            "se-resize"

        CSWResize ->
            "sw-resize"

        CEWResize ->
            "ew-resize"

        CNSResize ->
            "ns-resize"

        CNESWResize ->
            "nesw-resize"

        CNWSEResize ->
            "nwse-resize"

        CZoomIn ->
            "zoom-in"

        CZoomOut ->
            "zoom-out"

        CGrab ->
            "grab"

        CGrabbing ->
            "grabbing"


dataTypeSpec : DataType -> Spec
dataTypeSpec dType =
    case dType of
        FoNumber ->
            JE.string "number"

        FoBoolean ->
            JE.string "boolean"

        FoDate dateFmt ->
            if dateFmt == "" then
                JE.string "date"
            else
                JE.string ("date:'" ++ dateFmt ++ "'")

        FoUtc dateFmt ->
            if dateFmt == "" then
                JE.string "utc"
            else
                JE.string ("utc:'" ++ dateFmt ++ "'")


dataValueSpec : DataValue -> Spec
dataValueSpec val =
    case val of
        Number x ->
            JE.float x

        Str s ->
            JE.string s

        Boolean b ->
            JE.bool b

        DateTime dt ->
            JE.object (List.map dateTimeProperty dt)


dataValuesSpecs : DataValues -> List Spec
dataValuesSpecs dvs =
    case dvs of
        Numbers xs ->
            List.map JE.float xs

        Strings ss ->
            List.map JE.string ss

        DateTimes dtss ->
            List.map (\dts -> JE.object (List.map dateTimeProperty dts)) dtss

        Booleans bs ->
            List.map JE.bool bs


dateTimeProperty : DateTime -> LabelledSpec
dateTimeProperty dt =
    case dt of
        DTYear y ->
            ( "year", JE.int y )

        DTQuarter q ->
            ( "quarter", JE.int q )

        DTMonth mon ->
            ( "month", JE.string (monthNameLabel mon) )

        DTDate dt ->
            ( "date", JE.int dt )

        DTDay day ->
            ( "day", JE.string (dayLabel day) )

        DTHours h ->
            ( "hours", JE.int h )

        DTMinutes m ->
            ( "minutes", JE.int m )

        DTSeconds s ->
            ( "seconds", JE.int s )

        DTMilliseconds ms ->
            ( "milliseconds", JE.int ms )


dayLabel : DayName -> String
dayLabel day =
    case day of
        Mon ->
            "Mon"

        Tue ->
            "Tue"

        Wed ->
            "Wed"

        Thu ->
            "Thu"

        Fri ->
            "Fri"

        Sat ->
            "Sat"

        Sun ->
            "Sun"


detailChannelProperty : DetailChannel -> LabelledSpec
detailChannelProperty field =
    case field of
        DName s ->
            ( "field", JE.string s )

        DmType t ->
            ( "type", JE.string (measurementLabel t) )

        DBin bps ->
            bin bps

        DTimeUnit tu ->
            ( "timeUnit", JE.string (timeUnitLabel tu) )

        DAggregate op ->
            ( "aggregate", JE.string (operationLabel op) )



-- eventLabel : Event -> String
-- eventLabel e =
--     case e of
--         Click ->
--             "click"
--
--         DblClick ->
--             "dblclick"
--
--         DragEnter ->
--             "dragenter"
--
--         DragLeave ->
--             "dragleave"
--
--         DragOver ->
--             "dragover"
--
--         KeyDown ->
--             "keydown"
--
--         KeyPress ->
--             "keypress"
--
--         KeyUp ->
--             "keyup"
--
--         MouseDown ->
--             "mousedown"
--
--         MouseMove ->
--             "mousemove"
--
--         MouseOut ->
--             "mouseout"
--
--         MouseOver ->
--             "mouseover"
--
--         MouseUp ->
--             "mouseup"
--
--         MouseWheel ->
--             "mousewheel"
--
--         TouchEnd ->
--             "touchend"
--
--         TouchMove ->
--             "touchmove"
--
--         TouchStart ->
--             "touchstart"
--
--         Wheel ->
--             "touchwheel"


facetChannelProperty : FacetChannel -> LabelledSpec
facetChannelProperty fMap =
    case fMap of
        FName s ->
            ( "field", JE.string s )

        FmType measure ->
            ( "type", JE.string (measurementLabel measure) )

        FBin bps ->
            bin bps

        FAggregate op ->
            ( "aggregate", JE.string (operationLabel op) )

        FTimeUnit tu ->
            ( "timeUnit", JE.string (timeUnitLabel tu) )

        FHeader hProps ->
            ( "header", JE.object (List.map headerProperty hProps) )


facetMappingProperty : FacetMapping -> LabelledSpec
facetMappingProperty fMap =
    case fMap of
        RowBy fFields ->
            ( "row", JE.object (List.map facetChannelProperty fFields) )

        ColumnBy fFields ->
            ( "column", JE.object (List.map facetChannelProperty fFields) )


fieldTitleLabel : FieldTitleProperty -> String
fieldTitleLabel ftp =
    case ftp of
        Verbal ->
            "verbal"

        Function ->
            "function"

        Plain ->
            "plain"


fontWeightSpec : FontWeight -> Spec
fontWeightSpec w =
    case w of
        Normal ->
            JE.string "normal"

        Bold ->
            JE.string "bold"

        Bolder ->
            JE.string "bolder"

        Lighter ->
            JE.string "lighter"

        W100 ->
            JE.float 100

        W200 ->
            JE.float 200

        W300 ->
            JE.float 300

        W400 ->
            JE.float 400

        W500 ->
            JE.float 500

        W600 ->
            JE.float 600

        W700 ->
            JE.float 700

        W800 ->
            JE.float 800

        W900 ->
            JE.float 900


formatProperty : Format -> List LabelledSpec
formatProperty fmt =
    case fmt of
        JSON propertyName ->
            if String.trim propertyName == "" then
                [ ( "type", JE.string "json" ) ]
            else
                [ ( "type", JE.string "json" ), ( "property", JE.string propertyName ) ]

        CSV ->
            [ ( "type", JE.string "csv" ) ]

        TSV ->
            [ ( "type", JE.string "tsv" ) ]

        TopojsonFeature objectSet ->
            [ ( "type", JE.string "topojson" ), ( "feature", JE.string objectSet ) ]

        TopojsonMesh objectSet ->
            [ ( "type", JE.string "topojson" ), ( "mesh", JE.string objectSet ) ]

        Parse fmts ->
            [ ( "parse", JE.object <| List.map (\( field, fmt ) -> ( field, dataTypeSpec fmt )) fmts ) ]


geometryTypeSpec : Geometry -> Spec
geometryTypeSpec gType =
    let
        toCoords : List ( Float, Float ) -> Spec
        toCoords pairs =
            JE.list <| List.map (\( x, y ) -> JE.list [ JE.float x, JE.float y ]) pairs
    in
    case gType of
        GeoPoint x y ->
            JE.object
                [ ( "type", JE.string "Point" )
                , ( "coordinates", JE.list [ JE.float x, JE.float y ] )
                ]

        GeoPoints coords ->
            JE.object
                [ ( "type", JE.string "MultiPoint" )
                , ( "coordinates", toCoords coords )
                ]

        GeoLine coords ->
            JE.object
                [ ( "type", JE.string "LineString" )
                , ( "coordinates", toCoords coords )
                ]

        GeoLines coords ->
            JE.object
                [ ( "type", JE.string "MultiLineString" )
                , ( "coordinates", List.map toCoords coords |> JE.list )
                ]

        GeoPolygon coords ->
            JE.object
                [ ( "type", JE.string "Polygon" )
                , ( "coordinates", List.map toCoords coords |> JE.list )
                ]

        GeoPolygons coords ->
            JE.object
                [ ( "type", JE.string "MultiPolygon" )
                , ( "coordinates", List.map (\cs -> List.map toCoords cs |> JE.list) coords |> JE.list )
                ]


hAlignLabel : HAlign -> String
hAlignLabel align =
    case align of
        AlignLeft ->
            "left"

        AlignCenter ->
            "center"

        AlignRight ->
            "right"


headerProperty : HeaderProperty -> LabelledSpec
headerProperty hProp =
    case hProp of
        HFormat fmt ->
            ( "format", JE.string fmt )

        HTitle title ->
            ( "title", JE.string title )


hyperlinkChannelProperty : HyperlinkChannel -> List LabelledSpec
hyperlinkChannelProperty field =
    case field of
        HName s ->
            [ ( "field", JE.string s ) ]

        HRepeat arr ->
            [ ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] ) ]

        HmType t ->
            [ ( "type", JE.string (measurementLabel t) ) ]

        HBin bps ->
            [ bin bps ]

        HSelectionCondition selName ifClause elseClause ->
            ( "condition", JE.object (( "selection", booleanOpSpec selName ) :: List.concatMap hyperlinkChannelProperty ifClause) )
                :: List.concatMap hyperlinkChannelProperty elseClause

        HDataCondition predicate ifClause elseClause ->
            ( "condition", JE.object (( "test", booleanOpSpec predicate ) :: List.concatMap hyperlinkChannelProperty ifClause) )
                :: List.concatMap hyperlinkChannelProperty elseClause

        HTimeUnit tu ->
            [ ( "timeUnit", JE.string (timeUnitLabel tu) ) ]

        HAggregate op ->
            [ ( "aggregate", JE.string (operationLabel op) ) ]

        HString s ->
            [ ( "value", JE.string s ) ]


inputProperty : InputProperty -> LabelledSpec
inputProperty prop =
    case prop of
        InMin x ->
            ( "min", JE.float x )

        InMax x ->
            ( "max", JE.float x )

        InStep x ->
            ( "step", JE.float x )

        Debounce x ->
            ( "debounce", JE.float x )

        InName s ->
            ( "name", JE.string s )

        InOptions opts ->
            ( "options", JE.list (List.map JE.string opts) )

        InPlaceholder el ->
            ( "placeholder", JE.string el )

        Element el ->
            ( "element", JE.string el )


legendConfigProperty : LegendConfig -> LabelledSpec
legendConfigProperty legendConfig =
    case legendConfig of
        CornerRadius r ->
            ( "cornerRadius", JE.float r )

        FillColor s ->
            ( "fillColor", JE.string s )

        Orient or ->
            ( "orient", JE.string (legendOrientLabel or) )

        Offset x ->
            ( "offset", JE.float x )

        StrokeColor s ->
            ( "strokeColor", JE.string s )

        LeStrokeDash xs ->
            ( "strokeDash", JE.list (List.map JE.float xs) )

        LeStrokeWidth x ->
            ( "strokeWidth", JE.float x )

        LePadding x ->
            ( "padding", JE.float x )

        GradientLabelBaseline va ->
            ( "gradientLabelBaseline", JE.string (vAlignLabel va) )

        GradientLabelLimit x ->
            ( "gradientLabelLimit", JE.float x )

        GradientLabelOffset x ->
            ( "gradientLabelOffset", JE.float x )

        GradientStrokeColor s ->
            ( "gradientStrokeColor", JE.string s )

        GradientStrokeWidth x ->
            ( "gradientStrokeWidth", JE.float x )

        GradientHeight x ->
            ( "gradientHeight", JE.float x )

        GradientWidth x ->
            ( "gradientWidth", JE.float x )

        LeLabelAlign ha ->
            ( "labelAlign", JE.string (hAlignLabel ha) )

        LeLabelBaseline va ->
            ( "labelBaseline", JE.string (vAlignLabel va) )

        LeLabelColor s ->
            ( "labelColor", JE.string s )

        LeLabelFont s ->
            ( "labelFont", JE.string s )

        LeLabelFontSize x ->
            ( "labelFontSize", JE.float x )

        LeLabelLimit x ->
            ( "labelLimit", JE.float x )

        LeLabelOffset x ->
            ( "labelOffset", JE.float x )

        LeShortTimeLabels b ->
            ( "shortTimeLabels", JE.bool b )

        EntryPadding x ->
            ( "entryPadding", JE.float x )

        SymbolColor s ->
            ( "symbolColor", JE.string s )

        SymbolType s ->
            ( "symbolType", JE.string (symbolLabel s) )

        SymbolSize x ->
            ( "symbolSize", JE.float x )

        SymbolStrokeWidth x ->
            ( "symbolStrokeWidth", JE.float x )

        LeTitleAlign ha ->
            ( "titleAlign", JE.string (hAlignLabel ha) )

        LeTitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        LeTitleColor s ->
            ( "titleColor", JE.string s )

        LeTitleFont s ->
            ( "titleFont", JE.string s )

        LeTitleFontSize x ->
            ( "titleFontSize", JE.float x )

        LeTitleFontWeight fw ->
            ( "titleFontWeight", fontWeightSpec fw )

        LeTitleLimit x ->
            ( "titleLimit", JE.float x )

        LeTitlePadding x ->
            ( "titlePadding", JE.float x )


legendOrientLabel : LegendOrientation -> String
legendOrientLabel orient =
    case orient of
        Left ->
            "left"

        BottomLeft ->
            "bottom-left"

        BottomRight ->
            "bottom-right"

        Right ->
            "right"

        TopLeft ->
            "top-left"

        TopRight ->
            "top-right"

        None ->
            "none"


legendProperty : LegendProperty -> LabelledSpec
legendProperty legendProp =
    case legendProp of
        LType lType ->
            case lType of
                Gradient ->
                    ( "type", JE.string "gradient" )

                Symbol ->
                    ( "type", JE.string "symbol" )

        LEntryPadding x ->
            ( "entryPadding", JE.float x )

        LFormat s ->
            ( "format", JE.string s )

        LOffset x ->
            ( "offset", JE.float x )

        LOrient or ->
            ( "orient", JE.string (legendOrientLabel or) )

        LPadding x ->
            ( "padding", JE.float x )

        LTickCount x ->
            ( "tickCount", JE.float x )

        LTitle title ->
            if title == "" then
                ( "title", JE.null )
            else
                ( "title", JE.string title )

        LValues vals ->
            let
                list =
                    case vals of
                        LNumbers xs ->
                            List.map JE.float xs |> JE.list

                        LDateTimes dts ->
                            List.map (\dt -> JE.object (List.map dateTimeProperty dt)) dts |> JE.list

                        LStrings ss ->
                            List.map JE.string ss |> JE.list
            in
            ( "values", list )

        LZIndex n ->
            ( "zindex", JE.int n )


markChannelProperty : MarkChannel -> List LabelledSpec
markChannelProperty field =
    case field of
        MName s ->
            [ ( "field", JE.string s ) ]

        MRepeat arr ->
            [ ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] ) ]

        MmType t ->
            [ ( "type", JE.string (measurementLabel t) ) ]

        MScale sps ->
            if sps == [] then
                [ ( "scale", JE.null ) ]
            else
                [ ( "scale", JE.object (List.map scaleProperty sps) ) ]

        MLegend lps ->
            if lps == [] then
                [ ( "legend", JE.null ) ]
            else
                [ ( "legend", JE.object (List.map legendProperty lps) ) ]

        MBin bps ->
            [ bin bps ]

        MSelectionCondition selName ifClause elseClause ->
            ( "condition", JE.object (( "selection", booleanOpSpec selName ) :: List.concatMap markChannelProperty ifClause) )
                :: List.concatMap markChannelProperty elseClause

        MDataCondition predicate ifClause elseClause ->
            ( "condition", JE.object (( "test", booleanOpSpec predicate ) :: List.concatMap markChannelProperty ifClause) )
                :: List.concatMap markChannelProperty elseClause

        MTimeUnit tu ->
            [ ( "timeUnit", JE.string (timeUnitLabel tu) ) ]

        MAggregate op ->
            [ ( "aggregate", JE.string (operationLabel op) ) ]

        MPath s ->
            [ ( "value", JE.string s ) ]

        MNumber x ->
            [ ( "value", JE.float x ) ]

        MString s ->
            [ ( "value", JE.string s ) ]

        MBoolean b ->
            [ ( "value", JE.bool b ) ]


markInterpolationLabel : MarkInterpolation -> String
markInterpolationLabel interp =
    case interp of
        Linear ->
            "linear"

        LinearClosed ->
            "linear-closed"

        Stepwise ->
            "step"

        StepBefore ->
            "step-before"

        StepAfter ->
            "step-after"

        Basis ->
            "basis"

        BasisOpen ->
            "basis-open"

        BasisClosed ->
            "basis-closed"

        Cardinal ->
            "cardinal"

        CardinalOpen ->
            "cardinal-open"

        CardinalClosed ->
            "cardinal-closed"

        Bundle ->
            "bundle"

        Monotone ->
            "monotone"


markLabel : Mark -> String
markLabel mark =
    case mark of
        Area ->
            "area"

        Bar ->
            "bar"

        Circle ->
            "circle"

        Line ->
            "line"

        Geoshape ->
            "geoshape"

        Point ->
            "point"

        Rect ->
            "rect"

        Rule ->
            "rule"

        Square ->
            "square"

        Text ->
            "text"

        Tick ->
            "tick"

        Trail ->
            "trail"


markOrientationLabel : MarkOrientation -> String
markOrientationLabel orient =
    case orient of
        Horizontal ->
            "horizontal"

        Vertical ->
            "vertical"


markProperty : MarkProperty -> LabelledSpec
markProperty mProp =
    case mProp of
        MFilled b ->
            ( "filled", JE.bool b )

        MClip b ->
            ( "clip", JE.bool b )

        MColor col ->
            ( "color", JE.string col )

        MCursor cur ->
            ( "cursor", JE.string (cursorLabel cur) )

        MFill col ->
            ( "fill", JE.string col )

        MStroke col ->
            ( "stroke", JE.string col )

        MOpacity x ->
            ( "opacity", JE.float x )

        MFillOpacity x ->
            ( "fillOpacity", JE.float x )

        MStrokeOpacity x ->
            ( "strokeOpacity", JE.float x )

        MStrokeWidth x ->
            ( "strokeWidth", JE.float x )

        MStrokeDash xs ->
            ( "strokeDash", JE.list (List.map JE.float xs) )

        MStrokeDashOffset x ->
            ( "strokeDashOffset", JE.float x )

        MStyle styles ->
            ( "style", JE.list (List.map JE.string styles) )

        MInterpolate interp ->
            ( "interpolate", JE.string (markInterpolationLabel interp) )

        MTension x ->
            ( "tension", JE.float x )

        MOrient orient ->
            ( "orient", JE.string (markOrientationLabel orient) )

        MShape sym ->
            ( "shape", JE.string (symbolLabel sym) )

        MSize x ->
            ( "size", JE.float x )

        MAngle x ->
            ( "angle", JE.float x )

        MAlign align ->
            ( "align", JE.string (hAlignLabel align) )

        MBaseline va ->
            ( "baseline", JE.string (vAlignLabel va) )

        MdX dx ->
            ( "dx", JE.float dx )

        MdY dy ->
            ( "dy", JE.float dy )

        MFont fnt ->
            ( "font", JE.string fnt )

        MFontSize x ->
            ( "fontSize", JE.float x )

        MFontStyle fSty ->
            ( "fontStyle", JE.string fSty )

        MFontWeight w ->
            ( "fontWeight", fontWeightSpec w )

        MRadius x ->
            ( "radius", JE.float x )

        MText txt ->
            ( "text", JE.string txt )

        MTheta x ->
            ( "theta", JE.float x )

        MBinSpacing x ->
            ( "binSpacing", JE.float x )

        MContinuousBandSize x ->
            ( "continuousBandSize", JE.float x )

        MDiscreteBandSize x ->
            ( "discreteBandSize", JE.float x )

        MShortTimeLabels b ->
            ( "shortTimeLabels", JE.bool b )

        MBandSize x ->
            ( "bandSize", JE.float x )

        MThickness x ->
            ( "thickness", JE.float x )


measurementLabel : Measurement -> String
measurementLabel mType =
    case mType of
        Nominal ->
            "nominal"

        Ordinal ->
            "ordinal"

        Quantitative ->
            "quantitative"

        Temporal ->
            "temporal"

        -- Vega-Lite has a 'geojson' type for geographically referenced shape
        -- features, which here is renamed to the more general `GeoFeature`.
        GeoFeature ->
            "geojson"


monthNameLabel : MonthName -> String
monthNameLabel mon =
    case mon of
        Jan ->
            "Jan"

        Feb ->
            "Feb"

        Mar ->
            "Mar"

        Apr ->
            "Apr"

        May ->
            "May"

        Jun ->
            "Jun"

        Jul ->
            "Jul"

        Aug ->
            "Aug"

        Sep ->
            "Sep"

        Oct ->
            "Oct"

        Nov ->
            "Nov"

        Dec ->
            "Dec"


operationLabel : Operation -> String
operationLabel op =
    case op of
        ArgMax ->
            "argmax"

        ArgMin ->
            "argmin"

        Average ->
            "average"

        Count ->
            "count"

        CI0 ->
            "ci0"

        CI1 ->
            "ci1"

        Distinct ->
            "distinct"

        Max ->
            "max"

        Mean ->
            "mean"

        Median ->
            "median"

        Min ->
            "min"

        Missing ->
            "missing"

        Q1 ->
            "q1"

        Q3 ->
            "q3"

        Stdev ->
            "stdev"

        StdevP ->
            "stdevp"

        Sum ->
            "sum"

        Stderr ->
            "stderr"

        Valid ->
            "valid"

        Variance ->
            "variance"

        VarianceP ->
            "variancep"


orderChannelProperty : OrderChannel -> LabelledSpec
orderChannelProperty oDef =
    case oDef of
        OName s ->
            ( "field", JE.string s )

        ORepeat arr ->
            ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] )

        OmType measure ->
            ( "type", JE.string (measurementLabel measure) )

        OBin bps ->
            bin bps

        OAggregate op ->
            ( "aggregate", JE.string (operationLabel op) )

        OTimeUnit tu ->
            ( "timeUnit", JE.string (timeUnitLabel tu) )

        OSort ops ->
            case ops of
                [] ->
                    ( "sort", JE.null )

                [ Ascending ] ->
                    ( "sort", JE.string "ascending" )

                [ Descending ] ->
                    ( "sort", JE.string "descending" )

                [ CustomSort dvs ] ->
                    ( "sort", JE.list (dataValuesSpecs dvs) )

                _ ->
                    ( "sort", JE.object (List.map sortProperty ops) )


overlapStrategyLabel : OverlapStrategy -> String
overlapStrategyLabel strat =
    case strat of
        ONone ->
            "false"

        OParity ->
            "parity"

        OGreedy ->
            "greedy"


paddingSpec : Padding -> Spec
paddingSpec pad =
    case pad of
        PSize p ->
            JE.float p

        PEdges l t r b ->
            JE.object
                [ ( "left", JE.float l )
                , ( "top", JE.float t )
                , ( "right", JE.float r )
                , ( "bottom", JE.float b )
                ]


projectionLabel : Projection -> String
projectionLabel proj =
    case proj of
        Albers ->
            "albers"

        AlbersUsa ->
            "albersUsa"

        AzimuthalEqualArea ->
            "azimuthalEqualArea"

        AzimuthalEquidistant ->
            "azimuthalEquidistant"

        ConicConformal ->
            "conicConformal"

        ConicEqualArea ->
            "conicEqualarea"

        ConicEquidistant ->
            "conicEquidistant"

        Custom pName ->
            pName

        Equirectangular ->
            "equirectangular"

        Gnomonic ->
            "gnomonic"

        Mercator ->
            "mercator"

        Orthographic ->
            "orthographic"

        Stereographic ->
            "stereographic"

        TransverseMercator ->
            "transverseMercator"


projectionProperty : ProjectionProperty -> LabelledSpec
projectionProperty pp =
    case pp of
        PType proj ->
            ( "type", JE.string (projectionLabel proj) )

        PClipAngle numOrNull ->
            case numOrNull of
                Just x ->
                    ( "clipAngle", JE.float x )

                Nothing ->
                    ( "clipAngle", JE.null )

        PClipExtent rClip ->
            case rClip of
                NoClip ->
                    ( "clipExtent", JE.null )

                LTRB l t r b ->
                    ( "clipExtent", JE.list (List.map JE.float [ l, t, r, b ]) )

        PCenter lon lat ->
            ( "center", JE.list [ JE.float lon, JE.float lat ] )

        PRotate lambda phi gamma ->
            ( "rotate", JE.list (List.map JE.float [ lambda, phi, gamma ]) )

        PPrecision pr ->
            ( "precision", JE.float pr )

        PCoefficient x ->
            ( "coefficient", JE.float x )

        PDistance x ->
            ( "distance", JE.float x )

        PFraction x ->
            ( "fraction", JE.float x )

        PLobes n ->
            ( "lobes", JE.int n )

        PParallel x ->
            ( "parallel", JE.float x )

        PRadius x ->
            ( "radius", JE.float x )

        PRatio x ->
            ( "ratio", JE.float x )

        PSpacing x ->
            ( "spacing", JE.float x )

        PTilt x ->
            ( "tilt", JE.float x )


positionChannelProperty : PositionChannel -> LabelledSpec
positionChannelProperty pDef =
    case pDef of
        PName s ->
            ( "field", JE.string s )

        PmType measure ->
            ( "type", JE.string (measurementLabel measure) )

        PBin bps ->
            bin bps

        PAggregate op ->
            ( "aggregate", JE.string (operationLabel op) )

        PTimeUnit tu ->
            ( "timeUnit", JE.string (timeUnitLabel tu) )

        PSort ops ->
            case ops of
                [] ->
                    ( "sort", JE.null )

                [ Ascending ] ->
                    ( "sort", JE.string "ascending" )

                [ Descending ] ->
                    ( "sort", JE.string "descending" )

                [ CustomSort dvs ] ->
                    ( "sort", JE.list (dataValuesSpecs dvs) )

                _ ->
                    ( "sort", JE.object (List.map sortProperty ops) )

        PScale sps ->
            if sps == [] then
                ( "scale", JE.null )
            else
                ( "scale", JE.object (List.map scaleProperty sps) )

        PAxis aps ->
            if aps == [] then
                ( "axis", JE.null )
            else
                ( "axis", JE.object (List.map axisProperty aps) )

        PStack sp ->
            stackProperty sp

        PRepeat arr ->
            ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] )


positionLabel : Position -> String
positionLabel pChannel =
    case pChannel of
        X ->
            "x"

        Y ->
            "y"

        X2 ->
            "x2"

        Y2 ->
            "y2"

        Longitude ->
            "longitude"

        Latitude ->
            "latitude"

        Longitude2 ->
            "longitude2"

        Latitude2 ->
            "latitude2"


rangeConfigProperty : RangeConfig -> LabelledSpec
rangeConfigProperty rangeCfg =
    case rangeCfg of
        RCategory name ->
            ( "category", JE.object [ schemeProperty name [] ] )

        RDiverging name ->
            ( "diverging", JE.object [ schemeProperty name [] ] )

        RHeatmap name ->
            ( "heatmap", JE.object [ schemeProperty name [] ] )

        ROrdinal name ->
            ( "ordinal", JE.object [ schemeProperty name [] ] )

        RRamp name ->
            ( "ramp", JE.object [ schemeProperty name [] ] )

        RSymbol name ->
            ( "symbol", JE.object [ schemeProperty name [] ] )


repeatFieldsProperty : RepeatFields -> LabelledSpec
repeatFieldsProperty fields =
    case fields of
        RowFields fields ->
            ( "row", JE.list (List.map JE.string fields) )

        ColumnFields fields ->
            ( "column", JE.list (List.map JE.string fields) )


resolutionLabel : Resolution -> String
resolutionLabel res =
    case res of
        Shared ->
            "shared"

        Independent ->
            "independent"


resolveProperty : Resolve -> LabelledSpec
resolveProperty res =
    case res of
        RAxis chRules ->
            --( "axis", JE.object [ ( channelLabel ch, JE.string (resolutionLabel rule) ) ] )
            ( "axis", JE.object <| List.map (\( ch, rule ) -> ( channelLabel ch, JE.string (resolutionLabel rule) )) chRules )

        RLegend chRules ->
            --( "legend", JE.object [ ( channelLabel ch, JE.string (resolutionLabel rule) ) ] )
            ( "legend", JE.object <| List.map (\( ch, rule ) -> ( channelLabel ch, JE.string (resolutionLabel rule) )) chRules )

        RScale chRules ->
            --( "scale", JE.object [ ( channelLabel ch, JE.string (resolutionLabel rule) ) ] )
            ( "scale", JE.object <| List.map (\( ch, rule ) -> ( channelLabel ch, JE.string (resolutionLabel rule) )) chRules )


scaleConfigProperty : ScaleConfig -> LabelledSpec
scaleConfigProperty scaleCfg =
    case scaleCfg of
        SCBandPaddingInner x ->
            ( "bandPaddingInner", JE.float x )

        SCBandPaddingOuter x ->
            ( "bandPaddingOuter", JE.float x )

        SCClamp b ->
            ( "clamp", JE.bool b )

        SCMaxBandSize x ->
            ( "maxBandSize", JE.float x )

        SCMinBandSize x ->
            ( "minBandSize", JE.float x )

        SCMaxFontSize x ->
            ( "maxFontSize", JE.float x )

        SCMinFontSize x ->
            ( "minFontSize", JE.float x )

        SCMaxOpacity x ->
            ( "maxOpacity", JE.float x )

        SCMinOpacity x ->
            ( "minOpacity", JE.float x )

        SCMaxSize x ->
            ( "maxSize", JE.float x )

        SCMinSize x ->
            ( "minSize", JE.float x )

        SCMaxStrokeWidth x ->
            ( "maxStrokeWidth", JE.float x )

        SCMinStrokeWidth x ->
            ( "minStrokeWidth", JE.float x )

        SCPointPadding x ->
            ( "pointPadding", JE.float x )

        SCRangeStep numOrNull ->
            case numOrNull of
                Just x ->
                    ( "rangeStep", JE.float x )

                Nothing ->
                    ( "rangeStep", JE.null )

        SCRound b ->
            ( "round", JE.bool b )

        SCTextXRangeStep x ->
            ( "textXRangeStep", JE.float x )

        SCUseUnaggregatedDomain b ->
            ( "useUnaggregatedDomain", JE.bool b )


scaleDomainSpec : ScaleDomain -> Spec
scaleDomainSpec sdType =
    case sdType of
        DNumbers nums ->
            JE.list (List.map JE.float nums)

        DDateTimes dts ->
            List.map (\dt -> JE.object (List.map dateTimeProperty dt)) dts |> JE.list

        DStrings cats ->
            JE.list (List.map JE.string cats)

        DSelection selName ->
            JE.object [ ( "selection", JE.string selName ) ]

        Unaggregated ->
            JE.string "unaggregated"


scaleLabel : Scale -> String
scaleLabel scType =
    case scType of
        ScLinear ->
            "linear"

        ScPow ->
            "pow"

        ScSqrt ->
            "sqrt"

        ScLog ->
            "log"

        ScTime ->
            "time"

        ScUtc ->
            "utc"

        ScSequential ->
            "sequential"

        ScOrdinal ->
            "ordinal"

        ScBand ->
            "band"

        ScPoint ->
            "point"

        ScBinLinear ->
            "bin-linear"

        ScBinOrdinal ->
            "bin-ordinal"


scaleNiceSpec : ScaleNice -> Spec
scaleNiceSpec ni =
    case ni of
        NMillisecond ->
            JE.string "millisecond"

        NSecond ->
            JE.string "second"

        NMinute ->
            JE.string "minute"

        NHour ->
            JE.string "hour"

        NDay ->
            JE.string "day"

        NWeek ->
            JE.string "week"

        NMonth ->
            JE.string "month"

        NYear ->
            JE.string "year"

        NInterval tu step ->
            JE.object [ ( "interval", JE.string (timeUnitLabel tu) ), ( "step", JE.int step ) ]

        IsNice b ->
            JE.bool b

        NTickCount n ->
            JE.int n


scaleProperty : ScaleProperty -> LabelledSpec
scaleProperty scaleProp =
    case scaleProp of
        SType sType ->
            ( "type", JE.string (scaleLabel sType) )

        SDomain sdType ->
            ( "domain", scaleDomainSpec sdType )

        SRange range ->
            case range of
                RNumbers xs ->
                    ( "range", JE.list (List.map JE.float xs) )

                RStrings ss ->
                    ( "range", JE.list (List.map JE.string ss) )

                RName s ->
                    ( "range", JE.string s )

        SScheme name extent ->
            schemeProperty name extent

        SPadding x ->
            ( "padding", JE.float x )

        SPaddingInner x ->
            ( "paddingInner", JE.float x )

        SPaddingOuter x ->
            ( "paddingOuter", JE.float x )

        SRangeStep numOrNull ->
            case numOrNull of
                Just x ->
                    ( "rangeStep", JE.float x )

                Nothing ->
                    ( "rangeStep", JE.null )

        SRound b ->
            ( "round", JE.bool b )

        SClamp b ->
            ( "clamp", JE.bool b )

        SInterpolate interp ->
            ( "interpolate", cInterpolateSpec interp )

        SNice ni ->
            ( "nice", scaleNiceSpec ni )

        SZero b ->
            ( "zero", JE.bool b )

        SReverse b ->
            ( "reverse", JE.bool b )


schemeProperty : String -> List Float -> LabelledSpec
schemeProperty name extent =
    case extent of
        [ mn, mx ] ->
            ( "scheme", JE.object [ ( "name", JE.string name ), ( "extent", JE.list [ JE.float mn, JE.float mx ] ) ] )

        _ ->
            ( "scheme", JE.string name )


selectionLabel : Selection -> String
selectionLabel seType =
    case seType of
        Single ->
            "single"

        Multi ->
            "multi"

        Interval ->
            "interval"


selectionMarkProperty : SelectionMarkProperty -> LabelledSpec
selectionMarkProperty markProp =
    case markProp of
        SMFill colour ->
            ( "fill", JE.string colour )

        SMFillOpacity x ->
            ( "fillOpacity", JE.float x )

        SMStroke colour ->
            ( "stroke", JE.string colour )

        SMStrokeOpacity x ->
            ( "strokeOpacity", JE.float x )

        SMStrokeWidth x ->
            ( "strokeWidth", JE.float x )

        SMStrokeDash xs ->
            ( "strokeDash", JE.list (List.map JE.float xs) )

        SMStrokeDashOffset x ->
            ( "strokeDashOffset", JE.float x )


selectionProperty : SelectionProperty -> LabelledSpec
selectionProperty selProp =
    case selProp of
        Fields fNames ->
            ( "fields", JE.list (List.map JE.string fNames) )

        Encodings channels ->
            ( "encodings", JE.list (List.map (JE.string << channelLabel) channels) )

        On e ->
            ( "on", JE.string e )

        Empty ->
            ( "empty", JE.string "none" )

        ResolveSelections resolution ->
            ( "resolve", JE.string (selectionResolutionLabel resolution) )

        SelectionMark markProps ->
            ( "mark", JE.object (List.map selectionMarkProperty markProps) )

        BindScales ->
            ( "bind", JE.string "scales" )

        Bind binds ->
            ( "bind", JE.object (List.map bindingSpec binds) )

        Nearest b ->
            ( "nearest", JE.bool b )

        Toggle expr ->
            ( "toggle", JE.string expr )

        Translate e ->
            if e == "" then
                ( "translate", JE.bool False )
            else
                ( "translate", JE.string e )

        Zoom e ->
            if e == "" then
                ( "zoom", JE.bool False )
            else
                ( "zoom", JE.string e )


selectionResolutionLabel : SelectionResolution -> String
selectionResolutionLabel res =
    case res of
        Global ->
            "global"

        Union ->
            "union"

        Intersection ->
            "intersect"


sideLabel : Side -> String
sideLabel side =
    case side of
        STop ->
            "top"

        SBottom ->
            "bottom"

        SLeft ->
            "left"

        SRight ->
            "right"


sortProperty : SortProperty -> LabelledSpec
sortProperty sp =
    case sp of
        Ascending ->
            ( "order", JE.string "ascending" )

        Descending ->
            ( "order", JE.string "descending" )

        ByField field ->
            ( "field", JE.string field )

        Op op ->
            ( "op", JE.string (operationLabel op) )

        ByRepeat arr ->
            ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] )

        CustomSort dvs ->
            ( "custom", JE.null ) |> Debug.log "Warning: Unexpected custom sorting provided to sortProperty"


stackProperty : StackProperty -> LabelledSpec
stackProperty sp =
    case sp of
        StZero ->
            ( "stack", JE.string "zero" )

        StNormalize ->
            ( "stack", JE.string "normalize" )

        StCenter ->
            ( "stack", JE.string "center" )

        NoStack ->
            ( "stack", JE.null )


symbolLabel : Symbol -> String
symbolLabel sym =
    case sym of
        SymCircle ->
            "circle"

        SymSquare ->
            "square"

        Cross ->
            "cross"

        Diamond ->
            "diamond"

        TriangleUp ->
            "triangle-up"

        TriangleDown ->
            "triangle-down"

        Path svgPath ->
            svgPath


textChannelProperty : TextChannel -> List LabelledSpec
textChannelProperty tDef =
    case tDef of
        TName s ->
            [ ( "field", JE.string s ) ]

        TRepeat arr ->
            [ ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] ) ]

        TmType measure ->
            [ ( "type", JE.string (measurementLabel measure) ) ]

        TBin bps ->
            [ bin bps ]

        TAggregate op ->
            [ ( "aggregate", JE.string (operationLabel op) ) ]

        TTimeUnit tu ->
            [ ( "timeUnit", JE.string (timeUnitLabel tu) ) ]

        TFormat fmt ->
            [ ( "format", JE.string fmt ) ]

        TSelectionCondition selName ifClause elseClause ->
            ( "condition", JE.object (( "selection", booleanOpSpec selName ) :: List.concatMap textChannelProperty ifClause) )
                :: List.concatMap textChannelProperty elseClause

        TDataCondition predicate ifClause elseClause ->
            ( "condition", JE.object (( "test", booleanOpSpec predicate ) :: List.concatMap textChannelProperty ifClause) )
                :: List.concatMap textChannelProperty elseClause


timeUnitLabel : TimeUnit -> String
timeUnitLabel tu =
    case tu of
        Year ->
            "year"

        YearQuarter ->
            "yearquarter"

        YearQuarterMonth ->
            "yearquartermonth"

        YearMonth ->
            "yearmonth"

        YearMonthDate ->
            "yearmonthdate"

        YearMonthDateHours ->
            "yearmonthdatehours"

        YearMonthDateHoursMinutes ->
            "yearmonthdatehoursminutes"

        YearMonthDateHoursMinutesSeconds ->
            "yearmonthdatehoursminutesseconds"

        Quarter ->
            "quarter"

        QuarterMonth ->
            "quartermonth"

        Month ->
            "month"

        MonthDate ->
            "monthdate"

        Date ->
            "date"

        Day ->
            "day"

        Hours ->
            "hours"

        HoursMinutes ->
            "hoursminutes"

        HoursMinutesSeconds ->
            "hoursminutesseconds"

        Minutes ->
            "minutes"

        MinutesSeconds ->
            "minutesseconds"

        Seconds ->
            "seconds"

        SecondsMilliseconds ->
            "secondsmilliseconds"

        Milliseconds ->
            "milliseconds"

        Utc timeUnit ->
            "utc" ++ timeUnitLabel timeUnit


titleConfigSpec : TitleConfig -> LabelledSpec
titleConfigSpec titleCfg =
    case titleCfg of
        TAnchor an ->
            ( "anchor", JE.string (anchorLabel an) )

        TAngle x ->
            ( "angle", JE.float x )

        TBaseline va ->
            ( "baseline", JE.string (vAlignLabel va) )

        TColor clr ->
            ( "color", JE.string clr )

        TFont fnt ->
            ( "font", JE.string fnt )

        TFontSize x ->
            ( "fontSize", JE.float x )

        TFontWeight w ->
            ( "fontWeight", fontWeightSpec w )

        TLimit x ->
            ( "limit", JE.float x )

        TOffset x ->
            ( "offset", JE.float x )

        TOrient sd ->
            ( "orient", JE.string (sideLabel sd) )


vAlignLabel : VAlign -> String
vAlignLabel align =
    case align of
        AlignTop ->
            "top"

        AlignMiddle ->
            "middle"

        AlignBottom ->
            "bottom"


viewConfigProperty : ViewConfig -> LabelledSpec
viewConfigProperty viewCfg =
    case viewCfg of
        ViewWidth x ->
            ( "width", JE.float x )

        ViewHeight x ->
            ( "height", JE.float x )

        Clip b ->
            ( "clip", JE.bool b )

        Fill ms ->
            case ms of
                Just s ->
                    ( "fill", JE.string s )

                Nothing ->
                    ( "fill", JE.string "" )

        FillOpacity x ->
            ( "fillOpacity", JE.float x )

        Stroke ms ->
            case ms of
                Just s ->
                    ( "stroke", JE.string s )

                Nothing ->
                    ( "stroke", JE.string "" )

        StrokeOpacity x ->
            ( "strokeOpacity", JE.float x )

        StrokeWidth x ->
            ( "strokeWidth", JE.float x )

        StrokeDash xs ->
            ( "strokeDash", JE.list (List.map JE.float xs) )

        StrokeDashOffset x ->
            ( "strokeDashOffset", JE.float x )


vlPropertyLabel : VLProperty -> String
vlPropertyLabel spec =
    case spec of
        VLName ->
            "name"

        VLDescription ->
            "description"

        VLTitle ->
            "title"

        VLWidth ->
            "width"

        VLHeight ->
            "height"

        VLPadding ->
            "padding"

        VLAutosize ->
            "autosize"

        VLBackground ->
            "background"

        VLData ->
            "data"

        VLDatasets ->
            "datasets"

        VLProjection ->
            "projection"

        VLMark ->
            "mark"

        VLTransform ->
            "transform"

        VLEncoding ->
            "encoding"

        VLConfig ->
            "config"

        VLSelection ->
            "selection"

        VLHConcat ->
            "hconcat"

        VLVConcat ->
            "vconcat"

        VLLayer ->
            "layer"

        VLRepeat ->
            "repeat"

        VLFacet ->
            "facet"

        VLSpec ->
            "spec"

        VLResolve ->
            "resolve"
