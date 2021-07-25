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
  }

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="col-12">
          <form  onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
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
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password1" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password1"
                name="password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input required" id="check" required/>
              <label className="form-check-label" htmlFor="check">Accept our Terms and Condition.</label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
