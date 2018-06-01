module Vega
    exposing
        ( AggregateProperty
        , Anchor(End, Middle, Start)
        , Autosize(AContent, AFit, ANone, APad, APadding, AResize)
        , AxisElement(EAxis, EDomain, EGrid, ELabels, ETicks, ETitle)
        , AxisProperty
        , BinProperty
        , Bind
        , Boo
        , BoundsCalculation(Flush, Full)
        , CInterpolate(Hcl, Hsl, Lab)
        , Clip
        , ColorSchemeProperty
        , ColorValue
        , Comparator
        , ContourProperty
        , Cursor(CAlias, CAllScroll, CAuto, CCell, CColResize, CContextMenu, CCopy, CCrosshair, CDefault, CEResize, CEWResize, CGrab, CGrabbing, CHelp, CMove, CNEResize, CNESWResize, CNResize, CNSResize, CNWResize, CNWSEResize, CNoDrop, CNone, CNotAllowed, CPointer, CProgress, CRowResize, CSEResize, CSResize, CSWResize, CText, CVerticalText, CWResize, CWait, CZoomIn, CZoomOut)
        , Data
        , DataColumn
        , DataProperty(DaSphere)
        , DataReference
        , DataRow
        , DataTable
        , DataType(FoBoo, FoNum)
        , DataValues
        , EncodingProperty
        , EventHandler
        , EventSource(ESAll, ESScope, ESView, ESWindow)
        , EventStream
        , EventStreamProperty
        , EventType(Click, DblClick, DragEnter, DragLeave, DragOver, KeyDown, KeyPress, KeyUp, MouseDown, MouseMove, MouseOut, MouseOver, MouseUp, MouseWheel, Timer, TouchEnd, TouchMove, TouchStart, Wheel)
        , Expr
        , Facet
        , Field
        , FieldValue
        , Force
        , ForceProperty
        , ForceSimulationProperty
        , Format(CSV, JSON, TSV)
        , FormulaUpdate(AlwaysUpdate, InitOnly)
        , GeoPathProperty
        , GraticuleProperty
        , GridAlign(AlignAll, AlignEach, AlignNone)
        , HAlign(AlignCenter, AlignLeft, AlignRight)
        , InputProperty
        , LayoutProperty
        , LegendEncoding
        , LegendOrientation(Bottom, BottomLeft, BottomRight, Left, None, Right, Top, TopLeft, TopRight)
        , LegendProperty
        , LegendType(LGradient, LSymbol)
        , LinkPathProperty
        , LinkShape(LinkArc, LinkCurve, LinkDiagonal, LinkLine, LinkOrthogonal)
        , LookupProperty
        , Mark(Arc, Area, Group, Image, Line, Path, Rect, Rule, Shape, Symbol, Text, Trail)
        , MarkInterpolation(Basis, Cardinal, CatmullRom, Linear, Monotone, Natural, StepAfter, StepBefore, Stepwise)
        , MarkProperty
        , Num
        , Operation(ArgMax, ArgMin, Average, CI0, CI1, Count, Distinct, Max, Mean, Median, Min, Missing, Q1, Q3, Stderr, Stdev, Stdevp, Sum, Valid, Variance, Variancep)
        , Order(Ascend, Descend)
        , Orientation(Horizontal, Radial, Vertical)
        , OverlapStrategy(OGreedy, ONone, OParity)
        , PackProperty
        , PieProperty
        , Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
        , ProjectionProperty
        , RangeDefault(RCategory, RDiverging, RHeatmap, RHeight, ROrdinal, RRamp, RSymbol, RWidth)
        , Scale(ScBand, ScBinLinear, ScBinOrdinal, ScLinear, ScLog, ScOrdinal, ScPoint, ScPow, ScQuantile, ScQuantize, ScSequential, ScSqrt, ScTime, ScUtc)
        , ScaleDomain
        , ScaleNice(NDay, NFalse, NHour, NMillisecond, NMinute, NMonth, NSecond, NTrue, NWeek, NYear)
        , ScaleProperty
        , ScaleRange
        , Side(SBottom, SLeft, SRight, STop)
        , SignalProperty
        , SortProperty(Ascending, Descending)
        , Source
        , Spec
        , StackOffset(OfCenter, OfNormalize, OfZero)
        , StackProperty
        , Str
        , StrokeCap(CButt, CRound, CSquare)
        , StrokeJoin(JBevel, JMiter, JRound)
        , Symbol(SymCircle, SymCross, SymDiamond, SymSquare, SymTriangleDown, SymTriangleLeft, SymTriangleRight, SymTriangleUp)
        , TextDirection(LeftToRight, RightToLeft)
        , TimeUnit(Day, Hour, Millisecond, Minute, Month, Second, Week, Year)
        , TitleProperty
        , TopMarkProperty
        , Transform
        , Trigger
        , TriggerProperty
        , VAlign(AlignBottom, AlignMiddle, AlignTop, Alphabetic)
        , VProperty
        , Value
        , agAs
        , agCross
        , agDrop
        , agFields
        , agGroupBy
        , agKey
        , agOps
        , autosize
        , axDomain
        , axEncode
        , axFormat
        , axGrid
        , axGridScale
        , axLabelBound
        , axLabelFlush
        , axLabelFlushOffset
        , axLabelOverlap
        , axLabelPadding
        , axLabels
        , axMaxExtent
        , axMinExtent
        , axOffset
        , axPosition
        , axTickCount
        , axTickSize
        , axTicks
        , axTitle
        , axTitlePadding
        , axValues
        , axZIndex
        , axes
        , axis
        , background
        , bnAnchor
        , bnAs
        , bnBase
        , bnDivide
        , bnMaxBins
        , bnMinStep
        , bnNice
        , bnSignal
        , bnStep
        , bnSteps
        , boo
        , booExpr
        , booSignal
        , booSignals
        , boos
        , cHCL
        , cHSL
        , cLAB
        , cRGB
        , clEnabled
        , clPath
        , clSphere
        , cnBandwidth
        , cnCellSize
        , cnCount
        , cnNice
        , cnSmooth
        , cnThresholds
        , cnValues
        , cnX
        , cnY
        , coField
        , coOrder
        , combineSpecs
        , csCount
        , csExtent
        , csScheme
        , cubeHelix
        , cubeHelixLong
        , cursorLabel
        , daBoos
        , daDataset
        , daField
        , daFields
        , daFormat
        , daNums
        , daOn
        , daReferences
        , daSort
        , daSource
        , daSources
        , daStrs
        , daUrl
        , daValue
        , data
        , dataColumn
        , dataFromColumns
        , dataFromRows
        , dataRow
        , dataSource
        , dirLabel
        , doData
        , doNums
        , doStrs
        , dsv
        , enCustom
        , enEnter
        , enExit
        , enGradient
        , enHover
        , enLabels
        , enLegend
        , enSymbols
        , enTitle
        , enUpdate
        , encode
        , esBetween
        , esConsume
        , esDebounce
        , esDom
        , esFilter
        , esMark
        , esMarkName
        , esMerge
        , esObject
        , esSelector
        , esSource
        , esStream
        , esThrottle
        , esType
        , evEncode
        , evForce
        , evHandler
        , evStreamSelector
        , evUpdate
        , exField
        , expr
        , fDatum
        , fGroup
        , fName
        , fParent
        , fSignal
        , faField
        , faGroupBy
        , foCenter
        , foCollide
        , foDate
        , foLink
        , foNBody
        , foUtc
        , foX
        , foY
        , fpDistance
        , fpDistanceMax
        , fpDistanceMin
        , fpId
        , fpIterations
        , fpStrength
        , fpTheta
        , fsAlpha
        , fsAlphaMin
        , fsAlphaTarget
        , fsAs
        , fsForces
        , fsIterations
        , fsRestart
        , fsStatic
        , fsVelocityDecay
        , gpAs
        , gpField
        , gpPointRadius
        , grAlignColumn
        , grAlignRow
        , grExtent
        , grExtentMajor
        , grExtentMinor
        , grField
        , grPrecision
        , grStep
        , grStepMajor
        , grStepMinor
        , hAlignLabel
        , hclLong
        , height
        , hslLong
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
        , ifElse
        , inAutocomplete
        , inDebounce
        , inElement
        , inMax
        , inMin
        , inOptions
        , inPlaceholder
        , inStep
        , jsonProperty
        , keyValue
        , layout
        , leClipHeight
        , leColumnPadding
        , leColumns
        , leCornerRadius
        , leDirection
        , leEncode
        , leFill
        , leFillColor
        , leFormat
        , leGradientLength
        , leGradientStrokeColor
        , leGradientStrokeWidth
        , leGradientThickness
        , leGridAlign
        , leLabelAlign
        , leLabelBaseline
        , leLabelColor
        , leLabelFont
        , leLabelFontSize
        , leLabelFontWeight
        , leLabelLimit
        , leLabelOffset
        , leLabelOverlap
        , leOffset
        , leOpacity
        , leOrient
        , lePadding
        , leRowPadding
        , leShape
        , leSize
        , leStroke
        , leStrokeColor
        , leStrokeDash
        , leStrokeWidth
        , leSymbolFillColor
        , leSymbolOffset
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
        , legend
        , legends
        , linkShapeLabel
        , loAlign
        , loBounds
        , loColumns
        , loFooterBand
        , loFooterBandRC
        , loHeaderBand
        , loHeaderBandRC
        , loOffset
        , loOffsetRC
        , loPadding
        , loPaddingRC
        , loTitleBand
        , loTitleBandRC
        , lpAs
        , lpOrient
        , lpShape
        , lpSourceX
        , lpSourceY
        , lpTargetX
        , lpTargetY
        , luAs
        , luDefault
        , luValues
        , mClip
        , mDescription
        , mEncode
        , mFrom
        , mGroup
        , mInteractive
        , mKey
        , mName
        , mOn
        , mSort
        , mStyle
        , mTransform
        , maAlign
        , maAngle
        , maAspect
        , maBaseline
        , maCornerRadius
        , maCursor
        , maDefined
        , maDir
        , maDx
        , maDy
        , maEllipsis
        , maEndAngle
        , maFill
        , maFillOpacity
        , maFont
        , maFontSize
        , maFontStyle
        , maFontWeight
        , maGroupClip
        , maHRef
        , maHeight
        , maInnerRadius
        , maInterpolate
        , maLimit
        , maOpacity
        , maOrient
        , maOuterRadius
        , maPadAngle
        , maPath
        , maRadius
        , maShape
        , maSize
        , maStartAngle
        , maStroke
        , maStrokeCap
        , maStrokeDash
        , maStrokeDashOffset
        , maStrokeJoin
        , maStrokeMiterLimit
        , maStrokeOpacity
        , maStrokeWidth
        , maSymbol
        , maTension
        , maText
        , maTheta
        , maTooltip
        , maUrl
        , maWidth
        , maX
        , maX2
        , maXC
        , maY
        , maY2
        , maYC
        , maZIndex
        , mark
        , markInterpolationLabel
        , markOrientationLabel
        , marks
        , nInterval
        , nTickCount
        , num
        , numExpr
        , numSignal
        , numSignals
        , nums
        , ofSignal
        , on
        , orSignal
        , paAs
        , paField
        , paPadding
        , paRadius
        , paSize
        , paSort
        , padding
        , paddings
        , parse
        , piAs
        , piEndAngle
        , piField
        , piSort
        , piStartAngle
        , prCenter
        , prClipAngle
        , prClipExtent
        , prCoefficient
        , prCustom
        , prDistance
        , prExtent
        , prFit
        , prFraction
        , prLobes
        , prParallel
        , prPointRadius
        , prPrecision
        , prRadius
        , prRatio
        , prRotate
        , prScale
        , prSize
        , prSpacing
        , prTilt
        , prTranslate
        , prType
        , projection
        , projectionLabel
        , projections
        , raData
        , raDefault
        , raNums
        , raScheme
        , raSignal
        , raStep
        , raStrs
        , raValues
        , rgb
        , scAlign
        , scBase
        , scClamp
        , scCustom
        , scDomain
        , scDomainMax
        , scDomainMid
        , scDomainMin
        , scDomainRaw
        , scExponent
        , scInterpolate
        , scNice
        , scPadding
        , scPaddingInner
        , scPaddingOuter
        , scRange
        , scRangeStep
        , scReverse
        , scRound
        , scType
        , scZero
        , scale
        , scales
        , siBind
        , siDescription
        , siName
        , siOn
        , siReact
        , siUpdate
        , siValue
        , signal
        , signals
        , soByField
        , soOp
        , srData
        , srFacet
        , stAs
        , stField
        , stGroupBy
        , stOffset
        , stSort
        , str
        , strSignal
        , strSignals
        , strokeCapLabel
        , strokeJoinLabel
        , strs
        , symPath
        , symbolLabel
        , tgInsert
        , tgModifyValues
        , tgRemove
        , tgRemoveAll
        , tgToggle
        , tiAnchor
        , tiEncode
        , tiInteractive
        , tiName
        , tiOffset
        , tiOrient
        , tiStyle
        , tiZIndex
        , toVega
        , topojsonFeature
        , topojsonMesh
        , trAggregate
        , trBin
        , trContour
        , trExtent
        , trExtentAsSignal
        , trFilter
        , trForce
        , trFormula
        , trGeoPath
        , trGeoShape
        , trGraticule
        , trLinkPath
        , trLookup
        , trPack
        , trPie
        , trStack
        , trStratify
        , transform
        , trigger
        , utc
        , vAlignLabel
        , vBand
        , vBoo
        , vBoos
        , vColor
        , vExponent
        , vField
        , vMultiply
        , vNull
        , vNum
        , vNums
        , vObject
        , vOffset
        , vRound
        , vScale
        , vSignal
        , vStr
        , vStrs
        , vValues
        , width
        )

