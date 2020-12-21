import React, { useContext, useEffect, useState } from 'react'
import { Button, Row, Col, InputNumber } from 'antd'
import { useSession } from 'next-auth/client'
import Player from '../player'
import { gameChannel } from '../../util/channel'
import { GameContext } from '../../pages/_app'
import { gamesRead, movementsAdd } from '@services/requests'
import { exposeCard, hideCard } from './getPath'

import Image from 'next/image'


function Game() {
  const [ game ] = useContext(GameContext)
  const [ session, loading ] = useSession();
  const [ movements, setMovements ] = useState([]);
  const [ raiseValue, setRaiseValue ] = useState();
  const [ table, setTable ] = useState();  

  useEffect(() => {
    initializeGame()
  }, []);

  const initializeGame = async () => {
    const response = await gamesRead({
      id: game.id
    })
    console.log('response: ', response);
    setTable(response.table);
  }

  useEffect(() => {
    receiveUpdatedMovements()
  })

  // listen new movements of the game channel 
  const receiveUpdatedMovements = () => {
    gameChannel.bind('new-movement', data => {
      if(movements.indexOf(data) === -1)
        setMovements([...movements, data])
    })
  }
  
  // send request to the api game
  const handleMovement = async (movement, bet) => {
    //TODO - Chage id for current id from database
    const data = await movementsAdd(
      game.id,
      {
        movement,
        player: game.me,
        bet
      }
    )
    console.log('data: ', data);
  }

  const renderScore = (player) =>
    <Player username={player._user} score={2000}/>
  
  const renderCards = (player) =>
    player._cards.map((i,j) =>
      <th key={j}><Image src ={exposeCard(i)} width={60} height={100}/></th>
    )
  
  const renderTableCards = (cards) =>
    cards.map((i,j) =>
      <th key={j}><Image src ={exposeCard(i)} width={60} height={100}/></th>
    )


  const actionButtons = (
    <>
    <Row gutter={[8, 8]}>
      <InputNumber placeholder='Raise' onChange={e => e > 0 ? setRaiseValue(e) : setRaiseValue()} value={raiseValue}/>
      <Button onClick={() => handleMovement('raise', raiseValue)}>RAISE</Button>
    </Row>
    <Row gutter={[8, 8]}>
      <Button onClick={() => handleMovement('call')}>CALL</Button>
      <Button onClick={() => handleMovement('fold')}>FOLD</Button>
      <Button onClick={() => handleMovement('quit')}>QUIT</Button>
    </Row>
    </>
  )

  //Shows the current players, including the table, and their respective cards
  return ( table ? <>
    <Row gutter={[16, 16]}>
      { table._players.length > 1 && (
        <Col offset={8} span={8}>
          { renderCards(table._players[0]) }
          { renderScore(table._players[0]) }
        </Col>
      )}
    </Row>

    <Row gutter={[16, 16]}>
      { table._players.length > 2 && ( 
        <Col span={8}>
          { renderCards(table._players[1]) }
          { renderScore(table._players[1]) }
        </Col>
      )}

      <Col span={8} offset={table._players.length === 2 && 8}>
        {renderTableCards(table._cards)}
        CENTER OF THE TABLE
      </Col>

      { table._players.length > 3 && (
        <Col span={8}>
          { renderCards(table._players[2]) }
          { renderScore(table._players[2]) }
        </Col>
      )}
    </Row>  

    <Row gutter={[16, 16]}>

      <Col offset={8} span={8}>
          { renderCards(table._players[1]) }
          { renderScore(table._players[1]) }
        </Col>
      <Col span={8}>{ actionButtons }</Col>
    </Row>
    
  </>:
  'Loading Game') //End of render return


}//End of Game

export default Game;