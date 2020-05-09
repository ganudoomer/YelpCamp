var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');

//ROOT ROUTE
router.get('', function(req, res) {
	res.render('home');
});
//AUTHEN
router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', function(req, res) {
	req.body.username;
	req.body.password;
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, req, function() {
				req.flash('success', 'Welcome to Yelp Campgrounds ' + user.username);
				res.redirect('/campgrounds');
			});
		}
	});
});

//LOGIN ROUTE
router.get('/login', function(req, res) {
	res.render('login');
});
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	function(req, res) {}
);

//LOGOUT ROUTE
router.get('/logout', function(req, res) {
	req.logOut();
	req.flash('success', 'Logged you out');
	res.redirect('/campgrounds');
});

function isLoggedin(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}
module.exports = router;
