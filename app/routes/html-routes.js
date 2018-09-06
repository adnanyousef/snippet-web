var db = require("../../models")
var path = require("path");

module.exports = function(app) {

  // main route
  app.get("/", function(req, res) {
    db.Snippet.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(function(results) {
      res.render('index', {snippet: results});
    });
  });

  app.get("/add", function(req,res) {
    res.sendFile(path.resolve(__dirname, "../public/add.html"));
    // res.send("IN PROGRESS");
  });

  app.get("/search", function(req,res) {
    res.sendFile(path.resolve(__dirname, "../public/search.html"));
  });

};
