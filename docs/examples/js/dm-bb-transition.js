$(function() {
    var set_1 = new kb.Transition({
        pages: ['page_1', 'page_2', 'page_3', 'page_4'],
    });

    $('.page-slider').on('click', function(e) {
        var dest = $(e.target).attr('data-dest');
        set_1.slideTo(dest);
    });
});