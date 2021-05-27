let mostRecentTask = '';

$('.date-modal-btn').click(function(e) {
    console.log('get task data summoned')

    // get the task data name
    mostRecentTask = $(this).parent().next().find('p').html();  //.closest('.task-item').html();
})

async function sendReminderRequest(event) {
    event.preventDefault();
    
    const sendDate = document.querySelector('input[name="date-input"]').value;
    let splitDate = sendDate.split('-');


    const sendTime = document.querySelector('input[name="time-input"]').value;
    let splitTime = sendTime.split(':')

    const timezone = document.querySelector('select[name="timezone"]').value;

    const clientNumber = document.querySelector('input[name="phone"]').value;
    let number = "+1" + clientNumber.toString();
    console.log(number)
    
    let message = "reminder for " + mostRecentTask


    if (sendDate && sendTime && timezone && clientNumber) {
        // building out the POST object
        let postObject = {
            minute: splitTime[1],
            hour: splitTime[0],
            dayNum: splitDate[2],
            month: splitDate[1],
            message: message,
            timezone: timezone,
            clientNumber: number
        }
        console.log(JSON.stringify(postObject))

        const response = await fetch('/api/reminders', {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(postObject)
        })
        
        if (response.ok) {
            alert('Reminder Scheduled!')
        } else {
            alert(response.statusText);
        }
        
    } else {
        alert('Error in input')
    }
    
}


//document.querySelector('.date-modal-btn').addEventListener('click', getTaskData)
document.querySelector('.modal-form').addEventListener('submit', sendReminderRequest)