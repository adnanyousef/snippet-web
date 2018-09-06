module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define("Snippet", {
    title: DataTypes.STRING,
    tags: DataTypes.STRING,
    code: DataTypes.TEXT
  });
  return Snippet;
};
