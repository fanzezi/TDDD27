import React, { useState, Fragment } from "react";
import { FormControl, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./Login.css";
import { logIn } from "../actions/authAction";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password length > 2
  function validateForm() {
    return email.length > 2 && password.length > 2;
  }

  // On submit send request
  const loginSubmit = e => {
    // if the event does not get explicitly handled, its default action should not be taken as it normally would be.
    e.preventDefault();
    // Validate if email and password is working

    const body = {
      email: email,
      password: password
    };
    document.getElementsByClassName("wEmail")[0].style.display = "block";
    try {
      props.logIn(body);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Access state from isLogged reducer
  const { isLoggedIn } = props.isLogged;

  const history = useHistory();

  if (isLoggedIn) {
    history.push("/home");
  }

  return (
    <Fragment>
      {isLoggedIn ? " " : null}
      <div className="loginBox d-flex  w-100  p-2 bg-dark float-right">
        <h5 className="text-white ml-1">
          {" "}
          <i>T r a v e l B l o g</i>
        </h5>
        <img src="../logo_travelblog.png" width="70"></img>

        <Form inline className="ml-auto" onSubmit={loginSubmit}>
          <div
            id="wEmail"
            className="wEmail alert-danger mr-5"
            role="alert"
            style={{ display: "none", padding: "5px", borderRadius: "10px" }}
          >
            <span class=" glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Error:</span>
            Wrong password!
          </div>
          <FormControl
            autoFocus
            placeholder="Email"
            className="mr-3"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <FormControl
            value={password}
            className="mr-3"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />

          <button
            class="btn btn-light"
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </button>
        </Form>
      </div>
    </Fragment>
  );
}

// To use state
const mapStateToProps = state => ({
  isLogged: state.isLogged
});

export default connect(mapStateToProps, { logIn })(Login);
