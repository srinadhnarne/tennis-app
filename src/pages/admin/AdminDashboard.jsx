import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminSideMenu from '../../components/Helpers/AdminSideMenu'
import Profile from '../../components/Helpers/Profile'

const AdminDashboard = () => {
  
  return (
    <Layout title='Admin Dashboard'>
        <div className='container-fluid lt-bg-gradient pt-4' style={{minHeight:"72vh"}}>
            <div className="row">
                <div className="col-md-3">
                    <AdminSideMenu/>
                </div>
                <div className="col-md-8">
                    <Profile/>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard