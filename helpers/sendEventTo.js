module.exports = (clients, event) => [].concat(clients).forEach((i) => i.send('', event))