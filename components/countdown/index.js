import React, { useEffect, useState } from 'react'
import styles from './Countdown.module.scss'

const Countdown = (props) => {
  const [minutes, setMinutes] = useState(props.minutes);
  const [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    const myInterval = setInterval(() => {

      if (seconds > 0) {
        setSeconds(seconds-1);
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(myInterval)
              props.callback()
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
      } 
    }, 1000)

    return () => clearInterval(myInterval);
  })

  return (
    <div className={styles.countdownWrapper}>
      { minutes === 0 && seconds === 0
          ? <h1>Creating game...</h1>
          : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        }
    </div>
  )
}

export default Countdown;