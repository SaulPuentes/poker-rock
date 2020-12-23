import React, { useContext, useEffect, useState } from 'react'
//import {connection} from '@database/connection';
import { getScores } from '@util/request'
//import { MongoClient, ObjectID } from 'mongodb';
//import {handler} from '@models/LeaderBoard';

export default function Leaderboard() {
//db.users.find().sort({"score": 1})
  const [scores, setScores] = useState();

  useEffect( async() => {
    /* UPDATE WHEN VALUES CHANGES*/
    const response = await getScores()
    console.log('UPDATE WHEN VALUES CHANGES');
    console.log('response: ', response);
    setScores(response)
  }, [])


  //const renderCards = (player) =>
  //player._cards.map((i,j) =>
    //<th key={j}><Image src ={exposeCard(i)} width={60} height={100}/></th>
  //)

  
  const maxscores = scores[0].name;


  console.log("maxscores",maxscores);

  console.log('scores: ', scores);
  return (
  <>
    Leaderboard
    <br></br>
    {maxscores}

  </>
  
  )//End of return
}//End of Leaderboard