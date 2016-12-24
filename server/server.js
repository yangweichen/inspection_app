var express = require('express');

var app = express();
require('./config/express_server')(app);
require('./config/error_handler')(app);

// app.use(express.static(__dirname + "/public"));

// app.get('/trucks', function(req,res) {
// 	console.log("I receive a get request");

// 	truck1 = {
// 		serial: "A123456789",
// 		zone1: "Pass",
// 		zone2: "Pass",
// 		zone3: "Pass",
// 		zone4: "Pass",
// 		zone5: "Pass"
// 	};

// 	truck2 = {
// 		serial: "B123456789",
// 		zone1: "Pass",
// 		zone2: "Pass",
// 		zone3: "Pass",
// 		zone4: "Pass",
// 		zone5: "Pass"
// 	};

// 	truck3 = {
// 		serial: "C123456789",
// 		zone1: "Pass",
// 		zone2: "Pass",
// 		zone3: "Pass",
// 		zone4: "Pass",
// 		zone5: "Pass"
// 	};

// 	var trucks = [truck1, truck2, truck3];

// 	res.json(trucks);
// });

//access cloud foundry env
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function(){
	console.log('Safety Report App started ready at ', appEnv.url);
});
