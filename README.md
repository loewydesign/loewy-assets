# Loewy Assets

A front-end asset pipeline driven by gulp.js.

## Overview

We've developed an in-house asset pipeline that we use for all of our projects, whether they be WordPress, Laravel, Magento, or anything else. Although powerful, this asset pipeline caters to our specific company needs - it's not meant to be a generic asset pipeline like, for example, Laravel's Elixir (although it could replace it).

**Loewy Assets is currently a work in progress.** You're free to check it out, and even use it if you want, but we make no guarantees about the project's functionality or direction of development.

## Usage

1. If you're not already using gulp in your project, install it now:

		npm install --save-dev gulp

2. Install `loewy-assets`:

		npm install --save-dev loewy-assets

3. Create a `gulpfile.js` for your project. Use the [sample](gulpfile.sample.js) as a reference.

4. Run gulp, which will automatically watch for changes to your files and run the appropriate tasks:

		gulp

## Features

Here are some of the features of Loewy Assets. Further details and usage examples to come.

### Automatic CSS prefixes

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
- gulp-svg-sprite
- gulp-uglify
- gulp.spritesmith
- through2
- vinyl

## License

[MIT](http://opensource.org/licenses/MIT)
