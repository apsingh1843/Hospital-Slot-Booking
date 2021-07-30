import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardRouter from './DashboardRouter';

const ProtectedRoute = ({isAuthenticated}) => {
  if (isAuthenticated){
    return(
      <Route exact path="/dashboard" component={ DashboardRouter } />
    );
  }
  else{
    return(
      <Redirect to="/login" />
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}
export default connect(mapStateToProps)(ProtectedRoute);
