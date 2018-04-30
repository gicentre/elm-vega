module VegaLite
    exposing
        ( APosition(AEnd, AMiddle, AStart)
        , Arrangement(Column, Row)
        , Autosize(AContent, AFit, ANone, APad, APadding, AResize)
          --, AxisConfig(BandPosition, Domain, DomainColor, DomainWidth, Grid, GridColor, GridDash, GridOpacity, GridWidth, LabelAngle, LabelColor, LabelFont, LabelFontSize, LabelLimit, LabelOverlap, LabelPadding, Labels, MaxExtent, MinExtent, ShortTimeLabels, TickColor, TickRound, TickSize, TickWidth, Ticks, TitleAlign, TitleAngle, TitleBaseline, TitleColor, TitleFont, TitleFontSize, TitleFontWeight, TitleLimit, TitleMaxLength, TitlePadding, TitleX, TitleY)
        , AxisConfig
          -- AxisProperty(AxDates, AxDomain, AxFormat, AxGrid, AxLabelAngle, AxLabelOverlap, AxLabelPadding, AxLabels, AxMaxExtent, AxMinExtent, AxOffset, AxOrient, AxPosition, AxTickCount, AxTickSize, AxTicks, AxTitle, AxTitleAlign, AxTitleAngle, AxTitleMaxLength, AxTitlePadding, AxValues, AxZIndex)
        , AxisProperty
          --, BinProperty(Base, Divide, Extent, MaxBins, MinStep, Nice, Step, Steps)
        , BinProperty
          --Binding(ICheckbox, IColor, IDate, IDateTimeLocal, IMonth, INumber, IRadio, IRange, ISelect, ITel, IText, ITime, IWeek)
        , Binding
          --, BooleanOp(And, Expr, Not, Or, Selection, SelectionName)
        , BooleanOp
          --CInterpolate(CubeHelix, CubeHelixLong, Hcl, HclLong, Hsl, HslLong, Lab, Rgb)
        , CInterpolate(Hcl, HclLong, Hsl, HslLong, Lab)
        , Channel(ChColor, ChOpacity, ChShape, ChSize, ChX, ChX2, ChY, ChY2)
        , ClipRect(NoClip)
          --, ConfigurationProperty(AreaStyle, Autosize, Axis, AxisBand, AxisBottom, AxisLeft, AxisRight, AxisTop, AxisX, AxisY, Background, BarStyle, CircleStyle, CountTitle, FieldTitle, Legend, LineStyle, MarkStyle, NamedStyle, NumberFormat, Padding, PointStyle, Projection, Range, RectStyle, RemoveInvalid, RuleStyle, Scale, SelectionStyle, SquareStyle, Stack, TextStyle, TickStyle, TimeFormat, TitleStyle, View)
        , ConfigurationProperty
        , Cursor(CAlias, CAllScroll, CAuto, CCell, CColResize, CContextMenu, CCopy, CCrosshair, CDefault, CEResize, CEWResize, CGrab, CGrabbing, CHelp, CMove, CNEResize, CNESWResize, CNResize, CNSResize, CNWResize, CNWSEResize, CNoDrop, CNone, CNotAllowed, CPointer, CProgress, CRowResize, CSEResize, CSResize, CSWResize, CText, CVerticalText, CWResize, CWait, CZoomIn, CZoomOut)
        , Data
        , DataColumn
        , DataRow
          --, DataType(FoBoolean, FoDate, FoNumber, FoUtc)
        , DataType(FoBoolean, FoNumber)
          --, DataValue(Boolean, DateTime, Number, Str)
        , DataValue
          --, DataValues(Booleans, DateTimes, Numbers, Strings)
        , DataValues
          --, DateTime(DTDate, DTDay, DTHours, DTMilliseconds, DTMinutes, DTMonth, DTQuarter, DTSeconds, DTYear)
        , DateTime
        , DayName(Fri, Mon, Sat, Sun, Thu, Tue, Wed)
          --, DetailChannel(DAggregate, DBin, DName, DTimeUnit, DmType)
        , DetailChannel
          --, FacetChannel(FAggregate, FBin, FHeader, FName, FTimeUnit, FmType)
        , FacetChannel
          --, FacetMapping(ColumnBy, RowBy)
        , FacetMapping
        , FieldTitleProperty(Function, Plain, Verbal)
          --, Filter(FEqual,FExpr ,FCompose,FSelection,FOneOf ,FRange)
        , Filter
          --, FilterRange(NumberRange,DateRange)
        , FilterRange
        , FontWeight(Bold, Bolder, Lighter, Normal, W100, W200, W300, W400, W500, W600, W700, W800, W900)
          --, Format(CSV,TSV,JSON,TopojsonFeature,TopojsonMesh,Parse)
        , Format(CSV, TSV)
          --, Geometry(GeoPoint,GeoPoints ,GeoLine ,GeoLines ,GeoPolygon,GeoPolygons)
        , Geometry
        , HAlign(AlignCenter, AlignLeft, AlignRight)
          --, HeaderProperty(HFormat,HTitle)
        , HeaderProperty
          --, HyperlinkChannel(HAggregate, HBin, HDataCondition, HName, HRepeat, HSelectionCondition, HString, HTimeUnit, HmType)
        , HyperlinkChannel
          --, InputProperty(Debounce, Element, InOptions, InMin , InMax ,InName ,InStep ,InPlaceholder)
        , InputProperty
        , LabelledSpec
        , Legend(Gradient, Symbol)
          --, LegendConfig(CornerRadius, EntryPadding, FillColor, GradientHeight, GradientLabelBaseline, GradientLabelLimit, GradientLabelOffset, GradientStrokeColor, GradientStrokeWidth, GradientWidth, LeLabelAlign, LeLabelBaseline, LeLabelColor, LeLabelFont, LeLabelFontSize, LeLabelLimit, LeLabelOffset, LePadding, LeShortTimeLabels, LeStrokeDash, LeStrokeWidth, LeTitleAlign, LeTitleBaseline, LeTitleColor, LeTitleFont, LeTitleFontSize, LeTitleFontWeight, LeTitleLimit, LeTitlePadding, Offset, Orient, StrokeColor, SymbolColor, SymbolSize, SymbolStrokeWidth, SymbolType)
        , LegendConfig
        , LegendOrientation(BottomLeft, BottomRight, Left, None, Right, TopLeft, TopRight)
          --, LegendProperty(LEntryPadding ,LFormat ,LOffset ,LOrient ,LPadding ,LTickCount ,LTitle ,LType ,LValues ,LZIndex)
        , LegendProperty
          --, LegendValues(LDateTimes,LNumbers,LStrings)
        , LegendValues
          --, Mark(Area, Bar, Circle, Geoshape, Line, Point, Rect, Rule, Square, Text, Tick)
        , Mark
          --, MarkChannel(MAggregate, MBin, MBoolean, MDataCondition, MLegend, MName, MNumber, MPath, MRepeat, MScale, MSelectionCondition, MString, MTimeUnit, MmType)
        , MarkChannel
        , MarkInterpolation(Basis, BasisClosed, BasisOpen, Bundle, Cardinal, CardinalClosed, CardinalOpen, Linear, LinearClosed, Monotone, StepAfter, StepBefore, Stepwise)
        , MarkOrientation(Horizontal, Vertical)
          --, MarkProperty(MAlign, MAngle, MBandSize, MBaseline, MBinSpacing, MClip, MColor, MContinuousBandSize, MCursor, MDiscreteBandSize, MFill, MFillOpacity, MFilled, MFont, MFontSize, MFontStyle, MFontWeight, MInterpolate, MOpacity, MOrient, MRadius, MShape, MShortTimeLabels, MSize, MStroke, MStrokeDash, MStrokeDashOffset, MStrokeOpacity, MStrokeWidth, MStyle, MTension, MText, MTheta, MThickness, MdX, MdY)
        , MarkProperty
        , Measurement(GeoFeature, Nominal, Ordinal, Quantitative, Temporal)
        , MonthName(Apr, Aug, Dec, Feb, Jan, Jul, Jun, Mar, May, Nov, Oct, Sep)
        , Operation(ArgMax, ArgMin, Average, CI0, CI1, Count, Distinct, Max, Mean, Median, Min, Missing, Q1, Q3, Stderr, Stdev, StdevP, Sum, Valid, Variance, VarianceP)
          --, OrderChannel(OAggregate, OBin, OName, ORepeat, OSort, OTimeUnit, OmType)
        , OrderChannel
        , OverlapStrategy(OGreedy, ONone, OParity)
          --, Padding(PSize,PEdges)
        , Padding
        , Position(Latitude, Latitude2, Longitude, Longitude2, X, X2, Y, Y2)
          --, PositionChannel(PAggregate, PAxis, PBin, PName, PRepeat, PScale, PSort, PStack, PTimeUnit, PmType)
        , PositionChannel
          --, Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Custom, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
        , Projection(Albers, AlbersUsa, AzimuthalEqualArea, AzimuthalEquidistant, ConicConformal, ConicEqualArea, ConicEquidistant, Equirectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator)
          --, ProjectionProperty(PCenter, PClipAngle, PClipExtent, PCoefficient, PDistance, PFraction, PLobes, PParallel, PPrecision, PRadius, PRatio, PRotate, PSpacing, PTilt, PType)
        , ProjectionProperty
          --, RangeConfig(RCategory, RDiverging, RHeatmap, ROrdinal, RRamp, RSymbol)
        , RangeConfig
          --, RepeatFields(RowFields,ColumnFields)
        , RepeatFields
        , Resolution(Independent, Shared)
          --, Resolve(RAxis,RLegend,RScale)
        , Resolve
        , Scale(ScBand, ScBinLinear, ScBinOrdinal, ScLinear, ScLog, ScOrdinal, ScPoint, ScPow, ScSequential, ScSqrt, ScTime, ScUtc)
          --, ScaleConfig(SCBandPaddingInner, SCBandPaddingOuter, SCClamp, SCMaxBandSize, SCMaxFontSize, SCMaxOpacity, SCMaxSize, SCMaxStrokeWidth, SCMinBandSize, SCMinFontSize, SCMinOpacity, SCMinSize, SCMinStrokeWidth, SCPointPadding, SCRangeStep, SCRound, SCTextXRangeStep, SCUseUnaggregatedDomain)
        , ScaleConfig
          --, ScaleDomain(DNumbers,DStrings ,DDateTimes ,DSelection,Unaggregated)
        , ScaleDomain(Unaggregated)
          --, ScaleNice(NMillisecond, NSecond, NMinute, NHour, NDay, NWeek, NMonth, NYear, NInterval,IsNice,NTickCount)
        , ScaleNice(NDay, NHour, NMillisecond, NMinute, NMonth, NSecond, NWeek, NYear)
          --, ScaleProperty(SType,SDomain ,SRange , SScheme , SPadding , SPaddingInner , SPaddingOuter , SRangeStep , SRound , SClamp ,SInterpolate, SNice , SZero , SReverse )
        , ScaleProperty
          --, ScaleRange(RNumbers,RStrings,RName)
        , ScaleRange
        , Selection(Interval, Multi, Single)
          --, SelectionMarkProperty(SMFill, SMFillOpacity, SMStroke, SMStrokeDash, SMStrokeDashOffset, SMStrokeOpacity, SMStrokeWidth)
        , SelectionMarkProperty
          --, SelectionProperty(Bind, BindScales, Empty, Encodings, Fields, Nearest, On, ResolveSelections, SelectionMark, Toggle, Translate, Zoom)
        , SelectionProperty(BindScales, Empty)
        , SelectionResolution(Global, Intersection, Union)
        , Side(SBottom, SLeft, SRight, STop)
          --, SortProperty(Ascending, ByField, ByRepeat, Descending, Op)
        , SortProperty(Ascending, Descending)
        , Spec
        , StackProperty(NoStack, StCenter, StNormalize, StZero)
          --, Symbol(Cross, Diamond, Path, SymCircle, SymSquare, TriangleDown, TriangleUp)
        , Symbol(Cross, Diamond, SymCircle, SymSquare, TriangleDown, TriangleUp)
          --, TextChannel(TAggregate, TBin, TDataCondition, TFormat, TName, TRepeat, TSelectionCondition, TTimeUnit, TmType)
        , TextChannel
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
        , bin
          -- TODO: Make bin private in next major version.
        , binAs
        , boo
        , boos
        , calculateAs
        , categoricalDomainMap
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
          --, ClipRect(LTRB, NoClip)
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
        , dataRow
        , datasets
        , description
        , detail
        , doDts
        , doNums
        , doSelection
        , doStrs
        , domainRangeMap
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
        , expr
        , fAggregate
        , fBin
        , fHeader
        , fMType
        , fName
        , fTimeUnit
        , facet
        , fiCompose
        , fiEqual
        , fiExpr
        , fiOneOf
        , fiRange
        , fiSelection
        , fill
        , filter
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
        , hdTitle
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
        , jsonProperty
        , layer
        , leDts
        , leEntryPadding
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
        , maAlign
        , maAngle
        , maBandSize
        , maBaseline
        , maBinSpacing
        , maClip
        , maColor
        , maContinuousBandSize
        , maCursor
        , maDiscreteBandSize
        , maDx
        , maDy
        , maFill
        , maFillOpacity
        , maFilled
        , maFont
        , maFontSize
        , maFontStyle
        , maFontWeight
        , maInterpolate
        , maOpacity
        , maOrient
        , maRadius
        , maShape
        , maShortTimeLabels
        , maSize
        , maStroke
        , maStrokeDash
        , maStrokeDashOffset
        , maStrokeOpacity
        , maStrokeWidth
        , maStyle
        , maTension
        , maText
        , maTheta
        , maThickness
        , mark
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
        , pMType
        , pName
        , pRepeat
        , pScale
        , pSort
        , pStack
        , pTimeUnit
        , paEdges
        , paSize
        , padding
        , parse
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
        , scIsNice
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
        , text
        , textMark
        , tick
        , timeUnitAs
        , title
        , toVegaLite
        , tooltip
        , topojsonFeature
        , topojsonMesh
        , trail
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

@docs Format
@docs jsonProperty
@docs topojsonFeature
@docs topojsonMesh
@docs parse

@docs foDate
@docs foUtc


# Creating the Transform Specification

Functions and types for declaring the transformation rules that are applied to
data fields or geospatial coordinates before they are encoded visually.

@docs transform


## Map Projections

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

@docs fiEqual
@docs fiExpr
@docs fiCompose
@docs fiSelection
@docs fiOneOf
@docs fiRange
@docs numRange
@docs dtRange


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


## Mark Properties

@docs maAlign
@docs maAngle
@docs maBandSize
@docs maBaseline
@docs maBinSpacing
@docs maClip
@docs maColor
@docs maCursor
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
@docs maRadius
@docs maShape
@docs maShortTimeLabels
@docs maSize
@docs maStroke
@docs maStrokeDash
@docs maStrokeDashOffset
@docs maStrokeOpacity
@docs maStrokeWidth
@docs maStyle
@docs maTension
@docs maText
@docs maTheta
@docs maThickness


### Used by Mark Properties

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
@docs soByField
@docs soByRepeat
@docs soCustom


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
@docs mNum
@docs mStr
@docs mBoo


### Mark Legends

@docs leEntryPadding
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
@docs hStr


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
@docs scIsNice
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
views have potentially conflicting channels (for example, two position scales in
a layered visualization) the rules for resolving them can be defined with `resolve`.
For details of creating composite views see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/composition.html)

