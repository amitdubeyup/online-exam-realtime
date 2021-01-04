const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./app/config');
const chatController = require('./app/controllers/chat');
const apiRoutes = require('./app/routes/routes');
const port = process.env.PORT || 6000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: true
}));
app.options('*', cors());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
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
app.set('superSecret', config.serverSecret);

app.use('/api', apiRoutes);

app.get('/', function(req, res) {
  res.status(200);
  res.json({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

app.listen(port);

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