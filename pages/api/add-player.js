import { pusher } from '../../util/pusher'

export default async (req, res) => {
  pusher.trigger('presence-poker-rock', 'new-player', req.body)
  
  // TODO: Update in users database logged status
  res.statusCode = 200
  res.json({ hello: 'world' })
}
