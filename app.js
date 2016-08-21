var express     = require('express'),
	app  		= express(),
	bodyParser  = require('body-parser'),
	mongoose  	= require('mongoose');


mongoose.connect("mongodb://127.0.0.1/dunjego");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(express.static("/views/partials"));

var dungeonSchema = new mongoose.Schema({
	name: String,
	image: String,
	levels: Number,
	difficulty: String,
	monsters: [String],
	loot: [String]
});

var dungeon = mongoose.model("Dungeon", dungeonSchema);

app.get("/", function(req, res){
	res.redirect("dungeons");
});

app.get("/dungeons", function(req, res){
	dungeon.find({}, function(err, allDungeons){
		if(err){
			console.log(err);
		} else{
			res.render("dungeons", {dungeons: allDungeons});
		}
	});
});

app.get("/dungeons/new", function(req, res){
	res.render("new.ejs")
});

app.post("/dungeons", function(req, res){
	var name 		= req.body.name;
		image 		= req.body.image;
		levels 		= req.body.levels;
		difficulty 	= req.body.difficult;
		monsters 	= req.body.monsters;
		loost 		= req.body.image;
		newDungeon 	= {name: name, image: image};
	//create new dungeon, save to DB
	dungeon.create(newDungeon, function(err, newlyCreated){
		if(err){
			console.log(err)
		} else{
			//redirect to dungeons
			res.redirect("/dungeons");
		}
	});
});

app.listen(3000, function(){
	console.log("dunjego is live @ 3000");
});