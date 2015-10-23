
// basic waypoint example:
// $('.element').waypoint(function(direction){
//     if (direction === 'down') {
//         $('.element').addClass('is-fixed');
//     } else if (direction === 'up') {
//         $('.element').removeClass('is-fixed');
//     }
// });

// more complex waypoint example:
// // needs to be inside of images loaded since we are doing some height calculations
// imagesLoaded($('.MainFrame'), function( instance ) {

//     // stop the element at the bottom of the wrapping element and apply margin to the top
//     $('.element').waypoint(function(direction){
//         if (direction === 'down') {
//             $(elementWrapper).addClass("is-atBottom");
//             $(elementer).css("top", $(wrapper).outerHeight() - $(elementer).height());
//         } else if (direction === 'up') {
//             $('.StickyRightRail').removeClass("is-atBottom");
//             $('.StickyRightRail').addClass("is-fixed");
//             $(elementer).css("top", "");
//         }
//     }, {
//       offset: function() {
//         return -$(wrapper).outerHeight() + $(elementer).height() + navigationHeight + magicNumber;
//       }
//     });
// });