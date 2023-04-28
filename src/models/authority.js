'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    static associate(models) {
      Authority.hasMany(models.User, {foreignKey: "idAuth", as: "dataUserAndIdAuth"});
    }
  };
  Authority.init({
    authName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Authority',
    tableName: 'authorities'
  });
  return Authority;
};