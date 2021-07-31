import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../redux/actions/AuthActions';
import { returnErrorMsg } from '../redux/actions/MsgActions';

const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const username_regex = /^\w+$/;

const SignUp = ({isLoading, isAuthenticated, registerUser, returnErrorMsg}) => {
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[password1, setPassword1] = useState('');

  const form = document.querySelector('form');

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("clicked");
    if(!email_regex.test(email)){
      returnErrorMsg("Enter a valid email address.", "Invalid Details");
      form.email.focus();
    }
    else if(username.length < 6){
      returnErrorMsg("Username should have more than six characters.", "Invalid Details");
      form.username.focus();
    }
    else if(!username_regex.test(username)){
      returnErrorMsg("Username can only contain letters, numbers and underscores.", "Invalid Details");
      form.username.focus();
    }
    else if(password.length <= 6){
      returnErrorMsg("Password should have atleast six characters.", "Invalid Details");
      form.password.focus();
    }
    else if(password !== password1){
      returnErrorMsg("Enter same password in both the fields.", "Invalid Details");
    }
    else{
      let user = {
        username: username,
        email: email,
        password: password
      }
      registerUser(user);
      //console.log(user);
    }
  }

  if(isAuthenticated){
    return (
      <Redirect to="/dashboard" />
    )
  }
  else{
    return (
      <div className="container-fluid bg-info" style={{minHeight:"90vh"}}>
        <div className="row">
          <div className="col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4
            p-4 mt-3 mb-3 mt-sm-5 bg-warning shadow-custom">
            <h4 className="text-center mb-3">Create your Account</h4>
            <p className="text-center text-success text-bold">
              Note : You don't need to register if you are a hospital staff.
              Login with the admin ID provided by hospital.
            </p>
            <Message />
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">username</label>
                <input
                  type="text"
                  placeholder="Create your Username"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password1" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  id="password1"
                  name="password1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input required" id="check" required/>
                <label className="form-check-label" htmlFor="check">Accept our Terms and Condition.</label>
              </div>

              {!isLoading ?
                <button type="submit" className="btn btn-primary">Register</button>
              : <div className="spinner-border ms-4 text-primary" role="status"></div>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  isAuthenticated : PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
  returnErrorMsg: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser, returnErrorMsg })(SignUp);
