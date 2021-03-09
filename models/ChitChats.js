const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    var ChitChats = sequelize.define("ChitChats", {
        message: DataTypes.TEXT,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('createdAt')).format('lll');
            }
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('updatedAt')).format('lll');
            }
        }
    });

    ChitChats.associate = function (models) {
        ChitChats.belongsTo(models.ChatRooms);
        ChitChats.belongsTo(models.Users);
    };

    return ChitChats;
};