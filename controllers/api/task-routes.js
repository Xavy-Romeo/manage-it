const router = require('express').Router();
const {Task} = require('../../models');

// get all tasks
router.get('/', (req, res) => {
    Task.findAll()
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one task
router.get('/:id', (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbTaskData => {
        // if no task found with requested id, send 404 user error
        if (!dbTaskData) {
            res.status(404).json({message: `No task found with id: ${req.params.id}!`});
            return;
        }
        // if matching task id exists, then send response
        res.json(dbTaskData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a task
router.post('/', (req, res) => {
    // check if session exists
    if (req.session) {
        // expects {checklist_id: 1, name: 'task name here', due_date: '5:00', user_id: 1}
        Task.create({
            checklist_id: req.body.checklist_id,
            name: req.body.name,
            due_date: req.body.due_date,
            user_id: req.body.user_id
        })
        .then(dbTaskData => res.json(dbTaskData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// update a task
router.put('/:id', (req, res) => {
    // expects any combo that includes {name: 'Updated name', completion: true, due_date: '3:30'} 
    Task.update(
        // options that can be updated
        {
            name: req.body.name,
            completion: req.body.completion,
            due_date: req.body.due_date
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(async() => {
        // find task with requested id
        const id = await Task.findOne({
            where: {
                id: req.params.id
            }
        });

        // if no task exists with requested id, send 404 user error
        if (!id) {
            res.status(404).json({message: `No task found with id ${req.params.id}!`});
            return;
        }
        // if task with requested id exists then send updated response
        res.json({
            message: `Task with id: ${req.params.id} has been updated!`,
            task: {
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

// delete a task
router.delete('/:id', (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTaskData => {
        if (!dbTaskData) {
            res.status(404).json({message: `No task found with id: ${req.params.id}!`});
            return;
        }
        res.json({message: `Task with id: ${req.params.id} has been deleted!`});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;