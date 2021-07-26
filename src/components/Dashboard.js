import React, {useState} from 'react';
//import PropTypes from 'prop-types';
import BookSlot from './BookSlot';
import ViewBookings from './ViewBookings';

const TabsBtn1 = ({ text, onClickFunction }) => {
  return (
    <>
      <button className="btn btn-light w-50" onClick={onClickFunction}>
        {text}
      </button>
    </>
  );
}

const TabsBtn2 = ({ text }) => {
  return (
    <>
      <button className="btn btn-success w-50">
        {text}
      </button>
    </>
  );
}

const Dashboard = () => {
  const[book, setBook] = useState(true);
  const[view, setView] = useState(false);

  const selectBook = async () => {
    setBook(true);
    setView(false);
  }
  const selectView = async () => {
    setBook(false);
    setView(true);
  }

  return (
    <div className="container-fluid bg-warning">
      <div className="text-center pt-3 pb-4">
        <h1 className="mb-3">Your Dashboard</h1>
        <div className="btn-group w-75" role="group">
          {book ? (
            <TabsBtn2 text="Book a Slot" />
          ) : (
            <TabsBtn1 text="Book a Slot" onClickFunction={selectBook} />
          )}
          {view ? (
            <TabsBtn2 text="View previous Bookings" />
          ) : (
            <TabsBtn1 text="View previous Bookings" onClickFunction={selectView} />
          )}
        </div>
      </div>

      {book ? <BookSlot /> : <></>}
      {view ? <ViewBookings/> : <></>}

    </div>
  )
}

export default Dashboard;
