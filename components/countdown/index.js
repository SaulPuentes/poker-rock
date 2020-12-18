import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Countdown = (props) => {
  const router = useRouter();
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
              router.push('/game');
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
    <div>
      { minutes === 0 && seconds === 0
          ? <h1>Start!</h1>
          : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        }
    </div>
  )
}

export default Countdown;