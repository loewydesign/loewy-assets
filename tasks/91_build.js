module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task(
		'build',
		gulp.series('clean-all', 'compile-all', 'minify-all')
	);
};	