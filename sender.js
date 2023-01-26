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

  // await channel.publish('one-vote', 'Hi!  I vote for candidate #' + Math.round((Math.random() * 100)));
  //fancier: 
  await channel.publish('one-vote', { candidate: randNumber() });

  console.log("published a message!")
  console.log("closing connection!")

  ably.close(); // runs synchronously
  console.log("closed connection.")

}

function randNumber() {
  return Math.round((Math.random() * 100))
}

runDemo()