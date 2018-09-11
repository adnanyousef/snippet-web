require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./app/models");
var session = require("express-session");
var passport = require("./app/config/passport");

// Express and body parser
var app = express();
var PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./app/routes/api-routes.js")(app);
require("./app/routes/html-routes.js")(app);

// Set up DB
if (process.env.SETUP_DB) {
  console.log("Resetting database...");
  var syncOptions = {force: true};
} else {
  var syncOptions = {force: false};
};

// Listener
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
