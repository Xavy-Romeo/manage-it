async function sendReminderRequest(event) {
    event.preventDefault();
    
    const sendDate = document.querySelector('input[name="date-input"]').value;
    console.log(sendDate);

    const sendTime = document.querySelector('input[name="time-input"]').value;
    console.log(sendTime);

    const timezone = document.querySelector('select[name="timezone"]').value;
    console.log(timezone);

    const clientNumber = document.querySelector('input[name="phone"]').value;
    console.log(clientNumber);
    if (sendDate && sendTime && timezone && clientNumber) {
        alert('Reminder Scheduled!')
    } else {
        alert('Error in input')
    }
    
}

console.log('modalReminder loaded')

document.querySelector('.modal-form').addEventListener('submit', sendReminderRequest)