// define profile table
module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define(
        "profiles",
        {
            username: {
                type: Sequelize.STRING,
                primaryKey: true,
                autoIncrement: false
            },
            first_name: {
                type: Sequelize.STRING(50)
            },
            last_name: {
                type: Sequelize.STRING(50)
            },
            phone_no: {
                type: Sequelize.INTEGER
            },
            address: {
                type: Sequelize.STRING
            },
            batch: {
                type: Sequelize.STRING(10)
            },
            department: {
                type: Sequelize.STRING(50)
            }
        },
        {
            timestamps: false
        }
    );

    return Profile;
};