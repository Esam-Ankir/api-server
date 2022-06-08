"use strict";
require('dotenv').config();

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");

const Food = require('./food');
const Clothes = require('./clothes');
const Collection = require('./lib/collection')

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: { require: true, rejectUnauthorized: false} ,
                native: true
            }
        } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const foodTable = Food(sequelize, DataTypes);
const clothesTable = Clothes(sequelize, DataTypes);

const foodCollection = new Collection(foodTable);
const clothesCollection = new Collection(clothesTable);

// customerTable.hasMany(foodTable, {
//     foreignKey: "customerId",
//     sourceKey: "id"
// });
// foodTable.belongsTo(customerTable, {
//     foreignKey: "customerId",
//     targetKey: "id",
// });
// customerTable.hasMany(clothesTable, {
//     foreignKey: "customerId",
//     sourceKey: "id"
// });
// clothesTable.belongsTo(customerTable, {
//     foreignKey: "customerId",
//     targetKey: "id",
// });
module.exports = {
    db: sequelize,
    // Food: Food(sequelize, DataTypes),
    // Clothes: clothes(sequelize, DataTypes),
    FoodTable: foodCollection,
    ClothesTable: clothesCollection
};