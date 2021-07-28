import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';


const ProtectedRoute = ({isLoading, isAuthenticated}) => {
  if (isAuthenticated){
    return(
      <Route exact path="/dashboard" component={ Dashboard } />
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
  isLoading: state.auth.isLoading,
});

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
export default connect(mapStateToProps)(ProtectedRoute);
