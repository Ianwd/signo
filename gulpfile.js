/* eslint-disable dot-location */
const gulp = require('gulp');
const sass = require('gulp-sass');
const preprocess = require('gulp-preprocess');


gulp.task('html', function() {
  gulp.src('./src/html/**/*.html')
    .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function(){
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/assets/styles'))
});

gulp.task('watch', function() {
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['html', 'sass']);
