const express = require('express')
const { urlencoded } = require('body-parser')
const app = express()

app.use(urlencoded({
  extended: true
}))
app.use(express.static('./public'))

module.exports = app