var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

var commentsSchema = new mongoose.Schema({
	text: String,
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});
module.exports = mongoose.model('Comment', commentsSchema);
