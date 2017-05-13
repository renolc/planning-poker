module.exports = (rooms) => rooms
  .map((room) => `<li>${room.name}</li>`)
  .join('') || '  '