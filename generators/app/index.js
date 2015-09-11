'use strict';

require('shelljs/global');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sweet ' + chalk.red('Egg') + ' generator!'
    ));

    // Get our info
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
        type: 'input',
        name: 'client',
        message: 'What is project short code?\n',
        default: 'ECHO'
      },
      {
        type: 'input',
        name: 'theme',
        message: 'What is the theme name?\n',
        default: 'Echokit'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Short (one sentence) description of project:\n',
        default: 'Only the best frickin theme ever'
      },
      {
        type: 'list',
        name: 'cms',
        message: 'What is the CMS?',
        choices: [ "Drupal", "Wordpress", "none" ],
        default: 'none'
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
        default: false
      },
      {
        type: 'checkbox',
        name: 'bowerplugins',
        message: 'What bower plugins do you need?',
        choices: [{
            name: 'enquire',
            value: 'enquire',
            checked: false
        }, {
            name: 'matchHeight',
            value: 'matchHeight',
            checked: false
        }, {
            name: 'chosen',
            value: 'chosen',
            checked: false
        }, {
            name: 'waypoints',
            value: 'waypoints',
            checked: false
        }]
      },
      {
        type: 'checkbox',
        name: 'gruntplugins',
        message: 'What extra grunt build tools do you need?',
        choices: [{
            name: 'gruntsprites',
            value: 'gruntsprites',
            checked: false
        }]
      },
      {
        type: 'confirm',
        name: 'installitall',
        message: 'Do you want to install all bower and grunt depenencies?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      var bowerplugins = props.bowerplugins;

      function hasBowerPlugin(feat) {
        return bowerplugins.indexOf(feat) !== -1;
      }

      this.enquire = hasBowerPlugin('enquire');
      this.matchHeight = hasBowerPlugin('matchHeight');
      this.chosen = hasBowerPlugin('chosen');
      this.waypoints = hasBowerPlugin('waypoints');
      this.icomoon = hasBowerPlugin('icomoon');
      this.webfonts = hasBowerPlugin('webfonts');
      this.gruntsprites = hasBowerPlugin('gruntsprites');

      var gruntplugins = props.gruntplugins;

      function hasGruntPlugin(feat) {
        return gruntplugins.indexOf(feat) !== -1;
      }

      this.sprites = hasGruntPlugin('gruntsprites');

      done();
    }.bind(this));
  },

  // write our files
  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
            { 
              sprites: this.sprites,
              cms: this.props.cms
            }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
            { 
              enquire: this.enquire,
              matchHeight: this.matchHeight,
              chosen: this.chosen,
              waypoints: this.waypoints
            }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('config'),
        this.destinationPath('config')
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('.nvmrc'),
        this.destinationPath('.nvmrc')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
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

      if (this.props.patternlab == true) {
        this.fs.copy(
          this.templatePath('patternlab'),
          this.destinationPath('patternlab')
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
      } else {

        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('index.html'),
            { 
              description: this.props.description,
              title: this.props.client
            }
        );

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

    if (this.props.installitall == true) {
      this.installDependencies();
    }
  },
  end: function() {
    if (this.props.patternlab == true) {
      console.log('Next steps:');
    }
  }

});
