// define reviewed request table
module.exports = (sequelize, Sequelize) => {
    const Reviewed_Service_Request = sequelize.define(
        "reviewed_service_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            remarks: {
                type: Sequelize.STRING(1000)
            },
            isApproved: {
                type: Sequelize.BOOLEAN,
            },
            reviewedTime: {
                type: Sequelize.DATE
            }
        },
        {
            timestamps: false
        }
    );

    return Reviewed_Service_Request;
};