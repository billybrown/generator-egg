// Mobile Menu offcanvas
// Also deploys a "cover" which covers the screen for offcanvas.


var mobileMenuOffcanvas = function() {

    function closeMenu() {
        $('html').removeClass('active-MobileMenu');
        //cover().deploy();
    }

    function openMenu() {
        $('html').addClass('active-MobileMenu');
        //cover().hide();
    }

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

    $('.Cover').on("click.coverClick", function(e) {
        closeMenu(); 
        offcanvasFlag = false; 
    });
};

mobileMenuOffcanvas();
