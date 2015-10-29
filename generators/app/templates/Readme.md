# Welcome to <%= theme %>

<%= theme %> is a responsive <%= cms %> theme for <%= client %>. <%= description %>

@author: <%= author %> and friends at Echo & Co., http://echo.co

It uses a few core tools:

* Grunt, http://gruntjs.com - A javascript (node) task runner
    * Used to compile everything (compile things, optimize things, copy things, etc.)
    * See comments at the top of '/Gruntfile.js' for installation info
* Libsass, http://sass-lang.com/libsass - a very fast CSS precompiler
    * Runs through the grunt-node-sass wrapper
    * After Grunt installation, run 'grunt css' to compile your scss to css once, and 'grunt watch' to compile on save
* Autoprefixer, https://github.com/postcss/autoprefixer - postcss plugin to automatically apply vendor prefixes depending on browser support.
    * see the autoprefix task in /config/css.js for specific browser support
* Bower, http://bower.io/ - a front-end package manager
    * Used to download all front-end vendor or plugin scripts (chosen.js, enquire.js, fitvids.js, etc.)
    * Using the Grunt-bower-concat plugin (in /config/javascript.js), grunt will automatically extract and concatenate all necessary scripts and css from /bower_components. You can declare dependencies here as well to force proper ordering.
    * Any files that are not css or js are copied over individually (mainly images).
    * Jquery and Mondernizr are handled outside of bower. Jquery typically comes with a CMS, and modernizr requires a custom build downloaded directly from their website.


# Directory Structure

  <%= theme %>
    │  
    ├── /build: all production ready assets. All compiled by grunt. Do not edit manually.
    │
    ├── /src: all source files for your custom front-end assets
    │   │
    │   ├── /sass: Sass files. Read more about sass in this theme on /src/sass/main.scss
    │   │
    │   ├── /js: javascripts
    │   │   │
    │   │   └── vendor: place any special vendor scripts that can't (or shouldnt) be dl via bower.
    │   │
    │   ├── /img: theme level images
    │   │   │
    │   │   ├── /raster: jpg, gif, png
    │   │   │
    │   │   ├── /svg: SVGs and their PNG fallbacks
    │   │   │
    │   │   └── /svg-sprites: SVGs to be turned into a sprite by grunt. No png fallback necessary.
    │   │   
    │   └── /fonts: all custom fonts (iconfonts and webfonts not hosted elsewhere)
    │
    ├── /config: These hold all the grunt tasks. Where we tell grunt to do the things it does.
    │
    ├── /node_modules: npm packages downloaded from package.json. These are your grunt plugins
    │
    ├── /bower_components: packages downloaded from bower.json. These are mainly js plugins.
    │
    <% if (patternlab) { %>├── /patternlab: Pattern library files
    │<% } %>
    ├── .editorconfig: configurations for text editors
    │
    └── .gitignore: theme level gitignore


<% if (patternlab) { %>
# Getting Started with Pattern Library

This theme has a pattern library which you can see at:

{{ theme root }}/patternlab/public/index.html

To see full pages click on 'pages' in the top left and select one of the pages from the dropdown.

Learn More:
* http://patternlab.io/
* https://github.com/pattern-lab/edition-php-twig-standard

To generate a new version of the pattern library, from the root of the theme run: grunt patternlab

<% } %>

