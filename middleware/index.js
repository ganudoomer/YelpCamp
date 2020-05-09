var midddlewareObj = {};
var Comment = require('../models/comments'),
	Campground = require('../models/campgrounds');

midddlewareObj.ownerShipComment = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.Comment_id, function(err, foundcomment) {
			if (err) {
				console.log(err);
			} else {
				if (foundcomment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You must login to do that');
		res.redirect('/login');
	}
};
//CAMPGROUND OWNER SHIPP
midddlewareObj.ownerShip = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundcamp) {
			if (err) {
				console.log(err);
			} else {
				if (foundcamp.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You must login to do that');
		res.redirect('/login');
	}
};

midddlewareObj.isLoggedin = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error', 'Login in to do that');
		res.redirect('/login');
	}
};

module.exports = midddlewareObj;
