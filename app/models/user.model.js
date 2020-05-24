// define users table
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "users",
        {
            username: {
                type: Sequelize.STRING,
                primaryKey: true,
                autoIncrement: false
            },
            password: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false
        }
    );

    return User;
};