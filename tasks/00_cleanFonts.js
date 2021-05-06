// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;

	gulp.task('clean-fonts', function() {
		return del(config.fonts.dest + '/*');
	});
};
