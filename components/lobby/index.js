import React, { useContext, useEffect, useState } from 'react'
import { Spin, Avatar, Row, Col } from 'antd'
import styles from './Lobby.module.scss'
import Countdown from '../countdown'
import { useRouter } from 'next/router'
import { GameContext } from '../../pages/_app';
import { gamesCreate } from '../../services/requests'
import { gameChannel } from '../../util/channel'
import { addPlayer } from '../../util/request'
import { useSession } from 'next-auth/client'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let gameId;

function Lobby() {
  const router = useRouter();
  const [ session, loading ] = useSession();
  const [, setGame ] = useContext(GameContext)
  const [ players, setPlayers ] = useState([]);
  
  let myPlayer;
  
  useEffect(() =>{
    addNewPlayerToGame()
  }, [loading])

  useEffect(() => {
    receiveUpdatedPlayers()
    receiveGameId()
  })

  const receiveUpdatedPlayers = () => {
    gameChannel.bind('add-player', data => {
      setPlayers(data.players)
    })
  }

  const receiveGameId = () => {
    gameChannel.bind('new-game', data => {
      console.log('data: ', data);
      if(!gameId) {
        setGame({ id: data, players, me: myPlayer })
        gameId = data;
        router.push('/game');
      }
    })
  }

  const addNewPlayerToGame = async () => {
    if(!loading && session) {
      myPlayer = session.user.name
      console.log('myPlayer: ', myPlayer);
      const response = await addPlayer( myPlayer );
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
    if(session.user.name === players[0] && !gameId) {
      await gamesCreate({
        players
      })
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
      <Countdown seconds={10} minutes={0} callback={createGame}/>
    }
    </Col>
  </Row>
}

export default Lobby;