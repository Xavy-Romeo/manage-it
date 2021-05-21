const router = require('express').Router();
const {User} = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        // excluding password from response
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => {
        // view response in json format
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        // if no id matches
        if (!dbUserData) {
            // send 404 user error
            res.status(404).json({message: `No user found with id: ${req.params.id}!`});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add a user
router.post('/', (req, res) => {
    // expects: {name: 'user1', email: 'user1@gmail.com', password: 'Password1234', phone_number: 9991234567}
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// User login route
router.post('/login', (req, res) => {
    // expects: {email: 'user1@gmail.com, password: 'Password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'No user found with that email address!'});
            return;
        }

        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        
        // if validPassword = false, password entered incorrect
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

        res.json({user: dbUserData, message: 'You are now logged in!'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a user
router.put('/:id', (req, res) => {
    // update user with entered id
    // expects: {username: 'User1', email: 'user1@gmail.com', password: 'Password1234'}
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(async() => {
        // find post with requested id
        const id = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        // if no matching requested id exists, send 404 user error
        if (!id) {
            res.status(404).json({message: `No user found with id: ${req.params.id}!`});
            return;
        }

        // if user with requested id exists, then send updated response
        res.json({message: `Updated user with id ${req.params.id}!`, user: req.body});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    // delete user with entered id
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: `No user found with id: ${req.params.id}!`});
            return;
        }
        res.json({message: `Deleted user with id ${req.params.id}!`});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;