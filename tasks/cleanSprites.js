var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-sprites', function() {
		return gulp.src(config.sprites.dest + '/*', { read: false })
			.pipe(clean());
	});
};