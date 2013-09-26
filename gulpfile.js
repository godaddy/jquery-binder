var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');

var cfg = require('./package.json');

gulp.task('minify', function(){
  gulp.files('./lib/*.js')
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".js"}))


  gulp.files('./lib/*.js')
    .pipe(uglify())
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".min.js"}))
});

gulp.task('install',function(){
  gulp.run('minify');
});

function prepend(header) {
  var buffer = [];
  buffer.push(header)
}