/**
*	Truck Quesion Controller
**/

(function() {
	var app = angular.module('InspectionQuestion');

	app.controller('TruckQuestionCtrl',['$scope','$location','$http','truckService',
		function($scope,$location,$http,truckService) {
			if(truckService.getTruckReport) {
				$scope.truck_report = truckService.getTruckReport();
				console.log($scope.truck_report);
			}
		}

	])
}) ();