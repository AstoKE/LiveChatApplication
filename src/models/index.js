const sequelize = require("../config/database");
const User = require("./User");
const Message = require("./Message");

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Message,
};