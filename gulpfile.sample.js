var gulp = require('gulp'),

	/**
	 * Use of deep-extend is not required, but very helpful. See below.
	 */
	deepExtend = require('deep-extend'),

	assets = require('loewy-assets');

/**
 * The assets directory contains all of the source (development) asset files.
 * Leave empty or undefined to use the default Laravel directory structure.
 */
var assetsDir = 'wp-content/themes/example/assets/dev/',

	/**
	 * The public directory contains all of the distribution (release) asset files.
	 * Leave empty or undefined to use the default Laravel directory structure.
	 */
	publicDir = 'wp-content/themes/example/assets/release/';

/**
 * Set up the asset pipeline.
 */
assets(assetsDir, publicDir, function() {
	/**
	 * Use deep-extend to extend the configuration object.
	 */
	deepExtend(this.config, {
		/**
		 * See config.js for the full configuration object. You may override any of the configuration
		 * options simply by placing them here. You may override one or more options without having
		 * to override all of them.
		 */
	});

	/**
	 * Advanced usage:
	 *
	 * this refers to the assets object from the loewy-assets module. This means that you have full access
	 * to the list of tasks, list of watchers, and any other internals of the module. Here are some examples:
	 *
	 * // create a new task
	 * this.tasks.myTask = function() {
	 *     gulp.task('my-task', function() { ... });
	 * };
	 *
	 * // remove one of the default tasks (prevent it from initializing or running at all)
	 * delete this.tasks.sass;
	 *
	 * See the index.js file for advanced usage details.
	 */
}, gulp);
