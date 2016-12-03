var services = angular.module('Services',[]);

services.service('TruckService', function() {
	var truck_report = {};

	var getTruckReport = function() {
		return truck_report;
	}

	var setTruckReport = function(t) {
		truck_report = t;
	}
})