'use strict';

require('shelljs/global');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = generators.Base.extend({

    prompting: {
        innitialPrompt: function () {
            var done = this.async();

            // Get our info
            var prompts = [
                {
                    type: 'input',
                    name: 'objectname',
                    message: 'What is the object name?\n',
                    default: 'Hero'
                },{
                    type: 'input',
                    name: 'objectdescription',
                    message: 'Describe the object and why its necessary:\n',
                    default: 'This component holds information.'
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
        }
    },

    // write our files
    writing: {

        projectfiles: function () {
            this.fs.copyTpl(
                this.templatePath('component.scss'),
                this.destinationPath('src/sass/components/_' + this.props.objectname + '.scss'), { 
                    name: this.props.objectname,
                    description: this.props.objectdescription
                }
            );

            if (this.props.patternlab == true) {
                this.fs.copyTpl(
                    this.templatePath('component.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-components/custom/' + this.props.objectname + '.twig'), { 
                        name: this.props.objectname
                    }
                );
            }
        },

        extra: function () {

            var path   = 'src/sass/main.scss';
            var file   = wiring.readFileAsString(path);
            var slug   = this.props.objectname.replace(/ /g, '_');
            var insert = "@import 'components/" + slug + "';";
            var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';

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
