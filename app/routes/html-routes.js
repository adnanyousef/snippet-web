var db = require("../../models")

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

};
