var express = require('express');
var cloudant = require('../../database/db_credential');
var request = require('request');

var db = null;
var router = express.Router();
var dbname = 'inspection_question';

router.get('/', function(req,res,next) {
	db = cloudant.use(dbname);
	var cloudantquery = {
		"selector": {
			"z": {"$eq": "1"}
		}
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
			res.send(body);
		} else {
			console.log(error);
			next(error);
		}
	});

});

// not used for now
router.post('', function(req,res,next) {
	db = cloudant.use(dbname);
	db.insert(req.body, function(err,data) {
		console.log("Error: ", err);
		console.log("Data: ", data);
	})
	res.send("Success");
});

module.exports = router;