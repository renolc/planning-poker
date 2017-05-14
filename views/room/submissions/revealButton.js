module.exports = (room) => `
  <div ic-get-from="/clear/out" ic-trigger-on="sse:clear:reveal:button">
    <button class="button-outline" ${
      room.submissions.length
        ? `ic-post-to="/${room.name}/reveal"`
        : 'disabled'
    }>Reveal</button>
  </div>
`