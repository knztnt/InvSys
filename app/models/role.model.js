// define roles tables
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define(
        "roles",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false
        }
    );

    return Role;
};