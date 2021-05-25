const router = require('express').Router();
const {Checklist, User, Task} = require('../../models');

// get all checklists
router.get('/', (req, res) => {
    Checklist.findAll({
        attributes: ['id', 'checklist_name', 'created_at', 'updated_at'],
        
        // order by most recent checklist
        order: [['created_at', 'DESC']],
        include: [
            {
                // include task model
                model: Task,
                attributes: ['name', 'completion', 'due_date', 'created_at', 'updated_at'],
                // include name of User that created task
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                // include name from User model
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

// get one checklist
router.get('/:id', (req, res) => {
    Checklist.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'checklist_name', 'created_at', 'updated_at'],
        include: [
            {
                // include task model
                model: Task,
                attributes: ['name', 'completion', 'due_date', 'created_at', 'updated_at'],
                // include name of User that created task
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                // include name from User model
                model: User,
                attributes: ['name']
            }
        ] 
    })
    .then(dbChecklistData => {
        // if no data found with requested checklist id, send 404 user error message
        if (!dbChecklistData) {
            res.status(404).json({message: `No checklist found with id: ${req.params.id}!`})
            return;
        }
        // if data was found with requested checklist id, then show response
        res.json(dbChecklistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a checklist
router.post('/', (req, res) => {
    // expects {checklist_name: 'C_name', user_id: 1}
    Checklist.create({
        checklist_name: req.body.checklist_name,
        user_id: req.body.user_id
    })
    .then(dbChecklistData => res.json(dbChecklistData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a checklist
router.put('/:id', (req, res) => {
    // expects {checklist_name: 'Updated name'}
    Checklist.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(async() => {
        // find checklist with requested id
        const id = await Checklist.findOne({
            where: {
                id: req.params.id
            }
        });

        // if no checklist exists with requested id, send 404 user error
        if (!id) {
            res.status(404).json({message: `No checklist found with id ${req.params.id}!`});
            return;
        }
        // if checklist with requested id exist then send updated response
        res.json({
            message: `Checklist with id: ${req.params.id} has been updated!`,
            checklist: {
                id: req.params.id,
                update: req.body
            }            
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a checklist
router.delete('/:id', (req, res) => {
    Checklist.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbChecklistData => {
        if (!dbChecklistData) {
            res.status(404).json({message: `No checklist found with id: ${req.params.id}!`});
            return;
        }
        res.json({message: `Checklist with id: ${req.params.id} has been deleted!`});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;