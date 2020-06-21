// define issued item table
module.exports = (sequelize, Sequelize) => {
    const Proceeded_Aca_Service_Request = sequelize.define(
        "proceeded_aca_Service_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false
            },
            nonacademicId: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: true,
            createdAt: 'proceededAt',
            updatedAt: false
        }
    );

    return Proceeded_Aca_Service_Request;
};