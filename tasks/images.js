module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('images', ['clean-images'], function() {
		return gulp.src(config.images.src)

			// move to output directory
			.pipe(gulp.dest(config.images.dest));
	});

	this.watches.push({
		watch: config.images.src,
		task: 'images'
	});
};