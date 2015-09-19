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
                'Card',
                'Slat',
                'CardLink',
                'ScreenLink',
                'SlatLink',
                'ListBox',
                'SmallListBox',
                'Well',
                'BorderList',
                'BrandList',
                'CommaList',
                'PipeList'
            ]
        }];
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
            }, {
                name: 'BorderList',
                value: 'BorderList',
                checked: false
            }, {
                name: 'CommaList',
                value: 'CommaList',
                checked: false
            }, {
                name: 'BrandList',
                value: 'BrandList',
                checked: false
            }, {
                name: 'PipeList',
                value: 'PipeList',
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
            this.BorderList = hasAsset('BorderList');
            this.BrandList = hasAsset('BrandList');
            this.CommaList = hasAsset('CommaList');
            this.PipeList = hasAsset('PipeList');


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
            }
            if (this.ScreenLink == true) {
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
            }
            if (this.SlatLink == true) {
                this.fs.copy(
                    this.templatePath('_SlatLink.scss'),
                    this.destinationPath('src/sass/components/_SlatLink.scss')
                );
                this.fs.copy(
                    this.templatePath('SlatLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/SlatLink.twig')
                );
            }
            if (this.SmallListBox == true) {
                this.fs.copy(
                    this.templatePath('_SmallListBox.scss'),
                    this.destinationPath('src/sass/components/_SmallListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('SmallListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/SmallListBox.twig')
                );
            }
            if (this.Well == true) {
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
            if (this.Card == true) {
                this.fs.copy(
                    this.templatePath('_Card.scss'),
                    this.destinationPath('src/sass/components/_Card.scss')
                );
                this.fs.copy(
                    this.templatePath('Card.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/Card.twig')
                );
            }
            if (this.Slat == true) {
                this.fs.copy(
                    this.templatePath('_Slat.scss'),
                    this.destinationPath('src/sass/components/_Slat.scss')
                );
                this.fs.copy(
                    this.templatePath('Slat.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/Slat.twig')
                );
            }
            if (this.ListBox == true) {
                this.fs.copy(
                    this.templatePath('_ListBox.scss'),
                    this.destinationPath('src/sass/components/_ListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('ListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/ListBox.twig')
                );
            }
            if (this.BorderList == true) {
                this.fs.copy(
                    this.templatePath('_BorderList.scss'),
                    this.destinationPath('src/sass/components/_BorderList.scss')
                );
                this.fs.copy(
                    this.templatePath('BorderList.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-organisms/01-custom-objects/BorderList.twig')
                );
            }
            if (this.BrandList == true) {
                this.fs.copy(
                    this.templatePath('_BrandList.scss'),
                    this.destinationPath('src/sass/components/_BrandList.scss')
                );
                this.fs.copy(
                    this.templatePath('BrandList.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-organisms/01-custom-objects/BrandList.twig')
                );
            }
            if (this.CommaList == true) {
                this.fs.copy(
                    this.templatePath('_CommaList.scss'),
                    this.destinationPath('src/sass/components/_CommaList.scss')
                );
                this.fs.copy(
                    this.templatePath('CommaList.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-organisms/01-custom-objects/CommaList.twig')
                );
            }
            if (this.PipeList == true) {
                this.fs.copy(
                    this.templatePath('_PipeList.scss'),
                    this.destinationPath('src/sass/components/_PipeList.scss')
                );
                this.fs.copy(
                    this.templatePath('PipeList.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-organisms/01-custom-objects/PipeList.twig')
                );
            }
        },

        extra: function () {
            for ( var item in this.props.components) {
                var hook   = '//-+++- components DONT REMOVE THIS COMMENT! its used by Yeoman -+++-//',
                    path   = 'src/sass/main.scss',
                    file   = wiring.readFileAsString(path),
                    slug   = this.props.components[item].replace(/ /g, '_'),
                    insert = "@import 'components/" + slug + "';";

                if (file.indexOf(insert) === -1) {
                  this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
                }
            }
        }
    }
});

