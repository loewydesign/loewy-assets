module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;
	
	gulp.task(
		'copy-images', 
		function() {
			return gulp
				.src(config.images.src)
				// move to output directory
				.pipe(gulp.dest(config.images.dest));
		}
	);
	
	gulp.task(
		'images', 
		gulp.series('clean-images', 'copy-images')
	);
	
	this.watches.push({
		watch: config.images.src,
		task: 'images'
	});
};
