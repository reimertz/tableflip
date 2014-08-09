/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    requireDir = require('require-dir'),
    path = require('path'),
    config = require('./package'),
    notify = require("gulp-notify");

// Add a task to render the output
gulp.task('help', g.taskListing);

/**
 * Default task
 */

gulp.task('build', ['styles', 'compress']);

gulp.task('styles', function () {
  gulp.src(['src/styles/tableflip.scss'])
    .pipe(g.sass())
    .on('error', notify.onError("<%= error.message%>"))
    .pipe(g.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(g.minifyCss())
    .pipe(g.rename('tableflip.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress', function() {
  gulp.src('src/index.js')
    .pipe(g.uglify())
    .pipe(g.rename('tableflip.min.js'))
    .pipe(gulp.dest('dist/'))
});

/**
 * All CSS files as a stream
 */
function cssFiles (opt) {
  return gulp.src('./.build/css/**/*.css', opt);
}

