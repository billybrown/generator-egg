'use strict';

module.exports.tasks = {

    // exporting SVGs can be tricky. Here are some good blog posts if you are having trouble
    // if you can't save its position correctly: http://graphicdesign.stackexchange.com/questions/39505/illustrator-exporting-svg-viewbox-doesnt-match-artboard-size
    // if the exported scss file can't calculate widht/height - gives you a bunch of 'NaNpx' values: https://github.com/drdk/grunt-dr-svg-sprites/issues/26
    //
    // this task doesn't come out of the box with egg
    // to add this task, run: npm install grunt-dr-svg-sprites --save-dev
    //

    // "dr-svg-sprites": {
    //     basic: {
    //         options: {
    //             spriteElementPath: "src/img/svg-sprites",
    //             spritePath: "src/img/sprite.svg",
    //             cssPath: "src/sass/sprites.scss",
    //             prefix: "svg",
    //             layout: "horizontal"
    //         }
    //     }
    // },

    // copy: {
    //     sprites: {
    //         files: [
    //             { expand: true, cwd: 'src/img/', src: ['sprite.png', 'sprite.svg'], dest: 'build/img/'}
    //         ]
    //     }
    // },

    // clean: {
    //     sprites: ['src/img/sprite.png', 'src/img/sprite.svg']
    // }
};