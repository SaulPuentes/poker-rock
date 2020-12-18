import React, { useEffect, useState } from 'react'
import { Spin, Avatar } from 'antd'
import styles from './Lobby.module.scss'
import Countdown from '../countdown'
import { presenceChannel } from '../../util/channel'
import { addPlayer } from '../../util/request'
import { useSession } from 'next-auth/client'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Lobby() {

  const [ session, loading ] = useSession();
  const [ players, setPlayers ] = useState([]);

  useEffect(() =>{
    addNewPlayerToGame()
  }, [loading])

  useEffect(() => {
    receiveUpdatedPlayers()
  })

  const receiveUpdatedPlayers = () => {
    presenceChannel.bind('pusher:subscription_succeeded', function(members) {
      console.log('members: ', members);
    });
    presenceChannel.bind('pusher:subscription_error', function(members) {
      console.log('members: ', members);
    });
    // presenceChannel.bind('new-player', data => {
    //   if(!players.includes(data.player))
    //     setPlayers([...players, data.player])
    // })
  }

  const addNewPlayerToGame = async () => {
    if(!loading)
      await addPlayer( session.user.name );
  }

  const renderPlayers = () =>
    <ul className={styles.playersList}>
      {players.map(player => (
        <li><Avatar shape="square" size="large" icon={<UserOutlined />} /> {player}</li>
      ))}
    </ul>

  const createGame = () => {
    if(session.user.name === players[0]) {
      console.log('init Game');
    }
  }

  return <>
    <div className={styles.waitingTitle}>
      <Spin indicator={antIcon} />
      Waiting for other players
    </div>
    <Countdown seconds={30} minutes={0} callback={createGame}/>
    { renderPlayers() }
  </>
}

export default Lobby;