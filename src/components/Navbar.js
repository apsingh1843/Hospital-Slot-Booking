import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/AuthActions';

const Navbar = ({isLoading, isAuthenticated, user, logoutUser}) => {

  const AuthLinks = () =>{
    if(!isAuthenticated){
      return(
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
        </>
      );
    }
    else{
      return(
        <>
          <li className="nav-item">
            <p className="nav-text text-white me-md-3 pt-md-2">Welcome <b>{user.username}</b> !</p>
          </li>
          <li className="nav-item">
            {!isLoading ?
              <button type="button" className="btn btn-light" onClick={() => logoutUser()}>Logout</button>
            : <div className="spinner-grow ms-2 text-light" role="status"></div>}
          </li>
        </>
      );
    }
  }

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
               <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-md-0">
            <AuthLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  isAuthenticated : PropTypes.bool.isRequired,
  user : PropTypes.object,
  logoutUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
