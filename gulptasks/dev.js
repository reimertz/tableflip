/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    dev = {
      cssLocation : 'tableflip.css',
      mailServer: 'localhost:3000',
      protocol: ''
    };
    
    
gulp.task('styles-dev', ['clean-css'], function () {
  gulp.src(['src/styles/main.scss'])
    .pipe(g.sass())
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(g.rename('tableflip.css'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.cached('built-css'));
});

gulp.task('js-dev', ['clean-js'], function() {
  gulp.src('src/index.js')
    .pipe(g.template(dev))
    .pipe(g.rename('tableflip.js'))
    .pipe(gulp.dest('.build/'))
    .pipe(g.cached('built-js'));
});