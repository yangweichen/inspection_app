var express = require('express');
var path = require('path');
var session = require('express-session');
var truckapi = require('../router/truckapi');
var questionapi = require('../router/questionapi');
var companyapi = require('../router/companyapi');
var authenticationapi = require('../router/authenticationapi');
var User = require('../router/userapi');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// helper function; used for migration
// var helperapi = require('../router/helperapi');

passport.use('local', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false
	}, function(username, password, done) {
		console.log('Enter new local strategy');
		// authenticate with server
		User.findByUserName(username,password,function(user,error)  {
			if (error) return done(null, error);

			if (!user) return done(null, 'NO_USER_FOUND');

			// return the user found
			return done(user,null);
		})
	}
));

// User passport to maintain sessions. Authenticated user must be serialized to the session,
// and deserialized when subsequent requests are made
passport.serializeUser(function(user, done) {
	console.log('Enter serialize ' + user.email);
	if(user) done(null, user.email);
});

passport.deserializeUser(function(id, done) {
	console.log('Enter deserialize ' + id);
	User.findByUserId(id, function(error,user) {
		if (error) console.log('Error deserializerUser: ' + error);
		if (!user) console.log('Error deserializerUser: USER_NOT_FOUND');
		done(error, user);
	});
});

var PATHS = {
  indexHTML: path.join(__dirname, '../../app/build/index.html'),
  public: path.join(__dirname, '../../app/build')
};

module.exports = function (app) {
	// Serve static files
	app.use(express.static(PATHS.public));

	// Create Session
	app.use(require('cookie-parser')());
	app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'SuperseCretKEY', cookie:{secure: false}}));
	app.use(passport.initialize());
	app.use(passport.session());

	// API routers
	app.use('/api/company', companyapi);
	app.use('/api/truck', truckapi);
	app.use('/api/question', questionapi);
	app.use('/api/auth', authenticationapi);

	// app.use('/api/helper', helperapi);

	// Serve all front end requests
	app.get('/', function(req, res) {
		res.sendFile(PATHS.indexHTML);
	});
}