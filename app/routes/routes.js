const express = require('express');
const routes = express.Router();

const jwtRoutes = require('./jwt.routes');
const mailRoutes = require('./mail.routes');
const smsRoutes = require('./sms.routes');
const locationRoutes = require('./location.routes');
const userRoutes = require('./user.routes');
const questionRoutes = require('./question.routes');
const resultRoutes = require('./result.routes');
const qnaRoutes = require('./qna.routes');
const tutorialRoutes = require('./tutorial.routes');
const liveRoutes = require('./live.routes');
const chatRoutes = require('./chat.routes');
const contactRoutes = require('./contact.routes');
const fileRoutes = require('./file.routes');
const checkUpdateRoutes = require('./check-update.routes');

routes.use('/jwt', jwtRoutes);
routes.use('/mail', mailRoutes);
routes.use('/sms', smsRoutes);
routes.use('/location', locationRoutes);
routes.use('/user', userRoutes);
routes.use('/question', questionRoutes);
routes.use('/result', resultRoutes);
routes.use('/qna', qnaRoutes);
routes.use('/tutorial', tutorialRoutes);
routes.use('/live', liveRoutes);
routes.use('/chat', chatRoutes);
routes.use('/contact', contactRoutes);
routes.use('/contact', contactRoutes);
routes.use('/file', fileRoutes);
routes.use('/update', checkUpdateRoutes);

routes.get('/', function(req, res) {
  res.status(200);
  res.json({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

module.exports = routes;