# Vega Changes

## Pending changes

_None._

---

## V5.6.1 ➡ V5.7.0

_Minor release to support Vega 5.16 with new non-overlapping label placement._

### V5.7 Additions

- `trLabel` and associated methods `lbAnchor`, `lbAvoidMarks`, `lbAvoidBaseMark`, `lbLineAnchor`, `lbMarkIndex`, `lbMethod`, `lbOffset`, `lbPadding`, `lbSort` and `lbAs` for non-overlapping label placement (Vega 5.16).

### V5.7 Other changes

- Switch iris examples to penguin examples in test gallery.
- Add calendar example to test gallery.

---

## V5.6.0 ➡ V5.6.1

_Patch release that uses `main` rather than `master` GitHub branch. See [github.com/github/renaming](https://github.com/github/renaming)_

---

## V5.5.1 ➡ V5.6.0

_Minor release exposing convenience functions and internal refactoring to align with Vega 5.15._

### V5.6 Additions

- `blendModeValue` convenience function for typesafe blend mode specification.
- `strList` for mixed string lists (e.g. string literals and signals).

### V5.6 Bug Fixes

- `cuNWSEResize` now specifies the correct resizing cursor.

---

## V5.5.0 ➡ V5.5.1

_Patch release with updated data sources and bug fix for empty mark property lists._

### V5.5.1 Bug Fixes

- Empty mark properties now generate null values rather than empty objects for schema compatibility.

### V5.5.1 Other changes

- Use versioned Vega data sets for examples and tests.

- Replaced iris with penguin dataset in examples.

---

## V5.4 ➡ V5.5

_Minor release supporting Vega releases up to and including 5.13.x._

### V5.5 Additions

- `cfeGlobalCursor` for setting global or local cursor properties (V5.13)

- `cfLocale` and associated properties `loDecimal`, `loThousands`, `loGrouping`, `loCurrency`, `loNumerals`, `loPercent`, `loMinus`, `loNan`, `loDateTime`, `loDate`, `loTime`, `loPeriods`, `loDays`, `loShortDays`, `loMonths` and `loShortMonths` for specifying locales (V5.12).

- `dayOfYear` time unit (V5.11).

- `axDomainCap`, `axGridCap` and `axTickCap` with convenience function `strokeCapStr` for axis line cap styling (V5.11).

- `axAria`, `leAria`, `mAria` with associated properties `arEnable`, `arDisable` and `arDescription` for setting ARIA support on a per axis/legend/mark basis (V5.11).

- `tiAria` for setting/unsetting ARIA description from title (V5.11).

- `maBlend` and associated convenience methods `bmLighten`, `bmDarken` etc.) for setting the blend mode for overlaying drawing (V5.10).

- `vaLineTop` and `vaLineBottom` for vertical alignment relative to line height (V5.10).

- `axLabelLineHeight` for multi-lined or line-aligned axis labels (V5.10).

- `axLabelOffset` for displacing axis labels relative to tick marks (V5.10).

- `widthSignal`, `heightSignal` and `paddingSignal` to allow dimensions and padding to be specified via signal expressions that are used as the `update` property (V5.10).

- `cfPadding`, `cfPaddings` and `cfPaddingSignal` for configuring default padding (V5.10).

- `cfWidth`, `cfWidthSignal`, `cfHeight` and `cfHeightSignal` for configuring default dimensions (V5.10).

- `cfDescription` for configuring default ARIA-friendly description for visualizations (V5.10).

- `cfLineBreak` for setting default line break character(s) (V5.10).

- `opProduct` for aggregation of numeric values by their product (V5.10).

---

## V5.3 ➡ V5.4

_Minor release supporting Vega releases 5.8 and 5.9._

### V5.4 Additions

#### New transforms

