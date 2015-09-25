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
                name: 'MobileMenu',
                value: 'MobileMenu',
                checked: false
            }, {
                name: 'SocialList',
                value: 'SocialList',
                checked: false
            }, {
                name: 'HeaderNewsletter',
                value: 'HeaderNewsletter',
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
            }, {
                name: 'MoreAccordian',
                value: 'MoreAccordian',
                checked: false
            }, {
                name: 'Modal',
                value: 'Modal',
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

            this.Pagination = hasAsset('Pagination');
            this.Breadcrumbs = hasAsset('Breadcrumbs');
            this.CaptionImage = hasAsset('CaptionImage');
            this.MobileMenu = hasAsset('MobileMenu');
            this.SocialList = hasAsset('SocialList');
            this.HeaderNewsletter = hasAsset('HeaderNewsletter');
            this.HeaderSearch = hasAsset('HeaderSearch');
            this.HeaderLogo = hasAsset('HeaderLogo');
            this.PrimaryMenu = hasAsset('PrimaryMenu');
            this.SecondaryMenu = hasAsset('SecondaryMenu');
            this.FooterLogo = hasAsset('FooterLogo');
            this.FooterContact = hasAsset('FooterContact');
            this.FooterMenu = hasAsset('FooterMenu');
            this.MoreAccordian = hasAsset('MoreAccordian');
            this.Modal = hasAsset('Modal');

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.Breadcrumbs == true) {
                this.fs.copy(
                    this.templatePath('_Breadcrumbs.scss'),
                    this.destinationPath('src/sass/areas/_Breadcrumbs.scss')
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
                    this.destinationPath('src/sass/areas/_Pagination.scss')
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
                    this.destinationPath('src/sass/areas/_CaptionImage.scss')
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
                    this.destinationPath('src/sass/areas/_SocialList.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('SocialList.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/20-SocialList.twig')
                    );
                }
            }
            if (this.HeaderNewsletter == true) {
                this.fs.copy(
                    this.templatePath('_HeaderNewsletter.scss'),
                    this.destinationPath('src/sass/areas/_HeaderNewsletter.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderNewsletter.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderNewsletter.twig')
                    );
                }
            }
            if (this.HeaderSearch == true) {
                this.fs.copy(
                    this.templatePath('_HeaderSearch.scss'),
                    this.destinationPath('src/sass/areas/_HeaderSearch.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('HeaderSearch.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/HeaderSearch.twig')
                    );
                }
            }
            if (this.MobileMenu == true) {
                this.fs.copy(
                    this.templatePath('_MobileMenu.scss'),
                    this.destinationPath('src/sass/areas/_MobileMenu.scss')
                );
                this.fs.copy(
                    this.templatePath('mobilemenu.js'),
                    this.destinationPath('src/js/custom/mobilemenu.js')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('MobileMenu.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/MobileMenu.twig')
                    );
                }
            }
            if (this.PrimaryMenu == true) {
                this.fs.copy(
                    this.templatePath('_PrimaryMenu.scss'),
                    this.destinationPath('src/sass/areas/_PrimaryMenu.scss')
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
                    this.destinationPath('src/sass/areas/_SecondaryMenu.scss')
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
                    this.destinationPath('src/sass/areas/_HeaderLogo.scss')
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
                    this.destinationPath('src/sass/areas/_FooterMenu.scss')
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
                    this.destinationPath('src/sass/areas/_FooterLogo.scss')
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
                    this.destinationPath('src/sass/areas/_FooterContact.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('FooterContact.twig'),
                        this.destinationPath('patternlab/source/_layouts/footer/FooterContact.twig')
                    );
                }
            }
            if (this.MoreAccordian == true) {
                this.fs.copy(
                    this.templatePath('_MoreAccordian.scss'),
                    this.destinationPath('src/sass/areas/_MoreAccordian.scss')
                );
                this.fs.copy(
                    this.templatePath('moreaccordian.js'),
                    this.destinationPath('src/js/custom/moreaccordian.js')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('MoreAccordian.twig'),
                        this.destinationPath('patternlab/source/_patterns/01-molecules/02-user-interface/30-MoreAccordian.twig')
                    );
                }
            }
            if (this.Modal == true) {
                this.fs.copy(
                    this.templatePath('_Modal.scss'),
                    this.destinationPath('src/sass/areas/_Modal.scss')
                );
                this.fs.copy(
                    this.templatePath('modal.js'),
                    this.destinationPath('src/js/custom/modal.js')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('Modal.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-organisms/01-custom-objects/Modal.twig')
                    );
                }
            }
        },

        extra: function () {

            for ( var item in this.props.components) {

                // make a sass partial for pretty much everything
                //if (this.props.components[item] !== "FooterContact") {
                    var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | areas -+++-//',
                        path   = 'src/sass/main.scss',
                        file   = wiring.readFileAsString(path),
                        slug   = this.props.components[item].replace(/ /g, '_'),
                        insert = "@import 'areas/" + slug + "';";

                    if (file.indexOf(insert) === -1) {
                      this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
                    }
                //}

                // if its something that needs to go into the header
                if (    this.props.components[item] === "HeaderLogo" ||
                        this.props.components[item] === "PrimaryMenu" ||
                        this.props.components[item] === "SecondaryMenu" ||
                        this.props.components[item] === "HeaderNewsletter" ||
                        this.props.components[item] === "MobileMenu" ||
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

                // if this is the mobile menu, we need to add a mobile menu region
                if ( this.props.components[item] === "MobileMenu") {

                    var afterheaderhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | mobilemenu -+++-//-->',
                        afterheaderpath   = 'patternlab/source/_layouts/header/header.twig',
                        afterheaderfile   = wiring.readFileAsString(afterheaderpath),
                        afterheaderslug   = this.props.components[item].replace(/ /g, '_'),
                        afterheaderinsert = "<div id='MobileMenu__content' class='MobileMenu__content MobileMenu'>\n" +
                                                "\t<div class='MobileMenu__inside'>\n" +
                                                    "\t\t{% block mobilemenu %}\n" +

                                                    "\t\t{% endblock %}\n" +
                                                "\t</div><!-- /.MobileMenu__inside -->\n" +
                                            "</div><!-- /.MobileMenu__content -->\n"

                    if (afterheaderfile.indexOf(afterheaderinsert) === -1) {
                      this.writeFileFromString(afterheaderfile.replace(afterheaderhook, afterheaderinsert), afterheaderpath);
                    }
                }

                // if this is the modal, it goes after the footer
                if ( this.props.components[item] === "Modal") {

                    var afterFooterhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | afterFooter -+++-//-->',
                        afterFooterpath   = 'patternlab/source/_layouts/main.twig',
                        afterFooterfile   = wiring.readFileAsString(afterFooterpath),
                        afterFooterslug   = this.props.components[item].replace(/ /g, '_'),
                        afterFooterinsert = '<div id="ModalCage" class="ModalCage">\n' +
                                                '\t{% block modals %}\n' +
                                                    '\t\t{% endblock %}\n' +
                                                '\t</div>\n' +
                                            '<div id="Cover" class="Cover"></div>\n'

                    if (afterFooterfile.indexOf(afterFooterinsert) === -1) {
                      this.writeFileFromString(afterFooterfile.replace(afterFooterhook, afterFooterinsert), afterFooterpath);
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

