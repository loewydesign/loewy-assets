var svgSprite = require('gulp-svg-sprite'),
	gulpif = require('gulp-if');

module.exports = function() {
	var config = this.config,
		gulp = this.gulp;

	gulp.task('svg-sprites', ['clean-svg-sprites'], function() {
		var svgSpriteConfig = {
			shape: {
				id: {
					separator: config.svgSprites.separator
				},
				spacing: {
					padding: config.svgSprites.padding
				}
			},
			mode: {
				css: {
					render: {
						scss: {
							// use a custom output template
							template: config.svgSprites.partialDir + '/' + config.svgSprites.partialTemplate,

							dest: config.svgSprites.partial
						}
					},

					// include dimensions within same rule
					dimensions: true,

					// do not nest output files within a directory
					dest: '',

					// do not nest output SVG file
					sprite: config.svgSprites.sheet,

					// fingerprint the generated SVG file
					bust: true
				}
			}
		};

		return gulp.src(config.svgSprites.src)

			// build spritesheet
			.pipe(svgSprite(svgSpriteConfig))

			// move spritesheet to output directory
			.pipe(gulpif('*.svg', gulp.dest(config.svgSprites.dest)))

			// move SCSS file to partials directory
			.pipe(gulpif('*.scss', gulp.dest(config.svgSprites.partialDir)));
	});

	this.watches.push({
		watch: [
			config.svgSprites.src,
			config.svgSprites.partialDir + '/' + config.svgSprites.partialTemplate
		],
		task: 'svg-sprites'
	});
};