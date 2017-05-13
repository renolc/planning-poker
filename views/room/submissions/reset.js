module.exports = (room) => `
  <div ic-get-from="/${room.name}/scores" ic-trigger-on="sse:reveal">
    <ul id="submissions" ic-src="/${room.name}/submissions" ic-trigger-on="sse:update:submissions"></ul>
  </div>
`