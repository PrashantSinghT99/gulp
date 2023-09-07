const { src, dest, series, watch } = require('gulp');
// const uglifycss=require("gulp-uglifycss");
// styles
const scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const jsMinify = require('gulp-terser');


function styles() {
    return src('./frontend/src/styles/**/*.scss')
        .pipe(scss())
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
//gulp.series function is used to define a series of tasks that should be executed in sequential order. 
//watch task 
function watchTask() {
    watch(
        [
            './frontend/src/styles/**/*.scss',
            './frontend/src/scripts/**/*.js'
        ],
        series(styles, scripts)
    )
}

/*Define a task to concatenate JavaScript files
gulp.task('concat-js', () => {
    return gulp.src('src/js/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'));
  });
  
  Define a default task that runs all defined tasks
  gulp.task('default', gulp.parallel('minify-css', 'concat-js'));*/

exports.default = series(styles, scripts, watchTask);