module VegaLite exposing
    ( toVegaLite
    , VLProperty
    , Spec
    , LabelledSpec
    , combineSpecs
    , dataFromUrl
    , dataFromColumns
    , dataFromRows
    , dataFromJson
    , dataFromSource
    , dataName
    , datasets
    , dataColumn
    , dataRow
    , Data
    , DataColumn
    , DataRow
    , geometry
    , geoFeatureCollection
    , geometryCollection
    , geoPoint
    , geoPoints
    , geoLine
    , geoLines
    , geoPolygon
    , geoPolygons
    , csv
    , tsv
    , dsv
    , jsonProperty
    , topojsonFeature
    , topojsonMesh
    , parse
    , foNum
    , foBoo
    , foDate
    , foUtc
    , transform
    , projection
    , prType
    , prClipAngle
    , prClipExtent
    , prCenter
    , prRotate
    , prPrecision
    , prCoefficient
    , prDistance
    , prFraction
    , prLobes
    , prParallel
    , prRadius
    , prRatio
    , prSpacing
    , prTilt
    , albers
    , albersUsa
    , azimuthalEqualArea
    , azimuthalEquidistant
    , conicConformal
    , conicEqualArea
    , conicEquidistant
    , equirectangular
    , gnomonic
    , mercator
    , orthographic
    , stereographic
    , transverseMercator
    , customProjection
    , noClip
    , clipRect
    , aggregate
    , opAs
    , timeUnitAs
    , opArgMax
    , opArgMin
    , opCI0
    , opCI1
    , opCount
    , opDistinct
    , opMax
    , opMean
    , opMedian
    , opMin
    , opMissing
    , opQ1
    , opQ3
    , opStderr
    , opStdev
    , opStdevP
    , opSum
    , opValid
    , opVariance
    , opVarianceP
    , binAs
    , biBase
    , biDivide
    , biExtent
    , biMaxBins
    , biMinStep
    , biNice
    , biStep
    , biSteps
    , stack
    , stOffset
    , StackOffset(..)
    , stSort
    , stAscending
    , stDescending
    , calculateAs
    , filter
    , fiEqual
    , fiLessThan
    , fiLessThanEq
    , fiGreaterThan
    , fiGreaterThanEq
    , fiExpr
    , fiCompose
    , fiSelection
    , fiOneOf
    , fiRange
    , fiValid
    , numRange
    , dtRange
    , flatten
    , flattenAs
    , fold
    , foldAs
    , lookup
    , lookupAs
    , impute
    , imFrame
    , imKeyVals
    , imKeyValSequence
    , imMethod
    , imGroupBy
    , imNewValue
    , imValue
    , imMean
    , imMedian
    , imMax
    , imMin
    , sample
    , window
    , wiAggregateOp
    , wiOp
    , wiParam
    , wiField
    , woRowNumber
    , woRank
    , woDenseRank
    , woPercentRank
    , woCumeDist
    , woPercentile
    , woLag
    , woLead
    , woFirstValue
    , woLastValue
    , woNthValue
    , wiFrame
    , wiIgnorePeers
    , wiGroupBy
    , wiSort
    , wiAscending
    , wiDescending
    , area
    , bar
    , boxplot
    , errorband
    , errorbar
    , circle
    , geoshape
    , line
    , point
    , rect
    , rule
    , square
    , textMark
    , tick
    , trail
    , maAlign
    , maAngle
    , maBandSize
    , maBaseline
    , maBinSpacing
    , maBorders
    , maClip
    , maColor
    , maCursor
    , maExtent
    , maHRef
    , maContinuousBandSize
    , maDiscreteBandSize
    , maDx
    , maDy
    , maFill
    , maFilled
    , maFillOpacity
    , maFont
    , maFontSize
    , maFontStyle
    , maFontWeight
    , maInterpolate
    , maOpacity
    , maOrient
    , maPoint
    , maLine
    , maRadius
    , maRule
    , maShape
    , maShortTimeLabels
    , maSize
    , maStroke
    , maStrokeCap
    , StrokeCap(..)
    , maStrokeDash
    , maStrokeDashOffset
    , maStrokeJoin
    , StrokeJoin(..)
    , maStrokeMiterLimit
    , maStrokeOpacity
    , maStrokeWidth
    , maStyle
    , maTension
    , maText
    , maTheta
    , maThickness
    , maTicks
    , maTooltip
    , maXOffset
    , maYOffset
    , maX2Offset
    , maY2Offset
    , MarkOrientation(..)
    , MarkInterpolation(..)
    , symCircle
    , symCross
    , symDiamond
    , symSquare
    , symTriangleUp
    , symTriangleDown
    , symPath
    , Cursor(..)
    , pmNone
    , pmTransparent
    , pmMarker
    , lmMarker
    , lmNone
    , exRange
    , exCi
    , exIqr
    , exIqrScale
    , exStderr
    , exStdev
    , TooltipContent(..)
    , encoding
    , Measurement(..)
    , position
    , Position(..)
    , pName
    , pRepeat
    , pMType
    , pBin
    , pBinned
    , pTimeUnit
    , pTitle
    , pAggregate
    , pScale
    , pAxis
    , pSort
    , pStack
    , pWidth
    , pHeight
    , pImpute
    , soAscending
    , soDescending
    , soByField
    , soByRepeat
    , soCustom
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
    , axBandPosition
    , axDates
    , axDomainColor
    , axDomainOpacity
    , axDomainWidth
    , axLabelAlign
    , axLabelBaseline
    , axLabelBound
    , axLabelColor
    , axLabelFlush
    , axLabelFlushOffset
    , axLabelFont
    , axLabelFontSize
    , axLabelFontWeight
    , axLabelLimit
    , axLabelOpacity
    , axTickColor
    , axTickCount
    , axTickExtra
    , axTickOffset
    , axTickOpacity
    , axTickRound
    , axTicks
    , axTickSize
    , axTickStep
    , axTickWidth
    , axTitle
    , axTitleAlign
    , axTitleAngle
    , axTitleBaseline
    , axTitleColor
    , axTitleFont
    , axTitleFontSize
    , axTitleFontWeight
    , axTitleLimit
    , axTitleOpacity
    , axTitlePadding
    , axTitleX
    , axTitleY
    , axValues
    , axZIndex
    , OverlapStrategy(..)
    , Side(..)
    , HAlign(..)
    , VAlign(..)
    , size
    , color
    , fill
    , stroke
    , opacity
    , shape
    , mName
    , mRepeat
    , mMType
    , mScale
    , mBin
    , mBinned
    , mImpute
    , mTimeUnit
    , mTitle
    , mAggregate
    , mLegend
    , mPath
    , mNum
    , mStr
    , mBoo
    , leGradient
    , leSymbol
    , leClipHeight
    , leColumnPadding
    , leColumns
    , leCornerRadius
    , leDirection
    , leFillColor
    , leFormat
    , leGradientLength
    , leGradientThickness
    , leGradientStrokeColor
    , leGradientStrokeWidth
    , leGridAlign
    , leLabelAlign
    , leLabelBaseline
    , leLabelColor
    , leLabelFont
    , leLabelFontSize
    , leLabelLimit
    , leLabelOffset
    , leLabelOverlap
    , leOffset
    , leOrient
    , lePadding
    , leRowPadding
    , leStrokeColor
    , leStrokeWidth
    , leSymbolFillColor
    , leSymbolSize
    , leSymbolStrokeColor
    , leSymbolStrokeWidth
    , leSymbolType
    , leTickCount
    , leTitle
    , leTitleAlign
    , leTitleBaseline
    , leTitleColor
    , leTitleFont
    , leTitleFontSize
    , leTitleFontWeight
    , leTitleLimit
    , leTitlePadding
    , leType
    , leValues
    , leZIndex
    , LegendOrientation(..)
    , leNums
    , leStrs
    , leDts
    , text
    , tooltip
    , tooltips
    , tName
    , tRepeat
    , tMType
    , tBin
    , tBinned
    , tAggregate
    , tTimeUnit
    , tTitle
    , tFormat
    , FontWeight(..)
    , hyperlink
    , hName
    , hRepeat
    , hMType
    , hBin
    , hBinned
    , hAggregate
    , hTimeUnit
    , hStr
    , order
    , oName
    , oRepeat
    , oMType
    , oBin
    , oAggregate
    , oSort
    , oTimeUnit
    , row
    , column
    , detail
    , dName
    , dMType
    , dAggregate
    , dBin
    , dImpute
    , dTimeUnit
    , scType
    , scDomain
    , scRange
    , scScheme
    , scPadding
    , scPaddingInner
    , scPaddingOuter
    , scRangeStep
    , scRound
    , scClamp
    , scInterpolate
    , scNice
    , scZero
    , scReverse
    , scBand
    , scBinLinear
    , scBinOrdinal
    , scLinear
    , scLog
    , scOrdinal
    , scPoint
    , scPow
    , scQuantile
    , scQuantize
    , scSequential
    , scSqrt
    , scThreshold
    , scTime
    , scUtc
    , raName
    , raNums
    , raStrs
    , categoricalDomainMap
    , domainRangeMap
    , doNums
    , doStrs
    , doDts
    , doUnaggregated
    , doSelection
    , niTrue
    , niFalse
    , niMillisecond
    , niSecond
    , niMinute
    , niHour
    , niDay
    , niWeek
    , niMonth
    , niYear
    , niTickCount
    , niInterval
    , cubeHelix
    , cubeHelixLong
    , hcl
    , hclLong
    , hsl
    , hslLong
    , lab
    , rgb
    , layer
    , hConcat
    , vConcat
    , resolve
    , resolution
    , align
    , alignRC
    , CompositionAlignment(..)
    , bounds
    , Bounds(..)
    , spacing
    , spacingRC
    , center
    , centerRC
    , reAxis
    , reLegend
    , reScale
    , chX
    , chY
    , chX2
    , chY2
    , chColor
    , chOpacity
    , chShape
    , chSize
    , Resolution(..)
    , repeat
    , rowFields
    , columnFields
    , facet
    , columnBy
    , rowBy
    , fName
    , fMType
    , fAggregate
    , fBin
    , fHeader
    , fTimeUnit
    , asSpec
    , specification
    , arColumn
    , arRow
    , hdLabelAngle
    , hdLabelColor
    , hdLabelFont
    , hdLabelFontSize
    , hdLabelLimit
    , hdLabelPadding
    , hdTitle
    , hdTitleAnchor
    , hdTitleAngle
    , hdTitleBaseline
    , hdTitleColor
    , hdTitleFont
    , hdTitleFontWeight
    , hdTitleFontSize
    , hdTitleLimit
    , hdTitlePadding
    , hdFormat
    , selection
    , select
    , Selection(..)
    , seEmpty
    , seBind
    , seBindScales
    , seEncodings
    , seFields
    , seNearest
    , seOn
    , seResolve
    , seSelectionMark
    , seToggle
    , seTranslate
    , seZoom
    , iRange
    , iCheckbox
    , iRadio
    , iSelect
    , iText
    , iNumber
    , iDate
    , iTime
    , iMonth
    , iWeek
    , iDateTimeLocal
    , iTel
    , iColor
    , inDebounce
    , inElement
    , inOptions
    , inMin
    , inMax
    , inName
    , inStep
    , inPlaceholder
    , SelectionResolution(..)
    , smFill
    , smFillOpacity
    , smStroke
    , smStrokeDash
    , smStrokeDashOffset
    , smStrokeOpacity
    , smStrokeWidth
    , mSelectionCondition
    , mDataCondition
    , tSelectionCondition
    , tDataCondition
    , hDataCondition
    , hSelectionCondition
    , and
    , or
    , not
    , expr
    , selected
    , selectionName
    , name
    , title
    , description
    , height
    , width
    , padding
    , paSize
    , paEdges
    , autosize
    , asContent
    , asFit
    , asNone
    , asPad
    , asPadding
    , asResize
    , background
    , configure
    , configuration
    , coArea
    , coAutosize
    , coAxis
    , coAxisX
    , coAxisY
    , coAxisLeft
    , coAxisRight
    , coAxisTop
    , coAxisBottom
    , coAxisBand
    , coBackground
    , coBar
    , coCircle
    , coCountTitle
    , coFieldTitle
    , coGeoshape
    , coLegend
    , coLine
    , coHeader
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
    , coTitle
    , coTimeFormat
    , coTrail
    , coView
    , axcoBandPosition
    , axcoDomain
    , axcoDomainColor
    , axcoDomainOpacity
    , axcoDomainWidth
    , axcoMaxExtent
    , axcoMinExtent
    , axcoGrid
    , axcoGridColor
    , axcoGridDash
    , axcoGridOpacity
    , axcoGridWidth
    , axcoLabels
    , axcoLabelAlign
    , axcoLabelAngle
    , axcoLabelBaseline
    , axcoLabelBound
    , axcoLabelColor
    , axcoLabelFlush
    , axcoLabelFlushOffset
    , axcoLabelFontWeight
    , axcoLabelFont
    , axcoLabelFontSize
    , axcoLabelLimit
    , axcoLabelOpacity
    , axcoLabelOverlap
    , axcoLabelPadding
    , axcoShortTimeLabels
    , axcoTicks
    , axcoTickColor
    , axcoTickExtra
    , axcoTickOffset
    , axcoTickOpacity
    , axcoTickRound
    , axcoTickSize
    , axcoTickStep
    , axcoTickWidth
    , axcoTitleAlign
    , axcoTitleAngle
    , axcoTitleBaseline
    , axcoTitleColor
    , axcoTitleFont
    , axcoTitleFontWeight
    , axcoTitleFontSize
    , axcoTitleLimit
    , axcoTitleOpacity
    , axcoTitlePadding
    , axcoTitleX
    , axcoTitleY
    , lecoClipHeight
    , lecoColumnPadding
    , lecoColumns
    , lecoCornerRadius
    , lecoFillColor
    , lecoOrient
    , lecoOffset
    , lecoStrokeColor
    , lecoStrokeDash
    , lecoStrokeWidth
    , lecoPadding
    , lecoRowPadding
    , lecoGradientDirection
    , lecoGradientLabelBaseline
    , lecoGradientLabelLimit
    , lecoGradientLabelOffset
    , lecoGradientStrokeColor
    , lecoGradientStrokeWidth
    , lecoGradientHeight
    , lecoGradientWidth
    , lecoGridAlign
    , lecoLabelAlign
    , lecoLabelBaseline
    , lecoLabelColor
    , lecoLabelFont
    , lecoLabelFontSize
    , lecoLabelLimit
    , lecoLabelOffset
    , lecoLabelOverlap
    , lecoShortTimeLabels
    , lecoEntryPadding
    , lecoSymbolBaseFillColor
    , lecoSymbolBaseStrokeColor
    , lecoSymbolDirection
    , lecoSymbolFillColor
    , lecoSymbolOffset
    , lecoSymbolSize
    , lecoSymbolStrokeColor
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
    , sacoBandPaddingInner
    , sacoBandPaddingOuter
    , sacoClamp
    , sacoMaxBandSize
    , sacoMinBandSize
    , sacoMaxFontSize
    , sacoMinFontSize
    , sacoMaxOpacity
    , sacoMinOpacity
    , sacoMaxSize
    , sacoMinSize
    , sacoMaxStrokeWidth
    , sacoMinStrokeWidth
    , sacoPointPadding
    , sacoRangeStep
    , sacoRound
    , sacoTextXRangeStep
    , sacoUseUnaggregatedDomain
    , racoCategory
    , racoDiverging
    , racoHeatmap
    , racoOrdinal
    , racoRamp
    , racoSymbol
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
    , vicoWidth
    , vicoHeight
    , vicoClip
    , vicoFill
    , vicoFillOpacity
    , vicoStroke
    , vicoStrokeOpacity
    , vicoStrokeWidth
    , vicoStrokeDash
    , vicoStrokeDashOffset
    , anStart
    , anMiddle
    , anEnd
    , FieldTitleProperty(..)
    , boo
    , true
    , false
    , dt
    , num
    , str
    , boos
    , dts
    , nums
    , strs
    , dtYear
    , dtQuarter
    , dtMonth
    , dtDate
    , dtDay
    , dtHour
    , dtMinute
    , dtSecond
    , dtMillisecond
    , MonthName(..)
    , DayName(..)
    , date
    , day
    , hours
    , hoursMinutes
    , hoursMinutesSeconds
    , milliseconds
    , minutes
    , minutesSeconds
    , month
    , monthDate
    , quarter
    , quarterMonth
    , seconds
    , secondsMilliseconds
    , year
    , yearQuarter
    , yearQuarterMonth
    , yearMonth
    , yearMonthDate
    , yearMonthDateHours
    , yearMonthDateHoursMinutes
    , yearMonthDateHoursMinutesSeconds
    , utc
    , Anchor
    , Arrangement
    , Autosize
    , AxisProperty
    , AxisConfig
    , Binding
    , BinProperty
    , BooleanOp
    , CInterpolate
    , Channel
    , ClipRect
    , ConfigurationProperty
    , DataType
    , DataValue
    , DataValues
    , DateTime
    , DetailChannel
    , FacetChannel
    , FacetMapping
    , Filter
    , FilterRange
    , Format
    , Geometry
    , ImMethod
    , InputProperty
    , HeaderProperty
    , HyperlinkChannel
    , ImputeProperty
    , Legend
    , LegendConfig
    , LegendProperty
    , LegendValues
    , LineMarker
    , Mark
    , MarkChannel
    , MarkProperty
    , Operation
    , OrderChannel
    , Padding
    , PointMarker
    , PositionChannel
    , Projection
    , ProjectionProperty
    , RangeConfig
    , RepeatFields
    , Resolve
    , Scale
    , ScaleDomain
    , ScaleNice
    , ScaleProperty
    , ScaleConfig
    , ScaleRange
    , SelectionMarkProperty
    , SelectionProperty
    , SortField
    , SortProperty
    , StackProperty
    , SummaryExtent
    , Symbol
    , TextChannel
    , TimeUnit
    , TitleConfig
    , ViewConfig
    , Window
    , WOperation
    , WindowProperty
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


## Formatting Input Data

See the Vega-Lite
[format](https://vega.github.io/vega-lite/docs/data.html#format) and
[JSON](https://vega.github.io/vega-lite/docs/data.html#json) documentation.

@docs csv
@docs tsv
@docs dsv
@docs jsonProperty
@docs topojsonFeature
@docs topojsonMesh
@docs parse

@docs foNum
@docs foBoo
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

@docs albers
@docs albersUsa
@docs azimuthalEqualArea
@docs azimuthalEquidistant
@docs conicConformal
@docs conicEqualArea
@docs conicEquidistant
@docs equirectangular
@docs gnomonic
@docs mercator
@docs orthographic
@docs stereographic
@docs transverseMercator
@docs customProjection
@docs noClip
@docs clipRect


## Aggregation

See the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html).

@docs aggregate
@docs opAs
@docs timeUnitAs
@docs opArgMax
@docs opArgMin
@docs opCI0
@docs opCI1
@docs opCount
@docs opDistinct
@docs opMax
@docs opMean
@docs opMedian
@docs opMin
@docs opMissing
@docs opQ1
@docs opQ3
@docs opStderr
@docs opStdev
@docs opStdevP
@docs opSum
@docs opValid
@docs opVariance
@docs opVarianceP


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


## Stacking

See the [Vega-Lite stack documentation](https://vega.github.io/vega-lite/docs/stack.html)

@docs stack
@docs stOffset
@docs StackOffset
@docs stSort
@docs stAscending
@docs stDescending


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
@docs fiValid
@docs numRange
@docs dtRange


## Flattening

See the Vega-Lite [flatten](https://vega.github.io/vega-lite/docs/flatten.html)
and [fold](https://vega.github.io/vega-lite/docs/fold.html) documentation.

@docs flatten
@docs flattenAs
@docs fold
@docs foldAs


## Relational Joining (lookup)

See the [Vega-Lite lookup documentation](https://vega.github.io/vega-lite/docs/lookup.html).

@docs lookup
@docs lookupAs


## Data Imputation

Impute missing data. See the
[Vega-Lite impute documentation](https://vega.github.io/vega-lite/docs/impute.html#transform).

@docs impute
@docs imFrame
@docs imKeyVals
@docs imKeyValSequence
@docs imMethod
@docs imGroupBy
@docs imNewValue
@docs imValue
@docs imMean
@docs imMedian
@docs imMax
@docs imMin


## Data Sampling

See the [Vega-Lite sample documentation](https://vega.github.io/vega-lite/docs/sample.html)

@docs sample


## Window Transformations

See the Vega-Lite
[window transform field](https://vega.github.io/vega-lite/docs/window.html#field-def)
and [window transform](https://vega.github.io/vega-lite/docs/window.html#window-transform-definition)
documentation.

@docs window
@docs wiAggregateOp
@docs wiOp
@docs wiParam
@docs wiField
@docs woRowNumber
@docs woRank
@docs woDenseRank
@docs woPercentRank
@docs woCumeDist
@docs woPercentile
@docs woLag
@docs woLead
@docs woFirstValue
@docs woLastValue
@docs woNthValue
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
@docs maTooltip
@docs maXOffset
@docs maYOffset
@docs maX2Offset
@docs maY2Offset


### Used by Mark Properties

@docs MarkOrientation
@docs MarkInterpolation
@docs symCircle
@docs symCross
@docs symDiamond
@docs symSquare
@docs symTriangleUp
@docs symTriangleDown
@docs symPath
@docs Cursor
@docs pmNone
@docs pmTransparent
@docs pmMarker
@docs lmMarker
@docs lmNone
@docs exRange
@docs exCi
@docs exIqr
@docs exIqrScale
@docs exStderr
@docs exStdev
@docs TooltipContent


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
@docs pBinned
@docs pTimeUnit
@docs pTitle
@docs pAggregate
@docs pScale
@docs pAxis
@docs pSort
@docs pStack
@docs pWidth
@docs pHeight
@docs pImpute


## Properties Used by Position Channels


## Sorting Properties

See the
[Vega-Lite sort documentation](https://vega.github.io/vega-lite/docs/sort.html).

@docs soAscending
@docs soDescending
@docs soByField
@docs soByRepeat
@docs soCustom


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

@docs axBandPosition
@docs axDates
@docs axDomainColor
@docs axDomainOpacity
@docs axDomainWidth
@docs axLabelAlign
@docs axLabelBaseline
@docs axLabelBound
@docs axLabelColor
@docs axLabelFlush
@docs axLabelFlushOffset
@docs axLabelFont
@docs axLabelFontSize
@docs axLabelFontWeight
@docs axLabelLimit
@docs axLabelOpacity
@docs axTickColor
@docs axTickCount
@docs axTickExtra
@docs axTickOffset
@docs axTickOpacity
@docs axTickRound
@docs axTicks
@docs axTickSize
@docs axTickStep
@docs axTickWidth
@docs axTitle
@docs axTitleAlign
@docs axTitleAngle
@docs axTitleBaseline
@docs axTitleColor
@docs axTitleFont
@docs axTitleFontSize
@docs axTitleFontWeight
@docs axTitleLimit
@docs axTitleOpacity
@docs axTitlePadding
@docs axTitleX
@docs axTitleY
@docs axValues
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
@docs mBinned
@docs mImpute
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

@docs leGradient
@docs leSymbol
@docs leClipHeight
@docs leColumnPadding
@docs leColumns
@docs leCornerRadius
@docs leDirection
@docs leFillColor
@docs leFormat
@docs leGradientLength
@docs leGradientThickness
@docs leGradientStrokeColor
@docs leGradientStrokeWidth
@docs leGridAlign
@docs leLabelAlign
@docs leLabelBaseline
@docs leLabelColor
@docs leLabelFont
@docs leLabelFontSize
@docs leLabelLimit
@docs leLabelOffset
@docs leLabelOverlap
@docs leOffset
@docs leOrient
@docs lePadding
@docs leRowPadding
@docs leStrokeColor
@docs leStrokeWidth
@docs leSymbolFillColor
@docs leSymbolSize
@docs leSymbolStrokeColor
@docs leSymbolStrokeWidth
@docs leSymbolType
@docs leTickCount
@docs leTitle
@docs leTitleAlign
@docs leTitleBaseline
@docs leTitleColor
@docs leTitleFont
@docs leTitleFontSize
@docs leTitleFontWeight
@docs leTitleLimit
@docs leTitlePadding
@docs leType
@docs leValues
@docs leZIndex

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
@docs tBinned
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
@docs hBinned
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
data items with the same value are placed in the same group. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/encoding.html#detail).

@docs detail
@docs dName
@docs dMType
@docs dAggregate
@docs dBin
@docs dImpute
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
@docs scBand
@docs scBinLinear
@docs scBinOrdinal
@docs scLinear
@docs scLog
@docs scOrdinal
@docs scPoint
@docs scPow
@docs scQuantile
@docs scQuantize
@docs scSequential
@docs scSqrt
@docs scThreshold
@docs scTime
@docs scUtc

@docs raName
@docs raNums
@docs raStrs
@docs categoricalDomainMap
@docs domainRangeMap
@docs doNums
@docs doStrs
@docs doDts
@docs doUnaggregated
@docs doSelection

@docs niTrue
@docs niFalse
@docs niMillisecond
@docs niSecond
@docs niMinute
@docs niHour
@docs niDay
@docs niWeek
@docs niMonth
@docs niYear
@docs niTickCount
@docs niInterval


### Color Scaling

For color interpolation types, see the
[Vega-Lite continouus scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).

@docs cubeHelix
@docs cubeHelixLong
@docs hcl
@docs hclLong
@docs hsl
@docs hslLong
@docs lab
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
@docs chX
@docs chY
@docs chX2
@docs chY2
@docs chColor
@docs chOpacity
@docs chShape
@docs chSize
@docs Resolution


## Faceted views

Small multiples each of which show subsets of the same dataset. The specification
determines which field should be used to determine subsets along with their spatial
arrangement. See the
[Vega-Lite facet documentation](https://vega.github.io/vega-lite/docs/facet.html)

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
@docs arColumn
@docs arRow


### Facet Headers

See
[Vega-Lite header documentation](https://vega.github.io/vega-lite/docs/header.html)

@docs hdLabelAngle
@docs hdLabelColor
@docs hdLabelFont
@docs hdLabelFontSize
@docs hdLabelLimit
@docs hdLabelPadding

@docs hdTitle
@docs hdTitleAnchor
@docs hdTitleAngle
@docs hdTitleBaseline
@docs hdTitleColor
@docs hdTitleFont
@docs hdTitleFontWeight
@docs hdTitleFontSize
@docs hdTitleLimit
@docs hdTitlePadding

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
@docs seEmpty
@docs seBind
@docs seBindScales
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
@docs asContent
@docs asFit
@docs asNone
@docs asPad
@docs asPadding
@docs asResize
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
@docs coHeader
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
@docs axcoDomainOpacity
@docs axcoDomainWidth
@docs axcoMaxExtent
@docs axcoMinExtent
@docs axcoGrid
@docs axcoGridColor
@docs axcoGridDash
@docs axcoGridOpacity
@docs axcoGridWidth
@docs axcoLabels
@docs axcoLabelAlign
@docs axcoLabelAngle
@docs axcoLabelBaseline
@docs axcoLabelBound
@docs axcoLabelColor
@docs axcoLabelFlush
@docs axcoLabelFlushOffset
@docs axcoLabelFontWeight
@docs axcoLabelFont
@docs axcoLabelFontSize
@docs axcoLabelLimit
@docs axcoLabelOpacity
@docs axcoLabelOverlap
@docs axcoLabelPadding
@docs axcoShortTimeLabels
@docs axcoTicks
@docs axcoTickColor
@docs axcoTickExtra
@docs axcoTickOffset
@docs axcoTickOpacity
@docs axcoTickRound
@docs axcoTickSize
@docs axcoTickStep
@docs axcoTickWidth
@docs axcoTitleAlign
@docs axcoTitleAngle
@docs axcoTitleBaseline
@docs axcoTitleColor
@docs axcoTitleFont
@docs axcoTitleFontWeight
@docs axcoTitleFontSize
@docs axcoTitleLimit
@docs axcoTitleOpacity
@docs axcoTitlePadding
@docs axcoTitleX
@docs axcoTitleY


## Legend Configuration Options

See the
[Vega-Lite legend configuration documentation](https://vega.github.io/vega-lite/docs/legend.html#config).

@docs lecoClipHeight
@docs lecoColumnPadding
@docs lecoColumns
@docs lecoCornerRadius
@docs lecoFillColor
@docs lecoOrient
@docs lecoOffset
@docs lecoStrokeColor
@docs lecoStrokeDash
@docs lecoStrokeWidth
@docs lecoPadding
@docs lecoRowPadding
@docs lecoGradientDirection
@docs lecoGradientLabelBaseline
@docs lecoGradientLabelLimit
@docs lecoGradientLabelOffset
@docs lecoGradientStrokeColor
@docs lecoGradientStrokeWidth
@docs lecoGradientHeight
@docs lecoGradientWidth
@docs lecoGridAlign
@docs lecoLabelAlign
@docs lecoLabelBaseline
@docs lecoLabelColor
@docs lecoLabelFont
@docs lecoLabelFontSize
@docs lecoLabelLimit
@docs lecoLabelOffset
@docs lecoLabelOverlap
@docs lecoShortTimeLabels
@docs lecoEntryPadding
@docs lecoSymbolBaseFillColor
@docs lecoSymbolBaseStrokeColor
@docs lecoSymbolDirection
@docs lecoSymbolFillColor
@docs lecoSymbolOffset
@docs lecoSymbolSize
@docs lecoSymbolStrokeColor
@docs lecoSymbolStrokeWidth
@docs lecoSymbolType
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

@docs anStart
@docs anMiddle
@docs anEnd

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

See the
[Vega-Lite dateTime documentation](https://vega.github.io/vega-lite/docs/types.html#datetime)
and the [Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html).

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

@docs date
@docs day
@docs hours
@docs hoursMinutes
@docs hoursMinutesSeconds
@docs milliseconds
@docs minutes
@docs minutesSeconds
@docs month
@docs monthDate
@docs quarter
@docs quarterMonth
@docs seconds
@docs secondsMilliseconds
@docs year
@docs yearQuarter
@docs yearQuarterMonth
@docs yearMonth
@docs yearMonthDate
@docs yearMonthDateHours
@docs yearMonthDateHoursMinutes
@docs yearMonthDateHoursMinutesSeconds
@docs utc

---


# Type Reference

Types that are not specified directly, provided here for reference with links
to the functions that generate them.

@docs Anchor
@docs Arrangement
@docs Autosize
@docs AxisProperty
@docs AxisConfig
@docs Binding
@docs BinProperty
@docs BooleanOp
@docs CInterpolate
@docs Channel
@docs ClipRect
@docs ConfigurationProperty
@docs DataType
@docs DataValue
@docs DataValues
@docs DateTime
@docs DetailChannel
@docs FacetChannel
@docs FacetMapping
@docs Filter
@docs FilterRange
@docs Format
@docs Geometry
@docs ImMethod
@docs InputProperty
@docs HeaderProperty
@docs HyperlinkChannel
@docs ImputeProperty
@docs Legend
@docs LegendConfig
@docs LegendProperty
@docs LegendValues
@docs LineMarker
@docs Mark
@docs MarkChannel
@docs MarkProperty
@docs Operation
@docs OrderChannel
@docs Padding
@docs PointMarker
@docs PositionChannel
@docs Projection
@docs ProjectionProperty
@docs RangeConfig
@docs RepeatFields
@docs Resolve
@docs Scale
@docs ScaleDomain
@docs ScaleNice
@docs ScaleProperty
@docs ScaleConfig
@docs ScaleRange
@docs SelectionMarkProperty
@docs SelectionProperty
@docs SortField
@docs SortProperty
@docs StackProperty
@docs SummaryExtent
@docs Symbol
@docs TextChannel
@docs TimeUnit
@docs TitleConfig
@docs ViewConfig
@docs Window
@docs WOperation
@docs WindowProperty

-}

import Json.Decode as JD
import Json.Encode as JE


{-| Generated by [anStart](#anStart), [anMiddle](#anMiddle) and [anEnd](#anEnd).
-}
type Anchor
    = AnStart
    | AnMiddle
    | AnEnd


{-| Generated by [arColumn](#arColumn) and [arRow](#arRow).
-}
type Arrangement
    = Column
    | Row


{-| Generated by [asContent](#asContent), [asFit](#asFit), [asNone](#asNone),
[asPad](#asPad), [asPadding](#asPadding) and [asResize](#asReeize).
-}
type Autosize
    = AContent
    | AFit
    | ANone
    | APad
    | APadding
    | AResize


{-| Generated by functions prefixed with `axco`.
-}
type AxisConfig
    = BandPosition Float
    | Domain Bool
    | DomainColor String
    | DomainOpacity Float
    | DomainWidth Float
    | Grid Bool
    | GridColor String
    | GridDash (List Float)
    | GridOpacity Float
    | GridWidth Float
    | Labels Bool
    | LabelAlign HAlign
    | LabelAngle Float
    | LabelBaseline VAlign
    | LabelBound (Maybe Float)
    | LabelFlush (Maybe Float)
    | LabelFlushOffset Float
    | LabelColor String
    | LabelFont String
    | LabelFontSize Float
    | LabelFontWeight FontWeight
    | LabelLimit Float
    | LabelOpacity Float
    | LabelOverlap OverlapStrategy
    | LabelPadding Float
    | MaxExtent Float
    | MinExtent Float
    | ShortTimeLabels Bool
    | Ticks Bool
    | TickColor String
    | TickExtra Bool
    | TickOffset Float
    | TickOpacity Float
    | TickRound Bool
    | TickSize Float
    | TickStep Float
    | TickWidth Float
    | TitleAlign HAlign
    | TitleAngle Float
    | TitleBaseline VAlign
    | TitleColor String
    | TitleFont String
    | TitleFontSize Float
    | TitleFontWeight FontWeight
    | TitleLimit Float
    | TitleOpacity Float
    | TitlePadding Float
    | TitleX Float
    | TitleY Float


{-| Generated by functions prefixed with `ax`, for example [axBandPosition](#axBandPosition).
-}
type AxisProperty
    = AxBandPosition Float
    | AxDomain Bool
    | AxDomainColor String
    | AxDomainOpacity Float
    | AxDomainWidth Float
    | AxFormat String
    | AxGrid Bool
    | AxLabelAlign HAlign
    | AxLabelAngle Float
    | AxLabelBaseline VAlign
    | AxLabelBound (Maybe Float)
    | AxLabelColor String
    | AxLabelFlush (Maybe Float)
    | AxLabelFlushOffset Float
    | AxLabelFont String
    | AxLabelFontSize Float
    | AxLabelFontWeight FontWeight
    | AxLabelLimit Float
    | AxLabelOpacity Float
    | AxLabelOverlap OverlapStrategy
    | AxLabelPadding Float
    | AxLabels Bool
    | AxMaxExtent Float
    | AxMinExtent Float
    | AxOffset Float
    | AxOrient Side
    | AxPosition Float
    | AxTickColor String
    | AxTickCount Int
    | AxTickExtra Bool
    | AxTickOffset Float
    | AxTickOpacity Float
    | AxTickRound Bool
    | AxTicks Bool
    | AxTickSize Float
    | AxTickStep Float
    | AxTickWidth Float
    | AxTitle String
    | AxTitleAlign HAlign
    | AxTitleAngle Float
    | AxTitleBaseline VAlign
    | AxTitleColor String
    | AxTitleFont String
    | AxTitleFontSize Float
    | AxTitleFontWeight FontWeight
    | AxTitleLimit Float
    | AxTitleOpacity Float
    | AxTitlePadding Float
    | AxTitleX Float
    | AxTitleY Float
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


{-| Generated by [biBase](#biBase), [biDivide](#biDivide), [biExtent](#biExtent),
[biMaxBins](#biMaxBins), [biMinStep](#biMinStep), [biNice](#biNice),
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


{-| The bounds calculation method to use for determining the extent of a sub-plot
in a composed view.
-}
type Bounds
    = Full
    | Flush


{-| Generated by [chX](#chX), [chY](#chY), [chX2](#chX2), [chY2](#chY2),
[chColor](#chColor), [chOpacity](#chOpacity), [chShape](#chShape) and [chSize](#chSize).
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


{-| Generated by [cubeHelix](#cubeHelix), [cubeHelixLong](#cubeHelixLong), [hcl](#hcl),
[hclLong](#hclLong), [hsl](#hsl), [hslLong](#hslLong), [lab](#lab) and [rgb](#rgb).
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


{-| Generatee by [noClip](#noClip) and [clipRect](#clipRect).
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


{-| Generated with [coArea](#coArea), [coAutosize](#coAutosize), [coAxis](#coAxis),
[coAxisX](#coAxisX), [coAxisY](#coAxisY), [coAxisLeft](#coAxisLeft),
[coAxisRight](#coAxisRight), [coAxisTop](#coAxisTop),
[coAxisBottom](#coAxisBottom), [coAxisBand](#coAxisBand), [coBackground](#coBackground),
[coBar](#coBar), [coCircle](#coCircle), [coCountTitle](#coCountTitle), [coFieldTitle](#coFieldTitle),
[coGeoshape](#coGeoshape), [coHeader](#coHeader), [coLegend](#coLegend), [coLine](#coLine),
[coMark](#coMark), [coNamedStyle](#coNamedStyle), [coNumberFormat](#coNumberFormat),
[coPadding](#coPadding), [coPoint](#coPoint), [coProjection](#coProjection),
[coRange](#coRange), [coRect](#coRect), [coRemoveInvalid](#coRemoveInvalid),
[coRule](#coRule), [coScale](#coScale), [coSelection](#coSelection),
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
    | HeaderStyle (List HeaderProperty)
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
    | Stack StackOffset
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


{-| Generated by [foBoo](#foBoo), [foNum](#foNum), [foDate](#FoDate) and [foUtc](#foUtc).
-}
type DataType
    = FoNum
    | FoBoo
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
[dBin](#dBin), [dImpute](#dImpute) and [dTimeUnit](#dTimeUnit).
-}
type DetailChannel
    = DName String
    | DmType Measurement
    | DBin (List BinProperty)
    | DImpute (List ImputeProperty)
    | DTimeUnit TimeUnit
    | DAggregate Operation



-- {-| Interaction events to support selection. See the
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


{-| Style in which field names are displayed. The `Verbal` style is 'Sum of field',
'Year of date' etc. The `Function` style is 'SUM(field)', 'YEAR(date)' etc. The
`Plain` style is just the field name without any additional text.
-}
type FieldTitleProperty
    = Verbal
    | Function
    | Plain


{-| Generated by [fiEqual](#fiEqual), [fiLessThan](#fiLessThan),
[fiLessThanEq](#fiLessThanEq), [fiGreaterThan](#fiEqGreaterThan),
[fiGreaterThanEq](#fiGreaterThanEq), [fiExpr](#fiExpr), [fiCompose](#fiCompose),
[fiSelection](#fiSelection), [fiOneOf](#fiOneOf), [fiRange](#fiRange) and
[fiValid](#fiValid).
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
    | FValid String


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


{-| Generated by [csv](#csv), [dsv](#dsv), [tsv](#tsv), [parse](#parse),
[jsonProperty](#jsonProperty), [topojsonFeature](#topojsonFeature) and
[topojsonMesh](#topojsonMesh).
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


{-| Generated by [hdFormat](#hdFormat), [hdLabelAngle](#hdLabelAngle),
[hdLabelColor](#hdLabelColor), [hdLabelFont](#hdLabelFont), [hdLabelFontSize](#hdLabelFontSize),
[hdLabelLimit](#hdLabelLimit), [hdLabelPadding](#hdLabelPadding), [hdTitle](#hdTitle),
[hdTitleAnchor](#hdTitleAnchor), [hdTitleAngle](#hdTitleAngle),
[hdTitleBaseline](#hdTitleBaseline), [hdTitleColor](#hdTitleColor),
[hdTitleFont](#hdTitleFont),[hdTitleFontWeight](#hdTitleFontWeight),
[hdTitleFontSize](#hdTitleFontSize), [hdTitleLimit](#hdTitleLimit) and
[hdTitlePadding](#hdTitlePadding).
-}
type HeaderProperty
    = HFormat String
    | HTitle String
    | HLabelAngle Float
    | HLabelColor String
    | HLabelFont String
    | HLabelFontSize Float
    | HLabelLimit Float
    | HLabelPadding Float
    | HTitleAnchor Anchor
    | HTitleAngle Float
    | HTitleBaseline VAlign
    | HTitleColor String
    | HTitleFont String
    | HTitleFontWeight String
    | HTitleFontSize Float
    | HTitleLimit Float
    | HTitlePadding Float


{-| Generated by [hName](#hName), [hRepeat](#hRepeat), [hMType](#hMType), [hBin](#hBin),
[hBinned](#hBinned), [hAggregate](#hAggregate), [hTimeUnit](#hTimeUnit),
[hDataCondition](#hDataCondition), [hSelectionCondition](#hSelectionCondition)
and [hStr](#hStr).
-}
type HyperlinkChannel
    = HName String
    | HRepeat Arrangement
    | HmType Measurement
    | HBin (List BinProperty)
    | HBinned
    | HAggregate Operation
    | HTimeUnit TimeUnit
    | HSelectionCondition BooleanOp (List HyperlinkChannel) (List HyperlinkChannel)
    | HDataCondition BooleanOp (List HyperlinkChannel) (List HyperlinkChannel)
    | HString String


{-| The imputation method to use when replacing values.
-}
type ImMethod
    = ImValue
    | ImMean
    | ImMedian
    | ImMax
    | ImMin


{-| Generated by [imKeyVals](#imKeyVals), [imKeyValSequence](#imKeyValSequence)
[imFrame](#imFrame), [imGroupBy](#imGroupBy), [imMethod](#imMethod) and [imValue](#imValue).
-}
type ImputeProperty
    = ImFrame (Maybe Int) (Maybe Int)
    | ImKeyVals DataValues
    | ImKeyValSequence Float Float Float
    | ImMethod ImMethod
    | ImGroupBy (List String)
    | ImNewValue DataValue


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


{-| Generated by [leGradient](#leGradient) and [leSymbol](#leSymbol).
-}
type Legend
    = Gradient
    | Symbol


{-| Generated by functions prefixed with `leco`.
-}
type LegendConfig
    = LeClipHeight Float
    | LeColumnPadding Float
    | LeColumns Float
    | CornerRadius Float
    | EntryPadding Float
    | FillColor String
    | GradientDirection MarkOrientation
    | GradientHeight Float
    | GradientLabelBaseline VAlign
    | GradientLabelLimit Float
    | GradientLabelOffset Float
    | GradientStrokeColor String
    | GradientStrokeWidth Float
    | GradientWidth Float
    | LeGridAlign CompositionAlignment
    | LeLabelAlign HAlign
    | LeLabelBaseline VAlign
    | LeLabelColor String
    | LeLabelFont String
    | LeLabelFontSize Float
    | LeLabelLimit Float
    | LeLabelOffset Float
    | LeLabelOverlap OverlapStrategy
    | Offset Float
    | Orient LegendOrientation
    | LePadding Float
    | LeRowPadding Float
    | LeShortTimeLabels Bool
    | StrokeColor String
    | LeStrokeDash (List Float)
    | LeStrokeWidth Float
    | SymbolBaseFillColor String
    | SymbolBaseStrokeColor String
    | SymbolDirection MarkOrientation
    | SymbolFillColor String
    | SymbolOffset Float
    | SymbolType Symbol
    | SymbolSize Float
    | SymbolStrokeWidth Float
    | SymbolStrokeColor String
    | LeTitleAlign HAlign
    | LeTitleBaseline VAlign
    | LeTitleColor String
    | LeTitleFont String
    | LeTitleFontSize Float
    | LeTitleFontWeight FontWeight
    | LeTitleLimit Float
    | LeTitlePadding Float


{-| Legend position relative to data rectangle.
-}
type LegendOrientation
    = BottomLeft
    | BottomRight
    | Left
    | None
    | Right
    | TopLeft
    | TopRight


{-| Generated by functions prefied with `le`. For example [leCornerRadius](#leCornerRadius).
-}
type LegendProperty
    = LClipHeight Float
    | LColumnPadding Float
    | LColumns Float
    | LCornerRadius Float
    | LDirection MarkOrientation
    | LFillColor String
    | LFormat String
    | LGradientLength Float
    | LGradientThickness Float
    | LGradientStrokeColor String
    | LGradientStrokeWidth Float
    | LGridAlign CompositionAlignment
    | LLabelAlign HAlign
    | LLabelBaseline VAlign
    | LLabelColor String
    | LLabelFont String
    | LLabelFontSize Float
    | LLabelLimit Float
    | LLabelOffset Float
    | LLabelOverlap OverlapStrategy
    | LOffset Float
    | LOrient LegendOrientation
    | LPadding Float
    | LRowPadding Float
    | LStrokeColor String
    | LStrokeWidth Float
    | LSymbolFillColor String
    | LSymbolType Symbol
    | LSymbolSize Float
    | LSymbolStrokeWidth Float
    | LSymbolStrokeColor String
    | LTickCount Float
    | LTitle String
    | LTitleAlign HAlign
    | LTitleBaseline VAlign
    | LTitleColor String
    | LTitleFont String
    | LTitleFontSize Float
    | LTitleFontWeight FontWeight
    | LTitleLimit Float
    | LTitlePadding Float
    | LType Legend
    | LValues LegendValues
    | LZIndex Int


{-| Generated by [leNums](#leNums), [leStrs](#leStrs) and [leDts](#leDts).
-}
type LegendValues
    = LDateTimes (List (List DateTime))
    | LNumbers (List Float)
    | LStrings (List String)


{-| Appearance of a line marker that is overlaid on to an area mark.
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
[mBin](#mBin), [mBinned](#mBinned), [mImpute](#mImpute)[mTimeUnit](#mTimeUnit),
[mTitle](#mTitle), [mAggregate](#mAggregate), [mLegend](#mLegend),
[mSelectionCondition](#mSelectionCondition), [mDataCondition](#mDataCondition),
[mPath](#mPath), [mNum](#mNum), [mStr](#mStr) and [mBoo](#mBoo).
-}
type MarkChannel
    = MName String
    | MRepeat Arrangement
    | MmType Measurement
    | MScale (List ScaleProperty)
    | MBin (List BinProperty)
    | MBinned
    | MImpute (List ImputeProperty)
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
[maTooltip](#maTooltip), [maXOffset](#maXOffset), [maYOffset](#maYOffset),
[maX2Offset](#maX2Offset) and [maY2Offset](#maY2Offset).
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
    | MThickness Float
    | MTicks (List MarkProperty)
    | MTooltip TooltipContent
    | MXOffset Float
    | MYOffset Float
    | MX2Offset Float
    | MY2Offset Float


{-| Type of measurement to be associated with some channel.
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


{-| Generated by [opArgMax](#opArgMax), [opArgMin](#opArgMin), [opCI0](#opCI0),
[opCI1](#opCI1), [opCount](#opCount), [opDistinct](#opDistinct), [opMax](#opMax),
[opMean](#opMean), [opMedian](#opMedian), [opMin](#opMin), [opMissing](#opMissing),
[opQ1](#opQ1), [opQ3](#opQ3), [opStderr](#opStderr), [opStdev](#opStdev),
[opStdevP](#opStdevP), [opSum](#opSum), [opValid](#opValid),
[opVariance](#opVariance) and [opVarianceP](#opVarianceP).
-}
type Operation
    = ArgMax
    | ArgMin
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
on an axis or legend. See the
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


{-| Generated by [pmNone](#pmNone), [pmTransparent](#pmTransparent) and [pmMarker](#pmMarker).
-}
type PointMarker
    = PMTransparent
    | PMNone
    | PMMarker (List MarkProperty)


{-| Type of position channel.
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
[pBinned](#pBinned), [pTimeUnit](#pTimeUnit), [pTitle](#pTitle), [pAggregate](#pAggregate),
[pScale](#pScale), [pAxis](#pAxis), [pSort](#pSort), [pStack](#pStack),
[pWidth](#pWidth), [pHeight](#pHeight) and [pImpute](#pImpute).
-}
type PositionChannel
    = PName String
    | PWidth
    | PHeight
    | PRepeat Arrangement
    | PmType Measurement
    | PBin (List BinProperty)
    | PBinned
    | PTimeUnit TimeUnit
    | PTitle String
    | PAggregate Operation
    | PScale (List ScaleProperty)
    | PAxis (List AxisProperty)
    | PSort (List SortProperty)
    | PStack StackOffset
    | PImpute (List ImputeProperty)


{-| Generated by [albers](#albers), [albersUsa](#albersUsa),
[azimuthalEqualArea](#azimuthalEqualArea), [azimuthalEquidistant](#azimuthalEquidistant),
[conicConformal](#conicConformal), [conicEqualArea](#conicEqualArea),
[conicEquidistant](#conicEquidistant), [equirectangular](#equirectangular),
[gnomonic](#gnomonic), [mercator](#mercator), [orthographic](#orthographic),
[stereographic](#stereographic), [transverseMercator](#transverseMercator) and
[customProjection](#customProjection).
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


{-| Generated by [prType](#prType), [prClipAngle](#prClipAngle), [prClipExtent](#prClipExtent),
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


{-| Generated by functions prefixed with `raco`.
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


{-| Whether or not a scale domain should be independent of others in a composite
visualization. See the
[Vega-Lite resolve documentation](https://vega.github.io/vega-lite/docs/resolve.html).
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


{-| Generated by [scLinear](#scLinear), [scPow](#scPow), [scSqrt](#scSqrt), [scLog](#scLog),
[scTime](#scTime), [scUtc](#scUtc), [scSequential](#scSequential), [scOrdinal](#scOrdinal),
[scBand](#scBand), [scPoint](#scPoint), [scBinLinear](#scBinLinear), [scBinOrdinal](#scBinOrdinal),
[scQuantile](#scQuantile), [scQuantize](#scQuantize) and [scThreshold](#scThreshold).
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
    | ScQuantile
    | ScQuantize
    | ScThreshold


{-| Generated by functions prefixed by `saco`
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


{-| Generated by [doNums](#doNums), [doStrs](#doStrs), [doDts](#doDts),
[doSelection](#doSelection) and [doUnaggregated](#doUnaggregated).
-}
type ScaleDomain
    = DNumbers (List Float)
    | DStrings (List String)
    | DDateTimes (List (List DateTime))
    | DSelection String
    | Unaggregated


{-| Generated by [niTrue](#niTrue), [niFalse](#niFalse), [niMillisecond](#niMillisecond),
[niSecond](#niSecond), [niMinute](#niMinute), [niHour](#niHour), [niDay](#niDay),
[niWeek](#niWeek), [niMonth](#niMonth), [niYear](#niYear), [niTickCount](#niTickCount)
and [niInterval](#niInterval).
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


{-| Generated by [seBind](#seBind), [seBindScales](#seBindScales),[seEmpty](#seEmpty),
[seEncodings](#seEncodings), [seFields](#seFields), [seNearest](#seNearest), [seOn](#seOn),
[seResolve](#seResolve), [seSelectionMark](#seSelectionMark), [seToggle](#seToggle),
[seTranslate](#seTranslate) and [seZoom](#seZoom).
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


{-| How selections in faceted or repeated views are resolved. See the
[Vege-Lite resolve documentation](https://vega.github.io/vega-lite/docs/selection.html#resolve).
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


{-| Generated by [soAscending](#soAscending), [soDescending](#soDescending),
[soByField](#soByField), [soByRepeat](#soByRepeat) and [soCustom](#soCustom).
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


{-| Type of stacking to apply when showing multiple quantities.
-}
type StackOffset
    = StZero
    | StNormalize
    | StCenter
    | NoStack


{-| Generated by [stOffset](#stOffset) and [stSort](#stSort).
-}
type StackProperty
    = StOffset StackOffset
    | StSort (List SortField)


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


{-| Generated by [symCircle](#symCircle), [symSquare](#symSquare), [symCross](#symCross),
[symDiamond](#symDiamond), [symTriangleUp](#symTriangleUp), [symTriangleDown](#symTriangleDown)
and [symPath](#symPath).
-}
type Symbol
    = SymCircle
    | SymSquare
    | SymCross
    | SymDiamond
    | SymTriangleUp
    | SymTriangleDown
    | SymPath String


{-| Generated by [exCi](#exCi), [exIqr](#exIqr), [exIqrScale](#exIqrScale), [exRange](#exRange),
[exStderr](#exStderr) and [exStdev](#exStdev).
-}
type SummaryExtent
    = ExCI
    | ExStderr
    | ExStdev
    | ExIqr
    | ExRange
    | ExIqrScale Float


{-| Generated by [tName](#tName), [tRepeat](#tRepeat), [tMType](#tMType),
[tBin](#tBin), [tBinned](#tBinned), [tAggregate](#tAggregate), [tTimeUnit](#tTimeUnit),
[tTitle](#tTitle), [tSelectionCondition](#tSelectionCondition),
[tDataCondition](#tDataCondition) and [tFormat](#tFormat).
-}
type TextChannel
    = TName String
    | TRepeat Arrangement
    | TmType Measurement
    | TBin (List BinProperty)
    | TBinned
    | TAggregate Operation
    | TTimeUnit TimeUnit
    | TTitle String
    | TSelectionCondition BooleanOp (List TextChannel) (List TextChannel)
    | TDataCondition (List ( BooleanOp, List TextChannel )) (List TextChannel)
    | TFormat String


{-| Generated by [date](#date), [day](#day), [hours](#hours), [hoursMinutes](#hoursMinutes),
[hoursMinutesSeconds](#hoursMinutesSeconds), [milliseconds](#milliseconds),
[minutes](#minutes), [minutesSeconds](#minutesSeconds), [month](#month), [monthDate](#monthDate),
[quarter](#quarter), [quarterMonth](#quarterMonth), [seconds](#seconds),
[secondsMilliseconds](#secondsMilliseconds), [year](#year), [yearQuarter](#yearQuarter),
[yearQuarterMonth](#yearQuarterMonth), [yearMonth](#yearMonth), [yearMonthDate](#yearMonthDate),
[yearMonthDateHours](#yearMonthDateHours), [yearMonthDateHoursMinutes](#yearMonthDateHoursMinutes),
[yearMonthDateHoursMinutesSeconds](#yearMonthDateHoursMinutesSeconds) and [utc](#utc).
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


{-| Generated by functions prefixed by `tico`.
-}
type TitleConfig
    = TAnchor Anchor
    | TAngle Float
    | TBaseline VAlign
    | TColor String
    | TFont String
    | TFontSize Float
    | TFontWeight FontWeight
    | TLimit Float
    | TOffset Float
    | TOrient Side


{-| Indicate whether tooltips are generated by encoding (default) or data.
-}
type TooltipContent
    = TTEncoding
    | TTData


{-| Vertical alignment of some text that may be attached to a mark.
-}
type VAlign
    = AlignTop
    | AlignMiddle
    | AlignBottom


{-| Generated by functions prefixed with `vico`.
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
[`filter`](#filter), [`binAs`](#binAs) and [`calculateAs`](#calculateAs) and geo
transformations of longitude, latitude coordinates used by marks such as those
generated by [`geoshape`](#geoshape), [`point`](#point) and [`line`](#line).

**Mark functions** specify the symbols used to visualize data items. Generated
by functions such as [`circle`](#circle), [`bar`](#bar) and [`line`](#line).

**Encoding properties** specify which data elements are mapped to which mark
characteristics (known as _channels_). Generated by [`encoding`](#encoding) they
include encodings such as [`position`](#position), [`color`](#color), [`size`](#size),
[`shape`](#shape), [`text`](#text) and [`hyperlink`](#hyperlink).

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
    | WOp WOperation
    | WParam Int
    | WField String


{-| Generated by [woRowNumber](#woRowNumber), [woRank](#woRank), [woDenseRank](#woDenseRank),
[woPercentRank](#woPercentRank), [woCumeDist](#woCumeDist), [woPercentile](#woPercentile),
[woLag](#woLag), [woLead](#woLead), [woFirstValue](#woFirstValue), [woLastValue](#woLastValue),
and [woNthValue](#woNthValue).
-}
type WOperation
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
    | WSort (List SortField)


{-| Generated by [stAscending](#stAscending), [wiAscending](#wiAscending),
[stDescending](#stDescending) and [wiDescending](#wiDescending).
-}
type SortField
    = WAscending String
    | WDescending String


{-| Aggregation transformations to be used when encoding channels. Useful when for
applying the same transformation to a number of channels without defining it each
time. The first parameter is a list of the named aggregation operations to apply.
The second is a list of 'group by' fields.

    trans =
        transform
            << aggregate
                [ opAs Min "people" "lowerBound", opAs Max "people" "upperBound" ]
                [ "age" ]

-}
aggregate : List Spec -> List String -> List LabelledSpec -> List LabelledSpec
aggregate ops groups =
    (::) ( "aggregate", toList [ toList ops, JE.list JE.string groups ] )


{-| An Albers map projection.
-}
albers : Projection
albers =
    Albers


{-| An Albers USA map projection that combines continental USA with Alaska and Hawaii.
-}
albersUsa : Projection
albersUsa =
    AlbersUsa


{-| Alignment to apply to grid rows and columns generated by a composition
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


{-| Apply an 'and' Boolean operation as part of a logical composition.

    and (expr "datum.IMDB_Rating === null") (expr "datum.Rotten_Tomatoes_Rating === null")

-}
and : BooleanOp -> BooleanOp -> BooleanOp
and op1 op2 =
    And op1 op2


{-| Anchor some text at its end.
-}
anEnd : Anchor
anEnd =
    AnEnd


{-| Anchor some text in its start.
-}
anMiddle : Anchor
anMiddle =
    AnMiddle


{-| Anchor some text at its start.
-}
anStart : Anchor
anStart =
    AnStart


{-| Column arrangment in a repeated/faceted view.
-}
arColumn : Arrangement
arColumn =
    Column


{-| An [area mark](https://vega.github.io/vega-lite/docs/area.html) for representing
a series of data elements, such as in a stacked area chart or streamgraph.
-}
area : List MarkProperty -> ( VLProperty, Spec )
area =
    mark Area


{-| Row arrangment in a repeated/faceted view.
-}
arRow : Arrangement
arRow =
    Row


{-| Interpret visualization dimensions to be for the data rectangle (external
padding added to this size).
-}
asContent : Autosize
asContent =
    AContent


{-| Interpret visualization dimensions to be for the entire visualization (data
rectangle is shrunk to accommodate external decorations padding).
-}
asFit : Autosize
asFit =
    AFit


{-| No autosizing to be applied.
-}
asNone : Autosize
asNone =
    ANone


{-| Automatically expand size of visulization from the given dimensions in order
to fit in all supplemtary decorations (legends etc.).
-}
asPad : Autosize
asPad =
    APad


{-| Interpret visualization width to be for the entire visualization (data
rectangle is shrunk to accommodate external padding).
-}
asPadding : Autosize
asPadding =
    APadding


{-| Recalculate autosizing on every view update.
-}
asResize : Autosize
asResize =
    AResize


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


{-| Position of axis tick relative to a band (0 to 1).
-}
axBandPosition : Float -> AxisProperty
axBandPosition =
    AxBandPosition


{-| Default axis band position.
-}
axcoBandPosition : Float -> AxisConfig
axcoBandPosition =
    BandPosition


{-| Whether or not an axis domain should be displayed by default.
-}
axcoDomain : Bool -> AxisConfig
axcoDomain =
    Domain


{-| Default axis domain color.
-}
axcoDomainColor : String -> AxisConfig
axcoDomainColor =
    DomainColor


{-| Default axis domain opacity.
-}
axcoDomainOpacity : Float -> AxisConfig
axcoDomainOpacity =
    DomainOpacity


{-| Default axis domain width style.
-}
axcoDomainWidth : Float -> AxisConfig
axcoDomainWidth =
    DomainWidth


{-| Whether or not an axis grid is displayed by default.
-}
axcoGrid : Bool -> AxisConfig
axcoGrid =
    Grid


{-| Default axis grid color style.
-}
axcoGridColor : String -> AxisConfig
axcoGridColor =
    GridColor


{-| Default axis line dash style.
-}
axcoGridDash : List Float -> AxisConfig
axcoGridDash =
    GridDash


{-| Default axis grid line opacity.
-}
axcoGridOpacity : Float -> AxisConfig
axcoGridOpacity =
    GridOpacity


{-| Default axis grid line width.
-}
axcoGridWidth : Float -> AxisConfig
axcoGridWidth =
    GridWidth


{-| Whether or not an axis has labels by default.
-}
axcoLabels : Bool -> AxisConfig
axcoLabels =
    Labels


{-| Default axis label horizontal alignment.
-}
axcoLabelAlign : HAlign -> AxisConfig
axcoLabelAlign =
    LabelAlign


{-| Default axis label angle.
-}
axcoLabelAngle : Float -> AxisConfig
axcoLabelAngle =
    LabelAngle


{-| Default axis label vertical alignment.
-}
axcoLabelBaseline : VAlign -> AxisConfig
axcoLabelBaseline =
    LabelBaseline


{-| Default axis label bounding when label exceeds available space. If `Nothing`,
no check for label size is made. A number specifies the permitted overflow in pixels.
-}
axcoLabelBound : Maybe Float -> AxisConfig
axcoLabelBound =
    LabelBound


{-| Default axis label color.
-}
axcoLabelColor : String -> AxisConfig
axcoLabelColor =
    LabelColor


{-| Default label alignment at beginning or end of the axis. Specifies the distance
threshold from an end-point within which labels are flush-adjusted or if `Nothing`,
no flush-adjustment made.
-}
axcoLabelFlush : Maybe Float -> AxisConfig
axcoLabelFlush =
    LabelFlush


{-| Defailt number of pixels by which to offset flush-adjusted labels.
-}
axcoLabelFlushOffset : Float -> AxisConfig
axcoLabelFlushOffset =
    LabelFlushOffset


{-| Default axis label font.
-}
axcoLabelFont : String -> AxisConfig
axcoLabelFont =
    LabelFont


{-| Default axis label font size.
-}
axcoLabelFontSize : Float -> AxisConfig
axcoLabelFontSize =
    LabelFontSize


{-| Default axis label font weight.
-}
axcoLabelFontWeight : FontWeight -> AxisConfig
axcoLabelFontWeight =
    LabelFontWeight


{-| Default axis label limit (how much a label can extend beyond the
left/bottom or right/top of the axis line).
-}
axcoLabelLimit : Float -> AxisConfig
axcoLabelLimit =
    LabelLimit


{-| Default axis label overlap strategy for cases where labels cannot
fit within the allotted space.
-}
axcoLabelOverlap : OverlapStrategy -> AxisConfig
axcoLabelOverlap =
    LabelOverlap


{-| Default axis label opacity.
-}
axcoLabelOpacity : Float -> AxisConfig
axcoLabelOpacity =
    LabelOpacity


{-| Default axis label padding (space between labels in pixels).
-}
axcoLabelPadding : Float -> AxisConfig
axcoLabelPadding =
    LabelPadding


{-| Default maximum extent style.
-}
axcoMaxExtent : Float -> AxisConfig
axcoMaxExtent =
    MaxExtent


{-| Default minimum extent style.
-}
axcoMinExtent : Float -> AxisConfig
axcoMinExtent =
    MinExtent


{-| Whether or not an axis should use short time labels by default.
-}
axcoShortTimeLabels : Bool -> AxisConfig
axcoShortTimeLabels =
    ShortTimeLabels


{-| Default axis tick mark color.
-}
axcoTickColor : String -> AxisConfig
axcoTickColor =
    TickColor


{-| Whether or not by default an extra axis tick should be added for the initial
position of axes.
-}
axcoTickExtra : Bool -> AxisConfig
axcoTickExtra =
    TickExtra


{-| Default offset in pixels of axis ticks, labels and gridlines.
-}
axcoTickOffset : Float -> AxisConfig
axcoTickOffset =
    TickOffset


{-| Default opacity of axis ticks.
-}
axcoTickOpacity : Float -> AxisConfig
axcoTickOpacity =
    TickOpacity


{-| Whether or not axis tick labels use rounded values by default.
-}
axcoTickRound : Bool -> AxisConfig
axcoTickRound =
    TickRound


{-| Whether or not an axis should show ticks by default.
-}
axcoTicks : Bool -> AxisConfig
axcoTicks =
    Ticks


{-| Default axis tick mark size.
-}
axcoTickSize : Float -> AxisConfig
axcoTickSize =
    TickSize


{-| Default step size for axis ticks.
-}
axcoTickStep : Float -> AxisConfig
axcoTickStep =
    TickStep


{-| Default opacity of axis titles.
-}
axcoTitleOpacity : Float -> AxisConfig
axcoTitleOpacity =
    TitleOpacity


{-| Default axis tick mark width.
-}
axcoTickWidth : Float -> AxisConfig
axcoTickWidth =
    TickWidth


{-| Default axis tick label horizontal alignment.
-}
axcoTitleAlign : HAlign -> AxisConfig
axcoTitleAlign =
    TitleAlign


{-| Default axis title angle.
-}
axcoTitleAngle : Float -> AxisConfig
axcoTitleAngle =
    TitleAngle


{-| Default axis title vertical alignment.
-}
axcoTitleBaseline : VAlign -> AxisConfig
axcoTitleBaseline =
    TitleBaseline


{-| Default axis title color.
-}
axcoTitleColor : String -> AxisConfig
axcoTitleColor =
    TitleColor


{-| Default axis title font.
-}
axcoTitleFont : String -> AxisConfig
axcoTitleFont =
    TitleFont


{-| Default axis title font weight.
-}
axcoTitleFontWeight : FontWeight -> AxisConfig
axcoTitleFontWeight =
    TitleFontWeight


{-| Default axis title font size.
-}
axcoTitleFontSize : Float -> AxisConfig
axcoTitleFontSize =
    TitleFontSize


{-| Default axis title maximum size.
-}
axcoTitleLimit : Float -> AxisConfig
axcoTitleLimit =
    TitleLimit


{-| Default axis title padding between axis line and text.
-}
axcoTitlePadding : Float -> AxisConfig
axcoTitlePadding =
    TitlePadding


{-| Default axis x-position relative to the axis group.
-}
axcoTitleX : Float -> AxisConfig
axcoTitleX =
    TitleX


{-| Default axis y-position relative to the axis group.
-}
axcoTitleY : Float -> AxisConfig
axcoTitleY =
    TitleY


{-| Dates/times to appear along an axis.
-}
axDates : List (List DateTime) -> AxisProperty
axDates =
    AxDates


{-| Whether or not an axis baseline (domain) should be included as part of an axis.
-}
axDomain : Bool -> AxisProperty
axDomain =
    AxDomain


{-| Color of axis domain line.
-}
axDomainColor : String -> AxisProperty
axDomainColor =
    AxDomainColor


{-| Opacity of axis domain line.
-}
axDomainOpacity : Float -> AxisProperty
axDomainOpacity =
    AxDomainOpacity


{-| Width of axis domain line.
-}
axDomainWidth : Float -> AxisProperty
axDomainWidth =
    AxDomainWidth


{-| [Format](https://vega.github.io/vega-lite/docs/format.html) to apply to
labels on an axis.
-}
axFormat : String -> AxisProperty
axFormat =
    AxFormat


{-| Whether or not grid lines should be included as part of an axis.
-}
axGrid : Bool -> AxisProperty
axGrid =
    AxGrid


{-| Horizontal alignment of axis tick labels.
-}
axLabelAlign : HAlign -> AxisProperty
axLabelAlign =
    AxLabelAlign


{-| Vertical alignment of axis tick labels.
-}
axLabelBaseline : VAlign -> AxisProperty
axLabelBaseline =
    AxLabelBaseline


{-| How or if labels should be hidden if they exceed the axis range. If
`Nothing`, no check for label size is made. A number specifies the permitted
overflow in pixels.
-}
axLabelBound : Maybe Float -> AxisProperty
axLabelBound =
    AxLabelBound


{-| Color of axis tick label.
-}
axLabelColor : String -> AxisProperty
axLabelColor =
    AxLabelColor


{-| How or if labels at beginning or end of the axis should be aligned. Specifies
the distance threshold from an end-point within which labels are flush-adjusted
or if `Nothing`, no flush-adjustment made.
-}
axLabelFlush : Maybe Float -> AxisProperty
axLabelFlush =
    AxLabelFlush


{-| Number of pixels by which to offset flush-adjusted labels.
-}
axLabelFlushOffset : Float -> AxisProperty
axLabelFlushOffset =
    AxLabelFlushOffset


{-| Font name of an axis label.
-}
axLabelFont : String -> AxisProperty
axLabelFont =
    AxLabelFont


{-| Font size of an axis label.
-}
axLabelFontSize : Float -> AxisProperty
axLabelFontSize =
    AxLabelFontSize


{-| Font weight of an axis label.
-}
axLabelFontWeight : FontWeight -> AxisProperty
axLabelFontWeight =
    AxLabelFontWeight


{-| Maximum length in pixels of axis tick labels.
-}
axLabelLimit : Float -> AxisProperty
axLabelLimit =
    AxLabelLimit


{-| Opacity of an axis label.
-}
axLabelOpacity : Float -> AxisProperty
axLabelOpacity =
    AxLabelOpacity


{-| Color of axis ticks.
-}
axTickColor : String -> AxisProperty
axTickColor =
    AxTickColor


{-| Whether or not an extra axis tick should be added for the initial position
of an axis.
-}
axTickExtra : Bool -> AxisProperty
axTickExtra =
    AxTickExtra


{-| Offset in pixels of an axis's ticks, labels and gridlines.
-}
axTickOffset : Float -> AxisProperty
axTickOffset =
    AxTickOffset


{-| Opacity of axis ticks.
-}
axTickOpacity : Float -> AxisProperty
axTickOpacity =
    AxTickOpacity


{-| Whether or not axis tick positions should be rounded to nearest integer.
-}
axTickRound : Bool -> AxisProperty
axTickRound =
    AxTickRound


{-| Desired step size for ticks. Will generate corresponding tick count and values.
-}
axTickStep : Float -> AxisProperty
axTickStep =
    AxTickStep


{-| Width of axis ticks.
-}
axTickWidth : Float -> AxisProperty
axTickWidth =
    AxTickWidth


{-| Vertical alignment of axis title.
-}
axTitleBaseline : VAlign -> AxisProperty
axTitleBaseline =
    AxTitleBaseline


{-| Color of axis title.
-}
axTitleColor : String -> AxisProperty
axTitleColor =
    AxTitleColor


{-| Font name for an axis title.
-}
axTitleFont : String -> AxisProperty
axTitleFont =
    AxTitleFont


{-| Font size for an axis title.
-}
axTitleFontSize : Float -> AxisProperty
axTitleFontSize =
    AxTitleFontSize


{-| Font weight of an axis title.
-}
axTitleFontWeight : FontWeight -> AxisProperty
axTitleFontWeight =
    AxTitleFontWeight


{-| Maximum length in pixels of axis title.
-}
axTitleLimit : Float -> AxisProperty
axTitleLimit =
    AxTitleLimit


{-| Opacity of an axis title.
-}
axTitleOpacity : Float -> AxisProperty
axTitleOpacity =
    AxTitleOpacity


{-| X position of an axis title relative to the axis group.
-}
axTitleX : Float -> AxisProperty
axTitleX =
    AxTitleX


{-| Y position of an axis title relative to the axis group.
-}
axTitleY : Float -> AxisProperty
axTitleY =
    AxTitleY


{-| Rotation angle in degrees of axis labels.
-}
axLabelAngle : Float -> AxisProperty
axLabelAngle =
    AxLabelAngle


{-| Overlap strategy for labels when they are too large to fit within the space
devoted to an axis.
-}
axLabelOverlap : OverlapStrategy -> AxisProperty
axLabelOverlap =
    AxLabelOverlap


{-| Padding in pixels between an axis and its text labels.
-}
axLabelPadding : Float -> AxisProperty
axLabelPadding =
    AxLabelPadding


{-| Whether or not axis labels should be displayed.
-}
axLabels : Bool -> AxisProperty
axLabels =
    AxLabels


{-| Maximum extent in pixels that axis ticks and labels should use.
-}
axMaxExtent : Float -> AxisProperty
axMaxExtent =
    AxMaxExtent


{-| Minimum extent in pixels that axis ticks and labels should use.
-}
axMinExtent : Float -> AxisProperty
axMinExtent =
    AxMinExtent


{-| Offset to displace the axis from the edge of the enclosing group or data rectangle.
-}
axOffset : Float -> AxisProperty
axOffset =
    AxOffset


{-| Orientation of an axis relative to the plot it is describing.
-}
axOrient : Side -> AxisProperty
axOrient =
    AxOrient


{-| Anchor position of the axis in pixels. For x-axis with top or
bottom orientation, this sets the axis group x coordinate. For y-axis with left
or right orientation, this sets the axis group y coordinate.
-}
axPosition : Float -> AxisProperty
axPosition =
    AxPosition


{-| Whether or not an axis should include tick marks.
-}
axTicks : Bool -> AxisProperty
axTicks =
    AxTicks


{-| Desired number of ticks for axes visualizing quantitative scales.
The resulting number may be different so that values are “nice” (multiples of 2, 5, 10).
-}
axTickCount : Int -> AxisProperty
axTickCount =
    AxTickCount


{-| Tick mark size in pixels.
-}
axTickSize : Float -> AxisProperty
axTickSize =
    AxTickSize


{-| Title to display as part of an axis. An empty string can be used
to prevent a title being displayed.
-}
axTitle : String -> AxisProperty
axTitle =
    AxTitle


{-| Horizontal alignment of an axis title.
-}
axTitleAlign : HAlign -> AxisProperty
axTitleAlign =
    AxTitleAlign


{-| Angle in degrees of an axis title.
-}
axTitleAngle : Float -> AxisProperty
axTitleAngle =
    AxTitleAngle


{-| Padding in pixels between a title and axis.
-}
axTitlePadding : Float -> AxisProperty
axTitlePadding =
    AxTitlePadding


{-| Numeric values to appear along an axis.
-}
axValues : List Float -> AxisProperty
axValues =
    AxValues


{-| Drawing order of the axis relative to the other chart elements. 1 indicates
axis is drawn in front of chart marks, 0 indicates it is drawn behind them.
-}
axZIndex : Int -> AxisProperty
axZIndex =
    AxZIndex


{-| An azimuthal equal area map projection.
-}
azimuthalEqualArea : Projection
azimuthalEqualArea =
    AzimuthalEqualArea


{-| An azimuthal equidistant map projection.
-}
azimuthalEquidistant : Projection
azimuthalEquidistant =
    AzimuthalEquidistant


{-| Background color of the visualization. Should be specified with a CSS
string such as `#ffe` or `rgb(200,20,150)`. If not specified the background will
be transparent.
-}
background : String -> ( VLProperty, Spec )
background colour =
    ( VLBackground, JE.string colour )


{-| [Bar mark](https://vega.github.io/vega-lite/docs/bar.html) for histograms,
bar charts etc.
-}
bar : List MarkProperty -> ( VLProperty, Spec )
bar =
    mark Bar


{-| Number base to use for automatic bin determination (default is base 10).
-}
biBase : Float -> BinProperty
biBase =
    Base


{-| Scale factors indicating allowable subdivisions for binning. The default value
is [5, 2], which indicates that for base 10 numbers (the default base), binning
will consider dividing bin sizes by 5 and/or 2.
-}
biDivide : List Float -> BinProperty
biDivide =
    Divides


{-| Desired range of bin values when binning a collection of values.
The first and second parameters indicate the minimum and maximum range values.
-}
biExtent : Float -> Float -> BinProperty
biExtent =
    Extent


{-| Maximum number of bins when binning a collection of values.
-}
biMaxBins : Int -> BinProperty
biMaxBins =
    MaxBins


{-| Step size between bins when binning a collection of values.
-}
biMinStep : Float -> BinProperty
biMinStep =
    MinStep


{-| Whether or not binning boundaries use human-friendly values such as multiples
of ten.
-}
biNice : Bool -> BinProperty
biNice =
    Nice


{-| Binning transformation that may be referenced in other transformations or
encodings. The type of binning can be customised with a list of `BinProperty`
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
        (::) ( "bin", toList [ JE.bool True, JE.string field, JE.string label ] )

    else
        (::) ( "bin", toList [ bProps |> List.map binProperty |> JE.object, JE.string field, JE.string label ] )


{-| Step size between bins when binning a collection of values.
-}
biStep : Float -> BinProperty
biStep =
    Step


{-| Allowable step sizes between bins when binning a collection of values.
-}
biSteps : List Float -> BinProperty
biSteps =
    Steps


{-| A boolean data value.
-}
boo : Bool -> DataValue
boo =
    Boolean


{-| A list of boolean data values.
-}
boos : List Bool -> DataValues
boos =
    Booleans


{-| Bounds calculation method to use for determining the extent of a sub-plot in
a composed view. If set to `Full` the entire calculated bounds including axes,
title and legend are used; if `Flush` only the width and height values for the
sub-view will be used.
-}
bounds : Bounds -> ( VLProperty, Spec )
bounds bnds =
    ( VLBounds, boundsSpec bnds )


{-| [Boxplot composite mark](https://vega.github.io/vega-lite/docs/boxplot.html)
for showing summaries of statistical distibutions.
-}
boxplot : List MarkProperty -> ( VLProperty, Spec )
boxplot =
    mark Boxplot


{-| Generate a new data field based on calculations from existing fields.
The first parameter is an expression representing the calculation and the second
is the name to give the newly calculated field.

    trans =
        transform << calculateAs "datum.sex == 2 ? 'F' : 'M'" "gender"

-}
calculateAs : String -> String -> List LabelledSpec -> List LabelledSpec
calculateAs ex label =
    (::) ( "calculate", toList [ JE.string ex, JE.string label ] )


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


{-| Whether or not sub-views specified in a composition operator should be centred
relative to their respective rows and columns.
-}
center : Bool -> ( VLProperty, Spec )
center c =
    ( VLCenter, JE.bool c )


{-| Similar to [center](#center) but with independent centring for rows and columns.
-}
centerRC : Bool -> Bool -> ( VLProperty, Spec )
centerRC cRow cCol =
    ( VLCenter, JE.object [ ( "row", JE.bool cRow ), ( "col", JE.bool cCol ) ] )


{-| Color channel to be used in a resolution specification
-}
chColor : Channel
chColor =
    ChColor


{-| Shape channel to be used in a resolution specification
-}
chShape : Channel
chShape =
    ChShape


{-| Size channel to be used in a resolution specification
-}
chSize : Channel
chSize =
    ChSize


{-| Opacity channel to be used in a resolution specification
-}
chOpacity : Channel
chOpacity =
    ChOpacity


{-| X-channel to be used in a resolution specification
-}
chX : Channel
chX =
    ChX


{-| X2-channel to be used in a resolution specification
-}
chX2 : Channel
chX2 =
    ChX2


{-| Y-channel to be used in a resolution specification
-}
chY : Channel
chY =
    ChY


{-| Y2-channel to be used in a resolution specification
-}
chY2 : Channel
chY2 =
    ChY2


{-| [Circle mark](https://vega.github.io/vega-lite/docs/circle.html) for
symbolising points.
-}
circle : List MarkProperty -> ( VLProperty, Spec )
circle =
    mark Circle


{-| Clipping rectangle in pixel units. The four parameters are respectively
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


{-| Configure the default appearance of geoshape marks.
-}
coGeoshape : List MarkProperty -> ConfigurationProperty
coGeoshape =
    GeoshapeStyle


{-| Configure the default appearance of facet headers.
-}
coHeader : List HeaderProperty -> ConfigurationProperty
coHeader =
    HeaderStyle


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
that characterise the way a data field is encoded by color.
-}
color : List MarkChannel -> List LabelledSpec -> List LabelledSpec
color markProps =
    (::) ( "color", List.concatMap markChannelProperty markProps |> JE.object )


{-| Encodes a new facet to be arranged in columns. The first parameter is a list
of properties that define the faceting channel. This should include at least the
name of the data field and its measurement type.
-}
column : List FacetChannel -> List LabelledSpec -> List LabelledSpec
column fFields =
    (::) ( "column", JE.object (List.map facetChannelProperty fFields) )


{-| The mapping between a column and its field definitions in a set of
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
for rendering. Useful when you wish to create a single page with multiple
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


{-| A configuration option to be applied globally across the visualization.
-}
configuration : ConfigurationProperty -> List LabelledSpec -> List LabelledSpec
configuration cfg =
    (::) (configProperty cfg)


{-| Create a single global configuration from a list of configuration specifications.
See the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/config.html).

    config =
        configure
            << configuration (coAxis [ axcoDomainWidth 1 ])
            << configuration (coView [ vicoStroke Nothing ])
            << configuration (coSelection [ ( Single, [ seOn "dblclick" ] ) ])

-}
configure : List LabelledSpec -> ( VLProperty, Spec )
configure configs =
    ( VLConfig, JE.object configs )


{-| A conformal conic map projection.
-}
conicConformal : Projection
conicConformal =
    ConicConformal


{-| An equal area conic map projection.
-}
conicEqualArea : Projection
conicEqualArea =
    ConicEqualArea


{-| An equidistant conic map projection.
-}
conicEquidistant : Projection
conicEquidistant =
    ConicEquidistant


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
coStack : StackOffset -> ConfigurationProperty
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


{-| Configure the default style of trail marks.
-}
coTrail : List MarkProperty -> List LabelledSpec -> List LabelledSpec
coTrail mps =
    (::) (configProperty (TrailStyle mps))


{-| Configure the default single view style.
-}
coView : List ViewConfig -> ConfigurationProperty
coView =
    View


{-| CSV data file format (only necessary if the file extension does not indicate the
type).
-}
csv : Format
csv =
    CSV


{-| Cube helix color interpolation for continuous color scales using the given
gamma value (anchored at 1).
-}
cubeHelix : Float -> CInterpolate
cubeHelix =
    CubeHelix


{-| Long-path cube helix color interpolation for continuous color scales using
the given gamma value (anchored at 1).
-}
cubeHelixLong : Float -> CInterpolate
cubeHelixLong =
    CubeHelixLong


{-| Custom projection type. Additional custom projections from d3 can be defined
via the [Vega API](https://vega.github.io/vega/docs/projections/#register) and
called from with this function where the parameter is the name of the D3
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


{-| Create a column of data. A column has a name and a list of values.
-}
dataColumn : String -> DataValues -> List DataColumn -> List DataColumn
dataColumn colName data =
    case data of
        Numbers col ->
            (::) (List.map (\x -> ( colName, JE.float x )) col)

        Strings col ->
            (::) (List.map (\s -> ( colName, JE.string s )) col)

        DateTimes col ->
            (::) (List.map (\ds -> ( colName, JE.object (List.map dateTimeProperty ds) )) col)

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
            cols |> transpose |> JE.list JE.object
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
        ( VLData, JE.object [ ( "values", toList rows ) ] )

    else
        ( VLData
        , JE.object
            [ ( "values", toList rows )
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
-}
dataRow : List ( String, DataValue ) -> List DataRow -> List DataRow
dataRow r =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, dataValueSpec val )) r))


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
            JE.list JE.object
                [ [ ( "cat", JE.string "a" ), ( "val", JE.float 120 ) ]
                , [ ( "cat", JE.string "b" ), ( "val", JE.float 180 ) ]
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
            List.map (\( s, data ) -> ( s, (\( _, spec ) -> extract spec) data )) namedData
    in
    ( VLDatasets, JE.object specs )


{-| Name to give a data source. Useful when a specification needs to reference a
data source, such as one generated via an API call.

    data =
        dataFromUrl "myData.json" [] |> dataName "myName"

-}
dataName : String -> Data -> Data
dataName s data =
    let
        extract d =
            case JD.decodeString (JD.keyValuePairs JD.value) (JE.encode 0 d) of
                Ok [ ( dType, value ) ] ->
                    ( dType, value )

                _ ->
                    --|> Debug.log "Non-data spec provided to dataName"
                    ( "", d )

        spec =
            (\( _, dataSpec ) -> extract dataSpec) data
    in
    ( VLData, JE.object [ ( "name", JE.string s ), spec ] )


{-| Day of the month (1-31) time unit used for discretizing temporal data.
-}
date : TimeUnit
date =
    Date


{-| Day of the week time unit used for discretizing temporal data.
-}
day : TimeUnit
day =
    Day


{-| Discretize numeric values into bins when encoding with a level of detail
(grouping) channel.
-}
dBin : List BinProperty -> DetailChannel
dBin =
    DBin


{-| Description to be associated with a visualization.
-}
description : String -> ( VLProperty, Spec )
description s =
    ( VLDescription, JE.string s )


{-| Encode a 'level of detail' channel. This provides a way of grouping by a field
but unlike, say `color`, all groups have the same visual properties. The first
parameter is a list of the field characteristics to be grouped.
-}
detail : List DetailChannel -> List LabelledSpec -> List LabelledSpec
detail detailProps =
    (::) ( "detail", List.map detailChannelProperty detailProps |> JE.object )


{-| Set the iputation rules for a detail channel. See the
[Vega-Lite impute documentation](https://vega.github.io/vega-lite/docs/impute.html)
-}
dImpute : List ImputeProperty -> DetailChannel
dImpute =
    DImpute


{-| Field used for encoding with a level of detail (grouping) channel.
-}
dName : String -> DetailChannel
dName =
    DName


{-| Level of measurement when encoding with a level of detail (grouping) channel.
-}
dMType : Measurement -> DetailChannel
dMType =
    DmType


{-| Date-time values that define a scale domain.
-}
doDts : List (List DateTime) -> ScaleDomain
doDts =
    DDateTimes


{-| Create a pair of continuous domain to color mappings suitable for customising
ordered scales. The first parameter is a tuple representing the mapping of the lowest
numeric value in the domain to its equivalent color; the second tuple the mapping
of the highest numeric value to color. If the domain contains any values between
these lower and upper bounds they are interpolated according to the scale's interpolation
function. Convenience function equivalent to specifying separate `SDomain` and
`SRange` lists and is safer as it guarantees a one-to-one correspondence between
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


{-| Numeric values that define a scale domain.
-}
doNums : List Float -> ScaleDomain
doNums =
    DNumbers


{-| Scale domain based on a named interactive selection.
-}
doSelection : String -> ScaleDomain
doSelection =
    DSelection


{-| String values that define a scale domain.
-}
doStrs : List String -> ScaleDomain
doStrs =
    DStrings


{-| Specify an unaggregated scale domain (type of data in scale).
-}
doUnaggregated : ScaleDomain
doUnaggregated =
    Unaggregated


{-| Delimited file format (DSV) with a given separator.
-}
dsv : Char -> Format
dsv =
    DSV


{-| Date-time data value.
-}
dt : List DateTime -> DataValue
dt =
    DateTime


{-| Day of the month (1 to 31).
-}
dtDate : Int -> DateTime
dtDate =
    DTDate


{-| Day of the week.
-}
dtDay : DayName -> DateTime
dtDay =
    DTDay


{-| Hour of the day (0=midnight, 1=1am, 23=11pm etc.).
-}
dtHour : Int -> DateTime
dtHour =
    DTHours


{-| Form of time unit aggregation of field values when encoding with a level of
detail (grouping) channel.
-}
dTimeUnit : TimeUnit -> DetailChannel
dTimeUnit =
    DTimeUnit


{-| Millisecond of a second (0-999).
-}
dtMillisecond : Int -> DateTime
dtMillisecond =
    DTMilliseconds


{-| Minute of an hour (0-59).
-}
dtMinute : Int -> DateTime
dtMinute =
    DTMinutes


{-| Month of a year (1 to 12).
-}
dtMonth : MonthName -> DateTime
dtMonth =
    DTMonth


{-| Year quarter (1 to 4).
-}
dtQuarter : Int -> DateTime
dtQuarter =
    DTQuarter


{-| Min max date-time range to be used in data filtering. If either
parameter is an empty list, it is assumed to be unbounded.
-}
dtRange : List DateTime -> List DateTime -> FilterRange
dtRange =
    DateRange


{-| List of date-time data values.
-}
dts : List (List DateTime) -> DataValues
dts =
    DateTimes


{-| Second of a minute (0-59).
-}
dtSecond : Int -> DateTime
dtSecond =
    DTSeconds


{-| A year.
-}
dtYear : Int -> DateTime
dtYear =
    DTYear


{-| Create an encoding specification from a list of channel encodings.
-}
encoding : List LabelledSpec -> ( VLProperty, Spec )
encoding channels =
    ( VLEncoding, JE.object channels )


{-| An equirectangular (default) map projection that maps longitude to x and
latitude to y.
-}
equirectangular : Projection
equirectangular =
    Equirectangular


{-| [Errorband composite mark](https://vega.github.io/vega-lite/docs/errorband.html)
for showing summaries of variation along a signal. By default no border is drawn.
To add a border with default properties use [maBorders](#maBorders) with an empty list.
-}
errorband : List MarkProperty -> ( VLProperty, Spec )
errorband =
    mark Errorband


{-| [Errorbar composite mark](https://vega.github.io/vega-lite/docs/errorbar.html)
for showing summaries of variation along a signal. By default no ticks are drawn.
To add ticks with default properties use [maTicks](#maTicks) with an empty list.
-}
errorbar : List MarkProperty -> ( VLProperty, Spec )
errorbar =
    mark Errorbar


{-| Band extent between the 95% confidence intervals of a distribution.
-}
exCi : SummaryExtent
exCi =
    ExCI


{-| Band extent between the lower and upper quartiles of a distribution.
-}
exIqr : SummaryExtent
exIqr =
    ExIqr


{-| Expression that should evaluate to either true or false. Can use any valid
[Vega expression](https://vega.github.io/vega/docs/expressions/).
-}
expr : String -> BooleanOp
expr =
    Expr


{-| Band extent between the minumum and maximum values in a distribution.
-}
exRange : SummaryExtent
exRange =
    ExRange


{-| Band extent as the standard error about the mean of a distribution.
-}
exStderr : SummaryExtent
exStderr =
    ExStderr


{-| Band extent as the standard deviation of a distribution.
-}
exStdev : SummaryExtent
exStdev =
    ExStdev


{-| Fields to be used to facet a view in rows or columns creating a set of small
multiples. Used when the encoding of the visualization in small multiples is
identical, but data for each is grouped by the given fields. When
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
reference to something that generates a Boolean value. Convenience function
equivalent to `boo False`
-}
false : DataValue
false =
    Boolean False


{-| Discretize numeric values into bins when encoding with a facet channel.
-}
fBin : List BinProperty -> FacetChannel
fBin =
    FBin


{-| Guide that spans a collection of faceted plots, each of which may have their own axes.
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


{-| Apply a filter to a channel or field.
-}
filter : Filter -> List LabelledSpec -> List LabelledSpec
filter f =
    case f of
        FExpr ex ->
            (::) ( "filter", JE.string ex )

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
                            JE.list JE.float [ mn, mx ]

                        DateRange [] [] ->
                            toList [ JE.null, JE.null ]

                        DateRange [] dMax ->
                            toList [ JE.null, JE.object (List.map dateTimeProperty dMax) ]

                        DateRange dMin [] ->
                            toList [ JE.object (List.map dateTimeProperty dMin), JE.null ]

                        DateRange dMin dMax ->
                            JE.list JE.object
                                [ List.map dateTimeProperty dMin
                                , List.map dateTimeProperty dMax
                                ]
            in
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "range", values ) ] )

        FOneOf field vals ->
            let
                values =
                    case vals of
                        Numbers xs ->
                            JE.list JE.float xs

                        DateTimes ds ->
                            JE.list (\d -> JE.object (List.map dateTimeProperty d)) ds

                        Strings ss ->
                            JE.list JE.string ss

                        Booleans bs ->
                            JE.list JE.bool bs
            in
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "oneOf", values ) ] )

        FValid field ->
            (::) ( "filter", JE.object [ ( "field", JE.string field ), ( "valid", JE.bool True ) ] )


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


{-| Filter a data stream so that only valid data (i.e. not null or NaN) in a given
field are used.
-}
fiValid : String -> Filter
fiValid =
    FValid


{-| Map array-valued fields to a set of individual data objects, one per array entry.
-}
flatten : List String -> List LabelledSpec -> List LabelledSpec
flatten fields =
    (::) ( "flatten", JE.list JE.string fields )


{-| Similar to [flatten](#flatten) but allows the new output fields to be named
(second parameter).
-}
flattenAs : List String -> List String -> List LabelledSpec -> List LabelledSpec
flattenAs fields names =
    (::) ( "flattenAs", JE.list (JE.list JE.string) [ fields, names ] )


{-| Field used for encoding with a facet channel.
-}
fName : String -> FacetChannel
fName =
    FName


{-| Level of measurement when encoding with a facet channel.
-}
fMType : Measurement -> FacetChannel
fMType =
    FmType


{-| Indicate Boolean data type to be parsed when reading input data.
-}
foBoo : DataType
foBoo =
    FoBoo


{-| Date format for parsing input data using
[D3's formatting specifiers](https://vega.github.io/vega-lite/docs/data.html#format)
or left as an empty string for default formatting.
-}
foDate : String -> DataType
foDate =
    FoDate


{-| Collapse one or more data fields into two properties: a _key_ (containing
the original data field name) and a _value_ (containing the data value). Useful
for mapping matrix or cross-tabulation data into a standardized format.
-}
fold : List String -> List LabelledSpec -> List LabelledSpec
fold fields =
    (::) ( "fold", JE.list JE.string fields )


{-| Similar to [fold](#fold) but allows the new output `key` and `value` fields
to be given alternative names
-}
foldAs : List String -> String -> String -> List LabelledSpec -> List LabelledSpec
foldAs fields keyName valName =
    (::)
        ( "foldAs"
        , toList
            [ JE.list JE.string fields
            , JE.string keyName
            , JE.string valName
            ]
        )


{-| Indicate numeric data type to be parsed when reading input data.
-}
foNum : DataType
foNum =
    FoNum


{-| Similar to [foDate](#foDate) but for UTC format dates.
-}
foUtc : String -> DataType
foUtc =
    FoUtc


{-| Form of time unit aggregation of field values when encoding with a facet channel.
-}
fTimeUnit : TimeUnit -> FacetChannel
fTimeUnit =
    FTimeUnit


{-| Geo features to be used in a `geoshape` specification. Each feature object in
this collection can be created with [geometry](#geometry).

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
        , ( "features", toList geoms )
        ]


{-| Line geometry for programmatically creating GeoShapes. Equivalent to the
[GeoJson geometry `line` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoLine : List ( Float, Float ) -> Geometry
geoLine =
    GeoLine


{-| Multi-line geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-line` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoLines : List (List ( Float, Float )) -> Geometry
geoLines =
    GeoLines


{-| Geometry objects to be used in a `geoshape` specification. Each geometry
object can be created with [geometry](#geometry).

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
        , ( "geometries", toList geoms )
        ]


{-| Geometric object to be used in a `geoshape`. The first parameter is
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


{-| Point geometry for programmatically creating GeoShapes. Equivalent to
the [GeoJson geometry `point` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPoint : Float -> Float -> Geometry
geoPoint =
    GeoPoint


{-| Multi-point geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-point` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPoints : List ( Float, Float ) -> Geometry
geoPoints =
    GeoPoints


{-| Polygon geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPolygon : List (List ( Float, Float )) -> Geometry
geoPolygon =
    GeoPolygon


{-| Multi-polygon geometry for programmatically creating GeoShapes. Equivalent
to the [GeoJson geometry `multi-polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1).
-}
geoPolygons : List (List (List ( Float, Float ))) -> Geometry
geoPolygons =
    GeoPolygons


{-| [Geoshape](https://vega.github.io/vega-lite/docs/geoshape.html)
determined by georaphically referenced coordinates.
-}
geoshape : List MarkProperty -> ( VLProperty, Spec )
geoshape =
    mark Geoshape


{-| A gnomonic map projection.
-}
gnomonic : Projection
gnomonic =
    Gnomonic


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


{-| Indicate that data encoded with a hyperlink channel are already binned.
-}
hBinned : HyperlinkChannel
hBinned =
    HBinned


{-| HCL color interpolation for continuous color scales.
-}
hcl : CInterpolate
hcl =
    Hcl


{-| HCL color interpolation in polar coordinate space for continuous color scales.
-}
hclLong : CInterpolate
hclLong =
    HclLong


{-| Specifications to be juxtaposed horizontally in a visualization.
-}
hConcat : List Spec -> ( VLProperty, Spec )
hConcat specs =
    ( VLHConcat, toList specs )


{-| Make a hyperlink channel conditional on some predicate expression. The first
parameter provides the expression to evaluate, the second the encoding to apply
if the expression is true, the third the encoding if the expression is false.
-}
hDataCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hDataCondition op tCh fCh =
    HDataCondition op tCh fCh


{-| Header format for a faceted view.
-}
hdFormat : String -> HeaderProperty
hdFormat =
    HFormat


{-| Header label rotation angle (in degrees) for a faceted view. A 'label' is the
title for each sub-plot in a faceted view.
-}
hdLabelAngle : Float -> HeaderProperty
hdLabelAngle =
    HLabelAngle


{-| Header label text color for a faceted view.
-}
hdLabelColor : String -> HeaderProperty
hdLabelColor =
    HLabelColor


{-| Header label font for a faceted view.
-}
hdLabelFont : String -> HeaderProperty
hdLabelFont =
    HLabelFont


{-| Header label font size for a faceted view.
-}
hdLabelFontSize : Float -> HeaderProperty
hdLabelFontSize =
    HLabelFontSize


{-| Maximum length of a header label in a faceted view.
-}
hdLabelLimit : Float -> HeaderProperty
hdLabelLimit =
    HLabelLimit


{-| Spacing in pixels between facet labels and the main plot area.
-}
hdLabelPadding : Float -> HeaderProperty
hdLabelPadding =
    HLabelPadding


{-| Header title in a faceted view. A 'title' is the overall title describing
the collection of faceted plots.
-}
hdTitle : String -> HeaderProperty
hdTitle =
    HTitle


{-| Anchor position of a header title in a faceted view.
-}
hdTitleAnchor : Anchor -> HeaderProperty
hdTitleAnchor =
    HTitleAnchor


{-| Text angle of a header title in a faceted view.
-}
hdTitleAngle : Float -> HeaderProperty
hdTitleAngle =
    HTitleAngle


{-| Vertical alignment of a header title in a faceted view.
-}
hdTitleBaseline : VAlign -> HeaderProperty
hdTitleBaseline =
    HTitleBaseline


{-| Text color of a header title in a faceted view.
-}
hdTitleColor : String -> HeaderProperty
hdTitleColor =
    HTitleColor


{-| Title font in a faceted view.
-}
hdTitleFont : String -> HeaderProperty
hdTitleFont =
    HTitleFont


{-| Title font size in a faceted view.
-}
hdTitleFontSize : Float -> HeaderProperty
hdTitleFontSize =
    HTitleFontSize


{-| Title font weight in a faceted view.
-}
hdTitleFontWeight : String -> HeaderProperty
hdTitleFontWeight =
    HTitleFontWeight


{-| Maximum length of a header title in a faceted view.
-}
hdTitleLimit : Float -> HeaderProperty
hdTitleLimit =
    HTitleLimit


{-| Spacing in pixels between the main facet title and labels.
-}
hdTitlePadding : Float -> HeaderProperty
hdTitlePadding =
    HTitlePadding


{-| Override the default height of the visualization. If not specified the height
will be calculated based on the content of the visualization.
-}
height : Float -> ( VLProperty, Spec )
height h =
    ( VLHeight, JE.float h )


{-| Level of measurement when encoding with a hyperlink channel.
-}
hMType : Measurement -> HyperlinkChannel
hMType =
    HmType


{-| Field used for encoding with a hyperlink channel.
-}
hName : String -> HyperlinkChannel
hName =
    HName


{-| Hour of the day time unit used for discretizing temporal data.
-}
hours : TimeUnit
hours =
    Hours


{-| Hours and minutes time unit used for discretizing temporal data.
-}
hoursMinutes : TimeUnit
hoursMinutes =
    HoursMinutes


{-| Hours, minutes and seconds time unit used for discretizing temporal data.
-}
hoursMinutesSeconds : TimeUnit
hoursMinutesSeconds =
    HoursMinutesSeconds


{-| Reference in a hyperlink channel to a field name generated by `repeat`. The
parameter identifies whether reference is being made to fields being laid out
in columns or in rows.
-}
hRepeat : Arrangement -> HyperlinkChannel
hRepeat =
    HRepeat


{-| Make a hyperlink channel conditional on interactive selection. The first parameter
provides the selection to evaluate, the second the encoding to apply if the hyperlink
has been selected, the third the encoding if it is not selected.
-}
hSelectionCondition : BooleanOp -> List HyperlinkChannel -> List HyperlinkChannel -> HyperlinkChannel
hSelectionCondition op tCh fCh =
    HSelectionCondition op tCh fCh


{-| HSL color interpolation for continuous color scales.
-}
hsl : CInterpolate
hsl =
    Hsl


{-| HSL color interpolation in polar coordinate space for continuous color scales.
-}
hslLong : CInterpolate
hslLong =
    HslLong


{-| Literal string value when encoding with a hyperlink channel.
-}
hStr : String -> HyperlinkChannel
hStr =
    HString


{-| Time unit aggregation of field values when encoding with a hyperlink channel.
-}
hTimeUnit : TimeUnit -> HyperlinkChannel
hTimeUnit =
    HTimeUnit


{-| Encode a hyperlink channel. The first parameter is a list of hyperlink channel
properties that characterise the hyperlinking such as the destination URL and cursor
type.
-}
hyperlink : List HyperlinkChannel -> List LabelledSpec -> List LabelledSpec
hyperlink hyperProps =
    (::) ( "href", List.concatMap hyperlinkChannelProperty hyperProps |> JE.object )


{-| Checkbox input element that can bound to a named field value.
-}
iCheckbox : String -> List InputProperty -> Binding
iCheckbox f =
    ICheckbox f


{-| Color input element that can bound to a named field value.
-}
iColor : String -> List InputProperty -> Binding
iColor f =
    IColor f


{-| Date input element that can bound to a named field value.
-}
iDate : String -> List InputProperty -> Binding
iDate f =
    IDate f


{-| Local time input element that can bound to a named field value.
-}
iDateTimeLocal : String -> List InputProperty -> Binding
iDateTimeLocal f =
    IDateTimeLocal f


{-| 1d window over which data imputation values are generated. The two
parameters should either be `Just` a number indicating the offset from the current
data object, or `Nothing` to indicate unbounded rows preceding or following the
current data object.
-}
imFrame : Maybe Int -> Maybe Int -> ImputeProperty
imFrame =
    ImFrame


{-| Allow imputing of missing values on a per-group basis. For use with the impute
transform only and not a channel encoding.
-}
imGroupBy : List String -> ImputeProperty
imGroupBy =
    ImGroupBy


{-| Key values to be considered for imputation.
-}
imKeyVals : DataValues -> ImputeProperty
imKeyVals =
    ImKeyVals


{-| Key values to be considered for imputation as a sequence of numbers between
a start (first parameter), to less than an end (second parameter) in steps of
the third parameter.
-}
imKeyValSequence : Float -> Float -> Float -> ImputeProperty
imKeyValSequence =
    ImKeyValSequence


{-| Use maximum of values when imputing missing data.
-}
imMax : ImMethod
imMax =
    ImMax


{-| Use mean of values when imputing missing data.
-}
imMean : ImMethod
imMean =
    ImMean


{-| Use median of values when imputing missing data.
-}
imMedian : ImMethod
imMedian =
    ImMedian


{-| Imputation method to use when replacing values.
-}
imMethod : ImMethod -> ImputeProperty
imMethod =
    ImMethod


{-| Use maximum of values when imputing missing data.
-}
imMin : ImMethod
imMin =
    ImMin


{-| New value to use when imputing with [imValue](#imValue).
-}
imNewValue : DataValue -> ImputeProperty
imNewValue =
    ImNewValue


{-| Month input element that can bound to a named field value.
-}
iMonth : String -> List InputProperty -> Binding
iMonth f =
    IMonth f


{-| Impute missing data values. The first parameter is the data field to process;
the second the key field to uniquely identify data objects within a group; the
third customisable options.
-}
impute : String -> String -> List ImputeProperty -> List LabelledSpec -> List LabelledSpec
impute fields key imProps =
    (::)
        ( "impute"
        , toList
            [ JE.string fields
            , JE.string key
            , imputePropertySpec "frame" imProps
            , imputePropertySpec "keyVals" imProps
            , imputePropertySpec "keyValSequence" imProps
            , imputePropertySpec "method" imProps
            , imputePropertySpec "groupby" imProps
            , imputePropertySpec "value" imProps
            ]
        )


{-| Use field value when imputing missing data.
-}
imValue : ImMethod
imValue =
    ImValue


{-| Delay to introduce when processing input events in order to avoid unnecessary
event broadcasting.
-}
inDebounce : Float -> InputProperty
inDebounce =
    Debounce


{-| CSS selector indicating the parent element to which an input element should
be added. Allows the option of the input element to be outside the visualization
container.
-}
inElement : String -> InputProperty
inElement =
    Element


{-| Maximum slider value for a range input element.
-}
inMax : Float -> InputProperty
inMax =
    InMax


{-| Minimum slider value for a range input element.
-}
inMin : Float -> InputProperty
inMin =
    InMin


{-| Custom label for a radio or select input element.
-}
inName : String -> InputProperty
inName =
    InName


{-| Options for a radio or select input element.
-}
inOptions : List String -> InputProperty
inOptions =
    InOptions


{-| Initial placeholding text for input elements such as text fields.
-}
inPlaceholder : String -> InputProperty
inPlaceholder =
    InPlaceholder


{-| Minimum input element range slider increment.
-}
inStep : Float -> InputProperty
inStep =
    InStep


{-| Number input element that can bound to a named field value.
-}
iNumber : String -> List InputProperty -> Binding
iNumber f =
    INumber f


{-| A scaling of the interquartile range to be used as whiskers in a boxplot.
For example a value of 1.5 would extend whiskers to ±1.5x the IQR from the mean.
-}
exIqrScale : Float -> SummaryExtent
exIqrScale =
    ExIqrScale


{-| Radio box input element that can bound to a named field value.
-}
iRadio : String -> List InputProperty -> Binding
iRadio f =
    IRadio f


{-| Range slider input element that can bound to a named field value.
-}
iRange : String -> List InputProperty -> Binding
iRange f =
    IRange f


{-| Select input element that can bound to a named field value.
-}
iSelect : String -> List InputProperty -> Binding
iSelect f =
    ISelect f


{-| Telephone number input element that can bound to a named field value.
-}
iTel : String -> List InputProperty -> Binding
iTel f =
    ITel f


{-| Text input element that can bound to a named field value.
-}
iText : String -> List InputProperty -> Binding
iText f =
    IText f


{-| Time input element that can bound to a named field value.
-}
iTime : String -> List InputProperty -> Binding
iTime f =
    ITime f


{-| Week input element that can bound to a named field value.
-}
iWeek : String -> List InputProperty -> Binding
iWeek f =
    IWeek f


{-| Property to be extracted from some JSON when it has some surrounding structure.
e.g., specifying the property `values.features` is equivalent to retrieving
`json.values.features` from a JSON object with a custom delimiter.
-}
jsonProperty : String -> Format
jsonProperty =
    JSON


{-| Lab color interpolation for continuous color scales.
-}
lab : CInterpolate
lab =
    Lab


{-| Assign a list of specifications to superposed layers in a visualization.
-}
layer : List Spec -> ( VLProperty, Spec )
layer specs =
    ( VLLayer, toList specs )


{-| Limit height of legend entries.
-}
leClipHeight : Float -> LegendProperty
leClipHeight =
    LClipHeight


{-| Default maximum height of legend entries.
-}
lecoClipHeight : Float -> LegendConfig
lecoClipHeight =
    LeClipHeight


{-| Default horizontal padding between symbol legend entries.
-}
lecoColumnPadding : Float -> LegendConfig
lecoColumnPadding =
    LeColumnPadding


{-| Default number of columns in which to arrange symbol legend entries.
-}
lecoColumns : Float -> LegendConfig
lecoColumns =
    LeColumns


{-| Default legend corner radius.
-}
lecoCornerRadius : Float -> LegendConfig
lecoCornerRadius =
    CornerRadius


{-| Default spacing between legend items.
-}
lecoEntryPadding : Float -> LegendConfig
lecoEntryPadding =
    EntryPadding


{-| Default background legend color.
-}
lecoFillColor : String -> LegendConfig
lecoFillColor =
    FillColor


{-| Default vertical alignment for labels in a color ramp legend.
-}
lecoGradientLabelBaseline : VAlign -> LegendConfig
lecoGradientLabelBaseline =
    GradientLabelBaseline


{-| Default maximum allowable length for labels in a color ramp legend.
-}
lecoGradientLabelLimit : Float -> LegendConfig
lecoGradientLabelLimit =
    GradientLabelLimit


{-| Default vertical offset in pixel units for labels in a color ramp legend.
-}
lecoGradientLabelOffset : Float -> LegendConfig
lecoGradientLabelOffset =
    GradientLabelOffset


{-| Default color for strokes in a color ramp legend.
-}
lecoGradientStrokeColor : String -> LegendConfig
lecoGradientStrokeColor =
    GradientStrokeColor


{-| Default width for strokes in a color ramp legend.
-}
lecoGradientStrokeWidth : Float -> LegendConfig
lecoGradientStrokeWidth =
    GradientStrokeWidth


{-| Default height of a color ramp legend.
-}
lecoGradientHeight : Float -> LegendConfig
lecoGradientHeight =
    GradientHeight


{-| Default width of a color ramp legend.
-}
lecoGradientWidth : Float -> LegendConfig
lecoGradientWidth =
    GradientWidth


{-| Defailt alignment to apply to symbol legends rows and columns.
-}
lecoGridAlign : CompositionAlignment -> LegendConfig
lecoGridAlign =
    LeGridAlign


{-| Default horizontal alignment of legend labels.
-}
lecoLabelAlign : HAlign -> LegendConfig
lecoLabelAlign =
    LeLabelAlign


{-| Default vertical alignment of legend labels.
-}
lecoLabelBaseline : VAlign -> LegendConfig
lecoLabelBaseline =
    LeLabelBaseline


{-| Default color for legend labels.
-}
lecoLabelColor : String -> LegendConfig
lecoLabelColor =
    LeLabelColor


{-| Default font for legend labels.
-}
lecoLabelFont : String -> LegendConfig
lecoLabelFont =
    LeLabelFont


{-| Default font size legend labels.
-}
lecoLabelFontSize : Float -> LegendConfig
lecoLabelFontSize =
    LeLabelFontSize


{-| Default maximum width for legend labels in pixel units.
-}
lecoLabelLimit : Float -> LegendConfig
lecoLabelLimit =
    LeLabelLimit


{-| Default offset for legend labels.
-}
lecoLabelOffset : Float -> LegendConfig
lecoLabelOffset =
    LeLabelOffset


{-| Default offset in pixel units between the legend and the enclosing
group or data rectangle.
-}
lecoOffset : Float -> LegendConfig
lecoOffset =
    Offset


{-| Default legend position relative to the main plot content.
-}
lecoOrient : LegendOrientation -> LegendConfig
lecoOrient =
    Orient


{-| Default spacing in pixel units between a legend and axis.
-}
lecoPadding : Float -> LegendConfig
lecoPadding =
    LePadding


{-| Default vertical spacing in pixel units between legend symbol entries.
-}
lecoRowPadding : Float -> LegendConfig
lecoRowPadding =
    LeRowPadding


{-| Whether or not time labels are abbreviated by default in a legend.
-}
lecoShortTimeLabels : Bool -> LegendConfig
lecoShortTimeLabels =
    LeShortTimeLabels


{-| Default legend border color.
-}
lecoStrokeColor : String -> LegendConfig
lecoStrokeColor =
    StrokeColor


{-| Default legend border stroke dash style.
-}
lecoStrokeDash : List Float -> LegendConfig
lecoStrokeDash =
    LeStrokeDash


{-| Default legend border stroke width.
-}
lecoStrokeWidth : Float -> LegendConfig
lecoStrokeWidth =
    LeStrokeWidth


{-| Default legend symbol fill color for when no fill scale color in legend encoding.
-}
lecoSymbolBaseFillColor : String -> LegendConfig
lecoSymbolBaseFillColor =
    SymbolBaseFillColor


{-| Default legend symbol stroke color for when no stroke scale color in legend encoding.
-}
lecoSymbolBaseStrokeColor : String -> LegendConfig
lecoSymbolBaseStrokeColor =
    SymbolBaseStrokeColor


{-| Default legend symbol fill color.
-}
lecoSymbolFillColor : String -> LegendConfig
lecoSymbolFillColor =
    SymbolFillColor


{-| Default horizontal pixel offset for legend symbols.
-}
lecoSymbolOffset : Float -> LegendConfig
lecoSymbolOffset =
    SymbolOffset


{-| Default legend symbol type.
-}
lecoSymbolType : Symbol -> LegendConfig
lecoSymbolType =
    SymbolType


{-| Default legend symbol size.
-}
lecoSymbolSize : Float -> LegendConfig
lecoSymbolSize =
    SymbolSize


{-| Default legend symbol stroke width.
-}
lecoSymbolStrokeWidth : Float -> LegendConfig
lecoSymbolStrokeWidth =
    SymbolStrokeWidth


{-| Default legend symbol outline color.
-}
lecoSymbolStrokeColor : String -> LegendConfig
lecoSymbolStrokeColor =
    SymbolStrokeColor


{-| Default horizontal alignment for legend titles.
-}
lecoTitleAlign : HAlign -> LegendConfig
lecoTitleAlign =
    LeTitleAlign


{-| Default vertical alignment for legend titles.
-}
lecoTitleBaseline : VAlign -> LegendConfig
lecoTitleBaseline =
    LeTitleBaseline


{-| Default color legend titles.
-}
lecoTitleColor : String -> LegendConfig
lecoTitleColor =
    LeTitleColor


{-| Default font for legend titles.
-}
lecoTitleFont : String -> LegendConfig
lecoTitleFont =
    LeTitleFont


{-| Default font size for legend titles.
-}
lecoTitleFontSize : Float -> LegendConfig
lecoTitleFontSize =
    LeTitleFontSize


{-| Default font weight for legend titles.
-}
lecoTitleFontWeight : FontWeight -> LegendConfig
lecoTitleFontWeight =
    LeTitleFontWeight


{-| Default maximum size in pixel units for legend titles.
-}
lecoTitleLimit : Float -> LegendConfig
lecoTitleLimit =
    LeTitleLimit


{-| Default spacing in pixel units between title and legend.
-}
lecoTitlePadding : Float -> LegendConfig
lecoTitlePadding =
    LeTitlePadding


{-| Legend corner radius.
-}
leCornerRadius : Float -> LegendProperty
leCornerRadius =
    LCornerRadius


{-| Default direction of a color ramp legend.
-}
lecoGradientDirection : MarkOrientation -> LegendConfig
lecoGradientDirection =
    GradientDirection


{-| Strategy for resolving overlapping legend labels.
-}
lecoLabelOverlap : OverlapStrategy -> LegendConfig
lecoLabelOverlap =
    LeLabelOverlap


{-| Default direction of a symbol legend.
-}
lecoSymbolDirection : MarkOrientation -> LegendConfig
lecoSymbolDirection =
    SymbolDirection


{-| Horizontal padding between symbol legend entries.
-}
leColumnPadding : Float -> LegendProperty
leColumnPadding =
    LColumnPadding


{-| Number of columns in which to arrange symbol legend entries.
-}
leColumns : Float -> LegendProperty
leColumns =
    LColumns


{-| Direction of a legend.
-}
leDirection : MarkOrientation -> LegendProperty
leDirection =
    LDirection


{-| An explicit set of legend date-times.
-}
leDts : List (List DateTime) -> LegendValues
leDts =
    LDateTimes


{-| Legend background color.
-}
leFillColor : String -> LegendProperty
leFillColor =
    LFillColor


{-| Formatting pattern for legend labels.
-}
leFormat : String -> LegendProperty
leFormat =
    LFormat


{-| A gradient legend for continuous quantitative data.
-}
leGradient : Legend
leGradient =
    Gradient


{-| Length in pixels of the primary axis of a color ramp legend.
-}
leGradientLength : Float -> LegendProperty
leGradientLength =
    LGradientLength


{-| Color for strokes in a color ramp legend.
-}
leGradientStrokeColor : String -> LegendProperty
leGradientStrokeColor =
    LGradientStrokeColor


{-| Width for strokes in a color ramp legend.
-}
leGradientStrokeWidth : Float -> LegendProperty
leGradientStrokeWidth =
    LGradientStrokeWidth


{-| Thickness in pixels of a color ramp legend.
-}
leGradientThickness : Float -> LegendProperty
leGradientThickness =
    LGradientThickness


{-| Alignment to apply to symbol legends rows and columns.
-}
leGridAlign : CompositionAlignment -> LegendProperty
leGridAlign =
    LGridAlign


{-| Horizontal alignment of legend labels.
-}
leLabelAlign : HAlign -> LegendProperty
leLabelAlign =
    LLabelAlign


{-| Vertical alignment of legend labels.
-}
leLabelBaseline : VAlign -> LegendProperty
leLabelBaseline =
    LLabelBaseline


{-| Color for legend labels.
-}
leLabelColor : String -> LegendProperty
leLabelColor =
    LLabelColor


{-| Font for legend labels.
-}
leLabelFont : String -> LegendProperty
leLabelFont =
    LLabelFont


{-| Font size legend labels.
-}
leLabelFontSize : Float -> LegendProperty
leLabelFontSize =
    LLabelFontSize


{-| Maximum width for legend labels in pixel units.
-}
leLabelLimit : Float -> LegendProperty
leLabelLimit =
    LLabelLimit


{-| Offset for legend labels.
-}
leLabelOffset : Float -> LegendProperty
leLabelOffset =
    LLabelOffset


{-| Strategy for resolving overlapping legend labels.
-}
leLabelOverlap : OverlapStrategy -> LegendProperty
leLabelOverlap =
    LLabelOverlap


{-| An explicit set of numeric legend values.
-}
leNums : List Float -> LegendValues
leNums =
    LNumbers


{-| Offset in pixels of a legend from the edge of its enclosing group or data rectangle.
-}
leOffset : Float -> LegendProperty
leOffset =
    LOffset


{-| Position of a legend in a scene.
-}
leOrient : LegendOrientation -> LegendProperty
leOrient =
    LOrient


{-| Padding in pixels between a legend and axis.
-}
lePadding : Float -> LegendProperty
lePadding =
    LPadding


{-| Vertical spacing in pixel units between a symbol legend entries.
-}
leRowPadding : Float -> LegendProperty
leRowPadding =
    LRowPadding


{-| Legend border color.
-}
leStrokeColor : String -> LegendProperty
leStrokeColor =
    LStrokeColor


{-| Legend border stroke width.
-}
leStrokeWidth : Float -> LegendProperty
leStrokeWidth =
    LStrokeWidth


{-| An explicit set of legend strings.
-}
leStrs : List String -> LegendValues
leStrs =
    LStrings


{-| A symbol legend for categorical data.
-}
leSymbol : Legend
leSymbol =
    Symbol


{-| Legend symbol fill color.
-}
leSymbolFillColor : String -> LegendProperty
leSymbolFillColor =
    LSymbolFillColor


{-| Legend symbol type.
-}
leSymbolType : Symbol -> LegendProperty
leSymbolType =
    LSymbolType


{-| Legend symbol size.
-}
leSymbolSize : Float -> LegendProperty
leSymbolSize =
    LSymbolSize


{-| Legend symbol stroke width.
-}
leSymbolStrokeWidth : Float -> LegendProperty
leSymbolStrokeWidth =
    LSymbolStrokeWidth


{-| Legend symbol outline color.
-}
leSymbolStrokeColor : String -> LegendProperty
leSymbolStrokeColor =
    LSymbolStrokeColor


{-| Number of tick marks in a quantitative legend.
-}
leTickCount : Float -> LegendProperty
leTickCount =
    LTickCount


{-| Title of a legend.
-}
leTitle : String -> LegendProperty
leTitle =
    LTitle


{-| Horizontal alignment for legend titles.
-}
leTitleAlign : HAlign -> LegendProperty
leTitleAlign =
    LTitleAlign


{-| Vertical alignment for legend titles.
-}
leTitleBaseline : VAlign -> LegendProperty
leTitleBaseline =
    LTitleBaseline


{-| Color for legend title.
-}
leTitleColor : String -> LegendProperty
leTitleColor =
    LTitleColor


{-| Font for legend titles.
-}
leTitleFont : String -> LegendProperty
leTitleFont =
    LTitleFont


{-| Font size for legend titles.
-}
leTitleFontSize : Float -> LegendProperty
leTitleFontSize =
    LTitleFontSize


{-| Font weight for legend titles.
-}
leTitleFontWeight : FontWeight -> LegendProperty
leTitleFontWeight =
    LTitleFontWeight


{-| Maximum size in pixel units for legend titles.
-}
leTitleLimit : Float -> LegendProperty
leTitleLimit =
    LTitleLimit


{-| Spacing in pixel units between title and legend.
-}
leTitlePadding : Float -> LegendProperty
leTitlePadding =
    LTitlePadding


{-| Type of legend.
-}
leType : Legend -> LegendProperty
leType =
    LType


{-| An explicit set of legend values.
-}
leValues : LegendValues -> LegendProperty
leValues =
    LValues


{-| Drawing order of a legend relative to other chart elements. To
place a legend in front of others use a positive integer, or 0 to draw behind.
-}
leZIndex : Int -> LegendProperty
leZIndex =
    LZIndex


{-| [Line mark](https://vega.github.io/vega-lite/docs/line.html) for symbolising
a sequence of values.
-}
line : List MarkProperty -> ( VLProperty, Spec )
line =
    mark Line


{-| Properties of a line marker that is overlaid on an area mark.
-}
lmMarker : List MarkProperty -> LineMarker
lmMarker =
    LMMarker


{-| Indicates no line marker on an area mark.
-}
lmNone : LineMarker
lmNone =
    LMNone


{-| Perform a lookup of named fields between two data sources. This allows you to
find values in one data source based on the values in another. The first parameter
is the field in the primary data source to act as key, the second is the secondary
data source which can be specified with a call to `dataFromUrl` or other data
generating function. The third is the name of the field in the secondary
data source to match values with the primary key. The fourth parameter is the list
of fields to be stored when the keys match.
-}
lookup : String -> ( VLProperty, Spec ) -> String -> List String -> List LabelledSpec -> List LabelledSpec
lookup key1 ( vlProp, spec ) key2 fields =
    (::)
        ( "lookup"
        , toList
            [ JE.string key1
            , spec
            , JE.string key2
            , JE.list JE.string fields
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
        , toList
            [ JE.string key1
            , spec
            , JE.string key2
            , JE.string asName
            ]
        )


{-| Horizontal alignment of a text mark.
-}
maAlign : HAlign -> MarkProperty
maAlign =
    MAlign


{-| Rotation angle in degrees of a text mark.
-}
maAngle : Float -> MarkProperty
maAngle =
    MAngle


{-| Band size of a bar mark.
-}
maBandSize : Float -> MarkProperty
maBandSize =
    MBandSize


{-| Vertical alignment of a text mark.
-}
maBaseline : VAlign -> MarkProperty
maBaseline =
    MBaseline


{-| Offset between bars for a binned field using a bar mark.
-}
maBinSpacing : Float -> MarkProperty
maBinSpacing =
    MBinSpacing


{-| Border properties for an errorband mark.
-}
maBorders : List MarkProperty -> MarkProperty
maBorders =
    MBorders


{-| Whether or not a mark should be clipped to the enclosing group's dimensions.
-}
maClip : Bool -> MarkProperty
maClip =
    MClip


{-| Default color of a mark. Note that `maFill` and `maStroke` have higher
precedence and will override this if specified.
-}
maColor : String -> MarkProperty
maColor =
    MColor


{-| Cursor to be associated with a hyperlink mark.
-}
maCursor : Cursor -> MarkProperty
maCursor =
    MCursor


{-| Continuous band size of a bar mark.
-}
maContinuousBandSize : Float -> MarkProperty
maContinuousBandSize =
    MContinuousBandSize


{-| Discrete band size of a bar mark.
-}
maDiscreteBandSize : Float -> MarkProperty
maDiscreteBandSize =
    MDiscreteBandSize


{-| Horizontal offset between a text mark and its anchor.
-}
maDx : Float -> MarkProperty
maDx =
    MdX


{-| Vertical offset between a text mark and its anchor.
-}
maDy : Float -> MarkProperty
maDy =
    MdY


{-| Extent of whiskers used in a boxplot, error bars or error bands.
-}
maExtent : SummaryExtent -> MarkProperty
maExtent =
    MExtent


{-| Default fill color of a mark.
-}
maFill : String -> MarkProperty
maFill =
    MFill


{-| Whether or not a mark's color should be used as the fill color instead of
stroke color.
-}
maFilled : Bool -> MarkProperty
maFilled =
    MFilled


{-| Fill opacity of a mark.
-}
maFillOpacity : Float -> MarkProperty
maFillOpacity =
    MFillOpacity


{-| Font of a text mark. Can be any font name made accessible via
a css file (or a generic font like `serif`, `monospace` etc.).
-}
maFont : String -> MarkProperty
maFont =
    MFont


{-| Font size in pixels used by a text mark.
-}
maFontSize : Float -> MarkProperty
maFontSize =
    MFontSize


{-| Font style (e.g. `italic`) used by a text mark.
-}
maFontStyle : String -> MarkProperty
maFontStyle =
    MFontStyle


{-| Font wight used by a text mark.
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


{-| Hyperlink to be associated with a mark making it a clickable hyperlink.
-}
maHRef : String -> MarkProperty
maHRef =
    MHRef


{-| Interpolation method used by line and area marks.
-}
maInterpolate : MarkInterpolation -> MarkProperty
maInterpolate =
    MInterpolate


{-| Appearance of a line marker joining the vertices of an area mark.
-}
maLine : LineMarker -> MarkProperty
maLine =
    MLine


{-| Overal opacity of a mark in the range 0 to 1.
-}
maOpacity : Float -> MarkProperty
maOpacity =
    MOpacity


{-| Orientation of a non-stacked bar, tick, area or line mark.
-}
maOrient : MarkOrientation -> MarkProperty
maOrient =
    MOrient


{-| Appearance of a point marker joining the vertices of a line or area mark.
-}
maPoint : PointMarker -> MarkProperty
maPoint =
    MPoint


{-| Polar coordinate radial offset of a text mark from its origin.
-}
maRadius : Float -> MarkProperty
maRadius =
    MRadius


{-| Rule (main line) properties for the errorbar mark.
-}
maRule : List MarkProperty -> MarkProperty
maRule =
    MRule


{-| Shape of a point mark.
-}
maShape : Symbol -> MarkProperty
maShape =
    MShape


{-| Whether or not month and weekday names are abbreviated in a text mark.
-}
maShortTimeLabels : Bool -> MarkProperty
maShortTimeLabels =
    MShortTimeLabels


{-| Ssize of a mark in square units.
-}
maSize : Float -> MarkProperty
maSize =
    MSize


{-| Default stroke color of a mark.
-}
maStroke : String -> MarkProperty
maStroke =
    MStroke


{-| Cap style of a mark's stroke.
-}
maStrokeCap : StrokeCap -> MarkProperty
maStrokeCap =
    MStrokeCap


{-| Stroke dash style used by a mark. Determined by an alternating 'on-off'
sequence of line lengths.
-}
maStrokeDash : List Float -> MarkProperty
maStrokeDash =
    MStrokeDash


{-| Number of pixels before the first line dash is drawn.
-}
maStrokeDashOffset : Float -> MarkProperty
maStrokeDashOffset =
    MStrokeDashOffset


{-| Line segment join style of a mark's stroke.
-}
maStrokeJoin : StrokeJoin -> MarkProperty
maStrokeJoin =
    MStrokeJoin


{-| Miter limit at which to bevel a join between line segments of a mark's stroke.
-}
maStrokeMiterLimit : Float -> MarkProperty
maStrokeMiterLimit =
    MStrokeMiterLimit


{-| Stroke opacity of a mark in the range 0 to 1.
-}
maStrokeOpacity : Float -> MarkProperty
maStrokeOpacity =
    MStrokeOpacity


{-| Stroke width of a mark in pixel units.
-}
maStrokeWidth : Float -> MarkProperty
maStrokeWidth =
    MStrokeWidth


{-| Names of custom styles to apply to a mark. Each should refer to a named style
defined in a separate style configuration.
-}
maStyle : List String -> MarkProperty
maStyle =
    MStyle


{-| Interpolation tension used when interpolating line and area marks.
-}
maTension : Float -> MarkProperty
maTension =
    MTension


{-| Placeholder text for a text mark for when a text channel is not specified.
-}
maText : String -> MarkProperty
maText =
    MText


{-| Polar coordinate angle (clockwise from north in radians) of a text mark from
the origin determined by its x and y properties.
-}
maTheta : Float -> MarkProperty
maTheta =
    MTheta


{-| Thickness of a tick mark.
-}
maThickness : Float -> MarkProperty
maThickness =
    MThickness


{-| Tick properties for the errorbar mark.
-}
maTicks : List MarkProperty -> MarkProperty
maTicks =
    MTicks


{-| Source of a mark's tooltip content.
-}
maTooltip : TooltipContent -> MarkProperty
maTooltip =
    MTooltip


{-| X position offset for a mark.
-}
maXOffset : Float -> MarkProperty
maXOffset =
    MXOffset


{-| X2 position offset for a mark.
-}
maX2Offset : Float -> MarkProperty
maX2Offset =
    MX2Offset


{-| Y position offset for a mark.
-}
maYOffset : Float -> MarkProperty
maYOffset =
    MYOffset


{-| Y2 position offset for a mark.
-}
maY2Offset : Float -> MarkProperty
maY2Offset =
    MY2Offset


{-| Discretize numeric values into bins when encoding with a mark property channel.
-}
mBin : List BinProperty -> MarkChannel
mBin =
    MBin


{-| Indicate that data encoding with a mark are already binned.
-}
mBinned : MarkChannel
mBinned =
    MBinned


{-| Boolean value when encoding with a mark property channel.
-}
mBoo : Bool -> MarkChannel
mBoo =
    MBoolean


{-| Make a mark channel conditional on one or more predicate expressions. The first
parameter is a list of tuples each pairing a test condition with the encoding if
that condition evaluates to true. The second is the encoding if none of the tests
are true.

    color
        [ mDataCondition [ ( expr "datum.myField === null", [ mStr "grey" ] ) ]
            [ mStr "black" ]
        ]

-}
mDataCondition : List ( BooleanOp, List MarkChannel ) -> List MarkChannel -> MarkChannel
mDataCondition =
    MDataCondition


{-| A Mercator map projection.
-}
mercator : Projection
mercator =
    Mercator


{-| Milliseconds time unit used for discretizing temporal data.
-}
milliseconds : TimeUnit
milliseconds =
    Milliseconds


{-| Iputation rules for a mark channel. See the
[Vega-Lite impute documentation](https://vega.github.io/vega-lite/docs/impute.html)
-}
mImpute : List ImputeProperty -> MarkChannel
mImpute =
    MImpute


{-| Minute of the hour time unit used for discretizing temporal data.
-}
minutes : TimeUnit
minutes =
    Minutes


{-| Minutes and seconds time unit used for discretizing temporal data.
-}
minutesSeconds : TimeUnit
minutesSeconds =
    MinutesSeconds


{-| Properties of a legend that describes a mark's encoding. For no legend, provide
an empty list as a parameter.
-}
mLegend : List LegendProperty -> MarkChannel
mLegend =
    MLegend


{-| Level of measurement when encoding with a mark property channel.
-}
mMType : Measurement -> MarkChannel
mMType =
    MmType


{-| Field used for encoding with a mark property channel.
-}
mName : String -> MarkChannel
mName =
    MName


{-| Literal numeric value when encoding with a mark property channel.
-}
mNum : Float -> MarkChannel
mNum =
    MNumber


{-| Month of the year (1-12) time unit used for discretizing temporal data.
-}
month : TimeUnit
month =
    Month


{-| Month and day of month time unit used for discretizing temporal data.
-}
monthDate : TimeUnit
monthDate =
    MonthDate


{-| SVG path string used when encoding with a mark property channel. Useful
for providing custom shapes.
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


{-| Scaling applied to a field when encoding with a mark property channel.
The scale will transform a field's value into a color, shape, size etc.
-}
mScale : List ScaleProperty -> MarkChannel
mScale =
    MScale


{-| Make a mark channel conditional on interactive selection. The first parameter
is a selection condition to evaluate; the second the encoding to apply if that selection
is true; the third parameter is the encoding if the selection is false.

    color
        [ mSelectionCondition (selectionName "myBrush")
            [ mName "myField", mMType Ordinal ]
            [ mStr "grey" ]
        ]

-}
mSelectionCondition : BooleanOp -> List MarkChannel -> List MarkChannel -> MarkChannel
mSelectionCondition =
    MSelectionCondition


{-| Literal string value when encoding with a mark property channel.
-}
mStr : String -> MarkChannel
mStr =
    MString


{-| Time unit aggregation of field values when encoding with a mark property channel.
-}
mTimeUnit : TimeUnit -> MarkChannel
mTimeUnit =
    MTimeUnit


{-| Title of a field when encoding with a mark property channel.
-}
mTitle : String -> MarkChannel
mTitle =
    MTitle


{-| Name to be associated with a visualization.
-}
name : String -> ( VLProperty, Spec )
name s =
    ( VLName, JE.string s )


{-| Nice time intervals that try to align with whole or rounded days.
-}
niDay : ScaleNice
niDay =
    NDay


{-| Disable nice scaling.
-}
niFalse : ScaleNice
niFalse =
    NFalse


{-| Nice time intervals that try to align with whole or rounded hours.
-}
niHour : ScaleNice
niHour =
    NHour


{-| 'Nice' temporal interval values when scaling.
-}
niInterval : TimeUnit -> Int -> ScaleNice
niInterval =
    NInterval


{-| Nice time intervals that try to align with rounded milliseconds.
-}
niMillisecond : ScaleNice
niMillisecond =
    NMillisecond


{-| Nice time intervals that try to align with whole or rounded minutes.
-}
niMinute : ScaleNice
niMinute =
    NMinute


{-| Nice time intervals that try to align with whole or rounded months.
-}
niMonth : ScaleNice
niMonth =
    NMonth


{-| Nice time intervals that try to align with whole or rounded seconds.
-}
niSecond : ScaleNice
niSecond =
    NSecond


{-| Desired number of tick marks in a 'nice' scaling.
-}
niTickCount : Int -> ScaleNice
niTickCount =
    NTickCount


{-| Enable nice scaling.
-}
niTrue : ScaleNice
niTrue =
    NTrue


{-| Nice time intervals that try to align with whole or rounded weeks.
-}
niWeek : ScaleNice
niWeek =
    NWeek


{-| Nice time intervals that try to align with whole or rounded years.
-}
niYear : ScaleNice
niYear =
    NYear


{-| Inidicate no clipping to be applied.
-}
noClip : ClipRect
noClip =
    NoClip


{-| Apply a negation Boolean operation as part of a logical composition. Boolean
operations can be nested to any level.

    not (and (expr "datum.IMDB_Rating === null") (expr "datum.Rotten_Tomatoes_Rating === null"))

-}
not : BooleanOp -> BooleanOp
not =
    Not


{-| A numeric data value.
-}
num : Float -> DataValue
num =
    Number


{-| Minimum-maximum number range to be used in data filtering.
-}
numRange : Float -> Float -> FilterRange
numRange =
    NumberRange


{-| List of numeric data values.
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


{-| Level of measurement when encoding with an order channel.
-}
oMType : Measurement -> OrderChannel
oMType =
    OmType


{-| Name of the field used for encoding with an order channel.
-}
oName : String -> OrderChannel
oName =
    OName


{-| Encode an opacity channel.
-}
opacity : List MarkChannel -> List LabelledSpec -> List LabelledSpec
opacity markProps =
    (::) ( "opacity", List.concatMap markChannelProperty markProps |> JE.object )


{-| An input data object containing the maximum field value to be used in an
aggregation operation.
-}
opArgMax : Operation
opArgMax =
    ArgMax


{-| An input data object containing the minimum field value to be used in an
aggregation operation.
-}
opArgMin : Operation
opArgMin =
    ArgMin


{-| Aaggregation operation. The first parameter is the operation to use; the second
the name of the field in which to apply it and the third the name to be given to
this transformation.

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


{-| Lower 95% confidence interval to be used in an aggregation operation.
-}
opCI0 : Operation
opCI0 =
    CI0


{-| Upper 95% confidence interval to be used in an aggregation operation.
-}
opCI1 : Operation
opCI1 =
    CI1


{-| Total count of data objects to be used in an aggregation operation.
-}
opCount : Operation
opCount =
    Count


{-| Count of distinct data objects to be used in an aggregation operation.
-}
opDistinct : Operation
opDistinct =
    Distinct


{-| Maximum field value to be used in an aggregation operation.
-}
opMax : Operation
opMax =
    Max


{-| Mean value to be used in an aggregation operation.
-}
opMean : Operation
opMean =
    Mean


{-| Median field value to be used in an aggregation operation.
-}
opMedian : Operation
opMedian =
    Median


{-| Minimum field value to be used in an aggregation operation.
-}
opMin : Operation
opMin =
    Min


{-| Count of null or undefined field value to be used in an aggregation operation.
-}
opMissing : Operation
opMissing =
    Missing


{-| Lower quartile boundary of field values to be used in an aggregation operation.
-}
opQ1 : Operation
opQ1 =
    Q1


{-| Upper quartile boundary of field values to be used in an aggregation operation.
-}
opQ3 : Operation
opQ3 =
    Q3


{-| Standard error of field values to be used in an aggregation operation.
-}
opStderr : Operation
opStderr =
    Stderr


{-| Sample standard deviation of field values to be used in an aggregation operation.
-}
opStdev : Operation
opStdev =
    Stdev


{-| Population standard deviation of field values to be used in an aggregation operation.
-}
opStdevP : Operation
opStdevP =
    StdevP


{-| Sum of field values to be used in an ggregation operation.
-}
opSum : Operation
opSum =
    Sum


{-| Count of values that are not `null`, `undefined` or `NaN` to be used in an
aggregation operation.
-}
opValid : Operation
opValid =
    Valid


{-| Sample variance of field value to be used in an aggregation operation.
-}
opVariance : Operation
opVariance =
    Variance


{-| Population variance of field value to be used in an aggregation operation.
-}
opVarianceP : Operation
opVarianceP =
    VarianceP


{-| Apply an 'or' Boolean operation as part of a logical composition.
-}
or : BooleanOp -> BooleanOp -> BooleanOp
or op1 op2 =
    Or op1 op2


{-| Encode an order channel with a list of order field definitions.
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


{-| An orthographic map projection.
-}
orthographic : Projection
orthographic =
    Orthographic


{-| Sort order to be used by an order channel.
-}
oSort : List SortProperty -> OrderChannel
oSort =
    OSort


{-| Time unit aggregation of field values when encoding with an order channel.
-}
oTimeUnit : TimeUnit -> OrderChannel
oTimeUnit =
    OTimeUnit


{-| Padding around the visualization in pixel units. The way padding is interpreted
will depend on the `autosize` properties.
-}
padding : Padding -> ( VLProperty, Spec )
padding pad =
    ( VLPadding, paddingSpec pad )


{-| Padding around a visualization in pixel units. The four parameters
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


{-| Parsing rules when processing some data text, specified as a list of tuples
in the form (_fieldname_, _datatype_). If an empty list is provided, type inference
is based on the data.
-}
parse : List ( String, DataType ) -> Format
parse =
    Parse


{-| Indicate uniform padding around a visualization in pixel units.
-}
paSize : Float -> Padding
paSize =
    PSize


{-| Axis properties used when encoding with a position channel. For no axis,
provide an empty list.
-}
pAxis : List AxisProperty -> PositionChannel
pAxis =
    PAxis


{-| Discretize numeric values into bins when encoding with a position channel.
-}
pBin : List BinProperty -> PositionChannel
pBin =
    PBin


{-| Indicate that data encoded with position are already binned.
-}
pBinned : PositionChannel
pBinned =
    PBinned


{-| Set the position to the height of the enclosing data space. Useful for placing
a mark relative to the bottom edge of a view.
-}
pHeight : PositionChannel
pHeight =
    PHeight


{-| Imputation rules for a position channel. See the
[Vega-Lite impute documentation](https://vega.github.io/vega-lite/docs/impute.html)
-}
pImpute : List ImputeProperty -> PositionChannel
pImpute =
    PImpute


{-| No point marker to be shown on a line or area mark.
-}
pmNone : PointMarker
pmNone =
    PMNone


{-| Properties of a point marker that is overlaid on a line or area mark.
-}
pmMarker : List MarkProperty -> PointMarker
pmMarker =
    PMMarker


{-| Transparent point marker to be placed on area or line mark. Useful for
interactive selections.
-}
pmTransparent : PointMarker
pmTransparent =
    PMTransparent


{-| Level of measurement when encoding with a position channel.
-}
pMType : Measurement -> PositionChannel
pMType =
    PmType


{-| [Point mark](https://vega.github.io/vega-lite/docs/point.html) for
symbolising a data point with a symbol.
-}
point : List MarkProperty -> ( VLProperty, Spec )
point =
    mark Point


{-| Encode a position channel. The first parameter identifies the channel,
the second a list of encoding options.
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


{-| Name of the field used for encoding with a position channel.
-}
pName : String -> PositionChannel
pName =
    PName


{-| Projection’s center as longitude and latitude in degrees.
-}
prCenter : Float -> Float -> ProjectionProperty
prCenter =
    PCenter


{-| Projection’s clipping circle radius to the specified angle in degrees.
A value of `Nothing` will switch to antimeridian cutting rather than small-circle
clipping.
-}
prClipAngle : Maybe Float -> ProjectionProperty
prClipAngle =
    PClipAngle


{-| Projection’s viewport clip extent to the specified bounds in pixels.
-}
prClipExtent : ClipRect -> ProjectionProperty
prClipExtent =
    PClipExtent


{-| 'Hammer' map projection coefficient.
-}
prCoefficient : Float -> ProjectionProperty
prCoefficient =
    PCoefficient


{-| 'Satellite' map projection distance.
-}
prDistance : Float -> ProjectionProperty
prDistance =
    PDistance


{-| Arrangement of views in a repeated composite view.
-}
pRepeat : Arrangement -> PositionChannel
pRepeat =
    PRepeat


{-| `Bottomley` map projection fraction.
-}
prFraction : Float -> ProjectionProperty
prFraction =
    PFraction


{-| Number of lobes in lobed map projections such as the 'Berghaus star'.
-}
prLobes : Int -> ProjectionProperty
prLobes =
    PLobes


{-| Parallel for map projections such as the 'Armadillo'.
-}
prParallel : Float -> ProjectionProperty
prParallel =
    PParallel


{-| Threshold for the projection’s adaptive resampling in pixels.
Corresponds to the Douglas–Peucker distance. If precision is not specified, the
projection’s current resampling precision of 0.707 is used.
-}
prPrecision : Float -> ProjectionProperty
prPrecision =
    PPrecision


{-| Radius value for map projections such as the 'Gingery'.
-}
prRadius : Float -> ProjectionProperty
prRadius =
    PRadius


{-| Ratio value for map projections such as the 'Hill'.
-}
prRatio : Float -> ProjectionProperty
prRatio =
    PRatio


{-| Map projection used for geospatial coordinates.
-}
projection : List ProjectionProperty -> ( VLProperty, Spec )
projection pProps =
    ( VLProjection, JE.object (List.map projectionProperty pProps) )


{-| Projection’s three-axis rotation angle. This should be in order _lambda phi
gamma_ specifying the rotation angles in degrees about each spherical axis.
-}
prRotate : Float -> Float -> Float -> ProjectionProperty
prRotate =
    PRotate


{-| Spacing value for map projections such as the 'Lagrange'.
-}
prSpacing : Float -> ProjectionProperty
prSpacing =
    PSpacing


{-| 'Satellite' map projection tilt.
-}
prTilt : Float -> ProjectionProperty
prTilt =
    PTilt


{-| Type of global map projection.
-}
prType : Projection -> ProjectionProperty
prType =
    PType


{-| Scaling applied to a field when encoding with a position channel.
The scale will transform a field's value into a position along one axis.
-}
pScale : List ScaleProperty -> PositionChannel
pScale =
    PScale


{-| Sort order for field when encoding with a position channel.
-}
pSort : List SortProperty -> PositionChannel
pSort =
    PSort


{-| Type of stacking offset for field when encoding with a position channel.
-}
pStack : StackOffset -> PositionChannel
pStack =
    PStack


{-| Form of time unit aggregation of field values when encoding with a position channel.
-}
pTimeUnit : TimeUnit -> PositionChannel
pTimeUnit =
    PTimeUnit


{-| Title of a field when encoding with a position channel.
-}
pTitle : String -> PositionChannel
pTitle =
    PTitle


{-| Set the position to the width of the enclosing data space. Useful for justifying
a mark to the right hand edge of a view. e.g. to position a mark at the right of
the data rectangle:

    enc =
        encoding
            << position X [ pWidth ]

-}
pWidth : PositionChannel
pWidth =
    PWidth


{-| Year quarter time unit used for discretizing temporal data.
-}
quarter : TimeUnit
quarter =
    Quarter


{-| Year quarter and month time unit used for discretizing temporal data.
-}
quarterMonth : TimeUnit
quarterMonth =
    QuarterMonth


{-| Default color scheme for categorical ranges.
-}
racoCategory : String -> RangeConfig
racoCategory =
    RCategory


{-| Default diverging color scheme.
-}
racoDiverging : String -> RangeConfig
racoDiverging =
    RDiverging


{-| Default 'heatmap' color scheme.
-}
racoHeatmap : String -> RangeConfig
racoHeatmap =
    RHeatmap


{-| Default ordinal color scheme.
-}
racoOrdinal : String -> RangeConfig
racoOrdinal =
    ROrdinal


{-| Default ramp (contnuous) color scheme.
-}
racoRamp : String -> RangeConfig
racoRamp =
    RRamp


{-| Default color scheme symbols.
-}
racoSymbol : String -> RangeConfig
racoSymbol =
    RSymbol


{-| Name of a pre-defined scale range (e.g. `symbol` or `diverging`).
-}
raName : String -> ScaleRange
raName =
    RName


{-| Numeric scale range. Depending on the scaling this may be a [min, max]
pair, or a list of explicit numerical values.
-}
raNums : List Float -> ScaleRange
raNums =
    RNumbers


{-| Text scale range for discrete scales.
-}
raStrs : List String -> ScaleRange
raStrs =
    RStrings


{-| Indicate how a channel's axes should be resolved when defined in more than
one view in a composite visualization.
-}
reAxis : List ( Channel, Resolution ) -> Resolve
reAxis =
    RAxis


{-| [Rectangle mark](https://vega.github.io/vega-lite/docs/rect.html).
-}
rect : List MarkProperty -> ( VLProperty, Spec )
rect =
    mark Rect


{-| Indicate how a channel's legends should be resolved when defined in more
than one view in a composite visualization.
-}
reLegend : List ( Channel, Resolution ) -> Resolve
reLegend =
    RLegend


{-| Define the fields that will be used to compose rows and columns of a set of
small multiples. Used when the encoding largely identical, but the data field used
in each might vary. When a list of fields is identified with `repeat` you also
need to define a full specification to apply to each of those fields using `asSpec`.

    spec = ...
    toVegaLite
        [ repeat [ columnFields [ "Cat", "Dog", "Fish" ] ]
        , specification (asSpec spec)
        ]

-}
repeat : List RepeatFields -> ( VLProperty, Spec )
repeat fields =
    ( VLRepeat, JE.object (List.map repeatFieldsProperty fields) )


{-| Indicate how a channel's scales should be resolved when defined in more
than one view in a composite visualization.
-}
reScale : List ( Channel, Resolution ) -> Resolve
reScale =
    RScale


{-| Define a resolution option to be applied when scales, axes or legends in composite
views share channel encodings. This allows different color encodings to be created
in a layered view, which would otherwise share color channels between layers. Each
resolution rule should be in a tuple pairing the channel to which it applies and
the rule type. The first parameter identifies the type of resolution.

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


{-| RGB color interpolation for continuous color scales using the given gamma
value (anchored at 1).
-}
rgb : Float -> CInterpolate
rgb =
    Rgb


{-| Encode a new facet to be arranged in rows. The first parameter is a list of
facet properties that define the faceting channel.
-}
row : List FacetChannel -> List LabelledSpec -> List LabelledSpec
row fFields =
    (::) ( "row", JE.object (List.map facetChannelProperty fFields) )


{-| Tthe mapping between a row and its field definitions in a set of faceted
small multiples.
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


{-| [Rule line](https://vega.github.io/vega-lite/docs/rule.html) connecting
two vertices.
-}
rule : List MarkProperty -> ( VLProperty, Spec )
rule =
    mark Rule


{-| Default inner padding for x and y band-ordinal scales.
-}
sacoBandPaddingInner : Float -> ScaleConfig
sacoBandPaddingInner =
    SCBandPaddingInner


{-| Default outer padding for x and y band-ordinal scales.
-}
sacoBandPaddingOuter : Float -> ScaleConfig
sacoBandPaddingOuter =
    SCBandPaddingOuter


{-| Whether or not by default values that exceed the data domain are clamped to
the min/max range value.
-}
sacoClamp : Bool -> ScaleConfig
sacoClamp =
    SCClamp


{-| Default maximum value for mapping quantitative fields to a bar's
size/bandSize.
-}
sacoMaxBandSize : Float -> ScaleConfig
sacoMaxBandSize =
    SCMaxBandSize


{-| Default maximum value for mapping a quantitative field to a text
mark's size.
-}
sacoMaxFontSize : Float -> ScaleConfig
sacoMaxFontSize =
    SCMaxFontSize


{-| Default maximum opacity (in the range [0, 1]) for mapping a field
to opacity.
-}
sacoMaxOpacity : Float -> ScaleConfig
sacoMaxOpacity =
    SCMaxOpacity


{-| Default maximum size for point-based scales.
-}
sacoMaxSize : Float -> ScaleConfig
sacoMaxSize =
    SCMaxSize


{-| Default maximum stroke width for rule, line and trail marks.
-}
sacoMaxStrokeWidth : Float -> ScaleConfig
sacoMaxStrokeWidth =
    SCMaxStrokeWidth


{-| Default minimum value for mapping quantitative fields to a bar's size/bandSize.
-}
sacoMinBandSize : Float -> ScaleConfig
sacoMinBandSize =
    SCMinBandSize


{-| Default minimum value for mapping a quantitative field to a text mark's size.
-}
sacoMinFontSize : Float -> ScaleConfig
sacoMinFontSize =
    SCMinFontSize


{-| Default minimum opacity (0 to 1) for mapping a field to opacity.
-}
sacoMinOpacity : Float -> ScaleConfig
sacoMinOpacity =
    SCMinOpacity


{-| Default minimum size for point-based scales (when not forced to start at zero).
-}
sacoMinSize : Float -> ScaleConfig
sacoMinSize =
    SCMinSize


{-| Default minimum stroke width for rule, line and trail marks.
-}
sacoMinStrokeWidth : Float -> ScaleConfig
sacoMinStrokeWidth =
    SCMinStrokeWidth


{-| Default padding for point-ordinal scales.
-}
sacoPointPadding : Float -> ScaleConfig
sacoPointPadding =
    SCPointPadding


{-| Default range step for band and point scales when the mark is not text.
-}
sacoRangeStep : Maybe Float -> ScaleConfig
sacoRangeStep =
    SCRangeStep


{-| Whether or not numeric values are rounded to integers when scaling. Useful
for snapping to the pixel grid.
-}
sacoRound : Bool -> ScaleConfig
sacoRound =
    SCRound


{-| Default range step for x band and point scales of text marks.
-}
sacoTextXRangeStep : Float -> ScaleConfig
sacoTextXRangeStep =
    SCTextXRangeStep


{-| Whether or not to use the source data range before aggregation.
-}
sacoUseUnaggregatedDomain : Bool -> ScaleConfig
sacoUseUnaggregatedDomain =
    SCUseUnaggregatedDomain


{-| Randomly sample rows from a data source up to a given maximum.
-}
sample : Float -> List LabelledSpec -> List LabelledSpec
sample maxSize =
    (::) ( "sample", JE.float maxSize )


{-| A band scale.
-}
scBand : Scale
scBand =
    ScBand


{-| A linear band scale.
-}
scBinLinear : Scale
scBinLinear =
    ScBinLinear


{-| An ordinal band scale.
-}
scBinOrdinal : Scale
scBinOrdinal =
    ScBinOrdinal


{-| Whether or not values outside the data domain are clamped to the minimum or
maximum value.
-}
scClamp : Bool -> ScaleProperty
scClamp =
    SClamp


{-| Custom scaling domain.
-}
scDomain : ScaleDomain -> ScaleProperty
scDomain =
    SDomain


{-| Interpolation method for scaling range values.
-}
scInterpolate : CInterpolate -> ScaleProperty
scInterpolate =
    SInterpolate


{-| A linear scale.
-}
scLinear : Scale
scLinear =
    ScLinear


{-| A log scale.
-}
scLog : Scale
scLog =
    ScLog


{-| 'Nice' minimum and maximum values in a scaling (e.g. multiples of 10).
-}
scNice : ScaleNice -> ScaleProperty
scNice =
    SNice


{-| An ordinal scale.
-}
scOrdinal : Scale
scOrdinal =
    ScOrdinal


{-| Padding in pixels to apply to a scaling.
-}
scPadding : Float -> ScaleProperty
scPadding =
    SPadding


{-| Inner padding to apply to a band scaling.
-}
scPaddingInner : Float -> ScaleProperty
scPaddingInner =
    SPaddingInner


{-| Outer padding to apply to a band scaling.
-}
scPaddingOuter : Float -> ScaleProperty
scPaddingOuter =
    SPaddingOuter


{-| A point scale.
-}
scPoint : Scale
scPoint =
    ScPoint


{-| A power scale.
-}
scPow : Scale
scPow =
    ScPow


{-| A quantile scale.
-}
scQuantile : Scale
scQuantile =
    ScQuantile


{-| A quantizing scale.
-}
scQuantize : Scale
scQuantize =
    ScQuantize


{-| Range of a scaling. The type of range depends on the encoding channel.
-}
scRange : ScaleRange -> ScaleProperty
scRange =
    SRange


{-| Distance between the starts of adjacent bands in a band scaling. If
`Nothing` is provided the distance is determined automatically.
-}
scRangeStep : Maybe Float -> ScaleProperty
scRangeStep =
    SRangeStep


{-| Reverse the order of a scaling.
-}
scReverse : Bool -> ScaleProperty
scReverse =
    SReverse


{-| Whether or not numeric values in a scaling are rounded to integers.
-}
scRound : Bool -> ScaleProperty
scRound =
    SRound


{-| Color scheme used by a color scaling. The first parameter is the name of the
scheme (e.g. "viridis") and the second an optional specifiction of the number of
colors to use (list of one number), or the extent of the color range to use (list
of two numbers between 0 and 1).
-}
scScheme : String -> List Float -> ScaleProperty
scScheme =
    SScheme


{-| A sequential scale.
-}
scSequential : Scale
scSequential =
    ScSequential


{-| A square root scale.
-}
scSqrt : Scale
scSqrt =
    ScSqrt


{-| A threshold scale.
-}
scThreshold : Scale
scThreshold =
    ScThreshold


{-| A temporal scale.
-}
scTime : Scale
scTime =
    ScTime


{-| Type of scaling to apply.
-}
scType : Scale -> ScaleProperty
scType =
    SType


{-| A UTC temporal scale.
-}
scUtc : Scale
scUtc =
    ScUtc


{-| Whether or not a numeric scaling should be forced to include a zero value.
-}
scZero : Bool -> ScaleProperty
scZero =
    SZero


{-| Binding to some input elements as part of a named selection.
-}
seBind : List Binding -> SelectionProperty
seBind =
    Bind


{-| Enable two-way binding between a selection and the scales used in the same view.
-}
seBindScales : SelectionProperty
seBindScales =
    BindScales


{-| Second of a minute time unit used for discretizing temporal data.
-}
seconds : TimeUnit
seconds =
    Seconds


{-| Seconds and milliseconds time unit used for discretizing temporal data.
-}
secondsMilliseconds : TimeUnit
secondsMilliseconds =
    SecondsMilliseconds


{-| Make a selection empty by default when nothing selected.
-}
seEmpty : SelectionProperty
seEmpty =
    Empty


{-| Encoding channels that form a named selection.
-}
seEncodings : List Channel -> SelectionProperty
seEncodings =
    Encodings


{-| Field names for projecting a selection.
-}
seFields : List String -> SelectionProperty
seFields =
    Fields


{-| Create a single named selection that may be applied to a data query or transformation.
The first two parameters specify the name to be given to the selection for later
reference and the type of selection made. The third allows additional selection options to
be specified.
-}
select : String -> Selection -> List SelectionProperty -> List LabelledSpec -> List LabelledSpec
select selName sType options =
    let
        selProps =
            ( "type", JE.string (selectionLabel sType) )
                :: List.map selectionProperty options
    in
    (::) ( selName, JE.object selProps )


{-| Interactive selection that will be true or false as part of a logical composition.
e.g., to filter a dataset so that only items selected interactively and that have
a weight of more than 30:

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


{-| Name a selection that is used as part of a conditional encoding.

    color
        [ mSelectionCondition (selectionName "myBrush")
            [ mName "myField", mMType Nominal ]
            [ mStr "grey" ]
        ]

-}
selectionName : String -> BooleanOp
selectionName =
    SelectionName


{-| Whether or not a selection should capture nearest marks to a pointer
rather than an exact position match.
-}
seNearest : Bool -> SelectionProperty
seNearest =
    Nearest


{-| [Vega event stream](https://vega.github.io/vega/docs/event-streams)
that triggers a selection.
-}
seOn : String -> SelectionProperty
seOn =
    On


{-| Strategy that determines how selections’ data queries are resolved when applied
in a filter transform, conditional encoding rule, or scale domain.
-}
seResolve : SelectionResolution -> SelectionProperty
seResolve =
    ResolveSelections


{-| Appearance of an interval selection mark (dragged rectangle).
-}
seSelectionMark : List SelectionMarkProperty -> SelectionProperty
seSelectionMark =
    SelectionMark


{-| Predicate expression that determines a toggled selection. See the
[Vega-Lite toggle documentation](https://vega.github.io/vega-lite/docs/toggle.html)
-}
seToggle : String -> SelectionProperty
seToggle =
    Toggle


{-| Translation selection transformation used for panning a view. See the
[Vega-Lite translate documentation](https://vega.github.io/vega-lite/docs/translate.html)
-}
seTranslate : String -> SelectionProperty
seTranslate =
    Translate


{-| Zooming selection transformation used for zooming a view. See the
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


{-| Encode a size channel with a list of mark channel properties.
-}
size : List MarkChannel -> List LabelledSpec -> List LabelledSpec
size markProps =
    (::) ( "size", List.concatMap markChannelProperty markProps |> JE.object )


{-| Fill color of an interval selection mark (dragged rectangular area).
-}
smFill : String -> SelectionMarkProperty
smFill =
    SMFill


{-| Fill opacity of an interval selection mark in the range 0 to 1.
-}
smFillOpacity : Float -> SelectionMarkProperty
smFillOpacity =
    SMFillOpacity


{-| Sroke color of the interval selection mark.
-}
smStroke : String -> SelectionMarkProperty
smStroke =
    SMStroke


{-| Stroke opacity of the interval selection mark in the range 0 to 1.
-}
smStrokeOpacity : Float -> SelectionMarkProperty
smStrokeOpacity =
    SMStrokeOpacity


{-| Stroke width of the interval selection mark.
-}
smStrokeWidth : Float -> SelectionMarkProperty
smStrokeWidth =
    SMStrokeWidth


{-| Stroke dash style of the interval selection mark.
-}
smStrokeDash : List Float -> SelectionMarkProperty
smStrokeDash =
    SMStrokeDash


{-| Stroke dash offset of the interval selection mark.
-}
smStrokeDashOffset : Float -> SelectionMarkProperty
smStrokeDashOffset =
    SMStrokeDashOffset


{-| Indicate sorting is to be applied from low to high.
-}
soAscending : SortProperty
soAscending =
    Ascending


{-| Sort by the aggregated summary of a given field using a given aggregation
operation. e.g., sort the categorical data field `variety` by the mean age of
the data in each variety category:

    position Y
        [ pName "variety"
        , pMType Ordinal
        , pSort [ soByField "age" Mean, Descending ]
        ]

-}
soByField : String -> Operation -> SortProperty
soByField =
    ByFieldOp


{-| Sort by the aggregated summaries of the given fields (referenced by a repeat
iteration) using a given aggregation operation.
-}
soByRepeat : Arrangement -> Operation -> SortProperty
soByRepeat =
    ByRepeatOp


{-| Custom sort order listing data values explicitly.
-}
soCustom : DataValues -> SortProperty
soCustom =
    CustomSort


{-| Indicate sorting is to be applied from hight to low.
-}
soDescending : SortProperty
soDescending =
    Descending


{-| Spacing between sub-views in a composition operator.
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


{-| Define a specification object for use with faceted and repeated small multiples.

    spec = ...
    toVegaLite
        [ facet [ rowBy [ fName "Origin", fMType Nominal ] ]
        , specifcation spec
        ]

-}
specification : Spec -> ( VLProperty, Spec )
specification spec =
    ( VLSpec, spec )


{-| [Square mark](https://vega.github.io/vega-lite/docs/square.html) for symbolising
points.
-}
square : List MarkProperty -> ( VLProperty, Spec )
square =
    mark Square


{-| Apply a stack transform for positioning multiple values. This is an alternative
to specifying stacking directly when encoding position. First parameter is the field
to be stacked; the second the fields to group by; the third and fourth are the names
to give the output field names; the fifth lists the optional offset and sort properties.
-}
stack : String -> List String -> String -> String -> List StackProperty -> List LabelledSpec -> List LabelledSpec
stack f grp start end sProps =
    (::)
        ( "stack"
        , toList
            [ JE.string f
            , JE.list JE.string grp
            , JE.string start
            , JE.string end
            , stackPropertySpec "offset" sProps
            , stackPropertySpec "sort" sProps
            ]
        )


{-| Indicate that the given field should be sorted in ascending order.
-}
stAscending : String -> SortField
stAscending =
    WAscending


{-| Indicate that the given field should be sorted in descending order.
-}
stDescending : String -> SortField
stDescending =
    WDescending


{-| A stereographic map projection.
-}
stereographic : Projection
stereographic =
    Stereographic


{-| Stack offset when applying a stack transformation.
-}
stOffset : StackOffset -> StackProperty
stOffset =
    StOffset


{-| Ordering within a stack when applying a stack transformation.
-}
stSort : List SortField -> StackProperty
stSort =
    StSort


{-| A string data value.
-}
str : String -> DataValue
str =
    Str


{-| Encode a stroke channel. This acts in a similar way to encoding by `color` but
only affects the exterior boundary of marks.
-}
stroke : List MarkChannel -> List LabelledSpec -> List LabelledSpec
stroke markProps =
    (::) ( "stroke", List.concatMap markChannelProperty markProps |> JE.object )


{-| A list of string data values.
-}
strs : List String -> DataValues
strs =
    Strings


{-| Specify a circular symbol for a shape mark.
-}
symCircle : Symbol
symCircle =
    SymCircle


{-| Specify a cross symbol for a shape mark.
-}
symCross : Symbol
symCross =
    SymCross


{-| Specify a diamond symbol for a shape mark.
-}
symDiamond : Symbol
symDiamond =
    SymDiamond


{-| A custom symbol shape as an
[SVG path description](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
-}
symPath : String -> Symbol
symPath =
    SymPath


{-| Specify a square symbol for a shape mark.
-}
symSquare : Symbol
symSquare =
    SymSquare


{-| Specify an upward trianglular symbol for a shape mark.
-}
symTriangleUp : Symbol
symTriangleUp =
    SymTriangleUp


{-| Specify a downward trianglular symbol for a shape mark.
-}
symTriangleDown : Symbol
symTriangleDown =
    SymTriangleDown


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


{-| Indicate that data encoded with a text channel are already binned.
-}
tBinned : TextChannel
tBinned =
    TBinned


{-| Make a text channel conditional on one or more predicate expressions. The first
parameter is a list of tuples each pairing an expression to evaluate with the encoding
if that expression is true. The second is the encoding if none of the expressions
are evaluated as true.
-}
tDataCondition : List ( BooleanOp, List TextChannel ) -> List TextChannel -> TextChannel
tDataCondition =
    TDataCondition


{-| Encode a text channel.
-}
text : List TextChannel -> List LabelledSpec -> List LabelledSpec
text tDefs =
    (::) ( "text", List.concatMap textChannelProperty tDefs |> JE.object )


{-| [Text mark](https://vega.github.io/vega-lite/docs/text.html) to be
displayed at some point location.
-}
textMark : List MarkProperty -> ( VLProperty, Spec )
textMark =
    mark Text


{-| [Formatting pattern](https://vega.github.io/vega-lite/docs/format.html)
for a field when encoding with a text channel.
-}
tFormat : String -> TextChannel
tFormat =
    TFormat


{-| Short line ([tick](https://vega.github.io/vega-lite/docs/tick.html))
mark for symbolising point locations.
-}
tick : List MarkProperty -> ( VLProperty, Spec )
tick =
    mark Tick


{-| Default anchor position when placing titles.
-}
ticoAnchor : Anchor -> TitleConfig
ticoAnchor =
    TAnchor


{-| Default angle when orientating titles.
-}
ticoAngle : Float -> TitleConfig
ticoAngle =
    TAngle


{-| Default vertical alignment when placing titles.
-}
ticoBaseline : VAlign -> TitleConfig
ticoBaseline =
    TBaseline


{-| Default color when showing titles.
-}
ticoColor : String -> TitleConfig
ticoColor =
    TColor


{-| Default font when showing titles.
-}
ticoFont : String -> TitleConfig
ticoFont =
    TFont


{-| Default font size when showing titles.
-}
ticoFontSize : Float -> TitleConfig
ticoFontSize =
    TFontSize


{-| Default font weight when showing titles.
-}
ticoFontWeight : FontWeight -> TitleConfig
ticoFontWeight =
    TFontWeight


{-| Default maximim length in pixel units when showing titles.
-}
ticoLimit : Float -> TitleConfig
ticoLimit =
    TLimit


{-| Default offset in pixel units of titles relative to the chart body.
-}
ticoOffset : Float -> TitleConfig
ticoOffset =
    TOffset


{-| Default placement of titles relative to the chart body.
-}
ticoOrient : Side -> TitleConfig
ticoOrient =
    TOrient


{-| Create a new data field based on the given temporal binning. Unlike the
direct encoding binning, this transformation is named and so can be referred
to in multiple encodings. The first parameter is the width of each temporal bin,
the second is the field to bin and the third is name to give the newly binned
field.
-}
timeUnitAs : TimeUnit -> String -> String -> List LabelledSpec -> List LabelledSpec
timeUnitAs tu field label =
    (::) ( "timeUnit", JE.list JE.string [ timeUnitLabel tu, field, label ] )


{-| Title to be displayed in the visualization.
-}
title : String -> ( VLProperty, Spec )
title s =
    ( VLTitle, JE.string s )


{-| Level of measurement when encoding with a text channel.
-}
tMType : Measurement -> TextChannel
tMType =
    TmType


{-| Name of the field used for encoding with a text channel.
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
that define the channel.
-}
tooltips : List (List TextChannel) -> List LabelledSpec -> List LabelledSpec
tooltips tDefss =
    (::) ( "tooltip", JE.list (\tDefs -> JE.object (List.concatMap textChannelProperty tDefs)) tDefss )


{-| A topoJSON feature format containing an object with the given name.
-}
topojsonFeature : String -> Format
topojsonFeature =
    TopojsonFeature


{-| A topoJSON mesh format containing an object with the given name. Unlike
`topojsonFeature`, the corresponding geo data are returned as a single unified mesh,
not as individual GeoJSON features.
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


{-| [Trail mark](https://vega.github.io/vega-lite/docs/trail.html) (line
with variable width along its length).
-}
trail : List MarkProperty -> ( VLProperty, Spec )
trail =
    mark Trail


{-| Create a single transform from a list of transformation specifications. The
order of transformations can be important, e.g. labels created with [calculateAs](#calculateAs),
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
        assemble ( trName, val ) =
            -- These special cases (aggregate, bin etc.) use decodeString because
            -- they generate more than one labelled specification from a single function.
            case trName of
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
                        Ok [ ex, label ] ->
                            JE.object [ ( "calculate", ex ), ( "as", label ) ]

                        _ ->
                            JE.null

                "impute" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ imp, key, frameObj, keyValsObj, keyValSequenceObj, methodObj, groupbyObj, valueObj ] ->
                            ([ ( "impute", imp ), ( "key", key ) ]
                                ++ (if frameObj == JE.null then
                                        []

                                    else
                                        [ ( "frame", frameObj ) ]
                                   )
                                ++ (if keyValsObj == JE.null then
                                        []

                                    else
                                        [ ( "keyvals", keyValsObj ) ]
                                   )
                                ++ (if keyValSequenceObj == JE.null then
                                        []

                                    else
                                        [ ( "keyvals", keyValSequenceObj ) ]
                                   )
                                ++ (if methodObj == JE.null then
                                        []

                                    else
                                        [ ( "method", methodObj ) ]
                                   )
                                ++ (if groupbyObj == JE.null then
                                        []

                                    else
                                        [ ( "groupby", groupbyObj ) ]
                                   )
                                ++ (if valueObj == JE.null then
                                        []

                                    else
                                        [ ( "value", valueObj ) ]
                                   )
                            )
                                |> JE.object

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

                "foldAs" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ fields, keyName, valName ] ->
                            JE.object
                                [ ( "fold", fields )
                                , ( "as", toList [ keyName, valName ] )
                                ]

                        _ ->
                            JE.null

                "stack" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ field, grp, start, end, offsetObj, sortObj ] ->
                            [ ( "stack", field ), ( "groupby", grp ), ( "as", toList [ start, end ] ) ]
                                ++ (if offsetObj == JE.null then
                                        []

                                    else
                                        [ ( "offset", offsetObj ) ]
                                   )
                                ++ (if sortObj == JE.null then
                                        []

                                    else
                                        [ ( "sort", sortObj ) ]
                                   )
                                |> JE.object

                        _ ->
                            JE.null

                "timeUnit" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ tu, field, label ] ->
                            JE.object [ ( "timeUnit", tu ), ( "field", field ), ( "as", label ) ]

                        _ ->
                            JE.null

                "window" ->
                    case JD.decodeString (JD.list JD.value) (JE.encode 0 val) of
                        Ok [ winObj, frameObj, peersObj, groupbyObj, sortObj ] ->
                            ([ ( "window", winObj ) ]
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
                    JE.object [ ( trName, val ) ]
    in
    if List.isEmpty transforms then
        ( VLTransform, JE.null )

    else
        ( VLTransform, JE.list assemble transforms )


{-| A transverse Mercator map projection.
-}
transverseMercator : Projection
transverseMercator =
    TransverseMercator


{-| A true value used for functions that can accept a Boolean literal or a reference
to something that generates a Boolean value. Convenience function equivalent to `boo True`
-}
true : DataValue
true =
    Boolean True


{-| Make a text channel conditional on interactive selection. The first parameter
is a selection condition to evaluate; the second the encoding to apply if that
selection is true; the third parameter is the encoding if the selection is false.
-}
tSelectionCondition : BooleanOp -> List TextChannel -> List TextChannel -> TextChannel
tSelectionCondition =
    TSelectionCondition


{-| TSV data file format (only necessary if the file extension does not indicate the
type).
-}
tsv : Format
tsv =
    TSV


{-| Time unit aggregation of field values when encoding with a text channel.
-}
tTimeUnit : TimeUnit -> TextChannel
tTimeUnit =
    TTimeUnit


{-| Title of a field when encoding with a text or tooltip channel.
-}
tTitle : String -> TextChannel
tTitle =
    TTitle


{-| UTC version of a given a time (coordinated universal time, independent of local
time zones or daylight saving). To encode a time as UTC (coordinated universal time,
independent of local time zones or daylight saving), just use this function to convert
another `TimeUnit` generating function. For example,

    encoding
        << position X [ pName "date", pMType Temporal, pTimeUnit (utc yearMonthDateHours) ]

-}
utc : TimeUnit -> TimeUnit
utc tu =
    Utc tu


{-| Specifications to be juxtaposed vertically in a visualization.
-}
vConcat : List Spec -> ( VLProperty, Spec )
vConcat specs =
    ( VLVConcat, toList specs )


{-| Whether or not by default single views should be clipped.
-}
vicoClip : Bool -> ViewConfig
vicoClip =
    Clip


{-| Default fill color for single views.
-}
vicoFill : Maybe String -> ViewConfig
vicoFill =
    Fill


{-| Default fill opacity for single views.
-}
vicoFillOpacity : Float -> ViewConfig
vicoFillOpacity =
    FillOpacity


{-| Default height of single views (e.g. each view in a trellis plot).
-}
vicoHeight : Float -> ViewConfig
vicoHeight =
    ViewHeight


{-| Default stroke color for single views. If `Nothing` is provided,
no strokes are drawn around the view.
-}
vicoStroke : Maybe String -> ViewConfig
vicoStroke =
    Stroke


{-| Default stroke dash style for single views.
-}
vicoStrokeDash : List Float -> ViewConfig
vicoStrokeDash =
    StrokeDash


{-| Default stroke dash offset for single views.
-}
vicoStrokeDashOffset : Float -> ViewConfig
vicoStrokeDashOffset =
    StrokeDashOffset


{-| Default stroke opacity for single views.
-}
vicoStrokeOpacity : Float -> ViewConfig
vicoStrokeOpacity =
    StrokeOpacity


{-| Default stroke width of single views.
-}
vicoStrokeWidth : Float -> ViewConfig
vicoStrokeWidth =
    StrokeWidth


{-| Default width of single views (e.g. each view in a trellis plot).
-}
vicoWidth : Float -> ViewConfig
vicoWidth =
    ViewWidth


{-| An aggregrate operation to be used in a window transformation.
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


{-| Indicate that the given field should be sorted in ascending order when performing
a window transform.
-}
wiAscending : String -> SortField
wiAscending =
    WAscending


{-| Indicate that the given field should be sorted in descending order when performing
a window transform.
-}
wiDescending : String -> SortField
wiDescending =
    WDescending


{-| Field for which to compute a window operation. Not needed for
operations that do not apply to fields such as `Count`, `Rank` and `DenseRank`.
-}
wiField : String -> Window
wiField =
    WField


{-| Moving window for use by a window transform. The two parameters
should either be `Just` a number indicating the offset from the current data object,
or `Nothing` to indicate unbounded rows preceding or following the current data object.
-}
wiFrame : Maybe Int -> Maybe Int -> WindowProperty
wiFrame =
    WFrame


{-| Fields for partioning data objects in a window transform into separate windows.
If unspecified, all points will be in a single group.
-}
wiGroupBy : List String -> WindowProperty
wiGroupBy =
    WGroupBy


{-| Whether or not the sliding window frame in a window transform should ignore
peer values (those considered identical by the sort criteria).
-}
wiIgnorePeers : Bool -> WindowProperty
wiIgnorePeers =
    WIgnorePeers


{-| Window transform for performing calculations over sorted groups of
data objects such as ranking, lead/lag analysis, running sums and averages.

The first parameter is a list of tuples each comprising a window transform field
definition and an output name. The second is the window transform definition.

       trans =
           transform
               << window [ ( [ wiAggregateOp Sum, wiField "Time" ], "TotalTime" ) ]
                   [ wiFrame Nothing Nothing ]

-}
window : List ( List Window, String ) -> List WindowProperty -> List LabelledSpec -> List LabelledSpec
window wss wProps =
    let
        winFieldDef ws outName =
            JE.object (( "as", JE.string outName ) :: List.map windowFieldProperty ws)
    in
    (::)
        ( "window"
        , toList
            [ JE.list (\( ws, out ) -> winFieldDef ws out) wss
            , windowPropertySpec "frame" wProps
            , windowPropertySpec "ignorePeers" wProps
            , windowPropertySpec "groupby" wProps
            , windowPropertySpec "sort" wProps
            ]
        )


{-| Window-specific operation to be used in a window transformation.
-}
wiOp : WOperation -> Window
wiOp =
    WOp


{-| Numeric parameter for window-only operations that can be parameterised
(`Ntile`, `Lag`, `Lead` and `NthValue`).
-}
wiParam : Int -> Window
wiParam =
    WParam


{-| Comparator for sorting data objects within a window transform.
-}
wiSort : List SortField -> WindowProperty
wiSort =
    WSort


{-| Cumulative distribution function to be applied in a window transform.
-}
woCumeDist : WOperation
woCumeDist =
    CumeDist


{-| Dense rank function to be applied in a window transform.
-}
woDenseRank : WOperation
woDenseRank =
    DenseRank


{-| First value in a sliding window to be applied in a window transform.
-}
woFirstValue : WOperation
woFirstValue =
    FirstValue


{-| Value preceding the current object in a sliding window to be applied in a window transform.
-}
woLag : WOperation
woLag =
    Lag


{-| Last value in a sliding window to be applied in a window transform.
-}
woLastValue : WOperation
woLastValue =
    LastValue


{-| Value following the current object in a sliding window to be applied in a window transform.
-}
woLead : WOperation
woLead =
    Lead


{-| Nth value in a sliding window to be applied in a window transform.
-}
woNthValue : WOperation
woNthValue =
    NthValue


{-| Value preceding the current object in a sliding window to be applied in a window transform.
-}
woPercentile : WOperation
woPercentile =
    Ntile


{-| Percentile of values in a sliding window to be applied in a window transform.
-}
woPercentRank : WOperation
woPercentRank =
    PercentRank


{-| Rank function to be applied in a window transform.
-}
woRank : WOperation
woRank =
    Rank


{-| Assign consecutive row number to values in a data object to be applied in a window transform.
-}
woRowNumber : WOperation
woRowNumber =
    RowNumber


{-| Year time unit used for discretizing temporal data.
-}
year : TimeUnit
year =
    Year


{-| Year and year quarter time unit used for discretizing temporal data.
-}
yearQuarter : TimeUnit
yearQuarter =
    YearQuarter


{-| Year, quarter and month time unit used for discretizing temporal data.
-}
yearQuarterMonth : TimeUnit
yearQuarterMonth =
    YearQuarterMonth


{-| Year and month time unit used for discretizing temporal data.
-}
yearMonth : TimeUnit
yearMonth =
    YearMonth


{-| Year, month and day of month time unit used for discretizing temporal data.
-}
yearMonthDate : TimeUnit
yearMonthDate =
    YearMonthDate


{-| Year, month, day of month and hour of day time unit used for discretizing temporal data.
-}
yearMonthDateHours : TimeUnit
yearMonthDateHours =
    YearMonthDateHours


{-| Time unit used for discretizing temporal data.
-}
yearMonthDateHoursMinutes : TimeUnit
yearMonthDateHoursMinutes =
    YearMonthDateHoursMinutes


{-| Time unit used for discretizing temporal data.
-}
yearMonthDateHoursMinutesSeconds : TimeUnit
yearMonthDateHoursMinutesSeconds =
    YearMonthDateHoursMinutesSeconds



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


anchorLabel : Anchor -> String
anchorLabel an =
    case an of
        AnStart ->
            "start"

        AnMiddle ->
            "middle"

        AnEnd ->
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

        DomainOpacity n ->
            ( "domainOpacity", JE.float n )

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
            ( "gridDash", JE.list JE.float ds )

        GridOpacity o ->
            ( "gridOpacity", JE.float o )

        GridWidth x ->
            ( "gridWidth", JE.float x )

        Labels b ->
            ( "labels", JE.bool b )

        LabelAlign ha ->
            ( "labelAlign", JE.string (hAlignLabel ha) )

        LabelAngle angle ->
            ( "labelAngle", JE.float angle )

        LabelBaseline va ->
            ( "labelBaseline", JE.string (vAlignLabel va) )

        LabelBound mn ->
            case mn of
                Just n ->
                    if n == 1 then
                        ( "labelBound", JE.bool True )

                    else
                        ( "labelBound", JE.float n )

                Nothing ->
                    ( "labelBound", JE.bool False )

        LabelColor c ->
            ( "labelColor", JE.string c )

        LabelFlush mn ->
            case mn of
                Just n ->
                    if n == 0 then
                        ( "labelFlush", JE.bool True )

                    else
                        ( "labelFlush", JE.float n )

                Nothing ->
                    ( "labelFlush", JE.bool False )

        LabelFlushOffset n ->
            ( "labelFlushOffset", JE.float n )

        LabelFont f ->
            ( "labelFont", JE.string f )

        LabelFontSize x ->
            ( "labelFontSize", JE.float x )

        LabelFontWeight fw ->
            ( "labelFontWeight", fontWeightSpec fw )

        LabelLimit x ->
            ( "labelLimit", JE.float x )

        LabelOpacity n ->
            ( "labelOpacity", JE.float n )

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

        TickExtra b ->
            ( "tickExtra", JE.bool b )

        TickOffset n ->
            ( "tickOffset", JE.float n )

        TickOpacity n ->
            ( "tickOpacity", JE.float n )

        TickStep n ->
            ( "tickStep", JE.float n )

        TickRound b ->
            ( "tickRound", JE.bool b )

        TickSize x ->
            ( "tickSize", JE.float x )

        TickWidth x ->
            ( "tickWidth", JE.float x )

        TitleAlign al ->
            ( "titleAlign", JE.string (hAlignLabel al) )

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

        TitleOpacity n ->
            ( "titleOpacity", JE.float n )

        TitlePadding x ->
            ( "titlePadding", JE.float x )

        TitleX x ->
            ( "titleX", JE.float x )

        TitleY y ->
            ( "titleY", JE.float y )


axisProperty : AxisProperty -> LabelledSpec
axisProperty axisProp =
    case axisProp of
        AxBandPosition n ->
            ( "bandPosition", JE.float n )

        AxFormat fmt ->
            ( "format", JE.string fmt )

        AxLabels b ->
            ( "labels", JE.bool b )

        AxLabelAlign ha ->
            ( "labelAlign", JE.string (hAlignLabel ha) )

        AxLabelBaseline va ->
            ( "labelBaseline", JE.string (vAlignLabel va) )

        AxLabelBound mn ->
            case mn of
                Just n ->
                    if n == 1 then
                        ( "labelBound", JE.bool True )

                    else
                        ( "labelBound", JE.float n )

                Nothing ->
                    ( "labelBound", JE.bool False )

        AxLabelAngle angle ->
            ( "labelAngle", JE.float angle )

        AxLabelColor s ->
            ( "labelColor", JE.string s )

        AxLabelFlush mn ->
            case mn of
                Just n ->
                    if n == 1 then
                        ( "labelFlush", JE.bool True )

                    else
                        ( "labelFlush", JE.float n )

                Nothing ->
                    ( "labelFlush", JE.bool False )

        AxLabelFlushOffset n ->
            ( "labelFlushOffset", JE.float n )

        AxLabelFont s ->
            ( "labelFont", JE.string s )

        AxLabelFontSize n ->
            ( "labelFontSize", JE.float n )

        AxLabelFontWeight fw ->
            ( "labelFontWeight", fontWeightSpec fw )

        AxLabelLimit n ->
            ( "labelLimit", JE.float n )

        AxLabelOpacity n ->
            ( "labelOpacity", JE.float n )

        AxLabelOverlap strat ->
            ( "labelOverlap", JE.string (overlapStrategyLabel strat) )

        AxLabelPadding pad ->
            ( "labelPadding", JE.float pad )

        AxDomain b ->
            ( "domain", JE.bool b )

        AxDomainColor c ->
            ( "domainColor", JE.string c )

        AxDomainOpacity n ->
            ( "domainOpacity", JE.float n )

        AxDomainWidth n ->
            ( "domainWidth", JE.float n )

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

        AxTickColor s ->
            ( "tickColor", JE.string s )

        AxTickCount n ->
            ( "tickCount", JE.int n )

        AxTickExtra b ->
            ( "tickExtra", JE.bool b )

        AxTickOffset n ->
            ( "tickOffset", JE.float n )

        AxTickOpacity n ->
            ( "tickOpacity", JE.float n )

        AxTickRound b ->
            ( "tickRound", JE.bool b )

        AxTickStep n ->
            ( "tickStep", JE.float n )

        AxTickSize sz ->
            ( "tickSize", JE.float sz )

        AxTickWidth n ->
            ( "tickWidth", JE.float n )

        AxValues vals ->
            ( "values", JE.list JE.float vals )

        AxDates dtss ->
            ( "values", JE.list (\ds -> JE.object (List.map dateTimeProperty ds)) dtss )

        AxTitle s ->
            ( "title", JE.string s )

        AxTitleAlign al ->
            ( "titleAlign", JE.string (hAlignLabel al) )

        AxTitleAngle angle ->
            ( "titleAngle", JE.float angle )

        AxTitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        AxTitleColor s ->
            ( "titleColor", JE.string s )

        AxTitleFont s ->
            ( "titleFont", JE.string s )

        AxTitleFontSize n ->
            ( "titleFontSize", JE.float n )

        AxTitleFontWeight fw ->
            ( "titleFontWeight", fontWeightSpec fw )

        AxTitleLimit n ->
            ( "titleLimit", JE.float n )

        AxTitleOpacity n ->
            ( "titleOpacity", JE.float n )

        AxTitlePadding pad ->
            ( "titlePadding", JE.float pad )

        AxTitleX n ->
            ( "titleX", JE.float n )

        AxTitleY n ->
            ( "titleY", JE.float n )


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
            ( "steps", JE.list JE.float xs )

        MinStep x ->
            ( "minstep", JE.float x )

        Divides xs ->
            ( "divide", JE.list JE.float xs )

        Extent mn mx ->
            ( "extent", JE.list JE.float [ mn, mx ] )

        Nice b ->
            ( "nice", JE.bool b )


booleanOpSpec : BooleanOp -> Spec
booleanOpSpec bo =
    case bo of
        Expr ex ->
            JE.string ex

        SelectionName selName ->
            JE.string selName

        Selection sel ->
            JE.object [ ( "selection", JE.string sel ) ]

        And operand1 operand2 ->
            JE.object [ ( "and", JE.list booleanOpSpec [ operand1, operand2 ] ) ]

        Or operand1 operand2 ->
            JE.object [ ( "or", JE.list booleanOpSpec [ operand1, operand2 ] ) ]

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

        CountTitle s ->
            ( "countTitle", JE.string s )

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

        HeaderStyle hps ->
            ( "header", JE.object (List.map headerProperty hps) )

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

        NamedStyle styleName mps ->
            ( "style", JE.object [ ( styleName, JE.object (List.map markProperty mps) ) ] )

        Scale scs ->
            ( "scale", JE.object (List.map scaleConfigProperty scs) )

        Stack so ->
            stackOffset so

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
        FoNum ->
            JE.string "number"

        FoBoo ->
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

        DateTime d ->
            JE.object (List.map dateTimeProperty d)


dataValuesSpecs : DataValues -> List Spec
dataValuesSpecs dvs =
    case dvs of
        Numbers xs ->
            List.map JE.float xs

        Strings ss ->
            List.map JE.string ss

        DateTimes dtss ->
            List.map (\ds -> JE.object (List.map dateTimeProperty ds)) dtss

        Booleans bs ->
            List.map JE.bool bs


dateTimeProperty : DateTime -> LabelledSpec
dateTimeProperty dtp =
    case dtp of
        DTYear y ->
            ( "year", JE.int y )

        DTQuarter q ->
            ( "quarter", JE.int q )

        DTMonth mon ->
            ( "month", JE.string (monthNameLabel mon) )

        DTDate d ->
            ( "date", JE.int d )

        DTDay d ->
            ( "day", JE.string (dayLabel d) )

        DTHours h ->
            ( "hours", JE.int h )

        DTMinutes m ->
            ( "minutes", JE.int m )

        DTSeconds s ->
            ( "seconds", JE.int s )

        DTMilliseconds ms ->
            ( "milliseconds", JE.int ms )


dayLabel : DayName -> String
dayLabel dayName =
    case dayName of
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

        DImpute ips ->
            ( "impute", JE.object (List.map imputeProperty ips) )

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
                [ ( "parse", JE.object <| List.map (\( field, fFormat ) -> ( field, dataTypeSpec fFormat )) fmts ) ]


geometryTypeSpec : Geometry -> Spec
geometryTypeSpec gType =
    let
        toCoords : List ( Float, Float ) -> Spec
        toCoords pairs =
            JE.list (\( x, y ) -> JE.list JE.float [ x, y ]) pairs
    in
    case gType of
        GeoPoint x y ->
            JE.object
                [ ( "type", JE.string "Point" )
                , ( "coordinates", JE.list JE.float [ x, y ] )
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
                , ( "coordinates", JE.list toCoords coords )
                ]

        GeoPolygon coords ->
            JE.object
                [ ( "type", JE.string "Polygon" )
                , ( "coordinates", JE.list toCoords coords )
                ]

        GeoPolygons coords ->
            JE.object
                [ ( "type", JE.string "MultiPolygon" )
                , ( "coordinates", JE.list (\cs -> List.map toCoords cs |> toList) coords )
                ]


hAlignLabel : HAlign -> String
hAlignLabel al =
    case al of
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

        HLabelPadding x ->
            ( "labelPadding", JE.float x )

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

        HTitlePadding x ->
            ( "titlePadding", JE.float x )


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

        HBinned ->
            [ ( "bin", JE.string "binned" ) ]

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


imMethodLabel : ImMethod -> String
imMethodLabel method =
    case method of
        ImValue ->
            "value"

        ImMean ->
            "mean"

        ImMedian ->
            "median"

        ImMax ->
            "max"

        ImMin ->
            "min"


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
            ( "options", JE.list JE.string opts )

        InPlaceholder el ->
            ( "placeholder", JE.string el )

        Element el ->
            ( "element", JE.string el )


legendConfigProperty : LegendConfig -> LabelledSpec
legendConfigProperty legendConfig =
    case legendConfig of
        LeClipHeight h ->
            ( "clipHeight", JE.float h )

        LeColumnPadding n ->
            ( "columnPadding", JE.float n )

        LeRowPadding n ->
            ( "rowPadding", JE.float n )

        LeColumns n ->
            ( "columns", JE.float n )

        CornerRadius r ->
            ( "cornerRadius", JE.float r )

        FillColor s ->
            ( "fillColor", JE.string s )

        Orient orient ->
            ( "orient", JE.string (legendOrientLabel orient) )

        Offset x ->
            ( "offset", JE.float x )

        StrokeColor s ->
            ( "strokeColor", JE.string s )

        LeStrokeDash xs ->
            ( "strokeDash", JE.list JE.float xs )

        LeStrokeWidth x ->
            ( "strokeWidth", JE.float x )

        LePadding x ->
            ( "padding", JE.float x )

        GradientDirection d ->
            ( "gradientDirection", JE.string (markOrientationLabel d) )

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

        LeGridAlign ga ->
            ( "gridAlign", compositionAlignmentSpec ga )

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

        LeLabelOverlap lo ->
            ( "labelOverlap", JE.string (overlapStrategyLabel lo) )

        LeShortTimeLabels b ->
            ( "shortTimeLabels", JE.bool b )

        EntryPadding x ->
            ( "entryPadding", JE.float x )

        SymbolDirection d ->
            ( "symbolDirection", JE.string (markOrientationLabel d) )

        SymbolFillColor s ->
            ( "symbolFillColor", JE.string s )

        SymbolBaseFillColor s ->
            ( "symbolBaseFillColor", JE.string s )

        SymbolStrokeColor s ->
            ( "symbolStrokeColor", JE.string s )

        SymbolBaseStrokeColor s ->
            ( "symbolBaseStrokeColor", JE.string s )

        SymbolOffset o ->
            ( "symbolOffset", JE.float o )

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
        LClipHeight h ->
            ( "clipHeight", JE.float h )

        LColumnPadding n ->
            ( "columnPadding", JE.float n )

        LRowPadding n ->
            ( "rowPadding", JE.float n )

        LColumns n ->
            ( "columns", JE.float n )

        LCornerRadius r ->
            ( "cornerRadius", JE.float r )

        LFillColor s ->
            ( "fillColor", JE.string s )

        LDirection d ->
            ( "direction", JE.string (markOrientationLabel d) )

        LType lType ->
            case lType of
                Gradient ->
                    ( "type", JE.string "gradient" )

                Symbol ->
                    ( "type", JE.string "symbol" )

        LFormat s ->
            ( "format", JE.string s )

        LGradientLength n ->
            ( "gradientLength", JE.float n )

        LGradientThickness n ->
            ( "gradientThickness", JE.float n )

        LGradientStrokeColor s ->
            ( "gradientStrokeColor", JE.string s )

        LGradientStrokeWidth n ->
            ( "gradientStrokeWidth", JE.float n )

        LGridAlign ga ->
            ( "gridAlign", compositionAlignmentSpec ga )

        LLabelAlign ha ->
            ( "labelAlign", JE.string (hAlignLabel ha) )

        LLabelBaseline va ->
            ( "labelBaseline", JE.string (vAlignLabel va) )

        LLabelColor s ->
            ( "labelColor", JE.string s )

        LLabelFont s ->
            ( "labelFont", JE.string s )

        LLabelFontSize x ->
            ( "labelFontSize", JE.float x )

        LLabelLimit x ->
            ( "labelLimit", JE.float x )

        LLabelOffset x ->
            ( "labelOffset", JE.float x )

        LLabelOverlap lo ->
            ( "labelOverlap", JE.string (overlapStrategyLabel lo) )

        LOffset x ->
            ( "offset", JE.float x )

        LOrient orient ->
            ( "orient", JE.string (legendOrientLabel orient) )

        LPadding x ->
            ( "padding", JE.float x )

        LStrokeColor s ->
            ( "strokeColor", JE.string s )

        LStrokeWidth x ->
            ( "strokeWidth", JE.float x )

        LSymbolFillColor s ->
            ( "symbolFillColor", JE.string s )

        LSymbolStrokeColor s ->
            ( "symbolStrokeColor", JE.string s )

        LSymbolType s ->
            ( "symbolType", JE.string (symbolLabel s) )

        LSymbolSize x ->
            ( "symbolSize", JE.float x )

        LSymbolStrokeWidth x ->
            ( "symbolStrokeWidth", JE.float x )

        LTickCount x ->
            ( "tickCount", JE.float x )

        LTitle s ->
            if s == "" then
                ( "title", JE.null )

            else
                ( "title", JE.string s )

        LTitleAlign ha ->
            ( "titleAlign", JE.string (hAlignLabel ha) )

        LTitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        LTitleColor s ->
            ( "titleColor", JE.string s )

        LTitleFont s ->
            ( "titleFont", JE.string s )

        LTitleFontSize x ->
            ( "titleFontSize", JE.float x )

        LTitleFontWeight fw ->
            ( "titleFontWeight", fontWeightSpec fw )

        LTitleLimit x ->
            ( "titleLimit", JE.float x )

        LTitlePadding x ->
            ( "titlePadding", JE.float x )

        LValues vals ->
            let
                list =
                    case vals of
                        LNumbers xs ->
                            JE.list JE.float xs

                        LDateTimes ds ->
                            JE.list (\d -> JE.object (List.map dateTimeProperty d)) ds

                        LStrings ss ->
                            JE.list JE.string ss
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
mark m mProps =
    case mProps of
        [] ->
            ( VLMark, JE.string (markLabel m) )

        _ ->
            ( VLMark
            , ( "type", JE.string (markLabel m) )
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

        MBinned ->
            [ ( "bin", JE.string "binned" ) ]

        MImpute ips ->
            [ ( "impute", JE.object (List.map imputeProperty ips) ) ]

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
            ( "condition", JE.list testClause tests )
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
markLabel m =
    case m of
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
            ( "strokeDash", JE.list JE.float xs )

        MStrokeDashOffset x ->
            ( "strokeDashOffset", JE.float x )

        MStyle styles ->
            ( "style", JE.list JE.string styles )

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

        MAlign al ->
            ( "align", JE.string (hAlignLabel al) )

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

        MTooltip ttContent ->
            ( "tooltip", JE.object [ ( "content", JE.string (ttContentLabel ttContent) ) ] )

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
                    ( "sort", toList (dataValuesSpecs dvs) )

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

        Custom projName ->
            projName

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
                    ( "clipExtent", JE.list JE.float [ l, t, r, b ] )

        PCenter lon lat ->
            ( "center", JE.list JE.float [ lon, lat ] )

        PRotate lambda phi gamma ->
            ( "rotate", JE.list JE.float [ lambda, phi, gamma ] )

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

        PBinned ->
            ( "bin", JE.string "binned" )

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
                    ( "sort", toList (dataValuesSpecs dvs) )

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

        PStack so ->
            stackOffset so

        PRepeat arr ->
            ( "field", JE.object [ ( "repeat", JE.string (arrangementLabel arr) ) ] )

        PWidth ->
            ( "value", JE.string "width" )

        PHeight ->
            ( "value", JE.string "height" )

        PImpute ips ->
            ( "impute", JE.object (List.map imputeProperty ips) )


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
        RCategory schemeName ->
            ( "category", JE.object [ schemeProperty schemeName [] ] )

        RDiverging schemeName ->
            ( "diverging", JE.object [ schemeProperty schemeName [] ] )

        RHeatmap schemeName ->
            ( "heatmap", JE.object [ schemeProperty schemeName [] ] )

        ROrdinal schemeName ->
            ( "ordinal", JE.object [ schemeProperty schemeName [] ] )

        RRamp schemeName ->
            ( "ramp", JE.object [ schemeProperty schemeName [] ] )

        RSymbol schemeName ->
            ( "symbol", JE.object [ schemeProperty schemeName [] ] )


repeatFieldsProperty : RepeatFields -> LabelledSpec
repeatFieldsProperty fields =
    case fields of
        RowFields fs ->
            ( "row", JE.list JE.string fs )

        ColumnFields fs ->
            ( "column", JE.list JE.string fs )


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
            ( "axis", JE.object <| List.map (\( ch, chRule ) -> ( channelLabel ch, JE.string (resolutionLabel chRule) )) chRules )

        RLegend chRules ->
            --( "legend", JE.object [ ( channelLabel ch, JE.string (resolutionLabel rule) ) ] )
            ( "legend", JE.object <| List.map (\( ch, chRule ) -> ( channelLabel ch, JE.string (resolutionLabel chRule) )) chRules )

        RScale chRules ->
            --( "scale", JE.object [ ( channelLabel ch, JE.string (resolutionLabel rule) ) ] )
            ( "scale", JE.object <| List.map (\( ch, chRule ) -> ( channelLabel ch, JE.string (resolutionLabel chRule) )) chRules )


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
        DNumbers ns ->
            JE.list JE.float ns

        DDateTimes ds ->
            JE.list (\d -> JE.object (List.map dateTimeProperty d)) ds

        DStrings cats ->
            JE.list JE.string cats

        DSelection selName ->
            JE.object [ ( "selection", JE.string selName ) ]

        Unaggregated ->
            JE.string "unaggregated"


scaleLabel : Scale -> String
scaleLabel sc =
    case sc of
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

        ScQuantile ->
            "quantile"

        ScQuantize ->
            "quantize"

        ScThreshold ->
            "threshold"


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
                    ( "range", JE.list JE.float xs )

                RStrings ss ->
                    ( "range", JE.list JE.string ss )

                RName s ->
                    ( "range", JE.string s )

        SScheme schName extent ->
            schemeProperty schName extent

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
schemeProperty schName extent =
    case extent of
        [] ->
            ( "scheme", JE.string schName )

        [ n ] ->
            ( "scheme", JE.object [ ( "name", JE.string schName ), ( "count", JE.float n ) ] )

        [ mn, mx ] ->
            ( "scheme", JE.object [ ( "name", JE.string schName ), ( "extent", JE.list JE.float [ mn, mx ] ) ] )

        _ ->
            -- |> Debug.log ("scScheme should have 0, 1 or 2 numbers but you provided " ++ Debug.toString extent)
            ( "scheme", JE.string schName )


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
            ( "strokeDash", JE.list JE.float xs )

        SMStrokeDashOffset x ->
            ( "strokeDashOffset", JE.float x )


selectionProperty : SelectionProperty -> LabelledSpec
selectionProperty selProp =
    case selProp of
        Fields fNames ->
            ( "fields", JE.list JE.string fNames )

        Encodings channels ->
            ( "encodings", JE.list (JE.string << channelLabel) channels )

        On e ->
            ( "on", JE.string e )

        Empty ->
            ( "empty", JE.string "none" )

        ResolveSelections res ->
            ( "resolve", JE.string (selectionResolutionLabel res) )

        SelectionMark markProps ->
            ( "mark", JE.object (List.map selectionMarkProperty markProps) )

        BindScales ->
            ( "bind", JE.string "scales" )

        Bind binds ->
            ( "bind", JE.object (List.map bindingSpec binds) )

        Nearest b ->
            ( "nearest", JE.bool b )

        Toggle ex ->
            ( "toggle", JE.string ex )

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


sortFieldSpec : SortField -> Spec
sortFieldSpec wsf =
    case wsf of
        WAscending f ->
            JE.object [ ( "field", JE.string f ), ( "order", JE.string "ascending" ) ]

        WDescending f ->
            JE.object [ ( "field", JE.string f ), ( "order", JE.string "descending" ) ]


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
            -- |> Debug.log "Warning: Unexpected custom sorting provided to sortProperty"
            []


stackOffset : StackOffset -> LabelledSpec
stackOffset offset =
    ( "stack", stackOffsetSpec offset )


stackOffsetSpec : StackOffset -> Spec
stackOffsetSpec sp =
    case sp of
        StZero ->
            JE.string "zero"

        StNormalize ->
            JE.string "normalize"

        StCenter ->
            JE.string "center"

        NoStack ->
            JE.null


stackPropertySpec : String -> List StackProperty -> Spec
stackPropertySpec sName sps =
    let
        spSpec sp =
            case sName of
                "offset" ->
                    case sp of
                        StOffset op ->
                            stackOffsetSpec op

                        _ ->
                            JE.null

                "sort" ->
                    case sp of
                        StSort sfs ->
                            JE.list sortFieldSpec sfs

                        _ ->
                            JE.null

                _ ->
                    --|> Debug.log ("Unexpected stack property " ++ Debug.toString sName)
                    JE.null

        specList =
            List.map spSpec sps |> List.filter (\x -> x /= JE.null)
    in
    case specList of
        [ spec ] ->
            spec

        _ ->
            JE.null


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


symbolLabel : Symbol -> String
symbolLabel sym =
    case sym of
        SymCircle ->
            "circle"

        SymSquare ->
            "square"

        SymCross ->
            "cross"

        SymDiamond ->
            "diamond"

        SymTriangleUp ->
            "triangle-up"

        SymTriangleDown ->
            "triangle-down"

        SymPath svgPath ->
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

        TBinned ->
            [ ( "bin", JE.string "binned" ) ]

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
            ( "condition", JE.list testClause tests )
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



-- Provides an equivalent ot the Elm 0.18 Json list function.


toList : List JE.Value -> JE.Value
toList =
    JE.list identity


ttContentLabel : TooltipContent -> String
ttContentLabel ttContent =
    case ttContent of
        TTEncoding ->
            "encoding"

        TTData ->
            "data"


vAlignLabel : VAlign -> String
vAlignLabel al =
    case al of
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
            ( "strokeDash", JE.list JE.float xs )

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


wOperationLabel : WOperation -> String
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


windowFieldProperty : Window -> LabelledSpec
windowFieldProperty w =
    case w of
        WAggregateOp op ->
            ( "op", JE.string (operationLabel op) )

        WOp op ->
            ( "op", JE.string (wOperationLabel op) )

        WParam n ->
            ( "param", JE.int n )

        WField f ->
            ( "field", JE.string f )


imputeProperty : ImputeProperty -> LabelledSpec
imputeProperty ip =
    case ip of
        ImFrame (Just n1) (Just n2) ->
            ( "frame", JE.list JE.int [ n1, n2 ] )

        ImFrame Nothing (Just n2) ->
            ( "frame", toList [ JE.null, JE.int n2 ] )

        ImFrame (Just n1) Nothing ->
            ( "frame", toList [ JE.int n1, JE.null ] )

        ImFrame Nothing Nothing ->
            ( "frame", toList [ JE.null, JE.null ] )

        ImKeyVals dVals ->
            ( "keyvals", toList (dataValuesSpecs dVals) )

        ImKeyValSequence start stop step ->
            ( "keyvals"
            , JE.object
                [ ( "start", JE.float start )
                , ( "stop", JE.float stop )
                , ( "step", JE.float step )
                ]
            )

        ImMethod method ->
            ( "method", JE.string (imMethodLabel method) )

        ImNewValue dVal ->
            ( "value", dataValueSpec dVal )

        ImGroupBy _ ->
            -- |> Debug.log "Warning: groupby not valud when imputing a channel"
            ( "groupby", JE.null )


imputePropertySpec : String -> List ImputeProperty -> Spec
imputePropertySpec ipName ips =
    let
        ipSpec ip =
            case ipName of
                "frame" ->
                    case ip of
                        ImFrame (Just n1) (Just n2) ->
                            JE.list JE.int [ n1, n2 ]

                        ImFrame Nothing (Just n2) ->
                            toList [ JE.null, JE.int n2 ]

                        ImFrame (Just n1) Nothing ->
                            toList [ JE.int n1, JE.null ]

                        ImFrame Nothing Nothing ->
                            toList [ JE.null, JE.null ]

                        _ ->
                            JE.null

                "keyVals" ->
                    case ip of
                        ImKeyVals dVals ->
                            toList (dataValuesSpecs dVals)

                        _ ->
                            JE.null

                "keyValSequence" ->
                    case ip of
                        ImKeyValSequence start stop step ->
                            JE.object
                                [ ( "start", JE.float start )
                                , ( "stop", JE.float stop )
                                , ( "step", JE.float step )
                                ]

                        _ ->
                            JE.null

                "groupby" ->
                    case ip of
                        ImGroupBy fields ->
                            JE.list JE.string fields

                        _ ->
                            JE.null

                "method" ->
                    case ip of
                        ImMethod method ->
                            JE.string (imMethodLabel method)

                        _ ->
                            JE.null

                "value" ->
                    case ip of
                        ImNewValue dVal ->
                            dataValueSpec dVal

                        _ ->
                            JE.null

                _ ->
                    --|> Debug.log ("Unexpected impute property " ++ Debug.toString ipName)
                    JE.null

        specList =
            List.map ipSpec ips |> List.filter (\x -> x /= JE.null)
    in
    case specList of
        [ spec ] ->
            spec

        _ ->
            JE.null


windowPropertySpec : String -> List WindowProperty -> Spec
windowPropertySpec wpName wps =
    let
        wpSpec wp =
            case wpName of
                "frame" ->
                    case wp of
                        WFrame (Just n1) (Just n2) ->
                            JE.list JE.int [ n1, n2 ]

                        WFrame Nothing (Just n2) ->
                            toList [ JE.null, JE.int n2 ]

                        WFrame (Just n1) Nothing ->
                            toList [ JE.int n1, JE.null ]

                        WFrame Nothing Nothing ->
                            toList [ JE.null, JE.null ]

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
                            JE.list JE.string fs

                        _ ->
                            JE.null

                "sort" ->
                    case wp of
                        WSort sfs ->
                            JE.list sortFieldSpec sfs

                        _ ->
                            JE.null

                _ ->
                    -- |> Debug.log ("Unexpected window property name " ++ Debug.toString wpName)
                    JE.null

        specList =
            List.map wpSpec wps |> List.filter (\x -> x /= JE.null)
    in
    case specList of
        [ spec ] ->
            spec

        _ ->
            JE.null
