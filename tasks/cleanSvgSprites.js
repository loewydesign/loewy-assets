var clean = require('gulp-clean');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('clean-svg-sprites', function() {
		return gulp.src(config.svgSprites.dest + '/*', { read: false })
			.pipe(clean());
	});
};