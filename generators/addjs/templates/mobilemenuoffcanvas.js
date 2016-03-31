    /////////////////////////////////////-+++-
    //  Mobile Menu offcanvas
    // Also deploys a "cover" which covers the screen for offcanvas.


        var coverDeploy = function() {
            $('.Cover').addClass("is-out");
            setTimeout(function() {
                $('.Cover').addClass("is-dark");
            }, 100); 
        };
        
        var coverHide = function() {
            $('.Cover').removeClass("is-dark");
            setTimeout(function() {
                $('.Cover').removeClass("is-out");
            }, 500); 
        };
        
        
        var mobileMenuOffcanvas = function() {
        
            function closeMenu() {
                $('html').removeClass('active-MobileMenu');
                coverHide();
            }
        
            function openMenu() {
                $('html').addClass('active-MobileMenu');
                coverDeploy();
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
