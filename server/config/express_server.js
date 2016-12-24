var express = require('express');
var path =require('path');
var truckapi = require('../router/truckapi');
var questionapi = require('../router/questionapi');
var companyapi = require('../router/companyapi');
var authenticationapi = require('../router/authenticationapi')

var PATHS = {
  indexHTML: path.join(__dirname, '../../app/build/index.html'),
  public: path.join(__dirname, '../../app/build')
};

module.exports = function (app) {
	// Serve static files
	app.use(express.static(PATHS.public));

	// API routers
	app.use('/api/company', companyapi);
	app.use('/api/truck', truckapi);
	app.use('/api/question', questionapi);
	app.use('/api/auth', authenticationapi);

	// Serve all front end requests
	app.get('/', function(req, res) {
		res.sendFile(PATHS.indexHTML);
	});
}
