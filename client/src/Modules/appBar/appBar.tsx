import React from 'react'
import { NavLink } from 'react-router-dom'

import './appBar.scss'

export default function AppBar() {
  return (
    <div className="AppBar">
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
  )
}
