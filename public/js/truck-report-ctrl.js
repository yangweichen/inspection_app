/**
*	Truck Report Controller
**/

(function() {
	var app = angular.module('InspectionQuestion');

	app.controller('TruckReportCtrl',['$scope','$location','$http','truckService',
		function($scope,$location,$http,truckService) {
			$scope.vin = "";

			$scope.submit = function() {
				console.log("Submit");
				console.log($scope.vin);
				if ($scope.vin) {
					$http({
						url: '/api/truck/info',
						method: "GET",
						params: {vin: $scope.vin}
					}).then(function(response){
						$scope.truck_report = {
							vin: response.data.vin,
							resp: response.data.resp,
							date: response.data.date
						}
	  				},function(error) {
						alert("Get Truck Info Fail");
					});
				}
			}

			$scope.question = function() {
				truckService.setTruckReport($scope.truck_report);
				$location.path('/question');
			}
		}

	])
}) ();