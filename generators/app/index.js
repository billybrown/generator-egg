'use strict';

require('shelljs/global');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiring = require('html-wiring');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user with some custom ASCII!
    this.log(
      '\n ' + '+-----------------+' +
      '\n ' + '        ___        ' + 
      '\n ' + '       /   \\      ' + 
      '\n ' + '      /     \\     ' + 
      '\n ' + '      \\     /     ' + 
      '\n ' + '        ---        ' + 
      '\n ' + '+-----------------+' +
      '\n   Welcome to ' + chalk.yellow('Egg') + '.\n' +
      ' +-----------------+\n'
    );

    // Ask a bunch of questions of the user
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?\n',
        default: 'Bill Brown'
      },
      {
        type: 'input',
        name: 'client',
        message: 'What is the full name of the project or client?\n',
        default: 'Echo & Co.'
      },
      {
        type: 'list',
        name: 'cms',
        message: 'What is the CMS?',
        choices: [ "Drupal", "Wordpress", "none" ],
        default: 'none'
      },
      {
        type: 'input',
        name: 'theme',
        message: 'What is the theme name?\n',
        default: 'Egg'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Short (one sentence) description of project:\n',
        default: 'Only the best frickin theme ever'
      },
      {
        type: 'confirm',
        name: 'ie8',
        message: 'Do you need ie8 support?',
        default: false
      },
      {
        type: 'confirm',
        name: 'patternlab',
        message: 'Do you want a pattern library?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  // write our files - copy and paste things and integrate the info we gathered above
  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
            { 
              cms: this.props.cms
            }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('config/deploy.js'),
        this.destinationPath('config/deploy.js')
      );
      this.fs.copy(
        this.templatePath('config/favicons.js'),
        this.destinationPath('config/favicons.js')
      );
      this.fs.copy(
        this.templatePath('config/javascript.js'),
        this.destinationPath('config/javascript.js')
      );
      this.fs.copy(
        this.templatePath('config/sprites.js'),
        this.destinationPath('config/sprites.js')
      );
      this.fs.copy(
        this.templatePath('config/templates.js'),
        this.destinationPath('config/templates.js')
      );
      this.fs.copy(
        this.templatePath('config/watch.js'),
        this.destinationPath('config/watch.js')
      );
      this.fs.copyTpl(
        this.templatePath('config/css.js'),
        this.destinationPath('config/css.js'),
            { 
              ie8: this.props.ie8
            }
      );
      this.fs.copyTpl(
        this.templatePath('Readme.md'),
        this.destinationPath('Readme.md'),
            { 
              theme: this.props.theme,
              description: this.props.description,
              cms: this.props.cms,
              client: this.props.client,
              author: this.props.name,
              patternlab: this.props.patternlab
            }
      );
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );

      this.fs.copyTpl(
        this.templatePath('main.scss'),
        this.destinationPath('src/sass/main.scss'),
          { 
            cms: this.props.cms
          }
      );

      this.fs.copy(
        this.templatePath('favicon.png'),
        this.destinationPath('favicon.png')
      );

      this.fs.copy(
        this.templatePath('img'),
        this.destinationPath('img')
      );

      this.fs.copy(
        this.templatePath('.nvmrc'),
        this.destinationPath('.nvmrc')
      );
      
      if (this.props.patternlab == true) {
        this.fs.copy(
          this.templatePath('patternlab'),
          this.destinationPath('patternlab')
        );

        this.fs.copy(
          this.templatePath('config/patternlab.js'),
          this.destinationPath('config/patternlab.js')
        );

        // for some reason these directories aren't getting copied over
        this.mkdir('patternlab/source/_twig-components/filters');
        this.mkdir('patternlab/source/_twig-components/functions');
        this.mkdir('patternlab/source/_twig-components/tags');
        this.mkdir('patternlab/source/_twig-components/tests');
      }

      if (this.props.ie8 == true) {
        this.fs.copy(
          this.templatePath('_ie8.scss'),
          this.destinationPath('src/sass/ie8.scss')
        );        
      }

      // if this is a Drupal project write these things
      if (this.props.cms == "Drupal") {
        this.fs.copyTpl(
          this.templatePath('info.info'),
          this.destinationPath(this.props.theme + '.info'),
            { 
              theme: this.props.theme,
              description: this.props.description,
              ie8: this.props.ie8,
              client: this.props.client,
              cms: this.props.cms,
              author: this.props.name
            }
        );
        this.fs.copy(
          this.templatePath('screenshot-drupal.png'),
          this.destinationPath('screenshot.png')
        );


        if (this.props.patternlab == true) {
          this.fs.copy(
            this.templatePath('wysiwyg-drupal.twig'),
            this.destinationPath('patternlab/source/_patterns/03-misc/wysiwyg.twig')
          );
        }
      } else if (this.props.cms == "Wordpress") {
      // if this is a Wordpress project write these files

        this.fs.copyTpl(
          this.templatePath('wordpress.css'),
          this.destinationPath('style.css'),
            { 
              theme: this.props.theme,
              description: this.props.description,
              name: this.props.name
            }
        );
        this.fs.copy(
          this.templatePath('screenshot-wordpress.png'),
          this.destinationPath('screenshot.png')
        );
        if (this.props.patternlab == true) {
          this.fs.copy(
            this.templatePath('wysiwyg-wordpress.twig'),
            this.destinationPath('patternlab/source/_patterns/03-misc/wysiwyg.twig')
          );
        }

      } else {

        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('index.html'),
            { 
              description: this.props.description,
              title: this.props.theme
            }
        );

        if (this.props.patternlab == true) {
          this.fs.copy(
            this.templatePath('wysiwyg-default.twig'),
            this.destinationPath('patternlab/source/_patterns/03-misc/wysiwyg.twig')
          );
        }

      }
    }
  },

  install: function() {
    if (this.props.patternlab == true) {
      if (!which('php')) {
        echo('Auto-generating patternlab requires PHP in your $PATH');
      } else {
        exec(which('php') + " ./patternlab/core/console --generate", function(code, output) {
          console.log('Exit code:', code);
          console.log('Program output:', output);
        });
      }
    }
  }

});
