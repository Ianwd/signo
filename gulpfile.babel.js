/* eslint-disable */
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import font2css from 'gulp-font2css';
import fileinclude from 'gulp-file-include';
import markdown from 'gulp-markdown';
import sitemap from 'gulp-sitemap';
import util from 'gulp-util';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
//import babel from 'gulp-babel';

import rollup from 'gulp-better-rollup';
import babel from 'rollup-plugin-babel';

markdown.marked.setOptions({
  renderer: new markdown.marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  langPrefix: 'numbered lang-'
});

gulp.task('html', () => {
  gulp.src('./src/html/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/',
      filters: {
        //markdown: markdown.parse,
        markdown: markdown.marked,
      }
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/*.{otf,ttf,woff,woff2}')
    .pipe(font2css())
    .pipe(concat('fonts.scss'))
    .pipe(gulp.dest('./src/styles/'))
})

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

// This task was used with the Babel compiler, which doesn't inline includes
// gulp.task('js', () => {
//   return gulp.src('./src/js/**/*.js')
//     .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
//     .pipe(babel({
//   			presets: ['env']
//   		}))
//     .pipe(util.env.type === 'prod' ? uglify() : util.noop())
//     .pipe(concat('main.js'))
//     .pipe(util.env.type === 'dev' ? sourcemaps.write('./') : util.noop())
//     .pipe(gulp.dest('./build/assets/js'))
// });

gulp.task('js', () => {
  //return gulp.src('./src/js/*.js')
  return gulp.src([
      './src/js/main.js',
      './src/js/color.js',
      './src/js/vendor/prism.js'
  ])
    .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
    .pipe(rollup({plugins: [babel()]}))
    .pipe(util.env.type === 'prod' ? uglify() : util.noop())
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

gulp.task('default', ['html', 'fonts', 'sass', 'js', 'sitemap']);
gulp.task('dev', ['html', 'fonts', 'sass', 'js', 'watch']);
gulp.task('build', ['html', 'fonts', 'sass', 'js', 'sitemap']);
