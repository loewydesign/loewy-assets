var autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('css', ['clean-css'], function() {
		return gulp.src(config.css.src)

			// automatically take care of CSS prefixes
			.pipe(autoprefixer(config.css.autoprefixer))

			// move to the output directory
			.pipe(gulp.dest(config.css.dest));
	});

	this.watches.push({
		watch: config.css.src,
		task: 'css'
	});
};