- `trTimeUnit` transform and associated time binning parameterisation functions `tbUnits`, `tbStep`, `tbTimezone`, `tzLocal`, `tzUtc`, `tzSignal`, `tbInterval`, `tbExtent`, `dtMillis`, `dtExpr`, `tbMaxBins`, `tbSignal`, and `tbAs`.
- `quarter` and `date` added as time units.
- `trKde2d` two-dimensional (raster) density estimation transform and its associated parameterisation functions `kd2Weight`, `kd2CellSize`, `kd2Bandwidth`, `kd2Counts` and `kd2As`.
- `trIsocontour` transform and associated property functions `icField`, `icThresholds`, `icLevels`, `icNice`, `icResolve`, `icZero`, `icSmooth`, `icScale` `icTranslate` and `icAs` for more flexible contouring.
- `trHeatmap` transform and associated property functions `hmField`, `hmColor`, `hmOpacity`, `hmResolve` and `hmAs`
- `trFlattenWithIndex` and `trFlattenWithIndexAs` for nested array flattening that output the array index of flattened data.

#### New properties

- `axTickBand` for aligning ticks on band scales (Vega 5.8).
- `axTranslate` for moving axes relative to main plot area (Vega 5.8).
- `axFormatAsTemporalUtc` for UTC formatting (Vega 5.8).
- `leFormatAsTemporalUtc` for UTC formatting (Vega 5.8).
- `bnInterval` for specifying whether or not both bin boundaries are output in bin transform (Vega 5.8).
- `maCornerRadiusTopLeft`, `maCornerRadiusTopRight`, `maCornerRadiusBottomLeft` and `maCornerRadiusBottomRight` for use with `rect` and `group` marks (Vega 5.8).
- `maScaleX` and `maScaleY` to `path` mark properties (`maAngle` for path marks now rotates path although no changes to API) (Vega 5.8).
- `maSmooth` added to `image` mark properties (Vega 5.8).
- `maImage` for dynamically created image marks added to `image` mark properties (Vega 5.8).
- `maStrokeForeground` for overlaying group stroke over content (Vega 5.9).
- `maStrokeOffset` for shifting group stroke and fill (Vega 5.9).
- `mollweide` map projection (Vega 5.9).
- `inLabels` for providing input element labels that may differ from their option values (Vega 5.9).

### V5.4 Bug Fixes

- correct `tiFrame` output that was previously generating 'fame' output.

### V5.4 Deprecations

- `trContour` and its associated `cn` property functions are now deprecated in favour of `trIsocontour` (Vega 5.8)

### V5.4 Other Changes

- Additional tests and gallery examples to reflect new additions.
- Internal refactoring of time unit handling.

---

## V5.2 ➡ V5.3

_Minor release supporting Vega 5.7._

### V5.3 Additions

- Multi-line titles and spacing (`tiLineHeight`, `axTitleLineHeight`, `leTitleLineHeight`).
- Subtitles and associated customisation (`tiSubtitle`, `tiSubtitleColor`, `tiSubtitleFont`, `tiSubtitleFontSize`, `tiSubtitleFontStyle`, `tiSubtitleFontWeight`, `tiSubtitleLineHeight` and `tiSubtitlePadding`).
- `tiEncodeElements` and associated `teTitle`, `teSubtitle` and `teGroup` for dynamic customization of title elements.
- `maLineBreak` and `maLineHeight` for multi-line text marks.
- Legend symbol limit (`leSymbolLimit`).
- `trDotBin` transform and associated property functions (`dbroupBy`, `dbStep`, `dbSmooth`, `dbSignal`, `dbAs`) for dotplot binning.
- `trQuantile` transform and associated property functions (`quGroupBy`, `quProbs`, `quStep`, `quAs`) for quantile generation.

### V5.3 Deprecations

- `tiEncode` deprecated in favour of `tiEncodeElements`.

### V5.3 Other Changes

- Restructured API documentation to use better thematic grouping of functions with tables of contents.
- Documentation indicates titles can span multiple lines via a `strs` array.
- Some additions to the test gallery for new distribution transformations (dotplot, quantile plot).

---

## V5.1 ➡ V5.2

_Minor release supporting Vega 5.6._

### V5.2 Additions

