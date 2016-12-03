module.exports = db_cred = {
	"username": "a863154b-6443-4940-95fb-80413004d36e-bluemix",
	"password": "19e0df55adc2feaf27a7ad9bb17733d4d036dd28038ba23cfa10ee343281081f",
	"host": "a863154b-6443-4940-95fb-80413004d36e-bluemix.cloudant.com",
	"port": 443,
	"url": "https://a863154b-6443-4940-95fb-80413004d36e-bluemix:19e0df55adc2feaf27a7ad9bb17733d4d036dd28038ba23cfa10ee343281081f@a863154b-6443-4940-95fb-80413004d36e-bluemix.cloudant.com"
};

var cloudant = require('cloudant')(db_cred.url);

module.exports = cloudant;