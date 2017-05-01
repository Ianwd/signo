/* eslint-disable */
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import fileinclude from 'gulp-file-include';
import markdown from 'markdown';
import sitemap from 'gulp-sitemap';
import util from 'gulp-util';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

gulp.task('html', () => {
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

gulp.task('sass', () => {
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

gulp.task('js', () => {
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

gulp.task('sitemap', () => {
  gulp.src('./build/**/*.html', {
    read: false,
  })
  .pipe(sitemap({
    siteUrl: 'https://signo.mathieudelvaux.be',
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/markdown/**/*.md', ['html']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'sass']);
gulp.task('dev', ['html', 'sass', 'js', 'watch']);
gulp.task('build', ['html', 'sass', 'sitemap']);
