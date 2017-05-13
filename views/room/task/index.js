const inner = require('./inner')

module.exports = (room) => `
  <blockquote ic-get-from='/${room.name}/task/edit' ic-replace-target="true">
    ${inner(room)}
  </blockquote>
`