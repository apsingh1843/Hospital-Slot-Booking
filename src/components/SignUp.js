import React, { useState } from 'react';
//import PropTypes from 'prop-types';

const SignUp = () => {
  const[email, setEmail] = useState('');
  const[phone, setPhone] = useState('');
  const[password, setPassword] = useState('');
  const[password1, setPassword1] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    let user = {
      email: email,
      phone: phone,
      password: password
    }
    console.log(user);
    setEmail('');
    setPassword('');
    setPassword1('');
    setPhone('');
  }

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
              <label htmlFor="phone" className="form-label">Mobile Number</label>
              <input
                type="number"
                placeholder="Enter your Mobile Number"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

export default SignUp;
