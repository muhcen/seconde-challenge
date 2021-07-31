const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('./../config/database');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 50],
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 50],
            },
        },
    },
    {
        freezeTableName: true,
    },
);

User.prototype.createJwt = async function () {
    return await jwt.sign({ id: this.id }, process.env.PRIVATE_KEY);
};
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 12);
});

(async () => {
    await User.sync();
})();

module.exports = User;
