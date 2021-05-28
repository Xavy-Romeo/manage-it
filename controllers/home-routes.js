const router = require('express').Router();
const {User, Checklist, Task} = require('../models');
const withAuth = require('../utils/auth')

// get all posts for homepage/dashboard
router.get('/', withAuth, (req, res) => {    
    
    Checklist.findAll({
        where: {
            user_id: req.session.user_id
            // user_id: 5
        },
        attributes: ['id', 'checklist_name', 'user_id'],
        include: [
            {
                model: Task,
                attributes: ['id', 'name', 'completion', 'due_date'],
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(dbChecklistData => {        
        // serialize data before passing to template
        const checklists = dbChecklistData.map(checklist => checklist.get({plain: true}));
        res.render('dashboard', {checklists, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

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
});

// new checklist page
router.get('/add-new', (req, res) => {

    res.render('add-new');
})

// edit task page
router.get('/edit-task?id=:id', (req, res) => {

    res.render('edit-task');
})

module.exports = router;