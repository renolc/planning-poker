const revealButton = require('./revealButton')

module.exports = (room) => `
  <div ic-get-from="/${room.name}/reveal/enable" ic-trigger-on="sse:update:submissions">
    ${revealButton(room)}
  </div>
  <div ic-get-from="/${room.name}/scores" ic-trigger-on="sse:reveal">
    <ul id="submissions" ic-src="/${room.name}/submissions" ic-trigger-on="sse:update:submissions"></ul>
  </div>
`