/*

    First-time Grunt installation:
    -------------------
    npm install -g grunt-cli
    npm install -g grunt-init
    Not working? Weird errors? Try Grunt's getting started guide: http://gruntjs.com/getting-started

    Simple Dependency Install:
    --------------------------
    npm install (from the same root directory as the `package.json` file) 
    bower install (only necessary if you need to add to or change plugins)

    Tasks:
    --------------------------
    grunt (default routes to 'grunt css')
    grunt css (compile sass into css once)
    grunt js (hint custom js, concatenate and minify it with plugin js, move it to the build directory)
    grunt watch (watch for changes to .scss files or scripts.js and compile on save)
    grunt plugins (compile and minify all plugin css and js)
    grunt images (optimize all images and move them to the build directory)
    grunt sprites (create an svg sprite and corrasponding scss partial)
    grunt js_vendor (move over any js that isn't included in bower over to the build directory)
    grunt build (recompiled everything - sass, sprites, javascript, etc.)
    grunt stats (get some stats on your theme assets)
    grunt patternlab (compile the pattern library)

    All commands are detailed by running the following:
    --------------------------
    grunt --help

*/

'use strict';

module.exports = function(grunt) {
    var path = require('path');

    // this needs to go at the top - it will print out how long 
    // things took. Helps with debugging
    require('time-grunt')(grunt);
    
    // this allows you to remove all the 'loadNPMtasks' calls, and speeds up task running
    require('jit-grunt')(grunt, {
        bower_install: 'grunt-bower-install-task'
    });

    // Metadata.
    var options = {
        pkg: grunt.file.readJSON('package.json')
    };

    //loads the various task configuration files
    var configs =   require('load-grunt-configs')(grunt, options);
    grunt.initConfig(configs);


    grunt.registerTask('default', ['css']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin:custom', 'clean:css']);
    grunt.registerTask('js', ['jshint:custom', 'uglify:customjs' ]);
    grunt.registerTask('js_vendor', ['copy:vendorjs']);
    grunt.registerTask('images', ['imagemin', 'copy:raster', 'copy:svg']);
    grunt.registerTask('stats', ['parker']);
    grunt.registerTask('patternlab', ['shell:patternlab']);
    grunt.registerTask('sprites', ['dr-svg-sprites', 'copy:sprites', 'clean:sprites']);
    
    grunt.registerTask('plugins', [
        'bower_install', 
        'bower_concat', 
        'uglify', 
        //'copy:chosensprite',
        'cssmin:plugins',
        'uglify:bowerjs'
    ]);
    grunt.registerTask('build', [
        'clean:build',
        'sprites',
        'css',
        'js',
        'js_vendor',
        'plugins',
        'images'
    ]);
};

