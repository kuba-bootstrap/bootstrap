(function(){
    
    var Modal = function(options) {
        Backbone.View.call(this, options);
    	this.modalInitialize(options);
  	};

    // Attach Modal to the window, but through the namespace 'kb'
    var root = this;
    root.kb = root.kb || {};
    root.kb.Modal = Modal;

  	Modal.extend = Backbone.View.extend;

  	_.extend(Modal.prototype, Backbone.View.prototype, {
        className: 'mdl',
        modalInitialize: function(options) {
            var options = this.options || {};
            // TODO just use "el" for setting the parent
      	    this.parentEl = options.parentEl || 'body';
            this.closeable = _.isBoolean(options.close) ? options.close : true;
            this.closeButton = _.isBoolean(options.closeButton) ? options.closeButton : true;
            $(this.parentEl).append(this.render().el);
            this.modal();

            if (options.open) this.openModal();
    	},
    	modal: function(){
            var self = this;
            if (!this.options.closeButton) { this.cl = 'icon-remove'; }
            // TODO upEvent is a global, it should at least be namespaced
            $(this.options.button).on(upEvent, function() {
                self.openModal();
            });
        },
        openModal: function(){
            var self = this;
            // TODO But this.cl is only set if !this.options.closeButton
            var close = $('<button class="mdl-cls ' + this.cl + '" id="closeModal"></button>');

            // TODO cache modal back and parent el

            console.log('from kb: ', this.closeable);

            if ($('#modalBack').length == 0 && this.closeable) {
                $('body').append('<div class="mdl-bck" id="modalBack"></div>');
            }

            if(this.closeButton){
                this.$el.append(close);
            }

            $('#modalBack').show();
            this.$el.show();

            if (this.closeable) {
                // TODO upEvent is a global, it should at least be namespaced
                close.on(upEvent, function() { self._closeModal(); });
            }
        },
        _closeModal: function(){
            this.closeModal();
            if(this.dispose) this.dispose();
        },
    	closeModal: function(){
            $('#modalBack').hide();
            this.$el.remove();
    	}
  	});

  	window.Modal = Modal;

})();