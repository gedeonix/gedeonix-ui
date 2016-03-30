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
var stylelint = require("stylelint");
var cssnext = require("cssnext");
var color = require("postcss-color-function");
var calc = require("postcss-calc")

gulp.task('build-css', function () {
    var processors = [
        comments({removeAll: true}),
        imports,
        //color(),
        stylelint,
        //autoprefixer({browsers: ['last 2 versions']}),
        //cssnext(),
        precss,
        calc()
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
