module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task(
		'compile-all',
		gulp.series(
			gulp.parallel('compile-sprites', 'compile-svg-sprites'), 
			gulp.parallel('compile-sass', 'compile-js', 'copy-fonts', 'copy-images')
		)
	);
};	