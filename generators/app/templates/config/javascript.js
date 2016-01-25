'use strict';

module.exports.tasks = {

    //copy custom JS file over to the build directory
    copy: {
        //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | owlcarousel-copy -+++-//
        //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | chosen-sprite -+++-//
        modernizr: {
            files: [
                { expand: true, cwd: 'src/js', src: ['modernizr.js'], dest: 'build/js/'}
            ]
        }
    },

    uglify : {
        customjs: {
            options : {
                preserveComments: false,
                sourceMap : true
            },
            src: [
                'src/js/custom.js',
            ],
            dest : 'build/js/custom.min.js'
        },
        vendorjs: {
            options : {
                preserveComments: false,
                sourceMap : true
            },
            src: [
                'src/js/vendor/*',
            ],
            dest : 'build/js/plugins.min.js'
        }
    }

};
