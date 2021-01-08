'use strict';

const { Model } = require('sequelize');
import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Staff.init({
    staff_name: DataTypes.STRING,
    staff_email: DataTypes.STRING,
    staff_phone: DataTypes.STRING,
    staff_password: DataTypes.STRING,
    staff_location: DataTypes.ENUM('Enugu', 'Lagos'),
    staff_role: DataTypes.ENUM('Admin', 'Employee')
  }, {
    tableName: 'Staff',
    freezeTableName: true,
    sequelize,
    modelName: 'Staff',
  });

  Staff.beforeCreate(async (staff) => {
    return staff.id = uuidV4();
  });
  Staff.beforeCreate(async (staff) => {
    return staff.staff_password = bcrypt.hashSync(staff.staff_password, 10);
  });
  return Staff;
};
