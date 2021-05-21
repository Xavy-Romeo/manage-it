const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      checklist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'checklist',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completion: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      due_date: {
          type: DataTypes.TIME,
          allowNull: true,
          defaultValue: null
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
);

module.exports = Task;