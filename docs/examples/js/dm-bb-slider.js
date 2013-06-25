/*
 * -- Example - static
 */

$(function(){

	var View = Dropdown.extend({
    	tagName: 'ul',
    	template: Handlebars.compile($('#staticMenu').html()),
    	initialize: function(options) {
      		console.log('regular initialize');
    	},
    	render: function() {
      		this.$el.addClass('dd').html(this.template(this));
      		
      		return this;
    	}
  	});

  	// View declaration

  	var dropdown = new View({parentEl: 'staticPane', buttons: ['#staticMenuButton'] });

});