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

    Users.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    // Users.beforeBulkUpdate(function (user) {
    //     if (user.attributes.password !== "" && user.attributes.password !== undefined && user.attributes.password !== null) {
    //         user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10), null);
    //     }
    // })

    return Users;
}