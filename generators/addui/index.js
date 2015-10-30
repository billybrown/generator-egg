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
            message: 'Which UI component do you want to add?',
            choices: [{
                name: 'HeaderNewsletter',
                value: 'HeaderNewsletter',
                checked: false
            }, {
                name: 'HeaderDonate',
                value: 'HeaderDonate',
                checked: false
            }, {
                name: 'HeaderSocial',
                value: 'HeaderSocial',
                checked: false
            }, {
                name: 'HeaderSearch',
                value: 'HeaderSearch',
                checked: false
            }, {
                name: 'HeaderLogo',
                value: 'HeaderLogo',
                checked: false
            }, {
                name: 'PrimaryMenu',
                value: 'PrimaryMenu',
                checked: false
            }, {
                name: 'SecondaryMenu',
                value: 'SecondaryMenu',
                checked: false
            }, {
                name: 'FooterLogo',
                value: 'FooterLogo',
                checked: false
            }, {
                name: 'FooterMenu',
                value: 'FooterMenu',
                checked: false
            }, {
                name: 'FooterContact',
                value: 'FooterContact',
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

            this.HeaderNewsletter = hasAsset('HeaderNewsletter');
            this.HeaderDonate = hasAsset('HeaderDonate');
            this.HeaderSocial = hasAsset('HeaderSocial');
            this.HeaderSearch = hasAsset('HeaderSearch');
            this.HeaderLogo = hasAsset('HeaderLogo');
            this.PrimaryMenu = hasAsset('PrimaryMenu');
            this.SecondaryMenu = hasAsset('SecondaryMenu');
            this.FooterLogo = hasAsset('FooterLogo');
            this.FooterContact = hasAsset('FooterContact');
            this.FooterMenu = hasAsset('FooterMenu');

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.HeaderNewsletter == true) {
                this.fs.copy(
                    this.templatePath('_HeaderNewsletter.scss'),
                    this.destinationPath('src/sass/specifics/_HeaderNewsletter.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderNewsletter.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderNewsletter.twig')
                    );
                }
            }
            if (this.HeaderDonate == true) {
                this.fs.copy(
                    this.templatePath('_HeaderDonate.scss'),
                    this.destinationPath('src/sass/specifics/_HeaderDonate.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderDonate.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderDonate.twig')
                    );
                }
            }
            if (this.HeaderSocial == true) {
                this.fs.copy(
                    this.templatePath('_HeaderSocial.scss'),
                    this.destinationPath('src/sass/specifics/_HeaderSocial.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderSocial.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderSocial.twig')
                    );
                }
            }
            if (this.HeaderSearch == true) {
                this.fs.copy(
                    this.templatePath('_HeaderSearch.scss'),
                    this.destinationPath('src/sass/specifics/_HeaderSearch.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderSearch.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderSearch.twig')
                    );
                }
            }

            if (this.PrimaryMenu == true) {
                this.fs.copy(
                    this.templatePath('_PrimaryMenu.scss'),
                    this.destinationPath('src/sass/specifics/_PrimaryMenu.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('PrimaryMenu.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/PrimaryMenu.twig')
                    );
                }
            }
            if (this.SecondaryMenu == true) {
                this.fs.copy(
                    this.templatePath('_SecondaryMenu.scss'),
                    this.destinationPath('src/sass/specifics/_SecondaryMenu.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('SecondaryMenu.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/SecondaryMenu.twig')
                    );
                }
            }
            if (this.HeaderLogo == true) {
                this.fs.copy(
                    this.templatePath('_HeaderLogo.scss'),
                    this.destinationPath('src/sass/specifics/_HeaderLogo.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderLogo.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderLogo.twig')
                    );
                }
            }
            if (this.FooterMenu == true) {
                this.fs.copy(
                    this.templatePath('_FooterMenu.scss'),
                    this.destinationPath('src/sass/specifics/_FooterMenu.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterMenu.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterMenu.twig')
                    );
                }
            }
            if (this.FooterLogo == true) {
                this.fs.copy(
                    this.templatePath('_FooterLogo.scss'),
                    this.destinationPath('src/sass/specifics/_FooterLogo.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterLogo.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterLogo.twig')
                    );
                }
            }
            if (this.FooterContact == true) {
                this.fs.copy(
                    this.templatePath('_FooterContact.scss'),
                    this.destinationPath('src/sass/specifics/_FooterContact.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterContact.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterContact.twig')
                    );
                }
            }

        },

        extra: function () {

            for ( var item in this.props.components) {

                // if its something that needs to go in "specifics" sass partial directory
                // basically just all header/footer and page specific content:
                if (    this.props.components[item] === "HeaderLogo" ||
                        this.props.components[item] === "PrimaryMenu" ||
                        this.props.components[item] === "SecondaryMenu" ||
                        this.props.components[item] === "HeaderNewsletter" ||
                        this.props.components[item] === "HeaderDonate" ||
                        this.props.components[item] === "HeaderSearch" ||
                        this.props.components[item] === "HeaderSocial" ||
                        this.props.components[item] === "FooterLogo" ||
                        this.props.components[item] === "FooterMenu" ||
                        this.props.components[item] === "FooterContact"
                ) {

                    var specifichook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | specifics -+++-//',
                        specificpath   = 'src/sass/main.scss',
                        specificfile   = wiring.readFileAsString(specificpath),
                        specificslug   = this.props.components[item].replace(/ /g, '_'),
                        specificinsert = "@import 'specifics/" + specificslug + "';";

                    if (specificfile.indexOf(specificinsert) === -1) {
                      this.writeFileFromString(specificfile.replace(specifichook, specificinsert+'\n'+specifichook), specificpath);
                    }
                }

                // if its something that needs to go into the header
                if (    this.props.components[item] === "HeaderLogo" ||
                        this.props.components[item] === "PrimaryMenu" ||
                        this.props.components[item] === "SecondaryMenu" ||
                        this.props.components[item] === "HeaderNewsletter" ||
                        this.props.components[item] === "HeaderDonate" ||
                        this.props.components[item] === "HeaderSocial" ||
                        this.props.components[item] === "HeaderSearch"
                 ) {

                    var headerhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | header -+++-//-->',
                        headerpath   = 'patternlab/source/_layouts/header/header.twig',
                        headerfile   = wiring.readFileAsString(headerpath),
                        headerslug   = this.props.components[item].replace(/ /g, '_'),
                        headerinsert = "{% include 'header/" + headerslug + ".twig' %}"

                    if (headerfile.indexOf(headerinsert) === -1) {
                      this.writeFileFromString(headerfile.replace(headerhook, headerinsert+'\n'+'\t\t'+headerhook), headerpath);
                    }
                }

                // if its something that needs to go into the footer
                if (    this.props.components[item] === "FooterLogo" ||
                        this.props.components[item] === "FooterMenu" ||
                        this.props.components[item] === "FooterContact"
                 ) {

                    var footerhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman -+++-//-->',
                        footerpath   = 'patternlab/source/_layouts/footer/footer.twig',
                        footerfile   = wiring.readFileAsString(footerpath),
                        footerslug   = this.props.components[item].replace(/ /g, '_'),
                        footerinsert = "{% include 'footer/" + footerslug + ".twig' %}"

                    if (footerfile.indexOf(footerinsert) === -1) {
                      this.writeFileFromString(footerfile.replace(footerhook, footerinsert+'\n'+'\t\t'+footerhook), footerpath);
                    }
                }
            }
        }
    },
    install: function() {

        // new compiled of css
        exec("grunt css");
        exec("grunt js");
        // new build of the pattern library
        if (this.props.patternlab == true) {
            exec("php ./patternlab/core/console --generate");
        }
    }
});

