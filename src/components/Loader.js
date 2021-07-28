import React from 'react';

const Loader = () => {
  return (
    <div className="row p-5">
      <div className="col-12 text-center">
        <div className="spinner-grow text-danger" role="status">
        </div>
        <div className="spinner-grow text-success mx-3" role="status">
        </div>
        <div className="spinner-grow text-warning" role="status">
        </div>
        </div>
    </div>
  )
}

export default Loader;
