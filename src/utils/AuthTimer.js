import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function AuthTimer() {
  const [time, setTime] = useState(179);
  const {verification} = useSelector((store)=> store.timer)
  const {expireAt} = verification;
  useEffect(()=> {
    let Counter;
    if(time > 0){
      Counter = setInterval(()=>{
        const timeGap = Math.floor((new Date(expireAt).getTime() - new Date().getTime()) / 1000);
        console.log("timeGap type check >>>" , timeGap)
        setTime(timeGap);
      }, 1000)
    } else {
      console.log('timeout')
      clearInterval(Counter);
      setTime('시간초과')
    }
    return () => clearInterval(Counter)
  }, [time, expireAt]);
  // }, [expireAt, time, useSelector]);
 
  const timeFormat = (t) => {
    const m = Math.floor(t / 60).toString()
    let s = (t % 60).toString()
    if(s.length === 1){
      s = `0${s}`
    }
    return `${m}:${s}`
  }
  
  return (
    <p className={`w-max ${time==='시간초과'? 'text-xs' : 'text-sm'} text-[#FF4444]`}>
      {time==='시간초과'? '시간초과' : timeFormat(time)}
    </p>
  )
}

export default AuthTimer