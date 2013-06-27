(function(){

    var Dropdown = function(options) {
        Backbone.View.call(this, options);
    	  this.dropdownInitialize(options);
  	};

  	Dropdown.extend = Backbone.View.extend;

  	_.extend(Dropdown.prototype, Backbone.View.prototype, {
        tagName: 'ul',
        className: 'dd',
        dropdownInitialize: function(options) {
      		  this.parentEl = this.options.parentEl || '#body';
            $(this.parentEl).append(this.render().el);
            this.dropdown();
      		  if(this.options.items){
      			    this.options.items.on('change', this.dropdown, this);
      		  }
    	  },
    	  dropdown: function(){
    		    if(this.options.items){
    			      this.options.items.forEach(this.loadItems, this);
    		    }
            if(this.options.buttons){
    		        this.options.buttons.forEach(this.registerButton, this);
            }
    	  },
    	  loadItems: function(item){
            if(this.options.itemView){
                this.$el.append(new this.options.itemView({item: item}).render().el);
            } else if(this.options.itemTemplate){
                var template = Handlebars.compile($(this.options.itemTemplate).html())       
                this.$el.append(template(item.toJSON()));
            } else {
    		        this.$el.append('<li>' + item.attributes.item + '</li>');
            }
    	  },
    	  registerButton: function(item){

    		    var self = this;

    		    $(item).on(upEvent, function(){
    			      $('.dd').removeClass('on');
    			      self.$el.addClass('on');

    			      $(window).on(upEvent, function(e){
					          if(e.target.nodeName != 'BUTTON'){
						            $(this).off(upEvent);
						            self.$el.removeClass('on');
					          }
				        });
    		    });
    	  }
  	});

  	window.Dropdown = Dropdown;

})();