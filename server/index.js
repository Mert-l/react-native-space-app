const express = require("express");
const app = express();
const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { Expo } = require("expo-server-sdk");

let expo = new Expo({
  accessToken: "n5ylOWvRhv5DbGwxUihYFcq6v0UIc3vzfwVB4v-e",
});

const fetch_first_pics = async () => {
  try {
    const res = await axios.get(
      `https://fdo.rocketlaunch.live/json/launches/next/5`
    );
    let dates;
    if (res.data) {
      dates = res.data.result
        .map((launch) => launch.t0)
        .filter((ele) => ele)
        .map((ele) => ele.slice(0, 10));
    }
    if (
      dates.findIndex((date) => {
        let singleDate = new Date(date);
        let today = new Date();
        return Math.floor((singleDate - today) / 1000 / 60 / 60 / 24) <= 1;
      }) !== -1
    ) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("0 10 * * *", async () => {
  const isLaunch = await fetch_first_pics();

  if (isLaunch) {
    addMessages();
    sendNotifications();
  }
});

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security

// Create the messages that you want to send to clients
let messages = [];
// a function to go through array of tokens and add messages to the array of messages for every token
let addMessages = () => {
  fs.readFile("./static/tokens.json", (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      console.log(data);
      for (let pushToken of data) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`
          );
          continue;
        }
        messages.push({
          to: pushToken,
          sound: "default",
          body: "There is a rocket launch in less than one day!!",
          data: { withSome: "data" },
        });
      }
    }
  });
};
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
};

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
let getReceipts = async () => {
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
        if (status === "ok") {
          continue;
        } else if (status === "error") {
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
};

app.post("/gettoken", (req, res) => {
  const { token } = req.body;
  fs.readFile("./static/tokens.json", (err, data) => {
    data = JSON.parse(data);
    if (!data.find((tok) => tok !== token)) {
      data.push(token);
    }
    fs.writeFile(
      "./static/tokens.json",
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) return { ok: false, error: err };
        return { ok: true, message: "Token added" };
      }
    );
  });
});

app.listen(3030, () => {
  console.log("listening on port 3030!");
});
