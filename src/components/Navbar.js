import React from 'react'
import { NavLink } from 'react-router-dom';
//import PropTypes from 'prop-types'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-custom height-custom">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler01" aria-controls="navbarToggler01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand" to="/">
          <span><b>ABC Clinic</b></span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarToggler01">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">Book Slot</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
