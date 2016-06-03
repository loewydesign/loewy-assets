var uglify = require('gulp-uglify');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('minify-js', function() {
		return gulp.src(config.js.deploy)

			// minify the deployed JS files
			.pipe(uglify())

			// pipe minified js to dest
			.pipe(gulp.dest(config.js.dest));
	});
};