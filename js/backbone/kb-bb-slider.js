(function(){

    var Slider = function(options) {
        Backbone.View.call(this, options);
        this.sliderInitialize(options);
    };

    Slider.extend = Backbone.View.extend;

    _.extend(Slider.prototype, Backbone.View.prototype, {
        sliderInitialize: function(options) {
            this.parentEl = this.options.parentEl || 'body';
            $(this.parentEl).append(this.render().el);
            this.slider();
        },
        slider: function(){
            var self = this;

        }
  	});

  	window.Slider = Slider;	

})();