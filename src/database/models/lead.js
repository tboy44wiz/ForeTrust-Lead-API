'use strict';

import { Model } from 'sequelize';  // const { Model } = require('sequelize');
import { v4 as uuidV4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
  class Leads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leads.init({
    staff_id: DataTypes.UUID,
    leads_name: DataTypes.STRING,
    leads_phone: DataTypes.STRING,
    leads_email: DataTypes.STRING,
    leads_address: DataTypes.STRING,
    leads_state: DataTypes.STRING,
    purpose: DataTypes.STRING
  }, {
    tableName: 'Leads',
    freezeTableName: true,
    sequelize,
    modelName: 'Leads',
  });
  Leads.beforeCreate(async (lead) => {
    lead.id = uuidV4();
  });
  return Leads;
};
