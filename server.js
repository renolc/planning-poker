const SSE = require('sse-node')
const app = require('./helpers/app')

const removeFromArray = require('./helpers/removeFromArray')
const sendTo = require('./helpers/sendTo')

const roomListView = require('./views/home/room-list')
const roomView = require('./views/room')
const userCountView = require('./views/room/user-count')
const taskView = require('./views/room/task')
const taskInnerView = require('./views/room/task/inner')
const taskEditView = require('./views/room/task/edit')
const submissionView = require('./views/room/submissions')

const homepageClients = []
const rooms = []

const getOrCreateRoom = (name) => {
  let room = rooms.find((i) => i.name === name)
  if (!room) {
    room = {
      name,
      clients: [],
      submissions: []
    }
    rooms.push(room)
    sendTo(homepageClients, null, 'update:room:list')
  }
  return room
}

///////////////
// homepage  //
///////////////

app.get('/', (_, res) => res.sendFile(__dirname+'/views/home/index.html'))

app.get('/sse', (req, res) => {
  const client = SSE(req, res)
  homepageClients.push(client)
  client.onClose(() => {
    removeFromArray(homepageClients, client)
  })
  client.send(null, 'update:room:list')
})

app.get('/room/list', (_, res) => res.send(roomListView(rooms)))

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
      sendTo(homepageClients, null, 'update:room:list')
    } else {
      removeFromArray(room.clients, client)
      sendTo(room.clients, null, `update:user:count`)
    }
  })
  sendTo(room.clients, null, `update:user:count`)
  sendTo(client, null, 'update:task')
  sendTo(client, null, 'update:submissions')
})

app.get('/:name/user/count', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(userCountView(room.clients))
})

app.get('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(taskInnerView(room))
})

app.get('/:name/task/full', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(taskView(room))
})

app.post('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  room.task = req.body.task
  room.submissions = []
  res.send(taskView(room))
  sendTo(room.clients, null, `update:task`)
  sendTo(room.clients, null, `update:submissions`)
})

app.get('/:name/task/edit', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(taskEditView(room))
})

app.get('/:name/submissions', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  res.send(submissionView(room.submissions))
})

app.post('/:name/submissions', (req, res) => {
  const room = getOrCreateRoom(req.params.name)
  room.submissions.push({
    name: req.body.name,
    score: req.body.score
  })
  res.send('')
  sendTo(room.clients, null, 'update:submissions')
})

//////////
// 404 ///
//////////

app.get('*', (_, res) => res.redirect('/'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))