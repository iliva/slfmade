	var myTimer = new Object ({
	
		day_start: new Date(),
		day_stop: new Date(),
		element: '',
		
		decOfNum: function(number, titles) {
			cases = [2, 0, 1, 1, 1, 2];  
			return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]; 		
		},
		
		watchView: function(second) {
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
			var hour_string = "0".substring(hour >= 10) + hour;
			var minute_string = "0".substring(minute >= 10) + minute;
			var second_string = "0".substring(second >= 10) + second;
			
			var hour_txt = this.decOfNum(hour, ['час', 'часа', 'часов']);
			var minute_txt = this.decOfNum(minute, ['минута', 'минуты', 'минут']);
			var second_txt = this.decOfNum(second, ['секунда', 'секунды', 'секунд']);
				
			return '<div class="clock"><div class="hours">'+hour_string+'</div><div class="dots">:</div><div class="minutes">'+minute_string+'</div><div class="dots">:</div><div class="seconds">'+second_string+'</div></div><div class="clock_titles"><div class="hours">'+hour_txt+'</div><div class="minutes">'+minute_txt+'</div><div class="seconds">'+second_txt+'</div></div>';		
		},
		
		init: function() {
			
			var _this = this;
			var cur_second = (this.day_stop.getTime() - this.day_start.getTime())/1000;

			var timer = setInterval(function(){  
				cur_second--;
				$(_this.element).html(_this.watchView(cur_second)).show();
			},1000);		
		}
	});