(function($){

	/////////////////////////////////////-+++-
	// plugin initialization

		// this makes all videos responsive inside the main content area
		$(".SiteMain").fitVids();

		// placeholder fallbacks
		$('input, textarea').placeholder();




	/////////////////////////////////////-+++-
	// custom global functions

		var classTrigger = function(trigger, receiver, classer) {
			// trigger the adding and removing of classes. Actual animation is handled by CSS.
			$(trigger).click(function() {
				$(receiver).toggleClass(classer);
			});
		};

		var slideTrigger = function(trigger, receiver, closeText, openText) {
			// show and hide things using jquery slidetoggle. 
			// Use this for when you don't know the size of thing your showing and hiding.
			// Also change the trigger html text, "show" to "hide", etc.
			// example: slideTrigger('.Thing__trigger', '.Thing__content', 'Show thing +', 'Hide thing -');

			$(trigger).click(function() {
				$(receiver).slideToggle(500, function() {
				    $(trigger).text($(this).is(':visible') ? closeText : openText);
				});
			});
		};




	/////////////////////////////////////-+++-
	// Full Screen Mobile Menu

		// var mobileMenuFullScreen = function() {

		//     var closeMenu = function() {
		//         $('html').removeClass('active-MobileMenu');
		//     };

		//     var openMenu = function() {
		//         $('html').addClass('active-MobileMenu');
		//     };

		//     var offcanvasFlag = false;

		//     // open the offcanvas menu on click
		//     $('#MobileMenu__trigger').on("click.menuClick", function(e) {
		//         if (offcanvasFlag === false) {
		//             openMenu();
		//             offcanvasFlag = true;
		//         } else {
		//             closeMenu();   
		//             offcanvasFlag = false;            
		//         }
		//     });
		// };

		// $( document ).ready(function() {
		//     mobileMenuFullScreen();
		// });




//-+++- DONT REMOVE THIS COMMENT! its used by yeoman | js -+++-//




})(jQuery);