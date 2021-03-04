module.exports = function(sequelize, DataTypes) {
    var Friends = sequelize.define("Friends", {
        accountName: DataTypes.STRING,
        email: DataTypes.STRING,
        profileImage: DataTypes.STRING
    })

    Friends.associates = function(models) {
        Friends.belongsTo(models.Users)
    }

    return Friends
}