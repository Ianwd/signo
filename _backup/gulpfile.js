/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const markdown = require('markdown');
const sitemap = require('gulp-sitemap');
const util = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('html', function() {
  gulp.src('./src/html/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/',
      filters: {
        markdown: markdown.parse,
      }
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function(){
  return gulp.src('./src/styles/main.scss')
    .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // Default: nested. Values: nested, expanded, compact, compressed
    .pipe(autoprefixer())
    .pipe(util.env.type === 'prod' ? cleanCSS({debug: true}, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
      }) : util.noop())
    .pipe(util.env.type === 'dev' ? sourcemaps.write('./') : util.noop())
    .pipe(gulp.dest('./build/assets/styles'))
});

gulp.task('js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
    .pipe(babel({
  			presets: ['env']
  		}))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(util.env.type === 'dev' ? sourcemaps.write('./') : util.noop())
    .pipe(gulp.dest('./build/assets/js'))
});

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
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/markdown/**/*.md', ['html']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'sass']);
gulp.task('dev', ['html', 'sass', 'js', 'watch']);
gulp.task('build', ['html', 'sass', 'sitemap']);
