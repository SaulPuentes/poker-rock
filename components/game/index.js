import React, { useEffect, useState } from 'react'
import { Button, Row, Col, InputNumber } from 'antd'
import { useSession } from 'next-auth/client'
import Player from '../player'
import { addMove } from '../../util/request'
import { gameChannel } from '../../util/channel'
import Table from '../../models/Table'
import Image from 'next/image'


/**
 * TODO: Change users for all the logged in the app
 */
const users =  [
  {
    username: 'Antonio',
    score: 2000
  },
   {
     username: 'Saul',
     score: 2000
   },
   {
     username: 'Sebas',
    score: 2000
   },
  // The last player in this array should be my user for UI purposes
  {
    username: 'MyPlayer',
    score: 2000
  }
]

function Game() {

  const [ session, loading ] = useSession();
  const [ movements, setMovements ] = useState([]);
  const [ raiseValue, setRaiseValue ] = useState();

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
    const data = await addMove({
      _id: '5fda30cf00095e6861701a58',
      record: {
        movement,
        player: session.user.name,
        bet
      }
    })
    console.log('data: ', data);
  }

  const renderPlayer = (user) =>
    <Player username={user.username} score={user.score}/>
  
  // Dummy Test +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  
  const us = [session.user.name, "p2", "p3", "p4"]
  const table = new Table(us)

  const playerCards = (
    <>   
      {       
        table._players.map( (element,index) => element._cards.map((i,j) => 
          <th key={j}><Image src ={i.path} width={60} height={120}/></th>
        ))
      }
      
    </>
  )

  const player1_Cards = (
    <>
      {
        table._players[0]._cards.map((i,j) =>
        <li key={j}><Image src ={i.path} width={60} height={120}/></li>
        )
      }
    </>
  )

    
  const tableCards = (
    <>
      {
        table._cards.map((i,j) =>
          <th key={j}><Image src ={i.path} width={60} height={120}/></th>
        )
      }
    </>

  ) 

  // Dummy Test +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

  return (<>
    
    <Row gutter={[16, 16]}>
      {
        table._players[0]._cards.map((i,j) =>
        <li key={j}><Image src ={i.path} width={60} height={120}/></li>
        )
      }
      { users.length > 1 && (
        <Col offset={8} span={8}>{renderPlayer(users[0])}</Col>
      )}
    </Row>

    <Row gutter={[16, 16]}>
      { users.length > 2 && ( 
        <Col span={8}>{renderPlayer(users[1])}</Col>
      )}

      <Col span={8} offset={users.length === 2 && 8}>
        {tableCards}
        CENTER OF THE TABLE
      </Col>
      { users.length > 3 && (
        <Col span={8}>{renderPlayer(users[2])}</Col>
      )}
    </Row>

    <Row gutter={[16, 16]}>
      <Col offset={8} span={8}>{renderPlayer(users[users.length-1])}</Col>
      <Col span={8}>{ actionButtons }</Col>
    </Row>
    
  </>)
}

export default Game;