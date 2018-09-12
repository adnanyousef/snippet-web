var db = require("../models");

// Routes for snippet-cli
module.exports = function(app) {

  // Get one by id
  app.get("/cli/getOne/:id", function(req,res) {
    db.Snippet.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  // Search route
  app.get("/cli/search/:userId/:searchTerm", function(req,res) {
    var userId = req.params.userId;
    var searchTerm = req.params.searchTerm.replace(/ /g, "");

    db.Snippet.findAll({
      where: {
        tags: {
          $like: '%' + searchTerm + '%'
        }
      },
      order: [
        ['id', 'DESC']
      ]
    }).then(function (results) {
      res.json(results);
    });
  });

};