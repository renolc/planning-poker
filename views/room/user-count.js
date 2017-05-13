module.exports = (clients) => (clients.length === 1)
  ? '1 user online'
  : `${clients.length} users online`