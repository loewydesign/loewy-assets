var gulp = require('gulp'),
	deepExtend = require('deep-extend'),
	assets = require('loewy-assets');

assets(function(config) {
	var assetsDir = 'wp-content/themes/xpov2/assets/';

	deepExtend(this.config, {
		/**
		 * See [config.js](config.js) for the full configuration object. You may override any of the configuration
		 * options simply by placing them here. You may override one or more options without having
		 * to override all of them.
		 */
	});
}, gulp);
