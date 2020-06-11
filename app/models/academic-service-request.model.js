// define academic request table
module.exports = (sequelize, Sequelize) => {
    const Academic_Service_Request = sequelize.define(
        "academic_service_requests",
        {
            academicId: {
                type: Sequelize.STRING
            },
            service_no: {
                type: Sequelize.STRING
            },
            service_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING(1000)
            },
            reason: {
                type: Sequelize.STRING(1000)
            },
            proceededAt: {
                type: Sequelize.DATE
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