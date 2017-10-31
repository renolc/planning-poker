module.exports = ({ submissions, name }) => `
  <div ic-get-from="/clear/out" ic-trigger-on="sse:clear:reveal:button">
    <button class="button-outline" ${
      submissions.length
        ? `ic-post-to="/${name}/reveal"`
        : 'disabled'
    }>Reveal</button>
  </div>
`