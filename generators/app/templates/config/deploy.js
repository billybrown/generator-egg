'use strict';

module.exports.tasks = {

    // this task allows you to publish to github pages
    // 'gh-pages': {
    //   options: {
    //     base: '<%= dist %>'
    //   },
    //   src: ['**']
    // }

    // if you have a unique url on github pages, uncomment this below
    // this task copies over the CNAME file for unique URLs on github pages
    // copy: {
    //   cname: {
    //     files: [
    //       {expand: true, cwd: 'src/', src: ['CNAME'], dest: 'build/'}
    //     ]
    //   }
    // }

    clean: {
        build: ['build']
    }

};