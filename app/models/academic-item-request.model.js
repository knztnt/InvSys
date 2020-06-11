// define academic request table
module.exports = (sequelize, Sequelize) => {
    const Academic_Item_Request = sequelize.define(
        "academic_item_requests",
        {
            academicId: {
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

    return Academic_Item_Request;
};