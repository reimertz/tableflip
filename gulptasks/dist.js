/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    dist = {      
      cssLocation: '//cdn.tableflip.co/dist/tableflip.min.css',
      mailServer: '//mailserver.tableflip.co',
      protocol : '((location.protocol == \'https:\') ? 'location.protocol' : \'http:\') + '
    };

gulp.task('styles-dist', ['clean'], function () {
  gulp.src(['src/styles/main.scss'])
    .pipe(g.sass())
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(g.minifyCss())
    .pipe(g.rename('tableflip.min.css'))
    .pipe(gulp.dest('dist/'));
});
  
gulp.task('js-dist', function() {
  gulp.src('src/index.js')
    .pipe(g.template(dist))
    .pipe(g.uglify())
    .pipe(g.rename('tableflip.min.js'))
    .pipe(gulp.dest('dist/'));
});