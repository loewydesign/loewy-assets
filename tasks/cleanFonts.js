var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-fonts', function() {
		return gulp.src(config.fonts.dest + '/*', { read: false })
			.pipe(clean());
	});
};