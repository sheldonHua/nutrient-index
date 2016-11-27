var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('app/scss/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError("Style Error: <%= error.message %>")
		}))
		.pipe(sass().on("error", sass.logError)) //converts Sass to css with gulp-sass

		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
      		stream: true
    }))
});


gulp.task('watch',['browserSync','sass'], function(){
	gulp.watch('app/scss/*.scss', ['sass']);

});

gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: 'app'
		},
	})
});


