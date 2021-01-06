const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./app/config');
const chatController = require('./app/controllers/chat');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 100,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(config.database, options);
mongoose.set('useFindAndModify', false);

// Web Socket Connection Start
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 9000
});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const chatData = JSON.parse(data);
    chatController.liveChat(chatData);
    wss.clients.forEach(function each(client) {
      if (chatData['receiver'] == client.protocol) {
        if (client.readyState == WebSocket.OPEN) {
          client.send(JSON.stringify(chatData));
        }
      }
    });
  });
});
// Web Socket Connection End
console.log('Socket server is running on ws://localhost:9000');