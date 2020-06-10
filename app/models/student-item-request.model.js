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

    return Student_Item_Request;
};