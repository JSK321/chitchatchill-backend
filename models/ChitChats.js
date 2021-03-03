module.exports = function (sequelize, DataTypes) {
    var ChitChats = sequelize.define("ChitChats", {
        message: DataTypes.TEXT,
    });

    ChitChats.associate = function(models) {
        ChitChats.belongsTo(models.ChatRooms);
        ChitChats.belongsTo(models.Users);
    };

    return ChitChats;
};