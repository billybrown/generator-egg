'use strict';

module.exports.tasks = {

	jshint: {
		options: {
			enforceall: true,
			nocomma: false,
            camelcase: false
		},
		grunt: {
		    options: {
		      node: true,
		      camelcase: false,
              nocomma: false
		    },
	  		files: {
	  			src: ['Gruntfile.js', 'config/*.js']
	  		}
	  	},
        custom: {
            options: {
                "globals": {
                    "$": false,
                    "jQuery": false,
                    "document": false,
                    "window": false,
                    "console": false,
                    "setTimeout": false,
                    "enquire": false,
                    "Waypoint": false,
                    "sticky": false,
                    "classTrigger": true,
                    "imagesLoaded": false
                }
            },
            files: {
                src: ['src/js/base.js', 'src/js/custom/*.js']
            }
        }
	},

    bower_concat: {
        all: {
            dest: 'src/js/temp/plugins.min.js',
            cssDest: 'src/js/temp/plugins.min.css',
            exclude: [
                'jquery',
                'modernizr'
            ],
            mainFiles: {
                //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | chosen-main -+++-//
                //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | enquire-main -+++-//
                //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | stickynav-main -+++-//
            },
            dependencies: {
                //'enquire': 'matchmedia'
            },
            bowerOptions: {
                relative: false
            }
        }
    },

    //copy custom JS file over to the build directory
    copy: {
        //-+++- DONT REMOVE THIS COMMENT! its used by yeoman | owlcarousel-copy -+++-//
        vendorjs: {
            files: [
                { expand: true, cwd: 'src/js/vendor', src: ['*.js'], dest: 'build/js/'}
            ]
        },
        bowerjs: {
            files: [
                { expand: true, cwd: 'src/js/temp', src: ['*.js'], dest: 'build/js/'}
            ]
        }
    },

    uglify : {
        customjs: {
            options : {
                banner: "(function($){",
                footer: "\n})(jQuery);",
                preserveComments: false,
                sourceMap : true
            },
            src: [
                 // base class and global options
                'src/js/base.js',

                // all other custom js
                'src/js/custom/*.js'
            ],
            dest : 'build/js/scripts.min.js'
        }
    }

};
