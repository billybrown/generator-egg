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
                name: 'TeaserLink',
                value: 'TeaserLink',
                checked: false
            }, {
                name: 'TeaserCard',
                value: 'TeaserCard',
                checked: false
            }, {
                name: 'TeaserCardLink',
                value: 'TeaserCardLink',
                checked: false
            }, {
                name: 'TeaserScreenLink',
                value: 'TeaserScreenLink',
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
                name: 'borderList',
                value: 'borderList',
                checked: false
            }, {
                name: 'brandList',
                value: 'brandList',
                checked: false
            }, {
                name: 'commaList',
                value: 'commaList',
                checked: false
            }, {
                name: 'pipeList',
                value: 'pipeList',
                checked: false
            }, {
                name: 'nub',
                value: 'nub',
                checked: false
            }, {
                name: 'Pagination',
                value: 'Pagination',
                checked: false
            }, {
                name: 'Breadcrumbs',
                value: 'Breadcrumbs',
                checked: false
            }, {
                name: 'CaptionImage',
                value: 'CaptionImage',
                checked: false
            }, {
                name: 'SocialList',
                value: 'SocialList',
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

            this.TeaserCard = hasAsset('TeaserCard');
            this.TeaserCardLink = hasAsset('TeaserCardLink');
            this.TeaserLink = hasAsset('TeaserLink');
            this.TeaserScreenLink = hasAsset('TeaserScreenLink');
            this.ListBox = hasAsset('ListBox');
            this.SmallListBox = hasAsset('SmallListBox');
            this.Well = hasAsset('Well');
            this.borderList = hasAsset('borderList');
            this.brandList = hasAsset('brandList');
            this.commaList = hasAsset('commaList');
            this.pipeList = hasAsset('pipeList');
            this.nub = hasAsset('nub');
            this.Pagination = hasAsset('Pagination');
            this.Breadcrumbs = hasAsset('Breadcrumbs');
            this.CaptionImage = hasAsset('CaptionImage');
            this.SocialList = hasAsset('SocialList');

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

            if (this.TeaserCardLink == true) {
                this.fs.copyTpl(
                    this.templatePath('_TeaserCardLink.scss'),
                    this.destinationPath('src/sass/modules/_TeaserCardLink.scss'), { 
                        maxwidth: this.TeaserCardLink__maxWidth,
                        bg: this.TeaserCardLink__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('TeaserCardLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/TeaserCardLink.twig')
                );
            }
            if (this.TeaserScreenLink == true) {
                this.fs.copyTpl(
                    this.templatePath('_TeaserScreenLink.scss'),
                    this.destinationPath('src/sass/modules/_TeaserScreenLink.scss'), { 
                        maxwidth: this.TeaserScreenLink__maxWidth,
                        bg: this.TeaserScreenLink__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('TeaserScreenLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/TeaserScreenLink.twig')
                );
            }
            if (this.TeaserLink == true) {
                this.fs.copy(
                    this.templatePath('_TeaserLink.scss'),
                    this.destinationPath('src/sass/modules/_TeaserLink.scss')
                );
                this.fs.copy(
                    this.templatePath('TeaserLink.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/TeaserLink.twig')
                );
            }
            if (this.SmallListBox == true) {
                this.fs.copy(
                    this.templatePath('_SmallListBox.scss'),
                    this.destinationPath('src/sass/modules/_SmallListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('SmallListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/SmallListBox.twig')
                );
            }
            if (this.Well == true) {
                this.fs.copyTpl(
                    this.templatePath('_Well.scss'),
                    this.destinationPath('src/sass/modules/_Well.scss'), { 
                        bg: this.Well__bg
                    }
                );
                this.fs.copy(
                    this.templatePath('Well.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/Well.twig')
                );
            }
            if (this.TeaserCard == true) {
                this.fs.copy(
                    this.templatePath('_TeaserCard.scss'),
                    this.destinationPath('src/sass/modules/_TeaserCard.scss')
                );
                this.fs.copy(
                    this.templatePath('TeaserCard.twig'),
                    this.destinationPath('patternlab/source/_patterns/01-molecules/01-custom-objects/TeaserCard.twig')
                );
            }
            if (this.ListBox == true) {
                this.fs.copy(
                    this.templatePath('_ListBox.scss'),
                    this.destinationPath('src/sass/modules/_ListBox.scss')
                );
                this.fs.copy(
                    this.templatePath('ListBox.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/ListBox.twig')
                );
            }
            if (this.borderList == true) {
                this.fs.copy(
                    this.templatePath('_borderList.scss'),
                    this.destinationPath('src/sass/base/_borderList.scss')
                );
                this.fs.copy(
                    this.templatePath('borderList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/borderList.twig')
                );
            }
            if (this.brandList == true) {
                this.fs.copy(
                    this.templatePath('_brandList.scss'),
                    this.destinationPath('src/sass/base/_brandList.scss')
                );
                this.fs.copy(
                    this.templatePath('brandList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/brandList.twig')
                );
            }
            if (this.commaList == true) {
                this.fs.copy(
                    this.templatePath('_commaList.scss'),
                    this.destinationPath('src/sass/base/_commaList.scss')
                );
                this.fs.copy(
                    this.templatePath('commaList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/commaList.twig')
                );
            }
            if (this.pipeList == true) {
                this.fs.copy(
                    this.templatePath('_pipeList.scss'),
                    this.destinationPath('src/sass/base/_pipeList.scss')
                );
                this.fs.copy(
                    this.templatePath('pipeList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/pipeList.twig')
                );
            }
            if (this.nub == true) {
                this.fs.copy(
                    this.templatePath('_nub.scss'),
                    this.destinationPath('src/sass/base/_nub.scss')
                );
                this.fs.copy(
                    this.templatePath('nub.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/nub.twig')
                );
            }

            if (this.Breadcrumbs == true) {
                this.fs.copy(
                    this.templatePath('_Breadcrumbs.scss'),
                    this.destinationPath('src/sass/modules/_Breadcrumbs.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('01-Breadcrumbs.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/01-Breadcrumbs.twig')
                    );
                }
            }
            if (this.Pagination == true) {
                this.fs.copy(
                    this.templatePath('_Pagination.scss'),
                    this.destinationPath('src/sass/modules/_Pagination.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('05-Pagination.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/05-Pagination.twig')
                    );
                }
            }
            if (this.CaptionImage == true) {
                this.fs.copy(
                    this.templatePath('_CaptionImage.scss'),
                    this.destinationPath('src/sass/modules/_CaptionImage.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('10-CaptionImage.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/10-CaptionImage.twig')
                    );
                }
            }
            if (this.SocialList == true) {
                this.fs.copy(
                    this.templatePath('_SocialList.scss'),
                    this.destinationPath('src/sass/modules/_SocialList.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('SocialList.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/20-SocialList.twig')
                    );
                }
            }
        },

        extra: function () {

            for ( var item in this.props.components) {

                if (this.TeaserCard  == true ||
                    this.TeaserCardLink == true ||
                    this.TeaserLink == true ||
                    this.TeaserScreenLink == true ||
                    this.ListBox == true ||
                    this.SmallListBox == true ||
                    this.Well == true ||
                    this.Pagination == true ||
                    this.Breadcrumbs == true  ||
                    this.CaptionImage == true  ||
                    this.SocialList == true 
                ) {
                    var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | modules -+++-//',
                        path   = 'src/sass/main.scss',
                        file   = wiring.readFileAsString(path),
                        slug   = this.props.components[item].replace(/ /g, '_'),
                        insert = "@import 'base/" + slug + "';";

                    if (file.indexOf(insert) === -1) {
                      this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
                    }
                }

                if (this.nub  == true ||
                    this.pipeList == true ||
                    this.commaList == true ||
                    this.brandList == true ||
                    this.borderList == true
                ) {

                    var utilhook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | utilities -+++-//',
                        utilpath   = 'src/sass/main.scss',
                        utilfile   = wiring.readFileAsString(utilpath),
                        utilslug   = this.props.components[item].replace(/ /g, '_'),
                        utilinsert = "@import 'utilities/" + utilslug + "';";

                    if (utilfile.indexOf(insert) === -1) {
                      this.writeFileFromString(utilfile.replace(utilhook, utilinsert+'\n'+utilhook), utilpath);
                    }
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

