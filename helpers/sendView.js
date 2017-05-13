const getOrCreateRoom = require('./getOrCreateRoom')

module.exports = (viewFn) => (req, res) => res.send(viewFn(getOrCreateRoom(req)))