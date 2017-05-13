const state = require('./state')
const sendEventTo = require('./sendEventTo')

module.exports = (req) => {
  const { name } = req.params
  let room = state.rooms.find((i) => i.name === name)
  if (!room) {
    room = {
      name,
      clients: [],
      submissions: []
    }
    state.rooms.push(room)
    sendEventTo(state.homepageClients, 'update:room:list')
  }
  return room
}