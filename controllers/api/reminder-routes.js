const router = require('express').Router();
const {Checklist, User, Task} = require('../../models');

// use root/api/reminders/

router.post('/:id', (req,res) => {
    // Query Operation
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Task.findOne({
        where: {
            id: req.params.id
        }
    }) .then(dbTaskData => {
        if (!dbTaskData) {
            res.status(400).json({ message: 'No task with that ID!'});
            return;
        }

        let minTest = req.body.minute;
        let hourTest = req.body.hour;
        let dayNumTest = req.body.dayNum;
        let monthTest = req.body.month;
        let dayOfWkTest = req.body.dayOfWk;
        let message = req.body.message;
        let clientNumber = req.body.clientNumber;

        dbTaskData.scheduleReminder(minTest, hourTest, dayNumTest, monthTest, dayOfWkTest, message, clientNumber)
        console.log(dbTaskData);

        res.json({ message: 'You got to the end of the POST route!'});
    })
})


module.exports = router;