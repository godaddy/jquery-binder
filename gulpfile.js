var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');
var path = require('path');

var cfg = require('./package.json');

gulp.task('build', function(){
  console.log("running minify: ", path.resolve('./'));

  //unminified - concat
  gulp.src('./src/**.js')
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".js", separator:'\r\n\r\n'}))
    .pipe(gulp.dest('./dist'));

  //minified
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".min.js", separator:'\r\n\r\n'}))
    .pipe(gulp.dest('./dist'));
});
