var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    dungeon     = require('./models/dungeon'),
    comment     = require('./models/comment'),
    seedDB      = require('./seeds');

mongoose.connect("mongodb://127.0.0.1/dunjego");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./assets"));
app.use(express.static("/views/partials"));

//remove old dungeons/comments, populate new ones
seedDB();

app.get("/", function(req, res){
    res.redirect("dungeons");
});

app.get("/dungeons", function(req, res){
    dungeon.find({}, function(err, allDungeons){
        if(err){
            console.log(err);
        } else{
            res.render("dungeons/index", {dungeons: allDungeons});
        }
    });
});

app.post("/dungeons", function(req, res){
    var name        = req.body.name;
    var image       = "/" + req.body.image;
    var description = req.body.description;
    var levels      = req.body.levels;
    var newDungeon  = {
                        name: name,
                        image: image,
                        description: description,
                        levels: levels,
                      };
    //create new dungeon, save to DB
    dungeon.create(newDungeon, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            //redirect to dungeons
            res.redirect("dungeons");
        }
    });
});

app.get("/dungeons/new", function(req, res){
    res.render("dungeons/new")
});

app.get("/dungeons/:id", function(req, res){
    dungeon.findById(req.params.id).populate("comments").exec(function (err, foundDungeon){
        if(err){
            console.log(err);
        } else {
            res.render("dungeons/show", {dungeon: foundDungeon});
        }
    });
});


//COMMENTS ROUTES

app.get("/dungeons/:id/comments/new", function (req, res){
    //find dungeon by id
    dungeon.findById(req.params.id, function(err, dungeon){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {dungeon: dungeon});
        }
    })
});

app.post("/dungeons/:id/comments", function (req, res){
    //add new comment
    dungeon.findById(req.params.id, function(err, dungeon){
        if (err) {
            console.log(err);
            res.redirect("/dungeons");
        } else {
            console.log(req.body.comment);
            comment.create(req.body.comment, function (err, comment){
                if (err) {
                    console.log(err);
                } else {
                    dungeon.comments.push(comment);
                    dungeon.save();
                    res.redirect("/dungeons/" + dungeon._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log("dunjego is live @ 3000");
});