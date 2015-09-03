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
	  	custom: ['src/js/scripts.js']
	},

    bower_concat: {
        all: {
            dest: 'src/js/temp/compiled_bower.js',
            cssDest: 'src/js/temp/compiled_bower.css',
            exclude: [
                'jquery',
                'modernizr'
            ],
            mainFiles: {
                //'matchmedia': ['./matchMedia.js', './matchMedia.addListener.js'],
                //'chosen': ['chosen.min.css', 'chosen.jquery.min.js']
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
        vendorjs: {
            files: [
                { expand: true, cwd: 'src/js/vendor', src: ['*.js'], dest: 'build/js/'}
            ]
        },
        //chosensprite: {
        //    files: [
        //        { expand: true, cwd: 'bower_components/chosen', src: ['chosen-sprite.png', 'chosen-sprite@2x.png'], dest: 'build/css/'}
        //    ]
        //}
    },

    uglify: {
        js: {
            files: {
              'build/js/plugins.min.js': ['src/js/temp/compiled_bower.js', 'src/js/scripts.js']
            }
        }
    }
    
};
