var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('styles', ['clean-css'], function() {
		
		return gulp.src(config.sass.src)

			// compile Sass to CSS
			.pipe(sass().on('error', sass.logError))

			// move to the output directory
			.pipe(gulp.dest(config.sass.dest))

			// automatically take care of CSS prefixes
			.pipe(autoprefixer(config.css.autoprefixer))

			// move to the output directory
			.pipe(gulp.dest(config.css.dest));
	});

	this.watches.push({
		watch: config.sass.src,
		task: 'styles'
	});
};