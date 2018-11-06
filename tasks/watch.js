module.exports = function() {
	var config = this.config,
		watches = this.watches,
		gulp = this.gulp;

	gulp.task('watch', function () {
		// assumes that watch command is only run in development environments
		config.env = 'development'; 

		for (var i = 0; i < watches.length; ++i)
		{
			var watch = watches[i],
				task = watch.task;

			if (Object.prototype.toString.call(task) !== '[object Array]')
			{
				// gulp.watch task parameter must be an array, even if it's a single task
				task = [task];
			}

			gulp.watch(watch.watch, task);
		}
	});
};