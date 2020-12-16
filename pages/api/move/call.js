const Pusher = require('pusher')

const pusher = new Pusher({
  appId: "1122414",
  key: "18af7ca777e2024297da",
  secret: "cb6454868c524b34edec",
  cluster: "mt1",
  useTLS: true
})

export default (req, res) => {
  res.statusCode = 200
  pusher.trigger('poker-rock', 'call', req.body)
  console.log('req.body: ', req.body);
  res.json({ hello: 'world' })
}
