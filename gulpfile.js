const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'src',
    },
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/script.js').on('change', browserSync.reload);
});

gulp.task('to-css', () => {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function () {
  return gulp.src('src/css/*.css').pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/*.js')
    .pipe(rename('script.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('libs', function () {
  return gulp.src('src/js/libs/*.js').pipe(gulp.dest('dist/js/libs'));
});

gulp.task('icons', function () {
  return gulp.src('src/icons/**/*').pipe(gulp.dest('dist/icons'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('to-css'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'to-css'));

gulp.task(
  'build',
  gulp.parallel('html', 'styles', 'scripts', 'libs', 'fonts', 'icons', 'images')
);