- `kdResolve` and associated `reShared` and `reIndependent` functions for resolving multiple densities in a KDE transform.
- `bnSpan` for setting the span over which bins are calculated.
- `equalEarth` core map projection added.
- `identityProjection` and associated `reflectX` and `reflectY` map projection functions added.
- `leBorderStrokeDash` for configuring legend border dash style.
- `cfSignals` for supporting configuration signals (Vega 5.5).
- `cfEventHandling` and associated `cfe` functions for more flexible Vega 5.5 event configuration.
- `description` top-level metadata option (previously inadvertently hidden).
- `userMeta` top-level custom metadata options.

### V5.2 Deprecations

- `cfEvents` deprecated in favour of `cfEventHandling [cfeDefaults ...]`

### V5.2 Bug Fixes

- `cfGroup` mark properties now correctly create literals rather than objects (e.g. `"fill": "#eee"` rather than `"fill":{"value":"#eee"}`).

### V5.2 Other Changes

- Minor improvements to the API documentation.
- Update examples to use Vega-embed 5 and Vega 5.5 runtimes
- Minor additions to tests.

---

## V5.0 ➡ V5.1

_Minor release to align with Vega 5.4._

### V5.1 Additions

- `leX` and `leY` for top level legend positioning.
- `topojsonMeshInterior` and `topojsonMeshExterior` for interior and exterior filtering of topoJSON meshes.
- `dnMinSteps` and `dnMaxSteps` added to `trDensity` options
- `trKde` transform for 1-d KDE from a distribution.
- `trRegression` transformation function.
- `trLoess` locally estimated regression function.
- `vGradient` and `vGradientScale` functions for setting gradient fills/strokes.
- `woPrevValue` and `woNextValue` for previous and next value window value operations.
- `arrow` file format indicator for loading binary apache arrow files.

### V5.1 Other Changes

- Regression examples added to gallery
- Tests for new functions

---

## V4.3.1 ➡ V5.0

_Major release to align with Vega 5.3._

### V5.0 Breaking Changes

_These reflect breaking changes from Vega 4 -> Vega 5._

- `scBinLinear` removed. Use `scLinear` with the new `scBins` instead.
- `leStrokeWidth` now takes the name of scale for mapping legend stroke width rather than a numeric literal. For legend border configuration, use the new `leBorderStrokeWidth`.
- `leTitlePadding`, `leOffset` and `lePadding` now take a number rather than value (for consistency with other legend numeric parameters).
- While not an API change, continuous color schemes no longer support discrete variants as part of the scheme name. Replace `raScheme (str "blues-7") []` with `raScheme (str "blues") [csCount (num 7)]`

### V5.0 Additions

- `scBins` for specifying the bin boundaries for a bin scaling. Associated functions `bsBins`, `bsNums` and `bsSignal` for customising bin boundaries.
- `scSymLog` and `scConstant` for symmetrical log scaling of data that may contain zero or negative values.
- `symTriangle`, `symArrow` and `symWedge` directional symbol types useful for new support for angle encoding of symbols.
- `symStroke` for legend symbols
- New axis configurations (`axDomainDash`, `axDomainDashOffset`, `axFormatAsNum`, `axFormatAsTemporal`, `axGridDashOffset`, `axLabelFontStyle`, `axLabelSeparation`, `axTickDash`, `axTickDashOffset`, `axTickMinStep`, `axTitleAnchor` and `axTitleFontStyle`.)
- New legend configurations (`leBorderStrokeWidth`, `leFormatAsNum`, `leFormatAsTemporal`, `leLabelFontStyle`, `leLabelSeparation`, `leSymbolDash`, `leSymbolDashOffset`, `leTickMinStep`, `leTitleAnchor`, `leTitleFontStyle` and `leTitleOrient`.)

### V5.0 Deprecations

`scSequential` in favour of `scLinear`.

### V5.0 Documentation / Asset Changes

- Wind vector example added to test-gallery
- Other examples updated to reflect latest API
