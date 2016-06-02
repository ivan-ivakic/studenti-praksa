module.exports = function(path, gulp, plugins) {


  /*-------------------------------------------------------------------------------------------------
    CONFIG
  -------------------------------------------------------------------------------------------------*/
  var config = {
    instanceName: 'Email',
    alias: 'email'
  };


  /*-------------------------------------------------------------------------------------------------
    COMPILE HTML
  -------------------------------------------------------------------------------------------------*/
  gulp.task('compile-html-'+config.alias, require(path.tasks + 'compile-html')({
    instance: config.instanceName,
    config: {
      cssPath: path.outputCSS,
      mediaPath: path.outputMedia
    },
    htmlPath: path.html,
    src: path.html + config.alias + '/*.html',
    dest: path.htmlBuild + config.alias + '/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    COMPILE CSS
  -------------------------------------------------------------------------------------------------*/
  gulp.task('compile-css-'+config.alias, require(path.tasks + 'compile-css')({
    instance: config.instanceName,
    includePaths: [
      path.scss + '/',
      path.npm,
      path.bootstrap
    ],
    src: path.scss + config.alias + '/**/*.scss',
    dest: path.css + config.alias + '/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    INLINE FILES
  -------------------------------------------------------------------------------------------------*/
  gulp.task('inline-files-'+config.alias, [
    'compile-html-'+config.alias,
    'compile-css-'+config.alias
  ], require(path.tasks + 'inline-source')({
    instance: config.instanceName,
    rootPath: path.root,
    src: path.htmlBuild + config.alias + '/**/*.html',
    dest: path.htmlBuild + config.alias + '/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    INLINE STYLES
  -------------------------------------------------------------------------------------------------*/
  gulp.task('inline-styles-'+config.alias, ['inline-files-'+config.alias], require(path.tasks + 'inline-styles')({
    instance: config.instanceName,
    src: path.htmlBuild + config.alias + '/**/*.html',
    dest: path.htmlBuild + config.alias + '/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    FINAL BUILD TASK
  -------------------------------------------------------------------------------------------------*/
  gulp.task('build-'+config.alias, [
    'inline-styles-'+config.alias,
  ]);


  /*-------------------------------------------------------------------------------------------------
    SERVER
  -------------------------------------------------------------------------------------------------*/
  gulp.task('serve-'+config.alias, ['build-'+config.alias], require(path.tasks + 'browser-sync')({
    server: {
      baseDir: [
        path.htmlBuild + config.alias + '/',
        './'
      ],
      index: 'index.html'
    },
    proxy: false,
    watchPaths: [
      path.htmlBuild + config.alias + '**/*.html',
      path.css + config.alias + '/**/*.css'
    ]
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    WATCH
  -------------------------------------------------------------------------------------------------*/
  gulp.task('watch-'+config.alias, function(){
    console.log('---------- Watching for ' + config.instanceName + ' changes...');

    // HTML + CSS
    gulp.watch([
      path.html + config.alias + '/**/*.html',
      path.scss + config.alias + '/**/*.scss'
    ], ['build-'+config.alias]);
  });


  /*-------------------------------------------------------------------------------------------------
    WORK TASK
  -------------------------------------------------------------------------------------------------*/
  gulp.task(config.alias, [
    'serve-'+config.alias,
    'watch-'+config.alias
  ]);


};
