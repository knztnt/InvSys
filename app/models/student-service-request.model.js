// define student request table
module.exports = (sequelize, Sequelize) => {
    const Student_Service_Request = sequelize.define(
        "student_service_requests",
        {
            studentId: {
                type: Sequelize.STRING
            },
            service_no: {
                type: Sequelize.STRING
            },
            service_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            staffId: {
                type: Sequelize.STRING
            },
            reason: {
                type: Sequelize.STRING(1234)
            },
            isApproved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            proceededAt: {
                type: Sequelize.DATE
            }
        },
        {
            timestamps: true,
            createdAt: 'requestedTime',
            updatedAt: 'reviewedTime'
        }
    );

    return Student_Service_Request;
};