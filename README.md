# stimulus-automagic with Parcel

Inspired by: [Stimulus-webpack-helpers](https://github.com/hotwired/stimulus-webpack-helpers)

This allows you to add your stimulus controllers automagically with minimal setup. 

## Prerequisites
This depends on Parcel's glob resolver: **@parcel/resolver-glob**
Install it and add it to your parcel configuration file (**.parcelrc**).

```
{

  "extends": "@parcel/config-default",
  "resolvers": ["@parcel/resolver-glob", "..."]
  
}
```

## Installation
```
npm install @krebil/parcel-stimulus-automagic
```
## Usage
import the folder where your controllers are into your js file.
`import * as controllers from "./controllers/**/*.ts"` or `import * as controllers from "./controllers/**/*.js"`

Then import **definitionsFromContext** and use it like in the **webpack-helpers** repo.

```
import {definitionsFromContext} from "@krebil/parcel-stimulus-automagic";

var f = definitionsFromContext(files)

window.Stimulus = Application.start() 

window.Stimulus.load(f)
```

And that's it!

Clone this repo for a complete example
