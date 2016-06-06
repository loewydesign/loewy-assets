var uglify = require('gulp-uglify');

function task() 
{
	var config = this.config,
		gulp = this.gulp;

	gulp.task('minify-js', task.create(gulp, config));	
}

task.create = function(gulp, config) {
	return function() {
		return gulp.src(config.js.deploy)

			// minify the deployed JS files
			.pipe(uglify())

			// pipe minified js to dest
			.pipe(gulp.dest(config.js.dest));
	}
}

module.exports = task;
