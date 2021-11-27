const feedbackRouter = require('./feedback.router');
const contentRouter = require('./content');
const userRouter = require('./user');
const roomsRouter = require('./chat_room.router');

module.exports = {
    feedbackRouter,
    contentRouter,
    userRouter,
    roomsRouter
}