var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(express.static("/views/partials"));

var dungeons =
[
	{name: "Fire Cavern", image: "firecavern.jpg"},
	{name: "Ice Temple", image: "icetemple.jpg"},
	{name: "Forest Maze", image: "forestmaze.jpg"},
	{name: "The Pit", image: "thepit.jpg"},	
	{name: "Fire Cavern", image: "firecavern.jpg"},
	{name: "Ice Temple", image: "icetemple.jpg"},
	{name: "Forest Maze", image: "forestmaze.jpg"},
	{name: "The Pit", image: "thepit.jpg"},
];

app.get("/", function(req, res){
	res.redirect("dungeons");
});

app.get("/dungeons", function(req, res){
	res.render("dungeons", {dungeons: dungeons});
});

app.get("/dungeons/new", function(req, res){
	res.render("new.ejs")
});

app.post("/dungeons", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	dungeons.push(newCampground);
	res.redirect("/dungeons");
});

app.listen(3000, function(){
	console.log("dunjego is live @ 3000");
});