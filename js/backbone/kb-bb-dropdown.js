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
      		  var parentEl = this.options.parentEl || '#body';
            $(parentEl).append(this.render().el);
            this.dropdown();
      		  if(this.model){
      			    this.model.on('change', this.dropdown, this);
      		  }
    	  },
    	  dropdown: function(){
    		    if(this.options.items){
    			      this.options.items.forEach(this.loadItems, this);
    		    }
    		    this.options.buttons.forEach(this.registerButton, this);
    	  },
    	  loadItems: function(item){
    		    this.$el.append('<li>' + item.attributes.item + '</li>');
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