{-| This module will allow you to create a full Vega specification in Elm. A
specification is stored as a JSON object and contains sufficient declarative detail
to specify the data sources, graphical output and interaction. The module can
generate the JSON that may be passed to the Vega runtime library to activate the
visualization.


# Creating A Vega Specification

@docs toVega
@docs combineSpecs

@docs VProperty


# Passing Values into a Vega Specification

While ultimately, Vega handles standard data types such as numbers, strings and
Boolean values, a Vega specification uses functions that generate those types.
These include, for example, _expressions_ that generate new values based on
operations applied to existing ones, _fields_ that reference a column of a data
table or _signals_ that can respond dynamically to data or interaction changes.


## Numeric Values

For use with functions that expect either direct numeric values, or an expression,
data source or signal that can generate numeric values.

@docs num
@docs nums
@docs numSignal
@docs numSignals
@docs numExpr


## String Values

For use with functions that expect either direct string values, or an expression,
data source or signal that can generate string values.

@docs str
@docs strs
@docs strSignal
@docs strSignals


## Boolean Values

For use with functions that expect either direct boolean values, or an expression,
data source or signal that can generate boolean values.

@docs boo
@docs boos
@docs booSignal
@docs booSignals
@docs booExpr


## Generic Values

For use with functions that expect values of several different types. These values
can be generated with the following functions.

@docs vNum
@docs vNums
@docs vStr
@docs vStrs
@docs vBoo
@docs vBoos
@docs vSignal
@docs vField
@docs vColor
@docs vBand
@docs vObject
@docs keyValue
@docs vValues
@docs ifElse
@docs vNull
@docs vMultiply
@docs vExponent
@docs vOffset
@docs vRound
@docs vScale


## Indirect References

@docs expr
@docs exField
@docs fName
@docs fSignal
@docs fDatum
@docs fGroup
@docs fParent


## Thematic Data Types

@docs TimeUnit
@docs utc
@docs cHCL
@docs cHSL
@docs cLAB
@docs cRGB


# Creating a Data Specification

Functions for declaring the input data to a visualization.

@docs dataSource
@docs data

@docs dataFromColumns
@docs dataColumn

@docs dataFromRows
@docs dataRow
@docs DataProperty

@docs daUrl
@docs daFormat
@docs daSource
@docs daSources
@docs daValue
@docs daOn

@docs daNums
@docs daStrs
@docs daBoos

@docs daDataset
@docs daField
@docs daFields
@docs daReferences


## Data Sorting

@docs daSort
@docs SortProperty
@docs soOp
@docs soByField

@docs Order
@docs orSignal
@docs coField
@docs coOrder


## Data Formatting

Functions for parsing input data and specifying their format.

@docs Format
@docs dsv
@docs jsonProperty
@docs topojsonMesh
@docs topojsonFeature

@docs DataType
@docs parse
@docs foDate
@docs foUtc


# Transforming Data

Transforms are essential in order to use the full range of data visualization types
in Vega. They can be applied to data streams and to marks.

Applying a transform to a data stream can filter or generate new fields in the stream,
or derive new data streams. This is done by piping (`|>`) the stream into the
`transform` function and specifying the type of transform to apply via one or
more of the functions described below.

@docs transform


## Basic Transforms


### Aggregation

@docs trAggregate
@docs agGroupBy
@docs agFields
@docs agOps
@docs agAs
@docs agCross
@docs agDrop
@docs agKey

@docs Operation

TODO: add joinAggregate functions.
TODO: add pivot functions.


### Binning

@docs trBin
@docs bnAnchor
@docs bnMaxBins
@docs bnBase
@docs bnStep
@docs bnSteps
@docs bnMinStep
@docs bnDivide
@docs bnNice
@docs bnSignal
@docs bnAs


### Collection

TODO: functions (collect)


### Text Pattern Counting

TODO: add functions (countpattern)


### Cross Product

TODO: add functions (cross)


### Probability Density Function Calc ulation

TODO: add functions (density)


### Range calculation

@docs trExtent
@docs trExtentAsSignal


### Filtering

@docs trFilter


### Flattening

TODO: add functions (flatten)


### Folding

TODO: add functions (fold)


### Deriving New Fields

@docs trFormula
@docs FormulaUpdate

@docs trLookup
@docs luAs
@docs luValues
@docs luDefault

TODO: add functions (identifier)
TODO: add functions (project)
TODO: add functions (window)


### Handling Missing Values

TODO: add functions (impute)


### Sampling

TODO: add functions (sample)


### Data Generation

TODO: add function (sequence)


## Geographic Transforms


### Contouring

@docs trContour
@docs cnValues
@docs cnX
@docs cnY
@docs cnCellSize
@docs cnBandwidth
@docs cnSmooth
@docs cnThresholds
@docs cnCount
@docs cnNice


### GeoJSON transformation

TODO: add function (geojson)

@docs trGeoShape
@docs trGeoPath
@docs gpField
@docs gpPointRadius
@docs gpAs


### Graticule Generation

@docs trGraticule
@docs grExtent
@docs grExtentMajor
@docs grExtentMinor
@docs grStep
@docs grStepMajor
@docs grStepMinor
@docs grField
@docs grPrecision


## Layout Transforms


### Link Paths

@docs trLinkPath
@docs lpSourceX
@docs lpSourceY
@docs lpTargetX
@docs lpTargetY
@docs lpOrient
@docs lpShape
@docs lpAs
@docs LinkShape
@docs linkShapeLabel


### Angular Layouts

@docs trPie
@docs piField
@docs piStartAngle
@docs piEndAngle
@docs piSort
@docs piAs


### Stacked Layouts

@docs trStack
@docs stField
@docs stGroupBy
@docs stSort
@docs stOffset
@docs stAs
@docs StackOffset
@docs ofSignal


### Force-Generated Layouts

@docs trForce

@docs fsStatic
@docs fsRestart
@docs fsIterations
@docs fsAlpha
@docs fsAlphaMin
@docs fsAlphaTarget
@docs fsVelocityDecay
@docs fsForces
@docs fsAs

@docs foCenter
@docs foCollide
@docs foNBody
@docs foLink
@docs foX
@docs foY

@docs fpStrength
@docs fpDistance
@docs fpIterations
@docs fpTheta
@docs fpDistanceMin
@docs fpDistanceMax
@docs fpId


### Voronoi Diagram

TODO: add function (voronoi)


### Word Cloud layout

TODO: add function (wordcloud)


## Hierarchy Transforms

@docs trStratify

@docs trPack
@docs paField
@docs paSort
@docs paSize
@docs paRadius
@docs paPadding
@docs paAs


## Cross-Filter Transforms


# Signals, Triggers and Interaction Events


## Signals

@docs signals
@docs signal
@docs siName
@docs siBind
@docs siDescription
@docs siOn
@docs siUpdate
@docs siReact
@docs siValue


## User Interface Inputs

@docs iCheckbox
@docs iText
@docs iNumber
@docs iDate
@docs iDateTimeLocal
@docs iTime
@docs iMonth
@docs iWeek
@docs iRadio
@docs iRange
@docs iSelect
@docs iTel
@docs iColor

@docs inDebounce
@docs inElement
@docs inOptions
@docs inMin
@docs inMax
@docs inStep
@docs inPlaceholder
@docs inAutocomplete


## Event Handling

See the [Vega event stream documentation](http://vega.github.io/vega/docs/event-streams)
for details on the modelling of event streams.

@docs evHandler
@docs evUpdate
@docs evEncode
@docs evForce

@docs esObject
@docs esMerge
@docs esStream
@docs esSelector
@docs esSource
@docs esType
@docs esBetween
@docs esConsume
@docs esFilter
@docs esDebounce
@docs esMarkName
@docs esMark
@docs esThrottle

@docs evStreamSelector
@docs EventSource

@docs esDom
@docs EventType


## Triggers

@docs on
@docs trigger
@docs tgInsert
@docs tgRemove
@docs tgRemoveAll
@docs tgToggle
@docs tgModifyValues


# Specifying Scales

@docs scales
@docs scale
@docs RangeDefault
@docs scType
@docs scDomain
@docs scDomainMax
@docs scDomainMin
@docs scDomainMid
@docs scDomainRaw
@docs scRange
@docs scReverse
@docs scRound
@docs scClamp
@docs scInterpolate
@docs scPadding
@docs scNice
@docs scZero
@docs scExponent
@docs scBase
@docs scAlign
@docs scPaddingInner
@docs scPaddingOuter
@docs scRangeStep
@docs Scale
@docs scCustom
@docs doNums
@docs doStrs
@docs doData
@docs raNums
@docs raStrs
@docs raValues
@docs raSignal
@docs raScheme
@docs raData
@docs raStep
@docs raDefault
@docs ScaleNice
@docs nInterval
@docs nTickCount
@docs csScheme
@docs csCount
@docs csExtent
@docs CInterpolate
@docs cubeHelix
@docs cubeHelixLong
@docs hclLong
@docs hslLong
@docs rgb


# Specifying Projections

@docs projections
@docs projection
@docs Projection
@docs projectionLabel
@docs prCustom
@docs prType
@docs prClipAngle
@docs prClipExtent
@docs prScale
@docs prTranslate
@docs prCenter
@docs prRotate
@docs prPointRadius
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
@docs prFit
@docs prExtent
@docs prSize


# Specifying Axes

@docs axes
@docs axis
@docs axDomain
@docs axEncode
@docs axFormat
@docs axGrid
@docs axGridScale
@docs axLabels
@docs axLabelBound
@docs axLabelFlush
@docs axLabelFlushOffset
@docs axLabelPadding
@docs axLabelOverlap
@docs axMinExtent
@docs axMaxExtent
@docs axOffset
@docs axPosition
@docs axTicks
@docs axTickCount
@docs axTickSize
@docs axTitle
@docs axTitlePadding
@docs axValues
@docs axZIndex
@docs AxisElement
@docs Side
@docs OverlapStrategy


# Specifying Legends

@docs legends
@docs legend
@docs leType
@docs leDirection
@docs leOrient
@docs leFill
@docs leOpacity
@docs leShape
@docs leSize
@docs leStroke
@docs leStrokeDash
@docs leEncode
@docs leFormat
@docs leGridAlign
@docs leClipHeight
@docs leColumns
@docs leColumnPadding
@docs leRowPadding
@docs leCornerRadius
@docs leFillColor
@docs leOffset
@docs lePadding
@docs leStrokeColor
@docs leStrokeWidth
@docs leGradientLength
@docs leGradientThickness
@docs leGradientStrokeColor
@docs leGradientStrokeWidth
@docs leLabelAlign
@docs leLabelBaseline
@docs leLabelColor
@docs leLabelFont
@docs leLabelFontSize
@docs leLabelFontWeight
@docs leLabelLimit
@docs leLabelOffset
@docs leLabelOverlap
@docs leSymbolFillColor
@docs leSymbolOffset
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
@docs leValues
@docs leZIndex
@docs LegendType
@docs LegendOrientation
@docs enLegend
@docs enTitle
@docs enLabels
@docs enSymbols
@docs enGradient


# Specifying Titles

@docs tiAnchor
@docs Anchor
@docs tiEncode
@docs tiInteractive
@docs tiName
@docs tiOffset
@docs tiOrient
@docs tiStyle
@docs tiZIndex


# Specifying Layout

@docs layout
@docs GridAlign
@docs grAlignRow
@docs grAlignColumn
@docs BoundsCalculation
@docs loAlign
@docs loBounds
@docs loColumns
@docs loPadding
@docs loPaddingRC
@docs loOffset
@docs loOffsetRC
@docs loHeaderBand
@docs loHeaderBandRC
@docs loFooterBand
@docs loFooterBandRC
@docs loTitleBand
@docs loTitleBandRC


# Specifying Marks

## Top-Level Marks

@docs marks
@docs mark
@docs Mark
@docs mClip
@docs mDescription
@docs mEncode
@docs mFrom
@docs mInteractive
@docs mKey
@docs mName
@docs mOn
@docs mSort
@docs mTransform
@docs mStyle
@docs mGroup

@docs clEnabled
@docs clPath
@docs clSphere
@docs srData
@docs srFacet
@docs faField
@docs faGroupBy


## Lower-level Mark Properties

@docs maX
@docs maX2
@docs maXC
@docs maWidth
@docs maY
@docs maY2
@docs maYC
@docs maHeight
@docs maOpacity
@docs maFill
@docs maFillOpacity
@docs maStroke
@docs maStrokeOpacity
@docs maStrokeWidth
@docs maStrokeCap
@docs maStrokeDash
@docs maStrokeDashOffset
@docs maStrokeJoin
@docs maStrokeMiterLimit
@docs maCursor
@docs maHRef
@docs maTooltip
@docs maZIndex
@docs maAlign
@docs maBaseline
@docs maCornerRadius
@docs maInterpolate
@docs maTension
@docs maDefined
@docs maSize
@docs maStartAngle
@docs maEndAngle
@docs maPadAngle
@docs maInnerRadius
@docs maOuterRadius
@docs maOrient
@docs maGroupClip
@docs maUrl
@docs maAspect
@docs maPath
@docs maShape
@docs maSymbol
@docs maAngle
@docs maDir
@docs maDx
@docs maDy
@docs maEllipsis
@docs maFont
@docs maFontSize
@docs maFontWeight
@docs maFontStyle
@docs maLimit
@docs maRadius
@docs maText
@docs maTheta


## Encoding

@docs enEnter
@docs enUpdate
@docs enHover
@docs enExit
@docs enCustom
@docs MarkInterpolation
@docs markInterpolationLabel
@docs Orientation
@docs markOrientationLabel
@docs Cursor
@docs cursorLabel
@docs HAlign
@docs hAlignLabel
@docs VAlign
@docs vAlignLabel
@docs Symbol
@docs symPath
@docs symbolLabel
@docs StrokeCap
@docs strokeCapLabel
@docs StrokeJoin
@docs strokeJoinLabel
@docs TextDirection
@docs dirLabel


# Configuring Visualization Appearance


# Specifying Supplementary Properties

Options that affect the entire visualization. These are in addition
to the data and transform options described above.

@docs autosize
@docs height
@docs padding
@docs paddings
@docs width
@docs Autosize
@docs background
@docs encode

---


# Type Reference

The following types are not specified directly but instead created by various functions
as described above.
They are provided here for reference with links to the functions that generate them.

@docs AggregateProperty
@docs AxisProperty
@docs Bind
@docs BinProperty
@docs Boo
@docs Clip
@docs ColorSchemeProperty
@docs ColorValue
@docs Comparator
@docs ContourProperty
@docs Data
@docs DataColumn
@docs DataReference
@docs DataRow
@docs DataTable
@docs DataValues
@docs EncodingProperty
@docs EventHandler
@docs EventStream
@docs EventStreamProperty
@docs Expr
@docs Facet
@docs Field
@docs FieldValue
@docs Force
@docs ForceProperty
@docs ForceSimulationProperty
@docs GeoPathProperty
@docs GraticuleProperty
@docs InputProperty
@docs LayoutProperty
@docs LegendEncoding
@docs LegendProperty
@docs LinkPathProperty
@docs LookupProperty
@docs MarkProperty
@docs Num
@docs PackProperty
@docs PieProperty
@docs ProjectionProperty
@docs ScaleDomain
@docs ScaleProperty
@docs ScaleRange
@docs SignalProperty
@docs Source
@docs Spec
@docs StackProperty
@docs Str
@docs TitleProperty
@docs TopMarkProperty
@docs Transform
@docs Trigger
@docs TriggerProperty
@docs Value

-}

import Json.Encode as JE


-- TODO: Most types should have the option of representing their type from a signal
-- Where possible, these should use the type/signal specific types, but in cases
-- where mixed types are assembled in lists, we can use the more generic Value
-- TODO: Should we represent colors with their own type or perhaps Str type rather than String?
-- This would allow colours to be generated via signal but does make the API a little more cumbersome.
-- Opaque Types
-- ############


{-| Properties of the aggregate transformation. Generated by [agAs](#agAs),
[agCross](#agCross), [agDrop](#agDrop), [agFields](#agFields),
[agGroupBy](#agGroupBy), [agOps](#agOps) and [agKey](#agKey). For details see the
[Vega aggregate documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
type AggregateProperty
    = AgGroupBy (List Field)
    | AgFields (List Field)
    | AgOps (List Operation)
    | AgAs (List String)
    | AgCross Bool
    | AgDrop Bool
    | AgKey Field


{-| Indicates the characteristics of a chart axis such as its orientation, labels
and ticks. Generated by [axDomain](#axDomain), [axEncode](#axEncode),
[axFormat](#axFormat), [axGrid](#axGrid), [axGridScale](#axGridScale),
[axLabelBound](#axLabelBound), [axFlush](#axFlush), [axFlushOffset](#axFlushOffset),
[axLabelOverlap](#axLabelOverlap), [axLabelPadding](#axLabelPadding),
[axLabels](#axLabels), [axMaxExtent](#axMaxExtent), [axMinExtent](#axMinExtent),
[axOffset](#axOffset), [axPosition](#axPosition), [axTickCount](#axTickCount),
[axTicks](#axTicks), [axTickSize](#axTickSize), [axTitle](#axTitle),
[axTitlePadding](#axTitlePadding), [axValues](#axValues) and
[axZIndex](#axZIndex). For more details see the
[Vega axes documentation](https://vega.github.io/vega/docs/axes)
-}
type AxisProperty
    = AxScale String
    | AxSide Side
    | AxDomain Bool
    | AxEncode (List ( AxisElement, List EncodingProperty ))
    | AxFormat String
    | AxGrid Bool
    | AxGridScale String
    | AxLabels Bool
    | AxLabelBound (Maybe Float)
    | AxLabelFlush (Maybe Float)
    | AxLabelFlushOffset Float
    | AxLabelPadding Float
    | AxLabelOverlap OverlapStrategy
    | AxMinExtent Num
    | AxMaxExtent Num
    | AxOffset Num
    | AxPosition Num
    | AxTicks Bool
      -- TODO: Need to account for temporal units and intervals
    | AxTickCount Int
    | AxTickSize Float
    | AxTitle Str
    | AxTitlePadding Float
    | AxValues (List Value)
    | AxZIndex Int


{-| Describes a binding to some HTML input element such as a checkbox or radio button.
Generated by [iRange](#iRange), [iCheckbox](#iCheckbox), [iRadio](#iRadio),
[iSelect](#iSelect), [iText](#iText), [iNumber](#iNumber), [iDate](#iDate),
[iTime](#iTime), [iMonth](#iMonth), [iWeek](#iWeek), [iDateTimeLocal](#iDateTimeLocal),
[iTel](#iTel) and [iColor](#iColor). For details see the
[Vega bind documentation](https://vega.github.io/vega/docs/signals/#bind).
-}
type Bind
    = IRange (List InputProperty)
    | ICheckbox (List InputProperty)
    | IRadio (List InputProperty)
    | ISelect (List InputProperty)
    | IText (List InputProperty)
    | INumber (List InputProperty)
    | IDate (List InputProperty)
    | ITime (List InputProperty)
    | IMonth (List InputProperty)
    | IWeek (List InputProperty)
    | IDateTimeLocal (List InputProperty)
    | ITel (List InputProperty)
    | IColor (List InputProperty)


{-| Optional properties of a bin transform. Generated by [bnAnchor](#bnAnchor),
[bnMaxBins](#bnMaxBins), [bnBase](#bnBase), [bnStep](#bnStep), [bnSteps](#bnSteps),
[bnMinStep](#bnMinStep), [bnDivide](#bnDivide), [bnNice](#bnNice), [bnSignal](#bnSignal)
and [bnAs](#bnAs). For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/).
-}
type BinProperty
    = BnAnchor Num
    | BnMaxBins Num
    | BnBase Num
    | BnStep Num
    | BnSteps Num
    | BnMinStep Num
    | BnDivide Num
    | BnNice Boo
    | BnSignal String
    | BnAs String String


{-| Represents Boolean-related values. Generated by [boo](#boo), [boos](#boos),
[booSignal](#booSignal), [booSignals](#booSignals) and [booExpr](#booExpr)
-}
type Boo
    = Boo Bool
    | Boos (List Bool)
    | BooSignal String
    | BooSignals (List String)
    | BooExpr Expr


{-| Specify a clip property to limit the area in which a set of marks is visible.
Generated by [clEnabled](#clEnabled), [clPath](#clPath) and [clSphere](#clSphere).
For details see the
[Vega clip documentation](https://vega.github.io/vega/docs/marks/#clip).
-}
type Clip
    = ClEnabled Boo
    | ClPath Str
    | ClSphere Str


{-| Describes a color scheme. Generated by [csScheme](#csScheme), [csCount](#csCount)
and [csExtent](#csExtent). For details see the
[Vega color scheme documentation](https://vega.github.io/vega/docs/schemes/).
-}
type ColorSchemeProperty
    = SScheme String
    | SCount Float
    | SExtent Float Float


{-| Defines a custom colour value. Can use a variety of colour spaces such as RGB,
HSL etc. Generated by [cRGB](#cRGB), [cHSL](#cHSL), [cLAB](#cLAB) and [cHCL](#cHCL).
For more details, see the
[Vega colorValue documentation](https://vega.github.io/vega/docs/types/#ColorValue)}
-}
type ColorValue
    = RGB (List Value) (List Value) (List Value)
    | HSL (List Value) (List Value) (List Value)
    | LAB (List Value) (List Value) (List Value)
    | HCL (List Value) (List Value) (List Value)


{-| Defines how sorting should be applied. Generated by [coField](#coField) and
[coField](#coField). For details see the
[Vega compare documentation](https://vega.github.io/vega/docs/types/#Compare)
-}
type Comparator
    = CoField (List Field)
    | CoOrder (List Order)


{-| Optional properties of a contour transform. Generated by
[cnValues](#cnValues), [cnX](#cnX), [cnY](#cnY), [cnCellSize](#cnCellSize),
[cnBandwidth](#cnBandWidth), [cnSmooth](#cnSmooth), [cnThresholds](#cnThresholds),
[cnCount](#cnCount) and [cnNice](#cnNice). For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/).
-}
type ContourProperty
    = CnValues Num
    | CnX Field
    | CnY Field
    | CnCellSize Num
    | CnBandwidth Num
    | CnSmooth Boo
    | CnThresholds Num
    | CnCount Num
    | CnNice Boo


{-| Convenience type annotation label for use with data generation functions.
Generated by [dataSource](#dataSource) but is also useful when creating your own
data generating functions. For example:

    myData : Int -> Data
    myData yr =
        dataSource
            [ data "population" [ daSource "pop" ]
                |> transform [ trFilter (expr ("datum.year == " ++ toString yr)) ]
            ]

-}
type alias Data =
    ( VProperty, Spec )


{-| Represents a single column of data. Generated when creating inline data with
[dataColumn](#dataColumn).
-}
type alias DataColumn =
    List LabelledSpec


{-| Reference to one or more sources of data such as dataset, field name or collection
of fields. Generated by [daDataset](#daDataset), [daField](#daField), [daFields](#daFields),
[daReferences](#daReferences) and [daSort](#daSort).For details see the
[Vega dataref documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
type DataReference
    = DDataset String
    | DField Str
    | DFields Str
    | DReferences (List DataReference)
    | DSort (List SortProperty)


{-| Represents a single row of data. Generated when creating inline data with
[dataRow](#dataRow).
-}
type alias DataRow =
    Spec


{-| Represents a single table of data (collection of `dataColumn` specifications).
Generated by [data](#data), [dataFromColumns](#dataFromColumns),
[dataFromRows](#dataFromRows), [on](#on) and [transform](#transform).
-}
type alias DataTable =
    List LabelledSpec


{-| Represents a list of primitive data types such as strings and numbers. Generated
by [daStrs](#daStrs), [daNums](#daNums) and [daBoos](#daBoos).
-}
type DataValues
    = DaStrs (List String)
      --TODO: Do we need nested lists and objects? | DaValues (List DataValues)
    | DaNums (List Float)
    | DaBoos (List Bool)


{-| An event handler indicating which events to respond to and what to update or
encode as a result. Generated by the following functions: [evHandler](#evHandler),
[evUpdate](#evUpdate), [evEncode](#evEncode) and [evForce](#evForce).
For details see the
[Vega handlers documentation](https://vega.github.io/vega/docs/signals/#handlers).
-}
type EventHandler
    = EEvents EventStream
    | EUpdate Expression
    | EEncode String
    | EForce Bool


{-| An event stream for modelling user input. This can either be an event stream
object or a shorthand event stream selector string. Generated by the following
functions: [esObject](#esObject), [esSelector](#esSelector) and [esMerge](#esMerge).
For details see the
[Vega event stream documentation](https://vega.github.io/vega/docs/event-streams/).
-}
type EventStream
    = ESObject (List EventStreamProperty)
    | ESSelector Str
    | ESMerge (List EventStream)


{-| An event stream object property such as the source generating events, event
filtering, event consuming behaviour and throttling. Generated by the following
functions: [esSource](#esSource), [esType](#esType), [esBetween](#esBetween),
[esConsume](#esConsume), [esFilter](#esFilter), [esDebounce](#esDebounce),
[esMarkName](#esMarkName), [esMark](#esMark), [esThrottle](#esThrottle) and
[esStream](#esStream). For details see the
[Vega event stream object documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
type EventStreamProperty
    = ESSource EventSource
    | ESType EventType
    | ESBetween (List EventStreamProperty) (List EventStreamProperty)
    | ESConsume Bool
    | ESFilter (List Expression)
    | ESDebounce Num
    | ESMarkName String
    | ESMark Mark
    | ESThrottle Num
    | ESDerived EventStream


{-| Specifies an encoding. Generated by [enEnter](#enEnter), [enUpdate](#enUpdate),
[enExit](#enExit), [enHover](#enHover) and [enCustom](#enCustom). For further
details see the
[Vega encoding documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
type EncodingProperty
    = Enter (List MarkProperty)
    | Update (List MarkProperty)
    | Exit (List MarkProperty)
    | Hover (List MarkProperty)
    | Custom String (List MarkProperty)


{-| A vega [Expr](https://vega.github.io/vega/docs/types/#Expr) that can be either
a field lookup or a full expression that is evaluated once per datum. Generated
by [exField](#exField) and [expr](#expr).
-}
type Expr
    = ExField String
    | Expr Expression



{- TODO: Should we preplace Expression with a typed version and expression parser? -}


type alias Expression =
    String


{-| Defines a facet directive. Generated by [faAggregate](#faAggregate),
[faField](#faField) and [faGroupBy](#faGroupBy). For details see the
[Vega facet documentation](https://vega.github.io/vega/docs/marks/#facet).
-}
type Facet
    = FaName String
    | FaData String
    | FaField String
    | FaAggregate (List AggregateProperty)
    | FaGroupBy (List String)


{-| Represents a data field name. For details see the
[Vega field type documentation](https://vega.github.io/vega/docs/types/#Field)
-}
type alias Field =
    Str


{-| Represents a field value. Rather than a simple field name this can be used to
evaluate a signal, group or parent to indirectly reference a field. Generated by
[fDatum](#fDatum), [fGroup](#fGroup), [fName](#fName), [fParent](#fParent) and
[fSignal](#fSignal). For details see the
[Vega field value documentation](https://vega.github.io/vega/docs/types/#FieldValue).
-}
type FieldValue
    = FName String
    | FSignal String
    | FDatum FieldValue
    | FGroup FieldValue
    | FParent FieldValue


{-| Describes a type of force that may be added to a simulation in a force transform.
Generated by [foCollide](#foCollide), [foLink](#foLink), [foNBody](#foNBody),
[foX](#foX) and [foY](#foY). For details see the
[Vega force documentation](https://vega.github.io/vega/docs/transforms/force/#center)
-}
type Force
    = FCenter (List ForceProperty)
    | FCollide (List ForceProperty)
    | FNBody (List ForceProperty)
    | FLink (List ForceProperty)
    | FX Field (List ForceProperty)
    | FY Field (List ForceProperty)


{-| Optional properties of a force. These properties describe how individual forces
within a simulation are to behave.
Generated by [fpDistance](#fpDistance), [fpDistanceMax](#fpDistanceMax),
[fpDistanceMin](#fpDistanceMin), [fpId](#fpId), [fpIterations](#fpIterations),
[fpStrength](#fpStrength) and [fpTheta](#fpTheta). For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force).
-}
type ForceProperty
    = FpCx Num
    | FpCy Num
    | FpX Field
    | FpY Field
    | FpRadius Num
    | FpStrength Num
    | FpIterations Num
    | FpTheta Num
    | FpDistanceMin Num
    | FpDistanceMax Num
    | FpLinks String
    | FpId Field
    | FpDistance Num


{-| Optional properties of a force simulation transform. These properties describe
how a simulation generated by the transform should behave. Generated by [fsAlpha](#fsAlpha),
[fsAlphaMin](#fsAlphaMin), [fsAlphaTarget](#fsAlphaTarget), [fsAs](#fsAs),
[fsForces](#fsForces), [fsIterations](#fsIterations), [fsRestart](#fsRestart),
[fsStatic](#fsStatic) and [fsVelocityDecay](#fsVelocityDecay). For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force).
-}
type ForceSimulationProperty
    = FsStatic Boo
    | FsRestart Boo
    | FsIterations Num
    | FsAlpha Num
    | FsAlphaMin Num
    | FsAlphaTarget Num
    | FsVelocityDecay Num
    | FsForces (List Force)
    | FsAs String String String String


{-| Optional properties of a geoShape or geoPath transform. Generated by
[gpField](#gpField), [gpAs](#gpAs) and [gpPointRadius](#gpPointRadius).
For details see the
[Vega geopath transform documentation](https://vega.github.io/vega/docs/transforms/geopath/).
-}
type GeoPathProperty
    = GeField Field
    | GePointRadius Num
    | GeAs String


{-| Optional properties of a graticule transform. Generated by
[grField](#grField), [grExtent](#grExtent), [grExtentMajor](#grExtentMajor),
[grExtentMinor](#grExtentMinor), [grStep](#grStep), [grStepMajor](#grStepMajor),
[grStepMinor](#grStepMinor) and [grPrecision](#grPrecision). For details see the
[Vega graticule transform documentation](https://vega.github.io/vega/docs/transforms/graticule/).
-}
type GraticuleProperty
    = GrField Field
    | GrExtentMajor Num
    | GrExtentMinor Num
    | GrExtent Num
    | GrStepMajor Num
    | GrStepMinor Num
    | GrStep Num
    | GrPrecision Num


{-| GUI Input properties. The type of relevant proerty will depend on the type of
input element selected. Generated by [inDebounce](#inDebounce), [inElement](#inElement),
[inOptions](#inOptions), [inMin](#inMin), [inMax](#inMax), [inStep](#inStep),
[inPlaceholder](#inPlaceholder) and [inAutocomplete](#inAutocomplete). For details see
the [Vega bind signal documentation](https://vega.github.io/vega/docs/signals/#bind).
-}
type InputProperty
    = InDebounce Float
    | InElement String
    | InOptions Value
    | InMin Float
    | InMax Float
    | InStep Float
    | InPlaceholder String
    | InAutocomplete Bool


{-| Describes the layout of a collection of group marks within a grid. Generated by
[loAlign](#loAlign), [loBounds](#loBounds), [loColumns](#loColumns), [loPadding](#loPadding),
[loPaddingRC](#loPaddingRC), [loOffset](#loOffset), [loOffsetRC](#loOffsetRC),
[loHeaderBand](#loHeaderBand), [loHeaderBandRC](#loHeaderBandRC), [loFooterBand](#loFooterBand),
[loFooterBandRC](#loFooterBandRC), [loTitleBand](#loTitleBand) and
[loTitleBandRC](#loTitleBandRC). For details, see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/).
-}
type LayoutProperty
    = LAlign GridAlign
    | LBounds BoundsCalculation
    | LColumns Num
    | LPadding Num
    | LPaddingRC Num Num
    | LOffset Num
    | LOffsetRC Num Num
    | LHeaderBand Num
    | LHeaderBandRC Num Num
    | LFooterBand Num
    | LFooterBandRC Num Num
    | LTitleBand Num
    | LTitleBandRC Num Num


{-| Type of custom legend encoding. Generated by [enLegend](#enLegend), [enTitle](#enTitle),
[enLabels](#enLabels), [enSymbols](#enSymbols) and [enGradient](#enGradient).
For details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
type LegendEncoding
    = EnLegend (List EncodingProperty)
    | EnTitle (List EncodingProperty)
    | EnLabels (List EncodingProperty)
    | EnSymbols (List EncodingProperty)
    | EnGradient (List EncodingProperty)


{-| Indicates the characteristics of alegend such as its orientation and scaling
to represent. Generated by [leType](#leType), [leDirection](#leDirection), [leOrient](#leOrient),
[leFill](#leFill), [leOpacity](#leOpacity), [leShape](#leShape), [leSize](#leSize),
[leStroke](#leStroke), [leStrokeDash](#leStrokeDash), [leEncode](#leEncode),
[leFormat](#leFormat), [leGridAlign](#leGridAlign), [leClipHeight](#leClipHeight),
[leColumns](#leColumns), [leColumnPadding](#leColumnPadding), [leRowPadding](#leRowPadding),
[leCornerRadius](#leCornerRadius), [leFillColor](#leFillColor), [leOffset](#leOffset),
[lePadding](#lePadding), [leStrokeColor](#leStrokeColor), [leStrokeWidth](#leStrokeWidth),
[leGradientLength](#leGradientLength), [leGradientThickness](#leGradientThickness),
[leGradientStrokeColor](#leGradientStrokeColor), [leGradientStrokeWidth](#leGradientStrokeWidth),
[leLabelAlign](#leLabelAlign), [leLabelBaseline](#leLabelBaseline), [leLabelColor](#leLabelColor),
[leLabelFont](#leLabelFont), [leLabelFontSize](#leLabelFontSize), [leLabelFontWeight](#leLabelFontWeight),
[leLabelLimit](#leLabelLimit), [leLabelOffset](#leLabelOffset), [leLabelOverlap](#leLabelOverlap),
[leSymbolFillColor](#leSymbolFillColor), [leSymbolOffset](#leSymbolOffset),
[leSymbolSize](#leSymbolSize), [leSymbolStrokeColor](#leSymbolStrokeColor),
[leSymbolStrokeWidth](#leSymbolStrokeWidth), [leSymbolType](#leSymbolType),
[leTickCount](#leTickCount), [leTitle](#leTitle), [leTitleAlign](#leTitleAlign),
[leTitleBaseline](#leTitleBaseline), [leTitleColor](#leTitleColor), [leTitleFont](#leTitleFont),
[leTitleFontSize](#leTitleFontSize), [leTitleFontWeight](#leTitleFontWeight),
[leTitleLimit](#leTitleLimit), [leTitlePadding](#leTitlePadding), [leValues](#leValues)
and [leZIndex](#leZIndex). For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
type LegendProperty
    = LeType LegendType
    | LeDirection Orientation
    | LeOrient LegendOrientation
    | LeFill String
    | LeOpacity String
    | LeShape String
    | LeSize String
    | LeStroke String
    | LeStrokeDash String
    | LeEncode (List LegendEncoding)
    | LeFormat String
    | LeGridAlign GridAlign
    | LeClipHeight Num
    | LeColumns Num
    | LeColumnPadding Num
    | LeRowPadding Num
    | LeCornerRadius Num
    | LeFillColor String
    | LeOffset Value
    | LePadding Value
    | LeStrokeColor String
    | LeStrokeWidth Num
    | LeGradientLength Num
    | LeGradientThickness Num
    | LeGradientStrokeColor String
    | LeGradientStrokeWidth Num
    | LeLabelAlign HAlign
    | LeLabelBaseline VAlign
    | LeLabelColor String
    | LeLabelFont String
    | LeLabelFontSize Num
    | LeLabelFontWeight Value
    | LeLabelLimit Num
    | LeLabelOffset Num
    | LeLabelOverlap OverlapStrategy
    | LeSymbolFillColor String
    | LeSymbolOffset Num
    | LeSymbolSize Num
    | LeSymbolStrokeColor String
    | LeSymbolStrokeWidth Num
    | LeSymbolType Symbol
      -- TODO: Need to account for temporal units and intervals for ticks
    | LeTickCount Int
    | LeTitle String
    | LeTitleAlign HAlign
    | LeTitleBaseline VAlign
    | LeTitleColor String
    | LeTitleFont String
    | LeTitleFontSize Num
    | LeTitleFontWeight Value
    | LeTitleLimit Num
    | LeTitlePadding Value
    | LeValues (List Value)
    | LeZIndex Int


{-| Optional properties of a linkPath transform. Generated by [lpSourceY](#lpSourceY),
[lpTargetX](#lpTargetX), [lpTargetY](#lpTargetY), [lpOrient](#lpOrient),
[lpShape](#lpShape) and [lpAs](#lpAs). For details see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/).
-}
type LinkPathProperty
    = LPSourceX Field
    | LPSourceY Field
    | LPTargetX Field
    | LPTargetY Field
    | LPOrient Str
    | LPShape Str
    | LPAs String


{-| Lookup references used in a lookup transform. Generated by [luValues](#luValues),
[luAs](#luAs) and [luDefault](#luDefault). For details see the
[Vega lookup transform documentation](https://vega.github.io/vega/docs/transforms/lookup/)
-}
type LookupProperty
    = LValues (List Field)
    | LAs (List String)
    | LDefault Value


{-| Indicates an individual property of a mark when encoding. Generated by [maX](#maX),
[maX2](#maX2), [maXC](#maXC), [maWidth](#maWidth), [maY](#maY), [maY2](#maY2), [maYC](#maYC),
[maHeight](#maHeight), [maOpacity](#maOpacity), [maFill](#maFill), [maFillOpacity](#maFillOpacity),
[maStroke](#maStroke), [maStrokeOpacity](#maStrokeOpacity), [maStrokeWidth](#maStrokeWidth),
[maStrokeCap](#maStrokeCap), [maStrokeDash](#maStrokeDash), [maStrokeDashOffset](#maStrokeDashOffset),
[maStrokeJoin](#maStrokeJoin), [maStrokeMiterLimit](#maStrokeMiterLimit), [maCursor](#maCursor),
[maHRef](#maHRef), [maTooltip](#maTooltip), [maZIndex](#maZIndex), [maAlign](#maAlign),
[maBaseline](#maBaseline), [maCornerRadius](#maCornerRadius), [maInterpolate](#maInterpolate),
[maTension](#maTension), [maDefined](#maDefined), [maSize](#maSize), [maStartAngle](#maStartAngle),
[maEndAngle](#maEndAngle), [maPadAngle](#maPadAngle), [maInnerRadius](#maInnerRadius),
[maOuterRadius](#maOuterRadius), [maOrient](#maOrient), [maGroupClip](#maGroupClip),
[maUrl](#maUrl), [maAspect](#maAspect), [maPath](#maPath), [maShape](#maShape),
[maSymbol](#maSymbol), [maAngle](#maAngle), [maDir](#maDir), [maDx](#maDx), [maDy](#maDy),
[maEllipsis](#maEllipsis), [maFont](#maFont), [maFontSize](#maFontSize),
[maFontWeight](#maFontWeight), [maFontStyle](#maFontStyle), [maLimit](#maLimit),
[maRadius](#maRadius), [maText](#maText) and [maTheta](#maTheta). For further details see the
[Vega mark encoding documentation](https://vega.github.io/vega/docs/marks/#encode).

For details of properties associated with specific mark types, see the Vega documentation
for [arcs](https://vega.github.io/vega/docs/marks/arc/),
[areas](https://vega.github.io/vega/docs/marks/area/),
[groups](https://vega.github.io/vega/docs/marks/group/),
[images](https://vega.github.io/vega/docs/marks/image/),
[lines](https://vega.github.io/vega/docs/marks/line/),
[paths](https://vega.github.io/vega/docs/marks/path/),
[rects](https://vega.github.io/vega/docs/marks/rect/),
[rules](https://vega.github.io/vega/docs/marks/rule/),
[shapes](https://vega.github.io/vega/docs/marks/shape/),
[symbols](https://vega.github.io/vega/docs/marks/symbol/),
[text](https://vega.github.io/vega/docs/marks/text/) and
[trails](https://vega.github.io/vega/docs/marks/trail/).

-}
type MarkProperty
    = MX (List Value)
    | MX2 (List Value)
    | MXC (List Value)
    | MWidth (List Value)
    | MY (List Value)
    | MY2 (List Value)
    | MYC (List Value)
    | MHeight (List Value)
    | MOpacity (List Value)
    | MFill (List Value)
    | MFillOpacity (List Value)
    | MStroke (List Value)
    | MStrokeOpacity (List Value)
    | MStrokeWidth (List Value)
    | MStrokeCap (List Value)
    | MStrokeDash (List Value)
    | MStrokeDashOffset (List Value)
    | MStrokeJoin StrokeJoin
    | MStrokeMiterLimit (List Value)
    | MCursor (List Value)
    | MHRef (List Value)
    | MTooltip (List Value)
    | MZIndex (List Value)
      -- Properties shared by a subset of marks
    | MAlign (List Value)
    | MBaseline (List Value)
    | MCornerRadius (List Value)
    | MInterpolate (List Value)
    | MTension (List Value)
    | MDefined (List Value)
    | MSize (List Value)
      -- Arc mark specific:
    | MStartAngle (List Value)
    | MEndAngle (List Value)
    | MPadAngle (List Value)
    | MInnerRadius (List Value)
    | MOuterRadius (List Value)
      -- Area mark specific:
    | MOrient (List Value)
      -- Group mark specific:
    | MGroupClip (List Value)
      -- Image mark specific:
    | MUrl (List Value)
    | MAspect (List Value)
      -- Path mark specific:
    | MPath (List Value)
      -- Shape mark specific:
    | MShape (List Value)
      -- Symbol mark specific:
    | MSymbol (List Value)
      -- Text mark specific:
    | MAngle (List Value)
    | MDir (List Value)
    | MdX (List Value)
    | MdY (List Value)
    | MEllipsis (List Value)
    | MFont (List Value)
    | MFontSize (List Value)
    | MFontWeight (List Value)
    | MFontStyle (List Value)
    | MLimit (List Value)
    | MRadius (List Value)
    | MText (List Value)
    | MTheta (List Value)


{-| Represents number-related values. Generated by [num](#num), [nums](#nums),
[numSignal](#numSignal), [numSignals](#numSignals), [numExpr](#numExpr) and
[numNull](#numNull),
-}
type Num
    = Num Float
      --TODO: Do we need nested lists of Num values so that a list can contain mixed numeric literals and signals?
    | Nums (List Float)
    | NumSignal String
    | NumSignals (List String)
    | NumExpr Expr
    | NumNull


{-| Properties of the packing transformation. Generated by [paField](#paField),
[paSort](#paSort), [paSize](#paSize), [paRadius](#paRadius), [paPadding](#paPadding)
and [paAs](#paAs). For details see the
[Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack)
-}
type PackProperty
    = PaField Field
    | PaSort (List Comparator)
    | PaSize Value Value
    | PaRadius (Maybe Field)
    | PaPadding Num
    | PaAs String String String String String


{-| Properties of the pie chart transformation. Generated by [piField](#piField),
[piStartAngle](#piStartAngle), [piEndAngle](#piEndAngle), [piSort](#piSort) and
[piAs](#piAs). For details see the
[Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
type PieProperty
    = PiField Field
    | PiStartAngle Num
    | PiEndAngle Num
    | PiSort Boo
    | PiAs String String


{-| Optional properties of a global map projection specification. Generated by
[prType](#prType), [prClipAngle](#prClipAngle), [prClipExtent](#prClipExtent),
[prScale](#prScale), [prTranslate](#prTranslate), [prCenter](#prCenter), [prRotate](#prRotate),
[prPointRadius](#prPointRadius), [prPrecision](#prPrecision), [prFit](#prFit),
[prExtent](#prExtent), [prSize](#prSize), [prCoefficient](#prCoefficient),
[prDistance](#prDistance), [prFraction](#prFraction), [prLobes](#prLobes),
[prParallel](#prParallel), [prRadius](#prRadius), [prRatio](#prRatio), [prSpacing](#prSpacing),
and [prTilt](#prTilt). For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties).
-}
type ProjectionProperty
    = PrType Projection
    | PrClipAngle Num -- TODO: Allow a value of 0 to indicate 'null' antimeridian cutting
    | PrClipExtent Num
    | PrScale Num
    | PrTranslate Num
    | PrCenter Num
    | PrRotate Num
    | PrPointRadius Num
    | PrPrecision Num
    | PrFit Spec
    | PrExtent Num
    | PrSize Num
    | PrCoefficient Num
    | PrDistance Num
    | PrFraction Num
    | PrLobes Num
    | PrParallel Num
    | PrRadius Num
    | PrRatio Num
    | PrSpacing Num
    | PrTilt Num


{-| Describes the scale domain (type of data in scale). Generated by [doNums](#doNums),
[doStrs](#doStrs) and [doData](#doData). For full details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#domain).
-}
type ScaleDomain
    = DoNums Num
    | DoStrs Str
      -- TODO: Array can contain signals (ie. not just a single signal referencing an array).
      -- Should we add an array of signals to basic Num and Str types?
      -- TODO: Can we have DateTimes as literals?
    | DoData (List DataReference)


{-| Individual scale property. Scale properties are related, but not identical,
to Vega-Lite's `ScaleProperty` which in Vega are more comprehensive and flexible.
Scale Properties characterise the fundamental data-to-visual transformations applied
by the `scale` function. Generated by [scType](#scType), [scDomain](#scDomain),
[scDomainMax](#scDomainMax), [scDomainMin](#scDomainMin), [scDomainMid](#scDomainMid),
[scDomainRaw](#scDomainRaw), [scRange](#scRange), [scReverse](#scReverse),
[scRound](#scRound), [scClamp](#scClamp), [scInterpolate](#scInterpolate),
[scPadding](#scPadding), [scNice](#scNice), [scZero](#scZero), [scExponent](#scExponent),
[scBase](#scBase), [scAlign](#scAlign), [scPaddingInner](#scPaddingInner),
[scPaddingOuter](#scPaddingOuter) and [scRangeStep](#scRangeStep). For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
type ScaleProperty
    = SType Scale
    | SDomain ScaleDomain
    | SDomainMax Num
    | SDomainMin Num
    | SDomainMid Num
    | SDomainRaw Value
    | SRange ScaleRange
    | SReverse Boo
    | SRound Boo
    | SClamp Boo
    | SInterpolate CInterpolate
    | SPadding Num
    | SNice ScaleNice
    | SZero Boo
    | SExponent Num
    | SBase Num
    | SAlign Num
    | SPaddingInner Num
    | SPaddingOuter Num
    | SRangeStep Num


{-| Describes a scale range of scale output values. Generated by [raNums](#raNums),
[raStrs](#raStrs), [raValues](#raValues), [raSignal](#raSignal), [raScheme](#raScheme),
[raData](#raData), [raStep](#raStep) and [raDefault](#raDefault).For full details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#range).
-}
type ScaleRange
    = RNums (List Float)
    | RStrs (List String)
    | RValues (List Value)
    | RSignal String
    | RScheme String (List ColorSchemeProperty)
    | RData DataReference
    | RStep Value
    | RDefault RangeDefault


{-| Individual signal property. Generated by [siName](#siName), [siBind](#siBind),
[siDescription](#siDescription), [siOn](#siOn), [siUpdate](#siUpdate),
[siReact](#siReact) and [siValue](#siValue). For details see the
[Vega signal documentation](https://vega.github.io/vega/docs/signals).
-}
type SignalProperty
    = SiName String
    | SiBind Bind
    | SiDescription String
    | SiOn (List (List EventHandler))
    | SiUpdate Expression
    | SiReact Bool
    | SiValue Value


{-| The data source for a set of marks. Generated by [srData](#srData) and
[srFacet](#srFacet). For details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#from).
-}
type Source
    = SData Str
    | SFacet String String (List Facet)


{-| A Vega specification. Specs can be (and usually are) nested.
They can range from a single Boolean value up to the entire Vega specification.
-}
type alias Spec =
    JE.Value


{-| Properties of the stacking transformation. Generated by [stField](#stField),
[stGroupBy](#stGroupBy), [stSort](#stSort), [stOffset](#stOffset) and
[stAs](#stAs). For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
type StackProperty
    = StField Field
    | StGroupBy (List Field)
    | StSort (List Comparator)
    | StOffset StackOffset
    | StAs String String


{-| Represents string-related values. Generated by [str](#str), [strs](#strs),
[strSignal](#strSignal) and [strSignals](#strSignals).
-}
type Str
    = Str String
      --TODO: Do we need nested lists of Str values so that a list can contain mixed string literals and signals?
    | Strs (List String)
    | StrSignal String
    | StrSignals (List String)


{-| A visualization's title properties. Generated by [tiOrient](#tiOrient),
[tiAnchor](#tiAnchor), [tiEncode](#tiEncode), [tiInteractive](#tiInteractive),
[tiName](#tiName), [tiStyle](#tiStyle), [tiOffset](#tiOffset) and
[tiZIndex](#tiZIndex). For details, see the
[Vega title documentation](https://vega.github.io/vega/docs/title/)
-}
type TitleProperty
    = TOrient Side
    | TAnchor Anchor
    | TEncode (List EncodingProperty)
    | TInteractive Boo
    | TName String
    | TStyle Str
    | TOffset Num
    | TZIndex Int


{-| Indicates the charactersitcs of a top-level mark. Generated by [mType](#mType),
[mClip](#mClip), [mDescription](#mDescription), [mEncode](#mEncode), [mFrom](#mFrom),
[mInteractive](#mInteractive), [mKey](#mKey), [mName](#mName), [mOn](#mOn),
[mSort](#mSort), [mTransform](#mTransform), [mRole](#mRole), [mStyle](#mStyle)
and [mGroup](#mGroup). For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
type TopMarkProperty
    = MType Mark
      -- TODO: https://vega.github.io/vega/docs/transforms/force.vg.json uses zindex
      -- as a top-level mark, but appears undocumented. Should we include it here?
    | MClip Clip
    | MDescription String
    | MEncode (List EncodingProperty)
    | MFrom (List Source)
    | MInteractive Boo
    | MKey Field
    | MName String
    | MOn (List Trigger)
    | MSort (List Comparator)
    | MTransform (List Transform)
    | MRole String -- Note: Vega docs recommend this is not set explicitly
    | MStyle (List String)
    | MGroup (List ( VProperty, Spec ))


{-| Defines a transformation that may be applied to a data stream or mark. Generated
by [trAggregate](#trAggregate), [trBin](#trBin), [trCollect](#trCollect),
[trCountPattern](#trCountPattern), [trCross](#trCross), [trDensity](#trDensity),
[trExtent](#trExtent), [trExtentAsSignal](#trExtentAsSignal), [trFilter](#trFilter),
[trFold](#trFold), [trFormula](#trFormula), [trIdentifier](#trIdentifier), [trImpute](#trImpute),
[trJoinAggregate](#trJoinAggregate), [trLookup](#trLookup), [trProject](#trProject),
[trSample](#trSample), [trSequence](#trSequence), [trWindow](#trWindow), [trContour](#trContour),
[trGeoJson](#trGeoJson), [trGeoPath](#trGeoPath), [trGeoPoint](#trGeoPoint),
[trGeoShape](#trGeoShape), [trGraticule](#trGraticule), [trLinkPath](#trLinkPath),
[trPie](#trPie), [trStack](#trStack), [trForce](#trForce), [trVoronoi](#trVoronoi),
[trWordCloud](#trWordCloud), [trNest](#trNest), [trStratify](#trStratify),
[trTreeLinks](#trTreeLinks), [trPack](#trPack), [trPartition](#trPartition), [trTree](#trTree),
[trTreeMap](#trTreeMap), [trCrossFilter](#trCrossFilter) and
[trResolveFilter](#trResolveFilter). For details see the
[Vega transform documentation](https://vega.github.io/vega/docs/transforms).
-}
type Transform
    = TAggregate (List AggregateProperty)
      -- TODO: Parameterise remaining transforms and create accesor functions for them
    | TBin Field Num Num (List BinProperty)
    | TCollect
    | TCountPattern
    | TCross
    | TDensity
    | TExtent Field
    | TExtentAsSignal Field String
    | TFilter Expr
    | TFold
    | TFormula Expression String FormulaUpdate
    | TIdentifier
    | TImpute
    | TJoinAggregate
    | TLookup String Field (List Field) (List LookupProperty)
    | TProject
    | TSample
    | TSequence
    | TWindow
    | TContour Num Num (List ContourProperty)
    | TGeoJson
    | TGeoPath String (List GeoPathProperty)
    | TGeoPoint
    | TGeoShape String (List GeoPathProperty)
    | TGraticule (List GraticuleProperty)
    | TLinkPath (List LinkPathProperty)
    | TPie (List PieProperty)
    | TStack (List StackProperty)
    | TForce (List ForceSimulationProperty)
    | TVoronoi
    | TWordCloud
    | TNest
    | TStratify Field Field
    | TTreeLinks
    | TPack (List PackProperty)
    | TPartition
    | TTree
    | TTreeMap
    | TCrossFilter
    | TResolveFilter


{-| Represents a trigger enabling dynamic updates to data and marks. Generated
by [trigger](#trigger). For details see the
[Vega trigger documentation](https://vega.github.io/vega/docs/triggers/)
-}
type alias Trigger =
    Spec


{-| Characteristic of a trigger that can cause a data stream or mark to update.
Generated by [tgInsert](#tgInsert), [tgRemove](#tgRemove), [tgRemoveAll](#tgRemoveAll),
[tgToggle](#tgToggle) and [tgModifyValues](#tgModifyValues). For details see the
[Vega trigger documentation](https://vega.github.io/vega/docs/triggers).
-}
type TriggerProperty
    = TgTrigger Expression
    | TgInsert Expression
    | TgRemove Expression
    | TgRemoveAll
    | TgToggle Expression
    | TgModifyValues Expression Expression


{-| Represents a value such as a number or reference to a value such as a field label
or transformed value. Generated by [vStr](#vStr), [vStrs](#vStrs), [vNum](#vNum),
[vNums](#vNums), [vBoo](#vBoo), [vBoos](#vBoos), [vObject](#vObject), [vKeyValue](#vKeyValue),
[vValues](#vValues), [vSignal](#vSignal), [vColor](#vColor), [vField](#vField),
[vScale](#vScale), [vBand](#vBand), [vExponent](#vExponent), [vMultiply](#vMultiply),
[vOffset](#vOffset), [vRound](#vRound), [vNull](#vNull) and [vIfElse](#vIfElse).
For details, see the
[Vega value documentation](https://vega.github.io/vega/docs/types/#Value)
-}
type Value
    = VStr String
    | VStrs (List String)
    | VNum Float
    | VNums (List Float)
    | VBoo Bool
    | VBoos (List Bool)
    | VObject (List Value)
    | VKeyValue String Value
    | Values (List Value)
    | VSignal String
    | VColor ColorValue
    | VField FieldValue
    | VScale FieldValue
    | VBand Float
    | VExponent Value
    | VMultiply Value
    | VOffset Value
    | VRound Bool
    | VNull
    | VIfElse String (List Value) (List Value)



-- Exposed Types and Functions
-- ###########################


{-| The output field names generated when performing an aggregation transformation.
The list of field names should align with the fields operations provided by `agFields`
and `agOps`. If not provided, automatic names are generated by appending `_field`
to the operation name. For details see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agAs : List String -> AggregateProperty
agAs =
    AgAs


{-| Indicates if the full cross-product of all `groupby` values should be included
in the aggregate output when performing an aggregation transformation. For details
see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agCross : Bool -> AggregateProperty
agCross =
    AgCross


{-| Indicates if empty (zero count) groups should be dropped when performing an
aggregation transformation. For details see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agDrop : Bool -> AggregateProperty
agDrop =
    AgDrop


{-| The data fields for which to compute aggregate functions when performing an
aggregation transformation. The list of fields should align with the operations
and field names provided by `agOps` and `agAs`. If no fields and operationss
are specified, a count aggregation will be used by default. For details see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agFields : List Field -> AggregateProperty
agFields =
    AgFields


{-| The data fields to group by when performing an aggregation transformation.
If not specified, a single group containing all data objects will be used when
aggregating. For details see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agGroupBy : List Field -> AggregateProperty
agGroupBy =
    AgGroupBy


{-| Specify a field to act as a uniqe key when performing an [agGroupBy](#agGroupBy)
aggregation. This can speed up the aggregation but should only be used when there
is redundancy in the list of groupBy fields (as there is when binning for example).

    transform
        [ trBin (str "examScore") (num 0) (num 100) []
        , trAggregate
            [ agKey (str "bin0")
            , agGroupBy [ str "bin0", str "bin1" ]
            , agOps [ Count ]
            , agAs [ "count" ]
            ]
        ]

Setting a group-by key is currently undocumented but for context see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)

-}
agKey : Field -> AggregateProperty
agKey =
    AgKey


{-| The aggregation operations to apply to the fields when performing an
aggregation transformation. The list of operations should align with the fields
output field names provided by `agFields` and `agAs`. For details see the
[Vega aggregate transform documentation](https://vega.github.io/vega/docs/transforms/aggregate/)
-}
agOps : List Operation -> AggregateProperty
agOps =
    AgOps


{-| Represents an anchor position, as used for example, in placing title text.
-}
type Anchor
    = Start
    | Middle
    | End


{-| Indicates the auto-sizing characteristics of the visualization such as amount
of padding, whether it should fill the parent container etc. For more details see the
[Vega autosize documentation](https://vega.github.io/vega/docs/specification/#autosize-types)
-}
type Autosize
    = AContent
    | AFit
    | ANone
    | APad
    | APadding
    | AResize


{-| Declare the way the view is sized. See the
[Vega documentation](https://vega.github.io/vega/docs/specification/#autosize-types)
for details.

    TODO: XXX

-}
autosize : List Autosize -> ( VProperty, Spec )
autosize aus =
    ( VAutosize, JE.object (List.map autosizeProperty aus) )


{-| Indicates if the domain (the axis baseline) should be included as part of
the axis
-}
axDomain : Bool -> AxisProperty
axDomain =
    AxDomain


{-| Mark encodings for custom axis styling. For details see the
[Vega documentation](https://vega.github.io/vega/docs/axes/#custom).
-}
axEncode : List ( AxisElement, List EncodingProperty ) -> AxisProperty
axEncode =
    AxEncode


{-| Create the axes used to visualize spatial scale mappings.

    TODO: XXX

-}
axes : List Spec -> ( VProperty, Spec )
axes axs =
    ( VAxes, JE.list axs )


{-| The format specifier pattern for axis labels. For numerical values, must be
a legal [d3-format specifier](https://github.com/d3/d3-format#locale_format).
For date-time values, must be a legal
[d3-time-format](https://github.com/d3/d3-time-format#locale_format) specifier.
-}
axFormat : String -> AxisProperty
axFormat =
    AxFormat


{-| Indicates if grid lines should be included as part of the axis.
-}
axGrid : Bool -> AxisProperty
axGrid =
    AxGrid


{-| Name of the scale to use for including grid lines. By default grid lines are
driven by the same scale as the ticks and labels.
-}
axGridScale : String -> AxisProperty
axGridScale =
    AxGridScale


{-| Create a single axis used to visualize a spatial scale mapping. The first
parameter is the name of the scale backing this axis, the second the position of
the axis relative to the data rectangle and the third a list of optional axis
properties. For example,

      axes
          << axis "xScale" SBottom [ axTitle "Population", axZIndex 1 ]

-}
axis : String -> Side -> List AxisProperty -> List Spec -> List Spec
axis scName side aps =
    (::) (JE.object (AxScale scName :: AxSide side :: aps |> List.map axisProperty))


{-| Encodable axis element. Used for customising some part of an axis. For details see
the [Vega custom axes documentation](https://vega.github.io/vega/docs/axes/#custom).
-}
type AxisElement
    = EAxis
    | ETicks
    | EGrid
    | ELabels
    | ETitle
    | EDomain


{-| Indicates if labels should be hidden if they exceed the axis range. If the
parameter is `Nothing`, no check for label size is made. A `Just` value specifies
the permitted overlow in pixels that can be tolerated.
-}
axLabelBound : Maybe Float -> AxisProperty
axLabelBound =
    AxLabelBound


{-| Indicates if labels at the beginning or end of the axis should be aligned
flush with the scale range. If `Just` a pixel distance threshold, labels with
anchor coordinates within the threshold distance for an axis end-point will be
flush-adjusted. If `Nothing`, no flush alignment will be applied.
-}
axLabelFlush : Maybe Float -> AxisProperty
axLabelFlush =
    AxLabelFlush


{-| Indicates the number of pixels by which to offset flush-adjusted labels
(default 0). For example, a value of 2 will push flush-adjusted labels 2 pixels
outward from the centre of the axis. Offsets can help the labels better visually
group with corresponding axis ticks.
-}
axLabelFlushOffset : Float -> AxisProperty
axLabelFlushOffset =
    AxLabelFlushOffset


{-| The strategy to use for resolving overlap of axis labels.
-}
axLabelOverlap : OverlapStrategy -> AxisProperty
axLabelOverlap =
    AxLabelOverlap


{-| The padding in pixels between labels and ticks.
-}
axLabelPadding : Float -> AxisProperty
axLabelPadding =
    AxLabelPadding


{-| A boolean flag indicating if labels should be included as part of the axis.
-}
axLabels : Bool -> AxisProperty
axLabels =
    AxLabels


{-| The maximum extent in pixels that axis ticks and labels should use. This
determines a maximum offset value for axis titles.
-}
axMaxExtent : Num -> AxisProperty
axMaxExtent =
    AxMaxExtent


{-| The minimum extent in pixels that axis ticks and labels should use. This
determines a minimum offset value for axis titles.
-}
axMinExtent : Num -> AxisProperty
axMinExtent =
    AxMinExtent


{-| The orthogonal offset in pixels by which to displace the axis from its position
along the edge of the chart.
-}
axOffset : Num -> AxisProperty
axOffset =
    AxOffset


{-| The anchor position of the axis in pixels. For x-axes with top or bottom
orientation, this sets the axis group x coordinate. For y-axes with left or right
orientation, this sets the axis group y coordinate.
-}
axPosition : Num -> AxisProperty
axPosition =
    AxPosition


{-| Indicates if ticks should be included as part of the axis.
-}
axTicks : Bool -> AxisProperty
axTicks =
    AxTicks


{-| A desired number of ticks, for axes visualizing quantitative scales. The
resulting number may be different so that values are “nice” (multiples of 2, 5, 10)
and lie within the underlying scale’s range.
-}
axTickCount : Int -> AxisProperty
axTickCount =
    AxTickCount


{-| The size in pixels of axis ticks.
-}
axTickSize : Float -> AxisProperty
axTickSize =
    AxTickSize


{-| A title for the axis.
-}
axTitle : Str -> AxisProperty
axTitle =
    AxTitle


{-| The offset in pixels between the axis labels and axis title.
-}
axTitlePadding : Float -> AxisProperty
axTitlePadding =
    AxTitlePadding


{-| Explicitly set axis tick and label values.
-}
axValues : List Value -> AxisProperty
axValues =
    AxValues


{-| The z-index indicating the layering of the axis group relative to other axis,
mark and legend groups. The default value is 0 and axes and grid lines are drawn
behind any marks defined in the same specification level. Higher values (1) will
cause axes and grid lines to be drawn on top of marks.
-}
axZIndex : Int -> AxisProperty
axZIndex =
    AxZIndex


{-| The fill background color of a visualization. This should be specified as a
[color string](https://vega.github.io/vega/docs/types/#Color). For further details
see the [Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
background : Str -> ( VProperty, Spec )
background s =
    ( VBackground, strSpec s )


{-| Specify the value in the binned domain at which to anchor the bins of a bin
transform, shifting the bin boundaries if necessary to ensure that a boundary aligns
with the anchor value. If not specified, the minimum bin extent value serves as
the anchor. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnAnchor : Num -> BinProperty
bnAnchor =
    BnAnchor


{-| Specify the output fields to contain the extent of a binning transform
(its start and end bin values). If not specified these can be retrieved as the `bin0`
and `bin1` fields. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnAs : String -> String -> BinProperty
bnAs =
    BnAs


{-| Specify the number base to use for automatic bin determination in a bin transform.
If not specified, base 10 is assumed. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnBase : Num -> BinProperty
bnBase =
    BnBase


{-| Specify the allowable bin step sub-divisions when performing a binning transformation.
The parameter should evaluate to an array of numeric values. If not specified, the
default of [5, 2] is used, which indicates that for base 10 numbers automatic bin
determination can consider dividing bin step sizes by 5 and/or 2. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnDivide : Num -> BinProperty
bnDivide =
    BnDivide


{-| Specify the maximum number of bins to create with a bin transform.For details see
the [Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnMaxBins : Num -> BinProperty
bnMaxBins =
    BnMaxBins


{-| Specify the minimum allowable bin step size between bins when performing a bin
transform. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnMinStep : Num -> BinProperty
bnMinStep =
    BnMinStep


{-| Specify whether or not the bin boundaries in a binning transform will use human-friendly
values such as multiples of ten. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnNice : Boo -> BinProperty
bnNice =
    BnNice


{-| Bind the specification of a binning transform (its start, step and stop properties)
to a signal with the given name. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnSignal : String -> BinProperty
bnSignal =
    BnSignal


{-| Specify the exact step size to use between bins in a bin transform. This overrides
some other options such as `bnMaxBins`. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnStep : Num -> BinProperty
bnStep =
    BnStep


{-| Specify an array of allowable step sizes between bins to choose from when performing
a bin transform. For details see the
[Vega bin transform documentation](https://vega.github.io/vega/docs/transforms/bin/)
-}
bnSteps : Num -> BinProperty
bnSteps =
    BnSteps


{-| A boolean literal used for functions that can accept a boolean literal or a
reference to something that generates a boolean value (e.g. a signal).
-}
boo : Bool -> Boo
boo =
    Boo


{-| An expression that will be evaluated as a boolean value.
-}
booExpr : Expr -> Boo
booExpr =
    BooExpr


{-| A list of Boolean literals used for functions that can accept Boolean literals
or something that generates a list of Boolean values (e.g. a signal).
-}
boos : List Bool -> Boo
boos =
    Boos


{-| A signal that will provide a Boolean value.
-}
booSignal : String -> Boo
booSignal =
    BooSignal


{-| A list of signals that will provide Boolean values.
-}
booSignals : List String -> Boo
booSignals =
    BooSignals


{-| The bounds calculation method to determine the extent of a sub-plot in a grid
layout. `Full` indicates the entire calculated bounds (including axes, title, and
legend) will be used. `Flush` indicates only the specified width and height values
for the group mark will be used. The flush setting can be useful when attempting
to place sub-plots without axes or legends into a uniform grid structure.
-}
type BoundsCalculation
    = Full
    | Flush


{-| Define a colour in HCL space. Each of the three triplet values can be a numeric
literal, a signal, or subject to some scale.
-}
cHCL : List Value -> List Value -> List Value -> ColorValue
cHCL =
    HCL


{-| Define a colour in HSL space. Each of the three triplet values can be a numeric
literal, a signal, or subject to some scale.
-}
cHSL : List Value -> List Value -> List Value -> ColorValue
cHSL =
    HSL


{-| Indicates the type of color interpolation to apply, when mapping a data field
onto a color scale. Parameterised interpolation types generated by [cubeHelix](#cubeHelix),
[cubeHelixLong](#cubeHelixLong), [hclLong](#hclLong), [hslLong](#hslLong) and
[rgb](#rgb). For details see the
[Vega quantitative scales documentation](https://vega.github.io/vega/docs/scales/#quantitative).
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


{-| Define a colour in CIELab space. Each of the three triplet values can be a numeric
literal, a signal, or subject to some scale.
-}
cLAB : List Value -> List Value -> List Value -> ColorValue
cLAB =
    LAB


{-| Specify whether or not clipping should be applied to a set of marks within a
group mark. For details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#clip).
-}
clEnabled : Boo -> Clip
clEnabled =
    ClEnabled


{-| Specify an arbitrary clipping path to be applied to a set of marks within a
region. The path should be a valid
[SVG path string](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
For details see the [Vega documentation](https://vega.github.io/vega/docs/marks/#clip).
-}
clPath : Str -> Clip
clPath =
    ClPath


{-| Specify a cartogrpahic projection with which to clip all marks to a projected
sphere of the globe. This is useful in conjunction with map projections that
otherwise included projected content (such as graticule lines) outside the bounds
of the globe. For details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#clip).
-}
clSphere : Str -> Clip
clSphere =
    ClSphere


{-| Specify the kernel density estimation bandwidth used in a contour transformation.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnBandwidth : Num -> ContourProperty
cnBandwidth =
    CnBandwidth


{-| Specify the size of cells used for density estimation in a contour transformation.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnCellSize : Num -> ContourProperty
cnCellSize =
    CnCellSize


{-| Specify the desired number of contours used in a contour transformation. This
will be ignored if `cnThresholds` setting explicit contour values are provided.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnCount : Num -> ContourProperty
cnCount =
    CnCount


{-| Specify whether or not contour threshold values should be automatically aligned
to “nice”, human-friendly values when performing a contour transformation. If true,
the number of thresholds may deviate from that provided by `cnCount`. For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnNice : Boo -> ContourProperty
cnNice =
    CnNice


{-| Specify whether or not contour polygons should be smoothed in a contour transformation.
This will be ignored if kernel density estimation is used.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnSmooth : Boo -> ContourProperty
cnSmooth =
    CnSmooth


{-| Specify the explicity contour values to be generated by a contour transformation.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnThresholds : Num -> ContourProperty
cnThresholds =
    CnThresholds


{-| Specify a grid of values over which to compute contours. If not provided, `trContour`
will instead compute contours fot the kernel density estimate of input data.
For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnValues : Num -> ContourProperty
cnValues =
    CnValues


{-| Specify the x-coordinate field used for density estimation in a contour
transformation. For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnX : Field -> ContourProperty
cnX =
    CnX


{-| Specify the y-coordinate field used for density estimation in a contour
transformation. For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/)
-}
cnY : Field -> ContourProperty
cnY =
    CnY


{-| The fields to sort when defining a sorting operation. For details, see the
[Vega documentation](https://vega.github.io/vega/docs/types/#Compare)
-}
coField : List Field -> Comparator
coField =
    CoField


{-| Combines a list of labelled specifications into a single specification that
may be passed to JavaScript for rendering. This is useful when you wish to create
a single page with multiple visualizations.

    combineSpecs
        [ ( "vis1", myFirstVis )
        , ( "vis2", mySecondVis )
        , ( "vis3", myOtherVis )
        ]

-}
combineSpecs : List LabelledSpec -> Spec
combineSpecs specs =
    JE.object specs


{-| The ordering of the fields in a sorting operation. For details, see the
[Vega documentation](https://vega.github.io/vega/docs/types/#Compare)
-}
coOrder : List Order -> Comparator
coOrder =
    CoOrder


{-| Define a colour in RGB space. Each of the three triplet values can be a numeric
literal, a signal, or subject to some scale.
-}
cRGB : List Value -> List Value -> List Value -> ColorValue
cRGB =
    RGB


{-| Specify the number of colors to use in a colour scheme. This can be useful
for scale types such as quantize, which use the length of the scale range to
determine the number of discrete bins for the scale domain. For details see the
[Vega documentation](https://vega.github.io/vega/docs/schemes/).
-}
csCount : Float -> ColorSchemeProperty
csCount =
    SCount


{-| Specify the extent of the color range to use in sequential and diverging color
schemes. For example [0.2, 1] will rescale the color scheme such that color values
in the range [0, 0.2] are excluded from the scheme. For details see the
[Vega documentation](https://vega.github.io/vega/docs/schemes/).
-}
csExtent : Float -> Float -> ColorSchemeProperty
csExtent mn mx =
    SExtent mn mx


{-| Specify the name of a color scheme to use. For details see the
[Vega documentation](https://vega.github.io/vega/docs/schemes/).
-}
csScheme : String -> ColorSchemeProperty
csScheme =
    SScheme


{-| Cube-helix color interpolation. The parameter is a gamma value to control the
brighness of the colour trajectory.
-}
cubeHelix : Float -> CInterpolate
cubeHelix =
    CubeHelix


{-| A long path cube-helix color interpolation. The parameter is a gamma value to control the
brighness of the colour trajectory.
-}
cubeHelixLong : Float -> CInterpolate
cubeHelixLong =
    CubeHelixLong


{-| Represents the type of cursor to display. For an explanation of each type, see the
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


{-| A convenience function for generating a text string representing a given cursor
type. This can be used instead of specifying a cursor type as a literal string
to avoid problems of mistyping its name.

    TODO: XXX Provide example

-}
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


{-| A data value representing a list of Booleans.
-}
daBoos : List Bool -> DataValues
daBoos =
    DaBoos


{-| Reference a dataset with the given name. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
daDataset : String -> DataReference
daDataset =
    DDataset


{-| Reference a data field with the given value. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
daField : Str -> DataReference
daField =
    DField


{-| Reference a collection of data fields with the given values. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
daFields : Str -> DataReference
daFields =
    DFields


{-| Specify the data format when loading or generating a data set. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daFormat : Format -> DataProperty
daFormat =
    DaFormat


{-| A data value representing a list of numbers.
-}
daNums : List Float -> DataValues
daNums =
    DaNums


{-| Specify updates to insert, remove, and toggle data values, or clear the data in a data set
when trigger conditions are met. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daOn : List Trigger -> DataProperty
daOn =
    DaOn


{-| Reference a collection of nested data references. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
daReferences : List DataReference -> DataReference
daReferences =
    DReferences


{-| Sort a data reference. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#dataref)
-}
daSort : List SortProperty -> DataReference
daSort =
    DSort


{-| Specify a named data source when generating a data set. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daSource : String -> DataProperty
daSource =
    DaSource


{-| Specify a collection of named data sources when generating a data set. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daSources : List String -> DataProperty
daSources =
    DaSources


{-| A data value representing a list of strings.
-}
daStrs : List String -> DataValues
daStrs =
    DaStrs


{-| Declare a named data set. Depending on the properties provided this may be
from an external file, from a named data source or inline literal values. See the
[Vega documentation](https://vega.github.io/vega/docs/data/#propertiess) for details.

      dataSource
          [ data "pop" [ daUrl "data/population.json" ]
          , data "popYear" [ daSource "pop" ] |> transform [ TFilter (expr "datum.year == year") ]
          ]

-}
data : String -> List DataProperty -> DataTable
data name dProps =
    ( "name", JE.string name ) :: List.map dataProperty dProps


{-| Create a column of data. A column has a name and a list of values. The final
parameter is the list of any other columns to which this is added.

     dataColumn "Animal" (daStrs [ "Cat", "Dog", "Mouse"]) []

-}
dataColumn : String -> DataValues -> List DataColumn -> List DataColumn
dataColumn colName data =
    case data of
        DaStrs col ->
            (::) (List.map (\s -> ( colName, JE.string s )) col)

        DaNums col ->
            (::) (List.map (\x -> ( colName, JE.float x )) col)

        DaBoos col ->
            (::) (List.map (\b -> ( colName, JE.bool b )) col)


{-| Declare a data table from a provided list of column values. Each column contains
values of the same type, but columns each with a different type are permitted.
Columns should all contain the same number of items; if not the dataset will be
truncated to the length of the shortest column. The first parameter should be the
name given to the data table for later reference. An optional list for field
formatting instructions can be provided in the second parameter or an empty list
to use the default formatting. See the
[Vega documentation](https://vega.github.io/vega/docs/data/#format)
for details.
The columns themselves are most easily generated with `dataColumn`

    dataTable =
        dataFromColumns "animals" [ parse [ ( "Year", foDate "%Y" ) ] ]
            << dataColumn "Animal" (daStrs [ "Fish", "Dog", "Cat" ])
            << dataColumn "Age" (daNums [ 28, 12, 6 ])
            << dataColumn "Year" (daStrs [ "2010", "2014", "2015" ])

-}
dataFromColumns : String -> List Format -> List DataColumn -> DataTable
dataFromColumns name fmts cols =
    let
        dataArray =
            cols
                |> transpose
                |> List.map JE.object
                |> JE.list

        fmt =
            if fmts == [] then
                []
            else
                [ ( "format", JE.object (List.concatMap formatProperty fmts) ) ]
    in
    [ ( "name", JE.string name ), ( "values", dataArray ) ] ++ fmt


{-| Declare a data source from a provided list of row values. Each row contains
a list of tuples where the first value is a string representing the column name, and the
second the column value for that row. Each column can have a value of a different type
but you must ensure that when subsequent rows are added, they match the types of previous
values with shared column names. An optional list for field formatting instructions can
be provided in the first parameter or an empty list to use the default formatting. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format)
for details.
The rows themselves are most easily generated with `dataRow`. Note though that generally
if you are creating data inline (as opposed to reading from a file), adding data by column
in more efficent and less error-prone.

    dataTable =
        dataFromRows "animals" [ parse [ ( "Year", foDate "%Y" ) ] ]
            << dataRow [ ( "Animal", vStr "Fish" ), ( "Age", vNum 28 ), ( "Year", vStr "2010" ) ]
            << dataRow [ ( "Animal", vStr "Dog" ), ( "Age", vNum 12 ), ( "Year", vStr "2014" ) ]
            << dataRow [ ( "Animal", vStr "Cat" ), ( "Age", vNum 6 ), ( "Year", vStr "2015" ) ]

-}
dataFromRows : String -> List Format -> List DataRow -> DataTable
dataFromRows name fmts rows =
    let
        fmt =
            if fmts == [] then
                []
            else
                [ ( "format", JE.object (List.concatMap formatProperty fmts) ) ]
    in
    [ ( "name", JE.string name ), ( "values", JE.list rows ) ] ++ fmt


{-| Specify a property to customise data loading. In addtion to declaring `DaSphere`
for a global sphere, they are more usually generated by the functions
[daFormat](#daFormat), [daSource](#daSource), [daSources](#daSources),
[daValue](#daValue),[daOn](#daOn) and [daUrl](#daUrl). For details, see the
[Vega data properties documentation](https://vega.github.io/vega/docs/data/#properties)
-}
type DataProperty
    = DaFormat Format
    | DaSource String
    | DaSources (List String)
    | DaValue Value
    | DaSphere
    | DaOn (List Trigger)
    | DaUrl String


{-| Create a row of data. A row comprises a list of (columnName,value) pairs.
The final parameter is the list of any other rows to which this is added.

    TODO: Check this is the current syntax:
    dataRow [("Animal", vStr "Fish"),("Age", vNum 28),("Year", vStr "2010")] []

-}
dataRow : List ( String, Value ) -> List DataRow -> List DataRow
dataRow row =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, valueSpec val )) row))


{-| Specify a data source to be used in the visualization. A data source is a collection
of data tables which themselves may be generated inline, loaded from a URL or the
result of a transformation. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data).

      dataSource
          [ data "pop" [ daUrl "data/population.json" ]
          , data "popYear" [ daSource "pop" ] |> transform [ trFilter (expr "datum.year == year") ]
          , data "males" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 1") ]
          , data "females" [ daSource "popYear" ] |> transform [ trFilter (expr "datum.sex == 2") ]
          , data "ageGroups" [ daSource "pop" ] |> transform [ trAggregate [ AgGroupBy [ FieldName "age" ] ] ]
          ]

-}
dataSource : List DataTable -> Data
dataSource dataTables =
    ( VData, JE.list (List.map JE.object dataTables) )


{-| Indicates the type of data to be parsed when reading input data. Parameterised
data type format specifications generated by [foDate](#foDate) and [foUtc](#foUtc).
-}
type DataType
    = FoNum
    | FoBoo
    | FoDate String
    | FoUtc String


{-| Specify the name of a data file to be loaded when generating a data set. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daUrl : String -> DataProperty
daUrl =
    DaUrl


{-| Specify some inline data value(s) when generating a data set. For details see the
[Vega documentation](https://vega.github.io/vega/docs/data/#properties)
-}
daValue : Value -> DataProperty
daValue =
    DaValue


{-| Provide a text description of the visualization.
-}
description : String -> ( VProperty, Spec )
description s =
    ( VDescription, JE.string s )


{-| A convenience function for generating a text string representing a given text
direction type. This can be used instead of specifying an direction type as a
literal string to avoid problems of mistyping its name.

    TODO: XXX Provide example

-}
dirLabel : TextDirection -> String
dirLabel dir =
    case dir of
        LeftToRight ->
            "ltr"

        RightToLeft ->
            "rtl"


{-| A [data reference object](https://vega.github.io/vega/docs/scales/#dataref)
that specifies field values in one or more data sets to define a scale domain.
For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#domain)
-}
doData : List DataReference -> ScaleDomain
doData =
    DoData


{-| An numeric array literal (`Nums`) representing a scale domain. For details
see the [Vega documentation](https://vega.github.io/vega/docs/scales/#domain)
-}
doNums : Num -> ScaleDomain
doNums =
    DoNums


{-| An string array literal (`Strs`) representing a scale domain. For details
see the [Vega documentation](https://vega.github.io/vega/docs/scales/#domain)
-}
doStrs : Str -> ScaleDomain
doStrs =
    DoStrs


{-| Indicates a DSV (delimited separated value) format with a custom delimeter.
Typically used when specifying a data url.
-}
dsv : String -> Format
dsv =
    DSV


{-| The properties with a named custom encoding set. To envoke the custom set a
signal event handler with an `encode` directive should be defined. For further
details see the [Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
enCustom : String -> List MarkProperty -> EncodingProperty
enCustom name =
    Custom name


{-| The properties to be encoded when a mark item is first instantiated or a
visualization is resized. For further details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
enEnter : List MarkProperty -> EncodingProperty
enEnter =
    Enter


{-| Specify the encoding directives for the visual properties of the top-level
group mark representing a chart’s data rectangle. For example, this can be used
to set a background fill color for the plotting area, rather than the entire view.
-}
encode : List EncodingProperty -> ( VProperty, Spec )
encode eps =
    ( VEncode, JE.object (List.map encodingProperty eps) )


{-| The properties to be encoded when the data backing a mark item is removed.
For further details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
enExit : List MarkProperty -> EncodingProperty
enExit =
    Exit


{-| Custom encoding for gradient (continuous) legends. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
enGradient : List EncodingProperty -> LegendEncoding
enGradient =
    EnGradient


{-| Custom encoding for legend labels. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
enLabels : List EncodingProperty -> LegendEncoding
enLabels =
    EnLabels


{-| Custom encoding for a legend group mark. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
enLegend : List EncodingProperty -> LegendEncoding
enLegend =
    EnLegend


{-| Custom encoding for symbol (discrete) legends. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
enSymbols : List EncodingProperty -> LegendEncoding
enSymbols =
    EnSymbols


{-| Custom ecoding for a legend title. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/#custom)
-}
enTitle : List EncodingProperty -> LegendEncoding
enTitle =
    EnTitle


{-| Specify an event stream filter that lets only events that occur between the
two given event streams from being handled. This is useful, for example, for
capturing pointer dragging as it is a pointer movement event stream that occurs
between `MouseDown` and `MouseUp` events.

    << signal "myDrag"
        [ siValue (vNums [ 200, 200 ])
        , siOn
            [ evHandler
                (esObject
                    [ esBetween [ esMark Rect, esType MouseDown ] [ esSource ESView, esType MouseUp ]
                    , esSource ESView
                    , esType MouseMove
                    ]
                )
                [ evUpdate "xy()" ]
            ]
        ]

For more details see the
[Vega event stream object documentation](http://vega.github.io/vega/docs/event-streams/#object).

-}
esBetween : List EventStreamProperty -> List EventStreamProperty -> EventStreamProperty
esBetween =
    ESBetween


{-| Specify whether or not an event stream is consumed once it has been captured.
If false, the event is made available for subsequent event handling. For more
details see the [Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
esConsume : Bool -> EventStreamProperty
esConsume =
    ESConsume


{-| Specify the minimum time to wait between event occurrence and processing. If
a new event arrives during a debouncing window, the debounce timer will restart
and only the new event will be captured. For more details see the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
esDebounce : Num -> EventStreamProperty
esDebounce =
    ESDebounce


{-| Specify a DOM node as the source for an event selector. This should be referenced
with a standard [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
For details see the
[Vega event stream selector documentation](http://vega.github.io/vega/docs/event-streams/#selector).
-}
esDom : String -> EventSource
esDom =
    ESDom


{-| Specify the filter expressions that must evaluate to `True` in order for an
event to be captured. If multiple filters are provided they must all be satisfied
(`and` operator) for the event to be captured. For more details see the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
esFilter : List Expression -> EventStreamProperty
esFilter =
    ESFilter


{-| Specify a mark type as the source for an event stream. For details see the
[Vega event stream selector documentation](http://vega.github.io/vega/docs/event-streams/#selector).
-}
esMark : Mark -> EventStreamProperty
esMark =
    ESMark


{-| Specify a named mark as the source for an event stream. The name given here
must correspond to the name provided to a mark via `mName`. For details see the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
esMarkName : String -> EventStreamProperty
esMarkName =
    ESMarkName


{-| Specify a single event stream merging the given list of event streams. See the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object) for details.
-}
esMerge : List EventStream -> EventStream
esMerge =
    ESMerge


{-| Represents an event stream for modelling user input. This function expects a
stream object definition which provides a more self-explanatory and robust
form of specification than using a selector string. For details see the
[Vega event stream documentation](<http://vega.github.io/vega/docs/event-streams/#object>.
-}
esObject : List EventStreamProperty -> EventStream
esObject =
    ESObject


{-| Specify an event stream for modelling user input. This function expects a
shorthand event stream selector string, which is a more compact way of specifying
a stream than with `eventStream` but is more vulnerable to mistakes (as
it is simply a string). For event stream selector details see the
[Vega event stream selector documentation](http://vega.github.io/vega/docs/event-streams/#selector).
-}
esSelector : Str -> EventStream
esSelector =
    ESSelector


{-| Specify a source for an event selector. For details see the
[Vega event stream selector documentation](http://vega.github.io/vega/docs/event-streams/#selector).
-}
esSource : EventSource -> EventStreamProperty
esSource =
    ESSource


{-| Specify an event stream that is to be the used as input into a derived event
stream.

    TODO: XXXX Add example

For more details see the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).

-}
esStream : EventStream -> EventStreamProperty
esStream =
    ESDerived


{-| Specify the minimum time in milliseconds between captured events (default 0).
New events that arrive within the throttling window will be ignored. For timer events,
this property determines the interval between timer ticks. For more details see the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#object).
-}
esThrottle : Num -> EventStreamProperty
esThrottle =
    ESThrottle


{-| Specify an event stream type used when handling user interaction events. See the
[Vega event stream documentation](http://vega.github.io/vega/docs/event-streams/#types) for details.
-}
esType : EventType -> EventStreamProperty
esType =
    ESType


{-| Name of a mark property encoding set to re-evaluate for the mark item that is
the source of an input event. This is required if `evUpdate` is not specified. For
details see the [Vega documentation](https://vega.github.io/vega/docs/signals/#handlers).
-}
evEncode : String -> EventHandler
evEncode =
    EEncode


{-| A source for an event selector. To specify a DOM node as a source (using a
CSS selector string), see [esDom](#esDom). For details see the
[Vega event stream selector documentation](http://vega.github.io/vega/docs/event-streams/#selector).
-}
type EventSource
    = ESAll
    | ESView
    | ESScope
    | ESWindow
    | ESDom String


{-| Event types used when handling user interaction events. The `Timer` type will
fire an event at a regular interval determined by the number of milliseconds provided
to the `esThrottle` function. For details see the
[Vega event stream type documentation](http://vega.github.io/vega/docs/event-streams/#types).
-}
type EventType
    = Click
    | DblClick
    | DragEnter
    | DragLeave
    | DragOver
    | KeyDown
    | KeyPress
    | KeyUp
    | MouseDown
    | MouseMove
    | MouseOut
    | MouseOver
    | MouseUp
    | MouseWheel
    | TouchEnd
    | TouchMove
    | TouchStart
    | Wheel
    | Timer


{-| Indicates whether or not updates that do not change a signal value should propagate.
For example, if true and an input stream update sets the signal to its current value,
downstream signals will still be notified of an update. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#handlers).
-}
evForce : Bool -> EventHandler
evForce =
    EForce


{-| Specify an event event handler. The first parameter represents the stream of
events to respond to. The second a list of handlers that respond to the event stream.
For example,

    signal "tooltip"
        [ siValue (vObject [])
        , siOn
            [ evHandler (esObject [esMark Rect, esType MouseOver]) [ evUpdate "datum" ]
            , evHandler (esObject [esMark Rect, esType MouseOut]) [ evUpdate "" ]
            ]
        ]

For details see the
[Vega event stream documentation](https://vega.github.io/vega/docs/event-streams/).

-}
evHandler : EventStream -> List EventHandler -> List EventHandler
evHandler es eHandlers =
    EEvents es :: eHandlers


{-| Sepcify an event selector used to generate an event stream. For details see the
[Vega event stream selector documentation](https://vega.github.io/vega/docs/event-streams/#selector).
-}
evStreamSelector : Str -> EventStream
evStreamSelector =
    ESSelector


{-| Expression to be evaluated when an event occurs, the result of which becomes
the new signal value. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#handlers).
-}
evUpdate : String -> EventHandler
evUpdate =
    EUpdate


{-| A field lookup that forms a vega [Expr](https://vega.github.io/vega/docs/types/#Expr).
In contrast to an expression generated by `expr`, a field lookup is applied once
to an entire field rather than evaluated once per datum.
-}
exField : String -> Expr
exField =
    ExField


{-| Represents an expression to enable custom calculations. This should be text
in the Vega expression language. In contrast to field lookup generated by `exField`,
the expression generated by `expr` is evaluated once per datum. For details see
the [Vega documentation](https://vega.github.io/vega/docs/expressions).
-}
expr : String -> Expr
expr =
    Expr


{-| For data-driven facets, a list aggregate transform properties for the
aggregate data values generated for each facet group item.
-}
faAggregate : List AggregateProperty -> Facet
faAggregate =
    FaAggregate


{-| For pre-faceted data, the name of the data field containing an array of data
values to use as the local partition. This is required if using pre-faceted data.
-}
faField : String -> Facet
faField =
    FaField


{-| For data-driven facets, an array of field names by which to partition the data.
This is required if using pre-faceted data.
-}
faGroupBy : List String -> Facet
faGroupBy =
    FaGroupBy


{-| Perform a lookup on the current data object using the given field value.
Once evaluated this is similar to simply providing a string value. For details
see the [Vega documentation](https://vega.github.io/vega/docs/types/#FieldValue)
-}
fDatum : FieldValue -> FieldValue
fDatum =
    FDatum


{-| Reference a property of the enclosing group mark instance as a field value. For
details see the [Vega documentation](https://vega.github.io/vega/docs/types/#FieldValue)
-}
fGroup : FieldValue -> FieldValue
fGroup =
    FGroup


{-| The name of a field to reference.
-}
fName : String -> FieldValue
fName =
    FName


{-| Specify a force that pulls all nodes towards a shared centre point in a force
simulation. The two parameters specify the x and y coordinates of the centre point.
For details see the [Vega documentation](https://vega.github.io/vega/docs/transforms/force/#center)
-}
foCenter : Num -> Num -> Force
foCenter x y =
    FCenter [ FpCx x, FpCy y ]


{-| Specify a collision detection force that pushes apart nodes whose circular
radii overlap in a force simulation. The first parameter specifies the radius of
the node to which it applies. The second parameter enables the strength and number
of iterations to be specified. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/#collide)
-}
foCollide : Num -> List ForceProperty -> Force
foCollide r fps =
    FCollide (FpRadius r :: fps)


{-| Indicate a date format for parsing data. For details of how to specify a date, see
[D3's formatting specifiers](https://github.com/d3/d3-time-format#locale_format). An empty
string will indicate detault date formatting should be applied, but note that care should be
taken as different browsers may have different default date parsing. Being explicit about the
date format is usually safer.
-}
foDate : String -> DataType
foDate =
    FoDate


{-| Specify the link constraints that cause nodes to be pushed apart towards a target
separation distance. The first parameter is the name of the data set containing the
link objects, each of which should contain `source` and `target` fields indicating
node objects. The second parameter enables the id, distance, strength and number
of iterations to be specified. If an id field parameter is provided, it is used
to relate link objects and node objects. Otherwise, the source and target fields
should provide indices into the array of node objects. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/#link)
-}
foLink : String -> List ForceProperty -> Force
foLink links fps =
    FLink (FpLinks links :: fps)


{-| Specify an n-body force that causes nodes to either attract or repel each other
in a force simulation. The parameter enables the strength, theta value, and min/max
distances over which the force acts to be specified. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/#nbody)
-}
foNBody : List ForceProperty -> Force
foNBody =
    FNBody


{-| Specifies the type of format a data source uses. For details see the
[Vega data format documentation](https://vega.github.io/vega/docs/data/#format).
-}
type Format
    = JSON
    | JSONProperty String
    | CSV
    | TSV
    | DSV String
    | TopojsonFeature String
    | TopojsonMesh String
    | Parse (List ( String, DataType ))


{-| Defines whether a formula transformation is a one-off operation (`InitOnly`)
or is applied whenever an upstream dependency changes. For details see the
[Vega formula transform documentation](https://vega.github.io/vega/docs/transforms/formula/).
-}
type FormulaUpdate
    = InitOnly
    | AlwaysUpdate


{-| Indicate a utc date format for parsing data. For details of how to specify a date, see
[D3's formatting specifiers](https://github.com/d3/d3-time-format#locale_format). An empty
string will indicate detault date formatting should be applied, but note that care should be
taken as different browsers may have different default date parsing. Being explicit about the
date format is usually safer.
-}
foUtc : String -> DataType
foUtc =
    FoUtc


{-| Specify a force attration towards a particular x-coordinate (first parameter),
with a given strength (second parameter) on a per-node basis. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/#x)
-}
foX : Field -> List ForceProperty -> Force
foX x fps =
    FX x fps


{-| Specify a force attration towards a particular y-coordinate (first parameter),
with a given strength (second parameter) on a per-node basis. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/#y)
-}
foY : Field -> List ForceProperty -> Force
foY y fps =
    FY y fps


{-| Reference a field of the enclosing group mark’s data object as a field value. For
details see the [Vega documentation](https://vega.github.io/vega/docs/types/#FieldValue)
-}
fParent : FieldValue -> FieldValue
fParent =
    FParent


{-| Specify the distance in pixels by which the link constraint should separate
nodes (default 30). For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#link)
-}
fpDistance : Num -> ForceProperty
fpDistance =
    FpDistance


{-| Specify the maximum distance over which an n-body force acts. If two nodes
exceed this value, they will not exert forces on each other. For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#nbody)
-}
fpDistanceMax : Num -> ForceProperty
fpDistanceMax =
    FpDistanceMax


{-| Specify the minimum distance over which an n-body force acts. If two nodes
are closer than this value, the exerted forces will be as if they are distanceMin
apart (default 1). For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#nbody)
-}
fpDistanceMin : Num -> ForceProperty
fpDistanceMin =
    FpDistanceMin


{-| Specify an optional data field for a node’s unique identifier. If provided,
the source and target fields of each link should use these values to indicate
nodes. For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#link)
-}
fpId : Field -> ForceProperty
fpId =
    FpId


{-| Specify the number of iterations to run collision detection or link constraints
(default 1) in a force directed sumulation. For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#collide)
-}
fpIterations : Num -> ForceProperty
fpIterations =
    FpIterations


{-| Specify the relative strength of a force or link constraint in a force
simulation. For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#collide)
-}
fpStrength : Num -> ForceProperty
fpStrength =
    FpStrength


{-| Specify the approximation parameter for aggregating more distance forces in
a force-directed simulation (default 0.9). For details see the
[Vega force transform documentation](https://vega.github.io/vega/docs/transforms/force/#nbody)
-}
fpTheta : Num -> ForceProperty
fpTheta =
    FpTheta


{-| Specify the energy level or “temperature” of a simulation under a force transform.
Alpha values lie in the range [0, 1]. Internally, the simulation will decrease the
alpha value over time, causing the magnitude of updates to diminish. For details
see the [Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsAlpha : Num -> ForceSimulationProperty
fsAlpha =
    FsAlpha


{-| Specify the minimum amount by which to lower the alpha value on each simulation
iteration under a force transform. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsAlphaMin : Num -> ForceSimulationProperty
fsAlphaMin =
    FsAlphaMin


{-| Specify the target alpha value to which a simulation converges under a force
transformation. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsAlphaTarget : Num -> ForceSimulationProperty
fsAlphaTarget =
    FsAlphaTarget


{-| Specify the names of the output fields to which node positions and velocities
are written after a force transformation. The default is ["x", "y", "vx", "vy"]
corresponding to the order of parameter names to be provided. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsAs : String -> String -> String -> String -> ForceSimulationProperty
fsAs x y vx vy =
    FsAs x y vx vy


{-| Specify the forces to include in a force-directed simulation resulting from
a force transform. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsForces : List Force -> ForceSimulationProperty
fsForces =
    FsForces


{-| A signal to evaluate which should generate a field name to reference. For details
see the [Vega documentation](https://vega.github.io/vega/docs/types/#FieldValue)
-}
fSignal : String -> FieldValue
fSignal =
    FSignal


{-| Specify the number of iterations in a force transformation when in static
mode (default 300). For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsIterations : Num -> ForceSimulationProperty
fsIterations =
    FsIterations


{-| Specify whether a simulation in a force transformation should restart when
node object fields are modified. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsRestart : Boo -> ForceSimulationProperty
fsRestart =
    FsRestart


{-| Specify whether a simulation in a force transformation should be computed in
batch to produce a static layout (true) or should be animated (false). For details
see the [Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsStatic : Boo -> ForceSimulationProperty
fsStatic =
    FsStatic


{-| Specify the 'friction' to be applied to a simulation in a force transformation.
This is applied after the application of any forces during an iteration, each node’s
velocity is multiplied by 1 - velocityDecay (default 0.4). For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/force/)
-}
fsVelocityDecay : Num -> ForceSimulationProperty
fsVelocityDecay =
    FsVelocityDecay


{-| Specify the output field in which to write a generated shape instance following
a geoShape or geoPath transformation. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/geopath/)
-}
gpAs : String -> GeoPathProperty
gpAs =
    GeAs


{-| Specify the data field containing GeoJSON data when applying a geoShape or
geoPath transformation. If unspecified, the full input data object will be used.
For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/geopath/)
-}
gpField : Field -> GeoPathProperty
gpField =
    GeField


{-| Specify the default radius (in pixels) to use when drawing GeoJSON Point and
MultiPoint geometries following a geoShape or geoPath transformation. An expression
value may be used to set the point radius as a function of properties of the input
GeoJSON. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/geopath/)
-}
gpPointRadius : Num -> GeoPathProperty
gpPointRadius =
    GePointRadius


{-| Specify a type of layout alignment to apply to grid columns. This can be used in
cases when alignment rules are different for rows and columns. For details, see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/).
-}
grAlignColumn : GridAlign -> GridAlign
grAlignColumn =
    AlignColumn


{-| Specify a type of layout alignment to apply to grid rows. This can be used in
cases when alignment rules are different for rows and columns. For details, see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/).
-}
grAlignRow : GridAlign -> GridAlign
grAlignRow =
    AlignRow


{-| Specify a type of layout alignment to apply to grid rows and columns. `AlignNone`
indicates a flow layout will be used, in which adjacent plots are simply placed
one after the other. `AlignEach` indicates elements will be aligned into a clean
grid structure, but each row or column may be of variable size. `AlignAll` indicates
elements will be aligned and each row or column will be sized identically based
on the maximum observed size. To used different row and column layouts, use `grAlignRow`
and `grAlignColumn`. For details, see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/).
-}
type GridAlign
    = AlignAll
    | AlignEach
    | AlignNone
    | AlignRow GridAlign
    | AlignColumn GridAlign


{-| Specify both the major and minor extents of a graticule to be the same values.
Should be a two element array representing longitude and latitude extents. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grExtent : Num -> GraticuleProperty
grExtent =
    GrExtent


{-| Specify the major extent of a graticule. Should be a two element array representing
longitude and latitude extents. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grExtentMajor : Num -> GraticuleProperty
grExtentMajor =
    GrExtentMajor


{-| Specify the minor extent of a graticule. Should be a two element array representing
longitude and latitude extents. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grExtentMinor : Num -> GraticuleProperty
grExtentMinor =
    GrExtentMinor


{-| Specify the field used to bin when generating a graticule. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grField : Field -> GraticuleProperty
grField =
    GrField


{-| Specify the precision in degrees with which graticule arcs are generated. The
default value is 2.5 degrees. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grPrecision : Num -> GraticuleProperty
grPrecision =
    GrPrecision


{-| Specify both the major and minor step angles of a graticule to be the same values.
Should be a two element array representing longitude and latitude spacing. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grStep : Num -> GraticuleProperty
grStep =
    GrStep


{-| Specify the major step angles of a graticule. Should be a two element array
representing longitude and latitude spacing. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grStepMajor : Num -> GraticuleProperty
grStepMajor =
    GrStepMajor


{-| Specify the minor step angles of a graticule. Should be a two element array
representing longitude and latitude spacing. For details see the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/)
-}
grStepMinor : Num -> GraticuleProperty
grStepMinor =
    GrStepMinor


{-| Indicates the horizontal alignment of some text such as on an axis or legend.
-}
type HAlign
    = AlignCenter
    | AlignLeft
    | AlignRight


{-| A convenience function for generating a text string representing a horizontal
alignment type. This can be used instead of specifying an alignment type as a
literal string to avoid problems of mistyping its name.

      MEncode [ enEnter [ maAlign [vStr (hAlignLabel AlignCenter) ] ] ]

-}
hAlignLabel : HAlign -> String
hAlignLabel align =
    case align of
        AlignLeft ->
            "left"

        AlignCenter ->
            "center"

        AlignRight ->
            "right"


{-| A long-path hue-chroma-luminance color interpolation.
-}
hclLong : CInterpolate
hclLong =
    HclLong


{-| Override the default height of the visualization. If not specified the height
will be calculated based on the content of the visualization.
-}
height : Float -> ( VProperty, Spec )
height w =
    ( VHeight, JE.float w )


{-| The properties to be encoded when a pointer hovers over a mark item.
For further details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
enHover : List MarkProperty -> EncodingProperty
enHover =
    Hover


{-| A long-path hue-saturation-lightness color interpolation.
-}
hslLong : CInterpolate
hslLong =
    HslLong


{-| A checkbox input element.
-}
iCheckbox : List InputProperty -> Bind
iCheckbox =
    ICheckbox


{-| A color selector input element.
-}
iColor : List InputProperty -> Bind
iColor =
    IColor


{-| A date selector input element.
-}
iDate : List InputProperty -> Bind
iDate =
    IDate


{-| A local data time selector input element.
-}
iDateTimeLocal : List InputProperty -> Bind
iDateTimeLocal =
    IDateTimeLocal


{-| A conditional list of values depending on whether an expression (first parameter)
evaluates as true. The second and third parameters represent the 'then' and 'else'
branches of the test.
-}
ifElse : String -> List Value -> List Value -> Value
ifElse condition thenVals elseVals =
    VIfElse condition thenVals elseVals


{-| A month selector input element.
-}
iMonth : List InputProperty -> Bind
iMonth =
    IMonth


{-| Determines if autocomplete should be turned on or off for intput elements
that support it. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inAutocomplete : Bool -> InputProperty
inAutocomplete =
    InAutocomplete


{-| Specify that event handling should be delayed until the specified milliseconds
have elapsed since the last event was fired. This helps to limit event broadcasting.
For more details see the [Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inDebounce : Float -> InputProperty
inDebounce =
    InDebounce


{-| A CSS selector string indicating the parent element to which the input element
should be added. This allows the option of the input element to be outside the
visualization container, which could be used for linking separate visualizations.
For more details see the [Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inElement : String -> InputProperty
inElement =
    InElement


{-| The maximum value for a range slider input element. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inMax : Float -> InputProperty
inMax =
    InMax


{-| The minimum value for a range slider input element. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inMin : Float -> InputProperty
inMin =
    InMin


{-| A collection of options to be selected from by Radio or Select input elements.
For more details see the [Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inOptions : Value -> InputProperty
inOptions =
    InOptions


{-| The placehold text for input elemements before any value has been entered
(for example initial text in a text field). For more details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inPlaceholder : String -> InputProperty
inPlaceholder =
    InPlaceholder


{-| The step value (increment between adjacent selectable values) for a range
slider input element. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inStep : Float -> InputProperty
inStep =
    InStep


{-| A numeric input element.
-}
iNumber : List InputProperty -> Bind
iNumber =
    INumber


{-| A radio buttons input element.
-}
iRadio : List InputProperty -> Bind
iRadio =
    IRadio


{-| A slider input element.
-}
iRange : List InputProperty -> Bind
iRange =
    IRange


{-| A drop-down list input element.
-}
iSelect : List InputProperty -> Bind
iSelect =
    ISelect


{-| A telephone number input element.
-}
iTel : List InputProperty -> Bind
iTel =
    ITel


{-| A free text input element.
-}
iText : List InputProperty -> Bind
iText =
    IText


{-| A time selector input element.
-}
iTime : List InputProperty -> Bind
iTime =
    ITime


{-| A week selector input element.
-}
iWeek : List InputProperty -> Bind
iWeek =
    IWeek


{-| Indicates a JSON file format from which a given property is to be extracted
when it it has some surrounding structure or meta-data. For example, specifying
the property `values.features` is equivalent to retrieving `json.values.features`
from the loaded JSON object.with a custom delimeter. For details, see the
[Vega documentation](https://vega.github.io/vega/docs/data/#format).
-}
jsonProperty : String -> Format
jsonProperty =
    JSONProperty


{-| Represents a custom key-value pair to be stored in an object.
-}
keyValue : String -> Value -> Value
keyValue =
    VKeyValue


{-| Create a layout used in the visualization.

    TODO: XXX

-}
layout : List LayoutProperty -> ( VProperty, Spec )
layout lps =
    ( VLayout, JE.object (List.map layoutProperty lps) )


{-| Specify the height in pixels to clip a symbol legend entries and limit its size.
By default no clipping is performed. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leClipHeight : Num -> LegendProperty
leClipHeight =
    LeClipHeight


{-| Specify the horizontal padding between entries in a symbol legend. For more
details see the [Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leColumnPadding : Num -> LegendProperty
leColumnPadding =
    LeColumnPadding


{-| Specify the number of columns in which to arrange symbol legend entries. A
value of 0 or lower indicates a single row with one column per entry. The default
is 0 for horizontal symbol legends and 1 for vertical symbol legends. For more
details see the [Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leColumns : Num -> LegendProperty
leColumns =
    LeColumns


{-| Specify the corner radius for an enclosing legend rectangle. For more details
see the [Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leCornerRadius : Num -> LegendProperty
leCornerRadius =
    LeCornerRadius


{-| Specify the direction of a legend. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leDirection : Orientation -> LegendProperty
leDirection =
    LeDirection


{-| Mark encodings for custom legend styling. For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leEncode : List LegendEncoding -> LegendProperty
leEncode =
    LeEncode


{-| The name of the scale that maps to the legend symbols' fill colors. For more
details see the [Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leFill : String -> LegendProperty
leFill =
    LeFill


{-| Specify the background colour of an enclosing legend rectangle. For more
details see the [Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leFillColor : String -> LegendProperty
leFillColor =
    LeFillColor


{-| The format specifier pattern for legend labels. For numerical values this should
be a [d3-format specifier](https://github.com/d3/d3-format#locale_format). For
date-time values this should be a
[d3-time-format specifier](https://github.com/d3/d3-time-format#locale_format).
For more details see the
[Vega documentation](https://vega.github.io/vega/docs/legends/)
-}
leFormat : String -> LegendProperty
leFormat =
    LeFormat


{-| Create a single legend used to visualize a colour, size or shape mapping.

    TODO: XXX

-}
legend : List LegendProperty -> List Spec -> List Spec
legend lps =
    (::) (JE.object (List.map legendProperty lps))


{-| Create legends used to visualize color, size and shape mappings.

    TODO: XXX

-}
legends : List Spec -> ( VProperty, Spec )
legends lgs =
    ( VLegends, JE.list lgs )


{-| Indicates the position of a legend relative to the visualization it describes.
For details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/#orientation)
-}
type LegendOrientation
    = Left
    | TopLeft
    | Top
    | TopRight
    | Right
    | BottomRight
    | Bottom
    | BottomLeft
    | None


{-| Type of legend. `LSymbol` representing legends with discrete items and `LGradient`
for those representing continuous data.
-}
type LegendType
    = LSymbol
    | LGradient


{-| Specify the color of a legend's color gradient border. For more
details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leGradientStrokeColor : String -> LegendProperty
leGradientStrokeColor =
    LeGradientStrokeColor


{-| Specify the width of a legend's color gradient border. For more
details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leGradientStrokeWidth : Num -> LegendProperty
leGradientStrokeWidth =
    LeGradientStrokeWidth


{-| Specify the thickness in pixels of the color gradient in a legend. This value
corresponds to the width of a vertical gradient or the height of a horizontal
gradient. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leGradientThickness : Num -> LegendProperty
leGradientThickness =
    LeGradientThickness


{-| Specify the length in pixels of the primary axis of a color gradient in a
legend. This value corresponds to the height of a vertical gradient or the width
of a horizontal gradient. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leGradientLength : Num -> LegendProperty
leGradientLength =
    LeGradientLength


{-| Specify the alignment to apply to symbol legends rows and columns. For more
details see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leGridAlign : GridAlign -> LegendProperty
leGridAlign =
    LeGridAlign


{-| Specify the horizontal text alignment for a legend label. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelAlign : HAlign -> LegendProperty
leLabelAlign =
    LeLabelAlign


{-| Specify the vertical text alignment for a legend label. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelBaseline : VAlign -> LegendProperty
leLabelBaseline =
    LeLabelBaseline


{-| Specify the text color for legend labels. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelColor : String -> LegendProperty
leLabelColor =
    LeLabelColor


{-| Specify the text font for legend labels. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelFont : String -> LegendProperty
leLabelFont =
    LeLabelFont


{-| Specify the font size in pixels for legend labels. For more details see
the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelFontSize : Num -> LegendProperty
leLabelFontSize =
    LeLabelFontSize


{-| Specify the font weight for legend labels. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelFontWeight : Value -> LegendProperty
leLabelFontWeight =
    LeLabelFontWeight


{-| Specify the maximum allowed length in pixels of a legend label. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelLimit : Num -> LegendProperty
leLabelLimit =
    LeLabelLimit


{-| Specify the horizontal pixel offset for a legend's symbols. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelOffset : Num -> LegendProperty
leLabelOffset =
    LeLabelOffset


{-| Specify the strategy to use for resolving overlap of labels in gradient
legends. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leLabelOverlap : OverlapStrategy -> LegendProperty
leLabelOverlap =
    LeLabelOverlap


{-| The offset in pixels by which to displace the legend from the data rectangle
and axes. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leOffset : Value -> LegendProperty
leOffset =
    LeOffset


{-| The name of the scale that maps to the legend symbols' opacities. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leOpacity : String -> LegendProperty
leOpacity =
    LeOpacity


{-| The orientation of the legend, determining where the legend is placed
relative to a chart’s data rectangle. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leOrient : LegendOrientation -> LegendProperty
leOrient =
    LeOrient


{-| The padding between the border and content of the legend group. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
lePadding : Value -> LegendProperty
lePadding =
    LePadding


{-| The vertical padding between entries in a symbol legend. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leRowPadding : Num -> LegendProperty
leRowPadding =
    LeRowPadding


{-| The name of the scale that maps to the legend symbols' shapes. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leShape : String -> LegendProperty
leShape =
    LeShape


{-| The name of the scale that maps to the legend symbols' sizes. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSize : String -> LegendProperty
leSize =
    LeSize


{-| The name of the scale that maps to the legend symbols' strokes. For more
details see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leStroke : String -> LegendProperty
leStroke =
    LeStroke


{-| Specify the border colour of an enclosing legend rectangle. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leStrokeColor : String -> LegendProperty
leStrokeColor =
    LeStrokeColor


{-| Specify the stroke width of the color of a legend's gradient border. For more
details see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leStrokeWidth : Num -> LegendProperty
leStrokeWidth =
    LeStrokeWidth


{-| Specify the fill colour for legend symbols. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolFillColor : String -> LegendProperty
leSymbolFillColor =
    LeSymbolFillColor


{-| Specify the offset in pixels between legend labels their corresponding symbol
or gradient. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolOffset : Num -> LegendProperty
leSymbolOffset =
    LeSymbolOffset


{-| Specify the default symbol area size in square pixel units. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolSize : Num -> LegendProperty
leSymbolSize =
    LeSymbolSize


{-| Specify the border colour for legend symbols. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolStrokeColor : String -> LegendProperty
leSymbolStrokeColor =
    LeSymbolStrokeColor


{-| Specify the default symbol border width used in a legend. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolStrokeWidth : Num -> LegendProperty
leSymbolStrokeWidth =
    LeSymbolStrokeWidth


{-| Specify the default symbol shape used in a legend. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leSymbolType : Symbol -> LegendProperty
leSymbolType =
    LeSymbolType


{-| The name of the scale that maps to the legend symbols' stroke dashing. For more
details see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leStrokeDash : String -> LegendProperty
leStrokeDash =
    LeStrokeDash


{-| The desired number of tick values for quantitative legends. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTickCount : Int -> LegendProperty
leTickCount =
    LeTickCount


{-| Specify the title for the legend (none by default). For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitle : String -> LegendProperty
leTitle =
    LeTitle


{-| Specify the horizontal alignment for a legend title. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleAlign : HAlign -> LegendProperty
leTitleAlign =
    LeTitleAlign


{-| Specify the vertical alignment for a legend title. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleBaseline : VAlign -> LegendProperty
leTitleBaseline =
    LeTitleBaseline


{-| Specify the text colour for a legend title. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleColor : String -> LegendProperty
leTitleColor =
    LeTitleColor


{-| Specify the text font for a legend title. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleFont : String -> LegendProperty
leTitleFont =
    LeTitleFont


{-| Specify the font size in pixel units for a legend title. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleFontSize : Num -> LegendProperty
leTitleFontSize =
    LeTitleFontSize


{-| Specify the font weight for a legend title. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleFontWeight : Value -> LegendProperty
leTitleFontWeight =
    LeTitleFontWeight


{-| Specify the maximum allowed length in pixels of a legend title. For more details
see the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitleLimit : Num -> LegendProperty
leTitleLimit =
    LeTitleLimit


{-| Specify the padding between the legend title and entries. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leTitlePadding : Value -> LegendProperty
leTitlePadding =
    LeTitlePadding


{-| The type of legend to specify. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leType : LegendType -> LegendProperty
leType =
    LeType


{-| Explicitly set visible legend values. For more details see the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leValues : List Value -> LegendProperty
leValues =
    LeValues


{-| The integer z-index indicating the layering of the legend group relative to
other axis, mark and legend groups. The default value is 0.For more details see
the [Vega legend documentation](https://vega.github.io/vega/docs/legends/)
-}
leZIndex : Int -> LegendProperty
leZIndex =
    LeZIndex


{-| Shape of a line indicating path between nodes.
-}
type LinkShape
    = LinkLine
    | LinkArc
    | LinkCurve
    | LinkDiagonal
    | LinkOrthogonal


{-| Convenience function to provide a textual version of a link shape used in a
LinkPath transformation.
-}
linkShapeLabel : LinkShape -> String
linkShapeLabel ls =
    case ls of
        LinkLine ->
            "line"

        LinkArc ->
            "arc"

        LinkCurve ->
            "curve"

        LinkDiagonal ->
            "diagonal"

        LinkOrthogonal ->
            "orthogonal"


{-| Specify the alignment to apply to grid rows and columns in a grid layout.
For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loAlign : GridAlign -> LayoutProperty
loAlign =
    LAlign


{-| Specify the bounds calculation method to use for determining the extent of a
sub-plot in a grid layout. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loBounds : BoundsCalculation -> LayoutProperty
loBounds =
    LBounds


{-| Specify the number of columns to include in a grid layout. If unspecified, a
single row with unlimited columns will be assumed. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loColumns : Num -> LayoutProperty
loColumns =
    LColumns


{-| Specify the band positioning in the interval [0,1] indicating where in a cell
a footer should be placed in a grid layout. For a column footer, 0 maps to the left
edge of the footer cell and 1 to right edge. For a row footer, the range maps from
top to bottom. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loFooterBand : Num -> LayoutProperty
loFooterBand =
    LFooterBand


{-| Specify the band positioning in the interval [0,1] indicating where in a cell
a footer should be placed in a grid layout. For a column footer, 0 maps to the left
edge of the footer cell and 1 to right edge. For a row footer, the range maps from
top to bottom. This version allows row and column settings to be specified separately.
For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loFooterBandRC : Num -> Num -> LayoutProperty
loFooterBandRC r c =
    LFooterBandRC r c


{-| Specify the band positioning in the interval [0,1] indicating where in a cell
a header should be placed in a grid layout. For a column header, 0 maps to the left
edge of the header cell and 1 to right edge. For a row footer, the range maps from
top to bottom. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loHeaderBand : Num -> LayoutProperty
loHeaderBand =
    LHeaderBand


{-| Specify the band positioning in the interval [0,1] indicating where in a cell
a header should be placed in a grid layout. For a column header, 0 maps to the left
edge of the footer cell and 1 to right edge. For a row header, the range maps from
top to bottom. This version allows row and column settings to be specified separately.
For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loHeaderBandRC : Num -> Num -> LayoutProperty
loHeaderBandRC r c =
    LHeaderBandRC r c


{-| Specify the orthogonal offset in pixels by which to displace grid header, footer
and title cells from their position along the edge of a grid layout.
For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loOffset : Num -> LayoutProperty
loOffset =
    LOffset


{-| Specify the orthogonal offset in pixels by which to displace grid header, footer
and title cells from their position along the edge of a grid layout. This version
allows row and column settings to be specified separately. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loOffsetRC : Num -> Num -> LayoutProperty
loOffsetRC r c =
    LOffsetRC r c


{-| Specify the padding in pixels to add between elements within rows and columns
of a grid layout. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loPadding : Num -> LayoutProperty
loPadding =
    LPadding


{-| Specify the padding in pixels to add between elements within rows and columns
of a grid layout. This version allows row and column settings to be specified
separately. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loPaddingRC : Num -> Num -> LayoutProperty
loPaddingRC r c =
    LPaddingRC r c


{-| Specify where in a cell of a grid layout, a title should be placed. For a
column title, 0 maps to the left edge of the title cell and 1 to right edge. The
default value is 0.5, indicating a centered position. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loTitleBand : Num -> LayoutProperty
loTitleBand =
    LTitleBand


{-| Specify where in a cell of a grid layout, a title should be placed. For a
column title, 0 maps to the left edge of the title cell and 1 to right edge. The
default value is 0.5, indicating a centered position. This version allows row
and column settings to be specified separately. For details see the
[Vega layout documentation](https://vega.github.io/vega/docs/layout/)
-}
loTitleBandRC : Num -> Num -> LayoutProperty
loTitleBandRC r c =
    LTitleBandRC r c


{-| Specify the name for the output field of a link path in a linkPath transformation.
If not specified, the default is "path". For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpAs : String -> LinkPathProperty
lpAs =
    LPAs


{-| Specify the orientation of a link path in a linkPath transformation. One of
`vertical` (default), `horizontal` or `radial`. If a radial orientation is specified,
x and y coordinate parameters will instead be interpreted as an angle (in radians)
and radius, respectively. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpOrient : Str -> LinkPathProperty
lpOrient =
    LPOrient


{-| Specify the shape of a link path in a linkPath transformation. One of `line`
(default), `arc`, `curve`, `diagonal`, or `orthogonal`. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpShape : Str -> LinkPathProperty
lpShape =
    LPShape


{-| Specify the data field for the source x-coordinate in a linkPath transformation.
The default is `source.x`. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpSourceX : Field -> LinkPathProperty
lpSourceX =
    LPSourceX


{-| Specify the data field for the source y-coordinate in a linkPath transformation.
The default is `source.y`. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpSourceY : Field -> LinkPathProperty
lpSourceY =
    LPSourceY


{-| Specify the data field for the target x-coordinate in a linkPath transformation.
The default is `target.x`. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpTargetX : Field -> LinkPathProperty
lpTargetX =
    LPTargetX


{-| Specify the data field for the target y-coordinate in a linkPath transformation.
The default is `target.y`. For details, see the
[Vega linkpath transform documentation](https://vega.github.io/vega/docs/transforms/linkpath/)
-}
lpTargetY : Field -> LinkPathProperty
lpTargetY =
    LPTargetY


{-| Specify the output fields in which to write data found in the secondary
stream of a lookup. For details see the
[Vega lookup transform documentation](https://vega.github.io/vega/docs/transforms/lookup/)
-}
luAs : List String -> LookupProperty
luAs =
    LAs


{-| Specify the default value to assign if lookup fails in a lookup transformation.
For details see the
[Vega lookup transform documentation](https://vega.github.io/vega/docs/transforms/lookup/)
-}
luDefault : Value -> LookupProperty
luDefault =
    LDefault


{-| Specify the data fields to copy from the secondary stream to the primary
stream in a lookup transformation. If not specified, a reference to the full data
record is copied.. For details see the
[Vega lookup transform documentation](https://vega.github.io/vega/docs/transforms/lookup/)
-}
luValues : List Field -> LookupProperty
luValues =
    LValues


{-| The horizontal alignment of a text or image mark. This may be specified directly,
via a field, a signal or any other text-generating value. To guarantee valid
alignment type names, use `hAlignLabel`. For example:

    << mark Text
        [ mEncode
            [ enEnter [ maAlign [ vStr (hAlignLabel AlignCenter) ] ] ]
        ]

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maAlign : List Value -> MarkProperty
maAlign =
    MAlign


{-| The rotation angle of the text in degrees in a text mark. This may be specified
directly, via a field, a signal or any other number-generating value. For further
details see the [Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maAngle : List Value -> MarkProperty
maAngle =
    MAngle


{-| Indicates whether the image aspect ratio should be preserved in an image mark.
This may be specified directly, via a field, a signal or any other Boolean-generating
value. For further details see the
[Vega image mark documentation](https://vega.github.io/vega/docs/marks/image/).
-}
maAspect : List Value -> MarkProperty
maAspect =
    MAspect


{-| The vertical baseline of a text or image mark. This may be specified directly,
via a field, a signal or any other text-generating value. To guarantee valid
alignment type names, use `vAlignLabel`. For example:

        << mark Text
            [ mEncode
                [ enEnter [ maBaseline [ vStr (vAlignLabel AlignTop) ] ] ]
            ]

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maBaseline : List Value -> MarkProperty
maBaseline =
    MBaseline


{-| The corner radius in pixels of an arc or rect mark. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maCornerRadius : List Value -> MarkProperty
maCornerRadius =
    MCornerRadius


{-| The mouse cursor used over the mark. This may be specified directly, via a
field, a signal or any other text-generating value. To guarantee valid cursor type
names, use `cursorLabel`. For example:

    TODO: Add cursorLabel example once API confirmed

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maCursor : List Value -> MarkProperty
maCursor =
    MCursor


{-| Indicates if the current data point in a linear mark is defined. If false, the
corresponding line/trail segment will be omitted, creating a “break”. This may be
specified directly, via a field, a signal or any other Boolean-generating value.
For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maDefined : List Value -> MarkProperty
maDefined =
    MDefined


{-| The direction text is rendered in a text mark. This determines which side is
truncated in response to the text size exceeding the value of the limit parameter.
This may be specified directly, via a field, a signal or any other string-generating
value. To guarantee valid direction type names, use `dirLabel`. For example:

    TODO: Add dirLabel example once API confirmed

For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).

-}
maDir : List Value -> MarkProperty
maDir =
    MDir


{-| The horizontal offset in pixels (before rotation), between the text and anchor
point of a text mark. This may be specified directly, via a field, a signal or any
other number-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maDx : List Value -> MarkProperty
maDx =
    MdX


{-| The vertical offset in pixels (before rotation), between the text and anchor
point of a text mark. This may be specified directly, via a field, a signal or any
other number-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maDy : List Value -> MarkProperty
maDy =
    MdY


{-| The ellipsis string for text truncated in response to the limit parameter of
a text mark. This may be specified directly, via a field, a signal or any other
string-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maEllipsis : List Value -> MarkProperty
maEllipsis =
    MEllipsis


{-| The end angle in radians clockwise from north for an arc mark. This may be
specified directly, via a field, a signal or any other number-generating value.
For further details see the
[Vega arc documentation](https://vega.github.io/vega/docs/marks/arc/).
-}
maEndAngle : List Value -> MarkProperty
maEndAngle =
    MEndAngle


{-| The fill color of a mark. This may be specified directly, via a field,
a signal or any other color-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maFill : List Value -> MarkProperty
maFill =
    MFill


{-| The fill opacity of a mark in the range [0 1]. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maFillOpacity : List Value -> MarkProperty
maFillOpacity =
    MFillOpacity


{-| The typeface used by a text mark. This can be a generic font description such
as `sans-serif`, `monospace` or any specific font name made accessible via a css
font definition. This may be specified directly, via a field, a signal or any other
string-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maFont : List Value -> MarkProperty
maFont =
    MFont


{-| The font size in pixels used by a text mark. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maFontSize : List Value -> MarkProperty
maFontSize =
    MFontSize


{-| The font style, such as `normal` or `italic` used by a text mark. This may be
specified directly, via a field, a signal or any other string-generating value.
For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maFontStyle : List Value -> MarkProperty
maFontStyle =
    MFontStyle


{-| The font weight, such as `normal` or `bold` used by a text mark. This may be
specified directly, via a field, a signal or any other string- or number-generating
value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maFontWeight : List Value -> MarkProperty
maFontWeight =
    MFontWeight


{-| Indicates if the visible group content should be clipped to the group’s
specified width and height. This may be specified directly, via a field, a signal
or any other Boolean-generating value. For further details see the
[Vega group mark documentation](https://vega.github.io/vega/docs/marks/group/).
-}
maGroupClip : List Value -> MarkProperty
maGroupClip =
    MGroupClip


{-| The width of a mark in pixels. This may be specified directly, via a field,
a signal or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maHeight : List Value -> MarkProperty
maHeight =
    MHeight


{-| A URL to load upon mouse click. If defined, the mark acts as a hyperlink. This
may be specified directly, via a field, a signal or any other text-generating value.
For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maHRef : List Value -> MarkProperty
maHRef =
    MHRef


{-| The inner radius in pixel units of an arc mark. This may be
specified directly, via a field, a signal or any other number-generating value.
For further details see the
[Vega arc documentation](https://vega.github.io/vega/docs/marks/arc/).
-}
maInnerRadius : List Value -> MarkProperty
maInnerRadius =
    MInnerRadius


{-| The interpolation style of a linear mark. This may be specified directly,
via a field, a signal or any other text-generating value. To guarantee valid
interpolation type names, use `markInterpolationLabel`. For example:

    TODO: Add markInterpolationLabel example once API confirmed

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maInterpolate : List Value -> MarkProperty
maInterpolate =
    MInterpolate


{-| The maximum length of a text mark in pixels (default 0, indicating no limit).
The text value will be automatically truncated if the rendered size exceeds this
limit. It may be specified directly, via a field, a signal or any other
number-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maLimit : List Value -> MarkProperty
maLimit =
    MLimit


{-| The opacity of a mark in the range [0 1]. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maOpacity : List Value -> MarkProperty
maOpacity =
    MOpacity


{-| The orientation of an area mark. With a vertical orientation, an area mark is
defined by the x, y, and (y2 or height) properties; with a horizontal orientation,
the y, x and (x2 or width) properties must be specified instead. The orientation
may be specified directly, via a field, a signal or any other text-generating value.
To guarantee valid orientation type names, use `markOrientationLabel`. For example:

    TODO: Add markOrientationLabel example once API confirmed

For further details see the
[Vega area mark documentation](https://vega.github.io/vega/docs/marks/area/).

-}
maOrient : List Value -> MarkProperty
maOrient =
    MOrient


{-| The outer radius in pixel units of an arc mark. This may be
specified directly, via a field, a signal or any other number-generating value.
For further details see the
[Vega arc documentation](https://vega.github.io/vega/docs/marks/arc/).
-}
maOuterRadius : List Value -> MarkProperty
maOuterRadius =
    MOuterRadius


{-| The padding angle in radians clockwise from north for an arc mark. This may be
specified directly, via a field, a signal or any other number-generating value.
For further details see the
[Vega arc documentation](https://vega.github.io/vega/docs/marks/arc/).
-}
maPadAngle : List Value -> MarkProperty
maPadAngle =
    MPadAngle


{-| The [SVG path string](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
describing the geometry of a path mark. This may be specified directly, via a field,
a signal or any other text-generating value. For further details see the
[Vega path mark documentation](https://vega.github.io/vega/docs/marks/path/).
-}
maPath : List Value -> MarkProperty
maPath =
    MPath


{-| Polar coordinate radial offset in pixels, relative to the origin determined
by the x and y properties of a text mark. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maRadius : List Value -> MarkProperty
maRadius =
    MRadius


{-| Type of visual mark used to represent data in the visualization. For further
details see the
[Vega mark type documentation](https://vega.github.io/vega/docs/marks/#types).
-}
type Mark
    = Arc
    | Area
    | Image
    | Group
    | Line
    | Path
    | Rect
    | Rule
    | Shape
    | Symbol
    | Text
    | Trail


{-| Create a single mark definition.

    TODO: XXX

-}
mark : Mark -> List TopMarkProperty -> List Spec -> List Spec
mark mark mps =
    (::) (JE.object (MType mark :: mps |> List.concatMap topMarkProperty))


{-| Indicates mark interpolation style.
-}
type MarkInterpolation
    = Basis
    | Cardinal
    | CatmullRom
    | Linear
    | Monotone
    | Natural
    | Stepwise
    | StepAfter
    | StepBefore


{-| A convenience function for generating a text string representing a given mark
interpolation type. This can be used instead of specifying an interpolation type
as a literal string to avoid problems of mistyping the interpolation name.

    signals
       << signal "interp" [ siValue (markInterpolationLabel Linear |> Str) ]

-}
markInterpolationLabel : MarkInterpolation -> String
markInterpolationLabel interp =
    case interp of
        Basis ->
            "basis"

        Cardinal ->
            "cardinal"

        CatmullRom ->
            "catmull-rom"

        Linear ->
            "linear"

        Monotone ->
            "monotone"

        Natural ->
            "natural"

        Stepwise ->
            "step"

        StepAfter ->
            "step-after"

        StepBefore ->
            "step-before"


{-| A convenience function for generating a text string representing a given mark
orientation type. This can be used instead of specifying an orientation type as
a literal string to avoid problems of mistyping its name.

    TODO: XXX Add example

-}
markOrientationLabel : Orientation -> String
markOrientationLabel orient =
    case orient of
        Horizontal ->
            "horizontal"

        Vertical ->
            "vertical"

        Radial ->
            "radial"


{-| Create the marks used in the visualization.

    TODO: XXX

-}
marks : List Spec -> ( VProperty, Spec )
marks axs =
    ( VMarks, JE.list axs )


{-| A shape instance that provides a drawing method to invoke within the renderer.
Shape instances can not be specified directly, they must be generated by a data
transform such as geoshape. For further details see the
[Vega shape documentation](https://vega.github.io/vega/docs/marks/shape/).
-}
maShape : List Value -> MarkProperty
maShape =
    -- TODO: Specify how a shape generator can be stored in a Value
    MShape


{-| The area in pixels of the bounding box of point-based mark such as a symbol.
Note that this value sets the area of the mark; the side lengths will increase with
the square root of this value. This may be specified directly, via a field, a signal
or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maSize : List Value -> MarkProperty
maSize =
    MSize


{-| The start angle in radians clockwise from north for an arc mark. This may be
specified directly, via a field, a signal or any other number-generating value.
For further details see the
[Vega arc documentation](https://vega.github.io/vega/docs/marks/arc/).
-}
maStartAngle : List Value -> MarkProperty
maStartAngle =
    MStartAngle


{-| The stroke color of a mark. This may be specified directly, via a field,
a signal or any other color-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStroke : List Value -> MarkProperty
maStroke =
    MStroke


{-| The stroke cap ending style for a mark. This may be specified directly, via a
field, a signal or any other text-generating value. To guarantee valid stroke cap
names, use `strokeCapLabel`. For example:

    TODO: Add strokeCapLabel example once API confirmed

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maStrokeCap : List Value -> MarkProperty
maStrokeCap =
    MStrokeCap


{-| The stroke dash style of a mark. This may be specified directly, via a
field, a signal or any other number array-generating value. The array should consist
of alternating dash-gap lengths in pixels. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStrokeDash : List Value -> MarkProperty
maStrokeDash =
    MStrokeDash


{-| A mark's offset of the first stroke dash in pixels. This may be specified
directly, via a field, a signal or any other number-generating value. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStrokeDashOffset : List Value -> MarkProperty
maStrokeDashOffset =
    MStrokeDashOffset


{-| The stroke join method for a mark. This may be specified directly, via a
field, a signal or any other text-generating value. To guarantee valid stroke join
names, use `strokeJoinLabel`. For example:

    TODO: Add strokeJoinLabel example once API confirmed

For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).

-}
maStrokeJoin : StrokeJoin -> MarkProperty
maStrokeJoin =
    MStrokeJoin


{-| The miter limit at which to bevel a line join for a mark. This may be specified
directly, via a field, a signal or any other number-generating value. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStrokeMiterLimit : List Value -> MarkProperty
maStrokeMiterLimit =
    MStrokeMiterLimit


{-| The stroke opacity of a mark in the range [0 1]. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStrokeOpacity : List Value -> MarkProperty
maStrokeOpacity =
    MStrokeOpacity


{-| The stroke width of a mark in pixels. This may be specified directly, via a
field, a signal or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maStrokeWidth : List Value -> MarkProperty
maStrokeWidth =
    MStrokeWidth


{-| A symbol shape that describes a symbol mark. For correct sizing, custom shape
paths should be defined within a square with coordinates ranging from -1 to 1 along
both the x and y dimensions. Symbol definitions may be specified directly, via a
field, a signal or any other text-generating value. To guarantee valid symbol type
names, use `symbolLabel`. For example:

    TODO: Add symbol example once API confirmed

For further details see the
[Vega symbol documentation](https://vega.github.io/vega/docs/marks/symbol/).

-}
maSymbol : List Value -> MarkProperty
maSymbol =
    MSymbol


{-| The interpolation tension in the range [0, 1] of a linear mark. Applies only
to cardinal and catmull-rom interpolators. This may be specified directly, via a
field, a signal or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maTension : List Value -> MarkProperty
maTension =
    MTension


{-| The text to display in a text mark. This may be specified directly,
via a field, a signal or any other string-generating value. For further details
see the [Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maText : List Value -> MarkProperty
maText =
    MText


{-| Polar coordinate angle in radians, relative to the origin determined by the
x and y properties of a text mark. This may be specified directly, via a field,
a signal or any other number-generating value. For further details see the
[Vega text mark documentation](https://vega.github.io/vega/docs/marks/text/).
-}
maTheta : List Value -> MarkProperty
maTheta =
    MTheta


{-| The tooltip text to show upon mouse hover over a mark. This may be specified
directly, via a field, a signal or any other text-generating value. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maTooltip : List Value -> MarkProperty
maTooltip =
    MTooltip


{-| The URL of an image file to be displayed as an image mark. This may be specified
directly, via a field, a signal or any other text-generating value. For further
details see the [Vega image mark documentation](https://vega.github.io/vega/docs/marks/image/).
-}
maUrl : List Value -> MarkProperty
maUrl =
    MUrl


{-| The width of a mark in pixels. This may be specified directly, via a field,
a signal or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maWidth : List Value -> MarkProperty
maWidth =
    MWidth


{-| The primary x-coordinate of a mark in pixels. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maX : List Value -> MarkProperty
maX =
    MX


{-| The secondary x-coordinate of a mark in pixels. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maX2 : List Value -> MarkProperty
maX2 =
    MX2


{-| The centre x-coordinate of a mark in pixels. This is an alternative to `maX`
or `maX2`, not an addition. It may be specified directly, via a field, a signal
or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maXC : List Value -> MarkProperty
maXC =
    MXC


{-| The primary y-coordinate of a mark in pixels. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maY : List Value -> MarkProperty
maY =
    MY


{-| The secondary y-coordinate of a mark in pixels. This may be specified directly,
via a field, a signal or any other number-generating value. For further details
see the [Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maY2 : List Value -> MarkProperty
maY2 =
    MY2


{-| The centre y-coordinate of a mark in pixels. This is an alternative to `maY`
or `maY2`, not an addition. It may be specified directly, via a field, a signal
or any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maYC : List Value -> MarkProperty
maYC =
    MYC


{-| An integer z-index indicating the layering order of sibling mark items. The
default value is 0. Higher values (1) will cause marks to be drawn on top of those
with lower z-index values. Setting the z-index as an encoding property only affects
ordering among sibling mark items; it will not change the layering relative to other
mark definitions. The z-index may be specified directly, via a field, a signal or
any other number-generating value. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
maZIndex : List Value -> MarkProperty
maZIndex =
    MZIndex


{-| Indicates whether or how marks should be clipped to a specified shape.
For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mClip : Clip -> TopMarkProperty
mClip =
    MClip


{-| Specify a description of a mark, useful for inline comments. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mDescription : String -> TopMarkProperty
mDescription =
    MDescription


{-| Specify a set of visual encoding rules for a mark. For further details see
the [Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mEncode : List EncodingProperty -> TopMarkProperty
mEncode =
    MEncode


{-| Specify the data source to be visualized by a mark. If not specified, a single
element data set containing an empty object is assumed. The source can either be
a data set to use or a faceting directive to subdivide a data set across a set
of group marks. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mFrom : List Source -> TopMarkProperty
mFrom =
    MFrom


{-| Assemble a group of top-level marks. This can be used to create nested groups
of marks within a `Group` mark (including further nested group specifications) by
suppyling the specification as a series of properties. For example,

TODO: Check for valid syntax in example.

    marks
        << mark Group
            [ mFrom [ srData (str "myData") ]
            , mGroup [ mkGroup1 [], mkGroup2 [], mkGroup3 [] ]
            ]

For details on the group mark see the
[Vega group mark documentation](https://vega.github.io/vega/docs/marks/group/).

-}
mGroup : List ( VProperty, Spec ) -> TopMarkProperty
mGroup =
    MGroup


{-| Specify whether a mark can serve as an input event source. If false, no
mouse or touch events corresponding to the mark will be generated. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mInteractive : Boo -> TopMarkProperty
mInteractive =
    MInteractive


{-| Specify a data field to use as a unique key for data binding. When a
visualization’s data is updated, the key value will be used to match data elements
to existing mark instances. Use a key field to enable object constancy for
transitions over dynamic data. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mKey : Field -> TopMarkProperty
mKey =
    MKey


{-| Specify a unique name for a mark. This name can be used to refer to the mark
within an event stream definition. SVG renderers will add this name value as a
CSS class name on the enclosing SVG group (g) element containing the mark instances.
For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mName : String -> TopMarkProperty
mName =
    MName


{-| Specify a set of triggers for modifying a mark's properties in response to
signal changes. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mOn : List Trigger -> TopMarkProperty
mOn =
    MOn


{-| Specify a comparator for sorting mark items. The sort order will determine
the default rendering order. The comparator is defined over generated scenegraph
items and sorting is performed after encodings are computed, allowing items to
be sorted by size or position. To sort by underlying data properties in addition
to mark item properties, append the prefix `datum` to a field name. For further
details see the [Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mSort : List Comparator -> TopMarkProperty
mSort =
    MSort


{-| Specifye the names of custom styles to apply to a mark. A style is a named
collection of mark property defaults defined within the configuration. These
properties will be applied to the mark’s enter encoding set, with later styles
overriding earlier styles. Any properties explicitly defined within the mark’s
`encode` block will override a style default. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mStyle : List String -> TopMarkProperty
mStyle =
    MStyle


{-| Specify a set of post-encoding transforms to be applied after any encode
blocks, that operate directly on mark scenegraph items (not backing data objects).
These can be useful for performing layout with transforms that can set x, y,
width, height, etc. properties. Only data transforms that do not generate or
filter data objects should be used. For further details see the
[Vega mark documentation](https://vega.github.io/vega/docs/marks).
-}
mTransform : List Transform -> TopMarkProperty
mTransform =
    MTransform


{-| Specify a desired 'nice' temporal interval between labelled tick points. For
full details see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/).
-}
nInterval : TimeUnit -> Int -> ScaleNice
nInterval tu step =
    NInterval tu step


{-| Specify a desired tick count for a human-friendly 'nice' scale range. For full
details see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/).
-}
nTickCount : Int -> ScaleNice
nTickCount =
    NTickCount


{-| A numeric literal used for functions that can accept a literal or signal.
-}
num : Float -> Num
num =
    Num


{-| An expression that will be evaluated as a numeric value.
-}
numExpr : Expr -> Num
numExpr =
    NumExpr


{-| A list of numeric literals used for functions that can accept literals or signal.
-}
nums : List Float -> Num
nums =
    Nums


{-| A signal that will provide a numeric value.
-}
numSignal : String -> Num
numSignal =
    NumSignal


{-| A list of signals that will provide numeric values.
-}
numSignals : List String -> Num
numSignals =
    NumSignals


{-| Specify a named signal to drive the type of offsetting to apply when
performing a stack transform. For details see the
[Vega tack transform documentation](https://vega.github.io/vega/docs/transforms/stack)
-}
ofSignal : String -> StackOffset
ofSignal =
    OfSignal


{-| Adds list of triggers to the given data table.
For details see the [Vega trigger documentation](https://vega.github.io/vega/docs/triggers).
-}
on : List Trigger -> DataTable -> DataTable
on triggerSpecs dTable =
    dTable ++ [ ( "on", JE.list triggerSpecs ) ]


{-| Type of aggregation operation. See the
[Vega aggregate documentation](https://vega.github.io/vega/docs/transforms/aggregate/#ops)
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
    | Stdevp
    | Sum
    | Valid
    | Variance
    | Variancep


{-| Indicate an ordering, usually when sorting.
-}
type Order
    = Ascend
    | Descend
    | OrderSignal String


{-| Indicates an orientation, for example, for a link path.
-}
type Orient
    = OHorizontal
    | OVertical
    | ORadial


{-| Indicates desired orientation of a mark, legend or link path (e.g. horizontally or vertically
oriented bars). Note that not all can use `Radial` orientation.
-}
type Orientation
    = Horizontal
    | Vertical
    | Radial


{-| Indicates an sort order determined by a named signal for comparison operations.
For details see the [Vega type comparison documentation](https://vega.github.io/vega/docs/types/#Compare).
-}
orSignal : String -> Order
orSignal =
    OrderSignal


{-| Type of overlap strategy to be applied when there is not space to show all
items on an axis. See the
[Vega axes documentation](https://vega.github.io/vega/docs/axes)
for more details.
-}
type OverlapStrategy
    = ONone
    | OParity
    | OGreedy


{-| The names to give the output fields of a packing transform. The default is
["x", "y", "r", "depth", "children"], where x and y are the layout coordinates,
r is the node radius, depth is the tree depth, and children is the count of a
node’s children in the tree. For more details, see the
[Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paAs : String -> String -> String -> String -> String -> PackProperty
paAs x y r depth children =
    PaAs x y r depth children


{-| Represents padding dimensions of a rectangular area in pixel units.
-}
type Padding
    = PSize Float
    | PEdges Float Float Float Float


{-| Set the padding around the visualization in pixel units. The way padding is
interpreted will depend on the `autosize` properties. See the
[Vega specification documentation](https://vega.github.io/vega/docs/specification/)
for details.

    TODO: XXX

-}
padding : Float -> ( VProperty, Spec )
padding p =
    ( VPadding, paddingSpec (PSize p) )


{-| Set the padding around the visualization in pixel units in _left_, _top_,
_right_, _bottom_ order. The way padding is interpreted will depend on the
`autosize` properties. See the
[Vega specification documentation](https://vega.github.io/vega/docs/specification/)
for details.

    TODO: XXX

-}
paddings : Float -> Float -> Float -> Float -> ( VProperty, Spec )
paddings l t r b =
    ( VPadding, paddingSpec (PEdges l t r b) )


{-| The data field corresponding to a numeric value for the node in a packing
transform. The sum of values for a node and all its descendants is available on
the node object as the value property. If radius is null, this field determines
the node size. For details, see the
[Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paField : Field -> PackProperty
paField =
    PaField


{-| The approximate padding to include between packed circles. For details, see
the [Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paPadding : Num -> PackProperty
paPadding =
    PaPadding


{-| An explicit node radius to use in a packing transform. If null (the default),
the radius of each leaf circle is derived from the field value. For details, see
the [Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paRadius : Maybe Field -> PackProperty
paRadius =
    PaRadius


{-| Indicates the parsing rules when processing some data text. The parameter is
a list of tuples where each corresponds to a field name paired with its desired
data type. Typically used when specifying a data url.
-}
parse : List ( String, DataType ) -> Format
parse =
    Parse


{-| The size of a packing layout, provided as in width height order. For details,
see the [Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paSize : Value -> Value -> PackProperty
paSize w h =
    PaSize w h


{-| A comparator for sorting sibling nodes in a packing transform. The inputs to
the comparator are tree node objects, not input data objects. For details, see
the [Vega pack transform documentation](https://vega.github.io/vega/docs/transforms/pack/)
-}
paSort : List Comparator -> PackProperty
paSort =
    PaSort


{-| The output fields for the computed start and end angles for each arc in a pie
transform. For details see the
[Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
piAs : String -> String -> PieProperty
piAs start end =
    PiAs start end


{-| The end angle in radians in a pie chart transform. The default is 2 PI
indicating the final slice ends 'north'. For details see the
[Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
piEndAngle : Num -> PieProperty
piEndAngle =
    PiEndAngle


{-| The field to encode with angular spans in a pie chart transform. For details
see the [Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
piField : Field -> PieProperty
piField =
    PiField


{-| Indicates whether or not pie slices should be stored in angular size order.
For details see the
[Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
piSort : Boo -> PieProperty
piSort =
    PiSort


{-| The starting angle in radians in a pie chart transform. The default is 0
indicating that the first slice starts 'north'. For details see the
[Vega pie transform documentation](https://vega.github.io/vega/docs/transforms/pie/)
-}
piStartAngle : Num -> PieProperty
piStartAngle =
    PiStartAngle


{-| Specify a projection’s center, a two-element array of longitude and latitude
in degrees. The default value is [0, 0].

    pr =
        projections
            << projection "myProjection"
                [ prType Mercator
                , prCenter (nums [ 40, -20 ])
                ]

For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)

-}
prCenter : Num -> ProjectionProperty
prCenter =
    PrCenter


{-| Specify a projection’s clipping circle radius to the specified angle in degrees.
A value of zero will switches to antimeridian cutting rather than small-circle
clipping. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prClipAngle : Num -> ProjectionProperty
prClipAngle =
    PrClipAngle


{-| Specify a projection’s viewport clip extent to the specified bounds in pixels.
The extent bounds should be specified as an array of four numbers in [x0, y0, x1, y1]
order where x0 is the left-side of the viewport, y0 is the top, x1 is the right
and y1 is the bottom. For details see the
[Vega documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prClipExtent : Num -> ProjectionProperty
prClipExtent =
    PrClipExtent


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prCoefficient : Num -> ProjectionProperty
prCoefficient =
    PrCoefficient


{-| Specify a custom map projection type. Custom types need to be registered
with the vega runtime. For details, see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#register)
-}
prCustom : Str -> Projection
prCustom =
    Proj


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prDistance : Num -> ProjectionProperty
prDistance =
    PrDistance


{-| Specify the display region into which the projection should be automatically fit.
Used in conjunction with [prFit](#prFit). The region bounds should be specified
as an array of four numbers in [x0, y0, x1, y1] order where x0 is the left-side,
y0 is the top, x1 is the right and y1 is the bottom. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prExtent : Num -> ProjectionProperty
prExtent =
    PrExtent


{-| Specify the GeoJSON data to which a projection should attempt to automatically
fit by setting its translate and scale values. If the parameter is object-valued,
it should be a GeoJSON Feature or FeatureCollection. If array-valued, each array
member may be a GeoJSON Feature, FeatureCollection, or a sub-array of GeoJSON
Features. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prFit : Spec -> ProjectionProperty
prFit =
    PrFit


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prFraction : Num -> ProjectionProperty
prFraction =
    PrFraction


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prLobes : Num -> ProjectionProperty
prLobes =
    PrLobes


{-| Represents a global map projection type. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections).
-}
type Projection
    = Albers
    | AlbersUsa
    | AzimuthalEqualArea
    | AzimuthalEquidistant
    | ConicConformal
    | ConicEqualArea
    | ConicEquidistant
    | Equirectangular
    | Gnomonic
    | Mercator
    | Orthographic
    | Stereographic
    | TransverseMercator
    | Proj Str


{-| Create a single map projection for transforming geo data onto a plane.

    TODO: XXX

-}
projection : String -> List ProjectionProperty -> List Spec -> List Spec
projection name pps =
    (::) (JE.object (( "name", JE.string name ) :: List.map projectionProperty pps))


{-| A convenience function for generating a string representing a given projection
type. This can be used instead of specifying a projection type as a literal string
to avoid problems of mistyping its name.

    TODO: XXX Provide example

-}
projectionLabel : Projection -> String
projectionLabel proj =
    case proj of
        Albers ->
            "Albers"

        AlbersUsa ->
            "AlbersUsa"

        AzimuthalEqualArea ->
            "AzimuthalEqualArea"

        AzimuthalEquidistant ->
            "AzimuthalEquidistant"

        ConicConformal ->
            "ConicConformal"

        ConicEqualArea ->
            "ConicEqualArea"

        ConicEquidistant ->
            "ConicEquidistant"

        Equirectangular ->
            "Equirectangular"

        Gnomonic ->
            "Gnomonic"

        Mercator ->
            "Mercator"

        Orthographic ->
            "Orthographic"

        Stereographic ->
            "Stereographic"

        TransverseMercator ->
            "TransverseMercator"

        Proj str ->
            strString str


{-| Create the projections used to map geographic data onto a plane.

    pr =
        projections
            << projection "myProj" [ prType Orthographic ]
            << projection "myProj2" [ prType Albers, prRotate (nums [ -20, 15 ]) ]

-}
projections : List Spec -> ( VProperty, Spec )
projections prs =
    ( VProjections, JE.list prs )


{-| Specify the type of global map projection to use in a projection transformation.

    pr =
        projections
            << projection "myProj" [ prType Orthographic ]

If the projection type is to be generated from a signal, use the `prCustom` type
and specify the label of the signal to use.

    pr =
        projections
            << projection "myProj" [ prType (prCustom (strSignal "mySignal")) ]

For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#types)

-}
prType : Projection -> ProjectionProperty
prType =
    PrType


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prParallel : Num -> ProjectionProperty
prParallel =
    PrParallel


{-| Specify the default radius (in pixels) to use when drawing projected GeoJSON
Point and MultiPoint geometries. The default value is 4.5. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prPointRadius : Num -> ProjectionProperty
prPointRadius =
    PrPointRadius


{-| Specify a threshold for the projection’s adaptive resampling in pixels. This
corresponds to the Douglas–Peucker distance. If precision is not specified, the
projection’s current resampling precision which defaults to √0.5 ≅ 0.70710 is used.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prPrecision : Num -> ProjectionProperty
prPrecision =
    PrPrecision


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prRadius : Num -> ProjectionProperty
prRadius =
    PrRadius


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prRatio : Num -> ProjectionProperty
prRatio =
    PrRatio


{-| Specify a projection’s three-axis rotation angle. This should be a two- or
three-element array of numbers [lambda, phi, gamma] specifying the rotation angles
in degrees about each spherical axis. (These correspond to yaw, pitch and roll.).
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prRotate : Num -> ProjectionProperty
prRotate =
    PrRotate


{-| Specify a projection’s the projection’s scale factor to the specified value.
The default scale is projection-specific. The scale factor corresponds linearly
to the distance between projected points; however, scale factor values are not
equivalent across projections. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prScale : Num -> ProjectionProperty
prScale =
    PrScale


{-| Specify the width and height of the display region into which the projection
should be automatically fit. Used in conjunction with [prFit](#prFit) this is equivalent
to calling [prExtent](#prExtent) with the top-left position set to (0,0). The region
size should be specified as an array of two numbers in [width, height]. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prSize : Num -> ProjectionProperty
prSize =
    PrSize


{-| TODO: Add comments for function.
For details see the
[Vega map projectiondocumentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prSpacing : Num -> ProjectionProperty
prSpacing =
    PrSpacing


{-| TODO: Add comments for function.
For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prTilt : Num -> ProjectionProperty
prTilt =
    PrTilt


{-| Specify a translation offset to the specified two-element array [tx, ty]. If
not specified as a two element array, returns the current translation offset which
defaults to [480, 250]. The translation offset determines the pixel coordinates
of the projection’s center. The default translation offset places (0°,0°) at the
center of a 960×500 area. For details see the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections/#properties)
-}
prTranslate : Num -> ProjectionProperty
prTranslate =
    PrTranslate


{-| Provide a custom range default scheme. This can be use when a new named default
has been created as part of a config setting. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raCustom : String -> RangeDefault
raCustom =
    RCustom


{-| A scale range specified as a data reference object. This is used for specifying
ordinal scale ranges as a series of distinct field values. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raData : DataReference -> ScaleRange
raData =
    RData


{-| The range default for a scale range. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/).
-}
raDefault : RangeDefault -> ScaleRange
raDefault =
    RDefault


{-| Type of scale range. Can be used to set the default type of range to use
in a scale. The value of the default for each type can be set separately via
config settings. For details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#range-defaults).
-}
type RangeDefault
    = RWidth
    | RHeight
    | RSymbol
    | RCategory
    | RDiverging
    | ROrdinal
    | RRamp
    | RHeatmap
    | RCustom String


{-| A scale range specified as a list of numbers. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raNums : List Float -> ScaleRange
raNums =
    RNums


{-| A scale range specified as a list of colour schemes. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raScheme : String -> List ColorSchemeProperty -> ScaleRange
raScheme s =
    RScheme s


{-| A signal name used to generate a scale range. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raSignal : String -> ScaleRange
raSignal =
    RSignal


{-| The step size for a band scale range. For details see the
[Band Scales Vega documentation](https://vega.github.io/vega/docs/scales/).
-}
raStep : Value -> ScaleRange
raStep =
    RStep


{-| A scale range specified as a list of strings. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raStrs : List String -> ScaleRange
raStrs =
    RStrs


{-| A scale range specified as a list of values. For details see the
[Vega documentation](https://vega.github.io/vega/docs/scales/#range).
-}
raValues : List Value -> ScaleRange
raValues =
    RValues


{-| RGB color interpolation. The parameter is a gamma value to control the
brighness of the colour trajectory.
-}
rgb : Float -> CInterpolate
rgb =
    Rgb


{-| Used to indicate the type of scale transformation to apply. See the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#types) for more details.
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
    | ScQuantile
    | ScQuantize
    | ScBinLinear
    | ScBinOrdinal
    | ScCustom String


{-| Create a single scale used to map data values to visual properties.

    TODO: XXX

-}
scale : String -> List ScaleProperty -> List Spec -> List Spec
scale name sps =
    (::) (JE.object (( "name", JE.string name ) :: List.map scaleProperty sps))


{-| Describes the way a scale can be rounded to 'nice' numbers. For full details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/).
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
    | NTrue
    | NFalse
    | NTickCount Int


{-| Create the scales used to map data values to visual properties.

    TODO: XXX

-}
scales : List Spec -> ( VProperty, Spec )
scales scs =
    ( VScales, JE.list scs )


{-| Specify the alignment of elements within each step of a band scale, as a
fraction of the step size. Should be in the range [0,1]. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scAlign : Num -> ScaleProperty
scAlign =
    SAlign


{-| Specify the base of the logorithm used in a logarithmic scale. For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scBase : Num -> ScaleProperty
scBase =
    SBase


{-| Specify whether output values should be clamped to when using a quantitative
scale range (default false). If clamping is disabled and the scale is passed a
value outside the domain, the scale may return a value outside the range through
extrapolation. If clamping is enabled, the output value of the scale is always
within the scale’s range. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scClamp : Boo -> ScaleProperty
scClamp =
    SClamp


{-| Specify a custom named scale. For detaisl see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#types)
-}
scCustom : String -> Scale
scCustom =
    ScCustom


{-| Specify the domain of input data values for a scale. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scDomain : ScaleDomain -> ScaleProperty
scDomain =
    SDomain


{-| Specify the maximum value of a scale domain, overriding a `scDomain` setting.
This is only intended for use with scales having continuous domains. For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scDomainMax : Num -> ScaleProperty
scDomainMax =
    SDomainMax


{-| Specify the minimum value of a scale domain, overriding a `scDomain` setting.
This is only intended for use with scales having continuous domains. For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scDomainMin : Num -> ScaleProperty
scDomainMin =
    SDomainMin


{-| Insert a single mid-point value into a two-element scale domain. The mid-point
value must lie between the domain minimum and maximum values. This can be useful
for setting a midpoint for diverging color scales. It is only intended for use
with scales having continuous, piecewise domains. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scDomainMid : Num -> ScaleProperty
scDomainMid =
    SDomainMid


{-| Specify an array value that directly overrides the domain of a scale. This is
useful for supporting interactions such as panning or zooming a scale. The scale
may be initially determined using a data-driven domain, then modified in response
to user input by using this rawDomain function. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scDomainRaw : Value -> ScaleProperty
scDomainRaw =
    SDomainRaw


{-| Specify the exponent to be used in power scale. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scExponent : Num -> ScaleProperty
scExponent =
    SExponent


{-| Specify the interpolation method for a quantitative scale. For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scInterpolate : CInterpolate -> ScaleProperty
scInterpolate =
    SInterpolate


{-| Extend the range of a scale domain so it starts and ends on 'nice' round
values. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scNice : ScaleNice -> ScaleProperty
scNice =
    SNice


{-| Expand a scale domain to accommodate the specified number of pixels on each
end of a quantitative scale range or the padding between bands in a band scale.
For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scPadding : Num -> ScaleProperty
scPadding =
    SPadding


{-| Expand a scale domain to accommodate the specified number of pixels
between inner bands in a band scale. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scPaddingInner : Num -> ScaleProperty
scPaddingInner =
    SPaddingInner


{-| Expand a scale domain to accommodate the specified number of pixels
outside the outer bands in a band scale. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scPaddingOuter : Num -> ScaleProperty
scPaddingOuter =
    SPaddingOuter


{-| Specify the range of a scale representing the set of visual values. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scRange : ScaleRange -> ScaleProperty
scRange =
    SRange


{-| Specify the step size for band and point scales. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scRangeStep : Num -> ScaleProperty
scRangeStep =
    SRangeStep


{-| Reverse the order of a scale range. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scReverse : Boo -> ScaleProperty
scReverse =
    SReverse


{-| Specify whether to round numeric output values to integers. Helpful for
snapping to the pixel grid. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scRound : Boo -> ScaleProperty
scRound =
    SRound


{-| Specify the type of a named scale. For more details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scType : Scale -> ScaleProperty
scType =
    SType


{-| Specify whether or not a scale domain should include zero. The default is
true for linear, sqrt and power scales and false for all others. For more details
see the [Vega scale documentation](https://vega.github.io/vega/docs/scales/#properties)
-}
scZero : Boo -> ScaleProperty
scZero =
    SZero


{-| Bind a signal to an external input element such as a slider, selection list
or radio button group. For details see the
[Vega signal documentation](https://vega.github.io/vega/docs/signals).
-}
siBind : Bind -> SignalProperty
siBind =
    SiBind


{-| Indicates a rectangular side. Can be used to specify an axis position.
See the
[Vega axes documentation](https://vega.github.io/vega/docs/axes/#orientation)
for more details.
-}
type Side
    = SLeft
    | SRight
    | STop
    | SBottom


{-| Specify a text description of a signal, useful for inline documentation.
For details see the
[Vega signal documentation](https://vega.github.io/vega/docs/signals).
-}
siDescription : String -> SignalProperty
siDescription =
    SiDescription


{-| Create the signals used to add dynamism to the visualization.
For further details see the
[Vega signal documentation](https://vega.github.io/vega/docs/signals)

    TODO: XXX

-}
signals : List Spec -> ( VProperty, Spec )
signals sigs =
    ( VSignals, JE.list sigs )


{-| Create a single signal used to add a dynamic component to a visualization.
For further details see the
[Vega signal documentation](https://vega.github.io/vega/docs/signals)

    TODO: XXX

-}
signal : String -> List SignalProperty -> List Spec -> List Spec
signal sigName sps =
    (::) (JE.object (SiName sigName :: sps |> List.map signalProperty))


{-| A unique name to be given to a signal. Signal names should be contain only
alphanumeric characters (or “$”, or “_”) and may not start with a digit. Reserved
keywords that may not be used as signal names are "datum", "event", "item", and
"parent". For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals).
-}
siName : String -> SignalProperty
siName =
    SiName


{-| Specify event stream handlers for updating a signal value in response to
input events. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals).
-}
siOn : List (List EventHandler) -> SignalProperty
siOn =
    SiOn


{-| Specify whether a signal update expression should be automatically re-evaluated
when any upstream signal dependencies update. If false, the update expression will
only be run upon initialization. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals).
-}
siReact : Bool -> SignalProperty
siReact =
    SiReact


{-| Specify an update expression for a signal which may include other signals,
in which case the signal will automatically update in response to upstream signal
changes, so long as its react property is not false. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals).
-}
siUpdate : Expression -> SignalProperty
siUpdate =
    SiUpdate


{-| Specify the initial value of a signal. For details see the
[Vega documentation](https://vega.github.io/vega/docs/signals).
-}
siValue : Value -> SignalProperty
siValue =
    SiValue


{-| The field to be used when sorting.
-}
soByField : Str -> SortProperty
soByField =
    ByField


{-| A sorting operation.
-}
soOp : Operation -> SortProperty
soOp =
    Op


{-| Allow type of sorting to be customised. For details see the
[Vega sort documentation](https://vega.github.io/vega/docs/scales/#sort).
-}
type SortProperty
    = Ascending
    | Descending
    | Op Operation
    | ByField Str


{-| Name of the source for a set of marks. For details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#from)
-}
srData : Str -> Source
srData =
    SData


{-| Create a facet directive for a set of marks. The first parameter is the name
of the source data set from which the facet partitions are to be generated. The
second parameter is the name to be given to the generated facet source. Marks
defined with the faceted `group` mark can reference this data source name to
visualizae the local data partition. For details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#from)
-}
srFacet : String -> String -> List Facet -> Source
srFacet d name =
    SFacet d name


{-| Indicates the type of offsetting to apply when stacking. `OfZero` uses a baseline
at the foot of a stack, `OfCenter` uses a central baseline with stacking both above
and below it. `OfNormalize` rescales the stack to a common height while preserving
the relative size of stacked quantities. For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack)
-}
type StackOffset
    = OfZero
    | OfCenter
    | OfNormalize
    | OfSignal String


{-| Specify the names of the output fields for the computed start and end stack
values of a stack transform. For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
stAs : String -> String -> StackProperty
stAs y0 y1 =
    StAs y0 y1


{-| Specify the data field that determines the stack heights in a stack transform.
For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
stField : Field -> StackProperty
stField =
    StField


{-| Specify a grouping of fields with which to partition data into separate stacks
in a stack transform. For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
stGroupBy : List Field -> StackProperty
stGroupBy =
    StGroupBy


{-| Specify the baseline offset used in a stack transform. For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
stOffset : StackOffset -> StackProperty
stOffset =
    StOffset


{-| A string literal used for functions that can accept a string or an expression,
field or signal that generates a string.
-}
str : String -> Str
str =
    Str


{-| A list of string literals used for functions that can accept literals or signal.
-}
strs : List String -> Str
strs =
    Strs


{-| A signal that will provide a string value.
-}
strSignal : String -> Str
strSignal =
    StrSignal


{-| A list of signals that will provide string values.
-}
strSignals : List String -> Str
strSignals =
    StrSignals


{-| Type of stroke cap.
-}
type StrokeCap
    = CButt
    | CRound
    | CSquare


{-| A convenience function for generating a text string representing a given
stroke cap type. This can be used instead of specifying an stroke cap type
as a literal string to avoid problems of mistyping its name.

    signal "strokeCap" [ siValue (str (strokeCapLabel CRound) )]

-}
strokeCapLabel : StrokeCap -> String
strokeCapLabel cap =
    case cap of
        CButt ->
            "butt"

        CRound ->
            "round"

        CSquare ->
            "square"


{-| Type of stroke join.
-}
type StrokeJoin
    = JMiter
    | JRound
    | JBevel


{-| A convenience function for generating a text string representing a given
stroke join type. This can be used instead of specifying an stroke join type
as a literal string to avoid problems of mistyping its name.

TODO: XXX Example

-}
strokeJoinLabel : StrokeJoin -> String
strokeJoinLabel join =
    case join of
        JMiter ->
            "miter"

        JRound ->
            "round"

        JBevel ->
            "bevel"


{-| Specify the criteria for sorting values in a stack transform. For details see the
[Vega stack transform documentation](https://vega.github.io/vega/docs/transforms/stack/)
-}
stSort : List Comparator -> StackProperty
stSort =
    StSort


{-| Identifies a type of symbol.
-}
type Symbol
    = SymCircle
    | SymSquare
    | SymCross
    | SymDiamond
    | SymTriangleUp
    | SymTriangleDown
    | SymTriangleLeft
    | SymTriangleRight
    | SymPath String


{-| A convenience function for generating a text string representing a given
symbol type. This can be used instead of specifying an symbol type as a literal
string to avoid problems of mistyping its name.

    TODO: XXX Example

-}
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

        SymTriangleRight ->
            "triangle-right"

        SymTriangleLeft ->
            "triangle-left"

        SymPath svgPath ->
            svgPath


{-| Specity a custom symbol shape as an
[SVG path description](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
-}
symPath : String -> Symbol
symPath =
    SymPath


{-| Direction text is rendered. This determines which end of a text string is
truncated if it cannot be displated within a restricted space.
-}
type TextDirection
    = LeftToRight
    | RightToLeft


{-| Specify the anchor positioning of a title. Used for aligning title text. For
details see the [Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiAnchor : Anchor -> TitleProperty
tiAnchor =
    TAnchor


{-| Specify optional mark encodings for custom title styling. This is a standard
encoding for text marks and may contain `enEnter`, `enUpdate`, `enExit` and
`enHover` specifications. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiEncode : List EncodingProperty -> TitleProperty
tiEncode =
    TEncode


{-| Specify whether or not a title's properties should respond to input events
such as mouse hover. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiInteractive : Boo -> TitleProperty
tiInteractive =
    TInteractive


{-| Describes a unit of time. Useful for encoding and transformations. For
details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/#quantitative).
-}
type TimeUnit
    = Year
    | Month
    | Week
    | Day
    | Hour
    | Minute
    | Second
    | Millisecond
    | Utc TimeUnit


{-| Specify a mark name to apply to a title text mark. This name can be used to
refer to the title mark with an
[event stream definition](https://vega.github.io/vega/docs/event-streams/). For
details see the [Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiName : String -> TitleProperty
tiName =
    TName


{-| Specify the orthogonal offset in pixels by which to displace the title from
its position along the edge of the chart. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiOffset : Num -> TitleProperty
tiOffset =
    TOffset


{-| Specify the positioning of a title relative to the chart. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiOrient : Side -> TitleProperty
tiOrient =
    TOrient


{-| Specify a mark style property to apply to the title text mark. If not
specified the default style of `group-title` is used. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiStyle : Str -> TitleProperty
tiStyle =
    TStyle


{-| Specify the top-level title to be displayed as part of a visualization.
The first paramter is the text of the title to display, the second any optional
properties for customising the title's appearance. For details, see the
[Vega documentation](https://vega.github.io/vega/docs/title/)
-}
title : String -> List TitleProperty -> ( VProperty, Spec )
title s tps =
    ( VTitle, JE.object (List.map titleProperty tps) )


{-| Specify a z-index indicating the layering of the title group relative to
other axis, mark and legend groups. For details see the
[Vega documentation](https://vega.github.io/vega/docs/title/).
-}
tiZIndex : Int -> TitleProperty
tiZIndex =
    TZIndex


{-| Indicates a topoJSON feature format. The first parameter should be the name
of the object set to extract. Typically used when specifying a data url.
-}
topojsonFeature : String -> Format
topojsonFeature =
    TopojsonFeature


{-| Indicates a topoJSON mesh format. The first parameter should be the name
of the object set to extract. Unlike the `topojsonFeature`, the corresponding
geo data are returned as a single, unified mesh instance, not as individual
GeoJSON features. Typically used when specifying a data url.
-}
topojsonMesh : String -> Format
topojsonMesh =
    TopojsonMesh


{-| Convert a list of Vega specifications into a single JSON object that may be
passed to Vega for graphics generation. Recommended practice for top-level
properties that have more than a simple parameter is to create as a series of
compact named functions (e.g. `ds` for the data source, `sc` for scales, `si` for
signals, `ax` for axes, `mk` for marks etc.) and then pass them as a list to the
function `toVega`. For example,

    helloWorld : Spec
    helloWorld =
        let
            table =
                dataFromColumns "table" []
                    << dataColumn "label" (daStrs [ "Hello", "from", "elm-vega" ])
                    << dataColumn "x" (daNums [ 1, 2, 3 ])

            ds =
                dataSource [ table [] ]

            sc =
                scales
                    << scale "xscale"
                        [ scDomain (doData [ dDataset "table", dField (str "x") ])
                        , scRange (raDefault RWidth)
                        ]

            mk =
                marks
                    << mark Text
                        [ mFrom [ srData (str "table") ]
                        , mEncode
                            [ enEnter
                                [ maX [ vScale (fName "xscale"), vField (fName "x") ]
                                , maText [ vField (fName "label") ]
                                ]
                            ]
                        ]
        in
        toVega
            [ width 100, ds, sc [], mk [] ]

-}
toVega : List ( VProperty, Spec ) -> Spec
toVega spec =
    ( "$schema", JE.string "https://vega.github.io/schema/vega/v4.0.json" )
        :: List.map (\( s, v ) -> ( vPropertyLabel s, v )) spec
        |> JE.object


{-| Specify an aggregation transform to group and summarize an input data stream
to produce a derived output stream. Aggregate transforms can be used to compute
counts, sums, averages and other descriptive statistics over groups of data objects.
For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/aggregate/).
-}
trAggregate : List AggregateProperty -> Transform
trAggregate =
    TAggregate


{-| Applies the given ordered list of transforms to the given data stream. Transform
examples include filtering, creating new data fields from expressions and creating
new data fields suitable for a range of visualization and layout types. For details
see the [Vega documentation](https://vega.github.io/vega/docs/transforms).

TODO: Check syntax with current API

      dataSource
          [ data "pop" [ dUrl "data/population.json" ]
          , data "popYear" [ daSource "pop" ] |> transform [ trFilter (expr "datum.year == year") ]
          , data "ageGroups" [ daSource "pop" ] |> transform [ trAggregate [ agGroupBy [ "age" ] ] ]
          ]

-}
transform : List Transform -> DataTable -> DataTable
transform transforms dTable =
    dTable ++ [ ( "transform", JE.list (List.map transformSpec transforms) ) ]


{-| Perform a binning transform that discretises numeric values into a set of bins.
Commonly used to create frequency histograms by combining with [trAggregate](#trAggregate)
to do the counting of field values in each bin.

    transform
        [ trBin (str "examScore") (num 0) (num 100) []
        , trAggregate
            [ agKey (str "bin0")
            , agGroupBy [ str "bin0", str "bin1" ]
            , agOps [ Count ]
            , agAs [ "count" ]
            ]
        ]

For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/bin/).

-}
trBin : Field -> Num -> Num -> List BinProperty -> Transform
trBin =
    TBin


{-| Perform a contour transform that generates a set of contour (iso) lines at a set
of discrete levels. Commonly used to visualize density estimates for 2D point data.

This transform generates a new stream of GeoJSON data as output which may be visualized
using either the `trGeoShape` or `trGeoPath` transforms.

For details see the
[Vega contour transform documentation](https://vega.github.io/vega/docs/transforms/contour/).

-}
trContour : Num -> Num -> List ContourProperty -> Transform
trContour sizeX sizeY cnProps =
    TContour sizeX sizeY cnProps


{-| Compute the minimum and maximum values for a data field, producing a [min, max]
array. This transform does not change the input data stream. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/extent/).
-}
trExtent : Field -> Transform
trExtent =
    TExtent


{-| Compute the minimum and maximum values for a given data field and bind it to a
signal with the given name. This transform does not change the input data stream but
the signal can be used, for example, as a parameter for a bin transform. For details
see the [Vega documentation](https://vega.github.io/vega/docs/transforms/extent/)
-}
trExtentAsSignal : Field -> String -> Transform
trExtentAsSignal f sigName =
    TExtentAsSignal f sigName


{-| Perform a filter transform that removes objects from a data stream based on
the given filter expression. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/filter/).
-}
trFilter : Expr -> Transform
trFilter =
    TFilter


{-| Extend a data object with new values according to the given
[Vega expression](https://vega.github.io/vega/docs/expressions/). The second
parameter is a new field name to give the result of the evaluated expression.
For details see the [Vega documentation](https://vega.github.io/vega/docs/transforms/formula).
-}
trForce : List ForceSimulationProperty -> Transform
trForce =
    TForce


{-| Extend a data object with new values according to the given
[Vega expression](https://vega.github.io/vega/docs/expressions/). The second
parameter is a new field name to give the result of the evaluated expression.
The third determines whether or not the formula is reapplied if the data changes.

    dataSource
        [ data "world"
            [ daUrl "https://vega.github.io/vega/data/world-110m.json"
            , daFormat (topojsonFeature "countries")
            ]
            |> transform
                [ trFormula "geoCentroid('myProj', datum)" "myCentroid" AlwaysUpdate ]
        ]

For details see the [Vega documentation](https://vega.github.io/vega/docs/transforms/formula).

-}
trFormula : Expression -> String -> FormulaUpdate -> Transform
trFormula ex out =
    TFormula ex out


{-| Perform a geopath transform that maps GeoJSON features to SVG path strings
according to a provided cartographic projection. It is intended for use with the
path mark type. This transform is similar in functionality to the geoshape transform,
but immediately generates SVG path strings, rather than producing a shape instance
that delays projection until the rendering stage. The geoshape transform may have
better performance for the case of canvas-rendered dynamic maps.

    mark Shape
        [ mFrom [ srData (str "countries") ]
        , mEncode [ enUpdate [ maFill [vStr "blue" ] ] ]
        , mTransform [ trGeoPath "myProjection" [] ]
        ]

For details see the
[Vega geopath documentation](https://vega.github.io/vega/docs/transforms/geopath/).

-}
trGeoPath : String -> List GeoPathProperty -> Transform
trGeoPath pName gpProps =
    TGeoPath pName gpProps


{-| Perform a geoShape transform generating a renderer instance that maps GeoJSON
features to a shape instance that issues drawing commands. It is intended for use
solely with the shape mark type. This transform is similar in functionality to the
geopath transform, but rather than generate intermediate SVG path strings, this
transform produces a shape instance that directly generates drawing commands during
rendering. This transform can result in improved performance when using canvas
rendering for dynamic maps.

    mark Shape
        [ mFrom [ srData (str "countries") ]
        , mEncode [ enUpdate [ maFill [vStr "blue" ] ] ]
        , mTransform [ trGeoShape "myProjection" [] ]
        ]

For details see the
[Vega geoshape documentation](https://vega.github.io/vega/docs/transforms/geoshape/).

-}
trGeoShape : String -> List GeoPathProperty -> Transform
trGeoShape pName gsProps =
    TGeoShape pName gsProps


{-| Perform a graticule transform that generates a reference grid for cartographic
maps. A graticule is a uniform grid of meridians and parallels. The default graticule
has meridians and parallels every 10° between ±80° latitude; for the polar regions,
there are meridians every 90°.

This transform generates a new data stream containing a single GeoJSON data object
for the graticule, which can subsequently be drawn using the geopath or geoshape
transform. For details see the
[Vega graticule transform documentation](https://vega.github.io/vega/docs/transforms/graticule/).

-}
trGraticule : List GraticuleProperty -> Transform
trGraticule grProps =
    TGraticule grProps


{-| Creates a trigger that may be applied to a data table or mark.
The first parameter is the name of the trigger and the second
a list of trigger actions.
-}
trigger : String -> List TriggerProperty -> Trigger
trigger trName trProps =
    JE.object (List.concatMap triggerProperties (TgTrigger trName :: trProps))


{-| Specify an expression that evaluates to data objects to insert as triggers.
A trigger enables dynmic updates to a visualization. Insert operations are only
applicable to data sets, not marks. For details see the
[Vega documentation](https://vega.github.io/vega/docs/triggers/)
-}
tgInsert : Expression -> TriggerProperty
tgInsert =
    TgInsert


{-| Perform a linkpath transform used to route a visual link between two nodes.
The most common use case is to draw edges in a tree or network layout. By default
links are simply straight lines between source and target nodes; however, with
additional shape and orientation information, a variety of link paths can be
expressed. This transform writes one property to each datum, providing an SVG path
string for the link path. For details see
the [Vega documentation](https://vega.github.io/vega/docs/transforms/linkpath/).
-}
trLinkPath : List LinkPathProperty -> Transform
trLinkPath lpProps =
    TLinkPath lpProps


{-| Perform a lookup transform that extends a primary data stream by looking up
values on a secondary data stream. The first parameter is the name of the secondary
data stream upon which to perform the lookup. The second parameter is the key field
in that secondary stream. The third is the set of key fields from the primary data
stream, each of which are then searched for in a single key field of
the secondary data stream. Optional customisation can be provided as a list of
properties in the final parameter. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/lookup/).
-}
trLookup : String -> Field -> List Field -> List LookupProperty -> Transform
trLookup from key fields =
    TLookup from key fields


{-| Specify a data or mark modification trigger. The first parameter is an
expression that evaluates to data objects to modify and the second parameter an
expression that evaluates to an object of name-value pairs, indicating the field
values that should be updated. For example:

TODO: Check this is syntactically correct:

    trigger "myDragSignal" [trModifyValues "dragged" "{fx: x(), fy: y()}"]

would set the `fx` and `fy` properties on mark items referenced by `myDragSignal`
to the current mouse pointer position.

Modify operations are applicable to both data sets and marks. For details see the
[Vega documentation](https://vega.github.io/vega/docs/triggers/)

-}
tgModifyValues : Expression -> Expression -> TriggerProperty
tgModifyValues key val =
    TgModifyValues key val


{-| Perform a pack transform on some data to computes an enclosure diagram that
uses containment (nesting) to represent a hierarchy. The size of the leaf circles
encodes a quantitative dimension of the data. The enclosing circles show the
approximate cumulative size of each subtree, but due to wasted space there is some
distortion; only the leaf nodes can be compared accurately. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/pack/).
-}
trPack : List PackProperty -> Transform
trPack =
    TPack


{-| Perform a pie transform that calculates the angular extents of arc segments
laid out in a circle. The most common use case is to create pie charts and donut
charts. This transform writes two properties to each datum, indicating the starting
and ending angles (in radians) of an arc. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/pie/).
-}
trPie : List PieProperty -> Transform
trPie =
    TPie


{-| Specify an expression that evaluates to data objects to remove.
A trigger enables dynmic updates to a visualization. Remove operations are only
applicable to data sets, not marks. For details see the
[Vega documentation](https://vega.github.io/vega/docs/triggers/)
-}
tgRemove : Expression -> TriggerProperty
tgRemove =
    TgRemove


{-| Remove all data objects. A trigger enables dynmic updates to a visualization.
For details see the
[Vega documentation](https://vega.github.io/vega/docs/triggers/)
-}
tgRemoveAll : TriggerProperty
tgRemoveAll =
    TgRemoveAll


{-| Perform a stack transform that computes a layout by stacking groups of values.
The most common use case is to create stacked graphs, including stacked bar charts
and stream graphs. This transform writes two properties to each datum, indicating
the starting and ending stack values. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/stack/).
-}
trStack : List StackProperty -> Transform
trStack =
    TStack


{-| Perform a stratify transform that generates a hierarchical (tree) data structure
from input data objects, based on key fields that match parent (first parameter)
and children (second parameter) nodes. Internally, this transform generates a set
of tree node objects that can then be processed by tree layout methods such as
tree, treemap, pack, and partition. For details see the
[Vega documentation](https://vega.github.io/vega/docs/transforms/stratify/).
-}
trStratify : Field -> Field -> Transform
trStratify key parent =
    TStratify key parent


{-| Specify an expression that evaluates to data objects to toggle. Toggled
objects are inserted or removed depending on whether they are already in the
data set. Toggle operations are only applicable to data sets, not marks. For
details see the [Vega documentation](https://vega.github.io/vega/docs/triggers/)
-}
tgToggle : Expression -> TriggerProperty
tgToggle =
    TgToggle


{-| The properties to be encoded when a mark item is updated such as in response
to a signal change. For further details see the
[Vega documentation](https://vega.github.io/vega/docs/marks/#encode).
-}
enUpdate : List MarkProperty -> EncodingProperty
enUpdate =
    Update


{-| Provides a UTC version of a given a time (coordinated universal time, independent
of local time zones or daylight saving).
For example,

    TODO: Provide example

-}
utc : TimeUnit -> TimeUnit
utc tu =
    Utc tu


{-| Indicates the vertical alignment of some text or an image mark. Note that the
`Alphabetic` type constructor applies only to text marks.
-}
type VAlign
    = AlignTop
    | AlignMiddle
    | AlignBottom
    | Alphabetic


{-| A convenience function for generating a text string representing a vertical
alignment type. This can be used instead of specifying an alignment type as a
literal string to avoid problems of mistyping its name.

      MEncode [ Enter [maBaseline [ vStr (vAlignLabel AlignBottom) ] ] ]

-}
vAlignLabel : VAlign -> String
vAlignLabel align =
    case align of
        AlignTop ->
            "top"

        AlignMiddle ->
            "middle"

        AlignBottom ->
            "bottom"

        Alphabetic ->
            "alphabetic"


{-| A value representing a band number or fraction of a band number. Band scales
are used when aggregating data into discrete categories such as in a frequency
historgram.
-}
vBand : Float -> Value
vBand =
    VBand


{-| A Boolean value representing either True or False.
-}
vBoo : Bool -> Value
vBoo =
    VBoo


{-| A list of Boolean values.
-}
vBoos : List Bool -> Value
vBoos =
    VBoos


{-| A value representing a color.
-}
vColor : ColorValue -> Value
vColor =
    VColor


{-| A value representing an exponential value modifier.
-}
vExponent : Value -> Value
vExponent =
    VExponent


{-| A value representing a field either by its name or indirectly via a signal,
parent etc.
-}
vField : FieldValue -> Value
vField =
    VField


{-| A value representing a multiplication value modifier.
-}
vMultiply : Value -> Value
vMultiply =
    VMultiply


{-| A representation of a null value
-}
vNull : Value
vNull =
    VNull


{-| A numeric value.
-}
vNum : Float -> Value
vNum =
    VNum


{-| A value representing a list of numbers.
-}
vNums : List Float -> Value
vNums =
    VNums


{-| Represents an object containing a list of values.
-}
vObject : List Value -> Value
vObject =
    VObject


{-| A value representing an additive value modifier.
-}
vOffset : Value -> Value
vOffset =
    VOffset


{-| Top-level Vega specifications properties. These are generated by a series of
functions that fall into the following categories:

**Data properties** relate to the input data that are to be visualized. Generated
by [`dataSource`](#dataSource) that can collect together a range of data tables
such as those read from a URL or generated inline.

**Signal properties** are used to specify _signals_ – dynamic variables that can
repsond reactively to other signals or interactions. Signals are widely used in
vega specfictions to support dynmaic update of most properties. Generated by the
function [`signals`](#signals).

**Scale properties** are used to map data values to visual channels such as position,
size, color etc. They represent a fundamental building block of a data visualization
specification. Generated by the function [`scales`](#scales).

**Projection properties** are used to specify how geospatial data referenced with
longitude, latitude coordinates are projected onto a plane for visualization.
Generated by the function [`projections`](#projections).

**Axis properties** are used to specify how spatial scale mappings are visualized,
such as with tick marks, grid lines and labels. Generated by the function
[`axes`](#axes).

**Legend properties** are used to specify how visual scale mappings such as color,
shape and size are visualizaed. Generated by the function [`legends`](#legends).

**Title properties** are used to specify how visualization title should appear.
Generated by the function [`title`](#title).

** Layout properties** are used to specify how a group of visual marks may be
organised within a grid. This allows visualizations to be composed of collections
of other visualizations, for example in a dashboard or collection of small multiples.
Generated by the function [`layout`](#layout).

**Mark properties** specify how to visually encode data with graphical primitives
such as points, lines, rectangles and other symbols. Top-level marks are generated
by the function [`marks`](#marks).

**Top-level group encodings** can be used to specify the appearance of the chart's
data rectangle. For example setting the background color if the plotting area.
Generated by the function [`encode`](#encode).

**Config properties** specify ... TODO: Add config.

**Supplementary properties** provide a means to add metadata and some styling to
one or more visualizations. Generated by the functions [`width`](#width),
[`height`](#height), [`padding`](#padding), [`paddings`](#paddings), [`autosize`](#autosize),
[`background`](#background) and [`description`](#description).

For further details on these top-level properties, see the
[Vega specification documentation](https://vega.github.io/vega/docs/specification/).

-}
type VProperty
    = VDescription
    | VBackground
    | VWidth
    | VHeight
    | VPadding
    | VAutosize
    | VConfig
    | VSignals
    | VData
    | VScales
    | VProjections
    | VAxes
    | VLegends
    | VTitle
    | VLayout
    | VMarks
    | VEncode


{-| A value representing a rounding value modifier. Rounding is applied after
all other modifiers.
-}
vRound : Bool -> Value
vRound =
    VRound


{-| A value representing a scale either by its name or indirectly via a signal,
parent etc.
-}
vScale : FieldValue -> Value
vScale =
    VScale


{-| Specify the name of a generic signal.
-}
vSignal : String -> Value
vSignal =
    VSignal


{-| A string value. Used for providing parameters that can be of any value type.
-}
vStr : String -> Value
vStr =
    VStr


{-| A list of string values. Used for providing parameters that can be of any value type.
-}
vStrs : List String -> Value
vStrs =
    VStrs


{-| Represents an a list of values. This can be used for nesting collections of
values.
-}
vValues : List Value -> Value
vValues =
    Values


{-| Override the default width of the visualization. If not specified the width
will be calculated based on the content of the visualization.
-}
width : Float -> ( VProperty, Spec )
width w =
    ( VWidth, JE.float w )



-- ################################################# Private types and functions


type alias LabelledSpec =
    ( String, Spec )


aggregateProperty : AggregateProperty -> LabelledSpec
aggregateProperty ap =
    case ap of
        AgGroupBy fs ->
            ( "groupby", JE.list (List.map fieldSpec fs) )

        AgFields fs ->
            ( "fields", JE.list (List.map fieldSpec fs) )

        AgOps ops ->
            ( "ops", JE.list (List.map (\op -> opSpec op) ops) )

        AgAs labels ->
            ( "as", JE.list (List.map JE.string labels) )

        AgCross b ->
            ( "cross", JE.bool b )

        AgDrop b ->
            ( "drop", JE.bool b )

        AgKey f ->
            ( "key", fieldSpec f )


anchorLabel : Anchor -> String
anchorLabel anchor =
    case anchor of
        Start ->
            "start"

        Middle ->
            "middle"

        End ->
            "end"


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


axisElementLabel : AxisElement -> String
axisElementLabel el =
    case el of
        EAxis ->
            "axis"

        ETicks ->
            "ticks"

        EGrid ->
            "grid"

        ELabels ->
            "labels"

        ETitle ->
            "title"

        EDomain ->
            "domain"


axisProperty : AxisProperty -> LabelledSpec
axisProperty ap =
    case ap of
        AxScale scName ->
            ( "scale", JE.string scName )

        AxSide axSide ->
            ( "orient", JE.string (sideLabel axSide) )

        AxFormat fmt ->
            ( "format", JE.string fmt )

        AxDomain b ->
            ( "domain", JE.bool b )

        AxEncode elEncs ->
            let
                enc ( el, encProps ) =
                    ( axisElementLabel el, JE.object (List.map encodingProperty encProps) )
            in
            ( "encode", JE.object (List.map enc elEncs) )

        AxGrid b ->
            ( "grid", JE.bool b )

        AxLabels b ->
            ( "labels", JE.bool b )

        AxLabelOverlap strat ->
            ( "labelOverlap", JE.string (overlapStrategyLabel strat) )

        AxLabelPadding pad ->
            ( "labelPadding", JE.float pad )

        AxMaxExtent num ->
            ( "maxExtent", numSpec num )

        AxMinExtent num ->
            ( "minExtent", numSpec num )

        AxGridScale scName ->
            ( "gridScale", JE.string scName )

        AxLabelBound numOrNothing ->
            case numOrNothing of
                Nothing ->
                    ( "labelBound", JE.bool False )

                Just x ->
                    ( "labelBound", JE.float x )

        AxLabelFlush numOrNothing ->
            case numOrNothing of
                Nothing ->
                    ( "labelFlush", JE.bool False )

                Just x ->
                    ( "labelFlush", JE.float x )

        AxLabelFlushOffset pad ->
            ( "labelFlushOffset", JE.float pad )

        AxOffset num ->
            ( "offset", numSpec num )

        AxPosition num ->
            ( "position", numSpec num )

        AxTicks b ->
            ( "ticks", JE.bool b )

        AxTickCount n ->
            ( "tickCount", JE.int n )

        AxTickSize sz ->
            ( "tickSize", JE.float sz )

        AxTitle str ->
            ( "title", strSpec str )

        AxTitlePadding pad ->
            ( "titlePadding", JE.float pad )

        AxValues vals ->
            ( "values", JE.list (List.map valueSpec vals) )

        AxZIndex n ->
            ( "zindex", JE.int n )


bindingProperty : Bind -> LabelledSpec
bindingProperty bnd =
    let
        bSpec iType props =
            ( "bind", JE.object (( "input", JE.string iType ) :: List.map inputProperty props) )
    in
    case bnd of
        IRange props ->
            bSpec "range" props

        ICheckbox props ->
            bSpec "checkbox" props

        IRadio props ->
            bSpec "radio" props

        ISelect props ->
            bSpec "select" props

        IText props ->
            bSpec "text" props

        INumber props ->
            bSpec "number" props

        IDate props ->
            bSpec "date" props

        ITime props ->
            bSpec "time" props

        IMonth props ->
            bSpec "month" props

        IWeek props ->
            bSpec "week" props

        IDateTimeLocal props ->
            bSpec "datetimelocal" props

        ITel props ->
            bSpec "tel" props

        IColor props ->
            bSpec "color" props


binProperty : BinProperty -> LabelledSpec
binProperty bnProp =
    case bnProp of
        BnAnchor n ->
            ( "anchor", numSpec n )

        BnMaxBins n ->
            ( "maxbins", numSpec n )

        BnBase n ->
            ( "base", numSpec n )

        BnStep n ->
            ( "step", numSpec n )

        BnSteps ns ->
            case ns of
                Num _ ->
                    ( "steps", JE.list [ numSpec ns ] )

                NumSignal _ ->
                    ( "steps", JE.list [ numSpec ns ] )

                _ ->
                    ( "steps", numSpec ns )

        BnMinStep n ->
            ( "minstep", numSpec n )

        BnDivide n ->
            ( "divide", numSpec n )

        BnNice b ->
            ( "nice", booSpec b )

        BnSignal s ->
            ( "signal", JE.string s )

        BnAs mn mx ->
            ( "as", JE.list [ JE.string mn, JE.string mx ] )


booSpec : Boo -> Spec
booSpec b =
    case b of
        Boo b ->
            JE.bool b

        Boos bs ->
            JE.list (List.map JE.bool bs)

        BooSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        BooSignals sigs ->
            JE.list (List.map (\sig -> JE.object [ signalReferenceProperty sig ]) sigs)

        BooExpr expr ->
            JE.object [ exprProperty expr ]


boundsCalculationLabel : BoundsCalculation -> String
boundsCalculationLabel bc =
    case bc of
        Full ->
            "full"

        Flush ->
            "flush"


clipSpec : Clip -> Spec
clipSpec clip =
    case clip of
        ClEnabled b ->
            booSpec b

        ClPath p ->
            JE.object [ ( "path", strSpec p ) ]

        ClSphere s ->
            JE.object [ ( "sphere", strSpec s ) ]


colorProperty : ColorValue -> LabelledSpec
colorProperty cVal =
    case cVal of
        RGB r g b ->
            ( "color"
            , JE.object
                [ ( "r", JE.object (List.map valueProperty r) )
                , ( "g", JE.object (List.map valueProperty g) )
                , ( "b", JE.object (List.map valueProperty b) )
                ]
            )

        HSL h s l ->
            ( "color"
            , JE.object
                [ ( "h", JE.object (List.map valueProperty h) )
                , ( "s", JE.object (List.map valueProperty s) )
                , ( "l", JE.object (List.map valueProperty l) )
                ]
            )

        LAB l a b ->
            ( "color"
            , JE.object
                [ ( "l", JE.object (List.map valueProperty l) )
                , ( "a", JE.object (List.map valueProperty a) )
                , ( "b", JE.object (List.map valueProperty b) )
                ]
            )

        HCL h c l ->
            ( "color"
            , JE.object
                [ ( "h", JE.object (List.map valueProperty h) )
                , ( "c", JE.object (List.map valueProperty c) )
                , ( "l", JE.object (List.map valueProperty l) )
                ]
            )


comparatorProperty : Comparator -> LabelledSpec
comparatorProperty comp =
    case comp of
        CoField fs ->
            ( "field", JE.list (List.map fieldSpec fs) )

        CoOrder os ->
            ( "order", JE.list (List.map orderSpec os) )


contourProperty : ContourProperty -> LabelledSpec
contourProperty cnProp =
    case cnProp of
        CnValues n ->
            case n of
                Nums _ ->
                    ( "values", numSpec n )

                NumSignal _ ->
                    ( "values", numSpec n )

                NumSignals _ ->
                    ( "values", numSpec n )

                _ ->
                    ( "values", JE.null ) |> Debug.log ("Warning: cnValues expecting array numbers or signals but was given " ++ toString n)

        CnX f ->
            ( "x", fieldSpec f )

        CnY f ->
            ( "y", fieldSpec f )

        CnCellSize n ->
            ( "cellSize", numSpec n )

        CnBandwidth n ->
            ( "bandwidth", numSpec n )

        CnSmooth b ->
            ( "smooth", booSpec b )

        CnThresholds n ->
            case n of
                Nums _ ->
                    ( "thresholds", numSpec n )

                NumSignal _ ->
                    ( "thresholds", numSpec n )

                NumSignals _ ->
                    ( "thresholds", numSpec n )

                _ ->
                    ( "thresholds", JE.null ) |> Debug.log ("Warning: cnThresholds expecting array numbers or signals but was given " ++ toString n)

        CnCount n ->
            ( "count", numSpec n )

        CnNice b ->
            ( "nice", booSpec b )


dataProperty : DataProperty -> LabelledSpec
dataProperty dProp =
    case dProp of
        DaFormat fmt ->
            ( "format", JE.object (formatProperty fmt) )

        DaSource src ->
            ( "source", JE.string src )

        DaSources srcs ->
            ( "source", JE.list (List.map JE.string srcs) )

        DaOn triggers ->
            ( "on", JE.list triggers )

        DaUrl url ->
            ( "url", JE.string url )

        DaValue val ->
            ( "values", valueSpec val )

        DaSphere ->
            ( "values", JE.object [ ( "type", JE.string "Sphere" ) ] )


dataRefProperty : DataReference -> LabelledSpec
dataRefProperty dataRef =
    case dataRef of
        DDataset ds ->
            ( "data", JE.string ds )

        DField str ->
            ( "field", strSpec str )

        DFields str ->
            ( "fields", strSpec str )

        DReferences drs ->
            ( "fields", JE.object (List.map dataRefProperty drs) )

        DSort sps ->
            if sps == [ Ascending ] then
                ( "sort", JE.bool True )
            else
                ( "sort", JE.object (List.map sortProperty sps) )


encodingProperty : EncodingProperty -> LabelledSpec
encodingProperty ep =
    case ep of
        Enter mProps ->
            ( "enter", JE.object (List.map markProperty mProps) )

        Update mProps ->
            ( "update", JE.object (List.map markProperty mProps) )

        Exit mProps ->
            ( "exit", JE.object (List.map markProperty mProps) )

        Hover mProps ->
            ( "hover", JE.object (List.map markProperty mProps) )

        Custom s mProps ->
            ( s, JE.object (List.map markProperty mProps) )


eventHandlerSpec : List EventHandler -> Spec
eventHandlerSpec ehs =
    let
        eventHandler eh =
            case eh of
                EEvents es ->
                    ( "events", eventStreamSpec es )

                EUpdate s ->
                    if s == "" then
                        ( "update", JE.string "{}" )
                    else
                        ( "update", JE.string s )

                EEncode s ->
                    ( "encode", JE.string s )

                EForce b ->
                    ( "force", JE.bool b )
    in
    JE.object (List.map eventHandler ehs)


eventSourceLabel : EventSource -> String
eventSourceLabel es =
    case es of
        ESAll ->
            "*"

        ESView ->
            "view"

        ESScope ->
            "scope"

        ESWindow ->
            "window"

        ESDom s ->
            s


eventStreamSpec : EventStream -> Spec
eventStreamSpec es =
    case es of
        ESSelector s ->
            strSpec s

        ESObject ess ->
            eventStreamObjectSpec ess

        ESMerge ess ->
            JE.object [ ( "merge", JE.list (List.map eventStreamSpec ess) ) ]


eventStreamObjectSpec : List EventStreamProperty -> Spec
eventStreamObjectSpec ess =
    let
        esProperty es =
            case es of
                ESSource src ->
                    ( "source", JE.string (eventSourceLabel src) )

                ESType et ->
                    ( "type", JE.string (eventTypeLabel et) )

                ESBetween ess1 ess2 ->
                    ( "between", JE.list [ eventStreamObjectSpec ess1, eventStreamObjectSpec ess2 ] )

                ESConsume b ->
                    ( "consume", JE.bool b )

                ESFilter ex ->
                    case ex of
                        [ s ] ->
                            ( "filter", JE.string s )

                        _ ->
                            ( "filter", JE.list (List.map JE.string ex) )

                ESDebounce n ->
                    ( "debounce", numSpec n )

                ESMarkName s ->
                    ( "markname", JE.string s )

                ESMark mk ->
                    ( "marktype", JE.string (markLabel mk) )

                ESThrottle n ->
                    ( "throttle", numSpec n )

                ESDerived es ->
                    ( "stream", eventStreamSpec es )
    in
    JE.object (List.map esProperty ess)


eventTypeLabel : EventType -> String
eventTypeLabel et =
    case et of
        Click ->
            "click"

        DblClick ->
            "dblclick"

        DragEnter ->
            "dragenter"

        DragLeave ->
            "dragleave"

        DragOver ->
            "dragover"

        KeyDown ->
            "keydown"

        KeyPress ->
            "keypress"

        KeyUp ->
            "keyup"

        MouseDown ->
            "mousedown"

        MouseMove ->
            "mousemove"

        MouseOut ->
            "mouseout"

        MouseOver ->
            "mouseover"

        MouseUp ->
            "mouseup"

        MouseWheel ->
            "mousewheel"

        TouchEnd ->
            "touchend"

        TouchMove ->
            "touchmove"

        TouchStart ->
            "touchstart"

        Wheel ->
            "wheel"

        Timer ->
            "timer"


exprProperty : Expr -> LabelledSpec
exprProperty expr =
    case expr of
        ExField field ->
            ( "field", JE.string field )

        Expr expr ->
            ( "expr", expressionSpec expr )


expressionSpec : Expression -> Spec
expressionSpec expr =
    -- TODO: Would be better to parse expressions for correctness
    JE.string expr


facetProperty : Facet -> LabelledSpec
facetProperty fct =
    case fct of
        FaName s ->
            ( "name", JE.string s )

        FaData s ->
            ( "data", JE.string s )

        FaField s ->
            ( "field", JE.string s )

        FaGroupBy ss ->
            ( "groupby", JE.list (List.map JE.string ss) )

        FaAggregate aps ->
            ( "aggregate", JE.object (List.map aggregateProperty aps) )


fieldSpec : Field -> Spec
fieldSpec =
    strSpec


fieldValueSpec : FieldValue -> Spec
fieldValueSpec fVal =
    case fVal of
        FName fName ->
            JE.string fName

        FSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        FDatum fv ->
            JE.object [ ( "datum", fieldValueSpec fv ) ]

        FGroup fv ->
            JE.object [ ( "group", fieldValueSpec fv ) ]

        FParent fv ->
            JE.object [ ( "parent", fieldValueSpec fv ) ]


foDataTypeSpec : DataType -> Spec
foDataTypeSpec dType =
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


forceSimulationProperty : ForceSimulationProperty -> LabelledSpec
forceSimulationProperty fProp =
    case fProp of
        FsStatic b ->
            ( "static", booSpec b )

        FsRestart b ->
            ( "restart", booSpec b )

        FsIterations n ->
            ( "iterations", numSpec n )

        FsAlpha n ->
            ( "alpha", numSpec n )

        FsAlphaMin n ->
            ( "alphaMin", numSpec n )

        FsAlphaTarget n ->
            ( "alphaTarget", numSpec n )

        FsVelocityDecay n ->
            ( "velocityDecay", numSpec n )

        FsForces forces ->
            ( "forces", JE.list (List.map forceSpec forces) )

        FsAs x y vx vy ->
            ( "as", JE.list [ JE.string x, JE.string y, JE.string vx, JE.string vy ] )


formatProperty : Format -> List LabelledSpec
formatProperty fmt =
    case fmt of
        JSON ->
            [ ( "type", JE.string "json" ) ]

        JSONProperty prop ->
            [ ( "type", JE.string "json" ), ( "property", JE.string prop ) ]

        CSV ->
            [ ( "type", JE.string "csv" ) ]

        TSV ->
            [ ( "type", JE.string "tsv" ) ]

        DSV delim ->
            [ ( "type", JE.string "dsv" ), ( "delimeter", JE.string delim ) ]

        TopojsonFeature objectSet ->
            [ ( "type", JE.string "topojson" ), ( "feature", JE.string objectSet ) ]

        TopojsonMesh objectSet ->
            [ ( "type", JE.string "topojson" ), ( "mesh", JE.string objectSet ) ]

        Parse fmts ->
            [ ( "parse", JE.object <| List.map (\( field, fmt ) -> ( field, foDataTypeSpec fmt )) fmts ) ]


forceProperty : ForceProperty -> LabelledSpec
forceProperty fp =
    case fp of
        FpX f ->
            ( "x", fieldSpec f )

        FpY f ->
            ( "y", fieldSpec f )

        FpCx n ->
            ( "x", numSpec n )

        FpCy n ->
            ( "y", numSpec n )

        FpRadius n ->
            ( "radius", numSpec n )

        FpStrength n ->
            ( "strength", numSpec n )

        FpIterations n ->
            ( "iterations", numSpec n )

        FpTheta n ->
            ( "theta", numSpec n )

        FpDistanceMin n ->
            ( "distanceMin", numSpec n )

        FpDistanceMax n ->
            ( "distanceMax", numSpec n )

        FpLinks s ->
            ( "links", JE.string s )

        FpId f ->
            ( "id", fieldSpec f )

        FpDistance n ->
            ( "distance", numSpec n )


forceSpec : Force -> Spec
forceSpec f =
    case f of
        FCenter fps ->
            JE.object (( "force", JE.string "center" ) :: List.map forceProperty fps)

        FCollide fps ->
            JE.object (( "force", JE.string "collide" ) :: List.map forceProperty fps)

        FNBody fps ->
            JE.object (( "force", JE.string "nbody" ) :: List.map forceProperty fps)

        FLink fps ->
            JE.object (( "force", JE.string "link" ) :: List.map forceProperty fps)

        FX field fps ->
            JE.object (( "force", JE.string "x" ) :: ( "x", fieldSpec field ) :: List.map forceProperty fps)

        FY field fps ->
            JE.object (( "force", JE.string "y" ) :: ( "y", fieldSpec field ) :: List.map forceProperty fps)


formulaUpdateSpec : FormulaUpdate -> Spec
formulaUpdateSpec update =
    case update of
        InitOnly ->
            JE.bool True

        AlwaysUpdate ->
            JE.bool False


geoPathProperty : GeoPathProperty -> LabelledSpec
geoPathProperty gpProp =
    case gpProp of
        GeField field ->
            ( "field", fieldSpec field )

        GePointRadius num ->
            ( "pointRadius", numSpec num )

        GeAs s ->
            ( "as", JE.string s )


graticuleProperty : GraticuleProperty -> LabelledSpec
graticuleProperty grProp =
    case grProp of
        GrField field ->
            ( "field", fieldSpec field )

        GrExtentMajor n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "extentMajor", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "extentMajor", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "extentMajor", JE.null ) |> Debug.log ("Warning: grExtentMajor expecting array of 2 numbers or signals but was given " ++ toString n)

        GrExtentMinor n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "extentMinor", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "extentMinor", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "extentMinor", JE.null ) |> Debug.log ("Warning: grExtentMinor expecting array of 2 numbers or signals but was given " ++ toString n)

        GrExtent n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "extent", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "extent", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "extent", JE.null ) |> Debug.log ("Warning: grExtent expecting array of 2 numbers or signals but was given " ++ toString n)

        GrStepMajor n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "stepMajor", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "stepMajor", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "stepMajor", JE.null ) |> Debug.log ("Warning: grStepMajor expecting array of 2 numbers or signals but was given " ++ toString n)

        GrStepMinor n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "stepMinor", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "stepMinor", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "stepMinor", JE.null ) |> Debug.log ("Warning: grStepMinor expecting array of 2 numbers or signals but was given " ++ toString n)

        GrStep n ->
            case n of
                Nums [ lat, lng ] ->
                    ( "step", JE.list [ JE.float lat, JE.float lng ] )

                NumSignals [ lat, lng ] ->
                    ( "step", numSpec (NumSignals [ lat, lng ]) )

                _ ->
                    ( "step", JE.null ) |> Debug.log ("Warning: grStep expecting array of 2 numbers or signals but was given " ++ toString n)

        GrPrecision n ->
            ( "precision", numSpec n )


gridAlignSpec : GridAlign -> Spec
gridAlignSpec ga =
    case ga of
        AlignAll ->
            JE.string "all"

        AlignEach ->
            JE.string "each"

        AlignNone ->
            JE.string "none"

        AlignRow align ->
            JE.object [ ( "row", gridAlignSpec align ) ]

        AlignColumn align ->
            JE.object [ ( "column", gridAlignSpec align ) ]


interpolateSpec : CInterpolate -> Spec
interpolateSpec iType =
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


inputProperty : InputProperty -> LabelledSpec
inputProperty prop =
    case prop of
        InMin x ->
            ( "min", JE.float x )

        InMax x ->
            ( "max", JE.float x )

        InStep x ->
            ( "step", JE.float x )

        InDebounce x ->
            ( "debounce", JE.float x )

        InOptions opts ->
            ( "options", valueSpec opts )

        InPlaceholder el ->
            ( "placeholder", JE.string el )

        InElement el ->
            ( "element", JE.string el )

        -- Autocomplete appears to be undocumented in https://vega.github.io/vega/docs/signals/
        -- but is used in this example: https://vega.github.io/vega/examples/job-voyager/
        -- TODO: Any other HTML 5 attributes missing?
        InAutocomplete b ->
            if b then
                ( "autocomplete", JE.string "on" )
            else
                ( "autocomplete", JE.string "off" )


layoutProperty : LayoutProperty -> LabelledSpec
layoutProperty prop =
    case prop of
        LAlign ga ->
            ( "align", gridAlignSpec ga )

        LBounds bc ->
            ( "bounds", JE.string (boundsCalculationLabel bc) )

        LColumns n ->
            ( "columns", numSpec n )

        LPadding n ->
            ( "padding", numSpec n )

        LPaddingRC r c ->
            ( "padding", JE.object [ ( "row", numSpec r ), ( "col", numSpec c ) ] )

        LOffset n ->
            ( "offset", numSpec n )

        LOffsetRC r c ->
            ( "offset", JE.object [ ( "row", numSpec r ), ( "col", numSpec c ) ] )

        LHeaderBand n ->
            ( "headerBand", numSpec n )

        LHeaderBandRC r c ->
            ( "headerBand", JE.object [ ( "row", numSpec r ), ( "col", numSpec c ) ] )

        LFooterBand n ->
            ( "footerBand", numSpec n )

        LFooterBandRC r c ->
            ( "footerBand", JE.object [ ( "row", numSpec r ), ( "col", numSpec c ) ] )

        LTitleBand n ->
            ( "titleBand", numSpec n )

        LTitleBandRC r c ->
            ( "titleBand", JE.object [ ( "row", numSpec r ), ( "col", numSpec c ) ] )


legendEncodingProperty : LegendEncoding -> LabelledSpec
legendEncodingProperty le =
    case le of
        EnLegend eps ->
            ( "legend", JE.object (List.map encodingProperty eps) )

        EnTitle eps ->
            ( "title", JE.object (List.map encodingProperty eps) )

        EnLabels eps ->
            ( "labels", JE.object (List.map encodingProperty eps) )

        EnSymbols eps ->
            ( "symbols", JE.object (List.map encodingProperty eps) )

        EnGradient eps ->
            ( "gradient", JE.object (List.map encodingProperty eps) )


legendProperty : LegendProperty -> LabelledSpec
legendProperty lp =
    case lp of
        LeType lt ->
            ( "type", JE.string (legendTypeLabel lt) )

        LeDirection ld ->
            ( "direction", JE.string (markOrientationLabel ld) )

        LeOrient lo ->
            ( "orient", JE.string (legendOrientLabel lo) )

        LeFill fScale ->
            ( "fill", JE.string fScale )

        LeOpacity oScale ->
            ( "opacity", JE.string oScale )

        LeShape sScale ->
            ( "shape", JE.string sScale )

        LeSize sScale ->
            ( "size", JE.string sScale )

        LeStroke sScale ->
            ( "stroke", JE.string sScale )

        LeStrokeDash sdScale ->
            ( "strokeDash", JE.string sdScale )

        LeEncode les ->
            ( "encode", JE.object (List.map legendEncodingProperty les) )

        LeFormat f ->
            ( "format", JE.string f )

        LeGridAlign ga ->
            ( "gridAlign", gridAlignSpec ga )

        LeClipHeight h ->
            ( "clipHeight", numSpec h )

        LeColumns n ->
            ( "columns", numSpec n )

        LeColumnPadding x ->
            ( "columnPadding", numSpec x )

        LeRowPadding x ->
            ( "rowPadding", numSpec x )

        LeCornerRadius x ->
            ( "cornerRadius", numSpec x )

        LeFillColor c ->
            ( "fillColor", JE.string c )

        LeOffset val ->
            ( "offset", valueSpec val )

        LePadding val ->
            ( "padding", valueSpec val )

        LeStrokeColor c ->
            ( "strokeColor", JE.string c )

        LeStrokeWidth x ->
            ( "strokeWidth", numSpec x )

        LeGradientLength x ->
            ( "gradientLength", numSpec x )

        LeGradientThickness x ->
            ( "gradientThickness", numSpec x )

        LeGradientStrokeColor c ->
            ( "gradientStrokeColor", JE.string c )

        LeGradientStrokeWidth x ->
            ( "gradientStrokeWidth", numSpec x )

        LeLabelAlign ha ->
            ( "labelAlign", JE.string (hAlignLabel ha) )

        LeLabelBaseline va ->
            ( "labelBaseline", JE.string (vAlignLabel va) )

        LeLabelColor c ->
            ( "labelColor", JE.string c )

        LeLabelFont f ->
            ( "labelFont", JE.string f )

        LeLabelFontSize x ->
            ( "labelFontSize", numSpec x )

        LeLabelFontWeight val ->
            ( "labelFontWeight", valueSpec val )

        LeLabelLimit x ->
            ( "labelLimit", numSpec x )

        LeLabelOffset x ->
            ( "labelOffset", numSpec x )

        LeLabelOverlap os ->
            ( "labelOverlap", JE.string (overlapStrategyLabel os) )

        LeSymbolFillColor c ->
            ( "symbolFillColor", JE.string c )

        LeSymbolOffset x ->
            ( "symbolOffset", numSpec x )

        LeSymbolSize x ->
            ( "symbolSize", numSpec x )

        LeSymbolStrokeColor c ->
            ( "symbolStrokeColor", JE.string c )

        LeSymbolStrokeWidth x ->
            ( "symbolStokeWidth", numSpec x )

        LeSymbolType s ->
            ( "symbolType", JE.string (symbolLabel s) )

        LeTickCount n ->
            ( "tickCount", JE.int n )

        LeTitlePadding val ->
            ( "titlePadding", valueSpec val )

        LeTitle t ->
            ( "title", JE.string t )

        LeTitleAlign ha ->
            ( "titleAlign", JE.string (hAlignLabel ha) )

        LeTitleBaseline va ->
            ( "titleBaseline", JE.string (vAlignLabel va) )

        LeTitleColor c ->
            ( "titleColor", JE.string c )

        LeTitleFont f ->
            ( "titleFont", JE.string f )

        LeTitleFontSize x ->
            ( "titleFontSize", numSpec x )

        LeTitleFontWeight val ->
            ( "titleFontWeight", valueSpec val )

        LeTitleLimit x ->
            ( "titleLimit", numSpec x )

        LeValues vals ->
            ( "values", JE.list (List.map valueSpec vals) )

        LeZIndex n ->
            ( "zindex", JE.int n )


legendOrientLabel : LegendOrientation -> String
legendOrientLabel orient =
    case orient of
        Left ->
            "left"

        TopLeft ->
            "top-left"

        Top ->
            "top"

        TopRight ->
            "top-right"

        Right ->
            "right"

        BottomRight ->
            "bottom-right"

        Bottom ->
            "bottom"

        BottomLeft ->
            "bottom-left"

        None ->
            "none"


legendTypeLabel : LegendType -> String
legendTypeLabel lt =
    case lt of
        LSymbol ->
            "symbol"

        LGradient ->
            "gradient"


linkPathProperty : LinkPathProperty -> LabelledSpec
linkPathProperty lpProp =
    case lpProp of
        LPSourceX field ->
            ( "sourceX", fieldSpec field )

        LPSourceY field ->
            ( "sourceY", fieldSpec field )

        LPTargetX field ->
            ( "targetX", fieldSpec field )

        LPTargetY field ->
            ( "targetY", fieldSpec field )

        LPOrient s ->
            ( "orient", strSpec s )

        LPShape s ->
            ( "shape", strSpec s )

        LPAs s ->
            ( "as", JE.string s )


lookupProperty : LookupProperty -> LabelledSpec
lookupProperty luProp =
    case luProp of
        LValues fields ->
            ( "values", JE.list (List.map fieldSpec fields) )

        LAs fields ->
            ( "as", JE.list (List.map JE.string fields) )

        LDefault val ->
            ( "default", valueSpec val )


markLabel : Mark -> String
markLabel m =
    case m of
        Arc ->
            "arc"

        Area ->
            "area"

        Image ->
            "image"

        Group ->
            "group"

        Line ->
            "line"

        Path ->
            "path"

        Rect ->
            "rect"

        Rule ->
            "rule"

        Shape ->
            "shape"

        Symbol ->
            "symbol"

        Text ->
            "text"

        Trail ->
            "trail"


markProperty : MarkProperty -> LabelledSpec
markProperty mProp =
    case mProp of
        MX vals ->
            ( "x", valRef vals )

        MY vals ->
            ( "y", valRef vals )

        MX2 vals ->
            ( "x2", valRef vals )

        MY2 vals ->
            ( "y2", valRef vals )

        MXC vals ->
            ( "xc", valRef vals )

        MYC vals ->
            ( "xc", valRef vals )

        MWidth vals ->
            ( "width", valRef vals )

        MHeight vals ->
            ( "height", valRef vals )

        MOpacity vals ->
            ( "opacity", valRef vals )

        MFill vals ->
            ( "fill", valRef vals )

        MFillOpacity vals ->
            ( "fillOpacity", valRef vals )

        MStroke vals ->
            ( "stroke", valRef vals )

        MStrokeOpacity vals ->
            ( "strokeOpacity", valRef vals )

        MStrokeWidth vals ->
            ( "strokeWidth", valRef vals )

        MStrokeCap vals ->
            ( "strokeCap", valRef vals )

        MStrokeDash vals ->
            ( "strokeDash", valRef vals )

        MStrokeDashOffset vals ->
            ( "strokeDashOffset", valRef vals )

        MStrokeJoin join ->
            ( "strokeJoin", JE.string (strokeJoinLabel join) )

        MStrokeMiterLimit vals ->
            ( "strokeMiterLimit", valRef vals )

        MCursor vals ->
            ( "cursor", valRef vals )

        MHRef vals ->
            ( "href", valRef vals )

        MTooltip vals ->
            ( "tooltip", valRef vals )

        MZIndex vals ->
            ( "zindex", valRef vals )

        -- Arc Mark specific:
        MStartAngle vals ->
            ( "startAngle", valRef vals )

        MEndAngle vals ->
            ( "endAngle", valRef vals )

        MPadAngle vals ->
            ( "padAngle", valRef vals )

        MInnerRadius vals ->
            ( "innerRadius", valRef vals )

        MOuterRadius vals ->
            ( "outerRadius", valRef vals )

        MCornerRadius vals ->
            ( "cornerRadius", valRef vals )

        -- Area Mark specific:
        MOrient vals ->
            ( "orient", valRef vals )

        MInterpolate vals ->
            ( "interpolate", valRef vals )

        MTension vals ->
            ( "tension", valRef vals )

        MDefined vals ->
            ( "defined", valRef vals )

        -- Group Mark specific (MCornerRadius shared with other marks):
        MGroupClip vals ->
            ( "clip", valRef vals )

        -- Image Mark specific:
        MAspect vals ->
            ( "aspect", valRef vals )

        MUrl vals ->
            ( "url", valRef vals )

        -- Path Mark specific:
        MPath vals ->
            ( "path", valRef vals )

        -- Shape Mark specific:
        MShape vals ->
            ( "shape", valRef vals )

        -- Symbol Mark specific:
        MSize vals ->
            ( "size", valRef vals )

        MSymbol vals ->
            ( "shape", valRef vals )

        -- Text Mark specific (MAlign shared with other marks):
        MAlign vals ->
            ( "align", valRef vals )

        MAngle vals ->
            ( "angle", valRef vals )

        MBaseline vals ->
            ( "baseline", valRef vals )

        MDir vals ->
            ( "dir", valRef vals )

        MdX vals ->
            ( "dx", valRef vals )

        MdY vals ->
            ( "dy", valRef vals )

        MEllipsis vals ->
            ( "ellipsis", valRef vals )

        MFont vals ->
            ( "font", valRef vals )

        MFontSize vals ->
            ( "fontSize", valRef vals )

        MFontWeight vals ->
            ( "fontWeight", valRef vals )

        MFontStyle vals ->
            ( "fontStyle", valRef vals )

        MLimit vals ->
            ( "limit", valRef vals )

        MRadius vals ->
            ( "radius", valRef vals )

        MText vals ->
            ( "text", valRef vals )

        MTheta vals ->
            ( "theta", valRef vals )


niceSpec : ScaleNice -> Spec
niceSpec ni =
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


numSpec : Num -> Spec
numSpec num =
    case num of
        Num num ->
            JE.float num

        Nums nums ->
            JE.list (List.map JE.float nums)

        NumSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        NumSignals sigs ->
            JE.list (List.map (\sig -> JE.object [ signalReferenceProperty sig ]) sigs)

        NumExpr expr ->
            JE.object [ exprProperty expr ]

        NumNull ->
            JE.null


opSpec : Operation -> Spec
opSpec op =
    case op of
        ArgMax ->
            JE.string "argmax"

        ArgMin ->
            JE.string "argmin"

        Average ->
            JE.string "average"

        Count ->
            JE.string "count"

        CI0 ->
            JE.string "ci0"

        CI1 ->
            JE.string "ci1"

        Distinct ->
            JE.string "distinct"

        Max ->
            JE.string "max"

        Mean ->
            JE.string "mean"

        Median ->
            JE.string "median"

        Min ->
            JE.string "min"

        Missing ->
            JE.string "missing"

        Q1 ->
            JE.string "q1"

        Q3 ->
            JE.string "q3"

        Stdev ->
            JE.string "stdev"

        Stdevp ->
            JE.string "stdevp"

        Sum ->
            JE.string "sum"

        Stderr ->
            JE.string "stderr"

        Valid ->
            JE.string "valid"

        Variance ->
            JE.string "variance"

        Variancep ->
            JE.string "variancep"


orderSpec : Order -> Spec
orderSpec order =
    case order of
        Ascend ->
            JE.string "ascending"

        Descend ->
            JE.string "descending"

        OrderSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


overlapStrategyLabel : OverlapStrategy -> String
overlapStrategyLabel strat =
    case strat of
        ONone ->
            "false"

        OParity ->
            "parity"

        OGreedy ->
            "greedy"


packProperty : PackProperty -> LabelledSpec
packProperty pp =
    case pp of
        PaField f ->
            ( "field", fieldSpec f )

        PaSort comp ->
            ( "sort", JE.object (List.map comparatorProperty comp) )

        PaSize w h ->
            ( "size", JE.list [ valueSpec w, valueSpec h ] )

        PaRadius fOrNull ->
            case fOrNull of
                Just f ->
                    ( "radius", fieldSpec f )

                Nothing ->
                    ( "radius", JE.null )

        PaPadding padSize ->
            ( "padding", numSpec padSize )

        PaAs x y r depth children ->
            ( "as", JE.list (List.map JE.string [ x, y, r, depth, children ]) )


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


pieProperty : PieProperty -> LabelledSpec
pieProperty pp =
    case pp of
        PiField f ->
            ( "field", fieldSpec f )

        PiStartAngle x ->
            ( "startAngle", numSpec x )

        PiEndAngle x ->
            ( "endAngle", numSpec x )

        PiSort b ->
            ( "sort", booSpec b )

        PiAs y0 y1 ->
            ( "as", JE.list (List.map JE.string [ y0, y1 ]) )


projectionSpec : Projection -> Spec
projectionSpec proj =
    case proj of
        Proj str ->
            strSpec str

        _ ->
            JE.string (projectionLabel proj)


projectionProperty : ProjectionProperty -> LabelledSpec
projectionProperty projProp =
    case projProp of
        PrType pType ->
            ( "type", projectionSpec pType )

        PrClipAngle n ->
            case n of
                Num 0 ->
                    -- Anitmeridian cutting
                    ( "clipAngle", JE.null )

                _ ->
                    ( "clipAngle", numSpec n )

        PrClipExtent n ->
            case n of
                Nums [ x0, y0, x1, y1 ] ->
                    ( "clipExtent", JE.list [ JE.list [ JE.float x0, JE.float y0 ], JE.list [ JE.float x1, JE.float y1 ] ] )

                NumSignal sig ->
                    ( "clipExtent", numSpec (NumSignal sig) )

                NumSignals [ sigX0, sigY0, sigX1, sigY1 ] ->
                    ( "clipExtent", JE.list [ numSpec (NumSignals [ sigX0, sigY0 ]), numSpec (NumSignals [ sigX1, sigY1 ]) ] )

                _ ->
                    ( "clipExtent", JE.null ) |> Debug.log ("Warning: prClipExtent expecting array of 4 numbers but was given " ++ toString n)

        PrScale n ->
            ( "scale", numSpec n )

        PrTranslate n ->
            case n of
                Nums [ tx, ty ] ->
                    ( "translate", JE.list [ JE.float tx, JE.float ty ] )

                NumSignal sig ->
                    ( "translate", numSpec (NumSignal sig) )

                NumSignals [ sigTx, sigTy ] ->
                    ( "translate", numSpec (NumSignals [ sigTx, sigTy ]) )

                _ ->
                    ( "translate", JE.null ) |> Debug.log ("Warning: prTranslate expecting array of 2 numbers but was given " ++ toString n)

        PrCenter n ->
            ( "center", numSpec n )

        PrRotate n ->
            case n of
                Nums [ lambda, phi ] ->
                    ( "rotate", JE.list [ JE.float lambda, JE.float phi ] )

                Nums [ lambda, phi, gamma ] ->
                    ( "rotate", JE.list [ JE.float lambda, JE.float phi, JE.float gamma ] )

                NumSignal sig ->
                    ( "rotate", numSpec (NumSignal sig) )

                NumSignals [ sigLambda, sigPhi ] ->
                    ( "rotate", numSpec (NumSignals [ sigLambda, sigPhi ]) )

                NumSignals [ sigLambda, sigPhi, sigGamma ] ->
                    ( "rotate", numSpec (NumSignals [ sigLambda, sigPhi, sigGamma ]) )

                _ ->
                    ( "rotate", JE.null ) |> Debug.log ("Warning: prRotate expecting array of 2 or 3 numbers but was given " ++ toString n)

        PrPointRadius n ->
            ( "pointRadius", numSpec n )

        PrPrecision n ->
            ( "precision", numSpec n )

        PrFit geoJson ->
            -- TODO: Add  validation that checks this is a valid geoJSON object or array of geoJSON Feature/Featurecollections.
            ( "fit", geoJson )

        PrExtent n ->
            case n of
                Nums [ x0, y0, x1, y1 ] ->
                    ( "extent", JE.list [ JE.list [ JE.float x0, JE.float y0 ], JE.list [ JE.float x1, JE.float y1 ] ] )

                NumSignal sig ->
                    ( "extent", numSpec (NumSignal sig) )

                NumSignals [ sigX0, sigY0, sigX1, sigY1 ] ->
                    ( "extent", JE.list [ numSpec (NumSignals [ sigX0, sigY0 ]), numSpec (NumSignals [ sigX1, sigY1 ]) ] )

                _ ->
                    ( "extent", JE.null ) |> Debug.log ("Warning: prExtent expecting array of 4 numbers but was given " ++ toString n)

        PrSize n ->
            case n of
                Nums [ w, h ] ->
                    ( "size", JE.list [ JE.float w, JE.float h ] )

                NumSignal sig ->
                    ( "size", numSpec (NumSignal sig) )

                NumSignals [ sigW, sigH ] ->
                    ( "size", numSpec (NumSignals [ sigW, sigH ]) )

                _ ->
                    ( "size", JE.null ) |> Debug.log ("Warning: prSize expecting array of 2 numbers but was given " ++ toString n)

        PrCoefficient n ->
            ( "coefficient", numSpec n )

        PrDistance n ->
            ( "distance", numSpec n )

        PrFraction n ->
            ( "fraction", numSpec n )

        PrLobes n ->
            ( "lobes", numSpec n )

        PrParallel n ->
            ( "parallel", numSpec n )

        PrRadius n ->
            ( "radius", numSpec n )

        PrRatio n ->
            ( "ratio", numSpec n )

        PrSpacing n ->
            ( "spacing", numSpec n )

        PrTilt n ->
            ( "tilt", numSpec n )


rangeDefaultLabel : RangeDefault -> String
rangeDefaultLabel rd =
    case rd of
        RWidth ->
            "width"

        RHeight ->
            "height"

        RSymbol ->
            "symbol"

        RCategory ->
            "category"

        RDiverging ->
            "diverging"

        ROrdinal ->
            "ordinal"

        RRamp ->
            "ramp"

        RHeatmap ->
            "heatmap"

        RCustom name ->
            name


scaleDomainSpec : ScaleDomain -> Spec
scaleDomainSpec sdType =
    case sdType of
        DoNums nums ->
            numSpec nums

        DoStrs cats ->
            strSpec cats

        DoData dataRef ->
            JE.object (List.map dataRefProperty dataRef)


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

        ScQuantile ->
            "quantile"

        ScQuantize ->
            "quantize"

        ScCustom s ->
            s


scaleProperty : ScaleProperty -> LabelledSpec
scaleProperty scaleProp =
    case scaleProp of
        SType sType ->
            ( "type", JE.string (scaleLabel sType) )

        SDomain sdType ->
            ( "domain", scaleDomainSpec sdType )

        SDomainMax sdMax ->
            ( "domainMax", numSpec sdMax )

        SDomainMin sdMin ->
            ( "domainMin", numSpec sdMin )

        SDomainMid sdMid ->
            ( "domainMid", numSpec sdMid )

        SDomainRaw sdRaw ->
            ( "domainRaw", valueSpec sdRaw )

        SRange range ->
            case range of
                RNums xs ->
                    ( "range", JE.list (List.map JE.float xs) )

                RStrs ss ->
                    ( "range", JE.list (List.map JE.string ss) )

                RValues vals ->
                    ( "range", JE.list (List.map valueSpec vals) )

                RSignal sig ->
                    ( "range", JE.object [ signalReferenceProperty sig ] )

                RScheme name options ->
                    ( "range", JE.object (List.map schemeProperty (SScheme name :: options)) )

                RData dRef ->
                    ( "range", JE.object [ dataRefProperty dRef ] )

                RStep val ->
                    ( "range", JE.object [ ( "step", valueSpec val ) ] )

                RDefault rd ->
                    ( "range", JE.string (rangeDefaultLabel rd) )

        SPadding x ->
            ( "padding", numSpec x )

        SPaddingInner x ->
            ( "paddingInner", numSpec x )

        SPaddingOuter x ->
            ( "paddingOuter", numSpec x )

        SRangeStep x ->
            ( "rangeStep", numSpec x )

        SRound b ->
            ( "round", booSpec b )

        SClamp b ->
            ( "clamp", booSpec b )

        SInterpolate interp ->
            ( "interpolate", interpolateSpec interp )

        SNice ni ->
            ( "nice", niceSpec ni )

        SZero b ->
            ( "zero", booSpec b )

        SReverse b ->
            ( "reverse", booSpec b )

        SExponent x ->
            ( "exponent", numSpec x )

        SBase x ->
            ( "base", numSpec x )

        SAlign x ->
            ( "align", numSpec x )


schemeProperty : ColorSchemeProperty -> LabelledSpec
schemeProperty sProps =
    case sProps of
        SScheme sName ->
            ( "scheme", JE.string sName )

        SCount x ->
            ( "count", JE.float x )

        SExtent mn mx ->
            ( "extent", JE.list [ JE.float mn, JE.float mx ] )


sideLabel : Side -> String
sideLabel orient =
    case orient of
        SLeft ->
            "left"

        SBottom ->
            "bottom"

        SRight ->
            "right"

        STop ->
            "top"


signalProperty : SignalProperty -> LabelledSpec
signalProperty sigProp =
    case sigProp of
        SiName siName ->
            ( "name", JE.string siName )

        SiBind bind ->
            bindingProperty bind

        SiDescription s ->
            ( "description", JE.string s )

        SiUpdate expr ->
            ( "update", expressionSpec expr )

        SiOn ehs ->
            ( "on", JE.list (List.map eventHandlerSpec ehs) )

        SiReact b ->
            ( "react", JE.bool b )

        SiValue v ->
            ( "value", valueSpec v )


signalReferenceProperty : String -> LabelledSpec
signalReferenceProperty sigRef =
    ( "signal", JE.string sigRef )


sortProperty : SortProperty -> LabelledSpec
sortProperty sp =
    case sp of
        Ascending ->
            ( "order", JE.string "ascending" )

        Descending ->
            ( "order", JE.string "descending" )

        ByField field ->
            ( "field", strSpec field )

        Op op ->
            ( "op", opSpec op )


sourceProperty : Source -> LabelledSpec
sourceProperty src =
    case src of
        SData sName ->
            ( "data", strSpec sName )

        SFacet d name fcts ->
            ( "facet", JE.object (List.map facetProperty (FaData d :: FaName name :: fcts)) )


stackOffsetSpec : StackOffset -> Spec
stackOffsetSpec off =
    case off of
        OfZero ->
            JE.string "zero"

        OfCenter ->
            JE.string "center"

        OfNormalize ->
            JE.string "normalize"

        OfSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


stackProperty : StackProperty -> LabelledSpec
stackProperty sp =
    case sp of
        StField f ->
            ( "field", fieldSpec f )

        StGroupBy fs ->
            ( "groupby", JE.list (List.map fieldSpec fs) )

        StSort comp ->
            ( "sort", JE.object (List.map comparatorProperty comp) )

        StOffset off ->
            ( "offset", stackOffsetSpec off )

        StAs y0 y1 ->
            ( "as", JE.list (List.map JE.string [ y0, y1 ]) )


strSpec : Str -> Spec
strSpec str =
    case str of
        Str str ->
            JE.string str

        Strs strs ->
            JE.list (List.map JE.string strs)

        StrSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        StrSignals sigs ->
            JE.list (List.map (\sig -> JE.object [ signalReferenceProperty sig ]) sigs)


strString : Str -> String
strString str =
    case str of
        Str str ->
            str

        Strs strs ->
            toString strs

        StrSignal sig ->
            "{'signal': '" ++ sig ++ "'}"

        StrSignals sigs ->
            toString sigs


timeUnitLabel : TimeUnit -> String
timeUnitLabel tu =
    case tu of
        Year ->
            "year"

        Month ->
            "month"

        Week ->
            "week"

        Day ->
            "day"

        Hour ->
            "hour"

        Minute ->
            "minute"

        Second ->
            "second"

        Millisecond ->
            "millisecond"

        Utc timeUnit ->
            "utc" ++ timeUnitLabel timeUnit


titleProperty : TitleProperty -> LabelledSpec
titleProperty tProp =
    case tProp of
        TOrient s ->
            ( "orient", JE.string (sideLabel s) )

        TAnchor a ->
            ( "anchor", JE.string (anchorLabel a) )

        TEncode eps ->
            ( "encode", JE.object (List.map encodingProperty eps) )

        TInteractive b ->
            ( "interactive", booSpec b )

        TName s ->
            ( "name", JE.string s )

        TStyle s ->
            ( "style", strSpec s )

        TOffset n ->
            ( "offset", numSpec n )

        TZIndex n ->
            ( "zindex", JE.int n )


topMarkProperty : TopMarkProperty -> List LabelledSpec
topMarkProperty mProp =
    case mProp of
        MType m ->
            [ ( "type", JE.string (markLabel m) ) ]

        MClip clip ->
            [ ( "clip", clipSpec clip ) ]

        MDescription s ->
            [ ( "description", JE.string s ) ]

        MEncode eps ->
            [ ( "encode", JE.object (List.map encodingProperty eps) ) ]

        MFrom src ->
            [ ( "from", JE.object (List.map sourceProperty src) ) ]

        MInteractive b ->
            [ ( "interactive", booSpec b ) ]

        MKey f ->
            [ ( "key", fieldSpec f ) ]

        MName s ->
            [ ( "name", JE.string s ) ]

        MOn triggers ->
            [ ( "on", JE.list triggers ) ]

        -- TODO: MTransform Transform []
        MRole s ->
            [ ( "role", JE.string s ) ]

        MSort comp ->
            [ ( "sort", JE.object (List.map comparatorProperty comp) ) ]

        MTransform trans ->
            [ ( "transform", JE.list (List.map transformSpec trans) ) ]

        MStyle ss ->
            [ ( "style", JE.list (List.map JE.string ss) ) ]

        MGroup props ->
            List.map (\( vProp, spec ) -> ( vPropertyLabel vProp, spec )) props


transformSpec : Transform -> Spec
transformSpec trans =
    case trans of
        TAggregate aps ->
            JE.object (( "type", JE.string "aggregate" ) :: List.map aggregateProperty aps)

        TBin f minExt maxExt bps ->
            JE.object
                (( "type", JE.string "bin" )
                    :: ( "field", fieldSpec f )
                    :: ( "extent", JE.list [ numSpec minExt, numSpec maxExt ] )
                    :: List.map binProperty bps
                )

        TCollect ->
            JE.object [ ( "type", JE.string "collect" ) ]

        TCountPattern ->
            JE.object [ ( "type", JE.string "countpattern" ) ]

        TCross ->
            JE.object [ ( "type", JE.string "cross" ) ]

        TDensity ->
            JE.object [ ( "type", JE.string "density" ) ]

        TExtent field ->
            JE.object [ ( "type", JE.string "extent" ), ( "field", fieldSpec field ) ]

        TExtentAsSignal field sigName ->
            JE.object [ ( "type", JE.string "extent" ), ( "field", fieldSpec field ), ( "signal", JE.string sigName ) ]

        TFilter expr ->
            JE.object [ ( "type", JE.string "filter" ), exprProperty expr ]

        TFold ->
            JE.object [ ( "type", JE.string "fold" ) ]

        TFormula expr name update ->
            JE.object
                [ ( "type", JE.string "formula" )
                , ( "expr", expressionSpec expr )
                , ( "as", JE.string name )
                , ( "initonly", formulaUpdateSpec update )
                ]

        TIdentifier ->
            JE.object [ ( "type", JE.string "identifier" ) ]

        TImpute ->
            JE.object [ ( "type", JE.string "impute" ) ]

        TJoinAggregate ->
            JE.object [ ( "type", JE.string "joinaggregate" ) ]

        TLookup from key fields lups ->
            JE.object
                (( "type", JE.string "lookup" )
                    :: ( "from", JE.string from )
                    :: ( "key", fieldSpec key )
                    :: ( "fields", JE.list (List.map fieldSpec fields) )
                    :: List.map lookupProperty lups
                )

        TProject ->
            JE.object [ ( "type", JE.string "project" ) ]

        TSample ->
            JE.object [ ( "type", JE.string "sample" ) ]

        TSequence ->
            JE.object [ ( "type", JE.string "sequence" ) ]

        TWindow ->
            JE.object [ ( "type", JE.string "window" ) ]

        TContour x y cps ->
            JE.object
                (( "type", JE.string "contour" )
                    :: ( "size", JE.list [ numSpec x, numSpec y ] )
                    :: List.map contourProperty cps
                )

        TGeoJson ->
            JE.object [ ( "type", JE.string "geojson" ) ]

        TGeoPath pName gpps ->
            JE.object
                (( "type", JE.string "geopath" )
                    :: ( "projection", JE.string pName )
                    :: List.map geoPathProperty gpps
                )

        TGeoPoint ->
            JE.object [ ( "type", JE.string "geopoint" ) ]

        TGeoShape pName gsps ->
            JE.object
                (( "type", JE.string "geoshape" )
                    :: ( "projection", JE.string pName )
                    :: List.map geoPathProperty gsps
                )

        TGraticule grps ->
            JE.object (( "type", JE.string "graticule" ) :: List.map graticuleProperty grps)

        TLinkPath lpps ->
            JE.object (( "type", JE.string "linkpath" ) :: List.map linkPathProperty lpps)

        TPie pps ->
            JE.object (( "type", JE.string "pie" ) :: List.map pieProperty pps)

        TStack sps ->
            JE.object (( "type", JE.string "stack" ) :: List.map stackProperty sps)

        TForce fps ->
            JE.object (( "type", JE.string "force" ) :: List.map forceSimulationProperty fps)

        TVoronoi ->
            JE.object [ ( "type", JE.string "voronoi" ) ]

        TWordCloud ->
            JE.object [ ( "type", JE.string "wordcloud" ) ]

        TNest ->
            JE.object [ ( "type", JE.string "nest" ) ]

        TStratify key parent ->
            JE.object [ ( "type", JE.string "stratify" ), ( "key", fieldSpec key ), ( "parentKey", fieldSpec parent ) ]

        TTreeLinks ->
            JE.object [ ( "type", JE.string "treelinks" ) ]

        TPack pps ->
            JE.object (( "type", JE.string "pack" ) :: List.map packProperty pps)

        TPartition ->
            JE.object [ ( "type", JE.string "partition" ) ]

        TTree ->
            JE.object [ ( "type", JE.string "tree" ) ]

        TTreeMap ->
            JE.object [ ( "type", JE.string "treemap" ) ]

        TCrossFilter ->
            JE.object [ ( "type", JE.string "crossfilter" ) ]

        TResolveFilter ->
            JE.object [ ( "type", JE.string "resolvefilter" ) ]


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


triggerProperties : TriggerProperty -> List LabelledSpec
triggerProperties trans =
    case trans of
        TgTrigger expr ->
            [ ( "trigger", expressionSpec expr ) ]

        TgInsert expr ->
            [ ( "insert", expressionSpec expr ) ]

        TgRemove expr ->
            [ ( "remove", expressionSpec expr ) ]

        TgRemoveAll ->
            [ ( "remove", JE.bool True ) ]

        TgToggle expr ->
            [ ( "toggle", expressionSpec expr ) ]

        -- Note the one-to-many relation between this trigger property and the labelled specs it generates.
        TgModifyValues modExpr valExpr ->
            [ ( "modify", expressionSpec modExpr ), ( "values", expressionSpec valExpr ) ]


valRef : List Value -> Spec
valRef vs =
    case vs of
        [ VIfElse expr ifs elses ] ->
            JE.list
                [ JE.object (( "test", JE.string expr ) :: List.map valueProperty ifs)
                , JE.object (List.map valueProperty elses)
                ]

        _ ->
            JE.object (List.map valueProperty vs)


valueProperty : Value -> LabelledSpec
valueProperty val =
    case val of
        VStr str ->
            ( "value", JE.string str )

        VStrs strs ->
            ( "value", JE.list (List.map JE.string strs) )

        VSignal sig ->
            signalReferenceProperty sig

        VColor cVal ->
            colorProperty cVal

        VField fVal ->
            ( "field", fieldValueSpec fVal )

        VScale fVal ->
            ( "scale", fieldValueSpec fVal )

        VKeyValue key val ->
            ( key, valueSpec val )

        VBand x ->
            ( "band", JE.float x )

        VExponent val ->
            ( "exponent", valueSpec val )

        VMultiply val ->
            ( "mult", valueSpec val )

        VOffset val ->
            ( "offset", valueSpec val )

        VRound b ->
            ( "round", JE.bool b )

        VNum num ->
            ( "value", JE.float num )

        VNums nums ->
            ( "value", JE.list (List.map JE.float nums) )

        VObject vals ->
            ( "value", JE.object (List.map valueProperty vals) )

        Values vals ->
            ( "value", JE.list (List.map valueSpec vals) )

        VBoo b ->
            ( "value", JE.bool b )

        VBoos bs ->
            ( "value", JE.list (List.map JE.bool bs) )

        VNull ->
            ( "value", JE.null )

        VIfElse expr ifs elses ->
            ( "productionRule"
            , JE.object
                [ ( "test", JE.string expr )
                , ( "if", JE.object (List.map valueProperty ifs) )
                , ( "else", JE.object (List.map valueProperty elses) )
                ]
            )
                |> Debug.log "Unexpected production rule passed to valueProperty"


valueSpec : Value -> Spec
valueSpec val =
    case val of
        VStr str ->
            JE.string str

        VStrs strs ->
            JE.list (List.map JE.string strs)

        VSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        VColor cVal ->
            JE.object [ colorProperty cVal ]

        VField fName ->
            fieldValueSpec fName

        VScale fName ->
            fieldValueSpec fName

        VBand x ->
            JE.object [ ( "band", JE.float x ) ]

        VExponent val ->
            JE.object [ valueProperty val ]

        VMultiply val ->
            JE.object [ valueProperty val ]

        VOffset val ->
            JE.object [ valueProperty val ]

        VRound b ->
            JE.object [ ( "round", JE.bool b ) ]

        VNum num ->
            JE.float num

        VNums nums ->
            JE.list (List.map JE.float nums)

        VKeyValue key val ->
            JE.object [ ( key, valueSpec val ) ]

        VObject objs ->
            JE.object (List.map valueProperty objs)

        Values objs ->
            JE.list (List.map valueSpec objs)

        VBoo b ->
            JE.bool b

        VBoos bs ->
            JE.list (List.map JE.bool bs)

        VNull ->
            JE.null

        VIfElse expr ifs elses ->
            JE.null


vPropertyLabel : VProperty -> String
vPropertyLabel spec =
    case spec of
        VDescription ->
            "description"

        VBackground ->
            "background"

        VTitle ->
            "title"

        VWidth ->
            "width"

        VAutosize ->
            "autosize"

        VHeight ->
            "height"

        VPadding ->
            "padding"

        VConfig ->
            "config"

        VSignals ->
            "signals"

        VData ->
            "data"

        VScales ->
            "scales"

        VProjections ->
            "projections"

        VAxes ->
            "axes"

        VLegends ->
            "legends"

        VMarks ->
            "marks"

        VEncode ->
            "encode"

        --TODO: Why isn't layout listed as a top-level specification property at
        -- https://vega.github.io/vega/docs/specification/
        VLayout ->
            "layout"
