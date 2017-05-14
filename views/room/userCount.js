module.exports = (room) => {
  const { length:count } = room.clients

  switch (count) {
    case 1: return 'you are all alone'
    case 2: return 'there is 1 other here'
    default: return `there are ${count-1} others here`
  }
}