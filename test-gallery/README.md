# Test gallery

elm-vega implementation of all examples in the [Vega Lite Examples Gallery](https://vega.github.io/vega-lite/examples).

All examples included in a single page to aid testing. To view the gallery, view `gallery.hmtl` from a web server (e.g. local web server via `python -m http.server 8000`).

To recompile the examples after changes, `elm make gallery.elm --output=gallery.js` to transpile the Elm into JavaScript.
