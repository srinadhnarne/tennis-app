import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';


const Layout = ({title,children}) => {
  return (
    <>
      <Header/>
      <div className="main" style={{minHeight:'71vh'}}>
        <Toaster />
        {children}
      </div>
      <Footer/>
    </>

  )
}

export default Layout