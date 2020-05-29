import React, { Fragment, useState} from "react";
import { connect } from "react-redux";
import ImageUploader from 'react-images-upload';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import {storage} from "./firebase";


const InputBlogPost = props => {
  
  const [image, setImage] = useState(null);
  const [image_url, setUrl] = useState("hej");
  const [description, setDescription] = useState("");

  // From reducers to access user ID
  const { loginUser } = props.auth;
  const id = loginUser.id;
 
  const handleImageAsFile = e =>{
   if(e.target.files[0]){
    setImage(e.target.files[0]);
   }
  }

  const handleFireBaseUpload = e => {

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      ()=> {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    )
  }


    const onSubmitForm = async e => {
    e.preventDefault();

    try {
      // Post blogpost

      const body = { description, id, image_url};
      const response = await fetch("http://localhost:5000/blogposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <Fragment>
      
      <h1 className="text-center mt-5">Write a new blogpost</h1>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <form className="text-center mt-5" onSubmit={onSubmitForm}>
          <textarea
            style={{ width: "600px", height: "400px" }}
            type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
               
          <button className="btn btn-secondary btn-lg btn-block mt-5">
            Submit post
          </button>
        </form>   
        <input type="file" onChange={handleImageAsFile}></input>   
        <button onClick={handleFireBaseUpload}>upload image</button>       
      </div>
    </Fragment>
  );
};

// get auth from reducers to access user ID
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(InputBlogPost);
