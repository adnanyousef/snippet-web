var db = require("../models")
var path = require("path");

module.exports = function(app) {

  // main route
  app.get("/", function(req, res) {
    db.Snippet.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(function(results) {
      // Create array of unique tags
      var tags = [];
      for (var i=0; i<results.length; i++) {
        var tempArr = results[i].tags.split(",");
        for (var j=0; j < tempArr.length; j++) {
          if (!tags.includes(tempArr[j])) tags.push(tempArr[j]);
        };
      };
      res.render('index', {snippet: results, taglist: tags});
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
