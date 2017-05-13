const inner = require('./inner')

module.exports = (room) => `
  <blockquote style="cursor: pointer" ic-get-from='/${room.name}/task/edit' ic-replace-target="true">
    ${inner(room)}
  </blockquote>
`