const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())





const {Expo} = require ('expo-server-sdk');

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: 'n5ylOWvRhv5DbGwxUihYFcq6v0UIc3vzfwVB4v-e' });
//let expo =  new Expo();

let array_of_tokens = [] // array of tokens to use for sending notifications

// Create the messages that you want to send to clients
let messages = [];

// a function to go through array of tokens and add messages to the array of messages for every token
let addMessages=()=>{
console.log('array_of_tokens: ', array_of_tokens)
	for (let pushToken of array_of_tokens) {
  // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
  	console.error(`Push token ${pushToken} is not a valid Expo push token`);
  	continue;
  }

  // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  messages.push({
  	to: pushToken,
  	sound: 'default',
  	body: 'This is a test notification',
  	data: { withSome: 'data' },
  })
}
}

// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).

let tickets = [];
let sendNotifications = async () => {
let chunks = expo.chunkPushNotifications(messages);	
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
  	try {
  		let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
  		console.log(ticketChunk);
  		tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
  } catch (error) {
  	console.error(error);
  }
}
}


// ...

// Later, after the Expo push notification service has delivered the
// notifications to Apple or Google (usually quickly, but allow the the service
// up to 30 minutes when under load), a "receipt" for each notification is
// created. The receipts will be available for at least a day; stale receipts
// are deleted.
//
// The ID of each receipt is sent back in the response "ticket" for each
// notification. In summary, sending a notification produces a ticket, which
// contains a receipt ID you later use to get the receipt.
//
// The receipts may contain error codes to which you must respond. In
// particular, Apple or Google may block apps that continue to send
// notifications to devices that have blocked notifications or have uninstalled
// your app. Expo does not control this policy and sends back the feedback from
// Apple and Google so you can handle it appropriately.
let receiptIds = [];
let getReceipts = async ()=>{
for (let ticket of tickets) {
  // NOTE: Not all tickets have IDs; for example, tickets for notifications
  // that could not be enqueued will have error information and no receipt ID.
  if (ticket.id) {
  	receiptIds.push(ticket.id);
  }
}

let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  // Like sending notifications, there are different strategies you could use
  // to retrieve batches of receipts from the Expo service.
  for (let chunk of receiptIdChunks) {
  	try {
  		let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
  		console.log(receipts);

      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (let receiptId in receipts) {
      	let { status, message, details } = receipts[receiptId];
      	if (status === 'ok') {
      		continue;
      	} else if (status === 'error') {
      		console.error(
      			`There was an error sending a notification: ${message}`
      			);
      		if (details && details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            // You must handle the errors appropriately.
            console.error(`The error code is ${details.error}`);
        }
    }
}
} catch (error) {
	console.error(error);
}
}
}

app.post('/gettoken',(req,res)=>{
	// token will not come from the simulator and to get it from the device the server can not be localhost
	let {token,userID}=req.body
	console.log('Token from the client: ', token, 'Username from the body: ', userID)
	// here you can add token to the DB into the tokens collection or if you want to send personalized notifications you save a token for the specific username received from the client
	// we will add it to the array_of_tokens array
	array_of_tokens.push(token)
	// and run addMessages to add messages for each token
	addMessages()
	// then run sendNotifications to send them all
	sendNotifications()

	res.send('token recieved')
})

app.listen(3030,  ()=> {
	console.log('listening on port 3030!')
})
