import { pusher } from '../../../util/pusher'

let startCountdown;
const players = [];

export default async (req, res) => {
  console.log('req.body: ', req.body)
  
  if(!players.includes(req.body))
    players.push(req.body)

  if(players.length === 2)
    startCountdown = new Date()

  pusher.trigger('poker-rock', 'add-player', { players, startCountdown })
  
  res.statusCode = 200
  res.json(players)
}
