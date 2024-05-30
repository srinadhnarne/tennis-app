import React from 'react'
import logo from '../images/logo.png'

const Loading = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"72vh"}}>
        <img className='fade-load' src={logo} alt='Loading'style={{width:"50px", height:"auto"}}/>
    </div>
  )
}

export default Loading