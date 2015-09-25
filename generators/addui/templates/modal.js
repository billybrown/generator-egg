// Modal

// @todo - the "pollForEscape" isn't working correctly. (close modal on esc key)

var modal = function() {
    var trigger = $('.Modal__trigger');
    var position = 0;

    var pollForEscape = function(e) {
        var escapeKeyCode = 27;
        if (e.which !== undefined && e.which === escapeKeyCode) {
            closeModal();
        }  
    };

    var openModal = function(e) {
        $('#Cover, #ModalCage .ModalWrapper').addClass('is-out');

        // Now that the modal is open, start listening for the escape key.
        $(document).keydown(pollForEscape(e));
    };

    var closeModal = function(e) {
        $('#Cover, .ModalWrapper').removeClass('is-out');
        // Stop listening for keypress.
        $(document).off('keydown', pollForEscape(e));
    };

    var triggerModal = function(e) {

        // disable default trigger href linking if its an <a> tag
        e.preventDefault();

        // get your current scroll position and apply it to the top of the modal
        position = $(document).scrollTop() + 120;
        $('#ModalCage .Modal').css("top", position);

        openModal();
    };

    trigger.click(function(e) {
        triggerModal(e);
    });

    $('.Modal__close, #Cover').click(function() {
        closeModal();
    });
};

$( document ).ready(function() {
    modal();
});
