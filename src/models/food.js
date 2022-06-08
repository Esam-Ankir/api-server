"use strict";

// Our table schema
const Food = (sequelize, DataTypes) =>
    sequelize.define("food", {
        foodName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foodtype: {
            type: DataTypes.STRING,
        },
        foodPrice: {
            type: DataTypes.INTEGER,
        },
    });

module.exports = Food;