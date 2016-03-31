/*

    First-time Grunt installation:
    -------------------
    npm install -g grunt-cli
    npm install -g grunt-init
    Not working? Weird errors? Try Grunt's getting started guide: http://gruntjs.com/getting-started

    Simple Dependency Install:
    --------------------------
    npm install (from the same root directory as the `package.json` file) 

    Tasks:
    --------------------------
    grunt (default routes to 'grunt css')
    grunt css (compile sass into css once)
    grunt js (concatenate and minify vendor js, minify custom js, move them to the build directory)
    grunt watch (watch for changes to .scss or the pattern library and compile on save)
    grunt sprites (create an svg sprite and corrasponding scss partial)
    grunt build (recompiled everything - sass, sprites, javascript, etc.)
    grunt patternlab (compile the pattern library)

    All commands are detailed by running the following:
    --------------------------
    grunt --help

    Node version
    --------------------------
    There is a .nvmrc file in this directory which lists a version of node that all of these npm packages
    will definitely work with. It is not a requirement to use this version, but if you are getting errors
    it is a good place to start. NVM (Node version manager) is a great tool for managing multiple versions
    of node.js on your machine: https://github.com/creationix/nvm

*/

'use strict';

module.exports = function(grunt) {
    var path = require('path');

    // this needs to go at the top - it will print out how long 
    // things took. Helps with debugging
    require('time-grunt')(grunt);
    
    // this allows you to remove all the 'loadNPMtasks' calls, and speeds up task running
    require('jit-grunt')(grunt);

    // Metadata.
    var options = {
        pkg: grunt.file.readJSON('package.json')
    };

    //loads the various task configuration files
    var configs =   require('load-grunt-configs')(grunt, options);
    grunt.initConfig(configs);


    grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin:custom']);
    grunt.registerTask('default', ['css']);
    grunt.registerTask('css_vendor', ['cssmin:vendor', 'copy:vendorassets']);
    grunt.registerTask('js', ['uglify:customjs' ]);
    grunt.registerTask('js_vendor', ['copy:modernizr', 'uglify:vendorjs']);
    grunt.registerTask('patternlab', ['shell:patternlab']);
    grunt.registerTask('sprites', ['dr-svg-sprites']);
    
    grunt.registerTask('build', [
        'clean:build',
        'sprites',
        'css',
        'css_vendor',
        'js',
        'js_vendor'
    ]);
};

