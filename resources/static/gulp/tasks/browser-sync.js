var browserSync = require('browser-sync').create();
var portscanner = require('portscanner');


module.exports = function(config, gulp, plugins) {
  return function() {
    console.log('---------- Starting BrowserSync server...');


    // Find an available port
    portscanner.findAPortNotInUse(8000, 9000, '127.0.0.1', function(error, port) {
      browserSync.init({
        port: port,

        // Use a node server when you want to work with static html files
        server: config.server,

        // Use a proxy when you want to work based on a virtual machine
        proxy: config.proxy,

        ui: false,
        ghostMode: {
          clicks: true,
          forms: true,
          scroll: true
        },
        reloadDebounce: 200
      });
    });


    // Watch for file changes and trigger browserSync refresh
    gulp.watch(config.watchPaths).on('change', browserSync.reload);
  };
};
