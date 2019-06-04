module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task('default', gulp.series('watch'));
};
