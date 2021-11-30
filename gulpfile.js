var del = require('del'),
    environments = require('gulp-environments'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var production = environments.production;

function clean () {
    return del(['build']);
};

function scripts () {
    return gulp.src('src/*.js')
        .pipe(production(rename({ suffix: '.min' })))
        .pipe(production(uglify()))
        .pipe(gulp.dest('build'));
};

function watch () {
    return gulp.watch('src/*.js', ['scripts']);
};

exports.watch = watch;
exports.default = gulp.series(clean, scripts);
