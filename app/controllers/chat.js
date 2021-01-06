const Chat = require('../modals/chat');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  liveChat: liveChat
};

function liveChat(chatData) {
  const chat = new Chat(chatData);
  chat.save().then((res) => {
    console.log('Saved: ', res);
  }).catch((err) => {
    console.log('Error: ', err);
  });
}