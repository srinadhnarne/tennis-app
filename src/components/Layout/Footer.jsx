import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="row text-center">
        <div className="col">
          ALL RIGHTS RESERVED &copy; - NITJSR LAWN TENNIS
        </div>
      </div>
      <div className="row text-center">
        <p className='text-center p-2 mt-2'>
          <Link to={'/about'}>ABOUT</Link> || <Link to={'/contact'}>CONTACT US</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer