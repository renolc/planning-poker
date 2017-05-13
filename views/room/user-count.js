module.exports = (room) => (room.clients.length === 1)
  ? '1 user online'
  : `${room.clients.length} users online`