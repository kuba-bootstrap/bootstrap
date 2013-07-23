(function(){

    //TODO: change the this.options.items to collection

    var Dropdown = function(options) {
        Backbone.View.call(this, options);
    	this.dropdownInitialize(options);
  	};

    // Attach Dropdown to the window, but through the namespace 'kb'
    var root = this;
    root.kb = root.kb || {};
    root.kb.Dropdown = Dropdown;

  	Dropdown.extend = Backbone.View.extend;

  	_.extend(Dropdown.prototype, Backbone.View.prototype, {
        tagName: 'ul',
        className: 'dd',
        dropdownInitialize: function(options) {
      		this.parentEl = this.options.parentEl || 'body';
            $(this.parentEl).append(this.render().el);
            this.dropdown();
      		if(this.options.items){
      			this.options.items.on('change', this.dropdown, this);
      		}
    	},
    	dropdown: function(){
    		if(this.options.items){
                this.maxItems = (this.options.maxItems)? this.options.maxItems : this.options.items.length;
    			this.options.items.first(this.maxItems).forEach(this.loadItems, this);
    		}
            if(this.options.buttons){
    		    this.options.buttons.forEach(this.registerButton, this);
            }
    	},
    	loadItems: function(item){
            var el = $(this.options.itemEl) || this.$el;

            if(this.options.itemView){
                el.append(new this.options.itemView({item: item}).render().el);
            } else if(this.options.itemTemplate){
                var template = Handlebars.compile($(this.options.itemTemplate).html())       
                el.append(template(item.toJSON()));
            } else {
    		    el.append('<li>' + item.get('item') + '</li>');
            }
    	},
    	registerButton: function(item){
    		    var self = this;

    		    $(item).on(upEvent, function(e){
                e.stopPropagation();

                var className = $(this).attr('class');

    			$('.dd').removeClass('on');
    			self.$el.addClass('on');

                $(window).on(upEvent, function(e){
                    if(e.target.className != className){
                        $(this).off(upEvent);
                        self.$el.removeClass('on');
                    }
                });
    		});
    	}
  	});

  	window.Dropdown = Dropdown;

})();