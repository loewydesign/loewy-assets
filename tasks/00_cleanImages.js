// requires
const del = require('del');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;
		
	gulp.task('clean-images', function() {
		return del(config.images.dest + '/*');
	});
};
