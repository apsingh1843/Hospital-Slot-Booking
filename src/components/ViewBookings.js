import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { connect } from 'react-redux';
import { getBookings } from '../redux/actions/BookingActions';

const server = "http://127.0.0.1:8000"

const BookedAction = ({id, isCompleted, requestCancel, message}) =>{
  const[isRequested, setIsRequested] = useState('');
  const[resCancel, setResCancel] = useState('');
  const[reqMsg, setReqMsg] = useState('');

  function handleCancel(id){
    setIsRequested(id);
    setResCancel('');
    const token = localStorage.getItem('token');
    let data={
      id: id,
      reqMsg: reqMsg
    }
    const body = JSON.stringify(data);
    const config={
      headers: {
        'Content-Type': 'application/json',
      }
    }
    if(token){
      config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post(`${server}/api/reqcancel/`, body, config)
    .then(res => {
      console.log(res.data);
      setResCancel(res.data.msg);
    })
    .catch(error =>{
      console.log(error.response);
      setIsRequested('');
      setResCancel('');
    });
  }

  if(!isCompleted){
    if(requestCancel === 'NO'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>
          {isRequested !== id ?
            <div>
              <select className="form-select form-select-sm mb-2"
                onChange={(event)=>setReqMsg(event.target.value)}>
                <option value="Conflict in schedules" selected>Conflict in schedules</option>
                <option value="Unable to pay">Unable to pay</option>
                <option value="A personal/unrelated issue, works related issue, etc">
                  A personal/unrelated issue, works related issue, etc
                </option>
                <option value="Used another source of care">Used another source of care</option>
                <option value="Did not have transportation">Did not have transportation</option>
                <option value="Others">Others</option>
              </select>

              <button type="button" onClick={() =>handleCancel(id)} className="btn btn-danger">
                Request to Cancel
              </button>
            </div>
          : <p className="text-danger">{resCancel}</p>}
        </>
      );
    }
    else if(requestCancel === 'RE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>
          <p className="text-danger">You have requested to cancel this booking. Please wait for response.</p>
        </>
      );
    }
    else if(requestCancel === 'DE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>
          <p>Your request to cancel this booking was declined.</p>
          <p className="text-primary">{message ? <><span><i>Staff's Message :</i> </span> {message}</> : null}</p>
        </>
      );
    }
    else {
      return null;
    }
  }
  else{
    if (requestCancel === 'NO'){
      return(
        <h3>
          <span className="badge rounded-pill bg-primary">Completed</span><br/>
        </h3>
      );
    }
    else if(requestCancel === 'AC'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-danger">Cancelled</span><br/>
          </h3>
          <p>Your request to cancel this booking was accepted.</p>
        </>
      );
    }
    else if(requestCancel === 'DE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-primary">Completed</span><br/>
          </h3>
          <p>You requested to cancel this booking but it was declined.</p>
          <p className="text-primary">{message ? <><span><i>Staff's Message :</i> </span> {message}</> : null}</p>
        </>
      );
    }
    else {
      return null;
    }
  }
}

const ViewBookings = ({isLoading, bookings, getBookings}) => {

  useEffect(() => {
    getBookings();
  },[]);

  const BookingList = () =>{
    if(isLoading){
      return(
        <Loader />
      )
    }
    else{
      return(
        <>
          {bookings.map(booking => {
            return (
              <div key={booking.id} className="col-12 col-md-10 offset-md-1 mb-3 p-3 bg-warning shadow-custom">
                <div className="container">
                  <div className="row">
                  <div className="col-12 col-lg-4">
                    <h4>{booking.slotName}</h4>
                    <h5>Timing : {booking.slotTime}</h5>
                    <h5>Booked At : {booking.bookingTime}</h5>
                  </div>
                  <div className="col-12 col-lg-4">
                    Patient Name : {booking.patientName} <br /><br />
                    Bearer Name : {booking.bearerName} <br /><br />
                    Patient Age : {booking.patientAge} <br /><br />
                    Mobile No. : {booking.mobile} <br /><br />
                    Description : {booking.description}
                  </div>
                  <div className="col-12 col-lg-4 bg-light shadow rounded text-center p-2 mt-3 mt-lg-0 p-lg-2 pt-lg-2">
                    <h6 className="mb-2">Current Status :</h6>
                    <BookedAction isCompleted={booking.isCompleted} id={booking.id}
                      requestCancel={booking.requestCancel} message={booking.message}/>
                  </div>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="row bg-info p-5" style={{minHeight: "70vh"}}>
      <h2 className="mb-4 text-center">Your Bookings</h2>
      <BookingList />
    </div>
  )
}

ViewBookings.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  bookings : PropTypes.array.isRequired,
  getBookings : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.bookings.isLoading,
  bookings: state.bookings.bookings,
});

export default connect(mapStateToProps, { getBookings })(ViewBookings);
