import { pusher } from '../../../util/pusher'

const players = [];

export default async (req, res) => {
  console.log('req.body: ', req.body)
  if(!players.includes(req.body))
    players.push(req.body)
  console.log('players: ', players)
  pusher.trigger('poker-rock', 'add-player', players)
  
  // TODO: Update in users database logged status
  res.statusCode = 200
  res.json(players)
}
