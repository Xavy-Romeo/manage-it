var twilio = require('twilio');

var accountSid = 'AC0fd1b91a0ea34cfdabd51036599c63bd'; // Your Account SID from www.twilio.com/console
var authToken = '558c186b6e55ac36654b21b202cf56ff';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

function sendMessage(message, clientNumber){
    client.messages.create({
        body: message,
        to: clientNumber,  // Text this number
        from: '+18548886012' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}

module.exports = sendMessage;