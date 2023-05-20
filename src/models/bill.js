'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
    }
  };
  Bill.init({
    idUser: DataTypes.INTEGER,
    arrIdBook: DataTypes.STRING,
    arrQuantity: DataTypes.STRING,
    totalMoney: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
    tableName: 'bills',
    timestamps: false
  });
  return Bill;
};