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
import webpack from 'webpack-stream';
import copyWebpack from 'copy-webpack-plugin';
import through from 'through2';
import imagemin from 'gulp-imagemin';

markdown.marked.setOptions({
  renderer: new markdown.marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,//set to false to allow inline HTML
  smartLists: true,
  smartypants: true,
  langPrefix: 'numbered lang-'
});

gulp.task('html', () => {
  gulp.src('./src/html/**/*.html')
    .pipe(util.env.type === 'prod' ? fileinclude({
      prefix: '@@',
      basepath: './src/',
      filters: {
        markdown: markdown.marked,
      },
      context: {
        build: 'prod',
      }
    }) : util.noop())
    .pipe(util.env.type === 'dev' ? fileinclude({
      prefix: '@@',
      basepath: './src/',
      filters: {
        markdown: markdown.marked,
      },
      context: {
        build: 'dev'
      }
    }) : util.noop())
    .pipe(gulp.dest('./build/'))
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/*.{otf,ttf,woff,woff2}')
    .pipe(font2css())
    .pipe(concat('fonts.scss'))
    .pipe(gulp.dest('./src/styles/'))
})

gulp.task('img', () =>
  gulp.src('./src/img/*')
    .pipe(util.env.type === 'prod' ? imagemin() : util.noop())
    .pipe(gulp.dest('./build/assets/img'))
);

gulp.task('sass', () => {
  return gulp.src(['./src/styles/main.scss', './src/styles/tfe.scss'])
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

// gulp.task('js', () => {
//   return gulp.src([
//       './src/js/main.js',
//       './src/js/color.js',
//       './src/js/vendor/prism.js',
//       './src/js/vendor/hugrid.js'
//   ])
//     .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
//     .pipe(rollup({plugins: [babel()]}))
//     .pipe(util.env.type === 'prod' ? uglify() : util.noop())
//     .pipe(util.env.type === 'dev' ? sourcemaps.write('./') : util.noop())
//     .pipe(gulp.dest('./build/assets/js'))
// });

gulp.task('js', () => {
  return gulp.src([
      './src/js/main.js',
      './src/js/color.js'
  ])
  .pipe(webpack({
    devtool: 'source-map',
    entry: {
      main: './src/js/main.js',
      color: './src/js/color.js',
    },
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [{
        loader: 'babel-loader'
      }]
    },
    plugins: [
      new copyWebpack([
        { from: './src/js/vendor/prism.js', to: './' },
        { from: './src/js/vendor/hugrid.js', to: './' }
      ])
    ]
  }))
  // .pipe(util.env.type === 'dev' ? sourcemaps.init() : util.noop())
  // .pipe(through.obj(function (file, enc, cb) {
  //     // Dont pipe through any source map files as it will be handled
  //     // by gulp-sourcemaps
  //     var isSourceMap = /\.map$/.test(file.path);
  //     if (!isSourceMap) this.push(file);
  //     cb();
  //   }))
  .pipe(util.env.type === 'prod' ? uglify() : util.noop())
  // .pipe(util.env.type === 'dev' ? sourcemaps.write('./') : util.noop())
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

gulp.task('dev', ['html', 'fonts', 'img', 'sass', 'js', 'watch']);
gulp.task('build', ['html', 'fonts', 'img', 'sass', 'js', 'sitemap']);
gulp.task('default', ['dev']);
