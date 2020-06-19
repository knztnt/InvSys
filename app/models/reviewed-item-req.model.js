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
            isIssued: {
                type: Sequelize.BOOLEAN,
            }
        },
        {
            timestamps: true,
            createdAt: 'reviewedTime',
            updatedAt: false
        }
    );

    return Reviewed_Item_Request;
};