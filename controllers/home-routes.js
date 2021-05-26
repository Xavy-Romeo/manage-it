const router = require('express').Router();
const {User, Checklist, Task} = require('../models');

// get login route if not logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// get sign up page
router.get('/sign-up', (req, res) => {

    res.render('sign-up');
})

// get all posts for homepage/dashboard
router.get('/', (req, res) => {
    console.log(req.session);
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('dashboard');
});



// new checklist page
router.get('/add-new', (req, res) => {

    res.render('add-new');
})

// edit task page
router.get('/edit-task', (req, res) => {

    res.render('edit-task');
})

module.exports = router;