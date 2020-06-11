// define student request table
module.exports = (sequelize, Sequelize) => {
    const Student_Item_Request = sequelize.define(
        "student_item_requests",
        {
            studentId: {
                type: Sequelize.STRING
            },
            item_no: {
                type: Sequelize.STRING
            },
            item_name: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING(1000)
            },
            staffId: {
                type: Sequelize.STRING
            },
            reason: {
                type: Sequelize.STRING(1000)
            },
            isApproved: {
                type: Sequelize.BOOLEAN,
            },
            proceededAt: {
                type: Sequelize.DATE
            },
            reviewedTime: {
                type: Sequelize.DATE
            }
        },
        {
            timestamps: true,
            createdAt: 'requestedTime',
            updatedAt: false
        }
    );

    return Student_Item_Request;
};