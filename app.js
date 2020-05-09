var express = require('express'),
	app = express(),
	flash = require('connect-flash'),
	mongoose = require('mongoose'),
	Campground = require('./models/campgrounds'),
	bodyParser = require('body-parser'),
	seedb = require('./models/seed'),
	Comment = require('./models/comments');
(passport = require('passport')),
	(LocalStrategy = require('passport-local')),
	(User = require('./models/User')),
	(methodOverride = require('method-override'));

app.use(methodOverride('_method'));
app.use(flash());
app.locals.moment = require('moment');
//REQUIRE ROUTES
var campgroundroute = require('./routes/campgrounds'),
	commentroute = require('./routes/comments'),
	indexroute = require('./routes/auth');

//CONFIG MONGOOSE
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/Yelp_11', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
//  seedb();  //DELETESEED

//CONFIG PASSPORT
app.use(
	require('express-session')({
		secret: 'pottan manoj',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');

	next();
});

//USE ROUTES
app.use('/campgrounds', campgroundroute);
app.use('/campgrounds/:id/comments', commentroute);
app.use('/', indexroute);

//APP.LISTENER
app.listen(process.env.PORT, process.env.IP, function() {
	console.log('======YelpServerV12=====');
});
