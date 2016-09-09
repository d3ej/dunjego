var mongoose = require('mongoose');
var Dungeon = require('./models/dungeon');
var Comment =  require('./models/comment');

var data = [
	{
		name: "Ice Temple",
		image: "/icetemple.jpg",
		description: "Maze of ice",
		levels: 5
	},
	{
		name: "Fire Cavern",
		image: "/firecavern.jpg",
		description: "Inside Mt Doom",
		levels: 5
	},
	{
		name: "The Pit",
		image: "/thepit.jpg",
		description: "Beneath the Graveyard",
		levels: 5
	}
];

function seedDB(){
	//clear old dungeons
	Dungeon.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
	console.log("Removed dungeons!");
	//clear old comments
	Comment.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
	console.log("Removed comments!");
	});

	//add new dungeons
	data.forEach(function(seed){
		Dungeon.create(seed, function (err, dungeon){
			if (err) {
				console.log(err);
			} else {
				console.log("Added a dungeon");
				//create comments
				Comment.create(
				{
					text: "The boss is hard!",
					author: "Link"
				}, function(err, comment){
					if (err) {
						console.log(err);
					} else {
						dungeon.comments.push(comment);
						dungeon.save();
						console.log("Added a comment!");

					}
				});
			}
			});
		});
	});
}

module.exports = seedDB;