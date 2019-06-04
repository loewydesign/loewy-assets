module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task(
		'minify-all',
		gulp.parallel('minify-css', 'minify-js')
	);
};	