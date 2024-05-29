import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const AdminSideMenu = () => {
  return (
    <>
        <>
            <div className="text-center border border-dark-subtle">
                <div className="list-group">
                    <h1>Accessibility</h1>
                    <Link to="/dashboard/admin" className="list-group-item list-group-item-action">
                        MY PROFILE
                    </Link>
                    <NavLink to="/dashboard/admin/manage-all-tournaments" className="list-group-item list-group-item-action">
                        MANAGE ALL TOURNAMENTS
                    </NavLink>
                    <NavLink to="/create-tournament" className="list-group-item list-group-item-action">
                        CREATE TOURNAMENT
                    </NavLink>
                    <NavLink to="/my-tournaments" className="list-group-item list-group-item-action">
                        MANAGE MY TOURNAMENTS
                    </NavLink>
                    <NavLink to="/dashboard/admin/manage-users" className="list-group-item list-group-item-action">
                        MANAGE USERS
                    </NavLink>
                </div>
            </div>
        </>
    </>
  )
}

export default AdminSideMenu