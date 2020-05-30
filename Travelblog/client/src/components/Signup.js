import React, { Fragment, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Signup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rptPsw, setRptPassword] = useState("");
  const [firstName, setName] = useState("");
  const [familyName, setFamilyName] = useState("");

  // Password length > 2
  function validateForm() {
    return email.length > 2 && password.length > 2;
  }

  // On submit
  const signupSubmit = async e => {
    e.preventDefault();
    try {
      const body = {
        email: email,
        password: password,
        firstName: firstName,
        familyName: familyName
      };
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="SignUp">
        <form onSubmit={signupSubmit} className="bg-light">
          <FormGroup controlId="firstName">
            <h2 className="text-center font-weight-light">Sign up here!</h2>
            <FormLabel>First name</FormLabel>
            <FormControl
              size="sm"
              value={firstName}
              onChange={e => setName(e.target.value)}
              type="text"
            />
          </FormGroup>

          <FormGroup controlId="familyName">
            <FormLabel> Family name</FormLabel>
            <FormControl
              size="sm"
              value={familyName}
              onChange={e => setFamilyName(e.target.value)}
              type="text"
            />
          </FormGroup>

          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              size="sm"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              size="sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>

          <FormGroup controlId="rpt-password">
            <FormLabel>Repeat password</FormLabel>
            <FormControl
              size="sm"
              value={rptPsw}
              onChange={e => setRptPassword(e.target.value)}
              type="password"
            />
          </FormGroup>

          <Button size="sm" disabled={!validateForm()} type="submit">
            Sign up
          </Button>
        </form>
      </div>
    </Fragment>
  );
}
