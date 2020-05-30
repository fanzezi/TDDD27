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
      <div className="loginBox w-100 p-2 mb-2 bg-dark ">
        <Form inline onSubmit={loginSubmit}>
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

          <button disabled={!validateForm()} type="submit">
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
