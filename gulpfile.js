var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');
var path = require('path');
var fs = require('fs');
var extend = require("xtend");
var cp = require('child_process');

var cfg = require('./package.json');

gulp.task('build', function(){
  bumpVersion();
  cleanDistFiles();
  createOutputFile();
  createMinifiedOutputFile();
  updateJQueryPluginFile();
  tagAndCheckin();
});

function bumpVersion() {
  var version = cfg.version.split('.').map(function(num){ return +num });
  version[version.length-1]++;
  cfg.version = version.join('.');
  fs.writeFileSync('./package.json', JSON.stringify(cfg, null, 2), {encoding:'utf8'});
}

function cleanDistFiles() {
  //clear dist directory
  var filesToClean = fs.readdirSync('./dist','*.js');
  filesToClean.forEach(function(path){
    fs.unlinkSync('./dist/' + path);
  });
}

function createOutputFile() {
  //unminified - concat
  gulp.src('./src/**.js')
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".js", separator:'\r\n\r\n'}))
    .pipe(gulp.dest('./dist'));
}

function createMinifiedOutputFile() {
  //minified
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(concat({fileName:"jquery.binder." + cfg.version + ".min.js", separator:'\r\n\r\n'}))
    .pipe(gulp.dest('./dist'));
}

function updateJQueryPluginFile() {
  var text = fs.readFileSync('./binder.jquery.json',{encoding:'utf8'});
  var options = JSON.parse(text);
  options = extend({}, options,{
    name:cfg.name
    ,title:cfg.title
    ,author:cfg.author
    ,version:cfg.version
    ,homepage:cfg.homepage
    ,description:cfg.description
    ,keywords:cfg.keywords
    ,bugs:cfg.bugs.url
    ,maintainers:cfg.contributors
  });
  text = JSON.stringify(options, null, 2);
  fs.writeFileSync('./binder.jquery.json', text, {encoding:'utf8'});
}

function tagAndCheckin() {
  console.log("TAG: v" + cfg.version);

  cp.exec('git rm dist/*', function(){
    cp.exec('git add -A', function(){
      cp.exec('git tag v' + cfg.version, function(){
        cp.exec('git push origin --tags', function(){
          console.log("tag pushed");
        })
      });
    });
  });
}