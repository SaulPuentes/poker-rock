const cors = require('cors')
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
// const app = next({ dev: true });

const port = process.env.PORT || 8080

const pusher = new Pusher({
  appId: "1122414",
  key: "18af7ca777e2024297da",
  secret: "cb6454868c524b34edec",
  cluster: "mt1",
  useTLS: true
})

const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

const newTask = async (data) => {
  return await pusher.trigger('poker-rock', 'new-task', data)
}

server.post('/add-task', function (req, res) {
  console.log('req.body: ', req.body);
  pusher.trigger('poker-rock', 'new-task', req.body)
  
  // console.log('after: ', result);
  res.sendStatus(200)
})

server.listen(port, function () {
  console.log('Node app is running at localhost:' + port)
})

// app.prepare()
// .then(() => {
  
// })
// .catch(ex => {
//   console.log(ex.stack);
//   process.exit(1)
// })

