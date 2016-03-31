    /////////////////////////////////////-+++-
    // More Accordian
    //
    // js library dependencies:
    // - scrollTo: https://github.com/flesler/jquery.scrollTo
    // - imagesLoaded: https://github.com/desandro/imagesloaded
    //
    // This is different from a regular accordian in that it shows a small bit of the content
    // on load, and then reveals more on click.
        
        var moreAccordian = function() {
        
            // this is the pixel amount of height that is shown by default.
            var closeHeight = '280';
        
            // images loaded script is necessary in case they have some images inside of the
            // accordian area. We need to wait for those to load before doing these calculations
            // this right here does some calculations and then sets values directly in the html
            // as attributes on the MoreAccordian DOM elements.
            imagesLoaded($(".MoreAccordian"), function( instance ) {
                $(".MoreAccordian").each(function() {
                    var openHeight = $(this).outerHeight() + 20;
                    $(this).attr("data", openHeight);
                    $(this).css("height", closeHeight);
                    if (openHeight <= closeHeight) {
                        $(this).addClass('is-small');
                    }
                });
            });
        
            var closeAccordian = function(element) {
                element.closest('.MoreAccordian').animate({ 'height': closeHeight }, 'slow');
                element.html('+ More');
        
                // scrollto library is necessary to smooth scroll the window back up to the
                // top of the accordian once its closed
                $(document).scrollTo(element.closest('.MoreAccordian'), 600);
            };
        
            var openAccordian = function(element, heighters) {
                element.closest('.MoreAccordian').animate({ 'height': heighters }, 'slow');
                element.html('- Close');
            };
        
            $('.MoreAccordian__trigger').click(function() {
                var openHeight = $(this).closest('.MoreAccordian').attr("data");
                if ($(this).closest('.MoreAccordian').hasClass('is-out')) {
                    closeAccordian($(this));
                } else {
                    openAccordian($(this), openHeight);
                }
                $(this).closest('.MoreAccordian').toggleClass('is-out');
            });
        };
        
        $( document ).ready(function() {
            moreAccordian();
        });
        
        
        