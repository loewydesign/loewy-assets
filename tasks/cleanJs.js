var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-js', function() {
		return gulp.src(config.js.dest + '/*', { read: false })
			.pipe(clean());
	});
};