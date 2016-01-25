'use strict';

module.exports.tasks = {

  // this grunt partial is only necessary if doing some static site stuff

  // prettify: {
  //   options: {
  //     indent: 4,
  //     "unformatted": ["script", "a", "span", "strong", "em"]
  //   },
  //   all: {
  //     expand: true,
  //     cwd: '<%= dist %>/',
  //     ext: '.html',
  //     src: ['*.html'],
  //     dest: '<%= dist %>/'
  //   }
  // }

  // new version throws an error. Need to find a better alternative for HTML linting
  // htmllint: {
  //     options: {
  //         ignore: ['Bad value “X-UA-Compatible” for attribute “http-equiv” on XHTML element “meta”.']
  //     },
  //     all: ["build/*.html"]
  // }

  // for single page sites that dont need assemble this is a task to copy over the index
  // copy: {
  //   html: {
  //     files: [
  //       {expand: true, cwd: 'src/', src: ['index.html'], dest: 'build/'}
  //     ]
  //   }
  // }
    
};