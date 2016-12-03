/*
	Back end REST API
*/

var cloudant = require('../database/db_credential');

var truckApp = angular.module('truckApp',[]);

truckApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("truck app");

	$http.get('/trucks').success(function(response){
		console.log("I got the data I requested");
		$scope.trucks = response;
	})

}]);