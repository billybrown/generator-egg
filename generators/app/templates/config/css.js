'use strict';

module.exports.tasks = {

    // this task compiles your sass to css using Libsass, a C++ version of sass
    sass: {
        dest: {
            options: {
                sourceMap: true
            },
            files: {
                'build/css/main.css': 'src/sass/main.scss'
            }
        }<% if (ie8) { %>,
        ie: {
            files: {
                'build/css/ie8.css': 'src/sass/ie8.scss'
            }
        }<% } %>
    },

    // this task applies vendor prefixes (ie: -webkit, -moz, -o) to your css
    autoprefixer: {
        options: {
            browsers: [
                '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', // default support (recommended by autoprefixer)
                'ie >= 9',
                'Firefox >= 23', 
                'Chrome >= 22',
                'Safari >= 4',
                'iOS >= 5.1',
                'Android >= 4.1'
            ],
            map: true
        },
        custom: {
            <% if (ie8) { %>src: ['build/css/main.css', 'build/css/ie8.css']<% } else { %>src: ['build/css/main.css']<% } %>
        }
    },

    copy: {
        vendorassets: {
            files: [
                { expand: true, cwd: 'src/vendorcss', src: ['*.png', '.svg', '.gif', '.jpg'], dest: 'build/css/'}
            ]
        }
    },

    cssmin: {
        options: {
            sourceMap: true
        },
        custom: {
            files: {
                'build/css/main.min.css': ['build/css/main.css']
            }
        },
        vendor: {
            files: {
                'build/css/plugins.min.css': ['src/vendorcss/*.css']
            }
        }
    },

    stylestats: {
      options: {
        propertiesCount: 10,
        mediaQueries: false,
        uniqueColor: false,
        uniqueFontSize: false
      },
      src: ['build/css/main.min.css']
    }

};
