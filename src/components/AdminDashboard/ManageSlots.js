import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { getSlots } from '../../redux/actions/SlotActions';

const ManageSlots = ({getSlots, isLoading, slots}) => {
  const[slotName, setSlotName] = useState('');
  const[startTime, setStartTime] = useState('');
  const[endTime, setEndTime] = useState('');

  useEffect(() => {
    getSlots();
  },[]);

  function handleSubmit(e){
    e.preventDefault();
    let slotData = {
      name: slotName,
      startTime: startTime,
      endTime: endTime
    }
    console.log(slotData);
  }


  const SelectBtn = ({id, isActive}) =>{
    function activateSlot(id){
      console.log("activate")
    }
    function deactivateSlot(id){
      console.log("deactivate")
    }

    if(!isActive){
      return (
        <button type="button" className="btn btn-success"
          onClick={() => activateSlot(id)}>
          Activate Slot
        </button>
      );
    }
    else{
      return(
        <button type="button" className="btn btn-danger"
          onClick={() => deactivateSlot(id)}>
          Deactivate Slot
        </button>
      );
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
              return(
                <div key={slot.id} className="mb-3 p-3 w-75 mx-auto bg-warning shadow-custom flex-custom">
                  <div>{slot.name}{' '} : {' '}{makeTime}</div>

                  {!slot.isBooked ?
                    <SelectBtn id={slot.id} name={slot.name} isActive={slot.isActive} makeTime={makeTime}/>
                    :
                    <h5>
                      <span className="badge rounded-pill bg-primary ms-5">Booked</span>
                    </h5>
                  }
                </div>
              );
          })}
        </>
      )
    }
  }

  return (
    <div className="row bg-info">
      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-3 text-center">View, Activate and Deactivate Slots</h3>

        <SlotList />
      </div>

      <div className="col-12 col-md-6 p-3">
        <h3 className="mb-1 text-center">Create Slot</h3>

        <div className="bg-warning shadow-custom mx-auto p-4 mt-4 mb-3" style={{width: "90%"}}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="slotName" className="form-label">Slot Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Slot Name"
                id="slotName"
                name="slotName"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Slot Start Time *
              </label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">Slot End Time *</label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>


            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

ManageSlots.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  slots : PropTypes.array.isRequired,
  getSlots : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.slots.isLoading,
  slots: state.slots.slots,
});

export default connect(mapStateToProps, { getSlots })(ManageSlots);
