const router = require('express').Router();
const {User, Checklist, Task} = require('../models');
const withAuth = require('../utils/auth');

// get dashboard page
router.get('/', withAuth, (req, res) => {
    Checklist.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'checklist_name', 'user_id'],
        include: [
            {
                model: Task,
                attributes: ['id', 'name', 'completion', 'due_date', 'created_at', 'updated_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    .then(dbChecklistData => res.json(dbChecklistData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;