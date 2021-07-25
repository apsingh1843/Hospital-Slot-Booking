import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
//import ProtectedRoute from './shared/ProtectedRoute';
import { Switch, Route, Redirect } from 'react-router-dom';
//import store from '../redux/ConfigureStore';



class Main extends React.Component {
  componentDidMount(){
   //store.dispatch(loadUser());
   //store.dispatch(loadIntUser());
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
          <Route exact path="/dashboard" component={ Dashboard } />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

export default Main;
