var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');
var midddlewareObj = require('../middleware');

//INDEX CAMP ROUTE
router.get('/', function(req, res) {
	Campground.find({}, function(err, campsground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { camps: campsground });
		}
	});
});
//Create Route ADD NEW CAMPGrounds To db
router.post('/', midddlewareObj.isLoggedin, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var information = req.body.information;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCamp = { name: name, image: image, information: information, author: author, price: price };
	console.log(req.user);
	Campground.create(newCamp, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			req.flash('sucsess', 'Campground Created!');
			console.log(campground);
			res.redirect('/campgrounds');
		}
	});
});
//NEW Show the form for adding campgrounds
router.get('/new', midddlewareObj.isLoggedin, function(req, res) {
	res.render('campgrounds/new');
});

//SHOW ROUTE
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundcamp) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { foundcamp: foundcamp });
		}
	});
});

// EDIT ROUTE
router.get('/:id/edit', midddlewareObj.ownerShip, function(req, res) {
	Campground.findById(req.params.id, function(err, foundcamp) {
		res.render('campgrounds/edit', { foundcamp: foundcamp });
	});
});

router.put('/:id', midddlewareObj.ownerShip, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'Campground Edited  Sucessfully!!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete('/:id', midddlewareObj.ownerShip, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground Deleted Sucessfully');
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
