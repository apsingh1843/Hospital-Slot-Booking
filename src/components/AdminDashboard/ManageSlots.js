import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { connect } from 'react-redux';
import { getSlots, createSlots, activateSlots, deactivateSlots } from '../../redux/actions/SlotActions';

const ManageSlots = ({getSlots, createSlots, deactivateSlots, activateSlots, isLoading, slots}) => {
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
    createSlots(slotData);
  }


  const SelectBtn = ({id, isActive}) =>{

    if(!isActive){
      return (
        <button type="button" className="btn btn-success btn-sm"
          onClick={() => activateSlots(id)}>
          Activate Slot
        </button>
      );
    }
    else{
      return(
        <button type="button" className="btn btn-danger btn-sm"
          onClick={() => deactivateSlots(id)}>
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
        <h4 className="mb-3 text-center">Create Slot</h4>

        <div className="bg-warning shadow-custom w-75 mx-auto p-4 mb-3" style={{width: "90%"}}>
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

            <button type="submit" className="btn btn-primary btn-sm mt-2">Create Slot</button>
          </form>
        </div>
      </div>

      <div className="col-12 col-md-6 p-3">
        <h4 className="mb-3 text-center">View, Activate and Deactivate Slots</h4>

        <SlotList />
      </div>
    </div>
  );
}

ManageSlots.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  slots : PropTypes.array.isRequired,
  getSlots : PropTypes.func.isRequired,
  createSlots : PropTypes.func.isRequired,
  activateSlots : PropTypes.func.isRequired,
  deactivateSlots : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.slots.isLoading,
  slots: state.slots.slots,
});

export default connect(mapStateToProps, { getSlots, createSlots, deactivateSlots, activateSlots })(ManageSlots);
