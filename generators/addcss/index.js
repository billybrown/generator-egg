'use strict';

require('shelljs/global');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = generators.Base.extend({
    prompting: function () { 
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'components',
            message: 'Which CSS components do you want to add?',
            choices: [{
                name: 'TeaserCard',
                value: 'TeaserCard',
                checked: false
            }, {
                name: 'TeaserListCards',
                value: 'TeaserListCards',
                checked: false
            }]
        },
        {
            type: 'confirm',
            name: 'patternlab',
            message: 'Are you using a pattern library?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;

            var components = props.components;

            function hasAsset(feat) {
                return components.indexOf(feat) !== -1;
            }

            this.TeaserCard = hasAsset('TeaserCard');
            this.TeaserListCards = hasAsset('TeaserListCards');
            done();
            
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.TeaserCard == true) {
                this.fs.copy(
                    this.templatePath('_TeaserCard.scss'),
                    this.destinationPath('src/sass/components/_TeaserCard.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('TeaserCard.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/20-teasers/TeaserCard.twig')
                    );
                }
            }
            if (this.TeaserListCards == true) {
                this.fs.copy(
                    this.templatePath('_TeaserListCards.scss'),
                    this.destinationPath('src/sass/components/_TeaserListCards.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('TeaserListCards.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/30-lists/TeaserListCards.twig')
                    );
                }
            }
            

        },

        extra: function () {

            for ( var item in this.props.components) {

                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';
                var path   = 'src/sass/main.scss';
                var file   = wiring.readFileAsString(path);
                var slug   = this.props.components[item].replace(/ /g, '_');
                var insert = "@import 'components/" + slug + "';";

                if (file.indexOf(insert) === -1) {
                  require("html-wiring").writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
                }
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

