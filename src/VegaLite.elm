module VegaLite
    exposing
        ( APosition(AEnd, AMiddle, AStart)
        , Arrangement(Column, Row)
        , Autosize(AContent, AFit, ANone, APad, APadding, AResize)
        , AxisConfig
        , AxisProperty
        , BinProperty
        , Binding
        , BooleanOp
        , Bounds(Flush, Full)
        , CInterpolate(Hcl, HclLong, Hsl, HslLong, Lab)
        , Channel(ChColor, ChOpacity, ChShape, ChSize, ChX, ChX2, ChY, ChY2)
        , ClipRect(NoClip)
        , CompositionAlignment(CAAll, CAEach, CANone)
        , ConfigurationProperty
        , Cursor(CAlias, CAllScroll, CAuto, CCell, CColResize, CContextMenu, CCopy, CCrosshair, CDefault, CEResize, CEWResize, CGrab, CGrabbing, CHelp, CMove, CNEResize, CNESWResize, CNResize, CNSResize, CNWResize, CNWSEResize, CNoDrop, CNone, CNotAllowed, CPointer, CProgress, CRowResize, CSEResize, CSResize, CSWResize, CText, CVerticalText, CWResize, CWait, CZoomIn, CZoomOut)
        , Data
        , DataColumn
        , DataRow
        , DataType(FoBoolean, FoNumber)
        , DataValue
        , DataValues
        , DateTime
        , DayName(Fri, Mon, Sat, Sun, Thu, Tue, Wed)
        , DetailChannel
        , FacetChannel
        , FacetMapping
        , FieldTitleProperty(Function, Plain, Verbal)
        , Filter
        , FilterRange
        , FontWeight(Bold, Bolder, Lighter, Normal, W100, W200, W300, W400, W500, W600, W700, W800, W900)
        , Format(CSV, TSV)
        , Geometry
        , HAlign(AlignCenter, AlignLeft, AlignRight)
        , HeaderProperty
        , HyperlinkChannel
        , InputProperty
        , LabelledSpec
        , Legend(Gradient, Symbol)
        , LegendConfig
        , LegendOrientation(BottomLeft, BottomRight, Left, None, Right, TopLeft, TopRight)
        , LegendProperty
        , LegendValues
        , LineMarker(LMNone)
        , Mark
        , MarkChannel
        , MarkInterpolation(Basis, BasisClosed, BasisOpen, Bundle, Cardinal, CardinalClosed, CardinalOpen, Linear, LinearClosed, Monotone, StepAfter, StepBefore, Stepwise)
        , MarkOrientation(Horizontal, Vertical)
        , MarkProperty
        , Measurement(GeoFeature, Nominal, Ordinal, Quantitative, Temporal)
        , MonthName(Apr, Aug, Dec, Feb, Jan, Jul, Jun, Mar, May, Nov, Oct, Sep)
        , Operation(ArgMax, ArgMin, Average, CI0, CI1, Count, Distinct, Max, Mean, Median, Min, Missing, Q1, Q3, Stderr, Stdev, StdevP, Sum, Valid, Variance, VarianceP)
        , OrderChannel
        , OverlapStrategy(OGreedy, ONone, OParity)
        , Padding
        , PointMarker(PMNone, PMTransparent)
        , Position(Latitude, Latitude2, Longitude, Longitude2, X, X2, Y, Y2)
        , PositionChannel
        , Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
        , ProjectionProperty
        , RangeConfig
        , RepeatFields
        , Resolution(Independent, Shared)
        , Resolve
        , Scale(ScBand, ScBinLinear, ScBinOrdinal, ScLinear, ScLog, ScOrdinal, ScPoint, ScPow, ScSequential, ScSqrt, ScTime, ScUtc)
        , ScaleConfig
        , ScaleDomain(Unaggregated)
        , ScaleNice(NDay, NFalse, NHour, NMillisecond, NMinute, NMonth, NSecond, NTrue, NWeek, NYear)
        , ScaleProperty
        , ScaleRange
        , Selection(Interval, Multi, Single)
        , SelectionMarkProperty
        , SelectionProperty(BindScales, Empty)
        , SelectionResolution(Global, Intersection, Union)
        , Side(SBottom, SLeft, SRight, STop)
        , SortProperty(Ascending, Descending)
        , Spec
        , StackProperty(NoStack, StCenter, StNormalize, StZero)
        , StrokeCap(CButt, CRound, CSquare)
        , StrokeJoin(JBevel, JMiter, JRound)
        , SummaryExtent(ExCI, ExIqr, ExRange, ExStderr, ExStdev)
        , Symbol(Cross, Diamond, SymCircle, SymSquare, TriangleDown, TriangleUp)
        , TextChannel
        , TimeUnit(Date, Day, Hours, HoursMinutes, HoursMinutesSeconds, Milliseconds, Minutes, MinutesSeconds, Month, MonthDate, Quarter, QuarterMonth, Seconds, SecondsMilliseconds, Year, YearMonth, YearMonthDate, YearMonthDateHours, YearMonthDateHoursMinutes, YearMonthDateHoursMinutesSeconds, YearQuarter, YearQuarterMonth)
        , TitleConfig
        , VAlign(AlignBottom, AlignMiddle, AlignTop)
        , VLProperty
        , ViewConfig
        , Window
        , WindowOperation(CumeDist, DenseRank, FirstValue, Lag, LastValue, Lead, NthValue, Ntile, PercentRank, Rank, RowNumber)
        , WindowProperty
        , WindowSortField
        , aggregate
        , align
        , alignRC
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
        , axcoBandPosition
        , axcoDomain
        , axcoDomainColor
        , axcoDomainWidth
        , axcoGrid
        , axcoGridColor
        , axcoGridDash
        , axcoGridOpacity
        , axcoGridWidth
        , axcoLabelAngle
        , axcoLabelColor
        , axcoLabelFont
        , axcoLabelFontSize
        , axcoLabelLimit
        , axcoLabelOverlap
        , axcoLabelPadding
        , axcoLabels
        , axcoMaxExtent
        , axcoMinExtent
        , axcoShortTimeLabels
        , axcoTickColor
        , axcoTickRound
        , axcoTickSize
        , axcoTickWidth
        , axcoTicks
        , axcoTitleAlign
        , axcoTitleAngle
        , axcoTitleBaseline
        , axcoTitleColor
        , axcoTitleFont
        , axcoTitleFontSize
        , axcoTitleFontWeight
        , axcoTitleLimit
        , axcoTitleMaxLength
        , axcoTitlePadding
        , axcoTitleX
        , axcoTitleY
        , background
        , bar
        , biBase
        , biDivide
        , biExtent
        , biMaxBins
        , biMinStep
        , biNice
        , biStep
        , biSteps
        , binAs
        , boo
        , boos
        , bounds
        , boxplot
        , calculateAs
        , categoricalDomainMap
        , center
        , centerRC
        , circle
        , clipRect
        , coArea
        , coAutosize
        , coAxis
        , coAxisBand
        , coAxisBottom
        , coAxisLeft
        , coAxisRight
        , coAxisTop
        , coAxisX
        , coAxisY
        , coBackground
        , coBar
        , coCircle
        , coCountTitle
        , coFieldTitle
        , coGeoshape
        , coLegend
        , coLine
        , coMark
        , coNamedStyle
        , coNumberFormat
        , coPadding
        , coPoint
        , coProjection
        , coRange
        , coRect
        , coRemoveInvalid
        , coRule
        , coScale
        , coSelection
        , coSquare
        , coStack
        , coText
        , coTick
        , coTimeFormat
        , coTitle
        , coTrail
        , coView
        , color
        , column
        , columnBy
        , columnFields
        , combineSpecs
        , configuration
        , configure
        , cubeHelix
        , cubeHelixLong
        , customProjection
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
        , dataName
        , dataRow
        , datasets
        , description
        , detail
        , doDts
        , doNums
        , doSelection
        , doStrs
        , domainRangeMap
        , dsv
        , dt
        , dtDate
        , dtDay
        , dtHour
        , dtMillisecond
        , dtMinute
        , dtMonth
        , dtQuarter
        , dtRange
        , dtSecond
        , dtYear
        , dts
        , encoding
        , errorband
        , errorbar
        , expr
        , fAggregate
        , fBin
        , fHeader
        , fMType
        , fName
        , fTimeUnit
        , facet
        , false
        , fiCompose
        , fiEqual
        , fiExpr
        , fiGreaterThan
        , fiGreaterThanEq
        , fiLessThan
        , fiLessThanEq
        , fiOneOf
        , fiRange
        , fiSelection
        , fill
        , filter
        , flatten
        , flattenAs
        , foDate
        , foUtc
        , geoFeatureCollection
        , geoLine
        , geoLines
        , geoPoint
        , geoPoints
        , geoPolygon
        , geoPolygons
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
        , hStr
        , hTimeUnit
        , hdFormat
        , hdLabelAngle
        , hdLabelColor
        , hdLabelFont
        , hdLabelFontSize
        , hdLabelLimit
        , hdTitle
        , hdTitleAnchor
        , hdTitleAngle
        , hdTitleBaseline
        , hdTitleColor
        , hdTitleFont
        , hdTitleFontSize
        , hdTitleFontWeight
        , hdTitleLimit
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
        , inDebounce
        , inElement
        , inMax
        , inMin
        , inName
        , inOptions
        , inPlaceholder
        , inStep
        , iqrScale
        , jsonProperty
        , layer
        , leDts
          --, leEntryPadding -- Removed as of Vega 4 as it is no longer a Vega property
        , leFormat
        , leNums
        , leOffset
        , leOrient
        , lePadding
        , leStrs
        , leTickCount
        , leTitle
        , leType
        , leValues
        , leZIndex
        , lecoCornerRadius
        , lecoEntryPadding
        , lecoFillColor
        , lecoGradientHeight
        , lecoGradientLabelBaseline
        , lecoGradientLabelLimit
        , lecoGradientLabelOffset
        , lecoGradientStrokeColor
        , lecoGradientStrokeWidth
        , lecoGradientWidth
        , lecoLabelAlign
        , lecoLabelBaseline
        , lecoLabelColor
        , lecoLabelFont
        , lecoLabelFontSize
        , lecoLabelLimit
        , lecoLabelOffset
        , lecoOffset
        , lecoOrient
        , lecoPadding
        , lecoShortTimeLabels
        , lecoStrokeColor
        , lecoStrokeDash
        , lecoStrokeWidth
        , lecoSymbolColor
        , lecoSymbolSize
        , lecoSymbolStrokeWidth
        , lecoSymbolType
        , lecoTitleAlign
        , lecoTitleBaseline
        , lecoTitleColor
        , lecoTitleFont
        , lecoTitleFontSize
        , lecoTitleFontWeight
        , lecoTitleLimit
        , lecoTitlePadding
        , line
        , lmMarker
        , lookup
        , lookupAs
        , mAggregate
        , mBin
        , mBoo
        , mDataCondition
        , mLegend
        , mMType
        , mName
        , mNum
        , mPath
        , mRepeat
        , mScale
        , mSelectionCondition
        , mStr
        , mTimeUnit
        , mTitle
        , maAlign
        , maAngle
        , maBandSize
        , maBaseline
        , maBinSpacing
        , maBorders
        , maClip
        , maColor
        , maContinuousBandSize
        , maCursor
        , maDiscreteBandSize
        , maDx
        , maDy
        , maExtent
        , maFill
        , maFillOpacity
        , maFilled
        , maFont
        , maFontSize
        , maFontStyle
        , maFontWeight
        , maHRef
        , maInterpolate
        , maLine
        , maOpacity
        , maOrient
        , maPoint
        , maRadius
        , maRule
        , maShape
        , maShortTimeLabels
        , maSize
        , maStroke
        , maStrokeCap
        , maStrokeDash
        , maStrokeDashOffset
        , maStrokeJoin
        , maStrokeMiterLimit
        , maStrokeOpacity
        , maStrokeWidth
        , maStyle
        , maTension
        , maText
        , maTheta
        , maThickness
        , maTicks
        , maX2Offset
        , maXOffset
        , maY2Offset
        , maYOffset
        , name
        , not
        , num
        , numRange
        , nums
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
        , pHeight
        , pMType
        , pName
        , pRepeat
        , pScale
        , pSort
        , pStack
        , pTimeUnit
        , pTitle
        , pWidth
        , paEdges
        , paSize
        , padding
        , parse
        , pmMarker
        , point
        , position
        , prCenter
        , prClipAngle
        , prClipExtent
        , prCoefficient
        , prDistance
        , prFraction
        , prLobes
        , prParallel
        , prPrecision
        , prRadius
        , prRatio
        , prRotate
        , prSpacing
        , prTilt
        , prType
        , projection
        , raName
        , raNums
        , raStrs
        , racoCategory
        , racoDiverging
        , racoHeatmap
        , racoOrdinal
        , racoRamp
        , racoSymbol
        , reAxis
        , reLegend
        , reScale
        , rect
        , repeat
        , resolution
        , resolve
        , rgb
        , row
        , rowBy
        , rowFields
        , rule
        , sacoBandPaddingInner
        , sacoBandPaddingOuter
        , sacoClamp
        , sacoMaxBandSize
        , sacoMaxFontSize
        , sacoMaxOpacity
        , sacoMaxSize
        , sacoMaxStrokeWidth
        , sacoMinBandSize
        , sacoMinFontSize
        , sacoMinOpacity
        , sacoMinSize
        , sacoMinStrokeWidth
        , sacoPointPadding
        , sacoRangeStep
        , sacoRound
        , sacoTextXRangeStep
        , sacoUseUnaggregatedDomain
        , scClamp
        , scDomain
        , scInterpolate
        , scNice
        , scNiceInterval
        , scNiceTickCount
        , scPadding
        , scPaddingInner
        , scPaddingOuter
        , scRange
        , scRangeStep
        , scReverse
        , scRound
        , scScheme
        , scType
        , scZero
        , seBind
        , seEncodings
        , seFields
        , seNearest
        , seOn
        , seResolve
        , seSelectionMark
        , seToggle
        , seTranslate
        , seZoom
        , select
        , selected
        , selection
        , selectionName
        , shape
        , size
        , smFill
        , smFillOpacity
        , smStroke
        , smStrokeDash
        , smStrokeDashOffset
        , smStrokeOpacity
        , smStrokeWidth
        , soByField
        , soByRepeat
        , soCustom
        , spacing
        , spacingRC
        , specification
        , square
        , str
        , stroke
        , strs
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
        , tTitle
        , text
        , textMark
        , tick
        , ticoAnchor
        , ticoAngle
        , ticoBaseline
        , ticoColor
        , ticoFont
        , ticoFontSize
        , ticoFontWeight
        , ticoLimit
        , ticoOffset
        , ticoOrient
        , timeUnitAs
        , title
        , toVegaLite
        , tooltip
        , tooltips
        , topojsonFeature
        , topojsonMesh
        , trail
        , transform
        , true
        , utc
        , vConcat
        , vicoClip
        , vicoFill
        , vicoFillOpacity
        , vicoHeight
        , vicoStroke
        , vicoStrokeDash
        , vicoStrokeDashOffset
        , vicoStrokeOpacity
        , vicoStrokeWidth
        , vicoWidth
        , wiAggregateOp
        , wiAscending
        , wiDescending
        , wiField
        , wiFrame
        , wiGroupBy
        , wiIgnorePeers
        , wiOp
        , wiParam
        , wiSort
        , width
        , windowAs
        )

{-| Create Vega-Lite specifications in Elm. A specification can be sent to a
Vega-Lite compiler to generate the graphics. While this a pure Elm library, to
generate the graphical output you probably want to send the JSON generated by
`toVegaLite` via a port to some JavaScript that invokes the Vega-Lite runtime.


# Creating A Vega-Lite Specification

@docs toVegaLite
@docs VLProperty
@docs Spec
@docs LabelledSpec
@docs combineSpecs


# Creating the Data Specification

Functions and types for declaring the data to the visualized. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format).

@docs dataFromUrl
@docs dataFromColumns
@docs dataFromRows
@docs dataFromJson
@docs dataFromSource
@docs dataName
@docs datasets
@docs dataColumn
@docs dataRow
@docs Data
@docs DataColumn
@docs DataRow


## Geographic Data

@docs geometry
@docs geoFeatureCollection
@docs geometryCollection
@docs geoPoint
@docs geoPoints
@docs geoLine
@docs geoLines
@docs geoPolygon
@docs geoPolygons
@docs DataType


## Formating Input Data

