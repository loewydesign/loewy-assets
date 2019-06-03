module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task('clean-all', [
		'clean-css',
		'clean-js',
		'clean-images',
		'clean-fonts',
		'clean-sprites',
		'clean-svg-sprites'
	], function() {});
};