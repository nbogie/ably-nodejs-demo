const Ably = require('ably');
require('dotenv').config()

function getAPIKeyOrFail() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("missing API_KEY env var.")
  }
  return apiKey;
}

async function runDemo() {
  // For the full code sample see here: https://github.com/ably/quickstart-js

  const apiKey = getAPIKeyOrFail();
  const ably = new Ably.Realtime.Promise(apiKey);
  await ably.connection.once('connected');
  console.log('Connected to Ably!');

  // get the channel to subscribe to
  const channel = ably.channels.get('votes');

  /* 
    Subscribe to a channel. 
    The promise resolves when the channel is attached 
    (and resolves synchronously if the channel is already attached).
  */

  await channel.subscribe('one-vote', (message) => {
    console.log('Received a one-vote message in realtime: ', message.data)
  });
  console.log("subscribed to a channel: ", channel.name)
}
runDemo()