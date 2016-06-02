module.exports = function(path, gulp, plugins) {


  /*-------------------------------------------------------------------------------------------------
    CONFIG
  -------------------------------------------------------------------------------------------------*/
  var config = {
    instanceName: 'App',
    alias: 'app',
    scriptSrc: [
      path.hexis + 'script-core/2.4/*.js',
      path.hexis + 'components/media-loader/2.2/script.js',
      path.hexis + 'components/content-swap/0.2/script.js',
      path.scripts + 'app/main/**/*.js'
    ]
  };


  /*-------------------------------------------------------------------------------------------------
    COMPILE HTML
  -------------------------------------------------------------------------------------------------*/
  gulp.task('compile-html-'+config.alias, require(path.tasks + 'compile-html')({
    instance: config.instanceName,
    config: {
      cssPath: path.outputCSS,
      mediaPath: path.outputMedia,
      scriptPath: path.outputScripts
    },
    htmlPath: path.html,
    src: path.html + config.alias + '/*.html',
    dest: path.htmlBuild + config.alias + '/',
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    COMPILE CSS
  -------------------------------------------------------------------------------------------------*/
  gulp.task('compile-css-'+config.alias, require(path.tasks + 'compile-css')({
    instance: config.instanceName,
    includePaths: [
      path.scss + config.alias + '/',
      path.npm,
      path.bootstrap
    ],
    src: path.scss + config.alias + '/**/*.scss',
    dest: path.css + config.alias + '/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    COMPILE SCRIPTS
  -------------------------------------------------------------------------------------------------*/
  gulp.task('compile-scripts-'+config.alias, require(path.tasks + 'compile-scripts')({
    instance: config.instanceName,
    src: config.scriptSrc,
    concatFilename: 'main.js',
    dest: path.scripts + config.alias + '/build/'
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    FINAL BUILD TASK
  -------------------------------------------------------------------------------------------------*/
  gulp.task('build-'+config.alias, [
    'compile-html-'+config.alias,
    'compile-css-'+config.alias,
    'compile-scripts-'+config.alias
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
      path.css + config.alias + '/**/*.css',
      path.scripts + '**/*.js'
    ]
  }, gulp, plugins));


  /*-------------------------------------------------------------------------------------------------
    WATCH
  -------------------------------------------------------------------------------------------------*/
  gulp.task('watch-'+config.alias, function(){
    console.log('---------- Watching for ' + config.instanceName + ' changes...');

    // HTML
    gulp.watch([
      path.html + config.alias + '/**/*.html'
    ], ['compile-html-'+config.alias]);

    // SCSS
    gulp.watch([
      path.scss + config.alias + '/**/*.scss',
      path.hexis + '**/*.scss'
    ], ['compile-css-'+config.alias]);

    // SCRIPTS
    gulp.watch([
      path.scripts + config.alias + '/**/*.js',
      '!' + path.scripts + config.alias + '/**/build/',
      path.hexis + '**/*.js'
    ], ['compile-scripts-'+config.alias]);
  });


  /*-------------------------------------------------------------------------------------------------
    WORK TASK
  -------------------------------------------------------------------------------------------------*/
  gulp.task(config.alias, [
    'serve-'+config.alias,
    'watch-'+config.alias
  ]);


};
