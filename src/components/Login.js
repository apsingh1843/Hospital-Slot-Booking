import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import { loginUser } from '../redux/actions/AuthActions';

const Login = ({isLoading, isAuthenticated}) => {
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    let user = {
      email: email,
      username: username,
      password: password
    }
    console.log(user);
    setEmail('');
    setPassword('');
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
            <h4 className="text-center mb-3">Login to your Account</h4>
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  isAuthenticated : PropTypes.bool.isRequired,
  //loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
