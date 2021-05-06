// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;

	gulp.task('clean-svg-sprites', function() {
		return del(config.svgSprites.dest + '/*');
	});
};
