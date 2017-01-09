var dbname = 'inspection_dev';
var request = require('request');
// manually set company id
var companyId = "fceb984cc410626b316b7e1fdb7dcc1d";

// note: no password authentication for now; need implementation with bCrypy
exports.findByUserName = function(email, password, callback) {
	console.log("Enter findByUserName");
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
		if (error) return callback(null,{"error":error});

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

exports.findByUserId = function(userid, callback){
	console.log("Enter findByUserName");
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
		if (error) return callback(null,{"error":error});

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