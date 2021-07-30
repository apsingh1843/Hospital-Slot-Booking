import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <div className="container-fluid">

        {/*coming soon model*/}
        <div className="modal fade" id="comingModal" tabIndex="-1" aria-labelledby="commingModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-2">
              <div>
              <button type="button" className="btn-close"
                data-bs-dismiss="modal" aria-label="Close">
              </button>
              </div>
              <div className="modal-body text-center">
                <img className="mb-3" src="assets/images/comingsoon.jpg" alt="coming soon" width="150px" height="150px" />
                <h5>Feature coming soon...</h5>
              </div>
            </div>
          </div>
        </div>


        <div className="row text-center">
          <div className="col-12 col-sm-6 col-lg-3 p-4 p-sm-0">
            <div>
              <img className="w-100 mb-3" src="assets/images/home1.jpg" alt="home1" height="250px" />
            </div>
            <div className="bg-info p-3 div-custom-height">
              <h4 className="mt-4 mt-sm-0">Quality Healthcare Services</h4>
              <p>Highly qualified doctors and specialists, medical professionals, nurses,
                and dedicated to providing round the clock service.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 p-4 p-sm-0 bg-light">
            <div>
              <img className="w-100 mb-3" src="assets/images/home2.jpg" alt="home2" height="250px" />
            </div>
            <div className="bg-warning p-3 div-custom-height">
              <h4 className="mt-4 mt-sm-0">Specialized Care</h4>
              <p>Personalised care is provided so that there is individual attention
                given to each patient that visit the hospital.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 p-4 p-sm-0">
            <div>
              <img className="w-100 mb-3" src="assets/images/home3.jpg" alt="home3" height="250px" />
            </div>
            <div className="bg-warning p-3 div-custom-height">
              <h4 className="mt-4 mt-sm-0">Ultra Modern Technologies</h4>
              <p>State of the art equipment combined with modern technologies,
                infrastructure and transport system.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 p-4 p-sm-0 bg-light">
            <div>
              <img className="w-100 mb-3" src="assets/images/home4.png" alt="home4" height="250px" />
            </div>
            <div className="bg-info p-3 div-custom-height">
              <h4 className="mt-4 mt-sm-0">Online Support</h4>
              <p>We provide online medical advices in emergencies and solve your queries
                round the clock.
              </p>
            </div>
          </div>
        </div>

        <div className="row bg-custom">
          <div className="col-12 col-md-6 p-4 make-flex">
            <img className="w-40" src="assets/images/find.png" alt="find" height="200px"/>
            <span>
              <b>Find your Doctor and <br/> book an Appointment</b> <br />
              <button className="btn btn-warning text-white mt-3" type="button"
                data-bs-toggle="modal" data-bs-target="#comingModal">
                Find Doctor
              </button>
            </span>
          </div>

          <div className="col-12 col-md-6 p-4 make-flex">
            <img className="w-50" src="assets/images/booking.png" alt="find" height="200px" />
              <span>
                <b>Book a slot for regular <br/> and emergency checkups.</b> <br />
                <Link to="/dashboard"><button className="btn btn-warning text-white mt-3" type="button">Book Slot</button></Link>
              </span>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;
