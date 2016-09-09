var mongoose = require('mongoose');

var dungeonSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	levels: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Dungeon", dungeonSchema);