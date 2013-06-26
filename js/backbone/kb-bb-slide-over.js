(function(){

	var SlideOver = function(options) {
        Backbone.View.call(this, options);
    	this.slideOverInitialize(options);
  	};

  	SlideOver.extend = Backbone.View.extend;

  	_.extend(SlideOver.prototype, Backbone.View.prototype, {
        slideOverInitialize: function(options) {
      	    var parentEl = this.options.parentEl || '#body';
            $(parentEl).append(this.render().el);
            this.slideOver();
    	},
    	slideOver: function(){
            var self = this; 
            	pagePos = 0;

			this.offset = this.options.offset || 80;
			this.direction = this.options.direction || 'left';

			$(this.options.button).on(upEvent, function(){
				if(pagePos == 0 && this.direction == 'left'){
					pagePos = this.offset;
				} else if (pagePos == 0 && this.direction == 'right'){
					pagePos = this.offset * -1;
				} else {
					pagePos = 0;
				}
				self.$el.css('-webkit-transform', 'translate3d(' + pagePos + '%, 0px, 0px)');
			});
    	}
  	});

  	window.SlideOver = SlideOver;

})();