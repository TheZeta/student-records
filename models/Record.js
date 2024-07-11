const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Record = sequelize.define('Record', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]+$/i,
      notEmpty: true
    }
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\s]+$/i,
      notEmpty: true
    }
  },
  stdNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^B\d{2}[A-Z]{2}\d{5}$/i,
      notEmpty: true
    }
  },
  grades: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Grades must be an array');
        }
        for (const grade of value) {
          if (!/^[A-Z]{2}\d{3}$/.test(grade.code)) {
            throw new Error('Each grade must have a valid course code (XX###)');
          }
          if (typeof grade.value !== 'number' || grade.value < 0 || grade.value > 100) {
            throw new Error('Each grade must be a number between 0 and 100');
          }
        }
      }
    }
  }
});

module.exports = Record;
