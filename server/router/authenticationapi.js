var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");

var router = express.Router();
var dbname = 'inspection_dev';
// manually set company id
var companyId = "fceb984cc410626b316b7e1fdb7dcc1d";

var getUser = function(email, callback) {
	console.log("Enter getUser");
	var cloudantquery = {
		"selector": {
		    "email": email,
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
		// return error object with callback function call
		if (error) return {"error":error};

		console.log(body.docs[0]);
		if (body.docs.length > 1) {
			// multipe user found; return error
			return callback(null,{"error":"DUPLICATE_USER"});
		} else if (body.docs.length == 0) {
			// no user found: return error
			return callback(null,{"error":"NO_USER_DOC_FOUND"});
		} else {
			// set session id to the email return
			return callback(body.docs[0],null);
		}
	});
}

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', function(req,res,next) {
	console.log("Enter login");
	console.log('================================');
	console.log(req.session);
	console.log('================================');
	if (req.session.user) {
		// if user exist, send back the old one
		console.log("old session sent");
		res.send(req.session.user);
	}
	console.log('Check ID');
	console.log(req.session.id);
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

		if (!req.body.email) {
			if (req.session.id) {

			}
		}

		// get employee list from db, and check whether the emaill exists
		var indexOf = -1;
		var users = body.docs[0].employees;

		// check id; either in req body or session
		if (req.body.email) {
			indexOf = users.indexOf(req.body.email);
		} else if (req.session.id) {
			indexOf = users.indexOf(req.session.id);
		} else {
			res.send({"error":"NO_ID_INPUT"});
		}

		if (users == null) {
			res.send({"error":"USER_ARRAY_UNDEFINED"});
		}
		if (users.length == 0) {
			res.send({"error":"EMPTY_USER_LIST"});
		}
		if (indexOf < 0) {
			res.send({"error":"NO_USER_FOUND"});
		}
		else {
			var userInfo = getUser(users[indexOf], function(user,error){

				// if no error, set status to 200
				if (!user.error) {
					//set uesr for the session
					req.session.user = user;
					res.status(200);
				}
				//send back userInfo
				res.send(user);
			});
		}

	});
});

module.exports = router;