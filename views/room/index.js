const task = require('./task')
const reset = require('./submissions/reset')

module.exports = (room) => `
  <!doctype html>
  <html>
    <head>
      <title>Planning Poker - ${room.name}</title>
      <link rel="stylesheet" href="/css/milligram.min.css">
    </head>
    <body>
      <div class="container" ic-sse-src="/${room.name}/sse">
        <div class="clearfix">
          <h1 class="float-left">${room.name}</h1>
          <h3 class="float-right" style="line-height: 55px;" ic-src="/${room.name}/user/count" ic-trigger-on="sse:update:user:count"></h3>
        </div>
        ${task(room)}
        <div ic-get-from="/${room.name}/submissions/reset" ic-trigger-on="sse:submissions:reset">
          ${reset(room)}
        </div>
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