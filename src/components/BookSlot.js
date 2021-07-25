import React, {useState, useEffect} from 'react';
//import PropTypes from 'prop-types';
import SlotData from '../DummyData';

const BookSlot = () => {
  const[slotId, setSlotId] = useState('');
  const[slotName, setSlotName] = useState('');
  const[slotTime, setSlotTime] = useState('');
  const[patientName, setPatientName] = useState('');
  const[bearerName, setBearerName] = useState('');
  const[patientAge, setPatientAge] = useState('');
  const[mobile, setMobile] = useState('');
  const[description, setDescription] = useState('');

  useEffect(() => {
    console.log(SlotData);
  },[])

  const selectSlot = async (selectedSlotId, selectedSlotName, selectedSlotTime) => {
    setSlotId(selectedSlotId);
    setSlotName(selectedSlotName);
    setSlotTime(selectedSlotTime);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
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
    console.log(booking);
    setSlotId('');
    setSlotName('');
    setSlotTime('');
    setPatientName('');
    setBearerName('');
    setPatientAge('');
    setMobile('');
    setDescription('');
  }

  return (
    <div className="row bg-info">
      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-5 text-center">Select a slot from below</h3>

        {SlotData.map(slot =>{
          let makeTime = slot.startTime + ' - ' + slot.endTime
          if(slot.isActive){
            return(
              <div key={slot.id} className="mb-3 p-3 w-75 mx-auto bg-warning shadow-custom">
                {slot.name}{' '} : {' '}{makeTime}

                {slot.isBooked ?
                  <button type="button" className="btn btn-success ms-5"
                    onClick={() => selectSlot(slot.id, slot.name, makeTime)}>
                    Select
                  </button>
                  :
                  <h5 style={{display: 'inline'}}>
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
      </div>

      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-1 text-center">Submit this form to book you slot</h3>
        <h6 className="mb-3 text-center">Note : Don't forget to select your slot first.</h6>

        <div className="bg-warning shadow-custom mx-auto w-75 p-4 mt-4 mb-3">
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

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookSlot;
