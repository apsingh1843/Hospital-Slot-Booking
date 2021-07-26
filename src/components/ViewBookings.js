import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { connect } from 'react-redux';
import { getBookings } from '../redux/actions/BookingActions';


const ViewBookings = ({isLoading, bookings, getBookings}) => {

  useEffect(() => {
    getBookings();
  },[]);

  const BookedAction = ({isCompleted, requestCancel, message}) =>{
    if(!isCompleted){
      if(requestCancel === 'NO'){
        return(
          <>
            <h3>
              <span className="badge rounded-pill bg-success">Active</span><br/>
            </h3>
            <button type="button" className="btn btn-danger mt-2">Request to Cancel</button>
          </>
        );
      }
      else if(requestCancel === 'RE'){
        return(
          <>
            <h3>
              <span className="badge rounded-pill bg-success">Active</span><br/>
            </h3>
            <p>Requested to cancel.</p>
          </>
        );
      }
      else if(requestCancel === 'DE'){
        return(
          <>
            <h3>
              <span className="badge rounded-pill bg-success">Active</span><br/>
            </h3>
            <p>{message ? message : null}</p>
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
            <p>{message ? message : null}</p>
          </>
        );
      }
      else if(requestCancel === 'DE'){
        return(
          <>
            <h3>
              <span className="badge rounded-pill bg-primary">Completed</span><br/>
            </h3>
            <p>{message ? message : null}</p>
          </>
        );
      }
      else {
        return null;
      }
    }
  }

  if(isLoading){
    return(
      <Loader />
    );
  }
  else {
    return (
      <div className="row bg-info p-5" style={{minHeight: "70vh"}}>
        <h2 className="mb-4 text-center">Your Bookings</h2>

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
                  <BookedAction isCompleted={booking.isCompleted} requestCancel={booking.requestCancel} message={booking.message}/>
                </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    )
  }
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

export default connect(mapStateToProps, { getBookings})(ViewBookings);
