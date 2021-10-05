var twilio = require('twilio');

require('dotenv').config();

var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH;   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

function sendMessage(message, clientNumber){
    client.messages.create({
        body: message,
        to: clientNumber,  // Text this number
        from: '+13156751702' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}

module.exports = sendMessage;