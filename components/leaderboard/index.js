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

  //Leaderboard update ---------------------------------------------------------------------
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
  
}//End of Leaderboard



/*
 return (

    <>
    </>
  )


*/


/**
 * 
 
  //let maxnames = [];
  //let maxscores = [];
  //let temp = "";
  
  //let i = 0;
  //for(i=0; i<scores.length; i++){
    //temp = scores[i].name + ": " + scores[i].score;
    //maxscores.push(temp);
    //maxscores.push(scores[i].score);
    //maxnames.push(scores[i].name);
  //}

  //const resp = maxscores.map((a,b)=>
  //<tr key={b} target={b}>{b+1}. {a}</tr>
  //)






 */