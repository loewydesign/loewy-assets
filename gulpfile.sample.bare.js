'use strict';

// source directory
const assetsDir = '';

// release/public directory
const publicDir = '';

const gulp = require('gulp');
const assets = require('loewy-assets');

// assets prepare callback
function init () {
}

// initialize
assets(assetsDir, publicDir, init, gulp);