import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";


const Layout = ({title='Lawn Tennis',
                description='Tennis application',
                keywords=['tennis','lawn tennis','nit','jamshedpur'],
                author='Srinadh',
                children}) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8"/>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
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