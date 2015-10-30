// Cover


var cover = function() {

    function deploy() {
        $('.Cover').addClass("is-out");
        setTimeout(function() {
            $('.Cover').addClass("is-dark");
        }, 100); 
    }

    function hide() {
        $('.Cover').removeClass("is-dark");
        setTimeout(function() {
            $('.Cover').removeClass("is-out");
        }, 500); 
    }
};

cover();
