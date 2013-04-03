(function(){
	"use strict";

	window.transition = {
		register: function(self, pages){
			if(!this.pages){
				this.pages = new Array();
				this.pagesObj = new Array();
				this.pointer = new Array();
			}

			var pagesObj = [];

			for(var i = 0; i < pages.length; i++){
				pagesObj.push(document.getElementById(pages[i]));
			}

			this.pages[self] = pages;
			this.pagesObj[self] = pagesObj;
			this.pointer[self] = 0;
		},
		addPage: function(self, page){
			this.pages[self].push(page);
			this.pagesObj[self].push(document.getElementById(page));
		},
		addPageObject: function(self, page, obj){
			this.pages[self].push(page);
			this.pagesObj[self].push(obj);
		},
		fadeBack: function(self){
			console.log('kick: fadeBack ', this.pointer[self]);
			if(this.pointer[self] > 0){ 
				var next = $(this.pagesObj[self][this.pointer[self]]),
					last = $(this.pagesObj[self][this.pointer[self] - 1]);

				// reset
				this.reset(last, 0, 0, next, 0, 1);

				// move
				this.move(last, 0, 1, next, 0, 0);

				this.pointer[self]--;
			}
		},
		fadeNext: function(self){
			console.log('kick: fadeNext ', this.pointer[self]);
			if(this.pointer[self] < this.pagesObj[self].length){
				var last = $(this.pagesObj[self][this.pointer[self]]),
					next = $(this.pagesObj[self][this.pointer[self] + 1]);

				// reset
				this.reset(last, 0, 1, next, 0, 0);

				// move
				this.move(last, 0, 0, next, 0, 1);

				this.pointer[self]++;
			}
		},
		fadeTo: function(self, to){
			console.log('kick: fadeTo ', this.pointer[self]);
			

			var ind = this.pages[self].indexOf(to),
				last = $(this.pagesObj[self][this.pointer[self]]),
				next = $(this.pagesObj[self][ind]);

			if(ind != this.pointer[self]){

				// reset
				this.reset(last, 0, 1, next, 0, 0);

				// move
				this.move(last, 0, 0, next, 0, 1);

				this.pointer[self] = ind;
			}
		},
		slideBack: function(self){
			console.log('kick: slideNext ', this.pointer[self]);
			if(this.pointer[self] > 0){
				var last = $(this.pagesObj[self][this.pointer[self]]),
					next = $(this.pagesObj[self][this.pointer[self] - 1]);

				// reset
				this.reset(last, 0, 1, next, -100, 1);

				// move
				this.move(last, 100, 1, next, 0, 1);

				this.pointer[self]--;
			}
		},
		slideNext: function(self){
			console.log('kick: slideNext ', this.pointer[self]);
			if(this.pointer[self] < this.pagesObj[self].length){
				var last = $(this.pagesObj[self][this.pointer[self]]),
					next = $(this.pagesObj[self][this.pointer[self] + 1]);

				// reset
				this.reset(last, 0, 1, next, 100, 1);

				// move
				this.move(last, -100, 1, next, 0, 1);
				
				this.pointer[self]++;
			}
		},
		slideTo: function(self, to){
			//console.log('_______________________________');
			//console.log('kick: slideTo ', this, this.pointer[self], to);
			var ind = this.pages[self].indexOf(to),
				last = $(this.pagesObj[self][this.pointer[self]]),
				next = $(this.pagesObj[self][ind]),
				lastLeft = 0,
				nextLeft = 0;

			//console.log('pointer: ' + this.pointer[self], 'ind: ' + ind);

			if(ind != this.pointer[self]){

				if(this.pointer[self] > ind){
					lastLeft = 100;
					nextLeft = -100;
				}else{
					lastLeft = -100;
					nextLeft = 100;
				}

				//console.log('index of to: ' + ind, 'last: ' + last.attr('id'), 'next: ' + next.attr('id'));

				// reset
				this.reset(last, 0, 1, next, nextLeft, 1);

				// move
				var poop = this; 

				window.setTimeout(function(){
					poop.move(last, lastLeft, 1, next, 0, 1);
				}, 10);

				this.pointer[self] = ind;
			}
		},
		flipBack: function(self){

		},
		flipNext: function(self){

		},
		flipTo: function(self, to){

		},
		reset: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity){
			next.removeClass('fx').css({
				'-webkit-transform': 'translate3d(' + nextLeft + '%,' + 0 + 'px,' + 0 + 'px)',
				'opacity': nextOpacity,
				'z-index': 1
			}).show();

			last.removeClass('fx').css({
				'-webkit-transform': 'translate3d(' + lastLeft + '%,' + 0 + 'px,' + 0 + 'px)',
				'opacity': lastOpacity,
				'z-index': 2
			}).show();

			//console.log('last: ' + last.attr('id'), 'lastLeft: ' + lastLeft, 'lastOpacity: ' + lastOpacity, 'next: ' + next.attr('id'), 'nextLeft: ' + nextLeft, 'nextOpacity: ' + nextOpacity);
			//console.log('last class: ' + last.attr('class'), 'next class:' + next.attr('class'));

			//console.log('reset last: ', last);
			//console.log('reset next: ', next);
		},
		move: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity){
			next.addClass('fx').show().css({
				'-webkit-transform': 'translate3d(' + nextLeft + '%,' + 0 + 'px,' + 0 + 'px)',
				'opacity': nextOpacity,
				'z-index': 2
			});
			last.addClass('fx').css({
				'-webkit-transform': 'translate3d(' + lastLeft + '%,' + 0 + 'px,' + 0 + 'px)',
				'opacity': lastOpacity,
				'z-index': 1
			});

			var timer = 0;

			timer = setInterval(function(){

				var pos = last.css("-webkit-transform"),
                	boo = pos.split(','),
                	poo = parseFloat(boo[4]);

				if(poo == lastLeft){
					last.css({'display': 'none'});
					clearInterval(timer);
				}
			}, 100);

			//console.log('last: ' + last.attr('id'), 'lastLeft: ' + lastLeft, 'lastOpacity: ' + lastOpacity, 'next: ' + next.attr('id'), 'nextLeft: ' + nextLeft, 'nextOpacity: ' + nextOpacity);
			//console.log('last class: ' + last.attr('class'), 'next class:' + next.attr('class'));

			//console.log('move last: ', last);
			//console.log('move next: ', next);
		}
	};

})();