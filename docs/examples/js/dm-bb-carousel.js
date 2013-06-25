/*
 * -- Example - static
 */

$(function(){

	var View = Carousel.extend({
    	template: Handlebars.compile($('#item').html()),
    	initialize: function(options) {
      		console.log('initialize');
    	},
    	render: function() {
      		this.$el.html(this.template(this));
      		
      		return this;
    	}
  	});

  	// View declaration

  	var carousel = new View({parentEl: '#pane', dots: ['#dot-1', '#dot-2', '#dot-3'], slider: '#slider', distance: 858, swipe: true});

});