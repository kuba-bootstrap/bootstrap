$(function() {
    var set_1 = new kb.Transition({
        pages: ['page_1', 'page_2', 'page_3'],
    });

    set_1.addName('page_3');
    set_1.addElem('page_4', document.getElementById('page_4'));

    $('.page-slider').on('click', function(e) {
        var dest = $(e.target).attr('data-dest');
        set_1.slideTo(dest);
    });

    function logSlideStart(lastName, lastObj, nextName, nextObj) {
        // console.log('Slide Start:', lastName, lastObj, nextName, nextObj);
        console.log('Slide Start:', lastName, '-->', nextName);
    }

    function logSlideEnd(lastName, lastObj, nextName, nextObj) {
        // console.log('Slide End:', lastName, lastObj, nextName, nextObj);
        console.log('Slide End:', lastName, '-->', nextName);
    }

    // Listen to the events being fired by the Transition
    Backbone.listenTo(set_1, 'slideStart', logSlideStart);
    Backbone.listenTo(set_1, 'slideEnd', logSlideEnd);

    // Creating an empty transition should not error
    var set_2 = new kb.Transition({});
});
