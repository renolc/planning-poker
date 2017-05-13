const SSE = require('sse-node')
const app = require('./helpers/app')

const removeFromArray = require('./helpers/removeFromArray')
const sendEventTo = require('./helpers/sendEventTo')
const getOrCreateRoom = require('./helpers/getOrCreateRoom')
const sendView = require('./helpers/sendView')

const roomListView = require('./views/home/room-list')
const roomView = require('./views/room')
const userCountView = require('./views/room/user-count')
const taskView = require('./views/room/task')
const taskInnerView = require('./views/room/task/inner')
const taskEditView = require('./views/room/task/edit')
const submissionView = require('./views/room/submissions')

const state = require('./helpers/state')

///////////////
// homepage  //
///////////////

app.get('/', (_, res) => res.sendFile(__dirname+'/views/home/index.html'))

app.get('/sse', (req, res) => {
  const client = SSE(req, res)
  state.homepageClients.push(client)
  client.onClose(() => {
    removeFromArray(state.homepageClients, client)
  })
  sendEventTo(client, 'update:room:list')
})

app.get('/room/list', (_, res) => res.send(roomListView(state.rooms)))

app.post('/room', (req, res) => {
  res.set('X-IC-Redirect', `/${req.body.name}`)
  res.send('')
})

//////////
// room //
//////////

app.get('/:name', (req, res) => {
  if (req.params.name !== 'favicon.ico')
    sendView(roomView)(req, res)
  else
    res.send('')
})

app.get('/:name/sse', (req, res) => {
  const client = SSE(req, res)
  const room = getOrCreateRoom(req)
  room.clients.push(client)
  client.onClose(() => {
    if (room.clients.length === 1) {
      removeFromArray(state.rooms, room)
      sendEventTo(state.homepageClients, 'update:room:list')
    } else {
      removeFromArray(room.clients, client)
      sendEventTo(room.clients, 'update:user:count')
    }
  })
  sendEventTo(room.clients, 'update:user:count')
  sendEventTo(client, 'update:task')
  sendEventTo(client, 'update:submissions')
})

app.get('/:name/user/count', sendView(userCountView))

app.get('/:name/task', sendView(taskInnerView))

app.get('/:name/task/full', sendView(taskView))

app.post('/:name/task', (req, res) => {
  const room = getOrCreateRoom(req)
  room.task = req.body.task
  room.submissions = []
  res.send(taskView(room))
  sendEventTo(room.clients, 'update:task')
  sendEventTo(room.clients, 'update:submissions')
})

app.get('/:name/task/edit', sendView(taskEditView))

app.get('/:name/submissions', sendView(submissionView))

app.post('/:name/submissions', (req, res) => {
  const room = getOrCreateRoom(req)
  room.submissions.push({
    name: req.body.name,
    score: req.body.score
  })
  res.send('')
  sendEventTo(room.clients, 'update:submissions')
})

//////////
// 404 ///
//////////

app.get('*', (_, res) => res.redirect('/'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))