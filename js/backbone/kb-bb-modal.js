(function(){

    var events = Backbone.Model.extend({});
    window.kb.modalEvents = new events;
    
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
            
            //not sure why we have this extra check
            this.closeable = _.isBoolean(options.close) ? options.close : true;
            
            // determines if the close button is present
            this.closeButton = _.isBoolean(options.closeButton) ? options.closeButton : true;

            if(!window.kb.modalFlag){
                //dispose old modal
                window.kb.modalEvents.trigger('closeModal');
                window.kb.modalEvents.on('closeModal', this._closeModal, this);

                //create new modal
                $(this.parentEl).append(this.render().el);
                this.modal();

                if (options.open) this.openModal();
            } 

            //dnd flag on the modal
            window.kb.modalFlag = _.isBoolean(options.flag) ? options.flag : false;
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
            var close = $('<button class="mdl-cls ' + this.cl + '" id="closeModal" tabindex="-1">close</button>');

            // TODO cache modal back and parent el

            if ($('#modalBack').length == 0 && this.closeable) {
                $('body').append('<div class="mdl-bck" id="modalBack" tabindex="-1"></div>');
            }

            if(this.closeButton){
                this.$el.append(close);
            }

            //Create fade in effect
            $('#modalBack').show();

            this.$el.show();

            if (this.closeable) {
                // TODO upEvent is a global, it should at least be namespaced
                close.on(upEvent, function() { self._closeModal(); });
            }

            setTimeout(function(){
                console.log('focus!');

                // this.$el.focus();
                $('.mdl-cls').focus();
                $('.mdl-cls').trigger('focus');
                console.log($('.mdl-cls').focus());
            }, 1000);
            
        },
        _closeModal: function(){
            this.closeModal();
            if(this.dispose) this.dispose();

            window.kb.modalFlag = undefined;
        },
    	closeModal: function(){
            $('#modalBack').remove();
            this.$el.remove();

            window.kb.modalFlag = undefined;
            window.kb.modalEvents.off('closeModal');
    	}
  	});

  	window.Modal = Modal;

})();