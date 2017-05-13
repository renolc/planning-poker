const SSE = require('sse-node')
const app = require('./helpers/app')

const removeFromArray = require('./helpers/removeFromArray')
const sendTo = require('./helpers/sendTo')

const roomListView = require('./views/room-list')
const roomView = require('./views/room')

const homepageClients = []
const rooms = []

const getOrCreateRoom = (name) => {
  let room = rooms.find((i) => i.name === name)
  if (!room) {
    room = {
      name,
      clients: [],
      scores: []
    }
    rooms.push(room)
    sendTo(homepageClients, roomListView(rooms))
  }
  return room
}

///////////////
// homepage  //
///////////////

app.get('/', (_, res) => res.sendFile(__dirname+'/views/index.html'))

app.get('/sse', (req, res) => {
  const client = SSE(req, res)
  homepageClients.push(client)
  client.onClose(() => {
    removeFromArray(homepageClients, client)
  })
  client.send(roomListView(rooms))
})

app.post('/room', (req, res) => {
  res.set('X-IC-Redirect', `/${req.body.name}`)
  res.send('')
})

//////////
// room //
//////////

app.get('/:name', (req, res) => res.send(roomView(getOrCreateRoom(req.params.name))))

app.get('/:name/sse', (req, res) => {
  const client = SSE(req, res)
  const room = getOrCreateRoom(req.params.name)
  room.clients.push(client)
  client.onClose(() => {
    if (room.clients.length === 1) {
      removeFromArray(rooms, room)
      sendTo(homepageClients, roomListView(rooms))
    } else {
      removeFromArray(room.clients, client)
      sendTo(room.clients, null, `update:user:count`)
    }
  })
  sendTo(room.clients, null, `update:user:count`)
  sendTo(client, null, 'update:task')
  sendTo(client, null, 'update:scores')
})

app.get('/:name/user/count', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(
    (room.clients.length) === 1
      ? '1 user online'
      : `${room.clients.length} users online`
  )
})

app.get('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(`<p ic-src="/${room.name}/task" ic-trigger-on="sse:update:task">${room.task || '<em>click to edit</em>'}</p>`)
})

app.get('/:name/task/full', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(`
    <blockquote ic-get-from='/${room.name}/task/edit' ic-replace-target="true">
      <p ic-src="/${room.name}/task" ic-trigger-on="sse:update:task">${room.task || '<em>click to edit</em>'}</p>
    </blockquote>
  `)
})

app.post('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  room.task = req.body.task
  room.scores = []
  sendTo(room.clients, null, `update:task`)
  sendTo(room.clients, null, `update:scores`)
  res.send(`
    <blockquote ic-get-from='/${room.name}/task/edit' ic-replace-target="true">
      <p ic-src="/${room.name}/task" ic-trigger-on="sse:update:task">${room.task || '<em>click to edit</em>'}</p>
    </blockquote>
  `)
})

app.get('/:name/task/edit', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(`
    <form id="task-edit-form" ic-post-to="/${room.name}/task" ic-replace-target="true">
      <textarea name="task" cols="30" rows="10">${room.task || ''}</textarea>
      <input type="submit"> <a class="button button-clear" ic-get-from="/${room.name}/task/full" ic-target="#task-edit-form" ic-replace-target="true">cancel</a>
    </form>
  `)
})

app.get('/:name/scores', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(room.scores.map((i) => `<li>${i.name} - ${i.score}</li>`).join('') || '  ')
})

app.post('/:name/scores', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  room.scores.push({
    name: req.body.name,
    score: req.body.score
  })
  res.send('')
  sendTo(room.clients, null, 'update:scores')
})

//////////
// 404 ///
//////////

app.get('*', (_, res) => res.redirect('/'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))