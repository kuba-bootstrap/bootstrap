/*
 * -- Example - static
 */

$(function(){

	var View = SlideOver.extend({
    	template: Handlebars.compile($('#page').html()),
    	initialize: function(options) {
      		console.log('initialize');
    	},
    	render: function() {
      		this.$el.html(this.template(this));
      		
      		return this;
    	}
  	});

  	// View declaration

  	var slideOver = new View({parentEl: '#container', slideEl: '#topPage', button: '#pageButton', offset: 80, direction: 'left'});

});