		// popup after form proceed
		slfmadeApp.directive('popup', function () {
			return {
				restrict: "E",
				replace: true,	
				transclude: true,
				templateUrl: "tpl/popup.html",
				scope: {
					status: '@',
				},
				controller: function($scope){
					// hide popup				
					$scope.close = function(){
						$scope.$root.popupShow = false;
					}
				}
			}
		})
		// timer run
		.directive('timer', function ($interval) {
			return {
				restrict: "E",
				replace: true,	
				templateUrl: "tpl/timer.html",
				scope: {
					dayStop: '=', 
				},	
				controller: function($scope, timerHelper) {
				
					var day_start = new Date();
					
	
					$scope.second = ($scope.dayStop.getTime() - day_start.getTime())/1000;
					
					$scope.timer = timerHelper.view($scope.second);
					$scope.texts = timerHelper.texts($scope.timer);
					
					var timer = $interval(function(){  
						timerHelper.view($scope.second--);
						$scope.timer = timerHelper.view($scope.second);
						$scope.texts = timerHelper.texts($scope.timer);
					}, 1000);
				}				
			}	
		});