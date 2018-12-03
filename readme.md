# Laravel Mix Auto Extract Vendors Plugin

[![downloads](https://img.shields.io/npm/dt/laravel-mix-auto-extract.svg)](http://npm-stats.com/~packages/laravel-mix-auto-extract)
[![npm-version](https://img.shields.io/npm/v/laravel-mix-auto-extract.svg)](https://www.npmjs.com/package/laravel-mix-auto-extract)
[![github-tag](https://img.shields.io/github/tag/ankurk91/laravel-mix-auto-extract.svg?maxAge=1800)](https://github.com/ankurk91/laravel-mix-auto-extract/)
[![license](https://img.shields.io/github/license/ankurk91/laravel-mix-auto-extract.svg?maxAge=1800)](https://yarnpkg.com/en/package/laravel-mix-auto-extract)

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) plugin to auto extract 3rd party dependencies as `vendor.js`.

> :mega: Notice: This feature has been added to Laravel Mix v4.0 now. :tada:

### What was the problem?
* Laravel Mix already has a `extract()` method which accepts an array of dependencies that you want to extract as `vendor.js` 
* Whenever you install a new package, you also need to update this list to make it work.
* Read more on this [issue](https://github.com/JeffreyWay/laravel-mix/issues/1233)

### How does this plugin solve above issue?
* This plugin will auto extract all js dependencies coming from `node_modules` to `vendor.js` file.
* You just need to reference them in your code somewhere. For example:
```js
// app.js
import Vue from 'vue';
import axios from 'axios';
```
* Now `vue` and `axios` will be auto extracted to `vendor.js` file

## Requirements
* [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) >=2.1.0 <4.0.0

## Installation
```bash
# npm
npm install laravel-mix-auto-extract --save

# yarn
yarn add laravel-mix-auto-extract
```

## Usage
Update your `webpack.mix.js`
```js
const mix = require('laravel-mix');
// Require this package
require('laravel-mix-auto-extract');
// Your code may go here
// mix.js('./resources/assets/js/app.js', './public/js/app.js')
// mix.version()
// Call this method at last
mix.autoExtract();
```
Then update your blade template
```blade
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('js/vendor.js') }}"></script>
<script src="{{ mix('js/app.js') }}"></script>
```
Remove any reference to `extract()` method in `webpack.mix.js`

### Configuration Options
Here are the default options, all of them are optional.
```js
mix.autoExtract({
  vendorPath: 'js/vendor', // Don't suffix paths with `.js`
  manifestPath: 'js/manifest',
  excludeRegExp: /^.*\.(css|scss|sass|less|styl)$/,
  generateManifest: true,
});
```
Paths are relative to the default output directory, usually `./public`. 

## :warning: Caution
Don't use `autoExtract()` method along with `extract()` method.

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License
[MIT](LICENSE.txt) License
