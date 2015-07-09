var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var fs = require('fs');
var replace = require('gulp-replace');

var paths = {
  sass: ['./scss/**/*.scss'],
  replaceFile: './www/js/app.js',
  replacesDest:['./platforms/ios/www/js', './platforms/android/assets/www/js'],
  project:'./ionic.project'
};

var projectInfo = JSON.parse(fs.readFileSync(paths.project));

gulp.task('default', ['sass', 'prepare', 'remove-proxy']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('prepare', function(){
  return sh.exec('ionic prepare', {async:false});
});

gulp.task('remove-proxy', function() {
  gulp.src(paths.replaceFile)
    .pipe(replace(projectInfo.proxies[0].path, projectInfo.proxies[0].proxyUrl))
    .pipe(gulp.dest(paths.replacesDest[0]))
    .pipe(gulp.dest(paths.replacesDest[1]));
})
