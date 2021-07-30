import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router-dom';
import store from '../redux/Store';
import { loadUser } from '../redux/actions/AuthActions';


class Main extends React.Component {
  componentDidMount(){
   store.dispatch(loadUser());
  }

  render () {
    return(
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/about" component={ About } />
          <ProtectedRoute />
        </Switch>
      </>
    );
  }
}

export default Main;
