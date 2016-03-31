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
            message: 'Which javascript component do you want to add?',
            choices: [{
                name: 'MobileMenuFullScreen',
                value: 'MobileMenuFullScreen',
                checked: false
            }, {
                name: 'MobileMenuOffcanvas',
                value: 'MobileMenuOffcanvas',
                checked: false
            }, {
                name: 'MoreAccordian',
                value: 'MoreAccordian',
                checked: false
            }, {
                name: 'Modal',
                value: 'Modal',
                checked: false
            }, {
                name: 'ChosenSelect',
                value: 'ChosenSelect',
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

            this.MobileMenuFullScreen = hasAsset('MobileMenuFullScreen');
            this.MobileMenuOffcanvas = hasAsset('MobileMenuOffcanvas');
            this.MoreAccordian = hasAsset('MoreAccordian');
            this.Modal = hasAsset('Modal');
            this.ChosenSelect = hasAsset('ChosenSelect');

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.MobileMenuFullScreen == true) {
                this.fs.copy(
                    this.templatePath('_MobileMenuFullScreen.scss'),
                    this.destinationPath('src/sass/components/_MobileMenuFullScreen.scss')
                );
            }

            if (this.MobileMenuOffcanvas == true) {
                this.fs.copy(
                    this.templatePath('_MobileMenuOffcanvas.scss'),
                    this.destinationPath('src/sass/components/_MobileMenuOffcanvas.scss')
                );
            }

            if (this.MobileMenuFullScreen == true ||
                this.MobileMenuOffcanvas == true
            ) {
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('MobileMenuTriggers.twig'),
                        this.destinationPath('patternlab/source/_layouts/header/MobileMenuTriggers.twig')
                    );
                }
            }

            if (this.MoreAccordian == true) {
                this.fs.copy(
                    this.templatePath('_MoreAccordian.scss'),
                    this.destinationPath('src/sass/components/_MoreAccordian.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('MoreAccordian.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/custom/MoreAccordian.twig')
                    );
                }
            }

            if (this.Modal == true) {
                this.fs.copy(
                    this.templatePath('_Modal.scss'),
                    this.destinationPath('src/sass/components/_Modal.scss')
                );
                if (this.props.patternlab == true) {
                    this.fs.copy(
                        this.templatePath('Modal.twig'),
                        this.destinationPath('patternlab/source/_patterns/02-components/custom/Modal.twig')
                    );
                }
            }

            if (this.ChosenSelect == true) {
                this.fs.copy(
                    this.templatePath('_ChosenSelect.scss'),
                    this.destinationPath('src/sass/components/_ChosenSelect.scss')
                );
            }
        },

        extra: function () {

            for ( var item in this.props.components) {

                // if its something that needs to go in "components" sass partial directory
                // basically just all header/footer and page specific content:
                if (    this.props.components[item] === "MoreAccordian" ||
                        this.props.components[item] === "Modal" ||
                        this.props.components[item] === "MobileMenuFullScreen" ||
                        this.props.components[item] === "MobileMenuOffcanvas"
                ) {

                    var specifichook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';
                    var specificpath   = 'src/sass/main.scss';
                    var specificfile   = wiring.readFileAsString(specificpath);
                    var componentslug  = this.props.components[item].replace(/ /g, '_');
                    var specificinsert = "@import 'components/" + componentslug + "';";

                    if (specificfile.indexOf(specificinsert) === -1) {
                        require("html-wiring").writeFileFromString(specificfile.replace(specifichook, specificinsert+'\n'+specifichook), specificpath);
                    }

                    var jshook   = '//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | js -+++-//';
                    var jspath   = 'src/js/custom.js';
                    var jsfile   = wiring.readFileAsString(jspath);
                    var jsinsert = wiring.readFileAsString(this.templatePath(this.props.components[item] + '.js'));
                    //var jsinsert = "yo";

                    if (jsfile.indexOf(jsinsert) === -1) {
                      require("html-wiring").writeFileFromString(jsfile.replace(jshook, '\n'+jsinsert+'\n'+jshook+'\n'), jspath);
                    }
                }

                // if this is a mobile menu
                if (    this.props.components[item] === "MobileMenuFullScreen" ||
                        this.props.components[item] === "MobileMenuOffcanvas"
                ) {

                    var headerhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | header -+++-//-->',
                        headerpath   = 'patternlab/source/_layouts/header/header.twig',
                        headerfile   = wiring.readFileAsString(headerpath),
                        headerinsert = "{% include 'header/MobileMenuTriggers.twig' %}"

                    if (headerfile.indexOf(headerinsert) === -1) {
                      require("html-wiring").writeFileFromString(headerfile.replace(headerhook, headerinsert+'\n'+'\t\t'+headerhook), headerpath);
                    }

                    var afterheaderhook   = '<!--//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | mobilemenu -+++-//-->',
                        afterheaderpath   = 'patternlab/source/_layouts/header/header.twig',
                        afterheaderfile   = wiring.readFileAsString(afterheaderpath),
                        afterheaderslug   = this.props.components[item].replace(/ /g, '_'),
                        afterheaderinsert = "<div id='MobileMenu__content' class='MobileMenu__content MobileMenu'>\n" +
                                                "\t<div class='MobileMenu__inside'>\n" +
                                                    "\t\t{% block mobilemenu %}\n" +
                                                        "\t\t\t\t<p class='u-alignCenter'>put your mobile stuff here</p>\n" +
                                                    "\t\t{% endblock %}\n" +
                                                "\t</div><!-- /.MobileMenu__inside -->\n" +
                                            "</div><!-- /.MobileMenu__content -->\n"

                    if (afterheaderfile.indexOf(afterheaderinsert) === -1) {
                      require("html-wiring").writeFileFromString(afterheaderfile.replace(afterheaderhook, afterheaderinsert), afterheaderpath);
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
                                                '\t</div>\n'

                    if (afterFooterfile.indexOf(afterFooterinsert) === -1) {
                      require("html-wiring").writeFileFromString(afterFooterfile.replace(afterFooterhook, afterFooterinsert), afterFooterpath);
                    }
                }

                // if chosen
                if ( this.props.components[item] === "ChosenSelect") {

                    var chosenhook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';
                    var chosenpath   = 'src/sass/main.scss';
                    var chosenfile   = wiring.readFileAsString(chosenpath);
                    var chosenslug   = this.props.components[item].replace(/ /g, '_');
                    var choseninsert = "@import 'components/" + chosenslug + "';";

                    if (chosenfile.indexOf(choseninsert) === -1) {
                      require("html-wiring").writeFileFromString(chosenfile.replace(chosenhook, choseninsert+'\n'+chosenhook), chosenpath);
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

