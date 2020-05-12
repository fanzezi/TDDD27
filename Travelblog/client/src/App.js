import React, { Fragment } from "react";
import "./App.css";
import { connect } from "react-redux";
import { logIn } from "./actions/authAction";

import { Navbar } from "react-bootstrap";
// get react-router for log in page
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//import components
import Inside from "./components/Inside";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App(props) {
  // Redux state, for logged in
  //const isLogged = useSelector(state => state.isLogged);
  const { isLoggedIn } = props.isLogged;
  return (
    <Fragment>
      <Router>
        <Navbar className="bg-light justify-content-end">
          <Login />
        </Navbar>
        <Switch>
          <Route exact path="/">
            <div className="container">
              <p>
                Welcome to <b>TravelBlog</b> the place where you can tell your
                friends and family all about your travel journeys and make them
                jealous! <br />
                <br />
                Dont have an account? Sign up below!
              </p>
              <Signup />
            </div>
          </Route>

          <PrivateRoute isLoggedIn={isLoggedIn} path="/protected">
            <Inside />
          </PrivateRoute>
        </Switch>
      </Router>
    </Fragment>
  );
}

//Switch to protected page if IsLoggedIn is true, otherwise stay at "/"
function PrivateRoute({ isLoggedIn, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  isLogged: state.isLogged
});

export default connect(mapStateToProps, { logIn })(App);
