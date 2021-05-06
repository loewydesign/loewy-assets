// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;

	gulp.task('clean-js', function() {
		return del(config.js.dest + '/*');
	});
};