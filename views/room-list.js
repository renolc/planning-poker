const item = (room) => `<li>${room.name}</li>`

module.exports = (rooms) => rooms
  .map(item)
  .join('') || '  '