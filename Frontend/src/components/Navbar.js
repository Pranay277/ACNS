/**
 * components/Navbar.js
 * ---------------------------------------------------------------
 * Top navigation bar – present on every page.
 * Uses React Router NavLink for active-link highlighting.
 * ---------------------------------------------------------------
 */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg acns-navbar sticky-top">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand" to="/" onClick={closeNav}>
          ♿ ACNS
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span style={{ fontSize: '1.5rem' }}>☰</span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeNav}>
                🗺️ Map
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/report" onClick={closeNav}>
                🚧 Report Issue
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard" onClick={closeNav}>
                🏆 Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" onClick={closeNav}>
                📊 Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={closeNav}>
                🔑 Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
