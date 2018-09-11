var db = require("../models")
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // Login page, if user logged in send them to "/list"
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/list");
    };
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Signup/create account
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/list");
    };
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // main route, render all snippets to handlebars
  app.get("/list", function (req, res) {
    db.Snippet.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(function (results) {
      // Create array of unique tags
      var tags = [];
      for (var i = 0; i < results.length; i++) {
        var tempArr = results[i].tags.split(",");
        for (var j = 0; j < tempArr.length; j++) {
          if (!tags.includes(tempArr[j])) tags.push(tempArr[j]);
        };
      };
      res.render('index', { snippet: results, taglist: tags });
    });
  });

  // send add.html to add snippets
  app.get("/add", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../public/add.html"));
  });


  // send search.html to search for snippets
  app.get("/search", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../public/search.html"));
  });

  // search by tag, render results to handlebars
  app.get("/search/:tag", function (req, res) {
    var tag = req.params.tag;

    db.Snippet.findAll({
      where: {
        tags: {
          $like: '%' + tag + '%'
        }
      },
      order: [
        ['id', 'DESC']
      ]
    }).then(function (results) {
      res.render('index', { snippet: results, taglist: ['placeholder'] });
    });
  });
};
