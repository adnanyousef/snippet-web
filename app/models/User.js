module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Anonymous"
    }
  });

  // Add foreign key to snippets
  User.associate = function(models) {
    User.hasMany(models.Snippet, {
      onDelete: "cascade"
    });
  };

  return User;
};