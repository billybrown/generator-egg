'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Get our info
    var prompts = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the component name?',
            default: 'Tree'
        },{
            type: 'input',
            name: 'description',
            message: 'Describe the component and why its necessary:',
            default: 'I just need it, damn it.'
        },{
            type: 'list',
            name: 'type',
            message: 'What type of CSS file is it?',
            choices: [ "element", "utility", "component", "area" ],
            default: 'component'
        },{
            type: 'confirm',
            name: 'link',
            message: 'Is the entire thing a single link?',
            default: 'no'
        },{
            type: 'checkbox',
            name: 'elements',
            message: 'What elements does it have?',
            choices: [{
                name: 'title',
                value: 'title',
                checked: true
            }, {
                name: 'content',
                value: 'content',
                checked: false
            }, {
                name: 'header',
                value: 'header',
                checked: false
            }, {
                name: 'footer',
                value: 'footer',
                checked: false
            }, {
                name: 'imagegroup',
                value: 'imagegroup',
                checked: false
            }, {
                name: 'textgroup',
                value: 'textgroup',
                checked: false
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

  // write our files
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
  }
});
