/**
*	Angular app for Inspection Question App
**/

(function() {
	var app = angular.module('InspectionQuestion',['ngRoute','ngSanitize','Services']);
	var truck_report = {};

	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'partials/TruckInfo.html',
				controller: 'TruckReportCtrl'
			});
		}
	])

	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/question', {
				templateUrl: 'partials/QuestionEntry.html',
				controller: 'TruckQuestionCtrl'
			});
		}
	])
}) ();