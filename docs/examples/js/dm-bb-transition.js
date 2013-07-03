/*
 * - Example - static
 */

$(function(){


  var trans = new Transition({
    speed: 100,
    pages: [],
  });


  trans.register(...pages)

  trans.slideTo()



	var View = Transition.extend({
    	template: Handlebars.compile($('#staticMenu').html()),
    	initialize: function(options) {
      		console.log('initialize');
    	},
    	render: function() {
      		this.$el.html(this.template(this));
      		
      		return this;
    	}
  	});

  	// View declaration

  	var transition = new View({parentEl: '#staticPane', buttons: ['#staticMenuButton'] });

});