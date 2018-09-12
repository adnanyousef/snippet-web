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

  // Logout
  app.get("/api/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Returns raw json of all snippets
  app.get("/api/all", function(req,res) {
    db.Snippet.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add route
  app.post("/api/new", function(req,res) {
    var userId = req.user.id;
    var tagsString = req.body.tags.replace(/ /g, "");
    if (tagsString == "") {
      tagsString = "N/A"
    };
    
    db.Snippet.create({
      title: req.body.title,
      tags: tagsString,
      code: req.body.code,
      UserId: userId
    }).then(function() {
      res.redirect("/list");
    });
  });

  // Edit route
  app.post("/api/edit/:id", function(req,res) {
    var id = req.params.id;
    var tagsString = req.body.tags.replace(/ /g, "");
    if (tagsString == "") {
      tagsString = "N/A"
    };
    var newSnippet = {
      title: req.body.title,
      tags: tagsString,
      code: req.body.code
    };
    db.Snippet.update(newSnippet, {
      where: {
        id: id
      }
    }).then(function() {
      console.log("updated");
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
  });

  // Get user info
  app.get("/api/user_info", function(req,res) {
    var email = req.user.email;
    res.json({email: email});
  });

};
