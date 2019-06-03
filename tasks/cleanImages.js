var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-images', function() {
		return gulp.src(config.images.dest + '/*', { read: false })
			.pipe(clean());
	});
};