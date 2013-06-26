(function(){
    
    var Modal = function(options) {
        Backbone.View.call(this, options);
    	this.modalInitialize(options);
  	};

  	Modal.extend = Backbone.View.extend;

  	_.extend(Modal.prototype, Backbone.View.prototype, {
        modalInitialize: function(options) {
      	    this.modal();
    	},
    	modal: function(){
            var self = this;

            $(this.options.button).on(upEvent, function(){
                self.openModal();
            });
    	},
        openModal: function(){
            var cl = '',
                close = $('<button class="mdl-cls' + cl + '" id="closeModal"></button>');

            // if modal background doesn't exist add one
            if($('#modalBack').length == 0){
                $('body').append('<div class="mdl-bck" id="modalBack"></div>');
            }

            this.$el.append(close);
      
            $('#modalBack').show();
            this.$el.show();

            close.on(upEvent, function(){
                self.closeModal();
                if(onCloseCallback) onCloseCallback();
            });
        },
    	closeModal: function(){
    		this.$el.hide();
            $('#modalBack').hide();
            $('#closeModal').remove();
            this.$el.remove();

            // if(dispose) data.dispose = dispose;
            // if(data.dispose && data.dispose != 'off') data.dispose();
    	}
  	});

  	window.Modal = Modal;

})();