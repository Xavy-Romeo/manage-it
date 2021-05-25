const router = require('express').Router();
const {User, Checklist, Task} = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('./layouts/main');
});

// get login route if not logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;