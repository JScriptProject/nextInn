import React from 'react'

function Hero({title, subtitle, image}) {
  return (
   <div className="admin-header" style={{backgroundImage:`url(${image})`}}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
   </div>
  )
}

export default Hero