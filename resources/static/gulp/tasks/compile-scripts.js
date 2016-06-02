module.exports = function(config, gulp, plugins) {
  return function() {
    console.log('---------- Compiling ' + config.instance + ' javascript files...');

    var stream = gulp.src(config.src)
      .pipe(plugins.concat(config.concatFilename))
      .pipe(gulp.dest(config.dest));

    return stream;
  };
};
