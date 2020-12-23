import React, { useContext, useEffect, useState } from 'react'
import { getScores } from '@util/request'
import styles from './Leaderboard.module.scss'

export default function Leaderboard() {

  
  const [scores, setScores] = useState();

  useEffect( async() => {

    /* UPDATE WHEN VALUES CHANGES*/
    const response = await getScores()
    console.log('UPDATE WHEN VALUES CHANGES');
    console.log('response: ', response);
    setScores(response)
  }, [])

  console.log('scores: ', scores);

  //While it loads, the scores variable is undefined, so, in its
  //first iterarion returns nothing, and then when the application
  //is loaded, scores gets its new values. 
  if(scores == undefined){
    return (
      <>
      </>
    )
  }
  else{
    const result = scores.map((a,b) => 
    <tr key={b} target={b}><td>{a.name}</td><td>{a.score}</td></tr> )
    
    return (
    <>
      <div className={styles.titleLeader}>
        <h1>Leaderboard</h1>
        <table>
          {result}
        </table>
      </div>
    </>
    )//End of return

  }

  
}//End of Leaderboard

