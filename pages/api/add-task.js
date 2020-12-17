import { pusher } from '../../util/pusher'

export default (req, res) => {
  pusher.trigger('poker-rock', 'new-movement', req.body)
  
  res.statusCode = 200
  res.json({ hello: 'world' })
}
