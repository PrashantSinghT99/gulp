const { src, dest, series, watch } = require('gulp');
// const uglifycss=require("gulp-uglifycss");
// styles
const scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const jsMinify = require('gulp-terser');


function styles() {
    return src('./frontend/src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(dest('./frontend/dist/styles/'))
}

// scripts



function scripts() {
    return src('./frontend/src/scripts/**/*.js')
        .pipe(jsMinify())
        .pipe(dest('./frontend/dist/scripts/'))
}

function watchTask() {
    watch(
        [
            './frontend/src/styles/**/*.scss',
            './frontend/src/scripts/**/*.js'
        ],
        series(styles, scripts)
    )
}

exports.default = series(styles, scripts, watchTask);