import React, { Fragment } from "react";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { logIn, logOut } from "./actions/authAction";
import Dropdown from "react-bootstrap/Dropdown";

import "./App.css";

//components
import InputBlogPost from "./components/InputBlogPost";
import ListBlogposts from "./components/ListBlogposts";
import MapController from "./components/MapController";
import Inside from "./components/Inside";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

function App(props) {
  const { isLoggedIn, loginUser } = props.isLogged;
  const username = loginUser.firstname;

  return (
    <div>
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} />

        <Switch>
          <Route exact path="/" children={startPage}></Route>
          <PrivateRoute
            path="/home"
            isLoggedIn={isLoggedIn}
            component={Home}
            username={username}
          ></PrivateRoute>
          <PrivateRoute
            path="/about"
            isLoggedIn={isLoggedIn}
            component={About}
          ></PrivateRoute>
          <PrivateRoute
            path="/newPost"
            isLoggedIn={isLoggedIn}
            component={NewPost}
          ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

/* <PrivateRoute path = '/home' isLoggedIn={isLoggedIn} children = {Home}></PrivateRoute> */

const startPage = () => (
  <Fragment>
    <Login />
    <div className="container">
      <p>
        Welcome to <b>TravelBlog</b> the place where you can tell your friends
        and family all about your travel journeys and make them jealous! <br />
        <br />
        Dont have an account? Sign up below!
      </p>

      <Signup />
    </div>
  </Fragment>
);

function PrivateRoute({ username, isLoggedIn, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          <Component {...location} username={username} />
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

const Home = ({ username }) => (
  <Fragment>
    <h1 className="text-center mt-5">{username}s Travelblog</h1>
    <div className="container">
      <MapController />
      <NavLink to="/newPost">
        <button
          type="button"
          className="btn btn-secondary btn-lg btn-block mt-5"
        >
          <span>Write new blogpost</span>
        </button>
      </NavLink>
      <ListBlogposts />
    </div>
  </Fragment>
);

const About = () => (
  <div className="about">
    <h1>About Me</h1>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
  </div>
);

const NewPost = () => (
  <Fragment>
    <InputBlogPost />
  </Fragment>
);

const Navigation = ({ isLoggedIn }) => (
  <Navbar bg="dark" variant="dark">
    {isLoggedIn ? (
      <Fragment>
        <Nav className="mr-auto">
          <Dropdown style={{ color: "White" }}>
            <Dropdown.Toggle
              variant="dark"
              size="sm"
              id="dropdown-basic"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to="/home">Home</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/about">About user</NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
            Meny
          </Dropdown>
        </Nav>

        <Logout />
      </Fragment>
    ) : null}
  </Navbar>
);

export default connect(mapStateToProps, { logIn, logOut })(App);
