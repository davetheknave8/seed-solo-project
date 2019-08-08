import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginPage from '../LoginPage/LoginPage';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import LandingPage from '../LandingPage/LandingPage'
import CourseCatalog from '../CourseCatalog/CourseCatalog';
import Dashboard from '../Dashboard/Dashboard';
import TreeView from '../TreeView/TreeView';
import Admin from '../Admin/Admin';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.props.dispatch({type: 'FETCH_RECENT_TREE'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact 
              path="/home"
              component={LandingPage}
            />
            <Route
              exact
              path="/courses"
              component={CourseCatalog}
            />
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}

            <ProtectedRoute
              exact
              path="/admin"
              component={Admin}
            />
            <ProtectedRoute
              exact
              path="/tree/:id"
              component={TreeView}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
