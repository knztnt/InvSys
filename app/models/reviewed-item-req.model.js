// define reviewed request table
module.exports = (sequelize, Sequelize) => {
    const Reviewed_Item_Request = sequelize.define(
        "reviewed_item_requests",
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

    return Reviewed_Item_Request;
};