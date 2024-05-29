import React from 'react'
import { NavLink } from 'react-router-dom'

const UserSideMenu = () => {
  return (
        <>
            <div className="text-center border border-dark-subtle">
                <div className="list-group">
                    <h1>Accessibility</h1>
                    <NavLink to="/dashboard/user" className="list-group-item list-group-item-action">
                        MY PROFILE
                    </NavLink>
                    {/* <NavLink to="/tournaments" className="list-group-item list-group-item-action">
                        ALL TOURNAMENTS
                    </NavLink> */}
                    <NavLink to="/create-tournament" className="list-group-item list-group-item-action">
                        CREATE TOURNAMENT
                    </NavLink>
                    <NavLink to="/my-tournaments" className="list-group-item list-group-item-action">
                        MANAGE MY TOURNAMENTS
                    </NavLink>
                </div>
            </div>
        </>
  )
}

export default UserSideMenu