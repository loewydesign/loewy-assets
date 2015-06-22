var gulp = require('gulp'),
	deepExtend = require('deep-extend'),
	assets = require('loewy-assets');

var assetsDir = '',
	publicDir = '';

assets(assetsDir, publicDir, function() {
	deepExtend(this.config, {
		// ...
	});
}, gulp);
