const router = require('express').Router();
const {Checklist, User, Task} = require('../../models');

// use root/api/reminders/

router.post('/', (req,res) => {
    // Query Operation
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Task.findOne({
        where: {
            // hardcoded currently, but allows for future development in automation.
            id: 1
        }
    }) .then(dbTaskData => {
        if (!dbTaskData) {
            res.status(400).json({ message: 'No task with that ID!'});
            return;
        }

        // obtain variables to be put in the schedule reminder
        let minTest = req.body.minute;
        let hourTest = req.body.hour;
        let dayNumTest = req.body.dayNum;
        let monthTest = req.body.month;
        let messageTest = req.body.message;
        let clientNumber = req.body.clientNumber;
        let timezone = req.body.timezone;

        // function to send reminder to via model
        dbTaskData.scheduleReminder(minTest, hourTest, dayNumTest, monthTest, messageTest, clientNumber, timezone)
        console.log(dbTaskData);

        res.json({ message: 'You got to the end of the POST route!'});
    })
})


module.exports = router;