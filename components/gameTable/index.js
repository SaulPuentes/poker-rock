import React from 'react'
import { Button } from 'antd'
import Player from '../player'
import { apiMove } from '../../util/request'


/**
 * TODO: Change users for all the logged in the app
 */
const users =  [
  {
    username: 'Saul',
    score: 2000
  },
  {
    username: 'Toño',
    score: 2000
  },
  {
    username: 'Seb',
    score: 2000
  }
]

/**
 * TODO: Change users for the current user
 */
const myPlayer = {
  username: 'Tony Stark'
}

function GameTable() {
  const handleCall = async () => {
    await apiMove('call', { user: myPlayer.username })
  }
  const handleRaise = async () => {
    await apiMove('raise', { user: myPlayer.username, quantity: 100 })
  }
  const handleFold = async () => {
    await apiMove('fold', { user: myPlayer.username })
  }
  const handleQuit = async () => {
    await apiMove('quit', { user: myPlayer.username })
  }

  const renderPlayers = () =>
    users.map(user => <Player username={user.username} score={user.score}/>)
  
  return (<>
    {renderPlayers()}
    <div>
      <Button onClick={handleRaise}>RAISE</Button>
      <Button onClick={handleCall}>CALL</Button>
      <Button onClick={handleFold}>FOLD</Button>
      <Button onClick={handleQuit}>QUIT</Button>
    </div>
  </>)
}

export default GameTable;