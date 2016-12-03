var services = angular.module('Services',[]);

services.service('truckService', function() {
	var truck_report = {};

	var getTruckReport = function() {
		return truck_report;
	};

	var setTruckReport = function(t) {
		console.log(t);
		truck_report = t;
	};

	return {
		getTruckReport:getTruckReport,
		setTruckReport:setTruckReport
	}
})