See the Vega-Lite
[format](https://vega.github.io/vega-lite/docs/data.html#format),
[JSON](https://vega.github.io/vega-lite/docs/data.html#json) documentation.

@docs Format
@docs jsonProperty
@docs topojsonFeature
@docs topojsonMesh
@docs parse
@docs dsv

@docs foDate
@docs foUtc


# Creating the Transform Specification

Transformation rules are applied to data fields or geospatial coordinates before
they are encoded visually.

@docs transform


## Map Projections

See the
[Vega-Lite map projection documentation](https://vega.github.io/vega-lite/docs/projection.html).

@docs projection

@docs prType
@docs prClipAngle
@docs prClipExtent
@docs prCenter
@docs prRotate
@docs prPrecision
@docs prCoefficient
@docs prDistance
@docs prFraction
@docs prLobes
@docs prParallel
@docs prRadius
@docs prRatio
@docs prSpacing
@docs prTilt

@docs Projection
@docs customProjection
@docs ClipRect
@docs clipRect


## Aggregation

See the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html).

@docs aggregate
@docs Operation
@docs opAs
@docs timeUnitAs


## Binning

See the [Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html).

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

See
[Vega-Lite calculate documentation](https://vega.github.io/vega-lite/docs/calculate.html).

@docs calculateAs


## Filtering

See the
[Vega-Lite filter documentation](https://vega.github.io/vega-lite/docs/filter.html).

@docs filter

@docs fiEqual
@docs fiLessThan
@docs fiLessThanEq
@docs fiGreaterThan
@docs fiGreaterThanEq
@docs fiExpr
@docs fiCompose
@docs fiSelection
@docs fiOneOf
@docs fiRange
@docs numRange
@docs dtRange


## Flattening

See the [Vega-Lite flatten documentation](https://vega.github.io/vega-lite/docs/flatten.html).

@docs flatten
@docs flattenAs


## Relational Joining (lookup)

See the [Vega-Lite lookup documentation](https://vega.github.io/vega-lite/docs/lookup.html)
for further details.

@docs lookup
@docs lookupAs


## Window Transformations

See the Vega-Lite
[window transform field](https://vega.github.io/vega-lite/docs/window.html#field-def)
and [window transform](https://vega.github.io/vega-lite/docs/window.html#window-transform-definition)
documentation.

@docs windowAs
@docs wiAggregateOp
@docs wiOp
@docs WindowOperation
@docs wiParam
@docs wiField

@docs wiFrame
@docs wiIgnorePeers
@docs wiGroupBy
@docs wiSort
@docs wiAscending
@docs wiDescending


# Creating the Mark Specification

Functions for declaring the type of visual marks used in the visualization.

@docs area
@docs bar
@docs boxplot
@docs errorband
@docs errorbar
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


## Mark Properties

See the Vega-Lite
[general mark](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties),
[area mark](https://vega.github.io/vega-lite/docs/area.html#properties),
[bar mark](https://vega.github.io/vega-lite/docs/bar.html),
[hyperlink mark](https://vega.github.io/vega-lite/docs/mark.html#hyperlink),
[line mark](https://vega.github.io/vega-lite/docs/line.html#properties),
[point mark](https://vega.github.io/vega-lite/docs/point.html#properties),
[text mark](https://vega.github.io/vega-lite/docs/text.html) and
[tick mark](https://vega.github.io/vega-lite/docs/tick.html#config)
property documentation.

@docs maAlign
@docs maAngle
@docs maBandSize
@docs maBaseline
@docs maBinSpacing
@docs maBorders
@docs maClip
@docs maColor
@docs maCursor
@docs maExtent
@docs maHRef
@docs maContinuousBandSize
@docs maDiscreteBandSize
@docs maDx
@docs maDy
@docs maFill
@docs maFilled
@docs maFillOpacity
@docs maFont
@docs maFontSize
@docs maFontStyle
@docs maFontWeight
@docs maInterpolate
@docs maOpacity
@docs maOrient
@docs maPoint
@docs maLine
@docs maRadius
@docs maRule
@docs maShape
@docs maShortTimeLabels
@docs maSize
@docs maStroke
@docs maStrokeCap
@docs StrokeCap
@docs maStrokeDash
@docs maStrokeDashOffset
@docs maStrokeJoin
@docs StrokeJoin
@docs maStrokeMiterLimit
@docs maStrokeOpacity
@docs maStrokeWidth
@docs maStyle
@docs maTension
@docs maText
@docs maTheta
@docs maThickness
@docs maTicks
@docs maXOffset
@docs maYOffset
@docs maX2Offset
@docs maY2Offset


### Used by Mark Properties

@docs MarkOrientation
@docs MarkInterpolation
@docs Symbol
@docs symbolPath
@docs Cursor
@docs PointMarker
@docs pmMarker
@docs LineMarker
@docs lmMarker
@docs SummaryExtent
@docs iqrScale


# Creating the Encoding Specification

Types and functions for declaring which data fields (data) are mapped to which channels
(position, color etc.).

@docs encoding
@docs Measurement


## Position channel

Relates to where something appears in the visualization.
See the
[Vega-Lite position documentation](https://vega.github.io/vega-lite/docs/encoding.html#position)

@docs position
@docs Position


### Position Channel Properties

@docs pName
@docs pRepeat
@docs pMType
@docs pBin
@docs pTimeUnit
@docs pTitle
@docs pAggregate
@docs pScale
@docs pAxis
@docs pSort
@docs pStack
@docs pWidth
@docs pHeight


## Properties Used by Position Channels


## Sorting Properties

See the
[Vega-Lite sort documentation](https://vega.github.io/vega-lite/docs/sort.html).

@docs SortProperty
@docs soByField
@docs soByRepeat
@docs soCustom


## Stacking Properties

@docs StackProperty


## Axis Properties

See the
[Vega-Lite axis property documentation](https://vega.github.io/vega-lite/docs/axis.html#axis-properties)

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
@docs mTitle
@docs mAggregate
@docs mLegend
@docs mPath
@docs mNum
@docs mStr
@docs mBoo


### Mark Legends

See the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).

@docs leFormat
@docs leOffset
@docs leOrient
@docs lePadding
@docs leTickCount
@docs leTitle
@docs leType
@docs leValues
@docs leZIndex
@docs Legend
@docs LegendOrientation
@docs leNums
@docs leStrs
@docs leDts


## Text Channels

Relate to the appearance of the text and tooltip elements of the visualization.
See the
[Vega-Lite text documentation](https://vega.github.io/vega-lite/docs/encoding.html#text)

@docs text
@docs tooltip
@docs tooltips
@docs tName
@docs tRepeat
@docs tMType
@docs tBin
@docs tAggregate
@docs tTimeUnit
@docs tTitle
@docs tFormat
@docs FontWeight


## Hyperlink Channel

Relates to a clickable URL destination of a mark. Unlike most other channels, the
hyperlink channel has no direct visual expression other than the option of changing
the cursor style when hovering, so an encoding will usually pair hyperlinks with
other visual channels such as marks or texts. See the
[Vega-Lite hyperlink documentation](https://vega.github.io/vega-lite/docs/encoding.html#href)

@docs hyperlink
@docs hName
@docs hRepeat
@docs hMType
@docs hBin
@docs hAggregate
@docs hTimeUnit
@docs hStr


## Order channels

Channels that relate to the order of data fields such as for sorting stacking order
or order of data points in a connected scatterplot. See the
[Vega-Lite order documentation](https://vega.github.io/vega-lite/docs/encoding.html#order).

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
[Vega-Lite facet documentation](https://vega.github.io/vega-lite/docs/encoding.html#facet).
See also, 'faceted view composition' for a more flexible (but more verbose) way
of defining faceted views.

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

Used to specify how the encoding of a data field should be applied. See the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html).

@docs scType
@docs scDomain
@docs scRange
@docs scScheme
@docs scPadding
@docs scPaddingInner
@docs scPaddingOuter
@docs scRangeStep
@docs scRound
@docs scClamp
@docs scInterpolate
@docs scNice
@docs scZero
@docs scReverse

@docs Scale
@docs raName
@docs raNums
@docs raStrs
@docs categoricalDomainMap
@docs domainRangeMap
@docs ScaleDomain
@docs doNums
@docs doStrs
@docs doDts
@docs doSelection

@docs ScaleNice
@docs scNiceTickCount
@docs scNiceInterval


### Color Scaling

@docs CInterpolate
@docs cubeHelix
@docs cubeHelixLong
@docs rgb


# Creating view compositions

Views can be combined to create more complex multiview displays. This may involve
layering views on top of each other (superposition) or laying them out in adjacent
spaces (juxtaposition using `repeat`, `facet`, `hConcat` or `vConcat`). Where different
views have potentially conflicting channels (e.g. two position scales in a layered
visualization) the rules for resolving them can be defined with `resolve`.
See the
[Vega-Lite composition documentation](https://vega.github.io/vega-lite/docs/composition.html)

@docs layer
@docs hConcat
@docs vConcat
@docs resolve
@docs resolution
@docs align
@docs alignRC
@docs CompositionAlignment
@docs bounds
@docs Bounds
@docs spacing
@docs spacingRC
@docs center
@docs centerRC

@docs reAxis
@docs reLegend
@docs reScale
@docs Channel
@docs Resolution


## Faceted views

These are small multiples each of which show subsets of the same dataset. The specification
determines which field should be used to determine subsets along with their spatial
arrangement (in rows or columns). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html)

@docs repeat
@docs rowFields
@docs columnFields
@docs facet
@docs columnBy
@docs rowBy

@docs fName
@docs fMType
@docs fAggregate
@docs fBin
@docs fHeader
@docs fTimeUnit

@docs asSpec
@docs specification
@docs Arrangement


### Facet Headers

See
[Vega-Lite header documentation](https://vega.github.io/vega-lite/docs/header.html)

@docs hdLabelAngle
@docs hdLabelColor
@docs hdLabelFont
@docs hdLabelFontSize
@docs hdLabelLimit

@docs hdTitle
@docs hdTitleAnchor
@docs hdTitleAngle
@docs hdTitleBaseline
@docs hdTitleColor
@docs hdTitleFont
@docs hdTitleFontWeight
@docs hdTitleFontSize
@docs hdTitleLimit

@docs hdFormat


# Creating Selections for Interaction

Selections allow a visualization to respond to interactions (such as clicking or
dragging). They transform interactions into data queries. See the Vega-Lite
[selection](https://vega.github.io/vega-lite/docs/selection.html) and
[bind](https://vega.github.io/vega-lite/docs/bind.html)
documentation.

@docs selection
@docs select
@docs Selection
@docs SelectionProperty
@docs seBind
@docs seEncodings
@docs seFields
@docs seNearest
@docs seOn
@docs seResolve
@docs seSelectionMark
@docs seToggle
@docs seTranslate
@docs seZoom

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

@docs inDebounce
@docs inElement
@docs inOptions
@docs inMin
@docs inMax
@docs inName
@docs inStep
@docs inPlaceholder

@docs SelectionResolution

@docs smFill
@docs smFillOpacity
@docs smStroke
@docs smStrokeDash
@docs smStrokeDashOffset
@docs smStrokeOpacity
@docs smStrokeWidth


## Making conditional channel encodings

To make channel encoding conditional on the result of some interaction, use
[mSelectionCondition](#mSelectionCondition) (and its 't' and 'h' variants). Similarly
[mDataCondition](#mDataCondition) (and its 't' and 'h' variants) will encode a mark
conditionally depending on some data properties such as whether a datum is null
or an outlier.

For interaction, once a selection has been defined and named, supplying a set of
encodings allow mark encodings to become dependent on that selection.
`mSelectionCondition` is followed firstly a (Boolean) selection and then an
encoding if that selection is true and another encoding to be applied if it is false.
The color specification below states "whenever data marks are selected with an
interval mouse drag, encode the cylinder field with an ordinal color scheme,
otherwise make them grey":

    sel =
        selection << select "myBrush" Interval []

    enc =
        encoding
            << position X [ pName "Horsepower", pMType Quantitative ]
            << position Y [ pName "Miles_per_Gallon", pMType Quantitative ]
            << color
                [ mSelectionCondition (selectionName "myBrush")
                    [ mName "Cylinders", mMType Ordinal ]
                    [ mStr "grey" ]
                ]

In a similar way, `mDataCondition` will encocode a mark depending on whether any
predicate tests are satisfied. Unlike slections, multiple conditions and associated
encodings can be specified. Each test condition is evaluated in order and only on
failure of the test does encoding procede to the next test. If no tests are true,
the encoding in the final parameter is applied in a similar way to 'case of'
expressions:

    enc =
        encoding
            << position X [ pName "value", pMType Ordinal ]
            << color
                [ mDataCondition
                    [ ( expr "datum.value < 40", [ mStr "blue" ] )
                    , ( expr "datum.value < 50", [ mStr "red" ] )
                    , ( expr "datum.value < 60", [ mStr "yellow" ] )
                    ]
                    [ mStr "black" ]
                ]

See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/condition.html).

@docs mSelectionCondition
@docs mDataCondition
@docs tSelectionCondition
@docs tDataCondition
@docs hDataCondition
@docs hSelectionCondition

@docs and
@docs or
@docs not
@docs expr
@docs selected
@docs selectionName


# Global Configuration

Configuration options that affect the entire visualization. These are in addition
to the data and transform options described above. See the
[Vega-Lite top level spec documentation](https://vega.github.io/vega-lite/docs/spec.html#top-level-specifications)

@docs name
@docs title
@docs description
@docs height
@docs width
@docs padding
@docs paSize
@docs paEdges
@docs autosize
@docs Autosize
@docs background


## Style Setting

Allows default properties for most marks and guides to be set. See the
[Vega-Lite configuration documentation](https://vega.github.io/vega-lite/docs/config.html).

@docs configure
@docs configuration

@docs coArea
@docs coAutosize
@docs coAxis
@docs coAxisX
@docs coAxisY
@docs coAxisLeft
@docs coAxisRight
@docs coAxisTop
@docs coAxisBottom
@docs coAxisBand
@docs coBackground
@docs coBar
@docs coCircle
@docs coCountTitle
@docs coFieldTitle
@docs coGeoshape
@docs coLegend
@docs coLine
@docs coMark
@docs coNamedStyle
@docs coNumberFormat
@docs coPadding
@docs coPoint
@docs coProjection
@docs coRange
@docs coRect
@docs coRemoveInvalid
@docs coRule
@docs coScale
@docs coSelection
@docs coSquare
@docs coStack
@docs coText
@docs coTick
@docs coTitle
@docs coTimeFormat
@docs coTrail
@docs coView


## Axis Configuration Options

See the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).

@docs axcoBandPosition
@docs axcoDomain
@docs axcoDomainColor
@docs axcoDomainWidth
@docs axcoMaxExtent
@docs axcoMinExtent
@docs axcoGrid
@docs axcoGridColor
@docs axcoGridDash
@docs axcoGridOpacity
@docs axcoGridWidth
@docs axcoLabels
@docs axcoLabelAngle
@docs axcoLabelColor
@docs axcoLabelFont
@docs axcoLabelFontSize
@docs axcoLabelLimit
@docs axcoLabelOverlap
@docs axcoLabelPadding
@docs axcoShortTimeLabels
@docs axcoTicks
@docs axcoTickColor
@docs axcoTickRound
@docs axcoTickSize
@docs axcoTickWidth
@docs axcoTitleAlign
@docs axcoTitleAngle
@docs axcoTitleBaseline
@docs axcoTitleColor
@docs axcoTitleFont
@docs axcoTitleFontWeight
@docs axcoTitleFontSize
@docs axcoTitleLimit
@docs axcoTitleMaxLength
@docs axcoTitlePadding
@docs axcoTitleX
@docs axcoTitleY


## Legend Configuration Options

See the
[Vega-Lite legend configuration documentation](https://vega.github.io/vega-lite/docs/legend.html#config).

@docs lecoCornerRadius
@docs lecoFillColor
@docs lecoOrient
@docs lecoOffset
@docs lecoStrokeColor
@docs lecoStrokeDash
@docs lecoStrokeWidth
@docs lecoPadding
@docs lecoGradientLabelBaseline
@docs lecoGradientLabelLimit
@docs lecoGradientLabelOffset
@docs lecoGradientStrokeColor
@docs lecoGradientStrokeWidth
@docs lecoGradientHeight
@docs lecoGradientWidth
@docs lecoLabelAlign
@docs lecoLabelBaseline
@docs lecoLabelColor
@docs lecoLabelFont
@docs lecoLabelFontSize
@docs lecoLabelLimit
@docs lecoLabelOffset
@docs lecoShortTimeLabels
@docs lecoEntryPadding
@docs lecoSymbolColor
@docs lecoSymbolType
@docs lecoSymbolSize
@docs lecoSymbolStrokeWidth
@docs lecoTitleAlign
@docs lecoTitleBaseline
@docs lecoTitleColor
@docs lecoTitleFont
@docs lecoTitleFontSize
@docs lecoTitleFontWeight
@docs lecoTitleLimit
@docs lecoTitlePadding


## Scale Configuration Options

See the
[Vega-Lite scale configuration documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)

@docs sacoBandPaddingInner
@docs sacoBandPaddingOuter
@docs sacoClamp
@docs sacoMaxBandSize
@docs sacoMinBandSize
@docs sacoMaxFontSize
@docs sacoMinFontSize
@docs sacoMaxOpacity
@docs sacoMinOpacity
@docs sacoMaxSize
@docs sacoMinSize
@docs sacoMaxStrokeWidth
@docs sacoMinStrokeWidth
@docs sacoPointPadding
@docs sacoRangeStep
@docs sacoRound
@docs sacoTextXRangeStep
@docs sacoUseUnaggregatedDomain


## Scale Range Configuration Options

See the
[Vega-Lite scheme configuration documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).

@docs racoCategory
@docs racoDiverging
@docs racoHeatmap
@docs racoOrdinal
@docs racoRamp
@docs racoSymbol


## Title Configuration Options

See the
[Vega-Lite title configuration documentation](https://vega.github.io/vega-lite/docs/title.html#config)

@docs ticoAnchor
@docs ticoAngle
@docs ticoBaseline
@docs ticoColor
@docs ticoFont
@docs ticoFontSize
@docs ticoFontWeight
@docs ticoLimit
@docs ticoOffset
@docs ticoOrient


## View Configuration Options

See the
[Vega-Lite view configuration documentation](https://vega.github.io/vega-lite/docs/spec.html#config)

@docs vicoWidth
@docs vicoHeight
@docs vicoClip
@docs vicoFill
@docs vicoFillOpacity
@docs vicoStroke
@docs vicoStrokeOpacity
@docs vicoStrokeWidth
@docs vicoStrokeDash
@docs vicoStrokeDashOffset

@docs APosition

@docs FieldTitleProperty


# General Data functions

In addition to more general data types like integers and string, the following types
can carry data used in specifications.

@docs boo
@docs true
@docs false
@docs dt
@docs num
@docs str
@docs boos
@docs dts
@docs nums
@docs strs


## Temporal Data

@docs dtYear
@docs dtQuarter
@docs dtMonth
@docs dtDate
@docs dtDay
@docs dtHour
@docs dtMinute
@docs dtSecond
@docs dtMillisecond
@docs MonthName
@docs DayName

@docs TimeUnit
@docs utc

---


# Type Reference

Types that are not specified directly, porovided here for reference with links
to the functions that generate them.

@docs PositionChannel
@docs MarkChannel
@docs DetailChannel
@docs FacetChannel
@docs HyperlinkChannel
@docs OrderChannel
@docs TextChannel

@docs Mark
@docs MarkProperty

@docs BooleanOp
@docs Binding

@docs AxisProperty
@docs AxisConfig
@docs BinProperty
@docs ConfigurationProperty
@docs InputProperty
@docs HeaderProperty
@docs LegendConfig
@docs LegendProperty
@docs LegendValues
@docs ProjectionProperty
@docs ScaleProperty
@docs ScaleConfig
@docs RangeConfig
@docs SelectionMarkProperty
@docs TitleConfig
@docs ViewConfig

@docs DataValue
@docs DataValues
@docs DateTime
@docs Geometry

@docs FacetMapping
@docs RepeatFields
@docs Filter
@docs FilterRange

@docs Resolve

@docs Padding
@docs ScaleRange

@docs Window
@docs WindowProperty
@docs WindowSortField

-}

import Json.Decode as JD
import Json.Encode as JE


{-| Specify the alignment to apply to grid rows and columns generated by a composition
operator. This version sets the same alignment for rows and columns.
-}
align : CompositionAlignment -> ( VLProperty, Spec )
align algn =
    ( VLAlign, compositionAlignmentSpec algn )


{-| Similar to [align](#align) but with independent alignments for rows (first
parameter) and columns (second parameter).
-}
alignRC : CompositionAlignment -> CompositionAlignment -> ( VLProperty, Spec )
alignRC alRow alCol =
    ( VLSpacing, JE.object [ ( "row", compositionAlignmentSpec alRow ), ( "col", compositionAlignmentSpec alCol ) ] )


{-| Row or column arrangment in a repeated/faceted view.
-}
type Arrangement
    = Column
    | Row


{-| The auto-sizing characteristics of a visualization such as amount of padding,
whether it should fill the parent container etc.
-}
type Autosize
    = AContent
    | AFit
    | ANone
    | APad
    | APadding
    | AResize


{-| Generated by [axcoBandPosition](#axcoBandPosition),
[axcoDomain](#axcoDomain), [axcoDomainColor](#axcoDomainColor), [axcoDomainWidth](#axcoDomainWidth),
[axcoMaxExtent](#axcoMaxExtent), [axcoMinExtent](#axcoMinExtent), [axcoGrid](#axcoGrid),
[axcoGridColor](#axcoGridColor), [axcoGridDash](#axcoGridDash), [axcoGridOpacity](#axcoGridOpacity),
[axcoGridWidth](#axcoGridWidth), [axcoLabels](#axcoLabels), [axcoLabelAngle](#axcoLabelAngle),
[axcoLabelColor](#axcoLabelColor), [axcoLabelFont](#axcoLabelFont), [axcoLabelFontSize](#axcoLabelFontSize),
[axcoLabelLimit](#axcoLabelLimit), [axcoLabelOverlap](#axcoLabelOverlap),
[axcoLabelPadding](#axcoLabelPadding), [axcoShortTimeLabels](#axcoShortTimeLabels),
[axcoTicks](#axcoTicks), [axcoTickColor](#axcoTickColor), [axcoTickRound](#axcoTickRound),
[axcoTickSize](#axcoTickSize), [axcoTickWidth](#axcoTickWidth), [axcoTitleAlign](#axcoTitleAlign),
[axcoTitleAngle](#axcoTitleAngle), [axcoTitleBaseline](#axcoTitleBaseline),
[axcoTitleColor](#axcoTitleColor), [axcoTitleFont](#axcoTitleFont), [axcoTitleFontSize](#axcoTitleFontSize),
[axcoTitleFontWeight](#axcoTitleFontWeight), [axcoTitleLimit](#axcoTitleLimit),
[axcoTitleMaxLength](#axcoTitleMaxLength), [axcoTitlePadding](#axcoTitlePadding),
[axcoTitleX](#axcoTitleX), [axcoTitleY](#axcoTitleY).
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


{-| Specify a default axis band position.
-}
axcoBandPosition : Float -> AxisConfig
axcoBandPosition =
    BandPosition


{-| Specify whether or not an axis domain should be displayed by default.
-}
axcoDomain : Bool -> AxisConfig
axcoDomain =
    Domain


{-| Specify a default axis domain color.
-}
axcoDomainColor : String -> AxisConfig
axcoDomainColor =
    DomainColor


{-| Specify a default axis domain width style.
-}
axcoDomainWidth : Float -> AxisConfig
axcoDomainWidth =
    DomainWidth


{-| Specify a default maximum extent style.
-}
axcoMaxExtent : Float -> AxisConfig
axcoMaxExtent =
    MaxExtent


{-| Specify a default minimum extent style.
-}
axcoMinExtent : Float -> AxisConfig
axcoMinExtent =
    MinExtent


{-| Specify whether or not an axis grid is displayed by default.
-}
axcoGrid : Bool -> AxisConfig
axcoGrid =
    Grid


{-| Specify a default axis grid color style.
-}
axcoGridColor : String -> AxisConfig
axcoGridColor =
    GridColor


{-| Specify a default axis line dash style.
-}
axcoGridDash : List Float -> AxisConfig
axcoGridDash =
    GridDash


{-| Specify a default axis grid line opacity.
-}
axcoGridOpacity : Float -> AxisConfig
axcoGridOpacity =
    GridOpacity


{-| Specify a default axis grid line width.
-}
axcoGridWidth : Float -> AxisConfig
axcoGridWidth =
    GridWidth


{-| Specify whether or not an axis has labels by default.
-}
axcoLabels : Bool -> AxisConfig
axcoLabels =
    Labels


{-| Specify a default axis label angle.
-}
axcoLabelAngle : Float -> AxisConfig
axcoLabelAngle =
    LabelAngle


{-| Specify a default axis label color.
-}
axcoLabelColor : String -> AxisConfig
axcoLabelColor =
    LabelColor


{-| Specify a default axis label font.
-}
axcoLabelFont : String -> AxisConfig
axcoLabelFont =
    LabelFont


{-| Specify a default axis label font size.
-}
axcoLabelFontSize : Float -> AxisConfig
axcoLabelFontSize =
    LabelFontSize


{-| Specify a default axis label limit (how much a label can extend beyond the
left/bottom or right/top of the axis line).
-}
axcoLabelLimit : Float -> AxisConfig
axcoLabelLimit =
    LabelLimit


{-| Specify a default axis label overlap strategy for cases where labels cannot
fit within the allotted space.
-}
axcoLabelOverlap : OverlapStrategy -> AxisConfig
axcoLabelOverlap =
    LabelOverlap


{-| Specify a default axis label padding (space between labels in pixels).
-}
axcoLabelPadding : Float -> AxisConfig
axcoLabelPadding =
    LabelPadding


{-| Specify whether or not an axis should use short time labels by default.
-}
axcoShortTimeLabels : Bool -> AxisConfig
axcoShortTimeLabels =
    ShortTimeLabels


{-| Specify whether or not an axis should show ticks by default.
-}
axcoTicks : Bool -> AxisConfig
axcoTicks =
    Ticks


{-| Specify a default axis tick mark color.
-}
axcoTickColor : String -> AxisConfig
axcoTickColor =
    TickColor


{-| Specify whether or not axis tick labels use rounded values by default.
-}
axcoTickRound : Bool -> AxisConfig
axcoTickRound =
    TickRound


{-| Specify a default axis tick mark size in pixel units.
-}
axcoTickSize : Float -> AxisConfig
axcoTickSize =
    TickSize


{-| Specify a default axis tick mark width in pixel units.
-}
axcoTickWidth : Float -> AxisConfig
axcoTickWidth =
    TickWidth


{-| Specify a default axis tick label horizontal alignment.
-}
axcoTitleAlign : HAlign -> AxisConfig
axcoTitleAlign =
    TitleAlign


{-| Specify a default axis title angle.
-}
axcoTitleAngle : Float -> AxisConfig
axcoTitleAngle =
    TitleAngle


{-| Specify a default axis title vertical alignment.
-}
axcoTitleBaseline : VAlign -> AxisConfig
axcoTitleBaseline =
    TitleBaseline


{-| Specify a default axis title color.
-}
axcoTitleColor : String -> AxisConfig
axcoTitleColor =
    TitleColor


{-| Specify a default axis title font.
-}
axcoTitleFont : String -> AxisConfig
axcoTitleFont =
    TitleFont


{-| Specify a default axis title font weight.
-}
axcoTitleFontWeight : FontWeight -> AxisConfig
axcoTitleFontWeight =
    TitleFontWeight


{-| Specify a default axis title font size.
-}
axcoTitleFontSize : Float -> AxisConfig
axcoTitleFontSize =
    TitleFontSize


{-| Specify a default axis title maximum size.
-}
axcoTitleLimit : Float -> AxisConfig
axcoTitleLimit =
    TitleLimit


{-| Specify a default axis title maximum length when generated automatically from
a field's description.
-}
axcoTitleMaxLength : Float -> AxisConfig
axcoTitleMaxLength =
    TitleMaxLength


{-| Specify a default axis title padding between axis line and text.
-}
axcoTitlePadding : Float -> AxisConfig
axcoTitlePadding =
    TitlePadding


{-| Specify a default axis x-position relative to the axis group.
-}
axcoTitleX : Float -> AxisConfig
axcoTitleX =
    TitleX


{-| Specify a default axis y-position relative to the axis group.
-}
axcoTitleY : Float -> AxisConfig
axcoTitleY =
    TitleY


{-| Generated by [axDomain](#axDomain), [axFormat](#AxFormat), [axGrid](#axGrid),
[axLabelAngle](#axLabelAngle), [axLabelOverlap](#axLabelOverlap), [axLabelPadding](#axLabelPadding),
[axLabels](#axLabels), [axMaxExtent](#axMaxExtent), [axMinExtent](#axMinExtent),
[axOffset](#axOffset), [axOrient](#axOrient), [axPosition](#axPosition), [axTicks](#axTicks),
[axTickCount](#axTickCount), [axTickSize](#axTickSize), [axTitle](#axTitle),
[AxTitleAlign](#axTitleAlign), [axTitleAngle](#axTitleAngle), [axTitleMaxLength](#axTitleMaxLength),
[axTitlePadding](#axTitlePadding), [axValues](#axValues), [axDates](#axDates) and
[axZIndex](#axZIndex).
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


{-| Generated by [iRange](#iRange), [iCheckbox](#iCheckbox),
[iRadio](#iRadio), [iSelect](#iSelect), [iText](#iText), [iNumber](#iNumber),
[iDate](#iDate), [iTime](#iTime), [iMonth](#iMonth), [iWeek](#iWeek), [iDateTimeLocal](#iDateTimeLocal),
[iTel](#iTel) and [iColor](#iColor).
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


{-| Generated by [biBase](#biBase), [biDivide](#biDivide),
[biExtent](#biExtent), [biMaxBins](#biMaxBins), [biMinStep](#biMinStep), [biNice](#biNice),
[biStep](#biStep) and [biSteps](#biSteps).
-}
type BinProperty
    = Base Float
    | Divides (List Float)
    | Extent Float Float
    | MaxBins Int
    | MinStep Float
    | Nice Bool
    | Step Float
    | Steps (List Float)


{-| Specify the number base to use for automatic bin determination (default is
base 10).
-}
biBase : Float -> BinProperty
biBase =
    Base


{-| Specify the scale factors indicating allowable subdivisions for binning.
The default value is [5, 2], which indicates that for base 10 numbers (the
default base), binning will consider dividing bin sizes by 5 and/or 2.
-}
biDivide : List Float -> BinProperty
biDivide =
    Divides


{-| Specify the desired range of bin values when binning a collection of values.
The first and second parameters indicate the minimum and maximum range values
respectively.
-}
biExtent : Float -> Float -> BinProperty
biExtent =
    Extent


{-| Specify the maximum number of bins when binning a collection of values.
-}
biMaxBins : Int -> BinProperty
biMaxBins =
    MaxBins


{-| Specify the step size between bins when binning a collection of values.
-}
biMinStep : Float -> BinProperty
biMinStep =
    MinStep


{-| Specify whether or not binning boundaries use human-friendly values such as
multiples of ten.
-}
biNice : Bool -> BinProperty
biNice =
    Nice


{-| Specify an exact step size between bins when binning a collection of values.
-}
biStep : Float -> BinProperty
biStep =
    Step


{-| Specify the allowable step sizes between bins when binning a collection of
values.
-}
biSteps : List Float -> BinProperty
biSteps =
    Steps


{-| Generated by [expr](#expr), [selected](#selected),
[selectionName](#selectionName), [and](#and), [or](#or) and [not](#not).
-}
type BooleanOp
    = Expr String
    | Selection String
    | SelectionName String
    | And BooleanOp BooleanOp
    | Or BooleanOp BooleanOp
    | Not BooleanOp


{-| Specify the bounds calculation method to use for determining the extent of
a sub-plot in a composed view. If set to `Full` (the default) the entire calculated
bounds including axes, title and legend are used, if `Flush` only the width and
height values for the sub-view will be used. `Flush` can be useful when laying out
sub-plots without axes or legends into a uniform grid structure.
-}
bounds : Bounds -> ( VLProperty, Spec )
bounds bnds =
    ( VLBounds, boundsSpec bnds )


{-| The bounds calculation method to use for determining the extent of a sub-plot
in a composed view.
-}
type Bounds
    = Full
    | Flush


{-| Channel type to be used in a resolution specification.
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


{-| Type of color interpolation to apply when mapping a data field onto a color
scale. Note that color interpolation cannot be applied with the default `sequential`
color scale, so additionally, you should set the `sType` to another continuous scale
such as `linear`, `pow` etc.

Options that require a `gamma` value (with 1 being a recommended default to provide)
are generated by [cubeHelix](#cubeHelix), [cubeHelixLong](#cubeHelixLong) and [rgb](#rgb).

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


{-| Specify that no clipping is to be applied. To specify a clipping rectangle
dimenstions, see [clipRect](#clipRect).
-}
type ClipRect
    = NoClip
    | LTRB Float Float Float Float


{-| Alignment to apply to grid rows and columns generated by composition (faceting etc.).
-}
type CompositionAlignment
    = CANone
    | CAEach
    | CAAll


{-| Generated with [coArea](#coArea),
[coAutosize](#coAutosize), [coAxis](#coAxis), [coAxisX](#coAxisX), [coAxisY](#coAxisY),
[coAxisLeft](#coAxisLeft), [coAxisRight](#coAxisRight), [coAxisTop](#coAxisTop),
[coAxisBottom](#coAxisBottom), [coAxisBand](#coAxisBand), [coBackground](#coBackground),
[coBar](#coBar), [coCircle](#coCircle), [coCountTitle](#coCountTitle), [coFieldTitle](#coFieldTitle),
[coGeoshape](#coGeoshape), [coLegend](#coLegend), [coLine](#coLine), [coMark](#coMark),
[coNamedStyle](#coNamedStyle), [coNumberFormat](#coNumberFormat), [coPadding](#coPadding),
[coPoint](#coPoint), [coProjection](#coProjection), [coRange](#coRange), [coRect](#coRect),
[coRemoveInvalid](#coRemoveInvalid), [coRule](#coRule), [coScale](#coScale), [coSelection](#coSelection),
[coSquare](#coSquare), [coStack](#coStack), [coText](#coText), [coTick](#coTick),
[coTitle](#coTitle), [coTimeFormat](#coTimeFormat), [coTrail](#coTrail) and [coView](#coView).
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
    | GeoshapeStyle (List MarkProperty)
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
      -- Note: Trails appear unusual in having their own top-level config
      -- (see https://vega.github.io/vega-lite/docs/trail.html#config)
    | TrailStyle (List MarkProperty)
    | View (List ViewConfig)


{-| Type of cursor to display. See the
[CSS cursor documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Keyword%20values)
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
            << dataColumn "easting" (nums [ -3, 4, 4, -3, -3 ])
            << dataColumn "northing" (nums [ 52, 52, 45, 45, 52 ])

-}
type alias Data =
    ( VLProperty, Spec )


{-| A single column of data. Used when generating inline data with [dataColumn](#dataColumn).
-}
type alias DataColumn =
    List LabelledSpec


{-| A single row of data. Used when generating inline data with [dataRow](#dataRow).
-}
type alias DataRow =
    Spec


{-| Data type to be parsed when reading input data. To parse dates, see
[foDate](#FoDate) and [foUtc](#foUtc).
-}
type DataType
    = FoNumber
    | FoBoolean
    | FoDate String
    | FoUtc String


{-| Generated by [boo](#boo), [true](#true), [false](#false), [dt](#dt),
[num](#num) and [str](#str).
-}
type DataValue
    = Boolean Bool
    | DateTime (List DateTime)
    | Number Float
    | Str String


{-| Generated by [boos](#boos), [dts](#dts), [nums](#nums) and [strs](#strs).
-}
type DataValues
    = Booleans (List Bool)
    | DateTimes (List (List DateTime))
    | Numbers (List Float)
    | Strings (List String)


{-| Generated by [dtYear](#dtYear), [dtQuarter](#dtQuarter), [dtMonth](#dtMonth),
[dtDate](#DTDate), [dtDay](#dtDay), [dtHour](#dtHour), [dtMinute](#dtMinute),
[dtSecond](#dtSecond) and [dtMillisecond](#dtMillisecond).
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


{-| Day of the week.
-}
type DayName
    = Mon
    | Tue
    | Wed
    | Thu
    | Fri
    | Sat
    | Sun


{-| Generated by [dName](#dName), [dMType](#dMType), [dAggregate](#dAggregate),
[DBin](#DBin) and [dTimeUnit](#dTimeUnit). For details see the
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


{-| Generated by [fName](#fName), [fMType](#fMType), [fAggregate](#fAggregate),
[fBin](#fBin), [fHeader](#fHeader) and [fTimeUnit](#fTimeUnit).
-}
type FacetChannel
    = FName String
    | FmType Measurement
    | FBin (List BinProperty)
    | FAggregate Operation
    | FTimeUnit TimeUnit
    | FHeader (List HeaderProperty)


{-| Generated by [columnBy](#columnBy) and [rowBy](#rowBy).
-}
type FacetMapping
    = ColumnBy (List FacetChannel)
    | RowBy (List FacetChannel)


{-| Generated by [fiEqual](#fiEqual), [fiLessThan](#fiLessThan),
[fiLessThanEq](#fiLessThanEq), [fiGreaterThan](#fiEqGreaterThan),
[fiGreaterThanEq](#fiGreaterThanEq), [fiExpr](#fiExpr), [fiCompose](#fiCompose),
[fiSelection](#fiSelection), [fiOneOf](#fiOneOf) and [fiRange](#fiRange).
-}
type Filter
    = FEqual String DataValue
    | FLessThan String DataValue
    | FLessThanEq String DataValue
    | FGreaterThan String DataValue
    | FGreaterThanEq String DataValue
    | FExpr String
    | FCompose BooleanOp
    | FSelection String
    | FOneOf String DataValues
    | FRange String FilterRange


{-| Generated by [numRange](#numRange) and [dtRange](#dtRange).
-}
type FilterRange
    = NumberRange Float Float
    | DateRange (List DateTime) (List DateTime)


{-| Weight options for a font.
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


{-| Specify the type of format of a data file (only necessary if the file extension
does not indicate the type, such as `.txt`). To read a file with a delimiter other
than comma or tab, use [dsv](#dsv). To customise the parsing of a file use
[parse](#parse), [jsonProperty](#jsonProperty), [topojsonFeature](#topojsonFeature)
or [topojsonMesh](#topojsonMesh).
-}
type Format
    = JSON String
    | CSV
    | TSV
    | DSV Char
    | TopojsonFeature String
    | TopojsonMesh String
    | Parse (List ( String, DataType ))


{-| Generated by [geoPoint](#geoPoint), [geoPoints](#geoPoints),
[geoLine](#geoLine), [geoLines](#geoLines), [geoPolygon](#geoPolygon) and
[geoPolygons](#geoPolygons).
-}
type Geometry
    = GeoPoint Float Float
    | GeoPoints (List ( Float, Float ))
    | GeoLine (List ( Float, Float ))
    | GeoLines (List (List ( Float, Float )))
    | GeoPolygon (List (List ( Float, Float )))
    | GeoPolygons (List (List (List ( Float, Float ))))


{-| Horizontal alignment of some text such as on an axis or legend.
-}
type HAlign
    = AlignCenter
    | AlignLeft
    | AlignRight


{-| Generated by [hdFormat](#hdFormat),
[hdLabelAngle](#hdLabelAngle), [hdLabelColor](#hdLabelColor), [hdLabelFont](#hdLabelFont),
[hdLabelFontSize](#hdLabelFontSize), [hdLabelLimit](#hdLabelLimit), [hdTitle](#hdTitle),
[hdTitleAnchor](#hdTitleAnchor), [hdTitleAngle](#hdTitleAngle), [hdTitleBaseline](#hdTitleBaseline),
[hdTitleColor](#hdTitleColor), [hdTitleFont](#hdTitleFont), [hdTitleFontWeight](#hdTitleFontWeight),
[hdTitleFontSize](#hdTitleFontSize) and [hdTitleLimit](#hdTitleLimit).
-}
type HeaderProperty
    = HFormat String
    | HTitle String
    | HLabelAngle Float
    | HLabelColor String
    | HLabelFont String
    | HLabelFontSize Float
    | HLabelLimit Float
    | HTitleAnchor APosition
    | HTitleAngle Float
    | HTitleBaseline VAlign
    | HTitleColor String
    | HTitleFont String
    | HTitleFontWeight String
    | HTitleFontSize Float
    | HTitleLimit Float


{-| Specify the header format specifier for a faceted view.
-}
hdFormat : String -> HeaderProperty
hdFormat =
    HFormat


{-| Specify the header label rotation angle (in degrees) for a faceted view. A
'label' is the title for each sub-plot in a faceted view.
-}
hdLabelAngle : Float -> HeaderProperty
hdLabelAngle =
    HLabelAngle


{-| Specify the header label text color for a faceted view. A 'label' is the title
for each sub-plot in a faceted view.
-}
hdLabelColor : String -> HeaderProperty
hdLabelColor =
    HLabelColor


{-| Specify the header label font for a faceted view. A 'label' is the title for
each sub-plot in a faceted view.
-}
hdLabelFont : String -> HeaderProperty
hdLabelFont =
    HLabelFont


{-| Specify the header label font size for a faceted view. A 'label' is the title
for each sub-plot in a faceted view.
-}
hdLabelFontSize : Float -> HeaderProperty
hdLabelFontSize =
    HLabelFontSize


{-| Specify the maximum length (in pixels) of a header label in a faceted view.
A 'label' is the title for each sub-plot in a faceted view.
-}
hdLabelLimit : Float -> HeaderProperty
hdLabelLimit =
    HLabelLimit


{-| Specify a header title in a faceted view.
-}
hdTitle : String -> HeaderProperty
hdTitle =
    HTitle


{-| Specify the anchor position of a header title in a faceted view.
A 'title' is the overall title describing the collection of faceted plots.
-}
hdTitleAnchor : APosition -> HeaderProperty
hdTitleAnchor =
    HTitleAnchor


{-| Specify the text angle of a header title in a faceted view. A 'title' is the
overall title describing the collection of faceted plots.
-}
hdTitleAngle : Float -> HeaderProperty
hdTitleAngle =
    HTitleAngle


{-| Specify the vertical alignment of a header title in a faceted view.
-}
hdTitleBaseline : VAlign -> HeaderProperty
hdTitleBaseline =
    HTitleBaseline


{-| Specify the text color of a header title in a faceted view.
-}
hdTitleColor : String -> HeaderProperty
hdTitleColor =
    HTitleColor


{-| Specify the title font in a faceted view.
-}
hdTitleFont : String -> HeaderProperty
hdTitleFont =
    HTitleFont


{-| Specify the title font size in a faceted view.
-}
hdTitleFontSize : Float -> HeaderProperty
hdTitleFontSize =
    HTitleFontSize


{-| Specify the title font weight in a faceted view.
-}
hdTitleFontWeight : String -> HeaderProperty
hdTitleFontWeight =
    HTitleFontWeight


{-| Specify the maximum length (in pixels) of a header title in a faceted view.
-}
hdTitleLimit : Float -> HeaderProperty
hdTitleLimit =
    HTitleLimit


{-| Generated by [hName](#hName), [hRepeat](#hRepeat), [hMType](#hMType), [HBin](#hBin),
[hAggregate](#hAggregate), [hTimeUnit](#hTimeUnit), [hDataCondition](#hDataCondition),
[hSelectionCondition](#hSelectionCondition) and [hStr](#hStr).
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


{-| Generated by [inDebounce](#inDebounce), [inElement](#inElement),
[inOptions](#inOptions), [inMin](#inMin), [inMax](#inMax), [inName](#inName),
[inStep](#inStep) and [inPlaceholder](#inPlaceholder).
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


{-| A named Vega-Lite specification, usually generated by an elm-vega
function. You shouldn't need to create `LabelledSpec` tuples directly, but are
useful for type annotations.
-}
type alias LabelledSpec =
    ( String, Spec )


{-| Type of legend. Gradient legends are usually used for continuous quantitative
data while symbol legends used for categorical data.
-}
type Legend
    = Gradient
    | Symbol


{-| Generated by [lecoCornerRadius](#lecoCornerRadius),
[lecoFillColor](#lecoFillColor), [lecoOrient](#lecoOrient), [lecoOffset](#lecoOffset),
[lecoStrokeColor](#lecoStrokeColor), [lecoStrokeDash](#lecoStrokeDash), [lecoStrokeWidth](#lecoStrokeWidth),
[lecoPadding](#lecoPadding), [lecoGradientLabelBaseline](#lecoGradientLabelBaseline),
[lecoGradientLabelLimit](#lecoGradientLabelLimit), [lecoGradientLabelOffset](#lecoGradientLabelOffset),
[lecoGradientStrokeColor](#lecoGradientStrokeColor), [lecoGradientStrokeWidth](#lecoGradientStrokeWidth),
[lecoGradientHeight](#lecoGradientHeight), [lecoGradientWidth](#lecoGradientWidth),
[lecoLabelAlign](#lecoLabelAlign), [lecoLabelBaseline](#lecoLabelBaseline),
[lecoLabelColor](#lecoLabelColor), [lecoLabelFont](#lecoLabelFont), [lecoLabelFontSize](#lecoLabelFontSize),
[lecoLabelLimit](#lecoLabelLimit), [lecoLabelOffset](#lecoLabelOffset),
[lecoShortTimeLabels](#lecoShortTimeLabels), [lecoEntryPadding](#lecoEntryPadding),
[lecoSymbolColor](#lecoSymbolColor), [lecoSymbolType](#lecoSymbolType), [lecoSymbolSize](#lecoSymbolSize),
[lecoSymbolStrokeWidth](#lecoSymbolStrokeWidth), [lecoTitleAlign](#lecoTitleAlign),
[lecoTitleBaseline](#lecoTitleBaseline), [lecoTitleColor](#lecoTitleColor),
[lecoTitleFont](#lecoTitleFont), [lecoTitleFontSize](#lecoTitleFontSize),
[lecoTitleFontWeight](#lecoTitleFontWeight), [lecoTitleLimit](#lecoTitleLimit)
and [lecoTitlePadding](#lecoTitlePadding).
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


{-| Legend position relative to data rectangle.
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


{-| Generated by [leFormat](#leFormat), [leOffset](#LeOffset), [leOrient](#leOrient),
[lePadding](#lePadding), [leTickCount](#leTickCount), [leTitle](#leTitle),
[leType](#leType), [leValues](#leValues) and [leZIndex](#leZIndex).
-}
type LegendProperty
    = LFormat String
    | LOffset Float
    | LOrient LegendOrientation
    | LPadding Float
    | LTickCount Float
    | LTitle String
    | LType Legend
    | LValues LegendValues
    | LZIndex Int


{-| Generated by [leNums](#leNums), [leStrs](#leStrs) and [leDts](#leDts).
-}
type LegendValues
    = LDateTimes (List (List DateTime))
    | LNumbers (List Float)
    | LStrings (List String)


{-| Specify the appearance of a line marker that is overlaid on to an area mark.
Also generated by [lmLine](#lmLine).
-}
type LineMarker
    = LMNone
    | LMMarker (List MarkProperty)


{-| Generated by
[area](#area), [bar](#bar), [boxplot](#boxplot), [circle](#circle), [errorband](#errorband),
[errorbar](#errorbar), [geoshape](#geoshape), [line](#line), [point](#point), [rect](#rect),
[rule](#rule),[square](#square), [textMark](#textMark), [tick](#tick) and [trail](#trail).
-}
type Mark
    = Area
    | Bar
    | Boxplot
    | Errorband
    | Errorbar
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


{-| Generated by [mName](#mName), [mRepeat](#mRepeat), [mMType](#mMType), [mScale](#mScale),
[mBin](#MBin), [mTimeUnit](#mTimeUnit), [mTitle](#mTitle), [mAggregate](#mAggregate),
[mLegend](#mLegend), [mSelectionCondition](#mSelectionCondition),
[mDataCondition](#mDataCondition), [mPath](#mPath), [mNum](#mNum), [mStr](#mStr)
and [mBoo](#mBoo).
-}
type MarkChannel
    = MName String
    | MRepeat Arrangement
    | MmType Measurement
    | MScale (List ScaleProperty)
    | MBin (List BinProperty)
    | MTimeUnit TimeUnit
    | MTitle String
    | MAggregate Operation
    | MLegend (List LegendProperty)
    | MSelectionCondition BooleanOp (List MarkChannel) (List MarkChannel)
    | MDataCondition (List ( BooleanOp, List MarkChannel )) (List MarkChannel)
    | MPath String
    | MNumber Float
    | MString String
    | MBoolean Bool


{-| Mark interpolation style.
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


{-| Desired orientation of a mark (e.g. horizontally or vertically oriented bars.)
-}
type MarkOrientation
    = Horizontal
    | Vertical


{-| Generated by [maAlign](#maAlign), [maAngle](#maAngle), [maBandSize](#maBandSize),
[maBaseline](#maBaseline), [maBinSpacing](#maBinSpacing), [maBorders](#maBorders),
[maClip](#maClip), [maColor](#maColor), [maCursor](#maCursor), [maHRef](#maHRef),
[maContinuousBandSize](#maContinuousBandSize), [maDiscreteBandSize](#maDiscreteBandSize),
[maDx](#maDx), [maDy](#maDy), [maExtent](#maExtent), [maFill](#maFill), [maFilled](#maFilled),
[maFillOpacity](#maFillOpacity), [maFont](#maFont), [maFontSize](#maFontSize),
[maFontStyle](#maFontStyle), [maFontWeight](#maFontWeight), [maInterpolate](#maInterpolate),
[maLine](#maLine), [maOpacity](#maOpacity), [maOrient](#maOrient), [maPoint](#maPoint),
[maRadius](#maRadius), [maRule](#maRule), [maShape](#maShape), [maShortTimeLabels](#maShortTimeLabels),
[maSize](#maSize), [maStroke](#maStroke), [maStrokeCap](#maStrokeCap), [maStrokeDash](#maStrokeDash),
[maStrokeDashOffset](#maStrokeDashOffset), [maStrokeJoin](#maStrokeJoin),
[maStrokeMiterLimit](#maStrokeMiterLimit), [maStrokeOpacity](#maStrokeOpacity),
[maStrokeWidth](#maStrokeWidth), [maStyle](#maStyle), [maTension](#maTension),
[maText](#maText), [maTheta](#maTheta), [maThickness](#maThickness), [maTicks](#maTicks),
[maXOffset](#maXOffset), [maYOffset](#maYOffset), [maX2Offset](#maX2Offset) and
[maY2Offset](#maY2Offset).
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
    | MBorders (List MarkProperty)
    | MClip Bool
    | MColor String
    | MCursor Cursor
    | MHRef String
    | MContinuousBandSize Float
    | MDiscreteBandSize Float
    | MdX Float
    | MdY Float
    | MExtent SummaryExtent
    | MFill String
    | MFilled Bool
    | MFillOpacity Float
    | MFont String
    | MFontSize Float
    | MFontStyle String
    | MFontWeight FontWeight
    | MInterpolate MarkInterpolation
    | MLine LineMarker
    | MOpacity Float
    | MOrient MarkOrientation
    | MPoint PointMarker
    | MRadius Float
    | MRule (List MarkProperty)
    | MShape Symbol
    | MShortTimeLabels Bool
    | MSize Float
    | MStroke String
    | MStrokeCap StrokeCap
    | MStrokeDash (List Float)
    | MStrokeDashOffset Float
    | MStrokeJoin StrokeJoin
    | MStrokeMiterLimit Float
    | MStrokeOpacity Float
    | MStrokeWidth Float
    | MStyle (List String)
    | MTension Float
    | MText String
    | MTheta Float
    | MTicks (List MarkProperty)
    | MThickness Float
    | MXOffset Float
    | MYOffset Float
    | MX2Offset Float
    | MY2Offset Float


{-| Type of measurement to be associated with some channel. `Nominal` data are
unordered categories identified by name alone. `Ordinal` data are ordered categories
`Quantitative` data are numeric measurements typically on a continuous scale.

Geospatial position encoding (`Longitude` and `Latitude`) should specify the `pMType`
as `Quantitative`. Geographically referenced features encoded as `shape` marks
should specify `mMType` as `GeoFeature`.

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


{-| Generated by [OName](#oName), [oRepeat](#oRepeat), [oMType](#oMType), [oBin](#oBin),
[oAggregate](#oAggregate), [oTimeUnit](#oTimeUnit) and [oSort](#oSort).
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
-}
type OverlapStrategy
    = ONone
    | OParity
    | OGreedy


{-| Generated by [paSize](#paSize) and [paEdges](#paEdges).
-}
type Padding
    = PSize Float
    | PEdges Float Float Float Float


{-| Specify the appearance of a point marker that is overlaid on a line or area
mark. Also generated by [pmMarker](#pmMarker).
-}
type PointMarker
    = PMTransparent
    | PMNone
    | PMMarker (List MarkProperty)


{-| Type of position channel, `X` and `Y` represent horizontal and vertical axis
dimensions on a plane and `X2` and `Y2` represent secondary axis dimensions where
two scales are overlaid in the same space. Geographic positions represented by
longitude and latitude values are identified with `Longitude`, `Latitude` and
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


{-| Generated by [pName](#pName), [pRepeat](#pRepeat), [pMType](#pMType), [pBin](#PBin),
[pTimeUnit](#pTimeUnit), [pTitle](#pTitle), [pAggregate](#pAggregate),
[pScale](#pScale), [pAxis](#pAxis), [pSort](#pSort), [pStack](#pStack), [pWidth](#pWidth)
and [pHeight](#pHeight).
-}
type PositionChannel
    = PName String
    | PWidth
    | PHeight
    | PRepeat Arrangement
    | PmType Measurement
    | PBin (List BinProperty)
    | PTimeUnit TimeUnit
    | PTitle String
    | PAggregate Operation
    | PScale (List ScaleProperty)
    | PAxis (List AxisProperty)
    | PSort (List SortProperty)
    | PStack StackProperty


{-| Types of geographic map projection. These are based on a subset of those provided
by the [d3-geo library](https://github.com/d3/d3-geo). To generate a custom projection
use [customProjection](#customProjection).
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


{-| Generated by
[prType](#prType), [prClipAngle](#prClipAngle), [prClipExtent](#prClipExtent),
[prCenter](#prCenter), [prRotate](#prRotate), [prPrecision](#prPrecision),
[prCoefficient](#prCoefficient), [prDistance](#prDistance), [prFraction](#prFraction),
[prLobes](#prLobes), [prParallel](#prParallel), [prRadius](#prRadius), [prRatio](#prRatio),
[prSpacing](#prSpacing) and [prTilt](#prTilt).
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


{-| Generated by [racoCategory](#racoCategory),
[racoDiverging](#racoDiverging), [racoHeatmap](#racoHeatmap), [racoOrdinal](#racoOrdinal),
[racoRamp](#racoRamp) and [racoSymbol](#racoSymbol).
-}
type RangeConfig
    = RCategory String
    | RDiverging String
    | RHeatmap String
    | ROrdinal String
    | RRamp String
    | RSymbol String


{-| Generated by [rowFields](#rowFields) and [columnFields](#columnFields).
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


{-| Generated by [reAxis](#reAxis), [reLegend](#reLegend) and [reScale](#reScale).
-}
type Resolve
    = RAxis (List ( Channel, Resolution ))
    | RLegend (List ( Channel, Resolution ))
    | RScale (List ( Channel, Resolution ))


{-| Specify how a channel's axes should be resolved when defined in more
than one view in a composite visualization.
-}
reAxis : List ( Channel, Resolution ) -> Resolve
reAxis =
    RAxis


{-| Specify how a channel's legends should be resolved when defined in more
than one view in a composite visualization.
-}
reLegend : List ( Channel, Resolution ) -> Resolve
reLegend =
    RLegend


{-| Specify how a channel's scales should be resolved when defined in more
than one view in a composite visualization.
-}
reScale : List ( Channel, Resolution ) -> Resolve
reScale =
    RScale


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


{-| Generated by [sacoBandPaddingInner](#sacoBandPaddingInner), [sacoBandPaddingOuter](#sacoBandPaddingOuter),
[sacoClamp](#sacoClamp), [sacoMaxBandSize](#sacoMaxBandSize), [sacoMinBandSize](#sacoMinBandSize),
[sacoMaxFontSize](#sacoMaxFontSize), [sacoMinFontSize](#sacoMinFontSize), [sacoMaxOpacity](#sacoMaxOpacity),
[sacoMinOpacity](#sacoMinOpacity), [sacoMaxSize](#sacoMaxSize), [sacoMinSize](#sacoMinSize),
[sacoMaxStrokeWidth](#sacoMaxStrokeWidth), [sacoMinStrokeWidth](#sacoMinStrokeWidth),
[sacoPointPadding](#sacoPointPadding), [sacoRangeStep](#sacoRangeStep), [sacoRound](#sacoRound),
[sacoTextXRangeStep](#sacoTextXRangeStep) and [sacoUseUnaggregatedDomain](#sacoUseUnaggregatedDomain).
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


{-| Describes a scale domain (type of data in scale). To specify scale domain
values explicitly, use the functions [doNums](#doNums), [doStrs](#doStrs),
[doDts](#doDts) or [doSelection](#doSelection).
-}
type ScaleDomain
    = DNumbers (List Float)
    | DStrings (List String)
    | DDateTimes (List (List DateTime))
    | DSelection String
    | Unaggregated


{-| Describes the way a scale can be rounded to 'nice' numbers. To specify nice
time intervals use [scNiceInterval](#scNiceInterval) and to set a nice tick count
use [scNiceTickCount](#scNiceTickCount).
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
    | NTrue
    | NFalse
    | NInterval TimeUnit Int
    | NTickCount Int


{-| Generated by [scType](#scType), [scDomain](#scDomain), [scRange](#scRange),
[scScheme](#scScheme), [scPadding](#scPadding), [scPaddingInner](#scPaddingInner),
[scPaddingOuter](#scPaddingOuter), [scRangeStep](#scRangeStep), [scRound](#scRound),
[scClamp](#scClamp), [scInterpolate](#scInterpolate), [scNice](#scNice), [scZero](#scZero)
and [scReverse](#scReverse).
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
    | SReverse Bool


{-| Generated by [raNums](#raNums), [raStrs](#raStrs) and [raName](#raName).
-}
type ScaleRange
    = RNumbers (List Float)
    | RStrings (List String)
    | RName String


{-| Type of selection to be generated by the user. `Single` allows
one mark at a time to be selected. 'Multi' allows multiple items to be selected
(e.g. with shift-click). 'Interval' allows a bounding rectangle to be dragged by
user to select all items intersecting with it.
-}
type Selection
    = Single
    | Multi
    | Interval


{-| Generated by [smFill](#smFill), [smFillOpacity](#smFillOpacity), [smStroke](#smStroke),
[smStrokeDash](#smStrokeDash), [smStrokeDashOffset](#smStrokeDashOffset),
[smStrokeOpacity](#smStrokeOpacity) and [smStrokeWidth](#smStrokeWidth).
-}
type SelectionMarkProperty
    = SMFill String
    | SMFillOpacity Float
    | SMStroke String
    | SMStrokeOpacity Float
    | SMStrokeWidth Float
    | SMStrokeDash (List Float)
    | SMStrokeDashOffset Float


{-| Properties for customising the nature of an interactive selection. Parameterised
properties generated by [seBind](#seBind), [seEncodings](#seEncodings), [seFields](#seFields),
[seNearest](#seNearest), [seOn](#seOn), [seResolve](#seResolve), [seSelectionMark](#seSelectionMark),
[seToggle](#seToggle), [seTranslate](#seTranslate) and [seZoom](#seZoom).
-}
type SelectionProperty
    = Empty
    | BindScales
    | On String
    | Translate String
    | Zoom String
    | Fields (List String)
    | Encodings (List Channel)
    | ResolveSelections SelectionResolution
    | SelectionMark (List SelectionMarkProperty)
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


{-| One side of a rectangular space.
-}
type Side
    = STop
    | SBottom
    | SLeft
    | SRight


{-| Allow type of sorting to be customised. To sort a field by the aggregated
values of another use [soByField](#soByField) or [soByRepeat](#soByRepeat). Custom
sorting by explicit values can be provided by [soCustom](#soCustom).
-}
type SortProperty
    = Ascending
    | Descending
    | CustomSort DataValues
    | ByRepeatOp Arrangement Operation
    | ByFieldOp String Operation


{-| Part or all of Vega-Lite specification. Specs are usually nested
and can range from a single Boolean value up to the entire Vega-Lite specification.
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


{-| Type of stroke cap.
-}
type StrokeCap
    = CButt
    | CRound
    | CSquare


{-| Type of stroke join.
-}
type StrokeJoin
    = JMiter
    | JRound
    | JBevel


{-| Type of symbol. To create a user defined path for a symbol use
[symPath](#symPath).
-}
type Symbol
    = SymCircle
    | SymSquare
    | Cross
    | Diamond
    | TriangleUp
    | TriangleDown
    | Path String


{-| Type of extent summary of a statistical distribution. Additionally generated
by [iqrScale](#iqrScale).
-}
type SummaryExtent
    = ExCI
    | ExStderr
    | ExStdev
    | ExIqr
    | ExRange
    | ExIqrScale Float


{-| Generated by [tName](#tName), [tRepeat](#tRepeat), [tMType](#tMType),
[tBin](#tBin), [tAggregate](#tAggregate), [tTimeUnit](#tTimeUnit),[tTitle](#tTitle),
[tSelectionCondition](#tSelectionCondition), [tDataCondition](#tDataCondition)
and [tFormat](#tFormat).
-}
type TextChannel
    = TName String
    | TRepeat Arrangement
    | TmType Measurement
    | TBin (List BinProperty)
    | TAggregate Operation
    | TTimeUnit TimeUnit
    | TTitle String
    | TSelectionCondition BooleanOp (List TextChannel) (List TextChannel)
    | TDataCondition (List ( BooleanOp, List TextChannel )) (List TextChannel)
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


{-| Generated by [ticoAnchor](#ticoAnchor),
[ticoAngle](#ticoAngle), [ticoBaseline](#ticoBaseline), [ticoColor](#ticoColor),
[ticoFont](#ticoFont), [ticoFontSize](#ticoFontSize), [ticoFontWeight](#ticoFontWeight),
[ticoLimit](#ticoLimit), [ticoOffset](#ticoOffset) and [ticoOrient](#ticoOrient).
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


{-| Vertical alignment of some text that may be attached to a mark.
-}
type VAlign
    = AlignTop
    | AlignMiddle
    | AlignBottom


{-| Generated by [vicoWidth](#vicoWidth), [vicoHeight](#vicoHeight), [vicoClip](#vicoClip),
[vicoFill](#vicoFill), [vicoFillOpacity](#vicoFillOpacity), [vicoStroke](#vicoStroke),
[vicoStrokeOpacity](#vicoStrokeOpacity), [vicoStrokeWidth](#vicoStrokeWidth),
[vicoStrokeDash](#vicoStrokeDash) and [vicoStrokeDashOffset](#vicoStrokeDashOffset).
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
visualization grammar. All `VLProperties` are created by functions in seven broad groups.

**Data properties** relate to the input data to be visualized. Generated by
[`dataFromColumns`](#dataFromColumns), [`dataFromRows`](#dataFromRows),
[`dataFromUrl`](#dataFromUrl), [`dataFromSource`](#dataFromSource) and
[`dataFromJson`](#dataFromJson).

**Transform properties** indicate that some transformation of input data should
be applied before encoding them visually. Generated by [`transform`](#transform)
and [`projection`](#projection) they can include data transformations such as
[filter](#filter), [binAs](#binAs) and [calculateAs](#calculateAs) and geo
transformations of longitude, latitude coordinates used by marks such as those
generated by [geoshape](#geoshape), [point](#point) and [line](#line).

**Mark functions** specify the symbols used to visualize data items. Generated
by functions such as [`circle`](#circle), [`bar`](#bar) and [`line`](#line).

**Encoding properties** specify which data elements are mapped to which mark
characteristics (known as _channels_). Generated by [`encoding`](#encoding) they
include encodings such as `position`, `color`, `size`, `shape` `text` and `hyperlink`.

**Composition properties** allow visualization views to be combined to form more
complex visualizations. Generated by [`layer`](#layer), [`repeat`](#repeat),
[`facet`](#facet), [`hConcat`](#hConcat), [`vConcat`](#vConcat), [`spec`](#spec)
and [`resolve`](#resolve).

**Interaction properties** allow clicking, dragging and other interactions generated
via a GUI or data stream to influence the visualization. Generated by
[`selection`](#selection).

**Supplementary and configuration properties** provide a means to add metadata and
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
    | VLSpacing
    | VLAlign
    | VLBounds
    | VLCenter
    | VLConfig
    | VLSelection


{-| Generated by [wiAggregateOp](#wiAggregateOp), [wiOp](#wiOp), [wiParam](#wiParam)
and [wiField](#wiField).
-}
type Window
    = WAggregateOp Operation
    | WOp WindowOperation
    | WParam Int
    | WField String


{-| Operations that may be applied during a window transformation.
-}
type WindowOperation
    = RowNumber
    | Rank
    | DenseRank
    | PercentRank
    | CumeDist
    | Ntile
    | Lag
    | Lead
    | FirstValue
    | LastValue
    | NthValue


{-| Generated by [wiFrame](#wiFrame), [wiIgnorePeers](#wiIgnorePeers), [wiGroupBy](#wiGroupBy)
and [wiSort](#wiSort).
-}
type WindowProperty
    = WFrame (Maybe Int) (Maybe Int)
    | WIgnorePeers Bool
    | WGroupBy (List String)
    | WSort (List WindowSortField)


{-| Generated by [wiAscending](#wiAscending) and [wiDescending](#wiDescending).
-}
type WindowSortField
    = WAscending String
    | WDescending String


{-| Specify a set of named aggregation transformations to be used when encoding
channels. Useful when, for example, you wish to apply the same transformation
to a number of channels but do not want to define it each time. The first parameter is
a list of the named aggregation operations to apply. The second is a list of
'group by' fields. The third is the list of transformations to which this is to
be added.

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


{-| Specify an [area mark](https://vega.github.io/vega-lite/docs/area.html) for
representing a series of data elements, such as in a stacked area chart or streamgraph.
-}
area : List MarkProperty -> ( VLProperty, Spec )
area =
    mark Area


{-| Create a specification sufficient to define an element in a composed visualization
such as a superposed layer or juxtaposed facet. Typically a layer will contain a
full set of specifications that define a visualization with the exception of the
data specification which is usually defined outside of any one
layer. For repeated and faceted specs, the entire specification is provided.
-}
asSpec : List ( VLProperty, Spec ) -> Spec
asSpec specs =
    List.map (\( s, v ) -> ( vlPropertyLabel s, v )) specs
        |> JE.object


{-| Declare the way the view is sized. See the
[Vega-Lite autosize documentation](https://vega.github.io/vega-lite/docs/size.html#autosize).

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


{-| Specify the date/times to appear along an axis.
-}
axDates : List (List DateTime) -> AxisProperty
axDates =
    AxDates


{-| Specify whether or not the axis baseline (domain) should be included as part
of an axis.
-}
axDomain : Bool -> AxisProperty
axDomain =
    AxDomain


{-| Specify the [format](https://vega.github.io/vega-lite/docs/format.html)
to apply to labels on an axis.
-}
axFormat : String -> AxisProperty
axFormat =
    AxFormat


{-| Specify whether or not grid lones should be included as part of an axis.
-}
axGrid : Bool -> AxisProperty
axGrid =
    AxGrid


{-| Specify the rotation angle in degrees of axis labels.
-}
axLabelAngle : Float -> AxisProperty
axLabelAngle =
    AxLabelAngle


{-| Specify the overlap strategy for labels when they are too large to fit within
the space devoted to an axis.
-}
axLabelOverlap : OverlapStrategy -> AxisProperty
axLabelOverlap =
    AxLabelOverlap


{-| Specify the padding in pixels between an axis and its text labels.
-}
axLabelPadding : Float -> AxisProperty
axLabelPadding =
    AxLabelPadding


{-| Specify whether or not axis labels should be displayed.
-}
axLabels : Bool -> AxisProperty
axLabels =
    AxLabels


{-| Specify the maximum extent in pixels that axis ticks and labels should use.
This determines a maximum offset value for axis titles.
-}
axMaxExtent : Float -> AxisProperty
axMaxExtent =
    AxMaxExtent


{-| Specify the minimum extent in pixels that axis ticks and labels should use.
This determines a minimum offset value for axis titles.
-}
axMinExtent : Float -> AxisProperty
axMinExtent =
    AxMinExtent


{-| Specify the offset, in pixels, by which to displace the axis from the edge
of the enclosing group or data rectangle.
-}
axOffset : Float -> AxisProperty
axOffset =
    AxOffset


{-| Specify the orientation of an axis relative to the plot it is describing.
-}
axOrient : Side -> AxisProperty
axOrient =
    AxOrient


{-| Specify the anchor position of the axis in pixels. For x-axis with top or
bottom orientation, this sets the axis group x coordinate. For y-axis with left
or right orientation, this sets the axis group y coordinate.
-}
axPosition : Float -> AxisProperty
axPosition =
    AxPosition


{-| Specify whether or not an axis should include tick marks.
-}
axTicks : Bool -> AxisProperty
axTicks =
    AxTicks


{-| Specify the desired number of ticks, for axes visualizing quantitative scales.
The resulting number may be different so that values are “nice” (multiples of 2, 5, 10)
and lie within the underlying scale’s range.
-}
axTickCount : Int -> AxisProperty
axTickCount =
    AxTickCount


{-| Specify the tick mark size in pixels.
-}
axTickSize : Float -> AxisProperty
axTickSize =
    AxTickSize


{-| Specify the title to display as part of an axis. An empty string can be used
to prevent a title being displayed.
-}
axTitle : String -> AxisProperty
axTitle =
    AxTitle


{-| Specify the horizontal alignment of an axis title.
-}
axTitleAlign : HAlign -> AxisProperty
axTitleAlign =
    AxTitleAlign


{-| Specify the angle in degrees of an axis title.
-}
axTitleAngle : Float -> AxisProperty
axTitleAngle =
    AxTitleAngle


{-| Specify the maximum length for an axis title for cases where the title is
automatically generated from a field’s description.
-}
axTitleMaxLength : Float -> AxisProperty
axTitleMaxLength =
    AxTitleMaxLength


{-| Specify the padding in pixels between a title and axis.
-}
axTitlePadding : Float -> AxisProperty
axTitlePadding =
    AxTitlePadding


{-| Specify the numeric values to appear along an axis.
-}
axValues : List Float -> AxisProperty
axValues =
    AxValues


{-| Specify the drawing order of the axis relative to the other chart elements.
A value of 1 indicates axis is drawn in front of chart marks, 0 indicates it is
drawn behind them.
-}
axZIndex : Int -> AxisProperty
axZIndex =
    AxZIndex


{-| Set the background color of the visualization. Should be specified with a CSS
string such as `#ffe` or `rgb(200,20,150)`. If not specified the background will
be transparent.
-}
background : String -> ( VLProperty, Spec )
background colour =
    ( VLBackground, JE.string colour )


{-| Specify a [bar mark](https://vega.github.io/vega-lite/docs/bar.html) for histograms,
bar charts etc.
-}
bar : List MarkProperty -> ( VLProperty, Spec )
bar =
    mark Bar


{-| Create a named binning transformation that may be referenced in other Transformations
or encodings. The type of binning can be customised with a list of `BinProperty`
generating functions ([biBase](#biBase), [biDivide](#biDivide) etc.) or an empty
list to use the default binning.

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


{-| Specify a boolean data value. This is used when a function can accept values
of different types.
-}
boo : Bool -> DataValue
boo =
    Boolean


{-| Specify a list of boolean data values. This is used when a function can
accept lists of different types.
-}
boos : List Bool -> DataValues
boos =
    Booleans


{-| Specify a [boxplot composite mark](https://vega.github.io/vega-lite/docs/boxplot.html)
for showing summaries of statistical distibutions.
-}
boxplot : List MarkProperty -> ( VLProperty, Spec )
boxplot =
    mark Boxplot


{-| Generate a new data field based on calculations from existing fields.
The first parameter is an expression representing the calculation and the second
is the name to give the newly calculated field. The third is a list of
transformations to which this is to be added.

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


{-| Specify whether or not sub-views specified in a composition operator should
be centred relative to their respective rows or columns. This version sets the same
centring for rows and columns.
-}
center : Bool -> ( VLProperty, Spec )
center c =
    ( VLCenter, JE.bool c )


{-| Similar to [center](#center) but with independent centring for rows and columns.
-}
centerRC : Bool -> Bool -> ( VLProperty, Spec )
centerRC cRow cCol =
    ( VLCenter, JE.object [ ( "row", JE.bool cRow ), ( "col", JE.bool cCol ) ] )


{-| Specify a [circle mark](https://vega.github.io/vega-lite/docs/circle.html)
for symbolising points.
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


{-| Configure the default appearance of area marks.
-}
coArea : List MarkProperty -> ConfigurationProperty
coArea =
    AreaStyle


{-| Configure the default sizing of visualizations.
-}
coAutosize : List Autosize -> ConfigurationProperty
coAutosize =
    Autosize


{-| Configure the default appearance of axes.
-}
coAxis : List AxisConfig -> ConfigurationProperty
coAxis =
    Axis


{-| Configure the default appearance of x-axes.
-}
coAxisX : List AxisConfig -> ConfigurationProperty
coAxisX =
    AxisX


{-| Configure the default appearance of y-axes.
-}
coAxisY : List AxisConfig -> ConfigurationProperty
coAxisY =
    AxisY


{-| Configure the default appearance of left-side axes.
-}
coAxisLeft : List AxisConfig -> ConfigurationProperty
coAxisLeft =
    AxisLeft


{-| Configure the default appearance of right-side axes.
-}
coAxisRight : List AxisConfig -> ConfigurationProperty
coAxisRight =
    AxisRight


{-| Configure the default appearance of top-side axes.
-}
coAxisTop : List AxisConfig -> ConfigurationProperty
coAxisTop =
    AxisTop


{-| Configure the default appearance of bottom-side axes.
-}
coAxisBottom : List AxisConfig -> ConfigurationProperty
coAxisBottom =
    AxisBottom


{-| Configure the default appearance of axes with band scaling.
-}
coAxisBand : List AxisConfig -> ConfigurationProperty
coAxisBand =
    AxisBand


{-| Configure the default background color of visualizations.
-}
coBackground : String -> ConfigurationProperty
coBackground =
    Background


{-| Configure the default appearance of bar marks.
-}
coBar : List MarkProperty -> ConfigurationProperty
coBar =
    BarStyle


{-| Configure the default appearance of circle marks.
-}
coCircle : List MarkProperty -> ConfigurationProperty
coCircle =
    CircleStyle


{-| Configure the default title style for count fields.
-}
coCountTitle : String -> ConfigurationProperty
coCountTitle =
    CountTitle


{-| Configure the default title generation style for fields.
-}
coFieldTitle : FieldTitleProperty -> ConfigurationProperty
coFieldTitle =
    FieldTitle


{-| Style in which field names are displayed. The `Verbal` style is 'Sum of field',
'Year of date' etc. The `Function` style is 'SUM(field)', 'YEAR(date)' etc. The
`Plain` style is just the field name without any additional text.
-}
type FieldTitleProperty
    = Verbal
    | Function
    | Plain


{-| Configure the default appearance of geoshape marks.
-}
coGeoshape : List MarkProperty -> ConfigurationProperty
coGeoshape =
    GeoshapeStyle


{-| Configure the default appearance of legends.
-}
coLegend : List LegendConfig -> ConfigurationProperty
coLegend =
    Legend


{-| Configure the default appearance of line marks.
-}
coLine : List MarkProperty -> ConfigurationProperty
coLine =
    LineStyle


{-| Encode a color channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by color. The second is a list of
channels to which this should be added.
-}
color : List MarkChannel -> List LabelledSpec -> List LabelledSpec
color markProps =
    (::) ( "color", List.concatMap markChannelProperty markProps |> JE.object )


{-| Encodes a new facet to be arranged in columns. The first parameter is a list
of properties that define the faceting channel. This should include at least the
name of the data field and its measurement type. The second is a list of channels
to which this is to be added.
-}
column : List FacetChannel -> List LabelledSpec -> List LabelledSpec
column fFields =
    (::) ( "column", JE.object (List.map facetChannelProperty fFields) )


{-| Specify the mapping between a column and its field definitions in a set of
faceted small multiples.
-}
columnBy : List FacetChannel -> FacetMapping
columnBy =
    ColumnBy


{-| Create a list of fields to use in set of repeated small multiples arranged in
columns. The list of fields named here can be referenced in an encoding with
`pRepeat Column`, `mRepeat Column` etc.
-}
columnFields : List String -> RepeatFields
columnFields =
    ColumnFields


{-| Configure the default mark appearance.
-}
coMark : List MarkProperty -> ConfigurationProperty
coMark =
    MarkStyle


{-| Combines a list of labelled specifications that may be passed to JavaScript
for rendering. This is useful when you wish to create a single page with multiple
visulizualizations.

    combineSpecs
        [ ( "vis1", myFirstVis )
        , ( "vis2", mySecondVis )
        , ( "vis3", myOtherVis )
        ]

-}
combineSpecs : List LabelledSpec -> Spec
combineSpecs specs =
    JE.object specs


{-| Configure the default appearance of a named style.
-}
coNamedStyle : String -> List MarkProperty -> ConfigurationProperty
coNamedStyle =
    NamedStyle


{-| Specify a single configuration option to be applied globally across the visualization.
The first parameter identifies the type of configuration, the second a list of previous
configurations to which this may be added.
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
            << configuration (coAxis [ axcoDomainWidth 1 ])
            << configuration (coView [ vicoStroke Nothing ])
            << configuration (coSelection [ ( Single, [ seOn "dblclick" ] ) ])

-}
configure : List LabelledSpec -> ( VLProperty, Spec )
configure configs =
    ( VLConfig, JE.object configs )


{-| Configure the default number formatting for axis and text labels.
-}
coNumberFormat : String -> ConfigurationProperty
coNumberFormat =
    NumberFormat


{-| Configure the default padding in pixels from the edge of the of visualization
to the data rectangle.
-}
coPadding : Padding -> ConfigurationProperty
coPadding =
    Padding


{-| Configure the default appearance of point marks.
-}
coPoint : List MarkProperty -> ConfigurationProperty
coPoint =
    PointStyle


{-| Configure the default style of map projections.
-}
coProjection : List ProjectionProperty -> ConfigurationProperty
coProjection =
    Projection


{-| Configure the default range properties used when scaling.
-}
coRange : List RangeConfig -> ConfigurationProperty
coRange =
    Range


{-| Configure the default appearance of rectangle marks.
-}
coRect : List MarkProperty -> ConfigurationProperty
coRect =
    RectStyle


{-| Configure the default handling of invalid (`null` and `NaN`) values. If `true`,
invalid values are skipped or filtered out when represented as marks.
-}
coRemoveInvalid : Bool -> ConfigurationProperty
coRemoveInvalid =
    RemoveInvalid


{-| Configure the default appearance of rule marks.
-}
coRule : List MarkProperty -> ConfigurationProperty
coRule =
    RuleStyle


{-| Configure the default scale properties used when scaling.
-}
coScale : List ScaleConfig -> ConfigurationProperty
coScale =
    Scale


{-| Configure the default appearance of selection marks.
-}
coSelection : List ( Selection, List SelectionProperty ) -> ConfigurationProperty
coSelection =
    SelectionStyle


{-| Configure the default appearance of square marks.)
-}
coSquare : List MarkProperty -> ConfigurationProperty
coSquare =
    SquareStyle


{-| Configure the default stack offset style for stackable marks.
-}
coStack : StackProperty -> ConfigurationProperty
coStack =
    Stack


{-| Configure the default appearance of text marks.
-}
coText : List MarkProperty -> ConfigurationProperty
coText =
    TextStyle


{-| Configure the default appearance of tick marks.
-}
coTick : List MarkProperty -> ConfigurationProperty
coTick =
    TickStyle


{-| Configure the default style of visualization titles.
-}
coTitle : List TitleConfig -> ConfigurationProperty
coTitle =
    TitleStyle


{-| Configure the default time format for axis and legend labels.
-}
coTimeFormat : String -> ConfigurationProperty
coTimeFormat =
    TimeFormat


{-| Specify the default style of trail marks.

    config =
        configure << coTrail [ maOpacity 0.5, maStrokeDash [ 1, 2 ] ]

-}
coTrail : List MarkProperty -> List LabelledSpec -> List LabelledSpec
coTrail mps =
    (::) (configProperty (TrailStyle mps))


{-| Configure the default single view style.
-}
coView : List ViewConfig -> ConfigurationProperty
coView =
    View


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
projection to use (e.g. `customProjection "winkel3"`).
-}
customProjection : String -> Projection
customProjection =
    Custom


{-| Compute some aggregate summaray statistics for a field to be encoded with a
level of detail (grouping) channel. The type of aggregation is determined by the
given operation parameter.
-}
dAggregate : Operation -> DetailChannel
dAggregate =
    DAggregate


{-| Create a column of data. A column has a name and a list of values. The final
parameter is the list of columns to which this is added.
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


{-| Declare a data source from a list of column values. Each column should contain
values of the same type, but columns each with a different type are permitted.
If columns do not contain the same number of items the dataset will be truncated
to the length of the shortest. A list of field formatting instructions can be
provided as the first parameter or an empty list to use the default formatting.
The columns are most easily generated with [dataColumn](#dataColumn):

    data =
        dataFromColumns [ parse [ ( "Year", foDate "%Y" ) ] ]
            << dataColumn "Animal" (strs [ "Fish", "Dog", "Cat" ])
            << dataColumn "Age" (nums [ 28, 12, 6 ])
            << dataColumn "Year" (strs [ "2010", "2014", "2015" ])

For more complex inline data tables, such as mixures of arrays and objects, consider
using [dataFromJson](#dataFromJson).

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


{-| Declare a data source from a json specification. The most likely use-case is
creating [geojson](http://geojson.org) objects with [`geometry`](#geometry),
[`geometryCollection`](#geometryCollection) and [`geoFeatureCollection`](#geoFeatureCollection).
For more general cases of json creation such as data tables that mix arrays and
objects, consider
[`Json.Encode`](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Json-Encode).

    let
        geojson =
            geometry (geoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []
    in
    toVegaLite
        [ width 200
        , height 200
        , dataFromJson geojson []
        , projection [ prType Orthographic ]
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


{-| Declare a data source from a list of row values. Each row should contain a
list of tuples in the form (_column name_, _value_). Each column can have a value
of a different type but you must ensure that values are of the same type as others
in the same column. A list of field formatting instructions can be provided as
the first parameter or an empty list to use the default formatting. Rows are most
easily generated with [dataRow](#dataRow).

    data =
        dataFromRows [ parse [ ( "Year", foDate "%Y" ) ] ]
            << dataRow [ ( "Animal", str "Fish" ), ( "Age", num 28 ), ( "Year", str "2010" ) ]
            << dataRow [ ( "Animal", str "Dog" ), ( "Age", num 12 ), ( "Year", str "2014" ) ]
            << dataRow [ ( "Animal", str "Cat" ), ( "Age", num 6 ), ( "Year", str "2015" ) ]

Generally, adding data by column is more efficient and less error-prone. For more
complex inline data tables, such as mixures of arrays and objects, consider using
[dataFromJson](#dataFromJson).

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
a specification or one created via the [Vega View API](https://vega.github.io/vega/docs/api/view/#data).
A list of field formatting instructions can be provided as the second parameter
or an empty list to use the default formatting.

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


{-| Declare a data source from a url. The URL can be a local path on a web server
or an external (CORS) URL. A list of field formatting instructions can be provided
as the second parameter or an empty list to use the default formatting.
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


{-| Create a row of data. A row comprises a list of (_columnName_, _value_) pairs.
The final parameter is the list of rows to which this is added.
-}
dataRow : List ( String, DataValue ) -> List DataRow -> List DataRow
dataRow row =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, dataValueSpec val )) row))


{-| Create a dataset comprising a collection of named `Data` items. Each data item
can be created with normal data generating functions such as [dataFromRows](#dataFromRows)
or [dataFromJson](#dataFromJson). These can be later referred to using
[dataFromSource](#dataFromSource).

    import Json.Encode as JE

    let
        data =
            dataFromRows []
                << dataRow [ ( "cat", str "a" ), ( "val", num 10 ) ]
                << dataRow [ ( "cat", str "b" ), ( "val", num 18 ) ]
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


{-| Provide name for a data source. Useful when a specification needs to reference
a data source, such as one generated via an API call.

    data =
        dataFromUrl "myData.json" [] |> dataName "myName"

-}
dataName : String -> Data -> Data
dataName name data =
    let
        extract d =
            case JD.decodeString (JD.keyValuePairs JD.value) (JE.encode 0 d) of
                Ok [ ( dType, value ) ] ->
                    ( dType, value )

                _ ->
                    ( "", d ) |> Debug.log "Non-data spec provided to dataName"

        spec =
            (\( _, dataSpec ) -> extract dataSpec) data
    in
    ( VLData, JE.object [ ( "name", JE.string name ), spec ] )


{-| Discretize numeric values into bins when encoding with a level of detail
(grouping) channel.
-}
dBin : List BinProperty -> DetailChannel
dBin =
    DBin


{-| Provides an optional description to be associated with the visualization.
-}
description : String -> ( VLProperty, Spec )
description s =
    ( VLDescription, JE.string s )


{-| Encode a 'level of detail' channel. This provides a way of grouping by a field
but unlike, say `color`, all groups have the same visual properties. The first
parameter is a list of the field characteristics to be grouped. The second is a
list of channels to which this is to be added.
-}
detail : List DetailChannel -> List LabelledSpec -> List LabelledSpec
detail detailProps =
    (::) ( "detail", List.map detailChannelProperty detailProps |> JE.object )


{-| Provide the name of the field used for encoding with a level of detail
(grouping) channel.
-}
dName : String -> DetailChannel
dName =
    DName


{-| Specify the field type (level of measurement) when encoding with a level of
detail (grouping) channel.
-}
dMType : Measurement -> DetailChannel
dMType =
    DmType


{-| Specify the date-time values that define a scale domain.
-}
doDts : List (List DateTime) -> ScaleDomain
doDts =
    DDateTimes


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


{-| Specify the numeric values that define a scale domain.
-}
doNums : List Float -> ScaleDomain
doNums =
    DNumbers


{-| Specify a scale domain based on a named interactive selection.
-}
doSelection : String -> ScaleDomain
doSelection =
    DSelection


{-| Specify the string values that define a scale domain.
-}
doStrs : List String -> ScaleDomain
doStrs =
    DStrings


{-| Specify a delimited file format (DSV) with a given separator.
-}
dsv : Char -> Format
dsv =
    DSV


{-| Specify a date-time data value. This is used when a function can accept values
of different types.
-}
dt : List DateTime -> DataValue
dt =
    DateTime


{-| Specify a day of the month as an integer. For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtDate : Int -> DateTime
dtDate =
    DTDate


{-| Specify a day of the week. For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtDay : DayName -> DateTime
dtDay =
    DTDay


{-| Specify an hour of the day (0=midnight, 1=1am, 23=11pm etc.) an integer. For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtHour : Int -> DateTime
dtHour =
    DTHours


{-| Specify the form of time unit aggregation of field values when encoding
with a level of detail (grouping) channel.
-}
dTimeUnit : TimeUnit -> DetailChannel
dTimeUnit =
    DTimeUnit


{-| Specify a millisecond of a second (0-999). For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtMillisecond : Int -> DateTime
dtMillisecond =
    DTMilliseconds


{-| Specify a minute of an hour (0-59). For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtMinute : Int -> DateTime
dtMinute =
    DTMinutes


{-| Specify a month as an integer (1=January, 2=February etc.). For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtMonth : MonthName -> DateTime
dtMonth =
    DTMonth


{-| Specify a year quarter as an integer. For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtQuarter : Int -> DateTime
dtQuarter =
    DTQuarter


{-| Specify the min max date-time range to be used in data filtering. If either
parameter is an empty list, it is assumed to be unbounded.
-}
dtRange : List DateTime -> List DateTime -> FilterRange
dtRange =
    DateRange


{-| Specify a list of date-time data values. This is used when a function can
accept lists of different types.
-}
dts : List (List DateTime) -> DataValues
dts =
    DateTimes


{-| Specify a second of a minute (0-59). For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtSecond : Int -> DateTime
dtSecond =
    DTSeconds


{-| Specify a year as an integer. For details, see the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
-}
dtYear : Int -> DateTime
dtYear =
    DTYear


{-| Create an encoding specification from a list of channel encodings.

    enc =
        encoding
            << position X [ pName "Animal", pMType Ordinal ]
            << position Y [ pName "Age", pMType Quantitative ]
            << size [ mName "Population", mMType Quantitative ]

-}
encoding : List LabelledSpec -> ( VLProperty, Spec )
encoding channels =
    ( VLEncoding, JE.object channels )


{-| Specify an [errorband composite mark](https://vega.github.io/vega-lite/docs/errorband.html)
for showing summaries of (error) variation along a signal. By default no border is
drawn. To add a border with default properties add [maBorders](#maBorders) with an empty list.
-}
errorband : List MarkProperty -> ( VLProperty, Spec )
errorband =
    mark Errorband


{-| Specify an [errorbar composite mark](https://vega.github.io/vega-lite/docs/errorbar.html)
for showing summaries of (error) variation along a signal. By default no ticks are
drawn. To add ticks with default properties add [maTicks](#maTicks) with an empty list.
-}
errorbar : List MarkProperty -> ( VLProperty, Spec )
errorbar =
    mark Errorbar


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
        [ facet [ rowBy [ fName "Origin", fMType Nominal ] ]
        , specifcation spec
        ]

-}
facet : List FacetMapping -> ( VLProperty, Spec )
facet fMaps =
    ( VLFacet, JE.object (List.map facetMappingProperty fMaps) )


{-| Compute some aggregate summaray statistics for a field to be encoded with a
facet channel. The type of aggregation is determined by the given operation
parameter.
-}
fAggregate : Operation -> FacetChannel
fAggregate =
    FAggregate


{-| A false value used for functions that can accept a Boolean literal or a
reference to something that generates a Boolean value. This is a convenience
function equivalent to `boo False`
-}
false : DataValue
false =
    Boolean False


{-| Discretize numeric values into bins when encoding with a facet channel.
-}
fBin : List BinProperty -> FacetChannel
fBin =
    FBin


{-| Specify the 'axis' for a series of faceted plots. This is the guide that spans
the collection of faceted plots, each of which may have their own axes.
-}
fHeader : List HeaderProperty -> FacetChannel
fHeader =
    FHeader


{-| Build up a filtering predicate through logical composition (`and`, `or` etc.).
-}
fiCompose : BooleanOp -> Filter
fiCompose =
    FCompose


{-| Filter a data stream so that only data in a given field equal to the given
value are used.
-}
fiEqual : String -> DataValue -> Filter
fiEqual =
    FEqual


{-| Filter a data stream so that only data that satisfy the given predicate
expression are used.
-}
fiExpr : String -> Filter
fiExpr =
    FExpr


{-| Filter a data stream so that only data in a given field greater than the given
value are used.
-}
fiGreaterThan : String -> DataValue -> Filter
fiGreaterThan =
    FGreaterThan


{-| Filter a data stream so that only data in a given field greater than or equal
to the given value are used.
-}
fiGreaterThanEq : String -> DataValue -> Filter
fiGreaterThanEq =
    FGreaterThanEq


{-| Filter a data stream so that only data in a given field less than the given
value are used.
-}
fiLessThan : String -> DataValue -> Filter
fiLessThan =
    FLessThan


{-| Filter a data stream so that only data in a given field less than or equal to
the given value are used.
-}
fiLessThanEq : String -> DataValue -> Filter
fiLessThanEq =
    FLessThanEq


{-| Encode a fill channel. This acts in a similar way to encoding by `color` but
only affects the interior of closed shapes. If both `fill` and `color` encodings
are specified, `fill` takes precedence.
-}
fill : List MarkChannel -> List LabelledSpec -> List LabelledSpec
fill markProps =
    (::) ( "fill", List.concatMap markChannelProperty markProps |> JE.object )


{-| Apply a filter to a channel or field. The first parameter is the filter to apply,
the second a list of transformations to which this is added.
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

        FLessThan field val ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "lt", dataValueSpec val ) ] )

        FLessThanEq field val ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "lte", dataValueSpec val ) ] )

        FGreaterThan field val ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "gt", dataValueSpec val ) ] )

        FGreaterThanEq field val ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "gte", dataValueSpec val ) ] )

        FSelection selName ->
            (::) ( "filter", JE.object [ ( "selection", JE.string selName ) ] )

        FRange field vals ->
            let
                values =
                    case vals of
                        NumberRange mn mx ->
                            JE.list [ JE.float mn, JE.float mx ]

                        DateRange [] [] ->
                            JE.list [ JE.null, JE.null ]

                        DateRange [] dMax ->
                            JE.list [ JE.null, JE.object (List.map dateTimeProperty dMax) ]

                        DateRange dMin [] ->
                            JE.list [ JE.object (List.map dateTimeProperty dMin), JE.null ]

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


{-| Filter a data stream so that only data in a given field contained in the given
list of values are used.
-}
fiOneOf : String -> DataValues -> Filter
fiOneOf =
    FOneOf


{-| Filter a data stream so that only data in a given field that are within the
given range are used.
-}
fiRange : String -> FilterRange -> Filter
fiRange =
    FRange


{-| Filter a data stream so that only data in a given field that are within the
given interactive selection are used.
-}
fiSelection : String -> Filter
fiSelection =
    FSelection


{-| Map array-valued fields to a set of individual data objects, one per array entry.
-}
flatten : List String -> List LabelledSpec -> List LabelledSpec
flatten fs =
    (::) ( "flatten", JE.list (List.map JE.string fs) )


{-| Similar to [flatten](#flatten) but allows the new output fields to be named
(second parameter).
-}
flattenAs : List String -> List String -> List LabelledSpec -> List LabelledSpec
flattenAs fields names =
    (::)
        ( "flattenAs"
        , JE.list
            [ JE.list (List.map JE.string fields)
            , JE.list (List.map JE.string names)
            ]
        )


{-| Provide the name of the field used for encoding with a facet channel.
-}
fName : String -> FacetChannel
fName =
    FName


{-| Specify the field type (level of measurement) when encoding with a facet channel.
-}
fMType : Measurement -> FacetChannel
fMType =
    FmType


{-| Specify a date format for parsing input data using
[D3's formatting specifiers](https://vega.github.io/vega-lite/docs/data.html#format)
or left as an empty string for default formatting. Care should be taken when
assuming default parsing because different browsers can parse dates differently.
Being explicit about the format is usually safer.
-}
foDate : String -> DataType
foDate =
    FoDate


{-| Similar to [foDate](#foDate) but for UTC format dates.
-}
foUtc : String -> DataType
foUtc =
    FoUtc


{-| Specify the form of time unit aggregation of field values when encoding
with a facet channel.
-}
fTimeUnit : TimeUnit -> FacetChannel
fTimeUnit =
    FTimeUnit


{-| Specify a list of geo features to be used in a `geoshape` specification.
Each feature object in this collection can be created with [geometry](#geometry).

    geojson =
        geoFeatureCollection
            [ geometry (geoPolygon [ [ ( -3, 59 ), ( -3, 52 ), ( 4, 52 ), ( -3, 59 ) ] ])
                [ ( "myRegionName", str "Northern region" ) ]
            , geometry (geoPolygon [ [ ( -3, 52 ), ( 4, 52 ), ( 4, 45 ), ( -3, 52 ) ] ])
                [ ( "myRegionName", str "Southern region" ) ]
            ]

-}
geoFeatureCollection : List Spec -> Spec
geoFeatureCollection geoms =
    JE.object
        [ ( "type", JE.string "FeatureCollection" )
        , ( "features", JE.list geoms )
        ]


{-| Specify line geometry for programmatically creating GeoShapes. Equivalent to
the [GeoJson geometry `line` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoLine : List ( Float, Float ) -> Geometry
geoLine =
    GeoLine


{-| Specify multi-line geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-line` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoLines : List (List ( Float, Float )) -> Geometry
geoLines =
    GeoLines


{-| Specify a list of geometry objects to be used in a `geoshape` specification.
Each geometry object with [geometry](#geometry).

    geojson =
        geometryCollection
            [ geometry (geoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []
            , geometry (geoPoint -3.5 55.5) []
            ]

-}
geometryCollection : List Spec -> Spec
geometryCollection geoms =
    JE.object
        [ ( "type", JE.string "GeometryCollection" )
        , ( "geometries", JE.list geoms )
        ]


{-| Specify a geometric object to be used in a `geoshape`. The first parameter is
the geometric type, the second an optional list of properties to be associated
with the object.

      geojson =
          geometry (geoPolygon [ [ ( -3, 59 ), ( 4, 59 ), ( 4, 52 ), ( -3, 59 ) ] ]) []

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


{-| Specify point geometry for programmatically creating GeoShapes. Equivalent to
the [GeoJson geometry `point` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPoint : Float -> Float -> Geometry
geoPoint =
    GeoPoint


{-| Specify multi-point geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-point` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPoints : List ( Float, Float ) -> Geometry
geoPoints =
    GeoPoints


{-| Specify polygon geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPolygon : List (List ( Float, Float )) -> Geometry
geoPolygon =
    GeoPolygon


{-| Specify multi-polygon geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPolygons : List (List (List ( Float, Float ))) -> Geometry
geoPolygons =
    GeoPolygons


{-| Specify a [geoshape](https://vega.github.io/vega-lite/docs/geoshape.html)
determined by georaphically referenced coordinates.
-}
geoshape : List MarkProperty -> ( VLProperty, Spec )
geoshape =
    mark Geoshape


{-| Compute some aggregate summaray statistics for a field to be encoded with a
hyperlink channel. The type of aggregation is determined by the given operation
parameter.
-}
hAggregate : Operation -> HyperlinkChannel
hAggregate =
    HAggregate


{-| Discretize numeric values into bins when encoding with a hyperlink channel.
-}
hBin : List BinProperty -> HyperlinkChannel
hBin =
    HBin


{-| Assigns a list of specifications to be juxtaposed horizontally in a visualization.
-}
hConcat : List Spec -> ( VLProperty, Spec )
hConcat specs =
    ( VLHConcat, JE.list specs )


{-| Specify the properties of a hyperlink channel conditional on some predicate
expression. The first parameter provides the expression to evaluate, the second the encoding
to apply if the expression is true, the third the encoding if the expression is
false.
-}
hDataCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hDataCondition op tCh fCh =
    HDataCondition op tCh fCh


{-| Override the default height of the visualization. If not specified the height
will be calculated based on the content of the visualization.
-}
height : Float -> ( VLProperty, Spec )
height h =
    ( VLHeight, JE.float h )


{-| Specify the field type (level of measurement) when encoding with a hyperlink
channel.
-}
hMType : Measurement -> HyperlinkChannel
hMType =
    HmType


{-| Provide the name of the field used for encoding with a hyperlink channel.
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
-}
hSelectionCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hSelectionCondition op tCh fCh =
    HSelectionCondition op tCh fCh


{-| Provide a literal string value when encoding with a hyperlink channel.
-}
hStr : String -> HyperlinkChannel
hStr =
    HString


{-| Specify the form of time unit aggregation of field values when encoding
with a hyperlink channel.
-}
hTimeUnit : TimeUnit -> HyperlinkChannel
hTimeUnit =
    HTimeUnit


{-| Encode a hyperlink channel. The first parameter is a list of hyperlink channel
properties that characterise the hyperlinking such as the destination URL and cursor
type. The second is a list of encoding channels to which this should be added.
-}
hyperlink : List HyperlinkChannel -> List LabelledSpec -> List LabelledSpec
hyperlink hyperProps =
    (::) ( "href", List.concatMap hyperlinkChannelProperty hyperProps |> JE.object )


{-| Specify a checkbox input element that can bound to a named field value (first
parameter.
-}
iCheckbox : String -> List InputProperty -> Binding
iCheckbox f =
    ICheckbox f


{-| Specify a color input element that can bound to a named field value (first
parameter.
-}
iColor : String -> List InputProperty -> Binding
iColor f =
    IColor f


{-| Specify a date input element that can bound to a named field value (first
parameter.
-}
iDate : String -> List InputProperty -> Binding
iDate f =
    IDate f


{-| Specify a local time input element that can bound to a named field value (first
parameter.
-}
iDateTimeLocal : String -> List InputProperty -> Binding
iDateTimeLocal f =
    IDateTimeLocal f


{-| Specify a month input element that can bound to a named field value (first
parameter.
-}
iMonth : String -> List InputProperty -> Binding
iMonth f =
    IMonth f


{-| Specify the delay in input event handling when processing input events in
order to avoid unnecessary event broadcasting.
-}
inDebounce : Float -> InputProperty
inDebounce =
    Debounce


{-| Specify an optional CSS selector indicating the parent element to which an
input element should be added. This allows the option of the input element to be
outside the visualization container.
-}
inElement : String -> InputProperty
inElement =
    Element


{-| Specify the maximum slider value for a range input element. Defaults to the
larger of the signal value and 100.
-}
inMax : Float -> InputProperty
inMax =
    InMax


{-| Specify the minimum slider value for a range input element. Defaults to the
smaller of the signal value and 0.
-}
inMin : Float -> InputProperty
inMin =
    InMin


{-| Specify a custom label for a radio or select input element.
-}
inName : String -> InputProperty
inName =
    InName


{-| Specify a range of options for a radio or select input element.
-}
inOptions : List String -> InputProperty
inOptions =
    InOptions


{-| Specify the initial placeholding text for input elements such as text fields.
-}
inPlaceholder : String -> InputProperty
inPlaceholder =
    InPlaceholder


{-| Specify the minimum input element range slider increment. If undefined,
the step size will be automatically determined based on the min and max values.
-}
inStep : Float -> InputProperty
inStep =
    InStep


{-| Specify a number input element that can bound to a named field value (first
parameter.
-}
iNumber : String -> List InputProperty -> Binding
iNumber f =
    INumber f


{-| A scaling of the interquartile range to be used as whiskers in a boxplot.
For example a value of 1.5 would extend whiskers to ±1.5x the IQR from the mean.
-}
iqrScale : Float -> SummaryExtent
iqrScale =
    ExIqrScale


{-| Specify a radio box input element that can bound to a named field value (first
parameter.
-}
iRadio : String -> List InputProperty -> Binding
iRadio f =
    IRadio f


{-| Specify a range slider input element that can bound to a named field value (first
parameter.
-}
iRange : String -> List InputProperty -> Binding
iRange f =
    IRange f


{-| Specify a select input element that can bound to a named field value (first
parameter.
-}
iSelect : String -> List InputProperty -> Binding
iSelect f =
    ISelect f


{-| Specify a telephone number input element that can bound to a named field value (first
parameter.
-}
iTel : String -> List InputProperty -> Binding
iTel f =
    ITel f


{-| Specify a text input element that can bound to a named field value (first
parameter.
-}
iText : String -> List InputProperty -> Binding
iText f =
    IText f


{-| Specify a time input element that can bound to a named field value (first
parameter.
-}
iTime : String -> List InputProperty -> Binding
iTime f =
    ITime f


{-| Specify a week input element that can bound to a named field value (first
parameter.
-}
iWeek : String -> List InputProperty -> Binding
iWeek f =
    IWeek f


{-| Specify the property to be extracted from some JSON when it has some
surrounding structure or meta-data. For example, specifying the property
`values.features` is equivalent to retrieving `json.values.features` from the
loaded JSON object with a custom delimiter.
-}
jsonProperty : String -> Format
jsonProperty =
    JSON


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


{-| Specify a default legend corner radius.
-}
lecoCornerRadius : Float -> LegendConfig
lecoCornerRadius =
    CornerRadius


{-| Specify a default spacing between legend items.
-}
lecoEntryPadding : Float -> LegendConfig
lecoEntryPadding =
    EntryPadding


{-| Specify a default background legend color.
-}
lecoFillColor : String -> LegendConfig
lecoFillColor =
    FillColor


{-| Specify a default vertical alignment for labels in a color ramp legend.
-}
lecoGradientLabelBaseline : VAlign -> LegendConfig
lecoGradientLabelBaseline =
    GradientLabelBaseline


{-| Specify a default maximum allowable length for labels in a color ramp legend.
-}
lecoGradientLabelLimit : Float -> LegendConfig
lecoGradientLabelLimit =
    GradientLabelLimit


{-| Specify a default vertical offset in pixel units for labels in a color ramp legend.
-}
lecoGradientLabelOffset : Float -> LegendConfig
lecoGradientLabelOffset =
    GradientLabelOffset


{-| Specify a default color for strokes in a color ramp legend.
-}
lecoGradientStrokeColor : String -> LegendConfig
lecoGradientStrokeColor =
    GradientStrokeColor


{-| Specify a default width for strokes in a color ramp legend.
-}
lecoGradientStrokeWidth : Float -> LegendConfig
lecoGradientStrokeWidth =
    GradientStrokeWidth


{-| Specify a default height of a color ramp legend.
-}
lecoGradientHeight : Float -> LegendConfig
lecoGradientHeight =
    GradientHeight


{-| Specify a default width of a color ramp legend.
-}
lecoGradientWidth : Float -> LegendConfig
lecoGradientWidth =
    GradientWidth


{-| Specify a default horizontal alignment of legend labels.
-}
lecoLabelAlign : HAlign -> LegendConfig
lecoLabelAlign =
    LeLabelAlign


{-| Specify a default vertical alignment of legend labels.
-}
lecoLabelBaseline : VAlign -> LegendConfig
lecoLabelBaseline =
    LeLabelBaseline


{-| Specify a default color for legend labels.
-}
lecoLabelColor : String -> LegendConfig
lecoLabelColor =
    LeLabelColor


{-| Specify a default font for legend labels.
-}
lecoLabelFont : String -> LegendConfig
lecoLabelFont =
    LeLabelFont


{-| Specify a default font size legend labels.
-}
lecoLabelFontSize : Float -> LegendConfig
lecoLabelFontSize =
    LeLabelFontSize


{-| Specify a default maximum width for legend labels in pixel units.
-}
lecoLabelLimit : Float -> LegendConfig
lecoLabelLimit =
    LeLabelLimit


{-| Specify a default offset for legend labels.
-}
lecoLabelOffset : Float -> LegendConfig
lecoLabelOffset =
    LeLabelOffset


{-| Specify a default offset in pixel units between the legend and the enclosing
group or data rectangle.
-}
lecoOffset : Float -> LegendConfig
lecoOffset =
    Offset


{-| Specify a default legend position relative to the main plot content.
-}
lecoOrient : LegendOrientation -> LegendConfig
lecoOrient =
    Orient


{-| Specify a default spacing in pixel units between a legend and axis.
-}
lecoPadding : Float -> LegendConfig
lecoPadding =
    LePadding


{-| Specify whether or not time labels are abbreviated by default in a legend.
-}
lecoShortTimeLabels : Bool -> LegendConfig
lecoShortTimeLabels =
    LeShortTimeLabels


{-| Specify a default legend border color.
-}
lecoStrokeColor : String -> LegendConfig
lecoStrokeColor =
    StrokeColor


{-| Specify a default legend border stroke dash style.
-}
lecoStrokeDash : List Float -> LegendConfig
lecoStrokeDash =
    LeStrokeDash


{-| Specify a default legend border stroke width.
-}
lecoStrokeWidth : Float -> LegendConfig
lecoStrokeWidth =
    LeStrokeWidth


{-| Specify a default legend symbol color.
-}
lecoSymbolColor : String -> LegendConfig
lecoSymbolColor =
    SymbolColor


{-| Specify a default legend symbol type.
-}
lecoSymbolType : Symbol -> LegendConfig
lecoSymbolType =
    SymbolType


{-| Specify a default legend symbol size.
-}
lecoSymbolSize : Float -> LegendConfig
lecoSymbolSize =
    SymbolSize


{-| Specify a default legend symbol stroke width.
-}
lecoSymbolStrokeWidth : Float -> LegendConfig
lecoSymbolStrokeWidth =
    SymbolStrokeWidth


{-| Specify a default horizontal alignment for legend titles.
-}
lecoTitleAlign : HAlign -> LegendConfig
lecoTitleAlign =
    LeTitleAlign


{-| Specify a default vertical alignment for legend titles.
-}
lecoTitleBaseline : VAlign -> LegendConfig
lecoTitleBaseline =
    LeTitleBaseline


{-| Specify a default color legend titles.
-}
lecoTitleColor : String -> LegendConfig
lecoTitleColor =
    LeTitleColor


{-| Specify a default font for legend titles.
-}
lecoTitleFont : String -> LegendConfig
lecoTitleFont =
    LeTitleFont


{-| Specify a default font size for legend titles.
-}
lecoTitleFontSize : Float -> LegendConfig
lecoTitleFontSize =
    LeTitleFontSize


{-| Specify a default font weight for legend titles.
-}
lecoTitleFontWeight : FontWeight -> LegendConfig
lecoTitleFontWeight =
    LeTitleFontWeight


{-| Specify a default maximum size in pixel units for legend titles.
-}
lecoTitleLimit : Float -> LegendConfig
lecoTitleLimit =
    LeTitleLimit


{-| Specify a default spacing in pixel units between title and legend.
-}
lecoTitlePadding : Float -> LegendConfig
lecoTitlePadding =
    LeTitlePadding


{-| Specify a set of legend date-times explicitly.
-}
leDts : List (List DateTime) -> LegendValues
leDts =
    LDateTimes


{-| Specify the formatting pattern for legend labels.
-}
leFormat : String -> LegendProperty
leFormat =
    LFormat


{-| Specify a set of legend numeric values explicitly.
-}
leNums : List Float -> LegendValues
leNums =
    LNumbers


{-| Specify the offset in pixels of a legend from the edge of its enclosing group
/ data rectangle.
-}
leOffset : Float -> LegendProperty
leOffset =
    LOffset


{-| Specify the position of a legend in a scene.
-}
leOrient : LegendOrientation -> LegendProperty
leOrient =
    LOrient


{-| Specify the padding in pixels between a legend and axis.
-}
lePadding : Float -> LegendProperty
lePadding =
    LPadding


{-| Specify a set of legend strings explicitly.
-}
leStrs : List String -> LegendValues
leStrs =
    LStrings


{-| Specify the number of tick marks in a quantitative legend.
-}
leTickCount : Float -> LegendProperty
leTickCount =
    LTickCount


{-| Specify the title of a legend.
-}
leTitle : String -> LegendProperty
leTitle =
    LTitle


{-| Specify the type of legend (discrete symbols or continuous gradients).
-}
leType : Legend -> LegendProperty
leType =
    LType


{-| Specify the legend values explicitly.
-}
leValues : LegendValues -> LegendProperty
leValues =
    LValues


{-| Specify the drawing order of a legend relative to other chart elements. To
place a legend in front of others use a positive integer, or 0 to draw behind.
-}
leZIndex : Int -> LegendProperty
leZIndex =
    LZIndex


{-| Specify a [line mark](https://vega.github.io/vega-lite/docs/line.html) for
symbolising a sequence of values.
-}
line : List MarkProperty -> ( VLProperty, Spec )
line =
    mark Line


{-| Specify the properties of a line marker that is overlaid on an area mark.
-}
lmMarker : List MarkProperty -> LineMarker
lmMarker =
    LMMarker


{-| Perform a lookup of named fields between two data sources. This allows you to
find values in one data source based on the values in another. The first parameter
is the field in the primary data source to act as key, the second is the secondary
data source which can be specified with a call to `dataFromUrl` or other data
generating function. The third is the name of the field in the secondary
data source to match values with the primary key. The fourth parameter is the list
of fields to be stored when the keys match. The final parameter is a list of any
other transformations to which this is to be added.

The following would return the values in the `age` and `height` fields from
`lookup_people.csv` for all rows where the value in the `name` column in that
file matches the value of `person` in the primary data source.

    data =
        dataFromUrl "data/lookup_groups.csv" []

    trans =
        transform
            << lookup "person"
                (dataFromUrl "data/lookup_people.csv" [])
                "name"
                [ "age", "height" ]

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


{-| Similar to [lookup](#lookup) but returns the entire set of field values from
the secondary data source when keys match. Accessed with via name provided in the
fourth parameter.
-}
lookupAs : String -> Data -> String -> String -> List LabelledSpec -> List LabelledSpec
lookupAs key1 ( vlProp, spec ) key2 asName =
    (::)
        ( "lookupAs"
        , JE.list
            [ JE.string key1
            , spec
            , JE.string key2
            , JE.string asName
            ]
        )


{-| Specify the horizontal alignment of a text mark.
-}
maAlign : HAlign -> MarkProperty
maAlign =
    MAlign


{-| Specify the rotation angle in degrees of a text mark.
-}
maAngle : Float -> MarkProperty
maAngle =
    MAngle


{-| Specify the band size in pixels of a bar mark.
-}
maBandSize : Float -> MarkProperty
maBandSize =
    MBandSize


{-| Specify the vertical alignment of a text mark.
-}
maBaseline : VAlign -> MarkProperty
maBaseline =
    MBaseline


{-| Specify the offset between bars for a binned field using a bar mark.
-}
maBinSpacing : Float -> MarkProperty
maBinSpacing =
    MBinSpacing


{-| Specify the border properties for the errorband mark.
-}
maBorders : List MarkProperty -> MarkProperty
maBorders =
    MBorders


{-| Specify whether or not a makr should be clipped to the enclosing group's
dimensions.
-}
maClip : Bool -> MarkProperty
maClip =
    MClip


{-| Specify the default color of a mark. Note that `maFill` and `maStroke` have
higher precedence and will override this if specified.
-}
maColor : String -> MarkProperty
maColor =
    MColor


{-| Specify the cursor to be associated with a hyperlink mark.
-}
maCursor : Cursor -> MarkProperty
maCursor =
    MCursor


{-| Specify the continuous band size in pixels of a bar mark.
-}
maContinuousBandSize : Float -> MarkProperty
maContinuousBandSize =
    MContinuousBandSize


{-| Specify the discrete band size in pixels of a bar mark.
-}
maDiscreteBandSize : Float -> MarkProperty
maDiscreteBandSize =
    MDiscreteBandSize


{-| Specify the horizontal offset in pixels between a text mark and its anchor.
-}
maDx : Float -> MarkProperty
maDx =
    MdX


{-| Specify the vertical offset in pixels between a text mark and its anchor.
-}
maDy : Float -> MarkProperty
maDy =
    MdY


{-| Specify the extent of whiskers used in a boxplot, error bars or error bands.
-}
maExtent : SummaryExtent -> MarkProperty
maExtent =
    MExtent


{-| Specify the default fill color of a mark.
-}
maFill : String -> MarkProperty
maFill =
    MFill


{-| Specify whether or not a mark's color should be used as the fill color
instead of stroke color.
-}
maFilled : Bool -> MarkProperty
maFilled =
    MFilled


{-| Specify the fill opacity of a mark.
-}
maFillOpacity : Float -> MarkProperty
maFillOpacity =
    MFillOpacity


{-| Specify the font of a text mark. This can be any font name made accessible via
a css file (or one of the generic fonts `serif`, `monospace` etc.).
-}
maFont : String -> MarkProperty
maFont =
    MFont


{-| Specify the font size in pixels used by a text mark.
-}
maFontSize : Float -> MarkProperty
maFontSize =
    MFontSize


{-| Specify the font style (e.g. `italic`) used by a text mark.
-}
maFontStyle : String -> MarkProperty
maFontStyle =
    MFontStyle


{-| Specify the font wight used by a text mark.
-}
maFontWeight : FontWeight -> MarkProperty
maFontWeight =
    MFontWeight


{-| Compute some aggregate summaray statistics for a field to be encoded with a
mark property channel. The type of aggregation is determined by the given operation
parameter.
-}
mAggregate : Operation -> MarkChannel
mAggregate =
    MAggregate


{-| Specify the hyperlink to be associated with a mark. When specified, the mark
becomes a clickable hyperlink.
-}
maHRef : String -> MarkProperty
maHRef =
    MHRef


{-| Specify the interpolation method used by line and area marks.
-}
maInterpolate : MarkInterpolation -> MarkProperty
maInterpolate =
    MInterpolate


{-| Specify the appearance of a line marker placed on the vertices of an area mark.
-}
maLine : LineMarker -> MarkProperty
maLine =
    MLine


{-| Specify the overal opacity of a mark in the range 0 to 1.
-}
maOpacity : Float -> MarkProperty
maOpacity =
    MOpacity


{-| Specify the orientation of a non-stacked bar, tick, area or line mark.
-}
maOrient : MarkOrientation -> MarkProperty
maOrient =
    MOrient


{-| Specify the appearance of a point marker placed on the vertices of a line
or area mark.
-}
maPoint : PointMarker -> MarkProperty
maPoint =
    MPoint


{-| Specify the polar coordinate radial offset of a text mark from its origin.
-}
maRadius : Float -> MarkProperty
maRadius =
    MRadius


{-| Specify the rule (main line) properties for the errorbar mark.
-}
maRule : List MarkProperty -> MarkProperty
maRule =
    MRule


{-| Specify the shape of a point mark.
-}
maShape : Symbol -> MarkProperty
maShape =
    MShape


{-| Specify whether or not month and weekday names are abbreviated in a text mark.
-}
maShortTimeLabels : Bool -> MarkProperty
maShortTimeLabels =
    MShortTimeLabels


{-| Specify the size of a mark in square units.
-}
maSize : Float -> MarkProperty
maSize =
    MSize


{-| Specify the default stroke color of a mark.
-}
maStroke : String -> MarkProperty
maStroke =
    MStroke


{-| Specify the cap style of a mark's stroke.
-}
maStrokeCap : StrokeCap -> MarkProperty
maStrokeCap =
    MStrokeCap


{-| Specify the stroke dash style used by a mark. A stroke dash style is determined
by an alternating 'on-off' sequence of line lengths in pixel units.
-}
maStrokeDash : List Float -> MarkProperty
maStrokeDash =
    MStrokeDash


{-| Specify the stroke dash offset used by a mark. This is the number of pixels
before which the first line dash is drawn.
-}
maStrokeDashOffset : Float -> MarkProperty
maStrokeDashOffset =
    MStrokeDashOffset


{-| Specify the line segment join style of a mark's stroke.
-}
maStrokeJoin : StrokeJoin -> MarkProperty
maStrokeJoin =
    MStrokeJoin


{-| Specify the miter limit at which to bevel a join between line segments of a
mark's stroke.
-}
maStrokeMiterLimit : Float -> MarkProperty
maStrokeMiterLimit =
    MStrokeMiterLimit


{-| Specify the stroke opacity of a mark in the range 0 to 1.
-}
maStrokeOpacity : Float -> MarkProperty
maStrokeOpacity =
    MStrokeOpacity


{-| Specify the stroke width of a mark in pixel units.
-}
maStrokeWidth : Float -> MarkProperty
maStrokeWidth =
    MStrokeWidth


{-| Specify the names of custom styles to apply to the mark. Each name should
refer to a named style defined in a separate style configuration.
-}
maStyle : List String -> MarkProperty
maStyle =
    MStyle


{-| Specify the interpolation tension used if interpolating line and area marks.
-}
maTension : Float -> MarkProperty
maTension =
    MTension


{-| Specify the placeholder text for a text mark for when a text channel is not specified.
-}
maText : String -> MarkProperty
maText =
    MText


{-| Specify the polar coordinate angle (clockwise from north in radians) of a
text mark from the origin determined by its x and y properties.
-}
maTheta : Float -> MarkProperty
maTheta =
    MTheta


{-| Specify the thickness of a tick mark.
-}
maThickness : Float -> MarkProperty
maThickness =
    MThickness


{-| Specify the tick properties for the errorbar mark.
-}
maTicks : List MarkProperty -> MarkProperty
maTicks =
    MTicks


{-| Specify the x position offset for a mark.
-}
maXOffset : Float -> MarkProperty
maXOffset =
    MXOffset


{-| Specify the x2 position offset for a mark.
-}
maX2Offset : Float -> MarkProperty
maX2Offset =
    MX2Offset


{-| Specify the y position offset for a mark.
-}
maYOffset : Float -> MarkProperty
maYOffset =
    MYOffset


{-| Specify the y2 position offset for a mark.
-}
maY2Offset : Float -> MarkProperty
maY2Offset =
    MY2Offset


{-| Discretize numeric values into bins when encoding with a mark property channel.
-}
mBin : List BinProperty -> MarkChannel
mBin =
    MBin


{-| Provide a literal Boolean value when encoding with a mark property channel.
-}
mBoo : Bool -> MarkChannel
mBoo =
    MBoolean


{-| Specify the properties of a mark channel conditional on one or more predicate
expressions. The first parameter is a list of tuples each pairing a test condition
with the encoding if that condition evaluates to true. The second is the encoding
if none of the tests are true.

    color
        [ mDataCondition [ ( expr "datum.myField === null", [ mStr "grey" ] ) ]
            [ mStr "black" ]
        ]

-}
mDataCondition : List ( BooleanOp, List MarkChannel ) -> List MarkChannel -> MarkChannel
mDataCondition =
    MDataCondition


{-| Specify the properties of a legend that describes a mark's encoding. To stop
a legend from appearing provide an empty list as a parameter.
-}
mLegend : List LegendProperty -> MarkChannel
mLegend =
    MLegend


{-| Specify the field type (level of measurement) when encoding with a mark
property channel.
-}
mMType : Measurement -> MarkChannel
mMType =
    MmType


{-| Provide the name of the field used for encoding with a mark property channel.
-}
mName : String -> MarkChannel
mName =
    MName


{-| Provide a literal numeric value when encoding with a mark property channel.
-}
mNum : Float -> MarkChannel
mNum =
    MNumber


{-| Provide an SVG path string when encoding with a mark property channel. Useful
when providing custom shapes.
-}
mPath : String -> MarkChannel
mPath =
    MPath


{-| Reference in a mark channel to a field name generated by `repeat`. The
parameter identifies whether fields are to be laid out in columns or rows.
-}
mRepeat : Arrangement -> MarkChannel
mRepeat =
    MRepeat


{-| Specify the scaling applied to a field when encoding with a mark property channel.
The scale will transform a field's value into a color, shape, size etc.
-}
mScale : List ScaleProperty -> MarkChannel
mScale =
    MScale


{-| Specify the properties of a mark channel conditional on interactive selection.
The first parameter is a selection condition to evaluate; the second the encoding
to apply if that selection is true; the third parameter is the encoding if the
selection is false.

    color
        [ mSelectionCondition ( selectionName "myBrush")
            [ mName "myField", mMType Ordinal ]
            [ mStr "grey" ]
        ]

For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.html)

-}
mSelectionCondition : BooleanOp -> List MarkChannel -> List MarkChannel -> MarkChannel
mSelectionCondition =
    MSelectionCondition


{-| Provide a literal string value when encoding with a mark property channel.
-}
mStr : String -> MarkChannel
mStr =
    MString


{-| Specify the form of time unit aggregation of field values when encoding
with a mark property channel.
-}
mTimeUnit : TimeUnit -> MarkChannel
mTimeUnit =
    MTimeUnit


{-| Specify the title of a field when encoding with a mark property channel. If
an axis or legend title is defined, it will override any title defined here.
-}
mTitle : String -> MarkChannel
mTitle =
    MTitle


{-| Provides an optional name to be associated with the visualization.
-}
name : String -> ( VLProperty, Spec )
name s =
    ( VLName, JE.string s )


{-| Apply a negation Boolean operation as part of a logical composition. Boolean
operations can be nested to any level.

    not (and (expr "datum.IMDB_Rating === null") (expr "datum.Rotten_Tomatoes_Rating === null") )

-}
not : BooleanOp -> BooleanOp
not =
    Not


{-| Specify a numeric data value. This is used when a function can accept values
of different types.
-}
num : Float -> DataValue
num =
    Number


{-| Specify the minimum maximum number range to be used in data filtering.
-}
numRange : Float -> Float -> FilterRange
numRange =
    NumberRange


{-| Specify a list of numeric data values. This is used when a function can
accept lists of different types.
-}
nums : List Float -> DataValues
nums =
    Numbers


{-| Compute some aggregate summaray statistics for a field to be encoded with an
order channel. The type of aggregation is determined by the given operation
parameter.
-}
oAggregate : Operation -> OrderChannel
oAggregate =
    OAggregate


{-| Discretize numeric values into bins when encoding with an order channel.
-}
oBin : List BinProperty -> OrderChannel
oBin =
    OBin


{-| Specify the field type (level of measurement) when encoding with an order
channel.
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


{-| Encode an opacity channel.
-}
opacity : List MarkChannel -> List LabelledSpec -> List LabelledSpec
opacity markProps =
    (::) ( "opacity", List.concatMap markChannelProperty markProps |> JE.object )


{-| Create a named aggregation operation on a field that can be added to a transformation.
The first parameter is the aggregation operation to use; the second the name of
the field in which to apply it and the third the name to be given to this transformation.

    trans =
        transform
            << aggregate
                [ opAs Min "people" "lowerBound"
                , opAs Max "people" "upperBound"
                ]
                [ "age" ]

If the operation is `Count`, it does not apply to any specific field, so the second
parameter can be an empty string.

-}
opAs : Operation -> String -> String -> Spec
opAs op field label =
    JE.object
        [ ( "op", JE.string (operationLabel op) )
        , ( "field", JE.string field )
        , ( "as", JE.string label )
        ]


{-| Apply an 'or' Boolean operation as part of a logical composition.
-}
or : BooleanOp -> BooleanOp -> BooleanOp
or op1 op2 =
    Or op1 op2


{-| Encode an order channel. The first parameter is a list of order field definitions
to define the channel. The second is a list of channels to which this is to be added.
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
-}
oSort : List SortProperty -> OrderChannel
oSort =
    OSort


{-| Specify the form of time unit aggregation of field values when encoding
with an order channel.
-}
oTimeUnit : TimeUnit -> OrderChannel
oTimeUnit =
    OTimeUnit


{-| Set the padding around the visualization in pixel units. The way padding is
interpreted will depend on the `autosize` properties.
-}
padding : Padding -> ( VLProperty, Spec )
padding pad =
    ( VLPadding, paddingSpec pad )


{-| Specify padding around a visualization in pixel units. The four parameters
refer to _left_, _top_, _right_, and _bottom_ edges respectively.
-}
paEdges : Float -> Float -> Float -> Float -> Padding
paEdges =
    PEdges


{-| Compute some aggregate summaray statistics for a field to be encoded with a
position channel. The type of aggregation is determined by the given operation
parameter.
-}
pAggregate : Operation -> PositionChannel
pAggregate =
    PAggregate


{-| Specify the parsing rules when processing some data text. The parameter is
a list of tuples in the form (_fieldname_, _datatype_). If an empty list is provided,
type inference is based on the data.
-}
parse : List ( String, DataType ) -> Format
parse =
    Parse


{-| Specify a uniform padding around a visualization in pixel units.
-}
paSize : Float -> Padding
paSize =
    PSize


{-| Specify the axis properties used when encoding with a position channel. To
prevent an axis from appearing, provide an empty list of axis properties.
-}
pAxis : List AxisProperty -> PositionChannel
pAxis =
    PAxis


{-| Discretize numeric values into bins when encoding with a position channel.
-}
pBin : List BinProperty -> PositionChannel
pBin =
    PBin


{-| Set the position to the height of the enclosing data space. Useful for placing
a mark relative to the bottom edge of a view.
-}
pHeight : PositionChannel
pHeight =
    PHeight


{-| Specify the properties of a point marker that is overlaid on a line or area
mark.
-}
pmMarker : List MarkProperty -> PointMarker
pmMarker =
    PMMarker


{-| Specify the field type (level of measurement) when encoding with a position
channel.
-}
pMType : Measurement -> PositionChannel
pMType =
    PmType


{-| Specify a [point mark](https://vega.github.io/vega-lite/docs/point.html) for
symbolising a data point with a symbol.
-}
point : List MarkProperty -> ( VLProperty, Spec )
point =
    mark Point


{-| Encode a position channel. The first parameter identifies the channel,
the second a list of qualifying options. Usually these will include at least the
name of the data field associated with it and its measurement type (either the field
name directly, or a reference to a row / column repeat field). The final parameter
is a list of any previous channels to which this should be added.

      enc =
          encoding
            << position X [ pName "Animal", pMType Ordinal ]

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
-}
pName : String -> PositionChannel
pName =
    PName


{-| Specify a projection’s center as longitude and latitude in degrees. The default
value is `0,0`.
-}
prCenter : Float -> Float -> ProjectionProperty
prCenter =
    PCenter


{-| Specify a projection’s clipping circle radius to the specified angle in degrees.
A value of `Nothing` will switch to antimeridian cutting rather than small-circle
clipping.
-}
prClipAngle : Maybe Float -> ProjectionProperty
prClipAngle =
    PClipAngle


{-| Specify a projection’s viewport clip extent to the specified bounds in pixels.
-}
prClipExtent : ClipRect -> ProjectionProperty
prClipExtent =
    PClipExtent


{-| Specify a 'Hammer' map projection coefficient.
-}
prCoefficient : Float -> ProjectionProperty
prCoefficient =
    PCoefficient


{-| Specify a 'Satellite' map projection distance.
-}
prDistance : Float -> ProjectionProperty
prDistance =
    PDistance


{-| Provide the name of the fields from a repeat operator used for encoding
with a position channel.
-}
pRepeat : Arrangement -> PositionChannel
pRepeat =
    PRepeat


{-| Specify a `Bottomley` map projection fraction.
-}
prFraction : Float -> ProjectionProperty
prFraction =
    PFraction


{-| Specify the number of lobes in lobed map projections such as the 'Berghaus star'.
-}
prLobes : Int -> ProjectionProperty
prLobes =
    PLobes


{-| Specify a parallel for map projections such as the 'Armadillo'.
-}
prParallel : Float -> ProjectionProperty
prParallel =
    PParallel


{-| Specify a threshold for the projection’s adaptive resampling in pixels.
Corresponds to the Douglas–Peucker distance. If precision is not specified, the
projection’s current resampling precision which defaults to √0.5 ≅ 0.70710 is used.
-}
prPrecision : Float -> ProjectionProperty
prPrecision =
    PPrecision


{-| Specify a radius value for map projections such as the 'Gingery'.
-}
prRadius : Float -> ProjectionProperty
prRadius =
    PRadius


{-| Specify a ratio value for map projections such as the 'Hill'.
-}
prRatio : Float -> ProjectionProperty
prRatio =
    PRatio


{-| Sets the cartographic projection used for geospatial coordinates. A projection
defines the mapping from _(longitude, latitude)_ to an _(x, y)_ plane used for rendering.
Useful when using [geoshape](#geoshape).
-}
projection : List ProjectionProperty -> ( VLProperty, Spec )
projection pProps =
    ( VLProjection, JE.object (List.map projectionProperty pProps) )


{-| Specify a projection’s three-axis rotation angle. This should be in order
_lambda phi gamma_ specifying the rotation angles in degrees about each
spherical axis (corresponding to yaw, pitch and roll.).
-}
prRotate : Float -> Float -> Float -> ProjectionProperty
prRotate =
    PRotate


{-| Specify a spacing value for map projections such as the 'Lagrange'.
-}
prSpacing : Float -> ProjectionProperty
prSpacing =
    PSpacing


{-| Specify a 'Satellite' map projection tilt.
-}
prTilt : Float -> ProjectionProperty
prTilt =
    PTilt


{-| Specify the type of global map projection.
-}
prType : Projection -> ProjectionProperty
prType =
    PType


{-| Specify the scaling applied to a field when encoding with a position channel.
The scale will transform a field's value into a position along one axis.
-}
pScale : List ScaleProperty -> PositionChannel
pScale =
    PScale


{-| Specify the sort order for field when encoding with a position channel.
-}
pSort : List SortProperty -> PositionChannel
pSort =
    PSort


{-| Specify the type of stacking offset for field when encoding with a position
channel.
-}
pStack : StackProperty -> PositionChannel
pStack =
    PStack


{-| Specify the form of time unit aggregation of field values when encoding
with a position channel.
-}
pTimeUnit : TimeUnit -> PositionChannel
pTimeUnit =
    PTimeUnit


{-| Specify the title of a field when encoding with a position channel. If an axis
title is defined, it will override any title defined here.
-}
pTitle : String -> PositionChannel
pTitle =
    PTitle


{-| Set the position to the width of the enclosing data space. Useful for justifying
a mark to the right hand edge of a view. For example to position a mark at the
right of the data rectangle:

    enc =
        encoding
            << position X [ pWidth ]

-}
pWidth : PositionChannel
pWidth =
    PWidth


{-| Specify the default color scheme for categorical ranges.
-}
racoCategory : String -> RangeConfig
racoCategory =
    RCategory


{-| Specify the default diverging color scheme.
-}
racoDiverging : String -> RangeConfig
racoDiverging =
    RDiverging


{-| Specify the default 'heatmap' color scheme.
-}
racoHeatmap : String -> RangeConfig
racoHeatmap =
    RHeatmap


{-| Specify the default ordinal color scheme.
-}
racoOrdinal : String -> RangeConfig
racoOrdinal =
    ROrdinal


{-| Specify the default ramp (contnuous) color scheme.
-}
racoRamp : String -> RangeConfig
racoRamp =
    RRamp


{-| Specify the default color scheme symbols.
-}
racoSymbol : String -> RangeConfig
racoSymbol =
    RSymbol


{-| Specify the name of a pre-defined scale range (e.g. `symbol` or `diverging`).
-}
raName : String -> ScaleRange
raName =
    RName


{-| Specify a numeric scale range. Depending on the scaling this may be a min,max
pair, or a list of explicit numerical values.
-}
raNums : List Float -> ScaleRange
raNums =
    RNumbers


{-| Specify a text scale range for discrete scales.
-}
raStrs : List String -> ScaleRange
raStrs =
    RStrings


{-| Specify a [rectangle mark](https://vega.github.io/vega-lite/docs/rect.html).
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
        [ repeat [ columnFields [ "Cat", "Dog", "Fish" ] ]
        , specification (asSpec spec)
        ]

-}
repeat : List RepeatFields -> ( VLProperty, Spec )
repeat fields =
    ( VLRepeat, JE.object (List.map repeatFieldsProperty fields) )


{-| Define a single resolution option to be applied when scales, axes or legends
in composite views share channel encodings. This allows, for example, two different
color encodings to be created in a layered view, which would otherwise share color
channels between layers. Each resolution rule should be in a tuple pairing the channel
to which it applies and the rule type. The first parameter identifies the type of
resolution, the second a list of resolutions to which this may be added.

    resolve
        << resolution (reScale [ ( ChY, Independent ) ])

-}
resolution : Resolve -> List LabelledSpec -> List LabelledSpec
resolution res =
    (::) (resolveProperty res)


{-| Determine whether scales, axes or legends in composite views should share channel
encodings.
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
of any channels to which this is to be added.
-}
row : List FacetChannel -> List LabelledSpec -> List LabelledSpec
row fFields =
    (::) ( "row", JE.object (List.map facetChannelProperty fFields) )


{-| Specify the mapping between a row and its field definitions in a set of
faceted small multiples.
-}
rowBy : List FacetChannel -> FacetMapping
rowBy =
    RowBy


{-| Create a list of fields to use in set of repeated small multiples arranged in
rows. The list of fields named here can be referenced in an encoding with
`pRepeat Row`, `mRepeat Row` etc.
-}
rowFields : List String -> RepeatFields
rowFields =
    RowFields


{-| Specify a [rule line](https://vega.github.io/vega-lite/docs/rule.html) connecting
two vertices. Can be used to span either the entire width or height of a view, or
to connect two arbitrary positions.
-}
rule : List MarkProperty -> ( VLProperty, Spec )
rule =
    mark Rule


{-| Specify the default inner padding for x and y band-ordinal scales.
-}
sacoBandPaddingInner : Float -> ScaleConfig
sacoBandPaddingInner =
    SCBandPaddingInner


{-| Specify the default outer padding for x and y band-ordinal scales.
-}
sacoBandPaddingOuter : Float -> ScaleConfig
sacoBandPaddingOuter =
    SCBandPaddingOuter


{-| Specify whether or not by default values that exceed the data domain are
clamped to the min/max range value.
-}
sacoClamp : Bool -> ScaleConfig
sacoClamp =
    SCClamp


{-| Specify the default maximum value for mapping quantitative fields to a bar's
size/bandSize.
-}
sacoMaxBandSize : Float -> ScaleConfig
sacoMaxBandSize =
    SCMaxBandSize


{-| Specify the default maximum value for mapping a quantitative field to a text
mark's size.
-}
sacoMaxFontSize : Float -> ScaleConfig
sacoMaxFontSize =
    SCMaxFontSize


{-| Specify the default maximum opacity (in the range [0, 1]) for mapping a field
to opacity.
-}
sacoMaxOpacity : Float -> ScaleConfig
sacoMaxOpacity =
    SCMaxOpacity


{-| Specify the default maximum size for point-based scales.
-}
sacoMaxSize : Float -> ScaleConfig
sacoMaxSize =
    SCMaxSize


{-| Specify the default maximum stroke width for rule, line and trail marks.
-}
sacoMaxStrokeWidth : Float -> ScaleConfig
sacoMaxStrokeWidth =
    SCMaxStrokeWidth


{-| Specify the default minimum value for mapping quantitative fields to a bar's
size/bandSize.
-}
sacoMinBandSize : Float -> ScaleConfig
sacoMinBandSize =
    SCMinBandSize


{-| Specify the default minimum value for mapping a quantitative field to a text
mark's size.
-}
sacoMinFontSize : Float -> ScaleConfig
sacoMinFontSize =
    SCMinFontSize


{-| Specify the default minimum opacity (in the range [0, 1]) for mapping a field
to opacity.
-}
sacoMinOpacity : Float -> ScaleConfig
sacoMinOpacity =
    SCMinOpacity


{-| Specify the default minimum size for point-based scales (when not forced to
start at zero).
-}
sacoMinSize : Float -> ScaleConfig
sacoMinSize =
    SCMinSize


{-| Specify the default minimum stroke width for rule, line and trail marks.
-}
sacoMinStrokeWidth : Float -> ScaleConfig
sacoMinStrokeWidth =
    SCMinStrokeWidth


{-| Specify the default padding for point-ordinal scales.
-}
sacoPointPadding : Float -> ScaleConfig
sacoPointPadding =
    SCPointPadding


{-| Specify the default range step for band and point scales when the mark is
not text.
-}
sacoRangeStep : Maybe Float -> ScaleConfig
sacoRangeStep =
    SCRangeStep


{-| Specify whether or not by default numeric values are rounded to integers
when scaling. Useful for snapping to the pixel grid.
-}
sacoRound : Bool -> ScaleConfig
sacoRound =
    SCRound


{-| Specify the default range step for x band and point scales of text marks.
-}
sacoTextXRangeStep : Float -> ScaleConfig
sacoTextXRangeStep =
    SCTextXRangeStep


{-| Specify whether or not to use the source data range before aggregation.
-}
sacoUseUnaggregatedDomain : Bool -> ScaleConfig
sacoUseUnaggregatedDomain =
    SCUseUnaggregatedDomain


{-| Specify that when scaling, values outside the data domain are clamped to the
minimum or maximum value.
-}
scClamp : Bool -> ScaleProperty
scClamp =
    SClamp


{-| Specify a custom scaling domain.
-}
scDomain : ScaleDomain -> ScaleProperty
scDomain =
    SDomain


{-| Specify an interpolation method for scaling range values.
-}
scInterpolate : CInterpolate -> ScaleProperty
scInterpolate =
    SInterpolate


{-| Specify 'nice' minimum and maximum values in a scaling (e.g. multiples of 10).
-}
scNice : ScaleNice -> ScaleProperty
scNice =
    SNice


{-| Specify the 'nice' temporal interval values when scaling.
-}
scNiceInterval : TimeUnit -> Int -> ScaleNice
scNiceInterval =
    NInterval


{-| Specify the desired number of tick marks in a 'nice' scaling.
-}
scNiceTickCount : Int -> ScaleNice
scNiceTickCount =
    NTickCount


{-| Specify the padding in pixels to apply to a scaling.
-}
scPadding : Float -> ScaleProperty
scPadding =
    SPadding


{-| Specify the inner padding in pixels to apply to a band scaling.
-}
scPaddingInner : Float -> ScaleProperty
scPaddingInner =
    SPaddingInner


{-| Specify the outer padding in pixels to apply to a band scaling.
-}
scPaddingOuter : Float -> ScaleProperty
scPaddingOuter =
    SPaddingOuter


{-| Specify the range of a scaling. The type of range depends on the encoding
channel.
-}
scRange : ScaleRange -> ScaleProperty
scRange =
    SRange


{-| Specify the distance in pixels between the starts of adjacent bands in a band
scaling. If `Nothing` is provided the distance is determined automatically.
-}
scRangeStep : Maybe Float -> ScaleProperty
scRangeStep =
    SRangeStep


{-| Reverse the order of a scaling.
-}
scReverse : Bool -> ScaleProperty
scReverse =
    SReverse


{-| Specify whether or not numeric values in a scaling are rounded to integers.
-}
scRound : Bool -> ScaleProperty
scRound =
    SRound


{-| Specify the color scheme used by a color scaling.
-}
scScheme : String -> List Float -> ScaleProperty
scScheme name =
    SScheme name


{-| Specify the type of scaling to apply.
-}
scType : Scale -> ScaleProperty
scType =
    SType


{-| Specify whether or not a numeric scaling should be forced to include a zero
value.
-}
scZero : Bool -> ScaleProperty
scZero =
    SZero


{-| Specify a binding to some input elements as part of a named selection.
-}
seBind : List Binding -> SelectionProperty
seBind =
    Bind


{-| Specify a encoding channels that form a named selection.
-}
seEncodings : List Channel -> SelectionProperty
seEncodings =
    Encodings


{-| Specify the field names for projecting a selection.
-}
seFields : List String -> SelectionProperty
seFields =
    Fields


{-| Create a single named selection that may be applied to a data query or transformation.
The first two parameters specify the name to be given to the selection for later
reference and the type of selection made. The third allows additional selection options to
be specified. The fourth is a list of selections to which this is added.
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


{-| Create a full selection specification from a list of selections.

    sel =
        selection
            << select "view" Interval [ BindScales ] []
            << select "myBrush" Interval []
            << select "myPaintbrush" Multi [ On "mouseover", Nearest True ]

-}
selection : List LabelledSpec -> ( VLProperty, Spec )
selection sels =
    ( VLSelection, JE.object sels )


{-| Provide the name of a selection that is used as part of a conditional encoding.

    color
        [ mSelectionCondition ( selectionName "myBrush" )
            [ mName "myField", mMType Nominal ]
            [ mStr "grey" ]
        ]

-}
selectionName : String -> BooleanOp
selectionName =
    SelectionName


{-| Specify whether or not a selection should capture nearest marks to a pointer
rather than an exact position match. This allows 'accelerated' selection for
discrete marks.
-}
seNearest : Bool -> SelectionProperty
seNearest =
    Nearest


{-| Specify a [Vega event stream](https://vega.github.io/vega/docs/event-streams)
that triggers a selection.
-}
seOn : String -> SelectionProperty
seOn =
    On


{-| Specify a strategy that determines how selections’ data queries are resolved
when applied in a filter transform, conditional encoding rule, or scale domain.
-}
seResolve : SelectionResolution -> SelectionProperty
seResolve =
    ResolveSelections


{-| Specify the appearance of an interval selection mark (dragged rectangle).
-}
seSelectionMark : List SelectionMarkProperty -> SelectionProperty
seSelectionMark =
    SelectionMark


{-| Specify a predicate expression that determines a toggled selection.
See the
[Vega-Lite toggle documentation](https://vega.github.io/vega-lite/docs/toggle.html)
-}
seToggle : String -> SelectionProperty
seToggle =
    Toggle


{-| Specify a translation selection transformation used for panning a view.
See the
[Vega-Lite translate documentation](https://vega.github.io/vega-lite/docs/translate.html)
-}
seTranslate : String -> SelectionProperty
seTranslate =
    Translate


{-| Specify a zooming selection transformation used for zooming a view.
See the
[Vega-Lite zoom documentation](https://vega.github.io/vega-lite/docs/zoom.html)
-}
seZoom : String -> SelectionProperty
seZoom =
    Zoom


{-| Encode a shape channel.
-}
shape : List MarkChannel -> List LabelledSpec -> List LabelledSpec
shape markProps =
    (::) ( "shape", List.concatMap markChannelProperty markProps |> JE.object )


{-| Encode a size channel. The first parameter is a list of mark channel properties
that characterise the way a data field is encoded by size. The second is a list of
channels to which this should be added.
-}
size : List MarkChannel -> List LabelledSpec -> List LabelledSpec
size markProps =
    (::) ( "size", List.concatMap markChannelProperty markProps |> JE.object )


{-| Specify the fill color of the interval selection mark (dragged rectangular area).
-}
smFill : String -> SelectionMarkProperty
smFill =
    SMFill


{-| Specify the fill opacity of the interval selection mark (dragged rectangular area)
in the range [0, 1].
-}
smFillOpacity : Float -> SelectionMarkProperty
smFillOpacity =
    SMFillOpacity


{-| Specify the stroke color of the interval selection mark (dragged rectangular area).
-}
smStroke : String -> SelectionMarkProperty
smStroke =
    SMStroke


{-| Specify the stroke opacity of the interval selection mark (dragged rectangular
area) in the range [0, 1].
-}
smStrokeOpacity : Float -> SelectionMarkProperty
smStrokeOpacity =
    SMStrokeOpacity


{-| Specify the stroke width of the interval selection mark (dragged rectangular
area).
-}
smStrokeWidth : Float -> SelectionMarkProperty
smStrokeWidth =
    SMStrokeWidth


{-| Specify the stroke dash style of the interval selection mark (dragged
rectangular area).
-}
smStrokeDash : List Float -> SelectionMarkProperty
smStrokeDash =
    SMStrokeDash


{-| Specify the stroke dash offset of the interval selection mark (dragged
rectangular area).
-}
smStrokeDashOffset : Float -> SelectionMarkProperty
smStrokeDashOffset =
    SMStrokeDashOffset


{-| Specify a sorting by the aggregated summary of a given field using a given
aggregation operation. For example, the following sorts the categorical data
field `variety` by the mean age of the data in each variety category.

    position Y [ pName "variety"
               , pMType Ordinal
               , pSort [ soByField "age" Mean, Descending ]
               ]

-}
soByField : String -> Operation -> SortProperty
soByField =
    ByFieldOp


{-| Specify a sorting by the aggregated summaries of the given fields (referenced
by a repeat iteration) using a given aggregation operation.
-}
soByRepeat : Arrangement -> Operation -> SortProperty
soByRepeat =
    ByRepeatOp


{-| Provide a custom sort order by listing data values explicitly. This can be
used in place of lists of [SortProperty](#SortProperty).
-}
soCustom : DataValues -> SortProperty
soCustom =
    CustomSort


{-| Specify the spacing between sub-views in a composition operator. This version
sets the same spacing (in pixel units) for rows and columns.
-}
spacing : Float -> ( VLProperty, Spec )
spacing sp =
    ( VLSpacing, JE.float sp )


{-| Similar to [spacing](#spacing) but with independent spacing for rows (first
parameter) and columns (second parameter).
-}
spacingRC : Float -> Float -> ( VLProperty, Spec )
spacingRC spRow spCol =
    ( VLSpacing, JE.object [ ( "row", JE.float spRow ), ( "col", JE.float spCol ) ] )


{-| Defines a specification object for use with faceted and repeated small multiples.

    spec = ...
    toVegaLite
        [ facet [ rowBy [ fName "Origin", fMType Nominal ] ]
        , specifcation spec
        ]

-}
specification : Spec -> ( VLProperty, Spec )
specification spec =
    ( VLSpec, spec )


{-| Specify a [square mark](https://vega.github.io/vega-lite/docs/square.html) for
symbolising points.
-}
square : List MarkProperty -> ( VLProperty, Spec )
square =
    mark Square


{-| Specify a string data value. This is used when a function can accept values
of different types.
-}
str : String -> DataValue
str =
    Str


{-| Encode a stroke channel. This acts in a similar way to encoding by `color` but
only affects the exterior boundary of marks. If both `stroke` and `color` encodings
are specified, `stroke` takes precedence.
-}
stroke : List MarkChannel -> List LabelledSpec -> List LabelledSpec
stroke markProps =
    (::) ( "stroke", List.concatMap markChannelProperty markProps |> JE.object )


strokeCapLabel : StrokeCap -> String
strokeCapLabel cap =
    case cap of
        CButt ->
            "butt"

        CRound ->
            "round"

        CSquare ->
            "square"


strokeJoinLabel : StrokeJoin -> String
strokeJoinLabel jn =
    case jn of
        JMiter ->
            "miter"

        JRound ->
            "round"

        JBevel ->
            "bevel"


{-| Specify a string data value. This is used when a function can accept values
of different types.
-}
strs : List String -> DataValues
strs =
    Strings


{-| Specify a custom symbol shape with an
[SVG path description](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
-}
symbolPath : String -> Symbol
symbolPath =
    Path


{-| Compute some aggregate summaray statistics for a field to be encoded with a
text channel. The type of aggregation is determined by the given operation
parameter.
-}
tAggregate : Operation -> TextChannel
tAggregate =
    TAggregate


{-| Discretize numeric values into bins when encoding with a text channel.
-}
tBin : List BinProperty -> TextChannel
tBin =
    TBin


{-| Specify the properties of a text channel conditional on one or more predicate
expressions. The first parameter is a list of tuples each pairing an expression to
evaluate with the encoding if that expression is true. The second is the encoding
if none of the expressions are evaluated as true.
-}
tDataCondition : List ( BooleanOp, List TextChannel ) -> List TextChannel -> TextChannel
tDataCondition =
    TDataCondition


{-| Encode a text channel.
-}
text : List TextChannel -> List LabelledSpec -> List LabelledSpec
text tDefs =
    (::) ( "text", List.concatMap textChannelProperty tDefs |> JE.object )


{-| Specify a [text mark](https://vega.github.io/vega-lite/docs/text.html) to be
displayed at some point location.
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


{-| Specify a short line ([tick](https://vega.github.io/vega-lite/docs/tick.html))
mark for symbolising point locations.
-}
tick : List MarkProperty -> ( VLProperty, Spec )
tick =
    mark Tick


{-| Specify the default anchor position when placing titles.
-}
ticoAnchor : APosition -> TitleConfig
ticoAnchor =
    TAnchor


{-| Anchor position for some text.
-}
type APosition
    = AStart
    | AMiddle
    | AEnd


{-| Specify the default angle when orientating titles.
-}
ticoAngle : Float -> TitleConfig
ticoAngle =
    TAngle


{-| Specify the default vertical alignment when placing titles.
-}
ticoBaseline : VAlign -> TitleConfig
ticoBaseline =
    TBaseline


{-| Specify the default color when showing titles.
-}
ticoColor : String -> TitleConfig
ticoColor =
    TColor


{-| Specify the default font when showing titles.
-}
ticoFont : String -> TitleConfig
ticoFont =
    TFont


{-| Specify the default font size when showing titles.
-}
ticoFontSize : Float -> TitleConfig
ticoFontSize =
    TFontSize


{-| Specify the default font weight when showing titles.
-}
ticoFontWeight : FontWeight -> TitleConfig
ticoFontWeight =
    TFontWeight


{-| Specify the default maximim length in pixel units when showing titles.
-}
ticoLimit : Float -> TitleConfig
ticoLimit =
    TLimit


{-| Specify the default offset in pixel units of titles relative to the chart body.
-}
ticoOffset : Float -> TitleConfig
ticoOffset =
    TOffset


{-| Specify the default placement of titles relative to the chart body.
-}
ticoOrient : Side -> TitleConfig
ticoOrient =
    TOrient


{-| Create a new data field based on the given temporal binning. Unlike the
direct encoding binning, this transformation is named and so can be referred
to in multiple encodings. The first parameter is the 'width' of each temporal bin,
the second is the field to bin and the third is name to give the newly binned
field. The third is a list of transformations to which this is added.

It is usually easer to apply temporal binning directly as part of the encoding
as this will automatically format the temporal axis. See the

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
-}
title : String -> ( VLProperty, Spec )
title s =
    ( VLTitle, JE.string s )


{-| Specify the field type (level of measurement) when encoding with a text
channel.
-}
tMType : Measurement -> TextChannel
tMType =
    TmType


{-| Provide the name of the field used for encoding with a text channel.
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


{-| Encode a tooltip channel. To encode multiple tooltip values with a mark, use
[tooltips](#tooltips).
-}
tooltip : List TextChannel -> List LabelledSpec -> List LabelledSpec
tooltip tDefs =
    (::) ( "tooltip", JE.object (List.concatMap textChannelProperty tDefs) )


{-| Encode a tooltip channel with multiple tooltips. The first parameter is a
list of the multiple tooltips, each of which is a list of text channel properties
that define the channel. The second is a list of channels to which this is to be added.
-}
tooltips : List (List TextChannel) -> List LabelledSpec -> List LabelledSpec
tooltips tDefss =
    (::) ( "tooltip", JE.list (List.map (\tDefs -> JE.object (List.concatMap textChannelProperty tDefs)) tDefss) )


{-| Specify a topoJSON feature format extracting the object with the given name.
-}
topojsonFeature : String -> Format
topojsonFeature =
    TopojsonFeature


{-| Specify a topoJSON mesh format extracting the object with the given name.
Unlike the `topojsonFeature`, the corresponding geo data are returned as a single
unified mesh, not as individual GeoJSON features.
-}
topojsonMesh : String -> Format
topojsonMesh =
    TopojsonMesh


{-| Convert a list of Vega-Lite specifications into a single JSON object that may be
passed to Vega-Lite for graphics generation. Commonly these will include at least
data, mark and encoding specifications.

While simple functions like `bar` may be provided directly, it is usually clearer
to label more complex ones such as encodings as separate expressions.

Specifications can be built up by chaining functions such as `dataColumn` or
`position`. Functional composition using the `<<` operator allows this to be done
compactly.

    let
        data =
            dataFromColumns []
                << dataColumn "a" (strs [ "C", "C", "D", "E" ])
                << dataColumn "b" (nums [ 2, 7, 1, 2 ])

        enc =
            encoding
                << position X [ pName "a", pMType Nominal ]
                << position Y [ pName "b", pMType Quantitative, pAggregate Mean ]
    in
    toVegaLite [ data [], bar [], enc [] ]

-}
toVegaLite : List ( VLProperty, Spec ) -> Spec
toVegaLite spec =
    ( "$schema", JE.string "https://vega.github.io/schema/vega-lite/v3.json" )
        :: List.map (\( s, v ) -> ( vlPropertyLabel s, v )) spec
        |> JE.object


{-| Specify a [trail mark](https://vega.github.io/vega-lite/docs/trail.html) (line
with variable width along its length).
-}
trail : List MarkProperty -> ( VLProperty, Spec )
trail =
    mark Trail


{-| Create a single transform from a list of transformation specifications. The
order of transformations can be important, e.g. labels created with [calculateAs](#calculateas),
[timeUnitAs](#timeUnitAs) and [binAs](#binAs) that are used in other transformations.
Using the functional composition pipeline idiom (as example below) allows you to
provide the transformations in the order intended in a clear manner.

    trans =
        transform
            << filter (fiExpr "datum.year == 2010")
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

                "flattenAs" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ fields, names ] ->
                            JE.object
                                [ ( "flatten", fields )
                                , ( "as", names )
                                ]

                        _ ->
                            JE.null

                "timeUnit" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ tu, field, label ] ->
                            JE.object [ ( "timeUnit", tu ), ( "field", field ), ( "as", label ) ]

                        _ ->
                            JE.null

                "windowAs" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ winObj, frameObj, peersObj, groupbyObj, sortObj ] ->
                            ([ ( "window", JE.list [ winObj ] ) ]
                                ++ (if frameObj == JE.null then
                                        []
                                    else
                                        [ ( "frame", frameObj ) ]
                                   )
                                ++ (if peersObj == JE.null then
                                        []
                                    else
                                        [ ( "ignorePeers", peersObj ) ]
                                   )
                                ++ (if groupbyObj == JE.null then
                                        []
                                    else
                                        [ ( "groupby", groupbyObj ) ]
                                   )
                                ++ (if sortObj == JE.null then
                                        []
                                    else
                                        [ ( "sort", sortObj ) ]
                                   )
                            )
                                |> JE.object

                        _ ->
                            JE.null

                _ ->
                    JE.object [ ( str, val ) ]
    in
    if List.isEmpty transforms then
        ( VLTransform, JE.null )
    else
        ( VLTransform, JE.list (List.map assemble transforms) )


{-| A true value used for functions that can accept a Boolean literal or a
reference to something that generates a Boolean value. This is a convenience
function equivalent to `boo True`
-}
true : DataValue
true =
    Boolean True


{-| Specify the properties of a text channel conditional on interactive selection.
The first parameter is a selection condition to evaluate; the second the encoding
to apply if that selection is true; the third parameter is the encoding if the
selection is false.
-}
tSelectionCondition : BooleanOp -> List TextChannel -> List TextChannel -> TextChannel
tSelectionCondition =
    TSelectionCondition


{-| Specify the form of time unit aggregation of field values when encoding with
a text channel.
-}
tTimeUnit : TimeUnit -> TextChannel
tTimeUnit =
    TTimeUnit


{-| Specify the title of a field when encoding with a text or tooltip channel.
If an axis or legend title is defined, it will override any title defined
here.
-}
tTitle : String -> TextChannel
tTitle =
    TTitle


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
-}
vConcat : List Spec -> ( VLProperty, Spec )
vConcat specs =
    ( VLVConcat, JE.list specs )


{-| Specify whether or not by default single views should be clipped.
-}
vicoClip : Bool -> ViewConfig
vicoClip =
    Clip


{-| Specify the default fill color for single views.
-}
vicoFill : Maybe String -> ViewConfig
vicoFill =
    Fill


{-| Specify the default fill opacity for single views.
-}
vicoFillOpacity : Float -> ViewConfig
vicoFillOpacity =
    FillOpacity


{-| Specify the default height of single views (e.g. each view in a trellis plot).
-}
vicoHeight : Float -> ViewConfig
vicoHeight =
    ViewHeight


{-| Specify the default stroke color for single views. If `Nothing` is provided,
no strokes are drawn around the view.
-}
vicoStroke : Maybe String -> ViewConfig
vicoStroke =
    Stroke


{-| Specify the default stroke dash style for single views.
-}
vicoStrokeDash : List Float -> ViewConfig
vicoStrokeDash =
    StrokeDash


{-| Specify the default stroke dash offset for single views.
-}
vicoStrokeDashOffset : Float -> ViewConfig
vicoStrokeDashOffset =
    StrokeDashOffset


{-| Specify the default stroke opacity for single views.
-}
vicoStrokeOpacity : Float -> ViewConfig
vicoStrokeOpacity =
    StrokeOpacity


{-| Specify the default stroke width of single views.
-}
vicoStrokeWidth : Float -> ViewConfig
vicoStrokeWidth =
    StrokeWidth


{-| Specify the default width of single views (e.g. each view in a trellis plot).
-}
vicoWidth : Float -> ViewConfig
vicoWidth =
    ViewWidth


{-| Specify an aggregrate operation as part of a window transformation.
-}
wiAggregateOp : Operation -> Window
wiAggregateOp =
    WAggregateOp


{-| Override the default width of the visualization. If not specified the width
will be calculated based on the content of the visualization.
-}
width : Float -> ( VLProperty, Spec )
width w =
    ( VLWidth, JE.float w )


{-| Specify that the given field should be sorted in ascending order when performing
a window transform.
-}
wiAscending : String -> WindowSortField
wiAscending =
    WAscending


{-| Specify that the given field should be sorted in descending order when performing
a window transform.
-}
wiDescending : String -> WindowSortField
wiDescending =
    WDescending


{-| Specify an data field for which to compute an operation. This is not needed
for operations that do not apply to fields such as `Count`, `Rank` and `DenseRank`.
-}
wiField : String -> Window
wiField =
    WField


{-| Specify a sliding window for use by a window transform. The two parameters
should either be `Just` a number indicating the offset from the current data object,
or `Nothing` to indicate unbounded rows preceding or following the current data object.
The default value is equivalent to `Nothing (Just 0)`, indicating that the sliding
window includes the current object and all preceding objects.
-}
wiFrame : Maybe Int -> Maybe Int -> WindowProperty
wiFrame =
    WFrame


{-| Specify the data fields for partioning data objects in a window transform
into separate windows. If unspecified, all points will be in a single group.
-}
wiGroupBy : List String -> WindowProperty
wiGroupBy =
    WGroupBy


{-| Specify whether or not the sliding window frame in a window transform should
ignore peer values (those considered identical by the sort criteria). The default
is false, causing the window frame to expand to include all peer values. If set
to be true, the window frame will be defined by offset values only.
-}
wiIgnorePeers : Bool -> WindowProperty
wiIgnorePeers =
    WIgnorePeers


{-| Specify a window transform to be added to a list of data stream transformations.
It performs calculations over sorted groups of data objects such as ranking, lead/lag
analysis, running sums and averages.

The first parameter is the name to give the transformed output. The second is the
window transform field definition and the third the window transform definition.

    trans =
        transform
            << windowAs "TotalTime"
                [ wiAggregateOp Sum, wiField "Time" ]
                [ wiFrame Nothing Nothing ]

-}
windowAs : String -> List Window -> List WindowProperty -> List LabelledSpec -> List LabelledSpec
windowAs fName ws wProps =
    (::)
        ( "windowAs"
        , JE.list
            [ JE.object (( "as", JE.string fName ) :: List.map windowAsProperty ws)
            , windowPropertySpec "frame" wProps
            , windowPropertySpec "ignorePeers" wProps
            , windowPropertySpec "groupby" wProps
            , windowPropertySpec "sort" wProps
            ]
        )


{-| Specify a window-specific operation as part of a window transformation.
-}
wiOp : WindowOperation -> Window
wiOp =
    WOp


{-| Specify the numeric parameter for those window-only operations that can be
parameterised (`Ntile`, `Lag`, `Lead` and `NthValue`).
-}
wiParam : Int -> Window
wiParam =
    WParam


{-| Specify a comparator for sorting data objects within a window transform. If
two data objects are considered equal by the comparator, they are considered `peer`
values of equal rank. If not specified, data objects are processed in the order
they are observed and none are considered peers.
-}
wiSort : List WindowSortField -> WindowProperty
wiSort =
    WSort



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


bin : List BinProperty -> LabelledSpec
bin bProps =
    if bProps == [] then
        ( "bin", JE.bool True )
    else
        ( "bin", bProps |> List.map binProperty |> JE.object )


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


boundsSpec : Bounds -> Spec
boundsSpec bnds =
    case bnds of
        Full ->
            JE.string "full"

        Flush ->
            JE.string "flush"


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


compositionAlignmentSpec : CompositionAlignment -> Spec
compositionAlignmentSpec ca =
    case ca of
        CANone ->
            JE.string "none"

        CAEach ->
            JE.string "each"

        CAAll ->
            JE.string "all"


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

        GeoshapeStyle mps ->
            ( "geoshape", JE.object (List.map markProperty mps) )

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


extentSpec : SummaryExtent -> Spec
extentSpec ext =
    case ext of
        ExCI ->
            JE.string "ci"

        ExStderr ->
            JE.string "stderr"

        ExStdev ->
            JE.string "stdev"

        ExIqr ->
            JE.string "iqr"

        ExRange ->
            JE.string "min-max"

        ExIqrScale sc ->
            JE.float sc


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

        DSV delim ->
            [ ( "type", JE.string "dsv" ), ( "delimiter", JE.string (String.fromChar delim) ) ]

        TopojsonFeature objectSet ->
            [ ( "type", JE.string "topojson" ), ( "feature", JE.string objectSet ) ]

        TopojsonMesh objectSet ->
            [ ( "type", JE.string "topojson" ), ( "mesh", JE.string objectSet ) ]

        Parse fmts ->
            if fmts == [] then
                [ ( "parse", JE.null ) ]
            else
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

        HLabelAngle x ->
            ( "labelAngle", JE.float x )

        HLabelColor s ->
            ( "labelColor", JE.string s )

        HLabelFont s ->
            ( "labelFont", JE.string s )

        HLabelFontSize x ->
            ( "labelFontSize", JE.float x )

        HLabelLimit x ->
            ( "labelLimit", JE.float x )

        HTitle s ->
            ( "title", JE.string s )

        HTitleAnchor a ->
            ( "titleAnchor", JE.string (anchorLabel a) )

        HTitleAngle x ->
            ( "titleAngle", JE.float x )

        HTitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        HTitleColor s ->
            ( "titleColor", JE.string s )

        HTitleFont s ->
            ( "titleFont", JE.string s )

        HTitleFontWeight s ->
            ( "titleFontWeight", JE.string s )

        HTitleFontSize x ->
            ( "titleFontSize", JE.float x )

        HTitleLimit x ->
            ( "titleLimit", JE.float x )


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


lineMarkerSpec : LineMarker -> Spec
lineMarkerSpec pm =
    case pm of
        LMNone ->
            JE.bool False

        LMMarker mps ->
            JE.object (List.map markProperty mps)


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
            ( "condition"
            , JE.object
                (( "selection", booleanOpSpec selName )
                    :: List.concatMap markChannelProperty ifClause
                )
            )
                :: List.concatMap markChannelProperty elseClause

        MDataCondition tests elseClause ->
            let
                testClause ( predicate, ifClause ) =
                    JE.object
                        (( "test", booleanOpSpec predicate )
                            :: List.concatMap markChannelProperty ifClause
                        )
            in
            ( "condition", JE.list (List.map testClause tests) )
                :: List.concatMap markChannelProperty elseClause

        MTimeUnit tu ->
            [ ( "timeUnit", JE.string (timeUnitLabel tu) ) ]

        MTitle t ->
            [ ( "title", JE.string t ) ]

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

        Boxplot ->
            "boxplot"

        Circle ->
            "circle"

        Errorband ->
            "errorband"

        Errorbar ->
            "errorbar"

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

        MExtent ext ->
            ( "extent", extentSpec ext )

        MHRef s ->
            ( "href", JE.string s )

        MFill col ->
            ( "fill", JE.string col )

        MStroke col ->
            ( "stroke", JE.string col )

        MStrokeCap sc ->
            ( "strokeCap", JE.string (strokeCapLabel sc) )

        MStrokeJoin sj ->
            ( "strokeJoin", JE.string (strokeJoinLabel sj) )

        MStrokeMiterLimit ml ->
            ( "strokeMiterLimit", JE.float ml )

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

        MRule props ->
            ( "rule", JE.object (List.map markProperty props) )

        MBorders props ->
            ( "borders", JE.object (List.map markProperty props) )

        MTicks props ->
            ( "ticks", JE.object (List.map markProperty props) )

        MPoint pm ->
            ( "point", pointMarkerSpec pm )

        MLine lm ->
            ( "line", lineMarkerSpec lm )

        MXOffset o ->
            ( "xOffset", JE.float o )

        MX2Offset o ->
            ( "x2Offset", JE.float o )

        MYOffset o ->
            ( "yOffset", JE.float o )

        MY2Offset o ->
            ( "y2Offset", JE.float o )


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

        OSort sps ->
            case sps of
                [] ->
                    ( "sort", JE.null )

                [ Ascending ] ->
                    ( "sort", JE.string "ascending" )

                [ Descending ] ->
                    ( "sort", JE.string "descending" )

                [ CustomSort dvs ] ->
                    ( "sort", JE.list (dataValuesSpecs dvs) )

                _ ->
                    ( "sort", JE.object (List.concatMap sortProperty sps) )


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


pointMarkerSpec : PointMarker -> Spec
pointMarkerSpec pm =
    case pm of
        PMTransparent ->
            JE.string "transparent"

        PMNone ->
            JE.bool False

        PMMarker mps ->
            JE.object (List.map markProperty mps)


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

        PTitle t ->
            ( "title", JE.string t )

        PSort sps ->
            case sps of
                [] ->
                    ( "sort", JE.null )

                [ Ascending ] ->
                    ( "sort", JE.string "ascending" )

                [ Descending ] ->
                    ( "sort", JE.string "descending" )

                [ CustomSort dvs ] ->
                    ( "sort", JE.list (dataValuesSpecs dvs) )

                _ ->
                    ( "sort", JE.object (List.concatMap sortProperty sps) )

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

        PWidth ->
            ( "value", JE.string "width" )

        PHeight ->
            ( "value", JE.string "height" )


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

        NTrue ->
            JE.bool True

        NFalse ->
            JE.bool False

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


sortProperty : SortProperty -> List LabelledSpec
sortProperty sp =
    case sp of
        Ascending ->
            [ ( "order", JE.string "ascending" ) ]

        Descending ->
            [ ( "order", JE.string "descending" ) ]

        ByFieldOp field op ->
            [ ( "field", JE.string field ), ( "op", JE.string (operationLabel op) ) ]

        ByRepeatOp arr op ->
            [ ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] ), ( "op", JE.string (operationLabel op) ) ]

        CustomSort dvs ->
            [] |> Debug.log "Warning: Unexpected custom sorting provided to sortProperty"


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

        TTitle t ->
            [ ( "title", JE.string t ) ]

        TFormat fmt ->
            [ ( "format", JE.string fmt ) ]

        TSelectionCondition selName ifClause elseClause ->
            ( "condition"
            , JE.object
                (( "selection", booleanOpSpec selName )
                    :: List.concatMap textChannelProperty ifClause
                )
            )
                :: List.concatMap textChannelProperty elseClause

        TDataCondition tests elseClause ->
            let
                testClause ( predicate, ifClause ) =
                    JE.object
                        (( "test", booleanOpSpec predicate )
                            :: List.concatMap textChannelProperty ifClause
                        )
            in
            ( "condition", JE.list (List.map testClause tests) )
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

        VLSpacing ->
            "spacing"

        VLAlign ->
            "align"

        VLBounds ->
            "bounds"

        VLCenter ->
            "center"

        VLSpec ->
            "spec"

        VLResolve ->
            "resolve"


wOperationLabel : WindowOperation -> String
wOperationLabel op =
    case op of
        RowNumber ->
            "row_number"

        Rank ->
            "rank"

        DenseRank ->
            "dense_rank"

        PercentRank ->
            "percent_rank"

        CumeDist ->
            "cume_dist"

        Ntile ->
            "ntile"

        Lag ->
            "lag"

        Lead ->
            "lead"

        FirstValue ->
            "first_value"

        LastValue ->
            "last_value"

        NthValue ->
            "nth_value"


windowAsProperty : Window -> LabelledSpec
windowAsProperty w =
    case w of
        WAggregateOp op ->
            ( "op", JE.string (operationLabel op) )

        WOp op ->
            ( "op", JE.string (wOperationLabel op) )

        WParam n ->
            ( "param", JE.int n )

        WField f ->
            ( "field", JE.string f )


windowPropertySpec : String -> List WindowProperty -> Spec
windowPropertySpec wpName wps =
    let
        wpSpec wp =
            case wpName of
                "frame" ->
                    case wp of
                        WFrame (Just n1) (Just n2) ->
                            JE.list [ JE.int n1, JE.int n2 ]

                        WFrame Nothing (Just n2) ->
                            JE.list [ JE.null, JE.int n2 ]

                        WFrame (Just n1) Nothing ->
                            JE.list [ JE.int n1, JE.null ]

                        WFrame Nothing Nothing ->
                            JE.list [ JE.null, JE.null ]

                        _ ->
                            JE.null

                "ignorePeers" ->
                    case wp of
                        WIgnorePeers b ->
                            JE.bool b

                        _ ->
                            JE.null

                "groupby" ->
                    case wp of
                        WGroupBy fs ->
                            JE.list (List.map JE.string fs)

                        _ ->
                            JE.null

                "sort" ->
                    case wp of
                        WSort sfs ->
                            JE.list (List.map windowSortFieldSpec sfs)

                        _ ->
                            JE.null

                _ ->
                    JE.null |> Debug.log ("Unexpected window property name " ++ toString wpName)

        specList =
            List.map wpSpec wps |> List.filter (\x -> x /= JE.null)
    in
    case specList of
        [ spec ] ->
            spec

        _ ->
            JE.null


windowSortFieldSpec : WindowSortField -> Spec
windowSortFieldSpec wsf =
    case wsf of
        WAscending f ->
            JE.object [ ( "field", JE.string f ), ( "order", JE.string "ascending" ) ]

        WDescending f ->
            JE.object [ ( "field", JE.string f ), ( "order", JE.string "descending" ) ]
