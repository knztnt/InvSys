// define issued item table
module.exports = (sequelize, Sequelize) => {
    const Issued_Stud_Item_Request = sequelize.define(
        "issued_stud_item_requests",
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

    return Issued_Stud_Item_Request;
};