var gulp = require('gulp');

var extReplace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var imports = require("postcss-import");
var url = require("postcss-url");
var precss = require('precss');
var sourcemaps = require('gulp-sourcemaps');
//var autoprefixer = require('autoprefixer');
var comments = require('postcss-discard-comments');
var sorting = require('postcss-sorting');
var stylelint = require("stylelint");
var cssnext = require("cssnext");

gulp.task('build-css', function () {
    var processors = [
        comments({removeAll: true}),
        imports,
        sorting,
        stylelint,
        //autoprefixer({browsers: ['last 2 versions']}),
        cssnext(),
        precss
    ];

    return gulp.src('src/gedeonix-ui.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(extReplace('.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['build-css']);
    gulp.watch('index.html');
});

gulp.task('default', ['watch']);
