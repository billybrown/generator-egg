'use strict';

module.exports.tasks = {

    // this task optimizes your images
    imagemin: {
        png: {
            files: [{
                expand: true,
                cwd: 'src/img',
                src: ['**/*.png', '**/*.jpg', '**/*.gif'],
                dest: 'src/img'
            }]
        },
        svg: {
            files: [{
                expand: true,
                cwd: 'src/img',
                src: ['**/*.svg'],
                ext: '.svg',
                dest: 'src/img'
            }]
        }
    },

    //copy custom JS file over to the build directory
    copy: {
        raster: {
            files: [
                { expand: true, cwd: 'src/img/raster', src: ['*'], dest: 'build/img/'}
            ]
        },
        svg: {
            files: [
                { expand: true, cwd: 'src/img/svg', src: ['*'], dest: 'build/img/'}
            ]
        }
    }
};
