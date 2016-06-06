module.exports = function() {
	var	gulp = this.gulp;

	gulp.task('deploy-css', ['minify-css', 'fingerprint-css']);
};
