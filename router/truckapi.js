var express = require('express');
var cloudant = require('../database/db_credential');
var request = require('request');

var db = null;
var router = express.Router();
var dbname = 'truck_report';

router.get('/info', function(req,res,next) {
	db = cloudant.use(dbname);
	console.log(req.query.vin);
	var cloudantquery = {
		"selector": {
			"vin": {"$eq": req.query.vin}
		}
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (!error && response.statusCode == 200) {
			console.log(body.docs[0]);
			if (body.warning) {
				res.send(body.docs[0]);
			} else {
				res.send(body);
			}
		} else {
			console.log(error);
			next(error);
		}
	});

});

module.exports = router;