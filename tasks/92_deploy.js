module.exports = function() {
	var gulp = this.gulp;
	
	gulp.task(
		'deploy',
		gulp.series('build', gulp.parallel('fingerprint-css', 'fingerprint-js'))
	);
};	