"use strict";

global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  del: require('del'),
  fs: require('fs'),

  path: {
    tasks: require('./gulp/tasks.js'),
    cssVendor: require('./gulp/paths/css.vendor.js'),
    jsApp: require('./gulp/paths/js.app.js')
  },

  config: require('./gulp/config'),

  isDev: !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

};

$.path.tasks.forEach(function(taskPath){
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'pug', 
    'style',
    'js:process',
    'css:vendor',
    'copy:image',
    'svg:copy',
    'copy:fonts'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
