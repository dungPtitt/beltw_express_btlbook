'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Authority, {foreignKey: "idAuth", as: "dataUserAndIdAuth"});
      User.hasMany(models.Feedback, {foreignKey: "idUser", as: "dataUser"});
    }
  };
  User.init({
    idAuth: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};