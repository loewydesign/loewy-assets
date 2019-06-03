var	rev = require('gulp-rev');

function task() 
{
	var config = this.config,
		gulp = this.gulp;

	// register the gulp task function
	gulp.task('fingerprint-css', task.create(gulp, config));
}

task.create = function(gulp, config) {
	// return the actual gulp task function
	return function() {
		return gulp.src(config.css.deploy)

			// fingerprint the deployed CSS files
			.pipe(rev())

			// move to output directory
			.pipe(gulp.dest(config.css.dest))

			// grab the manifest and move it to the output directory as well
			.pipe(rev.manifest())
			.pipe(gulp.dest(config.css.dest));
	}
}

module.exports = task;
