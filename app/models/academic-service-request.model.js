// define academic request table
module.exports = (sequelize, Sequelize) => {
    const Academic_Service_Request = sequelize.define(
        "academic_service_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            academicId: {
                type: Sequelize.STRING
            },
            service_no: {
                type: Sequelize.STRING
            },
            reason: {
                type: Sequelize.STRING(1000)
            },
            isProceeded: {
                type: Sequelize.BOOLEAN,
            }
        },
        {
            timestamps: true,
            createdAt: 'requestedTime',
            updatedAt: false
        }
    );

    return Academic_Service_Request;
};