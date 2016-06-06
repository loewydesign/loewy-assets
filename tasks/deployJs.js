var minifyJs = require('./minifyJs');
var fingerprintJs = require('./fingerprintJs');

module.exports = function() {
	var	config = this.config,
		gulp = this.gulp;

	gulp.task('deploy-js', function(done) {
		minifyJs.create(gulp, config)().on('end', function() {
			fingerprintJs.create(gulp, config)().on('end', done);
		});
	});
};
