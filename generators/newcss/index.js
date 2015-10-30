'use strict';

require('shelljs/global');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({

    prompting: {
        innitialPrompt: function () {
            var done = this.async();

            // Get our info
            var prompts = [
                {
                    type: 'input',
                    name: 'objectname',
                    message: 'What is the object name?\n',
                    default: 'TeaserTree'
                },{
                    type: 'input',
                    name: 'objectdescription',
                    message: 'Describe the object and why its necessary:\n',
                    default: 'This component holds information.'
                },{
                    type: 'list',
                    name: 'objecttype',
                    message: 'What type of CSS group does it fall into?',
                    choices: [ "base", "modules", "specifics" ],
                    default: 'modules'
                },{
                    type: 'confirm',
                    name: 'link',
                    message: 'Is the entire thing a single link?',
                    default: false
                },{
                    type: 'confirm',
                    name: 'patternlab',
                    message: 'Do you want to also make a twig file for the pattern library?',
                    default: true
                }
            ];

            this.prompt(prompts, function (props) {
                this.props = props;
                done();
            }.bind(this));
        },
        patternlabPrompts: function () {

            if (this.props.patternlab == true) {
                var done = this.async();

                var prompts2 = [
                    {
                        type: 'list',
                        name: 'atomictype',
                        message: 'What group does it fall within atomic design?',
                        choices: [ "01-base/09-misc", "02-modules/custom" ],
                        default: '01-molecules/01-custom-objects'
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
                            name: 'header',
                            value: 'header',
                            checked: false
                        }, {
                            name: 'content',
                            value: 'content',
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

                this.prompt(prompts2, function (props2) {
                    this.props2 = props2;

                    var elements = props2.elements;

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
            }
        }
    },

    // write our files
    writing: {

        projectfiles: function () {
            this.fs.copyTpl(
                this.templatePath('component.scss'),
                this.destinationPath('src/sass/' + this.props.objecttype +'/_' + this.props.objectname + '.scss'), { 
                    name: this.props.objectname,
                    description: this.props.objectdescription,
                    type: this.props.objecttype,
                    graphic: this.props.graphic,
                    link: this.props.link,
                    title: this.title,
                    content: this.content,
                    header: this.header,
                    footer: this.footer,
                    imagegroup: this.imagegroup,
                    textgroup: this.textgroup
                }
            );

            if (this.props.patternlab == true) {
                this.fs.copyTpl(
                    this.templatePath('component.twig'),
                    this.destinationPath('patternlab/source/_patterns/' + this.props2.atomictype + '/' + this.props.objectname + '.twig'), { 
                        name: this.props.objectname,
                        description: this.props.objectdescription,
                        type: this.props.objecttype,
                        link: this.props.link,
                        html: this.props2.html,
                        htmltitle: this.props2.htmltitle,
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

            var path   = 'src/sass/main.scss',
                file   = wiring.readFileAsString(path),
                slug   = this.props.objectname.replace(/ /g, '_'),
                insert = "@import '" + this.props.objecttype + "/" + slug + "';";

            if (this.props.objecttype == 'modules') {
                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | modules -+++-//';
                var insert = "@import 'modules/" + slug + "';";
            } else if (this.props.objecttype == 'utilities') {
                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | utilities -+++-//';
                var insert = "@import 'base/" + slug + "';";
            } else if (this.props.objecttype == 'areas') {
                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | specifics -+++-//';
                var insert = "@import 'specifics/" + slug + "';";
            }

            if (file.indexOf(insert) === -1) {
              this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
            }
        }
    },
    install: function() {
        // new compiled of css
        exec("grunt css");
        // new build of the pattern library
        if (this.props.patternlab == true) {
            exec("php ./patternlab/core/console --generate");
        }
    }
});
