(function(){

	var Slider = function(options) {
        Backbone.View.call(this, options);
    	this.sliderInitialize(options);
  	};

  	Slider.extend = Backbone.View.extend;

  	_.extend(Slider.prototype, Backbone.View.prototype, {
        sliderInitialize: function(options) {
      	    this.slider();
    	},
    	slider: function(){
            var self = this;

    	}
  	});

  	window.Slider = Slider;	

})();