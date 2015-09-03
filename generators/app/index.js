'use strict';
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

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: 'Bill Brown'
      },
      {
        type: 'input',
        name: 'client',
        message: 'What is the full name of the project or client?',
        default: 'Echo & Co.'
      },
      {
        type: 'input',
        name: 'client',
        message: 'What is project short code?',
        default: 'ECHO'
      },
      {
        type: 'input',
        name: 'theme',
        message: 'What is the theme name?',
        default: 'Echokit'
      },
      {
        type: 'confirm',
        name: 'ie8',
        message: 'Do you need ie8 support?',
        default: 'yes'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Short (one sentence) description of project:',
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
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins do you need?',
        choices: [{
            name: 'enquire',
            value: 'enquire',
            checked: false
        }, {
            name: 'modernizr',
            value: 'modernizr',
            checked: true
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
        }, {
            name: 'icomoon',
            value: 'icomoon',
            checked: true
        }, {
            name: 'webfonts',
            value: 'webfonts',
            checked: false
        }, {
            name: 'gruntsprites',
            value: 'gruntsprites',
            checked: false
        }, {
            name: 'Fitvids',
            value: 'Fitvids',
            checked: true
        }]
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      var plugins = props.plugins;

      function hasAsset(feat) {
        return plugins.indexOf(feat) !== -1;
      }

      this.modernizr = hasAsset('modernizr');
      this.fitvids = hasAsset('fitvids');
      this.enquire = hasAsset('enquire');
      this.matchheight = hasAsset('matchHeight');
      this.chosen = hasAsset('chosen');
      this.waypoints = hasAsset('waypoints');
      this.icomoon = hasAsset('icomoon');
      this.webfonts = hasAsset('webfonts');
      this.gruntsprites = hasAsset('gruntsprites');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json')
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
              author: this.props.name
            }
      );
      this.fs.copy(
        this.templatePath('patternlab'),
        this.destinationPath('patternlab')
      );
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );

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

      }

      if (this.props.cms == "Wordpress") {
        this.fs.copy(
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
      }
    }
  },

  install: function () {
    // this.installDependencies();
  }
});


// StyleguideComponentGenerator.prototype.routes = function app() {
//   var hook   = '#===== yeoman hook =====#',
//       path   = 'config/routes.rb',
//       file   = this.require("html-wiring").readFileAsString(path),
//       slug   = this.name.toLowerCase().replace(/ /g, '_'),
//       insert = "get 'styleguide/"+slug+"' => 'styleguide#"+slug+"'";

//   if (file.indexOf(insert) === -1) {
//     this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
//   }
// };

    // extra: function () {
    //     var hook   = '#===== yeoman hook =====#',
    //         path   = 'info.info',
    //         file   = wiring.readFileAsString(path),
    //         slug   = this.props.theme.replace(/ /g, '_'),
    //         insert = slug;

    //     if (file.indexOf(insert) === -1) {
    //       this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
    //     }
    // }