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
        setTime(timeGap);
      }, 1000)
    } 
    return () => clearInterval(Counter)
  }, [expireAt, time]);
 
  const timeFormat = (t) => {
    const m = Math.floor(t / 60).toString()
    let s = (t % 60).toString()
    if(s.length === 1){
      s = `0${s}`
    }
    return `${m}:${s}`
  }

  return (
    <p className='text-sm text-[#FF4444]'>
      {timeFormat(time)}
    </p>
  )
}

export default AuthTimer