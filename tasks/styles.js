var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var merge = require('gulp-merge');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('styles', ['clean-css'], function() {
		
		var scss = gulp.src(config.sass.src)

			// compile Sass to CSS
			.pipe(sass().on('error', sass.logError))

			// move to the output directory
			.pipe(gulp.dest(config.sass.dest));

				
		var css = gulp.src(config.css.src)

			// automatically take care of CSS prefixes
			.pipe(autoprefixer(config.css.autoprefixer))

			// move to the output directory
			.pipe(gulp.dest(config.css.dest));
			
		return merge(scss, css);
	});

	this.watches.push({
		watch: config.sass.src,
		task: 'styles'
	});
};