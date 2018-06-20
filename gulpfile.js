'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcssImport = require('postcss-import');
var postcssCssnext = require('postcss-cssnext');
var postcssSafeParser = require('postcss-safe-parser');
var postcssExtend = require('postcss-extend');
var postcssAdvancedVariables = require('postcss-advanced-variables');
var postcssCalc = require('postcss-calc');
var postcssFor = require('postcss-for');
var gulpUncss = require('gulp-uncss');
var postcssEach = require('postcss-each');
var postcssHexrgba = require('postcss-hexrgba');
var postcssDiscardComments = require('postcss-discard-comments');
var gulpShell = require('gulp-shell')

gulp.task('css', function () {
    var plugins = [
        //Double run for the nested vars :)
        postcssImport({
            plugins:[
                postcssAdvancedVariables(),
                postcssAdvancedVariables(),
                postcssFor(),
                postcssExtend(),
                postcssCalc(),
                postcssHexrgba()
            ]
        }),
        autoprefixer({browsers: ['last 2 versions', '> 5%']}),
        postcssDiscardComments()
        //cssnano()
    ];
    return gulp.src('./src/css/styles.css')
        .pipe(postcss(plugins, { parser: postcssSafeParser }))
        .pipe(gulp.dest('./backend/assets/styles'));
});
gulp.task('css-watch', function () {
    gulp.watch(['./src/css/**/*.css'], ['css']);
});
//Run backend `sails lift`
gulp.task('gulp-shell', gulpShell.task('sails lift',{cwd:"backend"}));
//Run all
gulp.task('default',  ['css','css-watch','gulp-shell']);
