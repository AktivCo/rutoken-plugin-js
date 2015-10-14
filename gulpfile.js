var del = require('del'),
    environments = require('gulp-environments'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var production = environments.production;

gulp.task('clean', function () {
	return del(['build']);
});

gulp.task('scripts', function () {
	return gulp.src('src/*.js')
		.pipe(production(rename({ suffix: '.min' })))
		.pipe(production(uglify()))
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['clean'], function () {
	gulp.start('scripts');
});

gulp.task('watch', function () {
	gulp.watch('src/*.js', ['scripts']);
});
