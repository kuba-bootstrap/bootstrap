/*
 * -- Example - static items from template
 */

$(function(){

	var View = Dropdown.extend({
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

  	var dropdown = new View({parentEl: '#staticPane', buttons: ['#staticMenuButton'] });

});

/*
 * -- Example - dynamic items from model
 */

$(function(){

	var View = Dropdown.extend({
		initialize: function(options){
			console.log('initialize');
		},
		render: function(){
			return this;
		}
	});

	// Model mockup

	var model = Backbone.Model.extend({
		item: ''
	});

	var item_1 = new model({item: 'item 1'}),
		item_2 = new model({item: 'item 2'}),
		item_3 = new model({item: 'item 3'});

	var collection = Backbone.Collection.extend({
		model: model
	});

	var items = new collection([item_1, item_2, item_3]);

	// View declaration

	var dropdown = new View({parentEl: '#dynamicPane', buttons: ['#dynamicMenuButton'], items: items });

});