var minifyCss = require('gulp-clean-css');

function task()
{
	var config = this.config,
		gulp = this.gulp;

	// register the gulp task function
	gulp.task('minify-css', task.create(gulp, config));
}

task.create = function(gulp, config) {
	// return the actual gulp task function
	return function() {
		return gulp.src(config.css.deploy)

			// minify the deployed CSS files
			.pipe(minifyCss())

			// move minified files to dest
			.pipe(gulp.dest(config.css.dest));
	}
}

module.exports = task;
