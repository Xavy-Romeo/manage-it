const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Checklist extends Model {}

Checklist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      checklist_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'user',
              key: 'id'
          }
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'checklist'
    }
);

module.exports = Checklist;