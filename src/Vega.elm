module Vega exposing
    ( toVega
    , combineSpecs
    , VProperty
    , num
    , nums
    , numSignal
    , numSignals
    , numExpr
    , numList
    , numNull
    , str
    , strs
    , strSignal
    , strSignals
    , strExpr
    , strNull
    , true
    , false
    , boos
    , booSignal
    , booSignals
    , booExpr
    , vNum
    , vNums
    , vStr
    , vStrs
    , vTrue
    , vFalse
    , vBoos
    , vSignal
    , vField
    , vColor
    , vBand
    , vObject
    , keyValue
    , vValues
    , ifElse
    , vNull
    , vMultiply
    , vExponent
    , vOffset
    , vRound
    , vScale
    , vScaleField
    , field
    , fSignal
    , fExpr
    , fDatum
    , fGroup
    , fParent
    , expr
    , exField
    , year
    , month
    , week
    , day
    , hour
    , minute
    , second
    , millisecond
    , tuSignal
    , cHCL
    , cHSL
    , cLAB
    , cRGB
    , dataSource
    , data
    , dataFromColumns
    , dataColumn
    , dataFromRows
    , dataRow
    , daUrl
    , daFormat
    , daSource
    , daSources
    , daValue
    , daOn
    , daSphere
    , daDataset
    , daField
    , daFields
    , daValues
    , daSignal
    , daReferences
    , daSort
    , soAscending
    , soDescending
    , soOp
    , soByField
    , soSignal
    , ascend
    , descend
    , orderSignal
    , csv
    , tsv
    , dsv
    , json
    , jsonProperty
    , topojsonMesh
    , topojsonFeature
    , fpSignal
    , parseAuto
    , parse
    , foNum
    , foBoo
    , foDate
    , foUtc
    , transform
    , trAggregate
    , agGroupBy
    , agFields
    , agOps
    , agAs
    , agCross
    , agDrop
    , agKey
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
    , opSignal
    , trJoinAggregate
    , jaGroupBy
    , jaFields
    , jaOps
    , jaAs
    , trBin
    , bnAnchor
    , bnMaxBins
    , bnBase
    , bnStep
    , bnSteps
    , bnMinStep
    , bnDivide
    , bnNice
    , bnSignal
    , bnAs
    , trCollect
    , trCountPattern
    , cpPattern
    , cpCase
    , lowercase
    , uppercase
    , mixedcase
    , cpStopwords
    , cpAs
    , trCross
    , crFilter
    , crAs
    , trDensity
    , dnExtent
    , dnMethod
    , dnPdf
    , dnCdf
    , dnSignal
    , dnSteps
    , dnAs
    , diNormal
    , diUniform
    , diKde
    , diMixture
    , trExtent
    , trExtentAsSignal
    , trFilter
    , trCrossFilter
    , trCrossFilterAsSignal
    , trResolveFilter
    , trFlatten
    , trFlattenAs
    , trFold
    , trFoldAs
    , trPivot
    , piGroupBy
    , piLimit
    , piOp
    , trFormula
    , trFormulaInitOnly
    , trLookup
    , luAs
    , luValues
    , luDefault
    , trIdentifier
    , trProject
    , trWindow
    , wnAggOperation
    , wnOperation
    , wnOperationOn
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
    , woSignal
    , wnSort
    , wnGroupBy
    , wnFrame
    , wnIgnorePeers
    , trImpute
    , imByMin
    , imByMax
    , imByMean
    , imByMedian
    , imByValue
    , imKeyVals
    , imMethod
    , imGroupBy
    , imValue
    , trSample
    , trSequence
    , trSequenceAs
    , trContour
    , cnValues
    , cnX
    , cnY
    , cnWeight
    , cnCellSize
    , cnBandwidth
    , cnSmooth
    , cnThresholds
    , cnCount
    , cnNice
    , trGeoShape
    , trGeoPath
    , gpField
    , gpPointRadius
    , gpAs
    , trGeoJson
    , gjFields
    , gjFeature
    , gjSignal
    , trGeoPoint
    , trGeoPointAs
    , trGraticule
    , grExtent
    , grExtentMajor
    , grExtentMinor
    , grStep
    , grStepMajor
    , grStepMinor
    , grField
    , grPrecision
    , trLinkPath
    , lpSourceX
    , lpSourceY
    , lpTargetX
    , lpTargetY
    , lpOrient
    , lpShape
    , lpRequire
    , lpAs
    , lsLine
    , lsArc
    , lsCurve
    , lsDiagonal
    , lsOrthogonal
    , lsSignal
    , trPie
    , piField
    , piStartAngle
    , piEndAngle
    , piSort
    , piAs
    , trStack
    , stField
    , stGroupBy
    , stSort
    , stOffset
    , stAs
    , stZero
    , stCenter
    , stNormalize
    , stSignal
    , trForce
    , fsStatic
    , fsRestart
    , fsIterations
    , fsAlpha
    , fsAlphaMin
    , fsAlphaTarget
    , fsVelocityDecay
    , fsForces
    , fsAs
    , foCenter
    , foCollide
    , foNBody
    , foLink
    , foX
    , foY
    , fpStrength
    , fpDistance
    , fpIterations
    , fpTheta
    , fpDistanceMin
    , fpDistanceMax
    , fpId
    , trVoronoi
    , voSize
    , voExtent
    , voAs
    , trWordcloud
    , wcFont
    , wcFontStyle
    , wcFontWeight
    , wcFontSize
    , wcFontSizeRange
    , wcPadding
    , wcRotate
    , wcText
    , wcSize
    , wcSpiral
    , spArchimedean
    , spRectangular
    , spSignal
    , wcAs
    , trNest
    , trStratify
    , trPack
    , paField
    , paSort
    , paSize
    , paRadius
    , paPadding
    , paAs
    , trPartition
    , ptField
    , ptSort
    , ptPadding
    , ptRound
    , ptSize
    , ptAs
    , trTree
    , teField
    , teSort
    , teMethod
    , meCluster
    , meTidy
    , meSignal
    , teSeparation
    , teSize
    , teNodeSize
    , teAs
    , trTreeLinks
    , trTreemap
    , tmField
    , tmSort
    , tmMethod
    , tmSquarify
    , tmResquarify
    , tmBinary
    , tmSlice
    , tmDice
    , tmSliceDice
    , tmSignal
    , tmPadding
    , tmPaddingInner
    , tmPaddingOuter
    , tmPaddingTop
    , tmPaddingLeft
    , tmPaddingBottom
    , tmPaddingRight
    , tmRatio
    , tmRound
    , tmSize
    , tmAs
    , signals
    , signal
    , siName
    , siValue
    , siBind
    , siDescription
    , siInit
    , siOn
    , siUpdate
    , siReact
    , siPushOuter
    , iCheckbox
    , iText
    , iNumber
    , iDate
    , iDateTimeLocal
    , iTime
    , iMonth
    , iWeek
    , iRadio
    , iRange
    , iSelect
    , iTel
    , iColor
    , inDebounce
    , inElement
    , inOptions
    , inMin
    , inMax
    , inStep
    , inPlaceholder
    , inAutocomplete
    , evHandler
    , evUpdate
    , evEncode
    , evForce
    , esObject
    , esSignal
    , esMerge
    , esStream
    , esSelector
    , esSource
    , esType
    , esBetween
    , esConsume
    , esFilter
    , efPrevent
    , efAllow
    , esDebounce
    , esMarkName
    , esMark
    , esThrottle
    , evStreamSelector
    , esAll
    , esScope
    , esView
    , esWindow
    , esDom
    , etClick
    , etDblClick
    , etDragEnter
    , etDragLeave
    , etDragOver
    , etKeyDown
    , etKeyPress
    , etKeyUp
    , etMouseDown
    , etMouseMove
    , etMouseOut
    , etMouseOver
    , etMouseUp
    , etMouseWheel
    , etTouchEnd
    , etTouchMove
    , etTouchStart
    , etWheel
    , etTimer
    , on
    , trigger
    , tgInsert
    , tgRemove
    , tgRemoveAll
    , tgToggle
    , tgModifyValues
    , scales
    , scale
    , scReverse
    , scRound
    , scClamp
    , scPadding
    , scNice
    , scZero
    , scExponent
    , scConstant
    , scBase
    , scAlign
    , scDomainImplicit
    , scPaddingInner
    , scPaddingOuter
    , scRangeStep
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
    , niSignal
    , scType
    , scBand
    , scBins
    , scBinOrdinal
    , scLinear
    , scLog
    , scSymLog
    , scOrdinal
    , scPoint
    , scPow
    , scQuantile
    , scQuantize
    , scThreshold
    , scSequential
    , scSqrt
    , scTime
    , scUtc
    , scCustom
    , scSignal
    , scDomain
    , scDomainMax
    , scDomainMin
    , scDomainMid
    , scDomainRaw
    , doNums
    , doStrs
    , doSignal
    , doSignals
    , doData
    , scRange
    , raWidth
    , raHeight
    , raSymbol
    , raCategory
    , raDiverging
    , raOrdinal
    , raRamp
    , raHeatmap
    , raNums
    , raStrs
    , raValues
    , raSignal
    , raScheme
    , raData
    , raStep
    , raCustomDefault
    , csScheme
    , csCount
    , csExtent
    , scInterpolate
    , cubeHelix
    , cubeHelixLong
    , hcl
    , hclLong
    , hsl
    , hslLong
    , rgb
    , lab
    , bsNums
    , bsSignal
    , bsBins
    , bsStart
    , bsStop
    , projections
    , projection
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
    , naturalEarth1
    , orthographic
    , stereographic
    , transverseMercator
    , customProjection
    , prSignal
    , projectionValue
    , prType
    , prClipAngle
    , prClipExtent
    , prScale
    , prTranslate
    , prCenter
    , prRotate
    , prPointRadius
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
    , prFit
    , feName
    , featureSignal
    , prExtent
    , prSize
    , axes
    , axis
    , axBandPosition
    , axDomain
    , axDomainColor
    , axDomainOpacity
    , axDomainWidth
    , axEncode
    , axFormat
    , axGrid
    , axGridColor
    , axGridOpacity
    , axGridDash
    , axGridScale
    , axGridWidth
    , axLabels
    , axLabelBound
    , axLabelAlign
    , axLabelBaseline
    , axLabelAngle
    , axLabelColor
    , axLabelOpacity
    , axLabelFont
    , axLabelFontSize
    , axLabelFontWeight
    , axLabelFlush
    , axLabelFlushOffset
    , axLabelLimit
    , axLabelPadding
    , axLabelOverlap
    , axMinExtent
    , axMaxExtent
    , axOffset
    , axPosition
    , axTicks
    , axTickCount
    , axTemporalTickCount
    , axTickColor
    , axTickOpacity
    , axTickExtra
    , axTickOffset
    , axTickRound
    , axTickWidth
    , axTickSize
    , axTitle
    , axTitleAlign
    , axTitleAngle
    , axTitleBaseline
    , axTitleColor
    , axTitleOpacity
    , axTitleFont
    , axTitleFontSize
    , axTitleFontWeight
    , axTitleLimit
    , axTitlePadding
    , axTitleX
    , axTitleY
    , axValues
    , axZIndex
    , aeAxis
    , aeTicks
    , aeGrid
    , aeLabels
    , aeTitle
    , aeDomain
    , siLeft
    , siRight
    , siTop
    , siBottom
    , siSignal
    , osNone
    , osParity
    , osGreedy
    , osSignal
    , legends
    , legend
    , leType
    , leDirection
    , leOrient
    , leFill
    , leOpacity
    , leShape
    , leSize
    , leStroke
    , leStrokeDash
    , leEncode
    , leFormat
    , leGridAlign
    , leClipHeight
    , leColumns
    , leColumnPadding
    , leRowPadding
    , leCornerRadius
    , leFillColor
    , leOffset
    , lePadding
    , leStrokeColor
    , leStrokeWidth
    , leGradientOpacity
    , leGradientLabelLimit
    , leGradientLabelOffset
    , leGradientLength
    , leGradientThickness
    , leGradientStrokeColor
    , leGradientStrokeWidth
    , leLabelAlign
    , leLabelBaseline
    , leLabelColor
    , leLabelFont
    , leLabelFontSize
    , leLabelFontWeight
    , leLabelLimit
    , leLabelOpacity
    , leLabelOffset
    , leLabelOverlap
    , leSymbolFillColor
    , leSymbolBaseFillColor
    , leSymbolBaseStrokeColor
    , leSymbolDirection
    , leSymbolOffset
    , leSymbolSize
    , leSymbolStrokeColor
    , leSymbolStrokeWidth
    , leSymbolOpacity
    , leSymbolType
    , leTickCount
    , leTemporalTickCount
    , leTitle
    , leTitleAlign
    , leTitleBaseline
    , leTitleColor
    , leTitleOpacity
    , leTitleFont
    , leTitleFontSize
    , leTitleFontWeight
    , leTitleLimit
    , leTitlePadding
    , leValues
    , leZIndex
    , ltSymbol
    , ltGradient
    , ltSignal
    , loLeft
    , loTopLeft
    , loTop
    , loTopRight
    , loRight
    , loBottomRight
    , loBottom
    , loBottomLeft
    , loNone
    , loSignal
    , enLegend
    , enTitle
    , enLabels
    , enSymbols
    , enGradient
    , enName
    , enInteractive
    , title
    , tiAnchor
    , tiAngle
    , anStart
    , anMiddle
    , anEnd
    , anchorSignal
    , tiAlign
    , tiBaseline
    , tiColor
    , tiEncode
    , tiFont
    , tiFontSize
    , tiFontWeight
    , tiFrame
    , tfBounds
    , tfGroup
    , tfSignal
    , tiInteractive
    , tiLimit
    , tiName
    , tiOffset
    , tiOrient
    , tiStyle
    , tiZIndex
    , layout
    , grAlignAll
    , grAlignEach
    , grAlignNone
    , grAlignSignal
    , grAlignRow
    , grAlignColumn
    , bcFlush
    , bcFull
    , bcSignal
    , loAlign
    , loBounds
    , loColumns
    , loPadding
    , loPaddingRC
    , loOffset
    , loOffsetRC
    , loHeaderBand
    , loHeaderBandRC
    , loFooterBand
    , loFooterBandRC
    , loTitleBand
    , loTitleBandRC
    , marks
    , mark
    , arc
    , area
    , image
    , group
    , line
    , path
    , rect
    , rule
    , shape
    , symbol
    , text
    , trail
    , mClip
    , mDescription
    , mEncode
    , mFrom
    , mInteractive
    , mKey
    , mName
    , mOn
    , mSort
    , mTransform
    , mStyle
    , mGroup
    , mZIndex
    , clEnabled
    , clPath
    , clSphere
    , srData
    , srFacet
    , faField
    , faGroupBy
    , faAggregate
    , maX
    , maX2
    , maXC
    , maWidth
    , maY
    , maY2
    , maYC
    , maHeight
    , maOpacity
    , maFill
    , maFillOpacity
    , maStroke
    , transparent
    , black
    , white
    , maStrokeOpacity
    , maStrokeWidth
    , maStrokeCap
    , maStrokeDash
    , maStrokeDashOffset
    , maStrokeJoin
    , maStrokeMiterLimit
    , maCursor
    , maHRef
    , maTooltip
    , maZIndex
    , maAlign
    , maBaseline
    , maCornerRadius
    , maInterpolate
    , maTension
    , maDefined
    , maSize
    , maStartAngle
    , maEndAngle
    , maPadAngle
    , maInnerRadius
    , maOuterRadius
    , maOrient
    , maGroupClip
    , maUrl
    , maAspect
    , maPath
    , maShape
    , maSymbol
    , maAngle
    , maDir
    , maDx
    , maDy
    , maEllipsis
    , maFont
    , maFontSize
    , maFontWeight
    , maFontStyle
    , maLimit
    , maRadius
    , maText
    , maTheta
    , maCustom
    , enEnter
    , enUpdate
    , enHover
    , enExit
    , enCustom
    , miBasis
    , miBundle
    , miCardinal
    , miCatmullRom
    , miLinear
    , miMonotone
    , miNatural
    , miStepwise
    , miStepAfter
    , miStepBefore
    , markInterpolationValue
    , orHorizontal
    , orVertical
    , orRadial
    , orSignal
    , orientationValue
    , haLeft
    , haCenter
    , haRight
    , haSignal
    , hLeft
    , hCenter
    , hRight
    , vaTop
    , vaMiddle
    , vaBottom
    , vaAlphabetic
    , vaSignal
    , vTop
    , vMiddle
    , vBottom
    , vAlphabetic
    , symCircle
    , symCross
    , symDiamond
    , symSquare
    , symTriangleUp
    , symTriangleDown
    , symTriangleLeft
    , symTriangleRight
    , symPath
    , symSignal
    , symbolValue
    , caButt
    , caSquare
    , caRound
    , caSignal
    , strokeCapValue
    , joMiter
    , joBevel
    , joRound
    , joSignal
    , strokeJoinValue
    , tdLeftToRight
    , tdRightToLeft
    , tdSignal
    , textDirectionValue
    , cuAuto
    , cuDefault
    , cuNone
    , cuContextMenu
    , cuHelp
    , cuPointer
    , cuProgress
    , cuWait
    , cuCell
    , cuCrosshair
    , cuText
    , cuVerticalText
    , cuAlias
    , cuCopy
    , cuMove
    , cuNoDrop
    , cuNotAllowed
    , cuAllScroll
    , cuColResize
    , cuRowResize
    , cuNResize
    , cuEResize
    , cuSResize
    , cuWResize
    , cuNEResize
    , cuNWResize
    , cuSEResize
    , cuSWResize
    , cuEWResize
    , cuNSResize
    , cuNESWResize
    , cuNWSEResize
    , cuZoomIn
    , cuZoomOut
    , cuGrab
    , cuGrabbing
    , cursorValue
    , config
    , cfAutosize
    , cfBackground
    , cfGroup
    , cfEvents
    , cfMark
    , cfMarks
    , cfStyle
    , cfAxis
    , axAll
    , axLeft
    , axTop
    , axRight
    , axBottom
    , axX
    , axY
    , axBand
    , cfLegend
    , cfTitle
    , cfScaleRange
    , autosize
    , asContent
    , asFit
    , asFitX
    , asFitY
    , asNone
    , asPad
    , asPadding
    , asResize
    , asSignal
    , height
    , padding
    , paddings
    , width
    , background
    , encode
    , AggregateProperty
    , Anchor
    , Autosize
    , AxisElement
    , AxisProperty
    , AxisType
    , Bind
    , BinProperty
    , BinsProperty
    , Boo
    , BoundsCalculation
    , Case
    , CInterpolate
    , Clip
    , ColorSchemeProperty
    , ColorValue
    , ConfigProperty
    , ContourProperty
    , CountPatternProperty
    , CrossProperty
    , Cursor
    , Data
    , DataColumn
    , DataProperty
    , DataReference
    , DataRow
    , DataTable
    , DataType
    , DensityFunction
    , DensityProperty
    , Distribution
    , EncodingProperty
    , EventFilter
    , EventHandler
    , EventSource
    , EventStream
    , EventStreamProperty
    , EventType
    , Expr
    , Facet
    , Feature
    , Field
    , Force
    , ForceProperty
    , ForceSimulationProperty
    , FormatProperty
    , GeoJsonProperty
    , GeoPathProperty
    , GraticuleProperty
    , GridAlign
    , HAlign
    , ImputeMethod
    , ImputeProperty
    , InputProperty
    , JoinAggregateProperty
    , LayoutProperty
    , LegendEncoding
    , LegendOrientation
    , LegendProperty
    , LegendType
    , LinkPathProperty
    , LinkShape
    , LookupProperty
    , Mark
    , MarkInterpolation
    , MarkProperty
    , Num
    , Operation
    , Order
    , Orientation
    , OverlapStrategy
    , PackProperty
    , PartitionProperty
    , PieProperty
    , PivotProperty
    , Projection
    , ProjectionProperty
    , Scale
    , ScaleBins
    , ScaleDomain
    , ScaleNice
    , ScaleProperty
    , ScaleRange
    , Side
    , SignalProperty
    , SortProperty
    , Source
    , Spec
    , Spiral
    , StackOffset
    , StackProperty
    , Str
    , StrokeCap
    , StrokeJoin
    , Symbol
    , TextDirection
    , TimeUnit
    , TitleFrame
    , TitleProperty
    , TopMarkProperty
    , Transform
    , TreemapMethod
    , TreemapProperty
    , TreeMethod
    , TreeProperty
    , Trigger
    , TriggerProperty
    , VAlign
    , Value
    , VoronoiProperty
    , WindowOperation
    , WindowProperty
    , WOperation
    , WordcloudProperty
    )

{-| Create Vega visualization specifications in Elm. This package allows you to
generate the JSON specs that may be passed to the Vega runtime library to activate
the visualization.


# Creating A Vega Specification

@docs toVega
@docs combineSpecs

@docs VProperty


# Passing Values into a Vega Specification

Data types such as numbers, strings and Booleans are generated by functions. For
example, _expressions_ generate new values based on operations applied to
existing ones; _fields_ reference a column of a data table; _signals_
respond dynamically to data or interaction.


## Numbers

@docs num
@docs nums
@docs numSignal
@docs numSignals
@docs numExpr
@docs numList
@docs numNull


## Strings

@docs str
@docs strs
@docs strSignal
@docs strSignals
@docs strExpr
@docs strNull


## Booleans

@docs true
@docs false
@docs boos
@docs booSignal
@docs booSignals
@docs booExpr


## Generic Values

Used by functions that expect values of mixed types.

@docs vNum
@docs vNums
@docs vStr
@docs vStrs
@docs vTrue
@docs vFalse
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
@docs vScaleField


## Indirect References

See the
[Vega field value documentation](https://vega.github.io/vega/docs/types/#FieldValue).

@docs field
@docs fSignal
@docs fExpr
@docs fDatum
@docs fGroup
@docs fParent
@docs expr
@docs exField


## Thematic Data Types


### Temporal

@docs year
@docs month
@docs week
@docs day
@docs hour
@docs minute
@docs second
@docs millisecond
@docs tuSignal


### Color

@docs cHCL
@docs cHSL
@docs cLAB
@docs cRGB


# Creating an Input Data Specification

See the [Vega data](https://vega.github.io/vega/docs/data) and the
[Vega data reference](https://vega.github.io/vega/docs/scales/#dataref) documentation.

@docs dataSource
@docs data

@docs dataFromColumns
@docs dataColumn

@docs dataFromRows
@docs dataRow

@docs daUrl
@docs daFormat
@docs daSource
@docs daSources
@docs daValue
@docs daOn
@docs daSphere

@docs daDataset
@docs daField
@docs daFields
@docs daValues
@docs daSignal
@docs daReferences


## Data Sorting

See the
[Vega sort ](https://vega.github.io/vega/docs/scales/#sort) and
[Vega type comparison](https://vega.github.io/vega/docs/types/#Compare) documentation.

@docs daSort
@docs soAscending
@docs soDescending
@docs soOp
@docs soByField
@docs soSignal

@docs ascend
@docs descend
@docs orderSignal


## Data Parsing and Formatting

@docs csv
@docs tsv
@docs dsv
@docs json
@docs jsonProperty
@docs topojsonMesh
@docs topojsonFeature
@docs fpSignal
@docs parseAuto
@docs parse
@docs foNum
@docs foBoo
@docs foDate
@docs foUtc


# Transforming Data

Applying a transform to a data stream can filter or generate new fields in the
stream, or derive new data streams. Pipe (`|>`) the stream into the `transform`
function and specify the transform to apply via one or more of these functions.
See the [Vega transform documentation](https://vega.github.io/vega/docs/transforms).

@docs transform


## Basic Transforms


### Aggregation

See the
[Vega aggregate documentation](https://vega.github.io/vega/docs/transforms/aggregate/)

@docs trAggregate
@docs agGroupBy
@docs agFields
@docs agOps
@docs agAs
@docs agCross
@docs agDrop
@docs agKey

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
@docs opSignal


### Join Aggregation

See the
[Vega join aggregation documentation](https://vega.github.io/vega/docs/transforms/joinaggregate/).

@docs trJoinAggregate
@docs jaGroupBy
@docs jaFields
@docs jaOps
@docs jaAs


### Binning

See the
[Vega bin documentation](https://vega.github.io/vega/docs/transforms/bin/)

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

See the
[Vega collect documentation](https://vega.github.io/vega/docs/transforms/collect/).

@docs trCollect


### Text Pattern Counting

See the
[Vega count pattern documentation](https://vega.github.io/vega/docs/transforms/countpattern/).

@docs trCountPattern
@docs cpPattern
@docs cpCase
@docs lowercase
@docs uppercase
@docs mixedcase
@docs cpStopwords
@docs cpAs


### Cross Product

See the
[Vega cross-product documentation](https://vega.github.io/vega/docs/transforms/cross/).

@docs trCross
@docs crFilter
@docs crAs


### Probability Density Function Calculation

See the
[Vega density documentation](https://vega.github.io/vega/docs/transforms/density/).

@docs trDensity
@docs dnExtent
@docs dnMethod
@docs dnPdf
@docs dnCdf
@docs dnSignal
@docs dnSteps
@docs dnAs

@docs diNormal
@docs diUniform
@docs diKde
@docs diMixture


### Range calculation

See the
[Vega extent documentation](https://vega.github.io/vega/docs/transforms/extent/).

@docs trExtent
@docs trExtentAsSignal


### Filtering

See the Vega [filter](https://vega.github.io/vega/docs/transforms/filter/) and
[crossfilter](https://vega.github.io/vega/docs/transforms/crossfilter/) documentation.

@docs trFilter
@docs trCrossFilter
@docs trCrossFilterAsSignal
@docs trResolveFilter


### Flattening

@docs trFlatten
@docs trFlattenAs


### Folding and Pivoting

See the Vega [fold](https://vega.github.io/vega/docs/transforms/fold/) and
[pivot](https://vega.github.io/vega/docs/transforms/pivot/) documentation.

@docs trFold
@docs trFoldAs
@docs trPivot
@docs piGroupBy
@docs piLimit
@docs piOp


### Deriving New Fields

See the Vega [formula](https://vega.github.io/vega/docs/transforms/formula),
[lookup](https://vega.github.io/vega/docs/transforms/lookup/),
[identifier](https://vega.github.io/vega/docs/transforms/identifier/),
[project](https://vega.github.io/vega/docs/transforms/project/) and
[window](https://vega.github.io/vega/docs/transforms/window/) documentation.

@docs trFormula
@docs trFormulaInitOnly

@docs trLookup
@docs luAs
@docs luValues
@docs luDefault

@docs trIdentifier
@docs trProject

@docs trWindow
@docs wnAggOperation
@docs wnOperation
@docs wnOperationOn
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
@docs woSignal
@docs wnSort
@docs wnGroupBy
@docs wnFrame
@docs wnIgnorePeers


### Handling Missing Values

See the
[Vega impute documentation](https://vega.github.io/vega/docs/transforms/impute/).

@docs trImpute
@docs imByMin
@docs imByMax
@docs imByMean
@docs imByMedian
@docs imByValue
@docs imKeyVals
@docs imMethod
@docs imGroupBy
@docs imValue


### Sampling

See the
[Vega sample documentation](https://vega.github.io/vega/docs/transforms/sample/).

@docs trSample


### Data Generation

See the
[Vega sequence documentation](https://vega.github.io/vega/docs/transforms/sequence/).

@docs trSequence
@docs trSequenceAs


## Geographic Transforms


### Contouring

See the
[Vega contour documentation](https://vega.github.io/vega/docs/transforms/contour/)

@docs trContour
@docs cnValues
@docs cnX
@docs cnY
@docs cnWeight
@docs cnCellSize
@docs cnBandwidth
@docs cnSmooth
@docs cnThresholds
@docs cnCount
@docs cnNice


### GeoJSON transformation

See the Vega
[geoJSON](https://vega.github.io/vega/docs/transforms/geojson/),
[geoPoint](https://vega.github.io/vega/docs/transforms/geopoint/),
[geoshape](https://vega.github.io/vega/docs/transforms/geoshape/) and
[geopath](https://vega.github.io/vega/docs/transforms/geopath/) documentation.

@docs trGeoShape
@docs trGeoPath
@docs gpField
@docs gpPointRadius
@docs gpAs
@docs trGeoJson
@docs gjFields
@docs gjFeature
@docs gjSignal

@docs trGeoPoint
@docs trGeoPointAs


### Graticule Generation

See the
[Vega graticule documentation](https://vega.github.io/vega/docs/transforms/graticule/).

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

See the
[Vega link path documentation](https://vega.github.io/vega/docs/transforms/linkpath/).

@docs trLinkPath
@docs lpSourceX
@docs lpSourceY
@docs lpTargetX
@docs lpTargetY
@docs lpOrient
@docs lpShape
@docs lpRequire
@docs lpAs
@docs lsLine
@docs lsArc
@docs lsCurve
@docs lsDiagonal
@docs lsOrthogonal
@docs lsSignal


### Angular Layouts

See the
[Vega pie documentation](https://vega.github.io/vega/docs/transforms/pie/).

@docs trPie
@docs piField
@docs piStartAngle
@docs piEndAngle
@docs piSort
@docs piAs


### Stacked Layouts

See the
[Vega stack documentation](https://vega.github.io/vega/docs/transforms/stack/).

@docs trStack
@docs stField
@docs stGroupBy
@docs stSort
@docs stOffset
@docs stAs
@docs stZero
@docs stCenter
@docs stNormalize
@docs stSignal


### Force-Generated Layouts

See the
[Vega force documentation](https://vega.github.io/vega/docs/transforms/force/).

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

See the
[Vega Voronoi documentation](https://vega.github.io/vega/docs/transforms/voronoi/).

@docs trVoronoi
@docs voSize
@docs voExtent
@docs voAs


### Word Cloud layout

See the
[Vega wordcloud documentation](https://vega.github.io/vega/docs/transforms/wordcloud/).

@docs trWordcloud
@docs wcFont
@docs wcFontStyle
@docs wcFontWeight
@docs wcFontSize
@docs wcFontSizeRange
@docs wcPadding
@docs wcRotate
@docs wcText
@docs wcSize
@docs wcSpiral
@docs spArchimedean
@docs spRectangular
@docs spSignal
@docs wcAs


## Hierarchy Transforms

See the Vega
[nest](https://vega.github.io/vega/docs/transforms/nest/),
[stratify](https://vega.github.io/vega/docs/transforms/stratify/),
[pack](https://vega.github.io/vega/docs/transforms/pack/),
[partition](https://vega.github.io/vega/docs/transforms/partition/),
[tree](https://vega.github.io/vega/docs/transforms/tree/),
[tree links](https://vega.github.io/vega/docs/transforms/treelinks/) and
[treemap](https://vega.github.io/vega/docs/transforms/treemap/) documentation.

@docs trNest
@docs trStratify

@docs trPack
@docs paField
@docs paSort
@docs paSize
@docs paRadius
@docs paPadding
@docs paAs

@docs trPartition
@docs ptField
@docs ptSort
@docs ptPadding
@docs ptRound
@docs ptSize
@docs ptAs

@docs trTree
@docs teField
@docs teSort
@docs teMethod
@docs meCluster
@docs meTidy
@docs meSignal
@docs teSeparation
@docs teSize
@docs teNodeSize
@docs teAs

@docs trTreeLinks

@docs trTreemap
@docs tmField
@docs tmSort
@docs tmMethod
@docs tmSquarify
@docs tmResquarify
@docs tmBinary
@docs tmSlice
@docs tmDice
@docs tmSliceDice
@docs tmSignal
@docs tmPadding
@docs tmPaddingInner
@docs tmPaddingOuter
@docs tmPaddingTop
@docs tmPaddingLeft
@docs tmPaddingBottom
@docs tmPaddingRight
@docs tmRatio
@docs tmRound
@docs tmSize
@docs tmAs


# Signals, Triggers and Interaction Events

See the [Vega signal documentation](https://vega.github.io/vega/docs/signals)


## Signals

@docs signals
@docs signal
@docs siName
@docs siValue
@docs siBind
@docs siDescription
@docs siInit
@docs siOn
@docs siUpdate
@docs siReact
@docs siPushOuter


## User Interface Inputs

See the [Vega signal binding documentation](https://vega.github.io/vega/docs/signals/#bind).

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

See the Vega
[event handler documentation](https://vega.github.io/vega/docs/signals/#handlers) documentation.

@docs evHandler
@docs evUpdate
@docs evEncode
@docs evForce


### Event Streams

See the Vega [event stream documentation](https://vega.github.io/vega/docs/event-streams)

@docs esObject
@docs esSignal
@docs esMerge
@docs esStream
@docs esSelector
@docs esSource
@docs esType
@docs esBetween
@docs esConsume
@docs esFilter
@docs efPrevent
@docs efAllow
@docs esDebounce
@docs esMarkName
@docs esMark
@docs esThrottle
@docs evStreamSelector
@docs esAll
@docs esScope
@docs esView
@docs esWindow
@docs esDom


### Event types

@docs etClick
@docs etDblClick
@docs etDragEnter
@docs etDragLeave
@docs etDragOver
@docs etKeyDown
@docs etKeyPress
@docs etKeyUp
@docs etMouseDown
@docs etMouseMove
@docs etMouseOut
@docs etMouseOver
@docs etMouseUp
@docs etMouseWheel
@docs etTouchEnd
@docs etTouchMove
@docs etTouchStart
@docs etWheel
@docs etTimer


## Triggers

See the [Vega trigger documentation](https://vega.github.io/vega/docs/triggers).

@docs on
@docs trigger
@docs tgInsert
@docs tgRemove
@docs tgRemoveAll
@docs tgToggle
@docs tgModifyValues


# Specifying Scales

See the [Vega scale documentation](https://vega.github.io/vega/docs/scales).

@docs scales
@docs scale
@docs scReverse
@docs scRound
@docs scClamp
@docs scPadding
@docs scNice
@docs scZero
@docs scExponent
@docs scConstant
@docs scBase
@docs scAlign
@docs scDomainImplicit
@docs scPaddingInner
@docs scPaddingOuter
@docs scRangeStep

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
@docs niSignal


## Scale Types

@docs scType

@docs scBand
@docs scBins
@docs scBinOrdinal
@docs scLinear
@docs scLog
@docs scSymLog
@docs scOrdinal
@docs scPoint
@docs scPow
@docs scQuantile
@docs scQuantize
@docs scThreshold
@docs scSequential
@docs scSqrt
@docs scTime
@docs scUtc
@docs scCustom
@docs scSignal


## Scale Domains

The extent scaling input data.

@docs scDomain
@docs scDomainMax
@docs scDomainMin
@docs scDomainMid
@docs scDomainRaw
@docs doNums
@docs doStrs
@docs doSignal
@docs doSignals
@docs doData


## Scale Ranges

The extent of scaled values after transformation.

@docs scRange
@docs raWidth
@docs raHeight
@docs raSymbol
@docs raCategory
@docs raDiverging
@docs raOrdinal
@docs raRamp
@docs raHeatmap

@docs raNums
@docs raStrs
@docs raValues
@docs raSignal
@docs raScheme
@docs raData
@docs raStep
@docs raCustomDefault


## Color Scales

See the Vega [Vega color scale](https://vega.github.io/vega/docs/scales/#properties)
and [color scheme](https://vega.github.io/vega/docs/schemes/) documentation.

@docs csScheme
@docs csCount
@docs csExtent

@docs scInterpolate
@docs cubeHelix
@docs cubeHelixLong
@docs hcl
@docs hclLong
@docs hsl
@docs hslLong
@docs rgb
@docs lab


## Scale Bins

@docs bsNums
@docs bsSignal
@docs bsBins
@docs bsStart
@docs bsStop


# Specifying Projections

See the
[Vega map projection documentation](https://vega.github.io/vega/docs/projections).

@docs projections
@docs projection

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
@docs naturalEarth1
@docs orthographic
@docs stereographic
@docs transverseMercator
@docs customProjection
@docs prSignal

@docs projectionValue
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
@docs feName
@docs featureSignal
@docs prExtent
@docs prSize


# Specifying Axes

See the [Vega axis documentation](https://vega.github.io/vega/docs/axes/).

@docs axes
@docs axis
@docs axBandPosition
@docs axDomain
@docs axDomainColor
@docs axDomainOpacity
@docs axDomainWidth
@docs axEncode
@docs axFormat
@docs axGrid
@docs axGridColor
@docs axGridOpacity
@docs axGridDash
@docs axGridScale
@docs axGridWidth
@docs axLabels
@docs axLabelBound
@docs axLabelAlign
@docs axLabelBaseline
@docs axLabelAngle
@docs axLabelColor
@docs axLabelOpacity
@docs axLabelFont
@docs axLabelFontSize
@docs axLabelFontWeight
@docs axLabelFlush
@docs axLabelFlushOffset
@docs axLabelLimit
@docs axLabelPadding
@docs axLabelOverlap
@docs axMinExtent
@docs axMaxExtent
@docs axOffset
@docs axPosition
@docs axTicks
@docs axTickCount
@docs axTemporalTickCount
@docs axTickColor
@docs axTickOpacity
@docs axTickExtra
@docs axTickOffset
@docs axTickRound
@docs axTickWidth
@docs axTickSize
@docs axTitle
@docs axTitleAlign
@docs axTitleAngle
@docs axTitleBaseline
@docs axTitleColor
@docs axTitleOpacity
@docs axTitleFont
@docs axTitleFontSize
@docs axTitleFontWeight
@docs axTitleLimit
@docs axTitlePadding
@docs axTitleX
@docs axTitleY
@docs axValues
@docs axZIndex
@docs aeAxis
@docs aeTicks
@docs aeGrid
@docs aeLabels
@docs aeTitle
@docs aeDomain
@docs siLeft
@docs siRight
@docs siTop
@docs siBottom
@docs siSignal
@docs osNone
@docs osParity
@docs osGreedy
@docs osSignal


# Specifying Legends

See the
[Vega legend documentation](https://vega.github.io/vega/docs/legends/)

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
@docs leGradientOpacity
@docs leGradientLabelLimit
@docs leGradientLabelOffset
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
@docs leLabelOpacity
@docs leLabelOffset
@docs leLabelOverlap
@docs leSymbolFillColor
@docs leSymbolBaseFillColor
@docs leSymbolBaseStrokeColor
@docs leSymbolDirection
@docs leSymbolOffset
@docs leSymbolSize
@docs leSymbolStrokeColor
@docs leSymbolStrokeWidth
@docs leSymbolOpacity
@docs leSymbolType
@docs leTickCount
@docs leTemporalTickCount
@docs leTitle
@docs leTitleAlign
@docs leTitleBaseline
@docs leTitleColor
@docs leTitleOpacity
@docs leTitleFont
@docs leTitleFontSize
@docs leTitleFontWeight
@docs leTitleLimit
@docs leTitlePadding
@docs leValues
@docs leZIndex
@docs ltSymbol
@docs ltGradient
@docs ltSignal
@docs loLeft
@docs loTopLeft
@docs loTop
@docs loTopRight
@docs loRight
@docs loBottomRight
@docs loBottom
@docs loBottomLeft
@docs loNone
@docs loSignal
@docs enLegend
@docs enTitle
@docs enLabels
@docs enSymbols
@docs enGradient
@docs enName
@docs enInteractive


# Specifying Titles

See the [Vega title documentation](https://vega.github.io/vega/docs/title/)

@docs title
@docs tiAnchor
@docs tiAngle
@docs anStart
@docs anMiddle
@docs anEnd
@docs anchorSignal
@docs tiAlign
@docs tiBaseline
@docs tiColor
@docs tiEncode
@docs tiFont
@docs tiFontSize
@docs tiFontWeight
@docs tiFrame
@docs tfBounds
@docs tfGroup
@docs tfSignal
@docs tiInteractive
@docs tiLimit
@docs tiName
@docs tiOffset
@docs tiOrient
@docs tiStyle
@docs tiZIndex


# Specifying Layout

See the [Vega layout documentation](https://vega.github.io/vega/docs/layout/).

@docs layout
@docs grAlignAll
@docs grAlignEach
@docs grAlignNone
@docs grAlignSignal
@docs grAlignRow
@docs grAlignColumn
@docs bcFlush
@docs bcFull
@docs bcSignal
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

See the [Vega mark documentation](https://vega.github.io/vega/docs/marks).

## Top-Level Marks

@docs marks
@docs mark
@docs arc
@docs area
@docs image
@docs group
@docs line
@docs path
@docs rect
@docs rule
@docs shape
@docs symbol
@docs text
@docs trail
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
@docs mZIndex

@docs clEnabled
@docs clPath
@docs clSphere
@docs srData


## Faceting

Split up a data source between group mark items.

@docs srFacet
@docs faField
@docs faGroupBy
@docs faAggregate


## Lower-level Mark Properties

See the [Vega mark encoding documentation](https://vega.github.io/vega/docs/marks/#encode).

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
@docs transparent
@docs black
@docs white
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
@docs maCustom


## Encoding

See the [Vega mark encoding documentation](https://vega.github.io/vega/docs/marks/#encode).

@docs enEnter
@docs enUpdate
@docs enHover
@docs enExit
@docs enCustom
@docs miBasis
@docs miBundle
@docs miCardinal
@docs miCatmullRom
@docs miLinear
@docs miMonotone
@docs miNatural
@docs miStepwise
@docs miStepAfter
@docs miStepBefore
@docs markInterpolationValue
@docs orHorizontal
@docs orVertical
@docs orRadial
@docs orSignal
@docs orientationValue
@docs haLeft
@docs haCenter
@docs haRight
@docs haSignal
@docs hLeft
@docs hCenter
@docs hRight
@docs vaTop
@docs vaMiddle
@docs vaBottom
@docs vaAlphabetic
@docs vaSignal
@docs vTop
@docs vMiddle
@docs vBottom
@docs vAlphabetic

@docs symCircle
@docs symCross
@docs symDiamond
@docs symSquare
@docs symTriangleUp
@docs symTriangleDown
@docs symTriangleLeft
@docs symTriangleRight
@docs symPath
@docs symSignal
@docs symbolValue

@docs caButt
@docs caSquare
@docs caRound
@docs caSignal
@docs strokeCapValue
@docs joMiter
@docs joBevel
@docs joRound
@docs joSignal
@docs strokeJoinValue
@docs tdLeftToRight
@docs tdRightToLeft
@docs tdSignal
@docs textDirectionValue


## Cursors

See the
[CSS cursor documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Keyword%20values)

@docs cuAuto
@docs cuDefault
@docs cuNone
@docs cuContextMenu
@docs cuHelp
@docs cuPointer
@docs cuProgress
@docs cuWait
@docs cuCell
@docs cuCrosshair
@docs cuText
@docs cuVerticalText
@docs cuAlias
@docs cuCopy
@docs cuMove
@docs cuNoDrop
@docs cuNotAllowed
@docs cuAllScroll
@docs cuColResize
@docs cuRowResize
@docs cuNResize
@docs cuEResize
@docs cuSResize
@docs cuWResize
@docs cuNEResize
@docs cuNWResize
@docs cuSEResize
@docs cuSWResize
@docs cuEWResize
@docs cuNSResize
@docs cuNESWResize
@docs cuNWSEResize
@docs cuZoomIn
@docs cuZoomOut
@docs cuGrab
@docs cuGrabbing
@docs cursorValue


# Configuring Visualization Appearance

See the
[Vega configuration documentation](https://vega.github.io/vega/docs/config/).

@docs config


## View Configuration

@docs cfAutosize
@docs cfBackground
@docs cfGroup


## Event Configuration

@docs cfEvents


## Mark Configuration

@docs cfMark
@docs cfMarks


## Style Configuration

@docs cfStyle


## Axis Configuration

@docs cfAxis
@docs axAll
@docs axLeft
@docs axTop
@docs axRight
@docs axBottom
@docs axX
@docs axY
@docs axBand


## Legend Configuration

@docs cfLegend


## Title Configuration

@docs cfTitle


## Scale Range Configuration

@docs cfScaleRange


# Supplementary Properties

See the
[Vega specification documentation](https://vega.github.io/vega/docs/specification/)

@docs autosize
@docs asContent
@docs asFit
@docs asFitX
@docs asFitY
@docs asNone
@docs asPad
@docs asPadding
@docs asResize
@docs asSignal
@docs height
@docs padding
@docs paddings
@docs width
@docs background
@docs encode

---


# Type Reference

Types that are not specified directly, provided here for reference with links
to the functions that generate them.

@docs AggregateProperty
@docs Anchor
@docs Autosize
@docs AxisElement
@docs AxisProperty
@docs AxisType
@docs Bind
@docs BinProperty
@docs BinsProperty
@docs Boo
@docs BoundsCalculation
@docs Case
@docs CInterpolate
@docs Clip
@docs ColorSchemeProperty
@docs ColorValue
@docs ConfigProperty
@docs ContourProperty
@docs CountPatternProperty
@docs CrossProperty
@docs Cursor
@docs Data
@docs DataColumn
@docs DataProperty
@docs DataReference
@docs DataRow
@docs DataTable
@docs DataType
@docs DensityFunction
@docs DensityProperty
@docs Distribution
@docs EncodingProperty
@docs EventFilter
@docs EventHandler
@docs EventSource
@docs EventStream
@docs EventStreamProperty
@docs EventType
@docs Expr
@docs Facet
@docs Feature
@docs Field
@docs Force
@docs ForceProperty
@docs ForceSimulationProperty
@docs FormatProperty
@docs GeoJsonProperty
@docs GeoPathProperty
@docs GraticuleProperty
@docs GridAlign
@docs HAlign
@docs ImputeMethod
@docs ImputeProperty
@docs InputProperty
@docs JoinAggregateProperty
@docs LayoutProperty
@docs LegendEncoding
@docs LegendOrientation
@docs LegendProperty
@docs LegendType
@docs LinkPathProperty
@docs LinkShape
@docs LookupProperty
@docs Mark
@docs MarkInterpolation
@docs MarkProperty
@docs Num
@docs Operation
@docs Order
@docs Orientation
@docs OverlapStrategy
@docs PackProperty
@docs PartitionProperty
@docs PieProperty
@docs PivotProperty
@docs Projection
@docs ProjectionProperty
@docs Scale
@docs ScaleBins
@docs ScaleDomain
@docs ScaleNice
@docs ScaleProperty
@docs ScaleRange
@docs Side
@docs SignalProperty
@docs SortProperty
@docs Source
@docs Spec
@docs Spiral
@docs StackOffset
@docs StackProperty
@docs Str
@docs StrokeCap
@docs StrokeJoin
@docs Symbol
@docs TextDirection
@docs TimeUnit
@docs TitleFrame
@docs TitleProperty
@docs TopMarkProperty
@docs Transform
@docs TreemapMethod
@docs TreemapProperty
@docs TreeMethod
@docs TreeProperty
@docs Trigger
@docs TriggerProperty
@docs VAlign
@docs Value
@docs VoronoiProperty
@docs WindowOperation
@docs WindowProperty
@docs WOperation
@docs WordcloudProperty

-}

import Json.Encode as JE



-- Opaque Types
-- ############


{-| Generated by [agAs](#agAs), [agCross](#agCross), [agDrop](#agDrop), [agFields](#agFields),
[agGroupBy](#agGroupBy), [agOps](#agOps) and [agKey](#agKey).
-}
type AggregateProperty
    = AgGroupBy (List Field)
    | AgFields (List Field)
    | AgOps (List Operation)
    | AgAs (List String)
    | AgCross Boo
    | AgDrop Boo
    | AgKey Field


{-| Generated by [anStart](#anStart), [anMiddle](#anMiddle), [anEnd](#anEnd) and
[anchorSignal](#anchorSignal).
-}
type Anchor
    = Start
    | Middle
    | End
    | AnchorSignal String


{-| Generated by [asContent](#asContent), [asFit](#asFit), [asFitX](#asFitX),
[asFitY](#asFitY), [asNone](#asNone), [asPad](#asPad), [asPadding](#asPadding),
[asResize](#asReeize) and [asSignal](#asSignal).
-}
type Autosize
    = AContent
    | AFit
    | AFitX
    | AFitY
    | ANone
    | APad
    | APadding
    | AResize
    | AutosizeSignal String


{-| Generated by [aeAxis](#aeAxis), [aeTicks](#aeTicks), [aeGrid](#aeGrid),
[aeLabels](#aeLabels), [aeTitle](#aeTitle) and [aeDomain](#aeDomain).
-}
type AxisElement
    = EAxis
    | ETicks
    | EGrid
    | ELabels
    | ETitle
    | EDomain


{-| Generated by [axBandPosition](#axBandPosition), [axDomain](#axDomain),
[axDomainColor](#axDomainColor), [axDomainOpacity](#axDomainOpacity),
[axDomainWidth](#axDomainWidth), [axEncode](#axEncode), [axFormat](#axFormat),
[axGrid](#axGrid), [axGridColor](#axGridColor), [axGridDash](#axGridDash),
[axGridOpacity](#axGridOpacity), [axGridScale](#axGridScale), [axGridWidth](#axGridWidth),
[axLabels](#axLabels), [axLabelAlign](#axLabelAlign), [axLabelBaseline](#axLabelBaseline),
[axLabelBound](#axLabelBound), [axLabelColor](#axLabelColor), [axLabelFlush](#axLabelFlush),
[axLabelFlushOffset](#axLabelFlushOffset), [axLabelFont](#axLabelFont), [axLabelFontSize](#axLabelFontSize)
[axLabelFontWeight](#axLabelFontWeight), [axLabelLimit](#axLabelLimit), [axLabelOpacity](#axLabelOpacity)
[axLabelOverlap](#axLabelOverlap), [axLabelPadding](#axLabelPadding), [axMaxExtent](#axMaxExtent),
[axMinExtent](#axMinExtent), [axOffset](#axOffset), [axPosition](#axPosition),
[axTicks](#axTicks), [axTickColor](#axTickColor), [axTickCount](#axTickCount),
[axTemporalTickCount](#axTemporalTickCount), [axTickExtra](#axTickExtra),
[axTickOffset](#axTickOffset), [axTickOpacity](#axTickOpacity), [axTickRound](#axTickRound),
[axTickSize](#axTickSize), [axTickWidth](#axTickWidth), [axTitle](#axTitle),
[axTitleAlign](#axTitleAlign), [axTitleAngle](#axTitleAngle), [axTitleBaseline](#axTitleBaseline),
[axTitleColor](#axTitleColor),[axTitleFont](#axTitleFont), [axTitleFontSize](#axTitleFontSize),
[axTitleFontWeight](#axTitleFontWeight), [axTitleLimit](#axTitleLimit), [axTitleOpacity](#axTitleOpacity),
[axTitlePadding](#axTitlePadding), [axTitleX](#axTitleX), [axTitleY](#axTitleY),
[axValues](#axValues) and [axZIndex](#axZIndex).
-}
type AxisProperty
    = AxScale String
    | AxSide Side
    | AxBandPosition Num
    | AxDomain Boo
    | AxDomainColor Str
    | AxDomainOpacity Num
    | AxDomainWidth Num
    | AxEncode (List ( AxisElement, List EncodingProperty ))
    | AxFormat Str
    | AxGrid Boo
    | AxGridColor Str
    | AxGridDash (List Value)
    | AxGridOpacity Num
    | AxGridScale String
    | AxGridWidth Num
    | AxLabels Boo
    | AxLabelAlign HAlign
    | AxLabelAngle Num
    | AxLabelBaseline VAlign
    | AxLabelBound Num
    | AxLabelColor Str
    | AxLabelFlush Num
    | AxLabelFlushOffset Num
    | AxLabelFont Str
    | AxLabelFontSize Num
    | AxLabelFontWeight Value
    | AxLabelLimit Num
    | AxLabelOpacity Num
    | AxLabelOverlap OverlapStrategy
    | AxLabelPadding Num
    | AxMinExtent Value
    | AxMaxExtent Value
    | AxOffset Value
    | AxPosition Value
    | AxTicks Boo
    | AxTickColor Str
    | AxTickCount Num
    | AxTemporalTickCount TimeUnit Num
    | AxTickExtra Boo
    | AxTickOffset Num
    | AxTickOpacity Num
    | AxTickRound Boo
    | AxTickSize Num
    | AxTickWidth Num
    | AxTitle Str
    | AxTitleAlign HAlign
    | AxTitleAngle Num
    | AxTitleBaseline VAlign
    | AxTitleColor Str
    | AxTitleFont Str
    | AxTitleFontSize Num
    | AxTitleFontWeight Value
    | AxTitleLimit Num
    | AxTitleOpacity Num
    | AxTitlePadding Value
    | AxTitleX Num
    | AxTitleY Num
    | AxValues Value
    | AxZIndex Num


{-| Generated by [axAll](#axAll), [axLeft](#axLeft), [axTop](#axTop), [axRight](#axRight),
[axBottom](#axBottom), [axX](#axX), [axY](#axY) and [axBand](#axBand)
-}
type AxisType
    = AxAll
    | AxLeft
    | AxTop
    | AxRight
    | AxBottom
    | AxX
    | AxY
    | AxBand


{-| Generated by [iRange](#iRange), [iCheckbox](#iCheckbox), [iRadio](#iRadio),
[iSelect](#iSelect), [iText](#iText), [iNumber](#iNumber), [iDate](#iDate),
[iTime](#iTime), [iMonth](#iMonth), [iWeek](#iWeek), [iDateTimeLocal](#iDateTimeLocal),
[iTel](#iTel) and [iColor](#iColor).
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


{-| Generated by [bnAnchor](#bnAnchor), [bnMaxBins](#bnMaxBins), [bnBase](#bnBase),
[bnStep](#bnStep), [bnSteps](#bnSteps), [bnNums](#bnNums), [bnMinStep](#bnMinStep),
[bnDivide](#bnDivide), [bnNice](#bnNice), [bnSignal](#bnSignal) and [bnAs](#bnAs).
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
    | BnNums Num
    | BnSignal String
    | BnAs String String


{-| Generated by [bsStart](#bsStart) and [bsStop](#bsStop).
-}
type BinsProperty
    = BnsStep Num
    | BnsStart Num
    | BnsStop Num


{-| Generated by [true](#true), [false](#false), [boos](#boos), [booSignal](#booSignal),
[booSignals](#booSignals) and [booExpr](#booExpr)
-}
type Boo
    = Boo Bool
    | Boos (List Bool)
    | BooSignal String
    | BooSignals (List String)
    | BooExpr Expr


{-| Generated by [bcFull](#bcFull), [bcFlush](#bcFlush) and [bc](#bcSignal).
-}
type BoundsCalculation
    = Full
    | Flush
    | BoundsCalculationSignal String


{-| Generated by [lowercase](#lowercase), [uppercase](#uppercase) and [mixedcase](#mixedcase).
-}
type Case
    = Lowercase
    | Uppercase
    | Mixedcase


{-| Generated by [hcl](#hcl), [hsl](#hsl), [lab](#lab), [cubeHelix](#cubeHelix),
[cubeHelixLong](#cubeHelixLong), [hclLong](#hclLong), [hslLong](#hslLong) and [rgb](#rgb).
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


{-| Generated by [clEnabled](#clEnabled), [clPath](#clPath) and [clSphere](#clSphere).
-}
type Clip
    = ClEnabled Boo
    | ClPath Str
    | ClSphere Str


{-| Generated by [csScheme](#csScheme), [csCount](#csCount) and [csExtent](#csExtent).
-}
type ColorSchemeProperty
    = SScheme Str
    | SCount Num
    | SExtent Num


{-| Generated by [cRGB](#cRGB), [cHSL](#cHSL), [cLAB](#cLAB) and [cHCL](#cHCL).
-}
type ColorValue
    = RGB (List Value) (List Value) (List Value)
    | HSL (List Value) (List Value) (List Value)
    | LAB (List Value) (List Value) (List Value)
    | HCL (List Value) (List Value) (List Value)


{-| Generated by [cfAutosize](#cfAutosize), [cfBackground](#cfBackground), [cfGroup](#cfGroup),
[cfEvents](#cfEvents), [cfMark](#cfMark), [cfMarks](#cfMarks), [cfStyle](#cfStyle),
[cfAxis](#cfAxis), [cfLegend](#cfLegend), [cfTitle](#cfTitle), and [cfScaleRange](#cfScaleRange).
-}
type ConfigProperty
    = CfAutosize (List Autosize)
    | CfBackground Str
    | CfGroup (List MarkProperty)
    | CfEvents EventFilter (List EventType)
    | CfMark Mark (List MarkProperty)
    | CfMarks (List MarkProperty)
    | CfStyle String (List MarkProperty)
    | CfAxis AxisType (List AxisProperty)
    | CfLegend (List LegendProperty)
    | CfTitle (List TitleProperty)
    | CfScaleRange ScaleRange ScaleRange


{-| Generated by [cnValues](#cnValues), [cnX](#cnX), [cnY](#cnY), [cnWeight](#cnWeight),
[cnCellSize](#cnCellSize),[cnBandwidth](#cnBandWidth), [cnSmooth](#cnSmooth),
[cnThresholds](#cnThresholds), [cnCount](#cnCount) and [cnNice](#cnNice).
-}
type ContourProperty
    = CnValues Num
    | CnX Field
    | CnY Field
    | CnWeight Field
    | CnCellSize Num
    | CnBandwidth Num
    | CnSmooth Boo
    | CnThresholds Num
    | CnCount Num
    | CnNice Boo


{-| Generated by [cpPattern](#cpPattern), [cpCase](#cpCase), [cpStopwords](#cpStopwords)
and [cpAs](#cprAs).
-}
type CountPatternProperty
    = CPPattern Str
    | CPCase Case
    | CPStopwords Str
    | CPAs String String


{-| Generated by [crFilter](#crFilter) and [crAs](#ccrAs).
-}
type CrossProperty
    = CrFilter Expr
    | CrAs String String


{-| Generated by functions that start with `cu`.
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


{-| A single column of data. Generated when creating inline data with
[dataColumn](#dataColumn).
-}
type alias DataColumn =
    List LabelledSpec


{-| Generated by [daFormat](#daFormat), [daSource](#daSource), [daSources](#daSources),
[daValue](#daValue),[daOn](#daOn), [daUrl](#daUrl) and [daSphere](#daSphere).
-}
type DataProperty
    = DaFormat (List FormatProperty)
    | DaSource String
    | DaSources (List String)
    | DaValue Value
    | DaSphere
    | DaOn (List Trigger)
    | DaUrl Str


{-| Generated by [daDataset](#daDataset), [daField](#daField), [daFields](#daFields),
[daSignal](#daSignal), [daValues](#daValues) [daReferences](#daReferences) and
[daSort](#daSort).
-}
type DataReference
    = DDataset String
    | DField Field
    | DFields (List Field)
    | DSignal String
    | DValues Value
    | DReferences (List (List DataReference))
    | DSort (List SortProperty)


{-| A single row of data. Generated when creating inline data with [dataRow](#dataRow).
-}
type alias DataRow =
    Spec


{-| A single table of data (collection of `dataColumn` specifications).
Generated by [data](#data), [dataFromColumns](#dataFromColumns),
[dataFromRows](#dataFromRows), [on](#on) and [transform](#transform).
-}
type alias DataTable =
    List LabelledSpec


{-| Generated by [foNum](#foNum), [foBoo](#foBoo), [foDate](#foDate) and [foUtc](#foUtc).
-}
type DataType
    = FoNum
    | FoBoo
    | FoDate String
    | FoUtc String


{-| Generated by [dnPdf](#dnPdf), [dnCdf](#dnCdf) and [dnSignal](#dnSignal)
-}
type DensityFunction
    = PDF
    | CDF
    | DensityFunctionSignal String


{-| Generated by [dnExtent](#dnExtent), [dnMethod](#dnMethod), [dnSteps](#dnSteps)
and [dnAs](#dnAs).
-}
type DensityProperty
    = DnExtent Num
    | DnMethod DensityFunction
    | DnSteps Num
    | DnAs String String


{-| Generated by [diNormal](#diNormal), [diUniform](#diUniform), [diKde](#diKde)
and [diMixture](#diMixture).
-}
type Distribution
    = DiNormal Num Num
    | DiUniform Num Num
    | DiKde String Field Num
    | DiMixture (List ( Distribution, Num ))


{-| Generated by [efPrevent](#efPrevent) and [efAllow](#efAllow).
-}
type EventFilter
    = Prevent
    | Allow


{-| Generated by [evHandler](#evHandler), [evUpdate](#evUpdate), [evEncode](#evEncode)
and [evForce](#evForce).
-}
type EventHandler
    = EEvents (List EventStream)
    | EUpdate String
    | EEncode String
    | EForce Boo


{-| Generated by [esAll](#esAll), [esView](#esView), [esScope](#esScope),
[esWindow](#esWindow) and [esDom](#esDom).
-}
type EventSource
    = ESAll
    | ESView
    | ESScope
    | ESWindow
    | ESDom String


{-| Generated by [esObject](#esObject), [esSelector](#esSelector), [esSignal](#esSignal)
and [esMerge](#esMerge).
-}
type EventStream
    = ESObject (List EventStreamProperty)
    | ESSelector Str
    | ESSignal String
    | ESMerge (List EventStream)


{-| Generated by [esSource](#esSource), [esType](#esType), [esBetween](#esBetween),
[esConsume](#esConsume), [esFilter](#esFilter), [esDebounce](#esDebounce),
[esMarkName](#esMarkName), [esMark](#esMark), [esThrottle](#esThrottle) and
[esStream](#esStream).
-}
type EventStreamProperty
    = ESSource EventSource
    | ESType EventType
    | ESBetween (List EventStreamProperty) (List EventStreamProperty)
    | ESConsume Boo
    | ESFilter (List String)
    | ESDebounce Num
    | ESMarkName String
    | ESMark Mark
    | ESThrottle Num
    | ESDerived EventStream


{-| Generated by [etClick](#etClick), [etDblClick](#etDblClick), [etDragEnter](#etDragEnter),
[etDragLeave](#etDragLeave), [etDragOver](#etDragOver), [etKeyDown](#etKeyDown),
[etKeyPress](#etKeyPress), [etKeyUp](#etKeyUp), [etMouseDown](#etMouseDown),
[etMouseMove](#etMouseMove), [etMouseOut](#etMouseOut), [etMouseOver](#etMouseOver),
[etMouseUp](#etMouseUp), [etMouseWheel](#etMouseWheel), [etTouchEnd](#etTouchEnd),
[etTouchMove](#etTouchMove), [etTouchStart](#etTouchStart), [etWheel](#etWheel)
and [etTimer](#etTimer).
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


{-| Generated by [enEnter](#enEnter), [enUpdate](#enUpdate), [enExit](#enExit),
[enHover](#enHover), [enName](#enName), [enInteractive](#enInteractive) and
[enCustom](#enCustom).
-}
type EncodingProperty
    = Enter (List MarkProperty)
    | Update (List MarkProperty)
    | Exit (List MarkProperty)
    | Hover (List MarkProperty)
    | EnName String
    | EnInteractive Boo
    | Custom String (List MarkProperty)


{-| Generated by [exField](#exField) and [expr](#expr).
-}
type Expr
    = ExField String
    | Expr String


{-| Generated by [faAggregate](#faAggregate), [faField](#faField) and [faGroupBy](#faGroupBy).
-}
type Facet
    = FaName String
    | FaData Str
    | FaField Field
    | FaAggregate (List AggregateProperty)
    | FaGroupBy (List Field)


{-| Generated by [featureSignal](#featureSignal) and [feName](#feName).
-}
type Feature
    = FeatureSignal String
    | FeName String


{-| Generated by [fExpr](#fExpr), [fDatum](#fDatum), [fGroup](#fGroup),
[field](#field), [fParent](#fParent) and [fSignal](#fSignal).
-}
type Field
    = FName String
    | FExpr String
    | FSignal String
    | FDatum Field
    | FGroup Field
    | FParent Field


{-| Generated by [foCollide](#foCollide), [foLink](#foLink), [foNBody](#foNBody),
[foX](#foX) and [foY](#foY).
-}
type Force
    = FCenter (List ForceProperty)
    | FCollide (List ForceProperty)
    | FNBody (List ForceProperty)
    | FLink (List ForceProperty)
    | FX Field (List ForceProperty)
    | FY Field (List ForceProperty)


{-| Generated by [fpDistance](#fpDistance), [fpDistanceMax](#fpDistanceMax),
[fpDistanceMin](#fpDistanceMin), [fpId](#fpId), [fpIterations](#fpIterations),
[fpStrength](#fpStrength) and [fpTheta](#fpTheta).
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
    | FpLinks Str
    | FpId Field
    | FpDistance Num


{-| Generated by [fsAlpha](#fsAlpha),
[fsAlphaMin](#fsAlphaMin), [fsAlphaTarget](#fsAlphaTarget), [fsAs](#fsAs),
[fsForces](#fsForces), [fsIterations](#fsIterations), [fsRestart](#fsRestart),
[fsStatic](#fsStatic) and [fsVelocityDecay](#fsVelocityDecay).
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


{-| Generated by [csv](#csv), [tsv](#tsv), [dsv](#dsv), [json](#json),
[jsonProperty](#jsonProperty), [topojsonFeature](#topojsonFeature),
[topojsonMesh](#topojsonMesh), [parse](#parse), [parseAuto](#parseAuto) and
[fpSignal](#fpSignal).
-}
type FormatProperty
    = JSON
    | JSONProperty Str
    | CSV
    | TSV
    | DSV Str
    | TopojsonFeature Str
    | TopojsonMesh Str
    | Parse (List ( String, DataType ))
    | ParseAuto
    | FormatPropertySignal String


{-| Generated by [gjFields](#gjFields), [gjFeature](#gjFeature) and [gjSignal](#gjSignal).
-}
type GeoJsonProperty
    = GjFields Field Field
    | GjFeature Field
    | GjSignal String


{-| Generated by [gpField](#gpField), [gpAs](#gpAs) and [gpPointRadius](#gpPointRadius).
-}
type GeoPathProperty
    = GeField Field
    | GePointRadius Num
    | GeAs String


{-| Generated by
[grField](#grField), [grExtent](#grExtent), [grExtentMajor](#grExtentMajor),
[grExtentMinor](#grExtentMinor), [grStep](#grStep), [grStepMajor](#grStepMajor),
[grStepMinor](#grStepMinor) and [grPrecision](#grPrecision).
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


{-| Generated by [grAlignAll](#grAlignAll), [grAlignEach](#grAlignEach),
[grAlignNone](#grAlignNone), [grAlignRow](#grAlignRow), [grAlignColumn](#grAlignColumn)
and [grAlignSignal](#grAlignSignal).
-}
type GridAlign
    = AlignAll
    | AlignEach
    | AlignNone
    | AlignRow GridAlign
    | AlignColumn GridAlign
    | AlignSignal String


{-| Generated by [haLeft](#haLeft), [haCenter](#haCenter), [haRight](#haRight)
and [haSignal](#haSignal).
-}
type HAlign
    = AlignCenter
    | AlignLeft
    | AlignRight
    | HAlignSignal String


{-| Generated by [imByMin](#imByMin), [imByMax](#imByMax), [imByMean](#imByMean),
[imByMedian](#imByMedian) and [imByValue](#imByValue).
-}
type ImputeMethod
    = ByValue
    | ByMean
    | ByMedian
    | ByMax
    | ByMin


{-| Generated by
<imKeyVals>, [imMethod](#imMethod), [imGroupBy](#imGroupBy) and
[imValue](#imValue).
-}
type ImputeProperty
    = ImKeyVals Value
    | ImMethod ImputeMethod
    | ImGroupBy (List Field)
    | ImValue Value


{-| Generated by [inDebounce](#inDebounce), [inElement](#inElement),
[inOptions](#inOptions), [inMin](#inMin), [inMax](#inMax), [inStep](#inStep),
[inPlaceholder](#inPlaceholder) and [inAutocomplete](#inAutocomplete).
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


{-| Generated
by [jaGroupBy](#jaGroupBy), [jaFields](#jaFields), [jaOps](#jaOps) and [jaAs](#jaAs).
-}
type JoinAggregateProperty
    = JAGroupBy (List Field)
    | JAFields (List Field)
    | JAOps (List Operation)
    | JAAs (List String)


{-| Generated by
[loAlign](#loAlign), [loBounds](#loBounds), [loColumns](#loColumns), [loPadding](#loPadding),
[loPaddingRC](#loPaddingRC), [loOffset](#loOffset), [loOffsetRC](#loOffsetRC),
[loHeaderBand](#loHeaderBand), [loHeaderBandRC](#loHeaderBandRC), [loFooterBand](#loFooterBand),
[loFooterBandRC](#loFooterBandRC), [loTitleBand](#loTitleBand) and
[loTitleBandRC](#loTitleBandRC).
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


{-| Generated by [enLegend](#enLegend), [enTitle](#enTitle),
[enLabels](#enLabels), [enSymbols](#enSymbols) and [enGradient](#enGradient).
-}
type LegendEncoding
    = EnLegend (List EncodingProperty)
    | EnTitle (List EncodingProperty)
    | EnLabels (List EncodingProperty)
    | EnSymbols (List EncodingProperty)
    | EnGradient (List EncodingProperty)


{-| Generated by [loLeft](#loLeft), [loTopLeft](#loTopLeft), [loTop](#loTop),
[loTopRight](#loTopRight), [loRight](#loRight), [loBottomRight](#loBottomRight),
[loBottom](#loBottom), [loBottomLeft](#loBottomLeft), [loNone](#loNone) and
[loSignal](#loSignal).
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
    | LegendOrientationSignal String


{-| Generated by [leType](#leType), [leDirection](#leDirection), [leOrient](#leOrient),
[leFill](#leFill), [leOpacity](#leOpacity), [leShape](#leShape), [leSize](#leSize),
[leStroke](#leStroke), [leStrokeDash](#leStrokeDash), [leEncode](#leEncode),
[leFormat](#leFormat), [leGridAlign](#leGridAlign), [leClipHeight](#leClipHeight),
[leColumns](#leColumns), [leColumnPadding](#leColumnPadding), [leRowPadding](#leRowPadding),
[leCornerRadius](#leCornerRadius), [leFillColor](#leFillColor), [leOffset](#leOffset),
[lePadding](#lePadding), [leStrokeColor](#leStrokeColor), [leStrokeWidth](#leStrokeWidth),
[leGradientLength](#leGradientLength), [leGradientLabelLimit](#leGradientLabelLimit),
[leGradientLabelOffset](#leGraidentLabelOffset), [leGradientOpacity](#leGradientOpacity),
[leGradientThickness](#leGradientThickness), [leGradientStrokeColor](#leGradientStrokeColor),
[leGradientStrokeWidth](#leGradientStrokeWidth), [leLabelAlign](#leLabelAlign),
[leLabelBaseline](#leLabelBaseline), [leLabelColor](#leLabelColor), [leLabelFont](#leLabelFont),
[leLabelFontSize](#leLabelFontSize), [leLabelFontWeight](#leLabelFontWeight),
[leLabelLimit](#leLabelLimit), [leLabelOpacity](#leLabelOpacity), [leLabelOffset](#leLabelOffset),
[leLabelOverlap](#leLabelOverlap), [leSymbolFillColor](#leSymbolFillColor),
[leSymbolOpacity](#leSymbolOpacity), [leSymbolOffset](#leSymbolOffset),
[leSymbolSize](#leSymbolSize), [leSymbolStrokeColor](#leSymbolStrokeColor),
[leSymbolStrokeWidth](#leSymbolStrokeWidth), [leSymbolType](#leSymbolType),
[leTickCount](#leTickCount), [leTemporalTickCount](#leTemporalTickCount),
[leTitle](#leTitle), [leTitleAlign](#leTitleAlign), [leTitleBaseline](#leTitleBaseline),
[leTitleColor](#leTitleColor), [leTitleFont](#leTitleFont), [leTitleFontSize](#leTitleFontSize),
[leTitleFontWeight](#leTitleFontWeight), [leTitleLimit](#leTitleLimit),
[leTitleOpacity](#leTitleOpacity) [leTitlePadding](#leTitlePadding),
[leValues](#leValues) and [leZIndex](#leZIndex).
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
    | LeFormat Str
    | LeGridAlign GridAlign
    | LeClipHeight Num
    | LeColumns Num
    | LeColumnPadding Num
    | LeRowPadding Num
    | LeCornerRadius Num
    | LeFillColor Str
    | LeOffset Value
    | LePadding Value
    | LeStrokeColor Str
    | LeStrokeWidth Num
    | LeGradientLabelLimit Num
    | LeGradientLabelOffset Num
    | LeGradientLength Num
    | LeGradientOpacity Num
    | LeGradientThickness Num
    | LeGradientStrokeColor Str
    | LeGradientStrokeWidth Num
    | LeLabelAlign HAlign
    | LeLabelBaseline VAlign
    | LeLabelColor Str
    | LeLabelFont Str
    | LeLabelFontSize Num
    | LeLabelFontWeight Value
    | LeLabelLimit Num
    | LeLabelOffset Num
    | LeLabelOpacity Num
    | LeLabelOverlap OverlapStrategy
    | LeSymbolBaseFillColor Str
    | LeSymbolBaseStrokeColor Str
    | LeSymbolDirection Orientation
    | LeSymbolFillColor Str
    | LeSymbolOpacity Num
    | LeSymbolOffset Num
    | LeSymbolSize Num
    | LeSymbolStrokeColor Str
    | LeSymbolStrokeWidth Num
    | LeSymbolType Symbol
    | LeTickCount Num
    | LeTemporalTickCount TimeUnit Num
    | LeTitle Str
    | LeTitleAlign HAlign
    | LeTitleBaseline VAlign
    | LeTitleColor Str
    | LeTitleOpacity Num
    | LeTitleFont Str
    | LeTitleFontSize Num
    | LeTitleFontWeight Value
    | LeTitleLimit Num
    | LeTitlePadding Value
    | LeValues (List Value)
    | LeZIndex Num


{-| Generated by [ltSymbol](#ltSymbol), [ltGradient](#ltGradient) and [ltSignal](#ltSignal).
-}
type LegendType
    = LSymbol
    | LGradient
    | LegendTypeSignal String


{-| Generated by [lpSourceY](#lpSourceY), [lpTargetX](#lpTargetX), [lpTargetY](#lpTargetY),
[lpOrient](#lpOrient), [lpShape](#lpShape), [lpRequire](#lpRequire) and [lpAs](#lpAs).
-}
type LinkPathProperty
    = LPSourceX Field
    | LPSourceY Field
    | LPTargetX Field
    | LPTargetY Field
    | LPOrient Orientation
    | LPShape LinkShape
    | LPRequire String
    | LPAs String


{-| Generated by [lsLine](#lsLine), [lsArc](#lsArc), [lsCurve](#lsCurve),
[lsDiagonal](#lsDiagonal), [lsOrthogonal](#lsOrthogonal) and [lsSignal](#lsSignal).
-}
type LinkShape
    = LinkLine
    | LinkArc
    | LinkCurve
    | LinkDiagonal
    | LinkOrthogonal
    | LinkShapeSignal String


{-| Generated by [luValues](#luValues),
[luAs](#luAs) and [luDefault](#luDefault).
-}
type LookupProperty
    = LValues (List Field)
    | LAs (List String)
    | LDefault Value


{-| Generated by [arc](#arc), [area](#area), [image](#image), [group](#group),
[line](#line), [path](#path), [rect](#rect), [rule](#rule), [shape](#shape),
[symbol](#symbol), [text](#text) and [trail](#trail).
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


{-| Generated by [miBasis](#miBasis), [miBundle](#miBundle), [miCardinal](#miCardinal),
[miCatmullRom](#miCatmullRom), [miLinear](#miLinear), [miMonotone](#miMonotone),
[miNatural](#miNatural), [miStepwise](#miStepwise), [miStepAfter](#miStepAfter)
and [miStepBefore](#miStepBefore).
-}
type MarkInterpolation
    = Basis
    | Bundle
    | Cardinal
    | CatmullRom
    | Linear
    | Monotone
    | Natural
    | Stepwise
    | StepAfter
    | StepBefore


{-| Generated by [maX](#maX),
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
[maRadius](#maRadius), [maText](#maText) and [maTheta](#maTheta).
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
    | MStrokeJoin (List Value)
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
    | MCustom String (List Value)


{-| Generated by [num](#num), [nums](#nums),
[numSignal](#numSignal), [numSignals](#numSignals), [numList](#numList),
[numExpr](#numExpr) and [numNull](#numNull)
-}
type Num
    = Num Float
    | Nums (List Float)
    | NumSignal String
    | NumSignals (List String)
    | NumList (List Num)
    | NumExpr Expr
    | NumNull


{-| Generated by [opArgMax](#opArgMax), [opArgMin](#opArgMin), [opCI0](#opCI0),
[opCI1](#opCI1), [opCount](#opCount), [opDistinct](#opDistinct), [opMax](#opMax),
[opMean](#opMean), [opMedian](#opMedian), [opMin](#opMin), [opMissing](#opMissing),
[opQ1](#opQ1), [opQ3](#opQ3), [opStderr](#opStderr), [opStdev](#opStdev),
[opStdevP](#opStdevP), [opSum](#opSum), [opValid](#opValid),
[opVariance](#opVariance), [opVarianceP](#opVarianceP). and [opSignal](#opSignal).
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
    | OperationSignal String


{-| Generated by [ascend](#ascend), [descend](#descend) and [orderSignal](#orderSignal).
-}
type Order
    = Ascend
    | Descend
    | OrderSignal String


{-| Generated by [orHorizontal](#orHorizontal), [orVertical](#orVertical),
[orRadial](#orRadial) and [orSignal](#orSignal).
-}
type Orientation
    = Horizontal
    | Vertical
    | Radial
    | OrientationSignal String


{-| Generated by [osNone](#osNone), [osGreedy](#osGreedy), [osParity](#osParity)
and [osSignal](#osSignal).
-}
type OverlapStrategy
    = ONone
    | OParity
    | OGreedy
    | OverlapStrategySignal String


{-| Generated by [paField](#paField),
[paSort](#paSort), [paSize](#paSize), [paRadius](#paRadius), [paPadding](#paPadding)
and [paAs](#paAs).
-}
type PackProperty
    = PaField Field
    | PaSort (List ( Field, Order ))
    | PaSize Num
    | PaRadius (Maybe Field)
    | PaPadding Num
    | PaAs String String String String String


{-| Generated by [ptField](#ptField), [ptSort](#ptSort), [ptPadding](#ptPadding),
[ptRound](#ptRound), [ptSize](#ptSize) and [ptAs](#ptAs).
-}
type PartitionProperty
    = PtField Field
    | PtSort (List ( Field, Order ))
    | PtPadding Num
    | PtRound Boo
    | PtSize Num
    | PtAs String String String String String String


{-| Generated by [piField](#piField),
[piStartAngle](#piStartAngle), [piEndAngle](#piEndAngle), [piSort](#piSort) and
[piAs](#piAs).
-}
type PieProperty
    = PiField Field
    | PiStartAngle Num
    | PiEndAngle Num
    | PiSort Boo
    | PiAs String String


{-| Generated by [piGroupBy](#piGroupBy),
[piLimit](#piLimit) and [piOp](#piOp).
-}
type PivotProperty
    = PiGroupBy (List Field)
    | PiLimit Num
    | PiOp Operation


{-| Generated by [albers](#albers), [albersUsa](#albersUsa),
[azimuthalEqualArea](#azimuthalEqualArea), [azimuthalEquidistant](#azimuthalEquidistant),
[conicConformal](#conicConformal), [conicEqualArea](#conicEqualArea),
[conicEquidistant](#conicEquidistant), [equirectangular](#equirectangular),
[gnomonic](#gnomonic), [mercator](#mercator), [naturalEarth1](#naturalEarth1),
[orthographic](#orthographic), [stereographic](#stereographic),
[transverseMercator](#transverseMercator), [customProjection](#customProjection)
and [prSignal](#prSignal).
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
    | NaturalEarth1
    | Orthographic
    | Stereographic
    | TransverseMercator
    | Proj Str
    | ProjectionSignal String


{-| Generated by
[prType](#prType), [prClipAngle](#prClipAngle), [prClipExtent](#prClipExtent),
[prScale](#prScale), [prTranslate](#prTranslate), [prCenter](#prCenter), [prRotate](#prRotate),
[prPointRadius](#prPointRadius), [prPrecision](#prPrecision), [prFit](#prFit),
[prExtent](#prExtent), [prSize](#prSize), [prCoefficient](#prCoefficient),
[prDistance](#prDistance), [prFraction](#prFraction), [prLobes](#prLobes),
[prParallel](#prParallel), [prRadius](#prRadius), [prRatio](#prRatio), [prSpacing](#prSpacing),
and [prTilt](#prTilt).
-}
type ProjectionProperty
    = PrType Projection
    | PrClipAngle Num
    | PrClipExtent Num
    | PrScale Num
    | PrTranslate Num
    | PrCenter Num
    | PrRotate Num
    | PrPointRadius Num
    | PrPrecision Num
    | PrFit Feature
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


{-| Generated by [scLinear](#scLinear), [scPow](#scPow), [scSqrt](#scSqrt), [scLog](#scLog),
[scSymLog](#scSymLoc), [scTime](#scTime), [scUtc](#scUtc), [scSequential](#scSequential),
[scOrdinal](#scOrdinal), [scBand](#scBand), [scPoint](#scPoint), [scBinOrdinal](#scBinOrdinal),
[scQuantile](#scQuantile), [scQuantize](#scQuantize),[scThreshold](#scThreshold),
[scCustom](#scCustom) and [scSignal](#scSignal).
-}
type Scale
    = ScLinear
    | ScPow
    | ScSqrt
    | ScLog
    | ScSymLog
    | ScTime
    | ScUtc
    | ScSequential
    | ScOrdinal
    | ScBand
    | ScPoint
    | ScQuantile
    | ScQuantize
    | ScThreshold
    | ScBinOrdinal
    | ScCustom String
    | ScaleSignal String


{-| Generated by [bsNums](#bsNums), [bsBins](#bsBins) and [bsSignal](#bsSignal).
-}
type ScaleBins
    = BnsNums Num
    | BnsBins Num (List BinsProperty)
    | BnsSignal String


{-| Generated by [doNums](#doNums), [doStrs](#doStrs) and [doData](#doData).
-}
type ScaleDomain
    = DoNums Num
    | DoStrs Str
    | DoData (List DataReference)


{-| Generated by [niTrue](#niTrue), [niFalse](#niFalse), [niMillisecond](#niMillisecond),
[niSecond](#niSecond), [niMinute](#niMinute), [niHour](#niHour), [niDay](#niDay),
[niWeek](#niWeek), [niMonth](#niMonth), [niYear](#niYear), [niTickCount](#niTickCount),
[niInterval](#niInterval) and [niSignal](#niSignal).
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
    | ScaleNiceSignal String


{-| Generated by [scType](#scType), [scDomain](#scDomain),
[scDomainMax](#scDomainMax), [scDomainMin](#scDomainMin), [scDomainMid](#scDomainMid),
[scDomainRaw](#scDomainRaw), [scRange](#scRange), [scBins](#scBins), [scReverse](#scReverse),
[scRound](#scRound), [scClamp](#scClamp), [scInterpolate](#scInterpolate),
[scPadding](#scPadding), [scNice](#scNice), [scZero](#scZero), [scExponent](#scExponent),
[scConstant](#scConstant), [scBase](#scBase), [scAlign](#scAlign),
[scDomainImplicit](#scDomainImplicit), [scPaddingInner](#scPaddingInner),
[scPaddingOuter](#scPaddingOuter) and [scRangeStep](#scRangeStep).
-}
type ScaleProperty
    = SType Scale
    | SDomain ScaleDomain
    | SDomainMax Num
    | SDomainMin Num
    | SDomainMid Num
    | SDomainRaw Value
    | SRange ScaleRange
    | SBins ScaleBins
    | SReverse Boo
    | SRound Boo
    | SClamp Boo
    | SInterpolate CInterpolate
    | SPadding Num
    | SNice ScaleNice
    | SZero Boo
    | SExponent Num
    | SConstant Num
    | SBase Num
    | SAlign Num
    | SDomainImplicit Boo
    | SPaddingInner Num
    | SPaddingOuter Num
    | SRangeStep Num


{-| Generated by [raWidth](#raWidth), [raHeight](#raHeight), [raSymbol](#raSymbol),
[raCategory](#raCategory), [raDiverging](#raDiverging), [raOrdinal](#raOrdinal),
[raRamp](#raRamp), [raHeatmap](#raHeatmap), [raNums](#raNums), [raStrs](#raStrs),
[raValues](#raValues), [raScheme](#raScheme), [raData](#raData), [raStep](#raStep),
[raCustomDefault](#raCustomDefault) and [raSignal](#raSignal).
-}
type ScaleRange
    = RaNums (List Float)
    | RaStrs (List String)
    | RaValues (List Value)
    | RaScheme Str (List ColorSchemeProperty)
    | RaData (List DataReference)
    | RaStep Value
    | RaWidth
    | RaHeight
    | RaSymbol
    | RaCategory
    | RaDiverging
    | RaOrdinal
    | RaRamp
    | RaHeatmap
    | RaCustom String
    | RaSignal String


{-| Generated by [siLeft](#siLeft), [siRight](#siRight), [siTop](#siTop),
[siBottom](#siBottom) and [siSignal](#siSignal).
-}
type Side
    = SLeft
    | SRight
    | STop
    | SBottom
    | SideSignal String


{-| Generated by [siName](#siName), [siBind](#siBind),
[siDescription](#siDescription), [siInit](#siInit), [siOn](#siOn), [siUpdate](#siUpdate),
[siReact](#siReact), [siValue](#siValue) and [siPushOuter](#siPushOuter).
-}
type SignalProperty
    = SiName String
    | SiBind Bind
    | SiDescription String
    | SiInit String
    | SiOn (List (List EventHandler))
    | SiUpdate String
    | SiReact Boo
    | SiValue Value
    | SiPushOuter


{-| Generated by [soAscending](#soAscending), [soDescending](#soDescending),
[soOp](#soOp), [soByField](#soByField) and [soSignal](#soSignal).
-}
type SortProperty
    = Ascending
    | Descending
    | Op Operation
    | ByField Str
    | SortPropertySignal String


{-| Generated by [srData](#srData) and [srFacet](#srFacet).
-}
type Source
    = SData Str
    | SFacet Str String (List Facet)


{-| A Vega specification. Specs can be (and usually are) nested.
They can range from a single Boolean value up to the entire Vega specification.
-}
type alias Spec =
    JE.Value


{-| Generated by [spArchimedean](#spArchimedean), [spRectangular](#spRectangular)
and [spSignal](#spSignal).
-}
type Spiral
    = Archimedean
    | Rectangular
    | SpiralSignal String


{-| Generated by [stZero](#stZero), [stCenter](#stCenter), [stNormaize](#stNormalize)
and [stOffset](#stOffset).
-}
type StackOffset
    = OfZero
    | OfCenter
    | OfNormalize
    | StackOffsetSignal String


{-| Generated by [stField](#stField),
[stGroupBy](#stGroupBy), [stSort](#stSort), [stOffset](#stOffset) and
[stAs](#stAs).
-}
type StackProperty
    = StField Field
    | StGroupBy (List Field)
    | StSort (List ( Field, Order ))
    | StOffset StackOffset
    | StAs String String


{-| Generated by [str](#str), [strs](#strs), [strList](#strList), [strSignal](#strSignal),
[strSignals](#strSignals), [strExpr](#strExpr) and [strNull](#strNull).
-}
type Str
    = Str String
    | Strs (List String)
    | StrSignal String
    | StrSignals (List String)
    | StrList (List Str)
    | StrExpr Expr
    | StrNull


{-| Generated by [caButt](#caButt), [caRound](#caRound), [caSquare](#caSquare)
and [caSignal](#caSignal).
-}
type StrokeCap
    = CButt
    | CRound
    | CSquare
    | StrokeCapSignal String


{-| Generated by [joMiter](#joMiter), [joRound](#joRound), [joBevel](#joBevel)
and [joSignal](#joSignal)
-}
type StrokeJoin
    = JMiter
    | JRound
    | JBevel
    | StrokeJoinSignal String


{-| Generated by [symCircle](#symCircle), [symSquare](#symSquare), [symCross](#symCross),
[symDiamond](#symDiamond), [symTriangleUp](#symTriangleUp), [symTriangleDown](#symTriangleDown),
[symTriangleLeft](#symTriangleLeft), [symTriangleRight](#symTriangleRight), [symPath](#symPath)
and [symSignal](#symSignal).
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
    | SymbolSignal String


{-| Generated by [tdLeftToRight](#tdLeftToRight), [tdRightToLeft](#tdRightToLeft)
and [tdSignal](#tdSignal).
-}
type TextDirection
    = LeftToRight
    | RightToLeft
    | TextDirectionSignal String


{-| Generated by [year](#year), [month](#month), [week](#week), [day](#day),
[hour](#hour), [minute](#minute),[second](#second), [millisecond](#millisecond)
and [tuSignal](#tuSignal).
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
    | TimeUnitSignal String


{-| Generated by [tfBounds](#tfBounds), [tfGroup](#tfGroup) and [tfSignal](#tfSignal).
-}
type TitleFrame
    = FrBounds
    | FrGroup
    | TitleFrameSignal String


{-| Generated by [tiOrient](#tiOrient),
[tiAnchor](#tiAnchor), [tiAngle](#tiAngle), [tiAlign](#tiAlign), [tiBaseline](#tiBaseline),
[tiColor](#tiColor), [tiEncode](#tiEncode), [tiFont](#tiFont), [tiFontSize](#tiFontSize),
[tiFontWeight](#tiFontWeight), [tiFrame](#tiFrame), [tiInteractive](#tiInteractive),
[tiLimit](#tiLimit), [tiName](#tiName), [tiStyle](#tiStyle), [tiOffset](#tiOffset) and
[tiZIndex](#tiZIndex).
-}
type TitleProperty
    = TText Str
    | TOrient Side
    | TAlign HAlign
    | TAnchor Anchor
    | TAngle Num
    | TBaseline VAlign
    | TColor Str
    | TEncode (List EncodingProperty)
    | TFont Str
    | TFontSize Num
    | TFontWeight Value
    | TFrame TitleFrame
    | TInteractive Boo
    | TLimit Num
    | TName String
    | TStyle Str
    | TOffset Num
    | TZIndex Num


{-| Generated by [mType](#mType),
[mClip](#mClip), [mDescription](#mDescription), [mEncode](#mEncode), [mFrom](#mFrom),
[mInteractive](#mInteractive), [mKey](#mKey), [mName](#mName), [mOn](#mOn),
[mSort](#mSort), [mTransform](#mTransform), [mRole](#mRole), [mStyle](#mStyle),
[mGroup](#mGroup) and [mZIndex](#mZIndex).
-}
type TopMarkProperty
    = MType Mark
    | MClip Clip
    | MDescription String
    | MEncode (List EncodingProperty)
    | MFrom (List Source)
    | MInteractive Boo
    | MKey Field
    | MName String
    | MOn (List Trigger)
    | MSort (List ( Field, Order ))
    | MTopZIndex Num
    | MTransform (List Transform)
    | MRole String -- Note: Vega docs recommend this is not set explicitly
    | MStyle (List String)
    | MGroup (List ( VProperty, Spec ))


{-| Generated by [trAggregate](#trAggregate), [trBin](#trBin), [trCollect](#trCollect),
[trContour](#trContour), [trCountPattern](#trCountPattern), [trCross](#trCross),
[trCrossFilter](#trCrossFilter), [trCrossFilterAsSignal](#trCrossFilterAsSignal),
[trDensity](#trDensity), [trExtent](#trExtent), [trExtentAsSignal](#trExtentAsSignal),
[trFilter](#trFilter), [trFlatten](#trFlatten), [trFlattenAs](#trFlattenAs),
[trFold](#trFold), [trFoldAs](#trFoldAs), [trForce](#trForce), [trFormula](#trFormula),
[trFormulaInitOnly](#trFormulaInitOnly), [trGeoJson](#trGeoJson), [trGeoPath](#trGeoPath),
[trGeoPoint](#trGeoPoint), [trGeoPointAs](#trGeoPointAs), [trGeoShape](#trGeoShape),
[trGraticule](#trGraticule), [trIdentifier](#trIdentifier), [trImpute](#trImpute),
[trJoinAggregate](#trJoinAggregate), [trLinkPath](#trLinkPath), [trLookup](#trLookup),
[trNest](#trNest), [trPack](#trPack), [trPartition](#trPartition), [trPie](#trPie),
[trPivot](#trPivot), [trProject](#trProject), [trResolveFilter](#trResolveFilter),
[trSample](#trSample), [trSequence](#trSequence), [trStack](#trStack),
[trStratify](#trStratify), [trTree](#trTree), [trTreeLinks](#trTreeLinks),
[trTreemap](#trTreemap), [trVoronoi](#trVoronoi), [trWindow](#trWindow) and
[trWordCloud](#trWordCloud).
-}
type Transform
    = TAggregate (List AggregateProperty)
    | TBin Field Num (List BinProperty)
    | TCollect (List ( Field, Order ))
    | TContour Num Num (List ContourProperty)
    | TCountPattern Field (List CountPatternProperty)
    | TCross (List CrossProperty)
    | TCrossFilter (List ( Field, Num ))
    | TCrossFilterAsSignal (List ( Field, Num )) String
    | TDensity Distribution (List DensityProperty)
    | TExtent Field
    | TExtentAsSignal Field String
    | TFilter Expr
    | TFlatten (List Field)
    | TFlattenAs (List Field) (List String)
    | TFold (List Field)
    | TFoldAs (List Field) String String
    | TForce (List ForceSimulationProperty)
    | TFormula String String FormulaUpdate
    | TGeoJson (List GeoJsonProperty)
    | TGeoPath String (List GeoPathProperty)
    | TGeoPoint String Field Field
    | TGeoPointAs String Field Field String String
    | TGeoShape String (List GeoPathProperty)
    | TGraticule (List GraticuleProperty)
    | TIdentifier String
    | TImpute Field Field (List ImputeProperty)
    | TJoinAggregate (List JoinAggregateProperty)
    | TLinkPath (List LinkPathProperty)
    | TLookup String Field (List Field) (List LookupProperty)
    | TNest (List Field) Boo
    | TPack (List PackProperty)
    | TPartition (List PartitionProperty)
    | TPie (List PieProperty)
    | TPivot Field Field (List PivotProperty)
    | TProject (List ( Field, String ))
    | TResolveFilter String Num
    | TSample Num
    | TSequence Num Num Num
    | TSequenceAs Num Num Num String
    | TStack (List StackProperty)
    | TStratify Field Field
    | TTree (List TreeProperty)
    | TTreeLinks
    | TTreemap (List TreemapProperty)
    | TVoronoi Field Field (List VoronoiProperty)
    | TWindow (List WindowOperation) (List WindowProperty)
    | TWordcloud (List WordcloudProperty)


{-| Generated by [tmSquarify](#tmSquarify), [tmResquarify](#tmResquarify),
[tmBinary](#tmBinary), [tmDice](#tmDice), [tmSlice](#tmSlice), [tmSliceDice](#tmSliceDice)
and [tmSignal](#tmSignal).
-}
type TreemapMethod
    = TmSquarify
    | TmResquarify
    | TmBinary
    | TmDice
    | TmSlice
    | TmSliceDice
    | TmSignal String


{-| Generated by [tmField](#tmField), [tmSort](#tmSort), [tmMethod](#tmMethod),
[tmPadding](#tmPadding), [tmPaddingInner](#tmPaddingInner), [tmPaddingOuter](#tmPaddingOuter),
[tmPaddingTop](#tmPaddingTop), [tmPaddingRight](#tmPaddingRight), [tmPaddingBottom](#tmPaddingBottom),
[tmPaddingLeft](#tmPaddingLeft), [tmRatio](#tmRatio), [tmRound](#tmRound), [tmSize](#tmSize)
and [tmAs](#tmAs).
-}
type TreemapProperty
    = TmField Field
    | TmSort (List ( Field, Order ))
    | TmMethod TreemapMethod
    | TmPadding Num
    | TmPaddingInner Num
    | TmPaddingOuter Num
    | TmPaddingTop Num
    | TmPaddingRight Num
    | TmPaddingBottom Num
    | TmPaddingLeft Num
    | TmRatio Num
    | TmRound Boo
    | TmSize Num
    | TmAs String String String String String String


{-| Generated by [meTidy](#meTidy), [meCluster](#meCluster) and [meSignal](#meSignal).
-}
type TreeMethod
    = Tidy
    | Cluster
    | TreeMethodSignal String


{-| Generated by [teField](#teField), [teSort](#teSort), [teMethod](#teMethod),
[teSeparation](#teSeparation), [teSize](#teSize), [teNodeSize](#teNodeSize) and
[teAs](#teAs).
-}
type TreeProperty
    = TeField Field
    | TeSort (List ( Field, Order ))
    | TeMethod TreeMethod
    | TeSeparation Boo
    | TeSize Num
    | TeNodeSize Num
    | TeAs String String String String


{-| Generated by [trigger](#trigger).
-}
type alias Trigger =
    Spec


{-| Generated by [tgInsert](#tgInsert), [tgRemove](#tgRemove), [tgRemoveAll](#tgRemoveAll),
[tgToggle](#tgToggle) and [tgModifyValues](#tgModifyValues).
-}
type TriggerProperty
    = TgTrigger String
    | TgInsert String
    | TgRemove String
    | TgRemoveAll
    | TgToggle String
    | TgModifyValues String String


{-| Generated by [vStr](#vStr), [vStrs](#vStrs), [vNum](#vNum),
[vNums](#vNums), [vTrue](#vTrue), [vFalse](#vFalse), [vBoos](#vBoos),
[vObject](#vObject), [vKeyValue](#vKeyValue), [vValues](#vValues), [vSignal](#vSignal),
[vColor](#vColor), [vField](#vField), [vScale](#vScale), [vScaleField](#vScaleField),
[vBand](#vBand), [vExponent](#vExponent), [vMultiply](#vMultiply), [vOffset](#vOffset),
[vRound](#vRound), [vNull](#vNull) and [ifElse](#ifElse).
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
    | VField Field
    | VScale Field
    | VBand Num
    | VExponent Value
    | VMultiply Value
    | VOffset Value
    | VRound Boo
    | VNull
    | VIfElse String (List Value) (List Value)


{-| Generated by [voExtent](#voExtent), [voSize](#voSize) and [voAs](#voAs).
-}
type VoronoiProperty
    = VoExtent Num Num
    | VoSize Num
    | VoAs String


{-| Generated by [wnOperation](#wnOperation), [wnOperationOn](#wnOperationOn) and
[wnAggOperation](#wnAggOperation).
-}
type WindowOperation
    = WnOperation WOperation (Maybe Num) (Maybe Field) String
    | WnAggOperation Operation (Maybe Num) (Maybe Field) String


{-| Generated by [wnSort](#wnSort), [wnGroupBy](#wnGroupBy), [wnFrame](#wnFrame)
and [wnIgnorePeers](#wnIgnorePeers).
-}
type WindowProperty
    = WnSort (List ( Field, Order ))
    | WnGroupBy (List Field)
    | WnFrame Num
    | WnIgnorePeers Boo


{-| Generated by
[wcFont](#wcFont), [wcFontStyle](#wcFontStyle), [wcFontWeight](#wcFontWeight),
[wcFontSize](#wcFontSize), [wcFontSizeRange](#wcFontSizeRange), [wcPadding](#wcPadding),
[wcRotate](#wcRotate), [wcText](#wcText), [wcSize](#wcSize), [wcSprial](#wcSpiral)
and [wcAs](#wcAs).
-}
type WordcloudProperty
    = WcFont Str
    | WcFontStyle Str
    | WcFontWeight Str
    | WcFontSize Num
    | WcFontSizeRange Num
    | WcPadding Num
    | WcRotate Num
    | WcText Field
    | WcSize Num
    | WcSpiral Spiral
    | WcAs String String String String String String String



-- Exposed Types and Functions
-- ###########################


{-| Reference the axis element when customising an axis.
-}
aeAxis : AxisElement
aeAxis =
    EAxis


{-| Reference the domain (line) element when customising an axis.
-}
aeDomain : AxisElement
aeDomain =
    EDomain


{-| Reference the grid element when customising an axis.
-}
aeGrid : AxisElement
aeGrid =
    EGrid


{-| Reference the label element when customising an axis.
-}
aeLabels : AxisElement
aeLabels =
    ELabels


{-| Reference the tick element when customising an axis.
-}
aeTicks : AxisElement
aeTicks =
    ETicks


{-| Reference the title element when customising an axis.
-}
aeTitle : AxisElement
aeTitle =
    ETitle


{-| The output field names generated when performing an aggregation transformation.
The list of field names should align with the fields operations provided by `agFields`
and `agOps`. If not provided, automatic names are generated by appending `_field`
to the operation name.
-}
agAs : List String -> AggregateProperty
agAs =
    AgAs


{-| Whether or not the full cross-product of all `groupby` values should
be included in the output of an aggregation transformation.
-}
agCross : Boo -> AggregateProperty
agCross =
    AgCross


{-| Whether or not empty (zero count) groups should be dropped when in an
aggregation transformation.
-}
agDrop : Boo -> AggregateProperty
agDrop =
    AgDrop


{-| Data fields to compute aggregate functions when performing an
aggregation transformation. The list of fields should align with the operations
and field names provided by `agOps` and `agAs`. If no fields and operations are
specified, a count aggregation will be used by default.
-}
agFields : List Field -> AggregateProperty
agFields =
    AgFields


{-| Data fields to group by when performing an aggregation transformation.
If not specified, a single group containing all data objects will be used.
-}
agGroupBy : List Field -> AggregateProperty
agGroupBy =
    AgGroupBy


{-| Field to act as a unique key when performing an [agGroupBy](#agGroupBy)
aggregation. This can speed up the aggregation but should only be used when there
is redundancy in the list of groupBy fields (as there is when binning for example).

    transform
        [ trBin (field "examScore") (nums [ 0, 100 ]) []
        , trAggregate
            [ agKey (field "bin0")
            , agGroupBy [ field "bin0", field "bin1" ]
            , agOps [ opCount ]
            , agAs [ "count" ]
            ]
        ]

-}
agKey : Field -> AggregateProperty
agKey =
    AgKey


{-| Aggregation operations to apply to the fields when performing an
aggregation transformation. The list of operations should align with the fields
output field names provided by `agFields` and `agAs`.
-}
agOps : List Operation -> AggregateProperty
agOps =
    AgOps


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


{-| Indicate that an anchor position is to be determined by a named signal.
The signal should generate one of `start`, `middle` or `end`.
-}
anchorSignal : String -> Anchor
anchorSignal =
    AnchorSignal


{-| Anchor some text at its end.
-}
anEnd : Anchor
anEnd =
    End


{-| Anchor some text in its start.
-}
anMiddle : Anchor
anMiddle =
    Middle


{-| Anchor some text at its start.
-}
anStart : Anchor
anStart =
    Start


{-| An arc mark.
-}
arc : Mark
arc =
    Arc


{-| An area mark.
-}
area : Mark
area =
    Area


{-| Indicate ascending order when sorting.
-}
ascend : Order
ascend =
    Ascend


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


{-| Interpret visualization width to be for the entire visualization (data
rectangle is shrunk to accommodate external decorations and padding).
-}
asFitX : Autosize
asFitX =
    AFitX


{-| Interpret visualization height to be for the entire visualization (data
rectangle is shrunk to accommodate external padding).
-}
asFitY : Autosize
asFitY =
    AFitY


{-| No autosizing to be applied.
-}
asNone : Autosize
asNone =
    ANone


{-| Automatically expand size of visualization from the given dimensions in order
to fit in all supplementary decorations (legends etc.).
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


{-| Indicate that an auto-sizing rule is to be determined by a named signal.
-}
asSignal : String -> Autosize
asSignal =
    AutosizeSignal


{-| Indicate how the view is sized.
-}
autosize : List Autosize -> ( VProperty, Spec )
autosize aus =
    ( VAutosize, JE.object (List.map autosizeProperty aus) )


{-| All axis types to be configured with [cfAxis](#cfAxis).
-}
axAll : AxisType
axAll =
    AxAll


{-| Band axes to be configured with [cfAxis](#cfAxis).
-}
axBand : AxisType
axBand =
    AxBand


{-| Interpolation fraction indicating where, for band scales, axis ticks
should be positioned. A value of 0 places ticks at the left edge of their bands.
A value of 0.5 places ticks in the middle of their bands.
-}
axBandPosition : Num -> AxisProperty
axBandPosition =
    AxBandPosition


{-| Bottom axes to be configured with [cfAxis](#cfAxis).
-}
axBottom : AxisType
axBottom =
    AxBottom


{-| Whether or not the domain (the axis baseline) should be included as part of
an axis.
-}
axDomain : Boo -> AxisProperty
axDomain =
    AxDomain


{-| Color of an axis domain line.
-}
axDomainColor : Str -> AxisProperty
axDomainColor =
    AxDomainColor


{-| Opacity of an axis domain line.
-}
axDomainOpacity : Num -> AxisProperty
axDomainOpacity =
    AxDomainOpacity


{-| Width in pixels of an axis domain line.
-}
axDomainWidth : Num -> AxisProperty
axDomainWidth =
    AxDomainWidth


{-| Mark encodings for custom axis styling.
-}
axEncode : List ( AxisElement, List EncodingProperty ) -> AxisProperty
axEncode =
    AxEncode


{-| Create the axes used to visualize spatial scale mappings.

    ax =
        axes
            << axis "myXScale" siBottom [ axTitle (str "Population") ]
            << axis "myYScale" siLeft [ axTickCount (num 5) ]

-}
axes : List Spec -> ( VProperty, Spec )
axes axs =
    ( VAxes, JE.list identity axs )


{-| The format specifier pattern for axis labels. For numerical values, must be
a legal [d3-format specifier](https://github.com/d3/d3-format#locale_format).
For date-time values, must be a legal
[d3-time-format](https://github.com/d3/d3-time-format#locale_format) specifier.
-}
axFormat : Str -> AxisProperty
axFormat =
    AxFormat


{-| Whether or not grid lines should be included as part of an axis.
-}
axGrid : Boo -> AxisProperty
axGrid =
    AxGrid


{-| Color of an axis's grid lines.
-}
axGridColor : Str -> AxisProperty
axGridColor =
    AxGridColor


{-| Stroke dash of an axis's grid lines as a list of dash-gap lengths.
-}
axGridDash : List Value -> AxisProperty
axGridDash =
    AxGridDash


{-| Opacity of an axis's grid lines.
-}
axGridOpacity : Num -> AxisProperty
axGridOpacity =
    AxGridOpacity


{-| Name of the scale to use for including grid lines. By default grid lines are
driven by the same scale as the ticks and labels.
-}
axGridScale : String -> AxisProperty
axGridScale =
    AxGridScale


{-| Width of an axis's grid lines in pixel units.
-}
axGridWidth : Num -> AxisProperty
axGridWidth =
    AxGridWidth


{-| Create an axis used to visualize a spatial scale mapping. The first
parameter is the name of the scale backing this axis, the second the position of
the axis relative to the data rectangle and the third a list of optional axis
properties. For example,

    axes
        << axis "xScale" siBottom [ axTitle "Population", axZIndex (num 1) ]

-}
axis : String -> Side -> List AxisProperty -> List Spec -> List Spec
axis scName side aps =
    (::) (JE.object (AxScale scName :: AxSide side :: aps |> List.map axisProperty))


{-| Indicate how or if labels should be hidden if they exceed the axis range. If the
parameter is `NumNull`, no check for label size is made. A number specifies
the permitted overflow in pixels that can be tolerated.
-}
axLabelBound : Num -> AxisProperty
axLabelBound =
    AxLabelBound


{-| Horizontal alignment of axis tick labels.
-}
axLabelAlign : HAlign -> AxisProperty
axLabelAlign =
    AxLabelAlign


{-| Angle of text for an axis.
-}
axLabelAngle : Num -> AxisProperty
axLabelAngle =
    AxLabelAngle


{-| Vertical alignment of axis tick labels.
-}
axLabelBaseline : VAlign -> AxisProperty
axLabelBaseline =
    AxLabelBaseline


{-| Color of an axis label.
-}
axLabelColor : Str -> AxisProperty
axLabelColor =
    AxLabelColor


{-| Indicate how labels at the beginning or end of an axis should be aligned
with the scale range. The parameter represents a pixel distance threshold. Labels
with anchor coordinates within this threshold distance for an axis end-point will be
flush-adjusted. If `NumNull`, no flush alignment will be applied.
-}
axLabelFlush : Num -> AxisProperty
axLabelFlush =
    AxLabelFlush


{-| Number of pixels by which to offset flush-adjusted labels.
-}
axLabelFlushOffset : Num -> AxisProperty
axLabelFlushOffset =
    AxLabelFlushOffset


{-| Font name of an axis label.
-}
axLabelFont : Str -> AxisProperty
axLabelFont =
    AxLabelFont


{-| Font size of an axis label.
-}
axLabelFontSize : Num -> AxisProperty
axLabelFontSize =
    AxLabelFontSize


{-| Font weight of an axis label. This can be a number (e.g. `vNum 300`)
or text (e.g. `vStr "bold"`).
-}
axLabelFontWeight : Value -> AxisProperty
axLabelFontWeight =
    AxLabelFontWeight


{-| Maximum length in pixels of axis tick labels.
-}
axLabelLimit : Num -> AxisProperty
axLabelLimit =
    AxLabelLimit


{-| Opacity of an axis label.
-}
axLabelOpacity : Num -> AxisProperty
axLabelOpacity =
    AxLabelOpacity


{-| Strategy to use for resolving overlap of axis labels.
-}
axLabelOverlap : OverlapStrategy -> AxisProperty
axLabelOverlap =
    AxLabelOverlap


{-| Padding in pixels between labels and ticks.
-}
axLabelPadding : Num -> AxisProperty
axLabelPadding =
    AxLabelPadding


{-| Whether or not if labels should be included as part of an axis.
-}
axLabels : Boo -> AxisProperty
axLabels =
    AxLabels


{-| Left axes to be configured with [cfAxis](#cfAxis).
-}
axLeft : AxisType
axLeft =
    AxLeft


{-| Maximum extent in pixels that axis ticks and labels should use.
-}
axMaxExtent : Value -> AxisProperty
axMaxExtent =
    AxMaxExtent


{-| The minimum extent in pixels that axis ticks and labels should use. This
determines a minimum offset value for axis titles.
-}
axMinExtent : Value -> AxisProperty
axMinExtent =
    AxMinExtent


{-| Orthogonal offset in pixels by which to displace the axis from its position
along the edge of the chart.
-}
axOffset : Value -> AxisProperty
axOffset =
    AxOffset


{-| The anchor position of the axis in pixels. For x-axes with top or bottom
orientation, this sets the axis group x coordinate. For y-axes with left or right
orientation, this sets the axis group y coordinate.
-}
axPosition : Value -> AxisProperty
axPosition =
    AxPosition


{-| Right axes to be configured with [cfAxis](#cfAxis).
-}
axRight : AxisType
axRight =
    AxRight


{-| Tick interval for a temporal axis. The first parameter is the type of temporal
interval to use and the second the number of steps of that interval between ticks.
e.g. to specify a tick is requested at 3 month intervals (January, April, July, October):

    ax =
        axes
            << axis "xScale" siBottom [ axTemporalTickCount month (num 3) ]

If the second parameter is not a positive value, the number of ticks will be
auto-generated for the given interval type.

-}
axTemporalTickCount : TimeUnit -> Num -> AxisProperty
axTemporalTickCount =
    AxTemporalTickCount


{-| Color of an axis's ticks.
-}
axTickColor : Str -> AxisProperty
axTickColor =
    AxTickColor


{-| Desired number of ticks, for axes visualizing quantitative scales. The
resulting number may be different so that values are “nice” (multiples of 2, 5, 10)
and lie within the underlying scale’s range.
-}
axTickCount : Num -> AxisProperty
axTickCount =
    AxTickCount


{-| Whether or not an extra axis tick should be added for the initial
position of an axis. This is useful for styling axes for band scales such that
ticks are placed on band boundaries rather in the middle of a band.
-}
axTickExtra : Boo -> AxisProperty
axTickExtra =
    AxTickExtra


{-| Offset in pixels of an axis's ticks, labels and gridlines.
-}
axTickOffset : Num -> AxisProperty
axTickOffset =
    AxTickOffset


{-| Opacity of an axis's ticks.
-}
axTickOpacity : Num -> AxisProperty
axTickOpacity =
    AxTickOpacity


{-| Whether or not pixel position values for an axis's ticks should be
rounded to the nearest integer.
-}
axTickRound : Boo -> AxisProperty
axTickRound =
    AxTickRound


{-| Whether or not ticks should be included as part of an axis.
-}
axTicks : Boo -> AxisProperty
axTicks =
    AxTicks


{-| Size in pixels of axis ticks.
-}
axTickSize : Num -> AxisProperty
axTickSize =
    AxTickSize


{-| Width in pixels of an axis's ticks.
-}
axTickWidth : Num -> AxisProperty
axTickWidth =
    AxTickWidth


{-| A title for an axis.
-}
axTitle : Str -> AxisProperty
axTitle =
    AxTitle


{-| Horizontal alignment of an axis's title.
-}
axTitleAlign : HAlign -> AxisProperty
axTitleAlign =
    AxTitleAlign


{-| Angle of an axis's title text.
-}
axTitleAngle : Num -> AxisProperty
axTitleAngle =
    AxTitleAngle


{-| Vertical alignment of an axis's title.
-}
axTitleBaseline : VAlign -> AxisProperty
axTitleBaseline =
    AxTitleBaseline


{-| Color of an axis's title.
-}
axTitleColor : Str -> AxisProperty
axTitleColor =
    AxTitleColor


{-| Font to be used for an axis's title.
-}
axTitleFont : Str -> AxisProperty
axTitleFont =
    AxTitleFont


{-| Size of font in pixels for an axis's title.
-}
axTitleFontSize : Num -> AxisProperty
axTitleFontSize =
    AxTitleFontSize


{-| Font weight of an axis's title. This can be a number (e.g. `vNum 300`)
or text (e.g. `vStr "bold"`).
-}
axTitleFontWeight : Value -> AxisProperty
axTitleFontWeight =
    AxTitleFontWeight


{-| Maximum allowed length of an axis's title.
-}
axTitleLimit : Num -> AxisProperty
axTitleLimit =
    AxTitleLimit


{-| Opacity of an axis's title.
-}
axTitleOpacity : Num -> AxisProperty
axTitleOpacity =
    AxTitleOpacity


{-| Offset in pixels between an axis's labels and title.
-}
axTitlePadding : Value -> AxisProperty
axTitlePadding =
    AxTitlePadding


{-| X position of an axis title relative to the axis group, overriding
the standard layout.
-}
axTitleX : Num -> AxisProperty
axTitleX =
    AxTitleX


{-| Y position of an axis title relative to the axis group, overriding
the standard layout.
-}
axTitleY : Num -> AxisProperty
axTitleY =
    AxTitleY


{-| Top axes to be configured with [cfAxis](#cfAxis).
-}
axTop : AxisType
axTop =
    AxTop


{-| Explicitly set an axis tick and label values.
-}
axValues : Value -> AxisProperty
axValues =
    AxValues


{-| x-axes to be configured with [cfAxis](#cfAxis).
-}
axX : AxisType
axX =
    AxX


{-| y-axes to be configured with [cfAxis](#cfAxis).
-}
axY : AxisType
axY =
    AxY


{-| The z-index indicating the layering of an axis group relative to other axis,
mark and legend groups. The default value is 0 and axes and grid lines are drawn
behind any marks defined in the same specification level. Higher values (1) will
cause axes and grid lines to be drawn on top of marks.
-}
axZIndex : Num -> AxisProperty
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


{-| The fill background color of a visualization. This should be specified as a
[color string](https://vega.github.io/vega/docs/types/#Color).
-}
background : Str -> ( VProperty, Spec )
background s =
    ( VBackground, strSpec s )


{-| Only the width and height values of a group mark are to determine the extent
of a sub-plot in a grid layout. Useful when attempting to place sub-plots without
axes or legends into a uniform grid structure.
-}
bcFlush : BoundsCalculation
bcFlush =
    Flush


{-| Entire calculated bounds (including axes, title, and legend) to determine the
extent of a sub-plot in a grid layout.
-}
bcFull : BoundsCalculation
bcFull =
    Full


{-| Indicate that the bounds calculation type is to be determined by a named signal.
-}
bcSignal : String -> BoundsCalculation
bcSignal =
    BoundsCalculationSignal


{-| Convenience function for specifying a black color setting for marks that can
be colored (e.g. with [maStroke](#maStroke))
-}
black : Value
black =
    vStr "black"


{-| Value in the binned domain at which to anchor the bins of a bin
transform, shifting the bin boundaries if necessary to ensure that a boundary aligns
with the anchor value. If not specified, the minimum bin extent value serves as
the anchor.
-}
bnAnchor : Num -> BinProperty
bnAnchor =
    BnAnchor


{-| Output field names to contain the extent of a binning transform (start and end
bin values). If not specified these can be retrieved as `bin0` and `bin1`.
-}
bnAs : String -> String -> BinProperty
bnAs =
    BnAs


{-| Number base to use for automatic bin determination in a bin transform (default
is base 100).
-}
bnBase : Num -> BinProperty
bnBase =
    BnBase


{-| Allowable bin step sub-divisions when performing a binning transformation.
The parameter should evaluate to a list of numeric values. If not specified, the
default of [5, 2] is used, which indicates that for base 10 numbers automatic bin
determination can consider dividing bin step sizes by 5 and/or 2.
-}
bnDivide : Num -> BinProperty
bnDivide =
    BnDivide


{-| Maximum number of bins to create with a bin transform.
-}
bnMaxBins : Num -> BinProperty
bnMaxBins =
    BnMaxBins


{-| Minimum allowable bin step size between bins when performing a bin transform.
-}
bnMinStep : Num -> BinProperty
bnMinStep =
    BnMinStep


{-| Whether or not the bin boundaries in a binning transform will use human-friendly
values such as multiples of ten.
-}
bnNice : Boo -> BinProperty
bnNice =
    BnNice


{-| Bind the specification of a binning transform (its start, step and stop properties)
to a signal with the given name.
-}
bnSignal : String -> BinProperty
bnSignal =
    BnSignal


{-| Step size to use between bins in a bin transform.
-}
bnStep : Num -> BinProperty
bnStep =
    BnStep


{-| Allowable step sizes between bins to choose from when performing a bin transform.
-}
bnSteps : Num -> BinProperty
bnSteps =
    BnSteps


{-| Eexpression that when evaluated, will be a Boolean value.
-}
booExpr : Expr -> Boo
booExpr =
    BooExpr


{-| List of Boolean literals.
-}
boos : List Bool -> Boo
boos =
    Boos


{-| Name of a signal that will generate a Boolean value.
-}
booSignal : String -> Boo
booSignal =
    BooSignal


{-| List of signals that will generate Boolean values.
-}
booSignals : List String -> Boo
booSignals =
    BooSignals


{-| Specify the bin scaling to categorise numeric values. The first parameter is
the step size between bins. The second parameter is a list of optional start and
end values for the list of bins. If not specified, the start and end are assumed
to span the full range of data to scale.
-}
bsBins : Num -> List BinsProperty -> ScaleBins
bsBins =
    BnsBins


{-| List of numeric values (`nums`) specifying bin boundaries. For example the list
`[0, 5, 10, 15, 20]` would generate bins of [0-5), [5-10), [10-15), [15-20].
-}
bsNums : Num -> ScaleBins
bsNums =
    BnsNums


{-| Name of a signal that resolves to a list of bin boundaries or a bins object
that defines the start, stop and step size of a a set of bins.
-}
bsSignal : String -> ScaleBins
bsSignal =
    BnsSignal


{-| First bin in a series of bins.
-}
bsStart : Num -> BinsProperty
bsStart =
    BnsStart


{-| Last bin in a series of bins.
-}
bsStop : Num -> BinsProperty
bsStop =
    BnsStop


{-| Butt stroke cap.
-}
caButt : StrokeCap
caButt =
    CButt


{-| Rounded stroke cap.
-}
caRound : StrokeCap
caRound =
    CRound


{-| Stroke cap (`butt`, `round` and `square`) referenced by the value in the
named signal.
-}
caSignal : String -> StrokeCap
caSignal =
    StrokeCapSignal


{-| Square stroke cap.
-}
caSquare : StrokeCap
caSquare =
    CSquare


{-| Default autosizing properties of view.
-}
cfAutosize : List Autosize -> ConfigProperty
cfAutosize =
    CfAutosize


{-| Default properties of axes.
-}
cfAxis : AxisType -> List AxisProperty -> ConfigProperty
cfAxis =
    CfAxis


{-| Default background of the view.
-}
cfBackground : Str -> ConfigProperty
cfBackground =
    CfBackground


{-| Default properties of the top-level group mark representing the
data rectangle of a chart.
-}
cfGroup : List MarkProperty -> ConfigProperty
cfGroup =
    CfGroup


{-| Default filtering of events. This can specified in the first parameter
as either a 'whitelist' (`Allow`) or 'blacklist' (`Prevent`) comprised the event types
to be considered in the second parameter. If that list is empty, all event types
will be placed in the black/white list.
-}
cfEvents : EventFilter -> List EventType -> ConfigProperty
cfEvents =
    CfEvents


{-| Default properties of legends.
-}
cfLegend : List LegendProperty -> ConfigProperty
cfLegend =
    CfLegend


{-| Default properties of a given mark type.
-}
cfMark : Mark -> List MarkProperty -> ConfigProperty
cfMark =
    CfMark


{-| Default properties of all marks.
-}
cfMarks : List MarkProperty -> ConfigProperty
cfMarks =
    CfMarks


{-| Create a named style. The first parameter is the name to give the style, the
second its mark properties.
-}
cfStyle : String -> List MarkProperty -> ConfigProperty
cfStyle =
    CfStyle


{-| Create a named range to be used as part of a scale specification.
The first parameter is the named range label (e.g. `RaOrdinal`, `RaCategory`, etc.).
The second is the new range of values to be associated with this range.

    cf =
        config [ cfScaleRange raHeatmap (raScheme (str "greenblue") []) ]

-}
cfScaleRange : ScaleRange -> ScaleRange -> ConfigProperty
cfScaleRange =
    CfScaleRange


{-| Default properties of a title.
-}
cfTitle : List TitleProperty -> ConfigProperty
cfTitle =
    CfTitle


{-| Define a color in HCL space (parameters in H - C - L order).
-}
cHCL : List Value -> List Value -> List Value -> ColorValue
cHCL =
    HCL


{-| Define a color in HSL space (parameters in H - S - L order).
-}
cHSL : List Value -> List Value -> List Value -> ColorValue
cHSL =
    HSL


{-| Define a color in CIELab space (parameters in L - A - B order).
-}
cLAB : List Value -> List Value -> List Value -> ColorValue
cLAB =
    LAB


{-| Whether or not clipping should be applied to a set of marks within a group mark.
-}
clEnabled : Boo -> Clip
clEnabled =
    ClEnabled


{-| Clipping path to be applied to a set of marks within a region. Should be a valid
[SVG path string](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).
-}
clPath : Str -> Clip
clPath =
    ClPath


{-| Clip a spherical outline subject to a given map projection name. This is useful
in conjunction with map projections that include content such as graticule lines
outside the bounds of the globe.
-}
clSphere : Str -> Clip
clSphere =
    ClSphere


{-| Kernel density estimation bandwidth used in a contour transformation.
-}
cnBandwidth : Num -> ContourProperty
cnBandwidth =
    CnBandwidth


{-| Size of cells used for density estimation in a contour transformation.
-}
cnCellSize : Num -> ContourProperty
cnCellSize =
    CnCellSize


{-| Desired number of contours used in a contour transformation. Ignored if `cnThresholds`
setting explicit contour values are provided.
-}
cnCount : Num -> ContourProperty
cnCount =
    CnCount


{-| Whether or not contour threshold values should be automatically aligned to
'nice', human-friendly values when performing a contour transformation.
-}
cnNice : Boo -> ContourProperty
cnNice =
    CnNice


{-| Whether or not contour polygons should be smoothed in a contour transformation.
Ignored if kernel density estimation is used.
-}
cnSmooth : Boo -> ContourProperty
cnSmooth =
    CnSmooth


{-| Explicit contour values to be generated by a contour transformation.
-}
cnThresholds : Num -> ContourProperty
cnThresholds =
    CnThresholds


{-| Grid of values over which to compute contours. If not provided, [trContour](#trContour)
will compute contours of the kernel density estimate of input data instead.
-}
cnValues : Num -> ContourProperty
cnValues =
    CnValues


{-| Weight field used for density estimation in a contour transformation. This allows
different weights to be attached to each value when estimating kernel density.
-}
cnWeight : Field -> ContourProperty
cnWeight =
    CnWeight


{-| X-coordinate field used for density estimation in a contour transformation.
-}
cnX : Field -> ContourProperty
cnX =
    CnX


{-| Y-coordinate field used for density estimation in a contour transformation.
-}
cnY : Field -> ContourProperty
cnY =
    CnY


{-| Combine a list of labelled specifications into a single specification that
may be passed to JavaScript for rendering. Useful for creating a single page with
multiple visualizations.

    combineSpecs
        [ ( "vis1", myFirstVis )
        , ( "vis2", mySecondVis )
        , ( "vis3", myOtherVis )
        ]

-}
combineSpecs : List LabelledSpec -> Spec
combineSpecs specs =
    JE.object specs


{-| Create a collection of configuration settings. This allows default stylings
to be defined for a collection of visualizations or visualization components.

    cf =
        config
            [ cfMark text [ maFont [ vStr "Roboto Condensed, sans-serif" ] ]
            , cfTitle
                [ tiFont (str "Roboto Condensed, sans-serif")
                , tiFontWeight (vNum 500)
                , tiFontSize (num 17)
                ]
            , cfAxis axAll
                [ axLabelFont (str "Roboto Condensed, sans-serif")
                , axLabelFontSize (num 12)
                ]
            ]

-}
config : List ConfigProperty -> ( VProperty, Spec )
config cps =
    ( VConfig, JE.object (List.map configProperty cps) )


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


{-| Names the two output fields generated by a count pattern transformation.
By default they are named `text` and `count`.
-}
cpAs : String -> String -> CountPatternProperty
cpAs =
    CPAs


{-| Text case transformation to apply before performing a count pattern transformation.
The default, as generated by `mixedcase`, will leave text untransformed.
-}
cpCase : Case -> CountPatternProperty
cpCase =
    CPCase


{-| Define a match in a count pattern transformation with a regular expression
(escaping backslashes):

    transform [ trCountPattern (field "data") [ cpPattern (str "[\\w']{3,}") ] ]

-}
cpPattern : Str -> CountPatternProperty
cpPattern =
    CPPattern


{-| Define text to ignore in a count pattern transformation with a regular
expression (escaping backslashes).
-}
cpStopwords : Str -> CountPatternProperty
cpStopwords =
    CPStopwords


{-| Name the two output fields of a cross-product transform.
-}
crAs : String -> String -> CrossProperty
crAs =
    CrAs


{-| Filter for limiting the results of a cross-product transform.
-}
crFilter : Expr -> CrossProperty
crFilter =
    CrFilter


{-| Color in RGB space.
-}
cRGB : List Value -> List Value -> List Value -> ColorValue
cRGB =
    RGB


{-| Number of colors to use in a color scheme.
-}
csCount : Num -> ColorSchemeProperty
csCount =
    SCount


{-| Extent of the color range to use in sequential and diverging color
schemes. The parameter should evaluate to a two-element list representing the min
and max values of the extent. For example [0.2, 1] will rescale the color scheme
such that color values in the range [0, 0.2] are excluded from the scheme.
-}
csExtent : Num -> ColorSchemeProperty
csExtent =
    SExtent


{-| Name a color scheme to use.
-}
csScheme : Str -> ColorSchemeProperty
csScheme =
    SScheme


{-| Indicate a CSV (comma-separated) format when parsing a data source.
-}
csv : FormatProperty
csv =
    CSV


{-| Scrolling cursor.
-}
cuAllScroll : Cursor
cuAllScroll =
    CAllScroll


{-| Automatically determine a cursor type depending on interaction context.
-}
cuAuto : Cursor
cuAuto =
    CAuto


{-| Alias cursor.
-}
cuAlias : Cursor
cuAlias =
    CAlias


{-| Cube helix color interpolation using the given gamma value (anchored at 1).
-}
cubeHelix : Float -> CInterpolate
cubeHelix =
    CubeHelix


{-| A long path cube-helix color interpolation using the given gamma value (anchored at 1).
-}
cubeHelixLong : Float -> CInterpolate
cubeHelixLong =
    CubeHelixLong


{-| Cell cursor.
-}
cuCell : Cursor
cuCell =
    CCell


{-| Resizing cursor.
-}
cuColResize : Cursor
cuColResize =
    CColResize


{-| Context menu cursor.
-}
cuContextMenu : Cursor
cuContextMenu =
    CContextMenu


{-| Copy cursor.
-}
cuCopy : Cursor
cuCopy =
    CCopy


{-| Crosshair cursor.
-}
cuCrosshair : Cursor
cuCrosshair =
    CCrosshair


{-| Default cursor.
-}
cuDefault : Cursor
cuDefault =
    CDefault


{-| Resizing cursor.
-}
cuEResize : Cursor
cuEResize =
    CEResize


{-| Resizing cursor.
-}
cuEWResize : Cursor
cuEWResize =
    CEWResize


{-| Grab cursor.
-}
cuGrab : Cursor
cuGrab =
    CGrab


{-| Grabbing cursor.
-}
cuGrabbing : Cursor
cuGrabbing =
    CGrabbing


{-| Help cursor.
-}
cuHelp : Cursor
cuHelp =
    CHelp


{-| Move cursor.
-}
cuMove : Cursor
cuMove =
    CMove


{-| Resizing cursor.
-}
cuNEResize : Cursor
cuNEResize =
    CNEResize


{-| Resizing cursor.
-}
cuNESWResize : Cursor
cuNESWResize =
    CNESWResize


{-| 'No drop' cursor.
-}
cuNoDrop : Cursor
cuNoDrop =
    CNoDrop


{-| No cursor.
-}
cuNone : Cursor
cuNone =
    CNone


{-| 'Not allowed' cursor.
-}
cuNotAllowed : Cursor
cuNotAllowed =
    CNotAllowed


{-| Resizing cursor.
-}
cuNResize : Cursor
cuNResize =
    CNResize


{-| Resizing cursor.
-}
cuNSResize : Cursor
cuNSResize =
    CNSResize


{-| Resizing cursor.
-}
cuNWResize : Cursor
cuNWResize =
    CNWResize


{-| Resizing cursor.
-}
cuNWSEResize : Cursor
cuNWSEResize =
    CNESWResize


{-| Pointer cursor.
-}
cuPointer : Cursor
cuPointer =
    CPointer


{-| Progress cursor.
-}
cuProgress : Cursor
cuProgress =
    CProgress


{-| Resizing cursor.
-}
cuRowResize : Cursor
cuRowResize =
    CRowResize


{-| A convenience function for generating a text value representing a given cursor
type.
-}
cursorValue : Cursor -> Value
cursorValue cur =
    case cur of
        CAuto ->
            vStr "auto"

        CDefault ->
            vStr "default"

        CNone ->
            vStr "none"

        CContextMenu ->
            vStr "context-menu"

        CHelp ->
            vStr "help"

        CPointer ->
            vStr "pointer"

        CProgress ->
            vStr "progress"

        CWait ->
            vStr "wait"

        CCell ->
            vStr "cell"

        CCrosshair ->
            vStr "crosshair"

        CText ->
            vStr "text"

        CVerticalText ->
            vStr "vertical-text"

        CAlias ->
            vStr "alias"

        CCopy ->
            vStr "copy"

        CMove ->
            vStr "move"

        CNoDrop ->
            vStr "no-drop"

        CNotAllowed ->
            vStr "not-allowed"

        CAllScroll ->
            vStr "all-scroll"

        CColResize ->
            vStr "col-resize"

        CRowResize ->
            vStr "row-resize"

        CNResize ->
            vStr "n-resize"

        CEResize ->
            vStr "e-resize"

        CSResize ->
            vStr "s-resize"

        CWResize ->
            vStr "w-resize"

        CNEResize ->
            vStr "ne-resize"

        CNWResize ->
            vStr "nw-resize"

        CSEResize ->
            vStr "se-resize"

        CSWResize ->
            vStr "sw-resize"

        CEWResize ->
            vStr "ew-resize"

        CNSResize ->
            vStr "ns-resize"

        CNESWResize ->
            vStr "nesw-resize"

        CNWSEResize ->
            vStr "nwse-resize"

        CZoomIn ->
            vStr "zoom-in"

        CZoomOut ->
            vStr "zoom-out"

        CGrab ->
            vStr "grab"

        CGrabbing ->
            vStr "grabbing"


{-| Resizing cursor.
-}
cuSEResize : Cursor
cuSEResize =
    CSEResize


{-| Resizing cursor.
-}
cuSResize : Cursor
cuSResize =
    CSResize


{-| Custom projection type. Additional custom projections from d3 can be defined
via the [Vega API](https://vega.github.io/vega/docs/projections/#register) and
called from with this function where the parameter is the name of the D3
projection to use (e.g. `customProjection (str "winkel3")`).
-}
customProjection : Str -> Projection
customProjection =
    Proj


{-| Resizing cursor.
-}
cuSWResize : Cursor
cuSWResize =
    CSWResize


{-| Text cursor.
-}
cuText : Cursor
cuText =
    CText


{-| Vertical text cursor.
-}
cuVerticalText : Cursor
cuVerticalText =
    CVerticalText


{-| Waiting cursor.
-}
cuWait : Cursor
cuWait =
    CWait


{-| Resizing cursor.
-}
cuWResize : Cursor
cuWResize =
    CWResize


{-| Zooming cursor.
-}
cuZoomIn : Cursor
cuZoomIn =
    CZoomIn


{-| Zooming cursor.
-}
cuZoomOut : Cursor
cuZoomOut =
    CZoomOut


{-| Reference a dataset with the given name.
-}
daDataset : String -> DataReference
daDataset =
    DDataset


{-| Reference a data field with the given value.
-}
daField : Field -> DataReference
daField =
    DField


{-| Reference a collection of data fields with the given values.
-}
daFields : List Field -> DataReference
daFields =
    DFields


{-| Data format to use when loading or generating a dataset.
-}
daFormat : List FormatProperty -> DataProperty
daFormat =
    DaFormat


{-| Updates to insert, remove, and toggle data values, or clear the data in a
dataset when trigger conditions are met.
-}
daOn : List Trigger -> DataProperty
daOn =
    DaOn


{-| Reference a collection of nested data references.
-}
daReferences : List (List DataReference) -> DataReference
daReferences =
    DReferences


{-| Make a data reference with a signal.
-}
daSignal : String -> DataReference
daSignal =
    DSignal


{-| Sort a data reference.
-}
daSort : List SortProperty -> DataReference
daSort =
    DSort


{-| Name a data source when generating a dataset.
-}
daSource : String -> DataProperty
daSource =
    DaSource


{-| Name a collection of data sources when generating a dataset.
-}
daSources : List String -> DataProperty
daSources =
    DaSources


{-| Generate a global sphere dataset.
-}
daSphere : DataProperty
daSphere =
    DaSphere


{-| Declare a named dataset. Depending on the properties provided this may be
from an external file, from a named data source or inline literal values.
-}
data : String -> List DataProperty -> DataTable
data name dProps =
    ( "name", JE.string name ) :: List.map dataProperty dProps


{-| Create a column of data. A column has a name and a list of values. The final
parameter is the list of any other columns to which this is added.
-}
dataColumn : String -> Value -> List DataColumn -> List DataColumn
dataColumn colName val =
    case val of
        VNums ns ->
            (::) (List.map (\n -> ( colName, JE.float n )) ns)

        VNum n ->
            (::) [ ( colName, JE.float n ) ]

        VBoos bs ->
            (::) (List.map (\b -> ( colName, JE.bool b )) bs)

        VBoo b ->
            (::) [ ( colName, JE.bool b ) ]

        VStrs ss ->
            (::) (List.map (\s -> ( colName, JE.string s )) ss)

        VStr s ->
            (::) [ ( colName, JE.string s ) ]

        VObject vals ->
            (::) [ ( colName, JE.object (List.concatMap valueProperties vals) ) ]

        Values vals ->
            (::) [ ( colName, JE.list valueSpec vals ) ]

        _ ->
            (::) [ ( colName, JE.null ) ]


{-| Declare a data table from a list of column values. Each column contains values
of the same type, but types may vary between columns. Columns should all contain
the same number of items; if not the dataset will be truncated to the length of
the shortest.

The first parameter should be the name given to the data table for later reference.
Field formatting specifications can be provided in the second parameter or as an
empty list to use the default formatting. The columns are most easily generated
with `dataColumn`.

-}
dataFromColumns : String -> List FormatProperty -> List DataColumn -> DataTable
dataFromColumns name fmts cols =
    let
        dataArray =
            JE.list JE.object (transpose cols)

        fmt =
            if fmts == [] then
                []

            else
                [ ( "format", JE.object (List.concatMap formatProperty fmts) ) ]
    in
    [ ( "name", JE.string name ), ( "values", dataArray ) ] ++ fmt


{-| Declare a data table from a list of row values. Each row is specified with a
list of tuples where the first value is the column name, and the second the column
value for that row. Each column can have a value of a different type but you must
ensure that when multiple rows are added, they match the types of other values in
the same column. Field formatting specifications can be provided in the first
parameter or as an empty list to use the default formatting.

Rows are most easily generated with `dataRow`. If you are creating data inline
(as opposed to reading from a file), generally, adding data by column is more
efficient and less error-prone.

-}
dataFromRows : String -> List FormatProperty -> List DataRow -> DataTable
dataFromRows name fmts rows =
    let
        fmt =
            if fmts == [] then
                []

            else
                [ ( "format", JE.object (List.concatMap formatProperty fmts) ) ]
    in
    [ ( "name", JE.string name ), ( "values", JE.list identity rows ) ] ++ fmt


{-| Create a row of data. A row comprises a list of (_columnName_, _value_) pairs.
The final parameter is the list of any other rows to which this is added.
-}
dataRow : List ( String, Value ) -> List DataRow -> List DataRow
dataRow row =
    (::) (JE.object (List.map (\( colName, val ) -> ( colName, valueSpec val )) row))


{-| Data source to be used by a visualization. A data source is a collection of
data tables which themselves may be generated inline, loaded from a URL or the
result of a transformation.
-}
dataSource : List DataTable -> Data
dataSource dataTables =
    ( VData, JE.list JE.object dataTables )


{-| Data file to be loaded when generating a dataset.
-}
daUrl : Str -> DataProperty
daUrl =
    DaUrl


{-| Data value(s) for generating a dataset inline.
-}
daValue : Value -> DataProperty
daValue =
    DaValue


{-| Create a data reference from a list of literals. Useful when combining with
data references from existing data streams. For example

    scale "myScale"
        [ scDomain
            (doData
                [ daReferences
                    [ [ daValues (vNums [ 2, 4 ]) ]
                    , [ daDataset "myData", daField (field "myField") ]
                    ]
                ]
            )
        ]

-}
daValues : Value -> DataReference
daValues =
    DValues


{-| A day time unit.
-}
day : TimeUnit
day =
    Day


{-| Indicate descending order when sorting.
-}
descend : Order
descend =
    Descend


{-| Provide a text description of the visualization.
-}
description : String -> ( VProperty, Spec )
description s =
    ( VDescription, JE.string s )


{-| Kernel density estimate (smoothed probability distribution) for a set of
numerical values. The first parameter is the dataset containing
the source data, the second the name of the field containing the numerical values
and the third the kernel bandwidth. If the bandwidth is 0, it will be estimated
from the input data.
-}
diKde : String -> Field -> Num -> Distribution
diKde =
    DiKde


{-| Weighted mixture of probability distributions. The parameter should be a list
of tuples representing the component distributions and their corresponding weights.
-}
diMixture : List ( Distribution, Num ) -> Distribution
diMixture =
    DiMixture


{-| Normal (Gaussian) probability distribution with a given mean (first parameter)
and standard deviation (second parameter).
-}
diNormal : Num -> Num -> Distribution
diNormal =
    DiNormal


{-| Uniform probability distribution with given minimum (first parameter) and
maximum (second parameter) bounds.
-}
diUniform : Num -> Num -> Distribution
diUniform =
    DiUniform


{-| Fields to contain a density transform's values (assigned to a new field named
in the first parameter) and probabilities (field named in the second parameter).
If not specified, the output will allocated to fields named `value` and `probability`.
-}
dnAs : String -> String -> DensityProperty
dnAs =
    DnAs


{-| Cumulative density function (CDF).
-}
dnCdf : DensityFunction
dnCdf =
    CDF


{-| A [min, max] domain from which to sample a distribution in a density transform.
-}
dnExtent : Num -> DensityProperty
dnExtent =
    DnExtent


{-| Type of distribution to generate in a density transform.
-}
dnMethod : DensityFunction -> DensityProperty
dnMethod =
    DnMethod


{-| Probability density function (PDF).
-}
dnPdf : DensityFunction
dnPdf =
    PDF


{-| Density function referenced by the value in the named signal.
-}
dnSignal : String -> DensityFunction
dnSignal =
    DensityFunctionSignal


{-| Number of uniformly spaced steps to take along an extent domain in a density transform.
-}
dnSteps : Num -> DensityProperty
dnSteps =
    DnSteps


{-| Data reference object specifying field values in one or more datasets to
define a scale domain.
-}
doData : List DataReference -> ScaleDomain
doData =
    DoData


{-| List of numeric values (`Nums`) representing a scale domain.
-}
doNums : Num -> ScaleDomain
doNums =
    DoNums


{-| Scale domain referenced by the value in the named signal.
-}
doSignal : String -> ScaleDomain
doSignal s =
    DoStrs (StrSignal s)


{-| Scale domains referenced by the values in the named signals.
-}
doSignals : List String -> ScaleDomain
doSignals ss =
    DoStrs (StrSignals ss)


{-| List of strings (`Strs`) representing a scale domain.
-}
doStrs : Str -> ScaleDomain
doStrs =
    DoStrs


{-| DSV (delimited separated value) format with a custom delimiter.
-}
dsv : Str -> FormatProperty
dsv =
    DSV


{-| Allow events of a certain type to be handled.
-}
efAllow : EventFilter
efAllow =
    Allow


{-| Prevent events of a certain type from being handled.
-}
efPrevent : EventFilter
efPrevent =
    Prevent


{-| Named custom encoding set. Also requires a signal event handler with an
`encode` directive.
-}
enCustom : String -> List MarkProperty -> EncodingProperty
enCustom name =
    Custom name


{-| Properties to be encoded when a mark item is first instantiated or resized.
-}
enEnter : List MarkProperty -> EncodingProperty
enEnter =
    Enter


{-| Encoding directives for the visual properties of the top-level group mark
representing a chart’s data rectangle. For example, this can be used to set a
background fill color for the plotting area, rather than the entire view.
-}
encode : List EncodingProperty -> ( VProperty, Spec )
encode eps =
    ( VEncode, JE.object (List.map encodingProperty eps) )


{-| Properties to be encoded when the data backing a mark item is removed.
-}
enExit : List MarkProperty -> EncodingProperty
enExit =
    Exit


{-| Custom encoding for gradient (continuous) legends.
-}
enGradient : List EncodingProperty -> LegendEncoding
enGradient =
    EnGradient


{-| Whether or not a custom legend encoding set is to be interactive.
-}
enInteractive : Boo -> EncodingProperty
enInteractive =
    EnInteractive


{-| Properties to be encoded when a pointer hovers over a mark item.
-}
enHover : List MarkProperty -> EncodingProperty
enHover =
    Hover


{-| Custom encoding for legend labels.
-}
enLabels : List EncodingProperty -> LegendEncoding
enLabels =
    EnLabels


{-| Custom encoding for a legend group mark.
-}
enLegend : List EncodingProperty -> LegendEncoding
enLegend =
    EnLegend


{-| Name for a custom legend encoding set.
-}
enName : String -> EncodingProperty
enName =
    EnName


{-| Custom encoding for symbol (discrete) legends.
-}
enSymbols : List EncodingProperty -> LegendEncoding
enSymbols =
    EnSymbols


{-| Custom ecoding for a legend title.
-}
enTitle : List EncodingProperty -> LegendEncoding
enTitle =
    EnTitle


{-| Properties to be encoded when a mark item is updated such as in response to
a signal change.
-}
enUpdate : List MarkProperty -> EncodingProperty
enUpdate =
    Update


{-| An equirectangular (default) map projection that maps longitude to x and
latitude to y.
-}
equirectangular : Projection
equirectangular =
    Equirectangular


{-| Event stream filter that lets only events that occur between the two given event
streams from being handled. Useful for capturing pointer dragging as it is a pointer
movement event stream that occurs between `MouseDown` and `MouseUp` events.

    << signal "myDrag"
        [ siValue (vNums [ 200, 200 ])
        , siOn
            [ evHandler
                [esObject
                    [ esBetween [ esMark rect, esType etMouseDown ] [ esSource esView, esType etMouseUp ]
                    , esSource esView
                    , esType etMouseMove
                    ]
                ]
                [ evUpdate "xy()" ]
            ]
        ]

This is equivalent to the more compact, but more error-prone event stream selector:

    esSelector (str "[rect:mousedown, view:mouseup] > view:mousemove")

-}
esBetween : List EventStreamProperty -> List EventStreamProperty -> EventStreamProperty
esBetween =
    ESBetween


{-| Whether or not an event stream is consumed once it has been captured. If false,
the event is made available for subsequent event handling.
-}
esConsume : Boo -> EventStreamProperty
esConsume =
    ESConsume


{-| Minimum time to wait between event occurrence and processing. If a new event
arrives during a debouncing window, the timer will restart and only the new event
will be captured.
-}
esDebounce : Num -> EventStreamProperty
esDebounce =
    ESDebounce


{-| DOM node to be the source for an event selector. Referenced with a standard
[CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
-}
esDom : String -> EventSource
esDom =
    ESDom


{-| Predicate expressions that must all evaluate to `True` for an event to be captured.
-}
esFilter : List String -> EventStreamProperty
esFilter =
    ESFilter


{-| Mark type to be the source for an event stream.
-}
esMark : Mark -> EventStreamProperty
esMark =
    ESMark


{-| Named mark to be the source for an event stream. The name given here
must correspond to that provided via `mName`.
-}
esMarkName : String -> EventStreamProperty
esMarkName =
    ESMarkName


{-| Merge a list of event streams into a single stream.
-}
esMerge : List EventStream -> EventStream
esMerge =
    ESMerge


{-| Event stream for modelling user input. The parameter represents a stream object
which provides a more self-explanatory and robust form of specification than using
a selector string.
-}
esObject : List EventStreamProperty -> EventStream
esObject =
    ESObject


{-| Compact representation of an event stream for modelling user input (alternative
to [esObject](#esObject)).
-}
esSelector : Str -> EventStream
esSelector =
    ESSelector


{-| Signal that triggers an event stream. Allows an update to be triggered whenever
the given signal changes.
-}
esSignal : String -> EventStream
esSignal =
    ESSignal


{-| Source for an event selector.
-}
esSource : EventSource -> EventStreamProperty
esSource =
    ESSource


{-| Event stream to be used as input into a derived event stream. Useful if several
event streams have a common element:

    si =
        let
            esStart =
                esMerge
                    [ esObject [ esType etMouseDown ]
                    , esObject [ esType etTouchStart ]
                    ]

            esEnd =
                esObject [ esType etTouchEnd ]
        in
        signals
            << signal "down"
                [ siValue vNull
                , siOn
                    [ evHandler [ esEnd ] [ evUpdate "null" ]
                    , evHandler [ esStart ] [ evUpdate "xy()" ]
                    ]
                ]
            << signal "xCur"
                [ siValue vNull
                , siOn
                    [ evHandler [ esObject [ esStream esStart, esType etTouchEnd ] ]
                        [ evUpdate "slice(xDom)" ]
                    ]
                ]

-}
esStream : EventStream -> EventStreamProperty
esStream =
    ESDerived


{-| Minimum time in milliseconds between captured events. New events that arrive
within the throttling window will be ignored. For timer events, this determines
the interval between timer ticks.
-}
esThrottle : Num -> EventStreamProperty
esThrottle =
    ESThrottle


{-| Type of event stream for handling user interaction events.
-}
esType : EventType -> EventStreamProperty
esType =
    ESType


{-| Name of a mark property encoding set to re-evaluate for the mark that is the
source of an input event. This is required if `evUpdate` is not specified.
-}
evEncode : String -> EventHandler
evEncode =
    EEncode


{-| Event source from any mark. Equivalent to the `*` selector.
-}
esAll : EventSource
esAll =
    ESAll


{-| Limit event source to events from the main group in which a nested group sits.
-}
esScope : EventSource
esScope =
    ESScope


{-| Event source from the current Vega view component.
-}
esView : EventSource
esView =
    ESView


{-| Event source from the browser window object.
-}
esWindow : EventSource
esWindow =
    ESWindow


{-| Click interaction event type.
-}
etClick : EventType
etClick =
    Click


{-| Double click interaction event type.
-}
etDblClick : EventType
etDblClick =
    DblClick


{-| Drag entry interaction event type.
-}
etDragEnter : EventType
etDragEnter =
    DragEnter


{-| Drag exit interaction event type.
-}
etDragLeave : EventType
etDragLeave =
    DragLeave


{-| Drag over interaction event type.
-}
etDragOver : EventType
etDragOver =
    DragOver


{-| Key down interaction event type.
-}
etKeyDown : EventType
etKeyDown =
    KeyDown


{-| Key press interaction event type.
-}
etKeyPress : EventType
etKeyPress =
    KeyPress


{-| Key up interaction event type.
-}
etKeyUp : EventType
etKeyUp =
    KeyUp


{-| Mouse down interaction event type.
-}
etMouseDown : EventType
etMouseDown =
    MouseDown


{-| Mouse movement interaction event type.
-}
etMouseMove : EventType
etMouseMove =
    MouseMove


{-| Mouse exit interaction event type.
-}
etMouseOut : EventType
etMouseOut =
    MouseOut


{-| Mouse over interaction event type.
-}
etMouseOver : EventType
etMouseOver =
    MouseOver


{-| Mouse up interaction event type.
-}
etMouseUp : EventType
etMouseUp =
    MouseUp


{-| Mouse wheel interaction event type.
-}
etMouseWheel : EventType
etMouseWheel =
    MouseWheel


{-| Fire an event at a regular interval determined by the number of milliseconds
provided with `esThrottle`.
-}
etTimer : EventType
etTimer =
    Timer


{-| Touch end interaction event type.
-}
etTouchEnd : EventType
etTouchEnd =
    TouchEnd


{-| Touch move interaction event type.
-}
etTouchMove : EventType
etTouchMove =
    TouchMove


{-| Touch start interaction event type.
-}
etTouchStart : EventType
etTouchStart =
    TouchStart


{-| Wheel interaction event type.
-}
etWheel : EventType
etWheel =
    Wheel


{-| Whether or not updates that do not change a signal value should propagate.
e.g., if true and an input stream update sets the signal to its current value,
downstream signals will be notified of an update.
-}
evForce : Boo -> EventHandler
evForce =
    EForce


{-| Event handler. The first parameter is the stream(s) of events to
respond to. The second, a list of handlers that respond to the event stream.

    signal "tooltip"
        [ siValue (vObject [])
        , siOn
            [ evHandler [ esObject [ esMark rect, esType etMouseOver ] ] [ evUpdate "datum" ]
            , evHandler [ esObject [ esMark rect, esType etMouseOut ] ] [ evUpdate "" ]
            ]
        ]

-}
evHandler : List EventStream -> List EventHandler -> List EventHandler
evHandler ess eHandlers =
    EEvents ess :: eHandlers


{-| Event selector used to generate an event stream.
-}
evStreamSelector : Str -> EventStream
evStreamSelector =
    ESSelector


{-| Expression to be evaluated when an event occurs, the result of which becomes
the new signal value.
-}
evUpdate : String -> EventHandler
evUpdate =
    EUpdate


{-| Field lookup that forms a Vega [Expr](https://vega.github.io/vega/docs/types/#Expr).
In contrast to an expression generated by `expr`, a field lookup is applied once
to an entire field rather than evaluated once per datum.
-}
exField : String -> Expr
exField =
    ExField


{-| Expression to enable custom calculations specified in the [Vega expression
language](https://vega.github.io/vega/docs/expressions). In contrast to a field
reference or signal, the expression is evaluated once per datum behaving like an
anonymous (lambda) function.
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


{-| For pre-faceted data, the name of the data field containing a list of data
values to use as the local partition. This is required if using pre-faceted data.
-}
faField : Field -> Facet
faField =
    FaField


{-| For data-driven facets, specify a list of field names by which to partition
the data. This is required if using pre-faceted data.
-}
faGroupBy : List Field -> Facet
faGroupBy =
    FaGroupBy


{-| A Boolean false value.
-}
false : Boo
false =
    Boo False


{-| Perform a lookup on the current data object using the given field.
Once evaluated this is similar to simply providing a string value.
-}
fDatum : Field -> Field
fDatum =
    FDatum


{-| Name of a geoJSON feature. Can be used with [prFit](#prFit) to fit a map
projection scaling and centre to a given geoJSON feature or feature collection.

    pr =
        projections
            << projection "myProjection"
                [ prType orthographic
                , prSize (numSignal "[width,height]")
                , prFit (feName "mapData")
                ]

-}
feName : String -> Feature
feName =
    FeName


{-| geoJSON feature referenced by the value in the named signal. Can be used with
[prFit](#prFit) to fit a map projection scaling and centre to a given geoJSON
feature or feature collection.

    ds =
        dataSource
            [ data "myLongLatData" []
                |> transform
                    [ trGeoJson
                        [ gjFields (field "longitude") (field "latitude")
                        , gjSignal "feature"
                        ]
                    ]
            ]

    pr =
        projections
            << projection "myProjection"
                [ prType orthographic
                , prSize (numSignal "[width,height]")
                , prFit (featureSignal "feature")
                ]

-}
featureSignal : String -> Feature
featureSignal =
    FeatureSignal


{-| Expression that references a field but can perform calculations on each datum
in the field.

    fExpr "scale('xScale', datum.Horsepower)"

-}
fExpr : String -> Field
fExpr =
    FExpr


{-| Property of the enclosing group mark instance as a field value.
-}
fGroup : Field -> Field
fGroup =
    FGroup


{-| Name of a field to reference.
-}
field : String -> Field
field =
    FName


{-| Specify Boolean values are to be parsed when reading input data.
-}
foBoo : DataType
foBoo =
    FoBoo


{-| Force that pulls all nodes towards a shared centre point in a force
simulation. The two parameters specify the x and y coordinates of the centre point.
-}
foCenter : Num -> Num -> Force
foCenter x y =
    FCenter [ FpCx x, FpCy y ]


{-| Collision detection force that pushes apart nodes whose circular radii overlap
in a force simulation. The first parameter specifies the radius of
the node to which it applies. The second enables the strength and number of
iterations to be specified.
-}
foCollide : Num -> List ForceProperty -> Force
foCollide r fps =
    FCollide (FpRadius r :: fps)


{-| Date format for parsing data using
[D3's formatting specifiers](https://github.com/d3/d3-time-format#locale_format).
-}
foDate : String -> DataType
foDate =
    FoDate


{-| Link constraints that cause nodes to be pushed apart towards a target separation
distance in a force simulation. The first parameter is the name of the dataset
containing the link objects, each of which should contain `source` and `target`
fields. The second enables the id, distance, strength and number
of iterations to be specified. If an id field parameter is provided, it is used
to relate link objects and node objects. Otherwise, the source and target fields
should provide indices into the array of node objects.
-}
foLink : Str -> List ForceProperty -> Force
foLink links fps =
    FLink (FpLinks links :: fps)


{-| n-body force that causes nodes to either attract or repel each other
in a force simulation. The parameter enables the strength, theta value, and min/max
distances over which the force acts to be specified.
-}
foNBody : List ForceProperty -> Force
foNBody =
    FNBody


{-| Specify numeric values are to be parsed when reading input data.
-}
foNum : DataType
foNum =
    FoNum


{-| Format referenced by the value in the named signal (e.g. `csv`, `tsv`, `json`).
Useful when dynamic loading of data with different formats is required.
-}
fpSignal : String -> FormatProperty
fpSignal =
    FormatPropertySignal


{-| UTC date format for parsing data using
[D3's formatting specifiers](https://github.com/d3/d3-time-format#locale_format).
-}
foUtc : String -> DataType
foUtc =
    FoUtc


{-| Force attraction towards a particular x-coordinate (first parameter), with a
given strength (second parameter) on a per-node basis.
-}
foX : Field -> List ForceProperty -> Force
foX x fps =
    FX x fps


{-| Force attraction towards a particular y-coordinate (first parameter), with a
given strength (second parameter) on a per-node basis.
-}
foY : Field -> List ForceProperty -> Force
foY y fps =
    FY y fps


{-| Field of the enclosing group mark’s data object as a field.
-}
fParent : Field -> Field
fParent =
    FParent


{-| Distance in pixels by which the link constraint should separate
nodes (default 30).
-}
fpDistance : Num -> ForceProperty
fpDistance =
    FpDistance


{-| Maximum distance over which an n-body force acts. If two nodes
exceed this value, they will not exert forces on each other.
-}
fpDistanceMax : Num -> ForceProperty
fpDistanceMax =
    FpDistanceMax


{-| Minimum distance over which an n-body force acts. If two nodes
are closer than this value, the exerted forces will be as if they are distanceMin
apart (default 1).
-}
fpDistanceMin : Num -> ForceProperty
fpDistanceMin =
    FpDistanceMin


{-| Data field for a node’s unique identifier. If provided, the source and target
fields of each link should use these values to indicate nodes.
-}
fpId : Field -> ForceProperty
fpId =
    FpId


{-| Number of iterations to run collision detection or link constraints (default 1)
in a force directed simulation.
-}
fpIterations : Num -> ForceProperty
fpIterations =
    FpIterations


{-| Relative strength of a force or link constraint in a force simulation.
-}
fpStrength : Num -> ForceProperty
fpStrength =
    FpStrength


{-| Approximation parameter for aggregating more distance forces in a force-directed
simulation (default 0.9).
-}
fpTheta : Num -> ForceProperty
fpTheta =
    FpTheta


{-| Energy level or “temperature” of a simulation under a force transform. Alpha
values lie in the range [0, 1]. Internally, the simulation will decrease the alpha
value over time, causing the magnitude of updates to diminish.
-}
fsAlpha : Num -> ForceSimulationProperty
fsAlpha =
    FsAlpha


{-| Minimum amount by which to lower the alpha value on each simulation iteration
under a force transform.
-}
fsAlphaMin : Num -> ForceSimulationProperty
fsAlphaMin =
    FsAlphaMin


{-| Target alpha value to which a simulation converges under a force transformation.
-}
fsAlphaTarget : Num -> ForceSimulationProperty
fsAlphaTarget =
    FsAlphaTarget


{-| Names of the output fields to which node positions and velocities are written
after a force transformation. The default is ["x", "y", "vx", "vy"] corresponding
to the order of parameter names.
-}
fsAs : String -> String -> String -> String -> ForceSimulationProperty
fsAs x y vx vy =
    FsAs x y vx vy


{-| Forces to include in a force-directed simulation resulting from a force transform.
-}
fsForces : List Force -> ForceSimulationProperty
fsForces =
    FsForces


{-| Field referenced by the value in the named signal.
-}
fSignal : String -> Field
fSignal =
    FSignal


{-| Number of iterations in a force transformation when in static mode (default 300).
-}
fsIterations : Num -> ForceSimulationProperty
fsIterations =
    FsIterations


{-| Whether a simulation in a force transformation should restart when node object
fields are modified.
-}
fsRestart : Boo -> ForceSimulationProperty
fsRestart =
    FsRestart


{-| Whether a simulation in a force transformation should be computed in batch to
produce a static layout (true) or should be animated (false).
-}
fsStatic : Boo -> ForceSimulationProperty
fsStatic =
    FsStatic


{-| Friction to be applied to a simulation in a force transformation. This is applied
after the application of any forces during an iteration.
-}
fsVelocityDecay : Num -> ForceSimulationProperty
fsVelocityDecay =
    FsVelocityDecay


{-| Field containing the GeoJSON objects to be consolidated into a feature collection
by a geoJSON transform.
-}
gjFeature : Field -> GeoJsonProperty
gjFeature =
    GjFeature


{-| Fields containing longitude (first parameter) and latitude (second parameter)
to be consolidated into a feature collection by a geoJSON transform.
-}
gjFields : Field -> Field -> GeoJsonProperty
gjFields =
    GjFields


{-| Name of the a new signal to capture the output of generated by a geoJSON transform.
-}
gjSignal : String -> GeoJsonProperty
gjSignal =
    GjSignal


{-| A gnomonic map projection.
-}
gnomonic : Projection
gnomonic =
    Gnomonic


{-| Output field in which to write a generated shape instance following a geoShape
or geoPath transformation.
-}
gpAs : String -> GeoPathProperty
gpAs =
    GeAs


{-| Data field containing GeoJSON data when applying a geoShape or geoPath transformation.
If unspecified, the full input data object will be used.
-}
gpField : Field -> GeoPathProperty
gpField =
    GeField


{-| Default radius (in pixels) to use when drawing GeoJSON Point and MultiPoint
geometries. An expression value may be used to set the point radius as a function
of properties of the input GeoJSON.
-}
gpPointRadius : Num -> GeoPathProperty
gpPointRadius =
    GePointRadius


{-| Indicate grid elements will be aligned and each row or column will be sized
identically based on the maximum observed size.
-}
grAlignAll : GridAlign
grAlignAll =
    AlignAll


{-| Layout alignment to apply to grid columns. Used in cases when alignment rules
are different for rows and columns.
-}
grAlignColumn : GridAlign -> GridAlign
grAlignColumn =
    AlignColumn


{-| Indicate grid elements will be aligned into a clean grid structure, but each
row or column may be of variable size.
-}
grAlignEach : GridAlign
grAlignEach =
    AlignEach


{-| Indicate a flow grid layout will be used in which adjacent plots are placed
one after the other.
-}
grAlignNone : GridAlign
grAlignNone =
    AlignNone


{-| Layout alignment to apply to grid rows. Used in cases when alignment rules
are different for rows and columns.
-}
grAlignRow : GridAlign -> GridAlign
grAlignRow =
    AlignRow


{-| Layout alignment referenced by the value in the named signal.
-}
grAlignSignal : String -> GridAlign
grAlignSignal =
    AlignSignal


{-| Major and minor extents of a graticule to be the same values. Parameter should
evaluate to a two-element list representing longitude and latitude extents.
-}
grExtent : Num -> GraticuleProperty
grExtent =
    GrExtent


{-| Major extent of a graticule. Parameter should evaluate to a two-element list
representing longitude and latitude extents.
-}
grExtentMajor : Num -> GraticuleProperty
grExtentMajor =
    GrExtentMajor


{-| Minor extent of a graticule. Parameter should evaluate to a two-element list
representing longitude and latitude extents.
-}
grExtentMinor : Num -> GraticuleProperty
grExtentMinor =
    GrExtentMinor


{-| Field used to bin when generating a graticule.
-}
grField : Field -> GraticuleProperty
grField =
    GrField


{-| An group mark for assembling nested marks.
-}
group : Mark
group =
    Group


{-| Precision in degrees with which graticule arcs are generated. The default value
is 2.5 degrees.
-}
grPrecision : Num -> GraticuleProperty
grPrecision =
    GrPrecision


{-| Major and minor step angles of a graticule to be the same values. Parameter
should be a two-element list representing longitude and latitude spacing.
-}
grStep : Num -> GraticuleProperty
grStep =
    GrStep


{-| Major step angles of a graticule. Parameter should be a two-element list
representing longitude and latitude spacing.
-}
grStepMajor : Num -> GraticuleProperty
grStepMajor =
    GrStepMajor


{-| Minor step angles of a graticule. Parameter should be a two-element list
representing longitude and latitude spacing.
-}
grStepMinor : Num -> GraticuleProperty
grStepMinor =
    GrStepMinor


{-| Center horizontal text alignment.
-}
haCenter : HAlign
haCenter =
    AlignCenter


{-| Left horizontal text alignment.
-}
haLeft : HAlign
haLeft =
    AlignLeft


{-| Right horizontal text alignment.
-}
haRight : HAlign
haRight =
    AlignRight


{-| Horizontal text alignment referenced by the value in the named signal.
-}
haSignal : String -> HAlign
haSignal =
    HAlignSignal


{-| Convenience function for indicating a central horizontal alignment.
-}
hCenter : Value
hCenter =
    vStr "center"


{-| Convenience function for indicating a left horizontal alignment.
-}
hLeft : Value
hLeft =
    vStr "left"


{-| A hour time unit.
-}
hour : TimeUnit
hour =
    Hour


{-| Convenience function for indicating a right horizontal alignment.
-}
hRight : Value
hRight =
    vStr "right"


{-| A hue-chroma-luminance color interpolation.
-}
hcl : CInterpolate
hcl =
    Hcl


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


{-| A hue-saturation-lightness color interpolation.
-}
hsl : CInterpolate
hsl =
    Hsl


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


{-| Values conditional on whether an expression (first parameter) evaluates as true.
The second and third parameters represent the 'then' and 'else' branches of the test.

To include nested conditions, subsequent `ifElse` calls should be placed in the
'else' branch.

    maFontWeight
        [ ifElse "indata('selected', 'source', datum.id)"
            [ vStr "bold" ]
            [ ifElse "indata('selected', 'target', datum.id)"
                [ vStr "bold" ]
                [ vNull ]
            ]
        ]

-}
ifElse : String -> List Value -> List Value -> Value
ifElse condition thenVals elseVals =
    VIfElse condition thenVals elseVals


{-| An image mark.
-}
image : Mark
image =
    Image


{-| Use maximum of a group when imputing a missing value.
-}
imByMax : ImputeMethod
imByMax =
    ByMax


{-| Use the mean value of a group when imputing a missing value.
-}
imByMean : ImputeMethod
imByMean =
    ByMean


{-| Use the median value of a group when imputing a missing value.
-}
imByMedian : ImputeMethod
imByMedian =
    ByMedian


{-| Use minimum of a group when imputing a missing value.
-}
imByMin : ImputeMethod
imByMin =
    ByMin


{-| Use a specific value when imputating a missing value.
-}
imByValue : ImputeMethod
imByValue =
    ByValue


{-| List of fields by which to group values in an impute transform. Imputation is
then performed on a per-group basis, such as a within group mean rather than global
mean.
-}
imGroupBy : List Field -> ImputeProperty
imGroupBy =
    ImGroupBy


{-| Additional collection of key values that should be considered for imputation
as part of an impute transform.
-}
imKeyVals : Value -> ImputeProperty
imKeyVals =
    ImKeyVals


{-| Imputation method to be used as part of an impute transform. If not specified
the default `ByMean` method will be used.
-}
imMethod : ImputeMethod -> ImputeProperty
imMethod =
    ImMethod


{-| A month selector input element.
-}
iMonth : List InputProperty -> Bind
iMonth =
    IMonth


{-| Value to use when an imputation method is set with `imByValue` in an impute transform.
-}
imValue : Value -> ImputeProperty
imValue =
    ImValue


{-| Whether autocomplete should be turned on or off for input elements that
support it.
-}
inAutocomplete : Bool -> InputProperty
inAutocomplete =
    InAutocomplete


{-| Delay event handling until the given milliseconds have elapsed since the last
event was fired. Helps to limit event broadcasting.
-}
inDebounce : Float -> InputProperty
inDebounce =
    InDebounce


{-| A CSS selector string indicating the parent element to which the input element
should be added. This allows the option of the input element to be outside the
visualization container, which could be used for linking separate visualizations.
-}
inElement : String -> InputProperty
inElement =
    InElement


{-| Maximum value for a range slider input element.
-}
inMax : Float -> InputProperty
inMax =
    InMax


{-| Minimum value for a range slider input element.
-}
inMin : Float -> InputProperty
inMin =
    InMin


{-| Options to be selected from a Radio or Select input element.
-}
inOptions : Value -> InputProperty
inOptions =
    InOptions


{-| Place-holding text for input elements before any value has been entered.
-}
inPlaceholder : String -> InputProperty
inPlaceholder =
    InPlaceholder


{-| Step value (increment between adjacent selectable values) for a range slider
input element.
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


{-| Output fields to be generated by a join aggregate transform.
-}
jaAs : List String -> JoinAggregateProperty
jaAs =
    JAAs


{-| Fields to aggregate in join aggregate transform.
-}
jaFields : List Field -> JoinAggregateProperty
jaFields =
    JAFields


{-| Fields to group by in a join aggregate transform.
-}
jaGroupBy : List Field -> JoinAggregateProperty
jaGroupBy =
    JAGroupBy


{-| Operations in a join aggregate transform.
-}
jaOps : List Operation -> JoinAggregateProperty
jaOps =
    JAOps


{-| Bevelled stroke join.
-}
joBevel : StrokeJoin
joBevel =
    JBevel


{-| Mitered stroke join.
-}
joMiter : StrokeJoin
joMiter =
    JMiter


{-| Rounded stroke join.
-}
joRound : StrokeJoin
joRound =
    JRound


{-| Stroke join (`miter`, `round` or `bevel`) referenced by the value in the
named signal.
-}
joSignal : String -> StrokeJoin
joSignal =
    StrokeJoinSignal


{-| Indicate a JSON format when parsing a data source.
-}
json : FormatProperty
json =
    JSON


{-| Property to be extracted from some JSON when it has some surrounding structure
or meta-data. e.g., specifying the property `values.features` is equivalent to
retrieving `json.values.features` from the loaded JSON object with a custom delimiter.
-}
jsonProperty : Str -> FormatProperty
jsonProperty =
    JSONProperty


{-| Custom key-value pair to be stored in an object generated by [vObject](#vObject).
-}
keyValue : String -> Value -> Value
keyValue =
    VKeyValue


{-| An CIELab color interpolation.
-}
lab : CInterpolate
lab =
    Lab


{-| Create a layout used in the visualization. For example the following creates
a three-column layout with 20 pixel padding between columns:

    lo =
        layout [ loColumns (num 3), loPadding (num 20) ]

-}
layout : List LayoutProperty -> ( VProperty, Spec )
layout lps =
    ( VLayout, JE.object (List.map layoutProperty lps) )


{-| Height in pixels to clip a symbol legend entries and limit its size.
By default no clipping is performed.
-}
leClipHeight : Num -> LegendProperty
leClipHeight =
    LeClipHeight


{-| Horizontal padding between entries in a symbol legend.
-}
leColumnPadding : Num -> LegendProperty
leColumnPadding =
    LeColumnPadding


{-| Number of columns in which to arrange symbol legend entries. A
value of 0 or lower indicates a single row with one column per entry. The default
is 0 for horizontal symbol legends and 1 for vertical symbol legends.
-}
leColumns : Num -> LegendProperty
leColumns =
    LeColumns


{-| Corner radius for an enclosing legend rectangle.
-}
leCornerRadius : Num -> LegendProperty
leCornerRadius =
    LeCornerRadius


{-| Direction of a legend.
-}
leDirection : Orientation -> LegendProperty
leDirection =
    LeDirection


{-| Mark encodings for custom legend styling. For example, to create a horizontal
dash symbol (using a simple SVG path) for each legend item:

    legend
        [ leEncode [ enSymbols [ enEnter [ maShape [ vStr "M-0.5,0H1" ] ] ] ]
        , leStroke "myColourScale"
        ]

-}
leEncode : List LegendEncoding -> LegendProperty
leEncode =
    LeEncode


{-| Name of the scale that maps to the legend symbols' fill colors.
-}
leFill : String -> LegendProperty
leFill =
    LeFill


{-| Bbackground color of an enclosing legend rectangle.
-}
leFillColor : Str -> LegendProperty
leFillColor =
    LeFillColor


{-| Format pattern for legend labels. Text should be either a
[d3-format specifier](https://github.com/d3/d3-format#locale_format) or a
[d3-time-format specifier](https://github.com/d3/d3-time-format#locale_format).
-}
leFormat : Str -> LegendProperty
leFormat =
    LeFormat


{-| Create a legend used to visualize a color, size or shape mapping.
-}
legend : List LegendProperty -> List Spec -> List Spec
legend lps =
    (::) (JE.object (List.map legendProperty lps))


{-| Create legends used to visualize color, size and shape mappings. Commonly the
functional composition operator (`<<`) is used to combine multiple legend
specifications. For example,

    lg =
        legends
            << legend
                [ leTitle (str "Income")
                , leOrient loBottomRight
                , leType ltSymbol
                , leSize "mySizeScale"
                ]
            << legend
                [ leTitle (str "Nationality")
                , leOrient loTopRight
                , leType ltSymbol
                , leFill "myColorScale"
                ]

-}
legends : List Spec -> ( VProperty, Spec )
legends lgs =
    ( VLegends, JE.list identity lgs )


{-| Opacity of a color gradient in a legend.
-}
leGradientOpacity : Num -> LegendProperty
leGradientOpacity =
    LeGradientOpacity


{-| Maximum allowed length of gradient labels in a legend.
-}
leGradientLabelLimit : Num -> LegendProperty
leGradientLabelLimit =
    LeGradientLabelLimit


{-| Vertical offset in pixels for gradient labels in a legend.
-}
leGradientLabelOffset : Num -> LegendProperty
leGradientLabelOffset =
    LeGradientLabelOffset


{-| Color of a legend's color gradient border.
-}
leGradientStrokeColor : Str -> LegendProperty
leGradientStrokeColor =
    LeGradientStrokeColor


{-| Width of a legend's color gradient border.
-}
leGradientStrokeWidth : Num -> LegendProperty
leGradientStrokeWidth =
    LeGradientStrokeWidth


{-| Thickness in pixels of the color gradient in a legend. This value
corresponds to the width of a vertical gradient or the height of a horizontal
gradient.
-}
leGradientThickness : Num -> LegendProperty
leGradientThickness =
    LeGradientThickness


{-| Length in pixels of the primary axis of a color gradient in a
legend. This value corresponds to the height of a vertical gradient or the width
of a horizontal gradient.
-}
leGradientLength : Num -> LegendProperty
leGradientLength =
    LeGradientLength


{-| Alignment to apply to symbol legends rows and columns.
-}
leGridAlign : GridAlign -> LegendProperty
leGridAlign =
    LeGridAlign


{-| Horizontal text alignment for a legend label.
-}
leLabelAlign : HAlign -> LegendProperty
leLabelAlign =
    LeLabelAlign


{-| Vertical text alignment for a legend label.
-}
leLabelBaseline : VAlign -> LegendProperty
leLabelBaseline =
    LeLabelBaseline


{-| Text color for legend labels.
-}
leLabelColor : Str -> LegendProperty
leLabelColor =
    LeLabelColor


{-| Font for legend labels.
-}
leLabelFont : Str -> LegendProperty
leLabelFont =
    LeLabelFont


{-| Font size in pixels for legend labels.
-}
leLabelFontSize : Num -> LegendProperty
leLabelFontSize =
    LeLabelFontSize


{-| Font weight for legend labels.
-}
leLabelFontWeight : Value -> LegendProperty
leLabelFontWeight =
    LeLabelFontWeight


{-| Maximum allowed length in pixels of a legend label.
-}
leLabelLimit : Num -> LegendProperty
leLabelLimit =
    LeLabelLimit


{-| Opacity for a legend's labels.
-}
leLabelOpacity : Num -> LegendProperty
leLabelOpacity =
    LeLabelOpacity


{-| Horizontal pixel offset for a legend's symbols.
-}
leLabelOffset : Num -> LegendProperty
leLabelOffset =
    LeLabelOffset


{-| Strategy to use for resolving overlap of labels in gradient legends.
-}
leLabelOverlap : OverlapStrategy -> LegendProperty
leLabelOverlap =
    LeLabelOverlap


{-| Offset in pixels by which to displace the legend from the data rectangle and axes.
-}
leOffset : Value -> LegendProperty
leOffset =
    LeOffset


{-| Name of the scale that maps to the legend symbols' opacities.
-}
leOpacity : String -> LegendProperty
leOpacity =
    LeOpacity


{-| Orientation of the legend, determining where the legend is placed
relative to a chart’s data rectangle.
-}
leOrient : LegendOrientation -> LegendProperty
leOrient =
    LeOrient


{-| Padding between the border and content of the legend group.
-}
lePadding : Value -> LegendProperty
lePadding =
    LePadding


{-| Vertical padding between entries in a symbol legend.
-}
leRowPadding : Num -> LegendProperty
leRowPadding =
    LeRowPadding


{-| Name of the scale that maps to the legend symbols' shapes.
-}
leShape : String -> LegendProperty
leShape =
    LeShape


{-| Name of the scale that maps to the legend symbols' sizes.
-}
leSize : String -> LegendProperty
leSize =
    LeSize


{-| Name of the scale that maps to the legend symbols' strokes.
-}
leStroke : String -> LegendProperty
leStroke =
    LeStroke


{-| Border color of an enclosing legend rectangle.
-}
leStrokeColor : Str -> LegendProperty
leStrokeColor =
    LeStrokeColor


{-| Stroke width of the color of a legend's gradient border.
-}
leStrokeWidth : Num -> LegendProperty
leStrokeWidth =
    LeStrokeWidth


{-| Default fill color for legend symbols. This is only applied if there
is no fill scale color encoding for the legend.
-}
leSymbolBaseFillColor : Str -> LegendProperty
leSymbolBaseFillColor =
    LeSymbolBaseFillColor


{-| Default stroke color for legend symbols. This is only applied if
there is no stroke scale color encoding for the legend.
-}
leSymbolBaseStrokeColor : Str -> LegendProperty
leSymbolBaseStrokeColor =
    LeSymbolBaseStrokeColor


{-| Default direction for legend symbols.
-}
leSymbolDirection : Orientation -> LegendProperty
leSymbolDirection =
    LeSymbolDirection


{-| Fill color for legend symbols.
-}
leSymbolFillColor : Str -> LegendProperty
leSymbolFillColor =
    LeSymbolFillColor


{-| Offset in pixels between legend labels their corresponding symbol or gradient.
-}
leSymbolOffset : Num -> LegendProperty
leSymbolOffset =
    LeSymbolOffset


{-| Opacity for a legend's symbols.
-}
leSymbolOpacity : Num -> LegendProperty
leSymbolOpacity =
    LeSymbolOpacity


{-| Default symbol area size in square pixel units.
-}
leSymbolSize : Num -> LegendProperty
leSymbolSize =
    LeSymbolSize


{-| Border color for legend symbols.
-}
leSymbolStrokeColor : Str -> LegendProperty
leSymbolStrokeColor =
    LeSymbolStrokeColor


{-| Default symbol border width used in a legend.
-}
leSymbolStrokeWidth : Num -> LegendProperty
leSymbolStrokeWidth =
    LeSymbolStrokeWidth


{-| Default symbol shape used in a legend.
-}
leSymbolType : Symbol -> LegendProperty
leSymbolType =
    LeSymbolType


{-| Name of the scale that maps to the legend symbols' stroke dashing.
-}
leStrokeDash : String -> LegendProperty
leStrokeDash =
    LeStrokeDash


{-| Ddesired number of ticks for a temporal legend. The first parameter
is the type of temporal interval to use and the second the number of steps of that
interval between ticks. For example to specify a tick is requested at six-month
intervals (e.g. January, July):

    lg =
        legends
            << legend
                [ leFill "cScale"
                , leType ltGradient
                , leFormat (str "%b %Y")
                , leTemporalTickCount month (num 6)
                ]

If the second parameter is not a positive value, the number of ticks will be
auto-generated for the given interval type.

-}
leTemporalTickCount : TimeUnit -> Num -> LegendProperty
leTemporalTickCount =
    LeTemporalTickCount


{-| Desired number of tick values for quantitative legends.
-}
leTickCount : Num -> LegendProperty
leTickCount =
    LeTickCount


{-| Title for the legend (none by default).
-}
leTitle : Str -> LegendProperty
leTitle =
    LeTitle


{-| Horizontal alignment for a legend title.
-}
leTitleAlign : HAlign -> LegendProperty
leTitleAlign =
    LeTitleAlign


{-| Vertical alignment for a legend title.
-}
leTitleBaseline : VAlign -> LegendProperty
leTitleBaseline =
    LeTitleBaseline


{-| Text color for a legend title.
-}
leTitleColor : Str -> LegendProperty
leTitleColor =
    LeTitleColor


{-| Font for a legend title.
-}
leTitleFont : Str -> LegendProperty
leTitleFont =
    LeTitleFont


{-| Font size in pixel units for a legend title.
-}
leTitleFontSize : Num -> LegendProperty
leTitleFontSize =
    LeTitleFontSize


{-| Font weight for a legend title.
-}
leTitleFontWeight : Value -> LegendProperty
leTitleFontWeight =
    LeTitleFontWeight


{-| Maximum allowed length in pixels of a legend title.
-}
leTitleLimit : Num -> LegendProperty
leTitleLimit =
    LeTitleLimit


{-| Opacity for a legend's title.
-}
leTitleOpacity : Num -> LegendProperty
leTitleOpacity =
    LeTitleOpacity


{-| Padding between the legend title and entries.
-}
leTitlePadding : Value -> LegendProperty
leTitlePadding =
    LeTitlePadding


{-| Type of legend.
-}
leType : LegendType -> LegendProperty
leType =
    LeType


{-| Explicitly set visible legend values.
-}
leValues : List Value -> LegendProperty
leValues =
    LeValues


{-| z-index indicating the layering of the legend group relative to other axis,
mark and legend groups. The default value is 0.
-}
leZIndex : Num -> LegendProperty
leZIndex =
    LeZIndex


{-| A line mark.
-}
line : Mark
line =
    Line


{-| Alignment to apply to grid rows and columns in a grid layout.
-}
loAlign : GridAlign -> LayoutProperty
loAlign =
    LAlign


{-| Position legend at the bottom of the visualization it describes.
-}
loBottom : LegendOrientation
loBottom =
    Bottom


{-| Position legend to the bottom-left of the visualization it describes.
-}
loBottomLeft : LegendOrientation
loBottomLeft =
    BottomLeft


{-| Position legend to the bottom-right of the visualization it describes.
-}
loBottomRight : LegendOrientation
loBottomRight =
    BottomRight


{-| Bounds calculation method to use for determining the extent of a
sub-plot in a grid layout.
-}
loBounds : BoundsCalculation -> LayoutProperty
loBounds =
    LBounds


{-| Number of columns to include in a grid layout. If unspecified, a
single row with unlimited columns will be assumed.
-}
loColumns : Num -> LayoutProperty
loColumns =
    LColumns


{-| Band positioning in the interval [0,1] indicating where in a cell
a footer should be placed in a grid layout.
-}
loFooterBand : Num -> LayoutProperty
loFooterBand =
    LFooterBand


{-| Similar to [loFooterBand](#loFooterBand) but allowing row and column settings
to be specified separately.
-}
loFooterBandRC : Num -> Num -> LayoutProperty
loFooterBandRC r c =
    LFooterBandRC r c


{-| Band positioning in the interval [0,1] indicating where in a cell a header
should be placed in a grid layout. For a column header, 0 maps to the left edge
of the header cell and 1 to right edge. For a row footer, the range maps from
top to bottom.
-}
loHeaderBand : Num -> LayoutProperty
loHeaderBand =
    LHeaderBand


{-| Similar to [loFHeaderBand](#loHeaderBand) but allowing row and column settings
to be specified separately.
-}
loHeaderBandRC : Num -> Num -> LayoutProperty
loHeaderBandRC r c =
    LHeaderBandRC r c


{-| Position legend to the left of the visualization it describes.
-}
loLeft : LegendOrientation
loLeft =
    Left


{-| Do not perform automatic legend positioning (allows legend to be located explicitly
via `x` `y` coordinates).
-}
loNone : LegendOrientation
loNone =
    None


{-| Orthogonal offset in pixels by which to displace grid header, footer
and title cells from their position along the edge of a grid layout.
-}
loOffset : Num -> LayoutProperty
loOffset =
    LOffset


{-| Similar to [loOffset](#loOffset) but allowing row and column settings to be
specified separately.
-}
loOffsetRC : Num -> Num -> LayoutProperty
loOffsetRC r c =
    LOffsetRC r c


{-| Padding in pixels to add between elements within rows and columns
of a grid layout.
-}
loPadding : Num -> LayoutProperty
loPadding =
    LPadding


{-| Similar to [loPadding](#loPadding) but allowing row and column settings to be
specified separately.
-}
loPaddingRC : Num -> Num -> LayoutProperty
loPaddingRC r c =
    LPaddingRC r c


{-| Position legend to the right of the visualization it describes.
-}
loRight : LegendOrientation
loRight =
    Right


{-| Title placement in a grid layout. For a column title, 0 maps to the left edge
of the title cell and 1 to right edge. The default value is 0.5, indicating a
centred position.
-}
loTitleBand : Num -> LayoutProperty
loTitleBand =
    LTitleBand


{-| Similar to [loTitleBand](#loTitleBand) but allowing row and column settings
to be specified separately.
-}
loTitleBandRC : Num -> Num -> LayoutProperty
loTitleBandRC r c =
    LTitleBandRC r c


{-| Position legend at the top of the visualization it describes.
-}
loTop : LegendOrientation
loTop =
    Top


{-| Position legend to the top-left of the visualization it describes.
-}
loTopLeft : LegendOrientation
loTopLeft =
    TopLeft


{-| Position legend to the top-right of the visualization it describes.
-}
loTopRight : LegendOrientation
loTopRight =
    TopRight


{-| Legend position referenced by the value in the named signal.
-}
loSignal : String -> LegendOrientation
loSignal =
    LegendOrientationSignal


{-| Make text lowercase when pre-processing as part of a count pattern transformation.
-}
lowercase : Case
lowercase =
    Lowercase


{-| Name for the output field of a link path in a linkPath transformation.
If not specified, the default is "path".
-}
lpAs : String -> LinkPathProperty
lpAs =
    LPAs


{-| Orientation of a link path in a linkPath transformation. If a radial
orientation is specified, x and y coordinate parameters will be interpreted as an
angle (in radians) and radius, respectively.
-}
lpOrient : Orientation -> LinkPathProperty
lpOrient =
    LPOrient


{-| A required signal that a linkpath transform depends upon. This is needed if
source or target coordinates are set as a non-propagating side-effect of a transform
in a different stream such as a force transform. In such cases the upstream transform
should be bound to a signal and required with this function.
-}
lpRequire : String -> LinkPathProperty
lpRequire =
    LPRequire


{-| Shape of a link path in a linkPath transformation.
-}
lpShape : LinkShape -> LinkPathProperty
lpShape =
    LPShape


{-| Field for the source x-coordinate in a linkPath transformation.
The default is `source.x`.
-}
lpSourceX : Field -> LinkPathProperty
lpSourceX =
    LPSourceX


{-| Field for the source y-coordinate in a linkPath transformation.
The default is `source.y`.
-}
lpSourceY : Field -> LinkPathProperty
lpSourceY =
    LPSourceY


{-| Field for the target x-coordinate in a linkPath transformation.
The default is `target.x`.
-}
lpTargetX : Field -> LinkPathProperty
lpTargetX =
    LPTargetX


{-| Field for the target y-coordinate in a linkPath transformation.
The default is `target.y`.
-}
lpTargetY : Field -> LinkPathProperty
lpTargetY =
    LPTargetY


{-| Arcs of circles linking nodes in a link diagram.
-}
lsArc : LinkShape
lsArc =
    LinkArc


{-| Curved lines linking nodes in a link diagram.
-}
lsCurve : LinkShape
lsCurve =
    LinkCurve


{-| Curved diagonal lines linking nodes in a link diagram.
-}
lsDiagonal : LinkShape
lsDiagonal =
    LinkDiagonal


{-| Straight lines linking nodes in a link diagram.
-}
lsLine : LinkShape
lsLine =
    LinkLine


{-| Orthogonal lines linking nodes in a link diagram.
-}
lsOrthogonal : LinkShape
lsOrthogonal =
    LinkOrthogonal


{-| Line shape between nodes referenced by the value in the named signal.
-}
lsSignal : String -> LinkShape
lsSignal =
    LinkShapeSignal


{-| legend with discrete items.
-}
ltSymbol : LegendType
ltSymbol =
    LSymbol


{-| Legend to represent continuous data.
-}
ltGradient : LegendType
ltGradient =
    LGradient


{-| Legend type (`symbol` or `gradient`) referenced by the value in the named signal.
-}
ltSignal : String -> LegendType
ltSignal =
    LegendTypeSignal


{-| Output fields in which to write data found in the secondary stream of a lookup.
-}
luAs : List String -> LookupProperty
luAs =
    LAs


{-| Default value to assign if lookup fails in a lookup transformation.
-}
luDefault : Value -> LookupProperty
luDefault =
    LDefault


{-| Fields to copy from the secondary stream to the primary
stream in a lookup transformation. If not specified, a reference to the full data
record is copied.
-}
luValues : List Field -> LookupProperty
luValues =
    LValues


{-| Horizontal alignment of a text or image mark. To guarantee valid
alignment type names, use `hCenter`, `hLeft` etc. For example:

    << mark text
        [ mEncode
            [ enEnter [ maAlign [ hCenter ] ] ]
        ]

-}
maAlign : List Value -> MarkProperty
maAlign =
    MAlign


{-| Rotation angle of the text in degrees in a text mark.
-}
maAngle : List Value -> MarkProperty
maAngle =
    MAngle


{-| Whether or not image aspect ratio should be preserved in an image mark.
-}
maAspect : List Value -> MarkProperty
maAspect =
    MAspect


{-| Vertical baseline of a text or image mark. To guarantee valid
alignment type names, use `vTop`, `vMiddle` etc. For example:

    << mark text
        [ mEncode
            [ enEnter [ maBaseline [ vTop ] ] ]
        ]

-}
maBaseline : List Value -> MarkProperty
maBaseline =
    MBaseline


{-| Corner radius in pixels of an arc or rect mark.
-}
maCornerRadius : List Value -> MarkProperty
maCornerRadius =
    MCornerRadius


{-| Cursor to be displayed over a mark. To guarantee valid cursor type
names, use [cursorValue](#cursorValue).
-}
maCursor : List Value -> MarkProperty
maCursor =
    MCursor


{-| Create a custom mark property. For example:

    mEncode
        [ enEnter
            [ maFill [ vScale "cScale", vField (field "group") ]
            , maCustom "myName" [ vScale "xScale", vField (field "group") ]
            ]
        ]

See the
[Vega Beeswarm plot example](https://vega.github.io/vega/examples/beeswarm-plot/).

-}
maCustom : String -> List Value -> MarkProperty
maCustom =
    MCustom


{-| Indicate if the current data point in a linear mark is defined. If false, the
corresponding line/trail segment will be omitted, creating a “break”.
-}
maDefined : List Value -> MarkProperty
maDefined =
    MDefined


{-| Direction text is rendered in a text mark. This determines which side is
truncated in response to the text size exceeding the value of the limit parameter.
To guarantee valid direction type names, use [textDirectionValue](#textDirectionValue).
-}
maDir : List Value -> MarkProperty
maDir =
    MDir


{-| Horizontal offset in pixels (before rotation), between the text and anchor
point of a text mark.
-}
maDx : List Value -> MarkProperty
maDx =
    MdX


{-| Vertical offset in pixels (before rotation), between the text and anchor
point of a text mark.
-}
maDy : List Value -> MarkProperty
maDy =
    MdY


{-| Ellipsis string for text truncated in response to the limit parameter of
a text mark.
-}
maEllipsis : List Value -> MarkProperty
maEllipsis =
    MEllipsis


{-| End angle in radians clockwise from north for an arc mark.
-}
maEndAngle : List Value -> MarkProperty
maEndAngle =
    MEndAngle


{-| Fill color of a mark.
-}
maFill : List Value -> MarkProperty
maFill =
    MFill


{-| The fill opacity of a mark in the range 0 to 1.
-}
maFillOpacity : List Value -> MarkProperty
maFillOpacity =
    MFillOpacity


{-| Typeface used by a text mark. This can be a generic font description such
as `sans-serif`, `monospace` or any specific font name made accessible via a css
font definition.
-}
maFont : List Value -> MarkProperty
maFont =
    MFont


{-| The font size in pixels used by a text mark.
-}
maFontSize : List Value -> MarkProperty
maFontSize =
    MFontSize


{-| The font style, such as `normal` or `italic` used by a text mark.
-}
maFontStyle : List Value -> MarkProperty
maFontStyle =
    MFontStyle


{-| The font weight, such as `normal` or `bold` used by a text mark.
-}
maFontWeight : List Value -> MarkProperty
maFontWeight =
    MFontWeight


{-| Indicate if the visible group content should be clipped to the group’s
specified width and height.
-}
maGroupClip : List Value -> MarkProperty
maGroupClip =
    MGroupClip


{-| Height of a mark in pixels.
-}
maHeight : List Value -> MarkProperty
maHeight =
    MHeight


{-| URL to load upon mouse click. If defined, the mark acts as a hyperlink.
-}
maHRef : List Value -> MarkProperty
maHRef =
    MHRef


{-| The inner radius in pixel units of an arc mark.
-}
maInnerRadius : List Value -> MarkProperty
maInnerRadius =
    MInnerRadius


{-| Interpolation style of a linear mark. To guarantee valid
interpolation type names, use [markInterpolationValue](#markInterpolationValue).
-}
maInterpolate : List Value -> MarkProperty
maInterpolate =
    MInterpolate


{-| The maximum length of a text mark in pixels (default 0, indicating no limit).
The text value will be automatically truncated if the rendered size exceeds this
limit.
-}
maLimit : List Value -> MarkProperty
maLimit =
    MLimit


{-| The opacity of a mark in the range 0 to 1.
-}
maOpacity : List Value -> MarkProperty
maOpacity =
    MOpacity


{-| The orientation of an area mark. With a vertical orientation, an area mark is
defined by the x, y, and (y2 or height) properties; with a horizontal orientation,
the y, x and (x2 or width) properties must be specified instead.
To guarantee valid orientation type names, use [orientationValue](#orientationValue).
-}
maOrient : List Value -> MarkProperty
maOrient =
    MOrient


{-| The outer radius in pixel units of an arc mark.
-}
maOuterRadius : List Value -> MarkProperty
maOuterRadius =
    MOuterRadius


{-| The padding angle in radians clockwise from north for an arc mark.
-}
maPadAngle : List Value -> MarkProperty
maPadAngle =
    MPadAngle


{-| The [SVG path string](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)
describing the geometry of a path mark.
-}
maPath : List Value -> MarkProperty
maPath =
    MPath


{-| Polar coordinate radial offset in pixels, relative to the origin determined
by the x and y properties of a text mark.
-}
maRadius : List Value -> MarkProperty
maRadius =
    MRadius


{-| A mark definition. Marks form the visible components of a visualization.
Each mark specification can include a list of mark properties (second parameter)
that customise the appearance of the mark and relate its appearance to data streams
or signals.
-}
mark : Mark -> List TopMarkProperty -> List Spec -> List Spec
mark m mps =
    (::) (JE.object (MType m :: mps |> List.concatMap topMarkProperty))


{-| A convenience function for generating a value representing a given mark
interpolation type. Used instead of specifying an interpolation type
as a literal string to avoid problems of mistyping the interpolation name.

    signals
        << signal "interp" [ siValue (markInterpolationValue miLinear) ]

-}
markInterpolationValue : MarkInterpolation -> Value
markInterpolationValue interp =
    case interp of
        Basis ->
            vStr "basis"

        Bundle ->
            vStr "bundle"

        Cardinal ->
            vStr "cardinal"

        CatmullRom ->
            vStr "catmull-rom"

        Linear ->
            vStr "linear"

        Monotone ->
            vStr "monotone"

        Natural ->
            vStr "natural"

        Stepwise ->
            vStr "step"

        StepAfter ->
            vStr "step-after"

        StepBefore ->
            vStr "step-before"


{-| Create the marks used in the visualization. Multiple mark specifications are
commonly combined using the functional composition operator (`<<`). For example,

      mk =
          marks
              << mark line
                  [ mFrom [ srData (str "myData") ]
                  , mEncode
                      [ enEnter
                          [ maX [ vScale "xScale", vField (field "distance") ]
                          , maY [ vScale "yScale", vField (field "energy") ]
                          , maStroke [ black ]
                          ]
                      ]
                  ]
              << mark symbol
                  [ mFrom [ srData (str "myData") ]
                  , mEncode
                      [ enEnter
                          [ maX [ vScale "xScale", vField (field "distance") ]
                          , maY [ vScale "yScale", vField (field "energy") ]
                          , maFill [ white ]
                          , maStroke [ black ]
                          ]
                      ]
                  ]

-}
marks : List Spec -> ( VProperty, Spec )
marks axs =
    ( VMarks, JE.list identity axs )


{-| A shape instance that provides a drawing method to invoke within the renderer.
Shape instances cannot be specified directly, instead they must be generated by
a data transform such as symbol generation or a geoshape:

    shapeEncoding =
        [ maShape [ symbolValue symSquare ]
        , maStroke [ black ]
        ]

    lg =
        legends
            << legend
                [ leFill "cScale"
                , leOrient loBottomRight
                , leEncode [ enSymbols [ enUpdate shapeEncoding ] ]
                ]

-}
maShape : List Value -> MarkProperty
maShape =
    MShape


{-| Area in pixels of the bounding box of point-based mark such as a symbol.
Note that this value sets the area of the mark; the side lengths will increase with
the square root of this value.
-}
maSize : List Value -> MarkProperty
maSize =
    MSize


{-| Start angle in radians clockwise from north for an arc mark.
-}
maStartAngle : List Value -> MarkProperty
maStartAngle =
    MStartAngle


{-| Stroke color of a mark.
-}
maStroke : List Value -> MarkProperty
maStroke =
    MStroke


{-| Stroke cap ending style for a mark.To guarantee valid stroke cap
names, use [strokeCapValue](#strokeCapValue).
-}
maStrokeCap : List Value -> MarkProperty
maStrokeCap =
    MStrokeCap


{-| Stroke dash style of a mark. The list should consist
of alternating dash-gap lengths in pixels.
-}
maStrokeDash : List Value -> MarkProperty
maStrokeDash =
    MStrokeDash


{-| A mark's offset of the first stroke dash in pixels.
-}
maStrokeDashOffset : List Value -> MarkProperty
maStrokeDashOffset =
    MStrokeDashOffset


{-| Stroke join method for a mark. To guarantee valid stroke join
names, use [strokeJoinValue](#strokeJoinValue).
-}
maStrokeJoin : List Value -> MarkProperty
maStrokeJoin =
    MStrokeJoin


{-| Miter limit at which to bevel a line join for a mark.
-}
maStrokeMiterLimit : List Value -> MarkProperty
maStrokeMiterLimit =
    MStrokeMiterLimit


{-| Stroke opacity of a mark in the range 0 to 1.
-}
maStrokeOpacity : List Value -> MarkProperty
maStrokeOpacity =
    MStrokeOpacity


{-| Stroke width of a mark in pixels.
-}
maStrokeWidth : List Value -> MarkProperty
maStrokeWidth =
    MStrokeWidth


{-| A symbol shape that describes a symbol mark. For preset shapes, use
[symbolValue](#symbolValue). For correct sizing of custom shape paths, define
coordinates within a square ranging from -1 to 1 along both the x and y dimensions.
-}
maSymbol : List Value -> MarkProperty
maSymbol =
    MSymbol


{-| The interpolation tension in the range 0 to 1 of a linear mark. Applies only
to cardinal and catmull-rom interpolators.
-}
maTension : List Value -> MarkProperty
maTension =
    MTension


{-| The text to display in a text mark.
-}
maText : List Value -> MarkProperty
maText =
    MText


{-| Polar coordinate angle in radians, relative to the origin determined by the
x and y properties of a text mark.
-}
maTheta : List Value -> MarkProperty
maTheta =
    MTheta


{-| The tooltip text to show upon mouse hover over a mark. This may be specified
directly, via a field, a signal or any other text-generating value.
-}
maTooltip : List Value -> MarkProperty
maTooltip =
    MTooltip


{-| The URL of an image file to be displayed as an image mark. This may be specified
directly, via a field, a signal or any other text-generating value.
-}
maUrl : List Value -> MarkProperty
maUrl =
    MUrl


{-| The width of a mark in pixels.
-}
maWidth : List Value -> MarkProperty
maWidth =
    MWidth


{-| The primary x-coordinate of a mark in pixels.
-}
maX : List Value -> MarkProperty
maX =
    MX


{-| The secondary x-coordinate of a mark in pixels.
-}
maX2 : List Value -> MarkProperty
maX2 =
    MX2


{-| The centre x-coordinate of a mark in pixels. This is an alternative to `maX`
or `maX2`, not an addition.
-}
maXC : List Value -> MarkProperty
maXC =
    MXC


{-| The primary y-coordinate of a mark in pixels.
-}
maY : List Value -> MarkProperty
maY =
    MY


{-| The secondary y-coordinate of a mark in pixels.
-}
maY2 : List Value -> MarkProperty
maY2 =
    MY2


{-| The centre y-coordinate of a mark in pixels. This is an alternative to `maY`
or `maY2`, not an addition.
-}
maYC : List Value -> MarkProperty
maYC =
    MYC


{-| An integer z-index indicating the layering order of sibling mark items. The
default value is 0. Higher values (1) will cause marks to be drawn on top of those
with lower z-index values. Setting the z-index as an encoding property only affects
ordering among sibling mark items; it will not change the layering relative to other
mark definitions.
-}
maZIndex : List Value -> MarkProperty
maZIndex =
    MZIndex


{-| Indicate whether or how marks should be clipped to a specified shape. For a
simple case of clipping to the retangular 'data rectangle':

    mClip (clEnabled true)

To clip by some abritrary simple polygon use [clPath](#clPath) either to specify
an SVG path string explicitly in pixel coordinates, or more usefully for geographic
coordinates use the output of [trGeoPath](#trGeoPath):

    ds =
        dataSource
            [ data "myClippingPoly"
                [ daUrl (str "myPolyFile.json")
                , daFormat [ topojsonFeature "idOfClippingPoly" ]
                ]
                |> transform [ trGeoPath "myProjection" [] ]
            ...

    mk =
        marks
              << mark path
                  [ mFrom [ srData (str "myMapSource") ]
                  , mClip (clPath (strSignal "data('myClippingPoly')[0]['path']"))
                  ...

-}
mClip : Clip -> TopMarkProperty
mClip =
    MClip


{-| Description of a mark, useful for inline comments.
-}
mDescription : String -> TopMarkProperty
mDescription =
    MDescription


{-| A clustering tree layout method to be used in a tree transform.
-}
meCluster : TreeMethod
meCluster =
    Cluster


{-| The visual encoding rules for a mark.
-}
mEncode : List EncodingProperty -> TopMarkProperty
mEncode =
    MEncode


{-| A Mercator map projection.
-}
mercator : Projection
mercator =
    Mercator


{-| Tree layout method (`tidy` or `cluster`) referenced by the value in the named signal.
-}
meSignal : String -> TreeMethod
meSignal =
    TreeMethodSignal


{-| A tidy tree layout method to be used in a tree transform.
-}
meTidy : TreeMethod
meTidy =
    Tidy


{-| Data source to be visualized by a mark. If not specified, a single
element dataset containing an empty object is assumed. The source can either be
a dataset to use or a faceting directive to subdivide a dataset across a set
of group marks.
-}
mFrom : List Source -> TopMarkProperty
mFrom =
    MFrom


{-| Assemble a group of top-level marks. Used to create nested groups
of marks within a `Group` mark (including further nested group specifications) by
suppyling the specification as a series of properties. For example,

    marks
        << mark group
            [ mFrom [ srData (str "myData") ]
            , mGroup [ mkGroup1 [], mkGroup2 [] ]
            ]

-}
mGroup : List ( VProperty, Spec ) -> TopMarkProperty
mGroup =
    MGroup


{-| Cubic basis spline interpolation between points.
-}
miBasis : MarkInterpolation
miBasis =
    Basis


{-| Bundle curve interpolation between points.
-}
miBundle : MarkInterpolation
miBundle =
    Bundle


{-| Cubic cardinal spline interpolation between points.
-}
miCardinal : MarkInterpolation
miCardinal =
    Cardinal


{-| Cubic Catmull-Rom spline interpolation between points.
-}
miCatmullRom : MarkInterpolation
miCatmullRom =
    CatmullRom


{-| Linear (straight) interpolation between points.
-}
miLinear : MarkInterpolation
miLinear =
    Linear


{-| A millisecond time unit.
-}
millisecond : TimeUnit
millisecond =
    Millisecond


{-| Whether a mark can serve as an input event source. If false, no
mouse or touch events corresponding to the mark will be generated.
-}
mInteractive : Boo -> TopMarkProperty
mInteractive =
    MInteractive


{-| Cubic spline interpolation that preserves monotonicity between points.
-}
miMonotone : MarkInterpolation
miMonotone =
    Monotone


{-| Natural cubic spline interpolation between points.
-}
miNatural : MarkInterpolation
miNatural =
    Natural


{-| A minute time unit.
-}
minute : TimeUnit
minute =
    Minute


{-| Piecewise (stepped) constant interpolation function centred on each point in
a sequence.
-}
miStepwise : MarkInterpolation
miStepwise =
    Stepwise


{-| Piecewise (stepped) constant interpolation function after each point in a sequence.
-}
miStepAfter : MarkInterpolation
miStepAfter =
    StepAfter


{-| Piecewise (stepped) constant interpolation function before each point in a sequence.
-}
miStepBefore : MarkInterpolation
miStepBefore =
    StepBefore


{-| Leave text unchanged when pre-processing as part of a count pattern transformation.
-}
mixedcase : Case
mixedcase =
    Mixedcase


{-| Field to use as a unique key for data binding. When a
visualization’s data is updated, the key value will be used to match data elements
to existing mark instances. Use a key field to enable object constancy for
transitions over dynamic data.
-}
mKey : Field -> TopMarkProperty
mKey =
    MKey


{-| Unique name to be given to a mark. This name can be used to refer to the mark
in another mark or within an event stream definition. SVG renderers will add this
name value as a CSS class name on the enclosing SVG group (g) element containing
the mark instances.
-}
mName : String -> TopMarkProperty
mName =
    MName


{-| Triggers for modifying a mark's properties in response to signal changes.
-}
mOn : List Trigger -> TopMarkProperty
mOn =
    MOn


{-| A month time unit.
-}
month : TimeUnit
month =
    Month


{-| Fields and sort order for sorting mark items. The sort order will
determine the default rendering order. This is defined over generated scenegraph
items and sorting is performed after encodings are computed, allowing items to be
sorted by size or position. To sort by underlying data properties in addition to
mark item properties, append the prefix `datum` to a field name.

    mSort [ ( field "datum.y", ascend ) ]

-}
mSort : List ( Field, Order ) -> TopMarkProperty
mSort =
    MSort


{-| Names of custom styles to apply to a mark. A style is a named
collection of mark property defaults defined within the configuration. These
properties will be applied to the mark’s enter encoding set, with later styles
overriding earlier styles. Any properties explicitly defined within the mark’s
`encode` block will override a style default.
-}
mStyle : List String -> TopMarkProperty
mStyle =
    MStyle


{-| Post-encoding transforms to be applied after any encode
blocks, that operate directly on mark scenegraph items (not backing data objects).
These can be useful for performing layout with transforms that can set x, y,
width, height, etc. properties. Only data transforms that do not generate or
filter data objects should be used.
-}
mTransform : List Transform -> TopMarkProperty
mTransform =
    MTransform


{-| z-index (draw order) of a mark. Marks with higher values are drawn
'on top' of marks with lower numbers. Useful when drawing node-link diagrams and
the node symbol should sit on top of connected edge lines.
-}
mZIndex : Num -> TopMarkProperty
mZIndex =
    MTopZIndex


{-| A natural earth map projection.
-}
naturalEarth1 : Projection
naturalEarth1 =
    NaturalEarth1


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


{-| 'nice' number-scaling type referenced by the value in the named signal.
-}
niSignal : String -> ScaleNice
niSignal =
    ScaleNiceSignal


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


{-| A numeric literal.
-}
num : Float -> Num
num =
    Num


{-| An expression that evaluates to a numeric value.
-}
numExpr : Expr -> Num
numExpr =
    NumExpr


{-| List of potentially mixed numeric types. Useful when a domain is
specified as being bounded by 0 and some signal:

    scDomain (doNums (numList [ num 0, numSignal "mySignal" ]))

-}
numList : List Num -> Num
numList =
    NumList


{-| An absence of a numeric value.
-}
numNull : Num
numNull =
    NumNull


{-| A list of numeric literals. For lists that contain a mixture of numeric
literals and signals use [numList](#numList) instead.
-}
nums : List Float -> Num
nums =
    Nums


{-| Numeric value referenced by the value in the named signal.
-}
numSignal : String -> Num
numSignal =
    NumSignal


{-| List of numeric values referenced by the values in the named signals.
-}
numSignals : List String -> Num
numSignals =
    NumSignals


{-| Add a list of triggers to the given data table.
-}
on : List Trigger -> DataTable -> DataTable
on triggerSpecs dTable =
    dTable ++ [ ( "on", JE.list identity triggerSpecs ) ]


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


{-| Aggregation operation referenced by the value in the named signal.
-}
opSignal : String -> Operation
opSignal =
    OperationSignal


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


{-| Sum of field values to be used in an aggregation operation.
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


{-| Sorting order referenced by the value in the named signal.
-}
orderSignal : String -> Order
orderSignal =
    OrderSignal


{-| Specify a horizontal orientation of a mark, legend or link path (e.g. horizontally or vertically
oriented bars).
-}
orHorizontal : Orientation
orHorizontal =
    Horizontal


{-| A convenience function for generating a value representing a given mark
orientation type. Used instead of specifying an orientation type as
a literal string to avoid problems of mistyping its name.

     maOrient [ orientationValue orHorizontal ]

-}
orientationValue : Orientation -> Value
orientationValue orient =
    case orient of
        Horizontal ->
            vStr "horizontal"

        Vertical ->
            vStr "vertical"

        Radial ->
            vStr "radial"

        OrientationSignal sig ->
            vSignal sig


{-| Specify a radial orientation of a mark or link path. Note that not all marks
can use a radial orientation.
-}
orRadial : Orientation
orRadial =
    Radial


{-| Orientation referenced by the value in the named signal.
-}
orSignal : String -> Orientation
orSignal =
    OrientationSignal


{-| Specify a vertical orientation of a mark, legend or link path (e.g. horizontally or vertically
oriented bars).
-}
orVertical : Orientation
orVertical =
    Vertical


{-| Greedy overlap strategy to be applied when there is not space to show all items on an axis.
-}
osGreedy : OverlapStrategy
osGreedy =
    OGreedy


{-| No overlap strategy to be applied when there is not space to show all items on an axis.
-}
osNone : OverlapStrategy
osNone =
    ONone


{-| Give all items equal weight in overlap strategy to be applied when there is
not space to show them all on an axis.
-}
osParity : OverlapStrategy
osParity =
    OParity


{-| Overlap strategy referenced by the value in the named signal.
-}
osSignal : String -> OverlapStrategy
osSignal =
    OverlapStrategySignal


{-| An orthographic map projection.
-}
orthographic : Projection
orthographic =
    Orthographic


{-| The names to give the output fields of a packing transform. The default is
["x", "y", "r", "depth", "children"], where x and y are the layout coordinates,
r is the node radius, depth is the tree depth, and children is the count of a
node’s children in the tree.
-}
paAs : String -> String -> String -> String -> String -> PackProperty
paAs x y r depth children =
    PaAs x y r depth children


{-| Padding around the visualization in pixel units. The way padding is
interpreted will depend on the `autosize` properties.
-}
padding : Float -> ( VProperty, Spec )
padding p =
    ( VPadding, JE.float p )


{-| Padding around the visualization in pixel units in _left_, _top_,
_right_, _bottom_ order.
-}
paddings : Float -> Float -> Float -> Float -> ( VProperty, Spec )
paddings l t r b =
    ( VPadding
    , JE.object
        [ ( "left", JE.float l )
        , ( "top", JE.float t )
        , ( "right", JE.float r )
        , ( "bottom", JE.float b )
        ]
    )


{-| The data field corresponding to a numeric value for the node in a packing
transform. The sum of values for a node and all its descendants is available on
the node object as the value property. If radius is null, this field determines
the node size.
-}
paField : Field -> PackProperty
paField =
    PaField


{-| A path mark.
-}
path : Mark
path =
    Path


{-| The approximate padding to include between packed circles.
-}
paPadding : Num -> PackProperty
paPadding =
    PaPadding


{-| Node radius to use in a packing transform. If `Nothing` (the
default), the radius of each leaf circle is derived from the field value.
-}
paRadius : Maybe Field -> PackProperty
paRadius =
    PaRadius


{-| Data parsing rules as a list of tuples where each corresponds to a
field name paired with its desired data type. This is only necessary if there is
some ambiguity that could prevent correct type inference, such as time text:

    dataSource
        [ data "timeData"
            [ daUrl (str "data/timeSeries.json")
            , daFormat [ parse [ ( "timestamp", foDate "%d/%m/%y %H:%M" ) ] ]
            ]
        ]

-}
parse : List ( String, DataType ) -> FormatProperty
parse =
    Parse


{-| Indicate automatic type inference on data types should be applied when parsing
a data source.
-}
parseAuto : FormatProperty
parseAuto =
    ParseAuto


{-| The size of a packing layout, provided as a two-element list in [width, height]
order (or a signal that generates such a list).
-}
paSize : Num -> PackProperty
paSize n =
    PaSize n


{-| Packing transform sorting properties. The inputs to subject to sorting are
tree node objects, not input data objects.
-}
paSort : List ( Field, Order ) -> PackProperty
paSort =
    PaSort


{-| Output fields for the computed start and end angles for each arc in a pie
transform.
-}
piAs : String -> String -> PieProperty
piAs start end =
    PiAs start end


{-| End angle in radians in a pie chart transform. The default is 2 PI
indicating the final slice ends 'north'.
-}
piEndAngle : Num -> PieProperty
piEndAngle =
    PiEndAngle


{-| The field to encode with angular spans in a pie chart transform.
-}
piField : Field -> PieProperty
piField =
    PiField


{-| Fields to group by when performing a pivot transform. If not specified,
a single group containing all data objects will be used.
-}
piGroupBy : List Field -> PivotProperty
piGroupBy =
    PiGroupBy


{-| Maximum number of fields to generate when performing a pivot transform
or 0 for no limit.
-}
piLimit : Num -> PivotProperty
piLimit =
    PiLimit


{-| Aggregation operation to use by when performing a pivot transform.
If not specified, fields will be aggregated by their sum.
-}
piOp : Operation -> PivotProperty
piOp =
    PiOp


{-| Indicate whether or not pie slices should be stored in angular size order.
-}
piSort : Boo -> PieProperty
piSort =
    PiSort


{-| The starting angle in radians in a pie chart transform. The default is 0
indicating that the first slice starts 'north'.
-}
piStartAngle : Num -> PieProperty
piStartAngle =
    PiStartAngle


{-| Map projection’s centre as a two-element list of longitude and latitude
in degrees.
-}
prCenter : Num -> ProjectionProperty
prCenter =
    PrCenter


{-| Map projection’s clipping circle radius to the specified angle in degrees.
A value of zero indicates antimeridian cutting should be applied rather than
small-circle clipping.
-}
prClipAngle : Num -> ProjectionProperty
prClipAngle =
    PrClipAngle


{-| Map projection’s viewport clip extent to the specified bounds in pixels.
The extent bounds should be specified as a list of four numbers in [x0, y0, x1, y1]
order where x0 is the left-side of the viewport, y0 is the top, x1 is the right
and y1 is the bottom.
-}
prClipExtent : Num -> ProjectionProperty
prClipExtent =
    PrClipExtent


{-| 'Hammer' map projection's coefficient (defaults to 2).
-}
prCoefficient : Num -> ProjectionProperty
prCoefficient =
    PrCoefficient


{-| 'Satellite' map projection's distance value. Values are expressed as a
proportion of the Earth's radius (defaults to 2).
-}
prDistance : Num -> ProjectionProperty
prDistance =
    PrDistance


{-| Display region into which the projection should be automatically fit.
Used in conjunction with [prFit](#prFit). The region bounds should be specified
in [x0, y0, x1, y1] order where x0 is the left-side, y0 is the top, x1 is the
right and y1 is the bottom.
-}
prExtent : Num -> ProjectionProperty
prExtent =
    PrExtent


{-| GeoJSON data to which a projection should attempt to automatically fit by setting
its translate and scale values.

    ds =
        dataSource [ data "mapData" [ daUrl (str "myGeoJson.json") ] ]

    pr =
        projections
            << projection "myProjection"
                [ prType orthographic
                , prSize (numSignal "[width,height]")
                , prFit (feName "mapData")
                ]

-}
prFit : Feature -> ProjectionProperty
prFit =
    PrFit


{-| 'Bottomley' map projection's fraction parameter (defaults to 0.5).
-}
prFraction : Num -> ProjectionProperty
prFraction =
    PrFraction


{-| Number of lobes in radial map projections such as the Berghaus Star.
-}
prLobes : Num -> ProjectionProperty
prLobes =
    PrLobes


{-| Map projection for transforming geo data onto a plane.
-}
projection : String -> List ProjectionProperty -> List Spec -> List Spec
projection name pps =
    (::) (JE.object (( "name", JE.string name ) :: List.map projectionProperty pps))


{-| Convenience function for generating a value representing a given projection
type. Useful when generating signals representing projection types.
-}
projectionValue : Projection -> Value
projectionValue proj =
    vStr (projectionLabel proj)


{-| Create the projections used to map geographic data onto a plane.

    pr =
        projections
            << projection "myProj" [ prType orthographic ]
            << projection "myProj2" [ prType albers, prRotate (nums [ -20, 15 ]) ]

-}
projections : List Spec -> ( VProperty, Spec )
projections prs =
    ( VProjections, JE.list identity prs )


{-| Map projection referenced by the value in the named signal.
-}
prSignal : String -> Projection
prSignal =
    ProjectionSignal


{-| Type of map projection to use in a projection transformation.
-}
prType : Projection -> ProjectionProperty
prType =
    PrType


{-| Parallel used for map projections such as the Armadillo (defaults
to 20 degrees N).
-}
prParallel : Num -> ProjectionProperty
prParallel =
    PrParallel


{-| Default radius (in pixels) to use when drawing projected GeoJSON
Point and MultiPoint geometries. The default value is 4.5.
-}
prPointRadius : Num -> ProjectionProperty
prPointRadius =
    PrPointRadius


{-| Threshold for the projection’s adaptive resampling in pixels. This
corresponds to the Douglas–Peucker distance. If precision is not specified, the
projection’s current resampling precision which defaults to √0.5 ≅ 0.70710 is used.
-}
prPrecision : Num -> ProjectionProperty
prPrecision =
    PrPrecision


{-| Radius for the 'Gingery' map projection. Defaults to 30 degrees.
-}
prRadius : Num -> ProjectionProperty
prRadius =
    PrRadius


{-| 'Hill' map projection's ratio allowing it to vary continuously between
Maurer 73 (0) and Eckert IV projections (infinity). Defaults to 1.
-}
prRatio : Num -> ProjectionProperty
prRatio =
    PrRatio


{-| Map projection’s three-axis rotation angle. This should be a two- or
three-element list of numbers [lambda, phi, gamma] specifying the rotation angles
in degrees about each spherical axis.
-}
prRotate : Num -> ProjectionProperty
prRotate =
    PrRotate


{-| Map projection’s scale factor. The default scale is projection-specific. It
corresponds linearly to the distance between projected points; however, scale
factor values are not equivalent across projections.
-}
prScale : Num -> ProjectionProperty
prScale =
    PrScale


{-| Width and height of the display region into which the projection should be
automatically fit. Used in conjunction with [prFit](#prFit) this is equivalent
to calling [prExtent](#prExtent) with the top-left position set to (0,0). The region
size should be specified in [width, height] order (or a signal that generates such
a list).
-}
prSize : Num -> ProjectionProperty
prSize =
    PrSize


{-| Spacing for a Lagrange conformal map projection (defaults to 0.5).
-}
prSpacing : Num -> ProjectionProperty
prSpacing =
    PrSpacing


{-| Tilt angle for a Satellite map projection (defaults to 0 degrees).
-}
prTilt : Num -> ProjectionProperty
prTilt =
    PrTilt


{-| Translation offset to the specified two-element list [tx, ty]. If
not specified as a two-element list, returns the current translation offset which
defaults to [480, 250]. The translation offset determines the pixel coordinates
of the projection’s centre. The default translation offset places (0°,0°) at the
centre of a 960×500 area.
-}
prTranslate : Num -> ProjectionProperty
prTranslate =
    PrTranslate


{-| Output field names for the output of a partition layout transform.
The parameters correspond to the (default name) fields `x0`, `y0`, `x1`, `y1`,
`depth` and `children`.
-}
ptAs : String -> String -> String -> String -> String -> String -> PartitionProperty
ptAs =
    PtAs


{-| Data field corresponding to a numeric value for a partition node.
The sum of values for a node and all its descendants is available on the node object
as the `value` property. This field determines the size of a node.
-}
ptField : Field -> PartitionProperty
ptField =
    PtField


{-| Padding between adjacent nodes for a partition layout transform.
-}
ptPadding : Num -> PartitionProperty
ptPadding =
    PtPadding


{-| Whether or not node layout values should be rounded in a partition transform.
The default is false.
-}
ptRound : Boo -> PartitionProperty
ptRound =
    PtRound


{-| Size of a partition layout as two-element list corresponding to
[width, height] (or a signal that generates such a list).
-}
ptSize : Num -> PartitionProperty
ptSize =
    PtSize


{-| Sorting properties of sibling nodes during a partition layout transform.
-}
ptSort : List ( Field, Order ) -> PartitionProperty
ptSort =
    PtSort


{-| Use default category range of scale output values.
-}
raCategory : ScaleRange
raCategory =
    RaCategory


{-| Custom range default scheme. Used when a new named default has been
created as part of a config setting is required.
-}
raCustomDefault : String -> ScaleRange
raCustomDefault =
    RaCustom


{-| Scale range as a data reference object. This is used for specifying
ordinal scale ranges as a series of distinct field values.

    scale "myScale"
        [ scType scOrdinal
        , scDomain (doData [ daDataset "clusters", daField (field "id") ])
        , scRange (raData [ daDataset "clusters", daField (field "name") ])
        ]

-}
raData : List DataReference -> ScaleRange
raData =
    RaData


{-| Use default diverging range of scale output values.
-}
raDiverging : ScaleRange
raDiverging =
    RaDiverging


{-| Use default heatmap range of scale output values.
-}
raHeatmap : ScaleRange
raHeatmap =
    RaHeatmap


{-| Use default height range of scale output values.
-}
raHeight : ScaleRange
raHeight =
    RaHeight


{-| Scale range as a list of numbers.
-}
raNums : List Float -> ScaleRange
raNums =
    RaNums


{-| Use default ordinal range of scale output values.
-}
raOrdinal : ScaleRange
raOrdinal =
    RaOrdinal


{-| Use default (continuous) ramp range of scale output values.
-}
raRamp : ScaleRange
raRamp =
    RaRamp


{-| Scale range as a list of color schemes. The first parameter is
the name of the colour scheme to use, the second any customising properties.
-}
raScheme : Str -> List ColorSchemeProperty -> ScaleRange
raScheme =
    RaScheme


{-| Default range scaling referenced by the value in the named signal.
-}
raSignal : String -> ScaleRange
raSignal =
    RaSignal


{-| Step size for a band scale range.
-}
raStep : Value -> ScaleRange
raStep =
    RaStep


{-| Scale range as a list of strings.
-}
raStrs : List String -> ScaleRange
raStrs =
    RaStrs


{-| Use default (discrete) symbol range of scale output values.
-}
raSymbol : ScaleRange
raSymbol =
    RaSymbol


{-| Scale range as a list of values.
-}
raValues : List Value -> ScaleRange
raValues =
    RaValues


{-| Use default width range of scale output values.
-}
raWidth : ScaleRange
raWidth =
    RaWidth


{-| A rectangle mark.
-}
rect : Mark
rect =
    Rect


{-| RGB color interpolation. The parameter is a gamma value to control the
brightness of the color trajectory.
-}
rgb : Float -> CInterpolate
rgb =
    Rgb


{-| A rule (single line) mark.
-}
rule : Mark
rule =
    Rule


{-| Scale to be used to map data values to visual properties.
-}
scale : String -> List ScaleProperty -> List Spec -> List Spec
scale name sps =
    (::) (JE.object (( "name", JE.string name ) :: List.map scaleProperty sps))


{-| Create the scales used to map data values to visual properties.

    sc =
        scales
            << scale "xScale"
                [ scType scLinear
                , scDomain (doData [ daDataset "myData", daField (field "x") ])
                , scRange raWidth
                ]
            << scale "yScale"
                [ scType scLinear
                , scDomain (doData [ daDataset "myData", daField (field "y") ])
                , scRange raHeight
                ]

-}
scales : List Spec -> ( VProperty, Spec )
scales scs =
    ( VScales, JE.list identity scs )


{-| Alignment of elements within each step of a band scale, as a
fraction of the step size. Should be in the range [0,1].
-}
scAlign : Num -> ScaleProperty
scAlign =
    SAlign


{-| A band scale.
-}
scBand : Scale
scBand =
    ScBand


{-| Base of the logorithm used in a logarithmic scale.
-}
scBase : Num -> ScaleProperty
scBase =
    SBase


{-| An ordinal band scale.
-}
scBinOrdinal : Scale
scBinOrdinal =
    ScBinOrdinal


{-| Specify the bins to be used when scaling into categories. For example the
following would specify a linear bin scaling between 100 and 160 in steps of 10.

     scBins (bsBins (num 10) [ bsStart (num 100), bsStop (num 160) ])

-}
scBins : ScaleBins -> ScaleProperty
scBins =
    SBins


{-| Whether output values should be clamped when using a quantitative
scale range (default false). If clamping is disabled and the scale is passed a
value outside the domain, the scale may return a value outside the range through
extrapolation. If clamping is enabled, the output value of the scale is always
within the scale’s range.
-}
scClamp : Boo -> ScaleProperty
scClamp =
    SClamp


{-| The desired desired slope of the [scSymLog](#scSymLog) function at zero. If
unspecified, the default is 1.
-}
scConstant : Num -> ScaleProperty
scConstant =
    SConstant


{-| Custom named scale.
-}
scCustom : String -> Scale
scCustom =
    ScCustom


{-| Domain of input data values for a scale.
-}
scDomain : ScaleDomain -> ScaleProperty
scDomain =
    SDomain


{-| Whether or not ordinal domains should be implicitly extended with new
values. If false, a scale will return `undefined` for values not included in the
domain; if true, new values will be appended to the domain and an updated range
value will be returned.
-}
scDomainImplicit : Boo -> ScaleProperty
scDomainImplicit =
    SDomainImplicit


{-| Maximum value of a scale domain, overriding a `scDomain` setting. Only intended
for scales with continuous domains.
-}
scDomainMax : Num -> ScaleProperty
scDomainMax =
    SDomainMax


{-| Minimum value of a scale domain, overriding a `scDomain` setting.
This is only used with scales having continuous domains.
-}
scDomainMin : Num -> ScaleProperty
scDomainMin =
    SDomainMin


{-| Insert a single mid-point value into a two-element scale domain. The mid-point
value must lie between the domain minimum and maximum values. Useful for setting
a midpoint for diverging color scales. Only used with scales having continuous,
piecewise domains.
-}
scDomainMid : Num -> ScaleProperty
scDomainMid =
    SDomainMid


{-| List value that directly overrides the domain of a scale. Useful for
supporting interactions such as panning or zooming a scale. The scale may be
initially determined using a data-driven domain, then modified in response to user
input.

    scales
        << scale "xDetail"
            [ scType scTime
            , scRange raWidth
            , scDomain (doData [ daDataset "sp500", daField (field "date") ])
            , scDomainRaw (vSignal "detailDomain")
            ]

-}
scDomainRaw : Value -> ScaleProperty
scDomainRaw =
    SDomainRaw


{-| Exponent to be used in power scale.
-}
scExponent : Num -> ScaleProperty
scExponent =
    SExponent


{-| Interpolation method for a quantitative scale.
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


{-| Extend the range of a scale domain so it starts and ends on 'nice' round
values.
-}
scNice : ScaleNice -> ScaleProperty
scNice =
    SNice


{-| An ordinal scale.
-}
scOrdinal : Scale
scOrdinal =
    ScOrdinal


{-| Expand a scale domain to accommodate the specified number of pixels on each
end of a quantitative scale range or the padding between bands in a band scale.
-}
scPadding : Num -> ScaleProperty
scPadding =
    SPadding


{-| Expand a scale domain to accommodate the specified number of pixels
between inner bands in a band scale.
-}
scPaddingInner : Num -> ScaleProperty
scPaddingInner =
    SPaddingInner


{-| Expand a scale domain to accommodate the specified number of pixels
outside the outer bands in a band scale.
-}
scPaddingOuter : Num -> ScaleProperty
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


{-| Range of a scale representing the set of visual values.
-}
scRange : ScaleRange -> ScaleProperty
scRange =
    SRange


{-| Step size for band and point scales.
-}
scRangeStep : Num -> ScaleProperty
scRangeStep =
    SRangeStep


{-| Reverse the order of a scale range.
-}
scReverse : Boo -> ScaleProperty
scReverse =
    SReverse


{-| Whether to round numeric output values to integers. Helpful for
snapping to the pixel grid.
-}
scRound : Boo -> ScaleProperty
scRound =
    SRound


{-| A sequential scale.
-}
scSequential : Scale
scSequential =
    ScSequential


{-| Scaling referenced by the value in the named signal.
-}
scSignal : String -> Scale
scSignal =
    ScaleSignal


{-| A square root scale.
-}
scSqrt : Scale
scSqrt =
    ScSqrt


{-| A [symmetrical log](https://www.researchgate.net/profile/John_Webber4/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data/links/0fcfd50d791c85082e000000.pdf)
scale. Similar to a log scale but supports zero and negative values. The slope of
the function at zero can be set with [scConstant](#scConstant).
-}
scSymLog : Scale
scSymLog =
    ScSymLog


{-| Type of a named scale.
-}
scType : Scale -> ScaleProperty
scType =
    SType


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


{-| A UTC temporal scale.
-}
scUtc : Scale
scUtc =
    ScUtc


{-| Whether or not a scale domain should include zero. The default is
true for linear, sqrt and power scales and false for all others.
-}
scZero : Boo -> ScaleProperty
scZero =
    SZero


{-| A second time unit.
-}
second : TimeUnit
second =
    Second


{-| A shape mark.
-}
shape : Mark
shape =
    Shape


{-| Bind a signal to an external input element such as a slider, selection list
or radio button group.
-}
siBind : Bind -> SignalProperty
siBind =
    SiBind


{-| Bottom side, used to specify an axis position.
-}
siBottom : Side
siBottom =
    SBottom


{-| Text description of a signal, useful for inline documentation.
-}
siDescription : String -> SignalProperty
siDescription =
    SiDescription


{-| Create the signals used to add dynamism to the visualization.

    si =
        signals
            << signal "chartSize" [ siValue (vNum 120) ]
            << signal "chartPad" [ siValue (vNum 15) ]
            << signal "chartStep" [ siUpdate "chartSize + chartPad" ]
            << signal "width" [ siUpdate "chartStep * 4" ]

-}
signals : List Spec -> ( VProperty, Spec )
signals sigs =
    ( VSignals, JE.list identity sigs )


{-| Signal to be used to add a dynamic component to a visualization.
-}
signal : String -> List SignalProperty -> List Spec -> List Spec
signal sigName sps =
    (::) (JE.object (SiName sigName :: sps |> List.map signalProperty))


{-| Initialise a signal with an expression, which may include other signals.
This will occur only once, and cannot be used in parallel with `siUpdate`.
-}
siInit : String -> SignalProperty
siInit =
    SiInit


{-| Left side, used to specify an axis position.
-}
siLeft : Side
siLeft =
    SLeft


{-| A unique name to be given to a signal. Signal names should be contain only
alphanumeric characters (or “$”, or “\_”) and may not start with a digit. Reserved
keywords that may not be used as signal names are "datum", "event", "item", and
"parent".
-}
siName : String -> SignalProperty
siName =
    SiName


{-| Event stream handlers for updating a signal value in response to input events.
-}
siOn : List (List EventHandler) -> SignalProperty
siOn =
    SiOn


{-| Make signal updates target a signal in an enclosing scope. Used when creating
nested signals in a group mark.
-}
siPushOuter : SignalProperty
siPushOuter =
    SiPushOuter


{-| Whether a signal update expression should be automatically re-evaluated
when any upstream signal dependencies update. If false, the update expression will
only be run upon initialization.
-}
siReact : Boo -> SignalProperty
siReact =
    SiReact


{-| Right side, used to specify an axis position.
-}
siRight : Side
siRight =
    SRight


{-| Rectangular side referenced by the value in the named signal.
-}
siSignal : String -> Side
siSignal =
    SideSignal


{-| Top side, used to specify an axis position.
-}
siTop : Side
siTop =
    STop


{-| Update expression for a signal which may include other signals, in which case
the signal will automatically update in response to upstream signal changes, so
long as its react property is not false. Cannot be used in parallel with `siInit`.
-}
siUpdate : String -> SignalProperty
siUpdate =
    SiUpdate


{-| Initial value of a signal. This value is assigned prior to the evaluation of
any expressions specified via `siInit` or `siUpdate`.
-}
siValue : Value -> SignalProperty
siValue =
    SiValue


{-| Indicate sorting is to be applied from low to high.
-}
soAscending : SortProperty
soAscending =
    Ascending


{-| Field to be used when sorting.
-}
soByField : Str -> SortProperty
soByField =
    ByField


{-| Indicate sorting is to be applied from high to low.
-}
soDescending : SortProperty
soDescending =
    Descending


{-| Sorting operation.
-}
soOp : Operation -> SortProperty
soOp =
    Op


{-| Sorting type referenced by the value in the named signal.
-}
soSignal : String -> SortProperty
soSignal =
    SortPropertySignal


{-| Archimedean spiralling for sequential positioning of words in a wordcloud.
-}
spArchimedean : Spiral
spArchimedean =
    Archimedean


{-| Rectangular spiralling for sequential positioning of words in a wordcloud.
-}
spRectangular : Spiral
spRectangular =
    Rectangular


{-| Word cloud spiral type (`archimedean` or `rectangular`) referenced by the
value in the named signal.
-}
spSignal : String -> Spiral
spSignal =
    SpiralSignal


{-| Name of the source for a set of marks.
-}
srData : Str -> Source
srData =
    SData


{-| Create a facet directive for a set of marks. The first parameter is the name
of the source dataset from which the facet partitions are to be generated. The
second is the name to be given to the generated facet source. Marks defined with
the faceted `group` mark can reference this data source name to visualize the
local data partition.

    mark group
        [ mFrom [ srFacet (str "table") "facet" [ faGroupBy [ field "category" ] ] ]
        , mEncode [ enEnter [ maY [ vScale "yScale", vField (field "category") ] ] ]
        , mGroup [ nestedMk [] ]
        ]

    nestedMk =
        marks
            << mark rect
                [ mName "bars"
                , mFrom [ srData (str "facet") ]
                , mEncode
                    [ enEnter
                        [ maY [ vScale "pos", vField (field "position") ]
                        , maHeight [ vScale "pos", vBand (num 1) ]
                        , maX [ vScale "xScale", vField (field "value") ]
                        , maX2 [ vScale "xScale", vBand (num 0) ]
                        , maFill [ vScale "cScale", vField (field "position") ]
                        ]
                    ]
                ]

-}
srFacet : Str -> String -> List Facet -> Source
srFacet d name =
    SFacet d name


{-| Names of the output fields for the computed start and end stack
values of a stack transform.
-}
stAs : String -> String -> StackProperty
stAs y0 y1 =
    StAs y0 y1


{-| Offset a stacked layout using a central stack baseline.
-}
stCenter : StackOffset
stCenter =
    OfCenter


{-| A stereographic map projection.
-}
stereographic : Projection
stereographic =
    Stereographic


{-| Field that determines the stack heights in a stack transform.
-}
stField : Field -> StackProperty
stField =
    StField


{-| Grouping of fields with which to partition data into separate stacks
in a stack transform.
-}
stGroupBy : List Field -> StackProperty
stGroupBy =
    StGroupBy


{-| Baseline offset used in a stack transform.
-}
stOffset : StackOffset -> StackProperty
stOffset =
    StOffset


{-| Rescale a stacked layout to use a common height while preserving relative size
of stacked quantities.
-}
stNormalize : StackOffset
stNormalize =
    OfNormalize


{-| A string literal.
-}
str : String -> Str
str =
    Str


{-| Expression that when evaluated, is a string.
-}
strExpr : Expr -> Str
strExpr =
    StrExpr


{-| List of potentially mixed string types (e.g. literals and signals).
-}
strList : List Str -> Str
strList =
    StrList


{-| An absence of a string value.
-}
strNull : Str
strNull =
    StrNull


{-| A list of string literals.
-}
strs : List String -> Str
strs =
    Strs


{-| String value referenced by the value in the named signal.
-}
strSignal : String -> Str
strSignal =
    StrSignal


{-| String values referenced by the values in the named signals.
-}
strSignals : List String -> Str
strSignals =
    StrSignals


{-| Convenience function for generating a value representing a given stroke cap type.
-}
strokeCapValue : StrokeCap -> Value
strokeCapValue cap =
    case cap of
        CButt ->
            vStr "butt"

        CRound ->
            vStr "round"

        CSquare ->
            vStr "square"

        StrokeCapSignal sig ->
            vSignal sig


{-| Convenience function for generating a text string representing a given
stroke join type. Used instead of specifying an stroke join type
as a literal string to avoid problems of mistyping its name.
-}
strokeJoinValue : StrokeJoin -> Value
strokeJoinValue jn =
    case jn of
        JMiter ->
            vStr "miter"

        JRound ->
            vStr "round"

        JBevel ->
            vStr "bevel"

        StrokeJoinSignal sig ->
            vSignal sig


{-| Stacking offset referenced by the value in the named signal.
-}
stSignal : String -> StackOffset
stSignal =
    StackOffsetSignal


{-| Criteria for sorting values in a stack transform.
-}
stSort : List ( Field, Order ) -> StackProperty
stSort =
    StSort


{-| Offset a stacked layout using a baseline at the foot of a stack.
-}
stZero : StackOffset
stZero =
    OfZero


{-| A symbol mark.
-}
symbol : Mark
symbol =
    Symbol


{-| Convenience function for generating a value representing a given symbol type.
-}
symbolValue : Symbol -> Value
symbolValue sym =
    vStr (symbolLabel sym)


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


{-| Specify an upward triangular symbol for a shape mark.
-}
symTriangleUp : Symbol
symTriangleUp =
    SymTriangleUp


{-| Specify a downward triangular symbol for a shape mark.
-}
symTriangleDown : Symbol
symTriangleDown =
    SymTriangleDown


{-| Specify a left-pointing triangular symbol for a shape mark.
-}
symTriangleLeft : Symbol
symTriangleLeft =
    SymTriangleLeft


{-| Specify a right-pointing triangular symbol for a shape mark.
-}
symTriangleRight : Symbol
symTriangleRight =
    SymTriangleRight


{-| Symbol type referenced by the value in the named signal.
-}
symSignal : String -> Symbol
symSignal =
    SymbolSignal


{-| Left-to-right text render direction determining which end of a text string is
truncated if it cannot be displayed within a restricted space.
-}
tdLeftToRight : TextDirection
tdLeftToRight =
    LeftToRight


{-| Right-to-left text render direction determining which end of a text string is
truncated if it cannot be displayed within a restricted space.
-}
tdRightToLeft : TextDirection
tdRightToLeft =
    RightToLeft


{-| Text direction (`ltr` or `rtl`) referenced by the value in the named signal.
-}
tdSignal : String -> TextDirection
tdSignal =
    TextDirectionSignal


{-| Output field names within which to write the results of a tree
layout transform. The parameters represent the names to replace the defaults in
the following order: `x`, `y`, `depth` and `children`.
-}
teAs : String -> String -> String -> String -> TreeProperty
teAs =
    TeAs


{-| Data corresponding to a numeric value to be associated with nodes
in a tree transform.
-}
teField : Field -> TreeProperty
teField =
    TeField


{-| Layout method used in a tree transform.
-}
teMethod : TreeMethod -> TreeProperty
teMethod =
    TeMethod


{-| Size of each node in a tree layout as a two-element [width,height]
list (or a signal that generates such a list).
-}
teNodeSize : Num -> TreeProperty
teNodeSize =
    TeNodeSize


{-| Whether or not 'cousin' nodes should be placed further apart than 'sibling'
nodes. If false, nodes will be uniformly separated as in a standard dendrogram.
-}
teSeparation : Boo -> TreeProperty
teSeparation =
    TeSeparation


{-| Size of of a tree layout as a two-element [width,height] list
(or a signal that generates such a list).
-}
teSize : Num -> TreeProperty
teSize =
    TeSize


{-| Sorting properties of sibling nodes in a tree layout transform.
-}
teSort : List ( Field, Order ) -> TreeProperty
teSort =
    TeSort


{-| A text mark.
-}
text : Mark
text =
    Text


{-| Create a text direction value.
-}
textDirectionValue : TextDirection -> Value
textDirectionValue dir =
    case dir of
        LeftToRight ->
            vStr "ltr"

        RightToLeft ->
            vStr "rtl"

        TextDirectionSignal sig ->
            vSignal sig


{-| Title anchor position calculation assuming text anchor is relative to the full
bounding box.
-}
tfBounds : TitleFrame
tfBounds =
    FrBounds


{-| Title anchor position calculation assuming text anchor is relative to the group
width / height.
-}
tfGroup : TitleFrame
tfGroup =
    FrGroup


{-| Title anchor calcuation type (`bounds` or `group`) referenced by the value in
the named signal.
-}
tfSignal : String -> TitleFrame
tfSignal =
    TitleFrameSignal


{-| Expression that evaluates to data objects to insert as triggers. Insert
operations are only applicable to datasets, not marks.
-}
tgInsert : String -> TriggerProperty
tgInsert =
    TgInsert


{-| Data or mark modification trigger. The first parameter is an
expression that evaluates to data objects to modify and the second an expression
that evaluates to an object of name-value pairs, indicating the field values that
should be updated.

    mark symbol
        [ mFrom [ srData (str "countries") ]
        , mOn
            [ trigger "myDragSignal"
                [ tgModifyValues "dragged" "{fx: x(), fy: y()}" ]
            ]

would set the `fx` and `fy` properties on mark items referenced by `myDragSignal`
to the current mouse pointer position.

-}
tgModifyValues : String -> String -> TriggerProperty
tgModifyValues =
    TgModifyValues


{-| Expression that evaluates to data objects to remove. Remove operations are only
applicable to datasets, not marks.
-}
tgRemove : String -> TriggerProperty
tgRemove =
    TgRemove


{-| Remove all data object triggers.
-}
tgRemoveAll : TriggerProperty
tgRemoveAll =
    TgRemoveAll


{-| Expression that evaluates to data objects to toggle. Toggled
objects are inserted or removed depending on whether they are already in the
dataset. Applicable only to datasets, not marks.
-}
tgToggle : String -> TriggerProperty
tgToggle =
    TgToggle


{-| Horizontal alignment of a title. If specified this will override
the [tiAnchor](#tiAnchor) setting (useful when aligning rotated title text).
-}
tiAlign : HAlign -> TitleProperty
tiAlign =
    TAlign


{-| Anchor positioning of a title. Used for aligning title text.
-}
tiAnchor : Anchor -> TitleProperty
tiAnchor =
    TAnchor


{-| Angle in degrees of a title.
-}
tiAngle : Num -> TitleProperty
tiAngle =
    TAngle


{-| Vertical title text baseline.
-}
tiBaseline : VAlign -> TitleProperty
tiBaseline =
    TBaseline


{-| Color of a title.
-}
tiColor : Str -> TitleProperty
tiColor =
    TColor


{-| Mark encodings for custom title styling. This is a standard
encoding for text marks and may contain `enEnter`, `enUpdate`, `enExit` and
`enHover` specifications.
-}
tiEncode : List EncodingProperty -> TitleProperty
tiEncode =
    TEncode


{-| Font name of a title.
-}
tiFont : Str -> TitleProperty
tiFont =
    TFont


{-| Font size of a title.
-}
tiFontSize : Num -> TitleProperty
tiFontSize =
    TFontSize


{-| Font weight of a title (can be a number such as `vnum 300` or text
such as `vStr "bold"`).
-}
tiFontWeight : Value -> TitleProperty
tiFontWeight =
    TFontWeight


{-| Reference frame for the anchor position of a title.
-}
tiFrame : TitleFrame -> TitleProperty
tiFrame =
    TFrame


{-| Whether or not a title's properties should respond to input events
such as mouse hover.
-}
tiInteractive : Boo -> TitleProperty
tiInteractive =
    TInteractive


{-| Maximim allowed length of a title in pixels.
-}
tiLimit : Num -> TitleProperty
tiLimit =
    TLimit


{-| Mark name to apply to a title text mark. This name can be used to
refer to the title mark with an
[event stream definition](https://vega.github.io/vega/docs/event-streams/).
-}
tiName : String -> TitleProperty
tiName =
    TName


{-| Orthogonal offset in pixels by which to displace the title from
its position along the edge of the chart.
-}
tiOffset : Num -> TitleProperty
tiOffset =
    TOffset


{-| Position a title relative to the chart.
-}
tiOrient : Side -> TitleProperty
tiOrient =
    TOrient


{-| Mark style property to apply to the title text mark. If not
specified the default style of `group-title` is used.
-}
tiStyle : Str -> TitleProperty
tiStyle =
    TStyle


{-| Top-level title to be displayed as part of a visualization.
The first parameter is the text of the title to display, the second any optional
properties for customising the title's appearance.
-}
title : Str -> List TitleProperty -> ( VProperty, Spec )
title s tps =
    ( VTitle, JE.object (List.map titleProperty (TText s :: tps)) )


{-| z-index indicating the layering of the title group relative to
other axis, mark and legend groups.
-}
tiZIndex : Num -> TitleProperty
tiZIndex =
    TZIndex


{-| Output field names for the output of a treemap layout transform.
The parameters correspond to the (default name) fields `x0`, `y0`, `x1`, `y1`,
`depth` and `children`.
-}
tmAs : String -> String -> String -> String -> String -> String -> TreemapProperty
tmAs =
    TmAs


{-| A binary treemap layout method used in a treemap transform.
-}
tmBinary : TreemapMethod
tmBinary =
    TmBinary


{-| A dicing treemap layout method used in a treemap transform.
-}
tmDice : TreemapMethod
tmDice =
    TmDice


{-| Field corresponding to a numeric value for a treemap node.
The sum of values for a node and all its descendants is available on the node object
as the `value` property. This field determines the size of a node.
-}
tmField : Field -> TreemapProperty
tmField =
    TmField


{-| Layout method to use in a treemap transform.
-}
tmMethod : TreemapMethod -> TreemapProperty
tmMethod =
    TmMethod


{-| Inner and outer padding values for a treemap layout transform.
-}
tmPadding : Num -> TreemapProperty
tmPadding =
    TmPadding


{-| Padding between the bottom edge of a node and its children in a treemap
layout transform.
-}
tmPaddingBottom : Num -> TreemapProperty
tmPaddingBottom =
    TmPaddingBottom


{-| Inner padding values for a treemap layout transform.
-}
tmPaddingInner : Num -> TreemapProperty
tmPaddingInner =
    TmPaddingInner


{-| Padding between the left edge of a node and its children in a treemap
layout transform.
-}
tmPaddingLeft : Num -> TreemapProperty
tmPaddingLeft =
    TmPaddingLeft


{-| Outer padding values for a treemap layout transform.
-}
tmPaddingOuter : Num -> TreemapProperty
tmPaddingOuter =
    TmPaddingOuter


{-| Padding between the right edge of a node and its children in a treemap
layout transform.
-}
tmPaddingRight : Num -> TreemapProperty
tmPaddingRight =
    TmPaddingRight


{-| Padding between the top edge of a node and its children in a treemap
layout transform.
-}
tmPaddingTop : Num -> TreemapProperty
tmPaddingTop =
    TmPaddingTop


{-| Target aspect ratio for the `Squarify` or `Resquarify` treemap layout
trqnsformations. The default is the golden ratio, φ = (1 + sqrt(5)) / 2.
-}
tmRatio : Num -> TreemapProperty
tmRatio =
    TmRatio


{-| A resquarifying treemap layout method used in a treemap transform.
-}
tmResquarify : TreemapMethod
tmResquarify =
    TmResquarify


{-| Whether or not node layout values should be rounded in a treemap transform.
The default is false.
-}
tmRound : Boo -> TreemapProperty
tmRound =
    TmRound


{-| Treemap layout method referenced by the value in the named signal.
-}
tmSignal : String -> TreemapMethod
tmSignal =
    TmSignal


{-| Size of a treemap layout as two-element list (or signal) corresponding
to [width, height].
-}
tmSize : Num -> TreemapProperty
tmSize =
    TmSize


{-| A slicing treemap layout method used in a treemap transform.
-}
tmSlice : TreemapMethod
tmSlice =
    TmSlice


{-| A slice and dice treemap layout method used in a treemap transform.
-}
tmSliceDice : TreemapMethod
tmSliceDice =
    TmSliceDice


{-| Sorting properties of sibling nodes is in a treemap layout transform.
-}
tmSort : List ( Field, Order ) -> TreemapProperty
tmSort =
    TmSort


{-| A squarifying treemap layout method used in a treemap transform.
-}
tmSquarify : TreemapMethod
tmSquarify =
    TmSquarify


{-| TopoJSON feature format. The first parameter is the name of the feature object
set to extract.
-}
topojsonFeature : Str -> FormatProperty
topojsonFeature =
    TopojsonFeature


{-| Named property to extract from topoJSON file. Unlike
[topojsonFeature](#topojsonFeature), geo data are returned as a single unified
mesh instance, not as individual GeoJSON features.
-}
topojsonMesh : Str -> FormatProperty
topojsonMesh =
    TopojsonMesh


{-| Convert a list of Vega specifications into a single JSON object that may be
passed to Vega for graphics generation. Recommended practice for top-level
properties that have more than a simple parameter is to create as a series of
compactly named functions (e.g. `ds` for the data source, `sc` for scales, `si`
for signals, `ax` for axes etc.) and construct a list of them. For example,

    helloWorld : Spec
    helloWorld =
        let
            table =
                dataFromColumns "table" []
                    << dataColumn "label" (vStrs [ "Hello", "from", "elm-vega" ])
                    << dataColumn "x" (vNums [ 1, 2, 3 ])

            ds =
                dataSource [ table [] ]

            sc =
                scales
                    << scale "xScale"
                        [ scDomain (doData [ daDataset "table", daField (field "x") ])
                        , scRange raWidth
                        ]

            mk =
                marks
                    << mark text
                        [ mFrom [ srData (str "table") ]
                        , mEncode
                            [ enEnter
                                [ maX [ vScale "xScale", vField (field "x") ]
                                , maText [ vField (field "label") ]
                                ]
                            ]
                        ]
        in
        toVega
            [ width 100, ds, sc [], mk [] ]

-}
toVega : List ( VProperty, Spec ) -> Spec
toVega spec =
    ( "$schema", JE.string "https://vega.github.io/schema/vega/v5.json" )
        :: List.map (\( s, v ) -> ( vPropertyLabel s, v )) spec
        |> JE.object


{-| Ggroup and summarize an input data stream to produce a derived output stream.
Aggregate transforms can be used to compute counts, sums, averages and other
descriptive statistics over groups of data objects.
-}
trAggregate : List AggregateProperty -> Transform
trAggregate =
    TAggregate


{-| A trail mark (line with variable width).
-}
trail : Mark
trail =
    Trail


{-| Apply the given ordered list of transforms to the given data stream. Transform
examples include filtering, creating new data fields from expressions and creating
new data fields suitable for a range of visualization and layout types.
-}
transform : List Transform -> DataTable -> DataTable
transform transforms dTable =
    dTable ++ [ ( "transform", JE.list transformSpec transforms ) ]


{-| Convenience function for specifying a transparent setting for marks that can
be colored (e.g. with [maFill](#maFill))
-}
transparent : Value
transparent =
    vStr "transparent"


{-| A transverse Mercator map projection.
-}
transverseMercator : Projection
transverseMercator =
    TransverseMercator


{-| Discretises numeric values into a set of bins. The first parameter is the
field to bin, the second a two-element numeric list representing the min/max
extent of the bins. Optional binning properties can be provided in the final parameter.
Commonly used to create frequency histograms by combining with [trAggregate](#trAggregate)
to do the counting of field values in each bin.

    transform
        [ trBin (field "examScore") (nums [ 0, 100 ]) []
        , trAggregate
            [ agKey (field "bin0")
            , agGroupBy [ field "bin0", field "bin1" ]
            , agOps [ opCount ]
            , agAs [ "count" ]
            ]
        ]

-}
trBin : Field -> Num -> List BinProperty -> Transform
trBin =
    TBin


{-| Collect all the objects in a data stream within a single list, allowing
sorting by data field values.
-}
trCollect : List ( Field, Order ) -> Transform
trCollect =
    TCollect


{-| Generate a set of contour (iso) lines at a set of discrete levels. Commonly
used to visualize density estimates for 2D point data.

The first two parameters are the width and height over which to compute the contours.
The third a list of optional contour properties. The transform generates a new
stream of GeoJSON data as output which may be visualized using either the
`trGeoShape` or `trGeoPath` transforms.

    transform
        [ trContour (numSignal "width")
            (numSignal "height")
            [ cnX (fExpr "scale('xScale', datum.Horsepower)")
            , cnY (fExpr "scale('yScale', datum.Miles_per_Gallon)")
            , cnCount (numSignal "count")
            ]
        ]

-}
trContour : Num -> Num -> List ContourProperty -> Transform
trContour =
    TContour


{-| Count the number of occurrences of a text pattern, as defined by a regular
expression. This transform will iterate through each data object and count all
unique pattern matches found within the designated text field.

The first parameter is the field containing the text to count, the second a list
of optional counting properties. The transform generates two fields named `text`
and `count` unless renamed via `cpAs`.

-}
trCountPattern : Field -> List CountPatternProperty -> Transform
trCountPattern =
    TCountPattern


{-| Compute the cross-product of a data stream with itself.
-}
trCross : List CrossProperty -> Transform
trCross =
    TCross


{-| Maintain a filter mask for multiple dimensional queries, using a set of
sorted indices. The parameter is a list of (field,range) pairs indicating which
fields to filter and the numeric range of values in the form of a `num` that
should resolve to a [min (inclusive), max (exclusive)] pair.
-}
trCrossFilter : List ( Field, Num ) -> Transform
trCrossFilter =
    TCrossFilter


{-| Perform a crossfilter transform. This version can be used with
[trResolvefilter](#trResolveFilter) to enable fast interactive querying over large
datasets. The final parameter is the name of a new signal with which to bind the
results of the filter (which can then be referenced by [trResolveFilter](#trResolveFilter)).
-}
trCrossFilterAsSignal : List ( Field, Num ) -> String -> Transform
trCrossFilterAsSignal =
    TCrossFilterAsSignal


{-| Compute a new data stream of uniformly-spaced samples drawn from a one-dimensional
probability density function (pdf) or cumulative distribution function (cdf).
Useful for representing probability distributions and generating continuous
distributions from discrete samples through kernel density estimation.
-}
trDensity : Distribution -> List DensityProperty -> Transform
trDensity =
    TDensity


{-| Compute the minimum and maximum values for a data field, producing a two-element
[min, max] list.
-}
trExtent : Field -> Transform
trExtent =
    TExtent


{-| Compute the minimum and maximum values for a given data field and bind it to a
signal with the given name.
-}
trExtentAsSignal : Field -> String -> Transform
trExtentAsSignal =
    TExtentAsSignal


{-| Remove objects from a data stream based on the given filter expression.
-}
trFilter : Expr -> Transform
trFilter =
    TFilter


{-| Map list-valued fields to a set of individual data objects, one per list entry.
This version generates the output fields with names corresponding to the list field used.
-}
trFlatten : List Field -> Transform
trFlatten =
    TFlatten


{-| Similar to [trFlatten](#trFlatten) but allowing the output fields to be named.
-}
trFlattenAs : List Field -> List String -> Transform
trFlattenAs =
    TFlattenAs


{-| Perform a _gather_ operation to _tidy_ a table. Collapse multiple data fields
into two new data fields: `key` containing the original data field names and `value`
containing the corresponding data values. This performs the same function as the
[gather operation in R](https://tidyr.tidyverse.org/reference/gather.html) and in the
[Tidy Elm package](https://package.elm-lang.org/packages/gicentre/tidy/latest/Tidy#gather).
-}
trFold : List Field -> Transform
trFold =
    TFold


{-| Similar to [trFold](#trFold) but allows the new output `key` and `value` fields
to be given alternative names (second and third parameters respectively).
-}
trFoldAs : List Field -> String -> String -> Transform
trFoldAs =
    TFoldAs


{-| Compute a force-directed layout. This layout transformation uses a model in
which data objects act as charged particles (or nodes), optionally connected by
a set of edges (or links). A set of forces is used to drive a physics simulation
that determines the node positions.
-}
trForce : List ForceSimulationProperty -> Transform
trForce =
    TForce


{-| Extend a data object with new values according to the given
[Vega expression](https://vega.github.io/vega/docs/expressions/). The second
parameter is a new field name to give the result of the evaluated expression.
This version will reapply the formula if the data changes. To perform a one-off
formula calculation use [trFormulaInitOnly](#trFormulaInitOnly).

    dataSource
        [ data "world"
            [ daUrl (str "https://vega.github.io/vega/data/world-110m.json")
            , daFormat [ topojsonFeature "countries" ]
            ]
            |> transform
                [ trFormula "geoCentroid('myProj', datum)" "myCentroid" ]
        ]

-}
trFormula : String -> String -> Transform
trFormula exp fName =
    TFormula exp fName AlwaysUpdate


{-| Similar to [trFormula](#trFormula) but will apply the formula only once even
if the data changes.
-}
trFormulaInitOnly : String -> String -> Transform
trFormulaInitOnly exp fName =
    TFormula exp fName InitOnly


{-| Consolidate geographic data into a single feature collection. This can be
captured as a signal that will represent the consolidated feature collection.
-}
trGeoJson : List GeoJsonProperty -> Transform
trGeoJson =
    TGeoJson


{-| Map GeoJSON features to SVG path strings according to a provided cartographic
projection for use with the path mark. Similar to the [trGeoShape](#trGeoShape)
but immediately generates SVG path strings.
-}
trGeoPath : String -> List GeoPathProperty -> Transform
trGeoPath =
    TGeoPath


{-| Project a longitude, latitude pair to (x,y) coordinates according to the given
map projection. The first parameter is the name of the map projection to use, the
second and third the fields containing the longitude and latitude values respectively.
This version generates two new fields with the name `x` and `y` holding the
projected coordinates.
-}
trGeoPoint : String -> Field -> Field -> Transform
trGeoPoint =
    TGeoPoint


{-| Similar to [trGeoPoint](#trGeoPoint) but allowing the projected coordinates
to be named (last two parameters).
-}
trGeoPointAs : String -> Field -> Field -> String -> String -> Transform
trGeoPointAs =
    TGeoPointAs


{-| Generate a renderer instance that maps GeoJSON features to a shape instance
for use with the shape mark. Similar to the [trGeoPath](#trGeoPath), but rather than
generate intermediate SVG path strings, this transform produces a shape instance
that directly generates drawing commands during rendering resulting in improved
performance when using canvas rendering for dynamic maps.
-}
trGeoShape : String -> List GeoPathProperty -> Transform
trGeoShape =
    TGeoShape


{-| Generate a reference grid of meridians (longitude) and parallels (latitude)
for cartographic maps. The default graticule has meridians and parallels every
10° between ±80° latitude; for the polar regions meridians are every 90°.

It generates a new data stream containing a single GeoJSON data object
for the graticule, which can subsequently be drawn using the geopath or geoshape
transform.

-}
trGraticule : List GraticuleProperty -> Transform
trGraticule =
    TGraticule


{-| Extend a data object with a globally unique key value. Identifier values are
assigned using an internal counter. This counter is shared across all instances
of this transform within a single Vega view, including different data sources,
but not across different Vega views.
-}
trIdentifier : String -> Transform
trIdentifier =
    TIdentifier


{-| Creates a trigger that may be applied to a data table or mark.
The first parameter is the name of the trigger and the second
a list of trigger actions.
-}
trigger : String -> List TriggerProperty -> Trigger
trigger trName trProps =
    JE.object (List.concatMap triggerProperties (TgTrigger trName :: trProps))


{-| Generate new values for missing data. The first parameter is the data field
for which missing values should be imputed. The second is a key field that uniquely
identifies the data objects within a group and so allows missing values to be
identified. The third is a list of optional properties for customising the imputation.
-}
trImpute : Field -> Field -> List ImputeProperty -> Transform
trImpute =
    TImpute


{-| Group and summarize an input data stream in a similar way to [trAggregate](#trAggregate)
but which is then joined back to the input stream. Helpful for creating derived
values that combine both raw data and aggregate calculations, such as percentages
of group totals.
-}
trJoinAggregate : List JoinAggregateProperty -> Transform
trJoinAggregate =
    TJoinAggregate


{-| Route a visual link between two nodes to draw edges in a tree or network layout.
Writes one property to each datum, providing an SVG path string for the link path.
-}
trLinkPath : List LinkPathProperty -> Transform
trLinkPath =
    TLinkPath


{-| Extend a primary data stream by looking up values on a secondary data stream.
The first parameter is the name of the secondary data stream upon which to perform
the lookup. The second is the key field in that secondary stream. The third is the
set of key fields from the primary data stream, each of which are then searched
for in a single key field of the secondary data stream. Optional customisation
provided as a list of properties in the final parameter.
-}
trLookup : String -> Field -> List Field -> List LookupProperty -> Transform
trLookup =
    TLookup


{-| Generate a tree data structure from input data objects by dividing children
into groups based on distinct field values. This can provide input to tree layout
methods such as [trTree](#trTree), [trTreemap](#trTreemap), [trPack](#trPack) and
[trPartition](#trPartition).
-}
trNest : List Field -> Boo -> Transform
trNest =
    TNest


{-| Compute an enclosure diagram that uses containment (nesting) to represent a
hierarchy. The size of the leaf circles encodes a quantitative dimension of the
data. The enclosing circles show the approximate cumulative size of each subtree,
but due to wasted space there is some distortion; only the leaf nodes can be
compared accurately.
-}
trPack : List PackProperty -> Transform
trPack =
    TPack


{-| Compute the layout for an adjacency diagram: a space-filling variant of a node-link
tree diagram. Nodes are drawn as solid areas (either arcs or rectangles) sized by
some quantitative field, and their placement relative to other nodes reveals their
position in the hierarchy.
-}
trPartition : List PartitionProperty -> Transform
trPartition =
    TPartition


{-| Calculates the angular extents of arc segments laid out in a circle, for example
to create a pie chart. Writes two properties to each datum, indicating the starting
and ending angles (in radians) of an arc.
-}
trPie : List PieProperty -> Transform
trPie =
    TPie


{-| Map unique values from a field to new aggregated fields in the output stream.
The first parameter is the field to pivot on (providing new field names). The second
is the field containing values to aggregate to populate new values. The third allows
the transform to be customised.
-}
trPivot : Field -> Field -> List PivotProperty -> Transform
trPivot =
    TPivot


{-| Perform a relational algebra projection transform resulting in a new stream
of derived data objects that include one or more fields from the input stream.
The parameter is a list of field-name pairs where the fields are those fields to
be copied over in the projection and the names are the new names to give the
projected fields.
-}
trProject : List ( Field, String ) -> Transform
trProject =
    TProject


{-| Use a filter mask generated by a crossfilter transform to generate filtered
data streams efficiently. The first parameter is the signal created by
[trCrossFilterAsSignal](#trCrossFilterAsSignal) and the second a bit mask indicating
which fields in the crossfilter should be ignored. Each bit corresponds to a field
and query in the crossfilter transform’s fields and query lists. If the corresponding
bit is on, that field and query will be ignored when resolving the filter. All other
queries must pass the filter for a tuple to be included downstream.
-}
trResolveFilter : String -> Num -> Transform
trResolveFilter =
    TResolveFilter


{-| Generate a random sample from a data stream to generate a smaller stream. The
parameter determines the maximum number of data items to sample.
-}
trSample : Num -> Transform
trSample =
    TSample


{-| Generate a data stream of numbers between a start (first parameter) and end
(second parameter) inclusive in increments specified by the third parameter. If
the end value is less than the start value, the third parameter should be negative.
The resulting output field will be called `data`.

Sequences can be used to feed other transforms to generate data to create random
(x,y) coordinates:

    dataSource
        [ data "randomData" []
            |> transform
                [ trSequence (num 1) (num 1000) (num 1)
                , trFormula "random()" "x"
                , trFormula "random()" "y"
                ]
        ]

-}
trSequence : Num -> Num -> Num -> Transform
trSequence =
    TSequence


{-| Similar to [trSequence](#trSequence) but allowing the resulting sequence to
be named (fourth parameter).
-}
trSequenceAs : Num -> Num -> Num -> String -> Transform
trSequenceAs =
    TSequenceAs


{-| Compute a layout by stacking groups of values. The most common use case is to
create stacked graphs, including stacked bar charts and stream graphs. This
transform writes two properties to each datum, indicating the starting and ending
stack values.
-}
trStack : List StackProperty -> Transform
trStack =
    TStack


{-| Generate a hierarchical (tree) data structure from input data objects, based
on key fields that match an id for each node (first parameter) and their parent's
key (second parameter) nodes. Internally, this transform generates a set of tree
node objects that can then be transformed with tree layout functions such as
[trTree](#trTree), [trTreemap](#trTreemap), [trPack](#trPack), and
[trPartition](#trPartition).
-}
trStratify : Field -> Field -> Transform
trStratify =
    TStratify


{-| Compute a node-link diagram layout for hierarchical data. Supports both cluster
layouts (for example to create dendrograms) and tidy layouts.
-}
trTree : List TreeProperty -> Transform
trTree =
    TTree


{-| Generate a new stream of data objects representing links between nodes in a
tree. This transform must occur downstream of a tree-generating transform such as
[trNest](#trNest) or [trStratify](#trStratify). The generated link objects will
have `source` and `target` fields that reference input data objects corresponding
to parent (source) and child (target) nodes.
-}
trTreeLinks : Transform
trTreeLinks =
    TTreeLinks


{-| Recursively subdivide an area into rectangles with areas proportional to each
node’s associated value.
-}
trTreemap : List TreemapProperty -> Transform
trTreemap =
    TTreemap


{-| A Boolean true value.
-}
true : Boo
true =
    Boo True


{-| Compute a voronoi diagram for a set of input points and return the computed
cell paths.
-}
trVoronoi : Field -> Field -> List VoronoiProperty -> Transform
trVoronoi =
    TVoronoi


{-| Performs calculations such as ranking, lead/lag analysis and running sums over
sorted groups of data objects . Calculated values are written back to the input
data stream.

    transform
        [ trWindow [ wnOperation woRowNumber "rank" ]
            [ wnSort [ ( field "myField", descend ) ] ]
        ]

-}
trWindow : List WindowOperation -> List WindowProperty -> Transform
trWindow =
    TWindow


{-| Compute a word cloud layour similar to a 'wordle'. Useful for visualising the
relative frequency of words or phrases.

    mark text
        [ mTransform
            [ trWordcloud
                [ wcSize (nums [ 800, 400 ])
                , wcText (field "text")
                , wcRotate (numExpr (exField "datum.angle"))
                , wcFontSize (numExpr (exField "datum.count"))
                , wcFontWeight (strExpr (exField "datum.weight"))
                , wcFontSizeRange (nums [ 12, 56 ])
                ]
            ]
        ]

-}
trWordcloud : List WordcloudProperty -> Transform
trWordcloud =
    TWordcloud


{-| Indicate a TSV (tab-separated) format when parsing a data source.
-}
tsv : FormatProperty
tsv =
    TSV


{-| Time unit referenced by the value in the named signal.
-}
tuSignal : String -> TimeUnit
tuSignal =
    TimeUnitSignal


{-| Make text uppercase when pre-processing as part of a count pattern transformation.
-}
uppercase : Case
uppercase =
    Uppercase


{-| Bottom vertical text alignment.
-}
vaBottom : VAlign
vaBottom =
    AlignBottom


{-| Generated by [vaTop](#vaTop), [vaMiddle](#vaMiddle), [vaBottom](#vaBottom),
[vaAlphabetic](#vaAlphabetic) and [vaSignal](#vaSignal).
-}
type VAlign
    = AlignTop
    | AlignMiddle
    | AlignBottom
    | Alphabetic
    | VAlignSignal String


{-| 'Alphabetic' vertical alignment aligning font baseline. Applies to text
marks only.
-}
vaAlphabetic : VAlign
vaAlphabetic =
    Alphabetic


{-| Convenience function for indicating an alphabetic vertical alignment.
-}
vAlphabetic : Value
vAlphabetic =
    vStr "alphabetic"


{-| Middle vertical text alignment.
-}
vaMiddle : VAlign
vaMiddle =
    AlignMiddle


{-| Vertical text alignment referenced by the value in the named signal.
-}
vaSignal : String -> VAlign
vaSignal =
    VAlignSignal


{-| Top vertical text alignment.
-}
vaTop : VAlign
vaTop =
    AlignTop


{-| Band number or fraction of a band number. Band scales are used when
aggregating data into discrete categories such as in a frequency histogram.
-}
vBand : Num -> Value
vBand =
    VBand


{-| A list of Boolean values.
-}
vBoos : List Bool -> Value
vBoos =
    VBoos


{-| Convenience function for indicating a bottom vertical alignment.
-}
vBottom : Value
vBottom =
    vStr "bottom"


{-| A color value.
-}
vColor : ColorValue -> Value
vColor =
    VColor


{-| An exponential value modifier.
-}
vExponent : Value -> Value
vExponent =
    VExponent


{-| A 'false' value.
-}
vFalse : Value
vFalse =
    VBoo False


{-| A data or signal field.
-}
vField : Field -> Value
vField =
    VField


{-| Convenience function for indicating a middle vertical alignment.
-}
vMiddle : Value
vMiddle =
    vStr "middle"


{-| A multiplication value modifier.
-}
vMultiply : Value -> Value
vMultiply =
    VMultiply


{-| An absence of a value.
-}
vNull : Value
vNull =
    VNull


{-| A numeric value.
-}
vNum : Float -> Value
vNum =
    VNum


{-| A list of numbers.
-}
vNums : List Float -> Value
vNums =
    VNums


{-| Name of the output field of a voronoi transform. If not specified, the default
is `path`.
-}
voAs : String -> VoronoiProperty
voAs =
    VoAs


{-| Object containing a list of [key-value](#keyValue) pairs.
-}
vObject : List Value -> Value
vObject =
    VObject


{-| Extent of the voronoi cells in a voronoi transform. The two parameters
should each evaluate to a list of two numbers representing the coordinates of the
top-left and bottom-right of the extent respectively.
-}
voExtent : Num -> Num -> VoronoiProperty
voExtent =
    VoExtent


{-| An additive value modifier.
-}
vOffset : Value -> Value
vOffset =
    VOffset


{-| Extent of the voronoi cells in a voronoi transform. The single parameter
should evaluate to a list of two numbers representing the bottom-right of the extent.
The top-left is assumed to be [0,0].
-}
voSize : Num -> VoronoiProperty
voSize =
    VoSize


{-| Top-level Vega properties (see the
[specification documentation](https://vega.github.io/vega/docs/specification/)).

**Data properties** specify the input data to be visualized. Generated by
[`dataSource`](#dataSource) that can collect together data tables such as those
read from a URL or generated inline.

**Signal properties** specify dynamic variables that respond reactively to other
signals or interactions. Generated by [`signals`](#signals).

**Scale properties** map data values to visual channels such as position, or color.
Generated by [`scales`](#scales).

**Projection properties** specify how geospatial data referenced with
longitude, latitude coordinates are projected onto a plane for visualization.
Generated by [`projections`](#projections).

**Axis properties** specify how spatial scale mappings are visualized, such as with
tick marks, grid lines and labels. Generated by [`axes`](#axes).

**Legend properties** specify how visual scale mappings such as color, shape and
size are visualized. Generated by [`legends`](#legends).

**Title properties** specify how a visualization title should appear. Generated
by [`title`](#title).

**Layout properties** specify how a group of visual marks are organised within
a grid. This allows visualizations to be composed of other visualizations, for
example in a dashboard or collection of small multiples. Generated by [`layout`](#layout).

**Mark properties** specify how to visually encode data with graphical primitives
such as points, lines and other symbols. Generated by [`marks`](#marks).

**Top-level group encodings** specify the appearance of the chart's data rectangle.
For example setting the background color of the plotting area. Generated by
[`encode`](#encode).

**Config properties** specify default settings of a specification. Allows consistent
and easily modifiable styles to be applied to a visualization. Generated by
[`config`](#config).

**Supplementary properties** add metadata and some styling to one or more visualizations.
Generated by [`width`](#width), [`height`](#height), [`padding`](#padding),
[`paddings`](#paddings), [`autosize`](#autosize), [`background`](#background)
and [`description`](#description).

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


{-| A rounding value modifier. Rounding is applied after all other modifiers.
-}
vRound : Boo -> Value
vRound =
    VRound


{-| Name of a scale.
-}
vScale : String -> Value
vScale s =
    VScale (field s)


{-| A scale field used to dynamically look up a scale name.
-}
vScaleField : Field -> Value
vScaleField =
    VScale


{-| A named signal.
-}
vSignal : String -> Value
vSignal =
    VSignal


{-| A string value.
-}
vStr : String -> Value
vStr =
    VStr


{-| A list of string values.
-}
vStrs : List String -> Value
vStrs =
    VStrs


{-| Convenience function for indicating a top vertical alignment.
-}
vTop : Value
vTop =
    vStr "top"


{-| A 'true' value.
-}
vTrue : Value
vTrue =
    VBoo True


{-| List of values. Useful for nesting collections of possibly mixed types.
-}
vValues : List Value -> Value
vValues =
    Values


{-| Name output fields created by a word cloud transform. The parameters
map to the following default values: `x`, `y`, `font`, `fontSize`, `fontStyle`,
`fontWeight` and `angle`.
-}
wcAs : String -> String -> String -> String -> String -> String -> String -> WordcloudProperty
wcAs =
    WcAs


{-| Font family to use for a word in a wordcloud.
-}
wcFont : Str -> WordcloudProperty
wcFont =
    WcFont


{-| Font size to use for a word in a wordcloud.
-}
wcFontSize : Num -> WordcloudProperty
wcFontSize =
    WcFontSize


{-| Font size range to use for words in a wordcloud. The parameter should
resolve to a two-element list [min, max]. The size of words in a wordcloud will be
scaled to lie in the given range according to the square root scale.
-}
wcFontSizeRange : Num -> WordcloudProperty
wcFontSizeRange =
    WcFontSizeRange


{-| Font style to use for words in a wordcloud.
-}
wcFontStyle : Str -> WordcloudProperty
wcFontStyle =
    WcFontStyle


{-| Font weights to use for words in a wordcloud.
-}
wcFontWeight : Str -> WordcloudProperty
wcFontWeight =
    WcFontWeight


{-| Padding, in pixels, to be placed around words in a wordcloud.
-}
wcPadding : Num -> WordcloudProperty
wcPadding =
    WcPadding


{-| Angle in degrees of words in a wordcloud layout.
-}
wcRotate : Num -> WordcloudProperty
wcRotate =
    WcRotate


{-| Size of layout created by a wordcloud transform. The parameter should
resolve to a two-element list [width, height] in pixels.
-}
wcSize : Num -> WordcloudProperty
wcSize =
    WcSize


{-| Spiral layout method for a wordcloud transform.
-}
wcSpiral : Spiral -> WordcloudProperty
wcSpiral =
    WcSpiral


{-| Data field with the input word text for a wordcloud transform.
-}
wcText : Field -> WordcloudProperty
wcText =
    WcText


{-| A week time unit.
-}
week : TimeUnit
week =
    Week


{-| Convenience function for specifying a white color setting for marks that can
be colored (e.g. with [maStroke](#maStroke))
-}
white : Value
white =
    vStr "white"


{-| Override the default width of the visualization. If not specified the width
will be calculated based on the content of the visualization.
-}
width : Float -> ( VProperty, Spec )
width w =
    ( VWidth, JE.float w )


{-| Aggregate operation to be applied during a window transformation.
This version is suitable for operations without parameters (e.g. `woRowNumber`)
and that are not applied to a specific field.

The parameters are the operation to apply, the input field (or `Nothing` if no input
field) and the name to give to the field that will contain the results of the calculation.

The example below calculates the average over an unbounded window:

    transform
        [ trWindow [ wnAggOperation opMean (Just (field "IMDB_Rating")) "avScore" ]
            [ wnFrame numNull ]
        ]

-}
wnAggOperation : Operation -> Maybe Field -> String -> WindowOperation
wnAggOperation op inField outFieldName =
    WnAggOperation op Nothing inField outFieldName


{-| Window-specific operation to be applied during a window transformation.
This version is suitable for operations without parameters (e.g. `woRowNumber`) and
that are not applied to a specific field.

The parameters are the operation to apply and the name to give to the field which
will contain the results of the calculation.

    transform
        [ trWindow [ wnOperation woRank "order" ]
            [ wnSort [ ( field "Gross", descend ) ] ]
        ]

-}
wnOperation : WOperation -> String -> WindowOperation
wnOperation op outField =
    WnOperation op Nothing Nothing outField


{-| Window-specific operation to be applied during a window transformation.
This version is suitable for operations that have a parameter (e.g. `woLag` or
`woLead`) and/or operations that require a specific field as input (e.g.
`woLastValue`). The parameters are in order: the type of operation, a possible
operation parameter, the field to apply it to and its output field name.

    transform
        [ trWindow
            [ wnOperationOn woLag
                (Just (num 5))
                (Just (field "temperature"))
                "oldTemp"
            ]
            []
        ]

-}
wnOperationOn : WOperation -> Maybe Num -> Maybe Field -> String -> WindowOperation
wnOperationOn =
    WnOperation


{-| Two-element list indicating how a sliding window should proceed during a window
transform. The list entries should either be a number indicating the offset from
the current data object, or `NumNull` to indicate unbounded rows preceding or
following the current data object.
-}
wnFrame : Num -> WindowProperty
wnFrame =
    WnFrame


{-| Data fields by which to partition data objects into separate windows
during a window transform. If not specified, a single group containing all data
objects will be used.
-}
wnGroupBy : List Field -> WindowProperty
wnGroupBy =
    WnGroupBy


{-| Whether or not a sliding frame in a window transform should ignore
peer values.
-}
wnIgnorePeers : Boo -> WindowProperty
wnIgnorePeers =
    WnIgnorePeers


{-| Indicate how sorting data objects is applied within a window transform.

    transform
        [ trWindow [ wnOperation woRowNumber "order" ]
            [ wnSort [ ( field "score", ascend ) ] ]
        ]

If two objects are equal in terms of sorting field datum by they are considered
'peers'. If no sorting comparator is specified, data objects are processed in the
order they are observed.

-}
wnSort : List ( Field, Order ) -> WindowProperty
wnSort =
    WnSort


{-| Generated by [woRowNumber](#woRowNumber), [woRank](#woRank), [woDenseRank](#woDenseRank),
[woPercentRank](#woPercentRank), [woCumeDist](#woCumeDist), [woPercentile](#woPercentile),
[woLag](#woLag), [woLead](#woLead), [woFirstValue](#woFirstValue), [woLastValue](#woLastValue),
[woNthValue](#woNthValue) and [woSignal](#woSignal).
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
    | WOperationSignal String


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


{-| Window operation referenced by the value in the named signal. For names of
valid window operations see the
[Vega window operation documentation](https://vega.github.io/vega/docs/transforms/window/#ops)
-}
woSignal : String -> WOperation
woSignal =
    WOperationSignal


{-| A year time unit.
-}
year : TimeUnit
year =
    Year



-- ################################################# Private types and functions


type alias LabelledSpec =
    ( String, Spec )


aggregateProperty : AggregateProperty -> LabelledSpec
aggregateProperty ap =
    case ap of
        AgGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        AgFields fs ->
            ( "fields", JE.list fieldSpec fs )

        AgOps ops ->
            ( "ops", JE.list opSpec ops )

        AgAs labels ->
            ( "as", JE.list JE.string labels )

        AgCross b ->
            ( "cross", booSpec b )

        AgDrop b ->
            ( "drop", booSpec b )

        AgKey f ->
            ( "key", fieldSpec f )


anchorSpec : Anchor -> Spec
anchorSpec anchor =
    case anchor of
        Start ->
            JE.string "start"

        Middle ->
            JE.string "middle"

        End ->
            JE.string "end"

        AnchorSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


autosizeProperty : Autosize -> LabelledSpec
autosizeProperty asCfg =
    case asCfg of
        APad ->
            ( "type", JE.string "pad" )

        AFit ->
            ( "type", JE.string "fit" )

        AFitX ->
            ( "type", JE.string "fit-x" )

        AFitY ->
            ( "type", JE.string "fit-y" )

        ANone ->
            ( "type", JE.string "none" )

        AResize ->
            ( "resize", JE.bool True )

        AContent ->
            ( "contains", JE.string "content" )

        APadding ->
            ( "contains", JE.string "padding" )

        AutosizeSignal sigName ->
            signalReferenceProperty sigName


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
            ( "orient", sideSpec axSide )

        AxBandPosition n ->
            ( "bandPosition", numSpec n )

        AxDomain b ->
            ( "domain", booSpec b )

        AxDomainColor s ->
            ( "domainColor", strSpec s )

        AxDomainOpacity n ->
            ( "domainOpacity", numSpec n )

        AxDomainWidth n ->
            ( "domainWidth", numSpec n )

        AxEncode elEncs ->
            let
                enc ( el, encProps ) =
                    ( axisElementLabel el, JE.object (List.map encodingProperty encProps) )
            in
            ( "encode", JE.object (List.map enc elEncs) )

        AxFormat fmt ->
            ( "format", strSpec fmt )

        AxGrid b ->
            ( "grid", booSpec b )

        AxGridColor s ->
            ( "gridColor", strSpec s )

        AxGridDash vals ->
            ( "gridDash", valRef vals )

        AxGridOpacity n ->
            ( "gridOpacity", numSpec n )

        AxGridScale s ->
            ( "gridScale", JE.string s )

        AxGridWidth n ->
            ( "gridWidth", numSpec n )

        AxLabels b ->
            ( "labels", booSpec b )

        AxLabelAlign ha ->
            ( "labelAlign", hAlignSpec ha )

        AxLabelAngle n ->
            ( "labelAngle", numSpec n )

        AxLabelBaseline va ->
            ( "labelBaseline", vAlignSpec va )

        AxLabelBound n ->
            case n of
                NumNull ->
                    ( "labelBound", JE.bool False )

                _ ->
                    ( "labelBound", numSpec n )

        AxLabelColor s ->
            ( "labelColor", strSpec s )

        AxLabelFlush n ->
            case n of
                NumNull ->
                    ( "labelFlush", JE.bool False )

                _ ->
                    ( "labelFlush", numSpec n )

        AxLabelFlushOffset pad ->
            ( "labelFlushOffset", numSpec pad )

        AxLabelFont s ->
            ( "labelFont", strSpec s )

        AxLabelFontSize n ->
            ( "labelFontSize", numSpec n )

        AxLabelFontWeight val ->
            ( "labelFontWeight", valueSpec val )

        AxLabelLimit n ->
            ( "labelLimit", numSpec n )

        AxLabelOpacity n ->
            ( "labelOpacity", numSpec n )

        AxLabelOverlap strat ->
            ( "labelOverlap", overlapStrategySpec strat )

        AxLabelPadding pad ->
            ( "labelPadding", numSpec pad )

        AxMaxExtent val ->
            ( "maxExtent", valueSpec val )

        AxMinExtent val ->
            ( "minExtent", valueSpec val )

        AxOffset val ->
            ( "offset", valueSpec val )

        AxPosition val ->
            ( "position", valueSpec val )

        AxTicks b ->
            ( "ticks", booSpec b )

        AxTickColor s ->
            ( "tickColor", strSpec s )

        AxTickCount n ->
            ( "tickCount", numSpec n )

        AxTemporalTickCount tu n ->
            case n of
                Num step ->
                    if step <= 0 then
                        ( "tickCount", timeUnitSpec tu )

                    else
                        ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                NumSignal _ ->
                    ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                NumExpr _ ->
                    ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                _ ->
                    ( "tickCount", timeUnitSpec tu )

        AxTickExtra b ->
            ( "tickExtra", booSpec b )

        AxTickOffset n ->
            ( "tickOffset", numSpec n )

        AxTickOpacity n ->
            ( "tickOpacity", numSpec n )

        AxTickRound b ->
            ( "tickRound", booSpec b )

        AxTickSize n ->
            ( "tickSize", numSpec n )

        AxTickWidth n ->
            ( "tickWidth", numSpec n )

        AxTitle s ->
            ( "title", strSpec s )

        AxTitleAlign ha ->
            ( "titleAlign", hAlignSpec ha )

        AxTitleAngle n ->
            ( "titleAngle", numSpec n )

        AxTitleBaseline va ->
            ( "titleBaseline", vAlignSpec va )

        AxTitleColor s ->
            ( "titleColor", strSpec s )

        AxTitleFont s ->
            ( "titleFont", strSpec s )

        AxTitleFontSize n ->
            ( "titleFontSize", numSpec n )

        AxTitleFontWeight val ->
            ( "titleFontWeight", valueSpec val )

        AxTitleLimit n ->
            ( "titleLimit", numSpec n )

        AxTitleOpacity n ->
            ( "titleOpacity", numSpec n )

        AxTitlePadding val ->
            ( "titlePadding", valueSpec val )

        AxTitleX n ->
            ( "titleX", numSpec n )

        AxTitleY n ->
            ( "titleY", numSpec n )

        AxValues vals ->
            ( "values", valueSpec vals )

        AxZIndex n ->
            ( "zindex", numSpec n )


axTypeLabel : AxisType -> String
axTypeLabel axType =
    case axType of
        AxAll ->
            "axis"

        AxLeft ->
            "axisLeft"

        AxTop ->
            "axisTop"

        AxRight ->
            "axisRight"

        AxBottom ->
            "axisBottom"

        AxX ->
            "axisX"

        AxY ->
            "axisY"

        AxBand ->
            "axisBand"


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
                    ( "steps", JE.list numSpec [ ns ] )

                NumSignal _ ->
                    ( "steps", JE.list numSpec [ ns ] )

                _ ->
                    ( "steps", numSpec ns )

        BnNums ns ->
            case ns of
                Num _ ->
                    ( "bins", JE.list numSpec [ ns ] )

                NumSignal _ ->
                    ( "bins", JE.list numSpec [ ns ] )

                _ ->
                    ( "bins", numSpec ns )

        BnMinStep n ->
            ( "minstep", numSpec n )

        BnDivide n ->
            ( "divide", numSpec n )

        BnNice b ->
            ( "nice", booSpec b )

        BnSignal s ->
            ( "signal", JE.string s )

        BnAs mn mx ->
            ( "as", JE.list JE.string [ mn, mx ] )


binsProperty : BinsProperty -> LabelledSpec
binsProperty bProps =
    case bProps of
        BnsStep n ->
            ( "step", numSpec n )

        BnsStart n ->
            ( "start", numSpec n )

        BnsStop n ->
            ( "stop", numSpec n )


booSpec : Boo -> Spec
booSpec boo =
    case boo of
        Boo b ->
            JE.bool b

        Boos bs ->
            JE.list JE.bool bs

        BooSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        BooSignals sigs ->
            JE.list (\sig -> JE.object [ signalReferenceProperty sig ]) sigs

        BooExpr ex ->
            JE.object [ exprProperty ex ]


boundsCalculationSpec : BoundsCalculation -> Spec
boundsCalculationSpec bc =
    case bc of
        Full ->
            JE.string "full"

        Flush ->
            JE.string "flush"

        BoundsCalculationSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


caseLabel : Case -> String
caseLabel c =
    case c of
        Lowercase ->
            "lower"

        Uppercase ->
            "upper"

        Mixedcase ->
            "mixed"


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
                [ ( "r", JE.object (List.concatMap valueProperties r) )
                , ( "g", JE.object (List.concatMap valueProperties g) )
                , ( "b", JE.object (List.concatMap valueProperties b) )
                ]
            )

        HSL h s l ->
            ( "color"
            , JE.object
                [ ( "h", JE.object (List.concatMap valueProperties h) )
                , ( "s", JE.object (List.concatMap valueProperties s) )
                , ( "l", JE.object (List.concatMap valueProperties l) )
                ]
            )

        LAB l a b ->
            ( "color"
            , JE.object
                [ ( "l", JE.object (List.concatMap valueProperties l) )
                , ( "a", JE.object (List.concatMap valueProperties a) )
                , ( "b", JE.object (List.concatMap valueProperties b) )
                ]
            )

        HCL h c l ->
            ( "color"
            , JE.object
                [ ( "h", JE.object (List.concatMap valueProperties h) )
                , ( "c", JE.object (List.concatMap valueProperties c) )
                , ( "l", JE.object (List.concatMap valueProperties l) )
                ]
            )


comparatorProperties : List ( Field, Order ) -> List LabelledSpec
comparatorProperties comp =
    let
        ( fs, os ) =
            List.unzip comp
    in
    [ ( "field", JE.list fieldSpec fs )
    , ( "order", JE.list orderSpec os )
    ]


configProperty : ConfigProperty -> LabelledSpec
configProperty cp =
    case cp of
        CfAutosize aps ->
            ( "autosize", JE.object (List.map autosizeProperty aps) )

        CfBackground s ->
            ( "background", strSpec s )

        CfGroup mps ->
            ( "group", JE.object (List.map markProperty mps) )

        CfEvents ef ets ->
            let
                filterLabel =
                    if ef == Allow then
                        "allow"

                    else
                        "prevent"

                listSpec =
                    if ets == [] then
                        JE.bool True

                    else
                        JE.list (\et -> JE.string (eventTypeLabel et)) ets
            in
            ( "events", JE.object [ ( "defaults", JE.object [ ( filterLabel, listSpec ) ] ) ] )

        CfMark mk mps ->
            ( markLabel mk, JE.object (List.map markProperty mps) )

        CfMarks mps ->
            ( "mark", JE.object (List.map markProperty mps) )

        CfStyle sName mps ->
            ( "style", JE.object [ ( sName, JE.object (List.map markProperty mps) ) ] )

        CfAxis axType aps ->
            ( axTypeLabel axType, JE.object (List.map axisProperty aps) )

        CfLegend lps ->
            ( "legend", JE.object (List.map legendProperty lps) )

        CfTitle tps ->
            ( "title", JE.object (List.map titleProperty tps) )

        CfScaleRange ra1 ra2 ->
            let
                raLabel =
                    case ra1 of
                        RaSymbol ->
                            "symbol"

                        RaCategory ->
                            "category"

                        RaDiverging ->
                            "diverging"

                        RaOrdinal ->
                            "ordinal"

                        RaRamp ->
                            "ramp"

                        RaHeatmap ->
                            "heatmap"

                        _ ->
                            --|> Debug.log ("Warning: cfScale range should be a scale range definition but was " ++ Debug.toString ra1)
                            ""

                raVals =
                    case ra2 of
                        RaStrs ss ->
                            JE.list JE.string ss

                        RaSignal sig ->
                            JE.object [ signalReferenceProperty sig ]

                        RaScheme name options ->
                            JE.object (List.map schemeProperty (SScheme name :: options))

                        _ ->
                            -- |> Debug.log ("Warning: cfScale range values should be color strings or scheme but was " ++ Debug.toString ra2)
                            JE.null
            in
            ( "range", JE.object [ ( raLabel, raVals ) ] )


contourProperty : ContourProperty -> LabelledSpec
contourProperty cnProp =
    case cnProp of
        CnValues n ->
            case n of
                Num _ ->
                    --|> Debug.log ("Warning: cnValues expecting list of numbers or signals but was given " ++ Debug.toString n)
                    ( "values", JE.null )

                _ ->
                    ( "values", numSpec n )

        CnX f ->
            ( "x", fieldSpec f )

        CnY f ->
            ( "y", fieldSpec f )

        CnWeight f ->
            ( "weight", fieldSpec f )

        CnCellSize n ->
            ( "cellSize", numSpec n )

        CnBandwidth n ->
            ( "bandwidth", numSpec n )

        CnSmooth b ->
            ( "smooth", booSpec b )

        CnThresholds n ->
            case n of
                Num _ ->
                    -- |> Debug.log ("Warning: cnThresholds expecting list of numbers or signals but was given " ++ Debug.toString n)
                    ( "thresholds", JE.null )

                _ ->
                    ( "thresholds", numSpec n )

        CnCount n ->
            ( "count", numSpec n )

        CnNice b ->
            ( "nice", booSpec b )


countPatternProperty : CountPatternProperty -> LabelledSpec
countPatternProperty cpProp =
    case cpProp of
        CPPattern s ->
            ( "pattern", strSpec s )

        CPCase c ->
            ( "case", JE.string (caseLabel c) )

        CPStopwords s ->
            ( "stopwords", strSpec s )

        CPAs s1 s2 ->
            ( "as", JE.list JE.string [ s1, s2 ] )


crossProperty : CrossProperty -> LabelledSpec
crossProperty crProp =
    case crProp of
        CrFilter ex ->
            ( "filter", JE.object [ exprProperty ex ] )

        CrAs a b ->
            ( "as", JE.list JE.string [ a, b ] )


dataProperty : DataProperty -> LabelledSpec
dataProperty dProp =
    case dProp of
        DaFormat fmts ->
            ( "format", JE.object (List.concatMap formatProperty fmts) )

        DaSource src ->
            ( "source", JE.string src )

        DaSources srcs ->
            ( "source", JE.list JE.string srcs )

        DaOn triggers ->
            ( "on", JE.list identity triggers )

        DaUrl url ->
            ( "url", strSpec url )

        DaValue val ->
            ( "values", valueSpec val )

        DaSphere ->
            ( "values", JE.object [ ( "type", JE.string "Sphere" ) ] )


dataRefProperty : DataReference -> LabelledSpec
dataRefProperty dataRef =
    let
        nestedSpec dRef2 =
            case dRef2 of
                [ DValues val ] ->
                    valueSpec val

                _ ->
                    JE.object (List.map dataRefProperty dRef2)
    in
    case dataRef of
        DDataset ds ->
            ( "data", JE.string ds )

        DField f ->
            ( "field", fieldSpec f )

        DFields fs ->
            ( "fields", JE.list fieldSpec fs )

        DValues val ->
            ( "values", valueSpec val )

        DSignal sig ->
            ( "signal", JE.string sig )

        DReferences drss ->
            --( "fields", JE.list (List.map (\drs -> JE.object (List.map dataRefProperty drs)) drss) )
            ( "fields", JE.list (\drs -> nestedSpec drs) drss )

        DSort sps ->
            if sps == [ Ascending ] || sps == [] then
                ( "sort", JE.bool True )

            else
                ( "sort", JE.object (List.map sortProperty sps) )


densityProperty : DensityProperty -> LabelledSpec
densityProperty dnp =
    case dnp of
        DnExtent ns ->
            numArrayProperty 2 "extent" ns

        DnMethod df ->
            case df of
                PDF ->
                    ( "method", JE.string "pdf" )

                CDF ->
                    ( "method", JE.string "cdf" )

                DensityFunctionSignal sig ->
                    ( "method", JE.object [ ( "signal", JE.string sig ) ] )

        DnSteps n ->
            ( "steps", numSpec n )

        DnAs s1 s2 ->
            ( "as", JE.list JE.string [ s1, s2 ] )


distributionSpec : Distribution -> Spec
distributionSpec dist =
    case dist of
        DiNormal mean stdev ->
            JE.object
                [ ( "function", JE.string "normal" )
                , ( "mean", numSpec mean )
                , ( "stdev", numSpec stdev )
                ]

        DiUniform mn mx ->
            JE.object
                [ ( "function", JE.string "uniform" )
                , ( "min", numSpec mn )
                , ( "max", numSpec mx )
                ]

        DiKde dSource f bw ->
            if dSource == "" then
                JE.object
                    [ ( "function", JE.string "kde" )
                    , ( "field", fieldSpec f )
                    , ( "bandwidth", numSpec bw )
                    ]

            else
                JE.object
                    [ ( "function", JE.string "kde" )
                    , ( "from", JE.string dSource )
                    , ( "field", fieldSpec f )
                    , ( "bandwidth", numSpec bw )
                    ]

        DiMixture dProbs ->
            let
                dists =
                    List.unzip dProbs |> Tuple.first |> List.map distributionSpec

                probs =
                    List.unzip dProbs |> Tuple.second |> List.map numSpec
            in
            JE.object
                [ ( "function", JE.string "mixture" )
                , ( "distributions", JE.list identity dists )
                , ( "weights", JE.list identity probs )
                ]


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

        EnName s ->
            ( "name", JE.string s )

        EnInteractive b ->
            ( "interactive", booSpec b )

        Custom s mProps ->
            ( s, JE.object (List.map markProperty mProps) )


eventHandlerSpec : List EventHandler -> Spec
eventHandlerSpec ehs =
    let
        eventHandler eh =
            case eh of
                EEvents ess ->
                    case ess of
                        [ es ] ->
                            ( "events", eventStreamSpec es )

                        _ ->
                            ( "events", JE.list eventStreamSpec ess )

                EUpdate s ->
                    if s == "" then
                        ( "update", JE.string "{}" )

                    else
                        ( "update", JE.string s )

                EEncode s ->
                    ( "encode", JE.string s )

                EForce b ->
                    ( "force", booSpec b )
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

        ESSignal esSig ->
            JE.object [ ( "signal", JE.string esSig ) ]

        ESMerge ess ->
            JE.object [ ( "merge", JE.list eventStreamSpec ess ) ]


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
                    ( "between", JE.list eventStreamObjectSpec [ ess1, ess2 ] )

                ESConsume b ->
                    ( "consume", booSpec b )

                ESFilter ex ->
                    case ex of
                        [ s ] ->
                            ( "filter", JE.string s )

                        _ ->
                            ( "filter", JE.list JE.string ex )

                ESDebounce n ->
                    ( "debounce", numSpec n )

                ESMarkName s ->
                    ( "markname", JE.string s )

                ESMark mk ->
                    ( "marktype", JE.string (markLabel mk) )

                ESThrottle n ->
                    ( "throttle", numSpec n )

                ESDerived evStream ->
                    ( "stream", eventStreamSpec evStream )
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
exprProperty ex =
    case ex of
        ExField f ->
            ( "field", JE.string f )

        Expr e ->
            ( "expr", expressionSpec e )


expressionSpec : String -> Spec
expressionSpec =
    -- TODO: Would be better to parse expressions for correctness
    JE.string


facetProperty : Facet -> LabelledSpec
facetProperty fct =
    case fct of
        FaName s ->
            ( "name", JE.string s )

        FaData s ->
            ( "data", strSpec s )

        FaField f ->
            ( "field", fieldSpec f )

        FaGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        FaAggregate aps ->
            ( "aggregate", JE.object (List.map aggregateProperty aps) )


fieldSpec : Field -> Spec
fieldSpec fVal =
    case fVal of
        FName fName ->
            JE.string fName

        FExpr ex ->
            strSpec (strExpr (expr ex))

        FSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        FDatum fv ->
            JE.object [ ( "datum", fieldSpec fv ) ]

        FGroup fv ->
            JE.object [ ( "group", fieldSpec fv ) ]

        FParent fv ->
            JE.object [ ( "parent", fieldSpec fv ) ]


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
            ( "forces", JE.list forceSpec forces )

        FsAs x y vx vy ->
            ( "as", JE.list JE.string [ x, y, vx, vy ] )


formatProperty : FormatProperty -> List LabelledSpec
formatProperty fmt =
    case fmt of
        JSON ->
            [ ( "type", JE.string "json" ) ]

        JSONProperty s ->
            [ ( "type", JE.string "json" ), ( "property", strSpec s ) ]

        CSV ->
            [ ( "type", JE.string "csv" ) ]

        TSV ->
            [ ( "type", JE.string "tsv" ) ]

        DSV s ->
            [ ( "type", JE.string "dsv" ), ( "delimiter", strSpec s ) ]

        TopojsonFeature s ->
            [ ( "type", JE.string "topojson" ), ( "feature", strSpec s ) ]

        TopojsonMesh s ->
            [ ( "type", JE.string "topojson" ), ( "mesh", strSpec s ) ]

        Parse fmts ->
            [ ( "parse", JE.object <| List.map (\( f, fm ) -> ( f, foDataTypeSpec fm )) fmts ) ]

        ParseAuto ->
            [ ( "parse", JE.string "auto" ) ]

        FormatPropertySignal sigName ->
            [ signalReferenceProperty sigName ]


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
            ( "links", strSpec s )

        FpId f ->
            ( "id", fieldSpec f )

        FpDistance n ->
            ( "distance", numSpec n )


forceSpec : Force -> Spec
forceSpec force =
    case force of
        FCenter fps ->
            JE.object (( "force", JE.string "center" ) :: List.map forceProperty fps)

        FCollide fps ->
            JE.object (( "force", JE.string "collide" ) :: List.map forceProperty fps)

        FNBody fps ->
            JE.object (( "force", JE.string "nbody" ) :: List.map forceProperty fps)

        FLink fps ->
            JE.object (( "force", JE.string "link" ) :: List.map forceProperty fps)

        FX f fps ->
            JE.object (( "force", JE.string "x" ) :: ( "x", fieldSpec f ) :: List.map forceProperty fps)

        FY f fps ->
            JE.object (( "force", JE.string "y" ) :: ( "y", fieldSpec f ) :: List.map forceProperty fps)


type FormulaUpdate
    = InitOnly
    | AlwaysUpdate


formulaUpdateSpec : FormulaUpdate -> Spec
formulaUpdateSpec update =
    case update of
        InitOnly ->
            JE.bool True

        AlwaysUpdate ->
            JE.bool False


geoJsonProperty : GeoJsonProperty -> LabelledSpec
geoJsonProperty gjProp =
    case gjProp of
        GjFields lng lat ->
            ( "fields", JE.list fieldSpec [ lng, lat ] )

        GjFeature f ->
            ( "geojson", fieldSpec f )

        GjSignal s ->
            ( "signal", JE.string s )


geoPathProperty : GeoPathProperty -> LabelledSpec
geoPathProperty gpProp =
    case gpProp of
        GeField f ->
            ( "field", fieldSpec f )

        GePointRadius n ->
            ( "pointRadius", numSpec n )

        GeAs s ->
            ( "as", JE.string s )


graticuleProperty : GraticuleProperty -> LabelledSpec
graticuleProperty grProp =
    case grProp of
        GrField f ->
            ( "field", fieldSpec f )

        GrExtentMajor n ->
            numArrayProperty 2 "extentMajor" n

        GrExtentMinor n ->
            numArrayProperty 2 "extentMinor" n

        GrExtent n ->
            numArrayProperty 2 "extentr" n

        GrStepMajor n ->
            numArrayProperty 2 "stepMajor" n

        GrStepMinor n ->
            numArrayProperty 2 "stepMinor" n

        GrStep n ->
            numArrayProperty 2 "step" n

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

        AlignSignal sig ->
            JE.object [ signalReferenceProperty sig ]


hAlignSpec : HAlign -> Spec
hAlignSpec align =
    case align of
        AlignLeft ->
            JE.string "left"

        AlignCenter ->
            JE.string "center"

        AlignRight ->
            JE.string "right"

        HAlignSignal sig ->
            JE.object [ signalReferenceProperty sig ]


imputeMethodLabel : ImputeMethod -> String
imputeMethodLabel im =
    case im of
        ByValue ->
            "value"

        ByMean ->
            "mean"

        ByMedian ->
            "median"

        ByMax ->
            "max"

        ByMin ->
            "min"


imputeProperty : ImputeProperty -> LabelledSpec
imputeProperty ip =
    case ip of
        ImKeyVals val ->
            ( "keyvals", valueSpec val )

        ImMethod m ->
            ( "method", JE.string (imputeMethodLabel m) )

        ImGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        ImValue val ->
            ( "value", valueSpec val )


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


joinAggregateProperty : JoinAggregateProperty -> LabelledSpec
joinAggregateProperty ap =
    case ap of
        JAGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        JAFields fs ->
            ( "fields", JE.list fieldSpec fs )

        JAOps ops ->
            ( "ops", JE.list opSpec ops )

        JAAs labels ->
            ( "as", JE.list JE.string labels )


layoutProperty : LayoutProperty -> LabelledSpec
layoutProperty prop =
    case prop of
        LAlign ga ->
            ( "align", gridAlignSpec ga )

        LBounds bc ->
            ( "bounds", boundsCalculationSpec bc )

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
            ( "type", legendTypeSpec lt )

        LeDirection o ->
            ( "direction", orientationSpec o )

        LeOrient lo ->
            ( "orient", legendOrientSpec lo )

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

        LeFormat s ->
            ( "format", strSpec s )

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

        LeFillColor s ->
            ( "fillColor", strSpec s )

        LeOffset val ->
            ( "offset", valueSpec val )

        LePadding val ->
            ( "padding", valueSpec val )

        LeStrokeColor s ->
            ( "strokeColor", strSpec s )

        LeStrokeWidth x ->
            ( "strokeWidth", numSpec x )

        LeGradientOpacity n ->
            ( "gradientOpacity", numSpec n )

        LeGradientLabelLimit x ->
            ( "gradientLabelLimit", numSpec x )

        LeGradientLabelOffset x ->
            ( "gradientLabelOffset", numSpec x )

        LeGradientLength x ->
            ( "gradientLength", numSpec x )

        LeGradientThickness x ->
            ( "gradientThickness", numSpec x )

        LeGradientStrokeColor s ->
            ( "gradientStrokeColor", strSpec s )

        LeGradientStrokeWidth x ->
            ( "gradientStrokeWidth", numSpec x )

        LeLabelAlign ha ->
            ( "labelAlign", hAlignSpec ha )

        LeLabelBaseline va ->
            ( "labelBaseline", vAlignSpec va )

        LeLabelColor s ->
            ( "labelColor", strSpec s )

        LeLabelOpacity n ->
            ( "labelOpacity", numSpec n )

        LeLabelFont s ->
            ( "labelFont", strSpec s )

        LeLabelFontSize x ->
            ( "labelFontSize", numSpec x )

        LeLabelFontWeight val ->
            ( "labelFontWeight", valueSpec val )

        LeLabelLimit x ->
            ( "labelLimit", numSpec x )

        LeLabelOffset x ->
            ( "labelOffset", numSpec x )

        LeLabelOverlap os ->
            ( "labelOverlap", overlapStrategySpec os )

        LeSymbolBaseFillColor s ->
            ( "symbolBaseFillColor", strSpec s )

        LeSymbolBaseStrokeColor s ->
            ( "symbolBaseStrokeColor", strSpec s )

        LeSymbolDirection o ->
            ( "symbolDirection", orientationSpec o )

        LeSymbolFillColor s ->
            ( "symbolFillColor", strSpec s )

        LeSymbolOffset x ->
            ( "symbolOffset", numSpec x )

        LeSymbolSize x ->
            ( "symbolSize", numSpec x )

        LeSymbolStrokeColor s ->
            ( "symbolStrokeColor", strSpec s )

        LeSymbolStrokeWidth x ->
            ( "symbolStokeWidth", numSpec x )

        LeSymbolOpacity n ->
            ( "symbolOpacity", numSpec n )

        LeSymbolType s ->
            ( "symbolType", symbolSpec s )

        LeTickCount n ->
            ( "tickCount", numSpec n )

        LeTemporalTickCount tu n ->
            case n of
                Num step ->
                    if step <= 0 then
                        ( "tickCount", timeUnitSpec tu )

                    else
                        ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                NumSignal _ ->
                    ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                NumExpr _ ->
                    ( "tickCount", JE.object [ ( "interval", timeUnitSpec tu ), ( "step", numSpec n ) ] )

                _ ->
                    ( "tickCount", timeUnitSpec tu )

        LeTitlePadding val ->
            ( "titlePadding", valueSpec val )

        LeTitle t ->
            ( "title", strSpec t )

        LeTitleAlign ha ->
            ( "titleAlign", hAlignSpec ha )

        LeTitleBaseline va ->
            ( "titleBaseline", vAlignSpec va )

        LeTitleColor s ->
            ( "titleColor", strSpec s )

        LeTitleFont s ->
            ( "titleFont", strSpec s )

        LeTitleFontSize x ->
            ( "titleFontSize", numSpec x )

        LeTitleFontWeight val ->
            ( "titleFontWeight", valueSpec val )

        LeTitleLimit x ->
            ( "titleLimit", numSpec x )

        LeTitleOpacity n ->
            ( "titleOpacity", numSpec n )

        LeValues vals ->
            ( "values", JE.list valueSpec vals )

        LeZIndex n ->
            ( "zindex", numSpec n )


legendOrientSpec : LegendOrientation -> Spec
legendOrientSpec orient =
    case orient of
        Left ->
            JE.string "left"

        TopLeft ->
            JE.string "top-left"

        Top ->
            JE.string "top"

        TopRight ->
            JE.string "top-right"

        Right ->
            JE.string "right"

        BottomRight ->
            JE.string "bottom-right"

        Bottom ->
            JE.string "bottom"

        BottomLeft ->
            JE.string "bottom-left"

        None ->
            JE.string "none"

        LegendOrientationSignal sig ->
            JE.object [ signalReferenceProperty sig ]


legendTypeSpec : LegendType -> Spec
legendTypeSpec lt =
    case lt of
        LSymbol ->
            JE.string "symbol"

        LGradient ->
            JE.string "gradient"

        LegendTypeSignal sig ->
            JE.object [ signalReferenceProperty sig ]


linkPathProperty : LinkPathProperty -> LabelledSpec
linkPathProperty lpProp =
    case lpProp of
        LPSourceX f ->
            ( "sourceX", fieldSpec f )

        LPSourceY f ->
            ( "sourceY", fieldSpec f )

        LPTargetX f ->
            ( "targetX", fieldSpec f )

        LPTargetY f ->
            ( "targetY", fieldSpec f )

        LPOrient o ->
            ( "orient", orientationSpec o )

        LPShape ls ->
            ( "shape", linkShapeSpec ls )

        LPRequire sig ->
            ( "require", JE.object [ ( "signal", JE.string sig ) ] )

        LPAs s ->
            ( "as", JE.string s )


linkShapeSpec : LinkShape -> Spec
linkShapeSpec ls =
    case ls of
        LinkLine ->
            JE.string "line"

        LinkArc ->
            JE.string "arc"

        LinkCurve ->
            JE.string "curve"

        LinkDiagonal ->
            JE.string "diagonal"

        LinkOrthogonal ->
            JE.string "orthogonal"

        LinkShapeSignal sig ->
            JE.object [ signalReferenceProperty sig ]


lookupProperty : LookupProperty -> LabelledSpec
lookupProperty luProp =
    case luProp of
        LValues fields ->
            ( "values", JE.list fieldSpec fields )

        LAs fields ->
            ( "as", JE.list JE.string fields )

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
            ( "yc", valRef vals )

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

        MStrokeJoin vals ->
            ( "strokeJoin", valRef vals )

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

        MCustom s vals ->
            ( s, valRef vals )


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
            JE.object [ ( "interval", timeUnitSpec tu ), ( "step", JE.int step ) ]

        NTrue ->
            JE.bool True

        NFalse ->
            JE.bool False

        NTickCount n ->
            JE.int n

        ScaleNiceSignal sig ->
            JE.object [ signalReferenceProperty sig ]


{-| For filtering Nums that represent a list of numbers of a given length.
Note that a signal can in in theory represent any value and cannot be validated
by elm, this is only partially type safe.
-}
numArrayProperty : Int -> String -> Num -> LabelledSpec
numArrayProperty len name n =
    case n of
        Nums ns ->
            if List.length ns == len then
                ( name, JE.list JE.float ns )

            else
                --|> Debug.log ("Warning: " ++ name ++ " expecting list of " ++ Debug.toString len ++ " numbers but was given " ++ Debug.toString ns)
                ( name, JE.null )

        NumSignal sig ->
            ( name, numSpec (NumSignal sig) )

        NumSignals sigs ->
            if List.length sigs == len then
                ( name, numSpec (NumSignals sigs) )

            else
                --|> Debug.log ("Warning: " ++ name ++ " expecting list of " ++ Debug.toString len ++ " signals but was given " ++ Debug.toString sigs)
                ( name, JE.null )

        NumList ns ->
            if List.length ns == len then
                ( name, JE.list numSpec ns )

            else
                --|> Debug.log ("Warning: " ++ name ++ " expecting list of " ++ Debug.toString len ++ " nums but was given " ++ Debug.toString ns)
                ( name, JE.null )

        _ ->
            --|> Debug.log ("Warning: " ++ name ++ " expecting list of 2 numbers but was given " ++ Debug.toString n)
            ( name, JE.null )


numSpec : Num -> Spec
numSpec nm =
    case nm of
        Num n ->
            JE.float n

        Nums ns ->
            JE.list JE.float ns

        NumSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        NumSignals sigs ->
            JE.list (\sig -> JE.object [ signalReferenceProperty sig ]) sigs

        NumExpr ex ->
            JE.object [ exprProperty ex ]

        NumList ns ->
            JE.list numSpec ns

        NumNull ->
            JE.null


opSpec : Operation -> Spec
opSpec op =
    case op of
        ArgMax ->
            JE.string "argmax"

        ArgMin ->
            JE.string "argmin"

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

        StdevP ->
            JE.string "stdevp"

        Sum ->
            JE.string "sum"

        Stderr ->
            JE.string "stderr"

        Valid ->
            JE.string "valid"

        Variance ->
            JE.string "variance"

        VarianceP ->
            JE.string "variancep"

        OperationSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


orderSpec : Order -> Spec
orderSpec order =
    case order of
        Ascend ->
            JE.string "ascending"

        Descend ->
            JE.string "descending"

        OrderSignal sig ->
            JE.object [ signalReferenceProperty sig ]


orientationSpec : Orientation -> Spec
orientationSpec orient =
    case orient of
        Horizontal ->
            JE.string "horizontal"

        Vertical ->
            JE.string "vertical"

        Radial ->
            JE.string "radial"

        OrientationSignal sig ->
            JE.object [ signalReferenceProperty sig ]


overlapStrategySpec : OverlapStrategy -> Spec
overlapStrategySpec strat =
    case strat of
        ONone ->
            JE.string "false"

        OParity ->
            JE.string "parity"

        OGreedy ->
            JE.string "greedy"

        OverlapStrategySignal sig ->
            JE.object [ signalReferenceProperty sig ]


packProperty : PackProperty -> LabelledSpec
packProperty pp =
    case pp of
        PaField f ->
            ( "field", fieldSpec f )

        PaSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        PaSize n ->
            numArrayProperty 2 "size" n

        PaRadius fOrNull ->
            case fOrNull of
                Just f ->
                    ( "radius", fieldSpec f )

                Nothing ->
                    ( "radius", JE.null )

        PaPadding padSize ->
            ( "padding", numSpec padSize )

        PaAs x y r depth children ->
            ( "as", JE.list JE.string [ x, y, r, depth, children ] )


partitionProperty : PartitionProperty -> LabelledSpec
partitionProperty pp =
    case pp of
        PtField f ->
            ( "field", fieldSpec f )

        PtSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        PtPadding n ->
            ( "padding", numSpec n )

        PtRound b ->
            ( "round", booSpec b )

        PtSize n ->
            numArrayProperty 2 "size" n

        PtAs x0 y0 x1 y1 depth children ->
            ( "as", JE.list JE.string [ x0, y0, x1, y1, depth, children ] )


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
            ( "as", JE.list JE.string [ y0, y1 ] )


pivotProperty : PivotProperty -> LabelledSpec
pivotProperty pp =
    case pp of
        PiGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        PiLimit n ->
            ( "limit", numSpec n )

        PiOp o ->
            ( "op", opSpec o )


projectionLabel : Projection -> String
projectionLabel pr =
    case pr of
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
            "conicEqualArea"

        ConicEquidistant ->
            "conicEquidistant"

        Equirectangular ->
            "equirectangular"

        Gnomonic ->
            "gnomonic"

        Mercator ->
            "mercator"

        NaturalEarth1 ->
            "naturalEarth1"

        Orthographic ->
            "orthographic"

        Stereographic ->
            "stereographic"

        TransverseMercator ->
            "transverseMercator"

        Proj s ->
            --|> Debug.log ("Warning: Attempting to set projection type to " ++ strString s)
            ""

        ProjectionSignal sig ->
            --|> Debug.log ("Warning: Attempting to set projection type to " ++ sig)
            ""


projectionProperty : ProjectionProperty -> LabelledSpec
projectionProperty projProp =
    case projProp of
        PrType pType ->
            ( "type", projectionSpec pType )

        PrClipAngle nm ->
            case nm of
                Num n ->
                    if n == 0 then
                        -- Anitmeridian cutting
                        ( "clipAngle", JE.null )

                    else
                        ( "clipAngle", JE.float n )

                _ ->
                    ( "clipAngle", numSpec nm )

        PrClipExtent n ->
            case n of
                Nums [ x0, y0, x1, y1 ] ->
                    ( "clipExtent", JE.list (JE.list JE.float) [ [ x0, y0 ], [ x1, y1 ] ] )

                NumSignal sig ->
                    ( "clipExtent", numSpec (NumSignal sig) )

                NumSignals [ sigX0, sigY0, sigX1, sigY1 ] ->
                    ( "clipExtent", JE.list numSpec [ NumSignals [ sigX0, sigY0 ], NumSignals [ sigX1, sigY1 ] ] )

                _ ->
                    --|> Debug.log ("Warning: prClipExtent expecting list of 4 numbers but was given " ++ Debug.toString n)
                    ( "clipExtent", JE.null )

        PrScale n ->
            ( "scale", numSpec n )

        PrTranslate n ->
            numArrayProperty 2 "translate" n

        PrCenter n ->
            ( "center", numSpec n )

        PrRotate n ->
            case n of
                Nums [ lambda, phi ] ->
                    ( "rotate", JE.list JE.float [ lambda, phi ] )

                Nums [ lambda, phi, gamma ] ->
                    ( "rotate", JE.list JE.float [ lambda, phi, gamma ] )

                NumSignal sig ->
                    ( "rotate", numSpec (NumSignal sig) )

                NumSignals [ sigLambda, sigPhi ] ->
                    ( "rotate", numSpec (NumSignals [ sigLambda, sigPhi ]) )

                NumSignals [ sigLambda, sigPhi, sigGamma ] ->
                    ( "rotate", numSpec (NumSignals [ sigLambda, sigPhi, sigGamma ]) )

                NumList [ numLambda, numPhi ] ->
                    ( "rotate", numSpec (NumList [ numLambda, numPhi ]) )

                NumList [ numLambda, numPhi, numGamma ] ->
                    ( "rotate", numSpec (NumList [ numLambda, numPhi, numGamma ]) )

                _ ->
                    --|> Debug.log ("Warning: prRotate expecting list of 2 or 3 numbers but was given " ++ Debug.toString n)
                    ( "rotate", JE.null )

        PrPointRadius n ->
            ( "pointRadius", numSpec n )

        PrPrecision n ->
            ( "precision", numSpec n )

        PrFit feat ->
            case feat of
                FeName s ->
                    ( "fit", JE.object [ ( "signal", JE.string ("data('" ++ s ++ "')") ) ] )

                FeatureSignal s ->
                    ( "fit", JE.object [ ( "signal", JE.string s ) ] )

        PrExtent n ->
            case n of
                Nums [ x0, y0, x1, y1 ] ->
                    ( "extent", JE.list (JE.list JE.float) [ [ x0, y0 ], [ x1, y1 ] ] )

                NumSignal sig ->
                    ( "extent", numSpec (NumSignal sig) )

                NumSignals [ sigX0, sigY0, sigX1, sigY1 ] ->
                    ( "extent", JE.list numSpec [ NumSignals [ sigX0, sigY0 ], NumSignals [ sigX1, sigY1 ] ] )

                _ ->
                    --|> Debug.log ("Warning: prExtent expecting list of 4 numbers but was given " ++ Debug.toString n)
                    ( "extent", JE.null )

        PrSize n ->
            numArrayProperty 2 "size" n

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


projectionSpec : Projection -> Spec
projectionSpec proj =
    case proj of
        Proj s ->
            strSpec s

        ProjectionSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        _ ->
            JE.string (projectionLabel proj)


scaleDomainSpec : ScaleDomain -> Spec
scaleDomainSpec sdType =
    case sdType of
        DoNums ns ->
            numSpec ns

        DoStrs cats ->
            strSpec cats

        DoData dataRef ->
            JE.object (List.map dataRefProperty dataRef)


scaleSpec : Scale -> Spec
scaleSpec sct =
    case sct of
        ScLinear ->
            JE.string "linear"

        ScPow ->
            JE.string "pow"

        ScSqrt ->
            JE.string "sqrt"

        ScLog ->
            JE.string "log"

        ScSymLog ->
            JE.string "symlog"

        ScTime ->
            JE.string "time"

        ScUtc ->
            JE.string "utc"

        ScSequential ->
            JE.string "sequential"

        ScOrdinal ->
            JE.string "ordinal"

        ScBand ->
            JE.string "band"

        ScPoint ->
            JE.string "point"

        ScBinOrdinal ->
            JE.string "bin-ordinal"

        ScQuantile ->
            JE.string "quantile"

        ScQuantize ->
            JE.string "quantize"

        ScThreshold ->
            JE.string "threshold"

        ScCustom s ->
            JE.string s

        ScaleSignal sig ->
            JE.object [ signalReferenceProperty sig ]


scaleProperty : ScaleProperty -> LabelledSpec
scaleProperty scaleProp =
    case scaleProp of
        SType sType ->
            ( "type", scaleSpec sType )

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
                RaNums xs ->
                    ( "range", JE.list JE.float xs )

                RaStrs ss ->
                    ( "range", JE.list JE.string ss )

                RaValues vals ->
                    ( "range", JE.list valueSpec vals )

                RaSignal sig ->
                    ( "range", JE.object [ signalReferenceProperty sig ] )

                RaScheme name options ->
                    ( "range", JE.object (List.map schemeProperty (SScheme name :: options)) )

                RaData dRefs ->
                    ( "range", JE.object (List.map dataRefProperty dRefs) )

                RaStep val ->
                    ( "range", JE.object [ ( "step", valueSpec val ) ] )

                RaWidth ->
                    ( "range", JE.string "width" )

                RaHeight ->
                    ( "range", JE.string "height" )

                RaSymbol ->
                    ( "range", JE.string "symbol" )

                RaCategory ->
                    ( "range", JE.string "category" )

                RaDiverging ->
                    ( "range", JE.string "diverging" )

                RaOrdinal ->
                    ( "range", JE.string "ordinal" )

                RaRamp ->
                    ( "range", JE.string "ramp" )

                RaHeatmap ->
                    ( "range", JE.string "heatmap" )

                RaCustom name ->
                    ( "range", JE.string name )

        SBins bsProps ->
            case bsProps of
                BnsNums ns ->
                    ( "bins", numSpec ns )

                BnsSignal sig ->
                    ( "bins", JE.object [ signalReferenceProperty sig ] )

                BnsBins step options ->
                    ( "bins", JE.object (List.map binsProperty (BnsStep step :: options)) )

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

        SConstant x ->
            ( "constant", numSpec x )

        SBase x ->
            ( "base", numSpec x )

        SAlign x ->
            ( "align", numSpec x )

        SDomainImplicit b ->
            ( "domainImplicit", booSpec b )


schemeProperty : ColorSchemeProperty -> LabelledSpec
schemeProperty sProps =
    case sProps of
        SScheme s ->
            ( "scheme", strSpec s )

        SCount n ->
            ( "count", numSpec n )

        SExtent n ->
            numArrayProperty 2 "extent" n


sideSpec : Side -> Spec
sideSpec orient =
    case orient of
        SLeft ->
            JE.string "left"

        SBottom ->
            JE.string "bottom"

        SRight ->
            JE.string "right"

        STop ->
            JE.string "top"

        SideSignal sig ->
            JE.object [ signalReferenceProperty sig ]


signalProperty : SignalProperty -> LabelledSpec
signalProperty sigProp =
    case sigProp of
        SiName s ->
            ( "name", JE.string s )

        SiBind bd ->
            bindingProperty bd

        SiDescription s ->
            ( "description", JE.string s )

        SiInit ex ->
            ( "init", expressionSpec ex )

        SiUpdate ex ->
            ( "update", expressionSpec ex )

        SiOn ehs ->
            ( "on", JE.list eventHandlerSpec ehs )

        SiReact b ->
            ( "react", booSpec b )

        SiValue v ->
            ( "value", valueSpec v )

        SiPushOuter ->
            ( "push", JE.string "outer" )


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

        ByField f ->
            ( "field", strSpec f )

        Op op ->
            ( "op", opSpec op )

        SortPropertySignal sig ->
            ( "order", JE.object [ signalReferenceProperty sig ] )


sourceProperty : Source -> LabelledSpec
sourceProperty src =
    case src of
        SData sName ->
            ( "data", strSpec sName )

        SFacet d name fcts ->
            ( "facet", JE.object (List.map facetProperty (FaData d :: FaName name :: fcts)) )


spiralSpec : Spiral -> Spec
spiralSpec sp =
    case sp of
        Archimedean ->
            JE.string "archimedean"

        Rectangular ->
            JE.string "rectangular"

        SpiralSignal sig ->
            JE.object [ signalReferenceProperty sig ]


stackOffsetSpec : StackOffset -> Spec
stackOffsetSpec off =
    case off of
        OfZero ->
            JE.string "zero"

        OfCenter ->
            JE.string "center"

        OfNormalize ->
            JE.string "normalize"

        StackOffsetSignal sig ->
            JE.object [ signalReferenceProperty sig ]


stackProperty : StackProperty -> LabelledSpec
stackProperty sp =
    case sp of
        StField f ->
            ( "field", fieldSpec f )

        StGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        StSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        StOffset off ->
            ( "offset", stackOffsetSpec off )

        StAs y0 y1 ->
            ( "as", JE.list JE.string [ y0, y1 ] )


strSpec : Str -> Spec
strSpec string =
    case string of
        Str s ->
            JE.string s

        Strs ss ->
            JE.list JE.string ss

        StrList ss ->
            JE.list strSpec ss

        StrSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        StrSignals sigs ->
            JE.list (\sig -> JE.object [ signalReferenceProperty sig ]) sigs

        StrExpr ex ->
            JE.object [ exprProperty ex ]

        StrNull ->
            JE.null


symbolSpec : Symbol -> Spec
symbolSpec sym =
    case sym of
        SymbolSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        _ ->
            JE.string (symbolLabel sym)


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

        SymbolSignal sig ->
            --|> Debug.log "Warning: Attempting to provide a signal name to signalValue"
            sig


teMethodSpec : TreeMethod -> Spec
teMethodSpec m =
    case m of
        Tidy ->
            JE.string "tidy"

        Cluster ->
            JE.string "cluster"

        TreeMethodSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


timeUnitSpec : TimeUnit -> Spec
timeUnitSpec tUnit =
    let
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

                -- Utc timeUnit ->
                --     "utc" ++ timeUnitLabel timeUnit
                TimeUnitSignal sig ->
                    ""

        -- This will never be called
    in
    case tUnit of
        TimeUnitSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        _ ->
            JE.string (timeUnitLabel tUnit)


titleFrameSpec : TitleFrame -> Spec
titleFrameSpec tf =
    case tf of
        FrGroup ->
            JE.string "group"

        FrBounds ->
            JE.string "bounds"

        TitleFrameSignal sig ->
            JE.object [ signalReferenceProperty sig ]


titleProperty : TitleProperty -> LabelledSpec
titleProperty tProp =
    case tProp of
        TText s ->
            ( "text", strSpec s )

        TOrient s ->
            ( "orient", sideSpec s )

        TAlign ha ->
            ( "align", hAlignSpec ha )

        TAnchor a ->
            ( "anchor", anchorSpec a )

        TAngle n ->
            ( "angle", numSpec n )

        TBaseline va ->
            ( "baseline", vAlignSpec va )

        TColor s ->
            ( "color", strSpec s )

        TEncode eps ->
            ( "encode", JE.object (List.map encodingProperty eps) )

        TFont s ->
            ( "font", strSpec s )

        TFontSize n ->
            ( "fontSize", numSpec n )

        TFontWeight v ->
            ( "fontWeight", valueSpec v )

        TFrame fr ->
            ( "fame", titleFrameSpec fr )

        TInteractive b ->
            ( "interactive", booSpec b )

        TLimit n ->
            ( "limit", numSpec n )

        TName s ->
            ( "name", JE.string s )

        TStyle s ->
            ( "style", strSpec s )

        TOffset n ->
            ( "offset", numSpec n )

        TZIndex n ->
            ( "zindex", numSpec n )


tmMethodSpec : TreemapMethod -> Spec
tmMethodSpec m =
    case m of
        TmSquarify ->
            JE.string "squarify"

        TmResquarify ->
            JE.string "resquarify"

        TmBinary ->
            JE.string "binary"

        TmDice ->
            JE.string "dice"

        TmSlice ->
            JE.string "slice"

        TmSliceDice ->
            JE.string "slicedice"

        TmSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


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
            [ ( "on", JE.list identity triggers ) ]

        MRole s ->
            [ ( "role", JE.string s ) ]

        MSort comp ->
            [ ( "sort", JE.object (comparatorProperties comp) ) ]

        MTransform trans ->
            [ ( "transform", JE.list transformSpec trans ) ]

        MStyle ss ->
            [ ( "style", JE.list JE.string ss ) ]

        MGroup props ->
            List.map (\( vProp, spec ) -> ( vPropertyLabel vProp, spec )) props

        MTopZIndex n ->
            [ ( "zindex", numSpec n ) ]


transformSpec : Transform -> Spec
transformSpec trans =
    case trans of
        TAggregate aps ->
            JE.object (( "type", JE.string "aggregate" ) :: List.map aggregateProperty aps)

        TBin f extent bps ->
            let
                extSpec =
                    case extent of
                        Num _ ->
                            --|> Debug.log ("trBin expecting an extent list but was given " ++ Debug.toString extent)
                            JE.null

                        _ ->
                            numSpec extent
            in
            JE.object
                (( "type", JE.string "bin" )
                    :: ( "field", fieldSpec f )
                    :: ( "extent", extSpec )
                    :: List.map binProperty bps
                )

        TCollect comp ->
            JE.object [ ( "type", JE.string "collect" ), ( "sort", JE.object (comparatorProperties comp) ) ]

        TCountPattern f cpps ->
            JE.object
                (( "type", JE.string "countpattern" )
                    :: ( "field", fieldSpec f )
                    :: List.map countPatternProperty cpps
                )

        TCross cps ->
            JE.object (( "type", JE.string "cross" ) :: List.map crossProperty cps)

        TCrossFilter tuples ->
            let
                ( fs, ns ) =
                    List.unzip tuples
            in
            JE.object
                [ ( "type", JE.string "crossfilter" )
                , ( "fields", JE.list fieldSpec fs )
                , ( "query", JE.list numSpec ns )
                ]

        TCrossFilterAsSignal tuples s ->
            let
                ( fs, ns ) =
                    List.unzip tuples
            in
            JE.object
                [ ( "type", JE.string "crossfilter" )
                , ( "fields", JE.list fieldSpec fs )
                , ( "query", JE.list numSpec ns )
                , ( "signal", JE.string s )
                ]

        TDensity dist dnps ->
            JE.object
                (( "type", JE.string "density" )
                    :: ( "distribution", distributionSpec dist )
                    :: List.map densityProperty dnps
                )

        TExtent f ->
            JE.object
                [ ( "type", JE.string "extent" )
                , ( "field", fieldSpec f )
                ]

        TExtentAsSignal f sigName ->
            JE.object
                [ ( "type", JE.string "extent" )
                , ( "field", fieldSpec f )
                , ( "signal", JE.string sigName )
                ]

        TFilter ex ->
            JE.object [ ( "type", JE.string "filter" ), exprProperty ex ]

        TFlatten fs ->
            JE.object [ ( "type", JE.string "flatten" ), ( "fields", JE.list fieldSpec fs ) ]

        TFlattenAs fs ss ->
            JE.object
                [ ( "type", JE.string "flatten" )
                , ( "fields", JE.list fieldSpec fs )
                , ( "as", JE.list JE.string ss )
                ]

        TFold fs ->
            case fs of
                [ f ] ->
                    JE.object [ ( "type", JE.string "fold" ), ( "fields", fieldSpec f ) ]

                _ ->
                    JE.object [ ( "type", JE.string "fold" ), ( "fields", JE.list fieldSpec fs ) ]

        TFoldAs fs k v ->
            case fs of
                [ f ] ->
                    JE.object
                        [ ( "type", JE.string "fold" )
                        , ( "fields", fieldSpec f )
                        , ( "as", JE.list JE.string [ k, v ] )
                        ]

                _ ->
                    JE.object
                        [ ( "type", JE.string "fold" )
                        , ( "fields", JE.list fieldSpec fs )
                        , ( "as", JE.list JE.string [ k, v ] )
                        ]

        TFormula ex name update ->
            JE.object
                [ ( "type", JE.string "formula" )
                , ( "expr", expressionSpec ex )
                , ( "as", JE.string name )
                , ( "initonly", formulaUpdateSpec update )
                ]

        TIdentifier s ->
            JE.object [ ( "type", JE.string "identifier" ), ( "as", JE.string s ) ]

        TImpute f key ips ->
            JE.object
                (( "type", JE.string "impute" )
                    :: ( "field", fieldSpec f )
                    :: ( "key", fieldSpec key )
                    :: List.map imputeProperty ips
                )

        TJoinAggregate japs ->
            JE.object
                (( "type", JE.string "joinaggregate" )
                    :: List.map joinAggregateProperty japs
                )

        TLookup from key fields lups ->
            JE.object
                (( "type", JE.string "lookup" )
                    :: ( "from", JE.string from )
                    :: ( "key", fieldSpec key )
                    :: ( "fields", JE.list fieldSpec fields )
                    :: List.map lookupProperty lups
                )

        TPivot f v pps ->
            JE.object
                (( "type", JE.string "pivot" )
                    :: ( "field", fieldSpec f )
                    :: ( "value", fieldSpec v )
                    :: List.map pivotProperty pps
                )

        TProject fns ->
            let
                ( fields, names ) =
                    List.unzip fns
            in
            JE.object
                [ ( "type", JE.string "project" )
                , ( "fields", JE.list fieldSpec fields )
                , ( "as", JE.list JE.string names )
                ]

        TSample n ->
            JE.object [ ( "type", JE.string "sample" ), ( "size", numSpec n ) ]

        TSequence start stop step ->
            let
                stepProp =
                    case step of
                        NumNull ->
                            []

                        Num n ->
                            if n == 0 then
                                []

                            else
                                [ ( "step", numSpec step ) ]

                        Nums [] ->
                            []

                        NumList [] ->
                            []

                        _ ->
                            [ ( "step", numSpec step ) ]
            in
            JE.object
                ([ ( "type", JE.string "sequence" )
                 , ( "start", numSpec start )
                 , ( "stop", numSpec stop )
                 ]
                    ++ stepProp
                )

        TSequenceAs start stop step out ->
            let
                stepProp =
                    case step of
                        NumNull ->
                            []

                        Num n ->
                            if n == 0 then
                                []

                            else
                                [ ( "step", numSpec step ) ]

                        Nums [] ->
                            []

                        NumList [] ->
                            []

                        _ ->
                            [ ( "step", numSpec step ) ]
            in
            JE.object
                ([ ( "type", JE.string "sequence" )
                 , ( "start", numSpec start )
                 , ( "stop", numSpec stop )
                 , ( "as", JE.string out )
                 ]
                    ++ stepProp
                )

        TWindow wos wps ->
            JE.object
                (( "type", JE.string "window" )
                    :: windowOperationProperties wos
                    ++ List.map windowProperty wps
                )

        TContour x y cps ->
            JE.object
                (( "type", JE.string "contour" )
                    :: ( "size", JE.list numSpec [ x, y ] )
                    :: List.map contourProperty cps
                )

        TGeoJson gjps ->
            JE.object
                (( "type", JE.string "geojson" )
                    :: List.map geoJsonProperty gjps
                )

        TGeoPath pName gpps ->
            case pName of
                "" ->
                    JE.object
                        (( "type", JE.string "geopath" )
                            :: List.map geoPathProperty gpps
                        )

                _ ->
                    JE.object
                        (( "type", JE.string "geopath" )
                            :: ( "projection", JE.string pName )
                            :: List.map geoPathProperty gpps
                        )

        TGeoPoint pName fLon fLat ->
            JE.object
                [ ( "type", JE.string "geopoint" )
                , ( "projection", JE.string pName )
                , ( "fields", JE.list fieldSpec [ fLon, fLat ] )
                ]

        TGeoPointAs pName fLon fLat asLon asLat ->
            JE.object
                [ ( "type", JE.string "geopoint" )
                , ( "projection", JE.string pName )
                , ( "fields", JE.list fieldSpec [ fLon, fLat ] )
                , ( "as", JE.list JE.string [ asLon, asLat ] )
                ]

        TGeoShape pName gsps ->
            case pName of
                "" ->
                    JE.object
                        (( "type", JE.string "geoshape" )
                            :: List.map geoPathProperty gsps
                        )

                _ ->
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

        TVoronoi x y vps ->
            JE.object
                (( "type", JE.string "voronoi" )
                    :: ( "x", fieldSpec x )
                    :: ( "y", fieldSpec y )
                    :: List.map voronoiProperty vps
                )

        TWordcloud wcps ->
            JE.object (( "type", JE.string "wordcloud" ) :: List.map wordcloudProperty wcps)

        TNest fs b ->
            JE.object
                [ ( "type", JE.string "nest" )
                , ( "keys", JE.list fieldSpec fs )
                , ( "generate", booSpec b )
                ]

        TStratify key parent ->
            JE.object
                [ ( "type", JE.string "stratify" )
                , ( "key", fieldSpec key )
                , ( "parentKey", fieldSpec parent )
                ]

        TTreeLinks ->
            JE.object [ ( "type", JE.string "treelinks" ) ]

        TPack pps ->
            JE.object (( "type", JE.string "pack" ) :: List.map packProperty pps)

        TPartition pps ->
            JE.object (( "type", JE.string "partition" ) :: List.map partitionProperty pps)

        TTree tps ->
            JE.object (( "type", JE.string "tree" ) :: List.map treeProperty tps)

        TTreemap tps ->
            JE.object (( "type", JE.string "treemap" ) :: List.map treemapProperty tps)

        TResolveFilter sig bitmask ->
            JE.object
                [ ( "type", JE.string "resolvefilter" )
                , ( "filter", JE.object [ ( "signal", JE.string sig ) ] )
                , ( "ignore", numSpec bitmask )
                ]


transpose : List (List a) -> List (List a)
transpose xss =
    let
        numCols =
            List.head >> Maybe.withDefault [] >> List.length
    in
    List.foldr (List.map2 (::)) (List.repeat (numCols xss) []) xss


treemapProperty : TreemapProperty -> LabelledSpec
treemapProperty tp =
    case tp of
        TmField f ->
            ( "field", fieldSpec f )

        TmSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        TmMethod m ->
            ( "method", tmMethodSpec m )

        TmPadding n ->
            ( "padding", numSpec n )

        TmPaddingInner n ->
            ( "paddingInner", numSpec n )

        TmPaddingOuter n ->
            ( "paddingOuter", numSpec n )

        TmPaddingTop n ->
            ( "paddingTop", numSpec n )

        TmPaddingRight n ->
            ( "paddingRight", numSpec n )

        TmPaddingBottom n ->
            ( "paddingBottom", numSpec n )

        TmPaddingLeft n ->
            ( "paddingLeft", numSpec n )

        TmRatio n ->
            ( "ratio", numSpec n )

        TmRound b ->
            ( "round", booSpec b )

        TmSize n ->
            numArrayProperty 2 "size" n

        TmAs x0 y0 x1 y1 depth children ->
            ( "as", JE.list JE.string [ x0, y0, x1, y1, depth, children ] )


treeProperty : TreeProperty -> LabelledSpec
treeProperty tp =
    case tp of
        TeField f ->
            ( "field", fieldSpec f )

        TeSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        TeMethod m ->
            ( "method", teMethodSpec m )

        TeSize n ->
            numArrayProperty 2 "size" n

        TeSeparation b ->
            ( "separation", booSpec b )

        TeNodeSize n ->
            numArrayProperty 2 "nodeSize" n

        TeAs x y depth children ->
            ( "as", JE.list JE.string [ x, y, depth, children ] )


triggerProperties : TriggerProperty -> List LabelledSpec
triggerProperties trans =
    case trans of
        TgTrigger ex ->
            [ ( "trigger", expressionSpec ex ) ]

        TgInsert ex ->
            [ ( "insert", expressionSpec ex ) ]

        TgRemove ex ->
            [ ( "remove", expressionSpec ex ) ]

        TgRemoveAll ->
            [ ( "remove", JE.bool True ) ]

        TgToggle ex ->
            [ ( "toggle", expressionSpec ex ) ]

        -- Note the one-to-many relation between this trigger property and the labelled specs it generates.
        TgModifyValues modExpr valExpr ->
            [ ( "modify", expressionSpec modExpr ), ( "values", expressionSpec valExpr ) ]


valIfElse : String -> List Value -> List Value -> List Spec -> List Spec
valIfElse ex ifVals elseVals ifSpecs =
    case elseVals of
        [ VIfElse ex2 ifVals2 elseVals2 ] ->
            valIfElse ex2 ifVals2 elseVals2 (ifSpecs ++ [ JE.object (( "test", JE.string ex2 ) :: List.concatMap valueProperties ifVals2) ])

        _ ->
            ifSpecs ++ [ valRef elseVals ]


vAlignSpec : VAlign -> Spec
vAlignSpec align =
    case align of
        AlignTop ->
            JE.string "top"

        AlignMiddle ->
            JE.string "middle"

        AlignBottom ->
            JE.string "bottom"

        Alphabetic ->
            JE.string "alphabetic"

        VAlignSignal sig ->
            JE.object [ signalReferenceProperty sig ]


valRef : List Value -> Spec
valRef vs =
    case vs of
        [ VIfElse ex ifs elses ] ->
            JE.list identity (valIfElse ex ifs elses [ JE.object (( "test", JE.string ex ) :: List.concatMap valueProperties ifs) ])

        _ ->
            JE.object (List.concatMap valueProperties vs)


valueProperties : Value -> List LabelledSpec
valueProperties val =
    case val of
        VStr s ->
            [ ( "value", JE.string s ) ]

        VStrs ss ->
            [ ( "value", JE.list JE.string ss ) ]

        VSignal sig ->
            [ signalReferenceProperty sig ]

        VColor cVal ->
            [ colorProperty cVal ]

        VField fVal ->
            [ ( "field", fieldSpec fVal ) ]

        VScale fVal ->
            [ ( "scale", fieldSpec fVal ) ]

        VKeyValue key v ->
            [ ( key, valueSpec v ) ]

        VBand n ->
            [ ( "band", numSpec n ) ]

        VExponent v ->
            [ ( "exponent", valueSpec v ) ]

        VMultiply v ->
            [ ( "mult", valueSpec v ) ]

        VOffset v ->
            [ ( "offset", valueSpec v ) ]

        VRound b ->
            [ ( "round", booSpec b ) ]

        VNum n ->
            [ ( "value", JE.float n ) ]

        VNums ns ->
            [ ( "value", JE.list JE.float ns ) ]

        VObject vals ->
            [ ( "value", JE.object (List.concatMap valueProperties vals) ) ]

        Values vals ->
            [ ( "value", JE.list valueSpec vals ) ]

        VBoo b ->
            [ ( "value", JE.bool b ) ]

        VBoos bs ->
            [ ( "value", JE.list JE.bool bs ) ]

        VNull ->
            [ ( "value", JE.null ) ]

        VIfElse ex ifs elses ->
            ( "test", JE.string ex ) :: List.concatMap valueProperties ifs


valueSpec : Value -> Spec
valueSpec val =
    case val of
        VStr s ->
            JE.string s

        VStrs ss ->
            JE.list JE.string ss

        VSignal sig ->
            JE.object [ signalReferenceProperty sig ]

        VColor cVal ->
            JE.object [ colorProperty cVal ]

        VField fName ->
            fieldSpec fName

        VScale fName ->
            fieldSpec fName

        VBand n ->
            JE.object [ ( "band", numSpec n ) ]

        VExponent v ->
            JE.object [ ( "exponent", valueSpec v ) ]

        VMultiply v ->
            JE.object [ ( "mult", valueSpec v ) ]

        VOffset v ->
            JE.object [ ( "offset", valueSpec v ) ]

        VRound b ->
            JE.object [ ( "round", booSpec b ) ]

        VNum n ->
            JE.float n

        VNums ns ->
            JE.list JE.float ns

        VKeyValue key v ->
            JE.object [ ( key, valueSpec v ) ]

        VObject objs ->
            JE.object (List.concatMap valueProperties objs)

        Values objs ->
            JE.list valueSpec objs

        VBoo b ->
            JE.bool b

        VBoos bs ->
            JE.list JE.bool bs

        VNull ->
            JE.null

        VIfElse _ _ _ ->
            JE.null


voronoiProperty : VoronoiProperty -> LabelledSpec
voronoiProperty vp =
    let
        numPairSpec ns =
            case ns of
                Nums [ _, _ ] ->
                    numSpec ns

                NumSignal _ ->
                    numSpec ns

                NumSignals [ _, _ ] ->
                    numSpec ns

                NumList [ _, _ ] ->
                    numSpec ns

                _ ->
                    --|> Debug.log ("Warning: voProperty expecting list of 2 numbers but was given " ++ Debug.toString ns)
                    JE.null
    in
    case vp of
        VoExtent tl br ->
            ( "extent", JE.list numPairSpec [ tl, br ] )

        VoSize sz ->
            ( "size", numPairSpec sz )

        VoAs s ->
            ( "as", JE.string s )


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


windowOperationProperties : List WindowOperation -> List LabelledSpec
windowOperationProperties wos =
    let
        windowOpSpec wo =
            case wo of
                WnOperation wOp _ _ _ ->
                    wOperationSpec wOp

                WnAggOperation aOp _ _ _ ->
                    opSpec aOp

        windowParamSpec wo =
            case wo of
                WnOperation _ mn _ _ ->
                    case mn of
                        Just n ->
                            numSpec n

                        Nothing ->
                            JE.null

                WnAggOperation _ mn _ _ ->
                    case mn of
                        Just n ->
                            numSpec n

                        Nothing ->
                            JE.null

        windowFieldSpec wo =
            case wo of
                WnOperation _ _ mf _ ->
                    case mf of
                        Just f ->
                            fieldSpec f

                        Nothing ->
                            JE.null

                WnAggOperation _ _ mf _ ->
                    case mf of
                        Just f ->
                            fieldSpec f

                        Nothing ->
                            JE.null

        windowAsSpec wo =
            case wo of
                WnOperation _ _ _ s ->
                    JE.string s

                WnAggOperation _ _ _ s ->
                    JE.string s
    in
    [ ( "ops", JE.list windowOpSpec wos )
    , ( "params", JE.list windowParamSpec wos )
    , ( "fields", JE.list windowFieldSpec wos )
    , ( "as", JE.list windowAsSpec wos )
    ]


wOperationSpec : WOperation -> Spec
wOperationSpec wnOp =
    case wnOp of
        RowNumber ->
            JE.string "row_number"

        Rank ->
            JE.string "rank"

        DenseRank ->
            JE.string "dense_rank"

        PercentRank ->
            JE.string "percent_rank"

        CumeDist ->
            JE.string "cume_dist"

        Ntile ->
            JE.string "ntile"

        Lag ->
            JE.string "lag"

        Lead ->
            JE.string "lead"

        FirstValue ->
            JE.string "first_value"

        LastValue ->
            JE.string "last_value"

        NthValue ->
            JE.string "nth_value"

        WOperationSignal sigName ->
            JE.object [ signalReferenceProperty sigName ]


windowProperty : WindowProperty -> LabelledSpec
windowProperty wp =
    case wp of
        WnSort comp ->
            ( "sort", JE.object (comparatorProperties comp) )

        WnGroupBy fs ->
            ( "groupby", JE.list fieldSpec fs )

        WnFrame n ->
            numArrayProperty 2 "frame" n

        WnIgnorePeers b ->
            ( "ignorePeers", booSpec b )


wordcloudProperty : WordcloudProperty -> LabelledSpec
wordcloudProperty wcp =
    case wcp of
        WcFont s ->
            ( "font", strSpec s )

        WcFontStyle s ->
            ( "fontStyle", strSpec s )

        WcFontWeight s ->
            ( "fontWeight", strSpec s )

        WcFontSize n ->
            ( "fontSize", numSpec n )

        WcFontSizeRange ns ->
            numArrayProperty 2 "fontSizeRange" ns

        WcPadding n ->
            ( "padding", numSpec n )

        WcRotate n ->
            ( "rotate", numSpec n )

        WcText f ->
            ( "text", fieldSpec f )

        WcSize ns ->
            numArrayProperty 2 "size" ns

        WcSpiral sp ->
            ( "spiral", spiralSpec sp )

        WcAs x y fnt fntSz fntSt fntW angle ->
            ( "as", JE.list JE.string [ x, y, fnt, fntSz, fntSt, fntW, angle ] )
