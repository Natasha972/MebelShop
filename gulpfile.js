const gulp = require ('gulp')
const sass = require ('gulp-sass')
const rename = require ('gulp-rename')
const browserSync = require('browser-sync')
const autoprefixer = require ('gulp-autoprefixer')
const uglify = require ('gulp-uglify')
const concat = require ('gulp-concat')
const del = require ('del')
const cssmin = require ('gulp-cssmin')
const imagemin = require ('gulp-imagemin')

gulp.task('clean', async function() {
  del.sync('dist')
})

gulp.task('scss', function() {
  return gulp.src('app/scss/style.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: 'last 5 versions'
  }))
  .pipe(cssmin())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('style', function() {
  return gulp.src([
    'node_modules/normalize-css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
    'app/scss/fa/all.min.css'
    ])
  .pipe(concat('libs.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css'))
})

gulp.task('script', function() {
  return gulp.src('app/js/main.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/js/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('libs', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js'])
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('dist/js/'))
})

gulp.task('html', function() {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('fonts', function() {
  return gulp.src('app/webfonts/*')
  .pipe(gulp.dest('dist/webfonts/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('images', function() {
  return gulp.src('app/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser_sync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    }
  })
})

gulp.task('watch', function() {
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('app/js/main.js', gulp.parallel('script'))
  gulp.watch('app/images/**/*', gulp.parallel('images'))
  gulp.watch('app/webfonts/**/*', gulp.parallel('fonts'))
})

gulp.task('build',
  gulp.series('html', 'scss', 'script', 'images', 'fonts')
)

gulp.task('default',
  gulp.parallel( 'build', 'watch', 'browser_sync')
)

