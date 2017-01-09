var express = require('express');
var cloudant = require('../../database/db_credential');
var backup = require('../../database/backup_db');
var request = require('request');

var router = express.Router();
var dbname = 'inspection_question';
var db = cloudant.use(dbname);
var backupdb = cloudant.use('inspection_question');

function saveToDb(obj) {
	obj.documentType = "question";
	obj.companyId = "fceb984cc410626b316b7e1fdb7dcc1d";
	console.log(obj);
	request({
		method: 'PUT',
		uri: backup_cred.url + '/' + "inspection_dev",
		json: true,
		body: obj
	}, function (error,response,body) {
		if (error) return {"error":error}
	});

}

router.get('/backup/questions', function(req,res,next) {
	console.log("Enter get backup questions");
	var cloudantquery = {
	  "selector": {
	    "_id": {
	      "$gt": 0
	    }
	  },
		  "fields": [
		    "z",
		    "q",
		    "i",
		    "c"
		  ]
	};
	request({
		method: 'POST',
		uri: db_cred.url + '/' + dbname + '/_find',
		json: true,
		body: cloudantquery
	}, function (error,response,body) {
		if (error) return {"error":error}
		console.log(body);
		for (var i=0; i<body.docs.length; i++) {
			
		}
		var test = {};

		saveToDb(test);

		res.send(body);
	});
});

module.exports = router;