const SSE = require('sse-node')
const app = require('./helpers/app')

const removeFromArray = require('./helpers/removeFromArray')
const sendEventTo = require('./helpers/sendEventTo')
const getOrCreateRoom = require('./helpers/getOrCreateRoom')
const sendView = require('./helpers/sendView')

const views = require('./views')
const state = require('./helpers/state')

//////////////
// homepage //
//////////////

app.get('/lobby/sse', (req, res) => {
  const client = SSE(req, res, { ping: 10 })
  state.homepageClients.push(client)
  client.onClose(() => {
    removeFromArray(state.homepageClients, client)
  })
  sendEventTo(client, 'update:room:list')
})

app.get('/room/list', (_, res) => res.send(views.home.roomList(state.rooms)))

app.post('/room', (req, res) => {
  res.set('X-IC-Redirect', `/${req.body.name}`)
  res.send('')
})

//////////
// room //
//////////

app.get('/:name', (req, res) => {
  if (req.params.name !== 'favicon.ico')
    sendView(views.room.index)(req, res)
  else
    res.send('')
})

app.get('/:name/sse', (req, res) => {
  const client = SSE(req, res, { ping: 10 })
  const room = getOrCreateRoom(req)
  room.clients.push(client)
  client.onClose(() => {
    if (room.clients.length === 1) {
      removeFromArray(state.rooms, room)
    } else {
      removeFromArray(room.clients, client)
      sendEventTo(room.clients, 'update:user:count')
    }
    sendEventTo(state.homepageClients, 'update:room:list')
  })
  sendEventTo(room.clients, 'update:user:count')
  sendEventTo(client, 'update:task')
  sendEventTo(client, 'update:submissions')
  sendEventTo(state.homepageClients, 'update:room:list')
})

app.get('/:name/user/count', sendView(views.room.userCount))

app.get('/:name/task', sendView(views.room.task.inner))

app.get('/:name/task/full', sendView(views.room.task.index))

app.post('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req)
  room.task = req.body.task
  room.submissions = []
  res.send(views.room.task.index(room))
  sendEventTo(room.clients, 'update:task')
  sendEventTo(room.clients, 'submissions:reset')
})

app.get('/:name/task/edit', sendView(views.room.task.edit))

app.get('/:name/submissions', sendView(views.room.submissions.index))

app.get('/:name/submissions/reset', sendView(views.room.submissions.reset))

app.post('/:name/submissions', (req, res) => {
  const room = getOrCreateRoom(req)
  room.submissions.push({
    name: req.body.name,
    score: req.body.score
  })
  res.send('  ')
  sendEventTo(room.clients, 'update:submissions')
})

app.post('/:name/reveal', (req, res) => {
  const room = getOrCreateRoom(req)
  res.send('  ')
  sendEventTo(room.clients, 'reveal')
  sendEventTo(room.clients, 'clear:reveal:button')
})

app.get('/:name/reveal/enable', sendView(views.room.submissions.revealButton))

app.get('/:name/scores', sendView(views.room.reveal))

app.get('/clear/out', (_, res) => res.send('  '))

//////////
// 404 ///
//////////

app.get('*', (_, res) => res.redirect('/'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))