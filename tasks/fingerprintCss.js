var	rev = require('gulp-rev');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('fingerprint-css', ['minify-css'], function() {
		return gulp.src(config.css.deploy)

			// fingerprint the deployed CSS files
			.pipe(rev())

			// move to output directory
			.pipe(gulp.dest(config.css.dest))

			// grab the manifest and move it to the output directory as well
			.pipe(rev.manifest())
			.pipe(gulp.dest(config.css.dest));
	});
};