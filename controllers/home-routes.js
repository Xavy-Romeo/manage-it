const router = require('express').Router();
const {User, Checklist, Task} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('dashboard');
});

// get login route if not logged in
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
});

// get sign up page
router.get('/sign-up', (req, res) => {

    res.render('sign-up');
})

module.exports = router;