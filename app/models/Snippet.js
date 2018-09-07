module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define("Snippet", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled"
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "none"
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Snippet;
};
