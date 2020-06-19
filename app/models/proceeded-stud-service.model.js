// define issued item table
module.exports = (sequelize, Sequelize) => {
    const Proceeded_Stud_Service_Request = sequelize.define(
        "proceeded_stud_Service_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false
            },
            nonacademicId: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: true,
            createdAt: 'proceededAt',
            updatedAt: false
        }
    );

    return Proceeded_Stud_Service_Request;
};