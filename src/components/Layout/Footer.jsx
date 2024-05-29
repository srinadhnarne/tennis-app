import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="row text-center">
        <div className="col">
          ALL RIGHTS RESERVED &copy; - NITJSR LAWNTENNIS
        </div>
      </div>
      <div className="row text-center">
        <p className='text-center p-2 mt-2'>
          <Link to={'/'}>ABOUT</Link> || <Link to={'/'}>CONTACT US</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer