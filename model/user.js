const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'Users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
            },
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
            },
        },
    },
    {
        freezeTableName: true,
    },
);

(async () => {
    await User.sync();
})();

module.exports = User;
