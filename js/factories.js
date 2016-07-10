		// timer
		slfmadeApp.factory('timerHelper', function() {
			return {
				view: function(second) {
				
					if(second < 0) second = 0; 
					second = parseInt(second);					
					var minute = 0;
					var hour = 0;
					if(second > 59) {
						minute = Math.floor(second/60);
						second = second-(minute*60); 
					}
					if(minute > 59) {
						hour = Math.floor(minute/60);
						minute = minute-(hour*60); 
					}
					return {
						hour: "0".substring(hour >= 10) + hour,
						minute: "0".substring(minute >= 10) + minute,
						second: "0".substring(second >= 10) + second,
					}
				},
				decOfNum: function(number, titles) {
					cases = [2, 0, 1, 1, 1, 2];  
					return titles[ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10:5] ]; 					
				},
				texts: function(timer) {
					return {
						hour: this.decOfNum(timer.hour, ['час', 'часа', 'часов']),
						minute: this.decOfNum(timer.minute, ['минута', 'минуты', 'минут']),
						second: this.decOfNum(timer.second, ['секунда', 'секунды', 'секунд']),
					}
				}
			}	
		})
		// get data from .json files and initialize sliders or scroll animation
		.factory('jsonData', function($http){	
			return {		
				// data for banner
				readBanner: function(result){	
					$http.get('/json/banner.json')
						.success(function(data, status, headers, config){
							result(data);
							setTimeout(function(){  
								$('.main_slider').mySlide({	
									animateType: 'fade',
									slideSpeed: 1000,
									slideInterval: 5000
								});
							},100);
						})
						.error(function(data, status, headers, config){
							$log.warn(data, status, headers, config);
						});	
				},
				// photos
				readPhotos: function(result){	
					$http.get('/json/photos.json')
						.success(function(data, status, headers, config){
							result(data);
							setTimeout(function(){  
								$('.photo_slider').mySlide({	
									animateType: 'motion',
									slideSpeed: 500,
									slideInterval: 0
								});
							},100);
						})
						.error(function(data, status, headers, config){
							$log.warn(data, status, headers, config);
						});	
				},
				// we are recommended block
				readRecommend: function(result){	
					$http.get('/json/recommend.json')
						.success(function(data, status, headers, config){
							result(data);
							setTimeout(function(){  
								$('.recommend_slider').mySlide({	
									animateType: 'motion',
									slideSpeed: 500,
									slideInterval: 0
								});
							},100);
						})
						.error(function(data, status, headers, config){
							$log.warn(data, status, headers, config);
						});	
				},
				// comments
				readComments: function(result){	
					$http.get('/json/comments.json')
						.success(function(data, status, headers, config){
							result(data);
							setTimeout(function(){  
								$('.comments').slimScroll({
									height: 128,
									wheelStep: 20,
									size: '10px', 
									color: '#585858',
									alwaysVisible: true,
									distance: '0px', 
									opacity: 1, 
									railVisible: true, 
									railColor: '#313131',
									railOpacity: 1,
									railBorderRadius: 0, 
									borderRadius: 0, 
									railDraggable: true,
								});	
							},100);
						})
						.error(function(data, status, headers, config){
							$log.warn(data, status, headers, config);
						});	
				}					
			}
		});	
			