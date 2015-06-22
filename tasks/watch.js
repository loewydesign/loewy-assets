module.exports = function() {
	var watches = this.watches,
		gulp = this.gulp;

	gulp.task('watch', function () {
		for (var i = 0; i < watches.length; ++i)
		{
			var watch = watches[i];

			/**
			 * @todo Resolve error: [gulp] 'watch' errored after 7.78 ms Arguments to path.resolve must be strings
			 */
			gulp.watch(watch.watch, watch.task);
		}
	});
};