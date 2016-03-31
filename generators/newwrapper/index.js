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
                    name: 'pagename',
                    message: 'What is the page wrapper name?\n',
                    default: 'Bio'
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
          this.fs.copy(
            this.templatePath('page.twig'),
            this.destinationPath('patternlab/source/_patterns/04-page-wrappers/50-' + this.props.pagename + '.twig') 
          );
        }

    },
    install: function() {
        // new build of the pattern library
        exec("php ./patternlab/core/console --generate");
    }
});
