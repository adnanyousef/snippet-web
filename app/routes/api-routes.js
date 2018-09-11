var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/list");
  });

  // Sign up
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  // Main get route
  app.get("/api/all", function(req,res) {
    db.Snippet.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add route
  app.post("/api/new", function(req,res) {
    var tagsString = req.body.tags.replace(/ /g, "");
    if (tagsString == "") {
      tagsString = "N/A"
    };
    
    db.Snippet.create({
      title: req.body.title,
      tags: tagsString,
      code: req.body.code
    }).then(function() {
      res.redirect("/list");
    });
  });

  // Delete route
  app.delete("/api/delete/:id", function(req,res) {
    var id = req.params.id;
    db.Snippet.destroy({
      where: {
        id: id
      }
    }).then(function() {
      res.end();
    });
  })

};
