import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../redux/actions/AuthActions';

const SignUp = ({isLoading, isAuthenticated, registerUser}) => {
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[password1, setPassword1] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    let user = {
      username: username,
      email: email,
      password: password
    }
    registerUser(user);
    console.log(user);
    setEmail('');
    setPassword('');
    setPassword1('');
    setUsername('');
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

              <button type="submit" className="btn btn-primary">Register</button>
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
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(SignUp);
