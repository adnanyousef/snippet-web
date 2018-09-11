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

  // Each Snippet belongs to a User
  Snippet.associate = function(models) {
    Snippet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Snippet;
};
