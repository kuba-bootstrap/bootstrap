(function(){
    
    var Modal = function(options) {
        Backbone.View.call(this, options);
    	this.modalInitialize(options);
  	};

  	Modal.extend = Backbone.View.extend;

  	_.extend(Modal.prototype, Backbone.View.prototype, {
        className: 'mdl',
        modalInitialize: function(options) {
      	    this.parentEl = this.options.parentEl || '#body';
            $(this.parentEl).append(this.render().el);
            this.modal();
    	},
    	modal: function(){
            var self = this;

            if(!this.options.closeButton){
                this.cl = 'icon-remove';
            }

            $(this.options.button).on(upEvent, function(){
                self.openModal();
            });
    	},
        openModal: function(){
            var self = this,
                cl = '',
                close = $('<button class="mdl-cls ' + this.cl + '" id="closeModal"></button>');

            if($('#modalBack').length == 0){
                $('body').append('<div class="mdl-bck" id="modalBack"></div>');
            }

            if($('#closeModal').length == 0){
                this.$el.append(close);
            }

            $('#modalBack').show();
            this.$el.show();

            close.on(upEvent, function(){
                self.closeModal();
            });
        },
    	closeModal: function(){
    		this.$el.hide();
            $('#modalBack').hide();
    	}
  	});

  	window.Modal = Modal;

})();