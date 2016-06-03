module.exports = function() {
	var	gulp = this.gulp;

	gulp.task('deploy-js', ['minify-js', 'fingerprint-js']);
};
