import React, {useState} from 'react';
import ManageSlots from './ManageSlots';
import ManageBookings from './ManageBookings';
import BookSlot from '../BookSlot';
import ViewBookings from '../ViewBookings';
import { TabsBtn1, TabsBtn2 } from '../Dashboard';

const Admin = () => {
  const[slots, setSlots] = useState(false);
  const[bookings, setBookings] = useState(false);
  const[adminSlots, setAdminSlots] = useState(true);
  const[adminBookings, setAdminBookings] = useState(false);

  const selectSlot = async () => {
    setSlots(true);
    setBookings(false);
    setAdminSlots(false);
    setAdminBookings(false);
  }
  const selectBooking = async () => {
    setSlots(false);
    setBookings(true);
    setAdminSlots(false);
    setAdminBookings(false);
  }
  const selectAdminSlot = async () => {
    setSlots(false);
    setBookings(false);
    setAdminSlots(true);
    setAdminBookings(false);
  }
  const selectAdminBooking = async () => {
    setSlots(false);
    setBookings(false);
    setAdminSlots(false);
    setAdminBookings(true);
  }

  return (
    <div className="container-fluid bg-warning">
      <div className="text-center pt-3 pb-4">
        <h1 className="mb-3">Admin Dashboard</h1>
        <div className="btn-group w-75" role="group">
          {adminSlots ? (
            <TabsBtn2 text="Manage Slot" />
          ) : (
            <TabsBtn1 text="Manage Slot" onClickFunction={selectAdminSlot} />
          )}
          {adminBookings ? (
            <TabsBtn2 text="Manage Bookings" />
          ) : (
            <TabsBtn1 text="Manage Bookings" onClickFunction={selectAdminBooking} />
          )}
        </div>
        <div className="btn-group w-75 mt-2" role="group">
          {slots ? (
            <TabsBtn2 text="Book Slot" />
          ) : (
            <TabsBtn1 text="Book Slot" onClickFunction={selectSlot} />
          )}
          {bookings ? (
            <TabsBtn2 text="Personal Bookings" />
          ) : (
            <TabsBtn1 text="Personal Bookings" onClickFunction={selectBooking} />
          )}
        </div>
      </div>

      {adminSlots ? <ManageSlots /> : <></>}
      {adminBookings ? <ManageBookings/> : <></>}
      {slots ? <BookSlot /> : <></>}
      {bookings ? <ViewBookings/> : <></>}

    </div>
  );
}

export default Admin;
