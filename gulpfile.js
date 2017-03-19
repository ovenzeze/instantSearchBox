
const gulp = require('gulp');
const babel = require('gulp-babel');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('stylus', () => {
  return gulp.src('src/app/stylus/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('babel', () => {
    return gulp.src('src/app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/app/js2'))
        .pipe(browserSync.reload({
        stream: true
        }));
});


gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'src/app'
    }
  })
});
gulp.task('watch', ['babel','browserSync', 'stylus'], function (){
  gulp.watch('src/app/stylus/**/*.styl', ['stylus']);
  gulp.watch('src/app/js/*.js', ['babel']);
  gulp.watch('src/app/*.html', browserSync.reload);
});