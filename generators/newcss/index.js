'use strict';

require('shelljs/global');

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiring = require('html-wiring');

module.exports = generators.Base.extend({

    prompting: {
        innitialPrompt: function () {
            var done = this.async();

            // Get our info
            var prompts = [
                {
                    type: 'input',
                    name: 'objectname',
                    message: 'What is the object name?\n',
                    default: 'Hero'
                },{
                    type: 'input',
                    name: 'objectdescription',
                    message: 'Describe the object and why its necessary:\n',
                    default: 'This component holds information.'
                },{
                    type: 'list',
                    name: 'objecttype',
                    message: 'What type of object is this?',
                    choices: [{
                        name: 'teaser',
                        value: '20-teasers',
                        checked: false
                    }, {
                        name: 'list',
                        value: '30-lists',
                        checked: false
                    }, {    
                        name: 'custom',
                        value: '40-custom',
                        checked: false
                    }]                  
                },{
                    type: 'list',
                    name: 'objectelement',
                    message: 'What type of element is this?',
                    choices: [{
                        name: 'article',
                        value: 'article',
                        checked: false
                    }, {    
                        name: 'section',
                        value: 'section',
                        checked: false
                    }, {
                        name: 'div',
                        value: 'div',
                        checked: false
                    }]                  
                },{
                    type: 'list',
                    name: 'objecttitle',
                    message: 'What kind of title does this element have?',
                    choices: [{
                        name: 'h2',
                        value: 'h2',
                        checked: false
                    }, {
                        name: 'h3',
                        value: 'h3',
                        checked: false
                    }, {    
                        name: 'h4',
                        value: 'h4',
                        checked: false
                    }]                  
                },{
                    type: 'checkbox',
                    name: 'objectelements',
                    message: 'What kind of title does this element have?',
                    choices: [{
                        name: 'excerpt',
                        value: 'excerpt',
                        checked: false
                    }, {    
                        name: 'link',
                        value: 'link',
                        checked: false
                    }, {    
                        name: 'label',
                        value: 'label',
                        checked: false
                    }, {    
                        name: 'labellist',
                        value: 'labellist',
                        checked: false
                    }, {    
                        name: 'img',
                        value: 'img',
                        checked: false
                    }]               
                }
            ];

            this.prompt(prompts, function (props) {


                var objectelements = props.objectelements;
                function hasAsset(feat) {
                    return objectelements.indexOf(feat) !== -1;
                }
                this.excerpt = hasAsset('excerpt');
                this.link = hasAsset('link');
                this.label = hasAsset('label');
                this.labellist = hasAsset('labellist');
                this.img = hasAsset('img');

                this.props = props;
                done();
            }.bind(this));
        }
    },

    // @TODO - remember if there is a pattern library or not, and generate the plab file depending.


    // write our files
    writing: {

        projectfiles: function () {
            this.fs.copyTpl(
                this.templatePath('component.scss'),
                this.destinationPath('src/sass/components/_' + this.props.objectname + '.scss'), { 
                    name: this.props.objectname,
                    description: this.props.objectdescription,
                    excerpt: this.excerpt,
                    link: this.link,
                    label: this.label,
                    labellist: this.labellist,
                    img: this.img
                }
            );

            //if (this.props.patternlab == true) {
                this.fs.copyTpl(
                    this.templatePath('component.twig'),
                    this.destinationPath('patternlab/source/_patterns/02-components/' + this.props.objecttype + '/' + this.props.objectname + '.twig'), { 
                        name: this.props.objectname,
                        title: this.props.objecttitle,
                        excerpt: this.excerpt,
                        link: this.link,
                        label: this.label,
                        labellist: this.labellist,
                        img: this.img,
                        element: this.props.objectelement
                    }
                );
            //}
        },

        extra: function () {

            var path   = 'src/sass/main.scss';
            var file   = wiring.readFileAsString(path);
            var slug   = this.props.objectname.replace(/ /g, '_');
            var insert = "@import 'components/" + slug + "';";
            var hook   = '//-+++- DONT REMOVE THIS COMMENT! its used by Yeoman | components -+++-//';

            if (file.indexOf(insert) === -1) {
              require("html-wiring").writeFileFromString(file.replace(hook, insert+'\n'+hook), path);
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
