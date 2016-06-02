var inlinesource = require('gulp-inline-source');


module.exports = function(config, gulp, plugins) {
  return function() {
    console.log('---------- Inlining ' + config.instance + ' files...');

    var stream = gulp.src(config.src)
      .pipe(inlinesource({
        rootpath: config.rootPath,
        compress: false
      }))
      .pipe(gulp.dest(config.dest));

    return stream;
  };
};
