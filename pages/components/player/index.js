import React from 'react'

export default function(props) {
  const { username, score } = props;
  console.log('props: ', props);
  return <>
    <p><b>Username:</b> {username}</p>
    <p><b>Score:</b> {score}</p>
  </>
}