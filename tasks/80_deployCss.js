module.exports = function() {
	var	config = this.config,
		gulp = this.gulp
		;
		
	gulp.task(
		'deploy-css', 
		gulp.series('minify-css', 'fingerprint-css')
	);
};
