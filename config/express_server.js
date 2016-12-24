var express = require('express');
var path =require('path');
var truckapi = require('../router/truckapi');
var questionapi = require('../router/questionapi');
var companyapi = require('../router/companyapi');
var authenticationapi = require('../router/authenticationapi')

module.exports = function (app) {
	//files are looked regarding to the static directory public
	app.use(express.static(path.join(__dirname, '/../public')));
	
	app.get('/',function(req, res) {
		res.sendFile(__dirname+ '../public/index.html');
	}); 
	
	app.use('/api/company', companyapi);
	app.use('/api/truck', truckapi);
	app.use('/api/question', questionapi);
	app.use('/api/auth',authenticationapi);
}