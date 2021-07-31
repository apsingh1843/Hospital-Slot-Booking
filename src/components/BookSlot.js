import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import Message from './Message';
import { connect } from 'react-redux';
import { getSlots } from '../redux/actions/SlotActions';
import { createBooking } from '../redux/actions/BookingActions';
import { returnErrorMsg } from '../redux/actions/MsgActions';

const BookSlot = ({ getSlots, isLoading, isBookingLoading, slots, createBooking, returnErrorMsg }) => {
  const[slotId, setSlotId] = useState('');
  const[slotName, setSlotName] = useState('');
  const[slotTime, setSlotTime] = useState('');
  const[patientName, setPatientName] = useState('');
  const[bearerName, setBearerName] = useState('');
  const[patientAge, setPatientAge] = useState('');
  const[mobile, setMobile] = useState('');
  const[description, setDescription] = useState('');

  useEffect(() => {
    getSlots();
  },[]);

  const selectSlot = async (selectedSlotId, selectedSlotName, selectedSlotTime) => {
    setSlotId(selectedSlotId);
    setSlotName(selectedSlotName);
    setSlotTime(selectedSlotTime);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!slotId || !slotTime || !slotName){
      returnErrorMsg("Please select a slot first.", "Invalid Details");
    }
    else if(patientAge <= 0 || patientAge > 110){
      returnErrorMsg("Please enter a valid age", "Invalid Details");
    }
    else if(mobile < 0 || mobile.length !== 10 ){
      returnErrorMsg("Please enter a valid mobile number", "Invalid Details");
    }
    else{
      let booking = {
        slotId: slotId,
        slotName: slotName,
        slotTime: slotTime,
        patientName: patientName,
        bearerName: bearerName,
        patientAge: patientAge,
        mobile: mobile,
        description: description
      }
      createBooking(booking);
    }
  }

  const SelectBtn = ({id, name, makeTime}) =>{
    if(slotId !== id){
      return (
        <button type="button" className="btn btn-success"
          onClick={() => selectSlot(id, name, makeTime)}>
          Select
        </button>
      );
    }
    else{
      return("Selected");
    }
  }
  const SlotList = () =>{
    if(isLoading){
      return(
        <Loader />
      )
    }
    else{
      return(
        <>
          {slots.map(slot =>{
            let makeTime = slot.startTime + ' - ' + slot.endTime
            if(slot.isActive){
              return(
                <div key={slot.id} className="mb-3 p-3 w-75 mx-auto bg-warning shadow-custom flex-custom">
                  <div>{slot.name}{' '} : {' '}{makeTime}</div>

                  {!slot.isBooked ?
                    <SelectBtn id={slot.id} name={slot.name}  makeTime={makeTime}/>
                    :
                    <h5>
                      <span className="badge rounded-pill bg-danger ms-5">Booked</span>
                    </h5>
                  }
                </div>
              );
            }
            else{
              return null;
            }
          })}
        </>
      )
    }
  }

  return (
    <div className="row bg-info" style={{minHeight: "70vh"}}>
      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-1 text-center">Select a slot from below</h3>
        <h6 className="mb-3 text-center">(Note : The selected slot will be reflected in the form.)</h6>

        {slots.length !== 0 ?
          <SlotList />
          :
          <div className="shadow w-75 rounded bg-light mx-auto text-center text-primary pt-2"
            style={{height: 50}}>
            <b>Looks like there are no slots available for now !</b>
          </div>
        }
      </div>

      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-1 text-center">Submit this form to book you slot</h3>
        <h6 className="mb-3 text-center">(Note : Don't forget to select your slot first.)</h6>

        <div className="bg-warning shadow-custom mx-auto p-4 mt-4 mb-3" style={{width: "90%"}}>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="slotName" className="form-label">Selected Slot No.</label>
              <input
                type="text"
                placeholder="Slot No."
                className="form-control"
                id="slotName"
                name="slotName"
                value={slotName}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="slotTime" className="form-label">Selected Slot Time</label>
              <input
                type="text"
                placeholder="Slot Time"
                className="form-control"
                id="slotTime"
                name="slotTime"
                value={slotTime}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">Patient Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Patient Name"
                id="patientName"
                name="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bearerName" className="form-label">
                Bearer Name <small className="text-muted">(person accompanying patient)</small> *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Bearer Name"
                id="bearerName"
                name="bearerName"
                value={bearerName}
                onChange={(e) => setBearerName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientAge" className="form-label">Patient Age *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Patient Age"
                id="patientAge"
                name="patientAge"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Mobile Number"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description
                <small className="text-muted">(if any)</small>
              </label>
              <textarea
                row={3}
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <small className="text-muted">' * ' marked fields are required </small><br/>
              <Message />

                {!isBookingLoading ?
                  <button type="submit" className="btn btn-primary mt-2">Submit</button>
                : <div className="spinner-border ms-4 text-primary mt-2" role="status"></div>}
          </form>
        </div>
      </div>
    </div>
  );
}

BookSlot.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  isBookingLoading : PropTypes.bool.isRequired,
  slots : PropTypes.array.isRequired,
  getSlots : PropTypes.func.isRequired,
  createBooking : PropTypes.func.isRequired,
  returnErrorMsg : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.slots.isLoading,
  isBookingLoading: state.bookings.isLoading,
  slots: state.slots.slots,
});

export default connect(mapStateToProps, { getSlots, createBooking, returnErrorMsg })(BookSlot);
