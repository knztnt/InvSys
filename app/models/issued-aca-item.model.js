// define issued item table
module.exports = (sequelize, Sequelize) => {
    const Issued_Aca_Item_Request = sequelize.define(
        "issued_aca_item_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            nonacademicId: {
                type: Sequelize.STRING
            },
            returnBefore: {
                type: Sequelize.DATE,
            }
        },
        {
            timestamps: true,
            createdAt: 'issuedTime',
            updatedAt: 'returnedTime'
        }
    );

    return Issued_Aca_Item_Request;
};