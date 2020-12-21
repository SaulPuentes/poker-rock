import React, { useEffect, useState } from 'react'
import { Spin, Avatar, Row, Col } from 'antd'
import styles from './Lobby.module.scss'
import Countdown from '../countdown'
import { useRouter } from 'next/router'
import { gamesCreate } from '../../services/requests'
import { gameChannel } from '../../util/channel'
import { addPlayer } from '../../util/request'
import { useSession } from 'next-auth/client'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Lobby() {
  // const router = useRouter();
  const [ session, loading ] = useSession();
  const [ players, setPlayers ] = useState([]);

  useEffect(() =>{
    addNewPlayerToGame()
  }, [loading])

  useEffect(() => {
    receiveUpdatedPlayers()
  })

  const receiveUpdatedPlayers = () => {
    gameChannel.bind('add-player', data => {
      setPlayers(data)
    })
  }

  const addNewPlayerToGame = async () => {
    if(!loading && session) {
      const response = await addPlayer( session.user.name );
      setPlayers(response)
    }
  }

  const renderPlayers = () =>
    <ul className={styles.playersList}>
      {players.map(player => (
        <li key={player}><Avatar shape="square" size="large" icon={<UserOutlined />} /> {player}</li>
      ))}
    </ul>

  const createGame = async () => {
    if(session.user.name === players[0]) {
      console.log('init Game');
      await gamesCreate({
        players
      })
      // router.push('/game');
    }
  }

  return <Row>
    <Col span={12}>
        <Spin indicator={antIcon} />
        Waiting for other players
      { renderPlayers() }
    </Col>
    <Col span={12}>
    { players.length > 1 &&
      <Countdown seconds={30} minutes={0} callback={createGame}/>
    }
    </Col>
  </Row>
}

export default Lobby;