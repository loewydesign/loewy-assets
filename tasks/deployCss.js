var minifyCss = require('./minifyCss');
var fingerprintCss = require('./fingerprintCss');

module.exports = function() {
	var	config = this.config,
		gulp = this.gulp;

	gulp.task('deploy-css', function(done) {
		minifyCss.create(gulp, config)().on('end', function() {
			fingerprintCss.create(gulp, config)().on('end', done);
		});
	});
};
