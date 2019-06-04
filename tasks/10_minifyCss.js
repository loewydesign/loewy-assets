const minifyCss = require('gulp-clean-css');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;
		
	// register the gulp task function
	gulp.task('minify-css', function() {
		return gulp
			.src(config.css.deploy)

			// minify the deployed CSS files
			.pipe(minifyCss())

			// move minified files to dest
			.pipe(gulp.dest(config.css.dest));
	});
}