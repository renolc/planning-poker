module.exports = (room) => `
  <!doctype html>
  <html>
    <head>
      <title>Planning Poker - ${room.name}</title>
      <link rel="stylesheet" href="/css/milligram.min.css">
    </head>
    <body>
      <div class="container" ic-sse-src="/${room.name}/sse">
        <h1>${room.name}</h1>
        <h2 ic-src="/${room.name}/user/count" ic-trigger-on="sse:update:user:count"></h2>
        <blockquote ic-get-from='/${room.name}/task/edit' ic-replace-target="true">
          <p ic-src="/${room.name}/task" ic-trigger-on="sse:update:task"></p>
        </blockquote>
        <ul id="submissions" ic-src="/${room.name}/submissions" ic-trigger-on="sse:update:submissions"></ul>
        <form ic-post-to="/${room.name}/submissions">
          <input type="text" name="name" placeholder="your name" required>
          <input type="number" name="score" required>
          <input type="submit">
        </form>
      </div>
      <script src="/js/zepto.min.js"></script>
      <script src="/js/intercooler.js"></script>
    </body>
  </html>
`