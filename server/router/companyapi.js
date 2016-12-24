/*
	Note: _id is the company name
	example input: 
	{
		"_id": "Testing Company",
		"address": {
			"street": "123 street",
			"city": "Austin",
			"state": "Texas",
			"zip": "78727"
		},
		"truck":[
			{
				"vin":"A123",
				"type":"A"
			}
		]
	}		
*/
var express = require('express');
var cloudant = require('../../database/db_credential');
var request = require('request');

var db = null;
var router = express.Router();
var dbname = 'companies';

router.get('', function(req,res,next) {
	console.log("Enter get company");
	db = cloudant.use(dbname);
	var cloudantquery = {
		"selector": {
			"_id": req.query.name
		}
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (error) return {"error":error}

		if (body.docs[0]._id) {
			res.send({
				"exist":true,
				"body":body.docs[0]
			})
		} else if (body.docs.length > 0) {
			res.send({"error": "MULTIPLE_DOC_FOUND"});
		} else {
			res.send({"exist": false});
		}
	});
});

router.post('', function(req,res,next) {
	console.log("Enter post company");
	db = cloudant.use(dbname);
	var cloudantquery = {
		"selector": {
			"_id": req.params.name
		}
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (error) return {"error":error}

		if (body.docs[0]._id) {
			res.send({
				"exist":true,
				"body":body.docs[0]
			})
		} else if (body.docs.length > 0) {
			res.send({"error": "MULTIPLE_DOC_FOUND"});
		} else {
			res.send({"exist": false});
		}
	});
});

module.exports = router;