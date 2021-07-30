import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { getBookings, handleResponseCancel, markCompleted } from '../../redux/actions/BookingActions';


const BookedAction = ({id, isCompleted, requestCancel, message, handleResponseCancel, markCompleted}) =>{
  const[resMsg, setResMsg] = useState("Cannot cancel as it's too late.");

  function handleComplete(id){
    let data={
      id: id
    }
    console.log(data);
    markCompleted(data);
  }

  function handleApprove(id){
    let data={
      id: id,
      resMsg: '',
      resType: 'AC'
    }
    console.log(data);
    handleResponseCancel(data);
  }

  function handleDecline(id){
    let data={
      id: id,
      resMsg: resMsg,
      resType: 'DE'
    }
    console.log(data);
    handleResponseCancel(data);
  }

  if(!isCompleted){
    if(requestCancel === 'NO'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>
          <div>
            <button type="button" onClick={() =>handleComplete(id)} className="btn btn-primary btn-sm w-75">
              Mark as Complete
            </button>
          </div>
        </>
      );
    }
    else if(requestCancel === 'RE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>

          <p>Client has requested to cancel this booking.<br/>
            {message ? <span className="text-primary"><i>Reason Given :</i>  {message}</span> : null} <br/>
          If declining, please select a reason from below :
          </p>

          <select className="form-select form-select-sm mb-2 w-75 mx-auto"
            onChange={(event)=>setResMsg(event.target.value)}>
            <option defaultValue="Cannot cancel as it's too late.">Cannot cancel as it's too late.</option>
            <option value="The reason provided is not sufficient.">The reason provided is not sufficient.</option>
            <option value="Cancelling will violate hospital's policy.">Cancelling will violate hospital's policy.</option>
          </select>

          <div className="btn-group w-75 mb-2" role="group">
            <button type="button" className="btn btn-success btn-sm" onClick={()=>handleApprove(id)}>Approve</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDecline(id)}>Decline</button>
          </div>
          <button type="button" onClick={() =>handleComplete(id)} className="btn btn-primary btn-sm w-75">
            Mark as Complete
          </button>
        </>
      );
    }
    else if(requestCancel === 'DE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-success">Active</span><br/>
          </h3>
          <p>Client requested to cancel this booking but it was <span className="text-danger">declined</span> by staff.</p>
          <p className="text-primary">
            {message ? <><span><i>Staff's Message :</i> {message}</span> </> : null}
          </p>
          <button type="button" onClick={() =>handleComplete(id)} className="btn btn-primary btn-sm w-75">
            Mark as Complete
          </button>
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
          <p>This booking was cancelled on the request of client.</p>
          <p className="text-primary">{message ? <span><i>Client's Reason :</i> {message}</span> : null}</p>
        </>
      );
    }
    else if(requestCancel === 'DE'){
      return(
        <>
          <h3>
            <span className="badge rounded-pill bg-primary">Completed</span><br/>
          </h3>
          <p>Client requested to cancel this booking but it was <span className="text-danger">declined</span> by staff.</p>
          <p className="text-primary">{message ? <span><i>Staff's Message :</i>  {message}</span> : null}</p>
        </>
      );
    }
    else {
      return null;
    }
  }
}

const ManageBookings = ({isLoading, bookings, getBookings, handleResponseCancel, markCompleted}) => {
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
                    <BookedAction isCompleted={booking.isCompleted} id={booking.id} handleResponseCancel={handleResponseCancel}
                      markCompleted={markCompleted} requestCancel={booking.requestCancel} message={booking.message}/>
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
      <h2 className="mb-2 text-center">All Bookings</h2>
      {bookings.length !== 0 ?
        <BookingList />
        :
        <div className="shadow w-75 rounded bg-light mx-auto text-center text-danger pt-2"
          style={{height: 50}}>
          <b>Cannot find any bookings.</b>
        </div>
      }
    </div>
  )
}

ManageBookings.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  bookings : PropTypes.array.isRequired,
  getBookings : PropTypes.func.isRequired,
  handleResponseCancel : PropTypes.func.isRequired,
  markCompleted : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoading: state.bookings.isLoading,
  bookings: state.bookings.bookings,
});

export default connect(mapStateToProps, { getBookings, handleResponseCancel, markCompleted })(ManageBookings);
