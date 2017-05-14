module.exports = (room) => `
  <button class="button-outline" ${
    room.submissions.length
      ? `ic-post-to="/${room.name}/reveal"`
      : 'disabled'
  }>Reveal</button>
`