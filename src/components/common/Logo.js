import React from 'react'

function Logo({st}) {
  return (
    <div
        // className='logo-div'
        className={st || 'logo-div'}
        style={{ backgroundImage: `url(/images/PooDaeng.svg)` }}
      />
  )
}

export default Logo