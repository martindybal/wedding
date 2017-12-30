var gulp = require('gulp');
var debug = require('gulp-debug');

var browserSync = require('browser-sync').create();

var tinify = require("tinify");
tinify.key = "ELaNaacpam03s0u0fsbV6xu4ozxVPU-e";


var responsive = require('gulp-responsive');

var foreach = require('gulp-foreach');

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "192.168.2.109:8080"
    });
    gulp.src('**/*.{html,js,css}')
        .pipe(browserSync.stream());
});

gulp.task('compress-image',
    function () {
        gulp.src('img/photos_original/Home_4.jpg')
            .pipe(debug())
            .pipe(foreach(function (stream, file) {
                var compressedFilename = file.path.replace(/^.*[\\\/]/, '');
                var fileNameLenght = compressedFilename.lastIndexOf(".");
                var fileName = compressedFilename.substring(0, fileNameLenght);
                var fileExtension = compressedFilename.substring(fileNameLenght + 1);

                var resize = function (width, height, resizedFilename) {
                    tinify.fromFile(file.path).resize({
                        method: "cover",
                        width: width,
                        height: height
                    }).toFile('img/photos_compressed/' + resizedFilename).then(function (result) {
                        console.log('Resized ' + file.path);
                    });
                };

                var width = 3840;
                var height = 2160;
                var resizedFilename = fileName + '_landscape.' + fileExtension;
                resize(width, height, resizedFilename);

                width = 2160;
                height = 3840;
                resizedFilename = fileName + '_portrait.' + fileExtension;
                resize(width, height, resizedFilename);
            }));
    });

gulp.task('compress-images', function () {
    gulp.src('img/photos_original/**/Home*.{png,jpg,jpeg}')
        .pipe(debug())
        .pipe(foreach(function (stream, file) {
            var compressedFilename = file.path.replace(/^.*[\\\/]/, '');
            var fileNameLenght = compressedFilename.lastIndexOf(".");
            var fileName = compressedFilename.substring(0, fileNameLenght);
            var fileExtension = compressedFilename.substring(fileNameLenght + 1);

            //tinify.fromFile(file.path).toFile('img/photos_compressed/' + compressedFilename).then(function (result) {
            //    console.log('Compressed ' + file.path);
            //});

            var width = 1920;
            var height = 1080;
            //var resizedFilename = fileName + '_' + width + '_' + height + '.' + fileExtension;
            var resizedFilename = fileName + '_landscape.' + fileExtension;

            tinify.fromFile(file.path).resize({
                method: "cover",
                width: width,
                height: height
            }).toFile('img/photos_compressed/' + resizedFilename).then(function (result) {
                console.log('Resized ' + file.path);
            });

            return stream;
        }));
    //.pipe(gulp.dest('img/photos/'));
});

var widths = [3840, 2560, 1920, 1366, 1280, 1024, 820, 768, 640, 480, 320];
var sizes = [];

for (var width of widths) {
    sizes.push({
        width: width,
        rename: {
            suffix: '_' + width + 'px',
            extname: '.jpg'
        },
        format: 'jpeg'
    });
    sizes.push({
        width: width,
        rename: {
            suffix: '_' + width + 'px',
            extname: '.webp'
        },
        format: 'webp'
    });
}

gulp.task('responsive-images', function () {
    return gulp.src('img/photos_compressed/**/Home*.{png, jpg, jpeg }')
        .pipe($.responsive({ '*.jpg': sizes }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 80,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
            // Do not emit the error when image is enlarged.
            errorOnEnlargement: false
        }))
        .pipe(gulp.dest('img/photos_compressed/responsive'));
});