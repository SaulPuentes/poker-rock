import React from 'react'

function Player(props) {
  const { username, score } = props;
  return <>
    <p><b>Username:</b> {username}</p>
    <p><b>Score:</b> {score}</p>
  </>
}

export default Player;