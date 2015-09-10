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
            message: 'What type of CSS group does it fall into?',
            choices: [ "elements", "utilities", "components", "areas" ],
            default: 'components'
        },{
            type: 'confirm',
            name: 'patternlab',
            message: 'Is their a pattern library?',
            default: 'n'
        },{
            type: 'list',
            name: 'atomictype',
            message: 'What group does it fall within atomic design?',
            choices: [ "00-atoms/09-misc", "01-molecules/01-custom-objects", "02-organisms/99-misc"  ],
            default: '01-molecules/01-custom-objects'
        },{
            type: 'confirm',
            name: 'link',
            message: 'Is the entire thing a single link?',
            default: 'n'
        },{
            type: 'list',
            name: 'html',
            message: 'What html element is it?',
            choices: [ "div", "section", "article" ],
            default: 'div'
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
        }, {
            type: 'list',
            name: 'htmltitle',
            message: 'What html element is the title?',
            choices: [ "h2", "h3", "h4", "h5" ],
            default: 'h3'
        }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      var elements = props.elements;

      function hasAsset(feat) {
        return elements.indexOf(feat) !== -1;
      }

      this.title = hasAsset('title');
      this.content = hasAsset('content');
      this.header = hasAsset('header');
      this.footer = hasAsset('footer');
      this.imagegroup = hasAsset('imagegroup');
      this.textgroup = hasAsset('textgroup');

      done();
    }.bind(this));
  },

    // write our files
    writing: {

        projectfiles: function () {
            this.fs.copyTpl(
                this.templatePath('component.scss'),
                this.destinationPath('src/sass/' + this.props.type +'/_' + this.props.name + '.scss'), { 
                    name: this.props.name,
                    description: this.props.description,
                    type: this.props.type,
                    link: this.props.link,
                    title: this.title,
                    content: this.content,
                    header: this.header,
                    footer: this.footer,
                    imagegroup: this.imagegroup,
                    textgroup: this.textgroup
                }
            );

            if (this.props.patternlab = true) {
                this.fs.copyTpl(
                    this.templatePath('component.twig'),
                    this.destinationPath('patternlab/source/_patterns/' + this.props.atomictype + '/' + this.props.name + '.twig'), { 
                        name: this.props.name,
                        description: this.props.description,
                        type: this.props.type,
                        link: this.props.link,
                        html: this.props.html,
                        htmltitle: this.props.htmltitle,
                        title: this.title,
                        content: this.content,
                        header: this.header,
                        footer: this.footer,
                        imagegroup: this.imagegroup,
                        textgroup: this.textgroup
                    }
                );
            }
        },

        extra: function () {

            if (this.props.type = 'components') {
                var hook   = '//-+++- components DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//';
                var insert = "@import 'components/" + slug + "';";
            } else if (this.props.type = 'utilities') {
                var hook   = '//-+++- utilities DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//';
                var insert = "@import 'utilities/" + slug + "';";
            } else if (this.props.type = 'areas') {
                var hook   = '//-+++- areas DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//';
                var insert = "@import 'areas/" + slug + "';";
            } else if (this.props.type = 'elements') {
                var hook   = '//-+++- elements DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//';
                var insert = "@import 'elements/" + slug + "';";
            }
            var path   = 'src/sass/main.scss',
                file   = wiring.readFileAsString(path),
                slug   = this.props.name.replace(/ /g, '_')

            if (file.indexOf(insert) === -1) {
              this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
            }
        }
    }
});
