var nunjucksRender = require('gulp-nunjucks-render');
module.exports = function(config, gulp, plugins) {
  return function() {
    console.log('---------- Compiling ' + config.instance + ' HTML files...');

    //  We tell Nunjucks where to locate our templates/partials
    nunjucksRender.nunjucks.configure([config.htmlPath], { watch: false });

    var stream = gulp.src(config.src)
      .pipe(nunjucksRender(config.config))
      .pipe(gulp.dest(config.dest));

    return stream;
  };
};
