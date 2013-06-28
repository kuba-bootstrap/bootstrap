/*
 * -- Example - static
 */

$(function(){

    var View = Modal.extend({
	      template: Handlebars.compile($('#modal').html()),
    	  initialize: function(options) {
      	    console.log('initialize');
    	  },
    	  render: function() {
      	    this.$el.html(this.template(this));
      		
            console.log('render');

      		  return this;
    	  }
    });

    // View declaration

	  var modal = new View({parentEl: '#pane', button: '#modalButton'});

});

/*
 * -- Example - static
 */

$(function(){

    var View = Modal.extend({
        template: Handlebars.compile($('#modal').html()),
        initialize: function(options) {
            console.log('initialize');
        },
        render: function() {
            this.$el.html(this.template(this));
          
            console.log('render');

            return this;
        }
    });

    // View declaration

    function openModal(){
        var modal = new View({parentEl: '#pane', open: true});
    }

    $('#modalOptionsButton').click(function(){
        openModal();
    })

});