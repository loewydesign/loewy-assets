# Loewy Assets

A front-end asset pipeline driven by gulp.js.

## Overview

We've developed an in-house asset pipeline that we use for all of our projects, whether they be WordPress, Laravel, Magento, or anything else. Although powerful, this asset pipeline caters to our specific company needs - it's not meant to be a generic asset pipeline like, for example, Laravel's Elixir (although it could replace it).

**Loewy Assets is currently a work in progress.** You're free to check it out, and even use it if you want, but we make no guarantees about the project's functionality or direction.

## Usage

1. Install `loewy-assets` via npm:

		npm install --save-dev loewy-assets

2. Install gulp, if you haven't already:

		npm install --save-dev gulp

3. Create a `gulpfile.js` for your project. Use the sample as a reference.

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
- `gulp js`
- `gulp sprites`
- `gulp svg-sprites`
- `gulp clean-[css/js/sprites/svg-sprites/all]`
- `gulp deploy-css`
- `gulp deploy-js`

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
