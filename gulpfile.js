var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('scss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('scss'));
})
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9090,
            livereload: true
        }))
})
gulp.task('minCss', function() {
    return gulp.src('./src/css/index.css')
        .pipe(minCss())
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
})
gulp.task('default', function() {
    return gulp.src('./src', gulp.parallel('scss', 'js', 'watch'))
})
gulp.task('build', function() {
    return gulp.src('./src/js/**/*.js', './src/css/**/*.css', gulp.series('minCss', 'script'))
})