// Mobile Menu full screen




var mobileMenuFullScreen = function() {

    var closeMenu = function() {
        $('html').removeClass('active-MobileMenu');
    };

    var openMenu = function() {
        $('html').addClass('active-MobileMenu');
    };

    var offcanvasFlag = false;

    // open the offcanvas menu on click
    $('#MobileMenu__trigger').on("click.menuClick", function(e) {
        if (offcanvasFlag === false) {
            openMenu();
            offcanvasFlag = true;
        } else {
            closeMenu();   
            offcanvasFlag = false;            
        }
    });
};

$( document ).ready(function() {
    mobileMenuFullScreen();
});