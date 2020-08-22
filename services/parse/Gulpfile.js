const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('lint', () => {
  return gulp.src(['src/**/*.ts', '!src/**/*.d.ts'])
    .pipe(tslint({
      formatter: 'codeFrame'
    }))
    .pipe(tslint.report());
});

gulp.task('copy', () => {
  return gulp.src(['src/**/*.json', 'src/**/*.svg'])
    .pipe(gulp.dest('lib'));
});

gulp.task('compile', gulp.series('copy', 'lint', () => {
  const project = ts.createProject('tsconfig.json');

  return new Promise((resolve, reject) => {
    project.src()
      .pipe(sourcemaps.init())
      .pipe(project())
      // https://github.com/ivogabe/gulp-typescript/issues/295
      .once('error', error => reject('Compilation failed'))
      .js
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(sourcemaps.write({ sourceRoot: '/app/src' }))
      .pipe(gulp.dest('lib'))
      .once('error', error => reject(error))
      .once('finish', () => resolve());
  });
}));

gulp.task('default', gulp.series('compile'));
