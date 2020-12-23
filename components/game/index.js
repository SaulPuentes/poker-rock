import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, InputNumber, Spin, Layout } from 'antd'
import { useSession } from 'next-auth/client'
import Player from '../player'
import styles from './Game.module.scss'
import { gameChannel } from '@util/channel'
import { GameContext } from '../../pages/_app'
import { gamesRead, movementsAdd } from '@services/requests'
import { exposeCard, hideCard } from './getPath'
import CurrentTurn from '@components/currentTurn'
import MoveButton from '@components/moveButton'
import Image from 'next/image'


function Game() {
  const [ game ] = useContext(GameContext)
  const [ session, loading ] = useSession()
  const [ movements, setMovements ] = useState([])
  const [ raiseValue, setRaiseValue ] = useState()
  const [ table, setTable ] = useState()
  const [ currentTurnIndex, setCurrentTurnIndex ] = useState(0)
  const [ players, setPlayers ] = useState()
  const [ gamePlayers, setGamePlayers ] = useState()
  let isMyTurn = gamePlayers && session && gamePlayers[currentTurnIndex] === session.user.name
  console.log('isMyTurn: ', isMyTurn);
  console.log('gamePlayers: ', gamePlayers);
  
  useEffect(() => {
    updateTable()
  }, [])

  useEffect(() => {
    receiveUpdatedMovements()
  })

  useEffect(async () => {
    await updateTable()
  }, [movements])
  

  const updateTable = async () => {
    const response = await gamesRead({
      id: game.id
    })
    console.log('response: ', response);
    setTable(response.table)
    setGamePlayers(response._players)
    setPlayers(response.table._players)
    setCurrentTurnIndex(response.table._currentTurnIndex)
  }

  // listen new movements of the game channel 
  const receiveUpdatedMovements = () => {
    players && gameChannel.bind('new-movement', data => {
      if(movements.length !== data.length) {
        setMovements(data)
      }
    })
  }
  
  // send request to the api game
  const handleMovement = async (movement, bet) => {
    await movementsAdd(
      game.id,
      {
        movement,
        player: session.user.name,
        bet
      }
    )
  }

  const renderScore = (player) =>
    <Player username={player._user} score={2000}/>
  
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /*
  if(session.user.name){
    
    const renderCards = (player) =>
    player._cards.map((i,j) =>
      <th key={j}><Image src ={exposeCard(i)} width={60} height={100}/></th>
    )
    console.log("Hola ----------------------------------------------- -")
  }
  else{
    const renderCards = (player) =>
    player._cards.map((i,j) =>
      <th key={j}><Image src ={hideCard()} width={60} height={100}/></th>
    )
    console.log("Adios ---------------------------------------- -------")
  }
  */
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
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
      <MoveButton action='raise' bet={raiseValue} callback={handleMovement} isMyTurn={isMyTurn}/>
    </Row>
    <Row gutter={[8, 8]}>
      <MoveButton action='call' callback={handleMovement} isMyTurn={isMyTurn}/>
      <MoveButton action='fold' callback={handleMovement} isMyTurn={isMyTurn}/>
    </Row>
    </>
  )

  //Shows the current players, including the table, and their respective cards
  return ( table && players
    ? <><Row gutter={[16, 16]} justify="center">
        <CurrentTurn players={gamePlayers} currentTurnIndex={currentTurnIndex}/>
      </Row>
      <Row gutter={[16, 16]}>
        <Col offset={8} span={8}>
          { renderCards(players[0]) }
          { renderScore(players[0]) }
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        { players.length > 3 && ( 
          <Col span={8}>
            { renderCards(players[3]) }
            { renderScore(players[3]) }
          </Col>
        )}
        <Col span={8} offset={players.length !== 4 && 8}>
          {renderTableCards(table._cards)}
          CENTER OF THE TABLE
        </Col>
        { players.length > 1 && (
          <Col span={8}>
            { renderCards(players[1]) }
            { renderScore(players[1]) }
          </Col>
        )}
      </Row>  

      <Row gutter={[16, 16]}>
        { players.length > 2 && (
            <Col offset={8} span={8}>
              { renderCards(players[2]) }
              { renderScore(players[2]) }
            </Col>
          )}
        <Col span={8}>{ actionButtons }</Col>
      </Row>
    </>
  : <div className={styles.wrapper}>
      <Spin size='large' tip='Loading...' className={styles.whiteSpinner}/>
    </div>
  ) //End of render return


}//End of Game

export default Game