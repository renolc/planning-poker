const getOrCreateRoom = require('./getOrCreateRoom')

module.exports = (viewFn) => (req, { send }) => send(viewFn(getOrCreateRoom(req)))