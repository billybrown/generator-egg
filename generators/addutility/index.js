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
            message: 'Which CSS utilities do you want to add?',
            choices: [{
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

            this.borderList = hasAsset('borderList');
            this.brandList = hasAsset('brandList');
            this.commaList = hasAsset('commaList');
            this.pipeList = hasAsset('pipeList');
            this.nub = hasAsset('nub');

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.borderList == true) {
                this.fs.copy(
                    this.templatePath('_borderList.scss'),
                    this.destinationPath('src/sass/utilities/_borderList.scss')
                );
                this.fs.copy(
                    this.templatePath('borderList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/borderList.twig')
                );
            }
            if (this.brandList == true) {
                this.fs.copy(
                    this.templatePath('_brandList.scss'),
                    this.destinationPath('src/sass/utilities/_brandList.scss')
                );
                this.fs.copy(
                    this.templatePath('brandList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/brandList.twig')
                );
            }
            if (this.commaList == true) {
                this.fs.copy(
                    this.templatePath('_commaList.scss'),
                    this.destinationPath('src/sass/utilities/_commaList.scss')
                );
                this.fs.copy(
                    this.templatePath('commaList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/commaList.twig')
                );
            }
            if (this.pipeList == true) {
                this.fs.copy(
                    this.templatePath('_pipeList.scss'),
                    this.destinationPath('src/sass/utilities/_pipeList.scss')
                );
                this.fs.copy(
                    this.templatePath('pipeList.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/pipeList.twig')
                );
            }
            if (this.nub == true) {
                this.fs.copy(
                    this.templatePath('_nub.scss'),
                    this.destinationPath('src/sass/utilities/_nub.scss')
                );
                this.fs.copy(
                    this.templatePath('nub.twig'),
                    this.destinationPath('patternlab/source/_patterns/00-atoms/20-custom-objects/nub.twig')
                );
            }
        },

        extra: function () {
            for ( var item in this.props.components) {
                var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | utilities -+++-//',
                    path   = 'src/sass/main.scss',
                    file   = wiring.readFileAsString(path),
                    slug   = this.props.components[item].replace(/ /g, '_'),
                    insert = "@import 'utilities/" + slug + "';";

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

