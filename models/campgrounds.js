var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

//CAMPGROUNGS
var campSchema = new mongoose.Schema({
	name: String,
	image: String,
	price: String,
	created: {
		type: Date,
		default: Date.now
	},
	information: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});
module.exports = mongoose.model('Campground', campSchema);
