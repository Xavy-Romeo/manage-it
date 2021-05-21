const { User } = require('../models');

const userData = [
    {
        name: 'Blaze Lim',
        email: 'cudntfigureaname@gmail.com',
        password: 'imPrettySureThisWillBeEncrypted',
        phone_number: 6266006294
    },
    {
        name: 'Gill Bates',
        email: 'fake@gmail.com',
        password: 'imPrettySureThisWillAlsoBeEncrypted',
        phone_number: 6266003613
    },
    {
        name: 'Jeves Stobs',
        email: 'pseudo@gmail.com',
        password: 'insertRandomHashTagHere',
        phone_number: 6266006294
    }
];


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;