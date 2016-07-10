(function($) {

	jQuery.fn.extend({
		mySlide: function(options) {
			
			var o = $.extend({
				animateType: 'fade',
				slideSpeed: 500,
				slideInterval: 0,
				element: $(this),
				slider: $(this).find("div.slides"),
				current: 0,
				interv: 0,
			}, options);

			obj = new Object ({

				getItemWidth: function() {
					return o.slider.find("div.item").outerWidth();
				},
				
				init: function() {  
					
					var _this = this;
					var slidesCount = o.slider.find("div.item").length;
					if (slidesCount <= 1)
						return false;

					// motion
					if(o.animateType == 'motion') {
						// adding last items before first 
						o.slider.find('div.item:first').before(o.slider.find('div.item:last').parent('div').html()); 
						o.slider.css('left', - this.getItemWidth());
					} else {
					// fade
						o.slider.find('div.item').css({'position':'absolute','top':0,'left':0});
						o.slider.find('div.item').css({'zIndex':1});
						o.slider.find('div.item').eq(0).css({'zIndex':3});
					}

					this.startAutoSlide(); // starting autoslide

					// stop on hover		
					o.slider.on({
						mouseenter: function () {
							_this.stopAutoSlide();
						},
						mouseleave: function () {
							_this.startAutoSlide();
						}
					});
					
					// left-right bottons
					o.element.parent('div').find(".left_button").on("click", function(){ _this.slide("left"); });
					o.element.parent('div').find(".right_button").on("click", function(){_this.slide("right")});
				},


				// start auto sliding
				startAutoSlide: function() {	
					var _this = this;
					if (o.slideInterval > 0) {
						this.stopAutoSlide();
						o.interv = setInterval(function() { _this.slide();}, o.slideInterval);
					}
				},

				stopAutoSlide: function() {
					clearInterval(o.interv);
				},

				// perform sliding effect
				slide: function(direction) {	

					var _this = this;
					this.stopAutoSlide();

					direction = (typeof(direction) !== 'undefined')? direction : 'right';

					var slidesCount = o.slider.find(".item").length;

					// motion
					if(o.animateType == 'motion') {
					
						var currentMargin = parseInt(o.slider.css('left'));
						var newMargin = (direction == "right")? currentMargin - this.getItemWidth() : currentMargin + this.getItemWidth();
						
						if (o.slider.is(':not(:animated)')) {				
							o.slider.animate({'left' : newMargin}, o.slideSpeed, function(){    

								switch (direction)	{
									case 'left':
										o.current--;
										if (o.current <= -1) o.current = slidesCount;
										o.slider.find('div.item:first').before(o.slider.find('div.item:last'));
										break;
									case 'right':
									default:
										o.current++;
										if (o.current >= slidesCount) o.current = 1;
										o.slider.find('div.item:last').after(o.slider.find('div.item:first')); 
										break;
								}
								
								o.slider.css({'left' : '-' + _this.getItemWidth() + 'px'});

								_this.startAutoSlide();
							});	
						}	
					} else {
					// fade
						if (o.slider.is(':not(:animated)')) {			
							switch (direction) {
								case 'left':
									var nextItem = o.current-1;
									if(nextItem <= -1) nextItem = slidesCount-1;
									break;
								case 'right':
								default:	
									var nextItem = o.current+1;
									if(nextItem >= slidesCount) nextItem = 0;
									break;
							}		
							// next item			
							o.slider.find('div.item').eq(nextItem).css({'zIndex':2});
							// current item
							o.slider.find('div.item').eq(o.current).fadeOut(o.slideSpeed, function(){ 
								o.current = nextItem;
								o.slider.find('div.item').css({'zIndex':1}).show();
								o.slider.find('div.item').eq(o.current).css({'zIndex':3});					
								_this.startAutoSlide();
							});
						}	
					}
				},
			});
			return obj.init();
		}
	});
 })(jQuery);