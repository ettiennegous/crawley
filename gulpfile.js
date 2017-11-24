const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-tsc');

const options = {
    pattern: ['tasks/**/*.js']
};

require('load-gulp-tasks')(gulp, options, {});

gulp.task('styles', function() {
    gulp.src('./app/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('build.tasks', () => {
    gulp.src(['tasks/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('tasks/'));
});

gulp.task('default',function() {
    /*gulp.watch('./app/assets/sass/**\/*.scss',['styles']);*/
    'build.default'
});