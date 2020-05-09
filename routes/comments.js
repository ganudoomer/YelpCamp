var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var midddlewareObj = require('../middleware');

//SHOW COMMENT FORM
router.get('/new', midddlewareObj.isLoggedin, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});
//POSTING THE COMMENT
router.post('/', midddlewareObj.isLoggedin, function(req, res) {
	Campground.findById(req.params.id, function(err, camp) {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comments, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					camp.comments.push(comment);
					camp.save();
					req.flash('success', 'Comment Added !!');
					res.redirect('/campgrounds/' + camp._id);
				}
			});
		}
	});
});

//EDIT COMMENT
router.get('/:Comment_id/edit', midddlewareObj.ownerShipComment, function(req, res) {
	Comment.findById(req.params.Comment_id, function(err, foundcomment) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', { campground: req.params.id, foundcomment: foundcomment });
		}
	});
});
router.put('/:Comment_id', midddlewareObj.ownerShipComment, function(req, res) {
	Comment.findByIdAndUpdate(req.params.Comment_id, req.body.comments, function(err, comment) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment Edited !!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});
//DELETE COMMENT
router.delete('/:Comment_id', midddlewareObj.ownerShipComment, function(req, res) {
	Comment.findByIdAndDelete(req.params.Comment_id, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('error', 'Comment Deleted !!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
