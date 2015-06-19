var gulp = require('gulp'),
	path = require('path'),
	through = require('through2'),

	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	gulpif = require('gulp-if'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	rev = require('gulp-rev'),
	spritesmith = require('gulp.spritesmith'),
	svgSprite = require('gulp-svg-sprite'),
	uglify = require('gulp-uglify');

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

module.exports = (function() {
	var assets = {
		config: {},
		tasks: {},
		watches: []
	};

	assets.config = {
		tmp: 'resources/assets/tmp',

		css: {
			src: 'resources/assets/css/*.css',
			dest: 'public/css',
			deploy: 'public/css/*.css',
			autoprefixer: {
				browsers: ['> 1%', 'last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
			}
		},

		js: {
			modules: {
				vendor: 'resources/assets/js/vendor/**/*.js',
				main: 'resources/assets/js/main.js'
			},
			dest: 'public/js',
			deploy: 'public/js/*.js'
		},

		images: {
			src: 'resources/assets/images/**/*',
			dest: 'public/images'
		},

		fonts: {
			src: 'resources/assets/fonts/**/*',
			dest: 'public/fonts'
		},

		sprites: {
			src: 'resources/assets/sprites/**/*.png',
			dest: 'public/spritesheets',

			sheet: 'sprites.png',

			sheetPath: '../spritesheets/sprites.png',
			partial: '_sprites.scss',
			partialDir: 'resources/assets/scss/partials',

			prefix: 'sprite_',
			algorithm: 'binary-tree',
			padding: 2
		},

		svgSprites: {
			src: 'resources/assets/svg-sprites/**/*.svg',
			dest: 'public/svg-spritesheets',
			
			sheet: 'sprites.svg',

			partialDir: 'resources/assets/scss/partials',
			partialTemplate: '_svg-sprites-template.scss',
			partial: '_svg-sprites.scss',

			separator: '_',
			padding: 2,
		}
	};

	assets.run = function(configCb) {
		if (typeof configCb === 'function')
		{
			configCb.call(assets);
		}

		var tasks = assets.tasks;

		for (var field in tasks)
		{
			if (!tasks.hasOwnProperty(field))
			{
				continue;
			}

			var task = tasks[field];

			task.call(assets);
		}
	};

	assets.tasks.css = function() {
		var config = this.config;

		gulp.task('css', ['clean-css'], function() {
			return gulp.src(config.css.src)

				// automatically take care of CSS prefixes
				.pipe(autoprefixer(config.css.autoprefixer))

				// move to the output directory
				.pipe(gulp.dest(config.css.dest));
		});

		this.watches.push({
			watch: config.css.src,
			task: 'css'
		});
	};

	assets.tasks.deployCss = function() {
		var config = this.config;

		gulp.task('deploy-css', function() {
			return gulp.src(config.css.deploy)

				// minified deployed CSS files
				.pipe(minifyCss())

				// fingerprinted deployed CSS files
				.pipe(rev())

				// move to output directory
				.pipe(gulp.dest(config.css.dest))

				// grab the manifest and move it to the output directory as well
				.pipe(rev.manifest())
				.pipe(gulp.dest(config.css.dest));
		});
	};
	
	assets.tasks.js = function() {
		var config = this.config,
			modules = config.js.modules;

		function getJsTaskFunc(src, dest)
		{
			return function() {
				return gulp.src(src)

					// concatenate the files together
					.pipe(concat(dest))

					// move to release directory
					.pipe(gulp.dest(config.js.dest));
			};
		}

		var taskFuncs = [],
			srcs = [];

		for (var module in modules)
		{
			if (!modules.hasOwnProperty(module))
			{
				continue;
			}

			var src = modules[module],
				dest = module;

			if (!dest.match(/\.js$/i))
			{
				// automatically append .js extension if the module does not have one
				dest += '.js';
			}

			if (Object.prototype.toString.call(src) === '[object Array]')
			{
				srcs = srcs.concat(src);
			}
			else
			{
				srcs.push(src);
			}

			taskFuncs.push(getJsTaskFunc(src, dest));
		}

		gulp.task('js', ['clean-js'], function(done) {
			for (var i = 0; i < taskFuncs.length; ++i)
			{
				var taskFunc = taskFuncs[i];
				taskFunc();
			}
		});

		this.watches.push({
			watch: srcs,
			task: 'js'
		});
	};

	assets.tasks.deployJs = function() {
		var config = this.config;

		gulp.task('deploy-js', function() {
			return gulp.src(config.js.deploy)

				// minify the deployed JS files
				.pipe(uglify())

				// fingerprinted the deployed JS files
				.pipe(rev())

				// move to output directory
				.pipe(gulp.dest(config.js.dest))

				// grab the manifest and move it to the output directory as well
				.pipe(rev.manifest())
				.pipe(gulp.dest(config.js.dest));
		});
	};

	assets.tasks.images = function() {
		var config = this.config;

		gulp.task('images', ['clean-images'], function() {
			return gulp.src(config.images.src)

				// move to output directory
				.pipe(gulp.dest(config.images.dest));
		});

		this.watches.push({
			watch: config.images.src,
			task: 'images'
		});
	};

	assets.tasks.fonts = function() {
		var config = this.config;

		gulp.task('fonts', ['clean-fonts'], function() {
			return gulp.src(config.fonts.src)

				// move to output directory
				.pipe(gulp.dest(config.fonts.dest));
		});

		this.watches.push({
			watch: config.fonts.src,
			task: 'fonts'
		});
	};

	assets.tasks.sprites = function() {
		var config = this;

		gulp.task('sprites', ['clean-sprites'], function() {
			var data = gulp.src(config.sprites.src)
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
				.pipe(gulp.dest(config.tmp))

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
						.pipe(gulp.dest(config.sprites.partialDir));
				});
		});
	};

	assets.tasks.svgSprites = function() {
		var config = this.config;

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

	assets.tasks.cleanCss = function() {
		var config = this.config;

		gulp.task('clean-css', function() {
			return gulp.src(config.css.dest + '/*', { read: false })
				.pipe(clean());
		});
	};

	assets.tasks.cleanJs = function() {
		var config = this.config;

		gulp.task('clean-js', function() {
			return gulp.src(config.js.dest + '/*', { read: false })
				.pipe(clean());
		});
	};
	
	assets.tasks.cleanImages = function() {
		var config = this.config;

		gulp.task('clean-images', function() {
			return gulp.src(config.images.dest + '/*', { read: false })
				.pipe(clean());
		});
	};

	assets.tasks.cleanFoo = function() {
		var config = this.config;

		gulp.task('clean-fonts', function() {
			return gulp.src(config.fonts.dest + '/*', { read: false })
				.pipe(clean());
		});
	};

	assets.tasks.cleanSprites = function() {
		var config = this.config;

		gulp.task('clean-sprites', function() {
			return gulp.src(config.sprites.dest + '/*', { read: false })
				.pipe(clean());
		});
	};
	
	assets.tasks.cleanSvgSprites = function() {
		var config = this.config;

		gulp.task('clean-svg-sprites', function() {
			return gulp.src(config.svgSprites.dest + '/*', { read: false })
				.pipe(clean());
		});
	};

	assets.tasks.cleanAll = function() {
		gulp.task('clean-all', [
			'clean-css',
			'clean-js',
			'clean-images',
			'clean-fonts',
			'clean-sprites',
			'clean-svg-sprites'
		], function() {});
	};

	assets.tasks.watch = function() {
		var watches = this.watches;

		gulp.task('watch', function () {
			for (var i = 0; i < watches.length; ++i)
			{
				var watch = watches[i];

				gulp.watch(watch.watch, watch.task);
			}
		});
	};

	assets.tasks.default = function() {
		gulp.task('default', ['watch']);
	};

	return assets;
})();