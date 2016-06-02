/*-------------------------------------------------------------------------------------------------
  Modules setup
-------------------------------------------------------------------------------------------------*/
var fs = require('fs'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  plugins = require('gulp-load-plugins')({lazy:false});


/*-------------------------------------------------------------------------------------------------
  Path configuration
-------------------------------------------------------------------------------------------------*/
var path = { root: __dirname + '/' };
  path.instances = path.root + 'gulp/instances/';
  path.tasks = path.root + 'gulp/tasks/';
  path.html = path.root + 'html/';
  path.htmlBuild = path.root + 'html-build/';
  path.css = path.root + 'css/';
  path.scss = path.root + 'scss/';
  path.media = path.root + 'media/';
  path.scripts = path.root + 'scripts/';
  path.npm = path.root + 'node_modules/';
  path.hexis = path.npm + 'hexis-commons/';

  // Paths used in output files (HTML)
  path.outputRoot = '/';
  path.outputCSS = path.outputRoot + 'css/';
  path.outputMedia = path.outputRoot + 'media/';
  path.outputScripts = path.outputRoot + 'scripts/';


/*-------------------------------------------------------------------------------------------------
  Import instances
-------------------------------------------------------------------------------------------------*/
require(path.instances + 'app.js')(path, gulp, plugins); // APP
require(path.instances + 'email.js')(path, gulp, plugins); // EMAIL
require(path.instances + 'pdf.js')(path, gulp, plugins); // PDF


/*-------------------------------------------------------------------------------------------------
  Default task to run everything
-------------------------------------------------------------------------------------------------*/
gulp.task('default', function(){
  console.log('------- !! Please run a single instance such as "gulp app" !!');
});
