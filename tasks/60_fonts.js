module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;

	gulp.task(
		'copy-fonts',
		function() {
			return gulp
				.src(config.fonts.src)
				// move to output directory
				.pipe(gulp.dest(config.fonts.dest));
		}
	);
	
	gulp.task(
		'fonts',
		gulp.series('clean-fonts', 'copy-fonts')
	);

	this.watches.push({
		watch: config.fonts.src,
		task: 'fonts'
	});
};
