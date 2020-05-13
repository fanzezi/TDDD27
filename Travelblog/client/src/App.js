import React, {Fragment} from "react";
import {BrowserRouter, NavLink, Switch, Route, withRouter} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'

import "./App.css";

//components
import InputBlogPost from "./components/InputBlogPost";
import ListBlogposts from "./components/ListBlogposts";
import MapController from "./components/MapController";



function App() {
  return (
    <div>  
    <BrowserRouter>
    <Navigation/>
        <Switch>
          <Route exact path = '/' component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/newPost" component={NewPost}></Route>
        </Switch>
    </BrowserRouter>
    </div>  
  );
}

const Home = () => (
  <Fragment>
  <h1 className="text-center mt-5">Usernames Travelblog</h1>
  <div className="container">
    <MapController/>
    <NavLink to='/newPost'> 
      <button type="button" className="btn btn-secondary btn-lg btn-block mt-5">
        <span>Write new blogpost</span>
      </button></NavLink>
    <ListBlogposts/>
  </div>
  </Fragment>
);

const About = () => (
  <div className='about'>
    <h1>About Me</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);

const NewPost = () => ( 
  <Fragment>
    <InputBlogPost/>
  </Fragment>
);

const Navigation = () => (
  <Navbar bg="dark" variant="dark"> 
    <Nav className="mr-auto">
      <Dropdown style = {{color: "White"}}>
        <Dropdown.Toggle variant="dark" size="sm" id = "dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item><NavLink to='/'>Home</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to='/about'>About user</NavLink></Dropdown.Item>
          </Dropdown.Menu>        
        Meny</Dropdown>
    </Nav>
  </Navbar>
    
  
);

export default App;
