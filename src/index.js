let mix = require('laravel-mix');
let AutoExtract = require('./AutoExtract');

mix.extend('autoExtract', new AutoExtract());
