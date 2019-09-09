# V5.1 ➡ V5.2

Minor release supporting Vega 5.6.

## Additions

- `equalEarth` core map projection added.
- `identityProjection` and associated `reflectX` and `reflectY` map projection functions added.
- `leBorderStrokeDash` for configuring legend border dash style.
- `cfSignals` for supporting configuration signals (Vega 5.5).
- `cfEventHandling` and associated `cfe` functions for more flexible Vega 5.5 event configuration.

## Deprecations

- `cfEvents` deprecated in favour of `cfEventHandling [cfeDefaults ...]`

## Bug Fixes

- `cfGroup` mark properties now correctly create literals rather than objects (e.g. `"fill": "#eee"` rather than `"fill":{"value":"#eee"}`).

## Other Changes

- Minor improvements to the API documentation.
- Update examples to use Vega-embed 5 and Vega 5.5 runtimes
- Minor additions to tests.
