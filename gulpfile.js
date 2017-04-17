var gulp        = require('gulp'),
    less        = require('gulp-less'),
    autoprefixer= require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache');
    gutil       = require('gulp-util');
    ftp         = require('gulp-ftp');

gulp.task('ftp-push', function() {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: '',
            user: '',
            pass: '',
            port: 21,
            remotePath: 'public_html/'//change it (поменять)
        }))
        .pipe(gutil.noop());
});

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
   browserSync({
       server: {
           baseDir: 'app'
       },
       notify: false
   });
});

gulp.task('css-libs', ['less'], function () {
   return gulp.src('app/css/libs.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('app/css'));
});

gulp.task('js-libs', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('clean', function () {
   return del.sync('dist');
});

gulp.task('clear-cache', function () {
    return cache.clearAll();
});

gulp.task('img-compress', function () {
   return gulp.src('app/img/**/*')
       .pipe(cache(imagemin({
           interlaced: true,
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           une: [pngquant()]
       })))
       .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browser-sync', 'js-libs', 'css-libs'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'less', 'js-libs'], function () {
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildHTML = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});
