import React, { Fragment } from "react";
import {
  BrowserRouter,
  NavLink,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { logIn, logOut } from "./actions/authAction";
import Dropdown from "react-bootstrap/Dropdown";

import "./App.css";

//components
import InputBlogPost from "./components/InputBlogPost";
import ListBlogposts from "./components/ListBlogposts";
import MapController from "./components/MapController";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

function App(props) {
  const { isLoggedIn, loginUser } = props.isLogged;
  let username = "";
  let surname = "";
  let email = "";
  let totalCountries = "";

  if (isLoggedIn) {
    username = loginUser.firstname;
    surname = loginUser.familyname;
    email = loginUser.email;

    if (loginUser.map != null) {
      totalCountries = loginUser.map.length;
    } else {
      totalCountries = "None";
    }
  }

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
            username={username}
            surname={surname}
            email={email}
            totalCountries={totalCountries}
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

const startPage = () => (
  <Fragment>
    <Login />
    <div
      className="container "
      style={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Row>
        <Col>
          <img src="../world_map.png" width="500"></img>
          <p>
            Welcome to <b>TravelBlog</b> the place where you can store all your
            memories from your travel journeys! <br />
            <br />
            Don't have an account? <b>Sign up to the right!</b>
          </p>
        </Col>
        <Col>
          <Signup />
        </Col>
      </Row>
    </div>
  </Fragment>
);

function PrivateRoute({
  username,
  surname,
  email,
  totalCountries,
  isLoggedIn,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          <Component
            {...location}
            username={username}
            surname={surname}
            email={email}
            totalCountries={totalCountries}
          />
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
    <h1 className="text-center mt-5 font-weight-light text-capitalize">
      {username}s Travelblog
    </h1>
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

const About = ({ username, surname, email, totalCountries }) => (
  <div
    className="about"
    style={{
      display: "flex",
      height: "70vh",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}
  >
    <div className="infoBox bg-light w-50 mx-auto ">
      <h1 className="text-center text-capitalize">
        {username} {surname}
      </h1>
      <p className="text-center">Here you can find your user information</p>

      <table className=" w-70 mt-5 mb-5 mx-auto ">
        <tbody>
          <tr>
            <th>Name: </th>
            <td>{username}</td>
          </tr>
          <tr>
            <th> Family name: </th>
            <td>{surname}</td>
          </tr>
          <tr>
            <th> Email: </th>
            <td>{email}</td>
          </tr>
          <tr>
            <th> Total countries visited: </th>
            <td>{totalCountries}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const NewPost = () => (
  <Fragment>
    <InputBlogPost />
  </Fragment>
);

const Navigation = ({ isLoggedIn }) => (
  <Fragment>
    {isLoggedIn ? (
      <Fragment>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <h5 className="text-white ml-1">
              <i>T r a v e l B l o g</i>
            </h5>
            <img src="../logo_travelblog.png" width="70"></img>
          </Nav>
          <Dropdown style={{ color: "White" }} className="mr-5">
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
                <NavLink to="/about">About me</NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
            Meny
          </Dropdown>

          <Logout />
        </Navbar>
      </Fragment>
    ) : null}
  </Fragment>
);

export default connect(mapStateToProps, { logIn, logOut })(App);
