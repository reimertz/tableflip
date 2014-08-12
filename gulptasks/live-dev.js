/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('.build'))
        .use(connect.static('common'))
        .use(connect.static('tests'))
        .use(connect.directory('tests'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('watch', function () {
  g.livereload();

  // Initiate livereload server:
  gulp.watch([
    'tests/index.html',
    '.build/*.css',
    '.build/*.js'
  ]).on('change', function (file) {
      g.livereload.changed(file.path);
  });

  gulp.watch(['src/*.js','gulpfile.js', 'gulptasks/*.js'], ['jslint', 'js-dev']);
  gulp.watch(['src/styles/*.scss'], ['csslint']);

});
