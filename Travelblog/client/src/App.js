import React, {Fragment} from "react";
import "./App.css";

//components
import InputBlogPost from "./components/InputBlogPost";
import ListBlogposts from "./components/ListBlogposts";
import MapController from "./components/MapController";

function App() {

  return (
    <Fragment>
      <h1 className="text-center mt-5">Usernames Travelblog</h1>
      <div className="container">
        <MapController/>
        <InputBlogPost/>
        <ListBlogposts/>
      </div>
      </Fragment>
  );
}

export default App;
