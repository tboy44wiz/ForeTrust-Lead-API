'use strict';


import { Model } from 'sequelize';  // const { Model } = require('sequelize');
import {v4 as uuidV4} from "uuid";

module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Notes.belongsTo(models.Leads, {
        as: "lead",
        foreignKey: "leads_id",
        onDelete: "CASCADE"
      });
    }
  }
  Notes.init({
    leads_id: DataTypes.STRING,
    staff_id: DataTypes.STRING,
    staff_name: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    tableName: 'Notes',
    freezeTableName: true,
    sequelize,
    modelName: 'Notes',
  });

  Notes.beforeCreate(async (note) => {
    note.id = uuidV4();
  });

  return Notes;
};
