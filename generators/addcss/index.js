'use strict';

require('shelljs/global');

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({
    prompting: function () { 
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'components',
            message: 'Which CSS component(s) do you want to add?',
            choices: [{
                name: 'Card',
                value: 'Card',
                checked: false
            }, {
                name: 'Slat',
                value: 'Slat',
                checked: false
            }, {
                name: 'CardLink',
                value: 'CardLink',
                checked: false
            }, {
                name: 'SlatLink',
                value: 'SlatLink',
                checked: false
            }, {
                name: 'ScreenLink',
                value: 'ScreenLink',
                checked: false
            }, {
                name: 'ListBox',
                value: 'ListBox',
                checked: false
            }, {
                name: 'SmallListBox',
                value: 'SmallListBox',
                checked: false
            }, {
                name: 'Well',
                value: 'Well',
                checked: false
            }]
        },
        {
            type: 'confirm',
            name: 'patternlab',
            message: 'Are you using a pattern library?',
            default: false
        }];


        this.prompt(prompts, function (props) {
            this.props = props;

            var components = props.components;

            function hasAsset(feat) {
                return components.indexOf(feat) !== -1;
            }

            this.Card = hasAsset('Card');
            this.CardLink = hasAsset('CardLink');
            this.Slat = hasAsset('Slat');
            this.SlatLink = hasAsset('SlatLink');
            this.ScreenLink = hasAsset('ScreenLink');
            this.ListBox = hasAsset('ListBox');
            this.SmallListBox = hasAsset('SmallListBox');
            this.Well = hasAsset('Well');


            // not sure about these variables yet
            // if (this.CardLink == true)  {
            //     this.prompt([{
            //         type: 'input',
            //         name: 'CardLink__maxWidth',
            //         message: 'What is the max-width of the CardLink?',
            //         default: '570px'   
            //     }, {
            //         type: 'input',
            //         name: 'CardLink__bg',
            //         message: 'What is the background of the CardLink?',
            //         default: '$gray'
            //     }], function (response) {
            //         this.response = response;

            //         this.CardLink__maxWidth = response.CardLink__maxWidth;       
            //         this.CardLink__bg = response.CardLink__bg;       

            //         done();
            //     }.bind(this));
            // }

            // if (this.ScreenLink == true) {
            //     this.prompt([{
            //         type: 'input',
            //         name: 'ScreenLink__maxWidth',
            //         message: 'What is the max-width of the ScreenLink?',
            //         default: '570px'   
            //     }, {
            //         type: 'input',
            //         name: 'ScreenLink__bg',
            //         message: 'What is the fallback background color of the ScreenLink?',
            //         default: '$gray'
            //     }], function (response) {
            //         this.response = response;

            //         this.ScreenLink__maxWidth = response.ScreenLink__maxWidth;       
            //         this.ScreenLink__bg = response.ScreenLink__bg;       

            //         done();
            //     }.bind(this));       
            // }

            // if (this.Well == true) {
            //     this.prompt([{
            //         type: 'input',
            //         name: 'Well__bg',
            //         message: 'What is the background color of Wells?',
            //         default: '$gray'
            //     }], function (response) {
            //         this.response = response;

            //         this.Well__bg = response.Well__bg;       

            //         done();
            //     }.bind(this)); 
            // }

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.CardLink == true) {
                this.fs.copyTpl(
                    this.templatePath('_CardLink.scss'),
                    this.destinationPath('src/sass/patterns/_CardLink.scss'), { 
                        maxwidth: this.CardLink__maxWidth,
                        bg: this.CardLink__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('CardLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/CardLink.twig')
                );
            }
            if (this.ScreenLink == true) {
                this.fs.copyTpl(
                    this.templatePath('_ScreenLink.scss'),
                    this.destinationPath('src/sass/patterns/_ScreenLink.scss'), { 
                        maxwidth: this.ScreenLink__maxWidth,
                        bg: this.ScreenLink__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('ScreenLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/ScreenLink.twig')
                );
            }
            if (this.SlatLink == true) {
                this.fs.copy(
                    this.templatePath('_SlatLink.scss'),
                    this.destinationPath('src/sass/patterns/_SlatLink.scss')
                );
                this.fs.copy(
                    this.templatePath('SlatLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/SlatLink.twig')
                );
            }
            if (this.SmallListBox == true) {
                this.fs.copy(
                    this.templatePath('_SmallListBox.scss'),
                    this.destinationPath('src/sass/patterns/_SmallListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('SmallListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/SmallListBox.twig')
                );
            }
            if (this.Well == true) {
                this.fs.copyTpl(
                    this.templatePath('_Well.scss'),
                    this.destinationPath('src/sass/patterns/_Well.scss'), { 
                        bg: this.Well__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('Well.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/Well.twig')
                );
            }
            if (this.Card == true) {
                this.fs.copy(
                    this.templatePath('_Card.scss'),
                    this.destinationPath('src/sass/patterns/_Card.scss')
                );
                this.fs.copy(
                    this.templatePath('Card.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/Card.twig')
                );
            }
            if (this.Slat == true) {
                this.fs.copy(
                    this.templatePath('_Slat.scss'),
                    this.destinationPath('src/sass/patterns/_Slat.scss')
                );
                this.fs.copy(
                    this.templatePath('Slat.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/Slat.twig')
                );
            }
            if (this.ListBox == true) {
                this.fs.copy(
                    this.templatePath('_ListBox.scss'),
                    this.destinationPath('src/sass/patterns/_ListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('ListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/ListBox.twig')
                );
            }
        },

        extra: function () {
            for ( var item in this.props.components) {
                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | patterns -+++-//',
                    path   = 'src/sass/main.scss',
                    file   = wiring.readFileAsString(path),
                    slug   = this.props.components[item].replace(/ /g, '_'),
                    insert = "@import 'patterns/" + slug + "';";

                if (file.indexOf(insert) === -1) {
                  this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
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

