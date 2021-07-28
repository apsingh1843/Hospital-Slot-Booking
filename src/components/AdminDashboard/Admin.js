import React, {useState} from 'react';
import ManageSlots from './ManageSlots';
import ManageBookings from './ManageBookings';
import { TabsBtn1, TabsBtn2 } from '../Dashboard';

const Admin = () => {
  const[slots, setSlots] = useState(true);
  const[bookings, setBookings] = useState(false);

  const selectSlot = async () => {
    setSlots(true);
    setBookings(false);
  }
  const selectBooking = async () => {
    setSlots(false);
    setBookings(true);
  }

  return (
    <div className="container-fluid bg-warning">
      <div className="text-center pt-3 pb-4">
        <h1 className="mb-3">Admin Dashboard</h1>
        <div className="btn-group w-75" role="group">
          {slots ? (
            <TabsBtn2 text="Manage Slot" />
          ) : (
            <TabsBtn1 text="Manage Slot" onClickFunction={selectSlot} />
          )}
          {bookings ? (
            <TabsBtn2 text="Manage Bookings" />
          ) : (
            <TabsBtn1 text="Manage Bookings" onClickFunction={selectBooking} />
          )}
        </div>
      </div>

      {slots ? <ManageSlots /> : <></>}
      {bookings ? <ManageBookings/> : <></>}

    </div>
  );
}

export default Admin;
