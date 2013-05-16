(function(){
    "use strict";

    $.extend($.fn, {
        modal: function(){

            var args = arguments[0] || { dispose: '' },
                data = this.data();

            data.dispose = args.dispose;

            if(args['close'] === undefined) args['close'] = true;
            var onCloseCallback = args['onClose'];

            var self = $(this),
                close = $('<button class="mdl-cls icon-remove" id="closeModal"></button>');


            // if modal background doesn't exist add one
            if($('#modalBack').length == 0){
                $('body').append('<div class="mdl-bck" id="modalBack"></div>');
            }

            // if modal close button doesn't exist add one 
            if($('#closeModal').length == 0 && args.close == true){
                $(this).append(close);
            }

            // TODO: create some interesting animation

            $('#modalBack').show();
            $(this).show();

            close.on(upEvent, function(){
                self.closeModal();
                if(onCloseCallback) onCloseCallback();
            });
        },
        closeModal: function(dispose){
            var data = this.data();

            $(this).hide();
            $('#modalBack').hide();
            $('#closeModal').remove();
            $(this).remove();

            if(dispose) data.dispose = dispose;
            if(data.dispose && data.dispose != 'off') data.dispose();
        }
    });
})();