'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
    }
  };
  Feedback.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER,
    starRate: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
    timestamps: false
  });
  return Feedback;
};