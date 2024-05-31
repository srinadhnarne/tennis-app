import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title='About - Lawn Tennis'>
        <div className='container-fluid' style={{minHeight:"72vh"}}>
          <div className='row d-flex flex-column justify-content-center align-items-center'>
            <div>ABOUT US.</div>
            <div>UPDATES IN PROGRESS</div>
          </div>
        </div>  
    </Layout>
  )
}

export default About