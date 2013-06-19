(function($, _, Backbone){

	/* -- TEST SETUP -- 
	   This tests a nested backbone view that initializes components 
	   before the view is completely returned to the DOM.

	*/

	// test setup 
	$.extend($.fn, {
		register: function(){
			console.log('register');
		},
		add: function(){
			console.log('add');
		},
		initialize: function(){
			console.log('initialize');
		}
	});

	var model = Backbone.Model.extend({ data: 'hello good sir.'});

	// test implementation
	var app = {};

	app.subView = Backbone.View.extend({
		initialize: function(){
			console.log('initialize sub view');
		},
		render: function(){
			console.log('rendering sub view');

			return this;
		}
	});

	app.view = Backbone.View.extend({
		initialize: function(){
			console.log('initialize view');
		},
		render: function(){
			console.log('rendering view');

			// this.$el.html('hi');

			var subView = new app.subView({model: model});

			return this;
		}

	});

	var view = new app.view();
	$('body').append(view.render().el);


	// test results

})($, _, Backbone);