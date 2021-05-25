const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const cron = require('node-cron')
const sendMessage = require('../helpers/twilio')

class Task extends Model {
  scheduleReminder(min, hour, dayNum, month, dayOfWk, message, clientNumber) {
    let cronString= min + ' ' + hour + ' ' + dayNum + ' ' + month + ' ' + dayOfWk
    let twilioMessage = message;
    let twilioClientNum = clientNumber

    console.log(cronString)
    cron.schedule(cronString, function() {
      sendMessage(twilioMessage, twilioClientNum)
    }, {
      scheduled: true,
      timezone: "America/Los_Angeles"   
    });
  }
}

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
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
);

module.exports = Task;