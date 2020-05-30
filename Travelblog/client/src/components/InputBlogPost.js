import React, { useState } from "react";
import { connect } from "react-redux";
//import ImageUploader from "react-images-upload";
//import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { storage } from "./firebase";

const InputBlogPost = props => {
  const [image, setImage] = useState(null);
  const [image_url, setUrl] = useState("hej");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  // From reducers to access user ID
  const { loginUser } = props.auth;
  const id = loginUser.id;

  const handleImageAsFile = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFireBaseUpload = e => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    document.getElementById("uploadText").innerHTML =
      "<b>Image uploaded Successfully!</b>";
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      // Post blogpost

      const body = { title, description, id, image_url };
      console.log(body);
      //const response =
      await fetch("http://localhost:5000/blogposts", {
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
    <div className="wrapper mx-auto">
      <h1 className="text-center mt-5">Write a new blogpost</h1>

      <div
        style={{
          display: "flex",

          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <input type="file" onChange={handleImageAsFile}></input>

        <button className="btn btn-info" onClick={handleFireBaseUpload}>
          upload image
        </button>
        <div id="uploadText" className="mt-3 text-center">
          <b>
            Upload a image! <br />
            By first choose a file and then press <i>upload image</i>
          </b>
        </div>
        <form className="text-center mt-3 p-3" onSubmit={onSubmitForm}>
          <textarea
            style={{ width: "600px", height: "40px" }}
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <textarea
            style={{ width: "600px", height: "400px" }}
            type="text"
            className="form-control"
            value={description}
            placeholder="Write what you have on your mind..."
            onChange={e => setDescription(e.target.value)}
          />

          <button className="btn btn-secondary btn-lg btn-block mt-5">
            Submit post
          </button>
        </form>
      </div>
    </div>
  );
};

// get auth from reducers to access user ID
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(InputBlogPost);
