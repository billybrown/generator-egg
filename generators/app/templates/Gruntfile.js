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
    grunt iconfonts (move iconfonts to build directory and concat and minify css with plugin css)
    grunt images (optimize all images and move them to the build directory)
    grunt sprites (create an svg sprite and corrasponding scss partial)
    grunt js_vendor (move over any js that isn't included in bower over to the build directory)
    grunt build (recompiled everything - sass, sprites, javascript, etc.)
    grunt stats (get some stats on your theme assets)
    grunt patternlab (compile the pattern library)

    All commands are detailed by running the following:
    --------------------------
    grunt --help

    Node Version
    --------------------------
    There is a file called .nvmrc in the root of the theme that indicates what version of node we are using.
    Everything should work even if you have a different version - but in case you are getting errors
    and you suspect node - the version number in .nvmrc should work.
    Secondly - the reason this version is so low is because of a tool called Takana which currently does not
    work with the more recent versions. If you are using Node Version Manager, your computer should auto detect
    this file and switch to the proper version.

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
    grunt.registerTask('iconfonts', ['copy:icomoon_fonts', 'cssmin:plugins' ]);
    grunt.registerTask('images', ['imagemin', 'copy:raster', 'copy:svg']);
    grunt.registerTask('stats', ['parker']);
    grunt.registerTask('patternlab', ['shell:patternlab']);
    //grunt.registerTask('sprites', ['dr-svg-sprites', 'copy:sprites', 'clean:sprites']);
    
    grunt.registerTask('plugins', [
        'bower_install', 
        'bower_concat', 
        'uglify', 
        //'copy:chosensprite',
        'cssmin:plugins',
        'copy:bowerjs'
    ]);
    grunt.registerTask('build', [
        'clean:build',
        'css',
        'js',
        'js_vendor',
        //'sprites',
        'copy:icomoon_fonts',
        'plugins',
        'images'
    ]);
};

