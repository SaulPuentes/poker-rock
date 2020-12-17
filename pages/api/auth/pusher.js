import { pusher } from '../../../util/pusher'

export default async (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  if(req.body.player){
    const player = req.body.player;
    const presenceData = {
      user_id: player
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
  } else {
    const presenceData = {
      user_id: "unique_user_id"
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
  }
}