# eve
*Elm - Vega/Lite Integration.*

This library allows you to create Vega-Lite specifications in Elm providing a pure functional interface to declarative visualization construction.

The library does not generate graphical output directly, but instead it allows you to create a JSON _specification_ that can be sent to the Vega-Lite runtime to create the output.
This is therefore a 'pure' Elm package without any external non-Elm dependencies.
