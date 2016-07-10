		var slfmadeApp = angular.module('slfmadeApp',['ngAnimate', 'ngSanitize']);
		
		slfmadeApp.controller('mainController', function($scope, jsonData) {
		
			// hide popup
			$scope.$root.popupShow = false;
			
			//test date for timer: today+2days
			var d =  new Date();
			d.setDate(d.getDate() + 2); 
			$scope.d = d;	
	
			// get data from json files
			// banner
			jsonData.readBanner(function(data){ $scope.banner = data; });
			
			// photos
			jsonData.readPhotos(function(data){ $scope.photos = data; });
			
			// recommend
			jsonData.readRecommend(function(data){ $scope.recommend = data; });
			
			// comments
			jsonData.readComments(function(data){ $scope.comments = data; });
			
			
		})
		
		.controller('orderController', function($scope) {

			// check present pack by default
			$scope.user1 = {
				pack:1
			}
			
			// hide loading
			$scope.loading = false;
			
			// proceed order
			$scope.getOrder = function() {
				if ($scope.orderForm.$valid) {
					$scope.loading = true;
					// Submit as normal
					jQuery.ajax({
					  method: 'POST',
					  url: 'php/form.php',
					  data: {'form': $scope.user1},
					  dataType: 'json',
					}).success(function(data, status, headers, cfg) {
						// show popup 'sent'
						$scope.$root.popupShow = 'sent';
						$scope.loading = false;
					}).error(function(data, status, headers, cfg) {
						// show popup 'error'
						$scope.$root.popupShow = 'error';
						$scope.loading = false;
					});				  
				} else {
					// the form is incorrectly completed
					$scope.orderForm.submitError = true;
					$scope.$root.popupShow = 'incorrect';
				}

			}
		
		});	