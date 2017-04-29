/* eslint-disable dot-location */
const gulp = require('gulp');
const sass = require('gulp-sass');
const preprocess = require('gulp-preprocess');
const markdown = require('gulp-markdown');
const sitemap = require('gulp-sitemap');


gulp.task('html', function() {
  gulp.src('./src/html/**/*.html')
    .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function(){
  return gulp.src('./src/styles/main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // Default: nested Values: nested, expanded, compact, compressed
    .pipe(gulp.dest('./build/assets/styles'))
});

gulp.task('markdown', function(){
  return gulp.src('./src/markdown/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./build/'))
})

gulp.task('sitemap', function() {
  gulp.src('./build/**/*.html', {
    read: false,
  })
  .pipe(sitemap({
    siteUrl: 'https://signo.mathieudelvaux.be',
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/markdown/**/*.md', ['markdown']);
});

gulp.task('default', ['html', 'sass', 'markdown']);
