module.exports = (rooms) => {
  console.log('rooms.length:', rooms.length)
  return rooms
  .map((room) => `<li>${room.name}</li>`)
  .join('') || '  '
}