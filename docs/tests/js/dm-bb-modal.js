/*
 * -- Example - static
 */

$(function(){

	var View = Modal.extend({
		template: Handlebars.compile($('#modal').html()),
    	initialize: function(options) {
      		console.log('regular initialize');
    	},
    	render: function() {
      		this.$el.addClass('mdl').html(this.template(this));
      		
      		return this;
    	}
	});

	// View declaration

	var modal = new View({button: '#modalButton'});

  	$('#pane').append(modal.render().el);

});