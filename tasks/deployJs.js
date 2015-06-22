var uglify = require('gulp-uglify'),
	rev = require('gulp-rev');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('deploy-js', function() {
		return gulp.src(config.js.deploy)

			// minify the deployed JS files
			.pipe(uglify())

			// fingerprint the deployed JS files
			.pipe(rev())

			// move to output directory
			.pipe(gulp.dest(config.js.dest))

			// grab the manifest and move it to the output directory as well
			.pipe(rev.manifest())
			.pipe(gulp.dest(config.js.dest));
	});
};