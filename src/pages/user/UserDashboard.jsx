import React from 'react'
import Layout from '../../components/Layout/Layout'
import Spinner from '../../components/Spinner'
import UserSideMenu from '../../components/Helpers/UserSideMenu'
import Profile from '../../components/Helpers/Profile'

const UserDashboard = () => {

  const user = JSON.parse(localStorage.getItem('tennis-auth'))?.user;

  return (
    <Layout>
        {(user&&user?.role!==1)?(<div className='container-fluid lt-bg-gradient p-3' style={{minHeight:"73vh"}}>
          <div className="row  mt-2">
            <div className="col-md-3">
                <UserSideMenu/>
            </div>
            <div className="col-md-9">
              <Profile/>
            </div>
          </div>
        </div>):(
          <Spinner path='/'/>
        )}
    </Layout>
  )
}

export default UserDashboard