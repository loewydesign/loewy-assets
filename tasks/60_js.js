// requires
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp,
		modules = config.js.modules || {},
		taskFuncs = [],
		srcs = []
		;

	var taskFuncs = [],
		moduleFuncs = {},
		srcs = [];
		
	function getJsTaskFunc(src, dest)
	{
		return function() {
			let stream = gulp.src(src)

			// sourcemap initialization if enabled
			if (config.env != 'production' && config.js.sourcemaps && config.js.sourcemaps.enabled)
			{
				stream = stream.pipe(sourcemaps.init());
			}

			// concatenate the files together
			stream = stream.pipe(concat(dest))

			// write sourcemaps if enabled
			if (config.env != 'production' && config.js.sourcemaps && config.js.sourcemaps.enabled)
			{
				let file = config.js.sourcemaps.file ? config.js.sourcemaps.file : null ;
				stream = stream.pipe(sourcemaps.write(file));
			}

			// move to release directory
			return stream.pipe(gulp.dest(config.js.dest));
		};
	}

	for (var module in modules)
	{
		if (!modules.hasOwnProperty(module))
		{
			continue;
		}

		var src = modules[module],
			dest = module,
			funcName = 'compile-js-module-' + module;

		if (!dest.match(/\.js$/i))
		{
			// automatically append .js extension if the module does not have one
			dest += '.js';
		}

		var srcType = Object.prototype.toString.call(src);

		if (srcType === '[object Array]')
		{
			srcs = srcs.concat(src);
		}
		else if (srcType === '[object String]')
		{
			srcs.push(src);
		}
		else if (src === null)
		{
			// if the source is null, this module is disabled
			continue;
		}
		else
		{
			console.warn('JavaScript module "' + module + '" references invalid source:', src);
		}
		
		gulp.task(funcName, getJsTaskFunc(src, dest));
		taskFuncs.push(funcName);
	}
	
	gulp.task(
		'compile-js', 
		function(done) {
			// sourcemap initialization if enabled
			if (config.env == 'production' && config.js.sourcemaps && config.js.sourcemaps.enabled)
			{
				console.warn('WARNING: Sourcemaps will not be generated while NODE_ENV is not set, or is set to `production`. On Windows, please run `SET NODE_ENV=development` in the console, and try again.');
			}
			
			return gulp.parallel(...taskFuncs)(done);
		}
	);
	
	gulp.task(
		'js',
		gulp.series('clean-js', 'compile-js')
	);

	this.watches.push({
		watch: srcs,
		task: 'js'
	});
};