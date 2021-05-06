// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
	;

	gulp.task('clean-sprites', function() {
		return del(config.sprites.dest + '/*');
	});
};