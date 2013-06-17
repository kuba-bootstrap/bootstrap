(function(){
    'use strict';

    $.extend($.fn, {
        modal: function(){

            var args = arguments[0] || { dispose: '', cleanClose: false },
                data = this.data(),
                cls = '';

            data.dispose = args.dispose;

            if(args['close'] === undefined) args['close'] = true;
            if(args.cleanClose == false){ cls = 'icon-remove'; }

            var onCloseCallback = args['onClose'],
                self = $(this),
                close = $('<button class="mdl-cls ' + cls + '" id="closeModal"></button>');


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