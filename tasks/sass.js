var sass = require('gulp-sass');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('sass', function() {
		return gulp.src(config.sass.src)

			// compile Sass to CSS
			.pipe(sass().on('error', sass.logError))

			// move to the output directory
			.pipe(gulp.dest(config.sass.dest));
	});

	this.watches.push({
		watch: config.sass.src,
		task: 'sass'
	});
};