(function(){

	var SlideOver = function(options) {
        Backbone.View.call(this, options);
    	this.slideOverInitialize(options);
  	};

  	SlideOver.extend = Backbone.View.extend;

  	_.extend(SlideOver.prototype, Backbone.View.prototype, {
        slideOverInitialize: function(options) {
      	    this.parentEl = this.options.parentEl || '#body';
            $(this.parentEl).append(this.render().el);
            this.slideOver();
    	},
    	slideOver: function(){
            var self = this; 
            	pagePos = 0;

			this.offset = this.options.offset || 80;
			this.direction = this.options.direction || 'left';
			this.slideEl = this.options.slideEl || this.el;

			$(this.options.button).on(upEvent, function(){
				if(pagePos == 0 && self.direction == 'left'){
					pagePos = self.offset;
				} else if (pagePos == 0 && self.direction == 'right'){
					pagePos = self.offset * -1;
				} else {
					pagePos = 0;
				}
				$(self.slideEl).css('-webkit-transform', 'translate3d(' + pagePos + '%, 0px, 0px)');
			});
    	}
  	});

  	window.SlideOver = SlideOver;

})();