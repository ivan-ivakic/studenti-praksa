var inlineCSS = require('gulp-inline-css');


module.exports = function(config, gulp, plugins) {
  return function() {
    console.log('---------- Inlining ' + config.instance + ' styles...');

    var stream = gulp.src(config.src)
      .pipe(inlineCSS({
        preserveMediaQueries: false,
        applyStyleTags: true,
        applyLinkTags: true,
        removeStyleTags: false,
        removeLinkTags: false
      }))
      .pipe(gulp.dest(config.dest));

    return stream;
  };
};
