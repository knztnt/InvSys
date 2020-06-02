// define items table
module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define(
        "items",
        {
            item_no: {
                type: Sequelize.STRING,
                primaryKey: true,
                autoIncrement: false
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
            availability: {
                type: Sequelize.BOOLEAN
            }
        },
        {
            timestamps: false
        }
    );

    return Item;
};