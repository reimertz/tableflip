/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    version = require('../package.json').version,
    swig = require('gulp-swig'),
    template = {
      dev: true,
      version: version,
      mailServer: 'localhost:3000'
    };
    
    
gulp.task('styles-dev', ['clean-css'], function () {
  return gulp.src(['src/styles/main.scss'])
    .pipe(g.sass())
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(g.rename('tableflip.css'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.minifyCss())
    .pipe(g.rename('tableflip.oneline.css'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.cached('built-css'));
});

gulp.task('html-dev', ['clean-html'], function () {
  return gulp.src(['src/skeleton.html'])
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.minifyHtml({empty: true}))
    .pipe(g.rename('tableflip.skeleton.html'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.cached('built-html'));
});

gulp.task('js-dev', ['styles-dev','html-dev'], function() {
  return gulp.src('src/index.js')
    .pipe(g.data(template))
    .pipe(swig())
    .pipe(g.rename('tableflip.js'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.cached('built-js'));
});