module.exports = function(sequelize, DataTypes) {
    var ChatRooms = sequelize.define("ChatRooms", {
        roomName: DataTypes.STRING,
        
    })

    return ChatRooms
}