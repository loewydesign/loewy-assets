// requires
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// main task function
const task = function(config, gulp) {
	let stream = gulp.src(config.sass.src);

	// sourcemap initialization if enabled
	if (config.css.sourcemaps && config.css.sourcemaps.enabled)
	{				
		if (config.env != 'production')
		{
			stream = stream.pipe(sourcemaps.init());
		}
		else 
		{
			console.warn('WARNING: Sourcemaps will not be generated while NODE_ENV is not set, or is set to `production`. Please run `SET NODE_ENV=development` in the console, and try again.');
		}
	}

	// compile Sass to CSS
	stream = stream.pipe(sass().on('error', sass.logError))

		// move to the output directory
		.pipe(gulp.dest(config.sass.dest))

		// automatically take care of CSS prefixes
		.pipe(autoprefixer(config.css.autoprefixer))

	// write sourcemaps if enabled
	if (config.env != 'production' && config.css.sourcemaps && config.css.sourcemaps.enabled)
	{
		let file = config.css.sourcemaps.file ? config.css.sourcemaps.file : null ;
		stream = stream.pipe(sourcemaps.write(file));
	}
	
	// move to the output directory
	return stream.pipe(gulp.dest(config.css.dest));
}

module.exports = function() {
	var
		gulp = this.gulp,
		config = this.config
		;
	
	gulp.task(
		'compile-sass', 
		function() {
			return task(config, gulp);
		}
	);
	
	gulp.task(
		'styles', 
		gulp.series('clean-css', 'compile-sass')
	);
	
	this.watches.push({
		watch: config.sass.src,
		task: 'styles'
	});
};