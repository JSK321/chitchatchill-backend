module.exports = function(sequelize, DataTypes) {
    var ChatRooms = sequelize.define("ChatRooms", {
        roomName: DataTypes.STRING,

    });

    ChatRooms.associates = function(models) {
        ChatRooms.hasMany(models.ChitChats);
        ChatRooms.belongsTo(models.Users);
    };

    return ChatRooms;
};