@docs layer
@docs hConcat
@docs vConcat
@docs resolve
@docs resolution
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
@docs hdTitle
@docs hdFormat


# Creating Selections for Interaction

Selections are the way in which interactions (such as clicking or dragging) can be
responded to in a visualization. They transform interactions into data queries.
For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html).

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
                      [ mStr "grey" ]
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
                        [ mStr "#ddd" ]
                        [ mStr "#0099ee" ]
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
@docs paSize
@docs paEdges
@docs autosize
@docs background
@docs configure
@docs configuration


## Style Setting

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

@docs Autosize


## Axis Configuration Options

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

@docs racoCategory
@docs racoDiverging
@docs racoHeatmap
@docs racoOrdinal
@docs racoRamp
@docs racoSymbol

@docs TitleConfig
@docs APosition
@docs ViewConfig

@docs FieldTitleProperty


# General Data Types

In addition to more general data types like integers and string, the following types
can carry data used in specifications.

@docs boo
@docs dt
@docs num
@docs str
@docs boos
@docs dts
@docs nums
@docs strs


## Temporal Data Types

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

---


# Deprecated Types and functions

The following are deprecated and will be removed in a future major version release.
Generally, the constructors of each type should be replaced with a function of
a similar name. For example, instead of the `Rule` type use the `rule` function;
instead of `PAggregate` use `pAggregate`, instead of `TmType` use `tMType` etc.

@docs PositionChannel
@docs MarkChannel
@docs DetailChannel
@docs FacetChannel
@docs HyperlinkChannel
@docs OrderChannel
@docs TextChannel

@docs Mark
@docs mark
@docs MarkProperty

@docs BooleanOp
@docs bin
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


