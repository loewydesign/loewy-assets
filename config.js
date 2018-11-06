module.exports = function(assetsDir, publicDir) {
	if (typeof assetsDir !== 'string' || !assetsDir.length)
	{
		assetsDir = 'resources/assets/';
	}

	if (typeof publicDir !== 'string' || !publicDir.length)
	{
		publicDir = 'public/';
	}

	if (assetsDir.slice(-1) !== '/')
	{
		assetsDir += '/';
	}

	if (publicDir.slice(-1) !== '/')
	{
		publicDir += '/';
	}

	return {
		env: process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'production',
		assetsDir: assetsDir,
		publicDir: publicDir,
		tmpDir: assetsDir + 'tmp',

		css: {
			sourcemaps: {
				enabled: false,
				file: './sourcemaps'
			},
			src: assetsDir + 'css/*.css',
			dest: publicDir + 'css',
			deploy: publicDir + 'css/*.css',
			autoprefixer: {
				browsers: ['> 1%', 'last 2 version']
			}
		},

		sass: {
			src: assetsDir + 'scss/**/*.scss',
			dest: assetsDir + 'css'
		},

		js: {
			sourcemaps: {
				enabled: false,
				file: './sourcemaps'
			},
			modules: {
				vendor: assetsDir + 'js/vendor/**/*.js',
				main: assetsDir + 'js/main.js'
			},
			dest: publicDir + 'js',
			deploy: publicDir + 'js/*.js'
		},

		images: {
			src: assetsDir + 'images/**/*',
			dest: publicDir + 'images'
		},

		fonts: {
			src: assetsDir + 'fonts/**/*',
			dest: publicDir + 'fonts'
		},

		sprites: {
			src: assetsDir + 'sprites/**/*.png',
			dest: publicDir + 'spritesheets',

			sheet: 'sprites.png',

			sheetPath: '../spritesheets/sprites.png',
			partial: '_sprites.scss',
			partialDir: assetsDir + 'scss/partials',

			prefix: 'sprite_',
			algorithm: 'binary-tree',
			padding: 2
		},

		svgSprites: {
			src: assetsDir + 'svg-sprites/**/*.svg',
			dest: publicDir + 'svg-spritesheets',
			
			sheet: 'sprites.svg',

			partialDir: assetsDir + 'scss/partials',
			partialTemplate: '_svg-sprites-template.scss',
			partial: '_svg-sprites.scss',

			separator: '_',
			padding: 2,
		}
	};
};
