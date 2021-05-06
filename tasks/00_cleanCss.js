// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;

	gulp.task('clean-css', function() {
		return del(config.css.dest + '/*');
	});
};