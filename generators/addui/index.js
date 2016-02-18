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
                name: 'PrimaryNav',
                value: 'PrimaryNav',
                checked: false
            }, {
                name: 'SecondaryNav',
                value: 'SecondaryNav',
                checked: false
            }, {
                name: 'FooterLogo',
                value: 'FooterLogo',
                checked: false
            }, {
                name: 'FooterNav',
                value: 'FooterNav',
                checked: false
            }, {
                name: 'FooterContact',
                value: 'FooterContact',
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

            this.HeaderNewsletter = hasAsset('HeaderNewsletter');
            this.HeaderDonate = hasAsset('HeaderDonate');
            this.HeaderSocial = hasAsset('HeaderSocial');
            this.HeaderSearch = hasAsset('HeaderSearch');
            this.HeaderLogo = hasAsset('HeaderLogo');
            this.PrimaryNav = hasAsset('PrimaryNav');
            this.SecondaryNav = hasAsset('SecondaryNav');
            this.FooterLogo = hasAsset('FooterLogo');
            this.FooterContact = hasAsset('FooterContact');
            this.FooterNav = hasAsset('FooterNav');
            this.Pagination = hasAsset('Pagination');
            this.Breadcrumbs = hasAsset('Breadcrumbs');
            this.SocialList = hasAsset('SocialList');
            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.HeaderNewsletter == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderNewsletter.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderNewsletter.twig')
                    );
                }
            }
            if (this.HeaderDonate == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderDonate.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderDonate.twig')
                    );
                }
            }
            if (this.HeaderSocial == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderSocial.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderSocial.twig')
                    );
                }
            }
            if (this.HeaderSearch == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderSearch.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderSearch.twig')
                    );
                }
            }

            if (this.PrimaryNav == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('PrimaryNav.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/PrimaryNav.twig')
                    );
                }
            }
            if (this.SecondaryNav == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('SecondaryNav.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/SecondaryNav.twig')
                    );
                }
            }
            if (this.HeaderLogo == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderLogo.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderLogo.twig')
                    );
                }
            }
            if (this.FooterNav == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterNav.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterNav.twig')
                    );
                }
            }
            if (this.FooterLogo == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterLogo.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterLogo.twig')
                    );
                }
            }
            if (this.FooterContact == true) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterContact.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterContact.twig')
                    );
                }
            }

            if (this.Breadcrumbs == true) {
                this.fs.copy(
                    this.templatePath('_Breadcrumbs.scss'),
                    this.destinationPath('src/sass/components/_Breadcrumbs.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('Breadcrumbs.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/custom/Breadcrumbs.twig')
                    );
                }
            }
            if (this.Pagination == true) {
                this.fs.copy(
                    this.templatePath('_Pagination.scss'),
                    this.destinationPath('src/sass/components/_Pagination.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('Pagination.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/custom/Pagination.twig')
                    );
                }
            }
            
            if (this.SocialList == true) {
                this.fs.copy(
                    this.templatePath('_SocialList.scss'),
                    this.destinationPath('src/sass/components/_SocialList.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('SocialList.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/custom/SocialList.twig')
                    );
                }
            }

        },

        extra: function () {

            for ( var item in this.props.components) {


                // if its something that needs to go into the header
                if (    this.props.components[item] === "HeaderLogo" ||
                        this.props.components[item] === "PrimaryNav" ||
                        this.props.components[item] === "SecondaryNav" ||
                        this.props.components[item] === "HeaderNewsletter" ||
                        this.props.components[item] === "HeaderDonate" ||
                        this.props.components[item] === "HeaderSocial" ||
                        this.props.components[item] === "HeaderSearch"
                 ) {

                    var headerhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | header -+++-//-->';
                    var headerpath   = 'patternlab/source/_layouts/header/header.twig';
                    var headerfile   = wiring.readFileAsString(headerpath);
                    var headerslug   = this.props.components[item].replace(/ /g, '_');
                    var headerinsert = "{% include 'header/" + headerslug + ".twig' %}";

                    if (headerfile.indexOf(headerinsert) === -1) {
                      this.writeFileFromString(headerfile.replace(headerhook, headerinsert+'\n'+'\t\t'+headerhook), headerpath);
                    }

                    var headerCSShook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | header -+++-//';
                    var headerCSSpath   = 'src/sass/components/_Header.scss';
                    var headerCSSfile   = wiring.readFileAsString(headerCSSpath);
                    var headerCSSinsert = wiring.readFileAsString(this.templatePath('_' + this.props.components[item] + '.scss'));

                    if (headerCSSfile.indexOf(headerCSSinsert) === -1) {
                      this.writeFileFromString(headerCSSfile.replace(headerCSShook, '\n'+headerCSSinsert+'\n'+headerCSShook+'\n'), headerCSSpath);
                    }
                }

                // if its something that needs to go into the footer
                if (    this.props.components[item] === "FooterLogo" ||
                        this.props.components[item] === "FooterNav" ||
                        this.props.components[item] === "FooterContact"
                 ) {

                    var footerhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman -+++-//-->';
                    var footerpath   = 'patternlab/source/_layouts/footer/footer.twig';
                    var footerfile   = wiring.readFileAsString(footerpath);
                    var footerslug   = this.props.components[item].replace(/ /g, '_');
                    var footerinsert = "{% include 'footer/" + footerslug + ".twig' %}";

                    if (footerfile.indexOf(footerinsert) === -1) {
                      this.writeFileFromString(footerfile.replace(footerhook, footerinsert+'\n'+'\t\t'+footerhook), footerpath);
                    }

                    var footerCSShook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | footer -+++-//';
                    var footerCSSpath   = 'src/sass/components/_Footer.scss';
                    var footerCSSfile   = wiring.readFileAsString(footerCSSpath);
                    var footerCSSinsert = wiring.readFileAsString(this.templatePath('_' + this.props.components[item] + '.scss'));

                    if (footerCSSfile.indexOf(footerCSSinsert) === -1) {
                      this.writeFileFromString(footerCSSfile.replace(footerCSShook, '\n'+footerCSSinsert+'\n'+footerCSShook+'\n'), footerCSSpath);
                    }
                }

                // if it has its own component scss partial
                if (this.props.components[item] === "Pagination" ||
                    this.props.components[item] === "Breadcrumbs"  ||
                    this.props.components[item] === "SocialList" 
                ) {
                    var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';
                    var path   = 'src/sass/main.scss';
                    var file   = wiring.readFileAsString(path);
                    var slug   = this.props.components[item].replace(/ /g, '_');
                    var insert = "@import 'components/" + slug + "';";

                    if (file.indexOf(insert) === -1) {
                      this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
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

