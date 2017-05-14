module.exports = {
  home: {
    roomList: require('./home/roomList')
  },
  room: {
    index: require('./room'),
    userCount: require('./room/userCount'),
    submissions: {
      index: require('./room/submissions'),
      reset: require('./room/submissions/reset'),
      revealButton: require('./room/submissions/revealButton')
    },
    reveal: require('./room/reveal'),
    task: {
      index: require('./room/task'),
      inner: require('./room/task/inner'),
      edit: require('./room/task/edit')
    }
  }
}