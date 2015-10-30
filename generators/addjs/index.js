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
            message: 'Which javascript component do you want to add?',
            choices: [{
                name: 'MobileMenu',
                value: 'MobileMenu',
                checked: false
            }, {
                name: 'Hamburger',
                value: 'Hamburger',
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
                name: 'OwlCarousel',
                value: 'OwlCarousel',
                checked: false
            }, {
                name: 'StickyNav',
                value: 'StickyNav',
                checked: false
            }, {
                name: 'Waypoints',
                value: 'Waypoints',
                checked: false
            }, {
                name: 'Chosen',
                value: 'Chosen',
                checked: false
            }, {
                name: 'Enquire',
                value: 'Enquire',
                checked: false
            }, {
                name: 'EqualHeight',
                value: 'EqualHeight',
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

            this.MobileMenu = hasAsset('MobileMenu');
            this.Hamburger = hasAsset('Hamburger');
            this.MoreAccordian = hasAsset('MoreAccordian');
            this.Modal = hasAsset('Modal');
            this.OwlCarousel = hasAsset('OwlCarousel');
            this.StickyNav = hasAsset('StickyNav');
            this.Waypoints = hasAsset('Waypoints');
            this.Chosen = hasAsset('Chosen');
            this.Enquire = hasAsset('Enquire');
            this.EqualHeight = hasAsset('EqualHeight');

            done();
        }.bind(this));
    },

    writing: {

        projectfiles: function () {

            if (this.MobileMenu == true) {
                this.fs.copy(
                    this.templatePath('_MobileMenu.scss'),
                    this.destinationPath('src/sass/specifics/_MobileMenu.scss')
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

            if (this.Hamburger == true) {
                this.fs.copy(
                    this.templatePath('_Hamburger.scss'),
                    this.destinationPath('src/sass/specifics/_Hamburger.scss')
                );
            }

            if (this.MoreAccordian == true) {
                this.fs.copy(
                    this.templatePath('_MoreAccordian.scss'),
                    this.destinationPath('src/sass/modules/_MoreAccordian.scss')
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
                    this.destinationPath('src/sass/modules/_Modal.scss')
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

            if (this.OwlCarousel == true) {
                this.fs.copy(
                    this.templatePath('owlcarousel.js'),
                    this.destinationPath('src/js/custom/owlcarousel.js')
                );
            }

            if (this.StickyNav == true) {
                this.fs.copy(
                    this.templatePath('stickynav.js'),
                    this.destinationPath('src/js/custom/stickynav.js')
                );
            }

            if (this.Waypoints == true) {
                this.fs.copy(
                    this.templatePath('waypoint.js'),
                    this.destinationPath('src/js/custom/waypoint.js')
                );
            }

            if (this.Chosen == true) {
                this.fs.copy(
                    this.templatePath('chosen.js'),
                    this.destinationPath('src/js/custom/chosen.js')
                );
            }
        },

        extra: function () {

            for ( var item in this.props.components) {

                // if its something that needs to go in "modules" sass partial directory
                if (    this.props.components[item] === "MoreAccordian" ||
                        this.props.components[item] === "Modal"
                ) {

                    var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | modules -+++-//',
                        path   = 'src/sass/main.scss',
                        file   = wiring.readFileAsString(path),
                        slug   = this.props.components[item].replace(/ /g, '_'),
                        insert = "@import 'modules/" + slug + "';";

                    if (file.indexOf(insert) === -1) {
                      this.writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
                    }
                }

                // if its something that needs to go in "specifics" sass partial directory
                // basically just all header/footer and page specific content:
                if (    this.props.components[item] === "MobileMenu"
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

                
                if ( this.props.components[item] === "OwlCarousel" ) {

                    var owlhook   = '//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | owlcarousel-copy -+++-//',
                        owlpath   = 'config/javascript.js',
                        owlfile   = wiring.readFileAsString(owlpath),
                        owlslug   = this.props.components[item].replace(/ /g, '_'),
                        owlinsert = "owlPlayButton: {\n"+
                                        "files: [\n" +
                                            "{ expand: true, cwd: 'bower_components/OwlCarousel2/dist/assets', src: ['owl.video.play.png'], dest: 'build/css/'}\n" +
                                        "]\n" +
                                    "},\n"

                    if (owlfile.indexOf(owlinsert) === -1) {
                      this.writeFileFromString(owlfile.replace(owlhook, owlinsert), owlpath);
                    }
                }

                if ( this.props.components[item] === "Chosen" ) {

                    var chosenhook   = '//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | chosen-main -+++-//',
                        chosenpath   = 'config/javascript.js',
                        chosenfile   = wiring.readFileAsString(chosenpath),
                        chosenslug   = this.props.components[item].replace(/ /g, '_'),
                        choseninsert = "'chosen' : ['chosen.jquery.min.js', 'chosen.min.css'],\n"

                    if (chosenfile.indexOf(choseninsert) === -1) {
                      this.writeFileFromString(chosenfile.replace(chosenhook, choseninsert), chosenpath);
                    }
                }

                if (    this.props.components[item] === "StickyNav" || 
                        this.props.components[item] === "Waypoints"
                ) {

                    var waypointshook   = '//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | waypoints-main -+++-//',
                        waypointspath   = 'config/javascript.js',
                        waypointsfile   = wiring.readFileAsString(waypointspath),
                        waypointsslug   = this.props.components[item].replace(/ /g, '_'),
                        waypointsinsert = "'waypoints': ['lib/jquery.waypoints.min.js'],\n"

                    if (waypointsfile.indexOf(waypointsinsert) === -1) {
                      this.writeFileFromString(waypointsfile.replace(waypointshook, waypointsinsert), waypointspath);
                    }
                }

                if ( this.props.components[item] === "Enquire" ) {

                    var enquirehook   = '//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | enquire-main -+++-//',
                        enquirepath   = 'config/javascript.js',
                        enquirefile   = wiring.readFileAsString(enquirepath),
                        enquireslug   = this.props.components[item].replace(/ /g, '_'),
                        enquireinsert = "'matchmedia': ['./matchMedia.js', './matchMedia.addListener.js'],\n"

                    if (enquirefile.indexOf(enquireinsert) === -1) {
                      this.writeFileFromString(enquirefile.replace(enquirehook, enquireinsert), enquirepath);
                    }
                }
            }
        }
    },
    install: function() {

        if (this.MoreAccordian == true) {
            exec("bower install jquery.scrollTo --save");
            exec("bower install imagesloaded --save");
        }

        if (this.OwlCarousel == true) {
            exec("bower install OwlCarousel2 --save");
        }

        if (this.StickyNav == true || this.Waypoints == true) {
            exec("bower install jquery-waypoints --save");
        }

        if (this.Chosen == true) {
            exec("bower install chosen --save");
        }

        if (this.Enquire == true) {
            exec("bower install enquire --save");
            exec("bower install matchmedia --save");
        }

        if (this.EqualHeight == true) {
            exec("bower install matchHeight --save");
        }

        if (this.MoreAccordian == true ||
            this.OwlCarousel == true ||
            this.StickyNav == true ||
            this.Waypoints == true ||
            this.Chosen == true ||
            this.Enquire == true ||
            this.EqualHeight == true
            ) {
            exec("grunt plugins");
        }

        // new compiled of css
        exec("grunt css");
        exec("grunt js");
        // new build of the pattern library
        if (this.props.patternlab == true) {
            exec("php ./patternlab/core/console --generate");
        }
    }
});

