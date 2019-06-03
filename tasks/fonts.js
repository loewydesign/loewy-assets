module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('fonts', ['clean-fonts'], function() {
		return gulp.src(config.fonts.src)

			// move to output directory
			.pipe(gulp.dest(config.fonts.dest));
	});

	this.watches.push({
		watch: config.fonts.src,
		task: 'fonts'
	});
};