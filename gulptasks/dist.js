/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    minifyHtml = require('gulp-minify-html'),
    version = require('../package.json').version,
    swig = require('gulp-swig'),
    template = {
      dist: true,
      version: version,
      mailServer: '//mailserver.tableflip.co'
    };

gulp.task('styles-dist', ['clean-css'], function () {
  return gulp.src(['src/styles/main.scss'])
    .pipe(g.sass())
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(g.minifyCss())
    .pipe(g.rename('tableflip.latest.min.css'))
    .pipe(gulp.dest('dist/latest/'))
    .pipe(g.rename('tableflip.' + version + '.min.css'))
    .pipe(gulp.dest('dist/'+ version + '/'))

    .pipe(g.cached('built-dist-css'));
});

gulp.task('html-dist', ['clean-html'], function () {
  return gulp.src(['src/skeleton.html'])
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(minifyHtml({empty: true}))
    .pipe(g.rename('skeleton.latest.html'))
    .pipe(gulp.dest('dist/latest/'))
    .pipe(g.rename('skeleton.' + version + '.html'))
    .pipe(gulp.dest('dist/'+ version + '/'))
    .pipe(g.cached('built-dist-html'));
});
  
gulp.task('js-dist',['styles-dist','html-dist'], function() {
  return gulp.src('src/index.js')
    .pipe(g.data(template))
    .pipe(swig())
    .pipe(g.rename('tableflip.latest.js'))
    .pipe(gulp.dest('dist/latest/'))
    .pipe(g.rename('tableflip.' + version + '.js'))
    .pipe(gulp.dest('dist/'+ version + '/'))
    .pipe(g.uglify({preserveComments:'some'}))
    .pipe(g.rename('tableflip.' + version + '.min.js'))
    .pipe(gulp.dest('dist/'+ version + '/'))
    .pipe(g.uglify({preserveComments:'some'}))
    .pipe(g.rename('tableflip.latest.min.js'))
    .pipe(gulp.dest('dist/latest/'))
    .pipe(g.cached('built-dist-js'));
});