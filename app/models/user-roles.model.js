// define users table
module.exports = (sequelize, Sequelize) => {
    const User_Roles = sequelize.define(
        "user_roles",
        {
            roleId: {
                type: Sequelize.NUMBER
            },
            username: {
                type: Sequelize.STRING,
            }
        },
        {
            timestamps: false
        }
    );

    return User_Roles;
};