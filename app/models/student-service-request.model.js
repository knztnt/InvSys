// define student request table
module.exports = (sequelize, Sequelize) => {
    const Student_Service_Request = sequelize.define(
        "student_service_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studentId: {
                type: Sequelize.STRING
            },
            service_no: {
                type: Sequelize.STRING
            },
            staffId: {
                type: Sequelize.STRING
            },
            reason: {
                type: Sequelize.STRING(1000)
            },
            isReviewed: {
                type: Sequelize.BOOLEAN,
            }
        },
        {
            timestamps: true,
            createdAt: 'requestedTime',
            updatedAt: false
        }
    );

    return Student_Service_Request;
};