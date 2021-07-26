import React from 'react';

const Loader = () => {
  return (
    <div className="row p-5" style={{backgroundColor: "#FFF"}}>
      <div className="col-12 text-center">
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success mx-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
    </div>
  )
}

export default Loader;
