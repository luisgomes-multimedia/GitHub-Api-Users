var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch' , function(){

  browserSync.init({
    notify: false ,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function(){
    browserSync.reload();
  });

  watch('./app/css/styles.css' , function(){
     return gulp.src('./app/css/styles.css')
      .pipe(browserSync.stream());
 });
  watch('./app/assets/styles/**/*.css' , function(){
    gulp.start('cssInject');
  });

});

gulp.task('cssInject', ['styles'] , function() {
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
});