{-| _Note: specifying axis configuration properties with type constructors (`BandPosition`,
`Domain`, `Grid` etc.) is deprecated in favour of calling their equivalent property
specifying functions (`axcoBandPosition`, `axcoDomain`, `axcoGrid` etc.)_

Axis configuration options for customising all axes. See the
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


{-| Specify a default axis band position. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoBandPosition : Float -> AxisConfig
axcoBandPosition =
    BandPosition


{-| Specify whether or not an axis domain should be displayed by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoDomain : Bool -> AxisConfig
axcoDomain =
    Domain


{-| Specify a default axis domain colour. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoDomainColor : String -> AxisConfig
axcoDomainColor =
    DomainColor


{-| Specify a default axis domain width style. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoDomainWidth : Float -> AxisConfig
axcoDomainWidth =
    DomainWidth


{-| Specify a default maximum extent style. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoMaxExtent : Float -> AxisConfig
axcoMaxExtent =
    MaxExtent


{-| Specify a default minimum extent style. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoMinExtent : Float -> AxisConfig
axcoMinExtent =
    MinExtent


{-| Specify whether or not an axis grid is displayed by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoGrid : Bool -> AxisConfig
axcoGrid =
    Grid


{-| Specify a default axis grid color style. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoGridColor : String -> AxisConfig
axcoGridColor =
    GridColor


{-| Specify a default axis line dash style. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoGridDash : List Float -> AxisConfig
axcoGridDash =
    GridDash


{-| Specify a default axis grid line opacity. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoGridOpacity : Float -> AxisConfig
axcoGridOpacity =
    GridOpacity


{-| Specify a default axis grid line width. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoGridWidth : Float -> AxisConfig
axcoGridWidth =
    GridWidth


{-| Specify whether or not an axis has labels by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabels : Bool -> AxisConfig
axcoLabels =
    Labels


{-| Specify a default axis label angle. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelAngle : Float -> AxisConfig
axcoLabelAngle =
    LabelAngle


{-| Specify a default axis label color. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelColor : String -> AxisConfig
axcoLabelColor =
    LabelColor


{-| Specify a default axis label font. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelFont : String -> AxisConfig
axcoLabelFont =
    LabelFont


{-| Specify a default axis label font size. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelFontSize : Float -> AxisConfig
axcoLabelFontSize =
    LabelFontSize


{-| Specify a default axis label limit (how much a label can extend beyond the
left/bottom or right/top of the axis line). For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelLimit : Float -> AxisConfig
axcoLabelLimit =
    LabelLimit


{-| Specify a default axis label overlap strategy for cases where lables cannot
fit within the alotted space. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelOverlap : OverlapStrategy -> AxisConfig
axcoLabelOverlap =
    LabelOverlap


{-| Specify a default axis label padding (space between labels in pixels). For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoLabelPadding : Float -> AxisConfig
axcoLabelPadding =
    LabelPadding


{-| Specify whether or not an axis should use short time labels by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoShortTimeLabels : Bool -> AxisConfig
axcoShortTimeLabels =
    ShortTimeLabels


{-| Specify whether or not an axis should show ticks by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTicks : Bool -> AxisConfig
axcoTicks =
    Ticks


{-| Specify a default axis tick mark color. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTickColor : String -> AxisConfig
axcoTickColor =
    TickColor


{-| Specify whether or not axis tick labels use rounded values by default. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTickRound : Bool -> AxisConfig
axcoTickRound =
    TickRound


{-| Specify a default axis tick mark size in pixel units. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTickSize : Float -> AxisConfig
axcoTickSize =
    TickSize


{-| Specify a default axis tick mark width in pixel units. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTickWidth : Float -> AxisConfig
axcoTickWidth =
    TickWidth


{-| Specify a default axis tick label horizontal aligment. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleAlign : HAlign -> AxisConfig
axcoTitleAlign =
    TitleAlign


{-| Specify a default axis title angle. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleAngle : Float -> AxisConfig
axcoTitleAngle =
    TitleAngle


{-| Specify a default axis title vertical alignment. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleBaseline : VAlign -> AxisConfig
axcoTitleBaseline =
    TitleBaseline


{-| Specify a default axis title color. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleColor : String -> AxisConfig
axcoTitleColor =
    TitleColor


{-| Specify a default axis title font. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleFont : String -> AxisConfig
axcoTitleFont =
    TitleFont


{-| Specify a default axis title font weight. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleFontWeight : FontWeight -> AxisConfig
axcoTitleFontWeight =
    TitleFontWeight


{-| Specify a default axis title font size. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleFontSize : Float -> AxisConfig
axcoTitleFontSize =
    TitleFontSize


{-| Specify a default axis title maximum size. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleLimit : Float -> AxisConfig
axcoTitleLimit =
    TitleLimit


{-| Specify a default axis title maximum length when generated automatically from
a field's description. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleMaxLength : Float -> AxisConfig
axcoTitleMaxLength =
    TitleMaxLength


{-| Specify a default axis title padding between axis line and text. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitlePadding : Float -> AxisConfig
axcoTitlePadding =
    TitlePadding


{-| Specify a default axis x-position relative to the axis group. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleX : Float -> AxisConfig
axcoTitleX =
    TitleX


{-| Specify a default axis y-position relative to the axis group. For more details, see the
[Vega-Lite axis config documentation](https://vega.github.io/vega-lite/docs/axis.html#general-config).
-}
axcoTitleY : Float -> AxisConfig
axcoTitleY =
    TitleY


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


{-| _Note: referencing configuration properties with type constructors (`AreaStyle`,
`Autosize`, `Axis` etc.) is deprecated in favour of calling their equivalent
configuration functions (`coArea`, `coAutosize`, `coAxis` etc.)._

Type of configuration property to customise. See the
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
            << dataColumn "easting" (nums [ -3, 4, 4, -3, -3 ])
            << dataColumn "northing" (nums [ 52, 52, 45, 45, 52 ])

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


{-| Indicates the type of data to be parsed when reading input data. When parsing
dates, you should use the `foDate` or `foUtc` functions rather than their
equivalent (deprecated) type constructors.
-}
type DataType
    = FoNumber
    | FoBoolean
    | FoDate String
    | FoUtc String


{-| _Note: referencing data types with type constructors (`Boolean`, `DateTime`,
`Number` and `Str`) is deprecated in favour of calling their equivalent data value
functions (`boo`, `dt`, `num` and `str`)._

A single data value. This is used when a function can accept values of different
types (e.g. either a number or a string).

-}
type DataValue
    = Boolean Bool
    | DateTime (List DateTime)
    | Number Float
    | Str String


{-| _Note: referencing lists of data types with type constructors (`Booleans`,
`DateTimes`, `Numbers` and `Strings`) is deprecated in favour of calling their
equivalent data value list functions (`boos`, `dts`, `nums` and `strs`)._

A list of data values. This is used when a function can accept lists of
different types (e.g. either a list of numbers or a list of strings).

-}
type DataValues
    = Booleans (List Bool)
    | DateTimes (List (List DateTime))
    | Numbers (List Float)
    | Strings (List String)


{-| _Note: referencing dateTime type constructors (`DTYear`, `DTHours` etc.)
is deprecated in favour of calling their equivalent dateTime functions
(`dtYear`, `dtHour` etc.)_

Allows a date or time to be represented. This is typically part of a list of
functions that each generate a `DateTime` item to provide a specific point in
time. For details see the
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


{-| _Note: facet channel type constructors (`FName`, `FBin` etc.) are
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


{-| _Note: facet mapping type constructors (`ColumnBy` and `RowBy` ) are
deprecated in favour of calling their equivalent facet mapping functions
(`columnBy` and `rowBy`)_

Provides details of the mapping between a row or column and its field
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


{-| _Note: referencing filter type constructors (`FEqual`, `FExpr` etc.)
is deprecated in favour of calling their equivalent filtering functions
(`fiEqual`, `fiExpr` etc.)_

Type of filtering operation. See the
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


{-| _Note: referencing filter range type constructors (`NumberRange` and `DateRange`)
is deprecated in favour of calling their equivalent filtering range functions
(`numRange` and `dtRange`.)_

A pair of filter range data values. The first argument is the inclusive minimum
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
format explicitly. However this can be useful if the filename extension does not
indicate type (e.g. `.txt`). To customise the parsing of a file use one of the
functions `parse`, `jsonProperty`, `topojsonFeature` or `topojsonMesh` in preference
to their (depcrecated) type constructor eqivalents. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/data.html#format).
-}
type Format
    = JSON String
    | CSV
    | TSV
    | TopojsonFeature String
    | TopojsonMesh String
    | Parse (List ( String, DataType ))


{-| _Note: referencing geometry type constructors (`GeoPoint`, `GeoLine` etc.)
is deprecated in favour of calling their equivalent geometry functions
(`geoPoint`, `geoLine` etc.)_

Specifies the type and content of geometry specifications for programatically
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


{-| _Note: referencing header property type constructors (`HFormat` and `HTitle`)
is deprecated in favour of calling their equivalent header property functions
(`hdFormat`, `hdTitle` etc.)_

Represents a facet header property. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#header)

-}
type HeaderProperty
    = HFormat String
    | HTitle String


{-| Header format specifier for a faceted view. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#header)
-}
hdFormat : String -> HeaderProperty
hdFormat =
    HFormat


{-| Specify a header title in a faceted view. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#header)
-}
hdTitle : String -> HeaderProperty
hdTitle =
    HTitle


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


{-| _Note: specifying input properties with type constructors (`InMin`,
`InOptions` etc.) is deprecated in favour of calling their equivalent property
specifying functions (`inMin`, `inOptions` etc.)_

GUI Input properties. The type of relevant property will depend on the type of
input element selected. For example an `InRange` (slider) can have numeric min,
max and step values; InSelect (selector) has a list of selection label options.
For details see the
[Vega input element binding documentation](https://vega.github.io/vega/docs/signals/#bind).

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


{-| _Note: specifying legend configuration properties with type constructors
(`CornerRadius`, `FillColor`, `LePadding` etc.) is deprecated in favour of
calling their equivalent property specifying functions (`lecoCornerRadius`,
`lecoFillColor`, `lecoPadding` etc.)_

Legend configuration options. For more detail see the
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


{-| _Note: referencing legend property type constructors (`LFormat`, lTitle`etc.)
is deprecated in favour of calling their equivalent legend property functions
(`leFormat`,`leTitle` etc.)_

Legend properties for customising a mark legend. For more detail see the
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


{-| _Note: referencing legend value type constructors (`LNumbers`, `LStrings`
and `LDateTimes`) is deprecated in favour of calling their equivalent legend value
functions (`leNums`, `leStrs` and `leDts`)_

A list of data values suitable for setting legend values.

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


{-| _Note: referencing mark property type constructors (`MAlign`, `MFill` etc.)
is deprecated in favour of calling their equivalent mark property functions
(`maAlign`, `maFill` etc.)_

Properties for customising the appearance of a mark. For details see the
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


{-| _Note: referencing padding type constructors (`PSize` and `PEdges`) is
deprecated in favour of calling their equivalent padding functions
(`paSize` and `paEdges`)_

Represents padding dimensions in pixel units. `PSize` will set the same value
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


{-| _Note: specifying projection properties with type constructors (`PType`,
`PClipAngle` etc.) is deprecated in favour of calling their equivalent
projection property functions (`prType`, `prClipAngle` etc.)_

Properties for customising a geospatial projection that converts longitude/latitude
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


{-| _Note: specifying range configuration properties with type constructors
(`RCategory`, `RDiverging`, etc.) is deprecated in favour of calling their
equivalent property specifying functions (`racoCategory`,`racoDiverging`, etc.)_

Properties for customising the colors of a range. The parameter should be a
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


{-| _Note: specifying repeat fields with type constructors (`RowFields` and
`ColumnFields` ) is deprecated in favour of calling their equivalent functions
(`rowFields`, `columnFields`)_

Create a list of fields to use in set of repeated small multiples. The list of
fields named here can be referenced in an encoding with `pRepeat Column`, `pRepeat Row`
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


{-| _Note: specifying resolve items with type constructors (`RAxis`,
`RLegend` and `RScale`) is deprecated in favour of calling their equivalent
resolve functions (`reAxis`, `reLegend` and `reScale`)_

Used to determine how a channel's axis, scale or legend domains should be resolved
if defined in more than one view in a composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.

-}
type Resolve
    = RAxis (List ( Channel, Resolution ))
    | RLegend (List ( Channel, Resolution ))
    | RScale (List ( Channel, Resolution ))


{-| Specify how a channel's axes should be resolved when defined in more
than one view in a composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.
-}
reAxis : List ( Channel, Resolution ) -> Resolve
reAxis =
    RAxis


{-| Specify how a channel's legends should be resolved when defined in more
than one view in a composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.
-}
reLegend : List ( Channel, Resolution ) -> Resolve
reLegend =
    RLegend


{-| Specify how a channel's scales should be resolved when defined in more
than one view in a composite visualization. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/resolve.html) for
details.
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


{-| _Note: specifying scale configuration properties with type constructors
(`SCBandPaddingInner`, `SCClamp`, etc.) is deprecated in favour of calling their
equivalent property specifying functions (`socoBandPaddingInner`,`sacoClamp`, etc.)_

Scale configuration property. These are used to configure all scales.
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


{-| Describes a scale domain (type of data in scale). To specify scale domain
values explicitly, use the functions `doNums`, `doStrs`, `doDts` or `doSelection`
rather than their (deprecated) type constructor equivalents.

For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).

-}
type ScaleDomain
    = DNumbers (List Float)
    | DStrings (List String)
    | DDateTimes (List (List DateTime))
    | DSelection String
    | Unaggregated


{-| Describes the way a scale can be rounded to 'nice' numbers. To specify nice
time intervals use `scNiceInterval` rather then the deprecated type constructor
`NInterval`; to switch nice scaling on or off use `scIsNice` rather than the
deprecated type constructor `IsNice`; and to set a nice tick count use the
`scNiceTickCount` function rather than the deprecated `NTickCount` type constructor.

For details see the
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


{-| _Note: specifying scale properties with type constructors (`SDomain`,
`SRange` etc.) is deprecated in favour of calling their equivalent property
specifying functions (`scDomain`, `scRange` etc.)_

Individual scale property. These are used to customise an individual scale
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
    | SReverse Bool


{-| _Note: specifying scale ranges with type constructors (`RNumbers`,
`RStrings` and `RName`) is deprecated in favour of calling their equivalent
functions (`raNums`, `raStrs` and `raName`.)_

Describes a scale range of scale output values. For details see the
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


{-| _Note: specifying selection mark properties with type constructors (`SMFill`,
`SMStroke` etc.) is deprecated in favour of calling their equivalent functions
(`smFill`, `smStroke` etc.)_

Properties for customising the appearance of an interval selection mark (dragged
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


{-| Properties for customising the nature of an interactive selection. See the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#selection-properties)
for details. For parameterised properties use relevant functions (e.g. `seOn`,
`seEncodings`, `seBind` etc.) rather than the (deprecated) type constructors
(On, Encodings, Bind etc.).
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


{-| Represents one side of a rectangular space.
-}
type Side
    = STop
    | SBottom
    | SLeft
    | SRight


{-| Allow type of sorting to be customised. To sort a field by the aggregated
values of another use the `soByField` or `soByRepeat` functions rather than their
deprecated type constructor equivalents `ByField` and `ByRepeat`.

For details see the
[Vega-Lite sorting documentation](https://vega.github.io/vega-lite/docs/sort.html).

-}
type SortProperty
    = Ascending
    | Descending
    | ByField String Operation
    | ByRepeat Arrangement Operation
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

    area [ maStroke "white" ]

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

    bar [ maFill "black", maStroke "white", maStrokeWeight 2 ]

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

    circle [ maStroke "red", maStrokeWeight 2 ]

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


{-| Configure the default appearance of area marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coArea : List MarkProperty -> ConfigurationProperty
coArea =
    AreaStyle


{-| Configure the default sizing of visualizations. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coAutosize : List Autosize -> ConfigurationProperty
coAutosize =
    Autosize


{-| Configure the default appearance of axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxis : List AxisConfig -> ConfigurationProperty
coAxis =
    Axis


{-| Configure the default appearance of x-axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisX : List AxisConfig -> ConfigurationProperty
coAxisX =
    AxisX


{-| Configure the default appearance of y-axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisY : List AxisConfig -> ConfigurationProperty
coAxisY =
    AxisY


{-| Configure the default appearance of left-side axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisLeft : List AxisConfig -> ConfigurationProperty
coAxisLeft =
    AxisLeft


{-| Configure the default appearance of right-side axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisRight : List AxisConfig -> ConfigurationProperty
coAxisRight =
    AxisRight


{-| Configure the default appearance of top-side axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisTop : List AxisConfig -> ConfigurationProperty
coAxisTop =
    AxisTop


{-| Configure the default appearance of bottom-side axes. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisBottom : List AxisConfig -> ConfigurationProperty
coAxisBottom =
    AxisBottom


{-| Configure the default appearance of axes with band scaling. For details, see the
[Vega-Lite axis configuration documentation](https://vega.github.io/vega-lite/docs/config.html#axis-config)
-}
coAxisBand : List AxisConfig -> ConfigurationProperty
coAxisBand =
    AxisBand


{-| Configure the default background colour of visualizations. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coBackground : String -> ConfigurationProperty
coBackground =
    Background


{-| Configure the default appearance of bar marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coBar : List MarkProperty -> ConfigurationProperty
coBar =
    BarStyle


{-| Configure the default appearance of circle marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coCircle : List MarkProperty -> ConfigurationProperty
coCircle =
    CircleStyle


{-| Configure the default title style for count fields. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coCountTitle : String -> ConfigurationProperty
coCountTitle =
    CountTitle


{-| Configure the default title generation style for fields. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coFieldTitle : FieldTitleProperty -> ConfigurationProperty
coFieldTitle =
    FieldTitle


{-| Configure the default appearance of geoshape marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coGeoshape : List MarkProperty -> ConfigurationProperty
coGeoshape =
    GeoshapeStyle


{-| Configure the default appearance of legends. For details, see the
[Vega-Lite legend configuration documentation](https://vega.github.io/vega-lite/docs/config.html#legend-config)
-}
coLegend : List LegendConfig -> ConfigurationProperty
coLegend =
    Legend


{-| Configure the default appearance of line marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coLine : List MarkProperty -> ConfigurationProperty
coLine =
    LineStyle


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


{-| Specify the mapping between a column and its field definitions in a set of
faceted small multiples. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#mapping)
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


{-| Configure the default mark appearance. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coMark : List MarkProperty -> ConfigurationProperty
coMark =
    MarkStyle


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


{-| Configure the default appearance of a named style. For details, see the
[Vega-Lite mark style configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coNamedStyle : String -> List MarkProperty -> ConfigurationProperty
coNamedStyle =
    NamedStyle


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


{-| Configure the default number formatting for axis and text labels. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coNumberFormat : String -> ConfigurationProperty
coNumberFormat =
    NumberFormat


{-| Configure the default padding in pixels from the edge of the of visualization
to the data rectangle. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coPadding : Padding -> ConfigurationProperty
coPadding =
    Padding


{-| Configure the default appearance of point marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coPoint : List MarkProperty -> ConfigurationProperty
coPoint =
    PointStyle


{-| Configure the default style of map projections. For details, see the
[Vega-Lite projection configuration documentation](https://vega.github.io/vega-lite/docs/config.html#projection-config)
-}
coProjection : List ProjectionProperty -> ConfigurationProperty
coProjection =
    Projection


{-| Configure the default range properties used when scaling. For details, see the
[Vega-Lite scale range configuration documentation](https://vega.github.io/vega-lite/docs/config.html#scale-config)
-}
coRange : List RangeConfig -> ConfigurationProperty
coRange =
    Range


{-| Configure the default appearance of rectangle marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coRect : List MarkProperty -> ConfigurationProperty
coRect =
    RectStyle


{-| Configure the default handling of invalid (`null` and `NaN`) values. If `true`,
invalid values are skipped or filtered out when represented as marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coRemoveInvalid : Bool -> ConfigurationProperty
coRemoveInvalid =
    RemoveInvalid


{-| Configure the default appearance of rule marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coRule : List MarkProperty -> ConfigurationProperty
coRule =
    RuleStyle


{-| Configure the default scale properties used when scaling. For details, see the
[Vega-Lite scale configuration documentation](https://vega.github.io/vega-lite/docs/config.html#scale-config)
-}
coScale : List ScaleConfig -> ConfigurationProperty
coScale =
    Scale


{-| Configure the default appearance of selection marks. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/config.html)
-}
coSelection : List ( Selection, List SelectionProperty ) -> ConfigurationProperty
coSelection =
    SelectionStyle


{-| Configure the default appearance of square marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coSquare : List MarkProperty -> ConfigurationProperty
coSquare =
    SquareStyle


{-| Configure the default stack offset style for stackable marks. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
-}
coStack : StackProperty -> ConfigurationProperty
coStack =
    Stack


{-| Configure the default appearance of text marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coText : List MarkProperty -> ConfigurationProperty
coText =
    TextStyle


{-| Configure the default appearance of tick marks. For details, see the
[Vega-Lite mark configuration documentation](https://vega.github.io/vega-lite/docs/config.html#mark-config)
-}
coTick : List MarkProperty -> ConfigurationProperty
coTick =
    TickStyle


{-| Configure the default style of visualization titles. For details, see the
[Vega-Lite title configuration documentation](https://vega.github.io/vega-lite/docs/config.html#title-config)
-}
coTitle : List TitleConfig -> ConfigurationProperty
coTitle =
    TitleStyle


{-| Configure the default time format for axis and legend labels. For details, see the
[Vega-Lite top-level configuration documentation](https://vega.github.io/vega-lite/docs/config.html#top-level-config)
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


{-| Configure the default single view style. For details, see the
[Vega-Lite view configuration documentation](https://vega.github.io/vega-lite/docs/config.html#view-configuration)
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
projection to use (e.g. `customProjection winkel3`).
-}
customProjection : String -> Projection
customProjection =
    Custom


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
        dataFromColumns [ Parse [ ( "Year", foDate "%Y" ) ] ]
            << dataColumn "Animal" (strs [ "Fish", "Dog", "Cat" ])
            << dataColumn "Age" (nums [ 28, 12, 6 ])
            << dataColumn "Year" (strs [ "2010", "2014", "2015" ])

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
        dataFromRows [ Parse [ ( "Year", foDate "%Y" ) ] ]
            << dataRow [ ( "Animal", str "Fish" ), ( "Age", num 28 ), ( "Year", str "2010" ) ]
            << dataRow [ ( "Animal", str "Dog" ), ( "Age", num 12 ), ( "Year", str "2014" ) ]
            << dataRow [ ( "Animal", str "Cat" ), ( "Age", num 6 ), ( "Year", str "2015" ) ]

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
        [ dataFromUrl "data/weather.csv" [ Parse [ ( "date", foDate "%Y-%m-%d %H:%M" ) ] ]
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

    dataRow [ ("Animal", str "Fish"), ("Age", num 28), ("Year", str "2010") ] []

-}
dataRow : List ( String, DataValue ) -> List DataRow -> List DataRow
dataRow row =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, dataValueSpec val )) row))


{-| Create a dataset comprising a collection of named `Data` items. Each data item
can be created with normal data generating functions such as `dataFromRows` or
`dataFromJson`. These can be later referred to using `dataFromSource`.

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


{-| Specify the date-time values that define a scale domain. For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).
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


{-| Specify the numeric values that define a scale domain. For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).
-}
doNums : List Float -> ScaleDomain
doNums =
    DNumbers


{-| Specify a scale domain based on a named ineractive selection. For full details see
the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).
-}
doSelection : String -> ScaleDomain
doSelection =
    DSelection


{-| Specify the string values that define a scale domain. For full details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#domain).
-}
doStrs : List String -> ScaleDomain
doStrs =
    DStrings


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
with a level of detail (grouping) channel. For details, see the
[Vega-Lite time unit documentation](https://vega.github.io/vega-lite/docs/timeunit.html)
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


{-| Specify the min max date-time range to be used in data filtering.
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


{-| Build up a filtering predicate through logical composition (`and`, `or` etc.).
See the [Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html)
for details.
-}
fiCompose : BooleanOp -> Filter
fiCompose =
    FCompose


{-| Filter a data stream so that only data in a given field equal to the given
value are used. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html).
-}
fiEqual : String -> DataValue -> Filter
fiEqual =
    FEqual


{-| Filter a data stream so that only data that satisfy the given predicate
expression are used. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html).
-}
fiExpr : String -> Filter
fiExpr =
    FExpr


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
            << filter (fiEqual "Animal" (str "Cat"))

Filter operations can combine selections and data predicates with `BooleanOp` expressions:

    trans =
        transform
            << filter (fiCompose (and (expr "datum.Weight_in_lbs > 3000") (fiSelection "brush")))

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


{-| Filter a data stream so that only data in a given field contained in the given
list of values are used. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html).
-}
fiOneOf : String -> DataValues -> Filter
fiOneOf =
    FOneOf


{-| Filter a data stream so that only data in a given field that are within the
given range are used. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html).
-}
fiRange : String -> FilterRange -> Filter
fiRange =
    FRange


{-| Filter a data stream so that only data in a given field that are within the
given interactive selection are used. For details, see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/filter.html).
-}
fiSelection : String -> Filter
fiSelection =
    FSelection


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


{-| Specity a date format for parsing input data. Formatting can be specified using
[D3's formatting specifiers](https://vega.github.io/vega-lite/docs/data.html#format)
or left as an empty string if default date formatting is to be applied. Care should
be taken when assuming default parsing of dates because different browsers can
parse dates differently. Being explicit about the date format is usually safer.
-}
foDate : String -> DataType
foDate =
    FoDate


{-| Specity a UTC date format for parsing input data. Formatting can be specified using
[D3's formatting specifiers](https://vega.github.io/vega-lite/docs/data.html#format)
or left as an empty string if default date formatting is to be applied. Care should
be taken when assuming default parsing of UTC dates because different browsers can
parse dates differently. Being explicit about the date format is usually safer.
-}
foUtc : String -> DataType
foUtc =
    FoUtc


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


{-| Specify line geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `line` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoLine : List ( Float, Float ) -> Geometry
geoLine =
    GeoLine


{-| Specify multi-line geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `multi-line` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoLines : List (List ( Float, Float )) -> Geometry
geoLines =
    GeoLines


{-| Specifies a list of geometry objects to be used in a `geoshape` specification.
Each geometry object in this collection can be created with the `geometry` function.

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


{-| Specifies a geometric object to be used in a `geoshape` specification. The
first parameter is the geometric type, the second an optional list of properties
to be associated with the object.

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


{-| Specify point geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `point` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoPoint : Float -> Float -> Geometry
geoPoint =
    GeoPoint


{-| Specify multi-point geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `multi-point` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoPoints : List ( Float, Float ) -> Geometry
geoPoints =
    GeoPoints


{-| Specify polygon geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoPolygon : List (List ( Float, Float )) -> Geometry
geoPolygon =
    GeoPolygon


{-| Specify multi-polygon geometry for programatically creating GeoShapes. This is equivalent
to the [GeoJson geometry `multi-polygon` type](https://tools.ietf.org/html/rfc7946#section-3.1)
in the GeoJSON specification.
-}
geoPolygons : List (List (List ( Float, Float ))) -> Geometry
geoPolygons =
    GeoPolygons


{-| Specify a an arbitrary shape determined by georaphically referenced
coordinates. For details see the
[Vega Lite documentation](https://vega.github.io/vega-lite/docs/geoshape.html).

    geoshape [ maFill "blue", maStroke "white" ]

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
hStr : String -> HyperlinkChannel
hStr =
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


{-| Specify the delay in input event handling when processing input events in
order to avoid unnecessary event broadcasting. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inDebounce : Float -> InputProperty
inDebounce =
    Debounce


{-| Specify an optional CSS selector indicating the parent element to which an
input element should be added. This allows the option of the input element to be
outside the visualization container. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inElement : String -> InputProperty
inElement =
    Element


{-| Specify the maximum slider value for a range input element. Defaults to the
larger of the signal value and 100. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inMax : Float -> InputProperty
inMax =
    InMax


{-| Specify the minimum slider value for a range input element. Defaults to the
smaller of the signal value and 0. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inMin : Float -> InputProperty
inMin =
    InMin


{-| Specify a custom label for a radio or select input element. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inName : String -> InputProperty
inName =
    InName


{-| Specify a range of options for a radio or select input element. For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inOptions : List String -> InputProperty
inOptions =
    InOptions


{-| Specify the initial placeholding text for input elements such as text fields.
For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inPlaceholder : String -> InputProperty
inPlaceholder =
    InPlaceholder


{-| Specify the the minimum input element range slider increment. If undefined,
the step size will be automatically determined based on the min and max values.
For details see the
[Vega-Lite input element documentation](https://vega.github.io/vega/docs/signals/#bind)
-}
inStep : Float -> InputProperty
inStep =
    InStep


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


{-| Indicates a JSON file format from which a given property is to be extracted
when it has some surrounding structure or meta-data. For example, specifying
the property `values.features` is equivalent to retrieving `json.values.features`
from the loaded JSON object.with a custom delimeter. For details, see the
[Vega-Lite JSON documentation](https://vega.github.io/vega-lite/docs/data.html#json).
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


{-| Specify a default legend corner radius. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoCornerRadius : Float -> LegendConfig
lecoCornerRadius =
    CornerRadius


{-| Specify a default spacing between legend items. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoEntryPadding : Float -> LegendConfig
lecoEntryPadding =
    EntryPadding


{-| Specify a default background legend color. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoFillColor : String -> LegendConfig
lecoFillColor =
    FillColor


{-| Specify a default vertical alignment for labels in a color ramp legend. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientLabelBaseline : VAlign -> LegendConfig
lecoGradientLabelBaseline =
    GradientLabelBaseline


{-| Specify a default maximum allowable length for labels in a color ramp legend.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientLabelLimit : Float -> LegendConfig
lecoGradientLabelLimit =
    GradientLabelLimit


{-| Specify a default vertical offset in pixel units for labels in a color ramp legend.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientLabelOffset : Float -> LegendConfig
lecoGradientLabelOffset =
    GradientLabelOffset


{-| Specify a default color for strokes in a color ramp legend. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientStrokeColor : String -> LegendConfig
lecoGradientStrokeColor =
    GradientStrokeColor


{-| Specify a default width for strokes in a color ramp legend. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientStrokeWidth : Float -> LegendConfig
lecoGradientStrokeWidth =
    GradientStrokeWidth


{-| Specify a default height of a color ramp legend. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientHeight : Float -> LegendConfig
lecoGradientHeight =
    GradientHeight


{-| Specify a default width of a color ramp legend. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoGradientWidth : Float -> LegendConfig
lecoGradientWidth =
    GradientWidth


{-| Specify a default horizontal alignment of legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelAlign : HAlign -> LegendConfig
lecoLabelAlign =
    LeLabelAlign


{-| Specify a default vertical alignment of legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelBaseline : VAlign -> LegendConfig
lecoLabelBaseline =
    LeLabelBaseline


{-| Specify a default color for legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelColor : String -> LegendConfig
lecoLabelColor =
    LeLabelColor


{-| Specify a default font for legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelFont : String -> LegendConfig
lecoLabelFont =
    LeLabelFont


{-| Specify a default font size legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelFontSize : Float -> LegendConfig
lecoLabelFontSize =
    LeLabelFontSize


{-| Specify a default maximum width for legend labels in pixel units.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelLimit : Float -> LegendConfig
lecoLabelLimit =
    LeLabelLimit


{-| Specify a default offset for legend labels. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#labels).
-}
lecoLabelOffset : Float -> LegendConfig
lecoLabelOffset =
    LeLabelOffset


{-| Specify a default offset in pixel units between the legend and the enclosing
group or data rectangle. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoOffset : Float -> LegendConfig
lecoOffset =
    Offset


{-| Specify a default legend position relative to the main plot content.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoOrient : LegendOrientation -> LegendConfig
lecoOrient =
    Orient


{-| Specify a default spacing in pixel units between a legend and axis.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoPadding : Float -> LegendConfig
lecoPadding =
    LePadding


{-| Specify whether or not time labels are abbreviated by default in a legend.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoShortTimeLabels : Bool -> LegendConfig
lecoShortTimeLabels =
    LeShortTimeLabels


{-| Specify a default legend border color. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoStrokeColor : String -> LegendConfig
lecoStrokeColor =
    StrokeColor


{-| Specify a default legend border stroke dash style. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoStrokeDash : List Float -> LegendConfig
lecoStrokeDash =
    LeStrokeDash


{-| Specify a default legend border stroke width. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#general).
-}
lecoStrokeWidth : Float -> LegendConfig
lecoStrokeWidth =
    LeStrokeWidth


{-| Specify a default legend symbol color. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#symbols).
-}
lecoSymbolColor : String -> LegendConfig
lecoSymbolColor =
    SymbolColor


{-| Specify a default legend symbol type. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#symbols).
-}
lecoSymbolType : Symbol -> LegendConfig
lecoSymbolType =
    SymbolType


{-| Specify a default legend symbol size. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#symbols).
-}
lecoSymbolSize : Float -> LegendConfig
lecoSymbolSize =
    SymbolSize


{-| Specify a default legend symbol stroke width. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#symbols).
-}
lecoSymbolStrokeWidth : Float -> LegendConfig
lecoSymbolStrokeWidth =
    SymbolStrokeWidth


{-| Specify a default horizontal alignment for legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
-}
lecoTitleAlign : HAlign -> LegendConfig
lecoTitleAlign =
    LeTitleAlign


{-| Specify a default vertical alignment for legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleBaseline : VAlign -> LegendConfig
lecoTitleBaseline =
    LeTitleBaseline


{-| Specify a default color legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleColor : String -> LegendConfig
lecoTitleColor =
    LeTitleColor


{-| Specify a default font for legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleFont : String -> LegendConfig
lecoTitleFont =
    LeTitleFont


{-| Specify a default font size for legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleFontSize : Float -> LegendConfig
lecoTitleFontSize =
    LeTitleFontSize


{-| Specify a default font weight for legend titles. For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleFontWeight : FontWeight -> LegendConfig
lecoTitleFontWeight =
    LeTitleFontWeight


{-| Specify a default maximum size in pixel units for legend titles.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitleLimit : Float -> LegendConfig
lecoTitleLimit =
    LeTitleLimit


{-| Specify a default spacing in pixel units between title and legend.
For more detail see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/legend.html#title).
-}
lecoTitlePadding : Float -> LegendConfig
lecoTitlePadding =
    LeTitlePadding


{-| Specify a set of legend date-times explicitly.
-}
leDts : List (List DateTime) -> LegendValues
leDts =
    LDateTimes


{-| Specify the padding in pixels between legend entries. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leEntryPadding : Float -> LegendProperty
leEntryPadding =
    LEntryPadding


{-| Specify the formatting pattern for legend labels. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
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
/ data rectangle. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leOffset : Float -> LegendProperty
leOffset =
    LOffset


{-| Specify the position of a legend in a scene. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leOrient : LegendOrientation -> LegendProperty
leOrient =
    LOrient


{-| Specify the padding in pixels between a legend and axis. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
lePadding : Float -> LegendProperty
lePadding =
    LPadding


{-| Specify a set of legend strings explicitly.
-}
leStrs : List String -> LegendValues
leStrs =
    LStrings


{-| Specify the number of tick marks in a quantitative legend. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leTickCount : Float -> LegendProperty
leTickCount =
    LTickCount


{-| Specify the title of a legend. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leTitle : String -> LegendProperty
leTitle =
    LTitle


{-| Specify the type of legend (discrete symbols or continuous gradients). For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leType : Legend -> LegendProperty
leType =
    LType


{-| Specify the legend values explicitly. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leValues : LegendValues -> LegendProperty
leValues =
    LValues


{-| Specify the drawing order of a legend relative to other chart elements. To
place a legend in front of others use a positive integer, or 0 to draw behind. For more detail see the
[Vega-Lite legend property documentation](https://vega.github.io/vega-lite/docs/legend.html#legend-properties).
-}
leZIndex : Int -> LegendProperty
leZIndex =
    LZIndex


{-| Specify a line mark for symbolising a sequence of values. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/line.html).

    line [maStroke "red", maStrokeDash [1, 2] ]

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


{-| Specify the horizontal alignment of a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maAlign : HAlign -> MarkProperty
maAlign =
    MAlign


{-| Specify the rotation angle in degrees of a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maAngle : Float -> MarkProperty
maAngle =
    MAngle


{-| Specify the band size in pixels of a bar mark. For details see the
[Vega-Lite bar mark property documentation](https://vega.github.io/vega-lite/docs/bar.html)
-}
maBandSize : Float -> MarkProperty
maBandSize =
    MBandSize


{-| Specify the vertical alignment of a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maBaseline : VAlign -> MarkProperty
maBaseline =
    MBaseline


{-| Specify the offset between bars for a binned field using a bar mark. For details see the
[Vega-Lite bar mark property documentation](https://vega.github.io/vega-lite/docs/bar.html#properties)
-}
maBinSpacing : Float -> MarkProperty
maBinSpacing =
    MBinSpacing


{-| Specify whether or not a makr should be clipped to the enclosing group's
dimensions. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maClip : Bool -> MarkProperty
maClip =
    MClip


{-| Specify the default color of a mark. Note that `maFill` and `maStroke` have
higher precedence and will override this if specified. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maColor : String -> MarkProperty
maColor =
    MColor


{-| Specify the cursor to be associated with a hyperlink mark. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maCursor : Cursor -> MarkProperty
maCursor =
    MCursor


{-| Specify the continuous band size in pixels of a bar mark. For details see the
[Vega-Lite bar mark property documentation](https://vega.github.io/vega-lite/docs/bar.html)
-}
maContinuousBandSize : Float -> MarkProperty
maContinuousBandSize =
    MContinuousBandSize


{-| Specify the discrete band size in pixels of a bar mark. For details see the
[Vega-Lite bar mark property documentation](https://vega.github.io/vega-lite/docs/bar.html)
-}
maDiscreteBandSize : Float -> MarkProperty
maDiscreteBandSize =
    MDiscreteBandSize


{-| Specify the horizontal offset in pixels between a text mark and its anchor.
For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maDx : Float -> MarkProperty
maDx =
    MdX


{-| Specify the vertical offset in pixels between a text mark and its anchor.
For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maDy : Float -> MarkProperty
maDy =
    MdY


{-| Specify the default fill colour of a mark. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maFill : String -> MarkProperty
maFill =
    MFill


{-| Specify whether or not a mark's color should be used as the fill colour
instead of stroke color. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maFilled : Bool -> MarkProperty
maFilled =
    MFilled


{-| Specify the
For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maFillOpacity : Float -> MarkProperty
maFillOpacity =
    MFillOpacity


{-| Specify the font of a text mark. This can be any font name made accessible via
a css file (or one of the generic fonts `serif`, `monospace` etc.). For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maFont : String -> MarkProperty
maFont =
    MFont


{-| Specify the font size in pixels used by a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maFontSize : Float -> MarkProperty
maFontSize =
    MFontSize


{-| Specify the font style (e.g. `italic`) used by a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maFontStyle : String -> MarkProperty
maFontStyle =
    MFontStyle


{-| Specify the font wight used by a text mark. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maFontWeight : FontWeight -> MarkProperty
maFontWeight =
    MFontWeight


{-| Compute some aggregate summaray statistics for a field to be encoded with a
mark property channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
mAggregate : Operation -> MarkChannel
mAggregate =
    MAggregate


{-| Specify the interpolation method used by line and area marks. For details see the
[Vega-Lite line mark property documentation](https://vega.github.io/vega-lite/docs/line.html#properties)
-}
maInterpolate : MarkInterpolation -> MarkProperty
maInterpolate =
    MInterpolate


{-| Specify the overal opacity of a mark in the range [0, 1]. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maOpacity : Float -> MarkProperty
maOpacity =
    MOpacity


{-| Specify the orientation of a non-stacked bar, tick, area or line mark.
For details see the
[Vega-Lite line mark property documentation](https://vega.github.io/vega-lite/docs/line.html#properties)
-}
maOrient : MarkOrientation -> MarkProperty
maOrient =
    MOrient


{-| Specify the polar coordinate radial offset of a text mark from its origin.
For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maRadius : Float -> MarkProperty
maRadius =
    MRadius


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


{-| Specify the shape of a point mark. For details see the
[Vega-Lite point mark property documentation](https://vega.github.io/vega-lite/docs/point.html#properties)
-}
maShape : Symbol -> MarkProperty
maShape =
    MShape


{-| Specify whether or not month and weekday names are abbreviated in a text mark.
For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html#config)
-}
maShortTimeLabels : Bool -> MarkProperty
maShortTimeLabels =
    MShortTimeLabels


{-| Specify the size of a mark. For details see, for example, the
[Vega-Lite circle mark property documentation](https://vega.github.io/vega-lite/docs/circle.html#properties)
-}
maSize : Float -> MarkProperty
maSize =
    MSize


{-| Specify the default stroke colour of a mark. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStroke : String -> MarkProperty
maStroke =
    MStroke


{-| Specify the stroke dash style used by a mark. A stroke dash style is determined
by an alternating 'on-off' sequence of line lengths in pixel units. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStrokeDash : List Float -> MarkProperty
maStrokeDash =
    MStrokeDash


{-| Specify the stroke dash offset used by a mark. This is the number of pixels
before which the first line dash is drawn. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStrokeDashOffset : Float -> MarkProperty
maStrokeDashOffset =
    MStrokeDashOffset


{-| Specify the stroke opacity of a mark in the range [0, 1]. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStrokeOpacity : Float -> MarkProperty
maStrokeOpacity =
    MStrokeOpacity


{-| Specify the stroke width of a mark in pixel units.
For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStrokeWidth : Float -> MarkProperty
maStrokeWidth =
    MStrokeWidth


{-| Specify the names of custom styles to apply to the mark. Each name should
refer to a named style defined in a separate style configuration. For details see the
[Vega-Lite mark property documentation](https://vega.github.io/vega-lite/docs/mark.html#general-mark-properties)
-}
maStyle : List String -> MarkProperty
maStyle =
    MStyle


{-| Specify the interpolation tension used if interpolating line and area marks. For details see the
[Vega-Lite line mark property documentation](https://vega.github.io/vega-lite/docs/line.html#properties)
-}
maTension : Float -> MarkProperty
maTension =
    MTension


{-| Specify the placeholder text for a text mark for when a text channel is not specified.
For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html#properties)
-}
maText : String -> MarkProperty
maText =
    MText


{-| Specify the polar coordinate angle, in radians, of a text mark from the
origin determined by its x and y properties. Values for theta follow the same
convention of arc mark `startAngle` and `endAngle` properties: angles are
measured in radians, with 0 indicating “north”. For details see the
[Vega-Lite text mark property documentation](https://vega.github.io/vega-lite/docs/text.html)
-}
maTheta : Float -> MarkProperty
maTheta =
    MTheta


{-| Specify the thickness of a tick mark. For details see the
[Vega-Lite tick mark property documentation](https://vega.github.io/vega-lite/docs/tick.html#config)
-}
maThickness : Float -> MarkProperty
maThickness =
    MThickness


{-| Discretizes a series of numeric values into bins when encoding with a
mark property channel. For details, see the
[Vega-Lite binning documentation](https://vega.github.io/vega-lite/docs/bin.html)
-}
mBin : List BinProperty -> MarkChannel
mBin =
    MBin


{-| Provide a literal Boolean value when encoding with a mark property channel.
-}
mBoo : Bool -> MarkChannel
mBoo =
    MBoolean


{-| Specify the properties of a mark channel conditional on some predicate
expression. The first parameter provides the expression to evaluate, the second
the encoding to apply if the expression is true, the third the encoding if the
expression is false.

    color
        [ mDataCondition
            (expr "datum.IMDB_Rating === null")
            [ mStr "#ddd" ]
            [ mStr "rgb(76,120,168)" ]
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
            [ mStr "grey" ]
        ]

For details, see the
[Vega-Lite condition documentation](https://vega.github.io/vega-lite/docs/condition.htmll)

-}
mSelectionCondition : BooleanOp -> List MarkChannel -> List MarkChannel -> MarkChannel
mSelectionCondition op tMks fMks =
    MSelectionCondition op tMks fMks


{-| Provide a literal string value when encoding with a mark property channel.
-}
mStr : String -> MarkChannel
mStr =
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


{-| Specify a numeric data value. This is used when a function can accept values
of different types.
-}
num : Float -> DataValue
num =
    Number


{-| Specify the min max number range to be used in data filtering.
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
            [ mStr "gray" ]
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


{-| Specify padding around a visualization in pixel units. The four parameters
refer to _left_, _top_, _right_, and _bottom_ edges respectively.
-}
paEdges : Float -> Float -> Float -> Float -> Padding
paEdges =
    PEdges


{-| Compute some aggregate summaray statistics for a field to be encoded with a
postion channel. The type of aggregation is determined by the given operation
parameter. For details, see the
[Vega-Lite aggregate documentation](https://vega.github.io/vega-lite/docs/aggregate.html)
-}
pAggregate : Operation -> PositionChannel
pAggregate =
    PAggregate


{-| Indicates the parsing rules when processing some data text. The parameter is
a list of tuples where each corresponds to a field name paired with its desired
data type. Typically used when specifying a data url.
-}
parse : List ( String, DataType ) -> Format
parse =
    Parse


{-| Specify a uniform padding around a visualization in pixel units.
-}
paSize : Float -> Padding
paSize =
    PSize


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

    point [ maFill "black", maStroke "red" ]

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


{-| Specify the type of global map projection to use in a projection transformation.
For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prType : Projection -> ProjectionProperty
prType =
    PType


{-| Specify a projection’s center as longitude and latitude in degrees. The default
value is `0,0`. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prCenter : Float -> Float -> ProjectionProperty
prCenter =
    PCenter


{-| Specify a projection’s clipping circle radius to the specified angle in degrees.
A value of `Nothing` will switch to antimeridian cutting rather than small-circle
clipping. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prClipAngle : Maybe Float -> ProjectionProperty
prClipAngle =
    PClipAngle


{-| Specify a projection’s viewport clip extent to the specified bounds in pixels.
For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prClipExtent : ClipRect -> ProjectionProperty
prClipExtent =
    PClipExtent


{-| Specify a 'Hammer' map projection coefficient. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prCoefficient : Float -> ProjectionProperty
prCoefficient =
    PCoefficient


{-| Specify a 'Satellite' map projection distance. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prDistance : Float -> ProjectionProperty
prDistance =
    PDistance


{-| Provide the name of the fields from a repeat operator used for encoding
with a position channel. For details, see the
[Vega-Lite field documentation](https://vega.github.io/vega-lite/docs/field.html)
-}
pRepeat : Arrangement -> PositionChannel
pRepeat =
    PRepeat


{-| Specify a `Bottomley` map projection fraction. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prFraction : Float -> ProjectionProperty
prFraction =
    PFraction


{-| Specify the number of lobes in lobed map projections such as the 'Berghaus star'.
For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prLobes : Int -> ProjectionProperty
prLobes =
    PLobes


{-| Specify a parallel for map projections such as the 'Armadillo'. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prParallel : Float -> ProjectionProperty
prParallel =
    PParallel


{-| Specify a threshold for the projection’s adaptive resampling in pixels. This
corresponds to the Douglas–Peucker distance. If precision is not specified, the
projection’s current resampling precision which defaults to √0.5 ≅ 0.70710 is used.
For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prPrecision : Float -> ProjectionProperty
prPrecision =
    PPrecision


{-| Specify a radius value for map projections such as the 'Gingery'. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prRadius : Float -> ProjectionProperty
prRadius =
    PRadius


{-| Specify a ratio value for map projections such as the 'Hill'. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prRatio : Float -> ProjectionProperty
prRatio =
    PRatio


{-| Sets the cartographic projection used for geospatial coordinates. A projection
defines the mapping from _(longitude,latitude)_ to an _(x,y)_ plane used for rendering.
This is useful when using the `Geoshape` mark. For further details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/projection.html).

    proj =
        projection [ prType Orthographic, prRotate -40 0 0 ]

-}
projection : List ProjectionProperty -> ( VLProperty, Spec )
projection pProps =
    ( VLProjection, JE.object (List.map projectionProperty pProps) )


{-| Specify a projection’s three-axis rotation angle. This should be in order
_lambda phi gamma_ specifying the rotation angles in degrees about each
spherical axis (corresponding to yaw, pitch and roll.). For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prRotate : Float -> Float -> Float -> ProjectionProperty
prRotate =
    PRotate


{-| Specify a spacing value for map projections such as the 'Lagrange'. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prSpacing : Float -> ProjectionProperty
prSpacing =
    PSpacing


{-| Specify a 'Satellite' map projection tilt. For details see the
[Vega-Lite projection documentation](https://vega.github.io/vega-lite/docs/projection.html#properties)
-}
prTilt : Float -> ProjectionProperty
prTilt =
    PTilt


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


{-| Specify the default color scheme for categorical ranges. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoCategory : String -> RangeConfig
racoCategory =
    RCategory


{-| Specify the default diverging color scheme. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoDiverging : String -> RangeConfig
racoDiverging =
    RDiverging


{-| Specify the default 'heatmap' color scheme. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoHeatmap : String -> RangeConfig
racoHeatmap =
    RHeatmap


{-| Specify the default ordinal color scheme. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoOrdinal : String -> RangeConfig
racoOrdinal =
    ROrdinal


{-| Specify the default ramp (contnuous) color scheme. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoRamp : String -> RangeConfig
racoRamp =
    RRamp


{-| Specify the default color scheme symbols. For details see the
[Vega-Lite documentation](https://vega.github.io/vega/docs/schemes/#scheme-properties).
-}
racoSymbol : String -> RangeConfig
racoSymbol =
    RSymbol


{-| Specify the name of a pre-defined scale range (e.g. `symbol` or `diverging`).
For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#range)
-}
raName : String -> ScaleRange
raName =
    RName


{-| Specify a numeric scale range. Depending on the scaling this may be a min,max
pair, or a list of explicit numerical values. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#range)
-}
raNums : List Float -> ScaleRange
raNums =
    RNumbers


{-| Specify a text scale range for discrete scales. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#range)
-}
raStrs : List String -> ScaleRange
raStrs =
    RStrings


{-| Specify an arbitrary rectangle. For details see
the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/rect.html).

    rect [ maFill "black", maStroke "red" ]

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


{-| Specify the mapping between a row and its field definitions in a set of
faceted small multiples. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/facet.html#mapping)
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


{-| Specify a line seqment connecting two vertices. Can either be used to span the
entire width or height of a view, or to connect two arbitrary positions. For details
see the [Vega Lite documentation](https://vega.github.io/vega-lite/docs/rule.html).

    rule [ maStroke "red" ]

To keep the default style for the mark, just provide an empty list as the parameter.

    rule []

-}
rule : List MarkProperty -> ( VLProperty, Spec )
rule =
    mark Rule


{-| Specify the default inner padding for x and y band-ordinal scales.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoBandPaddingInner : Float -> ScaleConfig
sacoBandPaddingInner =
    SCBandPaddingInner


{-| Specify the default outer padding for x and y band-ordinal scales.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoBandPaddingOuter : Float -> ScaleConfig
sacoBandPaddingOuter =
    SCBandPaddingOuter


{-| Specify whether or not by default values that exceed the data domain are
clamped to the min/max range value. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoClamp : Bool -> ScaleConfig
sacoClamp =
    SCClamp


{-| Specify the default maximum value for mapping quantitative fields to a bar's
size/bandSize. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMaxBandSize : Float -> ScaleConfig
sacoMaxBandSize =
    SCMaxBandSize


{-| Specify the default maximum value for mapping a quantitative field to a text
mark's size. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMaxFontSize : Float -> ScaleConfig
sacoMaxFontSize =
    SCMaxFontSize


{-| Specify the default maximum opacity (in the range [0, 1]) for mapping a field
to opacity. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMaxOpacity : Float -> ScaleConfig
sacoMaxOpacity =
    SCMaxOpacity


{-| Specify the default maximum size for point-based scales. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMaxSize : Float -> ScaleConfig
sacoMaxSize =
    SCMaxSize


{-| Specify the default maximum stroke width for rule, line and trail marks.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMaxStrokeWidth : Float -> ScaleConfig
sacoMaxStrokeWidth =
    SCMaxStrokeWidth


{-| Specify the default minimum value for mapping quantitative fields to a bar's
size/bandSize. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMinBandSize : Float -> ScaleConfig
sacoMinBandSize =
    SCMinBandSize


{-| Specify the default minimum value for mapping a quantitative field to a text
mark's size. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMinFontSize : Float -> ScaleConfig
sacoMinFontSize =
    SCMinFontSize


{-| Specify the default minimum opacity (in the range [0, 1]) for mapping a field
to opacity. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMinOpacity : Float -> ScaleConfig
sacoMinOpacity =
    SCMinOpacity


{-| Specify the default minimum size for point-based scales (when not forced to
start at zero). For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMinSize : Float -> ScaleConfig
sacoMinSize =
    SCMinSize


{-| Specify the default minimum stroke width for rule, line and trail marks.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoMinStrokeWidth : Float -> ScaleConfig
sacoMinStrokeWidth =
    SCMinStrokeWidth


{-| Specify the default padding for point-ordinal scales.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoPointPadding : Float -> ScaleConfig
sacoPointPadding =
    SCPointPadding


{-| Specify the default range step for band and point scales when the mark is
not text. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoRangeStep : Maybe Float -> ScaleConfig
sacoRangeStep =
    SCRangeStep


{-| Specify whether or not by default numeric values are rounded to integers
when scaling. Useful for snapping to the pixel grid. For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoRound : Bool -> ScaleConfig
sacoRound =
    SCRound


{-| Specify the default range step for x band and point scales of text marks.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoTextXRangeStep : Float -> ScaleConfig
sacoTextXRangeStep =
    SCTextXRangeStep


{-| Specify whether or not to use the source data range before aggregation.
For more details see the
[Vega-Lite scale config documentation](https://vega.github.io/vega-lite/docs/scale.html#scale-config)
-}
sacoUseUnaggregatedDomain : Bool -> ScaleConfig
sacoUseUnaggregatedDomain =
    SCUseUnaggregatedDomain


{-| Specify that when scaling, values outside the data domain are clamped to the
minumum or maximum value. For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scClamp : Bool -> ScaleProperty
scClamp =
    SClamp


{-| Specify a custom scaling domain. For details see the
[Vega-Lite scale domain documentation](https://vega.github.io/vega-lite/docs/scale.html#domain)
-}
scDomain : ScaleDomain -> ScaleProperty
scDomain =
    SDomain


{-| Specify an interpolation method for scaling range values. For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scInterpolate : CInterpolate -> ScaleProperty
scInterpolate =
    SInterpolate


{-| Specify whether or not a scaling should use 'nice' values. For details see
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).
-}
scIsNice : Bool -> ScaleNice
scIsNice =
    IsNice


{-| Specify 'nice' minimum and maximum values in a scaling (e.g. multiples of 10).
For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scNice : ScaleNice -> ScaleProperty
scNice =
    SNice


{-| Specify the 'nice' temporal interval values when scaling. For details see
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).
-}
scNiceInterval : TimeUnit -> Int -> ScaleNice
scNiceInterval =
    NInterval


{-| Specify the desired number of tick marks in a 'nice' scaling. For details see
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous).
-}
scNiceTickCount : Int -> ScaleNice
scNiceTickCount =
    NTickCount


{-| Specify the padding in pixels to apply to a scaling. For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scPadding : Float -> ScaleProperty
scPadding =
    SPadding


{-| Specify the inner padding in pixels to apply to a band scaling. For details see the
[Vega-Lite band scale documentation](https://vega.github.io/vega-lite/docs/scale.html#bands)
-}
scPaddingInner : Float -> ScaleProperty
scPaddingInner =
    SPaddingInner


{-| Specify the outer padding in pixels to apply to a band scaling. For details see the
[Vega-Lite band scale documentation](https://vega.github.io/vega-lite/docs/scale.html#bands)
-}
scPaddingOuter : Float -> ScaleProperty
scPaddingOuter =
    SPaddingOuter


{-| Specify the range of a scaling. The type of range depends on the encoding
channel. For details see the
[Vega-Lite scale range documentation](https://vega.github.io/vega-lite/docs/scale.html#range)
-}
scRange : ScaleRange -> ScaleProperty
scRange =
    SRange


{-| Specify the distance in pixels between the starts of adjacent bands in a band
scaling. If `Nothing` is provided the distance is determined automatically.
For details see the
[Vega-Lite band scale documentation](https://vega.github.io/vega-lite/docs/scale.html#bands)
-}
scRangeStep : Maybe Float -> ScaleProperty
scRangeStep =
    SRangeStep


{-| Reverse the order of a scaling. For details see the
[Vega scale documentation](https://vega.github.io/vega/docs/scales/)
-}
scReverse : Bool -> ScaleProperty
scReverse =
    SReverse


{-| Specify whether or not numeric values in a scaling are rounded to integers.
For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scRound : Bool -> ScaleProperty
scRound =
    SRound


{-| Specify the color scheme used by a color scaling. For details see the
[Vega-Lite scale color scheme documentation](https://vega.github.io/vega-lite/docs/scale.html#scheme)
-}
scScheme : String -> List Float -> ScaleProperty
scScheme name =
    SScheme name


{-| Specify the type of scaling to apply. For details see the
[Vega-Lite scale type documentation](https://vega.github.io/vega-lite/docs/scale.html#type)
-}
scType : Scale -> ScaleProperty
scType =
    SType


{-| Specify whether or not a numeric scaling should be forced to include a zero
value. For details see the
[Vega-Lite scale documentation](https://vega.github.io/vega-lite/docs/scale.html#continuous)
-}
scZero : Bool -> ScaleProperty
scZero =
    SZero


{-| Specify a binding to some input elements as part of a named selection.
For details, see the
[Vega-Lite bind documentation](https://vega.github.io/vega-lite/docs/bind.html)
-}
seBind : List Binding -> SelectionProperty
seBind =
    Bind


{-| Specify a encoding channels that form a named selection.
For details, see the
[Vega-Lite selection documentation](https://vega.github.io/vega-lite/docs/selection.html#type)
-}
seEncodings : List Channel -> SelectionProperty
seEncodings =
    Encodings


{-| Specify the field names for projecting a selection. For details, see the
[Vega-Lite projection selection documentation](https://vega.github.io/vega-lite/docs/project.html)
-}
seFields : List String -> SelectionProperty
seFields =
    Fields


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
            [ mStr "grey" ]
        ]

-}
selectionName : String -> BooleanOp
selectionName =
    SelectionName


{-| Specify whether or not a selection should capture nearest marks to a pointer
rather than an exact position match. This allows 'accelerated' selection for
discrete marks. For details, see the
[Vega-Lite nearest documentation](https://vega.github.io/vega-lite/docs/nearest.html)
-}
seNearest : Bool -> SelectionProperty
seNearest =
    Nearest


{-| Specify a [Vega event stream](https://vega.github.io/vega/docs/event-streams)
that triggers a selection. For details, see the
[Vega-Lite selection documentation](https://vega.github.io/vega-lite/docs/selection.html#selection-properties)
-}
seOn : String -> SelectionProperty
seOn =
    On


{-| Specify a strategy that determines how selections’ data queries are resolved
when applied in a filter transform, conditional encoding rule, or scale domain.
For details, see the
[Vega-Lite selection documentation](https://vega.github.io/vega-lite/docs/selection.html#type)
-}
seResolve : SelectionResolution -> SelectionProperty
seResolve =
    ResolveSelections


{-| Specify the appearance of an interval selection mark (dragged rectangle).
For details, see the
[Vega-Lite selection documentation](https://vega.github.io/vega-lite/docs/selection.html#type)
-}
seSelectionMark : List SelectionMarkProperty -> SelectionProperty
seSelectionMark =
    SelectionMark


{-| Specify a predicate expression that determines a toggled selection.
For details, see the
[Vega-Lite toggle documentation](https://vega.github.io/vega-lite/docs/toggle.html)
-}
seToggle : String -> SelectionProperty
seToggle =
    Toggle


{-| Specify a translation selection transformation used for panning a view.
For details, see the
[Vega-Lite selection translate documentation](https://vega.github.io/vega-lite/docs/translate.html)
-}
seTranslate : String -> SelectionProperty
seTranslate =
    Translate


{-| Specify a zooming selection transformation used for zooming a view.
For details, see the
[Vega-Lite selection zoom documentation](https://vega.github.io/vega-lite/docs/zoom.html)
-}
seZoom : String -> SelectionProperty
seZoom =
    Zoom


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


{-| Specify the fill colour of the interval selection mark (dragged recangular area).
For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smFill : String -> SelectionMarkProperty
smFill =
    SMFill


{-| Specify the fill opacity of the interval selection mark (dragged recangular area)
in the range [0, 1]. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smFillOpacity : Float -> SelectionMarkProperty
smFillOpacity =
    SMFillOpacity


{-| Specify the stroke colour of the interval selection mark (dragged recangular area).
For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smStroke : String -> SelectionMarkProperty
smStroke =
    SMStroke


{-| Specify the stroke opacity of the interval selection mark (dragged recangular
area) in the range [0, 1]. For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smStrokeOpacity : Float -> SelectionMarkProperty
smStrokeOpacity =
    SMStrokeOpacity


{-| Specify the stroke width of the interval selection mark (dragged recangular
area). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smStrokeWidth : Float -> SelectionMarkProperty
smStrokeWidth =
    SMStrokeWidth


{-| Specify the stroke dash style of the interval selection mark (dragged
recangular area). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
-}
smStrokeDash : List Float -> SelectionMarkProperty
smStrokeDash =
    SMStrokeDash


{-| Specify the stroke dash offset of the interval selection mark (dragged
recangular area). For details see the
[Vega-Lite documentation](https://vega.github.io/vega-lite/docs/selection.html#interval-mark).
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

For details see the
[Vega-Lite sorting documentation](https://vega.github.io/vega-lite/docs/sort.html).

-}
soByField : String -> Operation -> SortProperty
soByField =
    ByField


{-| Specify a sorting by the aggregated summaries of the given fields (referenced
by a repeat iteration) using a given aggregation operation. For details see the
[Vega-Lite sorting documentation](https://vega.github.io/vega-lite/docs/sort.html).
-}
soByRepeat : Arrangement -> Operation -> SortProperty
soByRepeat =
    ByRepeat


{-| Provide a custom sort order by listing data values explicitly. This can be
used in place of lists of [SortProperty](#SortProperty). For example,

    let
        data =
            dataFromColumns []
                << dataColumn "a" (strs [ "A", "B", "C" ])
                << dataColumn "b" (nums [ 28, 55, 43 ])

        enc =
            encoding
                << position X
                    [ pName "a"
                    , pMType Ordinal
                    , pSort [ soCustom (strs [ "B", "A", "C" ]) ]
                    ]
                << position Y [ pName "b", pMType Quantitative ]
    in
    toVegaLite [ data [], enc [], bar [] ]

-}
soCustom : DataValues -> SortProperty
soCustom =
    CustomSort


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

    square [ maStroke "red", maStrokeWeight 2 ]

To keep the default style for the mark, just provide an empty list as the parameter.

    square []

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

    tick [ maStroke "blue", maStrokeWeight 0.5 ]

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
                << dataColumn "a" (strs [ "C", "C", "D", "D", "E", "E" ])
                << dataColumn "b" (nums [ 2, 7, 1, 2, 6, 8 ])

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

    trail [ maInterpolate StepAfter ]

-}
trail : List MarkProperty -> ( VLProperty, Spec )
trail =
    mark Trail


{-| Create a single transform from a list of transformation specifications. Note
that the order of transformations can be important, especially if labels created
with `calculateAs`, `timeUnitAs` and `binAs` are used in other transformations.
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

                [ ByField name op ] ->
                    ( "sort", JE.object [ sortProperty (ByField name op), sortProperty (Op op) ] )

                [ ByRepeat arng op ] ->
                    ( "sort", JE.object [ sortProperty (ByRepeat arng op), sortProperty (Op op) ] )

                _ ->
                    ( "sort", JE.object (List.map sortProperty sps) )


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

                [ ByField name op ] ->
                    ( "sort", JE.object [ sortProperty (ByField name op), sortProperty (Op op) ] )

                [ ByRepeat arng op ] ->
                    ( "sort", JE.object [ sortProperty (ByRepeat arng op), sortProperty (Op op) ] )

                _ ->
                    ( "sort", JE.object (List.map sortProperty sps) )

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

        Op op ->
            ( "op", JE.string (operationLabel op) )

        ByField field _ ->
            ( "field", JE.string field )

        ByRepeat arr _ ->
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
