'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({
    prompting: function () { 
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'components',
            message: 'Which CSS component do you want to add?',
            choices: [
                'CardLink',
                'ScreenLink',
                'SlatLink',
                'SmallListBox',
                'Well'
            ]
        }];

        this.prompt(prompts, function (props) {
            this.props = props;

            var components = props.components;

            function hasAsset(feat) {
                return components.indexOf(feat) !== -1;
            }

            this.CardLink = hasAsset('CardLink');
            this.ScreenLink = hasAsset('ScreenLink');
            this.SlatLink = hasAsset('SlatLink');
            this.SmallListBox = hasAsset('SmallListBox');
            this.Well = hasAsset('Well');


        if (this.CardLink == true)  {
            this.prompt([{
                type: 'input',
                name: 'CardLink__maxWidth',
                message: 'What is the max-width of the card?',
                default: '570px'   
            }, {
                type: 'input',
                name: 'CardLink__bg',
                message: 'What is the background of the card?',
                default: '$gray'
            }], function (response) {
                this.response = response;

                this.CardLink__maxWidth = response.CardLink__maxWidth;       
                this.CardLink__bg = response.CardLink__bg;       

                done();
            }.bind(this)); 
        } else if (this.ScreenLink == true) {
            this.prompt([{
                type: 'input',
                name: 'ScreenLink__maxWidth',
                message: 'What is the max-width of the ScreenLink?',
                default: '570px'   
            }, {
                type: 'input',
                name: 'ScreenLink__bg',
                message: 'What is the fallback background color of the ScreenLink?',
                default: '$gray'
            }], function (response) {
                this.response = response;

                this.ScreenLink__maxWidth = response.ScreenLink__maxWidth;       
                this.ScreenLink__bg = response.ScreenLink__bg;       

                done();
            }.bind(this));                 
        } else if (this.Well == true) {
            this.prompt([{
                type: 'input',
                name: 'Well__bg',
                message: 'What is the background color of Wells?',
                default: '$gray'
            }], function (response) {
                this.response = response;

                this.Well__bg = response.Well__bg;       

                done();
            }.bind(this));                 
        } else {
            done();
        }

        }.bind(this));
    },

    writing: {

    projectfiles: function () {

        if (this.CardLink == true) {
            this.fs.copyTpl(
                this.templatePath('_CardLink.scss'),
                this.destinationPath('src/sass/components/_CardLink.scss'), { 
                    maxwidth: this.CardLink__maxWidth,
                    bg: this.CardLink__bg
                }
            );
            this.fs.copy(
                this.templatePath('CardLink.twig'),
                this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/CardLink.twig')
            );
        } else if (this.ScreenLink == true) {
            this.fs.copyTpl(
                this.templatePath('_ScreenLink.scss'),
                this.destinationPath('src/sass/components/_ScreenLink.scss'), { 
                    maxwidth: this.ScreenLink__maxWidth,
                    bg: this.ScreenLink__bg
                }
            );
            this.fs.copy(
                this.templatePath('ScreenLink.twig'),
                this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/ScreenLink.twig')
            );
        } else if (this.SlatLink == true) {
            this.fs.copy(
                this.templatePath('_SlatLink.scss'),
                this.destinationPath('src/sass/components/_SlatLink.scss')
            );
            this.fs.copy(
                this.templatePath('SlatLink.twig'),
                this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/SlatLink.twig')
            );
        } else if (this.SmallListBox == true) {
            this.fs.copy(
                this.templatePath('_SmallListBox.scss'),
                this.destinationPath('src/sass/components/_SmallListBox.scss')
            );
            this.fs.copy(
                this.templatePath('SmallListBox.twig'),
                this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/SmallListBox.twig')
            );
        } else if (this.Well == true) {
            this.fs.copyTpl(
                this.templatePath('_Well.scss'),
                this.destinationPath('src/sass/components/_Well.scss'), { 
                    bg: this.Well__bg
                }
            );
            this.fs.copy(
                this.templatePath('Well.twig'),
                this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/Well.twig')
            );
        }
    },

    extra: function () {
        var hook   = '//-+++- components DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//',
            path   = 'src/sass/main.scss',
            file   = wiring.readFileAsString(path),
            slug   = this.props.components.replace(/ /g, '_'),
            insert = "@import 'components/" + slug + "';";

        if (file.indexOf(insert) === -1) {
          this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
        }
    }

  },

  install: function () {
    // this.installDependencies();
  }
});

