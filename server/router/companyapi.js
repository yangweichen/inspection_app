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

var router = express.Router();
var dbname = 'inspection_dev';
var db = cloudant.use(dbname);

function loadCompany(req,res,next) {
	if (req.params.companyId) {
		if (req.params.companyId) {
			var cloudantquery = {
				"selector": {

				}
			}
		}
	}
}

function loadTruck(req,res,next) {
	if (req.params.companyId) {
		if (req.params.companyId) {
			var cloudantquery = {
				"selector": {

				}
			}
		}
	}
}

router.get('/:companyId/trucks/:vin/questions',loadCompany,loadTruck,function(req,res,next) {
	console.log("Enter get company");
	console.log(req.params);
	// var cloudantquery = {
	// 	"selector": {
	// 		"_id": req.query.name
	// 	}
	// };
	// request({
	// 	method: 'POST',
	// 	uri: db_cred.url + '/' + dbname + '/_find',
	// 	json: true,
	// 	body: cloudantquery
	// }, function (error,response,body) {
	// 	if (error) return {"error":error}

	// 	if (body.docs[0]._id) {
	// 		res.send({
	// 			"exist":true,
	// 			"body":body.docs[0]
	// 		})
	// 	} else if (body.docs.length > 0) {
	// 		res.send({"error": "MULTIPLE_DOC_FOUND"});
	// 	} else {
	// 		res.send({"exist": false});
	// 	}
	// });
});


module.exports = router;