const seedUser = require('./user-seeds');
const seedChecklist = require('./checklist-seeds');
const seedTask = require('./task-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedChecklist();
    console.log('\n----- CHECKLISTS SEEDED -----\n');
  
    await seedTask();
    console.log('\n----- TASKS SEEDED -----\n');
  
    process.exit(0);
};
  
seedAll();
  