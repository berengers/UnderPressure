import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import './appBar.scss'
import { UserContext } from 'Services/context/userContext'
import { useDeleteAPI } from 'Services/hook/api'
import Button from 'Lib/buttons/button/button'

export default function AppBar() {
  const { setUserContext } = useContext(UserContext)
  const [deleteToken] = useDeleteAPI()
  const logout = () => {
    deleteToken()
    localStorage.removeItem('token')
    setUserContext(false)
  }

  return (
    <div className="AppBar" data-e2e="app-bar-container">
      <div>
        <NavLink
          className="AppBar-link"
          exact
          activeClassName="AppBar-link--active"
          to="/"
        >
          Tests
        </NavLink>
        <span className="AppBar-separator">{'//'}</span>
        <NavLink
          activeClassName="AppBar-link--active"
          className="AppBar-link"
          exact
          to="/shared"
        >
          Shared
        </NavLink>
      </div>
      <div>
        <Button color="var(--color-info)" onClick={logout} small>
          Logout
        </Button>
      </div>
    </div>
  )
}
