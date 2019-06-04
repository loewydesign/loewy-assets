module.exports = function() {
	var	config = this.config,
		gulp = this.gulp
		;
		
	gulp.task(
		'deploy-js', 
		gulp.series('minify-js', 'fingerprint-js')
	);
};
