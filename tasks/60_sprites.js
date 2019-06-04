// requires
const spritesmith = require('gulp.spritesmith');
const rev = require('gulp-rev');
const replace = require('gulp-replace');
const through = require('through2');
const path = require('path');
const buffer = require('vinyl-buffer');

function relPath(base, filePath)
{
	if (filePath.indexOf(base) !== 0)
	{
		return filePath;
	}

	// remove base path
	var newPath = filePath.substr(base.length);

	if (newPath[0] === path.sep)
	{
		// ignore leading slash
		newPath = newPath.substr(1);
	}

	return newPath;
}

module.exports = function() {
	var config = this.config,
		gulp = this.gulp
		;
		
		
	gulp.task(
		'compile-sprites',
		function(done) {
			var 
				data = gulp
					.src(config.sprites.src)
					.pipe(spritesmith({
						imgName: config.sprites.sheet,
						imgPath: config.sprites.sheetPath,
						cssName: config.sprites.partial,
						cssVarMap: function(sprite) {
							sprite.name = config.sprites.prefix + sprite.name;
						},
						algorithm: config.sprites.algorithm,
						padding: config.sprites.padding
					}));

			var rewrites = [];

			data.img
				// move to temporary directory
				.pipe(gulp.dest(config.tmpDir))
				
				// prevent streaming not supported error
				.pipe(buffer())

				// fingerprint
				.pipe(rev())

				// grab filename rewrites
				.pipe(through.obj(function(file, enc, callback) {
					if (file.path && file.revOrigPath)
					{
						var r = {
							from: relPath(file.revOrigBase, file.revOrigPath),
							to: relPath(file.base, file.path)
						};
						rewrites.push(r);
					}

					this.push(file);

					callback();
				}))

				// move to release directory
				.pipe(gulp.dest(config.sprites.dest))

				.on('end', function() {
					var cssPipe = data.css;

					for (var i = 0; i < rewrites.length; ++i)
					{
						var r = rewrites[i];

						cssPipe = cssPipe
							// rename references to fingerprinted spritesheet
							.pipe(replace(r.from, r.to));
					}
						
					cssPipe
						// move to partials directory
						.pipe(gulp.dest(config.sprites.partialDir))
						.on('end', function() {
							done();
						})
						;
				});
		}
	);
	
	gulp.task(
		'sprites',
		gulp.series('clean-sprites', 'compile-sprites')
	);
	
	this.watches.push({
		watch: [
			config.sprites.src
		],
		task: 'sprites'
	});
};