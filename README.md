# Loewy Assets

A front-end asset pipeline driven by gulp.js.

## Overview

Loewy Assets is a front-end asset pipeline driven by gulp.js that we developed in-house for all of our projects.

We make no guarantees as to the functionality or direction of the project. Use at your own risk.

With that said, Loewy Assets should be mature enough for use in real world projects. Note that this npm package and GitHub repository are fairly new, so we're still ironing out some bugs and inconsistencies. Once we hit our first minor version, things should start to stabilize.

## Usage

1. If you're not already using gulp in your project, install it now as development dependency:

		npm install --save-dev gulp

	You may also need to install it globally:

		npm install -g gulp

2. Install `loewy-assets` as a development dependency:

		npm install --save-dev loewy-assets

3. Create a `gulpfile.js` for your project. Use the [sample](gulpfile.sample.js) as a reference. There is also a [barebones sample](gulpfile.sample.bare.js) for quick copy-pasting.

4. Run `gulp`, which will automatically watch for changes to your files and run the appropriate tasks:

		gulp

## Features

Here are some of the features of Loewy Assets. Further details and usage examples to come.

### Sass compilation

The `sass` task automatically compiles all of your Sass files into CSS with [libsass](https://github.com/sass/libsass) through [node-sass](https://www.npmjs.com/package/node-sass) and [gulp-sass](https://www.npmjs.com/package/gulp-sass).

### CSS prefixes

The `css` task automatically takes care of CSS prefixes with [autoprefixer](https://www.npmjs.com/package/autoprefixer) through [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer).

### Fingerprinted assets

The `deploy-css` and `deploy-js` tasks automatically fingerprint your CSS and JS assets, respectively, by using [gulp-rev](https://www.npmjs.com/package/gulp-rev). A `rev-manifest.json` file is also created to define the mappings from the original filenames to the fingerprinted filenames.

### JS concatenation

The `js` task automatically concatenates JS assets into user-defined modules with [gulp-concat](https://www.npmjs.com/package/gulp-concat).

You can either concatenate everything into a single output file (module), or separate your logic into multiple files (modules).

### Rasterized spritesheets

The `sprites` task automatically generates a fingerprinted PNG spritesheet using [gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith).

### SVG spritesheets

The `svg-sprites` task automatically generates a fingerprinted SVG spritesheet using [svg-sprite](https://www.npmjs.com/package/svg-sprite) through [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite).

## Tasks

- `gulp` or `gulp watch`

	Watches all of the source files and runs the corresponding tasks when they change.

- `gulp sass`

	Compiles all of the Sass files into CSS files and places them in the CSS source directory.

	See the `sass` portion of the configuration object in [config.js](config.js).

- `gulp css`

	Adds automatic prefixes to the source CSS files and moves them to the public directory (the source files themselves are not affected). No concatenation is performed, as that should be done by the CSS preprocessor.

	See the `css` portion of the configuration object in [config.js](config.js).

- `gulp js`
	
	Concatenates JS assets into user-defined modules and places them in the public directory.

	See the `js` portion of the configuration object in [config.js](config.js).

- `gulp sprites`

	Automatically generates a fingerprinted PNG spritesheet.

- `gulp svg-sprites`

	Automatically generates a fingerprinted SVG spritesheet.

- `gulp clean-[css/js/sprites/svg-sprites/all]`

	Cleans corresponding public directory. These commands are automatically run where appropriate, but could be triggered manually to clean up.

- `gulp deploy-css`

	Fingerprints the CSS files in the public directory and saves a `rev-manifest.json` file with mappings from the original filenames to the fingerprinted filenames.

- `gulp deploy-js`

	Fingerprints the JS files in the public directory and saves a `rev-manifest.json` file with mappings from the original filenames to the fingerprinted filenames.

## FAQ

### Q: What about Less, Stylus, and other CSS preprocessors?

A: We use Sass, so that's what we included in the pipeline. Future versions may support Less, Stylus, etc. out of the box. For now, you can easily use other preprocessors by doing something like this:

	assets(assetsDir, publicDir, function() {
		// don't create the default Sass task
		delete this.tasks.sass;

		// create our own Less task
		this.tasks.less = function() {
			this.gulp.task('less', function() {
				return gulp.src('resources/assets/less/**/*.less')
					.pipe(less())
					.pipe('resources/assets/css');
			});
		};
	}, gulp);

### Q: What about CoffeeScript, Babel, Dart, and other JS preprocessors/compilers?

A: We don't use any of those (yet), so we haven't included them in the pipeline. Check the CSS preprocessors answer for an example of how you can support these tools in your project.

### Q: Can I use this with platform/framework/language XYZ?

A: Yes! The asset pipeline is platform-/framework-/language-agnostic! With that said, we built it with the mindset of using it in Laravel projects (it can act as a drop-in replacement for Laravel's Elixir). We also use it with other PHP frameworks, including WordPress and Magento.

### Q: Help, something doesn't work!

A: That's not a question. If you're having trouble, please troubleshoot. If you're still having trouble, feel free to [open an issue on GitHub](https://github.com/loewydesign/loewy-assets/issues).

## Credits

Loewy Assets wouldn't exist without all of the wonderful tools put out there by others. These tools include:

- gulp-autoprefixer
- gulp-clean
- gulp-concat
- gulp-if
- gulp-minify-css MIT license
- gulp-rename
- gulp-replace
- gulp-rev
- gulp-sass
- gulp-svg-sprite
- gulp-uglify
- gulp.spritesmith
- require-dir
- through2
- vinyl

## License

[MIT](http://opensource.org/licenses/MIT) &copy; 2015 Loewy Design, Inc.
