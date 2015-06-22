module.exports = function(assetsDir, publicDir) {
	if (typeof assetsDir !== 'string' || !assetsDir)
	{
		assetsDir = 'resources/assets/';
	}

	if (typeof publicDir !== 'string' || !publicDir)
	{
		publicDir = 'public/';
	}

	return {
		tmp: assetsDir + 'tmp',

		css: {
			src: assetsDir + 'css/*.css',
			dest: publicDir + 'css',
			deploy: publicDir + 'css/*.css',
			autoprefixer: {
				browsers: ['> 1%', 'last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
			}
		},

		js: {
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
