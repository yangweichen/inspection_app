var express = require('express');
var cloudant = require('../database/db_credential');
var request = require('request');
var bodyParser = require("body-parser");

var router = express.Router();
var dbname = 'truck_company';
var db = cloudant.use(dbname);
// manually set company id
var companyId = "feda10d40d9e3a6da078fe22ce99392a";

var getUser = function(e,res) {
	console.log("Enter getUser");
	var cloudantquery = {
		"selector": {
		    "email": e,
			"documentType":"userInfo"
		},
		"fields": [
			"userId",
			"companyId",
			"email",
			"firstName",
			"lastName",
			"profilePicURL",
			"isAdmin",
			"company"
		]
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (error) res.send({"error":error});
		console.log(body.docs[0]);
		if (body.docs.length > 1) {
			res.send({"error":"DUPLICATE_USER"});
		}
		if (body.docs.length == 0) {
			res.send({"error":"NO_USER_DOC_FOUND"});
		}

		res.status(200)
		res.send(body.docs[0]);
	});
}

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function(req,res,next) {
	console.log("Enter login");
	var cloudantquery = {
		"selector": {
			"_id": companyId
		},
		"fields": [
    		"employees"
  		]
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		// default to 401
		res.status(401);
		if (error) res.send({"error":error});

		var users = body.docs[0].employees;
		var indexOf = users.indexOf(req.body.email);

		if (users == null) {
			res.send({"error":"USER_OBJECT_UNDEFINED"});
		}
		if (users.length == 0) {
			res.send({"error":"EMPTY_USER_LIST"});
		}
		if (indexOf < 0) {
			res.send({"error":"NO_USER_FOUND"});
		}
		else {
			var userInfo = getUser(users[indexOf],res);
		}

	});
});

module.exports = router;