module.exports = function (sequelize, DataTypes) {
    var ChitChats = sequelize.define("ChitChats", {
        message: DataTypes.TEXT,
        userMessageId: DataTypes.INTEGER,
    })

    return ChitChats
}