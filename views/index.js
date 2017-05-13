module.exports = {
  home: {
    roomList: require('./home/roomList')
  },
  room: {
    index: require('./room'),
    userCount: require('./room/userCount'),
    submissions: require('./room/submissions'),
    task: {
      index: require('./room/task'),
      inner: require('./room/task/inner'),
      edit: require('./room/task/edit')
    }
  }
}