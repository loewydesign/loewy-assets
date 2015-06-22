var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-css', function() {
		return gulp.src(config.css.dest + '/*', { read: false })
			.pipe(clean());
	});
};