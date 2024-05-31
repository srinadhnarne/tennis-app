import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../../images/logo.png'
import { useAuth } from '../../hooks/authContext'

const Header = () => {
  const [auth,setAuth] = useAuth();

  const handleLogout = ()=>{
    localStorage.removeItem('tennis-auth');
    setAuth({
      user:null,
      token:""
    })
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <div className='d-flex flex-row'>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-brand d-flex flex-row ms-4">
              <Link to='/' className="navbar-brand"> <img src={logo} alt='tennis-logo' width={'40px'}/>
              </Link>
              <div className="d-flex flex-column align-items-center">
                <div className="col text-center align-content-center">
                  NIT JSR
                </div>
                <div className="col text-center align-content-center">
                  LAWN TENNIS
                </div>
              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to='/' className="nav-link" >HOME</NavLink>
              </li>
              {
                auth.user?(
                  <>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name}</Link>
                      <ul className="dropdown-menu">
                        <li><NavLink to={`/dashboard/${auth?.user?.role===1?'admin':'user'}` }className="dropdown-item" >DASHBOARD</NavLink></li>
                        <li><NavLink onClick={()=>handleLogout()} to='/login' className="dropdown-item">LOGOUT</NavLink></li>
                      </ul>
                    </li>
                  </>
                ):(
                  <>
                    <li className="nav-item">
                    <NavLink to='/register' className="nav-link">REGISTER</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">LOGIN</NavLink>
                  </li>
                  </>
                )
              }
              <li className="nav-item">
                <NavLink to='/tournaments' className="nav-link" >TOURNAMENTS</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to='/players' className="nav-link" >Players</NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header