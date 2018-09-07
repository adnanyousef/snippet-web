var db = require("../models");

var parseTags = function(tagString) {

}

module.exports = function(app) {

  // Main get route
  app.get("/api/all", function(req,res) {
    db.Snippet.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add route
  app.post("/api/new", function(req,res) {
    var tagsString = req.body.tags.replace(/ /g, "");
    console.log(tagsString);
    db.Snippet.create({
      title: req.body.title,
      tags: tagsString,
      code: req.body.code
    }).then(function() {
      res.redirect("/");
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
