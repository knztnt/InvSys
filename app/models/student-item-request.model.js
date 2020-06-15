// define student request table
module.exports = (sequelize, Sequelize) => {
    const Student_Item_Request = sequelize.define(
        "student_item_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studentId: {
                type: Sequelize.STRING
            },
            item_no: {
                type: Sequelize.STRING
            },
            staffId: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
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

    return Student_Item_Request;
};