const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        accountName: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            validate:{
                len: [8]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Users.associates = function(models) {
        Users.hasMany(models.ChatRooms)
        Users.hasMany(models.ChitChats)
    }

    return Users;
}