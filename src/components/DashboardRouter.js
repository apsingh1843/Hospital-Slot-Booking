import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './AdminDashboard/Admin';

const DashboardRouter = ({user}) => {
  if(user){
    if(user.is_staff){
      return <Admin />
    }
    else{
      return <Dashboard />
    }
  }
  else{
    return <Redirect to="/" />
  }
}

DashboardRouter.propTypes = {
  user : PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(DashboardRouter);
