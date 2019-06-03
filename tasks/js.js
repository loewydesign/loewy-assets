var concat = require('gulp-concat')

module.exports = function() {
	var config = this.config,
		modules = config.js.modules,
		gulp = this.gulp;

	function getJsTaskFunc(src, dest)
	{
		return function() {
			return gulp.src(src)

				// concatenate the files together
				.pipe(concat(dest))

				// move to release directory
				.pipe(gulp.dest(config.js.dest));
		};
	}

	var taskFuncs = [],
		srcs = [];

	for (var module in modules)
	{
		if (!modules.hasOwnProperty(module))
		{
			continue;
		}

		var src = modules[module],
			dest = module;

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

		taskFuncs.push(getJsTaskFunc(src, dest));
	}

	gulp.task('js', ['clean-js'], function(done) {
		var numLeft = taskFuncs.length;

		for (var i = 0; i < taskFuncs.length; ++i)
		{
			var taskFunc = taskFuncs[i];

			taskFunc().on('end', function() {
				--numLeft;

				// when all of the individual tasks are done, notify gulp by running the done callback
				if (numLeft <= 0)
				{
					done();
				}
			})
		}
	});

	this.watches.push({
		watch: srcs,
		task: 'js'
	});
};